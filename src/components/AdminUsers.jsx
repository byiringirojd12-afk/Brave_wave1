import React, { useState, useEffect } from "react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
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

    const fetchUsers = async () => {
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

    fetchUsers();
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: "40px" }}>
      <h1>Instructor Analytics Dashboard</h1>

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        users.map((user, index) => (
          <div key={index} style={{
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "10px"
          }}>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Completed Lessons:</strong> {user.progress?.length || 0}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminUsers;
