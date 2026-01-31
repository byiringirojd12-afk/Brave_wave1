import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import "./Lesson.css";

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <h2 className="section-title" style={{ borderLeft: '5px solid var(--accent)', paddingLeft: '15px', color: 'var(--primary)', marginBottom: '1.5rem' }}>
      {title}
    </h2>
  );
};

const InternetGovernancePage = () => {
  const navigate = useNavigate();

  // Animation variants for a "sliding up" effect as user scrolls
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="lesson-wrapper" style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: '50px' }}>
      <motion.div 
        className="lesson-card"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ maxWidth: '900px', margin: '0 auto', background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
      >
        <header className="lesson-header">
          <div className="badge" style={{ background: 'var(--primary)', color: 'var(--accent)', padding: '5px 12px', borderRadius: '20px', fontSize: '0.8rem', display: 'inline-block', marginBottom: '15px', fontWeight: 'bold' }}>
            Policy & Ethics Module
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1a1a1a' }}>Internet Governance</h1>
          <p className="subtitle" style={{ fontSize: '1.2rem', color: '#64748b' }}>Understanding the invisible rules that shape our global digital society.</p>
        </header>

        <section className="introduction" style={{ margin: '30px 0' }}>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
            The internet has no single king. Instead, it relies on a complex web of <strong>governance</strong>—rules, policies, and frameworks that ensure it remains a safe, inclusive, and interoperable space for billions of users.
          </p>
        </section>

        {/* 1. What is Internet Governance? */}
        <motion.section {...fadeInUp} className="content-card" style={{ marginBottom: '40px' }}>
          <SectionTitle title="What is Internet Governance?" />
          <div className="info-card" style={{ background: '#f8fafc', padding: '25px', borderRadius: '12px', borderLeft: '4px solid var(--accent)' }}>
            <p><strong>Official Definition:</strong> The development and application of shared principles, norms, and decision-making procedures that guide the use of the internet.</p>
          </div>
          <p style={{ marginTop: '15px' }}>It is the ultimate balancing act between <strong>Governments</strong>, <strong>Private Companies</strong>, and <strong>Civil Society</strong>.</p>
        </motion.section>

        {/* 2. Key Pillars Grid */}
        <motion.section {...fadeInUp} className="content-card">
          <SectionTitle title="The 5 Pillars of Digital Order" />
          <div className="concept-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
            <div className="concept-box" style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
              <h4 style={{ color: 'var(--accent)' }}>Openness</h4>
              <p>Ensuring the free flow of information without borders or "walled gardens."</p>
            </div>
            <div className="concept-box" style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
              <h4 style={{ color: 'var(--accent)' }}>Accessibility</h4>
              <p>Bridging the <strong>Digital Divide</strong> so rural and underserved areas can participate.</p>
            </div>
            <div className="concept-box" style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
              <h4 style={{ color: 'var(--accent)' }}>Privacy</h4>
              <p>Enforcing laws like <strong>GDPR</strong> to protect users from mass surveillance.</p>
            </div>
            <div className="concept-box" style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
              <h4 style={{ color: 'var(--accent)' }}>Multistakeholderism</h4>
              <p>The idea that no single group should control the web.</p>
            </div>
          </div>
        </motion.section>

        {/* 3. Who Governs the Web? Expansion */}
        <motion.section {...fadeInUp} className="content-card" style={{ marginTop: '50px' }}>
          <SectionTitle title="The Global Power Map" />
          <p>The internet functions through a "bottom-up" technical approach rather than top-down laws.</p>
          
          <div className="info-grid" style={{ marginTop: '20px' }}>
            <div className="info-card">
              <h4 style={{ fontWeight: 'bold' }}>ICANN</h4>
              <p>The "Phonebook" of the web. They manage Domain Names (DNS) and IP addresses.</p>
            </div>
            <div className="info-card">
              <h4 style={{ fontWeight: 'bold' }}>IETF & W3C</h4>
              <p>The engineers who build the protocols (HTTP, HTML, IPv6) that allow us to browse.</p>
            </div>
            <div className="info-card">
              <h4 style={{ fontWeight: 'bold' }}>The UN (IGF)</h4>
              <p>A global forum where world leaders discuss cybersecurity and digital rights.</p>
            </div>
          </div>
        </motion.section>

        {/* 4. Research Expansion: Challenges & Splinternet */}
        <motion.section {...fadeInUp} className="content-card" style={{ marginTop: '50px' }}>
          <SectionTitle title="Critical Challenges: The 'Splinternet'" />
          <p>Research suggests we are moving toward <strong>Cyber Sovereignty</strong>, where different countries create their own versions of the internet.</p>
          
          <ul className="step-list" style={{ listStyle: 'none', padding: 0 }}>
            <li className="info-card" style={{ marginBottom: '15px' }}>
              <strong>🚩 Fragmentation:</strong> When national firewalls block global services, breaking the "one internet" dream.
            </li>
            <li className="info-card" style={{ marginBottom: '15px' }}>
              <strong>🚩 AI Ethics:</strong> How do we govern algorithms that can influence elections or spread misinformation?
            </li>
            <li className="info-card" style={{ marginBottom: '15px' }}>
              <strong>🚩 Net Neutrality:</strong> The ongoing battle to ensure ISPs don't speed up or slow down content based on payment.
            </li>
          </ul>
        </motion.section>

        {/* 5. Conclusion & CTA */}
        <motion.section {...fadeInUp} className="call-to-action" style={{ textAlign: 'center', marginTop: '60px', padding: '40px', background: 'var(--primary)', color: 'white', borderRadius: '16px' }}>
          <h2 style={{ color: 'var(--accent)', marginBottom: '15px' }}>The Future is in Your Hands</h2>
          <p style={{ marginBottom: '30px' }}>Internet governance isn't just for politicians. As a digital citizen, your privacy and rights depend on these policies.</p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button 
                className="nav-btn" 
                style={{ background: 'var(--accent)', color: 'var(--primary)', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                onClick={() => navigate('/dashboard')}
            >
                Complete Module
            </button>
            <button 
                className="nav-btn" 
                style={{ background: 'transparent', color: 'white', border: '1px solid white', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                onClick={() => window.location.href='/courses'}
            >
                View More Policy Courses
            </button>
          </div>
        </motion.section>

        <footer style={{ marginTop: '40px', textAlign: 'center', opacity: 0.5, fontSize: '0.8rem' }}>
          BRAVE WAVE © {new Date().getFullYear()} | Internet Society & Policy Research
        </footer>
      </motion.div>
    </div>
  );
};

export default InternetGovernancePage;