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
  tmdHeroHeading: 'What is TMD? Understand the condition',
  tmdHeroLine1: 'What is TMD?',
  tmdHeroLine2: 'Understand the condition',
  tmdHeroSub: 'Temporomandibular joint dysfunction explained with clarity and clinical precision.',
  tmdBusiestJointTitle: 'The Busiest Joint You Own',
  tmdBusiestJointImage: 'anatomy_tmj.jpg',
  tmdBusiestJointText:
    'Put a finger just in front of your ear and open your mouth. That movement is your temporomandibular joint — the TMJ. You use it every time you speak, eat, swallow or yawn.\n\nIt is a clever joint. It hinges and slides at the same time, the two sides have to move together, and a small cushioning disc rides along inside it. When all of that runs smoothly you never think about it.\n\nWhen something is slightly off, you feel it — sometimes in the jaw, often somewhere else entirely. TMD simply means a problem with this joint or the muscles that move it. It is common, it is well studied, and in most cases it responds well to straightforward treatment.',
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
  tmdCausesTitle: 'The usual reasons',
  tmdCausesSub:
    'TMD rarely arrives from a single clear event. For most patients, several factors build up together until the system simply runs out of room to compensate.',
  tmdCauses: [
    {
      num: 'Cause 01',
      title: 'Night-time clenching',
      desc: 'Sleep bruxism generating sustained extreme bite forces while asleep.',
    },
    {
      num: 'Cause 02',
      title: 'Daytime stress habits',
      desc: 'Subconscious daytime bracing, teeth bracing during focused screen work or driving.',
    },
    {
      num: 'Cause 03',
      title: 'Breathing & Airway',
      desc: 'Upper airway resistance, mouth breathing, or sleep-disordered breathing.',
    },
    {
      num: 'Cause 04',
      title: 'Structural friction',
      desc: 'Internal disc derangement, uneven condylar seating, or natural skeletal asymmetry.',
    },
    {
      num: 'Cause 05',
      title: 'Posture & screen habits',
      desc: 'Forward head posture from prolonged laptop/phone use loading the suboccipital and masticatory muscles.',
    },
    {
      num: 'Cause 06',
      title: 'An impact or accident',
      desc: 'Micro or macro-trauma, sports collision, whiplash injury, or sudden hyper-extension of the jaw.',
    },
    {
      num: 'Cause 07',
      title: 'Dental changes',
      desc: 'Recent missing teeth, unstable dental restorations, or uncompensated occlusal shifts.',
    },
    {
      num: 'Cause 08',
      title: 'Joint vulnerability',
      desc: 'Systemic joint hypermobility, hormonal variations, or underlying inflammatory conditions.',
    },
  ],
  tmdWhenTitle: 'A Good Time to Come In',
  tmdWhenIntro:
    'You do not need to wait until the pain becomes severe or debilitating. Early evaluation protects the articular cartilage and prevents chronic muscular adaptation.',
  tmdCheckpoints: [
    'Pain/discomfort lasting more than 2–3 weeks',
    'Clicking, popping, or grating accompanied by pain or tightness',
    'Jaw catching, momentary deviations, or locking when chewing or speaking',
    'Unexplained persistent headaches, recurring ear symptoms, or upper neck pain',
    'Noticeable morning jaw tightness, muscle fatigue, or teeth tenderness upon waking',
  ],
  tmdConsultTitle: 'Every Consultation Includes',
  tmdConsultPoints: [
    {
      pointNum: 'POINT 1',
      title: 'Patient, thorough conversation',
      desc: 'Dedicated 90–minute unhurried inquiry into your full symptom history, lifestyle triggers, and functional concerns.',
    },
    {
      pointNum: 'POINT 2',
      title: 'Examination of joint, muscles and b',
      desc: 'Detailed biomechanical assessment of joint range of motion, cranial palpation, muscle trigger points, and digital bite dynamics.',
    },
    {
      pointNum: 'POINT 3',
      title: 'Clear guidance and simplest path f',
      desc: 'An honest explanation of root causes, transparent diagnostic findings, and conservative reversible treatment pathways first.',
    },
  ],
  tmdCtaHeading: 'Ready to speak with Dr. Ashwin?',
  tmdCtaButtonText: 'Book your consultation',
  tmdCtaButtonLink: '/contact.html',
  tmdFaqTitle: 'Questions patients ask',
  tmdFaqSubtitle:
    'Transparent answers to common clinical inquiries regarding pain relief, treatment duration, and diagnostic necessity.',
  tmdFaqs: [
    {
      itemNum: 'FAQ ITEM 01',
      q: 'Will this get better?',
      a: 'Yes. With accurate diagnosis identifying whether the issue is muscular, articular, or airway-related, the overwhelming majority of TMD patients achieve substantial, lasting relief through conservative care.',
    },
    {
      itemNum: 'FAQ ITEM 02',
      q: 'Is treatment uncomfortable?',
      a: 'No. Our approach prioritizes non-invasive, gentle, and reversible protocols. Therapeutic splints, trigger therapy, and biometric adjustments are designed to relieve strain, not create it.',
    },
    {
      itemNum: 'FAQ ITEM 03',
      q: 'How long does it take?',
      a: 'Acute muscular symptoms often ease within 2 to 4 weeks. Full joint stabilization and structural retraining generally span 3 to 6 months depending on chronicity.',
    },
    {
      itemNum: 'FAQ ITEM 04',
      q: 'My jaw clicks but does not hurt. Is that a problem?',
      a: 'A painless click often indicates a displaced disc that still self-reduces. While not an emergency, a baseline evaluation prevents progression to locked or painful stages.',
    },
    {
      itemNum: 'FAQ ITEM 05',
      q: 'Could my migraines be connected?',
      a: 'Frequently, yes. Strain in the temporalis and masseter muscles triggers referred pain along the trigeminal nerve, often misdiagnosed as tension migraines.',
    },
    {
      itemNum: 'FAQ ITEM 06',
      q: 'Could sleep or breathing be connected?',
      a: 'Intimately. Nocturnal airway restriction often causes the brain to clench or thrust the jaw forward instinctively to keep the airway open during sleep.',
    },
    {
      itemNum: 'FAQ ITEM 07',
      q: 'Do I need a referral?',
      a: 'No formal referral is required. Patients can schedule directly for a comprehensive TMD evaluation.',
    },
    {
      itemNum: 'FAQ ITEM 08',
      q: 'Can my regular dentist treat this?',
      a: 'While general dentists handle routine dental needs, TMD is a complex neuromuscular and orthopedic condition requiring specialized craniofacial training and diagnostic equipment.',
    },
  ],

  // 4. TREATMENTS PAGE
  treatmentsHeroTitle: 'Gentle, reversible, and explained before it begins',
  treatmentsHeroSub:
    'We start with the simplest approach that will work, and we only move further if we need to.',
  treatmentsShowcaseCards: [
    {
      title: 'Custom appliances',
      desc: 'A comfortable, made-to-measure appliance that takes pressure off the joint, relaxes the muscles and protects your teeth from grinding. Completely reversible, and adjusted as you improve.',
      img: '/assets/images/with petient.png',
    },
    {
      title: 'Bite correction',
      desc: 'Where the way your teeth meet is part of the problem, we correct it gradually and check that the joint is comfortable at each stage.',
      img: '/assets/images/tscan_analysis.jpg',
    },
    {
      title: 'Airway-focused care',
      desc: 'Where breathing or tongue position plays a role, we address that alongside the jaw — often the piece that makes the difference to sleep quality.',
      img: '/assets/images/cbct_scanner.jpg',
    },
    {
      title: 'Muscle care and pain relief',
      desc: 'Targeted treatment for tight, tender muscles, plus simple things you can do at home between visits.',
      img: '/assets/images/emg_assessment.jpg',
    },
    {
      title: 'Exercise and posture work',
      desc: 'A short daily routine for the jaw and neck, coordinated with physiotherapy where that is useful.',
      img: '/assets/images/jaw_movement_sensor.jpg',
    },
    {
      title: 'Habit support',
      desc: 'Practical ways to catch and interrupt clenching before it becomes pain again.',
      img: '/assets/images/care_look_carefully.jpg',
    },
    {
      title: 'Working with your other doctors',
      desc: 'We coordinate with ENT specialists, physicians, physiotherapists and sleep specialists whenever a case calls for it.',
      img: '/assets/images/clinic_reception.jpg',
    },
  ],
  treatmentsSteps: [
    {
      stepNum: '01',
      title: 'Listen and map',
      desc: 'A thorough consultation mapping your symptoms, clenching habits, headaches, and timeline.',
      img: '/assets/images/care_listen_first.jpg',
    },
    {
      stepNum: '02',
      title: 'Examine and measure',
      desc: 'Physical evaluation of jaw range of motion, muscle trigger points, joint sounds, and bite alignment.',
      img: '/assets/images/care_look_carefully.jpg',
    },
    {
      stepNum: '03',
      title: 'Image with purpose',
      desc: 'Targeted CBCT 3D scan and digital impressions to visualize bony structures and joint spaces.',
      img: '/assets/images/process_step_03_imaging.jpg',
    },
    {
      stepNum: '04',
      title: 'Airway and sleep',
      desc: 'Evaluating airway patency and nocturnal breathing to ensure holistic recovery.',
      img: '/assets/images/process_step_04_sleep.jpg',
    },
    {
      stepNum: '05',
      title: 'Plan and review',
      desc: 'A personalized non-invasive treatment roadmap with continual milestone tracking.',
      img: '/assets/images/process_step_05_together.jpg',
    },
  ],
  treatmentsJourneySteps: [
    {
      stepNum: '01',
      meta: 'STEP 01',
      title: 'Your first visit',
      desc: 'Conversation, examination, and imaging if needed.',
      subtext: 'Bring anything you have collected along the way.',
    },
    {
      stepNum: '02',
      meta: 'STEP 02',
      title: 'Your second visit',
      desc: 'We show you what we found, explain the options with timelines and costs, and answer everything before you decide anything.',
      subtext: null,
    },
    {
      stepNum: '03',
      meta: 'STEP 03',
      title: 'Treatment',
      desc: 'Upper airway resistance, mouth breathing, or sleep-disordered breathing.The appliance is fitted or treatment begins, with regular reviews to make sure it is going the way it should.',
      subtext: null,
    },
    {
      stepNum: '04',
      meta: 'STEP 04',
      title: 'Keeping it that way',
      desc: 'Once you are comfortable, reviews confirm it is holding, along with simple guidance to keep it there.',
      subtext: null,
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
  contactFormHeading: 'Request an appointment',
  contactFormImage: '/assets/images/contact_consultation_doctor.jpg',
  contactNameLabel: 'FULL NAME',
  contactNamePlaceholder: 'Enter your name',
  contactPhoneLabel: 'PHONE NUMBER',
  contactPhonePlaceholder: '+91 00000 00000',
  contactSymptomLabel: 'PRIMARY SYMPTOM',
  contactSymptomPlaceholder: 'Jaw Pain / TMJ',
  contactNotesLabel: 'NOTES',
  contactNotesPlaceholder: 'Share any specific concerns...',
  contactSubmitBtnText: 'Submit',
  contactSuccessTitle: 'Appointment Request Sent',
  contactSuccessDesc:
    "Thank you! Our care coordinator at Dr. Ashwin's TMD Clinic will call you shortly to confirm your consultation schedule.",
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
  footerTreatmentsTitle: 'Treatments',
  footerTreatmentsLinks: [
    { label: 'Neuromuscular dentistry', url: '/treatments' },
    { label: 'TMD diagnosis', url: '/treatments' },
    { label: 'Treatment process', url: '/treatments' },
  ],
  footerExploreTitle: 'Explore',
  footerExploreLinks: [
    { label: 'Home', url: '/' },
    { label: 'About Us', url: '/about' },
    { label: 'What is TMD', url: '/what-is-tmd' },
    { label: 'Treatments', url: '/treatments' },
    { label: 'Contact Us', url: '/contact' },
  ],
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
  saveContent: async () => { },
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
        } catch { }
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
