import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, ShieldCheck, Cpu, Network, Server, Anchor, Zap, 
  ChevronRight, BookOpen, Lock, Users, CheckCircle2, XCircle, 
  Trophy, BookMarked, X, Info, Activity, Database, Waves,
  Layers, ArrowRight, Share2, MousePointer2, GitBranch
} from 'lucide-react';

// --- DATA: GLOSSARY ---
const GLOSSARY = [
  { term: "BGP (Border Gateway Protocol)", def: "The routing protocol used to exchange routing information between different networks." },
  { term: "Anycast", def: "A network addressing method where a single IP address is shared by multiple devices in different locations." },
  { term: "Transit-Free", def: "A network that doesn't pay any other network for transit, usually a Tier 1 provider." },
  { term: "IXP (Internet Exchange Point)", def: "A location where multiple networks connect and exchange traffic locally to reduce latency and cost." },
  { term: "RPKI", def: "Resource Public Key Infrastructure: a method to cryptographically validate BGP route announcements to prevent hijacks." },
  { term: "DNSSEC", def: "Domain Name System Security Extensions: adds authentication to DNS responses to prevent tampering." },
];

// --- DATA: QUIZ ---
const QUIZ_QUESTIONS = [
  {
    question: "What happens during a BGP Hijack?",
    options: ["The physical router is stolen", "A network falsely claims the shortest path to an IP range", "The internet is turned off for a country", "Data is encrypted by a virus"],
    correct: 1,
    explanation: "In a BGP hijack, a malicious actor broadcasts 'I am the best path for this traffic,' causing data to be diverted to their servers."
  },
  {
    question: "What is the primary function of an IXP?",
    options: ["Encrypt internet traffic", "Exchange local traffic between ISPs", "Store user data", "Control DNS servers"],
    correct: 1,
    explanation: "IXPs allow networks to exchange traffic locally, reducing latency and costs."
  },
  {
    question: "Why is IPv6 needed?",
    options: ["It speeds up the internet", "It provides virtually unlimited IP addresses", "It replaces DNS", "It encrypts all traffic automatically"],
    correct: 1,
    explanation: "IPv6 provides 340 undecillion addresses, solving the IPv4 address exhaustion problem and enabling every device to have a unique IP."
  }
];

