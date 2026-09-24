'use client';

import React, { useEffect, useRef } from 'react';

export default function ContactHero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const hero = heroRef.current;
      if (!hero) return;
      const vh = window.innerHeight;
      const heroRange = hero.offsetHeight - vh;
      const scrollY = window.scrollY;
      const progress = Math.min(1, Math.max(0, scrollY / (heroRange > 50 ? heroRange : 350)));

      // Scales smoothly from 1.0 down to 0.52
      const titleScale = 1.0 - progress * 0.48;
      const subOpacity = Math.max(0, 1 - progress * 2.5);
      const hintOpacity = Math.max(0, 1 - progress * 3.5);

      hero.style.setProperty('--contact-title-scale', titleScale.toFixed(3));
      hero.style.setProperty('--contact-sub-opacity', subOpacity.toFixed(2));
      hero.style.setProperty('--scroll-hint-opacity', hintOpacity.toFixed(2));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="contact-hero-section" id="contactHeroSection" ref={heroRef}>
      <div className="contact-hero-sticky" id="contactHeroSticky">
        <h1 className="contact-hero-title scaling-title" id="contactScalingTitle">
          <span className="hero-line hero-line-1">Book your consultation</span>
        </h1>
        <p className="contact-hero-sub" id="contactScalingSub">
          Bring any scans, reports or records you have gathered — they always help.
        </p>
        <div className="contact-hero-scroll-hint" id="contactHeroScrollHint">
          <span>Scroll down</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M7 10l5 5 5-5" />
          </svg>
        </div>
      </div>
    </section>
  );
}
