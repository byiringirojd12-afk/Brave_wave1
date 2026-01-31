import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const TOTAL_LESSONS = 4;
const MIN_TIME_PER_LESSON = 30;

export default function InstructorAnalytics() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data.filter(u => u.role === 'student'));
      }
    } catch (err) {
      console.error("Error fetching analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  /** 🗑️ RESET LOGIC **/
  const handleReset = async (email, username) => {
    if (!window.confirm(`Wipe all progress for ${username}? This cannot be undone.`)) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/resetProgress", {
        method: "DELETE",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ email })
      });

      if (res.ok) {
        alert("Progress reset.");
        fetchUsers(); // Refresh the list
      }
    } catch (err) {
      alert("Error resetting.");
    }
  };

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.certificateId && u.certificateId.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={styles.layout}>
      <header style={styles.header}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>← Back to Dashboard</button>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={styles.h1}>Master Student Directory</h1>
            <p style={styles.subtitle}>Verifying credentials and curriculum integrity.</p>
          </div>
          
          <input 
            type="text" 
            placeholder="Search name, email, or Cert ID..." 
            style={styles.searchBar}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.theadRow}>
              <th style={styles.th}>Student</th>
              <th style={styles.th}>Cert ID</th> {/* NEW COLUMN */}
              <th style={styles.th}>Time Active</th>
              <th style={styles.th}>Progress</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th> {/* NEW COLUMN */}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => {
              const completedCount = u.progress?.length || 0;
              const percent = Math.round((completedCount / TOTAL_LESSONS) * 100);
              const totalTimeSpent = u.totalTimeSpent || 0;
              const isSuspect = completedCount > 0 && totalTimeSpent < (completedCount * MIN_TIME_PER_LESSON);

              return (
                <tr key={u._id} style={styles.tr}>
                  <td style={styles.td}>
                    <div style={styles.userCell}>
                      <div style={styles.miniAvatar}>{u.username?.charAt(0).toUpperCase()}</div>
                      <div>
                        <div style={{fontWeight: 700}}>{u.username}</div>
                        <div style={{fontSize: '0.7rem', color: '#64748b'}}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={styles.td}>
                    {u.certificateId ? (
                      <code style={styles.serialBadge}>{u.certificateId}</code>
                    ) : (
                      <span style={{color: '#cbd5e1'}}>---</span>
                    )}
                  </td>
                  <td style={styles.td}>{Math.floor(totalTimeSpent / 60)}m {totalTimeSpent % 60}s</td>
                  <td style={styles.td}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={styles.miniBarBg}><div style={{...styles.miniBarFill, width: `${percent}%`}} /></div>
                      <span style={{fontSize: '0.75rem', fontWeight: 800}}>{percent}%</span>
                    </div>
                  </td>
                  <td style={styles.td}>
                    {isSuspect ? <span style={styles.cheatBadge}>Suspect</span> : <span style={styles.statusSafe}>Verified</span>}
                  </td>
                  <td style={styles.td}>
                    <button onClick={() => handleReset(u.email, u.username)} style={styles.resetBtn}>Reset</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}

const styles = {
  // ... (Include previous styles here)
  layout: { padding: "60px 40px", background: "#f8fafc", minHeight: "100vh", fontFamily: "Inter, sans-serif" },
  header: { maxWidth: "1200px", margin: "0 auto 40px" },
  h1: { fontSize: "2rem", fontWeight: 900, color: "#0f172a", margin: "0" },
  subtitle: { color: "#64748b" },
  backBtn: { background: "none", border: "none", color: "#3b82f6", fontWeight: 700, cursor: "pointer", marginBottom: '15px' },
  searchBar: { padding: '12px 20px', borderRadius: '12px', border: '1px solid #cbd5e1', width: '320px', fontSize: '0.9rem' },
  tableCard: { maxWidth: "1200px", margin: "0 auto", background: "white", borderRadius: "20px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" },
  table: { width: "100%", borderCollapse: "collapse" },
  theadRow: { background: "#f8fafc" },
  th: { padding: "15px 25px", textAlign: 'left', fontSize: "0.7rem", color: "#64748b", textTransform: "uppercase", letterSpacing: '1px' },
  td: { padding: "18px 25px", borderBottom: "1px solid #f1f5f9", fontSize: "0.9rem" },
  userCell: { display: "flex", alignItems: "center", gap: "12px" },
  miniAvatar: { width: "35px", height: "35px", borderRadius: "10px", background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: '#475569' },
  miniBarBg: { width: '50px', height: '6px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' },
  miniBarFill: { height: '100%', background: '#22c55e' },
  serialBadge: { background: '#f1f5f9', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', color: '#475569', fontWeight: 600, border: '1px solid #e2e8f0' },
  cheatBadge: { background: '#fee2e2', color: '#ef4444', padding: '4px 10px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase' },
  statusSafe: { color: '#22c55e', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' },
  resetBtn: { background: 'none', border: '1px solid #f87171', color: '#ef4444', padding: '5px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }
};