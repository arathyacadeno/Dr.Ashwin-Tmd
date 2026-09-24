import React, { createContext, useContext, useState, useEffect } from 'react';
import clinicService from '../services/clinicService';
import doctorService from '../services/doctorService';
import appointmentService from '../services/appointmentService';

const ClinicContext = createContext(null);

export const ClinicProvider = ({ children }) => {
  const [clinicInfo, setClinicInfo] = useState(null);
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Load all initial dynamic data
  const loadData = async () => {
    try {
      const [info, srv, docs, appts, fq, test, fee] = await Promise.all([
        clinicService.getClinicInfo(),
        clinicService.getServices(),
        doctorService.getDoctors(),
        appointmentService.getAppointments(),
        clinicService.getFaqs(),
        clinicService.getTestimonials(),
        clinicService.getFees()
      ]);

      setClinicInfo(info);
      setServices(srv);
      setDoctors(docs);
      setAppointments(appts);
      setFaqs(fq);
      setTestimonials(test);
      setFees(fee);
    } catch (err) {
      console.error('Error loading clinic dynamic data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Appointment actions
  const bookAppointment = async (data) => {
    const newAppt = await appointmentService.bookAppointment(data);
    setAppointments((prev) => [newAppt, ...prev]);
    showToast('Your consultation request has been confirmed! We will contact you shortly.');
    return newAppt;
  };

  const updateAppointmentStatus = async (id, status) => {
    const updated = await appointmentService.updateStatus(id, status);
    setAppointments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
    showToast(`Appointment ${id} status updated to ${status}.`);
    return updated;
  };

  // Doctor actions
  const updateDoctor = async (id, doctorData) => {
    const updated = await doctorService.updateDoctor(id, doctorData);
    setDoctors((prev) =>
      prev.map((doc) => (doc.id === Number(id) ? { ...doc, ...doctorData } : doc))
    );
    showToast('Doctor details updated successfully.');
    return updated;
  };

  // Service actions
  const updateService = async (id, serviceData) => {
    const updated = await clinicService.updateService(id, serviceData);
    setServices((prev) =>
      prev.map((s) => (s.id === Number(id) ? { ...s, ...serviceData } : s))
    );
    showToast('Treatment service updated.');
    return updated;
  };

  // FAQ actions
  const updateFaq = async (id, faqData) => {
    const updated = await clinicService.updateFaq(id, faqData);
    setFaqs((prev) =>
      prev.map((f) => (f.id === Number(id) ? { ...f, ...faqData } : f))
    );
    showToast('FAQ updated.');
    return updated;
  };

  const addFaq = async (faqData) => {
    const newFaq = await clinicService.createFaq(faqData);
    setFaqs((prev) => [...prev, newFaq]);
    showToast('New FAQ added.');
    return newFaq;
  };

  const deleteFaq = async (id) => {
    await clinicService.deleteFaq(id);
    setFaqs((prev) => prev.filter((f) => f.id !== Number(id)));
    showToast('FAQ deleted.');
  };

  // Testimonial actions
  const updateTestimonial = async (id, testimonialData) => {
    const updated = await clinicService.updateTestimonial(id, testimonialData);
    setTestimonials((prev) =>
      prev.map((t) => (t.id === Number(id) ? { ...t, ...testimonialData } : t))
    );
    showToast('Testimonial updated.');
    return updated;
  };

  const addTestimonial = async (testimonialData) => {
    const newTest = await clinicService.createTestimonial(testimonialData);
    setTestimonials((prev) => [...prev, newTest]);
    showToast('New testimonial published.');
    return newTest;
  };

  const deleteTestimonial = async (id) => {
    await clinicService.deleteTestimonial(id);
    setTestimonials((prev) => prev.filter((t) => t.id !== Number(id)));
    showToast('Testimonial removed.');
  };

  // Clinic info action
  const updateClinicInfo = async (info) => {
    const updated = await clinicService.updateClinicInfo(info);
    setClinicInfo(updated);
    showToast('Clinic details updated.');
    return updated;
  };

  // Fee action
  const updateFee = async (id, feeData) => {
    const updated = await clinicService.updateFee(id, feeData);
    setFees((prev) =>
      prev.map((f) => (f.id === Number(id) ? { ...f, ...feeData } : f))
    );
    showToast('Consultation fee updated.');
    return updated;
  };

  return (
    <ClinicContext.Provider
      value={{
        clinicInfo,
        services,
        doctors,
        appointments,
        faqs,
        testimonials,
        fees,
        loading,
        bookingModalOpen,
        setBookingModalOpen,
        openBookingModal: () => setBookingModalOpen(true),
        closeBookingModal: () => setBookingModalOpen(false),
        bookAppointment,
        updateAppointmentStatus,
        updateDoctor,
        updateService,
        updateFaq,
        addFaq,
        deleteFaq,
        updateTestimonial,
        addTestimonial,
        deleteTestimonial,
        updateClinicInfo,
        updateFee,
        toastMessage,
        showToast
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
};

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
};
