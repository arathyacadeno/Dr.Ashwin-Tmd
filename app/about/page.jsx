import AboutHero from '@/components/AboutHero';
import StoryRevealCard from '@/components/StoryRevealCard';
import DoctorCard from '@/components/DoctorCard';
import Footer from '@/components/Footer';

export const metadata = {
  title: "About Us | Dr. Ashwin's TMD Clinic Kozhikode",
  description:
    'A clinic built around one thing, done properly. Learn about Dr. Ashwin, his clinical philosophy, and specialized non-invasive TMJ care in Calicut, Kerala.',
};

export default function AboutPage() {
  return (
    <>
      <main className="about-page-main">
        <div className="container">
          <AboutHero />
          <div className="about-cards-wrapper">
            <StoryRevealCard />
            <DoctorCard />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
