'use client';

import React, { useEffect, useRef } from 'react';
import { useCms } from '@/context/CmsContext';

export default function AboutHero() {
  const { content } = useCms();
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const hero = heroRef.current;
      if (!hero) return;
      const vh = window.innerHeight;
      const heroRange = hero.offsetHeight - vh;
      const scrollY = window.scrollY;
      const progress = Math.min(1, Math.max(0, scrollY / (heroRange > 50 ? heroRange : 350)));

      const titleScale = 1.0 - progress * 0.48;
      const subOpacity = Math.max(0, 1 - progress * 2.5);
      const hintOpacity = Math.max(0, 1 - progress * 3.5);

      hero.style.setProperty('--about-title-scale', titleScale.toFixed(3));
      hero.style.setProperty('--about-sub-opacity', subOpacity.toFixed(2));
      hero.style.setProperty('--scroll-hint-opacity', hintOpacity.toFixed(2));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="about-hero-section" id="aboutHeroSection" ref={heroRef}>
      <div className="about-hero-sticky" id="aboutHeroSticky">
        <h1 className="about-hero-title scaling-title" id="aboutScalingTitle">
          <span className="hero-line hero-line-1">{content?.aboutHeroTitle1 || 'A clinic built around'}</span>
          <span className="hero-line hero-line-2">{content?.aboutHeroTitle2 || 'One thing, done properly'}</span>
        </h1>
        <p className="about-hero-sub" id="aboutScalingSub">
          Dr. Ashwin&apos;s TMD Clinic, Calicut — jaw, bite and airway care with the time it deserves.
        </p>
        <div className="about-hero-scroll-hint" id="aboutHeroScrollHint">
          <span>{content?.aboutHeroScrollHint || 'Scroll down'}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M7 10l5 5 5-5" />
          </svg>
        </div>
      </div>
    </section>
  );
}
