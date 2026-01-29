import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";

export default function Home() {
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  /* Prevent logged-in users from staying on home */
  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const topics = [
    { title: "Cisco Networking Academy: Introduction to Cybersecurity" },
    { title: "Cisco Networking Academy: Ethical Hacker Certificate" },
    { title: "Internet Society: Internet Governance" },
    { title: "Internet Society: What the Internet Needs to Exist" },
  ];

  return (
    <div className="App">
      {/* NAV */}
      <nav className="px-6 py-4 flex justify-between items-center bg-white shadow-md">
        <h1 className="text-2xl font-bold italic">BRAVE WAVE</h1>
        <button
          className="px-4 py-2 bg-green-400 text-white rounded-lg"
          onClick={() => setShowAuth(true)}
        >
          Sign In / Register
        </button>
      </nav>

      {/* HERO */}
      <section className="px-6 py-16">
        <h2 className="text-4xl font-bold mb-4">
          Learn digital skills for the modern world
        </h2>
        <button
          className="px-6 py-3 bg-green-400 text-white rounded-lg"
          onClick={() => setShowAuth(true)}
        >
          Start Learning
        </button>
      </section>

      {/* TOPICS */}
      <section className="px-6 py-12">
        {topics.map((t, i) => (
          <div
            key={i}
            className="p-6 bg-white rounded-xl shadow mb-4 cursor-pointer"
            onClick={() => setShowAuth(true)}
          >
            {t.title}
          </div>
        ))}
      </section>

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
