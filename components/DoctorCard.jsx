'use client';

import React from 'react';
import Image from 'next/image';
import { useCms } from '@/context/CmsContext';

export default function DoctorCard() {
  const { content } = useCms();

  const formatImgSrc = (img, fallback) => {
    if (!img) return fallback;
    if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('/')) return img;
    return `/assets/images/${img}`;
  };

  const docImg = formatImgSrc(content?.aboutDoctorImage, '/assets/images/og image.png');

  const fullBio =
    content?.aboutDoctorBio ||
    [content?.aboutDoctorBio1, content?.aboutDoctorBio2].filter(Boolean).join('\n\n') ||
    'Dr. Ashwin Ramakrishnan leads a focused clinical practice dedicated to temporomandibular disorders (TMD), jaw, bite and related orofacial concerns in Calicut.\n\nHis approach begins with understanding the complete picture — the symptoms, their history, the jaw joints and muscles, the bite, and related factors such as sleep and airway concerns. Each patient is carefully assessed before a treatment plan is discussed.';

  const bioParagraphs = fullBio.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  return (
    <article className="about-doctor-card about-anim-item">
      <div className="about-doctor-img-wrap">
        <Image
          src={docImg}
          alt={content?.aboutDoctorName || 'Dr. Ashwin'}
          width={400}
          height={480}
          className="about-doctor-portrait"
          priority
        />
      </div>

      <div className="about-doctor-content">
        <span className="about-specialist-tag">{content?.aboutDoctorTag || 'SPECIALIST'}</span>
        <h2 className="about-doctor-name">{content?.aboutDoctorName || 'Meet Dr. Ashwin'}</h2>
        <p className="about-doctor-qualification">
          {content?.aboutDoctorQualification || 'MDS — Oral & Maxillofacial Surgery'}
        </p>
        <div className="about-doctor-bio">
          {bioParagraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
          <blockquote className="about-doctor-quote">
            {content?.aboutDoctorQuote || '“Good care starts with understanding the person, not just the symptom.”'}
          </blockquote>
        </div>
      </div>
    </article>
  );
}
