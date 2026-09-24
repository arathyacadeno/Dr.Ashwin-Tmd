'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCms, defaultCmsData } from '@/context/CmsContext';
import '@/styles/admin.css';

export default function AdminDashboardPage() {
  const { content, saveContent } = useCms();
  const [activeTab, setActiveTab] = useState('home');
  const [cmsData, setCmsData] = useState(content || defaultCmsData);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (content) {
      setCmsData(content);
    }
  }, [content]);

  // Save changes handler
  const handleSave = async () => {
    await saveContent(cmsData);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleInputChange = (field, value) => {
    setCmsData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCardChange = (arrayKey, index, field, value) => {
    setCmsData((prev) => {
      const currentArray = prev[arrayKey] || defaultCmsData[arrayKey] || [];
      const updated = [...currentArray];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, [arrayKey]: updated };
    });
  };

  const handleMetricChange = (index, field, value) => {
    setCmsData((prev) => {
      const currentArray = prev.trustMetrics || defaultCmsData.trustMetrics || [];
      const updated = [...currentArray];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, trustMetrics: updated };
    });
  };

  const handleFileUpload = (e, callback) => {
    const file = e.target.files?.[0];
    if (file) {
      callback(file.name);
    }
  };

  return (
    <div className="admin-layout-wrapper">
      {/* ====================================================================
          Left Dark Charcoal Sidebar (Exact Figma UI)
          ==================================================================== */}
      <aside className="admin-sidebar">
        {/* Brand Logo & Titles */}
        <Link href="/" className="admin-brand-header">
          <div className="admin-brand-logo-circle">
            <img src="/assets/images/logo.png" alt="Dr. Ashwin's TMD Clinic" className="admin-brand-logo-img" />
          </div>
          <div className="admin-brand-text">
            <span className="admin-brand-name-gold">{cmsData.navbarBrandGold || 'DR ASHWIN’S'}</span>
            <span className="admin-brand-sub-white">{cmsData.navbarBrandWhite || 'TMD CLINIC'}</span>
          </div>
        </Link>

        {/* Navigation Tabs */}
        <nav className="admin-nav-menu">
          {/* Home Tab */}
          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            <span className="admin-nav-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </span>
            <span className="admin-nav-text">Home</span>
          </button>

          {/* About Us Tab */}
          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            <span className="admin-nav-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </span>
            <span className="admin-nav-text">About Us</span>
          </button>

          {/* What is TMD Tab */}
          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'tmd' ? 'active' : ''}`}
            onClick={() => setActiveTab('tmd')}
          >
            <span className="admin-nav-text" style={{ paddingLeft: '28px' }}>What is TMD</span>
          </button>

          {/* Treatments Tab */}
          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'treatments' ? 'active' : ''}`}
            onClick={() => setActiveTab('treatments')}
          >
            <span className="admin-nav-text" style={{ paddingLeft: '28px' }}>Treatments</span>
          </button>

          {/* Contact Us Tab */}
          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            <span className="admin-nav-text" style={{ paddingLeft: '28px' }}>Contact Us</span>
          </button>

          {/* Navigation Bar Tab */}
          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'navbar' ? 'active' : ''}`}
            onClick={() => setActiveTab('navbar')}
          >
            <span className="admin-nav-text" style={{ paddingLeft: '28px' }}>Navigation Bar</span>
          </button>

          {/* Footer Tab */}
          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'footer' ? 'active' : ''}`}
            onClick={() => setActiveTab('footer')}
          >
            <span className="admin-nav-text" style={{ paddingLeft: '28px' }}>Footer</span>
          </button>
        </nav>
      </aside>

      {/* ====================================================================
          Main Content Form Area
          ==================================================================== */}
      <main className="admin-content-area">
        {/* Top Header Bar */}
        <header className="admin-top-header">
          <div>
            <h1 className="admin-main-heading">
              {activeTab === 'home' && 'Homepage Management'}
              {activeTab === 'about' && 'About Us Management'}
              {activeTab === 'tmd' && 'What is TMD Management'}
              {activeTab === 'treatments' && 'Treatments Management'}
              {activeTab === 'contact' && 'Contact Us Management'}
              {activeTab === 'navbar' && 'Navigation Bar Management'}
              {activeTab === 'footer' && 'Footer Management'}
            </h1>
            <p className="admin-sub-heading">
              {activeTab === 'home' && 'Manage the main Home page content displayed on the website'}
              {activeTab === 'about' && 'Manage clinic story, philosophy, and Dr. Ashwin profile'}
              {activeTab === 'tmd' && 'Manage educational TMD explanations, symptoms, and causes'}
              {activeTab === 'treatments' && 'Manage treatment process steps and therapeutic stages'}
              {activeTab === 'contact' && 'Manage clinic consultation details, working hours, and location'}
              {activeTab === 'navbar' && 'Manage brand titles, logo, and header consultation CTA'}
              {activeTab === 'footer' && 'Manage footer bio, contact details, social links, and copyright'}
            </p>
          </div>

          <div className="admin-header-actions">
            <Link
              href={
                activeTab === 'about'
                  ? '/about'
                  : activeTab === 'tmd'
                  ? '/what-is-tmd'
                  : activeTab === 'treatments'
                  ? '/treatments'
                  : activeTab === 'contact'
                  ? '/contact'
                  : '/'
              }
              target="_blank"
              className="admin-btn-secondary"
            >
              <span>View Live Website</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </Link>
            <button type="button" className="admin-btn-primary" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </header>

        {/* ==================================================================
            TAB 1: HOMEPAGE MANAGEMENT
            ================================================================== */}
        {activeTab === 'home' && (
          <div>
            {/* Section 1: Hero Section */}
            <section className="admin-section-block">
              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Hero Heading</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.heroHeading || ''}
                    onChange={(e) => handleInputChange('heroHeading', e.target.value)}
                  />
                </div>
                <div className="admin-field-group">
                  <label className="admin-field-label">Hero Section Video</label>
                  <div className="admin-input-with-upload">
                    <input
                      type="text"
                      className="admin-pill-input"
                      value={cmsData.heroVideo || ''}
                      onChange={(e) => handleInputChange('heroVideo', e.target.value)}
                    />
                    <label className="admin-upload-icon-btn" title="Choose Video File">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <input
                        type="file"
                        accept="video/*"
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileUpload(e, (name) => handleInputChange('heroVideo', name))}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="admin-field-group">
                <label className="admin-field-label">Hero CTA Button</label>
                <div className="admin-dual-cta-row">
                  <input
                    type="text"
                    className="admin-pill-input admin-cta-half"
                    value={cmsData.heroCta1 || ''}
                    onChange={(e) => handleInputChange('heroCta1', e.target.value)}
                  />
                  <input
                    type="text"
                    className="admin-pill-input admin-cta-half"
                    value={cmsData.heroCta2 || ''}
                    onChange={(e) => handleInputChange('heroCta2', e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* Section 2: Dr. Ashwin Introduction */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">Dr. Ashwin Introduction</h2>
              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Doctor Name</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.docName || ''}
                    onChange={(e) => handleInputChange('docName', e.target.value)}
                  />
                </div>
                <div className="admin-field-group">
                  <label className="admin-field-label">Specialty / Location</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.docSpecialty || ''}
                    onChange={(e) => handleInputChange('docSpecialty', e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-grid-2col admin-doc-row">
                <div className="admin-field-group">
                  <label className="admin-field-label">Doctor Ashwin Personal Note</label>
                  <textarea
                    rows={4}
                    className="admin-pill-input admin-pill-textarea"
                    value={cmsData.docNote || ''}
                    onChange={(e) => handleInputChange('docNote', e.target.value)}
                  />
                </div>
                <div className="admin-field-group">
                  <label className="admin-field-label">Doctor Image</label>
                  <div className="admin-input-with-upload">
                    <input
                      type="text"
                      className="admin-pill-input"
                      value={cmsData.docImage || ''}
                      onChange={(e) => handleInputChange('docImage', e.target.value)}
                    />
                    <label className="admin-upload-icon-btn" title="Choose Image File">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileUpload(e, (name) => handleInputChange('docImage', name))}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Lifestyle Benefits Section */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">Lifestyle Benefits Section</h2>
              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Section Name</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.lifestyleSectionName || ''}
                    onChange={(e) => handleInputChange('lifestyleSectionName', e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-cards-grid">
                {(cmsData.lifestyleCards || []).map((card, idx) => (
                  <div key={idx} className="admin-card-item">
                    <div className="admin-field-group">
                      <label className="admin-field-label">Card {idx + 1}</label>
                      <input
                        type="text"
                        className="admin-pill-input"
                        value={card.title || ''}
                        onChange={(e) => handleCardChange('lifestyleCards', idx, 'title', e.target.value)}
                      />
                    </div>
                    <div className="admin-field-group">
                      <label className="admin-field-label">Description</label>
                      <textarea
                        rows={3}
                        className="admin-pill-input admin-pill-textarea"
                        value={card.desc || ''}
                        onChange={(e) => handleCardChange('lifestyleCards', idx, 'desc', e.target.value)}
                      />
                    </div>
                    <div className="admin-field-group">
                      <label className="admin-field-label">Card Image</label>
                      <div className="admin-input-with-upload">
                        <input
                          type="text"
                          className="admin-pill-input"
                          value={card.img || ''}
                          onChange={(e) => handleCardChange('lifestyleCards', idx, 'img', e.target.value)}
                        />
                        <label className="admin-upload-icon-btn" title="Choose Card Image">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(e) => handleFileUpload(e, (name) => handleCardChange('lifestyleCards', idx, 'img', name))}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4: Treatments Section */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">Treatments Section</h2>
              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Section Name</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.treatmentsSectionName || ''}
                    onChange={(e) => handleInputChange('treatmentsSectionName', e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-cards-grid">
                {(cmsData.treatmentCards || []).map((card, idx) => (
                  <div key={idx} className="admin-card-item">
                    <div className="admin-field-group">
                      <label className="admin-field-label">Treatment Card {idx + 1}</label>
                      <input
                        type="text"
                        className="admin-pill-input"
                        value={card.title || ''}
                        onChange={(e) => handleCardChange('treatmentCards', idx, 'title', e.target.value)}
                      />
                    </div>
                    <div className="admin-field-group">
                      <label className="admin-field-label">Description</label>
                      <textarea
                        rows={3}
                        className="admin-pill-input admin-pill-textarea"
                        value={card.desc || ''}
                        onChange={(e) => handleCardChange('treatmentCards', idx, 'desc', e.target.value)}
                      />
                    </div>
                    <div className="admin-field-group">
                      <label className="admin-field-label">Card Image</label>
                      <div className="admin-input-with-upload">
                        <input
                          type="text"
                          className="admin-pill-input"
                          value={card.img || ''}
                          onChange={(e) => handleCardChange('treatmentCards', idx, 'img', e.target.value)}
                        />
                        <label className="admin-upload-icon-btn" title="Choose Image">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(e) => handleFileUpload(e, (name) => handleCardChange('treatmentCards', idx, 'img', name))}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 5: Advanced Equipment Section */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">Advanced Equipment Section</h2>
              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Section Name</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.equipmentSectionName || ''}
                    onChange={(e) => handleInputChange('equipmentSectionName', e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-cards-grid">
                {(cmsData.equipmentCards || []).map((card, idx) => (
                  <div key={idx} className="admin-card-item">
                    <div className="admin-field-group">
                      <label className="admin-field-label">Equipment Card {idx + 1}</label>
                      <input
                        type="text"
                        className="admin-pill-input"
                        value={card.title || ''}
                        onChange={(e) => handleCardChange('equipmentCards', idx, 'title', e.target.value)}
                      />
                    </div>
                    <div className="admin-field-group">
                      <label className="admin-field-label">Description</label>
                      <textarea
                        rows={3}
                        className="admin-pill-input admin-pill-textarea"
                        value={card.desc || ''}
                        onChange={(e) => handleCardChange('equipmentCards', idx, 'desc', e.target.value)}
                      />
                    </div>
                    <div className="admin-field-group">
                      <label className="admin-field-label">Equipment Image</label>
                      <div className="admin-input-with-upload">
                        <input
                          type="text"
                          className="admin-pill-input"
                          value={card.img || ''}
                          onChange={(e) => handleCardChange('equipmentCards', idx, 'img', e.target.value)}
                        />
                        <label className="admin-upload-icon-btn" title="Choose Image">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(e) => handleFileUpload(e, (name) => handleCardChange('equipmentCards', idx, 'img', name))}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 6: Trust & Credibility Section */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">Trust &amp; Credibility Section</h2>
              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Section Name</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.trustSectionName || ''}
                    onChange={(e) => handleInputChange('trustSectionName', e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-metrics-row-scroll">
                {(cmsData.trustMetrics || []).map((metric, idx) => (
                  <div key={idx} className="admin-metric-pill-card">
                    <div className="admin-field-group">
                      <label className="admin-field-label">Number</label>
                      <input
                        type="text"
                        className="admin-pill-input"
                        value={metric.number || ''}
                        onChange={(e) => handleMetricChange(idx, 'number', e.target.value)}
                      />
                    </div>
                    <div className="admin-field-group">
                      <label className="admin-field-label">Label</label>
                      <input
                        type="text"
                        className="admin-pill-input"
                        value={metric.label || ''}
                        onChange={(e) => handleMetricChange(idx, 'label', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 7: Patient Testimonials Section */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">Patient Testimonials Section</h2>
              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Section Name</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.testimonialsSectionName || ''}
                    onChange={(e) => handleInputChange('testimonialsSectionName', e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Review Author</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.reviewAuthor || ''}
                    onChange={(e) => handleInputChange('reviewAuthor', e.target.value)}
                  />
                </div>
                <div className="admin-field-group">
                  <label className="admin-field-label">Star Rating</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.reviewRating || ''}
                    onChange={(e) => handleInputChange('reviewRating', e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Review Content</label>
                  <textarea
                    rows={4}
                    className="admin-pill-input admin-pill-textarea"
                    value={cmsData.reviewContent || ''}
                    onChange={(e) => handleInputChange('reviewContent', e.target.value)}
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ==================================================================
            TAB 2: ABOUT US MANAGEMENT
            ================================================================== */}
        {activeTab === 'about' && (
          <div>
            {/* About Hero */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">About Us Hero Section</h2>
              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Hero Title Line 1</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.aboutHeroTitle1 || ''}
                    onChange={(e) => handleInputChange('aboutHeroTitle1', e.target.value)}
                  />
                </div>
                <div className="admin-field-group">
                  <label className="admin-field-label">Hero Title Line 2</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.aboutHeroTitle2 || ''}
                    onChange={(e) => handleInputChange('aboutHeroTitle2', e.target.value)}
                  />
                </div>
              </div>
              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Scroll Hint Text</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.aboutHeroScrollHint || ''}
                    onChange={(e) => handleInputChange('aboutHeroScrollHint', e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* Our Story Reveal Section */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">Our Story &amp; Philosophy</h2>
              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Story Section Title</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.aboutStoryHeading || ''}
                    onChange={(e) => handleInputChange('aboutStoryHeading', e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Paragraph 1 (The Challenge)</label>
                  <textarea
                    rows={3}
                    className="admin-pill-input admin-pill-textarea"
                    value={cmsData.aboutStoryP1 || ''}
                    onChange={(e) => handleInputChange('aboutStoryP1', e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Paragraph 2 (Our Core Approach)</label>
                  <textarea
                    rows={4}
                    className="admin-pill-input admin-pill-textarea"
                    value={cmsData.aboutStoryP2 || ''}
                    onChange={(e) => handleInputChange('aboutStoryP2', e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Paragraph 3 (Commitment)</label>
                  <textarea
                    rows={2}
                    className="admin-pill-input admin-pill-textarea"
                    value={cmsData.aboutStoryP3 || ''}
                    onChange={(e) => handleInputChange('aboutStoryP3', e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Lounge Image (Base View)</label>
                  <div className="admin-input-with-upload">
                    <input
                      type="text"
                      className="admin-pill-input"
                      value={cmsData.aboutStoryLoungeImage || ''}
                      onChange={(e) => handleInputChange('aboutStoryLoungeImage', e.target.value)}
                    />
                    <label className="admin-upload-icon-btn" title="Choose Lounge Image">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileUpload(e, (name) => handleInputChange('aboutStoryLoungeImage', name))}
                      />
                    </label>
                  </div>
                </div>

                <div className="admin-field-group">
                  <label className="admin-field-label">Clinic Exterior Image (Curtain Reveal)</label>
                  <div className="admin-input-with-upload">
                    <input
                      type="text"
                      className="admin-pill-input"
                      value={cmsData.aboutStoryExteriorImage || ''}
                      onChange={(e) => handleInputChange('aboutStoryExteriorImage', e.target.value)}
                    />
                    <label className="admin-upload-icon-btn" title="Choose Exterior Image">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileUpload(e, (name) => handleInputChange('aboutStoryExteriorImage', name))}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </section>

            {/* Meet Dr. Ashwin Card */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">Doctor Profile Card</h2>
              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Specialist Tag</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.aboutDoctorTag || ''}
                    onChange={(e) => handleInputChange('aboutDoctorTag', e.target.value)}
                  />
                </div>
                <div className="admin-field-group">
                  <label className="admin-field-label">Doctor Name</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.aboutDoctorName || ''}
                    onChange={(e) => handleInputChange('aboutDoctorName', e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Doctor Qualification</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.aboutDoctorQualification || ''}
                    onChange={(e) => handleInputChange('aboutDoctorQualification', e.target.value)}
                  />
                </div>
                <div className="admin-field-group">
                  <label className="admin-field-label">Doctor Portrait Image</label>
                  <div className="admin-input-with-upload">
                    <input
                      type="text"
                      className="admin-pill-input"
                      value={cmsData.aboutDoctorImage || ''}
                      onChange={(e) => handleInputChange('aboutDoctorImage', e.target.value)}
                    />
                    <label className="admin-upload-icon-btn" title="Choose Portrait Image">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileUpload(e, (name) => handleInputChange('aboutDoctorImage', name))}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Biography Paragraph 1</label>
                  <textarea
                    rows={3}
                    className="admin-pill-input admin-pill-textarea"
                    value={cmsData.aboutDoctorBio1 || ''}
                    onChange={(e) => handleInputChange('aboutDoctorBio1', e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Biography Paragraph 2</label>
                  <textarea
                    rows={3}
                    className="admin-pill-input admin-pill-textarea"
                    value={cmsData.aboutDoctorBio2 || ''}
                    onChange={(e) => handleInputChange('aboutDoctorBio2', e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Doctor Personal Quote</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.aboutDoctorQuote || ''}
                    onChange={(e) => handleInputChange('aboutDoctorQuote', e.target.value)}
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ==================================================================
            TAB 3: WHAT IS TMD MANAGEMENT
            ================================================================== */}
        {activeTab === 'tmd' && (
          <div>
            {/* TMD Hero */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">What is TMD Hero Section</h2>
              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Hero Title Line 1</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.tmdHeroLine1 || ''}
                    onChange={(e) => handleInputChange('tmdHeroLine1', e.target.value)}
                  />
                </div>
                <div className="admin-field-group">
                  <label className="admin-field-label">Hero Title Line 2</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.tmdHeroLine2 || ''}
                    onChange={(e) => handleInputChange('tmdHeroLine2', e.target.value)}
                  />
                </div>
              </div>
              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Hero Subtitle</label>
                  <textarea
                    rows={2}
                    className="admin-pill-input admin-pill-textarea"
                    value={cmsData.tmdHeroSub || ''}
                    onChange={(e) => handleInputChange('tmdHeroSub', e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* Busiest Joint Section */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">Busiest Joint Section</h2>
              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Section Heading</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.tmdBusiestJointTitle || ''}
                    onChange={(e) => handleInputChange('tmdBusiestJointTitle', e.target.value)}
                  />
                </div>
              </div>
              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Explanation Content</label>
                  <textarea
                    rows={4}
                    className="admin-pill-input admin-pill-textarea"
                    value={cmsData.tmdBusiestJointText || ''}
                    onChange={(e) => handleInputChange('tmdBusiestJointText', e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* Great Disguise Artist (Symptoms) */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">Disguise Artist &amp; Symptoms</h2>
              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Section Heading</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.tmdDisguiseTitle || ''}
                    onChange={(e) => handleInputChange('tmdDisguiseTitle', e.target.value)}
                  />
                </div>
                <div className="admin-field-group">
                  <label className="admin-field-label">Section Subtitle</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.tmdDisguiseSub || ''}
                    onChange={(e) => handleInputChange('tmdDisguiseSub', e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-cards-grid">
                {(cmsData.tmdSymptoms || []).map((sym, idx) => (
                  <div key={idx} className="admin-card-item">
                    <div className="admin-field-group">
                      <label className="admin-field-label">Symptom {idx + 1} Name</label>
                      <input
                        type="text"
                        className="admin-pill-input"
                        value={sym.title || ''}
                        onChange={(e) => handleCardChange('tmdSymptoms', idx, 'title', e.target.value)}
                      />
                    </div>
                    <div className="admin-field-group">
                      <label className="admin-field-label">Description</label>
                      <textarea
                        rows={3}
                        className="admin-pill-input admin-pill-textarea"
                        value={sym.desc || ''}
                        onChange={(e) => handleCardChange('tmdSymptoms', idx, 'desc', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Common Causes */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">Common Causes (The Usual Suspects)</h2>
              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Section Heading</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.tmdCausesTitle || ''}
                    onChange={(e) => handleInputChange('tmdCausesTitle', e.target.value)}
                  />
                </div>
                <div className="admin-field-group">
                  <label className="admin-field-label">Section Subtitle</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.tmdCausesSub || ''}
                    onChange={(e) => handleInputChange('tmdCausesSub', e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-cards-grid">
                {(cmsData.tmdCauses || []).map((cause, idx) => (
                  <div key={idx} className="admin-card-item">
                    <div className="admin-field-group">
                      <label className="admin-field-label">Cause {idx + 1} Name</label>
                      <input
                        type="text"
                        className="admin-pill-input"
                        value={cause.title || ''}
                        onChange={(e) => handleCardChange('tmdCauses', idx, 'title', e.target.value)}
                      />
                    </div>
                    <div className="admin-field-group">
                      <label className="admin-field-label">Description</label>
                      <textarea
                        rows={3}
                        className="admin-pill-input admin-pill-textarea"
                        value={cause.desc || ''}
                        onChange={(e) => handleCardChange('tmdCauses', idx, 'desc', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* When to Seek Care */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">When to Seek Care</h2>
              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Heading</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.tmdWhenTitle || ''}
                    onChange={(e) => handleInputChange('tmdWhenTitle', e.target.value)}
                  />
                </div>
              </div>
              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Guidance Recommendation</label>
                  <textarea
                    rows={3}
                    className="admin-pill-input admin-pill-textarea"
                    value={cmsData.tmdWhenText || ''}
                    onChange={(e) => handleInputChange('tmdWhenText', e.target.value)}
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ==================================================================
            TAB 4: TREATMENTS MANAGEMENT
            ================================================================== */}
        {activeTab === 'treatments' && (
          <div>
            {/* Treatments Hero */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">Treatments Hero Section</h2>
              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Hero Title</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.treatmentsHeroTitle || ''}
                    onChange={(e) => handleInputChange('treatmentsHeroTitle', e.target.value)}
                  />
                </div>
              </div>
              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Hero Subtitle</label>
                  <textarea
                    rows={2}
                    className="admin-pill-input admin-pill-textarea"
                    value={cmsData.treatmentsHeroSub || ''}
                    onChange={(e) => handleInputChange('treatmentsHeroSub', e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* Diagnostic Stepper (5 Steps) */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">Diagnostic Stepper (5 Steps)</h2>
              <div className="admin-cards-grid">
                {(cmsData.treatmentsSteps || []).map((step, idx) => (
                  <div key={idx} className="admin-card-item">
                    <div className="admin-field-group">
                      <label className="admin-field-label">Step {step.stepNum || idx + 1} Title</label>
                      <input
                        type="text"
                        className="admin-pill-input"
                        value={step.title || ''}
                        onChange={(e) => handleCardChange('treatmentsSteps', idx, 'title', e.target.value)}
                      />
                    </div>
                    <div className="admin-field-group">
                      <label className="admin-field-label">Step Description</label>
                      <textarea
                        rows={3}
                        className="admin-pill-input admin-pill-textarea"
                        value={step.desc || ''}
                        onChange={(e) => handleCardChange('treatmentsSteps', idx, 'desc', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Treatment Journey (4 Stages) */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">Treatment Journey (4 Stages)</h2>
              <div className="admin-cards-grid">
                {(cmsData.treatmentsJourneyStages || []).map((stage, idx) => (
                  <div key={idx} className="admin-card-item">
                    <div className="admin-field-group">
                      <label className="admin-field-label">{stage.stageNum || `Stage ${idx + 1}`} Title</label>
                      <input
                        type="text"
                        className="admin-pill-input"
                        value={stage.title || ''}
                        onChange={(e) => handleCardChange('treatmentsJourneyStages', idx, 'title', e.target.value)}
                      />
                    </div>
                    <div className="admin-field-group">
                      <label className="admin-field-label">Description</label>
                      <textarea
                        rows={3}
                        className="admin-pill-input admin-pill-textarea"
                        value={stage.desc || ''}
                        onChange={(e) => handleCardChange('treatmentsJourneyStages', idx, 'desc', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ==================================================================
            TAB 5: CONTACT US MANAGEMENT
            ================================================================== */}
        {activeTab === 'contact' && (
          <div>
            <section className="admin-section-block">
              <h2 className="admin-section-heading">Contact Hero &amp; Subtitle</h2>
              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Hero Title</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.contactHeroTitle || ''}
                    onChange={(e) => handleInputChange('contactHeroTitle', e.target.value)}
                  />
                </div>
              </div>
              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Hero Subtitle</label>
                  <textarea
                    rows={2}
                    className="admin-pill-input admin-pill-textarea"
                    value={cmsData.contactHeroSub || ''}
                    onChange={(e) => handleInputChange('contactHeroSub', e.target.value)}
                  />
                </div>
              </div>
            </section>

            <section className="admin-section-block">
              <h2 className="admin-section-heading">Contact Details &amp; Clinic Channels</h2>
              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Clinic Phone Number</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.contactPhone || ''}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  />
                </div>
                <div className="admin-field-group">
                  <label className="admin-field-label">WhatsApp Contact Number</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.contactWhatsApp || ''}
                    onChange={(e) => handleInputChange('contactWhatsApp', e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Official Clinic Email</label>
                  <input
                    type="email"
                    className="admin-pill-input"
                    value={cmsData.contactEmail || ''}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Weekday Working Hours</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.contactHoursWeekdays || ''}
                    onChange={(e) => handleInputChange('contactHoursWeekdays', e.target.value)}
                  />
                </div>
                <div className="admin-field-group">
                  <label className="admin-field-label">Saturday Working Hours</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.contactHoursSaturday || ''}
                    onChange={(e) => handleInputChange('contactHoursSaturday', e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Clinic Full Physical Address</label>
                  <textarea
                    rows={3}
                    className="admin-pill-input admin-pill-textarea"
                    value={cmsData.contactAddress || ''}
                    onChange={(e) => handleInputChange('contactAddress', e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Google Maps Search / Embed Query</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.contactMapQuery || ''}
                    onChange={(e) => handleInputChange('contactMapQuery', e.target.value)}
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ==================================================================
            TAB 6: NAVIGATION BAR MANAGEMENT
            ================================================================== */}
        {activeTab === 'navbar' && (
          <div>
            <section className="admin-section-block">
              <h2 className="admin-section-heading">Brand Identity &amp; Header Navigation</h2>
              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Brand Title Gold</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.navbarBrandGold || ''}
                    onChange={(e) => handleInputChange('navbarBrandGold', e.target.value)}
                  />
                </div>
                <div className="admin-field-group">
                  <label className="admin-field-label">Brand Subtitle White</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.navbarBrandWhite || ''}
                    onChange={(e) => handleInputChange('navbarBrandWhite', e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Navbar Logo File</label>
                  <div className="admin-input-with-upload">
                    <input
                      type="text"
                      className="admin-pill-input"
                      value={cmsData.navbarLogo || ''}
                      onChange={(e) => handleInputChange('navbarLogo', e.target.value)}
                    />
                    <label className="admin-upload-icon-btn" title="Choose Logo Image">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileUpload(e, (name) => handleInputChange('navbarLogo', name))}
                      />
                    </label>
                  </div>
                </div>

                <div className="admin-field-group">
                  <label className="admin-field-label">Consultation Button Text</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.navbarCtaText || ''}
                    onChange={(e) => handleInputChange('navbarCtaText', e.target.value)}
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ==================================================================
            TAB 7: FOOTER MANAGEMENT
            ================================================================== */}
        {activeTab === 'footer' && (
          <div>
            <section className="admin-section-block">
              <h2 className="admin-section-heading">Footer Description &amp; Contact Info</h2>
              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Footer Clinic Bio Description</label>
                  <textarea
                    rows={3}
                    className="admin-pill-input admin-pill-textarea"
                    value={cmsData.footerClinicDesc || ''}
                    onChange={(e) => handleInputChange('footerClinicDesc', e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Footer Phone</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.footerPhone || ''}
                    onChange={(e) => handleInputChange('footerPhone', e.target.value)}
                  />
                </div>
                <div className="admin-field-group">
                  <label className="admin-field-label">Footer WhatsApp</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.footerWhatsApp || ''}
                    onChange={(e) => handleInputChange('footerWhatsApp', e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Footer Email</label>
                  <input
                    type="email"
                    className="admin-pill-input"
                    value={cmsData.footerEmail || ''}
                    onChange={(e) => handleInputChange('footerEmail', e.target.value)}
                  />
                </div>
                <div className="admin-field-group">
                  <label className="admin-field-label">Footer Address</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.footerAddress || ''}
                    onChange={(e) => handleInputChange('footerAddress', e.target.value)}
                  />
                </div>
              </div>
            </section>

            <section className="admin-section-block">
              <h2 className="admin-section-heading">Social Media Links &amp; Copyright</h2>
              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Facebook URL</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.footerFacebook || ''}
                    onChange={(e) => handleInputChange('footerFacebook', e.target.value)}
                  />
                </div>
                <div className="admin-field-group">
                  <label className="admin-field-label">Instagram URL</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.footerInstagram || ''}
                    onChange={(e) => handleInputChange('footerInstagram', e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">YouTube URL</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.footerYoutube || ''}
                    onChange={(e) => handleInputChange('footerYoutube', e.target.value)}
                  />
                </div>
                <div className="admin-field-group">
                  <label className="admin-field-label">LinkedIn URL</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.footerLinkedin || ''}
                    onChange={(e) => handleInputChange('footerLinkedin', e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Copyright Notice Bar</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.footerCopyright || ''}
                    onChange={(e) => handleInputChange('footerCopyright', e.target.value)}
                  />
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Floating Success Toast Alert */}
      {showToast && (
        <div className="admin-toast-alert">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Changes saved successfully! Live website updated.</span>
        </div>
      )}
    </div>
  );
}
