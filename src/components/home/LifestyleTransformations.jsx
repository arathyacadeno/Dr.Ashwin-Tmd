import React, { useEffect, useRef } from 'react';

const outcomes = [
  {
    num: '01',
    headline: 'Enjoy every meal again',
    text: 'Rediscover the comfort of chewing, eating, and enjoying your favourite foods without constantly thinking about jaw pain, stiffness, or discomfort. With personalized TMD and TMJ care, we focus on restoring comfortable jaw movement and function so everyday meals can feel natural and effortless again.',
    img: '/assets/images/outcome_eating.jpg',
    alt: 'Woman enjoying food and coffee without jaw pain'
  },
  {
    num: '02',
    headline: 'Wake up feeling better',
    text: 'Start your day with less jaw tension, fewer morning headaches, and greater comfort after a restful night. Our personalized TMD and TMJ care addresses the factors that may affect your jaw, muscles, breathing, and sleep—helping you wake up feeling more refreshed and ready for the day.',
    img: '/assets/images/outcome_sleeping.jpg',
    alt: 'Woman waking up refreshed and comfortable in morning'
  },
  {
    num: '03',
    headline: 'Talk, laugh & smile freely',
    text: 'Move, speak, laugh, and express yourself with greater comfort. Personalized TMD and TMJ care can help address jaw pain, stiffness, muscle tension, and movement limitations, making everyday conversations, smiles, and moments with the people you love feel natural again.',
    img: '/assets/images/outcome_laughing.jpg',
    alt: 'Woman laughing and talking happily with friends'
  },
  {
    num: '04',
    headline: 'Get back to the activities you love',
    text: 'Move with confidence and return to the activities that make your days meaningful. Personalized TMD and TMJ care focuses on improving jaw comfort, movement, and function so you can work, exercise, socialize, and enjoy everyday life without letting jaw discomfort hold you back.',
    img: '/assets/images/outcome_running.jpg',
    alt: 'Athletes running and exercising outdoors with energy'
  },
  {
    num: '05',
    headline: 'Get back to your life',
    text: 'Move beyond the discomfort, limitations, and constant worry that jaw problems can bring. With personalized TMD and TMJ care focused on restoring comfort, movement, and function, we help you get back to the everyday moments, routines, and experiences that make life feel like yours again.',
    img: '/assets/images/outcome_sunset.jpg',
    alt: 'Woman rejoicing outdoors celebrating pain-free life'
  }
];

export const LifestyleTransformations = () => {
  const trackRef = useRef(null);

  useEffect(() => {
    const cards = document.querySelectorAll('.outcome-stacked-card');
    if (!cards.length) return;

    const firstCardImg = document.querySelector('.first-card-slide-img');
    const firstCardText = document.querySelector('.first-card-text-side');

    const animateNumberCount = (el, targetNum) => {
      if (!el || el.dataset.hasCounted === 'true') return;
      el.dataset.hasCounted = 'true';

      const targetStr = String(targetNum).padStart(2, '0');
      let current = 0;
      const duration = 360;
      const stepTime = Math.max(35, Math.floor(duration / (targetNum + 1)));

      el.textContent = '00';
      if (el._countTimer) clearInterval(el._countTimer);
      el._countTimer = setInterval(() => {
        current++;
        if (current >= targetNum) {
          el.textContent = targetStr;
          clearInterval(el._countTimer);
          el._countTimer = null;
        } else {
          el.textContent = String(current).padStart(2, '0');
        }
      }, stepTime);
    };

    const updateCardStack = () => {
      const vh = window.innerHeight;

      if (cards[0]) {
        const rect0 = cards[0].getBoundingClientRect();
        if (rect0.top < vh * 0.85 && rect0.bottom > 0) {
          if (firstCardImg) firstCardImg.classList.add('slide-in-active');
          if (firstCardText) firstCardText.classList.add('slide-in-active');
        } else if (rect0.top >= vh) {
          if (firstCardImg) firstCardImg.classList.remove('slide-in-active');
          if (firstCardText) firstCardText.classList.remove('slide-in-active');
        }
      }

      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const numEl = card.querySelector('.outcome-big-number');

        if (numEl) {
          const isVisible = rect.top < vh * 0.82 && rect.bottom > vh * 0.12;
          if (isVisible) {
            if (!numEl.classList.contains('number-active')) {
              numEl.classList.add('number-active');
              animateNumberCount(numEl, i + 1);
            }
          } else if (rect.top >= vh) {
            if (numEl._countTimer) {
              clearInterval(numEl._countTimer);
              numEl._countTimer = null;
            }
            numEl.classList.remove('number-active');
            numEl.dataset.hasCounted = 'false';
            numEl.textContent = String(i + 1).padStart(2, '0');
          }
        }

        let totalOverlap = 0;
        for (let j = i + 1; j < cards.length; j++) {
          const nextCard = cards[j];
          const nextRect = nextCard.getBoundingClientRect();
          if (nextRect.top < vh && nextRect.top > 0) {
            const overlapProg = (vh - nextRect.top) / vh;
            totalOverlap += overlapProg;
          } else if (nextRect.top <= 0) {
            totalOverlap += 1;
          }
        }

        const scale = Math.max(0.92, 1 - totalOverlap * 0.03);
        card.style.transform = `scale(${scale.toFixed(4)})`;
        card.style.filter = 'none';
      });
    };

    let isTicking = false;
    const onScrollOrResize = () => {
      if (!isTicking) {
        requestAnimationFrame(() => {
          updateCardStack();
          isTicking = false;
        });
        isTicking = true;
      }
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    updateCardStack();

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  return (
    <section className="outcomes-section" id="lifestyle-transformations">
      {/* Section Header */}
      <div className="container">
        <div className="outcomes-stack-header">
          <h2 className="outcomes-stack-title">
            <span className="title-charcoal">Feel the Difference</span>{' '}
            <span className="title-gold">In Everyday Life.</span>
          </h2>
        </div>
      </div>

      {/* Full-Screen Stacking Cards Track (100% Edge-to-Edge) */}
      <div className="outcomes-stack-track" id="outcomesStackTrack" ref={trackRef}>
        {outcomes.map((item, idx) => (
          <div
            key={idx}
            className="outcome-stacked-card"
            style={{ '--card-idx': idx }}
          >
            <div className="outcome-card-inner">
              <div className={`outcome-text-side ${idx === 0 ? 'first-card-text-side' : ''}`}>
                <div className="outcome-big-number">{item.num}</div>
                <h3 className="outcome-headline">{item.headline}</h3>
                <p className="outcome-paragraph">{item.text}</p>
              </div>
              <div className={`outcome-img-side ${idx === 0 ? 'first-card-img-side' : ''}`}>
                <img
                  src={item.img}
                  alt={item.alt}
                  className={idx === 0 ? 'first-card-slide-img' : ''}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LifestyleTransformations;
