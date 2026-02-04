import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const lessons = [
  { id: 1, title: "Intro to Cybersecurity", category: "Basics" },
  { id: 2, title: "Ethical Hacking", category: "Offensive" },
  { id: 3, title: "Internet Governance", category: "Policy" },
  { id: 4, title: "How the Internet Works", category: "Infrastructure" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  // State
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("Student");
  const [role, setRole] = useState("student");
  const [progress, setProgress] = useState({});
  const [timeSpent, setTimeSpent] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch Dashboard data
  const loadStats = useCallback(async () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true });
      return;
    }

    try {
      const res = await fetch("/api/getUserProgress", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch");

      setName(data.name || "Student");
      setRole(data.role || "student");
      setProgress(data.progress || {});
      setTimeSpent(data.timeSpent || 0);
    } catch (err) {
      console.error("Dashboard Sync Error:", err);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Update name
  const updateName = async (newName: string) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!newName.trim() || !token) return;

    setName(newName); // Optimistic UI

    try {
      const res = await fetch("/api/getUserProgress", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updateProfile: true, name: newName }),
      });
      if (!res.ok) throw new Error("Failed to update name");
    } catch (err) {
      console.error("Failed to save name:", err);
    }
  };

  useEffect(() => {
    loadStats();
    window.addEventListener("focus", loadStats);
    return () => window.removeEventListener("focus", loadStats);
  }, [loadStats]);

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/", { replace: true });
  };

  // Stats
  const completedCount = Object.keys(progress).filter(k => progress[k]).length;
  const percent = Math.round((completedCount / lessons.length) * 100);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  if (loading) return (
    <div style={styles.loadingScreen}>
      <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }}>
        Establishing Secure Connection...
      </motion.div>
    </div>
  );

  return (
    <div style={styles.layout}>
      <button style={styles.menuBtn} onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? "✕" : "☰"}
      </button>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              style={styles.backdrop}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25 }}
              style={styles.sidebar}
            >
              <div style={{ padding: "25px" }}>
                <div style={styles.logoRow}>
                  <div style={styles.logoBox}><div style={styles.logoDiamond} /></div>
                  <h2 style={styles.logoText}>BRAVE WAVE</h2>
                </div>

                <div style={styles.profileSection}>
                  <div style={styles.avatar}>{name.charAt(0).toUpperCase()}</div>

                  {editing ? (
                    <input
                      autoFocus
                      style={styles.nameInput}
                      value={name}
                      onChange={e => setName(e.target.value)}
                      onBlur={() => { setEditing(false); updateName(name); }}
                      onKeyDown={e => { if (e.key === "Enter") { setEditing(false); updateName(name); } }}
                    />
                  ) : (
                    <h3 style={styles.profileName} onClick={() => setEditing(true)}>
                      {name} <span style={{ fontSize: "0.8rem", opacity: 0.4 }}>✎</span>
                    </h3>
                  )}

                  <p style={styles.profileRole}>{role.toUpperCase()}</p>
                </div>

                <nav style={styles.sideNav}>
                  <button style={styles.sideLinkActive} onClick={() => setSidebarOpen(false)}>📚 My Courses</button>
                  <button style={styles.sideLink} onClick={() => navigate("/analytics")}>📈 Analytics</button>
                </nav>

                <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main style={{ ...styles.main, marginLeft: sidebarOpen ? 280 : 0 }}>
        <header style={{ marginBottom: 40 }}>
          <h1 style={styles.h1}>Learning Velocity</h1>
          <p style={styles.subtitle}>Verified curriculum progress for <strong>{name}</strong>.</p>
        </header>

        <div style={styles.cardsGrid}>
          <AnalyticsCard title="Completion" value={`${percent}%`} sub="Total syllabus" color="#22c55e" />
          <AnalyticsCard title="Active Time" value={formatTime(timeSpent)} sub="Learning effort" color="#8b5cf6" />
          <AnalyticsCard title="Status" value={percent === 100 ? "Elite" : "Active"} sub="Current Rank" color="#f59e0b" />
        </div>

        <section style={styles.panel}>
          <div style={styles.panelHeader}>
            <h2 style={styles.panelTitle}>Course Modules</h2>
            <span style={styles.panelCounter}>{completedCount} of {lessons.length} finished</span>
          </div>

          <div style={styles.progressBarBg}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={styles.progressFill}
            />
          </div>

          <div style={styles.lessonList}>
            {lessons.map(l => {
              const isDone = progress[String(l.id)];
              return (
                <div key={l.id} style={styles.lessonRow}>
                  <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                    <div style={{
                      width: 12, height: 12, borderRadius: "50%",
                      background: isDone ? "#22c55e" : "#e2e8f0",
                      boxShadow: isDone ? "0 0 12px rgba(34, 197, 94, 0.4)" : "none",
                      transition: "all 0.3s ease"
                    }} />
                    <div>
                      <Link to={`/dashboard/lesson${l.id}`} style={styles.lessonLink}>{l.title}</Link>
                      <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{l.category}</div>
                    </div>
                  </div>
                  <span style={{
                    fontSize: "0.8rem",
                    fontWeight: 800,
                    color: isDone ? "#22c55e" : "#94a3b8",
                    letterSpacing: "0.5px"
                  }}>
                    {isDone ? "DONE" : "LOCKED"}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {percent === 100 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={styles.certCard}>
            <div style={{ fontSize: "2rem" }}>🎓</div>
            <div>
              <h4 style={{ margin: 0, fontSize: "1.1rem" }}>Credential Unlocked</h4>
              <p style={{ margin: 0, fontSize: "0.85rem", opacity: 0.8 }}>Professional Cybersecurity Foundations</p>
            </div>
            <button onClick={() => navigate("/download-certificate")} style={styles.downloadBtn}>Download PNG</button>
          </motion.div>
        )}
      </main>
    </div>
  );
}

function AnalyticsCard({ title, value, sub, color }) {
  return (
    <div style={{ ...styles.card, borderTop: `4px solid ${color}` }}>
      <h3 style={styles.cardTitle}>{title}</h3>
      <div style={styles.cardValue}>{value}</div>
      <div style={styles.cardSub}>{sub}</div>
    </div>
  );
}

// ... keep your `styles` object from before unchanged


const styles = {
  layout: { display: 'flex', minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif' },
  backdrop: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 80 },
  menuBtn: { position: 'fixed', top: 25, left: 25, zIndex: 100, background: '#0f172a', color: 'white', border: 'none', borderRadius: '50%', width: 45, height: 45, cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  sidebar: { position: 'fixed', width: 280, height: '100%', background: '#0f172a', color: 'white', zIndex: 90, boxShadow: '10px 0 40px rgba(0,0,0,0.15)' },
  logoRow: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 },
  logoBox: { width: 32, height: 32, background: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 6 },
  logoDiamond: { width: 14, height: 14, background: '#22c55e', transform: 'rotate(45deg)' },
  logoText: { fontSize: '1.2rem', fontWeight: 900, letterSpacing: '1px', margin: 0 },
  profileSection: { textAlign: 'center', marginBottom: 40, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 30 },
  avatar: { width: 64, height: 64, background: '#3b82f6', borderRadius: '50%', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 800, color: 'white' },
  profileName: { fontSize: '1.1rem', fontWeight: 700, margin: '0 0 5px 0', color: 'white', cursor: 'pointer' },
  nameInput: { background: 'rgba(255,255,255,0.1)', border: '1px solid #3b82f6', color: 'white', padding: '5px', borderRadius: '5px', textAlign: 'center', fontSize: '1rem', width: '80%', marginBottom: '5px', outline: 'none' },
  profileRole: { fontSize: '0.75rem', opacity: 0.5, fontWeight: 600, letterSpacing: '1px' },
  sideNav: { display: 'flex', flexDirection: 'column', gap: 8 },
  sideLink: { background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.7)', textAlign: 'left', padding: '12px 15px', borderRadius: 10, cursor: 'pointer', fontSize: '0.95rem', fontWeight: 500 },
  sideLinkActive: { background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', textAlign: 'left', padding: '12px 15px', borderRadius: 10, cursor: 'pointer', fontSize: '0.95rem', fontWeight: 600 },
  logoutBtn: { width: '80%', margin: '50px auto 0', background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid #ef4444', padding: '12px', borderRadius: 10, cursor: 'pointer', fontWeight: 700, display: 'block' },
  main: { flex: 1, padding: '100px 50px', transition: 'margin 0.35s ease' },
  h1: { fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: 10 },
  subtitle: { color: '#64748b', fontSize: '1.1rem' },
  cardsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 25, marginBottom: 50 },
  card: { background: 'white', padding: 25, borderRadius: 20, boxShadow: '0 10px 25px rgba(0,0,0,0.03)' },
  cardTitle: { fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 },
  cardValue: { fontSize: '2.2rem', fontWeight: 900, color: '#0f172a' },
  cardSub: { fontSize: '0.85rem', color: '#64748b' },
  panel: { background: 'white', padding: 35, borderRadius: 24, boxShadow: '0 20px 50px rgba(0,0,0,0.04)' },
  panelHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  panelTitle: { fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 },
  panelCounter: { fontSize: '0.9rem', color: '#64748b' },
  progressBarBg: { height: 10, background: '#f1f5f9', borderRadius: 20, marginBottom: 35, overflow: 'hidden' },
  progressFill: { height: '100%', background: 'linear-gradient(90deg, #3b82f6, #22c55e)' },
  lessonList: { display: 'flex', flexDirection: 'column' },
  lessonRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', borderBottom: '1px solid #f1f5f9' },
  lessonLink: { textDecoration: 'none', color: '#0f172a', fontWeight: 700 },
  certCard: { marginTop: 40, background: '#0f172a', color: 'white', padding: '25px 30px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 25 },
  downloadBtn: { marginLeft: 'auto', background: '#22c55e', border: 'none', padding: '12px 20px', borderRadius: 10, color: '#0f172a', fontWeight: 800, cursor: 'pointer' },
  loadingScreen: { display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif', color: '#64748b', background: '#f8fafc' }
};