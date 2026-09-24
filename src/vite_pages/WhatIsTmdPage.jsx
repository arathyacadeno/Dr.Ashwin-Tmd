import React, { useEffect } from 'react';
import TmdHero from '../components/what-is-tmd/TmdHero';
import BusiestJointSection from '../components/what-is-tmd/BusiestJointSection';
import DisguiseArtistSection from '../components/what-is-tmd/DisguiseArtistSection';
import UsualReasonsSection from '../components/what-is-tmd/UsualReasonsSection';
import WhenToComeSection from '../components/what-is-tmd/WhenToComeSection';
import TmdFaqSection from '../components/what-is-tmd/TmdFaqSection';
import Footer from '../components/Footer';

export const WhatIsTmdPage = () => {
  useEffect(() => {
    document.title = "What is TMD | Dr. Ashwin's TMD & TMJ Clinic";
    document.body.classList.add('is-what-is-tmd-page');
    window.scrollTo(0, 0);

    return () => {
      document.body.classList.remove('is-what-is-tmd-page');
    };
  }, []);

  return (
    <>
      <main className="tmd-page-wrapper">
        <div className="container">
          <TmdHero />
          <div className="tmd-content-wrapper">
            <BusiestJointSection />
            <DisguiseArtistSection />
            <UsualReasonsSection />
            <WhenToComeSection />
            <TmdFaqSection />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default WhatIsTmdPage;
