import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Sun, 
  Moon, 
  Globe, 
  Trophy, 
  ChevronRight,
  ArrowRight
} from "lucide-react";

/* =========================
   COURSE DATA
========================= */
const modules = [
  { id: 1, category: "Basics", title: "Internet Governance Basics", subtitle: "Understanding the rules of the road.", content: "Internet governance is the development and application by governments, the private sector, and civil society, in their respective roles, of shared principles, norms, rules, decision-making procedures, and programmes that shape the evolution and use of the Internet.", reference: "https://www.internetsociety.org/issues/governance/", tasks: ["Define Internet Governance", "Identify key actors"], examQuestion: "Which group is NOT typically included in the 'multistakeholder' model?", options: ["Governments", "Civil Society", "Private Sector", "Artificial Intelligence"], answer: "Artificial Intelligence" },
  { id: 2, category: "Models", title: "Stakeholders & Multistakeholder Model", subtitle: "Who shapes the web?", content: "The multistakeholder model of Internet governance is a collaborative, bottom-up approach to policy-making. It ensures that those who have a stake in the Internet have a voice in how it is governed.", reference: "https://www.icann.org/resources/pages/governance", tasks: ["List the stakeholders", "Explain multistakeholderism"], examQuestion: "What is the primary characteristic of the multistakeholder model?", options: ["Top-down control", "Bottom-up collaboration", "Strict government-only rule", "Military oversight"], answer: "Bottom-up collaboration" },
  { id: 3, category: "Infrastructure", title: "ICANN and DNS Management", subtitle: "The internet's phonebook", content: "ICANN coordinates the Internet's unique identifiers worldwide. Without this coordination, we wouldn't have a single global Internet. This includes the Domain Name System (DNS) and IP address allocation.", reference: "https://www.icann.org/", tasks: ["Explain DNS", "Identify ICANN's role"], examQuestion: "What does DNS stand for?", options: ["Digital Network System", "Domain Name System", "Data Node Security", "Distributed Name Service"], answer: "Domain Name System" },
  { id: 4, category: "Standards", title: "IETF & W3C", subtitle: "Engineers behind the web", content: "The IETF (Internet Engineering Task Force) makes the Internet work better by producing high-quality, relevant technical documents that influence how people design, use, and manage the Internet.", reference: "https://www.ietf.org/", tasks: ["List major protocols", "Explain standardization process"], examQuestion: "Which organization is primarily responsible for World Wide Web standards?", options: ["ICANN", "IETF", "W3C", "IEEE"], answer: "W3C" },
  { id: 5, category: "Policy", title: "Privacy & Data Protection", subtitle: "Protecting digital citizens", content: "Privacy regulations like GDPR in Europe have set a global standard for how personal data should be handled, giving users more control over their digital footprint.", reference: "https://gdpr.eu/", tasks: ["Explain GDPR", "Identify privacy best practices"], examQuestion: "In which region was the GDPR enacted?", options: ["USA", "European Union", "China", "Brazil"], answer: "European Union" },
  { id: 6, category: "Security", title: "Cybersecurity Policy", subtitle: "Defending the digital world", content: "Cybersecurity governance involves the strategy and policy framework required to protect global infrastructure from malicious actors while maintaining openness.", reference: "https://www.un.org/cybersecurity", tasks: ["List major threats", "Explain IGF's role"], examQuestion: "What does IGF stand for in the context of global policy?", options: ["Internet Gatekeeper Force", "International Global Framework", "Internet Governance Forum", "Internal Gateway Firewall"], answer: "Internet Governance Forum" },
  { id: 7, category: "Access", title: "Digital Divide", subtitle: "Bridging gaps in connectivity", content: "The digital divide refers to the gap between demographics and regions that have access to modern information and communications technology and those that don't.", reference: "https://www.itu.int/en/ITU-D/Statistics/", tasks: ["Identify challenges", "Explain bridging strategies"], examQuestion: "Which factor is a major cause of the Digital Divide?", options: ["Excessive bandwidth", "Infrastructure costs", "Too many satellites", "Open source software"], answer: "Infrastructure costs" },
  { id: 8, category: "Rights", title: "Net Neutrality", subtitle: "Ensuring fair traffic", content: "Net neutrality is the principle that Internet service providers (ISPs) must treat all Internet communications equally, and not discriminate or charge differently.", reference: "https://www.battleforthenet.com/", tasks: ["Define net neutrality", "List global laws"], examQuestion: "Net Neutrality prevents ISPs from doing what?", options: ["Providing email", "Throttling or blocking content", "Selling routers", "Repairing cables"], answer: "Throttling or blocking content" },
  { id: 9, category: "Future", title: "AI Ethics", subtitle: "Governing digital decisions", content: "As AI becomes integrated into governance, ethical frameworks are required to ensure transparency, accountability, and fairness in algorithmic decision-making.", reference: "https://www.oecd.org/going-digital/ai/principles/", tasks: ["Identify AI risks", "Explain ethical frameworks"], examQuestion: "What is a primary concern in AI governance?", options: ["Hardware speed", "Algorithmic bias", "Keyboard layout", "Monitor resolution"], answer: "Algorithmic bias" },
  { id: 10, category: "Risks", title: "The Splinternet", subtitle: "Cyber sovereignty & fragmentation", content: "The Splinternet refers to the fragmentation of the internet due to technology, commerce, politics, nationalism, religion, and interests of different countries.", reference: "https://www.cfr.org/backgrounder/splinternet", tasks: ["Explain splinternet", "Identify consequences"], examQuestion: "What is 'Cyber Sovereignty' often associated with?", options: ["Global cooperation", "National control over the internet", "Free access for all", "Eliminating borders"], answer: "National control over the internet" },
];

