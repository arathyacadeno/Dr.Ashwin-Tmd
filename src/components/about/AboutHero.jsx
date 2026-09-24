import React, { useEffect, useRef } from 'react';

export const AboutHero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const hintRef = useRef(null);

  useEffect(() => {
    // Staggered entrance animation
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

  return (
    <section className="about-hero-section" id="aboutHeroSection" ref={heroRef}>
      <div className="about-hero-sticky" id="aboutHeroSticky">
        <h1 className="about-hero-title scaling-title" id="aboutScalingTitle" ref={titleRef}>
          <span className="hero-line hero-line-1">A clinic built around</span>
          <span className="hero-line hero-line-2">One thing, done properly</span>
        </h1>
        <p className="about-hero-sub" id="aboutScalingSub">
          Dr. Ashwin's TMD Clinic, Calicut — jaw, bite and airway care with the time it deserves.
        </p>
        <div className="about-hero-scroll-hint" id="aboutHeroScrollHint" ref={hintRef}>
          <span>Scroll down</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M7 10l5 5 5-5" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
