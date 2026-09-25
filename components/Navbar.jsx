'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCms } from '@/context/CmsContext';

export default function Navbar() {
  const { content } = useCms();
  const [scrolled, setScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Do not render public Navbar on admin dashboard pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

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

  // Sync body class with current route for page-specific CSS selectors
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.classList.remove(
      'is-about-page',
      'is-what-is-tmd-page',
      'is-treatments-page',
      'is-contact-page',
      'home'
    );
    if (pathname === '/') {
      document.body.classList.add('home');
    } else if (pathname === '/about') {
      document.body.classList.add('is-about-page');
    } else if (pathname === '/what-is-tmd') {
      document.body.classList.add('is-what-is-tmd-page');
    } else if (pathname === '/treatments' || pathname === '/services') {
      document.body.classList.add('is-treatments-page');
    } else if (pathname === '/contact' || pathname === '/book-appointment') {
      document.body.classList.add('is-contact-page');
    }
  }, [pathname]);

  const [activeSection, setActiveSection] = useState('');

  // Track active section on homepage scroll
  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection('');
      return;
    }

    const sectionIds = ['about', 'treatments', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      let current = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const isSubPage = pathname !== '/';

  const isAboutActive = pathname === '/about' || (pathname === '/' && activeSection === 'about');
  const isTmdActive = pathname === '/what-is-tmd' || (pathname === '/' && activeSection === 'what-is-tmd');
  const isTreatmentsActive = pathname === '/treatments' || pathname === '/services' || (pathname === '/' && activeSection === 'treatments');
  const isContactActive = pathname === '/contact' || pathname === '/book-appointment' || (pathname === '/' && activeSection === 'contact');

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
            <span className="brand-name-gold">{content?.navbarBrandGold || 'DR ASHWIN’S'}</span>
            <span className="brand-sub-white">{content?.navbarBrandWhite || 'TMD CLINIC'}</span>
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
            className={`nav-link-item ${isAboutActive ? 'active' : ''}`}
            style={isAboutActive ? { color: '#EDAA12', fontWeight: '700' } : {}}
          >
            About Us
          </Link>
          <Link
            href="/what-is-tmd"
            className={`nav-link-item ${isTmdActive ? 'active' : ''}`}
            style={isTmdActive ? { color: '#EDAA12', fontWeight: '700' } : {}}
          >
            What is TMD
          </Link>
          <Link
            href="/treatments"
            className={`nav-link-item ${isTreatmentsActive ? 'active' : ''}`}
            style={isTreatmentsActive ? { color: '#EDAA12', fontWeight: '700' } : {}}
          >
            Treatments
          </Link>
          <Link
            href="/contact"
            className={`nav-link-item ${isContactActive ? 'active' : ''}`}
            style={isContactActive ? { color: '#EDAA12', fontWeight: '700' } : {}}
          >
            Contact Us
          </Link>
        </nav>

        {/* CTA Button */}
        <div>
          <Link href="/contact" className="nav-btn-gold" id="navConsultBtn">
            {content?.navbarCtaText || 'Book a consultation'}
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
