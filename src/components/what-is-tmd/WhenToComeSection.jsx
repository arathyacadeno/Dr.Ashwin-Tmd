import React from 'react';
import { useClinic } from '../../context/ClinicContext';

const checklistItems = [
  'Pain or discomfort that has lasted more than two or three weeks.',
  'Clicking, popping, or grating sounds accompanied by any pain or tightness.',
  'Your jaw catches, locks, or feels like it won’t open all the way.',
  'Headaches, ear symptoms, or neck pain that other doctors haven’t been able to explain.',
  'Waking up every morning with a tight, tired, or aching jaw.'
];

export const WhenToComeSection = () => {
  const { openBookingModal } = useClinic();

  return (
    <section className="tmd-when-section" id="whenToCome">
      {/* Centered Header */}
      <div className="tmd-when-header">
        <h2 className="when-title">A good time to come in</h2>
        <p className="when-sub">
          You don’t need to wait until your jaw locks or the pain is severe. It is always easier to treat early.
        </p>
      </div>

      <div className="tmd-when-grid">
        {/* Left Column: Checklist */}
        <div className="tmd-when-col-left">
          <div className="when-checklist">
            {checklistItems.map((item, idx) => (
              <div key={idx} className="when-check-pill">
                <div className="check-pill-icon">✓</div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Warm Gold Consultation Card */}
        <div className="tmd-when-col-right">
          <div className="tmd-consult-card">
            <div className="consult-includes-header">
              <span>✦ Every consultation includes:</span>
            </div>
            <ul className="consult-bullets">
              <li>
                <span className="bullet-dot"></span>
                <span>A patient, thorough conversation about what you have been experiencing</span>
              </li>
              <li>
                <span className="bullet-dot"></span>
                <span>A careful examination of the joint, muscles, and how your teeth meet</span>
              </li>
              <li>
                <span className="bullet-dot"></span>
                <span>Clear, honest guidance on what is going on and the simplest path forward</span>
              </li>
            </ul>

            <div className="consult-action-card">
              <h4 className="consult-action-title">Ready to speak with Dr. Ashwin?</h4>
              <button
                type="button"
                onClick={openBookingModal}
                className="consult-action-btn"
                style={{ cursor: 'pointer', border: 'none', background: 'transparent' }}
              >
                <span>Book your consultation</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhenToComeSection;
