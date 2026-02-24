import React, { useState, useEffect, useRef } from "react";
import {
  Shield,
  Terminal as TerminalIcon,
  Sun,
  Moon,
  CheckCircle2
} from "lucide-react";

/* =========================
   16 TRAINING MODULES + FINAL EXAM
========================= */

const modulesData = [
  {
    id: 1,
    category: "Foundations",
    title: "Security Mindset",
    videoId: "inWWhr59860",
    briefing: "Identify system context before defending it.",
    content:
      "Security is not just about tools—it's about mindset. Understand the environment, assets, potential threats, and attack vectors before implementing defenses. Developing a security mindset allows you to anticipate attacks and think like a hacker.",
    reference: "https://www.sans.org/white-papers/33821/",
    tasks: [
      { desc: "Identify current user", validate: (cmd) => cmd === "whoami", output: "cyber_agent" },
      { desc: "Check uptime", validate: (cmd) => cmd === "uptime", output: "up 5 hours 12 minutes", flag: "FLAG{mindset_mastered}" }
    ]
  },
  {
    id: 2,
    category: "Foundations",
    title: "CIA Triad",
    videoId: "oF7SBrX7S78",
    briefing: "Verify file integrity.",
    content:
      "The CIA Triad—Confidentiality, Integrity, and Availability—is a foundational concept in cybersecurity. Learn how each principle protects data, ensures authenticity, and maintains system uptime. Integrity verification (like hashing) ensures files haven't been tampered with.",
    reference: "https://www.cisco.com/c/en/us/products/security/what-is-cybersecurity.html",
    tasks: [
      { desc: "Hash file", validate: (cmd) => cmd === "md5sum notes.txt", output: "d41d8cd98f00b204e9800998ecf8427e", flag: "FLAG{integrity_verified}" }
    ]
  },
  {
    id: 3,
    category: "Foundations",
    title: "Linux Basics",
    videoId: "ZtqBQ68cfJc",
    briefing: "Navigate file system.",
    content:
      "Linux is the backbone of many security and server environments. Learn file navigation, permission management, and command-line basics. These skills are essential for both offensive and defensive cybersecurity tasks.",
    reference: "https://linuxjourney.com/",
    tasks: [
      { desc: "List files", validate: (cmd) => cmd === "ls", output: "secret.txt" },
      { desc: "Read file", validate: (cmd) => cmd === "cat secret.txt", output: "FLAG{linux_master}" }
    ]
  },
  {
    id: 4,
    category: "Operations",
    title: "Networking Basics",
    videoId: "qiQR5rTSshw",
    briefing: "Check IP configuration.",
    content:
      "Networking is core to cybersecurity. Understand IP addresses, subnetting, routing, and basic network troubleshooting. This knowledge is vital for scanning, monitoring, and securing networks.",
    reference: "https://www.cisco.com/c/en/us/solutions/enterprise-networks/what-is-networking.html",
    tasks: [
      { desc: "Check IP", validate: (cmd) => cmd === "ifconfig" || cmd === "ip a", output: "inet 192.168.1.10", flag: "FLAG{network_identified}" }
    ]
  },
  {
    id: 5,
    category: "Operations",
    title: "Port Scanning",
    videoId: "3Kq1MIfTWCE",
    briefing: "Discover open ports.",
    content:
      "Port scanning helps identify services running on a target machine and potential attack vectors. Learn how tools like Nmap can be used ethically for reconnaissance.",
    reference: "https://nmap.org/book/man.html",
    tasks: [
      { desc: "Scan target", validate: (cmd) => cmd.includes("nmap"), output: "22/tcp open ssh", flag: "FLAG{port_scanned}" }
    ]
  },
  {
    id: 6,
    category: "Operations",
    title: "SSH Access",
    videoId: "zQhQYbO3O6A",
    briefing: "Access remote machine.",
    content:
      "SSH (Secure Shell) allows secure remote access to servers. Understand authentication methods, key management, and secure configuration to maintain system security.",
    reference: "https://www.ssh.com/ssh/",
    tasks: [
      { desc: "Connect via SSH", validate: (cmd) => cmd.includes("ssh"), output: "Welcome to remote server", flag: "FLAG{ssh_access}" }
    ]
  },
  {
    id: 7,
    category: "Web Security",
    title: "SQL Injection",
    videoId: "2_l0S4P5_BM",
    briefing: "Bypass login.",
    content:
      "SQL Injection is a common web vulnerability where unsanitized input allows attackers to manipulate the database. Learn detection, exploitation, and prevention techniques.",
    reference: "https://owasp.org/www-community/attacks/SQL_Injection",
    tasks: [
      { desc: "Inject SQL", validate: (cmd) => cmd.includes("' or 1=1"), output: "Login successful", flag: "FLAG{sql_bypass}" }
    ]
  },
  {
    id: 8,
    category: "Web Security",
    title: "XSS Attack",
    videoId: "EoaDgUgS6QA",
    briefing: "Inject JavaScript.",
    content:
      "Cross-Site Scripting (XSS) allows attackers to inject malicious scripts into web pages. Learn about stored, reflected, and DOM-based XSS attacks, and how to mitigate them.",
    reference: "https://owasp.org/www-community/attacks/xss/",
    tasks: [
      { desc: "Inject script", validate: (cmd) => cmd.includes("<script>"), output: "Alert triggered", flag: "FLAG{xss_executed}" }
    ]
  },
  {
    id: 9,
    category: "Web Security",
    title: "Directory Enumeration",
    videoId: "v2p9VZy6P6E",
    briefing: "Discover hidden directories.",
    content:
      "Directory enumeration reveals hidden files and directories on a server. This information helps testers understand application structure and potential vulnerabilities.",
    reference: "https://owasp.org/www-community/attacks/Directory_Traversal",
    tasks: [
      { desc: "Run dirb", validate: (cmd) => cmd.includes("dirb"), output: "/admin found", flag: "FLAG{dir_enum}" }
    ]
  },
  {
    id: 10,
    category: "Offensive",
    title: "Password Cracking",
    videoId: "7U-RbOKanYs",
    briefing: "Crack hashed password.",
    content:
      "Passwords are often the weakest link. Learn cracking techniques, hash types, and password policies. Understanding these concepts helps both attackers and defenders.",
    reference: "https://www.kali.org/tools/hashcat/",
    tasks: [
      { desc: "Run hashcat", validate: (cmd) => cmd.includes("hashcat"), output: "Password cracked: admin123", flag: "FLAG{password_cracked}" }
    ]
  },
  {
    id: 11,
    category: "Offensive",
    title: "Privilege Escalation",
    videoId: "kMG4oXxKsl0",
    briefing: "Escalate privileges.",
    content:
      "Privilege escalation is gaining higher access on a system. Learn common Linux and Windows escalation techniques, and how to prevent them as a defender.",
    reference: "https://www.owasp.org/index.php/Privilege_Escalation",
    tasks: [
      { desc: "Check sudo", validate: (cmd) => cmd === "sudo -l", output: "User may run all commands", flag: "FLAG{root_access}" }
    ]
  },
  {
    id: 12,
    category: "Offensive",
    title: "Reverse Shell",
    videoId: "Vn5f7zIuZrA",
    briefing: "Get reverse shell.",
    content:
      "A reverse shell allows an attacker to remotely control a system. Learn how they work, and understand how to detect and block them for defense.",
    reference: "https://www.offensive-security.com/metasploit-unleashed/reverse-shells/",
    tasks: [
      { desc: "Execute payload", validate: (cmd) => cmd.includes("nc"), output: "Connection received", flag: "FLAG{reverse_shell}" }
    ]
  },
  {
    id: 13,
    category: "Defensive",
    title: "Log Analysis",
    videoId: "5qG7Yc4O5mE",
    briefing: "Analyze system logs.",
    content:
      "Logs are critical for detecting attacks and understanding incidents. Learn how to interpret logs, identify anomalies, and monitor systems effectively.",
    reference: "https://www.sans.org/cyber-security-courses/log-analysis/",
    tasks: [
      { desc: "Check auth log", validate: (cmd) => cmd === "cat /var/log/auth.log", output: "Failed password for root", flag: "FLAG{log_analyzed}" }
    ]
  },
  {
    id: 14,
    category: "Defensive",
    title: "Firewall Rules",
    videoId: "6qD7rT9YfO0",
    briefing: "List firewall rules.",
    content:
      "Firewalls control network traffic. Learn about inbound/outbound rules, chains, and best practices for securing systems against unauthorized access.",
    reference: "https://www.cisco.com/c/en/us/products/security/firewalls/what-is-a-firewall.html",
    tasks: [
      { desc: "Check iptables", validate: (cmd) => cmd === "iptables -L", output: "ACCEPT all -- anywhere anywhere", flag: "FLAG{firewall_checked}" }
    ]
  },
  {
    id: 15,
    category: "Defensive",
    title: "Incident Response",
    videoId: "9a2fH7UoQ8M",
    briefing: "Find malicious process.",
    content:
      "Incident response involves detecting, analyzing, and mitigating security incidents. Learn steps to contain threats, investigate breaches, and recover securely.",
    reference: "https://www.us-cert.gov/ncas/tips/ST04-001",
    tasks: [
      { desc: "List processes", validate: (cmd) => cmd === "ps aux", output: "malware_process running", flag: "FLAG{incident_handled}" }
    ]
  },
  {
    id: 16,
    category: "Exam",
    title: "Final Exam",
    videoId: "",
    briefing: "Complete all tasks below. You have 45 minutes! Only unlocked after completing all modules.",
    content:
      "This final exam tests your mastery of all prior modules. Make sure you have understood each concept and practiced all exercises.",
    reference: "https://www.coursera.org/learn/cyber-security",
    tasks: [
      { desc: "Identify current user", validate: (cmd) => cmd === "whoami", output: "cyber_agent", flag: "FLAG{mindset_mastered}" },
      { desc: "Hash file", validate: (cmd) => cmd === "md5sum notes.txt", output: "d41d8cd98f00b204e9800998ecf8427e", flag: "FLAG{integrity_verified}" },
      { desc: "Check IP", validate: (cmd) => cmd === "ifconfig" || cmd === "ip a", output: "inet 192.168.1.10", flag: "FLAG{network_identified}" },
      { desc: "Scan target", validate: (cmd) => cmd.includes("nmap"), output: "22/tcp open ssh", flag: "FLAG{port_scanned}" },
      { desc: "Inject SQL", validate: (cmd) => cmd.includes("' or 1=1"), output: "Login successful", flag: "FLAG{sql_bypass}" }
    ]
  }
];

