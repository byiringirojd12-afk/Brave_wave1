// src/App.tsx

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
import NotFound from "./pages/NotFound"; // Optional: For 404 pages

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Dashboard and its lessons */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/lesson1" element={<Lesson1 />} />
        <Route path="/dashboard/lesson2" element={<Lesson2 />} />
        <Route path="/dashboard/lesson3" element={<Lesson3 />} />
        <Route path="/dashboard/lesson4" element={<Lesson4 />} />

        {/* 404 or Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
