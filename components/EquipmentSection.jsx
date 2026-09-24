'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useCms } from '@/context/CmsContext';

const defaultLeftCards = [
  {
    id: 1,
    title: 'Intraoral scanner',
    desc: 'Accurate digital impressions for bite assessment and customized oral appliances.',
    img: '/assets/images/intraoral_scanner.jpg',
  },
  {
    id: 2,
    title: 'Electromyography (EMG)',
    desc: 'Assessment of jaw muscle activity to help evaluate muscle tension, clenching, and functional patterns.',
    img: '/assets/images/emg_assessment.jpg',
  },
  {
    id: 3,
    title: 'Jaw movement sensor',
    desc: 'Advanced assessment of jaw movement, bite function, and functional relationships.',
    img: '/assets/images/jaw_movement_sensor.jpg',
  },
];

const defaultRightCards = [
  {
    id: 4,
    title: 'CBCT 3D scanner',
    desc: 'Three-dimensional imaging for evaluating jaw structures, TMJ anatomy, and complex dental conditions',
    img: '/assets/images/cbct_scanner.jpg',
  },
  {
    id: 5,
    title: 'OPG panoramic X-ray',
    desc: 'Detailed imaging of the jaw, teeth, and surrounding structures to support comprehensive assessment.',
    img: '/assets/images/opg_panoramic.jpg',
  },
  {
    id: 6,
    title: 'T-Scan digital analysis',
    desc: 'Computerized analysis of bite force and contact timing to help identify uneven occlusal loading.',
    img: '/assets/images/tscan_analysis.jpg',
  },
];

export default function EquipmentSection() {
  const { content } = useCms();

  const { leftCards, rightCards } = useMemo(() => {
    if (content?.equipmentCards?.length >= 6) {
      const left = content.equipmentCards.slice(0, 3).map((c, i) => ({
        id: i + 1,
        title: c.title || defaultLeftCards[i]?.title,
        desc: c.desc || defaultLeftCards[i]?.desc,
        img: c.img?.startsWith('/') ? c.img : `/assets/images/${c.img || defaultLeftCards[i]?.img}`,
      }));
      const right = content.equipmentCards.slice(3, 6).map((c, i) => ({
        id: i + 4,
        title: c.title || defaultRightCards[i]?.title,
        desc: c.desc || defaultRightCards[i]?.desc,
        img: c.img?.startsWith('/') ? c.img : `/assets/images/${c.img || defaultRightCards[i]?.img}`,
      }));
      return { leftCards: left, rightCards: right };
    }
    return { leftCards: defaultLeftCards, rightCards: defaultRightCards };
  }, [content?.equipmentCards]);

  const trackRef = useRef(null);
  const leftStreamRef = useRef(null);
  const rightStreamRef = useRef(null);
  const [activeCardId, setActiveCardId] = useState(1);

  useEffect(() => {
    const track = trackRef.current;
    const leftStream = leftStreamRef.current;
    const rightStream = rightStreamRef.current;

    if (!track || !leftStream || !rightStream) return;

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

      const leftStartY = centerFocusY - cardHalf;
      const leftEndY = centerFocusY - (leftHeight - cardHalf);
      const yLeft = leftStartY + progress * (leftEndY - leftStartY);

      const rightStartY = centerFocusY - (rightHeight - cardHalf);
      const rightEndY = centerFocusY - cardHalf;
      const yRight = rightStartY + progress * (rightEndY - rightStartY);

      leftStream.style.transform = `translate3d(0, ${yLeft.toFixed(1)}px, 0)`;
      rightStream.style.transform = `translate3d(0, ${yRight.toFixed(1)}px, 0)`;

      const allCardElements = track.querySelectorAll('.equipment-scroll-card');
      let closestId = 1;
      let minDistance = Infinity;

      allCardElements.forEach((cardEl) => {
        const cRect = cardEl.getBoundingClientRect();
        const cCenter = cRect.top + cRect.height / 2;
        const dist = Math.abs(cCenter - centerFocusY);

        if (cRect.bottom > 50 && cRect.top < vh - 50 && dist < minDistance) {
          minDistance = dist;
          const id = Number(cardEl.getAttribute('data-id'));
          if (id) closestId = id;
        }
      });

      setActiveCardId(closestId);
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
              {leftCards.map((card) => (
                <div
                  key={card.id}
                  data-id={card.id}
                  className={`equipment-scroll-card ${activeCardId === card.id ? 'active-card' : ''}`}
                >
                  <div className="equipment-card-img-wrap">
                    <img
                      src={card.img}
                      alt={card.title}
                      className="equipment-card-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="equipment-card-overlay">
                    <h4 className="equipment-card-title">{card.title}</h4>
                    <p>{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Center Column: Sticky Pinned Title Block */}
            <div className="equipment-center-pinned-block" id="equipmentCenterBlock">
              <h2 className="equipment-center-title">
                <span className="title-charcoal">
                  {content?.equipmentSectionName
                    ? content.equipmentSectionName.split('for')[0]?.split('For')[0] || content.equipmentSectionName
                    : 'Advanced Equipment For'}
                </span>
                <span className="title-gold">
                  {content?.equipmentSectionName && (content.equipmentSectionName.includes('for') || content.equipmentSectionName.includes('For'))
                    ? content.equipmentSectionName.split(/for|For/)[1]?.trim()
                    : 'TMD / TMJ Care.'}
                </span>
              </h2>
            </div>

            {/* Right Column: Vertical stream 2 */}
            <div
              className="equipment-column-stream equipment-stream-right"
              id="equipmentStreamRight"
              ref={rightStreamRef}
            >
              {rightCards.map((card) => (
                <div
                  key={card.id}
                  data-id={card.id}
                  className={`equipment-scroll-card ${activeCardId === card.id ? 'active-card' : ''}`}
                >
                  <div className="equipment-card-img-wrap">
                    <img
                      src={card.img}
                      alt={card.title}
                      className="equipment-card-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="equipment-card-overlay">
                    <h4 className="equipment-card-title">{card.title}</h4>
                    <p>{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
