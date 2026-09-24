import api from './api';

// Initial sample appointments for demo/fallback
const initialAppointments = [
  {
    id: 'TMD-1001',
    patientName: 'Ananya Sharma',
    phone: '+91 98450 12345',
    email: 'ananya@example.com',
    primarySymptom: 'Jaw Clicking & Morning Headaches',
    notes: 'Clicking sound on left side while chewing for last 3 months',
    date: '2026-09-28',
    timeSlot: '10:30 AM',
    status: 'Confirmed',
    createdAt: '2026-09-23T10:15:00Z',
    doctorName: 'Dr. Ashwin Ramakrishnan',
    fee: '₹1,500'
  },
  {
    id: 'TMD-1002',
    patientName: 'Rahul Varma',
    phone: '+91 99201 88776',
    email: 'rahul.v@example.com',
    primarySymptom: 'Teeth Grinding / Clenching (Bruxism)',
    notes: 'Severe morning tooth soreness and jaw joint stiffness',
    date: '2026-09-29',
    timeSlot: '02:00 PM',
    status: 'Pending',
    createdAt: '2026-09-24T08:30:00Z',
    doctorName: 'Dr. Ashwin Ramakrishnan',
    fee: '₹1,500'
  },
  {
    id: 'TMD-1003',
    patientName: 'Kavita Menon',
    phone: '+91 94471 22334',
    email: 'kavita@example.com',
    primarySymptom: 'Locked Jaw & Restricted Opening',
    notes: 'Difficulty opening mouth wide, jaw catching repeatedly',
    date: '2026-09-25',
    timeSlot: '11:15 AM',
    status: 'Confirmed',
    createdAt: '2026-09-22T14:40:00Z',
    doctorName: 'Dr. Ashwin Ramakrishnan',
    fee: '₹1,500'
  },
  {
    id: 'TMD-1004',
    patientName: 'Dr. Arun Varma',
    phone: '+91 98950 55443',
    email: 'arun.varma@example.com',
    primarySymptom: 'Comprehensive Bite Assessment',
    notes: 'Follow-up T-Scan bite balancing and night appliance review',
    date: '2026-09-22',
    timeSlot: '04:00 PM',
    status: 'Completed',
    createdAt: '2026-09-18T09:00:00Z',
    doctorName: 'Dr. Ashwin Ramakrishnan',
    fee: '₹1,000'
  }
];

export const appointmentService = {
  // Fetch all appointments (Admin)
  async getAppointments(filters = {}) {
    try {
      const response = await api.get('/appointments/', { params: filters });
      return response.data;
    } catch {
      const saved = localStorage.getItem('tmd_appointments');
      let data = saved ? JSON.parse(saved) : initialAppointments;
      if (filters.status && filters.status !== 'All') {
        data = data.filter((item) => item.status === filters.status);
      }
      return data;
    }
  },

  // Create a new consultation booking
  async bookAppointment(appointmentData) {
    try {
      const response = await api.post('/appointments/', appointmentData);
      return response.data;
    } catch {
      const appointments = await this.getAppointments();
      const newAppointment = {
        ...appointmentData,
        id: `TMD-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'Pending',
        createdAt: new Date().toISOString(),
        doctorName: 'Dr. Ashwin Ramakrishnan',
        fee: '₹1,500'
      };
      const updated = [newAppointment, ...appointments];
      localStorage.setItem('tmd_appointments', JSON.stringify(updated));
      return newAppointment;
    }
  },

  // Update appointment status (Pending, Confirmed, Completed, Cancelled)
  async updateStatus(id, newStatus) {
    try {
      const response = await api.patch(`/appointments/${id}/`, { status: newStatus });
      return response.data;
    } catch {
      const appointments = await this.getAppointments();
      const updated = appointments.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      );
      localStorage.setItem('tmd_appointments', JSON.stringify(updated));
      return updated.find((item) => item.id === id);
    }
  },

  // Delete / cancel appointment
  async deleteAppointment(id) {
    try {
      const response = await api.delete(`/appointments/${id}/`);
      return response.data;
    } catch {
      const appointments = await this.getAppointments();
      const updated = appointments.filter((item) => item.id !== id);
      localStorage.setItem('tmd_appointments', JSON.stringify(updated));
      return { success: true };
    }
  },

  // Available consultation time slots for clinic working hours
  getAvailableSlots(date) {
    return [
      '09:45 AM',
      '10:30 AM',
      '11:15 AM',
      '12:00 PM',
      '02:00 PM',
      '02:45 PM',
      '03:30 PM',
      '04:15 PM',
      '05:00 PM'
    ];
  }
};

export default appointmentService;
