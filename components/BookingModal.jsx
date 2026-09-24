'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function BookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    primarySymptom: 'Jaw Clicking & Pain',
    date: '2026-09-15',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    window.addEventListener('open-booking-modal', handleOpen);
    window.addEventListener('close-booking-modal', handleClose);

    // Also listen for hash changes or click on elements with [href="#bookingModal"]
    const handleGlobalClick = (e) => {
      const target = e.target.closest('a[href="#bookingModal"]');
      if (target) {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    document.addEventListener('click', handleGlobalClick);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('open-booking-modal', handleOpen);
      window.removeEventListener('close-booking-modal', handleClose);
      document.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit appointment request');
      }

      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setIsOpen(false);
        setFormData({
          fullName: '',
          phone: '',
          primarySymptom: 'Jaw Clicking & Pain',
          date: '2026-09-15',
          notes: '',
        });
      }, 2500);
    } catch (err) {
      setErrorMessage(err.message || 'An error occurred. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay active" id="bookingModal" onClick={() => setIsOpen(false)}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-x"
          id="modalCloseBtn"
          onClick={() => setIsOpen(false)}
          aria-label="Close modal"
        >
          ×
        </button>

        <div className="modal-brand-header">
          <Image
            src="/assets/images/logo.png"
            alt="Dr. Ashwin's TMD Clinic"
            width={48}
            height={48}
            className="modal-brand-logo-img"
          />
          <div>
            <h3 className="modal-brand-title">Book a consultation</h3>
            <span className="modal-brand-sub">Dr. Ashwin&apos;s TMD Clinic</span>
          </div>
        </div>

        <p style={{ color: '#666666', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
          Schedule a 1-on-1 assessment with Dr. Ashwin for TMJ and jaw pain relief.
        </p>

        {submitSuccess ? (
          <div
            style={{
              padding: '2rem 1rem',
              textAlign: 'center',
              background: 'rgba(237, 170, 18, 0.08)',
              borderRadius: '12px',
              border: '1px solid #EDAA12',
            }}
          >
            <div style={{ fontSize: '2rem', color: '#EDAA12', marginBottom: '0.5rem' }}>✓</div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
              Request Received
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#444' }}>
              Thank you, {formData.fullName}! Dr. Ashwin&apos;s clinic team will contact you shortly to confirm your consultation.
            </p>
          </div>
        ) : (
          <form id="consultationForm" onSubmit={handleSubmit}>
            {errorMessage && (
              <div
                style={{
                  color: '#dc2626',
                  background: '#fee2e2',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  marginBottom: '1rem',
                  fontSize: '0.85rem',
                }}
              >
                {errorMessage}
              </div>
            )}

            <div className="form-field-group">
              <label className="form-field-label" htmlFor="modalName">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                className="form-text-input"
                id="modalName"
                placeholder="e.g. John Doe"
                required
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="form-field-group">
              <label className="form-field-label" htmlFor="modalPhone">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                className="form-text-input"
                id="modalPhone"
                placeholder="+91 98765 43210"
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-field-group">
              <label className="form-field-label" htmlFor="modalConcern">
                Primary Concern / Symptoms
              </label>
              <select
                className="form-text-input"
                name="primarySymptom"
                id="modalConcern"
                value={formData.primarySymptom}
                onChange={handleChange}
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
                name="date"
                className="form-text-input"
                id="modalDate"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="nav-btn-gold"
              disabled={isSubmitting}
              style={{
                width: '100%',
                marginTop: '1rem',
                padding: '0.9rem',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.7 : 1,
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Confirm Consultation Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
