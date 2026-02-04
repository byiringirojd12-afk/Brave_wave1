import { useState } from "react";
import { motion } from "framer-motion";

export default function Auth({ onClose }: { onClose?: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [gender, setGender] = useState(""); // 🆕 Added Gender
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validation
      if (!email || !password || (!isLogin && (!name || !gender))) {
        throw new Error("Please fill in all fields");
      }
      if (!isLogin && password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // ⚠️ IMPORTANT: Ensure your backend files are in /api/auth/
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name, 
          email: email.toLowerCase().trim(), 
          password, 
          gender, 
          role: "student" 
        }),
      });

      // ✅ Read as text first to check if we accidentally got an HTML page
      const text = await response.text();
      
      if (text.startsWith("<!DOCTYPE")) {
        throw new Error("API Route not found. Check your folder structure!");
      }

      const res = text ? JSON.parse(text) : {};

      if (!response.ok) {
        throw new Error(res.message || "Server error occurred");
      }

      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("userRole", res.role || "student");
        window.location.href = "/dashboard";
      } else if (!isLogin) {
        alert("Registration successful! Please sign in.");
        setIsLogin(true);
      }
    } catch (err: any) {
      // This will now tell you EXACTLY what is wrong
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="login-container">
      <motion.form 
        onSubmit={handleSubmit} 
        className="login-form"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
      >
        <h2>{isLogin ? "Sign In" : "Create Account"}</h2>

        {error && <p style={{ color: "#ff4d4d", background: "#fff1f1", padding: "10px", borderRadius: "5px" }}>{error}</p>}

        {!isLogin && (
          <>
            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <select value={gender} onChange={(e) => setGender(e.target.value)} required style={{ padding: '10px', borderRadius: '5px' }}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </>
        )}

        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        {!isLogin && (
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        )}

        <button type="submit" disabled={isLoading} style={{ background: isLoading ? "#ccc" : "#000", color: "#fff", padding: "12px", cursor: "pointer" }}>
          {isLoading ? "Processing..." : isLogin ? "Sign In" : "Register"}
        </button>

        <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer", textAlign: "center", color: "blue" }}>
          {isLogin ? "Need an account? Register" : "Have an account? Sign In"}
        </p>
      </motion.form>
    </div>
  );
}