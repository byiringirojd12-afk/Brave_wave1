import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";

import Lesson1 from "./pages/Lesson1";
import Lesson2 from "./pages/Lesson2";
import Lesson3 from "./pages/Lesson3";
import Lesson4 from "./pages/Lesson4";

import AdminUsers from "./components/AdminUsers";
import InstructorAnalytics from "./pages/InstructorAnalytics";

import RoleRoute from "./components/RoleRoute";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Student Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Lessons with Scroll Tracking */}
        <Route path="/dashboard/lesson1" element={<Lesson1 />} />
        <Route path="/dashboard/lesson2" element={<Lesson2 />} />
        <Route path="/dashboard/lesson3" element={<Lesson3 />} />
        <Route path="/dashboard/lesson4" element={<Lesson4 />} />

        {/* Instructor Analytics (Instructor + Admin) */}
        <Route
          path="/analytics"
          element={
            <RoleRoute allowedRoles={["instructor", "admin"]}>
              <InstructorAnalytics />
            </RoleRoute>
          }
        />

        {/* Admin Users Page (Admin Only) */}
        <Route
          path="/admin-users"
          element={
            <RoleRoute allowedRoles={["admin"]}>
              <AdminUsers />
            </RoleRoute>
          }
        />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
