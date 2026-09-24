import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await login(username, password);
      if (from) {
        navigate(from, { replace: true });
      } else if (data.user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const setDemoCredentials = (role) => {
    if (role === 'admin') {
      setUsername('admin@drashwintmd.com');
      setPassword('admin123');
    } else {
      setUsername('patient@example.com');
      setPassword('patient123');
    }
  };

  return (
    <div
      style={{
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#161616',
        padding: '2rem 1rem'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: '#1E1E1E',
          borderRadius: '24px',
          border: '1px solid rgba(237, 170, 18, 0.25)',
          padding: '2.5rem 2rem',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          color: '#FFFFFF'
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
            <img
              src="/assets/images/logo.png"
              alt="Dr. Ashwin's TMD Clinic"
              style={{ width: '56px', height: 'auto', marginBottom: '0.8rem' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ color: '#EDAA12', fontWeight: 800, fontSize: '1.05rem', letterSpacing: '0.08em' }}>
                DR ASHWIN’S
              </span>
              <span style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.22em' }}>
                TMD CLINIC
              </span>
            </div>
          </Link>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginTop: '1.2rem', color: '#FFFFFF' }}>
            Clinic Portal Login
          </h2>
          <p style={{ color: '#9E9E9E', fontSize: '0.88rem', marginTop: '0.3rem' }}>
            Access your patient records or clinic management
          </p>
        </div>

        {error && (
          <div
            style={{
              background: 'rgba(235, 87, 87, 0.15)',
              border: '1px solid #EB5757',
              color: '#FF6B6B',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              fontSize: '0.86rem',
              marginBottom: '1.2rem'
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#C4C4C4', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Username or Email
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin@drashwintmd.com"
              style={{
                width: '100%',
                padding: '0.85rem 1rem',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.15)',
                backgroundColor: '#282828',
                color: '#FFFFFF',
                fontSize: '0.95rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.6rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#C4C4C4', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '0.85rem 1rem',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.15)',
                backgroundColor: '#282828',
                color: '#FFFFFF',
                fontSize: '0.95rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="nav-btn-gold"
            style={{
              width: '100%',
              padding: '0.85rem',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.98rem'
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        {/* Quick Demo Autofill */}
        <div style={{ marginTop: '1.8rem', paddingTop: '1.2rem', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
          <span style={{ fontSize: '0.78rem', color: '#888', display: 'block', marginBottom: '0.6rem' }}>
            Quick Demo Credentials:
          </span>
          <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={() => setDemoCredentials('admin')}
              style={{
                background: 'rgba(237, 170, 18, 0.12)',
                border: '1px solid #EDAA12',
                color: '#EDAA12',
                borderRadius: '9999px',
                padding: '6px 14px',
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              Fill Staff Admin
            </button>
            <button
              type="button"
              onClick={() => setDemoCredentials('patient')}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#FFFFFF',
                borderRadius: '9999px',
                padding: '6px 14px',
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              Fill Patient
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link to="/" style={{ color: '#9E9E9E', fontSize: '0.82rem', textDecoration: 'none' }}>
            ← Back to Dr. Ashwin's Website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
