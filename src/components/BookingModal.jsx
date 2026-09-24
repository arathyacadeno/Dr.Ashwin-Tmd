import React, { useState } from 'react';
import { useClinic } from '../context/ClinicContext';

export const BookingModal = () => {
  const { bookingModalOpen, closeBookingModal, bookAppointment } = useClinic();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [concern, setConcern] = useState('Jaw Clicking & Pain');
  const [preferredDate, setPreferredDate] = useState('2026-09-28');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!bookingModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await bookAppointment({
        patientName: fullName,
        phone,
        primarySymptom: concern,
        date: preferredDate,
        timeSlot: '10:30 AM',
        notes: `Initial consultation request for: ${concern}`
      });

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFullName('');
        setPhone('');
        closeBookingModal();
      }, 2000);
    } catch (err) {
      console.error('Booking failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`modal-overlay ${bookingModalOpen ? 'active' : ''}`}
      id="bookingModal"
      onClick={(e) => {
        if (e.target.id === 'bookingModal') closeBookingModal();
      }}
    >
      <div className="modal-box" role="dialog" aria-modal="true">
        <button
          type="button"
          className="modal-close-x"
          id="modalCloseBtn"
          onClick={closeBookingModal}
          aria-label="Close Modal"
        >
          ×
        </button>

        <div className="modal-brand-header">
          <img src="/assets/images/logo.png" alt="Dr. Ashwin's TMD Clinic" className="modal-brand-logo-img" />
          <div>
            <h3 className="modal-brand-title">Book a consultation</h3>
            <span className="modal-brand-sub">Dr. Ashwin's TMD Clinic</span>
          </div>
        </div>

        <p style={{ color: '#666666', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
          Schedule a 1-on-1 assessment with Dr. Ashwin for TMJ and jaw pain relief.
        </p>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem', background: '#F8F9FA', borderRadius: '12px' }}>
            <div style={{ fontSize: '2.5rem', color: '#25D366', marginBottom: '0.5rem' }}>✓</div>
            <h4 style={{ fontSize: '1.2rem', color: '#1E1E1E', marginBottom: '0.5rem' }}>Request Received!</h4>
            <p style={{ color: '#666666', fontSize: '0.9rem' }}>
              We have received your appointment request. Our clinic coordinator will call you to confirm your slot.
            </p>
          </div>
        ) : (
          <form id="consultationForm" onSubmit={handleSubmit}>
            <div className="form-field-group">
              <label className="form-field-label" htmlFor="modalName">
                Full Name *
              </label>
              <input
                type="text"
                className="form-text-input"
                id="modalName"
                placeholder="e.g. John Doe"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="form-field-group">
              <label className="form-field-label" htmlFor="modalPhone">
                Phone Number *
              </label>
              <input
                type="tel"
                className="form-text-input"
                id="modalPhone"
                placeholder="+91 98765 43210"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-field-group">
              <label className="form-field-label" htmlFor="modalConcern">
                Primary Concern / Symptoms
              </label>
              <select
                className="form-text-input"
                id="modalConcern"
                value={concern}
                onChange={(e) => setConcern(e.target.value)}
              >
                <option value="Jaw Clicking & Pain">Jaw Clicking &amp; Pain</option>
                <option value="Morning Headaches & Migraines">Morning Headaches &amp; Migraines</option>
                <option value="Teeth Grinding / Clenching (Bruxism)">Teeth Grinding / Clenching (Bruxism)</option>
                <option value="Locked Jaw & Restricted Opening">Locked Jaw &amp; Restricted Opening</option>
                <option value="Comprehensive Bite Assessment">Comprehensive Bite Assessment</option>
              </select>
            </div>

            <div className="form-field-group">
              <label className="form-field-label" htmlFor="modalDate">
                Preferred Date
              </label>
              <input
                type="date"
                className="form-text-input"
                id="modalDate"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="nav-btn-gold"
              disabled={isSubmitting}
              style={{ width: '100%', marginTop: '1rem', padding: '0.9rem', cursor: 'pointer', border: 'none' }}
            >
              {isSubmitting ? 'Submitting...' : 'Confirm Consultation Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
