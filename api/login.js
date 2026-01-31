import jwt from "jsonwebtoken";

const SECRET = "MY_SECRET_KEY";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, role } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  const token = jwt.sign(
    { email, role: role || "student" },
    SECRET,
    { expiresIn: "7d" }
  );

  res.status(200).json({ token, role });
}
