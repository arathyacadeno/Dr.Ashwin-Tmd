import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';

export const ContactFormSection = () => {
  const { clinicInfo, bookAppointment } = useClinic();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [symptom, setSymptom] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await bookAppointment({
        patientName: name,
        phone,
        primarySymptom: symptom || 'Jaw Pain / TMJ',
        notes: notes || 'Submitted from Contact Page form',
        date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        timeSlot: '11:15 AM'
      });

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setName('');
        setPhone('');
        setSymptom('');
        setNotes('');
      }, 3000);
    } catch (err) {
      console.error('Contact booking failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="appointment-form" style={{ paddingTop: 0, paddingBottom: '70px' }}>
      <div className="contact-cards-wrapper">
        {/* Form + Image Row */}
        <div className="contact-form-row">
          <div className="contact-image-col">
            <img
              src="/assets/images/contact_consultation_doctor.jpg"
              alt="Dr. Ashwin's TMD Consultation"
              className="contact-clinic-img"
            />
          </div>
          <div className="contact-form-col">
            <h3 className="contact-form-heading">Request an appointment</h3>
            <form className="contact-form" id="contactPageForm" onSubmit={handleSubmit}>
              <div className="contact-form-grid">
                <div className="contact-form-group">
                  <label className="contact-label">FULL NAME</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="contact-input"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="contact-form-group">
                  <label className="contact-label">PHONE NUMBER</label>
                  <input
                    type="tel"
                    placeholder="+91 00000 00000"
                    className="contact-input"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="contact-form-group">
                <label className="contact-label">PRIMARY SYMPTOM</label>
                <input
                  type="text"
                  placeholder="Jaw Pain / TMJ"
                  className="contact-input"
                  value={symptom}
                  onChange={(e) => setSymptom(e.target.value)}
                />
              </div>
              <div className="contact-form-group">
                <label className="contact-label">NOTES</label>
                <textarea
                  placeholder="Share any specific concerns..."
                  className="contact-textarea"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </div>
              <button
                type="submit"
                className="contact-submit-btn"
                disabled={isSubmitting || isSubmitted}
                style={
                  isSubmitted
                    ? { backgroundColor: '#25D366' }
                    : {
                        width: 'auto',
                        background: '#484749',
                        color: '#FFFFFF',
                        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        letterSpacing: '0.2px',
                        textTransform: 'none',
                        padding: '11px 28px',
                        borderRadius: '9999px',
                        border: 'none',
                        marginTop: '24px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 10px 24px rgba(0, 0, 0, 0.22)',
                        cursor: 'pointer'
                      }
                }
              >
                {isSubmitted ? 'Submitted! ✓' : isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>

        {/* Quick Contact & Clinic Info Grid (2-Column Aligned) */}
        <div className="contact-details-grid">
          {/* Item 1: Call Us Directly */}
          <div className="contact-detail-item">
            <a href={`tel:${clinicInfo?.phone || '+919947933999'}`} className="contact-detail-circle-icon call-blue" aria-label="Call Us Directly">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
            </a>
            <div className="contact-detail-text">
              <h4 className="contact-detail-title">Call us directly</h4>
              <a href={`tel:${clinicInfo?.phone || '+919947933999'}`} className="contact-detail-sub">
                {clinicInfo?.phone || '+91 99479 33999'}
              </a>
            </div>
          </div>

          {/* Item 2: WhatsApp Us */}
          <div className="contact-detail-item">
            <a
              href={`https://wa.me/${(clinicInfo?.whatsapp || '919947933999').replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-detail-circle-icon whatsapp-green"
              aria-label="WhatsApp Us"
            >
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.44 19.65L5.27 16.61L5.07 16.29C4.24 14.97 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.68C7.02 10.89 7.9 12.06 8.02 12.22C8.14 12.38 9.74 14.86 12.21 15.93C14.27 16.81 14.69 16.64 15.13 16.6C15.58 16.55 16.57 16.01 16.78 15.42C16.98 14.83 16.98 14.33 16.92 14.22C16.86 14.12 16.7 14.06 16.45 13.93C16.2 13.81 14.97 13.2 14.74 13.12C14.52 13.04 14.35 13 14.19 13.25C14.02 13.49 13.55 14.06 13.41 14.22C13.26 14.38 13.12 14.4 12.87 14.28C12.63 14.15 11.83 13.89 10.89 13.05C10.15 12.39 9.66 11.58 9.51 11.33C9.37 11.09 9.5 10.95 9.62 10.83C9.73 10.72 9.87 10.54 10 10.39C10.12 10.24 10.16 10.14 10.24 9.97C10.32 9.81 10.28 9.67 10.22 9.54C10.16 9.42 9.69 8.27 9.5 7.79C9.31 7.33 9.11 7.4 8.95 7.39C8.81 7.39 8.65 7.33 8.53 7.33Z" />
              </svg>
            </a>
            <div className="contact-detail-text">
              <h4 className="contact-detail-title">WhatsApp us</h4>
              <a
                href={`https://wa.me/${(clinicInfo?.whatsapp || '919947933999').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-detail-sub"
              >
                Immediate response during hours
              </a>
            </div>
          </div>

          {/* Item 3: Working Hours */}
          <div className="contact-detail-item">
            <div className="contact-detail-circle-icon clock-gold" aria-label="Working Hours">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
              </svg>
            </div>
            <div className="contact-detail-text">
              <h4 className="contact-detail-title">Working hours</h4>
              <div className="contact-hours-list">
                {clinicInfo?.hours?.map((h, i) => (
                  <div key={i} className="contact-hours-row">
                    <span className="hours-day">{h.days}</span>
                    <span className="hours-time">{h.time}</span>
                  </div>
                )) || (
                  <>
                    <div className="contact-hours-row">
                      <span className="hours-day">Monday to Friday</span>
                      <span className="hours-time">9:30 AM to 5:30 PM</span>
                    </div>
                    <div className="contact-hours-row">
                      <span className="hours-day">Saturday</span>
                      <span className="hours-time">9:30 AM to 12:00 PM</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Item 4: Clinic Location */}
          <div className="contact-detail-item">
            <div className="contact-detail-circle-icon location-red" aria-label="Clinic Location">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
            <div className="contact-detail-text">
              <h4 className="contact-detail-title">Clinic location</h4>
              <p className="contact-location-address">
                {clinicInfo?.address || 'Asoka Hospital Compound, 17/6, Bank Road, Opposite Malabar Gold, Polpaya Mana, Tazhekkod, Kozhikode, Kerala 673001'}
              </p>
              <p className="contact-location-email">
                <strong>Email:</strong>{' '}
                <a href={`mailto:${clinicInfo?.email || 'info@drashwintmd.com'}`}>
                  {clinicInfo?.email || 'info@drashwintmd.com'}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Map View Section */}
        <div className="contact-map-wrapper">
          <iframe
            src={`https://maps.google.com/maps?q=${encodeURIComponent(clinicInfo?.mapQuery || 'Asoka Hospital Bank Road Kozhikode Kerala')}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Dr. Ashwin's TMD Clinic Location Map"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
