import React, { useEffect, useRef } from 'react';

export const WhyChooseUs = () => {
  const clusterRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const cluster = clusterRef.current;
    const wrapper = wrapperRef.current;
    if (!cluster || !wrapper) return;

    cluster.classList.add('ready-to-converge');
    let hasConverged = false;
    let animTimeout = null;

    const triggerConvergence = () => {
      cluster.classList.remove('ready-to-converge', 'is-floating', 'is-converged');
      void cluster.offsetWidth; // force DOM reflow
      cluster.classList.add('is-converging');

      if (animTimeout) clearTimeout(animTimeout);
      animTimeout = setTimeout(() => {
        cluster.classList.remove('is-converging');
        cluster.classList.add('is-converged', 'is-floating');
      }, 2600);
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasConverged) {
              hasConverged = true;
              triggerConvergence();
            }
          });
        },
        { threshold: 0.2, rootMargin: '0px 0px -40px 0px' }
      );
      observer.observe(wrapper);
    } else {
      triggerConvergence();
    }

    const handleClick = () => {
      if (!cluster.classList.contains('is-converging')) {
        triggerConvergence();
      }
    };

    cluster.addEventListener('click', handleClick);

    return () => {
      cluster.removeEventListener('click', handleClick);
      if (animTimeout) clearTimeout(animTimeout);
    };
  }, []);

  return (
    <div className="why-choose-us-wrap">
      <div className="container why-choose-container">
        <div className="why-choose-header">
          <span className="why-choose-tag">WHY CHOOSE US</span>
          <h2 className="why-choose-headline">
            We're Here To Restore Your{' '}
            <span className="why-choose-gold">Comfort &amp; Function.</span>
          </h2>
        </div>

        {/* Circular Metric Cluster */}
        <div className="metrics-cluster-wrapper" ref={wrapperRef}>
          <div className="metrics-cluster" ref={clusterRef}>
            {/* Circle 1: 25+ Years Experience */}
            <div className="metric-bubble bubble-1">
              <span className="metric-number">25+</span>
              <span className="metric-label">YEARS EXPERIENCE</span>
            </div>

            {/* Circle 2: 12k+ Successful Cases */}
            <div className="metric-bubble bubble-2">
              <span className="metric-number">12k+</span>
              <span className="metric-label">SUCCESSFUL CASES</span>
            </div>

            {/* Circle 3: 15 Global Awards */}
            <div className="metric-bubble bubble-3">
              <span className="metric-number">15</span>
              <span className="metric-label">GLOBAL AWARDS</span>
            </div>

            {/* Circle 4: 98% Patient Relief */}
            <div className="metric-bubble bubble-4">
              <span className="metric-number">98%</span>
              <span className="metric-label">PATIENT RELIEF</span>
            </div>

            {/* Circle 5: 4.9/5+ Patient Rating */}
            <div className="metric-bubble bubble-5">
              <span className="metric-number">
                4.9/5<span className="metric-plus">+</span>
              </span>
              <span className="metric-label">PATIENT RATING</span>
            </div>

            {/* Circle 6: 24/7 Patient Support */}
            <div className="metric-bubble bubble-6">
              <span className="metric-number">24/7</span>
              <span className="metric-label">PATIENT SUPPORT</span>
            </div>

            {/* Circle 7: 100% Personalized Care */}
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
};

export default WhyChooseUs;
