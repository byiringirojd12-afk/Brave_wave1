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
  const [identifier, setIdentifier] = useState(""); // email or username
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Strong password validation for registration
  const isStrongPassword = (pwd: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(pwd);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // ✅ Frontend validation for registration
    if (mode === "register") {
      if (!name || !gender || !identifier || !password || !confirmPassword) {
        setError("All fields are required ❌");
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match ❌");
        setLoading(false);
        return;
      }
      if (!isStrongPassword(password)) {
        setError(
          "Password must be 8+ chars, uppercase, number & symbol ❌"
        );
        setLoading(false);
        return;
      }
    }

    try {
      const endpoint =
        mode === "register" ? "/api/auth/register" : "/api/auth/login";

      const payload =
        mode === "register"
          ? {
              name,
              email: identifier.toLowerCase().trim(),
              password,
              gender,
            }
          : {
              email: identifier.toLowerCase().trim(),
              password,
            };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      if (mode === "register") {
        alert("Account created successfully! You can now login.");
        setMode("login");
        setIdentifier("");
        setPassword("");
        setConfirmPassword("");
        setName("");
        setGender("");
      } else {
        // ✅ Remember Me handling
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("token", data.token);
        localStorage.setItem("name", data.user?.name || "User");
        localStorage.setItem("role", data.user?.role || "student");

        navigate("/dashboard", { replace: true });
        onClose?.();
      }
    } catch (err: any) {
      setError(err.message || "Unexpected server error ❌");
    } finally {
      setLoading(false);
    }
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
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </>
        )}

        <input
          type="text"
          placeholder={mode === "login" ? "Email or Username" : "Email Address"}
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
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
          <span
            className="toggle-pass"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {mode === "register" && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        )}

        {mode === "login" && (
          <div className="login-extra">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember Me
            </label>
            <span
              className="forgot-password"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </span>
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Register"}
        </button>

        <div className="login-switch">
          <p>
            {mode === "login" ? "New here?" : "Already a member?"}{" "}
            <span
              onClick={() => {
                setMode(mode === "login" ? "register" : "login");
                setError("");
              }}
            >
              {mode === "login" ? "Create account" : "Sign in"}
            </span>
          </p>
        </div>
      </motion.form>
    </div>
  );
}
