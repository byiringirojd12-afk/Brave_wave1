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

const InternetSocietyPage = () => {
  const navigate = useNavigate();

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
        style={{ maxWidth: '950px', margin: '0 auto', background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
      >
        <header className="lesson-header" style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="badge" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent)', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Infrastructure Module
          </div>
          <h1 style={{ fontSize: '2.8rem', fontWeight: '800', marginTop: '15px', color: '#0f172a' }}>Building the Digital Foundation</h1>
          <p className="subtitle" style={{ color: '#64748b', fontSize: '1.1rem' }}>How the Internet Society (ISOC) protects the physical and logical web.</p>
        </header>

        {/* Introduction */}
        <section className="introduction" style={{ marginBottom: '50px' }}>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: '#334155' }}>
            The internet isn't just "the cloud." It is a massive, physical achievement of engineering. 
            The <strong>Internet Society (ISOC)</strong>, founded in 1992, acts as the guardian of this system, 
            ensuring it remains open, globally connected, and secure.
          </p>
        </section>

        {/* 1. Infrastructure Grid */}
        <motion.section {...fadeInUp} className="content-card">
          <SectionTitle title="The Physical Backbone" />
          <p style={{ marginBottom: '20px' }}>Without these four physical components, global communication would cease to exist:</p>
          <div className="concept-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            <div className="concept-box" style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ color: 'var(--accent)' }}>Data Centers</h4>
              <p style={{ fontSize: '0.9rem' }}>The "brains" where your data lives. Massive server farms requiring 24/7 cooling and power.</p>
            </div>
            <div className="concept-box" style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ color: 'var(--accent)' }}>Subsea Cables</h4>
              <p style={{ fontSize: '0.9rem' }}>Fiber optics on the ocean floor that connect continents at the speed of light.</p>
            </div>
            <div className="concept-box" style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ color: 'var(--accent)' }}>IXPs</h4>
              <p style={{ fontSize: '0.9rem' }}>Internet Exchange Points. The physical locations where different ISPs meet to swap traffic.</p>
            </div>
            <div className="concept-box" style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ color: 'var(--accent)' }}>Routers/BGP</h4>
              <p style={{ fontSize: '0.9rem' }}>The traffic controllers that decide the most efficient path for your data packets.</p>
            </div>
          </div>
        </motion.section>

        {/* 2. Research Expansion: MANRS */}
        <motion.section {...fadeInUp} className="content-card" style={{ marginTop: '50px' }}>
          <SectionTitle title="Security: The MANRS Initiative" />
          <div className="info-card" style={{ display: 'flex', gap: '20px', alignItems: 'center', background: '#eff6ff', border: '1px solid #dbeafe' }}>
            <div style={{ fontSize: '2rem' }}>🛡️</div>
            <div>
              <p style={{ margin: 0 }}><strong>Research Expansion:</strong> ISOC leads the <strong>MANRS</strong> (Mutually Agreed Norms for Routing Security) project. It prevents "Route Hijacking," where malicious actors misdirect internet traffic to steal data or cause outages.</p>
            </div>
          </div>
        </motion.section>

        {/* 3. Protocols: The Universal Language */}
        <motion.section {...fadeInUp} className="content-card" style={{ marginTop: '50px' }}>
          <SectionTitle title="The Language of Connection" />
          <p>For the internet to be universal, every device must speak the same "language."</p>
          <ul className="step-list" style={{ listStyle: 'none', padding: 0 }}>
            <li className="info-card" style={{ marginBottom: '10px' }}>
              <strong>TCP/IP:</strong> The core suite. TCP ensures data arrives in order; IP ensures it finds the right house.
            </li>
            <li className="info-card" style={{ marginBottom: '10px' }}>
              <strong>HTTPS:</strong> The secure version of the web. It uses <strong>TLS encryption</strong> to hide your traffic from hackers.
            </li>
            <li className="info-card">
              <strong>DNS (The Web's GPS):</strong> Managed by <strong>ICANN</strong>, this turns "google.com" into a machine-readable IP address.
            </li>
          </ul>
        </motion.section>

        {/* 4. Advocacy & Future */}
        <motion.section {...fadeInUp} className="content-card" style={{ marginTop: '50px' }}>
          <SectionTitle title="Global Digital Inclusion" />
          <p>The Internet Society doesn't just build hardware; they build communities. Their advocacy focuses on:</p>
          <div className="info-grid">
            <div className="info-card" style={{ borderTop: '4px solid var(--accent)' }}>
              <h4>Community Networks</h4>
              <p>Helping remote villages build their own internet infrastructure using low-cost Wi-Fi and satellite.</p>
            </div>
            <div className="info-card" style={{ borderTop: '4px solid var(--accent)' }}>
              <h4>Open Standards</h4>
              <p>Ensuring that no single company (like Google or Apple) can "own" the basic protocols of the web.</p>
            </div>
          </div>
        </motion.section>

        {/* Conclusion & Navigation */}
        <motion.section {...fadeInUp} className="call-to-action" style={{ textAlign: 'center', marginTop: '60px', padding: '50px', background: '#1e293b', color: 'white', borderRadius: '16px' }}>
          <h2 style={{ color: 'var(--accent)', marginBottom: '10px' }}>You've Completed the Infrastructure Module</h2>
          <p style={{ marginBottom: '30px', opacity: 0.9 }}>The internet is a collaborative masterpiece. Now you know the physical and logical layers that keep us connected.</p>
          
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button 
              className="nav-btn" 
              style={{ background: 'var(--accent)', border: 'none', color: '#1e293b', fontWeight: '700' }}
              onClick={() => navigate('/dashboard')}
            >
              Finish Lesson & Update Progress
            </button>
            <button 
              className="nav-btn" 
              style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: 'white' }}
              onClick={() => window.location.href='/support'}
            >
              Support ISOC
            </button>
          </div>
        </motion.section>

        <footer style={{ marginTop: '40px', textAlign: 'center', opacity: 0.4, fontSize: '0.75rem', letterSpacing: '0.5px' }}>
          BRAVE WAVE ACADEMY | DATA INFRASTRUCTURE RESEARCH v2.4
        </footer>
      </motion.div>
    </div>
  );
};

export default InternetSocietyPage;