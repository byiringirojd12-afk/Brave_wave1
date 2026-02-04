import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import "./Lesson.css";

const lessonsData = [
  {
    id: 1,
    title: "1. The Birth of the Digital Battlefield",
    content: (
      <>
        <p>In the 1980s, cybersecurity was about keeping "joyriders" out of local servers. Today, it is a global theater of war. We have moved from <strong>Perimeter Defense</strong> (walls) to <strong>Data-Centric Security</strong> (protecting the item itself).</p>
        <div className="info-card">
          <h4>The "Blast Radius"</h4>
          <p>In modern architecture, we use <em>Micro-segmentation</em>. If one computer is hacked, we "air-gap" it so the virus cannot jump to the next server. This limits the "Blast Radius" of an attack.</p>
        </div>
        <div className="curiosity-hook">
          <strong>🤔 Did You Know?</strong> The first computer worm, the <em>Morris Worm (1988)</em>, was meant to measure the size of the internet, but it accidentally crashed 10% of all connected computers!
        </div>
        <div className="reference-box">
          <strong>📚 Research:</strong> <a href="https://www.cisa.gov" target="_blank" rel="noreferrer">CISA: Essential Defense Guides</a>
        </div>
      </>
    )
  },
  {
    id: 2,
    title: "2. The CIA Triad: The Eternal Blueprint",
    content: (
      <>
        <p>Every security professional on Earth uses the <strong>CIA Triad</strong>. It is the compass for every decision. However, the challenge is the <em>Balance</em>: If you make a system too secure (Confidential), it becomes hard to use (Availability).</p>
        <ul className="detailed-list">
          <li><strong>Confidentiality:</strong> Protecting against <em>Snooping</em>. (Example: Using AES-256 to hide sensitive military emails).</li>
          <li><strong>Integrity:</strong> Protecting against <em>Tampering</em>. (Example: Using hashes to prove a software update hasn't been injected with a virus).</li>
          <li><strong>Availability:</strong> Protecting against <em>Downtime</em>. (Example: Using Load Balancers to survive a massive traffic spike).</li>
        </ul>
        <div className="curiosity-hook">
          <strong>🤔 Curiosity Challenge:</strong> Can you think of a system where <strong>Integrity</strong> is more important than <strong>Confidentiality</strong>? Hint: Think of a Public Clock or a Stock Market Feed.
        </div>
        <div className="reference-box">
          <strong>📚 Research:</strong> <a href="https://www.nist.gov" target="_blank" rel="noreferrer">NIST: The Gold Standard Framework</a>
        </div>
      </>
    )
  },
  {
    id: 3,
    title: "3. AAA: Identification vs. Authorization",
    content: (
      <>
        <p>Security isn't just about blocking people; it’s about managing <em>Identity</em>. The <strong>AAA Framework</strong> ensures that users are who they say they are and only do what they are allowed to do.</p>
        <div className="info-grid">
          <div className="info-card"><strong>Authentication:</strong> Proving you are you. We now move toward <em>Passwordless</em> systems using Biometrics (FaceID) and Security Keys (YubiKeys).</div>
          <div className="info-card"><strong>Authorization:</strong> The "Least Privilege" principle. If a worker only needs to <em>read</em> a file, never give them permission to <em>delete</em> it.</div>
          <div className="info-card"><strong>Accounting:</strong> The "Black Box" of security. Without audit logs, you can never prove a crime happened in court.</div>
        </div>
        <div className="curiosity-hook">
          <strong>🤔 Did You Know?</strong> Over 80% of data breaches are caused by <em>Authorization</em> errors where an employee had access to files they didn't actually need for their job.
        </div>
        <div className="reference-box">
          {/* FIXED: Added missing opening <a> tag here */}
          <strong>📚 Research:</strong> <a href="https://www.okta.com" target="_blank" rel="noreferrer">Okta: The Identity Deep Dive</a>
        </div>
      </>
    )
  },
  {
    id: 4,
    title: "4. Social Engineering: The Psychological Hack",
    content: (
      <>
        <p>Attackers don't always "break in"; often they are "let in." <strong>Social Engineering</strong> exploits the most vulnerable operating system in the world: the human brain. They use <em>Social Proof</em> and <em>Scarcity</em> to force quick, bad decisions.</p>
        <div className="info-card" style={{borderLeft: '4px solid #f59e0b'}}>
          <h4>Tailgating (Physical Hacking)</h4>
          <p>An attacker follows a busy employee into a secure server room by holding a box of donuts. The employee, being polite, holds the door open, bypassing a $10,000 biometric lock.</p>
        </div>
        <div className="curiosity-hook">
          <strong>🤔 Curiosity Challenge:</strong> If you receive a call from your "Boss" asking for a password, but the voice sounds slightly robotic, would you realize it's an <em>AI Deepfake</em>?
        </div>
        <div className="reference-box">
          <strong>📚 Research:</strong> <a href="https://www.social-engineer.org" target="_blank" rel="noreferrer">Social-Engineering: The Human Security Lab</a>
        </div>
      </>
    )
  },
  {
    id: 5,
    title: "5. Phishing Evolution: Whaling & Smishing",
    content: (
      <>
        <p>Phishing is no longer just "spam." It has become surgical. <strong>Whaling</strong> targets the "Big Fish"—CEOs and Directors. A single successful whaling attack can result in millions of dollars in losses.</p>
        <p><strong>Smishing (SMS Phishing)</strong> is rising because people trust their text messages more than their emails. Attackers send fake "Package Delivery" or "Bank Alert" texts to steal credentials on the go.</p>
        <div className="curiosity-hook">
          <strong>🤔 Did You Know?</strong> The "F" in Phishing comes from <em>Phreaking</em>, an old-school term for hacking into telephone systems!
        </div>
        <div className="reference-box">
          <strong>📚 Research:</strong> <a href="https://phishingquiz.withgoogle.com" target="_blank" rel="noreferrer">Google: Test Your Phishing IQ</a>
        </div>
      </>
    )
  },
  {
    id: 6,
    title: "6. Malware: The Silent Saboteurs",
    content: (
      <>
        <p>Modern Malware is often <strong>Fileless</strong>. It doesn't sit on your hard drive where an antivirus can find it; it lives only in your computer's RAM (Memory). Once you restart your computer, it disappears, leaving no trace.</p>
        <div className="info-card">
          <h4>The Logic Bomb</h4>
          <p>Imagine a disgruntled employee who writes a script that says: "If my name is removed from the payroll, delete the entire customer database." That is a Logic Bomb.</p>
        </div>
        <div className="curiosity-hook">
          <strong>🤔 Curiosity Challenge:</strong> Could a computer virus physically break a machine? Yes! Look up the <em>Stuxnet</em> virus that destroyed physical nuclear centrifuges.
        </div>
        <div className="reference-box">
          <strong>📚 Research:</strong> <a href="https://www.virustotal.com" target="_blank" rel="noreferrer">VirusTotal: Real-time Malware Analysis</a>
        </div>
      </>
    )
  },
  {
    id: 7,
    title: "7. Ransomware: The Billion Dollar Industry",
    content: (
      <>
        <p>Ransomware has become professionalized. There are now "Help Desks" run by hackers to help victims pay the ransom in Bitcoin. This is <strong>Ransomware-as-a-Service (RaaS)</strong>.</p>
        <p>Security experts recommend the <strong>3-2-1 Backup Rule</strong>: 3 copies of your data, 2 different media types, and 1 copy stored <em>Offsite/Offline</em> where ransomware can't reach it.</p>
        <div className="curiosity-hook">
          <strong>🤔 Did You Know?</strong> Some ransomware groups have "Ethics Codes" where they refuse to attack hospitals (though many others don't care).
        </div>
        <div className="reference-box">
          <strong>📚 Research:</strong> <a href="https://www.malwarebytes.com" target="_blank" rel="noreferrer">Malwarebytes: The Ransomware Lab</a>
        </div>
      </>
    )
  },
  {
    id: 8,
    title: "8. Network Defense: The DMZ & Firewalls",
    content: (
      <>
        <p>Think of your network like a house. The <strong>Firewall</strong> is the front door. But for things you want the public to see (like your website), you create a <strong>DMZ (Demilitarized Zone)</strong>—a "fenced-in porch" where visitors can sit without entering the main house.</p>
        <p><strong>Intrusion Prevention Systems (IPS)</strong> are like security guards that don't just watch the cameras; they actively tackle intruders the moment they jump the fence.</p>
        <div className="curiosity-hook">
          <strong>🤔 Curiosity Challenge:</strong> If your firewall blocks all incoming traffic, how do you receive emails? It’s because the firewall tracks "State"—it knows you asked for the data!
        </div>
        <div className="reference-box">
          <strong>📚 Research:</strong> <a href="https://www.fortinet.com" target="_blank" rel="noreferrer">Fortinet: The History of Firewalls</a>
        </div>
      </>
    )
  },
  {
    id: 9,
    title: "9. Encryption: The Math of Secrecy",
    content: (
      <>
        <p>Encryption is the process of turning <em>Plaintext</em> into <em>Ciphertext</em>. Without the key, the data looks like random noise. Even the world's fastest supercomputer would take billions of years to crack a strong AES-256 key by brute force.</p>
        <div className="info-card">
          <h4>At Rest vs. In Transit</h4>
          <p><strong>At Rest:</strong> Data on your hard drive (BitLocker). <br/> <strong>In Transit:</strong> Data moving across the web (HTTPS/SSL).</p>
        </div>
        <div className="curiosity-hook">
          <strong>🤔 Did You Know?</strong> During WWII, the <em>Enigma Machine</em> used physical rotors to encrypt messages. Today, your smartphone does math millions of times more complex every second.
        </div>
        <div className="reference-box">
          <strong>📚 Research:</strong> <a href="https://www.cloudflare.com" target="_blank" rel="noreferrer">Cloudflare: How Encryption Works</a>
        </div>
      </>
    )
  },
  {
    id: 10,
    title: "10. Hashing: The One-Way Street",
    content: (
      <>
        <p>Hashing is different from encryption. You cannot "decrypt" a hash. It is a one-way math function. We use it to store passwords. When you log in, the system hashes your input and compares it to the stored hash.</p>
        <div className="info-card">
          <h4>Salted Hashes</h4>
          <p>To prevent hackers from using "Rainbow Tables" (pre-calculated hashes), we add a random string called a <strong>Salt</strong> to your password before hashing it. This makes every hash unique.</p>
        </div>
        <div className="curiosity-hook">
          <strong>🤔 Curiosity Challenge:</strong> Why is it better for a company to lose "Hashed Passwords" than "Encrypted Passwords"? Because hashes can't be reversed!
        </div>
        <div className="reference-box">
          <strong>📚 Research:</strong> <a href="https://www.thesslstore.com" target="_blank" rel="noreferrer">SSLStore: Hashing for Beginners</a>
        </div>
      </>
    )
  },
  {
    id: 11,
    title: "11. Cloud Security: Shared Responsibility",
    content: (
      <>
        <p>When you use the Cloud (AWS, Google, Azure), you are renting someone else's computer. The <strong>Shared Responsibility Model</strong> is key: Amazon secures the "Cloud" (the building and the wires), but <strong>You</strong> secure what is "In the Cloud" (your files and apps).</p>
        <div className="curiosity-hook">
          <strong>🤔 Did You Know?</strong> The most common cloud hacks aren't fancy; they happen because an IT admin left a storage folder "Public" by accident, allowing anyone with the link to download the data.
        </div>
        <div className="reference-box">
          <strong>📚 Research:</strong> <a href="https://cloudsecurityalliance.org" target="_blank" rel="noreferrer">Cloud Security Alliance (CSA)</a>
        </div>
      </>
    )
  },
  {
    id: 12,
    title: "12. IoT: The \"S\" in IoT stands for Security",
    content: (
      <>
        <p>This is a joke in the industry because IoT (Internet of Things) devices have almost <strong>Zero Security</strong>. Your smart lightbulb, fridge, and toaster are often running outdated Linux versions that have never been patched.</p>
        <p><strong>Botnets:</strong> Hackers infect millions of smart cameras to create a "Zombie Army" (Botnet) that they use to flood websites with traffic until they crash (DDoS).</p>
        <div className="curiosity-hook">
          <strong>🤔 Curiosity Challenge:</strong> Open <a href="https://www.shodan.io" target="_blank" rel="noreferrer">Shodan</a> and search for "Webcam." You will see thousands of live, unprotected cameras around the world. Secure yours!
        </div>
        <div className="reference-box">
          <strong>📚 Research:</strong> <a href="https://owasp.org" target="_blank" rel="noreferrer">OWASP: IoT Top 10 Risks</a>
        </div>
      </>
    )
  },
  {
    id: 13,
    title: "13. Zero Trust: The End of the Perimeter",
    content: (
      <>
        <p>Old security assumed: "If you are inside my office, I trust you." <strong>Zero Trust</strong> says: "I don't care if you are in my office or at a coffee shop; I trust no one." Every single request to see data must be verified with MFA and Device Health checks.</p>
        <div className="info-card">
          <h4>Continuous Verification</h4>
          <p>In Zero Trust, the system checks your identity not just when you log in, but <em>every few minutes</em> while you are working.</p>
        </div>
        <div className="curiosity-hook">
          <strong>🤔 Did You Know?</strong> Google was one of the first companies to move to Zero Trust after they were hacked by nation-state actors in 2009!
        </div>
        <div className="reference-box">
          <strong>📚 Research:</strong> <a href="https://www.microsoft.com" target="_blank" rel="noreferrer">Microsoft: Zero Trust Vision</a>
        </div>
      </>
    )
  },
  {
    id: 14,
    title: "14. Subsea Cables: The Physical Backbone",
    content: (
      <>
        <p>99% of international data is not in "the air" (Satellites); it is in <strong>Subsea Fiber Optic Cables</strong> at the bottom of the ocean. These cables are as thin as a garden hose and are the most critical physical vulnerability of the internet.</p>
        <div className="curiosity-hook">
          <strong>🤔 Did You Know?</strong> Sharks have been caught on camera biting subsea cables! Google now wraps its trans-Pacific cables in Kevlar-like material to protect them from shark attacks.
        </div>
        <div className="reference-box">
          <strong>📚 Research:</strong> <a href="https://www.submarinecablemap.com" target="_blank" rel="noreferrer">Interactive Subsea Cable Map</a>
        </div>
      </>
    )
  },
  {
    id: 15,
    title: "15. Digital Forensics: The CSI of Cyber",
    content: (
      <>
        <p>Digital Forensics is the investigation of digital evidence. The first rule is <strong>Preservation</strong>. You never work on the original drive; you make a bit-for-bit "Clone" and work on the copy so you don't destroy evidence.</p>
        <div className="info-card">
          <h4>Chain of Custody</h4>
          <p>A log that tracks every single person who touched a piece of evidence. If one person isn't logged, a lawyer can get the evidence thrown out of court.</p>
        </div>
        <div className="curiosity-hook">
          <strong>🤔 Curiosity Challenge:</strong> Even if you delete a file and empty the trash, it’s still on your hard drive! It only "disappears" when new data writes over it.
        </div>
        <div className="reference-box">
          <strong>📚 Research:</strong> <a href="https://www.sans.org" target="_blank" rel="noreferrer">SANS: The Forensics Lab</a>
        </div>
      </>
    )
  },
  {
    id: 16,
    title: "16. Incident Response: Stopping the Bleeding",
    content: (
      <>
        <p>When a company is hacked, the <strong>Incident Response (IR)</strong> team are the "Firefighters." Their goal is <strong>Containment</strong>. They don't try to find the hacker first; they try to stop the virus from spreading further.</p>
        <p><strong>Eradication:</strong> Once the virus is contained, they wipe the systems clean and restore them from those 3-2-1 backups we learned about earlier.</p>
        <div className="curiosity-hook">
          <strong>🤔 Did You Know?</strong> Many big companies have "War Rooms" with dedicated internet lines and satellite phones used only during a major cyber incident.
        </div>
        <div className="reference-box">
          <strong>📚 Research:</strong> <a href="https://www.incidentresponse.com" target="_blank" rel="noreferrer">IR Playbooks & Training</a>
        </div>
      </>
    )
  },
  {
    id: 17,
    title: "17. Bug Bounties: The Ethical Hackers",
    content: (
      <>
        <p>Ethical Hackers (White Hats) find holes in systems for <strong>Permission</strong> and <strong>Profit</strong>. Companies like Apple and Facebook pay millions to people who find bugs through "Bug Bounty" programs.</p>
        <div className="info-card">
          <h4>Vulnerability Disclosure</h4>
          <p>The ethical way to report a bug: Tell the company privately, give them time to fix it, and only <em>then</em> tell the public.</p>
        </div>
        <div className="curiosity-hook">
          <strong>🤔 Curiosity Challenge:</strong> Could you be a hacker? Start learning the basics of web vulnerabilities at <a href="https://tryhackme.com" target="_blank" rel="noreferrer">TryHackMe</a>. It's like a video game for security!
        </div>
        <div className="reference-box">
          <strong>📚 Research:</strong> <a href="https://www.hackerone.com" target="_blank" rel="noreferrer">HackerOne: Earn While You Learn</a>
        </div>
      </>
    )
  },
  {
    id: 18,
    title: "18. Privacy Laws: Your Rights as a Citizen",
    content: (
      <>
        <p>In the past, companies "owned" your data. Today, laws like <strong>GDPR (Europe)</strong> and <strong>CCPA (California)</strong> say that <em>You</em> own your data. You have the "Right to be Forgotten," meaning a company must delete your info if you ask.</p>
        <div className="curiosity-hook">
          <strong>🤔 Did You Know?</strong> Under GDPR, a company can be fined up to 4% of its <em>Global Annual Revenue</em> for a serious data breach. For a company like Google, that's billions of dollars!
        </div>
        <div className="reference-box">
          <strong>📚 Research:</strong> <a href="https://gdpr.eu" target="_blank" rel="noreferrer">The Official GDPR Portal</a>
        </div>
      </>
    )
  },
  {
    id: 19,
    title: "19. AI: The New Arms Race",
    content: (
      <>
        <p>Artificial Intelligence is changing everything. Attackers use <strong>Generative AI</strong> to write perfect, personalized phishing emails in any language. Defenders use <strong>Machine Learning</strong> to detect weird patterns in network traffic that no human would notice.</p>
        <div className="curiosity-hook">
          <strong>🤔 Curiosity Challenge:</strong> In the future, your "Antivirus" won't look for known viruses; it will simply learn your "Normal Behavior" and alert you if your computer starts acting "Strange."
        </div>
        <div className="reference-box">
          <strong>📚 Research:</strong> <a href="https://www.openai.com" target="_blank" rel="noreferrer">OpenAI: AI in Digital Defense</a>
        </div>
      </>
    )
  },
  {
    id: 20,
    title: "20. The Quantum Threat: Y2Q",
    content: (
      <>
        <p>Everything you learned about encryption (RSA/ECC) is about to break. <strong>Quantum Computers</strong> can solve the math problems behind current encryption in seconds. This upcoming event is known as <strong>Y2Q (Years to Quantum)</strong>.</p>
        <p><strong>Post-Quantum Cryptography (PQC):</strong> We are currently inventing new types of math that even Quantum computers can't solve. The race is on to update the whole internet before the first powerful Quantum computer arrives.</p>
        <div className="curiosity-hook">
          <strong>🤔 Did You Know?</strong> The "Harvest Now, Decrypt Later" strategy: Some nations are stealing encrypted data <em>today</em>, hoping to decrypt it with a Quantum computer in 10 years!
        </div>
        <div className="reference-box">
          <strong>📚 Research:</strong> <a href="https://csrc.nist.gov" target="_blank" rel="noreferrer">NIST: Post-Quantum Project</a>
        </div>
      </>
    )
  }
];

const examData = [
  { q: "What does the 'I' in CIA stand for?", opts: ["Identity", "Information", "Integrity", "Internet"], ans: "Integrity" },
  { q: "Which attack specifically targets high-ranking executives?", opts: ["Phishing", "Whaling", "Baiting", "Worming"], ans: "Whaling" },
  { q: "What is a 'Logic Bomb'?", opts: ["A physical explosive", "Code triggered by an event", "A type of firewall", "A secure cable"], ans: "Code triggered by an event" },
  { q: "Which framework assumption is 'assume breach and never trust'?", opts: ["AAA", "CIA Triad", "Zero Trust", "GDPR"], ans: "Zero Trust" },
  { q: "What protects 99% of global internet data physically?", opts: ["Satellites", "Firewalls", "Subsea Cables", "Cell Towers"], ans: "Subsea Cables" },
  { q: "What is the primary goal of Incident Response after a breach?", opts: ["Prosecution", "Containment", "Rebuilding servers", "Deleting logs"], ans: "Containment" },
  { q: "Which encryption type uses a Public and a Private key?", opts: ["Symmetric", "Hashing", "Asymmetric", "AES-256"], ans: "Asymmetric" },
  { q: "What is the term for a network of compromised 'zombie' IoT devices?", opts: ["Mainframe", "Botnet", "Trojan", "IDS"], ans: "Botnet" },
  { q: "Under GDPR, what right allows you to demand data deletion?", opts: ["Right to Access", "Right to be Forgotten", "Right to Privacy", "Right to Work"], ans: "Right to be Forgotten" },
  { q: "What math process is a 'one-way' function for password storage?", opts: ["Encryption", "Decryption", "Hashing", "Subnetting"], ans: "Hashing" }
];

export default function CombinedApp() {
  const [step, setStep] = useState(0);
  const [view, setView] = useState('study'); // study, exam, result
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [studyTime, setStudyTime] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setStudyTime(t => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    if (view === 'study') {
      if (step < lessonsData.length - 1) {
        setStep(step + 1);
        window.scrollTo(0, 0);
      } else {
        setView('exam');
      }
    } else {
      if (selected === examData[currentQ].ans) setScore(s => s + 1);
      if (currentQ < examData.length - 1) {
        setCurrentQ(q => q + 1);
        setSelected(null);
      } else {
        setView('result');
      }
    }
  };

  return (
    <div className="lesson-wrapper">
      <div className="progress-container">
        <div className="progress-bar" style={{ 
          width: view === 'study' ? `${((step + 1) / 20) * 100}%` : '100%',
          background: 'var(--accent)', height: '10px', transition: '0.5s'
        }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={`${view}-${step}-${currentQ}`} className="lesson-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {view === 'study' ? (
            <>
              <header className="lesson-header"><h1>{lessonsData[step].title}</h1></header>
              <div className="lesson-body">{lessonsData[step].content}</div>
              <div className="button-group" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
                <button className="nav-btn" onClick={() => setStep(step - 1)} disabled={step === 0} style={{opacity: step === 0 ? 0.3 : 1}}>Back</button>
                <button className="nav-btn" onClick={handleNext}>{step === 19 ? "Begin Certification Exam" : "Next Module →"}</button>
              </div>
            </>
          ) : view === 'exam' ? (
            <div className="exam-container">
              <h2>Final Certification Exam</h2>
              <p>Question {currentQ + 1} of 10</p>
              <h3 style={{ margin: '20px 0' }}>{examData[currentQ].q}</h3>
              <div className="options-grid" style={{ display: 'grid', gap: '10px' }}>
                {examData[currentQ].opts.map(o => (
                  <button key={o} onClick={() => setSelected(o)} style={{
                    padding: '15px', borderRadius: '10px', border: '2px solid',
                    borderColor: selected === o ? 'var(--accent)' : '#e2e8f0',
                    background: selected === o ? '#f0f9ff' : 'white', textAlign: 'left'
                  }}>{o}</button>
                ))}
              </div>
              <button className="nav-btn" onClick={handleNext} disabled={!selected} style={{ marginTop: '30px', width: '100%' }}>Submit Answer</button>
            </div>
          ) : (
            <div className="marks-screen" style={{ textAlign: 'center', padding: '40px' }}>
              <h1 style={{ color: '#16a34a' }}>Session Certified! 🎓</h1>
              <div style={{ fontSize: '5rem', fontWeight: 'bold', color: 'var(--accent)' }}>{score} / 10</div>
              <p>Mastery Level: <strong>{score >= 8 ? 'Expert' : score >= 5 ? 'Practitioner' : 'Novice'}</strong></p>
              <p>Total Learning Time: {Math.floor(studyTime / 60)} minutes {studyTime % 60} seconds</p>
              <button className="nav-btn" onClick={() => navigate('/dashboard')} style={{ marginTop: '20px' }}>Save Progress & Exit</button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}