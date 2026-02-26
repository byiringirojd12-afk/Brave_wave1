import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, LogOut, Menu, X, CheckCircle2, 
  Trophy, Activity, Radio, ChevronRight, 
  AlertTriangle, Lock, Cpu
} from "lucide-react";
import supabase from "../supabaseClient";

// --- Lessons Configuration ---
const lessons = [
  { id: 1, path: "/dashboard/lesson1", title: "Neural Network Defense", level: "Beginner", time: "15 min", category: "CYBER-AI" },
  { id: 2, path: "/dashboard/lesson2", title: "Infiltration Tactics", level: "Intermediate", time: "45 min", category: "OFFENSIVE" },
  { id: 3, path: "/dashboard/lesson3", title: "Digital Sovereignty", level: "Beginner", time: "20 min", category: "GOVERNANCE" },
  { id: 4, path: "/dashboard/lesson4", title: "Quantum Encryption", level: "Advanced", time: "60 min", category: "CRYPTOGRAPHY" },
];
export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Agent");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [completedLessonIds, setCompletedLessonIds] = useState<number[]>([]);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/", { replace: true }); return; }

      // Fetch username
      const { data: userData } = await supabase.from("users").select("username").eq("user_id", user.id).single();
      if (userData?.username) setUserName(userData.username);

      // Fetch progress
      let { data: progressData } = await supabase
        .from("user_progress")
        .select("lesson_id, completed")
        .eq("user_id", user.id);

      // Auto-create missing lessons
      const existingLessonIds = progressData?.map(p => p.lesson_id) || [];
      const missingLessons = lessons.filter(l => !existingLessonIds.includes(l.id));
      if (missingLessons.length) {
        await supabase.from("user_progress").upsert(
          missingLessons.map(l => ({ user_id: user.id, lesson_id: l.id, completed: false })),
          { onConflict: ["user_id", "lesson_id"] }
        );
        progressData = [...(progressData || []), ...missingLessons.map(l => ({ lesson_id: l.id, completed: false }))];
      }

      setCompletedLessonIds(progressData?.filter(p => p.completed).map(p => p.lesson_id) || []);
      setTimeout(() => setLoading(false), 800);
    };
    fetchData();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const completionPercentage = Math.round((completedLessonIds.length / lessons.length) * 100);

  if (loading) return (
    <div style={styles.loadingScreen}>
      <motion.div animate={{ rotate: [0, 360] }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
        <Cpu size={50} color="#3b82f6" />
      </motion.div>
      <p style={{ marginTop: 20, fontSize: '0.8rem', letterSpacing: 2, color: '#3b82f6' }}>INITIALIZING NEURAL LINK...</p>
    </div>
  );

  return (
    <div style={styles.appContainer}>
      <div style={styles.meshBg} />

      {/* Sidebar */}
      <motion.aside animate={{ width: sidebarOpen ? 280 : 85 }} style={styles.sidebar}>
        <div style={styles.sidebarBrand}>
          <div style={styles.logoHex}><Shield size={20} fill="#fff" /></div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={styles.brandName}>
                SENTINEL<span style={{ color: "#3b82f6" }}>_OS</span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <nav style={styles.navStack}>
          <p style={styles.navHeader}>{sidebarOpen ? "OPERATIONAL MODULES" : "•••"}</p>
          {lessons.map((lesson) => (
            <div key={lesson.id} onClick={() => navigate(lesson.path)} style={styles.navItem}>
              <div style={styles.navIconBox}>
                {completedLessonIds.includes(lesson.id) ? <CheckCircle2 size={18} color="#10b981" /> : <Radio size={18} color="#475569" />}
              </div>
              {sidebarOpen && <span style={styles.navLabel}>{lesson.title}</span>}
            </div>
          ))}
        </nav>

        <button style={styles.logoutBtn} onClick={() => setShowLogoutConfirm(true)}>
          <div style={styles.logoutIconBox}><LogOut size={18} /></div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} style={styles.logoutText}>
                Terminate Session
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </motion.aside>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <header style={styles.topBar}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={styles.menuBtn}>
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div style={styles.headerRight}>
            <div style={styles.systemStatus}><div style={styles.pulse} /> ACTIVE_ENCRYPTION</div>
            <div style={styles.userSection}>
              <div style={styles.userMeta}>
                <span style={styles.userRole}>Level 4 Operator</span>
                <span style={styles.userNameDisplay}>{userName}</span>
              </div>
              <div style={styles.avatar}>{userName[0]}</div>
            </div>
          </div>
        </header>

        <div style={styles.scrollContainer}>
          <div style={styles.contentWidth}>
            {/* Hero */}
            <section style={styles.heroSection}>
              <div style={styles.heroMain}>
                <h1 style={styles.heroTitle}>System Overview: {userName}</h1>
                <p style={styles.heroSub}>Global threat level: <span style={{color: '#f87171'}}>MODERATE</span>. Continuing your security clearance path.</p>
                <div style={styles.progressBox}>
                  <div style={styles.progressText}><span>SOCIETAL SYNCHRONIZATION</span><span>{completionPercentage}%</span></div>
                  <div style={styles.progressTrack}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${completionPercentage}%` }} style={styles.progressFill} />
                  </div>
                </div>
              </div>
              <div style={styles.heroSide}>
                <div style={styles.miniStat}><Trophy size={22} color="#fbbf24" /><span style={styles.statVal}>{completedLessonIds.length}</span><span style={styles.statDim}>CLEARED</span></div>
                <div style={styles.miniStat}><Activity size={22} color="#3b82f6" /><span style={styles.statVal}>{lessons.length - completedLessonIds.length}</span><span style={styles.statDim}>IN-QUEUE</span></div>
              </div>
            </section>

            {/* Grid */}
            <div style={styles.grid}>
              {lessons.map((lesson) => {
                const isDone = completedLessonIds.includes(lesson.id);
                return (
                  <motion.div key={lesson.id} whileHover={{ y: -8, backgroundColor: "rgba(30, 41, 59, 0.5)" }} onClick={() => navigate(lesson.path)}
                    style={{...styles.card, border: isDone ? "1px solid rgba(16, 185, 129, 0.2)" : "1px solid rgba(255,255,255,0.05)"}}>
                    <div style={styles.cardHeader}><span style={styles.catTag}>{lesson.category}</span><span style={styles.timeTag}>{lesson.time}</span></div>
                    <h3 style={styles.cardTitle}>{lesson.title}</h3>
                    <div style={styles.cardFooter}>
                      <div style={styles.cardStatus}>{isDone ? <Lock size={14} color="#10b981" /> : <Radio size={14} color="#3b82f6" />}<span style={{marginLeft: 8, color: isDone ? "#10b981" : "#3b82f6"}}>{isDone ? "ENCRYPTED" : "ACCESS"}</span></div>
                      <ChevronRight size={18} color="#475569" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* Logout Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={styles.modalOverlay}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} style={styles.modalContent}>
              <AlertTriangle size={48} color="#ef4444" style={{ marginBottom: 20 }} />
              <h2 style={{ marginBottom: 10 }}>Terminate Session?</h2>
              <p style={{ color: "#94a3b8", textAlign: 'center', marginBottom: 30 }}>You are about to disconnect from the secure neural link. All unsaved progress will be lost.</p>
              <div style={styles.modalActions}>
                <button onClick={() => setShowLogoutConfirm(false)} style={styles.cancelBtn}>Cancel</button>
                <button onClick={handleLogout} style={styles.confirmBtn}>Confirm Disconnect</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- High-End Styles ---
const styles: any = {
  appContainer: { display: "flex", height: "100vh", background: "#02040a", color: "#f1f5f9", overflow: "hidden", position: "relative" },
  meshBg: { 
    position: "absolute", inset: 0, 
    background: "radial-gradient(circle at 50% -20%, rgba(59, 130, 246, 0.15), transparent), radial-gradient(circle at 0% 100%, rgba(59, 130, 246, 0.05), transparent)",
    zIndex: 0, pointerEvents: "none"
  },
  loadingScreen: { height: "100vh", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "#02040a" },

  // Sidebar Fixed
  sidebar: { 
    background: "rgba(3, 7, 18, 0.8)", backdropFilter: "blur(20px)", borderRight: "1px solid rgba(255,255,255,0.05)",
    display: "flex", flexDirection: "column", padding: "30px 15px", zIndex: 100 
  },
  sidebarBrand: { display: "flex", alignItems: "center", gap: 15, marginBottom: 50, paddingLeft: 10 },
  logoHex: { background: "linear-gradient(135deg, #3b82f6, #1d4ed8)", padding: 10, borderRadius: 12, boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" },
  brandName: { fontWeight: 900, fontSize: "1.2rem", letterSpacing: "2px" },
  navStack: { flex: 1, display: "flex", flexDirection: "column", gap: 5 },
  navHeader: { fontSize: "0.65rem", fontWeight: 800, color: "#475569", marginBottom: 15, paddingLeft: 12, letterSpacing: "1.5px" },
  navItem: { display: "flex", alignItems: "center", gap: 15, padding: "12px 15px", borderRadius: "12px", cursor: "pointer", transition: "0.2s hover", color: "#94a3b8" },
  navIconBox: { width: 24, display: "flex", justifyContent: "center" },
  navLabel: { fontSize: "0.85rem", whiteSpace: "nowrap", fontWeight: 500 },

  // Logout - ANTI-SHAKE SOLUTION
  logoutBtn: { 
    marginTop: "auto", background: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.1)", 
    color: "#ef4444", padding: "14px", borderRadius: "14px", display: "flex", alignItems: "center", 
    justifyContent: "flex-start", cursor: "pointer", overflow: "hidden", width: "100%"
  },
  logoutIconBox: { minWidth: "24px", display: "flex", justifyContent: "center", marginRight: "12px" },
  logoutText: { fontSize: "0.85rem", fontWeight: 600, whiteSpace: "nowrap" },

  // Main
  mainContent: { flex: 1, display: "flex", flexDirection: "column", zIndex: 1 },
  topBar: { height: 80, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px" },
  menuBtn: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: 8, borderRadius: 10, cursor: "pointer" },
  headerRight: { display: "flex", alignItems: "center", gap: 30 },
  systemStatus: { fontSize: "0.7rem", fontWeight: 700, color: "#10b981", display: "flex", alignItems: "center", gap: 8, background: "rgba(16, 185, 129, 0.1)", padding: "6px 12px", borderRadius: 20 },
  pulse: { width: 6, height: 6, background: "#10b981", borderRadius: "50%", boxShadow: "0 0 10px #10b981" },
  userSection: { display: "flex", alignItems: "center", gap: 15 },
  userMeta: { textAlign: "right" },
  userRole: { display: "block", fontSize: "0.6rem", color: "#3b82f6", fontWeight: 800, textTransform: "uppercase" },
  userNameDisplay: { fontSize: "0.9rem", fontWeight: 600 },
  avatar: { width: 40, height: 40, borderRadius: 12, background: "linear-gradient(45deg, #1e293b, #0f172a)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 },

  scrollContainer: { flex: 1, overflowY: "auto", padding: "20px 40px" },
  contentWidth: { maxWidth: "1200px", margin: "0 auto" },

  // Hero Bento
  heroSection: { display: "grid", gridTemplateColumns: "1.8fr 1fr", gap: 20, marginBottom: 40 },
  heroMain: { background: "rgba(15, 23, 42, 0.5)", border: "1px solid rgba(255,255,255,0.05)", padding: 40, borderRadius: 32, backdropFilter: "blur(10px)" },
  heroTitle: { fontSize: "2.2rem", fontWeight: 800, marginBottom: 10 },
  heroSub: { color: "#64748b", marginBottom: 35 },
  progressBox: { maxWidth: "450px" },
  progressText: { display: "flex", justifyContent: "space-between", fontSize: "0.7rem", fontWeight: 800, color: "#3b82f6", marginBottom: 12, letterSpacing: 1 },
  progressTrack: { height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 10, overflow: "hidden" },
  progressFill: { height: "100%", background: "linear-gradient(90deg, #3b82f6, #60a5fa)", boxShadow: "0 0 15px rgba(59, 130, 246, 0.4)" },
  heroSide: { display: "flex", flexDirection: "column", gap: 20 },
  miniStat: { flex: 1, background: "rgba(15, 23, 42, 0.5)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 24, padding: 25, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" },
  statVal: { fontSize: "1.8rem", fontWeight: 800, margin: "5px 0" },
  statDim: { fontSize: "0.65rem", color: "#475569", fontWeight: 700, letterSpacing: 1 },

  // Grid
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 },
  card: { background: "rgba(15, 23, 42, 0.3)", padding: 25, borderRadius: 24, cursor: "pointer", transition: "0.3s" },
  cardHeader: { display: "flex", justifyContent: "space-between", marginBottom: 20 },
  catTag: { fontSize: "0.6rem", fontWeight: 800, color: "#3b82f6", background: "rgba(59, 130, 246, 0.1)", padding: "4px 10px", borderRadius: 8 },
  timeTag: { fontSize: "0.7rem", color: "#475569" },
  cardTitle: { fontSize: "1.1rem", fontWeight: 700, marginBottom: 25, lineHeight: 1.4 },
  cardFooter: { display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 20 },
  cardStatus: { display: "flex", alignItems: "center", fontSize: "0.75rem", fontWeight: 700 },

  // Modal
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(10px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: 20 },
  modalContent: { background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", padding: 40, borderRadius: 32, maxWidth: 450, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" },
  modalActions: { display: "flex", gap: 15, width: "100%" },
  cancelBtn: { flex: 1, background: "transparent", border: "1px solid #1e293b", color: "#fff", padding: "14px", borderRadius: "14px", cursor: "pointer", fontWeight: 600 },
  confirmBtn: { flex: 1, background: "#ef4444", border: "none", color: "#fff", padding: "14px", borderRadius: "14px", cursor: "pointer", fontWeight: 600 }
};