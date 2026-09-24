'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import { useCms } from '@/context/CmsContext';

export default function StoryRevealCard() {
  const { content } = useCms();
  const cardRef = useRef(null);
  const [revealProgress, setRevealProgress] = useState(0);
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  const defaultP1 =
    'A clinic built around one thing, done properly. Jaw problems are often difficult to understand. The symptoms may appear as jaw discomfort, headaches, ear pressure, muscle tension, difficulty chewing, or disturbed sleep — making the underlying cause easy to overlook.';
  const defaultP2 =
    "At Dr. Ashwin's TMD Clinic, Calicut, we take the time to look beyond the obvious. We bring together a detailed conversation, careful examination of the jaw, muscles, bite and airway, and imaging when it can help build a clearer picture. We believe good care starts with understanding. Understanding what you are experiencing. Understanding why it may be happening. And understanding what can be done before treatment begins.";
  const defaultP3 =
    'Our approach is thoughtful, gradual and patient-focused — with treatment reviewed along the way, so every step has a clear purpose.';

  const p1Words = useMemo(() => (content?.aboutStoryP1 || defaultP1).split(/\s+/).filter(Boolean), [content?.aboutStoryP1]);
  const p2Words = useMemo(() => (content?.aboutStoryP2 || defaultP2).split(/\s+/).filter(Boolean), [content?.aboutStoryP2]);
  const p3Words = useMemo(() => (content?.aboutStoryP3 || defaultP3).split(/\s+/).filter(Boolean), [content?.aboutStoryP3]);

  const totalWords = p1Words.length + p2Words.length + p3Words.length;

  useEffect(() => {
    const handleScroll = () => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const vh = window.innerHeight;
      const totalRange = rect.height + vh * 0.3;
      const current = vh * 0.7 - rect.top;

      const progress = Math.max(0, Math.min(1, current / totalRange));
      const startPoint = 0.15;
      const endPoint = 0.8;
      const rawProgress = (progress - startPoint) / (endPoint - startPoint);
      const clamped = Math.max(0, Math.min(1, rawProgress));
      setRevealProgress(clamped);

      // Word-by-word active count
      const activeCount = Math.floor(progress * (totalWords + 2));
      setActiveWordIndex(activeCount);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalWords]);

  const clipBottom = ((1 - revealProgress) * 100).toFixed(2);
  const isRevealed = revealProgress >= 0.5;

  let wordCounter = 0;

  const loungeImg = content?.aboutStoryLoungeImage ? `/assets/images/${content.aboutStoryLoungeImage}` : '/assets/images/clinic_reception.jpg';
  const exteriorImg = content?.aboutStoryExteriorImage ? `/assets/images/${content.aboutStoryExteriorImage}` : '/assets/images/clinic_exterior.jpg';

  return (
    <article className="about-story-card about-anim-item" ref={cardRef}>
      <div className="about-story-col">
        <h2 className="about-card-title">{content?.aboutStoryHeading || 'Our Story'}</h2>
        <div className="about-story-text" id="aboutStoryBriefText">
          <p>
            {p1Words.map((word, i) => {
              const currentIdx = wordCounter++;
              return (
                <React.Fragment key={i}>
                  <span className={`reveal-word ${currentIdx <= activeWordIndex ? 'active' : ''}`}>
                    {word}
                  </span>{' '}
                </React.Fragment>
              );
            })}
          </p>
          <p>
            {p2Words.map((word, i) => {
              const currentIdx = wordCounter++;
              return (
                <React.Fragment key={i}>
                  <span className={`reveal-word ${currentIdx <= activeWordIndex ? 'active' : ''}`}>
                    {word}
                  </span>{' '}
                </React.Fragment>
              );
            })}
          </p>
          <p>
            {p3Words.map((word, i) => {
              const currentIdx = wordCounter++;
              return (
                <React.Fragment key={i}>
                  <span className={`reveal-word ${currentIdx <= activeWordIndex ? 'active' : ''}`}>
                    {word}
                  </span>{' '}
                </React.Fragment>
              );
            })}
          </p>
        </div>
      </div>

      {/* Right Column: Sticky Scroll + Vertical Image Reveal Transition */}
      <div
        className={`about-sticky-image-container ${isRevealed ? 'is-revealed' : ''}`}
        id="aboutStickyImageContainer"
      >
        <div className="about-reveal-image-wrapper" id="aboutRevealWrapper">
          {/* Base Image: Clinic Reception Lounge */}
          <Image
            src={loungeImg}
            alt="Dr. Ashwin's Clinic Reception Lounge"
            width={600}
            height={500}
            className="about-reveal-img base-img"
            id="aboutBaseImg"
          />

          {/* Reveal Image Curtain: Clinic Exterior */}
          <div
            className="about-reveal-curtain"
            id="aboutRevealCurtain"
            style={{ clipPath: `inset(0 0 ${clipBottom}% 0)` }}
          >
            <Image
              src={exteriorImg}
              alt="Dr. Ashwin's Clinic Exterior"
              width={600}
              height={500}
              className="about-reveal-img reveal-img"
              id="aboutRevealImg"
            />
          </div>

          {/* Luminous Wipe Edge Divider */}
          <div
            className="about-reveal-edge"
            id="aboutRevealEdge"
            style={{
              top: `${(revealProgress * 100).toFixed(2)}%`,
              opacity: revealProgress > 0.02 && revealProgress < 0.98 ? 1 : 0,
            }}
          ></div>
        </div>
      </div>
    </article>
  );
}
