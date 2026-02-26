import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Lock, Radio } from "lucide-react";

interface Lesson {
  id: number;
  title: string;
  category: string;
}

interface LessonListProps {
  lessons: Lesson[];
  progress: Record<string, boolean>; // lessonId -> completed
}

export default function LessonList({ lessons, progress }: LessonListProps) {
  return (
    <div style={styles.lessonList}>
      {lessons.map((lesson, idx) => {
        const prevDone = idx === 0 ? true : progress[String(lessons[idx - 1].id)];
        const isDone = progress[String(lesson.id)];
        const isUnlocked = prevDone;

        return (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: isUnlocked ? 1.02 : 1 }}
            transition={{ duration: 0.3 }}
            style={{
              ...styles.lessonRow,
              cursor: isUnlocked ? "pointer" : "not-allowed",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
              {/* Status Circle */}
              <motion.div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: isDone ? "#22c55e" : isUnlocked ? "#fbbf24" : "#e2e8f0",
                  boxShadow: isDone ? "0 0 12px rgba(34, 197, 94, 0.4)" : "none",
                }}
                animate={{ scale: isDone ? 1.3 : 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />

              {/* Lesson Info */}
              <div>
                {isUnlocked ? (
                  <Link to={`/dashboard/lesson${lesson.id}`} style={styles.lessonLink}>
                    {lesson.title}
                  </Link>
                ) : (
                  <span style={{ ...styles.lessonLink, opacity: 0.5 }}>{lesson.title}</span>
                )}
                <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{lesson.category}</div>
              </div>
            </div>

            {/* Status Label */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {isDone ? <CheckCircle2 size={16} color="#22c55e" /> : isUnlocked ? <Radio size={16} color="#fbbf24" /> : <Lock size={16} color="#cbd5e1" />}
              <span style={{
                fontSize: "0.8rem",
                fontWeight: 800,
                color: isDone ? "#22c55e" : isUnlocked ? "#fbbf24" : "#94a3b8",
                letterSpacing: "0.5px"
              }}>
                {isDone ? "DONE" : isUnlocked ? "UNLOCKED" : "LOCKED"}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// --- Styles ---
const styles: Record<string, React.CSSProperties> = {
  lessonList: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    width: "100%",
    maxWidth: 600,
    margin: "0 auto",
  },
  lessonRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    borderRadius: 16,
    background: "rgba(15, 23, 42, 0.5)",
    border: "1px solid rgba(255,255,255,0.05)",
    transition: "background 0.3s",
  },
  lessonLink: {
    fontWeight: 600,
    fontSize: "0.95rem",
    color: "#fff",
    textDecoration: "none",
  },
};