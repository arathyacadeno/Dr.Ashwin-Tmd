import React from 'react';

const steps = [
  {
    num: '01',
    meta: 'START HERE',
    title: 'Your first visit',
    desc: 'Conversation, examination, and imaging if needed.',
    subtext: 'Bring anything you have collected along the way.',
    isLast: false,
  },
  {
    num: '02',
    meta: 'NEXT STEP',
    title: 'Your second visit',
    desc: 'We show you what we found, explain the options with timelines and costs, and answer everything before you decide anything.',
    subtext: null,
    isLast: false,
  },
  {
    num: '03',
    meta: 'NEXT STEP',
    title: 'Treatment',
    desc: 'The appliance is fitted or treatment begins, with regular reviews to make sure it is going the way it should.',
    subtext: null,
    isLast: false,
  },
  {
    num: '04',
    meta: 'ONGOING',
    title: 'Keeping it that way',
    desc: 'Once you are comfortable, reviews confirm it is holding, along with simple guidance to keep it there.',
    subtext: null,
    isLast: true,
  },
];

export default function TreatmentJourney() {
  return (
    <section className="treatment-journey-section" id="treatment-journey">
      <div className="container">
        {/* Header */}
        <div className="treatment-journey-header">
          <h2 className="journey-heading">Clear steps. No surprises.</h2>
        </div>

        {/* 4-Step Timeline Grid */}
        <div className="treatment-journey-grid">
          {steps.map((step) => (
            <div className="journey-step-col" key={step.num}>
              <div className={`journey-marker-row ${step.isLast ? 'is-last' : ''}`}>
                <div className="journey-circle-badge">
                  <span className="journey-badge-num">{step.num}</span>
                  <span className="journey-badge-dot"></span>
                </div>
              </div>

              <div className="journey-step-content">
                <div className="journey-step-meta">
                  <span className="journey-meta-label">{step.meta}</span>
                  <svg
                    className="journey-meta-clock"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 15 14"></polyline>
                  </svg>
                </div>

                <h3 className="journey-step-title">{step.title}</h3>
                <p className="journey-step-desc">{step.desc}</p>
                {step.subtext && <p className="journey-step-subtext">{step.subtext}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
