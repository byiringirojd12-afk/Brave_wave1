import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const lessons = [
  { id: 1, title: "Intro to Cybersecurity" },
  { id: 2, title: "Ethical Hacking" },
  { id: 3, title: "Internet Governance" },
  { id: 4, title: "How the Internet Works" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const [name, setName] = useState("");
  const [role, setRole] = useState("student");

  const [progress, setProgress] = useState<Record<number, boolean>>({});
  const [timeSpent, setTimeSpent] = useState(0);

  /* 🔐 SESSION GUARD + ANALYTICS LOAD */
  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      navigate("/", { replace: true });
      return;
    }

    setName(localStorage.getItem("name") || "Student");
    setRole(localStorage.getItem("role") || "student");

    const p: Record<number, boolean> = {};
    let totalTime = 0;

    lessons.forEach(l => {
      p[l.id] = localStorage.getItem(`lesson-${l.id}`) === "done";
      totalTime += Number(localStorage.getItem(`time-${l.id}`)) || 0;
    });

    setProgress(p);
    setTimeSpent(totalTime);
  }, []);

  const completed = Object.values(progress).filter(Boolean).length;
  const percent = Math.round((completed / lessons.length) * 100);

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  const saveProfile = () => {
    localStorage.setItem("name", name);
    setEditing(false);
  };

  return (
    <div style={styles.layout}>
      {/* ☰ SIDEBAR TOGGLE */}
      <button
        style={styles.menuBtn}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      {/* SIDEBAR */}
      <aside
        style={{
          ...styles.sidebar,
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <h2 style={{ marginBottom: 10 }}>Profile</h2>

        {editing ? (
          <>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              style={styles.input}
            />
            <button style={styles.primaryBtn} onClick={saveProfile}>
              Save
            </button>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Role:</strong> {role}</p>
            <button
              style={styles.secondaryBtn}
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          </>
        )}

        <hr style={{ margin: "20px 0", opacity: 0.3 }} />

        <button onClick={logout} style={styles.logout}>
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main style={styles.main}>
        <h1>Analytics Dashboard</h1>

        {/* ANALYTICS CARDS */}
        <div style={styles.cards}>
          <Card title="Lessons Completed" value={`${completed}/${lessons.length}`} />
          <Card title="Completion Rate" value={`${percent}%`} />
          <Card
            title="Time Spent"
            value={`${Math.floor(timeSpent / 60)} min`}
          />
        </div>

        {/* LESSON TRACKING */}
        <div style={styles.panel}>
          <h2>Learning Progress</h2>

          {lessons.map(l => (
            <div key={l.id} style={styles.lessonRow}>
              <Link to={`/lesson/${l.id}`}>{l.title}</Link>
              <span>
                {progress[l.id] ? "✅ Completed" : "⏳ In progress"}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

/* 🧩 CARD COMPONENT */
function Card({ title, value }: any) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <p style={styles.cardValue}>{value}</p>
    </div>
  );
}

/* 🎨 STYLES */
const styles: any = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    background: "#f4f6f9",
    fontFamily: "Inter, Arial, sans-serif",
  },

  menuBtn: {
    position: "fixed",
    top: 20,
    left: 20,
    zIndex: 1000,
    background: "#1e293b",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: 8,
    cursor: "pointer",
  },

  sidebar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: 260,
    height: "100%",
    background: "#1e293b",
    color: "#fff",
    padding: 20,
    transition: "transform 0.3s ease",
    zIndex: 999,
  },

  main: {
    flex: 1,
    marginLeft: 0,
    padding: "80px 40px",
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
    gap: 20,
    marginBottom: 30,
  },

  card: {
    background: "#fff",
    padding: 24,
    borderRadius: 16,
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  cardValue: {
    fontSize: 28,
    fontWeight: 700,
    marginTop: 10,
  },

  panel: {
    background: "#fff",
    padding: 24,
    borderRadius: 16,
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
  },

  lessonRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "14px 0",
    borderBottom: "1px solid #e5e7eb",
  },

  input: {
    width: "100%",
    padding: 8,
    borderRadius: 6,
    border: "none",
    marginBottom: 10,
  },

  primaryBtn: {
    background: "#3b82f6",
    border: "none",
    padding: "8px 12px",
    borderRadius: 6,
    color: "#fff",
    cursor: "pointer",
    width: "100%",
  },

  secondaryBtn: {
    background: "#64748b",
    border: "none",
    padding: "8px 12px",
    borderRadius: 6,
    color: "#fff",
    cursor: "pointer",
    width: "100%",
  },

  logout: {
    background: "#ef4444",
    border: "none",
    padding: "10px",
    borderRadius: 6,
    color: "#fff",
    cursor: "pointer",
    width: "100%",
  },
};
