import React from 'react';
import Image from 'next/image';

export default function DoctorCard() {
  return (
    <article className="about-doctor-card about-anim-item">
      <div className="about-doctor-img-wrap">
        <Image
          src="/assets/images/og image.png"
          alt="Dr. Ashwin - Oral and Maxillofacial Surgeon"
          width={400}
          height={480}
          className="about-doctor-portrait"
          priority
        />
      </div>

      <div className="about-doctor-content">
        <span className="about-specialist-tag">SPECIALIST</span>
        <h2 className="about-doctor-name">Meet Dr. Ashwin</h2>
        <p className="about-doctor-qualification">MDS — Oral &amp; Maxillofacial Surgery</p>
        <div className="about-doctor-bio">
          <p>
            Dr. Ashwin Ramakrishnan leads a focused clinical practice dedicated to temporomandibular disorders (TMD), jaw, bite and related orofacial concerns in Calicut.
          </p>
          <p>
            His approach begins with understanding the complete picture — the symptoms, their history, the jaw joints and muscles, the bite, and related factors such as sleep and airway concerns. Each patient is carefully assessed before a treatment plan is discussed.
          </p>
          <blockquote className="about-doctor-quote">
            “Good care starts with understanding the person, not just the symptom.”
          </blockquote>
        </div>
      </div>
    </article>
  );
}
