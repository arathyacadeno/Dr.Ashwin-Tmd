'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const defaultCmsData = {
  // 1. HOME
  heroHeading: 'Advanced TMD & TMJ Care For Better Jaw Health',
  heroVideo: 'Woman_running_in_park_202608281117.mp4',
  heroCta1: 'Book a consultation',
  heroCta2: 'See how we help',
  docName: 'Dr. Ashwin',
  docSpecialty: 'TMD & TMJ Care, Kozhikode',
  docNote:
    'My mission is not simply to treat jaw problems. It is to help people understand what is happening, find the right path forward, and return to the everyday moments that matter — eating comfortably, sleeping well, and living with greater freedom.',
  docImage: 'og image.png',
  lifestyleSectionName: 'Feel the Difference in Everyday Life',
  lifestyleCards: [
    {
      title: 'Enjoy every meal again',
      desc: 'Rediscover the comfort of chewing, eating, and enjoying your favourite foods without constantly thinking about jaw pain, stiffness, or discomfort. With personalized TMD and TMJ care, we focus on restoring comfortable jaw movement and function so everyday meals can feel natural and effortless again.',
      img: 'outcome_eating.jpg',
    },
    {
      title: 'Wake up feeling better',
      desc: 'Start your day with less jaw tension, fewer morning headaches, and greater comfort after a restful night. Our personalized TMD and TMJ care addresses the factors that may affect your jaw, muscles, breathing, and sleep—helping you wake up feeling more refreshed and ready for the day.',
      img: 'outcome_sleeping.jpg',
    },
    {
      title: 'Talk, laugh & smile freely',
      desc: 'Move, speak, laugh, and express yourself with greater comfort. Personalized TMD and TMJ care can help address jaw pain, stiffness, muscle tension, and movement limitations, making everyday conversations, smiles, and moments with the people you love feel natural again.',
      img: 'outcome_laughing.jpg',
    },
    {
      title: 'Get back to the activities you love',
      desc: 'Move with confidence and return to the activities that make your days meaningful. Personalized TMD and TMJ care focuses on improving jaw comfort, movement, and function so you can work, exercise, socialize, and enjoy everyday life without letting jaw discomfort hold you back.',
      img: 'outcome_running.jpg',
    },
    {
      title: 'Get back to your life',
      desc: 'Move beyond the discomfort, limitations, and constant worry that jaw problems can bring. With personalized TMD and TMJ care focused on restoring comfort, movement, and function, we help you get back to the everyday moments, routines, and experiences that make life feel like yours again.',
      img: 'outcome_sunset.jpg',
    },
  ],
  treatmentsSectionName: 'A Complete Approach To Treatment',
  treatmentCards: [
    {
      title: 'Neuromuscular orthotic therapy',
      desc: 'Custom-engineered physiological orthotics calibrated to decompress jaw joint tension and restore optimal neuromuscular rest position.',
      img: 'tmj_medical_visualization.jpg',
    },
    {
      title: 'TENS therapy & muscle relaxation',
      desc: 'Ultra-low frequency neuro-stimulation delivering rhythmic relaxation to chronically tight masticatory muscles to eliminate facial tension.',
      img: 'hero_clinic_interior.jpg',
    },
    {
      title: 'Bite realignment & occlusal therapy',
      desc: 'Precision micro-adjustments and computerized occlusion mapping ensuring harmonious contact distribution during chewing.',
      img: 'dental_implant_3d.jpg',
    },
    {
      title: 'Airway & sleep-focused care',
      desc: 'Specialized nighttime appliances designed to keep the upper airway open, reducing bruxism, snoring, and morning fatigue.',
      img: 'outcome_sleeping.jpg',
    },
    {
      title: 'Laser & physical therapy support',
      desc: 'Photobiomodulation cold laser therapy accelerating tissue regeneration, joint disc recovery, and reducing inflammation.',
      img: 'aswin.jpg',
    },
    {
      title: 'Trigger point & myofascial release',
      desc: 'Targeted trigger-point decompression resolving localized muscle knots in the head, neck, and jaw for immediate relief.',
      img: 'smile_after.jpg',
    },
    {
      title: 'Exercises & posture work',
      desc: 'Targeted care for jaw muscle tension, tenderness, TMD-related pain, and discomfort, with practical guidance for managing symptoms at home.',
      img: 'hero_clinic_interior.jpg',
    },
  ],
  equipmentSectionName: 'Advanced Equipment for TMD / TMJ Care',
  equipmentCards: [
    {
      title: 'Intraoral scanner',
      desc: 'Accurate digital impressions for bite assessment and customized oral appliances.',
      img: 'intraoral_scanner.jpg',
    },
    {
      title: 'Electromyography (EMG)',
      desc: 'Assessment of jaw muscle activity to help evaluate muscle tension, clenching, and functional patterns.',
      img: 'emg_assessment.jpg',
    },
    {
      title: 'Jaw movement sensor',
      desc: 'Advanced assessment of jaw movement, bite function, and functional relationships.',
      img: 'jaw_movement_sensor.jpg',
    },
    {
      title: 'CBCT 3D scanner',
      desc: 'Three-dimensional imaging for evaluating jaw structures, TMJ anatomy, and complex dental conditions',
      img: 'cbct_scanner.jpg',
    },
    {
      title: 'T-Scan digital analysis',
      desc: 'Computerized analysis of bite force and contact timing to help identify uneven occlusal loading.',
      img: 'tscan_analysis.jpg',
    },
    {
      title: 'OPG panoramic X-ray',
      desc: 'Detailed imaging of the jaw, teeth, and surrounding structures to support comprehensive assessment.',
      img: 'opg_panoramic.jpg',
    },
  ],
  trustSectionName: "We're Here To Restore Your Comfort & Function",
  trustMetrics: [
    { number: '25+', label: 'Years Experience' },
    { number: '12k+', label: 'Successful Cases' },
    { number: '98%', label: 'Patient Relief' },
    { number: '15', label: 'Global Awards' },
    { number: '4.9/5', label: 'Patient Rating' },
    { number: '24/7', label: 'Patient Support' },
    { number: '100%', label: 'Personalized Care' },
  ],
  testimonialsSectionName: 'Real Stories. Real Freedom.',
  reviewAuthor: 'Vivek Menon',
  reviewRating: '★★★★★',
  reviewContent:
    'Visiting multiple clinics, Dr. Ashwin diagnosed the root cause of my jaw clenching and facial tension. Exceptional personal care and very polite staff.',

  // 2. ABOUT US
  aboutHeroHeading: 'A clinic built around One thing, done properly',
  aboutHeroSubtitle: "Dr. Ashwin's TMD Clinic, Calicut — jaw, bite and airway care with the time it deserves.",
  aboutHeroTitle1: 'A clinic built around',
  aboutHeroTitle2: 'One thing, done properly',
  aboutHeroScrollHint: 'Scroll to explore our story',
  aboutStoryHeading: 'Our Story',
  aboutStoryParagraph:
    'A clinic built around one thing, done properly. Jaw problems are often difficult to understand. The symptoms may appear as jaw discomfort, headaches, ear pressure, muscle tension, difficulty chewing, or disturbed sleep — making the underlying cause easy to overlook.\n\nAt Dr. Ashwin\'s TMD Clinic, Calicut, we take the time to look beyond the obvious. We bring together a detailed conversation, careful examination of the jaw, muscles, bite and airway, and imaging when it can help build a clearer picture. We believe good care starts with understanding. Understanding what you are experiencing. Understanding why it may be happening. And understanding what can be done before treatment begins.\n\nOur approach is thoughtful, gradual and patient-focused — with treatment reviewed along the way, so every step has a clear purpose.',
  aboutStoryP1:
    'A clinic built around one thing, done properly. Jaw problems are often difficult to understand. The symptoms may appear as jaw discomfort, headaches, ear pressure, muscle tension, difficulty chewing, or disturbed sleep — making the underlying cause easy to overlook.',
  aboutStoryP2:
    "At Dr. Ashwin's TMD Clinic, Calicut, we take the time to look beyond the obvious. We bring together a detailed conversation, careful examination of the jaw, muscles, bite and airway, and imaging when it can help build a clearer picture. We believe good care starts with understanding. Understanding what you are experiencing. Understanding why it may be happening. And understanding what can be done before treatment begins.",
  aboutStoryP3:
    'Our approach is thoughtful, gradual and patient-focused — with treatment reviewed along the way, so every step has a clear purpose.',
  aboutStoryLoungeImage: 'clinic_reception.jpg',
  aboutStoryExteriorImage: 'clinic_exterior.jpg',
  aboutDoctorTag: 'SPECIALIST',
  aboutDoctorQualification: 'MDS - ORAL & MAXILLOFCIAL SURGERY',
  aboutDoctorName: 'Meet Dr.Ashwin',
  aboutDoctorBio:
    'Dr. Ashwin Ramakrishnan leads a focused clinical practice dedicated to temporomandibular disorders (TMD), jaw, bite and related orofacial concerns in Calicut.\n\nHis approach begins with understanding the complete picture — the symptoms, their history, the jaw joints and muscles, the bite, and related factors such as sleep and airway concerns. Each patient is carefully assessed before a treatment plan is discussed.',
  aboutDoctorBio1:
    'Dr. Ashwin Ramakrishnan leads a focused clinical practice dedicated to temporomandibular disorders (TMD), jaw, bite and related orofacial concerns in Calicut.',
  aboutDoctorBio2:
    'His approach begins with understanding the complete picture — the symptoms, their history, the jaw joints and muscles, the bite, and related factors such as sleep and airway concerns. Each patient is carefully assessed before a treatment plan is discussed.',
  aboutDoctorQuote: '“Good care starts with understanding the person, not just the symptom.”',
  aboutDoctorImage: 'og image.png',

  // 3. WHAT IS TMD
  tmdHeroLine1: 'What is TMD?',
  tmdHeroLine2: 'Understand the condition',
  tmdHeroSub: 'Temporomandibular joint dysfunction explained with clarity and clinical precision.',
  tmdBusiestJointTitle: 'The Busiest Joint in the Human Body',
  tmdBusiestJointText:
    'Your temporomandibular joints move thousands of times every day — every word you speak, every meal you chew, every swallow you make. When this intricate joint mechanism falls out of sync, the tension resonates throughout your entire face, neck, and head.',
  tmdDisguiseTitle: 'Why the jaw is such a good disguise artist',
  tmdDisguiseSub:
    'The TMJ and its muscles share nerves and tension pathways with your head, neck, ears, and face. Because of that, a problem here rarely announces itself as a simple "jaw pain".',
  tmdSymptoms: [
    {
      tag: 'In the ears',
      title: 'Tension or pain',
      desc: 'Ear fullness, ringing, or pain that feels like an infection even when your doctor says your ears look completely clear.',
    },
    {
      tag: 'In the head',
      title: 'Morning tension',
      desc: 'Tension headaches, waking with a dull ache at the temples, behind the eyes, or across the back of the head.',
    },
    {
      tag: 'In the jaw',
      title: 'Click, pop, or lock',
      desc: 'Clicking or popping sounds when you chew or open wide — with or without pain — or a jaw that catches or locks.',
    },
    {
      tag: 'In the mouth',
      title: 'A bite that feels off',
      desc: "Your teeth feel like they don't meet right, or you find yourself constantly trying to find a comfortable position to rest your jaw.",
    },
    {
      tag: 'In the neck & shoulders',
      title: 'Neck & postural tension',
      desc: 'Persistent stiffness in the neck, upper back, or shoulders that returns no matter how many times you stretch or get a massage.',
    },
    {
      tag: 'In the face',
      title: 'Facial fatigue',
      desc: 'Tired jaw muscles after eating, soreness in the cheeks, or aching across the face by the end of the day.',
    },
  ],
  tmdCausesTitle: 'The Usual Suspects',
  tmdCausesSub: 'What causes temporomandibular joint dysfunction to emerge',
  tmdCauses: [
    {
      title: 'Stress & clenching (Bruxism)',
      desc: 'Nighttime grinding and daytime teeth clenching place excessive compressive loads on the joint disc.',
    },
    {
      title: 'Misaligned bite & occlusion',
      desc: 'Uneven contact between teeth forces the jaw muscles to constantly overcompensate during closing.',
    },
    {
      title: 'Joint disc displacement & injury',
      desc: 'Trauma or micro-injuries displacing the cushioning cartilage disc between the skull and mandible.',
    },
  ],
  tmdWhenTitle: 'When is it Time to Get Checked?',
  tmdWhenText:
    'If jaw clicking, morning headaches, or temple ache have persisted for more than two weeks, early assessment prevents irreversible joint wear.',

  // 4. TREATMENTS PAGE
  treatmentsHeroTitle: 'Treatment, thought through',
  treatmentsHeroSub:
    "Gentle, reversible, and explained before it begins. Dr. Ashwin's evidence-based treatments.",
  treatmentsSteps: [
    {
      stepNum: '01',
      title: 'Listen and map',
      desc: 'A thorough consultation mapping your symptoms, clenching habits, headaches, and timeline.',
    },
    {
      stepNum: '02',
      title: 'Examine and measure',
      desc: 'Physical evaluation of jaw range of motion, muscle trigger points, joint sounds, and bite alignment.',
    },
    {
      stepNum: '03',
      title: 'Image with purpose',
      desc: 'Targeted CBCT 3D scan and digital impressions to visualize bony structures and joint spaces.',
    },
    {
      stepNum: '04',
      title: 'Airway and sleep',
      desc: 'Evaluating airway patency and nocturnal breathing to ensure holistic recovery.',
    },
    {
      stepNum: '05',
      title: 'Plan and review',
      desc: 'A personalized non-invasive treatment roadmap with continual milestone tracking.',
    },
  ],
  treatmentsJourneyStages: [
    {
      stageNum: 'Stage 1',
      title: 'Assessment & Relief',
      desc: 'Immediate muscle deprogramming and rapid decompression of chronic jaw tension.',
    },
    {
      stageNum: 'Stage 2',
      title: 'Therapeutic Stabilization',
      desc: 'Custom physiological orthotic appliance therapy to guide the jaw into restful harmony.',
    },
    {
      stageNum: 'Stage 3',
      title: 'Rehabilitation & Balance',
      desc: 'Laser therapy, targeted exercises, and bite realignment for long-term jaw freedom.',
    },
    {
      stageNum: 'Stage 4',
      title: 'Graduation & Care',
      desc: 'Maintenance protocols and confidence to enjoy everyday moments without discomfort.',
    },
  ],

  // 5. CONTACT US
  contactHeroTitle: 'Book your consultation',
  contactHeroSub: 'Bring any scans, reports or records you have gathered — they always help.',
  contactPhone: '+91 94970 88200',
  contactWhatsApp: '+91 99479 33999',
  contactEmail: 'info@drashwintmd.com',
  contactHoursWeekdays: 'Monday to Friday: 9:30 AM to 5:30 PM',
  contactHoursSaturday: 'Saturday: 9:30 AM to 12:00 PM',
  contactAddress:
    "Asoka Hospital Compound, 17/6, Bank Road, Opposite Malabar Gold, Polpaya Mana, Tazhekkod, Kozhikode, Kerala 673001",
  contactMapQuery: 'Asoka Hospital Bank Road Kozhikode Kerala',

  // 6. NAVIGATION BAR
  navbarBrandGold: 'DR ASHWIN’S',
  navbarBrandWhite: 'TMD CLINIC',
  navbarLogo: 'logo.png',
  navbarCtaText: 'Book a consultation',

  // 7. FOOTER
  footerClinicDesc:
    "Expert care for TMJ/TMD disorders using advanced diagnostics and non-invasive treatments to restore comfort and jaw function. Led by Dr. Ashwin in Kozhikode.",
  footerPhone: '+91 94970 88200',
  footerWhatsApp: '+91 99479 33999',
  footerEmail: 'info@drashwintmd.com',
  footerAddress: 'Asoka Hospital Compound, 17/6, Bank Road, Kozhikode, Kerala',
  footerFacebook: 'https://facebook.com',
  footerInstagram: 'https://instagram.com',
  footerYoutube: 'https://youtube.com',
  footerLinkedin: 'https://linkedin.com',
  footerCopyright: "© 2026 Dr. Ashwin's TMD Clinic. All rights reserved.",
};

