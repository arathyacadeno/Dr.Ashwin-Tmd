'use client';

import React, { useState } from 'react';
import { useCms } from '@/context/CmsContext';

const defaultFaqs = [
  {
    q: 'Will this get better?',
    a: 'Yes. With accurate diagnosis identifying whether the issue is muscular, articular, or airway-related, the overwhelming majority of TMD patients achieve substantial, lasting relief through conservative care.',
  },
  {
    q: 'Is treatment uncomfortable?',
    a: 'No. Our approach prioritizes non-invasive, gentle, and reversible protocols. Therapeutic splints, trigger therapy, and biometric adjustments are designed to relieve strain, not create it.',
  },
  {
    q: 'How long does it take?',
    a: 'Acute muscular symptoms often ease within 2 to 4 weeks. Full joint stabilization and structural retraining generally span 3 to 6 months depending on chronicity.',
  },
  {
    q: 'My jaw clicks but does not hurt. Is that a problem?',
    a: 'A painless click often indicates a displaced disc that still self-reduces. While not an emergency, a baseline evaluation prevents progression to locked or painful stages.',
  },
  {
    q: 'Could my migraines be connected?',
    a: 'Frequently, yes. Strain in the temporalis and masseter muscles triggers referred pain along the trigeminal nerve, often misdiagnosed as tension migraines.',
  },
  {
    q: 'Could sleep or breathing be connected?',
    a: 'Intimately. Nocturnal airway restriction often causes the brain to clench or thrust the jaw forward instinctively to keep the airway open during sleep.',
  },
  {
    q: 'Do I need a referral?',
    a: 'No formal referral is required. Patients can schedule directly for a comprehensive TMD evaluation.',
  },
  {
    q: 'Can my regular dentist treat this?',
    a: 'While general dentists handle routine dental needs, TMD is a complex neuromuscular and orthopedic condition requiring specialized craniofacial training and diagnostic equipment.',
  },
];

export default function FaqSection() {
  const { content } = useCms();
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  const title = content?.tmdFaqTitle || 'Questions patients ask';
  const subtitle =
    content?.tmdFaqSubtitle ||
    'Transparent answers to common clinical inquiries regarding pain relief, treatment duration, and diagnostic necessity.';
  const list = content?.tmdFaqs || defaultFaqs;

  return (
    <section className="tmd-faq-section" id="tmdFaq">
      <div className="tmd-faq-header">
        <h2 className="tmd-faq-title">{title}</h2>
        <p className="tmd-faq-subtitle">{subtitle}</p>
      </div>

      <div className="tmd-faq-list">
        {list.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div className={`tmd-faq-item ${isOpen ? 'active' : ''}`} key={index}>
              <button
                type="button"
                className="tmd-faq-btn"
                aria-expanded={isOpen}
                onClick={() => toggleFaq(index)}
              >
                <span className="faq-q-text">{faq.q}</span>
                <span className="faq-toggle-icon">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                    }}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>
              {isOpen && (
                <div className="tmd-faq-answer">
                  <p className="faq-a-text">{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

