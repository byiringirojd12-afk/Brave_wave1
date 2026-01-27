import React from 'react';  // Optional if needed based on your React version
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword'; 
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define the different routes and which component should be rendered */}
        <Route path="/" element={<Home />} /> {/* Default Home Page */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
