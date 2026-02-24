import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import "./Login.css";
import supabase from "../supabaseClient";

interface LoginProps {
  onClose?: () => void;
}

export default function Login({ onClose }: LoginProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [identifier, setIdentifier] = useState(""); // email or username for login
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Strong password validation
  const isStrongPassword = (pwd: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(pwd);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "register") {
        // Frontend validation for registration
        if (!username || !gender || !identifier || !password || !confirmPassword) {
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
          setError("Password must be 8+ chars, uppercase, number & symbol ❌");
          setLoading(false);
          return;
        }

        // Check if username or email already exists
        const { data: existingUser } = await supabase
          .from("users")
          .select("id")
          .or(`username.eq.${username},email.eq.${identifier}`)
          .limit(1)
          .single();

        if (existingUser) {
          setError("Username or Email already exists ❌");
          setLoading(false);
          return;
        }

        // Register with Supabase Auth
        const { data: registerData, error: registerError } = await supabase.auth.signUp({
          email: identifier.toLowerCase().trim(),
          password,
        });

        if (registerError || !registerData.user) {
          setError(registerError?.message || "Registration failed ❌");
          setLoading(false);
          return;
        }

        // Insert additional info (username, gender) into users table
        const { error: insertError } = await supabase.from("users").insert([
          {
            user_id: registerData.user.id,
            username,
            email: identifier.toLowerCase().trim(),
            gender,
          },
        ]);

        if (insertError) {
          setError(insertError.message || "Failed to save user data ❌");
          setLoading(false);
          return;
        }

        alert("✅ Account created! You can now login.");
        setMode("login");
        setUsername("");
        setIdentifier("");
        setPassword("");
        setConfirmPassword("");
        setGender("");
      } else {
        // Login with username or email
        if (!identifier || !password) {
          setError("Please enter username/email and password ❌");
          setLoading(false);
          return;
        }

        // Fetch email if identifier is a username
        let emailToLogin = identifier.toLowerCase().trim();
        const { data: userRecord, error: fetchError } = await supabase
          .from("users")
          .select("*")
          .or(`username.eq.${identifier},email.eq.${identifier}`)
          .limit(1)
          .single();

        if (fetchError || !userRecord) {
          setError("User not found ❌");
          setLoading(false);
          return;
        }

        emailToLogin = userRecord.email;

        // Sign in with Supabase Auth
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
          email: emailToLogin,
          password,
        });

        if (loginError || !loginData.session) {
          setError(loginError?.message || "Authentication failed ❌");
          setLoading(false);
          return;
        }

        // ✅ Store token and real user info
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("token", loginData.session.access_token);
        localStorage.setItem("username", userRecord.username);
        localStorage.setItem("email", userRecord.email);
        localStorage.setItem("role", userRecord.role || "student");

        // Navigate to dashboard
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

        {/* Registration Fields (without Full Name) */}
        {mode === "register" && (
          <>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <select value={gender} onChange={(e) => setGender(e.target.value)} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </>
        )}

        {/* Email/Username Field */}
        <input
          type="text"
          placeholder={mode === "login" ? "Email or Username" : "Email"}
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />

        {/* Password */}
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="toggle-pass" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* Confirm Password */}
        {mode === "register" && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        )}

        {/* Extra login options */}
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