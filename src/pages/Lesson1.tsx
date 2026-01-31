import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Added for dashboard redirect
import "./Lesson.css";

const lessonsData = [
  {
    id: 0,
    type: "home",
    title: "Welcome to BRAVE WAVE",
    subtitle: "Protecting Yourself in the Digital Age",
    content: (
      <div className="intro-section">
        <p>Cybersecurity isn't just for big companies—it's something we all need to think about. This platform guides you through the essentials of safeguarding your personal data.</p>
        <div className="concept-grid">
          <div className="concept-box">🛡️ <strong>Learn</strong> the foundations.</div>
          <div className="concept-box">🔍 <strong>Recognize</strong> common threats.</div>
          <div className="concept-box">🔐 <strong>Protect</strong> your digital life.</div>
        </div>
      </div>
    )
  },
  {
    id: 1,
    title: "Understanding Cybersecurity",
    content: (
      <>
        <h3>The CIA Triad & AAA Framework</h3>
        <p>Every security strategy starts with these three fundamental principles:</p>
        
        <div className="concept-grid">
          <div className="concept-box"><h4>Confidentiality</h4><p>Keeping data private and ensuring only authorized eyes see it.</p></div>
          <div className="concept-box"><h4>Integrity</h4><p>Guarding against unauthorized changes to information.</p></div>
          <div className="concept-box"><h4>Availability</h4><p>Ensuring systems work reliably when users need them.</p></div>
        </div>
        <h3>The AAA Framework</h3>
        <div className="info-card">
          <p><strong>Authentication:</strong> Proving your identity. | <strong>Authorization:</strong> Your permissions. | <strong>Accounting:</strong> Logging actions.</p>
        </div>
      </>
    )
  },
  {
    id: 2,
    title: "Recognizing Cyber Threats",
    content: (
      <>
        <h3>Social Engineering: The Human Hack</h3>
        <p>Hackers don't always break code; sometimes they break people.</p>
        
        <div className="info-grid">
          <div className="info-card">
            <h4>Phishing</h4>
            <p>Deceptive emails or texts used to steal credentials.</p>
          </div>
          <div className="info-card">
            <h4>Malware</h4>
            <p>Viruses, Trojans, and Ransomware designed to damage your system.</p>
          </div>
        </div>
        <p style={{marginTop: '15px'}}><em>Tip: Always check the sender's email address and hover over links before clicking.</em></p>
      </>
    )
  },
  {
    id: 3,
    title: "Simple Steps to Stay Safe",
    content: (
      <>
        <h3>Your Defense Toolkit</h3>
        <div className="step-list">
          <div className="info-card">
            <h4>1. Strong Passwords & 2FA</h4>
            <p>Use long, unique passphrases. Enable Two-Factor Authentication (2FA) for an extra layer of lock.</p>
          </div>
          <div className="info-card" style={{marginTop: '15px'}}>
            <h4>2. VPNs & Encryption</h4>
            <p>Virtual Private Networks encrypt your traffic, making it unreadable to eavesdroppers on public Wi-Fi.</p>
          </div>
        </div>
      </>
    )
  },
  {
    id: 4,
    title: "Protecting the Infrastructure",
    content: (
      <>
        <h3>What the Internet Needs to Exist</h3>
        <p>The internet relies on physical hardware that must be secured just as much as software.</p>
        
        <div className="concept-grid">
          <div className="concept-box"><h4>Subsea Cables</h4><p>The fiber optic backbone of global communication.</p></div>
          <div className="concept-box"><h4>IXPs</h4><p>Where networks meet to exchange traffic.</p></div>
          <div className="concept-box"><h4>Firewalls</h4><p>Hardware or software filters that block malicious traffic.</p></div>
        </div>
      </>
    )
  },
  {
    id: 5,
    title: "Laws, Ethics & The Future",
    content: (
      <>
        <h3>Ethical Hacking & Privacy Laws</h3>
        <p>Understanding the legal landscape like GDPR and CCPA ensures you know your rights as a digital citizen.</p>
        
        <div className="info-card" style={{borderLeft: '4px solid var(--accent)'}}>
          <h4>Responsible Disclosure</h4>
          <p>Ethical hackers follow a strict workflow: Discovery → Private Reporting → Remediation → Public Disclosure.</p>
        </div>
        <div className="completion-card" style={{textAlign: 'center', marginTop: '30px', padding: '20px', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0'}}>
           <h2 style={{color: '#16a34a'}}>Course Complete! 🎉</h2>
           <p>Your progress has been saved. You are now ready to apply these skills.</p>
        </div>
      </>
    )
  }
];

export default function CombinedApp() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate(); // Hook to redirect

  const isLastStep = step === lessonsData.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      // ✅ MARK OVERALL PROGRESS
      localStorage.setItem("course-cybersecurity-complete", "true");
      
      // ✅ MARK INDIVIDUAL LESSONS AS DONE (for the dashboard checklist)
      lessonsData.forEach(lesson => {
        if (lesson.id > 0) localStorage.setItem(`lesson-${lesson.id}-completed`, "true");
      });

      // ✅ REDIRECT TO DASHBOARD
      navigate('/dashboard');
    } else {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="lesson-wrapper">
      {/* Visual Progress Header */}
      <div className="progress-container" style={{width: '100%', maxWidth: '800px', marginBottom: '10px'}}>
        <div className="progress-bar" style={{ 
          height: '6px', 
          background: 'var(--accent)', 
          width: `${(step / (lessonsData.length - 1)) * 100}%`,
          transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          borderRadius: '10px'
        }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          className="lesson-card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <header className="lesson-header">
            {lessonsData[step].id !== 0 && <span className="badge">Lesson {lessonsData[step].id}</span>}
            <h1>{lessonsData[step].title}</h1>
            {lessonsData[step].subtitle && <p className="subtitle">{lessonsData[step].subtitle}</p>}
          </header>

          <div className="lesson-body">
            {lessonsData[step].content}
          </div>

          <div className="button-group" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
            <button 
              className="nav-btn" 
              onClick={handleBack} 
              style={{ visibility: step === 0 ? 'hidden' : 'visible', background: '#e2e8f0', color: '#1a1a1a' }}
            >
              ← Previous
            </button>
            
            <button 
              className="nav-btn" 
              onClick={handleNext}
              style={{ background: isLastStep ? '#16a34a' : 'var(--accent)' }}
            >
              {step === 0 ? "Start Journey" : isLastStep ? "Finish & Back to Dashboard" : "Next Lesson →"}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      <footer style={{marginTop: '40px', textAlign: 'center', opacity: 0.5, fontSize: '0.8rem'}}>
        BRAVE WAVE ACADEMY | MISSION COMPLETE
      </footer>
    </div>
  );
}