import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useClinic } from '../context/ClinicContext';
import { Link } from 'react-router-dom';

export const PatientDashboard = () => {
  const { user, logout } = useAuth();
  const { appointments, openBookingModal } = useClinic();

  // Find appointments relevant to this patient
  const patientAppointments = appointments.filter(
    (a) =>
      a.patientName?.toLowerCase().includes(user?.name?.toLowerCase() || '') ||
      a.email === user?.email
  );

  const upcomingAppointment = patientAppointments[0] || appointments[0];

  return (
    <div style={{ backgroundColor: '#F0F0F0', minHeight: '90vh', padding: '3rem 1rem' }}>
      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Top Header Card */}
        <div
          style={{
            backgroundColor: '#1E1E1E',
            color: '#FFFFFF',
            borderRadius: '24px',
            padding: '2.5rem',
            marginBottom: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
            boxShadow: '0 12px 35px rgba(0,0,0,0.15)'
          }}
        >
          <div>
            <span style={{ color: '#EDAA12', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Patient Care Portal
            </span>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: '0.4rem 0 0.2rem' }}>
              Welcome back, {user?.name || 'Patient'}
            </h1>
            <p style={{ color: '#A0A0A0', fontSize: '0.95rem', margin: 0 }}>
              TMJ &amp; TMD Rehabilitation Record — Dr. Ashwin's TMD Clinic, Kozhikode
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
            <button
              onClick={openBookingModal}
              className="nav-btn-gold"
              style={{ padding: '10px 22px', fontSize: '0.9rem', cursor: 'pointer', border: 'none' }}
            >
              Book New Session
            </button>
            <button
              onClick={logout}
              style={{
                backgroundColor: 'transparent',
                color: '#FFF',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '9999px',
                padding: '9px 18px',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {/* Card 1: Upcoming Appointment */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '1.8rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.06)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <h3 style={{ fontSize: '1.15rem', color: '#1E1E1E', margin: 0 }}>Next Scheduled Visit</h3>
              <span
                style={{
                  backgroundColor: upcomingAppointment?.status === 'Confirmed' ? '#E6F4EA' : '#FEF7E0',
                  color: upcomingAppointment?.status === 'Confirmed' ? '#137333' : '#B06000',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: 600
                }}
              >
                {upcomingAppointment?.status || 'Active'}
              </span>
            </div>

            {upcomingAppointment ? (
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#EDAA12', marginBottom: '0.3rem' }}>
                  {upcomingAppointment.date}
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 600, color: '#333', marginBottom: '0.8rem' }}>
                  Time: {upcomingAppointment.timeSlot || '10:30 AM'}
                </div>
                <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                  <strong>Doctor:</strong> Dr. Ashwin Ramakrishnan<br />
                  <strong>Consultation Type:</strong> {upcomingAppointment.primarySymptom || 'TMD Assessment'}
                </p>
                <div style={{ marginTop: '1.2rem', paddingTop: '1rem', borderTop: '1px solid #EEE', display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#555' }}>
                  <span>Consultation Fee: {upcomingAppointment.fee || '₹1,500'}</span>
                  <span style={{ color: '#137333', fontWeight: 600 }}>Confirmed at Clinic</span>
                </div>
              </div>
            ) : (
              <p style={{ color: '#777', fontSize: '0.92rem' }}>No upcoming sessions scheduled.</p>
            )}
          </div>

          {/* Card 2: Current Care Plan & Appliances */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '1.8rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.06)'
            }}
          >
            <h3 style={{ fontSize: '1.15rem', color: '#1E1E1E', margin: '0 0 1.2rem' }}>Active Therapy Plan</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(237, 170, 18, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#EDAA12',
                  fontSize: '1.4rem'
                }}
              >
                ✦
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '1rem', color: '#1E1E1E' }}>Neuromuscular Day &amp; Night Orthotic</h4>
                <span style={{ fontSize: '0.82rem', color: '#666' }}>Stage 1: Joint Disc Decompression</span>
              </div>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#555', lineHeight: 1.6, margin: 0 }}>
              Wear appliance nightly before sleep and during focused desk hours. If morning tension occurs, perform gentle 5-minute jaw rest exercises.
            </p>
            <div style={{ marginTop: '1rem', display: 'inline-block', color: '#EDAA12', fontWeight: 600, fontSize: '0.85rem' }}>
              Review Interval: Every 3 Weeks
            </div>
          </div>

          {/* Card 3: Direct Clinic Communication */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '1.8rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.06)'
            }}
          >
            <h3 style={{ fontSize: '1.15rem', color: '#1E1E1E', margin: '0 0 1.2rem' }}>Direct Clinic Support</h3>
            <p style={{ fontSize: '0.88rem', color: '#555', lineHeight: 1.6 }}>
              Have questions regarding your orthotic appliance fit, unexpected joint soreness, or need to adjust your slot?
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '1.2rem' }}>
              <a
                href="https://wa.me/919947933999"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: '#25D366',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  padding: '10px 18px',
                  borderRadius: '9999px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  textAlign: 'center'
                }}
              >
                WhatsApp Dr. Ashwin’s Team
              </a>
              <a
                href="tel:+919947933999"
                style={{
                  backgroundColor: '#F0F0F0',
                  color: '#1E1E1E',
                  textDecoration: 'none',
                  padding: '10px 18px',
                  borderRadius: '9999px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  textAlign: 'center'
                }}
              >
                Call Clinic (+91 99479 33999)
              </a>
            </div>
          </div>
        </div>

        {/* Recent History Table */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.06)'
          }}
        >
          <h3 style={{ fontSize: '1.2rem', color: '#1E1E1E', marginBottom: '1.2rem' }}>Consultation &amp; Visit History</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #EAEAEA', color: '#666', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>ID</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Date</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Concern / Assessment</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Specialist</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.slice(0, 4).map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #F0F0F0' }}>
                    <td style={{ padding: '1rem', fontWeight: 600, color: '#1E1E1E' }}>{item.id}</td>
                    <td style={{ padding: '1rem', color: '#555' }}>{item.date}</td>
                    <td style={{ padding: '1rem', color: '#333' }}>{item.primarySymptom}</td>
                    <td style={{ padding: '1rem', color: '#555' }}>Dr. Ashwin Ramakrishnan</td>
                    <td style={{ padding: '1rem' }}>
                      <span
                        style={{
                          backgroundColor: item.status === 'Completed' ? '#E6F4EA' : item.status === 'Confirmed' ? '#E8F0FE' : '#FEF7E0',
                          color: item.status === 'Completed' ? '#137333' : item.status === 'Confirmed' ? '#1967D2' : '#B06000',
                          padding: '3px 10px',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: 600
                        }}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
