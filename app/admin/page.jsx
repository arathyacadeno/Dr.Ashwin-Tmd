'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { upload } from '@vercel/blob/client';
import { useCms, defaultCmsData } from '@/context/CmsContext';
import '@/styles/admin.css';

export default function AdminDashboardPage() {
  const { content, saveContent } = useCms();
  const [activeTab, setActiveTab] = useState('home');
  const [cmsData, setCmsData] = useState(content || defaultCmsData);
  const [showToast, setShowToast] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadToast, setUploadToast] = useState('');
  const [activeMetricIndex, setActiveMetricIndex] = useState(null);

  useEffect(() => {
    if (content) {
      setCmsData(content);
    }
  }, [content]);

  // Save changes handler
  const handleSave = async () => {
    try {
      setIsSaving(true);
      await saveContent(cmsData);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3500);
    } catch (err) {
      console.error('Error saving:', err);
      alert('Failed to save changes: ' + (err.message || 'Please check network connection.'));
    } finally {
      setIsSaving(false);
    }
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

  const handleFileUpload = async (e, callback) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setUploadToast(`Uploading ${file.name}...`);

      const cleanName = file.name.replace(/[<>:"/\\|?*]/g, '_');
      await upload(cleanName, file, {
        access: 'private',
        handleUploadUrl: '/api/upload',
      });

      const mediaPath = `/api/media/${cleanName}`;
      callback(mediaPath);
      setUploadToast(`Uploaded ${cleanName} successfully!`);
      setTimeout(() => setUploadToast(''), 3500);
    } catch (err) {
      console.error('File upload error:', err);
      alert('File upload failed: ' + (err.message || 'Please try again.'));
      setUploadToast('');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="admin-layout-wrapper">
      {/* ====================================================================
          Left Dark Charcoal Sidebar (Exact Figma UI: #63676D)
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
            <span className="admin-nav-text" style={{ paddingLeft: '8px' }}>Home</span>
          </button>

          {/* About Us Tab */}
          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            <span className="admin-nav-text" style={{ paddingLeft: '8px' }}>About Us</span>
          </button>

          {/* What is TMD Tab */}
          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'tmd' ? 'active' : ''}`}
            onClick={() => setActiveTab('tmd')}
          >
            <span className="admin-nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </span>
            <span className="admin-nav-text">What is TMD</span>
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
          Main Content Canvas (Exact Figma Layout)
          ==================================================================== */}
      <main className="admin-content-area">
        {/* Top Header Row (Pinned Right Action Buttons) */}
        <header className="admin-header-row">
          <div className="admin-title-group">
            <h1>
              {activeTab === 'home' && 'Homepage Management'}
              {activeTab === 'about' && 'About Us Management'}
              {activeTab === 'tmd' && 'What is TMD Management'}
              {activeTab === 'treatments' && 'Treatments Management'}
              {activeTab === 'contact' && 'Contact Us Management'}
              {activeTab === 'navbar' && 'Navigation Bar Management'}
              {activeTab === 'footer' && 'Footer Management'}
            </h1>
            <p>
              {activeTab === 'home' && 'Manage the main Home page content displayed on the homepage'}
              {activeTab === 'about' && "Manage the clinic narrative, hero section, philosophy, core ethos, and Dr. Ashwin's profile and credentials displayed on the live Our Story page."}
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
              className="admin-preview-btn"
            >
              <span>View Live Website</span>
            </Link>
            <button
              type="button"
              className="admin-save-btn"
              onClick={handleSave}
              disabled={isSaving}
              style={{ opacity: isSaving ? 0.7 : 1, cursor: isSaving ? 'wait' : 'pointer' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </header>

        {/* ==================================================================
            TAB 1: HOMEPAGE MANAGEMENT (Exact Figma Screenshots 1 - 5)
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
                  <div className="admin-input-upload-pill">
                    <input
                      type="text"
                      value={cmsData.heroVideo || ''}
                      placeholder="Upload Video"
                      onChange={(e) => handleInputChange('heroVideo', e.target.value)}
                    />
                    <label className="admin-upload-icon-trigger" title="Upload Video">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleFileUpload(e, (name) => handleInputChange('heroVideo', name))}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Hero CTA Button: Single Wide Pill with 2 inputs and divider (Screenshot 1) */}
              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Hero CTA Button</label>
                  <div className="admin-cta-dual-pill">
                    <input
                      type="text"
                      className="admin-cta-half-input"
                      value={cmsData.heroCta1 || ''}
                      onChange={(e) => handleInputChange('heroCta1', e.target.value)}
                    />
                    <div className="admin-cta-dual-divider"></div>
                    <input
                      type="text"
                      className="admin-cta-half-input"
                      value={cmsData.heroCta2 || ''}
                      onChange={(e) => handleInputChange('heroCta2', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Dr. Ashwin Introduction (Screenshot 1) */}
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

              <div className="admin-grid-2col">
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
                  <div className="admin-input-upload-pill">
                    <input
                      type="text"
                      value={cmsData.docImage || ''}
                      placeholder="Upload Image For Doctor"
                      onChange={(e) => handleInputChange('docImage', e.target.value)}
                    />
                    <label className="admin-upload-icon-trigger" title="Upload Doctor Image">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (name) => handleInputChange('docImage', name))}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Lifestyle Benefits Section (Screenshot 2) */}
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

              {/* Cards 1 & 2 Titles */}
              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 1</label>
                  <div className="admin-input-upload-pill">
                    <input
                      type="text"
                      value={cmsData.lifestyleCards?.[0]?.title || ''}
                      onChange={(e) => handleCardChange('lifestyleCards', 0, 'title', e.target.value)}
                    />
                    <label className="admin-upload-icon-trigger">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (name) => handleCardChange('lifestyleCards', 0, 'img', name))}
                      />
                    </label>
                  </div>
                </div>

                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 2</label>
                  <div className="admin-input-upload-pill">
                    <input
                      type="text"
                      value={cmsData.lifestyleCards?.[1]?.title || ''}
                      onChange={(e) => handleCardChange('lifestyleCards', 1, 'title', e.target.value)}
                    />
                    <label className="admin-upload-icon-trigger">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (name) => handleCardChange('lifestyleCards', 1, 'img', name))}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Cards 1 & 2 Descriptions */}
              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 1 Description</label>
                  <textarea
                    rows={4}
                    className="admin-pill-input admin-pill-textarea"
                    value={cmsData.lifestyleCards?.[0]?.desc || ''}
                    onChange={(e) => handleCardChange('lifestyleCards', 0, 'desc', e.target.value)}
                  />
                </div>
                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 2 Description</label>
                  <textarea
                    rows={4}
                    className="admin-pill-input admin-pill-textarea"
                    value={cmsData.lifestyleCards?.[1]?.desc || ''}
                    onChange={(e) => handleCardChange('lifestyleCards', 1, 'desc', e.target.value)}
                  />
                </div>
              </div>

              {/* Cards 3 & 4 Titles */}
              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 3</label>
                  <div className="admin-input-upload-pill">
                    <input
                      type="text"
                      value={cmsData.lifestyleCards?.[2]?.title || ''}
                      onChange={(e) => handleCardChange('lifestyleCards', 2, 'title', e.target.value)}
                    />
                    <label className="admin-upload-icon-trigger">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (name) => handleCardChange('lifestyleCards', 2, 'img', name))}
                      />
                    </label>
                  </div>
                </div>

                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 4</label>
                  <div className="admin-input-upload-pill">
                    <input
                      type="text"
                      value={cmsData.lifestyleCards?.[3]?.title || ''}
                      onChange={(e) => handleCardChange('lifestyleCards', 3, 'title', e.target.value)}
                    />
                    <label className="admin-upload-icon-trigger">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (name) => handleCardChange('lifestyleCards', 3, 'img', name))}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Cards 3 & 4 Descriptions */}
              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 3 Description</label>
                  <textarea
                    rows={4}
                    className="admin-pill-input admin-pill-textarea"
                    value={cmsData.lifestyleCards?.[2]?.desc || ''}
                    onChange={(e) => handleCardChange('lifestyleCards', 2, 'desc', e.target.value)}
                  />
                </div>
                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 4 Description</label>
                  <textarea
                    rows={4}
                    className="admin-pill-input admin-pill-textarea"
                    value={cmsData.lifestyleCards?.[3]?.desc || ''}
                    onChange={(e) => handleCardChange('lifestyleCards', 3, 'desc', e.target.value)}
                  />
                </div>
              </div>

              {/* Cards 5 Title & Full-Width Description */}
              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 5</label>
                  <div className="admin-input-upload-pill">
                    <input
                      type="text"
                      value={cmsData.lifestyleCards?.[4]?.title || ''}
                      onChange={(e) => handleCardChange('lifestyleCards', 4, 'title', e.target.value)}
                    />
                    <label className="admin-upload-icon-trigger">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (name) => handleCardChange('lifestyleCards', 4, 'img', name))}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 5 Description</label>
                  <textarea
                    rows={3}
                    className="admin-pill-input admin-pill-textarea"
                    value={cmsData.lifestyleCards?.[4]?.desc || ''}
                    onChange={(e) => handleCardChange('lifestyleCards', 4, 'desc', e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* Section 4: Treatments Section (Screenshot 3 & 4) */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">Treatments section.</h2>
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

              {/* Treatment Cards 1 & 2 */}
              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 1</label>
                  <div className="admin-input-upload-pill">
                    <input
                      type="text"
                      value={cmsData.treatmentCards?.[0]?.title || ''}
                      onChange={(e) => handleCardChange('treatmentCards', 0, 'title', e.target.value)}
                    />
                    <label className="admin-upload-icon-trigger">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (name) => handleCardChange('treatmentCards', 0, 'img', name))}
                      />
                    </label>
                  </div>
                </div>

                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 2</label>
                  <div className="admin-input-upload-pill">
                    <input
                      type="text"
                      value={cmsData.treatmentCards?.[1]?.title || ''}
                      onChange={(e) => handleCardChange('treatmentCards', 1, 'title', e.target.value)}
                    />
                    <label className="admin-upload-icon-trigger">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (name) => handleCardChange('treatmentCards', 1, 'img', name))}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 1 Description</label>
                  <textarea
                    rows={3}
                    className="admin-pill-input admin-pill-textarea"
                    value={cmsData.treatmentCards?.[0]?.desc || ''}
                    onChange={(e) => handleCardChange('treatmentCards', 0, 'desc', e.target.value)}
                  />
                </div>
                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 2 Description</label>
                  <textarea
                    rows={3}
                    className="admin-pill-input admin-pill-textarea"
                    value={cmsData.treatmentCards?.[1]?.desc || ''}
                    onChange={(e) => handleCardChange('treatmentCards', 1, 'desc', e.target.value)}
                  />
                </div>
              </div>

              {/* Treatment Cards 3 & 4 */}
              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 3</label>
                  <div className="admin-input-upload-pill">
                    <input
                      type="text"
                      value={cmsData.treatmentCards?.[2]?.title || ''}
                      onChange={(e) => handleCardChange('treatmentCards', 2, 'title', e.target.value)}
                    />
                    <label className="admin-upload-icon-trigger">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (name) => handleCardChange('treatmentCards', 2, 'img', name))}
                      />
                    </label>
                  </div>
                </div>

                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 4</label>
                  <div className="admin-input-upload-pill">
                    <input
                      type="text"
                      value={cmsData.treatmentCards?.[3]?.title || ''}
                      onChange={(e) => handleCardChange('treatmentCards', 3, 'title', e.target.value)}
                    />
                    <label className="admin-upload-icon-trigger">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (name) => handleCardChange('treatmentCards', 3, 'img', name))}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 3 Description</label>
                  <textarea
                    rows={3}
                    className="admin-pill-input admin-pill-textarea"
                    value={cmsData.treatmentCards?.[2]?.desc || ''}
                    onChange={(e) => handleCardChange('treatmentCards', 2, 'desc', e.target.value)}
                  />
                </div>
                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 4 Description</label>
                  <textarea
                    rows={3}
                    className="admin-pill-input admin-pill-textarea"
                    value={cmsData.treatmentCards?.[3]?.desc || ''}
                    onChange={(e) => handleCardChange('treatmentCards', 3, 'desc', e.target.value)}
                  />
                </div>
              </div>

              {/* Treatment Cards 5 & 6 */}
              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 5</label>
                  <div className="admin-input-upload-pill">
                    <input
                      type="text"
                      value={cmsData.treatmentCards?.[4]?.title || ''}
                      onChange={(e) => handleCardChange('treatmentCards', 4, 'title', e.target.value)}
                    />
                    <label className="admin-upload-icon-trigger">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (name) => handleCardChange('treatmentCards', 4, 'img', name))}
                      />
                    </label>
                  </div>
                </div>

                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 6</label>
                  <div className="admin-input-upload-pill">
                    <input
                      type="text"
                      value={cmsData.treatmentCards?.[5]?.title || ''}
                      onChange={(e) => handleCardChange('treatmentCards', 5, 'title', e.target.value)}
                    />
                    <label className="admin-upload-icon-trigger">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (name) => handleCardChange('treatmentCards', 5, 'img', name))}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 5 Description</label>
                  <textarea
                    rows={3}
                    className="admin-pill-input admin-pill-textarea"
                    value={cmsData.treatmentCards?.[4]?.desc || ''}
                    onChange={(e) => handleCardChange('treatmentCards', 4, 'desc', e.target.value)}
                  />
                </div>
                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 6 Description</label>
                  <textarea
                    rows={3}
                    className="admin-pill-input admin-pill-textarea"
                    value={cmsData.treatmentCards?.[5]?.desc || ''}
                    onChange={(e) => handleCardChange('treatmentCards', 5, 'desc', e.target.value)}
                  />
                </div>
              </div>

              {/* Treatment Card 7 */}
              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 7</label>
                  <div className="admin-input-upload-pill">
                    <input
                      type="text"
                      value={cmsData.treatmentCards?.[6]?.title || ''}
                      onChange={(e) => handleCardChange('treatmentCards', 6, 'title', e.target.value)}
                    />
                    <label className="admin-upload-icon-trigger">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (name) => handleCardChange('treatmentCards', 6, 'img', name))}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 7 Description</label>
                  <textarea
                    rows={3}
                    className="admin-pill-input admin-pill-textarea"
                    value={cmsData.treatmentCards?.[6]?.desc || ''}
                    onChange={(e) => handleCardChange('treatmentCards', 6, 'desc', e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* Section 5: Advanced Equipment / Technology Section (Screenshot 4 & 5) */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">Advanced Equipment / Technology Section</h2>
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

              {/* Equipment Cards 1 & 2 */}
              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 1</label>
                  <div className="admin-input-upload-pill">
                    <input
                      type="text"
                      value={cmsData.equipmentCards?.[0]?.title || ''}
                      onChange={(e) => handleCardChange('equipmentCards', 0, 'title', e.target.value)}
                    />
                    <label className="admin-upload-icon-trigger">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (name) => handleCardChange('equipmentCards', 0, 'img', name))}
                      />
                    </label>
                  </div>
                </div>

                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 2</label>
                  <div className="admin-input-upload-pill">
                    <input
                      type="text"
                      value={cmsData.equipmentCards?.[1]?.title || ''}
                      onChange={(e) => handleCardChange('equipmentCards', 1, 'title', e.target.value)}
                    />
                    <label className="admin-upload-icon-trigger">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (name) => handleCardChange('equipmentCards', 1, 'img', name))}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 1 Description</label>
                  <textarea
                    rows={3}
                    className="admin-pill-input admin-pill-textarea"
                    value={cmsData.equipmentCards?.[0]?.desc || ''}
                    onChange={(e) => handleCardChange('equipmentCards', 0, 'desc', e.target.value)}
                  />
                </div>
                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 2 Description</label>
                  <textarea
                    rows={3}
                    className="admin-pill-input admin-pill-textarea"
                    value={cmsData.equipmentCards?.[1]?.desc || ''}
                    onChange={(e) => handleCardChange('equipmentCards', 1, 'desc', e.target.value)}
                  />
                </div>
              </div>

              {/* Equipment Cards 3 & 4 */}
              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 3</label>
                  <div className="admin-input-upload-pill">
                    <input
                      type="text"
                      value={cmsData.equipmentCards?.[2]?.title || ''}
                      onChange={(e) => handleCardChange('equipmentCards', 2, 'title', e.target.value)}
                    />
                    <label className="admin-upload-icon-trigger">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (name) => handleCardChange('equipmentCards', 2, 'img', name))}
                      />
                    </label>
                  </div>
                </div>

                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 4</label>
                  <div className="admin-input-upload-pill">
                    <input
                      type="text"
                      value={cmsData.equipmentCards?.[3]?.title || ''}
                      onChange={(e) => handleCardChange('equipmentCards', 3, 'title', e.target.value)}
                    />
                    <label className="admin-upload-icon-trigger">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (name) => handleCardChange('equipmentCards', 3, 'img', name))}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 3 Description</label>
                  <textarea
                    rows={3}
                    className="admin-pill-input admin-pill-textarea"
                    value={cmsData.equipmentCards?.[2]?.desc || ''}
                    onChange={(e) => handleCardChange('equipmentCards', 2, 'desc', e.target.value)}
                  />
                </div>
                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 4 Description</label>
                  <textarea
                    rows={3}
                    className="admin-pill-input admin-pill-textarea"
                    value={cmsData.equipmentCards?.[3]?.desc || ''}
                    onChange={(e) => handleCardChange('equipmentCards', 3, 'desc', e.target.value)}
                  />
                </div>
              </div>

              {/* Equipment Cards 5 & 6 */}
              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 5</label>
                  <div className="admin-input-upload-pill">
                    <input
                      type="text"
                      value={cmsData.equipmentCards?.[4]?.title || ''}
                      onChange={(e) => handleCardChange('equipmentCards', 4, 'title', e.target.value)}
                    />
                    <label className="admin-upload-icon-trigger">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (name) => handleCardChange('equipmentCards', 4, 'img', name))}
                      />
                    </label>
                  </div>
                </div>

                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 6</label>
                  <div className="admin-input-upload-pill">
                    <input
                      type="text"
                      value={cmsData.equipmentCards?.[5]?.title || ''}
                      onChange={(e) => handleCardChange('equipmentCards', 5, 'title', e.target.value)}
                    />
                    <label className="admin-upload-icon-trigger">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (name) => handleCardChange('equipmentCards', 5, 'img', name))}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 5 Description</label>
                  <textarea
                    rows={3}
                    className="admin-pill-input admin-pill-textarea"
                    value={cmsData.equipmentCards?.[4]?.desc || ''}
                    onChange={(e) => handleCardChange('equipmentCards', 4, 'desc', e.target.value)}
                  />
                </div>
                <div className="admin-field-group">
                  <label className="admin-field-label">Cards 6 Description</label>
                  <textarea
                    rows={3}
                    className="admin-pill-input admin-pill-textarea"
                    value={cmsData.equipmentCards?.[5]?.desc || ''}
                    onChange={(e) => handleCardChange('equipmentCards', 5, 'desc', e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* Section 6: Trust & Credibility Section (Screenshot 5) */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">Trust &amp; Credibility section.</h2>
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

              <div className="admin-metrics-grid-3col">
                {(cmsData.trustMetrics || []).map((metric, idx) => (
                  <div
                    key={idx}
                    className={`admin-metric-box ${activeMetricIndex === idx ? 'active' : ''}`}
                    onClick={(e) => {
                      setActiveMetricIndex(idx);
                      if (e.target.tagName !== 'INPUT') {
                        e.currentTarget.querySelector('.admin-metric-num-input')?.focus();
                      }
                    }}
                  >
                    <span className="admin-field-label" style={{ fontSize: '0.85rem' }}>Circle {idx + 1}</span>
                    <input
                      type="text"
                      className="admin-metric-num-input"
                      value={metric.number || ''}
                      onChange={(e) => handleMetricChange(idx, 'number', e.target.value)}
                      onFocus={() => setActiveMetricIndex(idx)}
                    />
                    <input
                      type="text"
                      className="admin-metric-lbl-input"
                      value={metric.label || ''}
                      onChange={(e) => handleMetricChange(idx, 'label', e.target.value)}
                      onFocus={() => setActiveMetricIndex(idx)}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Section 7: Patient Testimonials Section (Screenshot 5) */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">Patient Testimonials / Patient Stories section.</h2>
              
              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Section Name</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.testimonialsSectionName || ''}
                    onChange={(e) => handleInputChange('testimonialsSectionName', e.target.value)}
                  />
                </div>

                <div className="admin-field-group">
                  <label className="admin-field-label">Review Section</label>
                  <div className="admin-review-box-pill">
                    <div className="admin-review-box-inner">
                      <input
                        type="text"
                        className="admin-review-rating-input"
                        value={cmsData.reviewRating || '★★★★★'}
                        onChange={(e) => handleInputChange('reviewRating', e.target.value)}
                      />
                      <input
                        type="text"
                        className="admin-review-author-input"
                        value={cmsData.reviewAuthor || ''}
                        onChange={(e) => handleInputChange('reviewAuthor', e.target.value)}
                      />
                    </div>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
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

              <div className="admin-add-reviews-wrap">
                <button type="button" className="admin-add-reviews-btn" onClick={handleSave}>
                  Add Reviews
                </button>
              </div>
            </section>
          </div>
        )}

        {/* ==================================================================
            TAB 2: ABOUT US MANAGEMENT
            ================================================================== */}
        {activeTab === 'about' && (
          <div>
            {/* Section 01: Hero Section Heading */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">01. Hero Section Heading</h2>

              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Main Hero Heading (H1)</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={
                      cmsData.aboutHeroHeading ||
                      (cmsData.aboutHeroTitle1
                        ? `${cmsData.aboutHeroTitle1} ${cmsData.aboutHeroTitle2 || ''}`.trim()
                        : 'A clinic built around One thing, done properly')
                    }
                    onChange={(e) => {
                      handleInputChange('aboutHeroHeading', e.target.value);
                      const parts = e.target.value.split(/(?<=around)\s+/i);
                      if (parts.length === 2) {
                        handleInputChange('aboutHeroTitle1', parts[0]);
                        handleInputChange('aboutHeroTitle2', parts[1]);
                      } else {
                        handleInputChange('aboutHeroTitle1', e.target.value);
                        handleInputChange('aboutHeroTitle2', '');
                      }
                    }}
                  />
                </div>
              </div>

              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Hero Subtitle</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={
                      cmsData.aboutHeroSubtitle ||
                      "Dr. Ashwin's TMD Clinic, Calicut — jaw, bite and airway care with the time it deserves."
                    }
                    onChange={(e) => handleInputChange('aboutHeroSubtitle', e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* Section 02: Clinic Story */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">02. Clinic Story</h2>

              <div className="admin-grid-2col">
                {/* Left Column: Story Paragraph */}
                <div className="admin-field-group">
                  <label className="admin-field-label">Story Paragraph</label>
                  <textarea
                    rows={10}
                    className="admin-pill-input admin-pill-textarea"
                    style={{ minHeight: '190px', lineHeight: '1.6' }}
                    value={
                      cmsData.aboutStoryParagraph !== undefined
                        ? cmsData.aboutStoryParagraph
                        : [cmsData.aboutStoryP1, cmsData.aboutStoryP2, cmsData.aboutStoryP3]
                            .filter(Boolean)
                            .join('\n\n')
                    }
                    onChange={(e) => {
                      handleInputChange('aboutStoryParagraph', e.target.value);
                      const pars = e.target.value.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);
                      if (pars.length >= 1) handleInputChange('aboutStoryP1', pars[0]);
                      if (pars.length >= 2) handleInputChange('aboutStoryP2', pars[1]);
                      if (pars.length >= 3) handleInputChange('aboutStoryP3', pars.slice(2).join('\n\n'));
                    }}
                  />
                </div>

                {/* Right Column: Our Story Clinic Image */}
                <div className="admin-field-group">
                  <label className="admin-field-label">Our Story Clinic Image</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                    <div className="admin-input-upload-pill">
                      <input
                        type="text"
                        value={cmsData.aboutStoryLoungeImage || ''}
                        placeholder="Clinic Image (1)"
                        onChange={(e) => handleInputChange('aboutStoryLoungeImage', e.target.value)}
                      />
                      <label className="admin-upload-icon-trigger" title="Upload Clinic Image (1)">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="M21 15l-5-5L5 21" />
                          <line x1="19" y1="17" x2="19" y2="23" />
                          <line x1="16" y1="20" x2="22" y2="20" />
                        </svg>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, (name) => handleInputChange('aboutStoryLoungeImage', name))}
                        />
                      </label>
                    </div>

                    <div className="admin-input-upload-pill">
                      <input
                        type="text"
                        value={cmsData.aboutStoryExteriorImage || ''}
                        placeholder="Clinic Image (2)"
                        onChange={(e) => handleInputChange('aboutStoryExteriorImage', e.target.value)}
                      />
                      <label className="admin-upload-icon-trigger" title="Upload Clinic Image (2)">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="M21 15l-5-5L5 21" />
                          <line x1="19" y1="17" x2="19" y2="23" />
                          <line x1="16" y1="20" x2="22" y2="20" />
                        </svg>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, (name) => handleInputChange('aboutStoryExteriorImage', name))}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 03: Doctor Story */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">03. Doctor Story</h2>

              <div className="admin-grid-2col">
                {/* Left Column: 3 Hero Headings */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="admin-field-group">
                    <label className="admin-field-label">Hero Heading (H1)</label>
                    <input
                      type="text"
                      className="admin-pill-input"
                      value={cmsData.aboutDoctorTag || 'SPECIALIST'}
                      onChange={(e) => handleInputChange('aboutDoctorTag', e.target.value)}
                    />
                  </div>

                  <div className="admin-field-group">
                    <label className="admin-field-label">Hero Heading (H2)</label>
                    <input
                      type="text"
                      className="admin-pill-input"
                      value={cmsData.aboutDoctorQualification || 'MDS - ORAL & MAXILLOFCIAL SURGERY'}
                      onChange={(e) => handleInputChange('aboutDoctorQualification', e.target.value)}
                    />
                  </div>

                  <div className="admin-field-group">
                    <label className="admin-field-label">Hero Heading (H3)</label>
                    <input
                      type="text"
                      className="admin-pill-input"
                      value={cmsData.aboutDoctorName || 'Meet Dr.Ashwin'}
                      onChange={(e) => handleInputChange('aboutDoctorName', e.target.value)}
                    />
                  </div>
                </div>

                {/* Right Column: Description */}
                <div className="admin-field-group">
                  <label className="admin-field-label">Description</label>
                  <textarea
                    rows={8}
                    className="admin-pill-input admin-pill-textarea"
                    style={{ minHeight: '190px', lineHeight: '1.6' }}
                    value={
                      cmsData.aboutDoctorBio !== undefined
                        ? cmsData.aboutDoctorBio
                        : [cmsData.aboutDoctorBio1, cmsData.aboutDoctorBio2]
                            .filter(Boolean)
                            .join('\n\n')
                    }
                    onChange={(e) => {
                      handleInputChange('aboutDoctorBio', e.target.value);
                      const bios = e.target.value.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean);
                      if (bios.length >= 1) handleInputChange('aboutDoctorBio1', bios[0]);
                      if (bios.length >= 2) handleInputChange('aboutDoctorBio2', bios.slice(1).join('\n\n'));
                    }}
                  />
                </div>
              </div>

              {/* Full Width Quote */}
              <div className="admin-grid-full" style={{ marginTop: '1.2rem' }}>
                <div className="admin-field-group">
                  <label className="admin-field-label">Quote</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={
                      cmsData.aboutDoctorQuote ||
                      '“Good care starts with understanding the person, not just the symptom.”'
                    }
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

              {((cmsData.tmdSymptoms && cmsData.tmdSymptoms.length > 0) ? cmsData.tmdSymptoms : defaultCmsData.tmdSymptoms).map((sym, idx) => (
                <div key={idx} className="admin-grid-2col" style={{ marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                  <div className="admin-field-group">
                    <label className="admin-field-label">Category / Area {idx + 1}</label>
                    <input
                      type="text"
                      className="admin-pill-input"
                      placeholder="e.g. In the ears"
                      value={sym.tag || ''}
                      onChange={(e) => handleCardChange('tmdSymptoms', idx, 'tag', e.target.value)}
                    />
                    <label className="admin-field-label" style={{ marginTop: '0.75rem' }}>Symptom {idx + 1} Title</label>
                    <input
                      type="text"
                      className="admin-pill-input"
                      placeholder="e.g. Tension or pain"
                      value={sym.title || ''}
                      onChange={(e) => handleCardChange('tmdSymptoms', idx, 'title', e.target.value)}
                    />
                  </div>
                  <div className="admin-field-group">
                    <label className="admin-field-label">Description</label>
                    <textarea
                      rows={4}
                      className="admin-pill-input admin-pill-textarea"
                      value={sym.desc || ''}
                      onChange={(e) => handleCardChange('tmdSymptoms', idx, 'desc', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </section>

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

            <section className="admin-section-block">
              <h2 className="admin-section-heading">Diagnostic Stepper (5 Steps)</h2>
              {(cmsData.treatmentsSteps || []).map((step, idx) => (
                <div key={idx} className="admin-grid-2col" style={{ marginBottom: '1.2rem' }}>
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
                      rows={2}
                      className="admin-pill-input admin-pill-textarea"
                      value={step.desc || ''}
                      onChange={(e) => handleCardChange('treatmentsSteps', idx, 'desc', e.target.value)}
                    />
                  </div>
                </div>
              ))}
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
                  <label className="admin-field-label">Google Maps Search Query</label>
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
                  <div className="admin-input-upload-pill">
                    <input
                      type="text"
                      value={cmsData.navbarLogo || ''}
                      placeholder="logo.png"
                      onChange={(e) => handleInputChange('navbarLogo', e.target.value)}
                    />
                    <label className="admin-upload-icon-trigger">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
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

      {/* Floating Upload Toast Alert */}
      {uploadToast && (
        <div className="admin-toast-alert" style={{ background: isUploading ? '#1e293b' : '#166534', borderColor: isUploading ? '#3b82f6' : '#22c55e' }}>
          {isUploading ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="animate-spin">
              <circle cx="12" cy="12" r="10" strokeOpacity="0.25"></circle>
              <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor"></path>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
          <span>{uploadToast}</span>
        </div>
      )}
    </div>
  );
}