const CmsContext = createContext({
  content: defaultCmsData,
  saveContent: async () => {},
});

export function CmsProvider({ children, initialContent }) {
  const [content, setContent] = useState(initialContent || defaultCmsData);

  // Sync content from localStorage and server API
  const syncContent = useCallback(async () => {
    try {
      // 1. Check localStorage first for instant client cache
      const local = localStorage.getItem('dr_ashwin_cms_data');
      if (local) {
        setContent((prev) => ({ ...prev, ...JSON.parse(local) }));
      }

      // 2. Fetch latest from server
      const res = await fetch(`/api/content?t=${Date.now()}`, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      });
      if (res.ok) {
        const serverData = await res.json();
        if (serverData && !serverData.error) {
          setContent((prev) => ({ ...prev, ...serverData }));
          localStorage.setItem('dr_ashwin_cms_data', JSON.stringify(serverData));
        }
      }
    } catch {
      // Fallback cleanly to current state
    }
  }, []);

  useEffect(() => {
    syncContent();

    // Cross-tab synchronization
    const handleStorageChange = (e) => {
      if (e.key === 'dr_ashwin_cms_data' && e.newValue) {
        try {
          setContent((prev) => ({ ...prev, ...JSON.parse(e.newValue) }));
        } catch {}
      }
    };

    // Same-window custom event synchronization
    const handleCmsUpdated = (e) => {
      if (e.detail) {
        setContent((prev) => ({ ...prev, ...e.detail }));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('cms-updated', handleCmsUpdated);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cms-updated', handleCmsUpdated);
    };
  }, [syncContent]);

  const saveContent = async (newContent) => {
    setContent(newContent);
    try {
      localStorage.setItem('dr_ashwin_cms_data', JSON.stringify(newContent));
      window.dispatchEvent(new CustomEvent('cms-updated', { detail: newContent }));

      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContent),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || 'Failed to save to server');
      }
    } catch (err) {
      console.error('Error saving CMS content:', err);
      throw err;
    }
  };

  return (
    <CmsContext.Provider value={{ content, saveContent }}>
      {children}
    </CmsContext.Provider>
  );
}

export const useCms = () => useContext(CmsContext);
export { defaultCmsData };
