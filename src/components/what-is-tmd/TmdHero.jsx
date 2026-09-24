import React, { useEffect, useRef } from 'react';

export const TmdHero = () => {
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
    <section className="tmd-hero-section" id="tmdHeroSection">
      <div className="tmd-hero-sticky" id="tmdHeroSticky">
        <h1 className="tmd-hero-title scaling-title" id="tmdScalingTitle" ref={titleRef}>
          <span className="hero-line hero-line-1">What is TMD,</span>
          <span className="hero-line hero-line-2">In plain language</span>
        </h1>
        <p className="tmd-hero-sub" id="tmdScalingSub">
          A common, well-understood and very treatable problem with the jaw joint
        </p>
        <div className="tmd-hero-scroll-hint" id="tmdHeroScrollHint" ref={hintRef}>
          <span>Scroll down</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M7 10l5 5 5-5" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default TmdHero;
