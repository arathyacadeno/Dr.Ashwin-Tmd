import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';

export const TmdFaqSection = () => {
  const { faqs } = useClinic();
  const [openId, setOpenId] = useState(1); // Item 1 open by default matching demo

  const toggleFaq = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="tmd-faq-section" id="tmdFaq">
      <div className="tmd-faq-header">
        <h2 className="tmd-faq-title">Questions patients ask</h2>
        <p className="tmd-faq-subtitle">A few simple, honest answers to the questions we hear most often.</p>
      </div>

      <div className="tmd-faq-list">
        {faqs?.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id} className={`tmd-faq-item ${isOpen ? 'active' : ''}`}>
              <button
                type="button"
                className="tmd-faq-btn"
                aria-expanded={isOpen}
                onClick={() => toggleFaq(item.id)}
              >
                <span className="faq-q-text">{item.question}</span>
                <span className="faq-toggle-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>
              <div className="tmd-faq-answer">
                <p className="faq-a-text">{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TmdFaqSection;
