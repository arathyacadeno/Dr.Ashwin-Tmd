'use client';

import React, { useState } from 'react';

const faqs = [
  {
    q: 'Will this get better?',
    a: 'Most people improve, often substantially. How much and how quickly depends on the cause and how long it has been going on, which is exactly what the first appointment is for.',
  },
  {
    q: 'Is treatment uncomfortable?',
    a: 'Most TMD treatment is not. It is largely non-invasive and non-surgical — appliances, exercises and adjustments rather than anything dramatic.',
  },
  {
    q: 'How long does it take?',
    a: 'Muscular problems can settle in a few weeks. Bite and structural problems take longer. You will be given a realistic timeline once we know what we are dealing with, not before.',
  },
  {
    q: 'My jaw clicks but does not hurt. Is that a problem?',
    a: 'Often not. Painless clicking can stay exactly as it is for years. It is worth checking if it is joined by discomfort, locking, or a reduced ability to open.',
  },
  {
    q: 'Could my migraines be connected?',
    a: 'Migraine and TMD are separate conditions that often keep each other company. Some patients find their headaches become less frequent once the jaw is more comfortable.',
  },
  {
    q: 'Could sleep or breathing be connected?',
    a: 'It can be. Jaw position, tongue space and airway are connected, which is why we look at breathing and sleep as part of the assessment.',
  },
  {
    q: 'Do I need a referral?',
    a: 'No — you can simply book. We are happy to work alongside your dentist, ENT specialist or physiotherapist if you would like us to.',
  },
  {
    q: 'Can my regular dentist treat this?',
    a: 'General dental training touches on TMD only briefly. Persistent jaw problems need someone who works with the joint, the muscles and the airway regularly.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className="tmd-faq-section" id="tmdFaq">
      <div className="tmd-faq-header">
        <h2 className="tmd-faq-title">Questions patients ask</h2>
        <p className="tmd-faq-subtitle">A few simple, honest answers to the questions we hear most often.</p>
      </div>

      <div className="tmd-faq-list">
        {faqs.map((faq, index) => {
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
