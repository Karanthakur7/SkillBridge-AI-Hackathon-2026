import React, { createContext, useContext, useState, useEffect } from 'react';
import { analyzeApi } from '../services/api';

const AnalysisContext = createContext();

const STORAGE_KEY = 'skillbridge_analysis_data';

export const AnalysisProvider = ({ children }) => {
  const [analysisData, setAnalysisData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [backendOnline, setBackendOnline] = useState(true);

  useEffect(() => {
    if (analysisData) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(analysisData));
      } catch (e) {
        console.error('Failed to cache analysis data:', e);
      }
    }
  }, [analysisData]);

  // Check backend health on mount and periodically
  useEffect(() => {
    const pingBackend = async () => {
      try {
        await analyzeApi.checkHealth();
        setBackendOnline(true);
      } catch (err) {
        setBackendOnline(false);
      }
    };
    pingBackend();
    const interval = setInterval(pingBackend, 15000);
    return () => clearInterval(interval);
  }, []);

  const loadDemoProfile = async (demoId) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await analyzeApi.getDemoProfile(demoId);
      setAnalysisData(data);
      setBackendOnline(true);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to load demo profile');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const uploadResume = async (file, targetRole = null, metadata = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      if (targetRole) {
        formData.append('target_role', targetRole);
      }
      if (metadata.candidateName) {
        formData.append('candidate_name', metadata.candidateName);
      }
      if (metadata.degree) {
        formData.append('degree', metadata.degree);
      }
      if (metadata.industryTrack) {
        formData.append('industry_track', metadata.industryTrack);
      }
      const data = await analyzeApi.uploadResume(formData);
      setAnalysisData(data);
      setBackendOnline(true);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to upload and analyze resume');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeText = async (text, targetRole = null, metadata = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await analyzeApi.analyzeText(
        text,
        targetRole,
        metadata.candidateName,
        metadata.degree
      );
      setAnalysisData(data);
      setBackendOnline(true);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to analyze text');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const changeTargetRole = async (newRoleName) => {
    if (!analysisData?.profile_id) {
      setError('Please analyze a resume or select a demo profile first.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const updatedData = await analyzeApi.updateTargetRole(analysisData.profile_id, newRoleName);
      setAnalysisData(updatedData);
      return updatedData;
    } catch (err) {
      setError(err.message || `Failed to update target role to ${newRoleName}`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const downloadReportPdf = async () => {
    if (!analysisData?.profile_id) {
      setError('No profile found to export.');
      return;
    }
    try {
      const blob = await analyzeApi.exportReportPdf(analysisData.profile_id);
      const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = url;
      const cleanName = (analysisData.profile?.name || 'Candidate').replace(/[^a-zA-Z0-9]/g, '_');
      link.setAttribute('download', `SkillBridge_AI_Report_${cleanName}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.error('Export report error:', err);
      // Fallback: window print
      window.print();
    }
  };

  const clearAnalysis = () => {
    setAnalysisData(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AnalysisContext.Provider
      value={{
        analysisData,
        isLoading,
        error,
        setError,
        backendOnline,
        loadDemoProfile,
        uploadResume,
        analyzeText,
        changeTargetRole,
        downloadReportPdf,
        clearAnalysis,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
};
