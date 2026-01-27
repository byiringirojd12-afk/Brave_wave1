import { useState } from "react";
import Login from "./Login";
import "../index.css";
import Register from "./Register";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);

  const topics = [
    { title: "Cisco Networking Academy_ Introduction to Cybersecurity" },
    { title: "Cisco Networking Academy_Ethical_Hacker_certificate" },
    { title: "Internet Society_Internet Governance" },
    { title: "Internet Society_What the Internet Needs to Exist" },
  ];

  return (
    <div>
      {/* Navigation */}
      <nav>
        <div className="logo">
          <div>
            <div />
          </div>
          <h1 className="text-2xl font-bold italic">BRAVE WAVE</h1>
        </div>

        <div>
          <a href="#">About</a>
          <a href="#">Courses</a>
          <a
            href="#"
            className="button"
            onClick={(e) => {
              e.preventDefault();
              setShowLogin(true);
            }}
          >
            Sign In / Register
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2>Learn digital skills for the modern world</h2>
          <p>
            Explore structured lessons and practical knowledge to master
            digital skills in the world of IT — learn at your own pace.
          </p>
          <button onClick={() => setShowLogin(true)}>
            Start Learning
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="hero-illustration"
        >
          [ Learning is the key]
        </motion.div>
      </section>

      {/* Learning Topics */}
      <div className="services-header">
        <h3>Learning Topics</h3>
        <p>
          Choose a topic and start building real-world digital skills.
        </p>
      </div>

      <div className="services-grid">
        {topics.map((topic, index) => (
          <div
            key={index}
            className="service-card"
            onClick={() => setShowLogin(true)}
          >
            <h4>{topic.title}</h4>
            <a href="#">
              <span>→</span> Start lesson
            </a>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <strong>BRAVE WAVE</strong>
            <p>
              A learning platform for mastering digital skills through
              structured education.
            </p>
          </div>

          <div className="footer-links">
            <a href="#">About</a>
            <a href="#">Courses</a>
            <a href="#">Support</a>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Brave Wave. All rights reserved.
        </div>
      </footer>

      {/* Login / Register Modal */}
      <AnimatePresence>
        {showLogin && (
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
            <Login onClose={() => setShowLogin(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
