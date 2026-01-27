// AdminUsers.js (Admin Users Page)

import React, { useState, useEffect } from "react";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch users when the component mounts
  useEffect(() => {
    // Get the JWT token from localStorage (assuming the user is logged in)
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("You must be logged in to view this page");
      setLoading(false);
      return;
    }

    // Fetch the list of users from the backend
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Send the token to the backend for authentication
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data); // Save the users data to state
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch users");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // If the data is loading, display a loading message
  if (loading) return <div>Loading...</div>;

  // If there's an error, display the error message
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Registered Users</h1>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <p>{user.username}</p>
              <p>{user.email}</p>
              <p>Joined: {new Date(user.dateJoined).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminUsers;
