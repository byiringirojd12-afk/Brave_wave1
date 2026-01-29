import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

export default function Home() {
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  /* Redirect logged-in users */
  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const topics = [
    "Cisco Networking Academy: Introduction to Cybersecurity",
    "Cisco Networking Academy: Ethical Hacker Certificate",
    "Internet Society: Internet Governance",
    "Internet Society: What the Internet Needs to Exist",
  ];

  return (
    <div>
      {/* NAV */}
      <nav>
        <div className="logo">
          <div>
            <div></div>
          </div>
          <strong>BRAVE WAVE</strong>
        </div>

        <button className="button" onClick={() => setShowAuth(true)}>
          Sign In / Register
        </button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div>
          <h2>Learn digital skills for the modern world</h2>
          <p>
            Structured lessons designed to help you master cybersecurity and
            internet technologies at your own pace.
          </p>
          <button onClick={() => setShowAuth(true)}>
            Start Learning
          </button>
        </div>

        <div className="hero-illustration">
          Learning is power
        </div>
      </section>

      {/* SERVICES */}
      <section className="services">
        <div className="services-header">
          <h3>Courses</h3>
          <p>Industry-recognized learning paths</p>
        </div>

        <div className="services-grid">
          {topics.map((title, i) => (
            <div
              key={i}
              className="service-card"
              onClick={() => setShowAuth(true)}
            >
              <h4>{title}</h4>
              <a href="#">
                <span>→</span> Start lesson
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <strong>BRAVE WAVE</strong>
            <p>
              A modern platform for mastering cybersecurity and digital skills.
            </p>
          </div>

          <div className="footer-links">
            <a href="#">About</a>
            <a href="#">Support</a>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Brave Wave. All rights reserved.
        </div>
      </footer>

      {/* AUTH MODAL */}
      <AnimatePresence>
        {showAuth && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 50,
            }}
          >
            <Login onClose={() => setShowAuth(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