/* =========================
   MAIN COMPONENT
========================= */
export default function InternetGovernanceCourse() {
  const [activeId, setActiveId] = useState(1);
  const [isDark, setIsDark] = useState(false);
  const [view, setView] = useState("lesson"); // lesson | exam-intro | exam-active | exam-result
  const [examAnswers, setExamAnswers] = useState({});
  const [examScore, setExamScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600);

  const theme = {
    bg: isDark ? "#020617" : "#F8FAFC",
    surface: isDark ? "#0F172A" : "#FFFFFF",
    sidebar: isDark ? "#0F172A" : "#F1F5F9",
    text: isDark ? "#F8FAFC" : "#0F172A",
    sub: isDark ? "#94A3B8" : "#64748B",
    border: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.1)",
    accent: "#3B82F6",
    success: "#10B981",
    error: "#EF4444"
  };

  const currentModule = modules.find(m => m.id === activeId);

  // TIMER
  useEffect(() => {
    let timer;
    if (view === "exam-active" && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && view === "exam-active") {
      submitExam();
    }
    return () => clearInterval(timer);
  }, [view, timeLeft]);

  const startExam = () => {
    setExamAnswers({});
    setTimeLeft(600);
    setView("exam-active");
  };

  const submitExam = () => {
    let score = 0;
    modules.forEach(m => {
      if (examAnswers[m.id] === m.answer) score += 1;
    });
    setExamScore(score);
    setView("exam-result");
  };

  const jumpToQuestion = (id) => {
    const el = document.getElementById(`q-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', background: theme.bg, color: theme.text, overflow: 'hidden', fontFamily: 'Inter, sans-serif' }}>
      
      {/* LEFT SIDEBAR */}
      <aside style={{ width: '300px', height: '100vh', background: theme.sidebar, borderRight: `1px solid ${theme.border}`, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '32px 24px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: theme.accent, padding: '8px', borderRadius: '10px' }}>
              <Globe size={20} color="white" />
            </div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 900, margin: 0, letterSpacing: '-0.5px' }}>GOV ACADEMY</h2>
          </div>
        </div>

        <nav style={{ flex: 1, overflowY: 'auto', padding: '0 16px' }} className="custom-scroller">
          {modules.map(mod => (
            <button
              key={mod.id}
              onClick={() => { setView("lesson"); setActiveId(mod.id); }}
              style={{
                width: '100%', padding: '12px 16px', textAlign: 'left', border: 'none', borderRadius: '12px', cursor: 'pointer', marginBottom: '6px',
                background: (activeId === mod.id && view === 'lesson') ? theme.accent : 'transparent',
                color: (activeId === mod.id && view === 'lesson') ? '#FFF' : theme.text,
                display: 'flex', alignItems: 'center', gap: '12px', transition: '0.2s'
              }}
            >
              <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: (activeId === mod.id && view === 'lesson') ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800 }}>
                {mod.id}
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, flex: 1 }}>{mod.title}</span>
            </button>
          ))}
          
          <div style={{ margin: '20px 0', height: '1px', background: theme.border }} />

          <button
            onClick={() => setView("exam-intro")}
            style={{
              width: '100%', padding: '16px', border: `2px dashed ${view.includes('exam') ? theme.accent : theme.border}`, borderRadius: '12px', cursor: 'pointer',
              background: view.includes('exam') ? `${theme.accent}10` : 'transparent', color: view.includes('exam') ? theme.accent : theme.sub,
              display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 800, fontSize: '0.9rem'
            }}
          >
            <Trophy size={18} /> FINAL EXAM
          </button>
        </nav>

        <div style={{ padding: '20px', borderTop: `1px solid ${theme.border}`, flexShrink: 0 }}>
          <button onClick={() => setIsDark(!isDark)} style={{ width: '100%', padding: '12px', background: theme.surface, border: `1px solid ${theme.border}`, color: theme.text, borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontWeight: 700 }}>
            {isDark ? <Sun size={16} /> : <Moon size={16} />} {isDark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT + RIGHT QUESTION SIDEBAR */}
      <main style={{ flex: 1, height: '100vh', display: 'flex', overflow: 'hidden', position: 'relative' }}>
        
        {/* LEFT SCROLLABLE CONTENT */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '60px', scrollBehavior: 'smooth' }} className="custom-scroller">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <AnimatePresence mode="wait">
              {/* LESSON VIEW */}
              {view === "lesson" && (
                <motion.div key="lesson" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <header style={{ marginBottom: '40px' }}>
                    <span style={{ color: theme.accent, fontWeight: 800, fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>{currentModule.category}</span>
                    <h1 style={{ fontSize: '2.8rem', fontWeight: 900, margin: '8px 0 16px', letterSpacing: '-1.5px' }}>{currentModule.title}</h1>
                    <p style={{ fontSize: '1.2rem', color: theme.sub, lineHeight: '1.5' }}>{currentModule.subtitle}</p>
                  </header>

                  <section style={{ background: theme.surface, padding: '40px', borderRadius: '24px', border: `1px solid ${theme.border}`, marginBottom: '32px' }}>
                    <p style={{ fontSize: '1.15rem', lineHeight: '1.8', margin: 0 }}>{currentModule.content}</p>
                  </section>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '48px' }}>
                    <div style={{ background: `${theme.accent}08`, padding: '24px', borderRadius: '20px', border: `1px solid ${theme.accent}20` }}>
                      <h4 style={{ margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px', color: theme.accent }}><CheckCircle2 size={18}/> Learning Tasks</h4>
                      {currentModule.tasks.map((task, i) => (
                        <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '10px', fontSize: '0.95rem' }}>
                          <div style={{ marginTop: '6px', width: '6px', height: '6px', borderRadius: '50%', background: theme.accent }} />
                          {task}
                        </div>
                      ))}
                    </div>
                    <div style={{ background: theme.surface, padding: '24px', borderRadius: '20px', border: `1px solid ${theme.border}` }}>
                      <h4 style={{ margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px', color: theme.sub }}><BookOpen size={18}/> Resource</h4>
                      <a href={currentModule.reference} target="_blank" rel="noreferrer" style={{ color: theme.accent, textDecoration: 'none', wordBreak: 'break-all', fontSize: '0.9rem', fontWeight: 600 }}>
                        Read Official Documentation <ArrowRight size={14} style={{ marginLeft: '4px' }}/>
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${theme.border}`, paddingTop: '32px' }}>
                    <button 
                      disabled={activeId === 1}
                      onClick={() => setActiveId(activeId - 1)}
                      style={{ padding: '12px 24px', borderRadius: '12px', border: `1px solid ${theme.border}`, background: theme.surface, cursor: activeId === 1 ? 'not-allowed' : 'pointer', fontWeight: 700, opacity: activeId === 1 ? 0.5 : 1 }}
                    >
                      Previous
                    </button>
                    <button 
                      onClick={() => activeId < 10 ? setActiveId(activeId + 1) : setView("exam-intro")}
                      style={{ padding: '12px 32px', borderRadius: '12px', border: 'none', background: theme.accent, color: '#FFF', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      {activeId === 10 ? "Go to Exam" : "Next Module"} <ChevronRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* EXAM INTRO */}
              {view === "exam-intro" && (
                <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', marginTop: '100px' }}>
                  <Trophy size={48} color={theme.accent} style={{ marginBottom: '24px' }} />
                  <h2>Final Certification Exam</h2>
                  <p style={{ color: theme.sub, marginBottom: '32px' }}>You have 10 minutes to answer 10 questions. Good luck!</p>
                  <button onClick={startExam} style={{ padding: '20px 40px', background: theme.accent, color: '#FFF', borderRadius: '16px', border: 'none', fontSize: '1.2rem', fontWeight: 800, cursor: 'pointer' }}>Start Exam</button>
                </motion.div>
              )}

              {/* EXAM ACTIVE */}
              {view === "exam-active" && (
                <motion.div key="exam" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {/* Sticky Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', position: 'sticky', top: 0, background: theme.bg, padding: '10px 0', zIndex: 10 }}>
                    <div>
                      <h2 style={{ margin: 0 }}>Final Certification</h2>
                      <div style={{ width: '200px', height: '6px', background: theme.border, borderRadius: '3px', marginTop: '8px' }}>
                        <div style={{ width: `${(Object.keys(examAnswers).length / 10) * 100}%`, height: '100%', background: theme.accent, borderRadius: '3px', transition: '0.3s' }} />
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px', background: timeLeft < 60 ? `${theme.error}20` : theme.surface, borderRadius: '12px', color: timeLeft < 60 ? theme.error : theme.text, border: `1px solid ${timeLeft < 60 ? theme.error : theme.border}` }}>
                      <Clock size={20} />
                      <span style={{ fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>
                        {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Questions */}
                  <div style={{ display: 'flex', gap: '24px' }}>
                    <div style={{ flex: 1, overflowY: 'auto', maxHeight: 'calc(100vh - 100px)' }} className="custom-scroller">
                      {modules.map((m, idx) => (
                        <div id={`q-${m.id}`} key={m.id} style={{ padding: '24px', background: theme.surface, borderRadius: '24px', border: `1px solid ${theme.border}`, marginBottom: '32px' }}>
                          <h3 style={{ marginBottom: '16px', fontSize: '1.1rem' }}>{idx + 1}. {m.examQuestion}</h3>
                          <div style={{ display: 'grid', gap: '12px' }}>
                            {m.options.map(opt => (
                              <button
                                key={opt}
                                onClick={() => setExamAnswers({ ...examAnswers, [m.id]: opt })}
                                style={{
                                  padding: '16px', textAlign: 'left', borderRadius: '12px',
                                  border: `2px solid ${examAnswers[m.id] === opt ? theme.accent : theme.border}`,
                                  background: examAnswers[m.id] === opt ? `${theme.accent}08` : 'transparent',
                                  color: theme.text, cursor: 'pointer', fontWeight: examAnswers[m.id] === opt ? 700 : 500, transition: '0.2s'
                                }}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={submitExam}
                        style={{ width: '100%', padding: '20px', borderRadius: '16px', background: theme.accent, color: '#FFF', border: 'none', fontSize: '1.2rem', fontWeight: 800, cursor: 'pointer', marginBottom: '60px' }}
                      >
                        Submit Final Answers
                      </button>
                    </div>

                    {/* Right Question Sidebar */}
                    <aside style={{ width: '120px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', maxHeight: 'calc(100vh - 100px)' }} className="custom-scroller">
                      {modules.map(m => (
                        <button
                          key={m.id}
                          onClick={() => jumpToQuestion(m.id)}
                          style={{
                            padding: '10px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                            background: examAnswers[m.id] ? theme.accent : theme.surface,
                            color: examAnswers[m.id] ? '#FFF' : theme.text,
                            fontWeight: 700
                          }}
                        >
                          {m.id}
                        </button>
                      ))}
                    </aside>
                  </div>
                </motion.div>
              )}

              {/* EXAM RESULT */}
              {view === "exam-result" && (
                <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', marginTop: '100px' }}>
                  <Trophy size={48} color={theme.accent} style={{ marginBottom: '24px' }} />
                  <h2>Exam Completed!</h2>
                  <p style={{ color: theme.sub, marginBottom: '32px' }}>You scored {examScore} out of {modules.length}</p>
                  <button onClick={() => setView("lesson")} style={{ padding: '20px 40px', background: theme.accent, color: '#FFF', borderRadius: '16px', border: 'none', fontSize: '1.2rem', fontWeight: 800, cursor: 'pointer' }}>Back to Course</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* DYNAMIC SCROLLBAR CSS */}
      <style>{`
        .custom-scroller::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scroller::-webkit-scrollbar-track {
          background: ${isDark ? "#020617" : "#F8FAFC"};
        }
        .custom-scroller::-webkit-scrollbar-thumb {
          background: ${isDark ? "rgba(59,130,246,0.5)" : "rgba(100,116,139,0.4)"};
          border-radius: 10px;
        }
        .custom-scroller::-webkit-scrollbar-thumb:hover {
          background: ${isDark ? "rgba(59,130,246,0.7)" : "rgba(59,130,246,0.6)"};
        }
      `}</style>
    </div>
  );
}
