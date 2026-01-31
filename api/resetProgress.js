import { connectToDB } from "./_db";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "DELETE") return res.status(405).json({ message: "Method not allowed" });

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Only Instructors or Admins can reset data
    if (decoded.role !== "admin" && decoded.role !== "instructor") {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Student email is required" });

    const db = await connectToDB();

    // Delete all progress records for this specific student email
    await db.collection("progress").deleteMany({ email: email });

    return res.status(200).json({ message: `Progress for ${email} has been reset.` });
  } catch (err) {
    return res.status(401).json({ message: "Invalid session" });
  }
}