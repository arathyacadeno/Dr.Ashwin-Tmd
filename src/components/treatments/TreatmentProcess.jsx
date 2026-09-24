import React, { useState, useEffect, useRef } from 'react';

const processSteps = [
  {
    num: '01',
    label: 'A long conversation',
    desc: 'Your history, your sleep, and what has been tried before.',
    img: '/assets/images/care_listen_first.jpg'
  },
  {
    num: '02',
    label: 'A careful examination',
    desc: 'A proper examination of the jaw joints, facial muscles, bite alignment, and range of movement.',
    img: '/assets/images/care_look_carefully.jpg'
  },
  {
    num: '03',
    label: 'Imaging where it helps',
    desc: 'Targeted 3D CBCT, digital imaging, and jaw movement tracking when deeper clarity is needed.',
    img: '/assets/images/process_step_03_imaging.jpg'
  },
  {
    num: '04',
    label: 'Breathing and sleep assessment',
    desc: 'Evaluating airway dimensions, tongue position, and nighttime grinding or clenching habits.',
    img: '/assets/images/process_step_04_sleep.jpg'
  },
  {
    num: '05',
    label: 'Then we sit down together',
    desc: 'We review every scan and finding together, explain what is happening, and agree on a clear path.',
    img: '/assets/images/process_step_05_together.jpg'
  }
];

export const TreatmentProcess = () => {
  const [activeStep, setActiveStep] = useState(0);
  const trackRef = useRef(null);

  const pathPercent = (activeStep / (processSteps.length - 1)) * 100;

  return (
    <section className="treatments-process-section" id="treatment-process">
      <div className="process-scroll-track" id="processScrollTrack" ref={trackRef}>
        <div className="process-sticky-stage" id="processStickyStage">
          <div className="container">
            <div className="process-grid-container">
              {/* Left Column: Interactive Stepper List */}
              <div className="process-stepper-col" role="tablist" aria-label="Treatment Process Steps">
                {/* Animated Progress Path Line */}
                <div className="process-path-track" aria-hidden="true">
                  <div
                    className="process-path-line"
                    id="processPathLine"
                    style={{ height: `${pathPercent}%`, transition: 'height 0.35s ease' }}
                  ></div>
                </div>

                {processSteps.map((step, idx) => {
                  const isActive = activeStep === idx;
                  const isPassed = activeStep > idx;

                  return (
                    <button
                      key={idx}
                      className={`process-step-item ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
                      data-step={idx}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveStep(idx)}
                    >
                      <span className="step-dot-wrap">
                        <span className="step-dot"></span>
                      </span>
                      <span className="step-num">{step.num}</span>
                      <span className="step-label">{step.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Visual Card with Bottom Scrim Overlay */}
              <div className="process-display-col">
                <div className="process-visual-card" id="processVisualCard">
                  {processSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className={`process-slide ${activeStep === idx ? 'active' : ''}`}
                      data-step={idx}
                      style={{
                        opacity: activeStep === idx ? 1 : 0,
                        pointerEvents: activeStep === idx ? 'auto' : 'none',
                        transition: 'opacity 0.4s ease'
                      }}
                    >
                      <img src={step.img} alt={step.label} className="process-slide-img" />
                      <div className="process-slide-overlay">
                        <div className="process-slide-counter">{step.num} / 05</div>
                        <h3 className="process-slide-title">{step.label}</h3>
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
};

export default TreatmentProcess;
