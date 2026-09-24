import React from 'react';
import { Link } from 'react-router-dom';

export const PreFooterCta = () => {
  return (
    <section className="treatments-cta-section" id="treatmentsCtaSection">
      <div className="container">
        <div className="treatments-cta-card">
          <div className="treatments-cta-content">
            <h2 className="treatments-cta-heading">
              “We will not promise a cure,<br />
              Because honest treatment means<br />
              Honest expectations.”
            </h2>
            <p className="treatments-cta-sub">
              Book your comprehensive diagnostic consultation with Dr. Ashwin and take the first step toward long-term recovery.
            </p>
            <div className="treatments-cta-action">
              <Link to="/contact" className="treatments-cta-btn" id="treatmentsCtaBtn">
                Speak with our team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreFooterCta;
