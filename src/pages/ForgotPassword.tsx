import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    // Simulate sending reset link
    const storedEmail = localStorage.getItem("email");
    if (storedEmail !== email) {
      setError("Email not found");
      return;
    }

    setMessage("Password reset link sent to your email!");
    setTimeout(() => navigate("/login"), 3000);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "300px",
          padding: "2rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h2>Forgot Password</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "0.5rem" }}
        />

        <button type="submit" style={{ padding: "0.5rem", cursor: "pointer" }}>
          Send Reset Link
        </button>

        <p style={{ textAlign: "center" }}>
          Remember your password?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Sign In
          </span>
        </p>
      </form>
    </div>
  );
}
