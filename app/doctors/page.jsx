import DoctorCard from '@/components/DoctorCard';
import DoctorMission from '@/components/DoctorMission';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Our Specialist | Dr. Ashwin Ramakrishnan',
  description:
    'Meet Dr. Ashwin Ramakrishnan, MDS Oral & Maxillofacial Surgery, specializing in temporomandibular disorders (TMD) and neuromuscular jaw care in Kozhikode.',
};

export default function DoctorsPage() {
  return (
    <>
      <main className="about-page-main" style={{ paddingTop: '100px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#EDAA12',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                background: 'rgba(237, 170, 18, 0.12)',
                padding: '0.35rem 1.1rem',
                borderRadius: '9999px',
                border: '1px solid rgba(237, 170, 18, 0.25)',
                display: 'inline-block',
                marginBottom: '1rem',
              }}
            >
              Clinical Leadership
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: '#1E1E1E',
                marginBottom: '1rem',
              }}
            >
              Meet Your TMD Specialist
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.05rem',
                color: '#666',
                maxWidth: '620px',
                margin: '0 auto',
              }}
            >
              Dedicated exclusively to TMJ disorders, craniofacial pain, bite balance, and restorative jaw care.
            </p>
          </div>

          <div className="about-cards-wrapper" style={{ marginBottom: '4rem' }}>
            <DoctorCard />
          </div>
        </div>

        <DoctorMission />

        <div className="container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '2rem',
              color: '#1E1E1E',
              marginBottom: '1rem',
            }}
          >
            Ready for a dedicated assessment?
          </h2>
          <p
            style={{
              color: '#666',
              marginBottom: '2rem',
              maxWidth: '540px',
              margin: '0 auto 2rem auto',
            }}
          >
            Schedule your appointment directly with Dr. Ashwin at our Calicut clinic.
          </p>
          <Link href="/book-appointment" className="nav-btn-gold" style={{ display: 'inline-block', padding: '12px 32px' }}>
            Book a consultation
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
