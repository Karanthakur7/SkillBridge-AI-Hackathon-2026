import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Target, 
  CheckCircle2, 
  AlertTriangle, 
  GraduationCap, 
  ArrowRight, 
  TrendingUp, 
  FileText, 
  Layers, 
  Briefcase, 
  User, 
  ChevronDown,
  Sparkles,
  Zap,
  Download,
  DollarSign,
  Building,
  Activity,
  Award,
  BookOpen,
  Rocket,
  HelpCircle,
  Clock,
  Flame,
  Check
} from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import ReadinessGauge from '../components/ReadinessGauge';
import CareerCard from '../components/CareerCard';
import SkillGapTable from '../components/SkillGapTable';
import SkillBadge from '../components/SkillBadge';
import { analyzeApi } from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const { analysisData, changeTargetRole, loadDemoProfile, downloadReportPdf, isLoading } = useAnalysis();
  const [availableRoles, setAvailableRoles] = useState([]);
  const [allSkillsMap, setAllSkillsMap] = useState({});
  const [targetSelectOpen, setTargetSelectOpen] = useState(false);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rolesRes, skillsRes] = await Promise.all([
          analyzeApi.getAllRoles(),
          analyzeApi.getAllSkills()
        ]);
        setAvailableRoles(rolesRes.roles || []);
        
        const map = {};
        (skillsRes.skills || []).forEach(s => {
          map[s.name.toLowerCase()] = s;
        });
        setAllSkillsMap(map);
      } catch (e) {
        console.error('Failed to load metadata:', e);
      }
    };
    fetchData();
  }, []);

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

  // If no analysis data is loaded, show friendly empty state
  if (!analysisData) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mx-auto shadow-glow-cyan">
          <FileText className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black font-display text-white">
            No Resume Analysis Found Yet
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Upload your resume or click a 1-click SIH judge demo candidate to discover your industry readiness score and tailored roadmap.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/analyzer"
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-brand-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-brand-500/25 flex items-center gap-1.5 transition-all"
          >
            <span>Upload Resume File</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => loadDemoProfile('1')}
            disabled={isLoading}
            className="px-4 py-3 rounded-2xl bg-blue-500/15 text-blue-300 hover:bg-blue-500/25 border border-blue-500/30 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            <span>Rohan Sharma (Data Analyst)</span>
          </button>

          <button
            onClick={() => loadDemoProfile('2')}
            disabled={isLoading}
            className="px-4 py-3 rounded-2xl bg-purple-500/15 text-purple-300 hover:bg-purple-500/25 border border-purple-500/30 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <Zap className="w-3.5 h-3.5 text-purple-400" />
            <span>Priya Patel (ML Engineer)</span>
          </button>

          <button
            onClick={() => loadDemoProfile('3')}
            disabled={isLoading}
            className="px-4 py-3 rounded-2xl bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Aman Verma (Full Stack Dev)</span>
          </button>
        </div>
      </div>
    );
  }

  const {
    profile,
    active_target_role,
    readiness_score,
    matched_skills,
    missing_skills,
    priority_skills,
    career_matches,
    gap_analysis,
    roadmap
  } = analysisData;

  const handleRoleChange = async (newRole) => {
    setTargetSelectOpen(false);
    await changeTargetRole(newRole);
  };

  // Role metadata
  const currentRoleMeta = availableRoles.find(r => r.role_name.toLowerCase() === active_target_role.toLowerCase()) || {};
  const department = currentRoleMeta.department || gap_analysis?.department || 'AI & Analytics';
  const salaryRange = currentRoleMeta.avg_salary || gap_analysis?.avg_salary || '₹7 LPA – ₹18 LPA';
  const marketDemand = currentRoleMeta.market_demand || gap_analysis?.market_demand || 'Very High';
  const industryGrowth = currentRoleMeta.industry_growth || gap_analysis?.industry_growth || '+28% (Very High)';

  // First priority missing skill for "Your Next Best Step"
  const topPrioritySkill = priority_skills?.[0] || missing_skills?.[0] || null;

  return (
    <div className="space-y-8 py-4">
      {/* Top Header Section: Evaluation Target & Action Toolbar */}
      <div className="bg-[#0f172a]/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

        <div className="space-y-2 z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-cyan-400" /> Evaluation Target: Smart India Hackathon 2026
            </span>
            <span className="text-xs font-medium text-slate-400">
              Candidate: <strong className="text-white">{profile.name}</strong> ({profile.degree || 'Student'})
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black font-display text-white tracking-tight">
            {active_target_role}
          </h1>

          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            {gap_analysis?.description || 'Extracts knowledge and insights from structured and unstructured data using predictive modeling, statistics, and machine learning.'}
          </p>
        </div>

        {/* Change Target Role Selector + Export Report Button */}
        <div className="flex flex-wrap items-center gap-3 z-10 flex-shrink-0">
          {/* Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setTargetSelectOpen(!targetSelectOpen)}
              disabled={isLoading}
              className="px-4 py-2.5 rounded-2xl border border-slate-700 hover:border-cyan-400 bg-slate-900 text-white text-xs sm:text-sm font-bold flex items-center justify-between gap-3 shadow-lg transition-all disabled:opacity-50"
            >
              <span>🎯 Change Evaluation Role</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {targetSelectOpen && (
              <div className="absolute right-0 mt-2 w-72 max-h-80 overflow-y-auto rounded-2xl bg-[#0f172a] shadow-2xl border border-slate-700 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  Select Active Evaluation Target
                </div>
                {availableRoles.map((role) => {
                  const isSelected = role.role_name.toLowerCase() === active_target_role.toLowerCase();
                  return (
                    <button
                      key={role.role_name}
                      onClick={() => handleRoleChange(role.role_name)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${
                        isSelected ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span>{role.role_name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        {role.department || role.category}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Export Report CTA */}
          <button
            onClick={handleExport}
            disabled={exporting}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/25 flex items-center gap-2 transition-all hover:scale-105"
          >
            <Download className="w-4 h-4" />
            <span>{exporting ? 'Generating...' : 'Export PDF Report'}</span>
          </button>
        </div>
      </div>

      {/* Actionable Next Step Callout Banner */}
      {topPrioritySkill && (
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                Your Next Best Actionable Step
              </div>
              <div className="text-sm font-bold text-white">
                Master <span className="text-cyan-300 underline underline-offset-2">{topPrioritySkill}</span> to unlock your {active_target_role} qualification.
              </div>
              <p className="text-xs text-slate-400">
                Estimated duration: 3–5 weeks • Jump directly to structured tutorials and portfolio projects.
              </p>
            </div>
          </div>

          <Link
            to="/roadmap"
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md self-start sm:self-auto transition-all flex-shrink-0"
          >
            <span>Start Learning {topPrioritySkill}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* 4 Metrics Cards: Department, Avg Salary Range, Market Demand, Industry Growth */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Department */}
        <div className="p-5 bg-[#0f172a]/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-lg flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
            <Building className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Department</div>
            <div className="text-base font-black font-display text-white">{department}</div>
          </div>
        </div>

        {/* Avg. Salary Range */}
        <div className="p-5 bg-[#0f172a]/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-lg flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Avg. Salary Range</div>
            <div className="text-base font-black font-display text-white">{salaryRange}</div>
          </div>
        </div>

        {/* Market Demand */}
        <div className="p-5 bg-[#0f172a]/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-lg flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Market Demand</div>
            <div className="text-base font-black font-display text-white">{marketDemand}</div>
          </div>
        </div>

        {/* Industry Growth */}
        <div className="p-5 bg-[#0f172a]/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-lg flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-400 border border-brand-500/30 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Industry Growth</div>
            <div className="text-base font-black font-display text-white">{industryGrowth}</div>
          </div>
        </div>
      </div>

      {/* Analytics Main Grid: Circular Readiness Gauge + Extracted Skills Inventory */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Circular Readiness Score Visualization */}
        <div className="lg:col-span-1">
          <ReadinessGauge score={readiness_score} targetRole={active_target_role} size={230} />
        </div>

        {/* Right: Extracted Resume Skills Inventory + Priority Gaps */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Extracted Resume Skills Inventory Card */}
          <div className="p-6 bg-[#0f172a]/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Extracted Resume Skills
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  {profile.extracted_skills?.length || 0} Skills Identified
                </span>
              </div>
              <div className="flex flex-wrap gap-2 max-h-44 overflow-y-auto pr-1">
                {profile.extracted_skills?.map((s) => {
                  const meta = allSkillsMap[s.toLowerCase()];
                  const cat = meta?.category || 'Skill';
                  return (
                    <span
                      key={s}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{s}</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-normal">
                        {cat}
                      </span>
                    </span>
                  );
                })}
                {(!profile.extracted_skills || profile.extracted_skills.length === 0) && (
                  <span className="text-xs text-slate-500 italic">No skills extracted from resume.</span>
                )}
              </div>
            </div>
            <div className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-800">
              Matched {matched_skills?.length || 0} skills against <strong className="text-slate-300">{active_target_role}</strong> industry ontology.
            </div>
          </div>

          {/* Priority Missing Skills (Core Gap) */}
          <div className="p-6 bg-[#0f172a]/90 backdrop-blur-xl rounded-3xl border border-rose-500/30 bg-rose-950/10 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-500" /> Priority Gaps (Core)
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {priority_skills?.length || 0} Missing
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-44 overflow-y-auto pr-1">
                {priority_skills?.map((s) => (
                  <SkillBadge key={s} name={s} type="missing-core" priority="High" />
                ))}
                {(!priority_skills || priority_skills.length === 0) && (
                  <span className="text-xs text-emerald-400 font-medium">✓ All core industry skills satisfied!</span>
                )}
              </div>
            </div>
            <div className="text-[11px] text-rose-400/90 mt-3 pt-2 border-t border-rose-500/20 font-medium">
              Closing these core gaps boosts your readiness score by up to {((priority_skills?.length || 0) * 15).toFixed(0)}%.
            </div>
          </div>

          {/* Learning Roadmap Fast-Track Banner */}
          <div className="p-6 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 rounded-3xl border border-cyan-500/30 text-white shadow-xl flex flex-col justify-between sm:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Tailored Curriculum
                </span>
                <h3 className="text-lg font-bold font-display text-white">
                  Personalized Learning Roadmap for {active_target_role}
                </h3>
                <p className="text-xs text-slate-300 max-w-xl">
                  {roadmap?.phases?.length || 3} milestone phases specifically structured to eliminate your {missing_skills?.length || 0} missing skill gaps.
                </p>
              </div>

              <div className="flex-shrink-0 flex items-center gap-2">
                <Link
                  to="/roadmap"
                  className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-brand-600 hover:from-cyan-400 hover:to-brand-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all hover:scale-105"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>View Timeline Roadmap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  to="/profile"
                  className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all"
                >
                  <User className="w-3.5 h-3.5 inline mr-1" />
                  <span>Student Profile</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Priority Skills to Unlock This Career Section */}
      {missing_skills && missing_skills.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-rose-500" />
            <h2 className="text-xl font-bold font-display text-white">
              Priority Skills to Unlock This Career
            </h2>
          </div>
          <p className="text-xs text-slate-400 -mt-2">
            Targeted skill gaps holding you back from full qualification for <strong className="text-cyan-300">{active_target_role}</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {missing_skills.slice(0, 3).map((skill, index) => {
              const isCore = priority_skills?.includes(skill);
              const estWeeks = isCore ? '4–6 weeks' : '2–3 weeks';
              const priorityLabel = isCore ? 'HIGH PRIORITY' : 'MEDIUM PRIORITY';

              return (
                <div
                  key={skill}
                  className="p-5 rounded-3xl bg-[#0f172a]/90 backdrop-blur-xl border border-slate-800 shadow-xl flex flex-col justify-between space-y-3 hover:border-cyan-500/40 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        isCore
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      }`}>
                        {priorityLabel}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cyan-400" /> {estWeeks}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-1">
                      {index + 1}. {skill}
                    </h4>

                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      {isCore 
                        ? `Essential core competency for ${active_target_role}. Mastering ${skill} directly qualifies you for technical hiring evaluations.`
                        : `Important supporting tool. Gaining practical exposure in ${skill} strengthens your portfolio and makes your resume stand out.`
                      }
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <Link
                      to="/roadmap"
                      className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 border border-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Start Learning {skill}</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Skill Gap Analysis Table */}
      <section className="space-y-4">
        <SkillGapTable gapData={gap_analysis} />
      </section>

      {/* AI Career Fit Recommendations Section */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-400">
                Alternative Career Pathways
              </span>
            </div>
            <h2 className="text-xl font-black font-display text-white mt-1">
              AI Career Fit Recommendations
            </h2>
            <p className="text-xs text-slate-400">
              Ranked alternative career paths evaluated against candidate's extracted skillset matrix.
            </p>
          </div>

          <Link
            to="/roles"
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Explore all 20+ job roles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {career_matches?.slice(0, 6).map((match) => (
            <CareerCard key={match.role_name} roleMatch={match} onSelect={handleRoleChange} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
