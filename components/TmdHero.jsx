'use client';

import React, { useEffect, useRef } from 'react';
import { useCms } from '@/context/CmsContext';

export default function TmdHero() {
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

      // Scales smoothly from 1.0 down to 0.52
      const titleScale = 1.0 - progress * 0.48;
      const subOpacity = Math.max(0, 1 - progress * 2.5);
      const hintOpacity = Math.max(0, 1 - progress * 3.5);

      hero.style.setProperty('--tmd-title-scale', titleScale.toFixed(3));
      hero.style.setProperty('--tmd-sub-opacity', subOpacity.toFixed(2));
      hero.style.setProperty('--scroll-hint-opacity', hintOpacity.toFixed(2));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="tmd-hero-section" id="tmdHeroSection" ref={heroRef}>
      <div className="tmd-hero-sticky" id="tmdHeroSticky">
        <h1 className="tmd-hero-title scaling-title" id="tmdScalingTitle">
          <span className="hero-line hero-line-1">{content?.tmdHeroLine1 || 'What is TMD,'}</span>
          <span className="hero-line hero-line-2">{content?.tmdHeroLine2 || 'in plain language'}</span>
        </h1>
        <p className="tmd-hero-sub" id="tmdScalingSub">
          {content?.tmdHeroSub || 'A common, well-understood and very treatable problem with the jaw joint'}
        </p>
        <div className="tmd-hero-scroll-hint" id="tmdHeroScrollHint">
          <span>Scroll down</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M7 10l5 5 5-5" />
          </svg>
        </div>
      </div>
    </section>
  );
}
