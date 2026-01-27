// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Routing for other pages */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Default Home Page */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
