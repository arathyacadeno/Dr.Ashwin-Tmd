'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useCms } from '@/context/CmsContext';

const defaultP1 =
  'Put a finger just in front of your ear and open your mouth. That movement is your temporomandibular joint — the TMJ. You use it every time you speak, eat, swallow or yawn.';
const defaultP2 =
  'It is a clever joint. It hinges and slides at the same time, the two sides have to move together, and a small cushioning disc rides along inside it. When all of that runs smoothly you never think about it.';
const defaultP3 =
  'When something is slightly off, you feel it — sometimes in the jaw, often somewhere else entirely. TMD simply means a problem with this joint or the muscles that move it. It is common, it is well studied, and in most cases it responds well to straightforward treatment.';

export default function BusiestJointSection() {
  const { content } = useCms();
  const sectionRef = useRef(null);
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  const title = content?.tmdBusiestJointTitle || 'The busiest joint you own';
  const fullText =
    content?.tmdBusiestJointText ||
    `${defaultP1}\n\n${defaultP2}\n\n${defaultP3}`;

  const paragraphs = useMemo(() => {
    return fullText.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  }, [fullText]);

  const paragraphWords = useMemo(() => {
    return paragraphs.map((p) => p.split(/\s+/).filter(Boolean));
  }, [paragraphs]);

  const totalWords = useMemo(() => {
    return paragraphWords.reduce((sum, words) => sum + words.length, 0);
  }, [paragraphWords]);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.75;
      const end = vh * 0.35;
      const totalDist = rect.height + (start - end);
      let progress = (start - rect.top) / totalDist;
      progress = Math.max(0, Math.min(1, progress));

      const activeCount = Math.floor(progress * (totalWords + 2));
      setActiveWordIndex(activeCount);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [totalWords]);

  let wordCounter = 0;

  return (
    <section className="tmd-joint-section" id="busiestJoint" ref={sectionRef}>
      <div className="tmd-joint-grid">
        {/* Text Column */}
        <div className="tmd-joint-col-text">
          <h2 className="tmd-section-title">{title}</h2>
          <div className="tmd-joint-body" id="tmdJointBody">
            {paragraphWords.map((words, pIdx) => (
              <p className="tmd-joint-text" key={pIdx}>
                {words.map((word, wIdx) => {
                  const currentIdx = wordCounter++;
                  return (
                    <React.Fragment key={wIdx}>
                      <span className={`reveal-word ${currentIdx <= activeWordIndex ? 'active' : ''}`}>
                        {word}
                      </span>{' '}
                    </React.Fragment>
                  );
                })}
              </p>
            ))}
          </div>
        </div>

        {/* Anatomy Card Column */}
        <div className="tmd-joint-col-visual">
          <div className="tmj-anatomy-card">
            <div className="anatomy-header">
              <span className="anatomy-label">The Temporomandibular Joint</span>
              <span className="anatomy-tag">Anatomy</span>
            </div>
            <div className="anatomy-diagram-wrap">
              <svg
                viewBox="0 0 380 260"
                width="100%"
                height="auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ maxWidth: '360px' }}
              >
                {/* Temporal Bone Fossa (Upper Cranial Base) */}
                <path
                  d="M40 80 Q100 80 140 82 Q180 84 210 100 Q240 115 280 115 Q330 115 350 115"
                  stroke="#94A3B8"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M40 80 L350 80 L350 115 Q330 115 280 115 Q240 115 210 100 Q180 84 140 82 Q100 80 40 80 Z"
                  fill="#E2E8F0"
                  opacity="0.6"
                />
                <text
                  x="50"
                  y="65"
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                  fontSize="11"
                  fontWeight="600"
                  fill="#64748B"
                >
                  Temporal bone
                </text>
                <line
                  x1="125"
                  y1="68"
                  x2="150"
                  y2="82"
                  stroke="#94A3B8"
                  strokeWidth="1.2"
                  strokeDasharray="2 2"
                />

                {/* Articular Disc (Cushioning Disc) - Highlighted in Gold */}
                <path
                  d="M190 104 C205 98 245 98 265 106 C275 110 268 116 250 116 C230 116 200 115 190 108 Z"
                  fill="#E5A93C"
                  stroke="#D4AF37"
                  strokeWidth="2"
                />
                {/* Disc Label Pointer */}
                <line
                  x1="250"
                  y1="108"
                  x2="300"
                  y2="85"
                  stroke="#D4AF37"
                  strokeWidth="1.5"
                />
                <circle cx="250" cy="108" r="3" fill="#D4AF37" />
                <rect
                  x="295"
                  y="72"
                  width="75"
                  height="22"
                  rx="4"
                  fill="#FFF8E7"
                  stroke="rgba(212,175,55,0.4)"
                  strokeWidth="1"
                />
                <text
                  x="301"
                  y="87"
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                  fontSize="10"
                  fontWeight="700"
                  fill="#B45309"
                >
                  Cushioning disc
                </text>

                {/* Condylar Head & Neck (Lower Mandible) */}
                <path
                  d="M205 230 L205 160 C205 130 215 116 230 116 C245 116 255 130 255 160 L255 230 Z"
                  fill="#F8FAFC"
                  stroke="#64748B"
                  strokeWidth="2.5"
                />
                <circle cx="230" cy="132" r="3.5" fill="#334155" />

                {/* Condyle Label Pointer */}
                <line
                  x1="205"
                  y1="145"
                  x2="130"
                  y2="145"
                  stroke="#94A3B8"
                  strokeWidth="1.2"
                />
                <circle cx="205" cy="145" r="3" fill="#64748B" />
                <text
                  x="55"
                  y="149"
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                  fontSize="11"
                  fontWeight="600"
                  fill="#475569"
                >
                  Condylar head
                </text>

                {/* Lower Jaw (Mandible) Pointer */}
                <line
                  x1="255"
                  y1="195"
                  x2="295"
                  y2="195"
                  stroke="#94A3B8"
                  strokeWidth="1.2"
                />
                <circle cx="255" cy="195" r="3" fill="#64748B" />
                <text
                  x="302"
                  y="199"
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                  fontSize="11"
                  fontWeight="600"
                  fill="#475569"
                >
                  Mandible bone
                </text>
              </svg>
            </div>
            <p className="anatomy-caption">Hinges &amp; slides smoothly when balanced and unstrained</p>
          </div>
        </div>
      </div>
    </section>
  );
}
