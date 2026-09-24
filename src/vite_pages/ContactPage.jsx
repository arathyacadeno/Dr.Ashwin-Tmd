import React, { useEffect } from 'react';
import ContactHero from '../components/contact/ContactHero';
import ContactFormSection from '../components/contact/ContactFormSection';
import Footer from '../components/Footer';

export const ContactPage = () => {
  useEffect(() => {
    document.title = "Book Your Consultation | Dr. Ashwin's TMD Clinic Kozhikode";
    document.body.classList.add('is-contact-page');
    window.scrollTo(0, 0);

    return () => {
      document.body.classList.remove('is-contact-page');
    };
  }, []);

  return (
    <>
      <main className="contact-page-main">
        <div className="container">
          <ContactHero />
          <ContactFormSection />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
