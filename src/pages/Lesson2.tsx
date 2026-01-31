import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import "./Lesson.css";

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <h2 className="section-title" style={{ borderLeft: '5px solid var(--accent)', paddingLeft: '15px', color: 'var(--primary)' }}>
      {title}
    </h2>
  );
};

const EthicalHackerPage = () => {
  const navigate = useNavigate();

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="lesson-wrapper">
      <motion.div 
        className="lesson-card"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <header className="lesson-header">
          <div className="badge" style={{ background: 'var(--primary)', color: 'var(--accent)', padding: '5px 12px', borderRadius: '20px', fontSize: '0.8rem', display: 'inline-block', marginBottom: '15px' }}>
            Advanced Module
          </div>
          <h1>The Role of an Ethical Hacker</h1>
          <p className="subtitle">Defending the digital frontier by thinking like the enemy.</p>
        </header>

        <section className="introduction">
          <p>
            In the ever-evolving world of cybersecurity, ethical hackers stand at the frontlines. These professionals use their skills to identify and fix vulnerabilities before malicious actors can exploit them.
          </p>
        </section>

        <motion.section {...fadeInUp} className="content-card">
          <SectionTitle title="What is Ethical Hacking?" />
          <p>
            Ethical hacking (or <strong>White-Hat Hacking</strong>) is the authorized attempt to gain unauthorized access to a computer system, application, or data.
          </p>
          
          <div className="info-card" style={{ marginTop: '20px', borderLeft: '4px solid #3b82f6' }}>
            <strong>The Golden Rule:</strong> Unlike malicious hackers, ethical hackers operate under strict <strong>Rules of Engagement (RoE)</strong> and have written legal consent.
          </div>
        </motion.section>

        <motion.section {...fadeInUp} className="content-card">
          <SectionTitle title="The 5 Phases of Hacking" />
          <p>Professional penetration testers follow a systematic methodology to ensure no stone is left unturned:</p>
          
          

          <div className="concept-grid">
            <div className="concept-box">
              <h4>1. Reconnaissance</h4>
              <p>Footprinting the target using tools like <em>Nmap</em> and <em>Shodan</em>.</p>
            </div>
            <div className="concept-box">
              <h4>2. Scanning</h4>
              <p>Identifying open ports and live services using <em>Nessus</em> or <em>OpenVAS</em>.</p>
            </div>
            <div className="concept-box">
              <h4>3. Gaining Access</h4>
              <p>Exploiting flaws via <em>Metasploit</em> or <em>SQL Injection</em>.</p>
            </div>
            <div className="concept-box">
              <h4>4. Maintaining Access</h4>
              <p>Establishing persistence to simulate a long-term advanced threat (APT).</p>
            </div>
            <div className="concept-box">
              <h4>5. Reporting</h4>
              <p>The most vital phase: Documenting findings for the client to fix.</p>
            </div>
          </div>
        </motion.section>

        <motion.section {...fadeInUp} className="content-card">
          <SectionTitle title="Vulnerability Classification (OWASP)" />
          <p>Ethical hackers often prioritize their work based on the <strong>OWASP Top 10</strong>, which lists the most critical web risks:</p>
          <ul className="step-list" style={{ listStyle: 'none', padding: 0 }}>
            <li className="info-card" style={{ marginBottom: '10px' }}>⚠️ <strong>Broken Access Control:</strong> Users accessing data they shouldn't see.</li>
            <li className="info-card" style={{ marginBottom: '10px' }}>⚠️ <strong>Cryptographic Failures:</strong> Weak encryption leading to sensitive data exposure.</li>
            <li className="info-card" style={{ marginBottom: '10px' }}>⚠️ <strong>Injection:</strong> Malicious code (like SQL) being sent to an interpreter.</li>
          </ul>
        </motion.section>

        <motion.section {...fadeInUp} className="content-card">
          <SectionTitle title="Ethical vs. Black Hat" />
          <div className="table-container" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
              <thead>
                <tr style={{ background: 'var(--primary)', color: 'white' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Aspect</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Ethical (White Hat)</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Malicious (Black Hat)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}><strong>Motivation</strong></td>
                  <td style={{ padding: '12px' }}>Protection & Safety</td>
                  <td style={{ padding: '12px' }}>Profit or Chaos</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}><strong>Permission</strong></td>
                  <td style={{ padding: '12px' }}>Explicitly Granted</td>
                  <td style={{ padding: '12px' }}>None / Illegal</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px' }}><strong>Legality</strong></td>
                  <td style={{ padding: '12px' }}>Legal & Contractual</td>
                  <td style={{ padding: '12px' }}>Criminal</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.section>

        <motion.section {...fadeInUp} className="content-card">
          <SectionTitle title="How to Start Your Journey" />
          <div className="info-grid">
            <div className="info-card">
              <h4>Foundations</h4>
              <p>Master Networking (TCP/IP) and Linux Command Line basics.</p>
            </div>
            <div className="info-card">
              <h4>Certifications</h4>
              <p>Target the <strong>CompTIA Security+</strong> or <strong>Certified Ethical Hacker (CEH)</strong>.</p>
            </div>
          </div>
        </motion.section>

        <footer className="button-group" style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <button 
            className="nav-btn" 
            style={{ background: 'var(--accent)', color: 'var(--primary)' }}
            onClick={() => navigate('/dashboard')}
          >
            Complete Lesson & Return to Dashboard
          </button>
        </footer>
      </motion.div>
    </div>
  );
};

export default EthicalHackerPage;