import React, { useEffect } from 'react';
import TreatmentsHero from '../components/treatments/TreatmentsHero';
import TreatmentsShowcase from '../components/treatments/TreatmentsShowcase';
import TreatmentProcess from '../components/treatments/TreatmentProcess';
import TreatmentJourney from '../components/treatments/TreatmentJourney';
import PreFooterCta from '../components/PreFooterCta';
import Footer from '../components/Footer';

export const TreatmentsPage = () => {
  useEffect(() => {
    document.title = "Treatments | Dr. Ashwin's TMD Clinic Kozhikode";
    document.body.classList.add('is-treatments-page');
    window.scrollTo(0, 0);

    return () => {
      document.body.classList.remove('is-treatments-page');
    };
  }, []);

  return (
    <>
      <main className="treatments-page-main">
        <section className="treatments-showcase-section" id="treatmentsShowcase">
          <TreatmentsHero />
          <TreatmentsShowcase />
        </section>
        <TreatmentProcess />
        <TreatmentJourney />
        <PreFooterCta />
      </main>
      <Footer />
    </>
  );
};

export default TreatmentsPage;
