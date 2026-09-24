import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ClinicProvider } from './context/ClinicContext';

// Layout
import PublicLayout from './layouts/PublicLayout';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import WhatIsTmdPage from './pages/WhatIsTmdPage';
import TreatmentsPage from './pages/TreatmentsPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import PatientDashboard from './pages/PatientDashboard';
import AdminDashboard from './pages/AdminDashboard';

// Route Guards
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute';

export const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ClinicProvider>
          <Routes>
            {/* Public Marketing & Educational Website */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/what-is-tmd" element={<WhatIsTmdPage />} />
              <Route path="/treatments" element={<TreatmentsPage />} />
              <Route path="/treatment" element={<Navigate to="/treatments" replace />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>

            {/* Portal Authentication */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Patient Dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <PatientDashboard />
                </ProtectedRoute>
              }
            />

            {/* Protected Staff / Admin Management Dashboard */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ClinicProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
