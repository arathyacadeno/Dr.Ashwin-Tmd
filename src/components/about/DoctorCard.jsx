import React from 'react';
import { useClinic } from '../../context/ClinicContext';

export const DoctorCard = () => {
  const { doctors } = useClinic();
  const doctor = doctors?.[0] || {
    name: 'Dr. Ashwin Ramakrishnan',
    qualification: 'MDS — Oral & Maxillofacial Surgery',
    quote: '“Good care starts with understanding the person, not just the symptom.”',
    image: '/assets/images/og image.png'
  };

  return (
    <article className="about-doctor-card about-anim-item">
      <div className="about-doctor-img-wrap">
        <img
          src={doctor.image || '/assets/images/og image.png'}
          alt={`${doctor.name} - Oral and Maxillofacial Surgeon`}
          className="about-doctor-portrait"
          loading="lazy"
        />
      </div>

      <div className="about-doctor-content">
        <span className="about-specialist-tag">SPECIALIST</span>
        <h2 className="about-doctor-name">Meet Dr. Ashwin</h2>
        <p className="about-doctor-qualification">{doctor.qualification}</p>
        <div className="about-doctor-bio">
          <p>
            Dr. Ashwin Ramakrishnan leads a focused clinical practice dedicated to temporomandibular disorders (TMD), jaw, bite and related orofacial concerns in Calicut.
          </p>
          <p>
            His approach begins with understanding the complete picture — the symptoms, their history, the jaw joints and muscles, the bite, and related factors such as sleep and airway concerns. Each patient is carefully assessed before a treatment plan is discussed.
          </p>
          <blockquote className="about-doctor-quote">
            {doctor.quote}
          </blockquote>
        </div>
      </div>
    </article>
  );
};

export default DoctorCard;
