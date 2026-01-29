import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import "./Lesson.css"

// Homepage Section
const HomePage = () => {
  return (
    <div className="homepage">
      <header>
        <h1>Welcome to Cybersecurity 101: Protecting Yourself in the Digital Age</h1>
      </header>

      <section className="intro-section">
        <p>
          In today’s digital world, cybersecurity is more important than ever. Whether you're a beginner or someone looking to brush up on your skills, this website will guide you through the essentials of protecting yourself and your information online.
        </p>
        <p>
          Cybersecurity isn't just for big companies—it's something we all need to think about. On this site, you’ll find easy-to-understand lessons, tips, and tools to help you safeguard your personal data, stay safe online, and better understand the digital threats we face daily.
        </p>
      </section>

      <section className="cta">
        <p>Start learning now: Take the First Lesson or explore our topics below!</p>
        <button onClick={() => window.scrollTo(0, document.getElementById('lesson1').offsetTop)}>
          Take the First Lesson
        </button>
      </section>
    </div>
  );
};

// Lesson 1
const Lesson1 = () => {
  return (
    <div id="lesson1" className="lesson">
      <h2>Understanding Cybersecurity: Your First Step to Online Protection</h2>

      <section>
        <h3>Introduction</h3>
        <p>
          Cybersecurity is all about protecting your digital life. It includes everything from your personal data to the networks and systems that store and process that information. With the rise of cyberattacks, understanding cybersecurity is more important than ever.
        </p>
        <p>
          In this lesson, we'll cover the basics, including:
        </p>
        <ul>
          <li>The definition of cybersecurity</li>
          <li>Why it matters to everyone, not just big companies</li>
          <li>Key concepts that form the foundation of online safety</li>
        </ul>
      </section>

      <section>
        <h3>What is Cybersecurity?</h3>
        <p>
          Cybersecurity refers to the practices, technologies, and processes that are designed to protect networks, computers, programs, and data from attack, damage, or unauthorized access. It’s about keeping both your personal and professional data safe.
        </p>
      </section>

      <section>
        <h3>Why is Cybersecurity Important?</h3>
        <p>
          We store a lot of personal and sensitive information online: from banking details to social media passwords. Hackers and cybercriminals are constantly looking for ways to steal this information, disrupt services, or cause harm. That’s why cybersecurity is crucial.
        </p>
      </section>

      <section>
        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Confidentiality:</strong> Ensuring only authorized individuals can access information.</li>
          <li><strong>Integrity:</strong> Ensuring data is accurate and hasn’t been tampered with.</li>
          <li><strong>Availability:</strong> Ensuring data and services are accessible when needed.</li>
        </ul>
      </section>

      <section>
        <h3>Takeaway</h3>
        <p>
          Cybersecurity isn’t just a technical subject for IT professionals—it’s something everyone should care about, as it affects all of us. The more you know, the safer you’ll be.
        </p>
      </section>

      <section>
        <button onClick={() => window.scrollTo(0, document.getElementById('lesson2').offsetTop)}>
          Next Lesson
        </button>
      </section>
    </div>
  );
};

// Lesson 2
const Lesson2 = () => {
  return (
    <div id="lesson2" className="lesson">
      <h2>Recognizing Cyber Threats: Protect Yourself from Digital Danger</h2>

      <section>
        <h3>Introduction</h3>
        <p>
          The digital world can be dangerous, but understanding common threats will help you stay safe. In this lesson, we’ll dive into the most common types of cyberattacks and threats, and show you how to avoid falling victim to them.
        </p>
      </section>

      <section>
        <h3>1. Malware</h3>
        <p>
          Malware is any software intentionally designed to cause harm. This includes:
        </p>
        <ul>
          <li>Viruses: Programs that spread to other files.</li>
          <li>Trojans: Programs that seem safe but actually give hackers access to your device.</li>
          <li>Ransomware: Software that locks your data until you pay a ransom.</li>
        </ul>
      </section>

      <section>
        <h3>2. Phishing</h3>
        <p>
          Phishing attacks trick you into giving away personal information, usually through emails, texts, or fake websites. They often look official but contain subtle mistakes or suspicious links.
        </p>
      </section>

      <section>
        <h3>3. Denial of Service (DoS) Attacks</h3>
        <p>
          A DoS attack floods a website or server with traffic, causing it to crash. This can disrupt services and make websites unavailable to legitimate users.
        </p>
      </section>

      <section>
        <h3>4. Man-in-the-Middle Attacks (MitM)</h3>
        <p>
          In a MitM attack, hackers intercept communications between two parties, such as between a user and a website. This allows hackers to steal sensitive data like login credentials.
        </p>
      </section>

      <section>
        <h3>Tips to Stay Safe</h3>
        <ul>
          <li>Always check URLs before entering personal information.</li>
          <li>Don’t click on suspicious links in emails.</li>
          <li>Install antivirus software and keep it updated.</li>
        </ul>
      </section>

      <section>
        <button onClick={() => window.scrollTo(0, document.getElementById('lesson3').offsetTop)}>
          Next Lesson
        </button>
      </section>
    </div>
  );
};

