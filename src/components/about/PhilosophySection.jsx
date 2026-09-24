import React from 'react';

const philosophyCards = [
  {
    title: 'We listen first.',
    desc: 'The first appointment is mostly conversation. How things started, what makes them better or worse, how you sleep, what has already been tried',
    img: '/assets/images/care_listen_first.jpg',
    tilt: -8,
    cardClass: 'phil-card-1'
  },
  {
    title: 'We look carefully.',
    desc: 'A proper examination of the joint, the muscles, the bite and the airway, with imaging where it helps.',
    img: '/assets/images/care_look_carefully.jpg',
    tilt: -3,
    cardClass: 'phil-card-2'
  },
  {
    title: 'We explain everything.',
    desc: 'You see your own scans. You hear what is happening and why. Nothing starts until it makes sense to you.',
    img: '/assets/images/care_explain_everything.jpg',
    tilt: 1.5,
    cardClass: 'phil-card-3'
  },
  {
    title: 'We go gently.',
    desc: 'Treatment is staged, reversible wherever possible, and reviewed regularly so we know it is working.',
    img: '/assets/images/care_go_gently.jpg',
    tilt: 6.5,
    cardClass: 'phil-card-4'
  }
];

export const PhilosophySection = () => {
  return (
    <section className="about-philosophy-section about-anim-item" id="aboutPhilosophySection">
      <div className="philosophy-header">
        <h2 className="about-card-title philosophy-main-heading">How We Work</h2>
      </div>

      <div className="philosophy-track-viewport" id="philTrackViewport">
        <div className="philosophy-cards-track" id="philCardsTrack">
          {philosophyCards.map((card, idx) => (
            <div
              key={idx}
              className={`philosophy-card ${card.cardClass}`}
              data-base-tilt={card.tilt}
              data-card-index={idx}
              role="group"
              aria-label={card.title}
            >
              <div className="phil-card-border-glow"></div>
              <div className="phil-card-inner">
                <div
                  className="phil-card-img"
                  style={{ backgroundImage: `url('${card.img}')` }}
                ></div>
                <div className="phil-card-scrim"></div>

                {/* Default Bottom Bar */}
                <div className="phil-card-bottom-bar">
                  <p className="phil-card-title">{card.title}</p>
                  <div className="phil-arrow-badge" aria-hidden="true">
                    <svg
                      className="phil-arrow-svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>

                {/* Sliding Hover Content Panel */}
                <div className="phil-card-hover-panel">
                  <p className="phil-hover-desc">{card.desc}</p>
                  <div className="phil-hover-arrow-badge" aria-hidden="true">
                    <svg
                      className="phil-hover-arrow-svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="7" y1="7" x2="17" y2="17"></line>
                      <polyline points="17 7 17 17 7 17"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
