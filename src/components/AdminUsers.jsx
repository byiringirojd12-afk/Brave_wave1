import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDark, setIsDark] = useState(false);

  const theme = {
    bg: isDark ? "#020617" : "#F8FAFC",
    surface: isDark ? "#0F172A" : "#FFFFFF",
    text: isDark ? "#F8FAFC" : "#0F172A",
    sub: isDark ? "#94A3B8" : "#64748B",
    border: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.1)",
    accent: "#3B82F6",
    success: "#10B981",
    error: "#EF4444",
  };

  // Fetch users
  const fetchUsers = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      setError("You must be logged in");
      setLoading(false);
      return;
    }

    if (role !== "instructor") {
      setError("Access denied — Instructor only");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/getUsers");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        setError("Failed to fetch users");
      }
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Calculate total progress percentage
  const totalLessons = users.reduce(
    (acc, user) => acc + (user.progress?.length || 0),
    0
  );
  const maxLessons = users.length * 10; // Assuming 10 lessons per user
  const progressPercent = maxLessons > 0 ? (totalLessons / maxLessons) * 100 : 0;

  if (loading)
    return (
      <div style={{ color: theme.text, padding: "40px" }}>Loading users...</div>
    );
  if (error)
    return (
      <div style={{ color: theme.error, padding: "40px" }}>{error}</div>
    );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "40px",
        height: "100vh",
        background: theme.bg,
        color: theme.text,
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h1>Instructor Analytics Dashboard</h1>
        <button
          onClick={() => setIsDark(!isDark)}
          style={{
            padding: "8px 16px",
            borderRadius: "10px",
            border: `1px solid ${theme.border}`,
            background: theme.surface,
            color: theme.text,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
          {isDark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Overall Progress */}
      {users.length > 0 && (
        <div
          style={{
            marginBottom: "24px",
            padding: "16px",
            borderRadius: "12px",
            background: theme.surface,
            border: `1px solid ${theme.border}`,
          }}
        >
          <h4 style={{ margin: "0 0 8px 0", color: theme.sub }}>Total Progress</h4>
          <div
            style={{
              width: "100%",
              height: "12px",
              borderRadius: "6px",
              background: theme.border,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: "100%",
                background: theme.accent,
                borderRadius: "6px",
                transition: "0.3s",
              }}
            />
          </div>
          <span style={{ fontSize: "0.85rem", color: theme.sub, marginTop: "4px", display: "block" }}>
            {totalLessons} / {maxLessons} Lessons Completed
          </span>
        </div>
      )}

      {/* User List */}
      {users.length === 0 ? (
        <p style={{ color: theme.sub }}>No users found.</p>
      ) : (
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            paddingRight: "10px",
          }}
          className="custom-scroller"
        >
          {users.map((user) => (
            <div
              key={user.id || user.email}
              style={{
                border: `1px solid ${theme.border}`,
                background: theme.surface,
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "12px",
              }}
            >
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Completed Lessons:</strong> {user.progress?.length || 0}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Scrollbar */}
      <style>{`
        .custom-scroller::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scroller::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scroller::-webkit-scrollbar-thumb {
          background: rgba(100, 116, 139, 0.4);
          border-radius: 10px;
        }
        .custom-scroller::-webkit-scrollbar-thumb:hover {
          background: ${theme.accent};
        }
      `}</style>
    </div>
  );
};

export default AdminUsers;