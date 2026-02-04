import bcrypt from "bcryptjs";
import { connectToDB } from "../_db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, password, gender } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const db = await connectToDB();
    const users = db.collection("users");

    const exists = await users.findOne({
      email: email.toLowerCase().trim(),
    });

    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await users.insertOne({
      name,
      email: email.toLowerCase().trim(),
      password: hashed,
      gender,
      role: "student", // 🔒 cannot self-assign admin
      createdAt: new Date(),
    });

    return res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
