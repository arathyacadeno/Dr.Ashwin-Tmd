'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useCms } from '@/context/CmsContext';

const initialMetrics = [
  { number: '25+', label: 'YEARS EXPERIENCE' },
  { number: '12k+', label: 'SUCCESSFUL CASES' },
  { number: '15', label: 'GLOBAL AWARDS' },
  { number: '98%', label: 'PATIENT RELIEF' },
  { number: '4.9/5+', label: 'PATIENT RATING' },
  { number: '24/7', label: 'PATIENT SUPPORT' },
  { number: '100%', label: 'PERSONALIZED CARE' },
];

export default function WhyChooseUs() {
  const { content } = useCms();
  const [clusterClass, setClusterClass] = useState('ready-to-converge');
  const wrapperRef = useRef(null);
  const animTimeoutRef = useRef(null);
  const hasConvergedRef = useRef(false);

  const metrics = useMemo(() => {
    if (content?.trustMetrics?.length >= 7) {
      return content.trustMetrics.map((m, i) => ({
        number: m.number || initialMetrics[i]?.number,
        label: (m.label || initialMetrics[i]?.label).toUpperCase(),
      }));
    }
    return initialMetrics;
  }, [content?.trustMetrics]);

  const triggerConvergence = () => {
    setClusterClass('ready-to-converge');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setClusterClass('is-converging');

        if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
        animTimeoutRef.current = setTimeout(() => {
          setClusterClass('is-converged is-floating');
        }, 2600);
      });
    });
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
            {content?.trustSectionName ? (
              <>
                {content.trustSectionName.split('&')[0]}
                {content.trustSectionName.includes('&') && (
                  <span className="why-choose-gold">&amp; {content.trustSectionName.split('&')[1]}</span>
                )}
              </>
            ) : (
              <>
                We&apos;re Here To Restore Your{' '}
                <span className="why-choose-gold">Comfort &amp; Function.</span>
              </>
            )}
          </h2>
        </div>

        {/* Circular Metric Cluster */}
        <div className="metrics-cluster-wrapper" ref={wrapperRef}>
          <div
            className={`metrics-cluster ${clusterClass}`}
            onClick={handleClick}
            title="Click to replay animation"
          >
            {metrics.map((m, idx) => (
              <div key={idx} className={`metric-bubble bubble-${idx + 1}`}>
                <span className="metric-number">{m.number}</span>
                <span className="metric-label">{m.label}</span>
              </div>
            ))}

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
