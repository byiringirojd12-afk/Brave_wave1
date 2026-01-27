import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const lessons = [
  { id: 1, title: "Cisco Networking Academy_ Introduction to Cybersecurity" },
  { id: 2, title: "Cisco Networking Academy_Ethical_Hacker_certificate" },
  { id: 3, title: "Internet Society_Internet Governance" },
  { id: 4, title: "Internet Society_What the Internet Needs to Exist" }, // fixed duplicate ID
];

export default function Dashboard() {
  const [role, setRole] = useState("student");
  const [progress, setProgress] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setRole(localStorage.getItem("role") || "student");

    const savedProgress: Record<number, boolean> = {};
    lessons.forEach(lesson => {
      savedProgress[lesson.id] = localStorage.getItem(`lesson-${lesson.id}-completed`) === "true";
    });
    setProgress(savedProgress);
  }, []);

  const completionCount = Object.values(progress).filter(Boolean).length;
  const progressPercent = (completionCount / lessons.length) * 100;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome, {localStorage.getItem("name") || "Student"}</h1>
      <h2 style={styles.subtitle}>Role: {role}</h2>

      {role === "instructor" && (
        <Link to="/instructor" style={styles.instructorLink}>
          Go to Instructor Dashboard
        </Link>
      )}

      <h3 style={styles.sectionTitle}>Your Lessons</h3>
      <ul style={styles.lessonList}>
        {lessons.map(lesson => (
          <li key={lesson.id} style={styles.lessonItem}>
            <Link to={`/lesson/${lesson.id}`} style={styles.lessonLink}>{lesson.title}</Link>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={progress[lesson.id] || false}
                onChange={e => {
                  localStorage.setItem(`lesson-${lesson.id}-completed`, e.target.checked.toString());
                  setProgress(prev => ({ ...prev, [lesson.id]: e.target.checked }));
                }}
              />
              Completed
            </label>
          </li>
        ))}
      </ul>

      <div style={styles.progressContainer}>
        <div style={styles.progressText}>
          Progress: {completionCount}/{lessons.length} ({progressPercent.toFixed(0)}%)
        </div>
        <div style={styles.progressBarBackground}>
          <div style={{
            ...styles.progressBarFill,
            width: `${progressPercent}%`
          }} />
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 800,
    margin: "40px auto",
    padding: 24,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f7f9fc",
    borderRadius: 12,
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)"
  },
  title: {
    fontSize: 32,
    marginBottom: 4,
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 16,
    color: "#666",
  },
  instructorLink: {
    display: "inline-block",
    marginBottom: 24,
    textDecoration: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: 6,
    transition: "background 0.3s",
  },
  sectionTitle: {
    fontSize: 22,
    marginBottom: 12,
    color: "#444",
  },
  lessonList: {
    listStyle: "none",
    padding: 0,
    marginBottom: 24,
  },
  lessonItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "12px 16px",
    marginBottom: 8,
    borderRadius: 8,
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    transition: "transform 0.2s",
  },
  lessonItemHover: {
    transform: "scale(1.02)"
  },
  lessonLink: {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: 500,
    flex: 1,
    marginRight: 16,
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    fontSize: 14,
    color: "#555",
    gap: 4,
  },
  progressContainer: {
    marginTop: 16,
  },
  progressText: {
    marginBottom: 8,
    fontWeight: 500,
    color: "#333",
  },
  progressBarBackground: {
    background: "#e0e0e0",
    height: 14,
    borderRadius: 7,
    overflow: "hidden",
  },
  progressBarFill: {
    background: "linear-gradient(90deg, #4caf50, #81c784)",
    height: "100%",
    borderRadius: 7,
    transition: "width 0.5s ease-in-out",
  }
};
