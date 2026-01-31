import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"; // If using React Router

export default function Verify() {
  const [searchParams] = useSearchParams();
  const [certId, setCertId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Auto-verify if ID is in the URL (from QR code)
  useEffect(() => {
    const idFromUrl = searchParams.get("id");
    if (idFromUrl) {
      setCertId(idFromUrl);
      performVerification(idFromUrl);
    }
  }, [searchParams]);

  const performVerification = async (id) => {
    setLoading(true);
    setResult(null);
    try {
      // We call the users API and look for the specific certificateId
      const res = await fetch("/api/users");
      const users = await res.json();
      const student = users.find(u => u.certificateId === id);
      
      setResult(student || "NOT_FOUND");
    } catch (err) {
      setResult("ERROR");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Credential Verification</h1>
        <p style={styles.text}>Enter a Certificate ID to verify student records.</p>
        
        <div style={styles.searchBox}>
          <input 
            value={certId}
            onChange={(e) => setCertId(e.target.value.toUpperCase())}
            placeholder="BW-2026-XXXXXX"
            style={styles.input}
          />
          <button 
            onClick={() => performVerification(certId)} 
            style={styles.btn}
            disabled={loading}
          >
            {loading ? "Checking..." : "Verify"}
          </button>
        </div>

        {result === "NOT_FOUND" && (
          <div style={styles.errorCard}>❌ Invalid ID. This certificate is not recognized.</div>
        )}

        {result && typeof result === 'object' && (
          <div style={styles.successCard}>
            <div style={styles.verifiedBadge}>OFFICIALLY VERIFIED</div>
            <h2 style={styles.studentName}>{result.username}</h2>
            <p style={styles.courseName}>Professional Cybersecurity Foundations</p>
            <div style={styles.divider} />
            <p style={styles.date}>Issued on: {result.certifiedDate || "2026"}</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9', fontFamily: 'Inter, sans-serif' },
  card: { background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', width: '100%', maxWidth: '500px', textAlign: 'center' },
  title: { fontSize: '1.8rem', fontWeight: 900, color: '#0f172a', marginBottom: '10px' },
  text: { color: '#64748b', marginBottom: '30px' },
  searchBox: { display: 'flex', gap: '10px', marginBottom: '30px' },
  input: { flex: 1, padding: '14px', borderRadius: '12px', border: '2px solid #e2e8f0', fontSize: '1rem', fontWeight: 600 },
  btn: { background: '#22c55e', color: '#0f172a', border: 'none', padding: '0 25px', borderRadius: '12px', fontWeight: 800, cursor: 'pointer' },
  successCard: { background: '#f0fdf4', border: '2px solid #22c55e', padding: '30px', borderRadius: '16px', textAlign: 'left' },
  verifiedBadge: { background: '#22c55e', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 900, display: 'inline-block', marginBottom: '15px' },
  studentName: { margin: '0 0 5px 0', fontSize: '1.5rem', color: '#0f172a' },
  courseName: { margin: 0, color: '#64748b', fontSize: '0.9rem' },
  divider: { height: '1px', background: '#dcfce7', margin: '20px 0' },
  date: { fontSize: '0.8rem', color: '#16a34a', fontWeight: 700 },
  errorCard: { color: '#ef4444', fontWeight: 700, background: '#fef2f2', padding: '15px', borderRadius: '12px' }
};