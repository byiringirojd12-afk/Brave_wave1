import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

export default function Home() {
  const [showAuth, setShowAuth] = useState(false);
  const [username, setUsername] = useState(""); // store real username
  const navigate = useNavigate();

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 600], [0, -150]);

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const storedUsername = localStorage.getItem("username") || "";

    if (token) {
      setUsername(storedUsername); // store username in state
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const topics = [
    "Cisco Networking Academy: Introduction to Cybersecurity",
    "Cisco Networking Academy: Ethical Hacker Certificate",
    "Internet Society: Internet Governance",
    "Internet Society: What the Internet Needs to Exist",
  ];

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, rotateX: 20 },
    show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div style={{ overflowX: "hidden", position: "relative" }}>
      {/* FLOATING GRADIENT BACKGROUND */}
      <motion.div
        style={{
          position: "fixed",
          top: "-200px",
          left: "-200px",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, #2563eb, transparent 70%)",
          filter: "blur(120px)",
          zIndex: -1,
        }}
        animate={{ x: [0, 100, -100, 0], y: [0, 50, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      <motion.div
        style={{
          position: "fixed",
          bottom: "-200px",
          right: "-200px",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, #06b6d4, transparent 70%)",
          filter: "blur(120px)",
          zIndex: -1,
        }}
        animate={{ x: [0, -100, 100, 0], y: [0, -50, 50, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
      />

      {/* NAV */}
      <nav>
        <strong>BRAVE WAVE</strong>
        <button onClick={() => setShowAuth(true)}>Sign In / Register</button>
      </nav>

      {/* HERO */}
      <section className="hero" style={{ position: "relative" }}>
        <motion.div style={{ y: yParallax }}>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {username ? `Welcome back, ${username}!` : "Learn digital skills for the modern world"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Structured lessons designed to help you master cybersecurity
            and internet technologies at your own pace.
          </motion.p>

          {/* GLOWING CTA */}
          <motion.button
            onClick={() => setShowAuth(true)}
            whileHover={{ scale: 1.08 }}
            animate={{
              boxShadow: ["0 0 0px #2563eb", "0 0 25px #2563eb", "0 0 0px #2563eb"],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              padding: "12px 30px",
              borderRadius: "30px",
              border: "none",
              background: "#2563eb",
              color: "#fff",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            Start Learning
          </motion.button>
        </motion.div>

        {/* WAVE SVG BACKGROUND */}
        <motion.div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            zIndex: -1,
          }}
          animate={{ x: [0, -100, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        >
          <svg viewBox="0 0 1440 320">
            <path
              fill="#2563eb"
              fillOpacity="0.3"
              d="M0,160L60,170C120,180,240,200,360,186.7C480,173,600,127,720,122.7C840,117,960,149,1080,160C1200,171,1320,160,1380,154.7L1440,149V320H0Z"
            ></path>
          </svg>
        </motion.div>
      </section>

      {/* COURSES */}
      <section className="services">
        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {topics.map((title, i) => (
            <motion.div
              key={i}
              className="service-card"
              variants={cardVariants}
              whileHover={{
                y: -12,
                scale: 1.05,
                boxShadow: "0px 20px 40px rgba(37,99,235,0.3)",
              }}
              style={{
                perspective: 1000,
                padding: "20px",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(12px)",
                cursor: "pointer",
              }}
              onClick={() => setShowAuth(true)}
            >
              <motion.div
                animate={{ rotate: [0, 2, -2, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <h4>{title}</h4>
              </motion.div>

              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                → Start lesson
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
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