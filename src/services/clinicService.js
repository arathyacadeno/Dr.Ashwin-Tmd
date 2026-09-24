import api from './api';

// Initial clinic information (from existing demo)
const initialClinicInfo = {
  name: "Dr. Ashwin's TMD Clinic",
  subtitle: "TMD & TMJ Care, Kozhikode",
  phone: "+91 99479 33999",
  whatsapp: "+91 99479 33999",
  email: "info@drashwintmd.com",
  address: "Asoka Hospital Compound, 17/6, Bank Road, Opposite Malabar Gold, Polpaya Mana, Tazhekkod, Kozhikode, Kerala 673001",
  mapQuery: "Asoka+Hospital+Bank+Road+Kozhikode+Kerala",
  hours: [
    { days: "Monday to Friday", time: "9:30 AM to 5:30 PM" },
    { days: "Saturday", time: "9:30 AM to 12:00 PM" }
  ],
  bio: "Expert care for TMJ/TMD disorders using advanced diagnostics and non-invasive treatments to restore comfort and jaw function."
};

// Initial services / treatments
const initialServices = [
  {
    id: 1,
    title: "Neuromuscular orthotic therapy",
    shortDesc: "Custom-engineered physiological orthotics calibrated to decompress jaw joint tension and restore optimal neuromuscular rest position.",
    fullDesc: "A comfortable, made-to-measure physiological appliance that gently repositions the lower jaw into its neuromuscular resting zone, relieving joint capsule compression and muscle spasm.",
    image: "/assets/images/tmj_medical_visualization.jpg",
    category: "Appliances",
    isFeatured: true
  },
  {
    id: 2,
    title: "TENS therapy & muscle relaxation",
    shortDesc: "Ultra-low frequency neuro-stimulation delivering rhythmic relaxation to chronically tight masticatory muscles to eliminate facial tension.",
    fullDesc: "Targeted electro-neural stimulation to relax hyperactive masseter and temporalis muscles, breaking chronic pain loops before taking bite registrations.",
    image: "/assets/images/hero_clinic_interior.jpg",
    category: "Physiotherapy",
    isFeatured: true
  },
  {
    id: 3,
    title: "Bite realignment & occlusal therapy",
    shortDesc: "Precision micro-adjustments and computerized occlusion mapping ensuring harmonious contact distribution during chewing.",
    fullDesc: "Using computerized T-Scan diagnostics to balance dental contacts, removing interference that forces the jaw into a compromised position.",
    image: "/assets/images/dental_implant_3d.jpg",
    category: "Occlusion",
    isFeatured: true
  },
  {
    id: 4,
    title: "Airway & sleep-focused care",
    shortDesc: "Specialized nighttime appliances designed to keep the upper airway open, reducing bruxism, snoring, and morning fatigue.",
    fullDesc: "Addressing the critical link between sleep apnea, mouth breathing, and nighttime jaw clenching for restorative rest.",
    image: "/assets/images/outcome_sleeping.jpg",
    category: "Airway",
    isFeatured: true
  },
  {
    id: 5,
    title: "Laser & physical therapy support",
    shortDesc: "Photobiomodulation cold laser therapy accelerating tissue regeneration, joint disc recovery, and reducing inflammation.",
    fullDesc: "Non-invasive low-level laser therapy penetrating deep into the retrodiscal tissues to accelerate natural healing.",
    image: "/assets/images/aswin.jpg",
    category: "Physiotherapy",
    isFeatured: true
  },
  {
    id: 6,
    title: "Trigger point & myofascial release",
    shortDesc: "Targeted trigger-point decompression resolving localized muscle knots in the head, neck, and jaw for immediate relief.",
    fullDesc: "Manual therapy and myofascial techniques to release knotting in the pterygoids, trapezius, and sternocleidomastoid muscles.",
    image: "/assets/images/smile_after.jpg",
    category: "Myofascial",
    isFeatured: true
  },
  {
    id: 7,
    title: "Exercises & posture work",
    shortDesc: "Targeted care for jaw muscle tension, tenderness, TMD-related pain, and discomfort, with practical guidance for managing symptoms at home.",
    fullDesc: "Daily customized exercise regimens strengthening postural muscles to maintain long-term jaw stability.",
    image: "/assets/images/hero_clinic_interior.jpg",
    category: "Home Care",
    isFeatured: true
  }
];

// Initial consultation fees
const initialFees = [
  { id: 1, serviceName: "Comprehensive TMD Diagnostic Consultation", fee: "₹1,500", duration: "45 mins", description: "Detailed clinical examination, jaw joint palpation, range-of-motion metrics & medical history review" },
  { id: 2, serviceName: "Follow-up Assessment & Appliance Check", fee: "₹800", duration: "30 mins", description: "Progress review, splint fit verification and adjustment" },
  { id: 3, serviceName: "Computerized T-Scan Bite Analysis", fee: "₹2,500", duration: "40 mins", description: "Digital force and timing contact distribution mapping" },
  { id: 4, serviceName: "3D CBCT Joint & Airway Imaging", fee: "₹3,500", duration: "30 mins", description: "High-resolution 3D volumetric tomography of condyle and fossa anatomy" }
];