const InternetSocietyPage = () => {
  const [activeTab, setActiveTab] = useState('physical');
  const [showGlossary, setShowGlossary] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const theme = {
    bg: '#0d1117',
    sidebar: '#010409',
    card: '#161b22',
    accent: '#2f81f7',
    border: '#30363d',
    text: '#c9d1d9',
    dim: '#8b949e'
  };

  const s: { [key: string]: React.CSSProperties } = {
    layout: { display: 'flex', minHeight: '100vh', backgroundColor: theme.bg, color: theme.text, fontFamily: 'Inter, sans-serif' },
    sidebar: { 
      width: '260px', 
      backgroundColor: theme.sidebar, 
      borderRight: `1px solid ${theme.border}`, 
      padding: '30px 15px', 
      position: 'fixed', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      gap: '10px'
    },
    main: { marginLeft: '260px', flex: 1, padding: '40px 60px' },
    navItem: { 
      display: 'flex', 
      alignItems: 'center', 
      gap: '12px', 
      padding: '12px 16px', 
      borderRadius: '10px', 
      cursor: 'pointer', 
      border: 'none', 
      background: 'transparent', 
      color: theme.dim, 
      fontSize: '13px', 
      fontWeight: 600, 
      transition: '0.2s', 
      textAlign: 'left' 
    },
    activeNavItem: { background: 'rgba(47, 129, 247, 0.15)', color: theme.accent, border: `1px solid ${theme.accent}` },
    contentCard: { background: theme.card, border: `1px solid ${theme.border}`, borderRadius: '20px', padding: '30px', marginBottom: '24px' }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'physical':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '10px' }}>Physical Backbone</h1>
            <p style={{ color: theme.dim, marginBottom: '40px' }}>Explore the engineering that physically powers the internet.</p>

            <div style={s.contentCard}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white' }}><Waves size={20} color={theme.accent} /> Subsea Cables</h3>
              <p style={{ lineHeight: '1.7', marginTop: '15px' }}>
                Subsea fiber-optic cables like <b>Marea</b> and <b>SEA-ME-WE 6</b> span thousands of kilometers to connect continents. They carry ~99% of international data, providing the backbone for global connectivity. Landing stations secure and manage these cables, ensuring redundancy if any line fails.
              </p>
            </div>

            <div style={s.contentCard}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white' }}><Database color={theme.accent} /> Data Centers</h3>
              <p style={{ lineHeight: '1.7', marginTop: '15px' }}>
                Data centers host servers and networking infrastructure. Tier I-IV classifications measure redundancy and uptime. Modern facilities use AI-driven cooling and backup power to ensure 24/7 operations.
              </p>
            </div>

            <div style={s.contentCard}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white' }}><Activity color={theme.accent} /> IXPs</h3>
              <p style={{ lineHeight: '1.7', marginTop: '15px' }}>
                Internet Exchange Points (IXPs) let multiple networks exchange traffic locally. By doing this, ISPs reduce latency, improve speeds, and cut costs. Famous IXPs include <b>DE-CIX</b> in Germany and <b>LINX</b> in the UK.
              </p>
            </div>

            <div style={s.contentCard}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white' }}><Network color={theme.accent} /> Terrestrial Fiber</h3>
              <p style={{ lineHeight: '1.7', marginTop: '15px' }}>
                Beyond oceans, fiber-optic cables crisscross continents connecting cities and countries. Metropolitan networks and long-haul fibers enable high-speed data transmission and redundancy for resilient global internet.
              </p>
            </div>
          </motion.div>
        );
      case 'security':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '10px' }}>Routing Security</h1>
            <p style={{ color: theme.dim, marginBottom: '40px' }}>How the internet protects itself from malicious routing and misconfigurations.</p>

            <div style={{ ...s.contentCard, borderLeft: `4px solid ${theme.accent}` }}>
              <h3 style={{ color: 'white' }}><ShieldCheck /> BGP Threats</h3>
              <p style={{ marginTop: '15px', lineHeight: '1.6' }}>
                BGP relies on trust between networks. Threats include <b>route hijacks</b> (traffic diversion), <b>route leaks</b> (incorrect announcements), and misconfigurations that can cause outages or interception.
              </p>
            </div>

            <div style={{ ...s.contentCard, borderLeft: `4px solid ${theme.accent}` }}>
              <h3 style={{ color: 'white' }}><Lock /> RPKI & Route Filtering</h3>
              <p style={{ marginTop: '15px', lineHeight: '1.6' }}>
                RPKI allows operators to cryptographically sign IP prefixes. Routers validate announcements to reject invalid routes. This helps prevent hijacks and increases overall internet security.
              </p>
            </div>

            <div style={{ ...s.contentCard, borderLeft: `4px solid ${theme.accent}` }}>
              <h3 style={{ color: 'white' }}><Globe /> MANRS Initiative</h3>
              <p style={{ marginTop: '15px', lineHeight: '1.6' }}>
                The <b>Mutually Agreed Norms for Routing Security (MANRS)</b> provides best practices for ISPs to reduce routing threats. This includes filtering, anti-spoofing, and coordination with other operators.
              </p>
            </div>

            <div style={{ ...s.contentCard, borderLeft: `4px solid ${theme.accent}` }}>
              <h3 style={{ color: 'white' }}><BookOpen /> DNS Security</h3>
              <p style={{ marginTop: '15px', lineHeight: '1.6' }}>
                DNSSEC adds cryptographic validation to DNS responses, preventing attackers from redirecting users to malicious websites. This strengthens trust in internet addressing.
              </p>
            </div>
          </motion.div>
        );
      case 'protocols':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '10px' }}>Protocol Evolution</h1>
            <p style={{ color: theme.dim, marginBottom: '40px' }}>The logical protocols that govern every byte sent online.</p>

            <div style={s.contentCard}>
              <h3 style={{ color: 'white' }}>IPv4 vs IPv6</h3>
              <p style={{ marginTop: '15px', lineHeight: '1.6' }}>
                IPv4 offers 4.3 billion addresses, insufficient for modern demand. IPv6 provides 340 undecillion addresses, enabling every device—from phones to cars—to have a unique IP. IPv6 also includes built-in security and simplified routing.
              </p>
            </div>

            <div style={s.contentCard}>
              <h3 style={{ color: 'white' }}>Routing Protocols</h3>
              <p style={{ marginTop: '15px', lineHeight: '1.6' }}>
                <b>BGP:</b> Inter-domain routing between ISPs.<br/>
                <b>OSPF:</b> Intra-domain routing for fast convergence.<br/>
                <b>IS-IS:</b> Used in large service provider networks for scalable routing.
              </p>
            </div>

            <div style={s.contentCard}>
              <h3 style={{ color: 'white' }}>Transport & Application Layers</h3>
              <p style={{ marginTop: '15px', lineHeight: '1.6' }}>
                <b>TCP:</b> Reliable, ordered delivery (web, email).<br/>
                <b>UDP:</b> Fast, best-effort delivery (gaming, VoIP).<br/>
                <b>HTTP/HTTPS:</b> Protocols for web communication; HTTPS encrypts traffic.<br/>
                <b>DNS:</b> Resolves human-readable domain names to IP addresses.
              </p>
            </div>
          </motion.div>
        );
      case 'quiz':
        return (
          <div style={s.contentCard}>
            <h2 style={{ marginBottom: '30px', textAlign: 'center' }}>Knowledge Assessment</h2>
            {QUIZ_QUESTIONS.map((q, i) => (
              <div key={i} style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '15px' }}>{q.question}</p>
                {q.options.map((opt, idx) => (
                  <button key={idx} style={{ 
                    width: '100%', padding: '15px', marginBottom: '10px', borderRadius: '10px', 
                    background: theme.sidebar, border: `1px solid ${theme.border}`, color: 'white', textAlign: 'left', cursor: 'pointer'
                  }} onClick={() => {
                    if(idx === q.correct) setScore(prev => prev + 1);
                    if(i === QUIZ_QUESTIONS.length - 1) setIsFinished(true);
                  }}>
                    {opt}
                  </button>
                ))}
                <p style={{ fontSize: '13px', color: theme.dim }}>{q.explanation}</p>
              </div>
            ))}
            {isFinished && <p style={{ textAlign: 'center', fontWeight: 700, marginTop: '20px', color: theme.accent }}>You scored {score} / {QUIZ_QUESTIONS.length}</p>}
          </div>
        );
      default: return null;
    }
  };

  return (
    <div style={s.layout}>
      <aside style={s.sidebar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px', padding: '0 10px' }}>
          <Zap size={24} color={theme.accent} fill={theme.accent} />
          <span style={{ fontWeight: 900, fontSize: '18px', color: 'white', letterSpacing: '1px' }}>BRAVE WAVE</span>
        </div>

        <div style={{ fontSize: '11px', color: theme.dim, fontWeight: 800, marginBottom: '10px', paddingLeft: '16px' }}>MODULES</div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <button onClick={() => setActiveTab('physical')} style={{ ...s.navItem, ...(activeTab === 'physical' ? s.activeNavItem : {}) }}><Layers size={18} /> Physical Backbone</button>
          <button onClick={() => setActiveTab('security')} style={{ ...s.navItem, ...(activeTab === 'security' ? s.activeNavItem : {}) }}><ShieldCheck size={18} /> Routing Security</button>
          <button onClick={() => setActiveTab('protocols')} style={{ ...s.navItem, ...(activeTab === 'protocols' ? s.activeNavItem : {}) }}><Cpu size={18} /> Protocol Stack</button>
          <button onClick={() => setActiveTab('quiz')} style={{ ...s.navItem, ...(activeTab === 'quiz' ? s.activeNavItem : {}) }}><Activity size={18} /> Final Evaluation</button>
        </nav>

        <div style={{ marginTop: '20px', height: '1px', background: theme.border }} />
        
        <button onClick={() => setShowGlossary(true)} style={{ ...s.navItem, marginTop: '10px' }}><BookMarked size={18} /> Open Glossary</button>

        <div style={{ marginTop: 'auto', padding: '15px', background: '#0d1117', borderRadius: '12px', border: `1px solid ${theme.border}` }}>
          <div style={{ fontSize: '10px', fontWeight: 800, color: theme.dim, marginBottom: '8px' }}>COURSE COMPLETION</div>
          <div style={{ height: '4px', background: theme.border, borderRadius: '10px' }}>
             <motion.div animate={{ width: isFinished ? '100%' : '40%' }} style={{ height: '100%', background: theme.accent }} />
          </div>
        </div>
      </aside>

      <main style={s.main}>
        {renderContent()}
      </main>

      <AnimatePresence>
        {showGlossary && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)' }}>
            <div style={{ background: theme.card, padding: '40px', borderRadius: '24px', width: '400px', border: `1px solid ${theme.border}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h3 style={{ color: 'white' }}>Glossary</h3>
                <X onClick={() => setShowGlossary(false)} style={{ cursor: 'pointer' }} />
              </div>
              {GLOSSARY.map((g, i) => (
                <div key={i} style={{ marginBottom: '20px' }}>
                  <div style={{ color: theme.accent, fontWeight: 700 }}>{g.term}</div>
                  <div style={{ fontSize: '13px', color: theme.dim }}>{g.def}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InternetSocietyPage;