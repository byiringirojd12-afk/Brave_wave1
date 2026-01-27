import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Login.css";

export default function AuthForm() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "register" && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const token = Math.random().toString(36).substr(2);

      if (mode === "register") {
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        localStorage.setItem("role", role);
        localStorage.setItem("token", token);
        alert("Account created successfully!");
      } else {
        const storedEmail = localStorage.getItem("email");
        const storedPassword = localStorage.getItem("password");

        if (storedEmail !== email || storedPassword !== password) {
          setError("Invalid credentials");
          setIsLoading(false);
          return;
        }
      }

      if (rememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      navigate("/dashboard");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <motion.form
        className="login-form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
      >
        <h2>{mode === "login" ? "Welcome Back" : "Create Your Account"}</h2>
        {error && <div className="login-error">{error}</div>}

        {/* Name field only for register */}
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

        {/* Password field with toggle */}
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="show-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* Confirm password for register */}
        {mode === "register" && (
          <>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span
                className="show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          </>
        )}

        {/* Login options */}
        {mode === "login" && (
          <div className="login-options">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember Me
            </label>
            <span
              className="forgotPassword"
              onClick={() => navigate("/forgotPassword")}
              style={{ cursor: "pointer", color: "#007bff", marginLeft: "10px" }}
            >
              Forgot Password?
            </span>
          </div>
        )}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : mode === "login" ? "Sign In" : "Register"}
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
