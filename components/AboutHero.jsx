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

      // Exact same behavior as What is TMD hero:
      // Scales smoothly from 1.0 down to ~0.52 without fading away
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

  const headingRaw = (
    content?.aboutHeroHeading ||
    `${content?.aboutHeroTitle1 || 'A clinic built around'} ${content?.aboutHeroTitle2 || 'One thing, done properly'}`
  ).trim();

  let line1 = headingRaw;
  let line2 = '';
  if (headingRaw.toLowerCase().includes('around')) {
    const idx = headingRaw.toLowerCase().indexOf('around') + 'around'.length;
    line1 = headingRaw.substring(0, idx).trim();
    line2 = headingRaw.substring(idx).trim();
  }

  const subtitle =
    content?.aboutHeroSubtitle ||
    "Dr. Ashwin's TMD Clinic, Calicut — jaw, bite and airway care with the time it deserves.";

  return (
    <section className="about-hero-section" id="aboutHeroSection" ref={heroRef}>
      <div className="about-hero-sticky" id="aboutHeroSticky">
        <h1 className="about-hero-title scaling-title" id="aboutScalingTitle">
          <span className="hero-line hero-line-1">{line1}</span>
          {line2 ? <span className="hero-line hero-line-2">{line2}</span> : null}
        </h1>
        <p className="about-hero-sub" id="aboutScalingSub">
          {subtitle}
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
