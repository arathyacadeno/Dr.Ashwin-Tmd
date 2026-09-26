'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCms } from '@/context/CmsContext';

const defaultSlides = [
  {
    num: '01',
    title: 'Custom appliances',
    desc: 'A comfortable, made-to-measure appliance that takes pressure off the joint, relaxes the muscles and protects your teeth from grinding. Completely reversible, and adjusted as you improve.',
    img: '/assets/images/with petient.png',
  },
  {
    num: '02',
    title: 'Bite correction',
    desc: 'Where the way your teeth meet is part of the problem, we correct it gradually and check that the joint is comfortable at each stage.',
    img: '/assets/images/tscan_analysis.jpg',
  },
  {
    num: '03',
    title: 'Airway-focused care',
    desc: 'Where breathing or tongue position plays a role, we address that alongside the jaw — often the piece that makes the difference to sleep quality.',
    img: '/assets/images/cbct_scanner.jpg',
  },
  {
    num: '04',
    title: 'Muscle care and pain relief',
    desc: 'Targeted treatment for tight, tender muscles, plus simple things you can do at home between visits.',
    img: '/assets/images/emg_assessment.jpg',
  },
  {
    num: '05',
    title: 'Exercise and posture work',
    desc: 'A short daily routine for the jaw and neck, coordinated with physiotherapy where that is useful.',
    img: '/assets/images/jaw_movement_sensor.jpg',
  },
  {
    num: '06',
    title: 'Habit support',
    desc: 'Practical ways to catch and interrupt clenching before it becomes pain again.',
    img: '/assets/images/care_look_carefully.jpg',
  },
  {
    num: '07',
    title: 'Working with your other doctors',
    desc: 'We coordinate with ENT specialists, physicians, physiotherapists and sleep specialists whenever a case calls for it.',
    img: '/assets/images/clinic_reception.jpg',
  },
];

