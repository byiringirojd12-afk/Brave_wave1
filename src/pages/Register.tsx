import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    // Get existing users
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Check if email exists
    if (users.find((u: any) => u.email === email)) {
      return alert("Email already registered");
    }

    // Add new user
    const newUser = { name, email, password, role };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Save token & current user
    localStorage.setItem("token", Math.random().toString(36).substr(2));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    navigate("/dashboard");
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister} className="register-form">
        <h2>Register</h2>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
