'use client';

import React from 'react';
import { useCms } from '@/context/CmsContext';

const defaultReasons = [
  {
    num: '01',
    title: 'Night-time clenching',
    desc: 'Sleep bruxism generating sustained extreme bite forces while asleep.',
    icon: (
      <svg className="reason-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Daytime stress habits',
    desc: 'Subconscious daytime bracing, teeth bracing during focused screen work or driving.',
    icon: (
      <svg className="reason-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Breathing & Airway',
    desc: 'Upper airway resistance, mouth breathing, or sleep-disordered breathing.',
    icon: (
      <svg className="reason-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3v18M3 12h18" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Structural friction',
    desc: 'Internal disc derangement, uneven condylar seating, or natural skeletal asymmetry.',
    icon: (
      <svg className="reason-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="12" rx="10" ry="6" />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Posture & screen habits',
    desc: 'Forward head posture from prolonged laptop/phone use loading the suboccipital and masticatory muscles.',
    icon: (
      <svg className="reason-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    num: '06',
    title: 'An impact or accident',
    desc: 'Micro or macro-trauma, sports collision, whiplash injury, or sudden hyper-extension of the jaw.',
    icon: (
      <svg className="reason-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    num: '07',
    title: 'Dental changes',
    desc: 'Recent missing teeth, unstable dental restorations, or uncompensated occlusal shifts.',
    icon: (
      <svg className="reason-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
      </svg>
    ),
  },
  {
    num: '08',
    title: 'Joint vulnerability',
    desc: 'Systemic joint hypermobility, hormonal variations, or underlying inflammatory conditions.',
    icon: (
      <svg className="reason-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <circle cx="19" cy="12" r="2" />
        <circle cx="5" cy="12" r="2" />
      </svg>
    ),
  },
];

export default function UsualReasonsSection() {
  const { content } = useCms();

  const title = content?.tmdCausesTitle || 'The usual reasons';
  const subtitle =
    content?.tmdCausesSub ||
    'TMD rarely arrives from a single clear event. For most patients, several factors build up together until the system simply runs out of room to compensate.';
  const causesList = content?.tmdCauses && content.tmdCauses.length > 0 ? content.tmdCauses : defaultReasons;

  return (
    <section className="tmd-reasons-section" id="usualReasons">
      <div className="tmd-reasons-header">
        <h2 className="tmd-section-title">{title}</h2>
        <p className="tmd-reasons-subtitle">{subtitle}</p>
      </div>

      <div className="tmd-reasons-grid">
        {causesList.map((r, idx) => {
          const numDisplay = r.num ? r.num.replace(/^Cause\s*/i, '').padStart(2, '0') : String(idx + 1).padStart(2, '0');
          const fallbackIcon = defaultReasons[idx % defaultReasons.length]?.icon;
          return (
            <div className="tmd-reason-card" key={idx}>
              <div className="reason-top-row">
                <span className="reason-num">{numDisplay}</span>
                {fallbackIcon}
              </div>
              <h3 className="reason-title">{r.title}</h3>
              <p className="reason-desc">{r.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

