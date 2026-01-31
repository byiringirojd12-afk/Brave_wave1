import { connectToDB } from "./_db";
import jwt from "jsonwebtoken";

const MIN_TIME_REQUIRED = 30; 

export default async function handler(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const db = await connectToDB();

    // --- 1. HANDLE SAVING (POST) ---
    if (req.method === "POST") {
      const { lessonId, completed, timeSpent } = req.body;
      const timeInSeconds = Number(timeSpent) || 0;

      if (!lessonId) return res.status(400).json({ message: "Lesson ID required" });

      // Security check: Don't allow completion if time is too low
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

    // --- 2. HANDLE FETCHING (GET) ---
    // This part runs if the method is GET (Dashboard load)
    const user = await db.collection("users").findOne({ email: decoded.email });
    const progressDocs = await db.collection("progress").find({ email: decoded.email }).toArray();

    const progressMap = {};
    let totalTime = 0;
    
    progressDocs.forEach(doc => {
      progressMap[doc.lessonId] = doc.completed;
      totalTime += (doc.timeSpent || 0);
    });

    return res.status(200).json({
      name: user?.username || "Student",
      role: user?.role || "student",
      progress: progressMap,
      timeSpent: totalTime
    });

  } catch (err) {
    console.error("API Error:", err);
    res.status(401).json({ message: "Invalid session" });
  }
}