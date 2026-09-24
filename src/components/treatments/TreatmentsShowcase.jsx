import React, { useState, useEffect } from 'react';

const showcaseItems = [
  {
    title: 'Custom appliances',
    desc: 'A comfortable, made-to-measure appliance that takes pressure off the joint, relaxes the muscles and protects your teeth from grinding. Completely reversible, and adjusted as you improve.',
    img: '/assets/images/with petient.png',
    alt: 'Custom appliances for TMD relief'
  },
  {
    title: 'Bite correction',
    desc: 'Where the way your teeth meet is part of the problem, we correct it gradually and check that the joint is comfortable at each stage.',
    img: '/assets/images/tscan_analysis.jpg',
    alt: 'Bite correction and occlusal balance'
  },
  {
    title: 'Airway-focused care',
    desc: 'Where breathing or tongue position plays a role, we address that alongside the jaw — often the piece that makes the difference to sleep quality.',
    img: '/assets/images/cbct_scanner.jpg',
    alt: 'Airway-focused care'
  },
  {
    title: 'Muscle care and pain relief',
    desc: 'Targeted treatment for tight, tender muscles, plus simple things you can do at home between visits.',
    img: '/assets/images/emg_assessment.jpg',
    alt: 'Muscle care and pain relief'
  },
  {
    title: 'Exercise and posture work',
    desc: 'A short daily routine for the jaw and neck, coordinated with physiotherapy where that is useful.',
    img: '/assets/images/jaw_movement_sensor.jpg',
    alt: 'Exercise and posture work'
  },
  {
    title: 'Habit support',
    desc: 'Practical ways to catch and interrupt clenching before it becomes pain again.',
    img: '/assets/images/care_look_carefully.jpg',
    alt: 'Habit support and clenching prevention'
  },
  {
    title: 'Working with your other doctors',
    desc: 'We coordinate with ENT specialists, physicians, physiotherapists and sleep specialists whenever a case calls for it.',
    img: '/assets/images/clinic_reception.jpg',
    alt: 'Collaborative multidisciplinary care'
  }
];

export const TreatmentsShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Keyboard navigation
  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      setCurrentIndex((prev) => (prev + 1) % showcaseItems.length);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      setCurrentIndex((prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length);
    }
  };

  const currNum = String(currentIndex + 1).padStart(2, '0');

  return (
    <div className="treatments-showcase-container">
      <div className="treatments-showcase-grid">
        {/* LEFT COLUMN: Pinned Stacking Visual Cards Deck */}
        <div className="showcase-visual-col" id="showcaseVisualCol">
          <div className="showcase-cards-deck" id="showcaseCardsDeck">
            {/* Vertical Indicator Dots + Gliding Active Capsule Pill */}
            <div className="showcase-vertical-nav" id="showcaseVerticalNav">
              <div
                className="nav-pill-indicator"
                id="navPillIndicator"
                style={{ transform: `translateY(${currentIndex * 26}px)` }}
              ></div>
              {showcaseItems.map((_, idx) => (
                <button
                  key={idx}
                  className={`nav-dot ${currentIndex === idx ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  aria-label={`Treatment ${idx + 1}`}
                ></button>
              ))}
            </div>

            {/* Treatment Slide Cards (0 to 6) */}
            {showcaseItems.map((item, idx) => (
              <div
                key={idx}
                className={`showcase-card ${currentIndex === idx ? 'active' : ''}`}
                data-index={idx}
                style={{
                  opacity: currentIndex === idx ? 1 : 0,
                  pointerEvents: currentIndex === idx ? 'auto' : 'none',
                  transition: 'opacity 0.4s ease, transform 0.4s ease'
                }}
              >
                <div className="showcase-card-inner">
                  <img src={item.img} alt={item.alt} className="showcase-img" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Synchronized Dynamic Content */}
        <div className="showcase-info-col" id="showcaseInfoCol">
          <div className="showcase-info-sticky">
            <div className="showcase-info-top">
              {/* Counter */}
              <div className="showcase-counter" id="showcaseCounter">
                <span className="curr-num" id="showcaseCurrNum">
                  {currNum}
                </span>
                <span className="total-num">/07</span>
              </div>

              {/* Dynamic Titles */}
              <div className="showcase-title-area" id="showcaseTitleArea">
                {showcaseItems.map((item, idx) => (
                  <h2
                    key={idx}
                    className={`showcase-title ${currentIndex === idx ? 'active' : ''}`}
                    data-index={idx}
                    style={{
                      display: currentIndex === idx ? 'block' : 'none',
                      animation: currentIndex === idx ? 'fadeIn 0.35s ease' : 'none'
                    }}
                  >
                    {item.title}
                  </h2>
                ))}
              </div>
            </div>

            {/* Dynamic Descriptions */}
            <div className="showcase-desc-area" id="showcaseDescArea">
              {showcaseItems.map((item, idx) => (
                <p
                  key={idx}
                  className={`showcase-desc ${currentIndex === idx ? 'active' : ''}`}
                  data-index={idx}
                  style={{
                    display: currentIndex === idx ? 'block' : 'none',
                    animation: currentIndex === idx ? 'fadeIn 0.45s ease' : 'none'
                  }}
                >
                  {item.desc}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentsShowcase;
