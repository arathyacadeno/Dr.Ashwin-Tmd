import React, { useEffect } from 'react';
import AboutHero from '../components/about/AboutHero';
import OurStoryCard from '../components/about/OurStoryCard';
import DoctorCard from '../components/about/DoctorCard';
import PhilosophySection from '../components/about/PhilosophySection';
import Footer from '../components/Footer';

export const AboutPage = () => {
  useEffect(() => {
    document.title = "About Us | Dr. Ashwin's TMD & TMJ Clinic";
    document.body.classList.add('is-about-page');
    window.scrollTo(0, 0);

    return () => {
      document.body.classList.remove('is-about-page');
    };
  }, []);

  return (
    <>
      <main className="about-page-main">
        <div className="container">
          <AboutHero />
          <div className="about-cards-wrapper">
            <OurStoryCard />
            <DoctorCard />
            <PhilosophySection />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;
