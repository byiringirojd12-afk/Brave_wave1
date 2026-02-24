import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, BookOpen, BarChart2, LogOut, 
  ChevronRight, Lock, CheckCircle2, Zap,
  Clock, Award, Edit3, Check, X
} from "lucide-react";

// 1. Matched to your App.tsx routes
const lessons = [
  { id: 1, path: "/dashboard/lesson1", title: "Intro to Cybersecurity", category: "Basics", duration: "45m" },
  { id: 2, path: "/dashboard/lesson2", title: "Ethical Hacking", category: "Offensive", duration: "1.2h" },
  { id: 3, path: "/dashboard/lesson3", title: "Internet Governance", category: "Policy", duration: "30m" },
  { id: 4, path: "/dashboard/lesson4", title: "How the Internet Works", category: "Infrastructure", duration: "1h" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  
  // --- NAME EDITING STATE ---
  const [name, setName] = useState(localStorage.getItem("username") || "Student");
  const [tempName, setTempName] = useState(name);
  const [isEditingName, setIsEditingName] = useState(false);

  const [completedLessons] = useState<number[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // --- SAVE NAME LOGIC ---
  const handleSaveName = () => {
    const trimmedName = tempName.trim();
    if (trimmedName) {
      setName(trimmedName);
      localStorage.setItem("username", trimmedName);
      setIsEditingName(false);
    }
  };

  const percent = Math.round((completedLessons.length / lessons.length) * 100);

  if (loading) return <LoadingState />;

  return (
    <div style={styles.container}>
      <div style={styles.glowOrb} />
      
      {/* SIDEBAR */}
      <motion.aside animate={{ width: sidebarOpen ? 280 : 80 }} style={styles.sidebar}>
        <div style={styles.sidebarContent}>
          <div style={styles.logoArea}>
            <div style={styles.logoIcon}><Shield size={20} fill="#3b82f6" /></div>
            {sidebarOpen && <motion.span initial={{opacity:0}} animate={{opacity:1}} style={styles.logoText}>BRAVE WAVE</motion.span>}
          </div>

          <div style={styles.navGroup}>
            <SidebarItem icon={<BookOpen size={20}/>} label="Academy" active open={sidebarOpen} />
            <SidebarItem icon={<BarChart2 size={20}/>} label="Analytics" open={sidebarOpen} onClick={() => navigate('/analytics')} />
            <SidebarItem icon={<Award size={20}/>} label="Certificates" open={sidebarOpen} />
          </div>

          <div style={styles.sidebarFooter}>
            {sidebarOpen && (
               <button onClick={() => { localStorage.clear(); navigate("/login"); }} style={styles.logoutBtn}>
                <LogOut size={18} /> Logout
               </button>
            )}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={styles.toggleBtn}>
              <ChevronRight style={{ transform: sidebarOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.3s' }} />
            </button>
          </div>
        </div>
      </motion.aside>

      {/* MAIN CONTENT */}
      <main style={styles.main}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.title}>Operational Dashboard</h1>
            
            {/* EDITABLE NAME SECTION */}
            <div style={styles.nameContainer}>
              <p style={styles.subtitle}>Welcome back, </p>
              <AnimatePresence mode="wait">
                {isEditingName ? (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0 }}
                    style={styles.editWrapper}
                  >
                    <input 
                      autoFocus
                      style={styles.nameInput}
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                    />
                    <button onClick={handleSaveName} style={styles.saveBtn}><Check size={16}/></button>
                    <button onClick={() => { setIsEditingName(false); setTempName(name); }} style={styles.cancelBtn}><X size={16}/></button>
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    style={styles.nameDisplay}
                    onClick={() => setIsEditingName(true)}
                  >
                    <span style={styles.activeName}>{name}</span>
                    <Edit3 size={14} style={styles.editIcon} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div style={styles.userBadge}>
             <div style={styles.avatar}>{name[0].toUpperCase()}</div>
          </div>
        </header>

        {/* STATS */}
        <div style={styles.statsGrid}>
          <StatCard title="Overall Progress" value={`${percent}%`} icon={<Zap size={20} color="#3b82f6"/>} trend="Active" />
          <StatCard title="System Rank" value={percent > 70 ? "Specialist" : "Recruit"} icon={<Shield size={20} color="#22c55e"/>} trend="Verifying" />
        </div>

        {/* LESSON LIST */}
        <section style={styles.coursePanel}>
          <div style={styles.panelHead}>
            <h2 style={styles.panelTitle}>Curriculum Path</h2>
            <div style={styles.progressCounter}>{completedLessons.length}/{lessons.length} Complete</div>
          </div>
          
          <div style={styles.progressBarContainer}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${percent}%` }} style={styles.progressBarFill} />
          </div>

          <div style={styles.lessonContainer}>
            {lessons.map((lesson, index) => (
              <LessonRow 
                key={lesson.id} 
                lesson={lesson} 
                index={index}
                isDone={completedLessons.includes(lesson.id)}
                isUnlocked={true} 
                onClick={() => navigate(lesson.path)} 
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

/* --- REUSABLE UI COMPONENTS --- (SidebarItem, StatCard, LessonRow, LoadingState stay mostly same) */

function SidebarItem({ icon, label, active, open, onClick }: any) {
  return (
    <motion.div 
      whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.05)' }}
      onClick={onClick}
      style={{
        ...styles.navItem,
        backgroundColor: active ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
        color: active ? '#3b82f6' : '#94a3b8',
        justifyContent: open ? 'flex-start' : 'center'
      }}
    >
      {icon}
      {open && <span style={{ marginLeft: 12, fontWeight: 500 }}>{label}</span>}
    </motion.div>
  );
}

function StatCard({ title, value, icon, trend }: any) {
  return (
    <motion.div whileHover={{ y: -5 }} style={styles.statCard}>
      <div style={styles.statHeader}>
        <div style={styles.statIcon}>{icon}</div>
        <span style={styles.statTrend}>{trend}</span>
      </div>
      <div style={styles.statValue}>{value}</div>
      <div style={styles.statTitle}>{title}</div>
    </motion.div>
  );
}

function LessonRow({ lesson, index, isDone, isUnlocked, onClick }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={isUnlocked ? { x: 10, backgroundColor: 'rgba(59, 130, 246, 0.05)' } : {}}
      onClick={isUnlocked ? onClick : undefined}
      style={{
        ...styles.lessonRow,
        opacity: isUnlocked ? 1 : 0.4,
        cursor: isUnlocked ? 'pointer' : 'not-allowed',
        border: isUnlocked ? '1px solid rgba(59, 130, 246, 0.1)' : '1px solid rgba(255,255,255,0.03)'
      }}
    >
      <div style={styles.lessonInfo}>
        <div style={styles.statusDot}>
          {isDone ? <CheckCircle2 size={18} color="#22c55e" /> : <Zap size={18} color="#fbbf24" />}
        </div>
        <div>
          <h4 style={styles.lessonTitle}>{lesson.title}</h4>
          <span style={styles.lessonMeta}>{lesson.category} • {lesson.duration}</span>
        </div>
      </div>
      <ChevronRight size={18} color={isUnlocked ? "#3b82f6" : "#64748b"} />
    </motion.div>
  );
}

function LoadingState() {
  return (
    <div style={styles.loadingContainer}>
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
        <Shield size={40} color="#3b82f6" />
      </motion.div>
    </div>
  );
}

const styles: any = {
  container: { display: 'flex', minHeight: '100vh', backgroundColor: '#020617', color: '#f8fafc', fontFamily: 'Inter, sans-serif', overflow: 'hidden', position: 'relative' },
  glowOrb: { position: 'absolute', top: '-10%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)', zIndex: 0 },
  sidebar: { backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(10px)', borderRight: '1px solid rgba(255,255,255,0.05)', zIndex: 10, height: '100vh', display: 'flex', flexDirection: 'column' },
  sidebarContent: { padding: '24px', height: '100%', display: 'flex', flexDirection: 'column' },
  logoArea: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 },
  logoIcon: { background: '#1e293b', padding: 8, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)' },
  logoText: { fontWeight: 800, fontSize: '1.1rem', letterSpacing: 1 },
  navGroup: { display: 'flex', flexDirection: 'column', gap: 8, flex: 1 },
  navItem: { display: 'flex', alignItems: 'center', padding: '12px', borderRadius: 12, cursor: 'pointer', transition: '0.2s' },
  sidebarFooter: { marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 },
  toggleBtn: { background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 10, alignSelf: 'center' },
  logoutBtn: { background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '10px', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontWeight: 600, cursor: 'pointer' },
  main: { flex: 1, padding: '40px 60px', overflowY: 'auto', zIndex: 1 },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 },
  title: { fontSize: '2rem', fontWeight: 800, margin: 0, letterSpacing: '-0.5px' },
  
  // --- NEW NAME EDIT STYLES ---
  nameContainer: { display: 'flex', alignItems: 'center', gap: 8, marginTop: 5 },
  subtitle: { color: '#94a3b8', margin: 0 },
  nameDisplay: { display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: '#3b82f6', fontWeight: 600 },
  activeName: { borderBottom: '1px dashed #3b82f6' },
  editIcon: { opacity: 0.6 },
  editWrapper: { display: 'flex', alignItems: 'center', gap: 6 },
  nameInput: { background: 'rgba(255,255,255,0.05)', border: '1px solid #3b82f6', borderRadius: 6, color: 'white', padding: '2px 8px', outline: 'none', fontSize: '1rem' },
  saveBtn: { background: '#22c55e', border: 'none', borderRadius: 4, color: 'white', padding: 4, cursor: 'pointer', display: 'flex' },
  cancelBtn: { background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 4, color: '#94a3b8', padding: 4, cursor: 'pointer', display: 'flex' },
  
  userBadge: { display: 'flex', alignItems: 'center', gap: 15 },
  avatar: { width: 45, height: 45, background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, border: '2px solid rgba(255,255,255,0.1)', fontSize: '1.2rem' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 40 },
  statCard: { background: 'rgba(30, 41, 59, 0.4)', padding: 24, borderRadius: 24, border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(5px)' },
  statHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 15 },
  statValue: { fontSize: '1.8rem', fontWeight: 800, marginBottom: 4 },
  statTitle: { color: '#94a3b8', fontSize: '0.85rem' },
  statTrend: { fontSize: '0.7rem', color: '#22c55e', background: 'rgba(34, 197, 94, 0.1)', padding: '4px 8px', borderRadius: 20 },
  coursePanel: { background: 'rgba(15, 23, 42, 0.4)', borderRadius: 32, padding: 32, border: '1px solid rgba(255,255,255,0.05)' },
  panelHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  panelTitle: { fontSize: '1.25rem', fontWeight: 700, margin: 0 },
  progressCounter: { color: '#3b82f6', fontWeight: 600, fontSize: '0.9rem' },
  progressBarContainer: { height: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 10, marginBottom: 30, overflow: 'hidden' },
  progressBarFill: { height: '100%', background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', borderRadius: 10 },
  lessonContainer: { display: 'flex', flexDirection: 'column', gap: 12 },
  lessonRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px', borderRadius: 20, background: 'rgba(255,255,255,0.02)', transition: '0.2s' },
  lessonInfo: { display: 'flex', alignItems: 'center', gap: 15 },
  lessonTitle: { margin: 0, fontSize: '1rem', fontWeight: 600 },
  lessonMeta: { fontSize: '0.8rem', color: '#64748b' },
  loadingContainer: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#020617' },
  
  // --- MEDIA QUERIES --- 
  
  "@media (max-width: 1024px)": {
    sidebar: {
      width: '240px', // for tablets
    },
    main: {
      padding: '30px 40px',
    },
    title: {
      fontSize: '1.8rem',
    },
    avatar: {
      width: 40,
      height: 40,
      fontSize: '1rem',
    },
  },
  
  "@media (max-width: 600px)": {
    sidebar: {
      width: '100%',
      height: 'auto',
    },
    sidebarContent: {
      padding: '15px',
    },
    main: {
      padding: '20px 30px',
    },
    statsGrid: {
      gridTemplateColumns: '1fr', // Stack the stats
    },
    lessonRow: {
      padding: '10px 16px',
    },
  },
};
