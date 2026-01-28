import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import "../index.css";

export default function Home() {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const topics = [
    { title: "Cisco Networking Academy: Introduction to Cybersecurity" },
    { title: "Cisco Networking Academy: Ethical Hacker Certificate" },
    { title: "Internet Society: Internet Governance" },
    { title: "Internet Society: What the Internet Needs to Exist" },
  ];

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="px-6 py-4 flex justify-between items-center bg-white shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black flex justify-center items-center rounded-sm">
            <div className="w-3 h-3 bg-green-400 rotate-45"></div>
          </div>
          <h1 className="text-2xl font-bold italic">BRAVE WAVE</h1>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/about" className="hover:text-green-400 transition">About</Link>
          <Link to="/support" className="hover:text-green-400 transition">Support</Link>
          <button
            className="px-4 py-2 bg-green-400 text-white rounded-lg font-semibold hover:bg-green-500 transition"
            onClick={() => { setAuthMode("login"); setShowAuth(true); }}
          >
            Sign In / Register
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero px-6 py-16 flex flex-col md:flex-row md:justify-between md:items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:w-1/2"
        >
          <h2 className="text-4xl font-bold mb-4">Learn digital skills for the modern world</h2>
          <p className="text-gray-700 mb-6 max-w-md">
            Explore structured lessons and practical knowledge to master digital skills in IT — learn at your own pace.
          </p>
          <div className="flex gap-4">
            <button
              className="px-6 py-3 bg-green-400 text-white font-semibold rounded-lg hover:bg-green-500 transition"
              onClick={() => { setAuthMode("login"); setShowAuth(true); }}
            >
              Start Learning
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="hero-illustration mt-6 md:mt-0 md:w-1/2 flex justify-center items-center bg-gray-200 rounded-xl border border-black shadow-lg h-56"
        >
          Learning is the key
        </motion.div>
      </section>

      {/* Learning Topics */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <div className="services-header mb-6">
          <h3 className="text-2xl font-bold">Learning Topics</h3>
          <p className="text-gray-700">
            Choose a topic and start building real-world digital skills.
          </p>
        </div>

        <div className="services-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="service-card p-6 bg-white rounded-xl shadow-md hover:shadow-lg cursor-pointer transition"
              onClick={() => { setAuthMode("login"); setShowAuth(true); }}
            >
              <h4 className="text-xl font-semibold mb-2">{topic.title}</h4>
              <a
                href="#"
                className="flex items-center gap-2 font-bold text-gray-900 hover:text-green-400 transition"
                onClick={(e) => { e.preventDefault(); setAuthMode("login"); setShowAuth(true); }}
              >
                <span className="inline-block w-6 h-6 bg-black text-green-400 flex justify-center items-center rounded-full transition">→</span>
                Start lesson
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer bg-white py-8 mt-12 shadow-inner">
        <div className="footer-content max-w-6xl mx-auto flex justify-between items-start flex-wrap gap-6">
          <div className="footer-brand">
            <strong>BRAVE WAVE</strong>
            <p>A learning platform for mastering digital skills through structured education.</p>
          </div>
          <div className="footer-links flex gap-6">
            <Link to="/about" className="hover:text-green-400 transition">About</Link>
            <Link to="/support" className="hover:text-green-400 transition">Support</Link>
          </div>
        </div>
        <div className="footer-bottom text-center text-gray-600 mt-4">
          © {new Date().getFullYear()} Brave Wave. All rights reserved.
        </div>
      </footer>

      {/* Login / Register Modal */}
      <AnimatePresence>
        {showAuth && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 50,
            }}
          >
            {authMode === "login" ? (
              <Login
                onClose={() => setShowAuth(false)}
                switchToRegister={() => setAuthMode("register")}
              />
            ) : (
              <Register
                onClose={() => setShowAuth(false)}
                switchToLogin={() => setAuthMode("login")}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
