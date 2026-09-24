import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useClinic } from '../context/ClinicContext';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const { openBookingModal } = useClinic();

  // Scroll direction detection matching original main.js
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const scrollThreshold = 8;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 50) {
        setScrolled(false);
        setNavHidden(false);
        lastScrollY = currentScrollY;
        return;
      }

      setScrolled(true);

      if (mobileMenuOpen) {
        lastScrollY = currentScrollY;
        return;
      }

      if (Math.abs(currentScrollY - lastScrollY) > scrollThreshold) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setNavHidden(true); // scrolling down
        } else if (currentScrollY < lastScrollY) {
          setNavHidden(false); // scrolling up
        }
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isAboutPage = location.pathname === '/about';
  const isWhatIsTmdPage = location.pathname === '/what-is-tmd';
  const isTreatmentsPage = location.pathname === '/treatments';
  const isContactPage = location.pathname === '/contact';

  const isSubPage = isAboutPage || isWhatIsTmdPage || isTreatmentsPage || isContactPage;

  return (
    <header
      className={`site-header ${isSubPage ? 'site-header-about' : ''} ${scrolled ? 'scrolled' : ''} ${navHidden ? 'nav-hidden' : ''}`}
      id="siteHeader"
    >
      <div className="container nav-wrap">
        {/* Logo Badge */}
        <Link to="/" className="brand-badge" id="clinicLogo">
          <img src="/assets/images/logo.png" alt="Dr. Ashwin's TMD Clinic" className="brand-logo-img" />
          <div className="brand-titles">
            <span className="brand-name-gold">DR ASHWIN’S</span>
            <span className="brand-sub-white">TMD CLINIC</span>
          </div>
        </Link>

        {/* Menu Items */}
        <nav
          className="nav-menu"
          id="navMenu"
          style={mobileMenuOpen ? { display: 'flex', flexDirection: 'column', position: 'absolute', top: '100%', left: 0, right: 0, background: '#1E1E1E', padding: '1.5rem', borderBottom: '1px solid rgba(237, 170, 18, 0.2)', zIndex: 1000 } : {}}
        >
          <Link
            to="/about"
            className={`nav-link-item ${location.pathname === '/about' ? 'active' : ''}`}
          >
            About Us
          </Link>
          <Link
            to="/what-is-tmd"
            className={`nav-link-item ${location.pathname === '/what-is-tmd' ? 'active' : ''}`}
          >
            What is TMD
          </Link>
          <Link
            to="/treatments"
            className={`nav-link-item ${location.pathname === '/treatments' ? 'active' : ''}`}
          >
            Treatments
          </Link>
          <Link
            to="/contact"
            className={`nav-link-item ${location.pathname === '/contact' ? 'active' : ''}`}
          >
            Contact Us
          </Link>

          {/* Auth links if logged in */}
          {isAuthenticated && (
            <Link
              to={isAdmin ? '/admin' : '/dashboard'}
              className="nav-link-item"
              style={{ color: '#EDAA12', fontWeight: 600 }}
            >
              {isAdmin ? 'Admin Portal' : 'My Dashboard'}
            </Link>
          )}
        </nav>

        {/* CTA & User Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <button
            onClick={openBookingModal}
            className="nav-btn-gold"
            id="navConsultBtn"
            style={{ cursor: 'pointer', border: 'none' }}
          >
            Book a consultation
          </button>

          {isAuthenticated ? (
            <button
              onClick={logout}
              title={`Logged in as ${user?.name || 'User'} (${user?.role}) - Click to logout`}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff',
                padding: '6px 12px',
                borderRadius: '9999px',
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              title="Portal Login (Patients & Staff)"
              style={{
                color: '#9E9E9E',
                fontSize: '0.82rem',
                textDecoration: 'none',
                padding: '4px 8px',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => (e.target.style.color = '#EDAA12')}
              onMouseLeave={(e) => (e.target.style.color = '#9E9E9E')}
            >
              Portal Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="mobile-nav-toggle"
          id="mobileNavToggle"
          aria-label="Toggle Navigation"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
