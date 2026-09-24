import ContactHero from '@/components/ContactHero';
import AppointmentForm from '@/components/AppointmentForm';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Book Your Consultation | Contact Us',
  description:
    'Book a consultation with TMJ and TMD specialist Dr. Ashwin in Kozhikode. Get in touch for advanced non-invasive jaw pain relief.',
};

export default function ContactPage() {
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
