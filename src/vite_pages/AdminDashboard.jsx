import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useClinic } from '../context/ClinicContext';
import { Link } from 'react-router-dom';

export const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const {
    clinicInfo,
    services,
    doctors,
    appointments,
    faqs,
    testimonials,
    fees,
    updateAppointmentStatus,
    updateDoctor,
    updateService,
    updateFaq,
    addFaq,
    deleteFaq,
    updateTestimonial,
    addTestimonial,
    deleteTestimonial,
    updateClinicInfo,
    updateFee
  } = useClinic();

  const [activeTab, setActiveTab] = useState('overview');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal / Edit state
  const [editingItem, setEditingItem] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Forms states
  const [faqForm, setFaqForm] = useState({ question: '', answer: '' });
  const [testimonialForm, setTestimonialForm] = useState({ name: '', text: '', stars: 5, timeAgo: 'Recently' });
  const [clinicForm, setClinicForm] = useState(clinicInfo || {});

  // Stats calculation
  const totalAppointments = appointments.length;
  const pendingAppointments = appointments.filter((a) => a.status === 'Pending').length;
  const confirmedAppointments = appointments.filter((a) => a.status === 'Confirmed').length;
  const completedAppointments = appointments.filter((a) => a.status === 'Completed').length;

  const filteredAppointments = appointments.filter((a) => {
    if (statusFilter === 'All') return true;
    return a.status === statusFilter;
  });

  return (
    <div style={{ backgroundColor: '#141414', minHeight: '100vh', color: '#F0F0F0', padding: '2rem 1.5rem' }}>
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>
        {/* Top Navigation & Status Bar */}
        <header
          style={{
            backgroundColor: '#1E1E1E',
            border: '1px solid rgba(237, 170, 18, 0.25)',
            borderRadius: '20px',
            padding: '1.2rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <img src="/assets/images/logo.png" alt="Logo" style={{ width: '42px', height: 'auto' }} />
              <div>
                <span style={{ color: '#EDAA12', fontWeight: 800, fontSize: '0.92rem', letterSpacing: '0.08em', display: 'block' }}>
                  DR ASHWIN’S
                </span>
                <span style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.68rem', letterSpacing: '0.2em', display: 'block' }}>
                  ADMIN PORTAL
                </span>
              </div>
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.88rem', color: '#AAA' }}>
              Logged in: <strong style={{ color: '#EDAA12' }}>{user?.name || 'Administrator'}</strong>
            </span>
            <Link
              to="/"
              style={{
                backgroundColor: 'rgba(255,255,255,0.08)',
                color: '#FFF',
                textDecoration: 'none',
                padding: '7px 16px',
                borderRadius: '9999px',
                fontSize: '0.82rem'
              }}
            >
              View Public Website
            </Link>
            <button
              onClick={logout}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#FFF',
                padding: '7px 16px',
                borderRadius: '9999px',
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              Log Out
            </button>
          </div>
        </header>

        {/* Tab Navigation Pill Bar */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '1rem',
            marginBottom: '1.5rem',
            scrollbarWidth: 'none'
          }}
        >
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'appointments', label: `Appointments (${pendingAppointments} Pending)` },
            { id: 'doctors', label: 'Doctors' },
            { id: 'services', label: 'Treatments & Services' },
            { id: 'fees', label: 'Consultation Fees' },
            { id: 'faqs', label: 'FAQs' },
            { id: 'testimonials', label: 'Patient Stories' },
            { id: 'settings', label: 'Clinic Information' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setEditingItem(null);
                setIsAddingNew(false);
              }}
              style={{
                padding: '10px 20px',
                borderRadius: '9999px',
                border: activeTab === tab.id ? '1px solid #EDAA12' : '1px solid rgba(255,255,255,0.1)',
                backgroundColor: activeTab === tab.id ? '#EDAA12' : '#1E1E1E',
                color: activeTab === tab.id ? '#1E1E1E' : '#C4C4C4',
                fontWeight: activeTab === tab.id ? 700 : 500,
                fontSize: '0.88rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ==========================================================
            TAB 1: OVERVIEW
            ========================================================== */}
        {activeTab === 'overview' && (
          <div>
            {/* Quick Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem', marginBottom: '2rem' }}>
              <div style={{ backgroundColor: '#1E1E1E', padding: '1.6rem', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ fontSize: '0.8rem', color: '#9E9E9E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Appointments</span>
                <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#EDAA12', margin: '0.4rem 0' }}>{totalAppointments}</div>
                <span style={{ fontSize: '0.82rem', color: '#25D366' }}>All recorded patient bookings</span>
              </div>

              <div style={{ backgroundColor: '#1E1E1E', padding: '1.6rem', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ fontSize: '0.8rem', color: '#9E9E9E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pending Review</span>
                <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#FFB020', margin: '0.4rem 0' }}>{pendingAppointments}</div>
                <span style={{ fontSize: '0.82rem', color: '#AAA' }}>Awaiting coordinator call</span>
              </div>

              <div style={{ backgroundColor: '#1E1E1E', padding: '1.6rem', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ fontSize: '0.8rem', color: '#9E9E9E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Confirmed Bookings</span>
                <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#25D366', margin: '0.4rem 0' }}>{confirmedAppointments}</div>
                <span style={{ fontSize: '0.82rem', color: '#AAA' }}>Scheduled at Kozhikode Clinic</span>
              </div>

              <div style={{ backgroundColor: '#1E1E1E', padding: '1.6rem', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ fontSize: '0.8rem', color: '#9E9E9E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Completed Sessions</span>
                <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#64B5F6', margin: '0.4rem 0' }}>{completedAppointments}</div>
                <span style={{ fontSize: '0.82rem', color: '#AAA' }}>Consultations done</span>
              </div>
            </div>

            {/* Quick Actions & Recent List */}
            <div
              style={{
                backgroundColor: '#1E1E1E',
                borderRadius: '20px',
                padding: '2rem',
                border: '1px solid rgba(255,255,255,0.08)',
                marginBottom: '2rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', margin: 0 }}>Recent Consultation Bookings</h3>
                <button
                  onClick={() => setActiveTab('appointments')}
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid #EDAA12',
                    color: '#EDAA12',
                    padding: '6px 16px',
                    borderRadius: '9999px',
                    fontSize: '0.82rem',
                    cursor: 'pointer'
                  }}
                >
                  View All Appointments →
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#888', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                      <th style={{ padding: '0.75rem 1rem' }}>ID</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Patient Name</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Phone</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Date &amp; Time</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Primary Symptom</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.slice(0, 5).map((appt) => (
                      <tr key={appt.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '1rem', color: '#EDAA12', fontWeight: 600 }}>{appt.id}</td>
                        <td style={{ padding: '1rem', color: '#FFF', fontWeight: 600 }}>{appt.patientName}</td>
                        <td style={{ padding: '1rem', color: '#AAA' }}>{appt.phone}</td>
                        <td style={{ padding: '1rem', color: '#AAA' }}>{appt.date} • {appt.timeSlot}</td>
                        <td style={{ padding: '1rem', color: '#DDD' }}>{appt.primarySymptom}</td>
                        <td style={{ padding: '1rem' }}>
                          <span
                            style={{
                              backgroundColor:
                                appt.status === 'Confirmed'
                                  ? 'rgba(37, 211, 102, 0.2)'
                                  : appt.status === 'Completed'
                                  ? 'rgba(100, 181, 246, 0.2)'
                                  : appt.status === 'Cancelled'
                                  ? 'rgba(235, 87, 87, 0.2)'
                                  : 'rgba(255, 176, 32, 0.2)',
                              color:
                                appt.status === 'Confirmed'
                                  ? '#25D366'
                                  : appt.status === 'Completed'
                                  ? '#64B5F6'
                                  : appt.status === 'Cancelled'
                                  ? '#FF6B6B'
                                  : '#FFB020',
                              padding: '3px 10px',
                              borderRadius: '9999px',
                              fontSize: '0.75rem',
                              fontWeight: 600
                            }}
                          >
                            {appt.status}
                          </span>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <select
                            value={appt.status}
                            onChange={(e) => updateAppointmentStatus(appt.id, e.target.value)}
                            style={{
                              backgroundColor: '#282828',
                              color: '#FFF',
                              border: '1px solid rgba(255,255,255,0.2)',
                              borderRadius: '6px',
                              padding: '4px 8px',
                              fontSize: '0.8rem',
                              cursor: 'pointer'
                            }}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================================
            TAB 2: APPOINTMENTS MANAGEMENT
            ========================================================== */}
        {activeTab === 'appointments' && (
          <div style={{ backgroundColor: '#1E1E1E', borderRadius: '20px', padding: '2rem', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.8rem' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', color: '#FFF', margin: 0 }}>Consultation Appointments</h3>
                <span style={{ fontSize: '0.85rem', color: '#888' }}>Review patient symptoms, contact information, and update booking status</span>
              </div>

              {/* Status Filter */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    style={{
                      backgroundColor: statusFilter === status ? '#EDAA12' : '#282828',
                      color: statusFilter === status ? '#1E1E1E' : '#AAA',
                      border: 'none',
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#888', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                    <th style={{ padding: '0.75rem 1rem' }}>ID</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Patient Name</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Phone Number</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Date &amp; Slot</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Symptom &amp; Notes</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Status</th>
                    <th style={{ padding: '0.75rem 1rem' }}>Change Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appt) => (
                    <tr key={appt.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '1rem', color: '#EDAA12', fontWeight: 600 }}>{appt.id}</td>
                      <td style={{ padding: '1rem', color: '#FFF', fontWeight: 600 }}>{appt.patientName}</td>
                      <td style={{ padding: '1rem' }}>
                        <a href={`tel:${appt.phone}`} style={{ color: '#64B5F6', textDecoration: 'none' }}>
                          {appt.phone}
                        </a>
                      </td>
                      <td style={{ padding: '1rem', color: '#AAA' }}>{appt.date} • {appt.timeSlot}</td>
                      <td style={{ padding: '1rem', maxWidth: '280px' }}>
                        <div style={{ color: '#FFF', fontWeight: 500 }}>{appt.primarySymptom}</div>
                        {appt.notes && <div style={{ color: '#777', fontSize: '0.8rem', marginTop: '2px' }}>{appt.notes}</div>}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span
                          style={{
                            backgroundColor:
                              appt.status === 'Confirmed'
                                ? 'rgba(37, 211, 102, 0.2)'
                                : appt.status === 'Completed'
                                ? 'rgba(100, 181, 246, 0.2)'
                                : appt.status === 'Cancelled'
                                ? 'rgba(235, 87, 87, 0.2)'
                                : 'rgba(255, 176, 32, 0.2)',
                            color:
                              appt.status === 'Confirmed'
                                ? '#25D366'
                                : appt.status === 'Completed'
                                ? '#64B5F6'
                                : appt.status === 'Cancelled'
                                ? '#FF6B6B'
                                : '#FFB020',
                            padding: '4px 12px',
                            borderRadius: '9999px',
                            fontSize: '0.78rem',
                            fontWeight: 600
                          }}
                        >
                          {appt.status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <select
                          value={appt.status}
                          onChange={(e) => updateAppointmentStatus(appt.id, e.target.value)}
                          style={{
                            backgroundColor: '#282828',
                            color: '#FFF',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '6px',
                            padding: '5px 10px',
                            fontSize: '0.82rem',
                            cursor: 'pointer'
                          }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==========================================================
            TAB 3: DOCTORS MANAGEMENT
            ========================================================== */}
        {activeTab === 'doctors' && (
          <div style={{ backgroundColor: '#1E1E1E', borderRadius: '20px', padding: '2rem', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 style={{ fontSize: '1.3rem', color: '#FFF', marginBottom: '1.5rem' }}>Specialist Doctors</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
              {doctors.map((doc) => (
                <div
                  key={doc.id}
                  style={{
                    backgroundColor: '#282828',
                    borderRadius: '16px',
                    padding: '1.8rem',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                    <img
                      src={doc.image || '/assets/images/og image.png'}
                      alt={doc.name}
                      style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #EDAA12' }}
                    />
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1.15rem', color: '#FFF' }}>{doc.name}</h4>
                      <span style={{ color: '#EDAA12', fontSize: '0.82rem', fontWeight: 600 }}>{doc.qualification}</span>
                      <div style={{ fontSize: '0.78rem', color: '#888' }}>{doc.specialization}</div>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: '#BBB', lineHeight: 1.6, marginBottom: '1.2rem' }}>{doc.bio}</p>

                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: '#25D366' }}>● Status: {doc.status || 'Active'}</span>
                    <button
                      onClick={() => setEditingItem({ type: 'doctor', data: doc })}
                      style={{
                        backgroundColor: '#EDAA12',
                        color: '#1E1E1E',
                        border: 'none',
                        borderRadius: '9999px',
                        padding: '6px 16px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Edit Bio / Info
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Doctor Edit Form Modal */}
            {editingItem?.type === 'doctor' && (
              <div
                style={{
                  position: 'fixed',
                  inset: 0,
                  backgroundColor: 'rgba(0,0,0,0.75)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 99999,
                  padding: '1rem'
                }}
              >
                <div style={{ backgroundColor: '#1E1E1E', padding: '2rem', borderRadius: '20px', maxWidth: '550px', width: '100%', border: '1px solid #EDAA12' }}>
                  <h3 style={{ marginTop: 0, color: '#FFF' }}>Edit Doctor Profile</h3>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#AAA', marginBottom: '0.3rem' }}>Doctor Name</label>
                    <input
                      type="text"
                      defaultValue={editingItem.data.name}
                      id="editDocName"
                      style={{ width: '100%', padding: '0.7rem', backgroundColor: '#282828', border: '1px solid #444', color: '#FFF', borderRadius: '8px' }}
                    />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#AAA', marginBottom: '0.3rem' }}>Qualifications</label>
                    <input
                      type="text"
                      defaultValue={editingItem.data.qualification}
                      id="editDocQual"
                      style={{ width: '100%', padding: '0.7rem', backgroundColor: '#282828', border: '1px solid #444', color: '#FFF', borderRadius: '8px' }}
                    />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#AAA', marginBottom: '0.3rem' }}>Biography</label>
                    <textarea
                      rows={4}
                      defaultValue={editingItem.data.bio}
                      id="editDocBio"
                      style={{ width: '100%', padding: '0.7rem', backgroundColor: '#282828', border: '1px solid #444', color: '#FFF', borderRadius: '8px' }}
                    ></textarea>
                  </div>
                  <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => setEditingItem(null)}
                      style={{ backgroundColor: 'transparent', color: '#AAA', border: '1px solid #444', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        const name = document.getElementById('editDocName').value;
                        const qualification = document.getElementById('editDocQual').value;
                        const bio = document.getElementById('editDocBio').value;
                        updateDoctor(editingItem.data.id, { name, qualification, bio });
                        setEditingItem(null);
                      }}
                      style={{ backgroundColor: '#EDAA12', color: '#1E1E1E', border: 'none', padding: '8px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==========================================================
            TAB 4: TREATMENTS & SERVICES
            ========================================================== */}
        {activeTab === 'services' && (
          <div style={{ backgroundColor: '#1E1E1E', borderRadius: '20px', padding: '2rem', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 style={{ fontSize: '1.3rem', color: '#FFF', marginBottom: '1.5rem' }}>Treatments &amp; Therapy Procedures</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {services.map((srv) => (
                <div
                  key={srv.id}
                  style={{
                    backgroundColor: '#282828',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <span style={{ fontSize: '0.75rem', color: '#EDAA12', fontWeight: 700, textTransform: 'uppercase' }}>
                    {srv.category || 'Therapy'}
                  </span>
                  <h4 style={{ margin: '0.4rem 0', fontSize: '1.1rem', color: '#FFF' }}>{srv.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#AAA', lineHeight: 1.5, marginBottom: '1.2rem' }}>
                    {srv.shortDesc}
                  </p>
                  <button
                    onClick={() => setEditingItem({ type: 'service', data: srv })}
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid #EDAA12',
                      color: '#EDAA12',
                      borderRadius: '9999px',
                      padding: '5px 14px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Edit Description
                  </button>
                </div>
              ))}
            </div>

            {/* Service Edit Modal */}
            {editingItem?.type === 'service' && (
              <div
                style={{
                  position: 'fixed',
                  inset: 0,
                  backgroundColor: 'rgba(0,0,0,0.75)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 99999,
                  padding: '1rem'
                }}
              >
                <div style={{ backgroundColor: '#1E1E1E', padding: '2rem', borderRadius: '20px', maxWidth: '500px', width: '100%', border: '1px solid #EDAA12' }}>
                  <h3 style={{ marginTop: 0, color: '#FFF' }}>Edit Treatment</h3>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#AAA', marginBottom: '0.3rem' }}>Treatment Name</label>
                    <input
                      type="text"
                      defaultValue={editingItem.data.title}
                      id="editSrvTitle"
                      style={{ width: '100%', padding: '0.7rem', backgroundColor: '#282828', border: '1px solid #444', color: '#FFF', borderRadius: '8px' }}
                    />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#AAA', marginBottom: '0.3rem' }}>Description</label>
                    <textarea
                      rows={4}
                      defaultValue={editingItem.data.shortDesc}
                      id="editSrvDesc"
                      style={{ width: '100%', padding: '0.7rem', backgroundColor: '#282828', border: '1px solid #444', color: '#FFF', borderRadius: '8px' }}
                    ></textarea>
                  </div>
                  <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => setEditingItem(null)}
                      style={{ backgroundColor: 'transparent', color: '#AAA', border: '1px solid #444', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        const title = document.getElementById('editSrvTitle').value;
                        const shortDesc = document.getElementById('editSrvDesc').value;
                        updateService(editingItem.data.id, { title, shortDesc });
                        setEditingItem(null);
                      }}
                      style={{ backgroundColor: '#EDAA12', color: '#1E1E1E', border: 'none', padding: '8px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==========================================================
            TAB 5: CONSULTATION FEES
            ========================================================== */}
        {activeTab === 'fees' && (
          <div style={{ backgroundColor: '#1E1E1E', borderRadius: '20px', padding: '2rem', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 style={{ fontSize: '1.3rem', color: '#FFF', marginBottom: '1.5rem' }}>Consultation &amp; Diagnostic Pricing</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {fees.map((fee) => (
                <div
                  key={fee.id}
                  style={{
                    backgroundColor: '#282828',
                    borderRadius: '16px',
                    padding: '1.8rem',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <h4 style={{ margin: '0 0 0.5rem', fontSize: '1.05rem', color: '#FFF' }}>{fee.serviceName}</h4>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#EDAA12', marginBottom: '0.4rem' }}>{fee.fee}</div>
                  <span style={{ fontSize: '0.8rem', color: '#888', display: 'block', marginBottom: '0.8rem' }}>Duration: {fee.duration}</span>
                  <p style={{ fontSize: '0.85rem', color: '#AAA', lineHeight: 1.5, marginBottom: '1.2rem' }}>{fee.description}</p>
                  <button
                    onClick={() => {
                      const newFee = prompt('Enter new fee amount for ' + fee.serviceName + ':', fee.fee);
                      if (newFee) updateFee(fee.id, { fee: newFee });
                    }}
                    style={{
                      backgroundColor: 'transparent',
                      border: '1px solid #EDAA12',
                      color: '#EDAA12',
                      borderRadius: '9999px',
                      padding: '5px 14px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Update Fee Amount
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================================
            TAB 6: FAQS MANAGEMENT
            ========================================================== */}
        {activeTab === 'faqs' && (
          <div style={{ backgroundColor: '#1E1E1E', borderRadius: '20px', padding: '2rem', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#FFF', margin: 0 }}>Frequently Asked Questions</h3>
              <button
                onClick={() => setIsAddingNew(true)}
                className="nav-btn-gold"
                style={{ padding: '8px 18px', fontSize: '0.85rem', cursor: 'pointer', border: 'none' }}
              >
                + Add New FAQ
              </button>
            </div>

            {isAddingNew && (
              <div style={{ backgroundColor: '#282828', padding: '1.5rem', borderRadius: '14px', marginBottom: '1.5rem', border: '1px solid #EDAA12' }}>
                <h4 style={{ margin: '0 0 1rem', color: '#FFF' }}>Add New Question</h4>
                <input
                  type="text"
                  placeholder="Enter Question"
                  value={faqForm.question}
                  onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                  style={{ width: '100%', padding: '0.7rem', backgroundColor: '#1E1E1E', border: '1px solid #444', color: '#FFF', borderRadius: '8px', marginBottom: '0.8rem' }}
                />
                <textarea
                  rows={3}
                  placeholder="Enter Answer"
                  value={faqForm.answer}
                  onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                  style={{ width: '100%', padding: '0.7rem', backgroundColor: '#1E1E1E', border: '1px solid #444', color: '#FFF', borderRadius: '8px', marginBottom: '1rem' }}
                ></textarea>
                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <button
                    onClick={() => {
                      if (faqForm.question && faqForm.answer) {
                        addFaq(faqForm);
                        setFaqForm({ question: '', answer: '' });
                        setIsAddingNew(false);
                      }
                    }}
                    style={{ backgroundColor: '#EDAA12', color: '#1E1E1E', border: 'none', padding: '8px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Save FAQ
                  </button>
                  <button
                    onClick={() => setIsAddingNew(false)}
                    style={{ backgroundColor: 'transparent', color: '#AAA', border: '1px solid #444', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {faqs.map((faq) => (
                <div key={faq.id} style={{ backgroundColor: '#282828', padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                    <div>
                      <h4 style={{ margin: '0 0 0.5rem', color: '#FFF', fontSize: '1rem' }}>{faq.question}</h4>
                      <p style={{ margin: 0, color: '#AAA', fontSize: '0.88rem', lineHeight: 1.5 }}>{faq.answer}</p>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm('Delete this question?')) deleteFaq(faq.id);
                      }}
                      style={{ backgroundColor: 'transparent', color: '#FF6B6B', border: 'none', cursor: 'pointer', fontSize: '0.82rem', padding: '4px' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================================
            TAB 7: TESTIMONIALS
            ========================================================== */}
        {activeTab === 'testimonials' && (
          <div style={{ backgroundColor: '#1E1E1E', borderRadius: '20px', padding: '2rem', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#FFF', margin: 0 }}>Patient Stories &amp; Testimonials</h3>
              <button
                onClick={() => setIsAddingNew(true)}
                className="nav-btn-gold"
                style={{ padding: '8px 18px', fontSize: '0.85rem', cursor: 'pointer', border: 'none' }}
              >
                + Add Patient Story
              </button>
            </div>

            {isAddingNew && (
              <div style={{ backgroundColor: '#282828', padding: '1.5rem', borderRadius: '14px', marginBottom: '1.5rem', border: '1px solid #EDAA12' }}>
                <h4 style={{ margin: '0 0 1rem', color: '#FFF' }}>Add New Review</h4>
                <input
                  type="text"
                  placeholder="Patient Name (e.g. Maya Krishnan)"
                  value={testimonialForm.name}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                  style={{ width: '100%', padding: '0.7rem', backgroundColor: '#1E1E1E', border: '1px solid #444', color: '#FFF', borderRadius: '8px', marginBottom: '0.8rem' }}
                />
                <textarea
                  rows={3}
                  placeholder="Testimonial text"
                  value={testimonialForm.text}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, text: e.target.value })}
                  style={{ width: '100%', padding: '0.7rem', backgroundColor: '#1E1E1E', border: '1px solid #444', color: '#FFF', borderRadius: '8px', marginBottom: '1rem' }}
                ></textarea>
                <div style={{ display: 'flex', gap: '0.8rem' }}>
                  <button
                    onClick={() => {
                      if (testimonialForm.name && testimonialForm.text) {
                        addTestimonial(testimonialForm);
                        setTestimonialForm({ name: '', text: '', stars: 5, timeAgo: 'Recently' });
                        setIsAddingNew(false);
                      }
                    }}
                    style={{ backgroundColor: '#EDAA12', color: '#1E1E1E', border: 'none', padding: '8px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Publish Story
                  </button>
                  <button
                    onClick={() => setIsAddingNew(false)}
                    style={{ backgroundColor: 'transparent', color: '#AAA', border: '1px solid #444', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.2rem' }}>
              {testimonials.map((t) => (
                <div key={t.id} style={{ backgroundColor: '#282828', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                    <div style={{ color: '#EDAA12', fontSize: '0.9rem' }}>{'★'.repeat(t.stars || 5)}</div>
                    <button
                      onClick={() => {
                        if (confirm('Delete this story?')) deleteTestimonial(t.id);
                      }}
                      style={{ backgroundColor: 'transparent', color: '#FF6B6B', border: 'none', cursor: 'pointer', fontSize: '0.78rem' }}
                    >
                      Remove
                    </button>
                  </div>
                  <p style={{ color: '#DDD', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '1rem' }}>“{t.text}”</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <img src={t.avatar || '/assets/images/hero_smiling_woman.jpg'} alt={t.name} style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <h5 style={{ margin: 0, color: '#FFF', fontSize: '0.9rem' }}>{t.name}</h5>
                      <span style={{ color: '#777', fontSize: '0.75rem' }}>{t.timeAgo || 'Verified Patient'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================================
            TAB 8: CLINIC SETTINGS
            ========================================================== */}
        {activeTab === 'settings' && (
          <div style={{ backgroundColor: '#1E1E1E', borderRadius: '20px', padding: '2rem', border: '1px solid rgba(255,255,255,0.08)', maxWidth: '750px' }}>
            <h3 style={{ fontSize: '1.3rem', color: '#FFF', marginBottom: '1.5rem' }}>Clinic Contact Information</h3>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#AAA', marginBottom: '0.4rem' }}>Clinic Phone Number</label>
              <input
                type="text"
                defaultValue={clinicInfo?.phone}
                id="cfgPhone"
                style={{ width: '100%', padding: '0.8rem', backgroundColor: '#282828', border: '1px solid #444', color: '#FFF', borderRadius: '8px' }}
              />
            </div>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#AAA', marginBottom: '0.4rem' }}>WhatsApp Direct Number</label>
              <input
                type="text"
                defaultValue={clinicInfo?.whatsapp}
                id="cfgWhatsapp"
                style={{ width: '100%', padding: '0.8rem', backgroundColor: '#282828', border: '1px solid #444', color: '#FFF', borderRadius: '8px' }}
              />
            </div>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#AAA', marginBottom: '0.4rem' }}>Email Address</label>
              <input
                type="email"
                defaultValue={clinicInfo?.email}
                id="cfgEmail"
                style={{ width: '100%', padding: '0.8rem', backgroundColor: '#282828', border: '1px solid #444', color: '#FFF', borderRadius: '8px' }}
              />
            </div>
            <div style={{ marginBottom: '1.2rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#AAA', marginBottom: '0.4rem' }}>Clinic Address</label>
              <textarea
                rows={3}
                defaultValue={clinicInfo?.address}
                id="cfgAddress"
                style={{ width: '100%', padding: '0.8rem', backgroundColor: '#282828', border: '1px solid #444', color: '#FFF', borderRadius: '8px' }}
              ></textarea>
            </div>
            <button
              onClick={() => {
                const phone = document.getElementById('cfgPhone').value;
                const whatsapp = document.getElementById('cfgWhatsapp').value;
                const email = document.getElementById('cfgEmail').value;
                const address = document.getElementById('cfgAddress').value;
                updateClinicInfo({ ...clinicInfo, phone, whatsapp, email, address });
              }}
              className="nav-btn-gold"
              style={{ padding: '10px 24px', cursor: 'pointer', border: 'none', fontWeight: 600 }}
            >
              Update Clinic Information
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
