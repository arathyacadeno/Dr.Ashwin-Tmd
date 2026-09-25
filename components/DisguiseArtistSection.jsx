'use client';

import React from 'react';
import { useCms } from '@/context/CmsContext';

const defaultSymptoms = [
  {
    tag: 'In the ears',
    title: 'Tension or pain',
    desc: 'Ear fullness, ringing, or pain that feels like an infection even when your doctor says your ears look completely clear.',
  },
  {
    tag: 'In the head',
    title: 'Morning tension',
    desc: 'Tension headaches, waking with a dull ache at the temples, behind the eyes, or across the back of the head.',
  },
  {
    tag: 'In the jaw',
    title: 'Click, pop, or lock',
    desc: 'Clicking or popping sounds when you chew or open wide — with or without pain — or a jaw that catches or locks.',
  },
  {
    tag: 'In the mouth',
    title: 'A bite that feels off',
    desc: "Your teeth feel like they don't meet right, or you find yourself constantly trying to find a comfortable position to rest your jaw.",
  },
  {
    tag: 'In the neck & shoulders',
    title: 'Neck & postural tension',
    desc: 'Persistent stiffness in the neck, upper back, or shoulders that returns no matter how many times you stretch or get a massage.',
  },
  {
    tag: 'In the face',
    title: 'Facial fatigue',
    desc: 'Tired jaw muscles after eating, soreness in the cheeks, or aching across the face by the end of the day.',
  },
];

const SYMPTOM_ICONS = [
  // 1. In the ears
  <svg key="ear" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0" />
    <path d="M15 8.5a2.5 2.5 0 0 0-5 0v2" />
  </svg>,
  // 2. In the head
  <svg key="head" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12h8" />
    <path d="M12 8v8" />
  </svg>,
  // 3. In the jaw
  <svg key="jaw" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>,
  // 4. In the mouth
  <svg key="mouth" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 10c0 4 3 8 8 8s8-4 8-8" />
    <path d="M4 10h16" />
  </svg>,
  // 5. In the neck & shoulders
  <svg key="neck" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>,
  // 6. In the face
  <svg key="face" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 15h8" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>,
];

export default function DisguiseArtistSection() {
  const { content } = useCms();

  const symptomsList = content?.tmdSymptoms?.length ? content.tmdSymptoms : defaultSymptoms;

  return (
    <section className="tmd-disguise-section" id="disguiseArtist">
      <div className="tmd-disguise-container">
        <div className="tmd-disguise-header">
          <h2 className="tmd-section-title">
            {content?.tmdDisguiseTitle || 'Why the jaw is such a good disguise artist'}
          </h2>
          <p className="tmd-disguise-subtitle">
            {content?.tmdDisguiseSub ||
              'The TMJ and its muscles share nerves and tension pathways with your head, neck, ears, and face. Because of that, a problem here rarely announces itself as a simple "jaw pain".'}
          </p>
        </div>

        {/* Symptoms Cards Grid */}
        <div className="tmd-symptoms-grid">
          {symptomsList.map((s, idx) => (
            <div className="tmd-symptom-card" key={idx}>
              <div className="symptom-icon-wrap">
                {SYMPTOM_ICONS[idx % SYMPTOM_ICONS.length]}
              </div>
              <span className="symptom-tag">{s.tag || `Symptom ${idx + 1}`}</span>
              <h3 className="symptom-title">{s.title}</h3>
              <p className="symptom-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
