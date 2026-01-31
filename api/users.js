import { connectToDB } from "./_db";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Allow Admins and Instructors
    if (decoded.role !== "admin" && decoded.role !== "instructor") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const db = await connectToDB();

    /** * 📊 ADVANCED AGGREGATION 
     * We join the user with their progress and calculate total time in one trip to the DB.
     */
    const usersWithProgress = await db.collection("users").aggregate([
      {
        $lookup: {
          from: "progress",
          localField: "email",
          foreignField: "email",
          as: "userProgress"
        }
      },
      {
        $project: {
          _id: 1,
          username: 1,
          email: 1,
          role: 1,
          createdAt: 1,
          // List of lesson IDs completed
          progress: {
            $map: {
              input: { $filter: { input: "$userProgress", as: "p", cond: { $eq: ["$$p.completed", true] } } },
              as: "item",
              in: "$$item.lessonId"
            }
          },
          // ⏱️ SUM TOTAL TIME: Adds up every 'timeSpent' field in the array
          totalTimeSpent: { $sum: "$userProgress.timeSpent" }
        }
      }
    ]).toArray();

    return res.status(200).json(usersWithProgress);
  } catch (err) {
    console.error("Aggregation Error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
}