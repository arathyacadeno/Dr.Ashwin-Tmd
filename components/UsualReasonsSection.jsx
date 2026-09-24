import React from 'react';

const reasons = [
  {
    num: '01',
    title: 'Night-time clenching',
    desc: 'Clenching or grinding while you sleep puts enormous force on the joint and muscles without you knowing.',
    icon: (
      <svg className="reason-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Daytime stress habits',
    desc: 'Bracing the jaw, holding teeth together, or chewing cheeks and pens during periods of focus or stress.',
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
    desc: 'Mouth breathing, snoring, or airway restriction at night can pull the jaw back and overload the joint.',
    icon: (
      <svg className="reason-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3v18M3 12h18" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Structural friction',
    desc: 'A cushioning disc that has slipped slightly out of place, creating friction, clicking, or reduced movement.',
    icon: (
      <svg className="reason-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="12" rx="10" ry="6" />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Posture & screen habits',
    desc: 'Forward head posture and desk work change how your jaw hangs and increase muscle fatigue.',
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
    desc: 'A direct knock to the jaw, a whiplash injury, or an unusually long dental appointment that overstretched the joint.',
    icon: (
      <svg className="reason-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    num: '07',
    title: 'Dental changes',
    desc: 'New crowns, missing teeth, or bite changes that subtly shift how your teeth meet and force the joint to adapt.',
    icon: (
      <svg className="reason-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
      </svg>
    ),
  },
  {
    num: '08',
    title: 'Joint vulnerability',
    desc: 'General joint hypermobility, arthritis, or genetic factors that make joint tissues more susceptible to strain.',
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
  return (
    <section className="tmd-reasons-section" id="usualReasons">
      <div className="tmd-reasons-header">
        <h2 className="tmd-section-title">The usual reasons</h2>
        <p className="tmd-reasons-subtitle">
          TMD rarely arrives from a single clear event. For most patients, several factors build up together until the system simply runs out of room to compensate.
        </p>
      </div>

      <div className="tmd-reasons-grid">
        {reasons.map((r) => (
          <div className="tmd-reason-card" key={r.num}>
            <div className="reason-top-row">
              <span className="reason-num">{r.num}</span>
              {r.icon}
            </div>
            <h3 className="reason-title">{r.title}</h3>
            <p className="reason-desc">{r.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
