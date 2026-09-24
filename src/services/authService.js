import api from './api';

export const authService = {
  // Login method for Django REST Auth (e.g. dj-rest-auth or custom token endpoint)
  async login(usernameOrEmail, password) {
    try {
      const response = await api.post('/auth/login/', {
        username: usernameOrEmail,
        email: usernameOrEmail,
        password: password
      });
      const { token, user } = response.data;
      if (token) localStorage.setItem('tmd_auth_token', token);
      if (user) localStorage.setItem('tmd_user', JSON.stringify(user));
      return { token, user };
    } catch {
      // Mock / fallback credentials for frontend verification before Django backend runs
      if (
        (usernameOrEmail.toLowerCase() === 'admin' || usernameOrEmail.toLowerCase() === 'admin@drashwintmd.com') &&
        password === 'admin123'
      ) {
        const adminUser = {
          id: 1,
          name: 'Clinic Administrator',
          email: 'admin@drashwintmd.com',
          role: 'admin',
          doctorTitle: "Dr. Ashwin's TMD Clinic Admin"
        };
        const token = 'mock_admin_jwt_token_' + Date.now();
        localStorage.setItem('tmd_auth_token', token);
        localStorage.setItem('tmd_user', JSON.stringify(adminUser));
        return { token, user: adminUser };
      }

      // Default demo patient login
      if (
        usernameOrEmail.toLowerCase() === 'patient' ||
        usernameOrEmail.toLowerCase() === 'patient@example.com' ||
        password === 'patient123'
      ) {
        const patientUser = {
          id: 101,
          name: 'Priya Nair',
          email: 'priya@example.com',
          role: 'patient',
          phone: '+91 99470 11223'
        };
        const token = 'mock_patient_jwt_token_' + Date.now();
        localStorage.setItem('tmd_auth_token', token);
        localStorage.setItem('tmd_user', JSON.stringify(patientUser));
        return { token, user: patientUser };
      }

      throw new Error('Invalid username or password. (Hint: Use admin / admin123 or patient / patient123)');
    }
  },

  logout() {
    localStorage.removeItem('tmd_auth_token');
    localStorage.removeItem('tmd_user');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('tmd_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken() {
    return localStorage.getItem('tmd_auth_token');
  },

  isAuthenticated() {
    return !!localStorage.getItem('tmd_auth_token');
  },

  isAdmin() {
    const user = this.getCurrentUser();
    return user && user.role === 'admin';
  }
};

export default authService;