// Lesson 3
const Lesson3 = () => {
  return (
    <div id="lesson3" className="lesson">
      <h2>Simple Steps to Stay Safe Online</h2>

      <section>
        <h3>Introduction</h3>
        <p>
          You don’t need to be an expert to protect yourself online. By following a few basic practices, you can safeguard your personal information and keep your accounts secure.
        </p>
      </section>

      <section>
        <h3>1. Use Strong Passwords</h3>
        <p>Create unique passwords for each account, and make them long and complex. A good password should contain a mix of letters, numbers, and special characters.</p>
      </section>

      <section>
        <h3>2. Enable Two-Factor Authentication (2FA)</h3>
        <p>
          2FA adds an extra layer of security. Even if someone guesses your password, they won’t be able to access your account without the second factor—usually a code sent to your phone.
        </p>
      </section>

      <section>
        <h3>3. Use a VPN (Virtual Private Network)</h3>
        <p>
          A VPN helps protect your privacy by encrypting your internet traffic, making it harder for anyone to track your online activity.
        </p>
      </section>

      <section>
        <h3>4. Be Careful About What You Share</h3>
        <p>
          Avoid oversharing on social media or other platforms. Personal details like your address, phone number, or vacation plans can be used by cybercriminals to steal your identity.
        </p>
      </section>

      <section>
        <button onClick={() => window.scrollTo(0, document.getElementById('lesson4').offsetTop)}>
          Next Lesson
        </button>
      </section>
    </div>
  );
};

// Lesson 4
const Lesson4 = () => {
  return (
    <div id="lesson4" className="lesson">
      <h2>Protecting Your Network: Keeping Your Devices Safe</h2>

      <section>
        <h3>Introduction</h3>
        <p>
          Whether you’re browsing at home or using a public Wi-Fi hotspot, network security is a vital part of keeping your data safe. In this lesson, we’ll cover the basics of network security and how you can protect your devices from online threats.
        </p>
      </section>

      <section>
        <h3>1. Firewalls</h3>
        <p>A firewall acts like a filter between your device and the internet, blocking malicious traffic while letting safe data through.</p>
      </section>

      <section>
        <h3>2. Wi-Fi Security</h3>
        <p>
          When using Wi-Fi, make sure your network is secured with a strong password. Avoid connecting to public Wi-Fi without using a VPN.
        </p>
      </section>

      <section>
        <h3>3. Intrusion Detection Systems (IDS)</h3>
        <p>
          IDS monitors network traffic and looks for suspicious activities that might indicate an attack. It’s often used in larger organizations to detect and stop threats early.
        </p>
      </section>

      <section>
        <button onClick={() => window.scrollTo(0, document.getElementById('lesson5').offsetTop)}>
          Next Lesson
        </button>
      </section>
    </div>
  );
};

// Lesson 5
const Lesson5 = () => {
  return (
    <div id="lesson5" className="lesson">
      <h2>Cybersecurity Laws: Protecting Data and Privacy</h2>

      <section>
        <h3>Introduction</h3>
        <p>
          Cybersecurity isn’t just about technology—it’s also about laws and ethics. In this lesson, we’ll explore important cybersecurity laws and discuss the role of ethical hacking in ensuring online safety.
        </p>
      </section>

      <section>
        <h3>1. Cybercrime Laws</h3>
        <p>
          Hacking, data theft, and online fraud are crimes. Understanding laws like the Computer Fraud and Abuse Act (CFAA) helps you avoid breaking the law and provides a basis for prosecuting cybercriminals.
        </p>
      </section>

      <section>
        <h3>2. Privacy Protection</h3>
        <p>
          Laws such as the General Data Protection Regulation (GDPR) in the EU and the California Consumer Privacy Act (CCPA) in the U.S. protect your data and privacy. These laws give you rights over how your personal information is used.
        </p>
      </section>

      <section>
        <h3>3. Ethical Hacking</h3>
        <p>
          Ethical hackers, or white-hat hackers, are cybersecurity professionals who identify and fix security vulnerabilities. They play a critical role in defending against cyberattacks.
        </p>
      </section>

      <section>
        <button onClick={() => window.scrollTo(0, document.body.scrollHeight)}>
          Go to Footer
        </button>
      </section>
    </div>
  );
};

// Footer
const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <h3>About Us</h3>
        <p>
          We’re passionate about cybersecurity and want to make the internet a safer place for everyone. This site is designed to help you understand the basics and take steps to protect your digital life.
        </p>

        <h3>Contact Us</h3>
        <p>Got questions or suggestions? Reach out to us at <a href="mailto:contact@cybersecurity101.com">contact@cybersecurity101.com</a>.</p>

        <p>Legal Information: All content is for educational purposes only. For professional advice, please consult a cybersecurity expert.</p>
        <p><a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="App">
      <HomePage />
      <Lesson1 />
      <Lesson2 />
      <Lesson3 />
      <Lesson4 />
      <Lesson5 />
      <Footer />
    </div>
  );
}

export default App;
