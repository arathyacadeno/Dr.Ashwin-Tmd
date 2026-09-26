'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCms } from '@/context/CmsContext';

export default function AppointmentForm() {
  const { content } = useCms();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    primarySymptom: '',
    notes: '',
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

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

      setStatus({ loading: false, success: true, error: '' });
      setFormData({
        fullName: '',
        phone: '',
        primarySymptom: '',
        notes: '',
      });
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        error: err.message || 'An error occurred. Please try again.',
      });
    }
  };

  return (
    <section className="contact-section" id="appointment-form" style={{ paddingTop: 0, paddingBottom: 70 }}>
      <div className="contact-cards-wrapper">
        {/* Form + Image Row */}
        <div className="contact-form-row">
          <div className="contact-image-col">
            <img
              src={content?.contactFormImage || '/assets/images/contact_consultation_doctor.jpg'}
              alt="Dr. Ashwin's TMD Consultation"
              className="contact-clinic-img"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="contact-form-col">
            <h3 className="contact-form-heading">
              {content?.contactFormHeading || 'Request an appointment'}
            </h3>

            {status.success ? (
              <div
                style={{
                  padding: '2.5rem 1.5rem',
                  textAlign: 'center',
                  background: 'rgba(237, 170, 18, 0.08)',
                  borderRadius: '16px',
                  border: '1px solid #EDAA12',
                  marginTop: '1rem',
                }}
              >
                <div style={{ fontSize: '2.5rem', color: '#EDAA12', marginBottom: '0.75rem' }}>✓</div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: '#1E1E1E', marginBottom: '0.5rem' }}>
                  {content?.contactSuccessTitle || 'Appointment Request Sent'}
                </h4>
                <p style={{ fontSize: '0.95rem', color: '#555', lineHeight: 1.6 }}>
                  {content?.contactSuccessDesc ||
                    "Thank you! Our care coordinator at Dr. Ashwin's TMD Clinic will call you shortly to confirm your consultation schedule."}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus({ loading: false, success: false, error: '' })}
                  className="contact-submit-btn"
                  style={{ marginTop: '1.5rem' }}
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form className="contact-form" id="contactPageForm" onSubmit={handleSubmit}>
                {status.error && (
                  <div
                    style={{
                      color: '#dc2626',
                      background: '#fee2e2',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      marginBottom: '1rem',
                      fontSize: '0.88rem',
                    }}
                  >
                    {status.error}
                  </div>
                )}

                <div className="contact-form-grid">
                  <div className="contact-form-group">
                    <label className="contact-label">{content?.contactNameLabel || 'FULL NAME'}</label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder={content?.contactNamePlaceholder || 'Enter your name'}
                      className="contact-input"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="contact-form-group">
                    <label className="contact-label">{content?.contactPhoneLabel || 'PHONE NUMBER'}</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder={content?.contactPhonePlaceholder || '+91 00000 00000'}
                      className="contact-input"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="contact-form-group">
                  <label className="contact-label">{content?.contactSymptomLabel || 'PRIMARY SYMPTOM'}</label>
                  <input
                    type="text"
                    name="primarySymptom"
                    placeholder={content?.contactSymptomPlaceholder || 'Jaw Pain / TMJ'}
                    className="contact-input"
                    value={formData.primarySymptom}
                    onChange={handleChange}
                  />
                </div>

                <div className="contact-form-group">
                  <label className="contact-label">{content?.contactNotesLabel || 'NOTES'}</label>
                  <textarea
                    name="notes"
                    placeholder={content?.contactNotesPlaceholder || 'Share any specific concerns...'}
                    className="contact-textarea"
                    rows={1}
                    value={formData.notes}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="contact-submit-btn"
                  disabled={status.loading}
                  style={{ opacity: status.loading ? 0.7 : 1 }}
                >
                  {status.loading ? 'Submitting...' : content?.contactSubmitBtnText || 'Submit'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Quick Contact & Clinic Info Grid (2-Column Aligned) */}
        <div className="contact-details-grid">
          {/* Item 1: Call Us Directly */}
          <div className="contact-detail-item">
            <a
              href={`tel:${(content?.contactPhone || '+91 94970 88200').replace(/\s+/g, '')}`}
              className="contact-detail-circle-icon call-blue"
              aria-label="Call Us Directly"
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path
                  fill="currentColor"
                  d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                />
              </svg>
            </a>
            <div className="contact-detail-text">
              <h4 className="contact-detail-title">Call us directly</h4>
              <a href={`tel:${(content?.contactPhone || '+91 94970 88200').replace(/\s+/g, '')}`} className="contact-detail-sub">
                {content?.contactPhone || '+91 94970 88200'}
              </a>
            </div>
          </div>

          {/* Item 2: WhatsApp Us */}
          <div className="contact-detail-item">
            <a
              href={`https://wa.me/${(content?.contactWhatsApp || '919947933999').replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-detail-circle-icon whatsapp-green"
              aria-label="WhatsApp Us"
            >
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path
                  fill="currentColor"
                  d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.44 19.65L5.27 16.61L5.07 16.29C4.24 14.97 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.68C7.02 10.89 7.9 12.06 8.02 12.22C8.14 12.38 9.74 14.86 12.21 15.93C14.27 16.81 14.69 16.64 15.13 16.6C15.58 16.55 16.57 16.01 16.78 15.42C16.98 14.83 16.98 14.33 16.92 14.22C16.86 14.12 16.7 14.06 16.45 13.93C16.2 13.81 14.97 13.2 14.74 13.12C14.52 13.04 14.35 13 14.19 13.25C14.02 13.49 13.55 14.06 13.41 14.22C13.26 14.38 13.12 14.4 12.87 14.28C12.63 14.15 11.83 13.89 10.89 13.05C10.15 12.39 9.66 11.58 9.51 11.33C9.37 11.09 9.5 10.95 9.62 10.83C9.73 10.72 9.87 10.54 10 10.39C10.12 10.24 10.16 10.14 10.24 9.97C10.32 9.81 10.28 9.67 10.22 9.54C10.16 9.42 9.69 8.27 9.5 7.79C9.31 7.33 9.11 7.4 8.95 7.39C8.81 7.39 8.65 7.33 8.53 7.33Z"
                />
              </svg>
            </a>
            <div className="contact-detail-text">
              <h4 className="contact-detail-title">WhatsApp us</h4>
              <a
                href={`https://wa.me/${(content?.contactWhatsApp || '919947933999').replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-detail-sub"
              >
                {content?.contactWhatsApp || '+91 99479 33999'}
              </a>
            </div>
          </div>

          {/* Item 3: Working Hours */}
          <div className="contact-detail-item">
            <div className="contact-detail-circle-icon clock-gold" aria-label="Working Hours">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path
                  fill="currentColor"
                  d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
                />
              </svg>
            </div>
            <div className="contact-detail-text">
              <h4 className="contact-detail-title">Working hours</h4>
              <div className="contact-hours-list">
                <div className="contact-hours-row">
                  <span className="hours-day">Monday to Friday</span>
                  <span className="hours-time">{content?.contactHoursWeekdays || '9:30 AM to 5:30 PM'}</span>
                </div>
                <div className="contact-hours-row">
                  <span className="hours-day">Saturday</span>
                  <span className="hours-time">{content?.contactHoursSaturday || '9:30 AM to 12:00 PM'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Item 4: Clinic Location */}
          <div className="contact-detail-item">
            <div className="contact-detail-circle-icon location-red" aria-label="Clinic Location">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path
                  fill="currentColor"
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                />
              </svg>
            </div>
            <div className="contact-detail-text">
              <h4 className="contact-detail-title">Clinic location</h4>
              <p className="contact-location-address">
                {content?.contactAddress || 'Asoka Hospital Compound, 17/6, Bank Road, Opposite Malabar Gold, Polpaya Mana, Tazhekkod, Kozhikode, Kerala 673001'}
              </p>
              <p className="contact-location-email">
                <strong>Email:</strong>{' '}
                <a href={`mailto:${content?.contactEmail || 'info@drashwintmd.com'}`}>{content?.contactEmail || 'info@drashwintmd.com'}</a>
              </p>
            </div>
          </div>
        </div>

        {/* Map View Section */}
        <div className="contact-map-wrapper">
          <iframe
            src={getGoogleMapsEmbedUrl(content?.contactMapQuery || 'Asoka Hospital Bank Road Kozhikode Kerala')}
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
}

