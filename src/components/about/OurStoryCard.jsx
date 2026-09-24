import React, { useEffect, useRef } from 'react';

const storyParagraphs = [
  "A clinic built around one thing, done properly. Jaw problems are often difficult to understand. The symptoms may appear as jaw discomfort, headaches, ear pressure, muscle tension, difficulty chewing, or disturbed sleep — making the underlying cause easy to overlook.",
  "At Dr. Ashwin's TMD Clinic, Calicut, we take the time to look beyond the obvious. We bring together a detailed conversation, careful examination of the jaw, muscles, bite and airway, and imaging when it can help build a clearer picture. We believe good care starts with understanding. Understanding what you are experiencing. Understanding why it may be happening. And understanding what can be done before treatment begins.",
  "Our approach is thoughtful, gradual and patient-focused — with treatment reviewed along the way, so every step has a clear purpose."
];

export const OurStoryCard = () => {
  const cardRef = useRef(null);
  const wordsRef = useRef([]);

  useEffect(() => {
    const card = cardRef.current;
    const allWords = wordsRef.current.filter(Boolean);
    if (!card || !allWords.length) return;

    const handleScroll = () => {
      const rect = card.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.25;
      const totalRange = rect.height + (start - end);
      let progress = (start - rect.top) / totalRange;
      progress = Math.max(0, Math.min(1, progress));

      const activeCount = Math.floor(progress * (allWords.length + 3));
      allWords.forEach((word, idx) => {
        if (idx <= activeCount) {
          word.classList.add('active');
        } else {
          word.classList.remove('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  let wordGlobalIndex = 0;

  return (
    <article className="about-story-card about-anim-item" ref={cardRef}>
      <div className="about-story-col">
        <h2 className="about-card-title">Our Story</h2>
        <div className="about-story-text" id="aboutStoryBriefText">
          {storyParagraphs.map((para, pIdx) => {
            const words = para.split(/\s+/);
            return (
              <p key={pIdx}>
                {words.map((word, wIdx) => {
                  const currentIdx = wordGlobalIndex++;
                  return (
                    <React.Fragment key={wIdx}>
                      <span
                        className="reveal-word"
                        ref={(el) => (wordsRef.current[currentIdx] = el)}
                      >
                        {word}
                      </span>{' '}
                    </React.Fragment>
                  );
                })}
              </p>
            );
          })}
        </div>
      </div>

      {/* Right Column: Stacked Clinic Images */}
      <div className="about-images-stack">
        <img
          src="/assets/images/clinic_reception.jpg"
          alt="Dr. Ashwin's Clinic Reception Lounge"
          className="about-stack-img"
          loading="lazy"
        />
        <img
          src="/assets/images/clinic_exterior.jpg"
          alt="Dr. Ashwin's Clinic Evening Exterior"
          className="about-stack-img"
          loading="lazy"
        />
      </div>
    </article>
  );
};

export default OurStoryCard;
