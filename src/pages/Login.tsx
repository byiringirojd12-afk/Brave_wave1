import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Login.css";

interface LoginProps {
  onClose?: () => void;
}

export default function Login({ onClose }: LoginProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const isStrongPassword = (pwd: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(pwd);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    /* ---------- REGISTER ---------- */
    if (mode === "register") {
      if (storedEmail === email) {
        setError("This email is already registered");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      if (!isStrongPassword(password)) {
        setError(
          "Password must be 8+ chars with uppercase, lowercase, number & symbol"
        );
        return;
      }

      if (role === "instructor" && email !== "oishteen@gmail.com") {
        setError("Only Admin can register as instructor");
        return;
      }

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      localStorage.setItem("role", role);

      alert("Account created. Please login.");
      setMode("login");
      return;
    }

    /* ---------- LOGIN ---------- */
    if (email !== storedEmail || password !== storedPassword) {
      setError("Invalid credentials");
      return;
    }

    const token = crypto.randomUUID();

    if (rememberMe) {
      localStorage.setItem("token", token);
    } else {
      sessionStorage.setItem("token", token);
    }

    navigate("/dashboard", { replace: true });
    onClose?.();
  };

  return (
    <div className="login-container">
      <motion.form
        className="login-form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
      >
        <h2>{mode === "login" ? "Welcome Back" : "Create Account"}</h2>

        {error && <div className="login-error">{error}</div>}

        {mode === "register" && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {mode === "register" && (
          <>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          </>
        )}

        {mode === "login" && (
          <label className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember Me
          </label>
        )}

        <button type="submit">
          {mode === "login" ? "Sign In" : "Register"}
        </button>

        <div className="login-switch">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <span onClick={() => setMode("register")}>Register</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={() => setMode("login")}>Sign In</span>
            </>
          )}
        </div>
      </motion.form>
    </div>
  );
}
