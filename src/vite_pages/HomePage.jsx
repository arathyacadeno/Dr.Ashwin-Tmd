import React, { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import DoctorMission from '../components/home/DoctorMission';
import LifestyleTransformations from '../components/home/LifestyleTransformations';
import TreatmentsStrips from '../components/home/TreatmentsStrips';
import EquipmentSection from '../components/home/EquipmentSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import RealStories from '../components/home/RealStories';
import PreFooterCta from '../components/PreFooterCta';
import Footer from '../components/Footer';

export const HomePage = () => {
  useEffect(() => {
    document.title = "Dr. Ashwin's TMD Clinic | TMJ & TMD Care, Kozhikode";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <HeroSection />
      <DoctorMission />
      <LifestyleTransformations />
      <TreatmentsStrips />
      <EquipmentSection />
      <WhyChooseUs />
      <RealStories />
      <PreFooterCta />
      <Footer />
    </main>
  );
};

export default HomePage;
