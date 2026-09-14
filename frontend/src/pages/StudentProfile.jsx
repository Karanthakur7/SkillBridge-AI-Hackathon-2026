import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  GraduationCap, 
  Building, 
  Calendar, 
  ExternalLink, 
  Sparkles, 
  Award, 
  Briefcase, 
  FolderGit2, 
  CheckCircle2, 
  TrendingUp, 
  ArrowRight,
  Lightbulb,
  FileCheck,
  Download,
  Target,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import SkillBadge from '../components/SkillBadge';

const GithubIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const StudentProfile = () => {
  const { analysisData, isLoading, loadDemoProfile, downloadReportPdf } = useAnalysis();
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    try {
      setExporting(true);
      await downloadReportPdf();
    } catch (e) {
      console.error(e);
    } finally {
      setExporting(false);
    }
  };

  if (!analysisData) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mx-auto shadow-glow-cyan">
          <User className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black font-display text-white">
            No Student Profile Loaded
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Upload a resume or select a demo candidate to view extracted profile metadata, detected links, portfolio enhancements, and internship recommendations.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/analyzer"
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-brand-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-brand-500/25 flex items-center gap-1.5 transition-all"
          >
            <span>Upload Resume</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => loadDemoProfile('1')}
            disabled={isLoading}
            className="px-4 py-3 rounded-2xl bg-blue-500/15 text-blue-300 hover:bg-blue-500/25 border border-blue-500/30 text-xs font-bold transition-all"
          >
            Load Rohan's Profile
          </button>
        </div>
      </div>
    );
  }

  const { profile, active_target_role, readiness_score, portfolio_suggestions, internship_suggestions, career_matches, roadmap } = analysisData;

  return (
    <div className="space-y-8 py-4 max-w-6xl mx-auto">
      {/* Profile Header Card */}
      <div className="bg-[#0f172a]/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-cyan-500 via-brand-600 to-purple-600 text-white font-black text-2xl font-display flex items-center justify-center shadow-lg shadow-cyan-500/20 flex-shrink-0 border-2 border-cyan-400/40">
              {profile.name?.split(' ').map(n => n[0]).join('').substring(0, 2) || 'ST'}
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
                  {profile.name || 'Student Candidate'}
                </h1>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  Target: {active_target_role}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Readiness: {readiness_score}%
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-400 font-medium">
                {profile.email && (
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{profile.email}</span>
                  </span>
                )}
                {profile.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{profile.phone}</span>
                  </span>
                )}
                {profile.graduation_year && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Class of {profile.graduation_year}</span>
                  </span>
                )}
              </div>

              {/* Education */}
              <div className="flex items-center gap-2 text-xs text-slate-300 pt-0.5">
                <GraduationCap className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>
                  <strong className="text-white">{profile.degree || 'Bachelor of Technology'}</strong> • {profile.institution || 'Engineering Institution'}
                </span>
              </div>
            </div>
          </div>

          {/* Social / External Links & Export Report CTA */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2 md:pt-0">
            {profile.github_url ? (
              <a
                href={profile.github_url.startsWith('http') ? profile.github_url : `https://${profile.github_url}`}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-2 border border-slate-700 transition-all"
              >
                <GithubIcon />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            ) : null}

            {profile.linkedin_url ? (
              <a
                href={profile.linkedin_url.startsWith('http') ? profile.linkedin_url : `https://${profile.linkedin_url}`}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2.5 rounded-2xl bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 border border-blue-500/40 text-xs font-semibold flex items-center gap-2 transition-all"
              >
                <LinkedinIcon />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-blue-300" />
              </a>
            ) : null}

            <button
              onClick={handleExport}
              disabled={exporting}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/25 flex items-center gap-2 transition-all hover:scale-105"
            >
              <Download className="w-4 h-4" />
              <span>{exporting ? 'Generating...' : 'Export PDF Report'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Profile Sections Grid: Skills, Projects, Experience, Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Extracted Skills List */}
        <div className="p-6 bg-[#0f172a]/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Extracted Technical Competencies</span>
            </h3>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {profile.extracted_skills?.length || 0} Skills
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
            {profile.extracted_skills?.map((skill) => (
              <SkillBadge key={skill} name={skill} type="matched" />
            ))}
            {(!profile.extracted_skills || profile.extracted_skills.length === 0) && (
              <span className="text-xs text-slate-500 italic">No skills extracted.</span>
            )}
          </div>
        </div>

        {/* Extracted Projects */}
        <div className="p-6 bg-[#0f172a]/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-indigo-400" />
              <span>Verified Resume Projects</span>
            </h3>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
              {profile.projects?.length || 0} Projects
            </span>
          </div>

          <ul className="space-y-2.5 max-h-48 overflow-y-auto pr-1 text-xs">
            {profile.projects?.map((proj, idx) => (
              <li key={idx} className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-300 leading-relaxed">
                {proj}
              </li>
            ))}
            {(!profile.projects || profile.projects.length === 0) && (
              <li className="text-xs text-slate-500 italic py-2">No projects explicitly parsed from resume.</li>
            )}
          </ul>
        </div>

        {/* Internships & Experience */}
        <div className="p-6 bg-[#0f172a]/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-purple-400" />
              <span>Internships & Experience</span>
            </h3>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
              {profile.internships?.length || 0}
            </span>
          </div>

          <ul className="space-y-2.5 max-h-48 overflow-y-auto pr-1 text-xs">
            {profile.internships?.map((exp, idx) => (
              <li key={idx} className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-300 leading-relaxed">
                {exp}
              </li>
            ))}
            {(!profile.internships || profile.internships.length === 0) && (
              <li className="text-xs text-slate-500 italic py-2">No internship experience listed on resume.</li>
            )}
          </ul>
        </div>

        {/* Certifications */}
        <div className="p-6 bg-[#0f172a]/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Certifications & Credentials</span>
            </h3>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
              {profile.certifications?.length || 0}
            </span>
          </div>

          <ul className="space-y-2.5 max-h-48 overflow-y-auto pr-1 text-xs">
            {profile.certifications?.map((cert, idx) => (
              <li key={idx} className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-300 leading-relaxed flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{cert}</span>
              </li>
            ))}
            {(!profile.certifications || profile.certifications.length === 0) && (
              <li className="text-xs text-slate-500 italic py-2">No certifications detected.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Actionable Portfolio Enhancement Suggestions */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl font-bold font-display text-white">
            Actionable Portfolio Enhancement Recommendations
          </h2>
        </div>
        <p className="text-xs text-slate-400 -mt-2">
          Steps to increase candidate shortlisting rates for <strong className="text-cyan-300">{active_target_role}</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {portfolio_suggestions?.map((item, index) => (
            <div key={index} className="p-5 bg-[#0f172a]/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-lg space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  {item.category}
                </span>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  {item.impact}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white">
                {item.title}
              </h4>

              <ul className="space-y-1.5 text-xs text-slate-300">
                {item.actionable_steps?.map((step, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-1.5 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0"></span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Target Internship Recommendations */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-cyan-400" />
          <h2 className="text-xl font-bold font-display text-white">
            Recommended Internship Pathways
          </h2>
        </div>
        <p className="text-xs text-slate-400 -mt-2">
          Identified entry-level internship profiles aligned with your current competencies and active target role ({active_target_role}).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {internship_suggestions?.map((internship, idx) => (
            <div key={idx} className="p-5 bg-[#0f172a]/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-lg flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {internship.domain}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400">
                    {internship.match_relevance}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mb-1.5">
                  {internship.title}
                </h4>

                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  {internship.description}
                </p>

                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Recommended Skill Baseline
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {internship.recommended_skills?.map((s) => (
                      <span key={s} className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-slate-900 text-slate-300 border border-slate-800">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Industry Pathway</span>
                <span className="font-semibold text-cyan-400">Ideal for Portfolio Building</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StudentProfile;
