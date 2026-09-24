import TmdHero from '@/components/TmdHero';
import BusiestJointSection from '@/components/BusiestJointSection';
import DisguiseArtistSection from '@/components/DisguiseArtistSection';
import UsualReasonsSection from '@/components/UsualReasonsSection';
import WhenToComeSection from '@/components/WhenToComeSection';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'What is TMD? | Causes, Symptoms & Diagnosis, Kozhikode',
  description:
    'What is TMD? A common, well-understood and very treatable problem with the temporomandibular joint. Understand jaw clicking, ear pain, tension headaches and treatment in Calicut.',
};

export default function WhatIsTmdPage() {
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
            <FaqSection />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
