'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
  }, [pathname]);

  const isSubPage = pathname !== '/';

  return (
    <header
      className={`site-header ${isSubPage ? 'site-header-about' : ''} ${scrolled ? 'scrolled' : ''} ${navHidden ? 'nav-hidden' : ''}`}
      id="siteHeader"
    >
      <div className="container nav-wrap">
        {/* Logo Badge */}
        <Link href="/" className="brand-badge" id="clinicLogo">
          <Image
            src="/assets/images/logo.png"
            alt="Dr. Ashwin's TMD Clinic"
            width={48}
            height={48}
            className="brand-logo-img"
            priority
          />
          <div className="brand-titles">
            <span className="brand-name-gold">DR ASHWIN’S</span>
            <span className="brand-sub-white">TMD CLINIC</span>
          </div>
        </Link>

        {/* Menu Items */}
        <nav
          className="nav-menu"
          id="navMenu"
          style={
            mobileMenuOpen
              ? {
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: '#1E1E1E',
                  padding: '1.5rem',
                  borderBottom: '1px solid rgba(237, 170, 18, 0.2)',
                  zIndex: 1000,
                }
              : {}
          }
        >
          <Link
            href="/about"
            className={`nav-link-item ${pathname === '/about' ? 'active' : ''}`}
          >
            About Us
          </Link>
          <Link
            href="/what-is-tmd"
            className={`nav-link-item ${pathname === '/what-is-tmd' ? 'active' : ''}`}
          >
            What is TMD
          </Link>
          <Link
            href="/treatments"
            className={`nav-link-item ${pathname === '/treatments' || pathname === '/services' ? 'active' : ''}`}
          >
            Treatments
          </Link>
          <Link
            href="/contact"
            className={`nav-link-item ${pathname === '/contact' ? 'active' : ''}`}
          >
            Contact Us
          </Link>
        </nav>

        {/* CTA Button */}
        <div>
          <Link href="/contact" className="nav-btn-gold" id="navConsultBtn">
            Book a consultation
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
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
}
