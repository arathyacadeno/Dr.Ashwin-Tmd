import React, { useEffect, useRef } from 'react';

export const EquipmentSection = () => {
  const trackRef = useRef(null);
  const leftStreamRef = useRef(null);
  const rightStreamRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const leftStream = leftStreamRef.current;
    const rightStream = rightStreamRef.current;

    if (!track || !leftStream || !rightStream) return;

    const cards = track.querySelectorAll('.equipment-scroll-card');

    const updateDualScroll = () => {
      if (window.innerWidth <= 960) {
        leftStream.style.transform = 'none';
        rightStream.style.transform = 'none';
        return;
      }

      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight;
      const totalScroll = rect.height - vh;

      if (totalScroll <= 0) return;

      const current = -rect.top;
      const progress = Math.max(0, Math.min(1, current / totalScroll));

      const leftHeight = leftStream.offsetHeight || 1210;
      const rightHeight = rightStream.offsetHeight || 1210;
      const cardHalf = 190;
      const centerFocusY = vh * 0.5 + 20;

      // Left stream moves upwards
      const leftStartY = centerFocusY - cardHalf;
      const leftEndY = centerFocusY - (leftHeight - cardHalf);
      const yLeft = leftStartY + progress * (leftEndY - leftStartY);

      // Right stream moves in counter-direction
      const rightStartY = centerFocusY - (rightHeight - cardHalf);
      const rightEndY = centerFocusY - cardHalf;
      const yRight = rightStartY + progress * (rightEndY - rightStartY);

      leftStream.style.transform = `translate3d(0, ${yLeft.toFixed(1)}px, 0)`;
      rightStream.style.transform = `translate3d(0, ${yRight.toFixed(1)}px, 0)`;

      // Highlight card nearest to center
      let closestCard = null;
      let minDistance = Infinity;

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.top + cardRect.height / 2;
        const dist = Math.abs(cardCenter - centerFocusY);

        if (cardRect.bottom > 50 && cardRect.top < vh - 50 && dist < minDistance) {
          minDistance = dist;
          closestCard = card;
        }
      });

      if (closestCard) {
        cards.forEach((card) => {
          if (card === closestCard) {
            card.classList.add('active-card');
          } else {
            card.classList.remove('active-card');
          }
        });
      }
    };

    let isTicking = false;
    const onScroll = () => {
      if (!isTicking) {
        requestAnimationFrame(() => {
          updateDualScroll();
          isTicking = false;
        });
        isTicking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateDualScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section className="equipment-scroll-section" id="what-is-tmd">
      <div className="equipment-scroll-track" id="equipmentScrollTrack" ref={trackRef}>
        <div className="equipment-sticky-stage" id="equipmentStickyStage">
          <div className="equipment-stage-container">
            {/* Left Column: Vertical stream 1 */}
            <div
              className="equipment-column-stream equipment-stream-left"
              id="equipmentStreamLeft"
              ref={leftStreamRef}
            >
              {/* Card 1: Intraoral Scanner */}
              <div className="equipment-scroll-card active-card">
                <div className="equipment-card-img-wrap">
                  <img src="/intraoral_scanner.jpg" alt="Intraoral scanner" className="equipment-card-img" loading="lazy" />
                </div>
                <div className="equipment-card-overlay">
                  <h4 className="equipment-card-title">Intraoral scanner</h4>
                  <p>Accurate digital impressions for bite assessment and customized oral appliances.</p>
                </div>
              </div>

              {/* Card 2: Electromyography (EMG) */}
              <div className="equipment-scroll-card">
                <div className="equipment-card-img-wrap">
                  <img src="/emg_assessment.jpg" alt="Electromyography (EMG)" className="equipment-card-img" loading="lazy" />
                </div>
                <div className="equipment-card-overlay">
                  <h4 className="equipment-card-title">Electromyography (EMG)</h4>
                  <p>Assessment of jaw muscle activity to help evaluate muscle tension, clenching, and functional patterns.</p>
                </div>
              </div>

              {/* Card 3: Jaw Movement Sensor */}
              <div className="equipment-scroll-card">
                <div className="equipment-card-img-wrap">
                  <img src="/jaw_movement_sensor.jpg" alt="Jaw movement sensor" className="equipment-card-img" loading="lazy" />
                </div>
                <div className="equipment-card-overlay">
                  <h4 className="equipment-card-title">Jaw movement sensor</h4>
                  <p>Advanced assessment of jaw movement, bite function, and functional relationships.</p>
                </div>
              </div>
            </div>

            {/* Center Column: Sticky Pinned Title Block */}
            <div className="equipment-center-pinned-block" id="equipmentCenterBlock">
              <h2 className="equipment-center-title">
                <span className="title-charcoal">Advanced Equipment For</span>{' '}
                <span className="title-gold">TMD / TMJ Care.</span>
              </h2>
            </div>

            {/* Right Column: Vertical stream 2 */}
            <div
              className="equipment-column-stream equipment-stream-right"
              id="equipmentStreamRight"
              ref={rightStreamRef}
            >
              {/* Card 4: CBCT 3D Scanner */}
              <div className="equipment-scroll-card">
                <div className="equipment-card-img-wrap">
                  <img src="/cbct_scanner.jpg" alt="CBCT 3D scanner" className="equipment-card-img" loading="lazy" />
                </div>
                <div className="equipment-card-overlay">
                  <h4 className="equipment-card-title">CBCT 3D scanner</h4>
                  <p>Three-dimensional imaging for evaluating jaw structures, TMJ anatomy, and complex dental conditions</p>
                </div>
              </div>

              {/* Card 5: OPG Panoramic */}
              <div className="equipment-scroll-card">
                <div className="equipment-card-img-wrap">
                  <img src="/opg_panoramic.jpg" alt="OPG panoramic X-ray" className="equipment-card-img" loading="lazy" />
                </div>
                <div className="equipment-card-overlay">
                  <h4 className="equipment-card-title">OPG panoramic X-ray</h4>
                  <p>Detailed imaging of the jaw, teeth, and surrounding structures to support comprehensive assessment.</p>
                </div>
              </div>

              {/* Card 6: T-Scan Digital Analysis */}
              <div className="equipment-scroll-card">
                <div className="equipment-card-img-wrap">
                  <img src="/tscan_analysis.jpg" alt="T-Scan digital analysis" className="equipment-card-img" loading="lazy" />
                </div>
                <div className="equipment-card-overlay">
                  <h4 className="equipment-card-title">T-Scan digital analysis</h4>
                  <p>Computerized analysis of bite force and contact timing to help identify uneven occlusal loading.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EquipmentSection;
