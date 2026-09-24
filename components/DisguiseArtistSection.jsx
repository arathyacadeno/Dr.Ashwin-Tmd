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
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v8M8 12h8" />
                </svg>
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