export function getGoogleMapsEmbedUrl(input) {
  if (!input || typeof input !== 'string') {
    return 'https://maps.google.com/maps?q=Asoka%20Hospital%20Bank%20Road%20Kozhikode%20Kerala&t=&z=15&ie=UTF8&iwloc=&output=embed';
  }

  const trimmed = input.trim();

  // 1. If user pasted an iframe embed tag: <iframe src="https://..."></iframe>
  const iframeMatch = trimmed.match(/src=["']([^"']+)["']/i);
  if (iframeMatch && iframeMatch[1]) {
    return iframeMatch[1];
  }

  // 2. Direct embed URL
  if (trimmed.includes('/maps/embed')) {
    return trimmed;
  }

  // 3. Google Maps place or search URL
  if (trimmed.includes('google.com/maps') || trimmed.includes('maps.google.') || trimmed.includes('goo.gl/maps') || trimmed.includes('maps.app.goo.gl')) {
    try {
      if (trimmed.includes('?q=') || trimmed.includes('&q=')) {
        const urlObj = new URL(trimmed);
        const q = urlObj.searchParams.get('q');
        if (q) {
          return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
        }
      }
      const placeMatch = trimmed.match(/\/place\/([^\/@?#]+)/);
      if (placeMatch && placeMatch[1]) {
        const placeName = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
        return `https://maps.google.com/maps?q=${encodeURIComponent(placeName)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
      }
    } catch {
      // Fallback
    }
  }

  // 4. Standard text query (address or clinic name)
  return `https://maps.google.com/maps?q=${encodeURIComponent(trimmed)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
}
