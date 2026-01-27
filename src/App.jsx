// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword'; // Import your pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Register from './pages/Register';
import About from './components/About'; // Import About page
import Support from './components/Support'; // Import Support page
import AdminUsers from './components/AdminUsers'; // Import the AdminUsers component

function App() {
  return (
    <Router>
      <div className="App">
        {/* Add AdminUsers component on the dashboard route, or anywhere else */}
      
        {/* Routing for other pages */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Default Home Page */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} /> {/* About page route */}
          <Route path="/support" element={<Support />} /> {/* Support page route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;