/* =========================
   SECURITY ACADEMY COMPONENT
========================= */

export default function SecurityAcademy() {
  const [activeId, setActiveId] = useState(1);
  const [isDark, setIsDark] = useState(true);
  const [input, setInput] = useState("");
  const [progress, setProgress] = useState(Object.fromEntries(modulesData.map((m) => [m.id, 0])));
  const [histories, setHistories] = useState(Object.fromEntries(modulesData.map((m) => [m.id, [{ type: "sys", content: "[SYSTEM] Lab initialized." }]])));
  const [examTime, setExamTime] = useState(45 * 60);
  const [examCompleted, setExamCompleted] = useState(false);
  const terminalEndRef = useRef(null);

  const currentModule = modulesData.find((m) => m.id === activeId);
  const currentTask = currentModule.tasks[progress[activeId]];
  const isExam = currentModule.category === "Exam";
  const allModulesCompleted = modulesData.slice(0, 15).every((m) => progress[m.id] >= m.tasks.length);

  // Scroll terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [histories, activeId]);

  // Exam timer
  useEffect(() => {
    if (!isExam || examCompleted) return;
    const interval = setInterval(() => {
      setExamTime((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isExam, examCompleted]);

  // Command handler
  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newLines = [{ type: "user", content: `agent@lab:~$ ${input}` }];

    if (!currentTask) {
      if (isExam) {
        newLines.push({ type: "success", content: "Exam Completed ✔ Redirecting to Dashboard..." });
        setExamCompleted(true);
        setTimeout(() => alert("Redirecting to Dashboard..."), 1000);
      } else {
        newLines.push({ type: "success", content: "Module Completed ✔" });
      }
    } else if (cmd === "help") {
      newLines.push({ type: "sys", content: `Task: ${currentTask.desc}` });
    } else if (cmd === "clear") {
      setHistories((prev) => ({ ...prev, [activeId]: [{ type: "sys", content: "[SYSTEM] Terminal cleared." }] }));
      setInput("");
      return;
    } else if (currentTask.validate(cmd)) {
      newLines.push({ type: "sys", content: currentTask.output });
      if (currentTask.flag) newLines.push({ type: "success", content: `Flag captured: ${currentTask.flag}` });
      setProgress((prev) => ({ ...prev, [activeId]: prev[activeId] + 1 }));
    } else {
      newLines.push({ type: "error", content: "Command not recognized." });
    }

    setHistories((prev) => ({ ...prev, [activeId]: [...prev[activeId], ...newLines] }));
    setInput("");
  };

  const theme = {
    bg: isDark ? "#020617" : "#F8FAFC",
    surface: isDark ? "#0F172A" : "#FFFFFF",
    text: isDark ? "#F8FAFC" : "#0F172A",
    accent: "#3B82F6",
    success: "#10B981"
  };

  const formatTime = (seconds) => `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

  return (
    <div style={{ display: "flex", height: "100vh", background: theme.bg, color: theme.text }}>
      {/* Sidebar */}
      <aside style={{ width: 260, background: theme.surface, display: "flex", flexDirection: "column", borderRight: "1px solid #1e293b" }}>
        <div style={{ padding: 20, borderBottom: "1px solid #1e293b" }}>
          <div style={{ display: "flex", gap: 10 }}>
            <Shield size={18} />
            <h3>CYBER CORE</h3>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 15 }}>
          {modulesData.map((m) => {
            const locked = m.category === "Exam" && !allModulesCompleted;
            return (
              <div
                key={m.id}
                onClick={() => !locked && setActiveId(m.id)}
                style={{
                  padding: 8,
                  marginBottom: 8,
                  borderRadius: 6,
                  cursor: locked ? "not-allowed" : "pointer",
                  background: activeId === m.id ? theme.accent : "transparent",
                  opacity: locked ? 0.5 : 1
                }}
              >
                {m.title}
                {progress[m.id] >= m.tasks.length && <CheckCircle2 size={14} color={theme.success} style={{ marginLeft: 6 }} />}
              </div>
            );
          })}
        </div>
        <div style={{ padding: 15 }}>
          <button onClick={() => setIsDark(!isDark)} style={{ width: "100%", padding: 8 }}>
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: 40, overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1>{currentModule.title}</h1>
          {isExam && <div style={{ fontFamily: "monospace", fontWeight: "bold" }}>Time Left: {formatTime(examTime)}</div>}
        </div>

        {currentModule.videoId && (
          <div style={{ aspectRatio: "16/9", marginBottom: 30 }}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${currentModule.videoId}`}
              allowFullScreen
              style={{ borderRadius: 12 }}
            />
          </div>
        )}

        <div style={{ marginBottom: 20, background: theme.surface, padding: 20, borderRadius: 12 }}>
          <strong>Briefing:</strong>
          <p>{currentModule.briefing}</p>
          <strong>Description:</strong>
          <p>{currentModule.content}</p>
          {currentModule.reference && (
            <p>
              <strong>Learn More:</strong>{" "}
              <a href={currentModule.reference} target="_blank" rel="noopener noreferrer" style={{ color: theme.accent }}>
                Reference Link
              </a>
            </p>
          )}
        </div>

        <div style={{ marginBottom: 20, background: "#111", padding: 15, borderRadius: 12 }}>
          <strong>Tasks:</strong>
          <ul style={{ paddingLeft: 20, color: "#ccc" }}>
            {currentModule.tasks.map((t, i) => (
              <li key={i}>{t.desc}</li>
            ))}
          </ul>
        </div>

        {/* Terminal */}
        <div style={{ height: 400, background: "#000", borderRadius: 12, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: 10, background: "#111" }}>
            <TerminalIcon size={14} color={theme.accent} />
          </div>
          <div style={{ flex: 1, padding: 20, overflowY: "auto", fontFamily: "monospace" }}>
            {histories[activeId].map((line, i) => (
              <div key={i} style={{ color: line.type === "success" ? theme.success : line.type === "error" ? "#ef4444" : "#ccc" }}>
                {line.content}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          <form onSubmit={handleCommand} style={{ display: "flex", padding: 10, background: "#050505" }}>
            <span style={{ color: theme.accent }}>$</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ background: "none", border: "none", outline: "none", color: "#fff", flex: 1, marginLeft: 8 }}
            />
          </form>
        </div>
      </main>
    </div>
  );
}
