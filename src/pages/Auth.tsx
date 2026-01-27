import { useState } from "react";
import { motion } from "framer-motion";
import { apiRequest } from "../services/api";

export default function Auth({ onClose }: { onClose?: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
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
      if (!email || !password || (!isLogin && !name)) {
        setError("Please fill in all required fields");
        setIsLoading(false);
        return;
      }

      if (!isLogin && password !== confirmPassword) {
        setError("Passwords do not match");
        setIsLoading(false);
        return;
      }

      const endpoint = isLogin ? "/api/login" : "/api/register";
      const body = isLogin
        ? { email, password }
        : { name, email, password };

      const res = await apiRequest(endpoint, "POST", body);

      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("userRole", res.role || "student"); // student by default
        window.location.href = "/dashboard";
      } else if (res.error) {
        setError(res.error);
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="login-container">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        onSubmit={handleSubmit}
        className="login-form"
      >
        <h2>{isLogin ? "Sign In" : "Register"}</h2>

        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {!isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? <div className="spinner" /> : isLogin ? "Sign In" : "Register"}
        </button>

        <p style={{ marginTop: 12 }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Sign In"}
          </span>
        </p>
      </motion.form>
    </div>
  );
}
