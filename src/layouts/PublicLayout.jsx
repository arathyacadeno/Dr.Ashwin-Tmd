import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BookingModal from '../components/BookingModal';
import { useClinic } from '../context/ClinicContext';

export const PublicLayout = () => {
  const { toastMessage } = useClinic();

  return (
    <>
      <Navbar />
      <Outlet />
      <BookingModal />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 99999,
            background: '#1E1E1E',
            color: '#FFFFFF',
            border: '1px solid #EDAA12',
            borderRadius: '9999px',
            padding: '12px 24px',
            boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.92rem',
            animation: 'fadeIn 0.3s ease'
          }}
        >
          <span style={{ color: '#25D366', fontWeight: 'bold' }}>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
};

export default PublicLayout;
