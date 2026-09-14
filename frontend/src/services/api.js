import axios from 'axios';

// API Base URL (Configurable via VITE_API_URL, defaults to direct backend)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
  },
  timeout: 45000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let customMessage = 'An unexpected error occurred. Please check backend connection.';
    if (error.response) {
      customMessage = error.response.data?.detail || `Server error (${error.response.status})`;
    } else if (error.request) {
      customMessage = 'Cannot connect to SkillBridge AI Backend (http://127.0.0.1:8000). Please ensure the FastAPI server is running.';
    }
    return Promise.reject(new Error(customMessage));
  }
);

export const analyzeApi = {
  uploadResume: async (formData) => {
    const response = await apiClient.post('/api/analyze/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  analyzeText: async (text, targetRole = null, candidateName = null, degree = null) => {
    const response = await apiClient.post('/api/analyze/text', {
      text,
      target_role: targetRole,
      candidate_name: candidateName,
      degree: degree
    });
    return response.data;
  },

  getDemoProfile: async (demoId) => {
    const response = await apiClient.get(`/api/demo/${demoId}`);
    return response.data;
  },

  getAllRoles: async () => {
    const response = await apiClient.get('/api/roles');
    return response.data;
  },

  getRoleDetail: async (roleName) => {
    const response = await apiClient.get(`/api/roles/${encodeURIComponent(roleName)}`);
    return response.data;
  },

  getAllSkills: async () => {
    const response = await apiClient.get('/api/skills');
    return response.data;
  },

  getRoadmap: async (roleName = 'Data Analyst', missingSkills = []) => {
    const query = missingSkills.length ? `?missing_skills=${encodeURIComponent(missingSkills.join(','))}` : '';
    const response = await apiClient.get(`/api/roadmap/${encodeURIComponent(roleName)}${query}`);
    return response.data;
  },

  getProfileAnalysis: async (profileId) => {
    const response = await apiClient.get(`/api/profile/${profileId}`);
    return response.data;
  },

  getAllCandidates: async () => {
    const response = await apiClient.get('/api/candidates');
    return response.data;
  },

  updateTargetRole: async (profileId, targetRole) => {
    const response = await apiClient.post(`/api/profile/${profileId}/target-role`, {
      target_role: targetRole,
    });
    return response.data;
  },

  exportReportPdf: async (profileId) => {
    const response = await apiClient.get(`/api/export-report/${profileId}`, {
      responseType: 'blob',
    });
    return response.data;
  },

  checkHealth: async () => {
    const response = await apiClient.get('/api/health');
    return response.data;
  },
};

export default apiClient;
