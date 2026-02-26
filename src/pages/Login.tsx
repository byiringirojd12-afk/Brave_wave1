import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Login.css";
import supabase from "../supabaseClient";

interface LoginProps {
  onClose?: () => void;
}

// Lessons array
const lessons = [
  { id: 1, title: "Intro to Cybersecurity" },
  { id: 2, title: "Ethical Hacking" },
  { id: 3, title: "Internet Governance" },
  { id: 4, title: "How the Internet Works" },
];

export default function Login({ onClose }: LoginProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const isStrongPassword = (pwd: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(pwd);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // =========================
      // REGISTER
      // =========================
      if (mode === "register") {
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

        const email = identifier.toLowerCase().trim();

        // Check if username or email already exists
        const { data: existingUsers, error: checkError } = await supabase
          .from("users")
          .select("user_id")
          .or(`username.eq.${username},email.eq.${email}`);

        if (checkError) {
          setError(checkError.message);
          setLoading(false);
          return;
        }

        if (existingUsers && existingUsers.length > 0) {
          setError("Username or Email already exists ❌");
          setLoading(false);
          return;
        }

        // Create user in Supabase Auth
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError || !signUpData.user) {
          setError(signUpError?.message || "Registration failed ❌");
          setLoading(false);
          return;
        }

        // Insert extra user info
        const { error: insertError } = await supabase.from("users").insert([
          {
            user_id: signUpData.user.id,
            username,
            email,
            gender,
            role: "student",
          },
        ]);

        if (insertError) {
          setError(insertError.message);
          setLoading(false);
          return;
        }

        // Initialize user_progress safely
        const { error: progressError } = await supabase
          .from("user_progress")
          .upsert(
            lessons.map((lesson) => ({
              user_id: signUpData.user.id,
              lesson_id: lesson.id,
              completed: false,
            })),
            { onConflict: ["user_id", "lesson_id"] }
          );

        if (progressError) {
          console.error("Failed to initialize user_progress:", progressError.message);
        }

        alert("✅ Account created successfully! Please login.");
        setMode("login");
        setUsername("");
        setIdentifier("");
        setPassword("");
        setConfirmPassword("");
        setGender("");
      }

      // =========================
      // LOGIN
      // =========================
      else {
        if (!identifier || !password) {
          setError("Please enter username/email and password ❌");
          setLoading(false);
          return;
        }

        const input = identifier.toLowerCase().trim();

        // Find user by username OR email
        const { data: users, error: fetchError } = await supabase
          .from("users")
          .select("*")
          .or(`username.eq.${input},email.eq.${input}`);

        if (fetchError) {
          setError(fetchError.message);
          setLoading(false);
          return;
        }

        if (!users || users.length === 0) {
          setError("User not found ❌");
          setLoading(false);
          return;
        }

        const userRecord = users[0];

        // Login with Supabase Auth
        const { data: loginData, error: loginError } =
          await supabase.auth.signInWithPassword({
            email: userRecord.email,
            password,
          });

        if (loginError || !loginData.session) {
          setError("Invalid credentials ❌");
          setLoading(false);
          return;
        }

        // Redirect to dashboard
        navigate("/dashboard", { replace: true });
        onClose?.();
      }
    } catch (err: any) {
      setError(err.message || "Unexpected error ❌");
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
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          placeholder={mode === "login" ? "Email or Username" : "Email"}
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
          <span onClick={() => setShowPassword(!showPassword)}>
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
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember Me
          </label>
        )}

        <button type="submit" disabled={loading}>
          {loading
            ? "Please wait..."
            : mode === "login"
            ? "Sign In"
            : "Register"}
        </button>

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
      </motion.form>
    </div>
  );
}