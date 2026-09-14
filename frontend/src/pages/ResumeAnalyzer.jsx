import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UploadCloud, 
  FileText, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  Loader2,
  FileCode,
  Zap,
  Target,
  User,
  GraduationCap,
  Layers
} from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import { analyzeApi } from '../services/api';

const ResumeAnalyzer = () => {
  const navigate = useNavigate();
  const { uploadResume, analyzeText, loadDemoProfile, isLoading, error, setError } = useAnalysis();

  const [activeTab, setActiveTab] = useState('upload'); // 'upload' or 'paste'
  const [selectedFile, setSelectedFile] = useState(null);
  const [pastedText, setPastedText] = useState('');
  
  // Metadata fields
  const [candidateName, setCandidateName] = useState('');
  const [degree, setDegree] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [industryTrack, setIndustryTrack] = useState('Engineering & AI');
  
  const [availableRoles, setAvailableRoles] = useState([]);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await analyzeApi.getAllRoles();
        setAvailableRoles(data.roles || []);
      } catch (e) {
        console.error('Failed to load roles:', e);
      }
    };
    fetchRoles();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file) => {
    setError(null);
    const validExts = ['.pdf', '.docx', '.txt'];
    const hasValidExt = validExts.some(ext => file.name.toLowerCase().endsWith(ext));

    if (!hasValidExt) {
      setError('Unsupported file type. Please select a PDF (.pdf), Word (.docx), or Text (.txt) file.');
      setSelectedFile(null);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB limit. Please upload a smaller resume file.');
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const metadata = {
      candidateName: candidateName.trim() || undefined,
      degree: degree.trim() || undefined,
      industryTrack: industryTrack
    };

    try {
      if (activeTab === 'upload') {
        if (!selectedFile) {
          setError('Please select a resume file (PDF, DOCX, or TXT) to analyze.');
          return;
        }
        await uploadResume(selectedFile, targetRole || null, metadata);
      } else {
        if (!pastedText.trim() || pastedText.trim().length < 15) {
          setError('Please paste resume text with at least 15 characters.');
          return;
        }
        await analyzeText(pastedText, targetRole || null, metadata);
      }
      navigate('/dashboard');
    } catch (err) {
      // Error handled in context
    }
  };

  const handleDemoClick = async (demoId) => {
    try {
      await loadDemoProfile(demoId);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-4 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> AI Resume Assessment Engine
        </div>
        <h1 className="text-2xl sm:text-4xl font-black font-display text-white">
          Upload or Paste Candidate Resume
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          SkillBridge AI will parse candidate competencies, evaluate technical readiness against industry benchmarks, and generate your customized learning roadmap.
        </p>
      </div>

      {/* Quick 1-Click Judge Shortcuts Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0d172e] to-slate-900 rounded-3xl p-5 border border-slate-800 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center md:text-left">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">Evaluating as a SIH Judge?</div>
            <div className="text-xs text-slate-400">Run live backend parsing on our pre-configured candidate profiles with 1 click.</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => handleDemoClick('1')}
            disabled={isLoading}
            className="px-3.5 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-blue-200 text-xs font-bold transition-all disabled:opacity-50"
          >
            Rohan (Data Analyst)
          </button>
          <button
            onClick={() => handleDemoClick('2')}
            disabled={isLoading}
            className="px-3.5 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs font-bold transition-all disabled:opacity-50"
          >
            Priya (ML Engineer)
          </button>
          <button
            onClick={() => handleDemoClick('3')}
            disabled={isLoading}
            className="px-3.5 py-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-200 text-xs font-bold transition-all disabled:opacity-50"
          >
            Aman (Full Stack Dev)
          </button>
        </div>
      </div>

      {/* Main Analyzer Card */}
      <div className="bg-[#0f172a]/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
        {/* Input Method Tabs */}
        <div className="grid grid-cols-2 border-b border-slate-800">
          <button
            onClick={() => { setActiveTab('upload'); setError(null); }}
            className={`py-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === 'upload'
                ? 'border-cyan-400 text-cyan-300 bg-slate-900/60'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Resume File (PDF / DOCX / TXT)</span>
          </button>

          <button
            onClick={() => { setActiveTab('paste'); setError(null); }}
            className={`py-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === 'paste'
                ? 'border-cyan-400 text-cyan-300 bg-slate-900/60'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Paste Resume Text</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {/* Metadata Grid (Candidate Details) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>Candidate Name (Optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Rohan Sharma"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none transition-all placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Education / Degree (Optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. B.Tech Computer Science (3rd Year)"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none transition-all placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-cyan-400" />
                <span>Target Career Role</span>
              </label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none transition-all"
              >
                <option value="">-- Auto-Detect Highest Matching Industry Role --</option>
                {availableRoles.map((role) => (
                  <option key={role.role_name} value={role.role_name}>
                    {role.role_name} ({role.department || role.category})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Industry Track</span>
              </label>
              <select
                value={industryTrack}
                onChange={(e) => setIndustryTrack(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none transition-all"
              >
                <option value="Engineering & AI">Engineering, AI & Data Analytics</option>
                <option value="Software Development">Full Stack & Software Engineering</option>
                <option value="Cloud & Infrastructure">Cloud Computing & DevOps</option>
                <option value="Business & Operations">Business, Operations & Non-Tech</option>
              </select>
            </div>
          </div>

          {/* Tab 1: File Upload */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all cursor-pointer ${
                  dragOver
                    ? 'border-cyan-400 bg-cyan-500/10'
                    : selectedFile
                    ? 'border-emerald-500/60 bg-emerald-500/5'
                    : 'border-slate-700 hover:border-cyan-500/60 bg-slate-900/60'
                }`}
                onClick={() => document.getElementById('resume-file-input').click()}
              >
                <input
                  id="resume-file-input"
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {selectedFile ? (
                  <div className="space-y-2">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg">
                      <FileCode className="w-7 h-7" />
                    </div>
                    <div className="text-base font-bold text-white">{selectedFile.name}</div>
                    <div className="text-xs text-slate-400">
                      {(selectedFile.size / 1024).toFixed(1)} KB • Ready for analysis. Click to replace.
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mx-auto shadow-lg">
                      <UploadCloud className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white">
                        Drag and drop your resume file here, or <span className="text-cyan-400 underline">browse</span>
                      </span>
                      <p className="text-xs text-slate-400 mt-1">
                        Supports PDF (.pdf), Microsoft Word (.docx), or Text (.txt) up to 10MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 2: Paste Text */}
          {activeTab === 'paste' && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Paste Complete Resume Content
              </label>
              <textarea
                rows={10}
                placeholder="Paste candidate resume text including summary, education, technical skills, projects, and certifications..."
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                className="w-full p-4 rounded-2xl border border-slate-700 font-mono text-xs sm:text-sm text-slate-200 bg-slate-900 focus:border-cyan-400 focus:outline-none transition-all placeholder:text-slate-600"
              />
            </div>
          )}

          {/* Error Alert */}
          {error && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-400" />
              <div>
                <span className="font-bold">Error: </span>
                {error}
              </div>
            </div>
          )}

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-brand-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-brand-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Parsing Multi-Format Resume & Computing Readiness...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze Resume & Calculate Readiness</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
