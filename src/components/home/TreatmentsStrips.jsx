import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const stripsData = [
  {
    title: 'Neuromuscular orthotic therapy',
    desc: 'Custom-engineered physiological orthotics calibrated to decompress jaw joint tension and restore optimal neuromuscular rest position.',
    img: '/assets/images/tmj_medical_visualization.jpg'
  },
  {
    title: 'TENS therapy & muscle relaxation',
    desc: 'Ultra-low frequency neuro-stimulation delivering rhythmic relaxation to chronically tight masticatory muscles to eliminate facial tension.',
    img: '/assets/images/hero_clinic_interior.jpg'
  },
  {
    title: 'Bite realignment & occlusal therapy',
    desc: 'Precision micro-adjustments and computerized occlusion mapping ensuring harmonious contact distribution during chewing.',
    img: '/assets/images/dental_implant_3d.jpg'
  },
  {
    title: 'Airway & sleep-focused care',
    desc: 'Specialized nighttime appliances designed to keep the upper airway open, reducing bruxism, snoring, and morning fatigue.',
    img: '/assets/images/outcome_sleeping.jpg'
  },
  {
    title: 'Laser & physical therapy support',
    desc: 'Photobiomodulation cold laser therapy accelerating tissue regeneration, joint disc recovery, and reducing inflammation.',
    img: '/assets/images/aswin.jpg'
  },
  {
    title: 'Trigger point & myofascial release',
    desc: 'Targeted trigger-point decompression resolving localized muscle knots in the head, neck, and jaw for immediate relief.',
    img: '/assets/images/smile_after.jpg'
  },
  {
    title: 'Exercises & posture work',
    desc: 'Targeted care for jaw muscle tension, tenderness, TMD-related pain, and discomfort, with practical guidance for managing symptoms at home.',
    img: '/assets/images/hero_clinic_interior.jpg'
  }
];

export const TreatmentsStrips = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const container = containerRef.current;
    const cursor = cursorRef.current;
    if (!container || !cursor) return;

    if (window.matchMedia('(hover: none)').matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let isHovering = false;
    let rafId = null;

    const updatePosition = () => {
      currentX += (mouseX + 10 - currentX) * 0.25;
      currentY += (mouseY - 16 - currentY) * 0.25;

      cursor.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0)`;

      if (isHovering || Math.abs(mouseX + 10 - currentX) > 0.2 || Math.abs(mouseY - 16 - currentY) > 0.2) {
        rafId = requestAnimationFrame(updatePosition);
      } else {
        rafId = null;
      }
    };

    const scheduleUpdate = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseEnter = (e) => {
      if (window.innerWidth <= 960) return;
      isHovering = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
      currentX = mouseX + 10;
      currentY = mouseY - 16;
      cursor.classList.add('visible');
      scheduleUpdate();
    };

    const handleMouseMove = (e) => {
      if (window.innerWidth <= 960) return;
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isHovering) {
        isHovering = true;
        cursor.classList.add('visible');
      }
      scheduleUpdate();
    };

    const handleMouseLeave = () => {
      isHovering = false;
      cursor.classList.remove('visible');
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleStripClick = (index) => {
    const isMobile = window.innerWidth <= 960;
    if (isMobile) {
      if (activeIndex === index) {
        navigate('/treatments');
      } else {
        setActiveIndex(index);
      }
    } else {
      navigate('/treatments');
    }
  };

  return (
    <section className="treatments-section" id="treatments">
      <div className="container">
        <div className="treatments-header">
          <h2 className="treatments-main-title">
            <span className="title-charcoal">A Complete Approach</span>{' '}
            <span className="title-gold">To Treatment</span>
          </h2>
        </div>
      </div>

      <div className="treatments-strips-container" id="treatmentsStrips" ref={containerRef}>
        {/* Floating Custom Mouse Hover Pointer ("Learn More ✦") */}
        <div className="treatments-hover-cursor" id="treatmentsHoverCursor" ref={cursorRef} aria-hidden="true">
          <span className="cursor-text">Learn More</span>
          <svg className="cursor-star-icon" viewBox="0 0 24 24" width="12" height="12" fill="#FF7A00" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z" fill="#FF7A00" />
          </svg>
        </div>

        {stripsData.map((strip, idx) => (
          <div
            key={idx}
            className={`treatment-strip ${activeIndex === idx ? 'active' : ''}`}
            onClick={() => handleStripClick(idx)}
            onMouseEnter={() => {
              if (window.innerWidth > 960) setActiveIndex(idx);
            }}
            tabIndex={0}
            role="button"
            aria-label={strip.title}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate('/treatments');
              }
            }}
          >
            <img src={strip.img} alt={strip.title} className="strip-bg-img" />
            <div className="strip-dark-overlay"></div>
            <div className="strip-expanded-content">
              <h3>{strip.title}</h3>
              <p>{strip.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TreatmentsStrips;
