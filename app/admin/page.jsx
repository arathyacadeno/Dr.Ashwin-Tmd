'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { upload } from '@vercel/blob/client';
import { useCms, defaultCmsData } from '@/context/CmsContext';
import { getGoogleMapsEmbedUrl } from '@/components/AppointmentForm';
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

  const handleArrayItemChange = (arrayKey, index, field, value) => {
    setCmsData((prev) => {
      const currentArray = [...(prev[arrayKey] || defaultCmsData[arrayKey] || [])];
      if (field) {
        currentArray[index] = { ...currentArray[index], [field]: value };
      } else {
        currentArray[index] = value;
      }
      return { ...prev, [arrayKey]: currentArray };
    });
  };

  const handleArrayItemAdd = (arrayKey, newItem) => {
    setCmsData((prev) => {
      const currentArray = [...(prev[arrayKey] || defaultCmsData[arrayKey] || [])];
      return { ...prev, [arrayKey]: [...currentArray, newItem] };
    });
  };

  const handleArrayItemRemove = (arrayKey, index) => {
    setCmsData((prev) => {
      const currentArray = [...(prev[arrayKey] || defaultCmsData[arrayKey] || [])];
      currentArray.splice(index, 1);
      return { ...prev, [arrayKey]: currentArray };
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
            <span className="admin-nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
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
            <span className="admin-nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            <span className="admin-nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </span>
            <span className="admin-nav-text">Treatments</span>
          </button>

          {/* Contact Us Tab */}
          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            <span className="admin-nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <span className="admin-nav-text">Contact Us</span>
          </button>

          {/* Navigation Bar Tab */}
          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'navbar' ? 'active' : ''}`}
            onClick={() => setActiveTab('navbar')}
          >
            <span className="admin-nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
              </svg>
            </span>
            <span className="admin-nav-text">Navigation Bar</span>
          </button>

          {/* Footer Tab */}
          <button
            type="button"
            className={`admin-nav-item ${activeTab === 'footer' ? 'active' : ''}`}
            onClick={() => setActiveTab('footer')}
          >
            <span className="admin-nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="3" y1="16" x2="21" y2="16" />
              </svg>
            </span>
            <span className="admin-nav-text">Footer</span>
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
              {activeTab === 'tmd' && 'What is TMD page Management'}
              {activeTab === 'treatments' && 'Treatments page Management'}
              {activeTab === 'contact' && 'Contact Us Management'}
              {activeTab === 'navbar' && 'Navigation Bar Management'}
              {activeTab === 'footer' && 'Footer Management'}
            </h1>
            <p>
              {activeTab === 'home' && 'Manage the main Home page content displayed on the homepage'}
              {activeTab === 'about' && "Manage the clinic narrative, hero section, philosophy, core ethos, and Dr. Ashwin's profile and credentials displayed on the live Our Story page."}
              {activeTab === 'tmd' && 'Manage educational TMD explanations, symptoms, and causes'}
              {activeTab === 'treatments' && 'Manage the main Home page content displayed on the Home age'}
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
            {/* ================================================================
                Section 01: Hero Section Heading
                ================================================================ */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">01. Hero Section Heading</h2>

              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Main Hero Heading (H1)</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={
                      cmsData.tmdHeroHeading !== undefined
                        ? cmsData.tmdHeroHeading
                        : `${cmsData.tmdHeroLine1 || 'What is TMD?'} ${cmsData.tmdHeroLine2 || 'Understand the condition'}`.trim()
                    }
                    onChange={(e) => {
                      handleInputChange('tmdHeroHeading', e.target.value);
                      if (e.target.value.includes('?')) {
                        const parts = e.target.value.split(/(?<=\?)\s*/);
                        handleInputChange('tmdHeroLine1', parts[0] || e.target.value);
                        handleInputChange('tmdHeroLine2', parts[1] || '');
                      } else {
                        handleInputChange('tmdHeroLine1', e.target.value);
                        handleInputChange('tmdHeroLine2', '');
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
                      cmsData.tmdHeroSub ||
                      'Temporomandibular joint dysfunction explained with clarity and clinical precision.'
                    }
                    onChange={(e) => handleInputChange('tmdHeroSub', e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* ================================================================
                Section 02: The busiest joint you own
                ================================================================ */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">02. The busiest joint you own</h2>

              <div className="admin-grid-2col">
                {/* Left Column: Section Heading with image upload */}
                <div className="admin-field-group">
                  <label className="admin-field-label">Section Heading</label>
                  <div className="admin-input-upload-pill">
                    <input
                      type="text"
                      value={cmsData.tmdBusiestJointTitle || 'The Busiest Joint You Own'}
                      onChange={(e) => handleInputChange('tmdBusiestJointTitle', e.target.value)}
                    />
                    <label className="admin-upload-icon-trigger" title="Upload joint image or diagram">
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
                        onChange={(e) => handleFileUpload(e, (name) => handleInputChange('tmdBusiestJointImage', name))}
                      />
                    </label>
                  </div>
                </div>

                {/* Right Column: Description */}
                <div className="admin-field-group">
                  <label className="admin-field-label">Description</label>
                  <textarea
                    rows={7}
                    className="admin-pill-input admin-pill-textarea"
                    style={{ minHeight: '170px', lineHeight: '1.6' }}
                    value={
                      cmsData.tmdBusiestJointText ||
                      `Put a finger just in front of your ear and open your mouth. That movement is your temporomandibular joint — the TMJ. You use it every time you speak, eat, swallow or yawn.\n\nIt is a clever joint. It hinges and slides at the same time, the two sides have to move together, and a small cushioning disc rides along inside it. When all of that runs smoothly you never think about it.\n\nWhen something is slightly off, you feel it — sometimes in the jaw, often somewhere else entirely. TMD simply means a problem with this joint or the muscles that move it. It is common, it is well studied, and in most cases it responds well to straightforward treatment.`
                    }
                    onChange={(e) => handleInputChange('tmdBusiestJointText', e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* ================================================================
                Section 02 (Part B): Why the jaw is such a good disguise artist
                ================================================================ */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">02. Why the jaw is such a good disguise artist</h2>

              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Section Heading</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    style={{ maxWidth: '600px' }}
                    value={cmsData.tmdDisguiseTitle || 'Why the jaw is such a good disguise artist'}
                    onChange={(e) => handleInputChange('tmdDisguiseTitle', e.target.value)}
                  />
                </div>
              </div>

              {/* 6 Cards in 2-Column Grid */}
              <div className="admin-grid-2col" style={{ marginTop: '1.2rem', rowGap: '1.8rem' }}>
                {/* Left Column: Cards 1, 3, 5 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                  {[0, 2, 4].map((i) => {
                    const item = (cmsData.tmdSymptoms || defaultCmsData.tmdSymptoms || [])[i] || {};
                    return (
                      <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                        <div className="admin-field-group">
                          <label className="admin-field-label">Cards {i + 1}</label>
                          <input
                            type="text"
                            className="admin-pill-input"
                            value={item.tag || ''}
                            onChange={(e) => handleCardChange('tmdSymptoms', i, 'tag', e.target.value)}
                          />
                        </div>
                        <div className="admin-field-group">
                          <label className="admin-field-label">Sub Heading</label>
                          <input
                            type="text"
                            className="admin-pill-input"
                            value={item.title || ''}
                            onChange={(e) => handleCardChange('tmdSymptoms', i, 'title', e.target.value)}
                          />
                        </div>
                        <div className="admin-field-group">
                          <label className="admin-field-label">Cards {i + 1} Description</label>
                          <textarea
                            rows={3}
                            className="admin-pill-input admin-pill-textarea"
                            style={{ minHeight: '90px' }}
                            value={item.desc || ''}
                            onChange={(e) => handleCardChange('tmdSymptoms', i, 'desc', e.target.value)}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right Column: Cards 2, 4, 6 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                  {[1, 3, 5].map((i) => {
                    const item = (cmsData.tmdSymptoms || defaultCmsData.tmdSymptoms || [])[i] || {};
                    return (
                      <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                        <div className="admin-field-group">
                          <label className="admin-field-label">Cards {i + 1}</label>
                          <input
                            type="text"
                            className="admin-pill-input"
                            value={item.tag || ''}
                            onChange={(e) => handleCardChange('tmdSymptoms', i, 'tag', e.target.value)}
                          />
                        </div>
                        <div className="admin-field-group">
                          <label className="admin-field-label">Sub Heading</label>
                          <input
                            type="text"
                            className="admin-pill-input"
                            value={item.title || ''}
                            onChange={(e) => handleCardChange('tmdSymptoms', i, 'title', e.target.value)}
                          />
                        </div>
                        <div className="admin-field-group">
                          <label className="admin-field-label">Cards {i + 1} Description</label>
                          <textarea
                            rows={3}
                            className="admin-pill-input admin-pill-textarea"
                            style={{ minHeight: '90px' }}
                            value={item.desc || ''}
                            onChange={(e) => handleCardChange('tmdSymptoms', i, 'desc', e.target.value)}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* ================================================================
                Section 03: The usual reasons
                ================================================================ */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">03. The usual reasons</h2>

              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Section Heading</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.tmdCausesTitle || 'The usual reasons'}
                    onChange={(e) => handleInputChange('tmdCausesTitle', e.target.value)}
                  />
                </div>
                <div className="admin-field-group">
                  <label className="admin-field-label">Sub Heading</label>
                  <textarea
                    rows={2}
                    className="admin-pill-input admin-pill-textarea"
                    style={{ minHeight: '70px' }}
                    value={
                      cmsData.tmdCausesSub ||
                      'TMD rarely arrives from a single clear event. For most patients, several factors build up together until the system simply runs out of room to compensate.'
                    }
                    onChange={(e) => handleInputChange('tmdCausesSub', e.target.value)}
                  />
                </div>
              </div>

              {/* 8 Causes in 2 Columns */}
              <div className="admin-grid-2col" style={{ marginTop: '1.4rem', rowGap: '1.4rem' }}>
                {/* Left Column: Causes 1, 3, 5, 7 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                  {[0, 2, 4, 6].map((i) => {
                    const cause = (cmsData.tmdCauses || defaultCmsData.tmdCauses || [])[i] || {};
                    const label = `Cause 0${i + 1}`;
                    return (
                      <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                        <span className="admin-small-meta-tag">{label}</span>
                        <input
                          type="text"
                          className="admin-pill-input"
                          value={cause.title || ''}
                          onChange={(e) => handleCardChange('tmdCauses', i, 'title', e.target.value)}
                        />
                        <input
                          type="text"
                          className="admin-pill-input"
                          style={{ borderRadius: '12px', fontSize: '0.86rem', color: '#374151' }}
                          value={cause.desc || ''}
                          onChange={(e) => handleCardChange('tmdCauses', i, 'desc', e.target.value)}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Right Column: Causes 2, 4, 6, 8 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                  {[1, 3, 5, 7].map((i) => {
                    const cause = (cmsData.tmdCauses || defaultCmsData.tmdCauses || [])[i] || {};
                    const label = `Cause 0${i + 1}`;
                    return (
                      <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                        <span className="admin-small-meta-tag">{label}</span>
                        <input
                          type="text"
                          className="admin-pill-input"
                          value={cause.title || ''}
                          onChange={(e) => handleCardChange('tmdCauses', i, 'title', e.target.value)}
                        />
                        <input
                          type="text"
                          className="admin-pill-input"
                          style={{ borderRadius: '12px', fontSize: '0.86rem', color: '#374151' }}
                          value={cause.desc || ''}
                          onChange={(e) => handleCardChange('tmdCauses', i, 'desc', e.target.value)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* ================================================================
                Section 04: A Good Time to Come In
                ================================================================ */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">04. A Good Time to Come In</h2>

              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Section Heading</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.tmdWhenTitle || 'A Good Time to Come In'}
                    onChange={(e) => handleInputChange('tmdWhenTitle', e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Intro Text</label>
                  <textarea
                    rows={2}
                    className="admin-pill-input admin-pill-textarea"
                    style={{ minHeight: '65px' }}
                    value={
                      cmsData.tmdWhenIntro !== undefined
                        ? cmsData.tmdWhenIntro
                        : cmsData.tmdWhenText ||
                        'You do not need to wait until the pain becomes severe or debilitating. Early evaluation protects the articular cartilage and prevents chronic muscular adaptation.'
                    }
                    onChange={(e) => {
                      handleInputChange('tmdWhenIntro', e.target.value);
                      handleInputChange('tmdWhenText', e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Warning Checkpoints</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {(cmsData.tmdCheckpoints || defaultCmsData.tmdCheckpoints || []).map((cp, idx) => (
                      <div key={idx} className="admin-input-action-pill">
                        <input
                          type="text"
                          value={cp || ''}
                          onChange={(e) => handleArrayItemChange('tmdCheckpoints', idx, null, e.target.value)}
                        />
                        <button
                          type="button"
                          className="admin-action-icon-btn"
                          title="Delete checkpoint"
                          onClick={() => handleArrayItemRemove('tmdCheckpoints', idx)}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div>
                    <button
                      type="button"
                      className="admin-add-pill-btn"
                      onClick={() => handleArrayItemAdd('tmdCheckpoints', 'New warning checkpoint')}
                    >
                      <span style={{ fontSize: '1.1rem', lineHeight: '1' }}>+</span>
                      <span>Add Sign Point</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* ================================================================
                Section 05: Every Consultation Includes
                ================================================================ */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">05.Every Consultation Includes</h2>

              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Section Heading</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    style={{ maxWidth: '500px' }}
                    value={cmsData.tmdConsultTitle || 'Every Consultation Includes'}
                    onChange={(e) => handleInputChange('tmdConsultTitle', e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-grid-3col" style={{ marginTop: '1.2rem' }}>
                {(cmsData.tmdConsultPoints || defaultCmsData.tmdConsultPoints || []).map((pt, idx) => (
                  <div key={idx} className="admin-card-box">
                    <span className="admin-small-meta-tag">{pt.pointNum || `POINT ${idx + 1}`}</span>
                    <div className="admin-field-group" style={{ marginBottom: '0.85rem' }}>
                      <input
                        type="text"
                        className="admin-pill-input"
                        value={pt.title || ''}
                        onChange={(e) => handleArrayItemChange('tmdConsultPoints', idx, 'title', e.target.value)}
                      />
                    </div>
                    <div className="admin-field-group">
                      <textarea
                        rows={4}
                        className="admin-pill-input admin-pill-textarea"
                        style={{ minHeight: '90px', fontSize: '0.88rem' }}
                        value={pt.desc || ''}
                        onChange={(e) => handleArrayItemChange('tmdConsultPoints', idx, 'desc', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ================================================================
                Section 06: CTA (Call To Action)
                ================================================================ */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">06.CTA (Call To Action)</h2>

              <div className="admin-grid-3col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Heading</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.tmdCtaHeading || 'Ready to speak with Dr. Ashwin?'}
                    onChange={(e) => handleInputChange('tmdCtaHeading', e.target.value)}
                  />
                </div>

                <div className="admin-field-group">
                  <label className="admin-field-label">Button Text</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.tmdCtaButtonText || 'Book your consultation'}
                    onChange={(e) => handleInputChange('tmdCtaButtonText', e.target.value)}
                  />
                </div>

                <div className="admin-field-group">
                  <label className="admin-field-label">Button Link</label>
                  <div className="admin-input-action-pill">
                    <input
                      type="text"
                      value={cmsData.tmdCtaButtonLink || '/contact.html'}
                      onChange={(e) => handleInputChange('tmdCtaButtonLink', e.target.value)}
                    />
                    <span style={{ paddingRight: '1.25rem', color: '#64748B', display: 'flex' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* ================================================================
                Section 07: Questions Patients Ask / FAQ
                ================================================================ */}
            <section className="admin-section-block">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h2 className="admin-section-heading" style={{ margin: 0 }}>07.Questions Patients Ask / FAQ</h2>
                <button
                  type="button"
                  className="admin-add-faq-btn"
                  onClick={() =>
                    handleArrayItemAdd('tmdFaqs', {
                      itemNum: `FAQ ITEM 0${(cmsData.tmdFaqs || defaultCmsData.tmdFaqs || []).length + 1}`,
                      q: 'New Question?',
                      a: 'New Answer description here.',
                    })
                  }
                >
                  <span style={{ fontSize: '1.1rem', lineHeight: '1' }}>+</span>
                  <span>Add FAQ</span>
                </button>
              </div>

              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Section Heading</label>
                  <div className="admin-input-action-pill">
                    <input
                      type="text"
                      value={cmsData.tmdFaqTitle || 'Questions patients ask'}
                      onChange={(e) => handleInputChange('tmdFaqTitle', e.target.value)}
                    />
                    <button
                      type="button"
                      className="admin-action-icon-btn"
                      title="Clear title"
                      onClick={() => handleInputChange('tmdFaqTitle', '')}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Sub Heading</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={
                      cmsData.tmdFaqSubtitle ||
                      'Transparent answers to common clinical inquiries regarding pain relief, treatment duration, and diagnostic necessity.'
                    }
                    onChange={(e) => handleInputChange('tmdFaqSubtitle', e.target.value)}
                  />
                </div>
              </div>

              {/* FAQ Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.5rem' }}>
                {(cmsData.tmdFaqs || defaultCmsData.tmdFaqs || []).map((faq, idx) => (
                  <div key={idx} className="admin-card-box">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                      <span className="admin-small-meta-tag">{faq.itemNum || `FAQ ITEM 0${idx + 1}`}</span>
                      <button
                        type="button"
                        className="admin-action-icon-btn"
                        title="Delete this FAQ"
                        onClick={() => handleArrayItemRemove('tmdFaqs', idx)}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>

                    <div className="admin-field-group" style={{ marginBottom: '1rem' }}>
                      <label className="admin-field-label" style={{ fontSize: '0.82rem' }}>Question</label>
                      <input
                        type="text"
                        className="admin-pill-input"
                        value={faq.q || ''}
                        onChange={(e) => handleArrayItemChange('tmdFaqs', idx, 'q', e.target.value)}
                      />
                    </div>

                    <div className="admin-field-group">
                      <label className="admin-field-label" style={{ fontSize: '0.82rem' }}>Answer</label>
                      <textarea
                        rows={3}
                        className="admin-pill-input admin-pill-textarea"
                        style={{ minHeight: '80px', fontSize: '0.9rem' }}
                        value={faq.a || ''}
                        onChange={(e) => handleArrayItemChange('tmdFaqs', idx, 'a', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ==================================================================
            TAB 4: TREATMENTS MANAGEMENT
            ================================================================== */}
        {activeTab === 'treatments' && (
          <div>
            {/* ================================================================
                Section 01: Hero Section Heading
                ================================================================ */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">01. Hero Section Heading</h2>

              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Main Hero Heading (H1)</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={
                      cmsData.treatmentsHeroTitle !== undefined
                        ? cmsData.treatmentsHeroTitle
                        : 'Gentle, reversible, and explained before it begins'
                    }
                    onChange={(e) => handleInputChange('treatmentsHeroTitle', e.target.value)}
                    placeholder="Gentle, reversible, and explained before it begins"
                  />
                </div>
              </div>

              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Hero Subtitle</label>
                  <textarea
                    rows={2}
                    className="admin-pill-input admin-pill-textarea"
                    style={{ minHeight: '65px', borderRadius: '16px' }}
                    value={
                      cmsData.treatmentsHeroSub !== undefined
                        ? cmsData.treatmentsHeroSub
                        : 'We start with the simplest approach that will work, and we only move further if we need to.'
                    }
                    onChange={(e) => handleInputChange('treatmentsHeroSub', e.target.value)}
                    placeholder="We start with the simplest approach that will work, and we only move further if we need to."
                  />
                </div>
              </div>
            </section>

            {/* ================================================================
                Section 02: Treatment Cards
                ================================================================ */}
            <section className="admin-section-block">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h2 className="admin-section-heading" style={{ margin: 0 }}>02. Treatment Cards</h2>
                <button
                  type="button"
                  className="admin-add-faq-btn"
                  onClick={() =>
                    handleArrayItemAdd('treatmentsShowcaseCards', {
                      title: `New Treatment Card`,
                      desc: `Treatment description here.`,
                      img: '/assets/images/with petient.png',
                    })
                  }
                >
                  <span style={{ fontSize: '1.1rem', lineHeight: '1' }}>+</span>
                  <span>Add Card</span>
                </button>
              </div>

              <div className="admin-grid-2col">
                {(cmsData.treatmentsShowcaseCards || defaultCmsData.treatmentsShowcaseCards || []).map((card, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '0.85rem' }}>
                    <div className="admin-field-group">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <label className="admin-field-label">Cards {idx + 1}</label>
                        {idx >= 6 && (
                          <button
                            type="button"
                            className="admin-action-icon-btn"
                            title="Delete card"
                            style={{ padding: 0 }}
                            onClick={() => handleArrayItemRemove('treatmentsShowcaseCards', idx)}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        )}
                      </div>
                      <div className="admin-input-upload-pill">
                        <input
                          type="text"
                          value={card.title || ''}
                          onChange={(e) => handleCardChange('treatmentsShowcaseCards', idx, 'title', e.target.value)}
                          placeholder={`Card ${idx + 1} Title`}
                        />
                        <label className="admin-upload-icon-trigger" title={card.img ? `File: ${card.img}` : 'Upload card image'}>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                            <line x1="19" y1="16" x2="19" y2="22" />
                            <line x1="16" y1="19" x2="22" y2="19" />
                          </svg>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, (name) => handleCardChange('treatmentsShowcaseCards', idx, 'img', name))}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="admin-field-group">
                      <label className="admin-field-label">Cards {idx + 1} Description</label>
                      <textarea
                        rows={4}
                        className="admin-pill-input admin-pill-textarea"
                        style={{ minHeight: '110px', borderRadius: '16px' }}
                        value={card.desc || ''}
                        onChange={(e) => handleCardChange('treatmentsShowcaseCards', idx, 'desc', e.target.value)}
                        placeholder={`Card ${idx + 1} description...`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ================================================================
                Section 03: What Treatment Can Involve Cards
                ================================================================ */}
            <section className="admin-section-block">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h2 className="admin-section-heading" style={{ margin: 0 }}>03. What Treatment Can Involve Cards</h2>
                <button
                  type="button"
                  className="admin-add-faq-btn"
                  onClick={() =>
                    handleArrayItemAdd('treatmentsSteps', {
                      stepNum: `0${(cmsData.treatmentsSteps || defaultCmsData.treatmentsSteps || []).length + 1}`,
                      title: `New Step`,
                      desc: `Step description here.`,
                      img: '/assets/images/care_listen_first.jpg',
                    })
                  }
                >
                  <span style={{ fontSize: '1.1rem', lineHeight: '1' }}>+</span>
                  <span>Add Card</span>
                </button>
              </div>

              <div className="admin-grid-2col">
                {(cmsData.treatmentsSteps || defaultCmsData.treatmentsSteps || []).map((step, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginBottom: '0.85rem' }}>
                    <div className="admin-field-group">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <label className="admin-field-label">Cards {idx + 1}</label>
                        {idx >= 5 && (
                          <button
                            type="button"
                            className="admin-action-icon-btn"
                            title="Delete step"
                            style={{ padding: 0 }}
                            onClick={() => handleArrayItemRemove('treatmentsSteps', idx)}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        )}
                      </div>
                      <div className="admin-input-upload-pill">
                        <input
                          type="text"
                          value={step.title || ''}
                          onChange={(e) => handleCardChange('treatmentsSteps', idx, 'title', e.target.value)}
                          placeholder={`Card ${idx + 1} Title`}
                        />
                        <label className="admin-upload-icon-trigger" title={step.img ? `File: ${step.img}` : 'Upload step image'}>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                            <line x1="19" y1="16" x2="19" y2="22" />
                            <line x1="16" y1="19" x2="22" y2="19" />
                          </svg>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, (name) => handleCardChange('treatmentsSteps', idx, 'img', name))}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="admin-field-group">
                      <label className="admin-field-label">Cards {idx + 1} Description</label>
                      <textarea
                        rows={4}
                        className="admin-pill-input admin-pill-textarea"
                        style={{ minHeight: '110px', borderRadius: '16px' }}
                        value={step.desc || ''}
                        onChange={(e) => handleCardChange('treatmentsSteps', idx, 'desc', e.target.value)}
                        placeholder={`Card ${idx + 1} description...`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ================================================================
                Section 04: Clear steps. No surprises. Section
                ================================================================ */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">04 Clear steps. No surprises. Section</h2>

              <div className="admin-grid-2col">
                {(cmsData.treatmentsJourneySteps || defaultCmsData.treatmentsJourneySteps || []).map((step, idx) => (
                  <div key={idx} className="admin-field-group" style={{ marginBottom: '1.25rem' }}>
                    <span
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        color: '#64748B',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        marginBottom: '0.2rem',
                      }}
                    >
                      STEP 0{idx + 1}
                    </span>
                    <input
                      type="text"
                      className="admin-pill-input"
                      style={{ marginBottom: '0.55rem' }}
                      value={step.title || ''}
                      onChange={(e) => handleCardChange('treatmentsJourneySteps', idx, 'title', e.target.value)}
                      placeholder={`Step ${idx + 1} title`}
                    />
                    <textarea
                      rows={2}
                      className="admin-pill-input admin-pill-textarea"
                      style={{
                        minHeight: '62px',
                        borderRadius: '14px',
                        fontSize: '0.88rem',
                        lineHeight: '1.5',
                      }}
                      value={step.desc || ''}
                      onChange={(e) => handleCardChange('treatmentsJourneySteps', idx, 'desc', e.target.value)}
                      placeholder={`Step ${idx + 1} description`}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* ================================================================
                Section 05: Footer "Treatments" Navigation Column
                ================================================================ */}
            <section className="admin-section-block">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div>
                  <h2 className="admin-section-heading" style={{ margin: 0 }}>05. Footer &quot;Treatments&quot; Navigation Column</h2>
                  <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#8E95A0' }}>
                    Edit the treatment items listed in the website footer. All items automatically link to the Treatments page.
                  </p>
                </div>
                <button
                  type="button"
                  className="admin-add-faq-btn"
                  onClick={() =>
                    handleArrayItemAdd('footerTreatmentsLinks', {
                      label: 'New Treatment Service',
                      url: '/treatments',
                    })
                  }
                >
                  <span style={{ fontSize: '1.1rem', lineHeight: '1' }}>+</span>
                  <span>Add Treatment Item</span>
                </button>
              </div>

              <div className="admin-grid-full" style={{ marginBottom: '1.25rem' }}>
                <div className="admin-field-group">
                  <label className="admin-field-label">Column Title (Gold Header)</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.footerTreatmentsTitle || ''}
                    onChange={(e) => handleInputChange('footerTreatmentsTitle', e.target.value)}
                    placeholder="Treatments"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {(cmsData.footerTreatmentsLinks || defaultCmsData.footerTreatmentsLinks || []).map((link, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      background: '#18191B',
                      border: '1px solid #2C2F36',
                      borderRadius: '14px',
                      padding: '0.75rem 1rem',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <span style={{ display: 'block', fontSize: '0.75rem', color: '#8E95A0', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Treatment Item #{idx + 1}
                      </span>
                      <input
                        type="text"
                        className="admin-pill-input"
                        value={link.label || ''}
                        onChange={(e) => handleCardChange('footerTreatmentsLinks', idx, 'label', e.target.value)}
                        placeholder="e.g. Neuromuscular dentistry"
                      />
                    </div>
                    <div style={{ paddingTop: '18px' }}>
                      <button
                        type="button"
                        className="admin-action-icon-btn"
                        title="Remove treatment"
                        onClick={() => handleArrayItemRemove('footerTreatmentsLinks', idx)}
                      >
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
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
            {/* 01. Contact Hero Section */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">01. Contact Hero Section</h2>
              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Hero Title</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.contactHeroTitle || ''}
                    onChange={(e) => handleInputChange('contactHeroTitle', e.target.value)}
                    placeholder="Book your consultation"
                  />
                </div>
              </div>
              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Hero Subtitle</label>
                  <textarea
                    rows={2}
                    className="admin-pill-input admin-pill-textarea"
                    style={{ minHeight: '65px' }}
                    value={cmsData.contactHeroSub || ''}
                    onChange={(e) => handleInputChange('contactHeroSub', e.target.value)}
                    placeholder="Bring any scans, reports or records you have gathered — they always help."
                  />
                </div>
              </div>
            </section>

            {/* 02. Appointment Request Form & Image (Consultation Booking Card) */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">02. Appointment Request Form &amp; Image</h2>

              {/* Consultation Card Image Upload */}
              <div className="admin-grid-full">
                <div className="admin-field-group">
                  <label className="admin-field-label">Consultation Card Image</label>
                  <div className="admin-input-upload-pill">
                    <input
                      type="text"
                      value={cmsData.contactFormImage || ''}
                      placeholder="/assets/images/contact_consultation_doctor.jpg"
                      onChange={(e) => handleInputChange('contactFormImage', e.target.value)}
                    />
                    <label className="admin-upload-icon-trigger" title="Upload consultation image">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                        <line x1="19" y1="16" x2="19" y2="22" />
                        <line x1="16" y1="19" x2="22" y2="19" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, (name) => handleInputChange('contactFormImage', name))}
                      />
                    </label>
                  </div>
                  {cmsData.contactFormImage && (
                    <div style={{ marginTop: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <img
                        src={cmsData.contactFormImage}
                        alt="Consultation Card Preview"
                        style={{
                          width: '90px',
                          height: '65px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          border: '1.5px solid #CBD0D6',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                        }}
                      />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <span style={{ fontSize: '0.84rem', fontWeight: '600', color: '#1E2229' }}>Card Image Preview</span>
                        <span style={{ fontSize: '0.78rem', color: '#64748B' }}>{cmsData.contactFormImage}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Form Heading & Submit Button */}
              <div className="admin-grid-2col" style={{ marginTop: '1.2rem' }}>
                <div className="admin-field-group">
                  <label className="admin-field-label">Form Title Heading</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.contactFormHeading !== undefined ? cmsData.contactFormHeading : 'Request an appointment'}
                    onChange={(e) => handleInputChange('contactFormHeading', e.target.value)}
                    placeholder="Request an appointment"
                  />
                </div>
                <div className="admin-field-group">
                  <label className="admin-field-label">Submit Button Text</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.contactSubmitBtnText !== undefined ? cmsData.contactSubmitBtnText : 'Submit'}
                    onChange={(e) => handleInputChange('contactSubmitBtnText', e.target.value)}
                    placeholder="Submit"
                  />
                </div>
              </div>

              {/* Form Fields: Name & Phone */}
              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Field 1: Name Label &amp; Placeholder</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    style={{ marginBottom: '0.55rem' }}
                    value={cmsData.contactNameLabel !== undefined ? cmsData.contactNameLabel : 'FULL NAME'}
                    onChange={(e) => handleInputChange('contactNameLabel', e.target.value)}
                    placeholder="FULL NAME"
                  />
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.contactNamePlaceholder !== undefined ? cmsData.contactNamePlaceholder : 'Enter your name'}
                    onChange={(e) => handleInputChange('contactNamePlaceholder', e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>

                <div className="admin-field-group">
                  <label className="admin-field-label">Field 2: Phone Label &amp; Placeholder</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    style={{ marginBottom: '0.55rem' }}
                    value={cmsData.contactPhoneLabel !== undefined ? cmsData.contactPhoneLabel : 'PHONE NUMBER'}
                    onChange={(e) => handleInputChange('contactPhoneLabel', e.target.value)}
                    placeholder="PHONE NUMBER"
                  />
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.contactPhonePlaceholder !== undefined ? cmsData.contactPhonePlaceholder : '+91 00000 00000'}
                    onChange={(e) => handleInputChange('contactPhonePlaceholder', e.target.value)}
                    placeholder="+91 00000 00000"
                  />
                </div>
              </div>

              {/* Form Fields: Primary Symptom & Notes */}
              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Field 3: Primary Symptom Label &amp; Placeholder</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    style={{ marginBottom: '0.55rem' }}
                    value={cmsData.contactSymptomLabel !== undefined ? cmsData.contactSymptomLabel : 'PRIMARY SYMPTOM'}
                    onChange={(e) => handleInputChange('contactSymptomLabel', e.target.value)}
                    placeholder="PRIMARY SYMPTOM"
                  />
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.contactSymptomPlaceholder !== undefined ? cmsData.contactSymptomPlaceholder : 'Jaw Pain / TMJ'}
                    onChange={(e) => handleInputChange('contactSymptomPlaceholder', e.target.value)}
                    placeholder="Jaw Pain / TMJ"
                  />
                </div>

                <div className="admin-field-group">
                  <label className="admin-field-label">Field 4: Notes Label &amp; Placeholder</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    style={{ marginBottom: '0.55rem' }}
                    value={cmsData.contactNotesLabel !== undefined ? cmsData.contactNotesLabel : 'NOTES'}
                    onChange={(e) => handleInputChange('contactNotesLabel', e.target.value)}
                    placeholder="NOTES"
                  />
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.contactNotesPlaceholder !== undefined ? cmsData.contactNotesPlaceholder : 'Share any specific concerns...'}
                    onChange={(e) => handleInputChange('contactNotesPlaceholder', e.target.value)}
                    placeholder="Share any specific concerns..."
                  />
                </div>
              </div>

              {/* Success Screen Customization */}
              <div className="admin-grid-2col">
                <div className="admin-field-group">
                  <label className="admin-field-label">Success Screen Title</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.contactSuccessTitle !== undefined ? cmsData.contactSuccessTitle : 'Appointment Request Sent'}
                    onChange={(e) => handleInputChange('contactSuccessTitle', e.target.value)}
                    placeholder="Appointment Request Sent"
                  />
                </div>
                <div className="admin-field-group">
                  <label className="admin-field-label">Success Screen Description</label>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={
                      cmsData.contactSuccessDesc !== undefined
                        ? cmsData.contactSuccessDesc
                        : "Thank you! Our care coordinator at Dr. Ashwin's TMD Clinic will call you shortly to confirm your consultation schedule."
                    }
                    onChange={(e) => handleInputChange('contactSuccessDesc', e.target.value)}
                    placeholder="Thank you! Our care coordinator..."
                  />
                </div>
              </div>
            </section>

            {/* 03. Contact Details & Clinic Channels */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">03. Contact Details &amp; Clinic Channels</h2>
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '0.25rem' }}>
                    <label className="admin-field-label">Google Maps Location</label>
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                      Enter clinic address or landmark (e.g. <em>Asoka Hospital Bank Road Kozhikode</em>), or paste a Google Maps link or embed code (<code>&lt;iframe src=&quot;...&quot;&gt;</code>).
                    </span>
                  </div>
                  <input
                    type="text"
                    className="admin-pill-input"
                    value={cmsData.contactMapQuery || ''}
                    placeholder="e.g. Asoka Hospital Bank Road Kozhikode Kerala, or paste Google Maps URL"
                    onChange={(e) => handleInputChange('contactMapQuery', e.target.value)}
                  />

                  {/* Live Interactive Map Preview */}
                  <div style={{ marginTop: '0.85rem', borderRadius: '14px', overflow: 'hidden', border: '1.5px solid #CBD0D6' }}>
                    <iframe
                      src={getGoogleMapsEmbedUrl(cmsData.contactMapQuery || 'Asoka Hospital Bank Road Kozhikode Kerala')}
                      width="100%"
                      height="260"
                      style={{ border: 0, display: 'block' }}
                      loading="lazy"
                      title="Google Maps Live Preview"
                    ></iframe>
                  </div>
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

            {/* Footer Navigation Columns Section */}
            <section className="admin-section-block">
              <h2 className="admin-section-heading">Footer Navigation Columns</h2>

              {/* Treatments Column */}
              <div style={{ marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#FCBC15', fontWeight: '600' }}>
                      Treatments Column
                    </h3>
                    <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#8E95A0' }}>
                      Edit the treatment items listed in the website footer. All items automatically link to the Treatments page.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="admin-add-faq-btn"
                    onClick={() =>
                      handleArrayItemAdd('footerTreatmentsLinks', {
                        label: 'New Treatment Service',
                        url: '/treatments',
                      })
                    }
                  >
                    <span style={{ fontSize: '1.1rem', lineHeight: '1' }}>+</span>
                    <span>Add Treatment Item</span>
                  </button>
                </div>

                <div className="admin-grid-full" style={{ marginBottom: '1rem' }}>
                  <div className="admin-field-group">
                    <label className="admin-field-label">Column Title (Gold Header)</label>
                    <input
                      type="text"
                      className="admin-pill-input"
                      value={cmsData.footerTreatmentsTitle || ''}
                      onChange={(e) => handleInputChange('footerTreatmentsTitle', e.target.value)}
                      placeholder="Treatments"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {(cmsData.footerTreatmentsLinks || defaultCmsData.footerTreatmentsLinks || []).map((link, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        background: '#18191B',
                        border: '1px solid #2C2F36',
                        borderRadius: '14px',
                        padding: '0.75rem 1rem',
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: '#8E95A0', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          Treatment Item #{idx + 1}
                        </span>
                        <input
                          type="text"
                          className="admin-pill-input"
                          value={link.label || ''}
                          onChange={(e) => handleCardChange('footerTreatmentsLinks', idx, 'label', e.target.value)}
                          placeholder="e.g. Neuromuscular dentistry"
                        />
                      </div>
                      <div style={{ paddingTop: '18px' }}>
                        <button
                          type="button"
                          className="admin-action-icon-btn"
                          title="Remove treatment"
                          onClick={() => handleArrayItemRemove('footerTreatmentsLinks', idx)}
                        >
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Explore Column */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#FCBC15', fontWeight: '600' }}>
                      Explore Column
                    </h3>
                    <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#8E95A0' }}>
                      Edit the title and links shown under the Explore column in the footer.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="admin-add-faq-btn"
                    onClick={() =>
                      handleArrayItemAdd('footerExploreLinks', {
                        label: 'New Page',
                        url: '/',
                      })
                    }
                  >
                    <span style={{ fontSize: '1.1rem', lineHeight: '1' }}>+</span>
                    <span>Add Explore Link</span>
                  </button>
                </div>

                <div className="admin-grid-full" style={{ marginBottom: '1rem' }}>
                  <div className="admin-field-group">
                    <label className="admin-field-label">Column Title (Gold Header)</label>
                    <input
                      type="text"
                      className="admin-pill-input"
                      value={cmsData.footerExploreTitle || ''}
                      onChange={(e) => handleInputChange('footerExploreTitle', e.target.value)}
                      placeholder="Explore"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {(cmsData.footerExploreLinks || defaultCmsData.footerExploreLinks || []).map((link, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr auto',
                        gap: '0.75rem',
                        alignItems: 'center',
                        background: '#18191B',
                        border: '1px solid #2C2F36',
                        borderRadius: '14px',
                        padding: '0.75rem 1rem',
                      }}
                    >
                      <div>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: '#8E95A0', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          Link Label #{idx + 1}
                        </span>
                        <input
                          type="text"
                          className="admin-pill-input"
                          value={link.label || ''}
                          onChange={(e) => handleCardChange('footerExploreLinks', idx, 'label', e.target.value)}
                          placeholder="e.g. About Us"
                        />
                      </div>
                      <div>
                        <span style={{ display: 'block', fontSize: '0.75rem', color: '#8E95A0', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          Link To Page
                        </span>
                        <select
                          className="admin-pill-input"
                          value={link.url || '/'}
                          onChange={(e) => handleCardChange('footerExploreLinks', idx, 'url', e.target.value)}
                          style={{ cursor: 'pointer', appearance: 'auto' }}
                        >
                          <option value="/">Home Page</option>
                          <option value="/about">About Us Page</option>
                          <option value="/what-is-tmd">What is TMD Page</option>
                          <option value="/treatments">Treatments Page</option>
                          <option value="/contact">Contact Us Page</option>
                        </select>
                      </div>
                      <div style={{ paddingTop: '18px' }}>
                        <button
                          type="button"
                          className="admin-action-icon-btn"
                          title="Remove link"
                          onClick={() => handleArrayItemRemove('footerExploreLinks', idx)}
                        >
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
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
