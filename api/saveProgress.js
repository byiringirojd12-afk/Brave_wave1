import { connectToDB } from "./_db";
import jwt from "jsonwebtoken";

const MIN_TIME_REQUIRED = 30; 

export default async function handler(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const db = await connectToDB();

    // --- GET: Fetch Profile + Progress ---
    if (req.method === "GET") {
      // 1. Get User Profile
      const user = await db.collection("users").findOne({ email: decoded.email });
      if (!user) return res.status(404).json({ message: "User not found" });

      // 2. Get Progress Records
      const progressDocs = await db.collection("progress")
        .find({ email: decoded.email })
        .toArray();

      // 3. Format progress into a clean object { 1: true, 2: false }
      const progressMap = {};
      let totalTime = 0;
      progressDocs.forEach(doc => {
        progressMap[doc.lessonId] = doc.completed;
        totalTime += (doc.timeSpent || 0);
      });

      return res.status(200).json({
        name: user.username,
        role: user.role,
        progress: progressMap,
        timeSpent: totalTime
      });
    } 

    // --- POST: Save Progress ---
    else if (req.method === "POST") {
      const { lessonId, completed, timeSpent } = req.body;
      const timeInSeconds = Number(timeSpent) || 0;

      if (!lessonId) return res.status(400).json({ message: "Lesson ID required" });

      // 🛡️ SECURITY: Time-lock check
      if (completed && timeInSeconds < MIN_TIME_REQUIRED) {
        await db.collection("progress").updateOne(
          { email: decoded.email, lessonId: String(lessonId) },
          { 
            $inc: { timeSpent: timeInSeconds },
            $set: { updatedAt: new Date() } 
          },
          { upsert: true }
        );
        return res.status(403).json({ message: "Low engagement: Keep reading!" });
      }

      // 💾 SAVE SUCCESSFUL PROGRESS
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
    return res.status(401).json({ message: "Invalid session" });
  }
}