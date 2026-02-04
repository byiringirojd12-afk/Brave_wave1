import bcrypt from "bcryptjs";
import { connectToDB } from "../_db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const { name, email, password, gender, username } = req.body;

    if (!name || !email || !password || !gender) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const db = await connectToDB();
    const users = db.collection("users");

    const cleanEmail = email.toLowerCase().trim();
    const finalUsername = username ? username.toLowerCase().trim() : cleanEmail.split("@")[0];

    // Check if email or username exists
    const exists = await users.findOne({ 
      $or: [{ email: cleanEmail }, { username: finalUsername }] 
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: exists.email === cleanEmail ? "Email is already taken" : "Username is already taken"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name: name.trim(),
      email: cleanEmail,
      username: finalUsername,
      password: hashedPassword,
      gender,
      role: "student",
      createdAt: new Date()
    };

    const result = await users.insertOne(newUser);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: result.insertedId,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
}
