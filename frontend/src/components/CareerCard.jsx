import React from 'react';
import { Target, CheckCircle2, ArrowRight, Zap, TrendingUp, Sparkles } from 'lucide-react';

const CareerCard = ({ roleMatch, onSelect }) => {
  if (!roleMatch) return null;

  const {
    role_name,
    category,
    department,
    description,
    match_percentage = 0,
    total_required_skills = 0,
    matched_skills = [],
    is_active_target = false,
    avg_salary,
    market_demand
  } = roleMatch;

  const matchedCount = matched_skills.length;

  // Determine fit level
  let fitBadge = {
    label: 'Growth Opportunity',
    color: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    barColor: 'from-purple-500 to-indigo-500'
  };

  if (match_percentage >= 70) {
    fitBadge = {
      label: 'High Fit',
      color: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      barColor: 'from-emerald-400 to-cyan-400'
    };
  } else if (match_percentage >= 45) {
    fitBadge = {
      label: 'Moderate Fit',
      color: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
      barColor: 'from-cyan-400 to-blue-500'
    };
  }

  return (
    <div
      className={`rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
        is_active_target
          ? 'bg-gradient-to-b from-[#131d33] to-[#0c1322] border-2 border-cyan-500/80 shadow-glow-cyan shadow-xl'
          : 'bg-[#0f172a]/80 hover:bg-[#131d33]/90 border border-slate-800 hover:border-slate-700 shadow-lg hover:shadow-xl hover:-translate-y-1'
      }`}
    >
      {/* Top Banner & Tags */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${fitBadge.color}`}>
              {fitBadge.label}
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              {department || category}
            </span>
          </div>

          {is_active_target && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 flex items-center gap-1 shadow-xs">
              <Target className="w-3 h-3 text-cyan-400 animate-pulse" /> Current Active Target
            </span>
          )}
        </div>

        {/* Role Name & Match Percentage */}
        <div className="flex items-baseline justify-between gap-2 mb-2">
          <h3 className="text-lg font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
            {role_name}
          </h3>
          <span className="text-xl font-black font-display text-cyan-400">
            {match_percentage.toFixed(0)}%
          </span>
        </div>

        {/* Match Progress Bar */}
        <div className="w-full bg-slate-800 rounded-full h-1.5 mb-3 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${fitBadge.barColor} transition-all duration-700 ease-out`}
            style={{ width: `${Math.min(100, Math.max(5, match_percentage))}%` }}
          />
        </div>

        <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        {/* Skills Covered Counter */}
        <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 mb-4 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">Skills Covered:</span>
          <span className="font-bold text-white">
            <strong className="text-cyan-400">{matchedCount}</strong> / {total_required_skills} Required Skills
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-2">
        {is_active_target ? (
          <div className="w-full py-2.5 px-4 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold text-center flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Currently Active Target Role</span>
          </div>
        ) : (
          <button
            onClick={() => onSelect && onSelect(role_name)}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-brand-600 hover:text-white border border-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Evaluate For This Role</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CareerCard;
