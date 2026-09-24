'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function WhyChooseUs() {
  const [clusterClass, setClusterClass] = useState('ready-to-converge');
  const wrapperRef = useRef(null);
  const animTimeoutRef = useRef(null);
  const hasConvergedRef = useRef(false);

  const triggerConvergence = () => {
    setClusterClass('is-converging');

    if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    animTimeoutRef.current = setTimeout(() => {
      setClusterClass('is-converged is-floating');
    }, 2600);
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasConvergedRef.current) {
              hasConvergedRef.current = true;
              triggerConvergence();
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: '0px 0px -40px 0px',
        }
      );

      observer.observe(wrapper);
      return () => {
        observer.disconnect();
        if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
      };
    } else {
      triggerConvergence();
    }
  }, []);

  const handleClick = () => {
    if (!clusterClass.includes('is-converging')) {
      triggerConvergence();
    }
  };

  return (
    <div className="why-choose-us-wrap">
      <div className="container why-choose-container">
        <div className="why-choose-header">
          <span className="why-choose-tag">WHY CHOOSE US</span>
          <h2 className="why-choose-headline">
            We&apos;re Here To Restore Your{' '}
            <span className="why-choose-gold">Comfort &amp; Function.</span>
          </h2>
        </div>

        {/* Circular Metric Cluster */}
        <div className="metrics-cluster-wrapper" ref={wrapperRef}>
          <div
            className={`metrics-cluster ${clusterClass}`}
            onClick={handleClick}
            title="Click to replay animation"
          >
            {/* Circle 1: 25+ Years Experience (Bottom-Left) */}
            <div className="metric-bubble bubble-1">
              <span className="metric-number">25+</span>
              <span className="metric-label">YEARS EXPERIENCE</span>
            </div>

            {/* Circle 2: 12k+ Successful Cases (Top-Left) */}
            <div className="metric-bubble bubble-2">
              <span className="metric-number">12k+</span>
              <span className="metric-label">SUCCESSFUL CASES</span>
            </div>

            {/* Circle 3: 15 Global Awards (Top-Center) */}
            <div className="metric-bubble bubble-3">
              <span className="metric-number">15</span>
              <span className="metric-label">GLOBAL AWARDS</span>
            </div>

            {/* Circle 4: 98% Patient Relief (Bottom-Center) */}
            <div className="metric-bubble bubble-4">
              <span className="metric-number">98%</span>
              <span className="metric-label">PATIENT RELIEF</span>
            </div>

            {/* Circle 5: 4.9/5 + Patient Rating (Large Center-Right) */}
            <div className="metric-bubble bubble-5">
              <span className="metric-number">
                4.9/5<span className="metric-plus">+</span>
              </span>
              <span className="metric-label">PATIENT RATING</span>
            </div>

            {/* Circle 6: 24/7 Patient Support (Top-Right) */}
            <div className="metric-bubble bubble-6">
              <span className="metric-number">24/7</span>
              <span className="metric-label">PATIENT SUPPORT</span>
            </div>

            {/* Circle 7: 100% Personalized Care (Bottom-Right) */}
            <div className="metric-bubble bubble-7">
              <span className="metric-number">100%</span>
              <span className="metric-label">PERSONALIZED CARE</span>
            </div>

            {/* Central Gravitational Ripple Ring */}
            <div className="convergence-pulse-ring" aria-hidden="true"></div>
          </div>

          {/* Horizontal Baseline Line */}
          <div className="metrics-baseline"></div>
        </div>
      </div>
    </div>
  );
}
