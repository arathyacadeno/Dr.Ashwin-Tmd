import React, { useEffect, useRef } from 'react';

const missionWords = [
  '"My', 'mission', 'is', 'not', 'simply', 'to', 'treat', 'jaw', 'problems.',
  'It', 'is', 'to', 'help', 'people', 'understand', 'what', 'is', 'happening,',
  'find', 'the', 'right', 'path', 'forward,', 'and', 'return', 'to', 'the',
  'everyday', 'moments', 'that', 'matter', '—', 'eating', 'comfortably,',
  'sleeping', 'well,', 'and', 'living', 'with', 'greater', 'freedom."'
];

export const DoctorMission = () => {
  const sectionRef = useRef(null);
  const authorBlockRef = useRef(null);
  const wordsRef = useRef([]);

  useEffect(() => {
    const stickySection = sectionRef.current;
    const authorBlock = authorBlockRef.current;
    const revealWords = wordsRef.current;

    if (!stickySection || !revealWords.length) return;

    const handleStickyScroll = () => {
      const rect = stickySection.getBoundingClientRect();
      const totalScrollable = stickySection.offsetHeight - window.innerHeight;

      if (totalScrollable <= 0) return;

      let progress = -rect.top / totalScrollable;
      progress = Math.max(0, Math.min(1, progress));

      // 1. Doctor image scale
      const scale = 0.75 + progress * 0.3;
      stickySection.style.setProperty('--doc-scale', scale);

      // 2. Word-by-word text highlight reveal
      const totalWords = revealWords.length;
      const activeWordCount = Math.floor(progress * (totalWords + 2));

      revealWords.forEach((word, index) => {
        if (!word) return;
        if (index <= activeWordCount) {
          word.classList.add('active');
        } else {
          word.classList.remove('active');
        }
      });

      if (authorBlock) {
        if (progress >= 0.75) {
          authorBlock.classList.add('active', 'revealed');
        } else {
          authorBlock.classList.remove('active', 'revealed');
        }
      }
    };

    window.addEventListener('scroll', handleStickyScroll, { passive: true });
    handleStickyScroll();

    return () => window.removeEventListener('scroll', handleStickyScroll);
  }, []);

  return (
    <section id="about" className="doctor-sticky-section" ref={sectionRef}>
      <div className="doctor-sticky-track">
        <div className="container doctor-scroll-container">
          <div className="doctor-image-wrapper">
            <img src="/assets/images/og image.png" alt="Dr. Ashwin specialist doctor" className="doctor-portrait" />
          </div>
          <div className="doctor-info">
            <div className="doc-expanding-text">
              <h2 className="doc-quote-headline doc-poppins-quote">
                {missionWords.map((word, index) => (
                  <React.Fragment key={index}>
                    <span
                      className="reveal-word"
                      ref={(el) => (wordsRef.current[index] = el)}
                    >
                      {word}
                    </span>{' '}
                  </React.Fragment>
                ))}
              </h2>
              <div className="doc-author-block" ref={authorBlockRef}>
                <p className="doc-author-name">Dr. Ashwin</p>
                <p className="doc-author-title">TMD &amp; TMJ Care, Kozhikode</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorMission;
