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
        }, 1800);
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
    <section className="why-choose-us-wrap" id="why-choose-us">
      {/* Floating Golden Ambient Sparkles in Background */}
      <div className="why-choose-particles" aria-hidden="true">
        <span className="why-choose-particle p1" style={{ top: '18%', left: '12%', width: '7px', height: '7px', animationDelay: '0s' }} />
        <span className="why-choose-particle p2" style={{ top: '25%', right: '14%', width: '9px', height: '9px', animationDelay: '1.2s' }} />
        <span className="why-choose-particle p3" style={{ top: '65%', left: '18%', width: '6px', height: '6px', animationDelay: '2.4s' }} />
        <span className="why-choose-particle p4" style={{ top: '72%', right: '20%', width: '8px', height: '8px', animationDelay: '0.8s' }} />
        <span className="why-choose-particle p5" style={{ top: '42%', left: '30%', width: '5px', height: '5px', animationDelay: '1.8s' }} />
        <span className="why-choose-particle p6" style={{ top: '38%', right: '32%', width: '6px', height: '6px', animationDelay: '3.1s' }} />
        <span className="why-choose-particle p7" style={{ top: '80%', left: '46%', width: '7px', height: '7px', animationDelay: '2.0s' }} />
      </div>

      <div className="container why-choose-container">
        {/* Section Header */}
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

        {/* Circular Metric Cluster with Elastic Zoom & Golden Orbit Animation */}
        <div className="metrics-cluster-wrapper" ref={wrapperRef}>
          <div
            className={`metrics-cluster ${clusterClass}`}
            onClick={handleClick}
            title="Click to replay animation"
          >
            {metrics.map((m, idx) => {
              const bubbleNum = idx + 1;
              const hasOrbit = bubbleNum === 2 || bubbleNum === 4 || bubbleNum === 6;

              return (
                <div key={idx} className={`metric-bubble bubble-${bubbleNum}`}>
                  {/* Rotating Golden Orbit Ring with Orbiting Dot */}
                  {hasOrbit && (
                    <div className={`orbit-ring orbit-ring-${bubbleNum}`} aria-hidden="true">
                      <span className="orbit-dot" />
                    </div>
                  )}

                  <span className="metric-number">
                    {m.number.includes('+') ? (
                      <>
                        {m.number.replace('+', '')}
                        <span className="metric-plus">+</span>
                      </>
                    ) : (
                      m.number
                    )}
                  </span>
                  <span className="metric-label">{m.label}</span>
                </div>
              );
            })}

            {/* Central Golden Gravitational Ripple Ring */}
            <div className="convergence-pulse-ring" aria-hidden="true"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
