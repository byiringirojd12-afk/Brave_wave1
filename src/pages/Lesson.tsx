import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const MINIMUM_READ_TIME = 30; 

export default function Lesson() {
  const { id } = useParams();
  const navigate = useNavigate();
  const endRef = useRef(null);
  
  const [isCompleted, setIsCompleted] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [canSubmit, setCanSubmit] = useState(false);

  /**
   * 1. INITIAL STATUS CHECK (The "Fix")
   * This calls the DB immediately to see if the lesson is already done.
   */
  const checkInitialStatus = useCallback(async () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("/api/getUserProgress", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      
      // If DB says this lesson ID is completed, unlock the UI
      if (data.progress && data.progress[id] === true) {
        setIsCompleted(true);
        setCanSubmit(true);
        localStorage.setItem(`lesson-${id}-completed`, "true");
      }
    } catch (err) {
      console.error("Initial check failed:", err);
    }
  }, [id]);

  useEffect(() => {
    checkInitialStatus();
  }, [checkInitialStatus]);

  // 2. Timer Logic
  useEffect(() => {
    if (isCompleted) return; // Stop timer if already done

    const timer = setInterval(() => {
      setSecondsElapsed((prev) => {
        if (prev + 1 >= MINIMUM_READ_TIME) setCanSubmit(true);
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [id, isCompleted]);

  // 3. Sync & Observer Logic
  useEffect(() => {
    if (isCompleted) return;

    const syncProgress = async () => {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");

      try {
        const response = await fetch("/api/getUserProgress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            lessonId: id,
            completed: true,
            timeSpent: secondsElapsed 
          })
        });

        if (response.ok) {
          localStorage.setItem(`lesson-${id}-completed`, "true");
          setIsCompleted(true);
        }
      } catch (err) {
        console.error("Sync failed", err);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && canSubmit && !isCompleted) {
          syncProgress();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (endRef.current) observer.observe(endRef.current);
    return () => observer.disconnect();
  }, [id, canSubmit, isCompleted, secondsElapsed]); 

  const timerProgress = Math.min((secondsElapsed / MINIMUM_READ_TIME) * 100, 100);

  return (
    <div style={styles.wrapper}>
      {/* Timer UI - Hidden if already completed */}
      {!isCompleted && (
        <div style={styles.timerBadge}>
          {canSubmit ? (
            <span style={{ color: '#4ade80' }}>✔ Validation Ready</span>
          ) : (
            <span>⏳ Security Lock: {MINIMUM_READ_TIME - secondsElapsed}s</span>
          )}
          <div style={{ ...styles.timerBar, width: `${timerProgress}%` }} />
        </div>
      )}

      <motion.div 
        style={styles.lessonCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <header style={styles.header}>
          <div style={styles.badge}>Module {id}</div>
          <h1 style={styles.h1}>Security Systems Analysis</h1>
        </header>

        <article style={styles.content}>
            <p><strong>Lesson Overview:</strong> Detailed architectural review of system hardening.</p>
            <div style={{ height: '60vh', background: '#f8fafc', padding: '40px', borderRadius: '15px', marginTop: '20px', color: '#94a3b8' }}>
                [Study Material Content Area]
            </div>
        </article>

        <div ref={endRef} style={{ height: '20px', margin: '20px 0' }} />

        <AnimatePresence>
          {isCompleted ? (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={styles.successCard}>
              <h2 style={{ color: '#22c55e', margin: '0 0 10px 0' }}>🎉 Unit Complete</h2>
              <p style={{ margin: 0, opacity: 0.8 }}>Database sync successful. You have earned credit for this module.</p>
              <button onClick={() => navigate('/dashboard')} style={styles.btn}>Return to Dashboard</button>
            </motion.div>
          ) : (
            <div style={styles.lockMessage}>
              {!canSubmit ? (
                <p>Analyzing engagement... {MINIMUM_READ_TIME - secondsElapsed}s remaining.</p>
              ) : (
                <p style={{ color: '#0f172a', fontWeight: 700 }}>✔ Ready to verify. Scroll to the bottom footer.</p>
              )}
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

const styles = {
  wrapper: { padding: '80px 20px', background: '#f1f5f9', minHeight: '100vh', fontFamily: 'Inter, sans-serif' },
  timerBadge: { position: 'fixed', top: '25px', right: '25px', background: '#0f172a', color: 'white', padding: '12px 24px', borderRadius: '12px', zIndex: 1000, fontSize: '0.8rem', fontWeight: 800, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' },
  timerBar: { position: 'absolute', bottom: 0, left: 0, height: '4px', background: '#22c55e', transition: 'width 1s linear' },
  lessonCard: { maxWidth: '800px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' },
  header: { marginBottom: '30px' },
  badge: { display: 'inline-block', background: '#e2e8f0', color: '#475569', padding: '4px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '10px' },
  h1: { fontSize: '2.2rem', color: '#0f172a', margin: 0 },
  content: { lineHeight: '1.7', color: '#334155' },
  lockMessage: { padding: '40px', textAlign: 'center', background: '#f8fafc', borderRadius: '16px', border: '2px dashed #e2e8f0', color: '#64748b' },
  successCard: { background: '#0f172a', color: 'white', padding: '40px', borderRadius: '20px', textAlign: 'center' },
  btn: { background: '#22c55e', color: '#0f172a', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 800, marginTop: '20px', cursor: 'pointer' }
};