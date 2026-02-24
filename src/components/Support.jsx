// src/pages/Support.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function Support() {
  return (
    <div>
      {/* Navigation */}
      <nav>
        <div className="logo">
          <div>
            <div />
          </div>
          <h1 className="text-2xl font-bold italic">BRAVE WAVE</h1>
        </div>

        <div>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/support">Support</a>
          <a href="#" className="button">
            Sign In / Register
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2>Support</h2>
          <p>
            Need help? We are here for you. Please reach out to our support team
            for any inquiries or issues you may encounter.
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <strong>BRAVE WAVE</strong>
            <p>
              A learning platform for mastering digital skills through
              structured education.
            </p>
          </div>

          <div className="footer-links">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/support">Support</a>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Brave Wave. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
