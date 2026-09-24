'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3500);
  };

  return (
    <footer className="site-footer" id="contact">
      <div className="container footer-main-grid">
        {/* Col 1: Brand & Bio */}
        <div className="footer-brand-col">
          <Link href="/" className="footer-brand-badge">
            <Image
              src="/assets/images/logo.png"
              alt="Dr. Ashwin's TMD Clinic"
              width={42}
              height={42}
              className="footer-brand-logo-img"
            />
            <div className="brand-titles">
              <span className="brand-name-gold">DR ASHWIN’S</span>
              <span className="brand-sub-white">TMD CLINIC</span>
            </div>
          </Link>
          <p className="footer-clinic-desc">
            Expert care for TMJ/TMD disorders using advanced diagnostics and non-invasive treatments to restore comfort and jaw function. Led by Dr. Ashwin in Kozhikode.
          </p>
          <div className="footer-social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-circle-btn social-facebook" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-circle-btn social-instagram" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-circle-btn social-youtube" aria-label="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z"></path>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-circle-btn social-linkedin" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Col 2: Explore */}
        <div>
          <h4 className="footer-col-title-gold">Explore</h4>
          <div className="footer-links-col">
            <Link href="/">Home</Link>
            <Link href="/about">About Us</Link>
            <Link href="/what-is-tmd">What is TMD</Link>
            <Link href="/treatments">Treatments</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
        </div>

        {/* Col 3: Treatments */}
        <div>
          <h4 className="footer-col-title-gold">Treatments</h4>
          <div className="footer-links-col">
            <Link href="/treatments">Neuromuscular dentistry</Link>
            <Link href="/treatments">TMD diagnosis</Link>
            <Link href="/treatments">Treatment process</Link>
          </div>
        </div>

        {/* Col 4: Newsletter */}
        <div>
          <h4 className="footer-col-title-gold">Newsletter</h4>
          <form className="newsletter-pill-form" id="newsletterForm" onSubmit={handleNewsletter}>
            <input
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="newsletter-send-btn"
              aria-label="Subscribe"
              style={subscribed ? { backgroundColor: '#FCBC15', color: '#1E1E1E' } : {}}
            >
              {subscribed ? (
                '✓'
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Minimal Copyright Bar */}
      <div className="container footer-copyright-bar">
        <p>© 2026 Dr. Ashwin's TMD Clinic. All rights reserved.</p>
      </div>
    </footer>
  );
}