// Initial FAQs
const initialFaqs = [
  {
    id: 1,
    question: "Will this go away on its own?",
    answer: "Sometimes mild muscle tension resolves when stress decreases. However, if symptoms have lasted more than a few weeks or involve joint clicking, locking, or ear symptoms, the joint disc or muscles usually need guided care to heal properly."
  },
  {
    id: 2,
    question: "Is TMD the same as TMJ, or is there a difference?",
    answer: "TMJ refers to the joint itself (the temporomandibular joint). TMD stands for Temporomandibular Disorder, which is the medical term for when that joint, its surrounding muscles, or the cushioning disc are inflamed, strained, or functioning incorrectly."
  },
  {
    id: 3,
    question: "Do I definitely need surgery or permanent dental work?",
    answer: "Almost never. In the vast majority of cases, conservative, reversible care — such as custom oral appliance therapy, gentle physical therapy, muscle decompression, and behavioral adjustments — resolves the issue completely without irreversible changes."
  },
  {
    id: 4,
    question: "Why does my ear hurt if the problem is in my jaw?",
    answer: "The TMJ sits just millimeters in front of your ear canal and shares sensory nerve pathways (the trigeminal nerve) with your inner ear. Spasm in the pterygoid muscles or inflammation in the joint capsule is frequently felt as earache, clogging, or tinnitus."
  },
  {
    id: 5,
    question: "Could my morning headaches be connected to my jaw?",
    answer: "Yes, very frequently. Nighttime clenching or grinding activates the temporalis muscles on the sides of your head with tremendous force, producing waking tension headaches around the temples and behind the eyes."
  },
  {
    id: 6,
    question: "Can you fix this without medication or injections?",
    answer: "Yes. While short-term anti-inflammatory support can provide temporary comfort, our core treatments focus on structural and biomechanical solutions that resolve the root cause rather than masking symptoms."
  },
  {
    id: 7,
    question: "Do I need a referral from my dentist or doctor to come in?",
    answer: "No referral is required. Many patients come to us directly after struggling to find answers through ENT specialists, neurologists, or general physicians. You can book an appointment directly."
  },
  {
    id: 8,
    question: "Can children and teenagers develop TMD or jaw clicking?",
    answer: "Yes, TMD can appear in adolescents, often triggered by growth spurts, orthodontic changes, athletic impacts, or nighttime airway restrictions. Early evaluation allows gentle intervention before habits become chronic."
  }
];

// Initial testimonials
const initialTestimonials = [
  {
    id: 1,
    name: "Priya Nair",
    timeAgo: "1 week ago",
    stars: 5,
    text: "Visiting multiple clinics, Dr. Ashwin diagnosed the root cause of my jaw clenching and facial tension. Exceptional personal care and very polite staff.",
    avatar: "/assets/images/outcome_sunset.jpg"
  },
  {
    id: 2,
    name: "Vivek Menon",
    timeAgo: "2 weeks ago",
    stars: 5,
    text: "Sleeping peacefully without jaw clenching was a dream for 5 years. The custom treatment plan changed my mornings forever. Very good service.",
    avatar: "/assets/images/outcome_running.jpg"
  },
  {
    id: 3,
    name: "Anjali R.",
    timeAgo: "3 weeks ago",
    stars: 5,
    text: "For the first time in years, I enjoyed an entire vacation without worrying about jaw pain or migraines. Truly life-changing care and very good experience.",
    avatar: "/assets/images/outcome_laughing.jpg"
  },
  {
    id: 4,
    name: "Kavita Sundaram",
    timeAgo: "1 month ago",
    stars: 5,
    text: "The treatment gave me my life back — it changed how I chew, speak, and smile without constant joint clicking. Highly recommended doctor.",
    avatar: "/assets/images/hero_smiling_woman.jpg"
  },
  {
    id: 5,
    name: "Dr. Arun Varma",
    timeAgo: "2 months ago",
    stars: 5,
    text: "As a dental professional, the computerized T-scan and splint protocol eliminated my chronic bite fatigue completely. Outstanding results and care.",
    avatar: "/assets/images/outcome_eating.jpg"
  }
];

