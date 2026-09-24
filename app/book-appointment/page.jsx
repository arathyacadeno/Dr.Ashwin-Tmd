import ContactHero from '@/components/ContactHero';
import AppointmentForm from '@/components/AppointmentForm';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Book an Appointment',
  description:
    'Schedule your 1-on-1 TMD and TMJ assessment with Dr. Ashwin in Kozhikode (Calicut), Kerala.',
};

export default function BookAppointmentPage() {
  return (
    <>
      <main className="contact-page-main">
        <div className="container">
          <ContactHero />
          <AppointmentForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
