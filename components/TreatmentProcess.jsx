'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useCms } from '@/context/CmsContext';

const steps = [
  {
    num: '01',
    label: 'A long conversation',
    counter: '01 / 05',
    title: 'A long conversation',
    desc: 'Your history, your sleep, and what has been tried before.',
    img: '/assets/images/care_listen_first.jpg',
  },
  {
    num: '02',
    label: 'A careful examination',
    counter: '02 / 05',
    title: 'A careful examination',
    desc: 'A proper examination of the jaw joints, facial muscles, bite alignment, and range of movement.',
    img: '/assets/images/care_look_carefully.jpg',
  },
  {
    num: '03',
    label: 'Imaging where it helps',
    counter: '03 / 05',
    title: 'Imaging where it helps',
    desc: 'Targeted 3D CBCT, digital imaging, and jaw movement tracking when deeper clarity is needed.',
    img: '/assets/images/process_step_03_imaging.jpg',
  },
  {
    num: '04',
    label: 'Breathing and sleep assessment',
    counter: '04 / 05',
    title: 'Breathing and sleep assessment',
    desc: 'Evaluating airway dimensions, tongue position, and nighttime grinding or clenching habits.',
    img: '/assets/images/process_step_04_sleep.jpg',
  },
  {
    num: '05',
    label: 'Then we sit down together',
    counter: '05 / 05',
    title: 'Then we sit down together',
    desc: 'We review every scan and finding together, explain what is happening, and agree on a clear path.',
    img: '/assets/images/process_step_05_together.jpg',
  },
];

export default function TreatmentProcess() {
  const { content } = useCms();
  const [activeStep, setActiveStep] = useState(0);
  const [linePercent, setLinePercent] = useState(0);

  const currentSteps = useMemo(() => {
    return steps.map((s, idx) => {
      const cmsStep = content?.treatmentsSteps?.[idx];
      return {
        ...s,
        title: cmsStep?.title || s.title,
        label: cmsStep?.title || s.label,
        desc: cmsStep?.desc || s.desc,
      };
    });
  }, [content?.treatmentsSteps]);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const stepperColRef = useRef(null);
  const pathTrackRef = useRef(null);
  const stepBtnRefs = useRef([]);
  const isClickingRef = useRef(false);
  const clickTimeoutRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const stepperCol = stepperColRef.current;
    const pathTrack = pathTrackRef.current;
    const stepBtns = stepBtnRefs.current.filter(Boolean);

    if (!section || !track || !stepperCol || !pathTrack || stepBtns.length < 2) return;

    const updatePathDimensions = () => {
      const firstDot = stepBtns[0].querySelector('.step-dot-wrap');
      const lastDot = stepBtns[stepBtns.length - 1].querySelector('.step-dot-wrap');
      if (!firstDot || !lastDot) return;

      const colRect = stepperCol.getBoundingClientRect();
      const firstRect = firstDot.getBoundingClientRect();
      const lastRect = lastDot.getBoundingClientRect();

      const top = firstRect.top + firstRect.height / 2 - colRect.top;
      const bottom = colRect.bottom - (lastRect.top + lastRect.height / 2);
      const left = firstRect.left + firstRect.width / 2 - colRect.left - 1;

      pathTrack.style.top = `${top}px`;
      pathTrack.style.bottom = `${bottom}px`;
      pathTrack.style.left = `${left}px`;
    };

    const handleScroll = () => {
      if (isClickingRef.current) return;
      if (window.innerWidth <= 900) return;

      const rect = track.getBoundingClientRect();
      const trackHeight = track.offsetHeight - window.innerHeight;
      if (trackHeight <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(1, Math.max(0, scrolled / trackHeight));

      const numSteps = steps.length;
      const targetIndex = Math.min(numSteps - 1, Math.floor(progress * numSteps));

      setActiveStep(targetIndex);
      setLinePercent(progress * 100);
    };

    updatePathDimensions();
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => {
      updatePathDimensions();
      handleScroll();
    }, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updatePathDimensions);
    };
  }, []);

  const handleStepClick = (index) => {
    isClickingRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);

    setActiveStep(index);
    setLinePercent((index / (steps.length - 1)) * 100);

    if (window.innerWidth > 900 && trackRef.current) {
      const track = trackRef.current;
      const trackTop = track.getBoundingClientRect().top + window.scrollY;
      const trackHeight = track.offsetHeight - window.innerHeight;
      const targetScroll = trackTop + ((index + 0.5) / currentSteps.length) * trackHeight;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }

    clickTimeoutRef.current = setTimeout(() => {
      isClickingRef.current = false;
    }, 700);
  };

  return (
    <section className="treatments-process-section" id="treatment-process" ref={sectionRef}>
      <div className="process-scroll-track" id="processScrollTrack" ref={trackRef}>
        <div className="process-sticky-stage" id="processStickyStage">
          <div className="container">
            <div className="process-grid-container">
              {/* Left Column: Interactive Stepper List */}
              <div
                className="process-stepper-col"
                role="tablist"
                aria-label="Treatment Process Steps"
                ref={stepperColRef}
              >
                {/* Animated Progress Path Line */}
                <div className="process-path-track" ref={pathTrackRef} aria-hidden="true">
                  <div
                    className="process-path-line"
                    id="processPathLine"
                    style={{ height: `${linePercent}%` }}
                  ></div>
                </div>

                {currentSteps.map((step, idx) => (
                  <button
                    key={idx}
                    ref={(el) => (stepBtnRefs.current[idx] = el)}
                    type="button"
                    className={`process-step-item ${activeStep === idx ? 'active' : ''} ${
                      idx < activeStep ? 'passed' : ''
                    }`}
                    onClick={() => handleStepClick(idx)}
                    role="tab"
                    aria-selected={activeStep === idx}
                  >
                    <span className="step-dot-wrap">
                      <span className="step-dot"></span>
                    </span>
                    <span className="step-num">{step.num}</span>
                    <span className="step-label">{step.label}</span>
                  </button>
                ))}
              </div>

              {/* Right Column: Visual Card with Bottom Scrim Overlay */}
              <div className="process-display-col">
                <div className="process-visual-card" id="processVisualCard">
                  {currentSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className={`process-slide ${activeStep === idx ? 'active' : ''}`}
                    >
                      <img
                        src={step.img}
                        alt={step.title}
                        className="process-slide-img"
                        loading={idx === 0 ? 'eager' : 'lazy'}
                      />
                      <div className="process-slide-overlay">
                        <div className="process-slide-counter">{step.counter}</div>
                        <h3 className="process-slide-title">{step.title}</h3>
                        <p className="process-slide-desc">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