export const clinicService = {
  // Clinic Info
  async getClinicInfo() {
    try {
      const response = await api.get('/clinic-info/');
      return response.data;
    } catch {
      const saved = localStorage.getItem('tmd_clinic_info');
      return saved ? JSON.parse(saved) : initialClinicInfo;
    }
  },

  async updateClinicInfo(info) {
    try {
      const response = await api.put('/clinic-info/', info);
      return response.data;
    } catch {
      localStorage.setItem('tmd_clinic_info', JSON.stringify(info));
      return info;
    }
  },

  // Services
  async getServices() {
    try {
      const response = await api.get('/services/');
      return response.data;
    } catch {
      const saved = localStorage.getItem('tmd_services');
      return saved ? JSON.parse(saved) : initialServices;
    }
  },

  async updateService(id, serviceData) {
    try {
      const response = await api.put(`/services/${id}/`, serviceData);
      return response.data;
    } catch {
      const services = await this.getServices();
      const updated = services.map((s) => (s.id === Number(id) ? { ...s, ...serviceData } : s));
      localStorage.setItem('tmd_services', JSON.stringify(updated));
      return updated.find((s) => s.id === Number(id));
    }
  },

  async createService(serviceData) {
    try {
      const response = await api.post('/services/', serviceData);
      return response.data;
    } catch {
      const services = await this.getServices();
      const newService = { ...serviceData, id: Date.now() };
      const updated = [...services, newService];
      localStorage.setItem('tmd_services', JSON.stringify(updated));
      return newService;
    }
  },

  async deleteService(id) {
    try {
      const response = await api.delete(`/services/${id}/`);
      return response.data;
    } catch {
      const services = await this.getServices();
      const updated = services.filter((s) => s.id !== Number(id));
      localStorage.setItem('tmd_services', JSON.stringify(updated));
      return { success: true };
    }
  },

  // Consultation Fees
  async getFees() {
    try {
      const response = await api.get('/fees/');
      return response.data;
    } catch {
      const saved = localStorage.getItem('tmd_fees');
      return saved ? JSON.parse(saved) : initialFees;
    }
  },

  async updateFee(id, feeData) {
    try {
      const response = await api.put(`/fees/${id}/`, feeData);
      return response.data;
    } catch {
      const fees = await this.getFees();
      const updated = fees.map((f) => (f.id === Number(id) ? { ...f, ...feeData } : f));
      localStorage.setItem('tmd_fees', JSON.stringify(updated));
      return updated.find((f) => f.id === Number(id));
    }
  },

  // FAQs
  async getFaqs() {
    try {
      const response = await api.get('/faqs/');
      return response.data;
    } catch {
      const saved = localStorage.getItem('tmd_faqs');
      return saved ? JSON.parse(saved) : initialFaqs;
    }
  },

  async updateFaq(id, faqData) {
    try {
      const response = await api.put(`/faqs/${id}/`, faqData);
      return response.data;
    } catch {
      const faqs = await this.getFaqs();
      const updated = faqs.map((f) => (f.id === Number(id) ? { ...f, ...faqData } : f));
      localStorage.setItem('tmd_faqs', JSON.stringify(updated));
      return updated.find((f) => f.id === Number(id));
    }
  },

  async createFaq(faqData) {
    try {
      const response = await api.post('/faqs/', faqData);
      return response.data;
    } catch {
      const faqs = await this.getFaqs();
      const newFaq = { ...faqData, id: Date.now() };
      const updated = [...faqs, newFaq];
      localStorage.setItem('tmd_faqs', JSON.stringify(updated));
      return newFaq;
    }
  },

  async deleteFaq(id) {
    try {
      const response = await api.delete(`/faqs/${id}/`);
      return response.data;
    } catch {
      const faqs = await this.getFaqs();
      const updated = faqs.filter((f) => f.id !== Number(id));
      localStorage.setItem('tmd_faqs', JSON.stringify(updated));
      return { success: true };
    }
  },

  // Testimonials
  async getTestimonials() {
    try {
      const response = await api.get('/testimonials/');
      return response.data;
    } catch {
      const saved = localStorage.getItem('tmd_testimonials');
      return saved ? JSON.parse(saved) : initialTestimonials;
    }
  },

  async updateTestimonial(id, testimonialData) {
    try {
      const response = await api.put(`/testimonials/${id}/`, testimonialData);
      return response.data;
    } catch {
      const testimonials = await this.getTestimonials();
      const updated = testimonials.map((t) => (t.id === Number(id) ? { ...t, ...testimonialData } : t));
      localStorage.setItem('tmd_testimonials', JSON.stringify(updated));
      return updated.find((t) => t.id === Number(id));
    }
  },

  async createTestimonial(testimonialData) {
    try {
      const response = await api.post('/testimonials/', testimonialData);
      return response.data;
    } catch {
      const testimonials = await this.getTestimonials();
      const newTestimonial = {
        ...testimonialData,
        id: Date.now(),
        avatar: testimonialData.avatar || '/assets/images/hero_smiling_woman.jpg'
      };
      const updated = [...testimonials, newTestimonial];
      localStorage.setItem('tmd_testimonials', JSON.stringify(updated));
      return newTestimonial;
    }
  },

  async deleteTestimonial(id) {
    try {
      const response = await api.delete(`/testimonials/${id}/`);
      return response.data;
    } catch {
      const testimonials = await this.getTestimonials();
      const updated = testimonials.filter((t) => t.id !== Number(id));
      localStorage.setItem('tmd_testimonials', JSON.stringify(updated));
      return { success: true };
    }
  }
};

export default clinicService;
