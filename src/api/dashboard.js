import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {});

// User schema
const userSchema = new mongoose.Schema({
  name: String,
  role: { type: String, default: "student" },
  progress: { type: Map, of: Boolean, default: {} },
  timeSpent: { type: Number, default: 0 },
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// GET dashboard
app.get("/api/dashboard", authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({
    name: user.name,
    role: user.role,
    progress: Object.fromEntries(user.progress),
    timeSpent: user.timeSpent,
  });
});

// POST update name / progress (optional)
app.post("/api/getUserProgress", authMiddleware, async (req, res) => {
  const { updateProfile, name } = req.body;
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (updateProfile && name) {
    user.name = name;
  }
  await user.save();
  res.json({ success: true });
});

// POST complete a lesson
app.post("/api/completeLesson", authMiddleware, async (req, res) => {
  const { lessonId } = req.body;
  if (!lessonId) return res.status(400).json({ message: "Lesson ID required" });

  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  // Mark lesson as done
  user.progress.set(String(lessonId), true);

  // Optional: update timeSpent (example)
  if (req.body.timeSpent) user.timeSpent += req.body.timeSpent;

  await user.save();
  res.json({ success: true, progress: Object.fromEntries(user.progress) });
});

app.listen(process.env.PORT || 5000, () => console.log("Server running"));