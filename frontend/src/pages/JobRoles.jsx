import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  Search, 
  Filter, 
  Target, 
  CheckCircle2, 
  ArrowRight, 
  GraduationCap, 
  Sparkles,
  Layers,
  Code2,
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  Building
} from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import { analyzeApi } from '../services/api';
import SkillBadge from '../components/SkillBadge';

const JobRoles = () => {
  const navigate = useNavigate();
  const { analysisData, changeTargetRole, isLoading } = useAnalysis();

  const [roles, setRoles] = useState([]);
  const [filterCategory, setFilterCategory] = useState('ALL'); // ALL, Technical, Non-Technical
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingRoles, setLoadingRoles] = useState(true);

  useEffect(() => {
    const fetchAllRoles = async () => {
      try {
        setLoadingRoles(true);
        const data = await analyzeApi.getAllRoles();
        setRoles(data.roles || []);
      } catch (err) {
        console.error('Failed to fetch job roles:', err);
      } finally {
        setLoadingRoles(false);
      }
    };
    fetchAllRoles();
  }, []);

  const handleSetTarget = async (roleName) => {
    if (analysisData?.profile_id) {
      await changeTargetRole(roleName);
      navigate('/dashboard');
    } else {
      navigate('/analyzer');
    }
  };

  const handleViewRoadmap = async (roleName) => {
    if (analysisData?.profile_id) {
      await changeTargetRole(roleName);
      navigate('/roadmap');
    } else {
      navigate('/roadmap');
    }
  };

  const filteredRoles = roles.filter((role) => {
    const matchesCategory = filterCategory === 'ALL' || role.category === filterCategory;
    const matchesSearch = 
      role.role_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (role.department && role.department.toLowerCase().includes(searchTerm.toLowerCase())) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.core_skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      role.secondary_skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const getMatchForRole = (roleName) => {
    if (!analysisData?.career_matches) return null;
    return analysisData.career_matches.find(m => m.role_name.toLowerCase() === roleName.toLowerCase());
  };

  return (
    <div className="space-y-8 py-4">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" /> Industry Competency Matrix
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-display text-white tracking-tight">
            Job Roles Explorer
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Explore 20+ high-demand technical and non-technical industry job roles, department requirements, market salary benchmarks, and tailored skill ontologies.
          </p>
        </div>

        {/* Category Filters & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search role or skill (e.g. Python, SQL, ML)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-9 pr-3.5 py-2.5 text-xs rounded-2xl border border-slate-700 bg-slate-900 text-white focus:border-cyan-400 focus:outline-none transition-all placeholder:text-slate-500"
            />
          </div>

          {/* Category Toggle */}
          <div className="inline-flex rounded-2xl bg-slate-900 border border-slate-800 p-1 text-xs font-bold">
            <button
              onClick={() => setFilterCategory('ALL')}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                filterCategory === 'ALL' ? 'bg-gradient-to-r from-cyan-500 to-brand-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({roles.length})
            </button>
            <button
              onClick={() => setFilterCategory('Technical')}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-1 transition-all ${
                filterCategory === 'Technical' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'text-slate-400 hover:text-blue-300'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Tech ({roles.filter(r => r.category === 'Technical').length})</span>
            </button>
            <button
              onClick={() => setFilterCategory('Non-Technical')}
              className={`px-3.5 py-2 rounded-xl flex items-center gap-1 transition-all ${
                filterCategory === 'Non-Technical' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'text-slate-400 hover:text-purple-300'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Non-Tech ({roles.filter(r => r.category === 'Non-Technical').length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Roles Grid */}
      {loadingRoles ? (
        <div className="p-16 text-center text-slate-400">Loading industry job roles...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoles.map((role) => {
            const matchData = getMatchForRole(role.role_name);
            const isActive = analysisData?.active_target_role?.toLowerCase() === role.role_name.toLowerCase();

            return (
              <div
                key={role.role_name}
                className={`bg-[#0f172a]/90 backdrop-blur-xl rounded-3xl border p-6 flex flex-col justify-between transition-all duration-300 ${
                  isActive
                    ? 'border-cyan-500 ring-2 ring-cyan-500/20 shadow-glow-cyan bg-gradient-to-b from-[#131d33] to-[#0c1322]'
                    : 'border-slate-800 hover:border-slate-700 hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                <div>
                  {/* Top Tags & Match Badge */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        role.category === 'Technical'
                          ? 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                          : 'bg-purple-500/15 text-purple-300 border-purple-500/30'
                      }`}>
                        {role.department || role.category}
                      </span>

                      {isActive && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1">
                          <Target className="w-3 h-3 text-cyan-400 animate-pulse" /> Active Target
                        </span>
                      )}
                    </div>

                    {matchData && (
                      <div className="text-right">
                        <span className="text-sm font-black font-display text-cyan-400">
                          {matchData.match_percentage.toFixed(0)}%
                        </span>
                        <div className="text-[9px] text-slate-400 font-semibold uppercase">Match</div>
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold font-display text-white mb-1.5">
                    {role.role_name}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
                    {role.description}
                  </p>

                  {/* Salary, Market Demand & Growth Info */}
                  <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 mb-4 text-[11px]">
                    <div>
                      <div className="text-[9px] font-bold uppercase text-slate-500">Avg. Salary</div>
                      <div className="font-bold text-slate-200">{role.avg_salary || '₹6 LPA – ₹16 LPA'}</div>
                    </div>
                    <div>
                      <div className="text-[9px] font-bold uppercase text-slate-500">Market Demand</div>
                      <div className="font-bold text-cyan-400">{role.market_demand || 'Very High'}</div>
                    </div>
                  </div>

                  {/* Core Skills (Weighted x1.5) */}
                  <div className="mb-3">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                      <span>Core Skills</span>
                      <span className="text-cyan-400 font-mono">Weight x1.5</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {role.core_skills.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-indigo-500/15 text-indigo-300 border border-indigo-500/30"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Supporting Skills (Weighted x1.2) */}
                  <div className="mb-5">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                      <span>Supporting Skills</span>
                      <span className="text-slate-400 font-mono">Weight x1.2</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {role.secondary_skills.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-slate-800 text-slate-300 border border-slate-700"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-800 flex items-center gap-2">
                  {isActive ? (
                    <div className="flex-1 py-2.5 px-3 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold text-center flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Current Active Target</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleSetTarget(role.role_name)}
                      disabled={isLoading}
                      className="flex-1 py-2.5 px-3 rounded-2xl bg-slate-800 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-brand-600 hover:text-white border border-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1 transition-all"
                    >
                      <Target className="w-3.5 h-3.5" />
                      <span>Set as Target</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleViewRoadmap(role.role_name)}
                    className="py-2.5 px-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1 transition-all"
                    title="View Roadmap"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Roadmap</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default JobRoles;
