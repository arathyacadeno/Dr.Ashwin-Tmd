'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import { useCms } from '@/context/CmsContext';

export default function DoctorMission() {
  const { content } = useCms();
  const sectionRef = useRef(null);
  const [activeWordCount, setActiveWordCount] = useState(0);
  const [isAuthorRevealed, setIsAuthorRevealed] = useState(false);
  const [docScale, setDocScale] = useState(0.75);

  const missionWords = useMemo(() => {
    const rawNote =
      content?.docNote ||
      '"My mission is not simply to treat jaw problems. It is to help people understand what is happening, find the right path forward, and return to the everyday moments that matter — eating comfortably, sleeping well, and living with greater freedom."';
    return rawNote.split(/\s+/).filter(Boolean);
  }, [content?.docNote]);

  useEffect(() => {
    const stickySection = sectionRef.current;
    if (!stickySection) return;

    const handleScroll = () => {
      const rect = stickySection.getBoundingClientRect();
      const totalScrollable = stickySection.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      let progress = -rect.top / totalScrollable;
      progress = Math.max(0, Math.min(1, progress));

      setDocScale(0.75 + progress * 0.3);
      setActiveWordCount(Math.floor(progress * (missionWords.length + 2)));
      setIsAuthorRevealed(progress >= 0.75);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [missionWords]);

  const docImgSrc = content?.docImage?.startsWith('/')
    ? content.docImage
    : `/assets/images/${content?.docImage || 'og image.png'}`;

  return (
    <section
      id="about"
      className="doctor-sticky-section"
      ref={sectionRef}
      style={{ '--doc-scale': docScale }}
    >
      <div className="doctor-sticky-track">
        <div className="container doctor-scroll-container">
          <div className="doctor-image-wrapper">
            <Image
              src={docImgSrc}
              alt={content?.docName || "Dr. Ashwin - TMJ Specialist Kozhikode"}
              width={400}
              height={500}
              className="doctor-portrait"
              priority
            />
          </div>
          <div className="doctor-info">
            <div className="doc-expanding-text">
              <h2 className="doc-quote-headline doc-poppins-quote">
                {missionWords.map((word, index) => (
                  <React.Fragment key={index}>
                    <span className={`reveal-word ${index <= activeWordCount ? 'active' : ''}`}>
                      {word}
                    </span>{' '}
                  </React.Fragment>
                ))}
              </h2>
              <div className={`doc-author-block ${isAuthorRevealed ? 'active revealed' : ''}`}>
                <p className="doc-author-name">{content?.docName || 'Dr. Ashwin'}</p>
                <p className="doc-author-title">{content?.docSpecialty || 'TMD & TMJ Care, Kozhikode'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
