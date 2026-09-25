import TreatmentsShowcase from '@/components/TreatmentsShowcase';
import TreatmentProcess from '@/components/TreatmentProcess';
import TreatmentJourney from '@/components/TreatmentJourney';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Treatments & Services | Non-Invasive TMJ Care, Kozhikode',
  description:
    'Explore non-invasive treatments for TMD: custom neuromuscular appliances, bite correction, airway care, and gentle jaw rehabilitation in Calicut.',
};

export default function TreatmentsPage() {
  return (
    <>
      <main className="treatments-page-main">
        <TreatmentsShowcase />
        <TreatmentProcess />
        <TreatmentJourney />
      </main>
      <Footer />
    </>
  );
}
