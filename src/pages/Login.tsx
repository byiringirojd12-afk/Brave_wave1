import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Login.css";

interface AuthFormProps {
  onClose?: () => void;
}

export default function AuthForm({ onClose }: AuthFormProps) {
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

  // Simple strong password check
  const isStrongPassword = (pwd: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(pwd);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const storedEmail = localStorage.getItem("email");

    // Prevent duplicate registration
    if (mode === "register" && storedEmail === email) {
      setError("This email is already registered");
      return;
    }

    if (mode === "register") {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      if (!isStrongPassword(password)) {
        setError(
          "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
        );
        return;
      }

      // Only allow instructor for specific email
      if (role === "instructor" && email !== "oishteen@gmail.com") {
        setError("Only Admin can register as instructor");
        return;
      }

      // Save registration
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      localStorage.setItem("role", role);

      alert("Account created successfully! Please log in.");
      setMode("login"); // Redirect to login after register
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      return;
    }

    // Login
    const storedPassword = localStorage.getItem("password");

    if (storedEmail !== email || storedPassword !== password) {
      setError("Invalid credentials");
      return;
    }

    // Set token
    const token = Math.random().toString(36).substring(2);
    if (rememberMe) localStorage.setItem("token", token);
    else sessionStorage.setItem("token", token);

    navigate("/dashboard");
    if (onClose) onClose();
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
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          </>
        )}

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
          </div>
        )}

        <button type="submit">
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
