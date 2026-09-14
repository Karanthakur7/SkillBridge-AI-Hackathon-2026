import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, HelpCircle, Layers, Filter, Check, X } from 'lucide-react';
import SkillBadge from './SkillBadge';

const SkillGapTable = ({ gapData }) => {
  const [activeTab, setActiveTab] = useState('ALL'); // ALL, MATCHED, MISSING

  if (!gapData || !gapData.details) {
    return null;
  }

  const { details = [], target_role, matched_skills = [], missing_skills = [] } = gapData;

  const filteredDetails = details.filter((item) => {
    if (activeTab === 'MATCHED') return item.status === 'Matched';
    if (activeTab === 'MISSING') return item.status === 'Missing';
    return true;
  });

  const totalCount = details.length;
  const matchedCount = matched_skills.length;
  const missingCount = missing_skills.length;

  return (
    <div className="bg-[#0f172a]/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
      {/* Header with Title and Tabs */}
      <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
              Granular Evaluation Matrix
            </span>
          </div>
          <h3 className="text-xl font-black font-display text-white mt-1">
            Skill Gap Analysis
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time comparison of candidate abilities against industry requirements for <span className="text-cyan-300 font-semibold">{target_role}</span>.
          </p>
        </div>

        {/* Status Metrics & Tab Switcher */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="text-xs font-semibold text-slate-300 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
            Total Evaluated: <strong className="text-white">{totalCount} skills</strong>{' '}
            <span className="text-emerald-400 font-bold">({matchedCount} Matched</span> /{' '}
            <span className="text-rose-400 font-bold">{missingCount} Missing)</span>
          </div>

          <div className="inline-flex rounded-xl bg-slate-900 border border-slate-800 p-1 text-xs font-bold">
            <button
              onClick={() => setActiveTab('ALL')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'ALL'
                  ? 'bg-gradient-to-r from-cyan-500 to-brand-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({totalCount})
            </button>
            <button
              onClick={() => setActiveTab('MATCHED')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'MATCHED'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-emerald-400'
              }`}
            >
              Matched ({matchedCount})
            </button>
            <button
              onClick={() => setActiveTab('MISSING')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'MISSING'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'text-slate-400 hover:text-rose-400'
              }`}
            >
              Missing ({missingCount})
            </button>
          </div>
        </div>
      </div>

      {/* Skills Table / List */}
      <div className="divide-y divide-slate-800/60 overflow-x-auto">
        {filteredDetails.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400 italic">
            No skills found for selected filter tab.
          </div>
        ) : (
          filteredDetails.map((item, idx) => {
            const isMatched = item.status === 'Matched';
            const isCore = item.skill_type === 'Core';
            const weightText = isCore ? 'Core (x1.5)' : 'Supporting (x1.2)';

            return (
              <div
                key={idx}
                className={`p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-800/30 transition-colors ${
                  isMatched ? 'bg-emerald-500/[0.02]' : 'bg-rose-500/[0.02]'
                }`}
              >
                {/* Left: Skill Name + Tags */}
                <div className="space-y-1 sm:max-w-md">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-white font-display">
                      {item.skill_name}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                        isMatched
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      }`}
                    >
                      {isMatched ? '✓ Matched' : '✗ Missing'}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${
                        isCore
                          ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {isCore ? 'Core Requirement' : 'Supporting Skill'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.recommendation}
                  </p>
                </div>

                {/* Right: Weight Multiplier + Priority */}
                <div className="flex items-center gap-3 self-end sm:self-center flex-shrink-0">
                  <div className="text-right">
                    <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-800/90 text-cyan-300 border border-slate-700">
                      {item.weight_multiplier || weightText}
                    </span>
                  </div>

                  <div className="w-24 text-right">
                    {isMatched ? (
                      <span className="text-xs font-bold text-emerald-400 flex items-center justify-end gap-1">
                        <Check className="w-3.5 h-3.5" /> Satisfied
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-rose-400 flex items-center justify-end gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> High Priority
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer Insight */}
      <div className="p-4 bg-slate-900/60 border-t border-slate-800 text-[11px] text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span>
          💡 <strong>Tip for Hackathon Evaluation:</strong> Core skills carry 1.5x weight in your readiness benchmark score calculation.
        </span>
        <span className="text-cyan-400 font-semibold">
          {matchedCount} of {totalCount} requirements satisfied
        </span>
      </div>
    </div>
  );
};

export default SkillGapTable;
