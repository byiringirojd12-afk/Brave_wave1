import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* =========================
   COMPREHENSIVE DATA ENGINE (ALL 15 MODULES)
========================= */
const lessonsData = [
  { 
    id: 1, title: "1. Intro to Cybersecurity", videoGuidance: "inWWhr59860",
    briefing: {
      objective: "Master the fundamental philosophy of proactive defense.",
      concepts: [
        { term: "Defense in Depth", desc: "Layered security: Administrative, Physical, and Technical." },
        { term: "Risk Management", desc: "Identifying assets, threats, and vulnerabilities." }
      ],
      technicalNote: "Security is a process, not a product. Always assume breach."
    },
    lab: { environment: "Windows/Linux Shell", steps: ["netstat -ano", "whoami /priv", "systeminfo"] },
    quiz: [{ q: "What is the 'weakest link'?", opts: ["Software", "Hardware", "Humans"], a: 2 }, { q: "Zero-Day refers to:", opts: ["Unpatched exploit", "Old virus", "New PC"], a: 0 }, { q: "SOC stands for?", opts: ["System Ops", "Security Ops", "Secure Org"], a: 1 }]
  },
  { 
    id: 2, title: "2. The CIA Triad", videoGuidance: "U05AM9701zI",
    briefing: {
      objective: "Define the core pillars of data protection.",
      concepts: [
        { term: "Confidentiality", desc: "Encryption and Access Control." },
        { term: "Integrity", desc: "Hashing and Digital Signatures." },
        { term: "Availability", desc: "Redundancy and Uptime." }
      ],
      technicalNote: "A breach in any one pillar compromises the entire system."
    },
    lab: { environment: "Crypto-Lab", steps: ["echo 'secret' > file.txt", "certutil -hashfile file.txt SHA256", "md5sum file.txt"] },
    quiz: [{ q: "Hashing ensures:", opts: ["Privacy", "Integrity", "Speed"], a: 1 }, { q: "Encryption ensures:", opts: ["Privacy", "Uptime", "Accuracy"], a: 0 }, { q: "DDoS impacts:", opts: ["Integrity", "Confidentiality", "Availability"], a: 2 }]
  },
  { 
    id: 3, title: "3. Networking Security", videoGuidance: "3Kq1MIfTWCE",
    briefing: {
      objective: "Understand traffic flow and packet analysis.",
      concepts: [
        { term: "OSI Model", desc: "7 layers of communication protocols." },
        { term: "TCP/IP", desc: "The handshake protocol for reliable delivery." }
      ],
      technicalNote: "Most attacks happen at Layer 2 (MAC) or Layer 3 (IP)."
    },
    lab: { environment: "Packet-Sniffer", steps: ["ipconfig /all", "tracert 8.8.8.8", "nslookup google.com"] },
    quiz: [{ q: "Layer 3 handles?", opts: ["Bits", "Frames", "IP Routing"], a: 2 }, { q: "Port 443 is?", opts: ["HTTP", "HTTPS", "FTP"], a: 1 }, { q: "TCP is connectionless?", opts: ["True", "False"], a: 1 }]
  },
  { 
    id: 4, title: "4. Web App Vulnerabilities", videoGuidance: "2_l0S4P5_BM",
    briefing: { objective: "Study the OWASP Top 10 risks.", concepts: [{ term: "SQLi", desc: "Injecting database commands." }, { term: "XSS", desc: "Injecting scripts into browsers." }], technicalNote: "Never trust user input; always sanitize." },
    lab: { environment: "Web-Proxy", steps: ["curl -I https://google.com", "inspect-headers", "test-xss-payload"] },
    quiz: [{ q: "SQLi targets what?", opts: ["The UI", "The Database", "The OS"], a: 1 }, { q: "What is XSS?", opts: ["Cross-Site Scripting", "XML Script", "X-Symmetric"], a: 0 }, { q: "Broken Auth is a risk?", opts: ["True", "False"], a: 0 }]
  },
  { 
    id: 5, title: "5. Linux Fundamentals", videoGuidance: "lZAoFs75_cs",
    briefing: { objective: "Navigate the hacker's OS of choice.", concepts: [{ term: "Permissions", desc: "Read, Write, Execute (755, 644)." }, { term: "Sudo", desc: "Executing as SuperUser." }], technicalNote: "Root is the most dangerous user in the system." },
    lab: { environment: "Bash Terminal", steps: ["ls -la", "chmod 400 private.txt", "sudo grep 'Failed' /var/log/auth.log"] },
    quiz: [{ q: "Change permissions command?", opts: ["chown", "chmod", "ps"], a: 1 }, { q: "Who is root?", opts: ["Guest", "Superuser", "Bot"], a: 1 }, { q: "See active processes?", opts: ["top", "ls", "cat"], a: 0 }]
  },
  { 
    id: 6, title: "6. Cryptography", videoGuidance: "jdH2_K3vYQw",
    briefing: { objective: "Secure data at rest and in transit.", concepts: [{ term: "Symmetric", desc: "AES - One key." }, { term: "Asymmetric", desc: "RSA - Public/Private keys." }], technicalNote: "Key management is harder than encryption itself." },
    lab: { environment: "OpenSSL Lab", steps: ["openssl genrsa -out key.pem", "ssh-keygen -t ed25519", "gpg --list-keys"] },
    quiz: [{ q: "Symmetric uses how many keys?", opts: ["1", "2", "3"], a: 0 }, { q: "Asymmetric uses how many?", opts: ["1", "2", "Infinite"], a: 1 }, { q: "Is MD5 secure for passwords?", opts: ["Yes", "No"], a: 1 }]
  },
  { 
    id: 7, title: "7. Social Engineering", videoGuidance: "GbL9XFfAAtU",
    briefing: { objective: "Identify human-centric psychological attacks.", concepts: [{ term: "Phishing", desc: "Deceptive emails." }, { term: "Vishing", desc: "Voice solicitation." }], technicalNote: "You cannot patch a human; you can only train them." },
    lab: { environment: "Email-Audit", steps: ["check-spf-record", "analyze-email-header", "verify-link-destination"] },
    quiz: [{ q: "Voice phishing is called?", opts: ["Vishing", "Smishing", "Pharming"], a: 0 }, { q: "SMS phishing is?", opts: ["Vishing", "Smishing", "Pharming"], a: 1 }, { q: "Tailgating is physical?", opts: ["True", "False"], a: 0 }]
  },
  { 
    id: 8, title: "8. Wireless & IoT", videoGuidance: "WpP9v9z-xGg",
    briefing: { objective: "Secure radio and smart device communications.", concepts: [{ term: "WPA3", desc: "The modern WiFi standard." }, { term: "Zigbee", desc: "IoT communication protocol." }], technicalNote: "IoT devices are the new 'backdoor' into corporate networks." },
    lab: { environment: "RF-Analyzer", steps: ["airodump-ng wlan0", "scan-iot-ports", "check-default-creds"] },
    quiz: [{ q: "WPA3 is better than WEP?", opts: ["True", "False"], a: 0 }, { q: "What is a Rogue AP?", opts: ["A fast router", "Malicious hotspot", "ISP"], a: 1 }, { q: "Bluetooth is 100% safe?", opts: ["Yes", "No"], a: 1 }]
  },
  { 
    id: 9, title: "9. Malware Analysis", videoGuidance: "mC_8idA8jXw",
    briefing: { objective: "Deconstruct malicious binaries.", concepts: [{ term: "Static Analysis", desc: "Checking code without running it." }, { term: "Dynamic Analysis", desc: "Running code in a sandbox." }], technicalNote: "Malware often checks if it is in a VM before executing." },
    lab: { environment: "Malware-Sandbox", steps: ["strings malware.exe", "check-file-entropy", "monitor-api-calls"] },
    quiz: [{ q: "What spreads automatically?", opts: ["Virus", "Worm", "Trojan"], a: 1 }, { q: "Ransomware targets?", opts: ["Privacy", "Availability", "Speed"], a: 1 }, { q: "Spyware steals data?", opts: ["True", "False"], a: 0 }]
  },
  { 
    id: 10, title: "10. Incident Response", videoGuidance: "q_p3_mS8eUo",
    briefing: { objective: "Manage the lifecycle of a security breach.", concepts: [{ term: "Containment", desc: "Stopping the spread." }, { term: "Lessons Learned", desc: "Preventing recurrence." }], technicalNote: "Speed of response determines the total cost of the breach." },
    lab: { environment: "IR-Logview", steps: ["find-failed-logins", "isolate-host-ip", "dump-ram-memory"] },
    quiz: [{ q: "Step 1 of IR?", opts: ["Containment", "Preparation", "Eradication"], a: 1 }, { q: "Evidence must have a...", opts: ["Label", "Chain of Custody", "Password"], a: 1 }, { q: "Containment stops spread?", opts: ["True", "False"], a: 0 }]
  },
  { 
    id: 11, title: "11. Digital Forensics", videoGuidance: "N_B3_j8_Gk",
    briefing: { objective: "Recover and preserve digital evidence.", concepts: [{ term: "Volatility", desc: "The order in which data is lost." }, { term: "Chain of Custody", desc: "Legal tracking of evidence." }], technicalNote: "Never analyze a live drive; always analyze a 'bit-for-bit' copy." },
    lab: { environment: "Forensic-Toolkit", steps: ["extract-exif-data", "recover-deleted-files", "verify-disk-image"] },
    quiz: [{ q: "Volatile memory is?", opts: ["HDD", "RAM", "SSD"], a: 1 }, { q: "Delete file = Gone forever?", opts: ["Yes", "No"], a: 1 }, { q: "Write blockers protect data?", opts: ["True", "False"], a: 0 }]
  },
  { 
    id: 12, title: "12. Penetration Testing", videoGuidance: "3Kq1MIfTWCE",
    briefing: { objective: "Ethically identify vulnerabilities.", concepts: [{ term: "Recon", desc: "Information gathering." }, { term: "Exploitation", desc: "Gaining access." }], technicalNote: "Reporting is the most important part of a pentest." },
    lab: { environment: "Kali-Linux", steps: ["nmap -sV 192.168.1.1", "searchsploit apache", "metasploit-check"] },
    quiz: [{ q: "White Hat is ethical?", opts: ["True", "False"], a: 0 }, { q: "What is Nmap for?", opts: ["Word processing", "Network scanning", "Music"], a: 1 }, { q: "Exploit = Payload?", opts: ["True", "False"], a: 0 }]
  },
  { 
    id: 13, title: "13. Cloud Security", videoGuidance: "4nN_9mN8_Xw",
    briefing: { objective: "Manage security in virtualized environments.", concepts: [{ term: "IAM", desc: "Identity and Access Management." }, { term: "S3 Security", desc: "Protecting cloud storage." }], technicalNote: "Misconfiguration is the #1 cause of cloud data leaks." },
    lab: { environment: "Cloud-Shell", steps: ["aws-iam-list-users", "check-bucket-policy", "enable-cloudtrail"] },
    quiz: [{ q: "SaaS = Software as a Service?", opts: ["True", "False"], a: 0 }, { q: "Who secures the physical DC?", opts: ["Customer", "Provider", "Government"], a: 1 }, { q: "Is MFA required in Cloud?", opts: ["No", "Best Practice"], a: 1 }]
  },
  { 
    id: 14, title: "14. GRC & Compliance", videoGuidance: "9f0m8s_u8",
    briefing: {
      objective: "Navigate legal requirements (GDPR, HIPAA).",
      concepts: [{ term: "GDPR", desc: "Privacy for EU citizens." }, { term: "PCI-DSS", desc: "Credit card security." }],
      technicalNote: "Compliance is a baseline, not a ceiling for security."
    },
    lab: { environment: "Audit-Log", steps: ["review-privacy-policy", "map-nist-controls", "check-data-retention"] },
    quiz: [{ q: "GDPR is for which region?", opts: ["USA", "EU", "China"], a: 1 }, { q: "HIPAA is for?", opts: ["Health", "Finance", "Gaming"], a: 0 }, { q: "Compliance = Security?", opts: ["Yes", "No"], a: 1 }]
  },
  { 
    id: 15, title: "15. AI & Quantum Future", videoGuidance: "5mN8_P9_uQ",
    briefing: { objective: "Prepare for the next generation of threats.", concepts: [{ term: "PQC", desc: "Post-Quantum Cryptography." }, { term: "Deepfakes", desc: "AI-generated deception." }], technicalNote: "Quantum computers will break current encryption standards." },
    lab: { environment: "Future-Sim", steps: ["test-ai-bias", "check-quantum-resistance", "analyze-deepfake"] },
    quiz: [{ q: "Quantum breaks RSA?", opts: ["True", "False"], a: 0 }, { q: "AI can generate malware?", opts: ["Yes", "No"], a: 0 }, { q: "PQC is the future?", opts: ["True", "False"], a: 0 }]
  }
];

