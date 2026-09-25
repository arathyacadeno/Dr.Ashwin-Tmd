'use client';

import React from 'react';
import Link from 'next/link';
import { useCms } from '@/context/CmsContext';

const defaultCheckpoints = [
  'Pain or discomfort that has lasted more than two or three weeks.',
  'Clicking, popping, or grating sounds accompanied by any pain or tightness.',
  'Your jaw catches, locks, or feels like it won\'t open all the way.',
  'Headaches, ear symptoms, or neck pain that other doctors haven\'t been able to explain.',
  'Waking up every morning with a tight, tired, or aching jaw.',
];

const defaultConsultPoints = [
  {
    title: 'A patient, thorough conversation',
    desc: 'about what you have been experiencing',
  },
  {
    title: 'A careful examination',
    desc: 'of the joint, muscles, and how your teeth meet',
  },
  {
    title: 'Clear, honest guidance',
    desc: 'on what is going on and the simplest path forward',
  },
];

export default function WhenToComeSection() {
  const { content } = useCms();

  const title = content?.tmdWhenTitle || 'A good time to come in';
  const intro =
    content?.tmdWhenIntro ||
    content?.tmdWhenText ||
    "You don't need to wait until your jaw locks or the pain is severe. It is always easier to treat early.";
  const checkpoints = content?.tmdCheckpoints || defaultCheckpoints;
  const consultTitle = content?.tmdConsultTitle || '✦ Every consultation includes:';
  const consultPoints = content?.tmdConsultPoints || defaultConsultPoints;
  const ctaHeading = content?.tmdCtaHeading || 'Ready to speak with Dr. Ashwin?';
  const ctaBtnText = content?.tmdCtaButtonText || 'Book your consultation';
  const ctaLinkRaw = content?.tmdCtaButtonLink || '/contact';
  const ctaLink = ctaLinkRaw.replace('.html', '');

  return (
    <section className="tmd-when-section" id="whenToCome">
      {/* Section Header (Centered) */}
      <div className="tmd-when-header">
        <h2 className="when-title">{title}</h2>
        <p className="when-sub">{intro}</p>
      </div>

      <div className="tmd-when-grid">
        {/* Left Column: Checklist */}
        <div className="tmd-when-col-left">
          <div className="when-checklist">
            {checkpoints.map((cp, idx) => (
              <div className="when-check-pill" key={idx}>
                <div className="check-pill-icon">✓</div>
                <span>{cp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Warm Gold Consultation Card */}
        <div className="tmd-when-col-right">
          <div className="tmd-consult-card">
            <div className="consult-includes-header">
              <span>{consultTitle.startsWith('✦') ? consultTitle : `✦ ${consultTitle}`}</span>
            </div>
            <ul className="consult-bullets">
              {consultPoints.map((pt, idx) => (
                <li key={idx}>
                  <span className="bullet-dot"></span>
                  <span>
                    <strong>{pt.title}</strong>
                    {pt.desc ? (pt.title ? ` — ${pt.desc}` : pt.desc) : ''}
                  </span>
                </li>
              ))}
            </ul>

            <div className="consult-action-card">
              <h4 className="consult-action-title">{ctaHeading}</h4>
              <Link href={ctaLink} className="consult-action-btn">
                <span>{ctaBtnText}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

