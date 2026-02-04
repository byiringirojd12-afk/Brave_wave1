import { connectToDB } from "./_db.js";
import jwt from "jsonwebtoken";

const MIN_TIME_REQUIRED = 30;

export default async function handler(req, res) {
  try {
    // 1. Check if the Secret exists in environment variables
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error("Missing JWT_SECRET in environment variables");
      return res.status(500).json({ message: "Server configuration error" });
    }

    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Authorization header missing" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token missing" });

    // 2. Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    const db = await connectToDB();

    if (req.method === "GET") {
      const user = await db.collection("users").findOne({ email: decoded.email });
      // If user doesn't exist, we stop here
      if (!user) return res.status(404).json({ message: "User not found" });

      const progressDocs = await db.collection("progress").find({ email: decoded.email }).toArray();
      
      const progressMap = {};
      let totalTime = 0;
      
      progressDocs.forEach(doc => {
        progressMap[String(doc.lessonId)] = doc.completed;
        totalTime += doc.timeSpent || 0;
      });

      return res.status(200).json({
        name: user.name || "Student",
        role: user.role || "student",
        progress: progressMap,
        timeSpent: totalTime,
      });
    }

    if (req.method === "POST") {
      const { lessonId, completed, timeSpent, updateProfile, name } = req.body;

      if (updateProfile && name) {
        await db.collection("users").updateOne({ email: decoded.email }, { $set: { name } });
        return res.status(200).json({ message: "Profile updated" });
      }

      if (!lessonId) return res.status(400).json({ message: "Lesson ID required" });
      
      const timeInSeconds = Number(timeSpent) || 0;

      if (completed && timeInSeconds < MIN_TIME_REQUIRED) {
        return res.status(403).json({ message: "Minimum study time not met." });
      }

      await db.collection("progress").updateOne(
        { email: decoded.email, lessonId: String(lessonId) },
        { 
          $set: { completed: !!completed, updatedAt: new Date() }, 
          $inc: { timeSpent: timeInSeconds } 
        },
        { upsert: true }
      );
      return res.status(200).json({ message: "Progress saved" });
    }

    return res.status(405).json({ message: "Method not allowed" });

  } catch (err) {
    // Catch specific JWT errors for clearer client feedback
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token signature" });
    }
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }
    
    console.error("Critical API Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