const masterTierQuestions = [
  { q: "Scenario: Firewall detects outbound traffic to C2. Action?", opts: ["Ignore", "Isolate Host", "Restart PC"], a: 1 },
  { q: "Defense against Pass-the-Hash?", opts: ["Passwords", "LAPS/MFA", "Antivirus"], a: 1 }
];

/* =========================
   APPLICATION COMPONENT
========================= */
export default function SecurityAcademy() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [view, setView] = useState("study");
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") !== "light");
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [scores, setScores] = useState<Record<number, number>>(() => JSON.parse(localStorage.getItem("master_progress_v2") || "{}"));
  
  // Terminal Logic
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const theme = {
    bg: isDark ? "#020617" : "#F8FAFC",
    card: isDark ? "#0F172A" : "#FFFFFF",
    text: isDark ? "#F8FAFC" : "#1E293B",
    sub: isDark ? "#94A3B8" : "#64748B",
    border: isDark ? "#1E293B" : "#E2E8F0",
    accent: "#3B82F6",
    surface: isDark ? "#1E293B" : "#F1F5F9"
  };

  const cur = lessonsData[step] || lessonsData[0];
  const finalExamData = useMemo(() => [...lessonsData.flatMap(m => m.quiz), ...masterTierQuestions], []);

  useEffect(() => { terminalEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [terminalHistory]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;
    const isCorrect = cur.lab.steps.some(s => currentInput.toLowerCase().includes(s.split(' ')[0]));
    setTerminalHistory([...terminalHistory, `> ${currentInput}`, isCorrect ? `[SUCCESS] Output generated for ${currentInput}...` : `[ERROR] Command '${currentInput}' not recognized in this environment.`]);
    setCurrentInput("");
  };

  const startAssessment = (mode: "module" | "final") => {
    const qs = mode === "final" ? finalExamData : cur.quiz;
    setQuizAnswers(new Array(qs.length).fill(-1));
    setTimeLeft(mode === "final" ? 1800 : 120);
    setIsTimerActive(true);
    setView(mode === "final" ? "finalExam" : "quiz");
  };

  const submitAssessment = () => {
    setIsTimerActive(false);
    const qs = view === "finalExam" ? finalExamData : cur.quiz;
    const correct = quizAnswers.filter((a, i) => a === qs[i].a).length;
    const score = Math.round((correct / qs.length) * 100);
    if (view === "finalExam") {
      if (score >= 80) setView("finished");
      else { setScores({ ...scores, [-1]: score }); setView("result"); }
    } else {
      setScores({ ...scores, [step]: score });
      localStorage.setItem("master_progress_v2", JSON.stringify({ ...scores, [step]: score }));
      setView("result");
    }
  };

  return (
    <div style={{ ...styles.layout, background: theme.bg, color: theme.text }}>
      <aside style={{ ...styles.sidebar, background: theme.card, borderRight: `1px solid ${theme.border}` }}>
        <div style={styles.sbHeader}>
          <h2 style={{ color: theme.accent }}>CYBER-CORE</h2>
          <button onClick={() => setIsDark(!isDark)} style={styles.iconBtn}>{isDark ? "☀️" : "🌙"}</button>
        </div>
        <div style={styles.navScroll}>
          {lessonsData.map((m, i) => (
            <button key={m.id} onClick={() => { setStep(i); setView("study"); setTerminalHistory([]); }} style={{
              ...styles.navBtn,
              background: step === i && view === "study" ? theme.accent : 'transparent',
              color: step === i && view === "study" ? "#FFF" : theme.sub
            }}>
              <span style={{ width: '25px', fontWeight: 800 }}>{i + 1}</span> {m.title.split('. ')[1]}
              {scores[i] >= 60 && <span style={{ marginLeft: 'auto' }}>✅</span>}
            </button>
          ))}
          <div style={{ ...styles.divider, background: theme.border }} />
          <button disabled={!lessonsData.every((_, i) => (scores[i] || 0) >= 60)} onClick={() => startAssessment("final")} style={styles.finalBtn}>🏆 FINAL EXAM</button>
        </div>
      </aside>

      <main style={styles.main}>
        <AnimatePresence mode="wait">
          {view === "study" && (
            <motion.div key="s" style={{ ...styles.card, background: theme.card, borderColor: theme.border }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={styles.cardHeader}>
                <div><h1>{cur.title}</h1><p style={{ color: theme.sub }}>{cur.briefing.objective}</p></div>
                <button onClick={() => startAssessment("module")} style={{ ...styles.primaryBtn, background: theme.accent }}>Start Exam</button>
              </div>

              <div style={styles.videoPlaceholder}>
                <iframe src={`https://www.youtube.com/embed/${cur.videoGuidance}`} style={styles.full} title="Lesson" />
              </div>

              <div style={styles.studyGrid}>
                <div style={{ ...styles.briefingBox, background: theme.surface }}>
                  <h3 style={styles.sectionTitle}>TECHNICAL BRIEFING</h3>
                  {cur.briefing.concepts.map((c, i) => (
                    <div key={i} style={{ marginBottom: '12px' }}>
                      <strong style={{ color: theme.accent, fontSize: '0.9rem' }}>{c.term}</strong>
                      <p style={{ margin: '2px 0', fontSize: '0.85rem', color: theme.sub }}>{c.desc}</p>
                    </div>
                  ))}
                  <div style={styles.noteBox}><strong>PRO-TIP:</strong> {cur.briefing.technicalNote}</div>
                </div>

                <div style={styles.labBox}>
                  <h3 style={{ ...styles.sectionTitle, color: '#94A3B8' }}>LIVE TERMINAL SIMULATOR</h3>
                  <div style={styles.terminalWindow}>
                    <div style={styles.termScroll}>
                      <p style={{ color: '#64748B', margin: 0 }}>// Connected to {cur.lab.environment}</p>
                      <p style={{ color: '#10B981', fontSize: '0.8rem' }}>Required tasks: {cur.lab.steps.join(", ")}</p>
                      {terminalHistory.map((line, i) => <div key={i} style={{ color: line.startsWith('>') ? '#3B82F6' : '#10B981', margin: '2px 0' }}>{line}</div>)}
                      <div ref={terminalEndRef} />
                    </div>
                    <form onSubmit={handleTerminalSubmit} style={styles.termForm}>
                      <span style={{ color: '#3B82F6', marginRight: '5px' }}>$</span>
                      <input autoFocus value={currentInput} onChange={(e) => setCurrentInput(e.target.value)} style={styles.termInput} placeholder="Type command..." />
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {(view === "quiz" || view === "finalExam") && (
            <motion.div key="q" style={{ ...styles.card, background: theme.card, borderColor: theme.border }} initial={{ x: 20 }}>
                <div style={styles.qHeader}>
                    <h2>{view === "finalExam" ? "Global Certification" : "Assessment"}</h2>
                    <div style={{ ...styles.timer, color: timeLeft < 60 ? '#EF4444' : theme.accent }}>TIME: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>
                </div>
                <div style={styles.qScroll}>
                    {(view === "finalExam" ? finalExamData : cur.quiz).map((q, i) => (
                        <div key={i} style={styles.qGroup}>
                            <p style={{ marginBottom: '10px' }}><strong>{i + 1}. {q.q}</strong></p>
                            {q.opts.map((o, oi) => (
                                <button key={oi} onClick={() => { const a = [...quizAnswers]; a[i] = oi; setQuizAnswers(a); }}
                                    style={{ ...styles.opt, background: theme.surface, color: theme.text, borderColor: quizAnswers[i] === oi ? theme.accent : 'transparent' }}>{o}</button>
                            ))}
                        </div>
                    ))}
                </div>
                <button onClick={submitAssessment} style={{ ...styles.primaryBtn, background: theme.accent, width: '100%' }}>Finalize Transmission</button>
            </motion.div>
          )}

          {view === "result" && (
            <motion.div key="r" style={{ ...styles.card, background: theme.card, textAlign: 'center' }} initial={{ scale: 0.9 }}>
              <h1 style={{ fontSize: '4rem' }}>{scores[view === "finalExam" ? -1 : step] >= 60 ? "🛰️" : "📡"}</h1>
              <h2>Node Score: {scores[view === "finalExam" ? -1 : step]}%</h2>
              <button onClick={() => setView("study")} style={{ ...styles.primaryBtn, background: theme.accent }}>Re-initialize Node</button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

const styles: any = {
  layout: { display: 'flex', height: '100vh', fontFamily: 'Inter, sans-serif' },
  sidebar: { width: '280px', display: 'flex', flexDirection: 'column', padding: '10px' },
  sbHeader: { padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  navScroll: { flex: 1, overflowY: 'auto', padding: '5px' },
  navBtn: { width: '100%', padding: '10px', border: 'none', borderRadius: '6px', textAlign: 'left', cursor: 'pointer', marginBottom: '3px', fontSize: '0.85rem', display: 'flex', transition: '0.1s' },
  divider: { height: '1px', margin: '15px 0' },
  finalBtn: { width: '100%', padding: '12px', border: 'none', borderRadius: '8px', background: '#8B5CF6', color: '#FFF', fontWeight: 800, cursor: 'pointer' },
  main: { flex: 1, padding: '25px', overflowY: 'auto' },
  card: { padding: '25px', borderRadius: '16px', border: '1px solid', maxWidth: '1050px', margin: '0 auto' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '20px' },
  videoPlaceholder: { width: '100%', aspectRatio: '16/9', borderRadius: '10px', overflow: 'hidden', background: '#000', marginBottom: '20px' },
  full: { width: '100%', height: '100%', border: 'none' },
  studyGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  briefingBox: { padding: '18px', borderRadius: '10px' },
  sectionTitle: { fontSize: '0.7rem', letterSpacing: '1.5px', marginBottom: '15px', opacity: 0.8 },
  noteBox: { marginTop: '15px', padding: '12px', borderRadius: '6px', background: 'rgba(59, 130, 246, 0.1)', fontSize: '0.8rem' },
  labBox: { borderRadius: '10px', display: 'flex', flexDirection: 'column' },
  terminalWindow: { flex: 1, background: '#0F172A', borderRadius: '10px', padding: '15px', fontFamily: 'Fira Code, monospace', display: 'flex', flexDirection: 'column', minHeight: '250px' },
  termScroll: { flex: 1, overflowY: 'auto', fontSize: '0.8rem', marginBottom: '10px' },
  termForm: { display: 'flex', borderTop: '1px solid #1E293B', paddingTop: '10px' },
  termInput: { background: 'none', border: 'none', color: '#FFF', outline: 'none', flex: 1, fontSize: '0.8rem' },
  qHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '20px' },
  timer: { fontWeight: 800, fontSize: '1rem' },
  qScroll: { maxHeight: '50vh', overflowY: 'auto', marginBottom: '20px' },
  qGroup: { marginBottom: '20px' },
  opt: { display: 'block', width: '100%', padding: '12px', textAlign: 'left', borderRadius: '8px', border: '2px solid', marginBottom: '6px', cursor: 'pointer' },
  primaryBtn: { padding: '10px 20px', border: 'none', borderRadius: '8px', color: '#FFF', fontWeight: 700, cursor: 'pointer' },
  iconBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }
};