export default function TreatmentsShowcase() {
  const { content } = useCms();
  const showcaseRef = useRef(null);
  const deckRef = useRef(null);
  const infoColRef = useRef(null);
  const heroIntroRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubRef = useRef(null);
  const scrollHintRef = useRef(null);
  const currNumRef = useRef(null);

  const heroHeading = content?.treatmentsHeroTitle || 'Gentle, reversible, and explained before it begins';
  const heroSubtitle = content?.treatmentsHeroSub || 'We start with the simplest approach that will work, and we only move further if we need to.';

  const slides = useMemo(() => {
    if (content?.treatmentsShowcaseCards && content.treatmentsShowcaseCards.length > 0) {
      return content.treatmentsShowcaseCards.map((c, idx) => ({
        num: String(idx + 1).padStart(2, '0'),
        title: c.title || defaultSlides[idx]?.title || `Treatment ${idx + 1}`,
        desc: c.desc || defaultSlides[idx]?.desc || '',
        img: c.img || defaultSlides[idx]?.img || '/assets/images/with petient.png',
      }));
    }
    return defaultSlides;
  }, [content?.treatmentsShowcaseCards]);
  const dotsRef = useRef([]);
  const titlesRef = useRef([]);
  const descsRef = useRef([]);
  const cardsRef = useRef([]);

  useEffect(() => {
    document.body.classList.add('is-treatments-page');
    gsap.registerPlugin(ScrollTrigger);

    const showcase = showcaseRef.current;
    const deck = deckRef.current;
    const infoCol = infoColRef.current;
    const heroIntro = heroIntroRef.current;
    const heroTitle = heroTitleRef.current;
    const heroSub = heroSubRef.current;
    const scrollHint = scrollHintRef.current;
    const currNum = currNumRef.current;
    const dots = dotsRef.current.filter(Boolean);
    const titles = titlesRef.current.filter(Boolean);
    const descs = descsRef.current.filter(Boolean);
    const cards = cardsRef.current.filter(Boolean);

    if (!showcase || !deck || !cards.length) return;

    // Entrance Animation on Load
    const lines = heroTitle?.querySelectorAll('.hero-line');
    const targetLines = lines && lines.length > 0 ? Array.from(lines) : [heroTitle];

    const entranceTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    entranceTl.fromTo(
      targetLines,
      { y: 32, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, clearProps: 'transform', ease: 'power3.out' },
      0.06
    );

    if (scrollHint) {
      entranceTl.fromTo(
        scrollHint,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        0.3
      );
    }

    if (heroSub) {
      entranceTl.fromTo(
        heroSub,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', clearProps: 'transform' },
        0.35
      );
    }

    // Set initial card states
    cards.forEach((card, idx) => {
      gsap.set(card, {
        yPercent: idx === 0 ? 0 : 100,
        zIndex: idx + 1,
        scale: 1,
      });
    });

    let activeIndex = 0;
    function setActiveIndex(newIndex, force = false) {
      if (!force && newIndex === activeIndex) return;
      if (newIndex < 0 || newIndex >= cards.length) return;
      activeIndex = newIndex;

      if (currNum) {
        gsap.killTweensOf(currNum);
        currNum.textContent = String(newIndex + 1).padStart(2, '0');
        gsap.fromTo(
          currNum,
          { opacity: 0.5, scale: 0.94 },
          { opacity: 1, scale: 1, duration: 0.2, ease: 'power2.out' }
        );
      }

      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === newIndex);
      });

      titles.forEach((title, idx) => {
        title.classList.toggle('active', idx === newIndex);
      });

      descs.forEach((desc, idx) => {
        desc.classList.toggle('active', idx === newIndex);
      });
    }

    function getOffsets() {
      const isMobile = window.innerWidth <= 900;
      if (isMobile) {
        return { deltaX: 0, deltaY: 0, isMobile: true };
      }
      const deckRect = deck.getBoundingClientRect();
      const curX = gsap.getProperty(deck, 'x') || 0;
      const rawLeft = deckRect.left - curX;
      const rawCenterX = rawLeft + deck.offsetWidth / 2;

      const deltaX = window.innerWidth / 2 - rawCenterX;
      const deckHeight = deck.offsetHeight || 520;
      const unTransformedTop = (window.innerHeight - deckHeight) / 2;
      const deltaY = window.innerHeight - unTransformedTop + 30;

      return { deltaX, deltaY, isMobile: false };
    }

    let offsets = getOffsets();

    let scrollTriggerInstance = null;

    if (!offsets.isMobile) {
      gsap.set(deck, { x: offsets.deltaX, y: offsets.deltaY, scale: 0.92 });
      if (infoCol) gsap.set(infoCol, { opacity: 0, x: 45 });
      setActiveIndex(0, true);

      const scrollDistance = 1100 + (cards.length - 1) * 650;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: showcase,
          start: 'top top',
          end: `+=${scrollDistance}`,
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress <= 2.2 / 8.2) {
              setActiveIndex(0);
              if (heroIntro) heroIntro.style.visibility = 'visible';
            } else {
              const cardNorm = (progress - 2.2 / 8.2) / (6.0 / 8.2);
              const step = Math.min(
                cards.length - 1,
                Math.max(0, Math.round(cardNorm * (cards.length - 1)))
              );
              setActiveIndex(step);
            }
          },
          onLeaveBack: () => {
            setActiveIndex(0, true);
            if (heroIntro) {
              heroIntro.style.visibility = 'visible';
              gsap.set(heroIntro, { opacity: 1, y: 0 });
            }
            if (heroTitle) gsap.set(heroTitle, { scale: 1.0, y: 0, opacity: 1 });
            if (heroSub) gsap.set(heroSub, { scale: 1.0, y: 0, opacity: 1 });
            if (scrollHint) gsap.set(scrollHint, { opacity: 1, y: 0 });
            if (infoCol) gsap.set(infoCol, { opacity: 0, x: 45 });
            gsap.set(deck, { x: offsets.deltaX, y: offsets.deltaY, scale: 0.92 });
            cards.forEach((c, idx) => {
              gsap.set(c, { yPercent: idx === 0 ? 0 : 100, scale: 1 });
            });
          },
          onEnterBack: () => {
            setActiveIndex(cards.length - 1, true);
          },
        },
      });

      scrollTriggerInstance = tl.scrollTrigger;

      if (heroTitle) {
        tl.fromTo(
          heroTitle,
          { scale: 1.0, y: 0, opacity: 1 },
          { scale: 0.58, y: -70, opacity: 0, duration: 1.3, ease: 'power2.inOut', transformOrigin: 'center center' },
          0
        );
      }

      if (heroSub) {
        tl.fromTo(
          heroSub,
          { scale: 1.0, y: 0, opacity: 1 },
          { scale: 0.9, y: -40, opacity: 0, duration: 0.9, ease: 'power2.out', transformOrigin: 'center center' },
          0
        );
      }

      if (scrollHint) {
        tl.fromTo(
          scrollHint,
          { opacity: 1, y: 0 },
          { opacity: 0, y: -25, duration: 0.5, ease: 'power2.out' },
          0
        );
      }

      if (heroIntro) {
        tl.fromTo(
          heroIntro,
          { opacity: 1 },
          { opacity: 0, duration: 1.3, ease: 'power2.inOut' },
          0
        );
      }

      tl.fromTo(
        deck,
        { y: offsets.deltaY, scale: 0.92 },
        { y: 0, scale: 1, duration: 1.3, ease: 'power2.inOut' },
        0
      );

      tl.fromTo(
        deck,
        { x: offsets.deltaX },
        { x: 0, duration: 0.9, ease: 'power2.inOut' },
        1.3
      );

      if (infoCol) {
        tl.fromTo(
          infoCol,
          { opacity: 0, x: 45 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' },
          1.4
        );
      }

      for (let i = 1; i < cards.length; i++) {
        const startTime = 2.2 + (i - 1) * 1.0;
        tl.fromTo(
          cards[i],
          { yPercent: 100 },
          { yPercent: 0, duration: 1.0, ease: 'power1.inOut' },
          startTime
        );

        tl.fromTo(
          cards[i - 1],
          { scale: 1.0 },
          { scale: 0.96, duration: 1.0, ease: 'power1.inOut' },
          startTime
        );
      }

      const handleResize = () => {
        offsets = getOffsets();
        if (!offsets.isMobile && tl.scrollTrigger && tl.scrollTrigger.progress === 0) {
          gsap.set(deck, { x: offsets.deltaX, y: offsets.deltaY, scale: 0.92 });
        }
      };

      window.addEventListener('resize', handleResize);

      dots.forEach((dot, idx) => {
        dot.onclick = (e) => {
          e.preventDefault();
          const st = tl.scrollTrigger;
          if (st) {
            const targetTime = idx === 0 ? 2.2 : 2.2 + idx * 1.0;
            const targetProgress = targetTime / 8.2;
            const targetScroll = st.start + targetProgress * (st.end - st.start);
            window.scrollTo({
              top: targetScroll,
              behavior: 'smooth',
            });
          }
        };
      });

      return () => {
        document.body.classList.remove('is-treatments-page');
        window.removeEventListener('resize', handleResize);
        if (scrollTriggerInstance) scrollTriggerInstance.kill();
        tl.kill();
      };
    } else {
      gsap.set(deck, { clearProps: 'x,y,scale' });
      if (heroIntro) gsap.set(heroIntro, { clearProps: 'all' });
      if (infoCol) gsap.set(infoCol, { clearProps: 'all' });
    }
  }, []);

  return (
    <section className="treatments-showcase-section" id="treatmentsShowcase" ref={showcaseRef}>
      {/* HERO TITLE & SUBTITLE */}
      <div className="treatments-hero-intro" id="treatmentsHeroIntro" ref={heroIntroRef}>
        <h1 className="treatments-hero-title scaling-title" id="treatmentsScalingTitle" ref={heroTitleRef}>
          {heroHeading.includes(',') ? (
            <>
              <span className="hero-line hero-line-1">{heroHeading.split(',')[0]},</span>
              <span className="hero-line hero-line-2">{heroHeading.split(',').slice(1).join(',').trim()}</span>
            </>
          ) : (
            <span className="hero-line hero-line-1">{heroHeading}</span>
          )}
        </h1>
        <p className="treatments-hero-sub" id="treatmentsHeroSub" ref={heroSubRef}>
          {heroSubtitle}
        </p>
        <div className="treatments-hero-scroll-hint" id="treatmentsHeroScrollHint" ref={scrollHintRef}>
          <span>Scroll down</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M7 10l5 5 5-5" />
          </svg>
        </div>
      </div>

      <div className="treatments-showcase-container">
        <div className="treatments-showcase-grid">
          {/* LEFT COLUMN: Pinned Stacking Visual Cards Deck */}
          <div className="showcase-visual-col" id="showcaseVisualCol">
            <div className="showcase-cards-deck" id="showcaseCardsDeck" ref={deckRef}>
              {/* Vertical Indicator Dots */}
              <div className="showcase-vertical-nav" id="showcaseVerticalNav">
                <div className="nav-pill-indicator" id="navPillIndicator"></div>
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    ref={(el) => (dotsRef.current[idx] = el)}
                    className={`nav-dot ${idx === 0 ? 'active' : ''}`}
                    data-index={idx}
                    aria-label={`Treatment ${idx + 1}`}
                  ></button>
                ))}
              </div>

              {/* Treatment Slide Cards (0 to 6) */}
              {slides.map((slide, idx) => (
                <div
                  key={idx}
                  ref={(el) => (cardsRef.current[idx] = el)}
                  className={`showcase-card ${idx === 0 ? 'active' : ''}`}
                  data-index={idx}
                >
                  <div className="showcase-card-inner">
                    <img
                      src={slide.img}
                      alt={slide.title}
                      className="showcase-img"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Synchronized Dynamic Content */}
          <div className="showcase-info-col" id="showcaseInfoCol" ref={infoColRef}>
            <div className="showcase-info-sticky">
              <div className="showcase-info-top">
                {/* Counter */}
                <div className="showcase-counter" id="showcaseCounter">
                  <span className="curr-num" id="showcaseCurrNum" ref={currNumRef}>
                    01
                  </span>
                  <span className="total-num">/{String(slides.length).padStart(2, '0')}</span>
                </div>

                {/* Dynamic Titles */}
                <div className="showcase-title-area" id="showcaseTitleArea">
                  {slides.map((slide, idx) => (
                    <h2
                      key={idx}
                      ref={(el) => (titlesRef.current[idx] = el)}
                      className={`showcase-title ${idx === 0 ? 'active' : ''}`}
                      data-index={idx}
                    >
                      {slide.title}
                    </h2>
                  ))}
                </div>
              </div>

              {/* Dynamic Descriptions */}
              <div className="showcase-desc-area" id="showcaseDescArea">
                {slides.map((slide, idx) => (
                  <p
                    key={idx}
                    ref={(el) => (descsRef.current[idx] = el)}
                    className={`showcase-desc ${idx === 0 ? 'active' : ''}`}
                    data-index={idx}
                  >
                    {slide.desc}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
