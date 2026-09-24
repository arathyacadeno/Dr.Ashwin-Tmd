import api from './api';

// Initial clinic doctors data (matches existing demo)
const initialDoctors = [
  {
    id: 1,
    name: 'Dr. Ashwin Ramakrishnan',
    title: 'Dr. Ashwin',
    qualification: 'MDS — Oral & Maxillofacial Surgery',
    specialization: 'Temporomandibular Disorders (TMD) & TMJ Specialist',
    location: 'Kozhikode, Kerala',
    bio: 'Dr. Ashwin Ramakrishnan leads a focused clinical practice dedicated to temporomandibular disorders (TMD), jaw, bite and related orofacial concerns in Calicut. His approach begins with understanding the complete picture — the symptoms, their history, the jaw joints and muscles, the bite, and related factors such as sleep and airway concerns. Each patient is carefully assessed before a treatment plan is discussed.',
    quote: '“Good care starts with understanding the person, not just the symptom.”',
    image: '/assets/images/og image.png',
    experienceYears: 15,
    rating: 4.9,
    status: 'Active',
    email: 'drashwin@drashwintmd.com',
    phone: '+91 99479 33999'
  }
];

export const doctorService = {
  // Fetch all doctors from Django API (with fallback)
  async getDoctors() {
    try {
      const response = await api.get('/doctors/');
      return response.data;
    } catch {
      const saved = localStorage.getItem('tmd_doctors');
      return saved ? JSON.parse(saved) : initialDoctors;
    }
  },

  // Fetch doctor by ID
  async getDoctorById(id) {
    try {
      const response = await api.get(`/doctors/${id}/`);
      return response.data;
    } catch {
      const doctors = await this.getDoctors();
      return doctors.find((doc) => doc.id === Number(id)) || initialDoctors[0];
    }
  },

  // Add new doctor (Admin)
  async createDoctor(doctorData) {
    try {
      const response = await api.post('/doctors/', doctorData);
      return response.data;
    } catch {
      const doctors = await this.getDoctors();
      const newDoctor = {
        ...doctorData,
        id: Date.now(),
        image: doctorData.image || '/assets/images/og image.png'
      };
      const updated = [...doctors, newDoctor];
      localStorage.setItem('tmd_doctors', JSON.stringify(updated));
      return newDoctor;
    }
  },

  // Update doctor (Admin)
  async updateDoctor(id, doctorData) {
    try {
      const response = await api.put(`/doctors/${id}/`, doctorData);
      return response.data;
    } catch {
      const doctors = await this.getDoctors();
      const updated = doctors.map((doc) =>
        doc.id === Number(id) ? { ...doc, ...doctorData } : doc
      );
      localStorage.setItem('tmd_doctors', JSON.stringify(updated));
      return updated.find((doc) => doc.id === Number(id));
    }
  },

  // Delete doctor (Admin)
  async deleteDoctor(id) {
    try {
      const response = await api.delete(`/doctors/${id}/`);
      return response.data;
    } catch {
      const doctors = await this.getDoctors();
      const updated = doctors.filter((doc) => doc.id !== Number(id));
      localStorage.setItem('tmd_doctors', JSON.stringify(updated));
      return { success: true };
    }
  }
};

export default doctorService;
