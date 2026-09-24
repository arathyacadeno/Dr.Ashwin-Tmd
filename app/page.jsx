import Hero from '@/components/Hero';
import DoctorMission from '@/components/DoctorMission';
import LifestyleTransformations from '@/components/LifestyleTransformations';
import TreatmentsStrips from '@/components/TreatmentsStrips';
import EquipmentSection from '@/components/EquipmentSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

export const metadata = {
  title: "Dr. Ashwin's TMD Clinic | TMJ & TMD Care, Kozhikode",
  description:
    'Expert care for TMJ/TMD disorders using advanced diagnostics and non-invasive treatments to restore comfort and jaw function. Led by Dr. Ashwin in Kozhikode (Calicut), Kerala.',
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <DoctorMission />
      <LifestyleTransformations />
      <TreatmentsStrips />
      <EquipmentSection />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </main>
  );
}
