import React, { useEffect, useRef } from 'react';

export const TreatmentsHero = () => {
  const titleRef = useRef(null);
  const hintRef = useRef(null);

  useEffect(() => {
    const lines = titleRef.current?.querySelectorAll('.hero-line');
    if (lines) {
      lines.forEach((line, i) => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(28px)';
        line.style.transition = `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.12}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.12}s`;
        setTimeout(() => {
          line.style.opacity = '1';
          line.style.transform = 'translateY(0)';
        }, 50);
      });
    }

    if (hintRef.current) {
      hintRef.current.style.opacity = '0';
      hintRef.current.style.transition = 'opacity 0.6s ease 0.4s';
      setTimeout(() => {
        if (hintRef.current) hintRef.current.style.opacity = '1';
      }, 50);
    }
  }, []);

  return (
    <div className="treatments-hero-intro" id="treatmentsHeroIntro">
      <h1 className="treatments-hero-title scaling-title" id="treatmentsScalingTitle" ref={titleRef}>
        <span className="hero-line hero-line-1">Gentle, reversible,</span>
        <span className="hero-line hero-line-2">And explained before it begins</span>
      </h1>
      <p className="treatments-hero-sub" id="treatmentsHeroSub">
        We start with the simplest approach that will work, and we only move further if we need to.
      </p>
      <div className="treatments-hero-scroll-hint" id="treatmentsHeroScrollHint" ref={hintRef}>
        <span>Scroll down</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M7 10l5 5 5-5" />
        </svg>
      </div>
    </div>
  );
};

export default TreatmentsHero;
