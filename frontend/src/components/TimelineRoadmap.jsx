import React from 'react';
import { 
  BookOpen, 
  Code2, 
  Rocket, 
  HelpCircle, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  Flame,
  Target
} from 'lucide-react';
import SkillBadge from './SkillBadge';

const TimelineRoadmap = ({ roadmap, missingSkills = [] }) => {
  if (!roadmap || !roadmap.phases || roadmap.phases.length === 0) {
    return (
      <div className="p-8 text-center text-slate-400 bg-[#0f172a] rounded-3xl border border-slate-800">
        No learning roadmap data available for this target role.
      </div>
    );
  }

  const missingSet = new Set(missingSkills || []);

  return (
    <div className="space-y-8">
      {/* Overview Banner */}
      <div className="p-6 bg-gradient-to-r from-slate-900 via-[#0c1a30] to-slate-900 rounded-3xl border border-slate-800 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Personalized Learning Pathway
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                <Clock className="w-3.5 h-3.5 text-cyan-400" /> ~{roadmap.estimated_weeks || 8} Weeks Completion
              </span>
            </div>
            <h2 className="text-2xl font-black font-display text-white">
              {roadmap.role_name} Roadmap
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {roadmap.overview}
            </p>
          </div>

          <div className="flex-shrink-0 bg-slate-800/80 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-700 text-center">
            <div className="text-2xl font-black font-display text-cyan-400">{roadmap.phases.length}</div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Milestone Phases</div>
          </div>
        </div>
      </div>

      {/* Phase Timeline List */}
      <div className="relative border-l-2 border-slate-800 ml-4 md:ml-6 space-y-8 pl-6 md:pl-8">
        {roadmap.phases.map((phase) => {
          const hasMissingSkill = phase.target_skills?.some(s => missingSet.has(s));
          const isPriority = phase.priority === 'High';

          return (
            <div key={phase.phase} className="relative group">
              {/* Timeline marker icon */}
              <div className={`absolute -left-[35px] md:-left-[43px] top-0 w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center font-bold text-xs shadow-lg border-2 transition-transform group-hover:scale-110 ${
                hasMissingSkill 
                  ? 'bg-gradient-to-tr from-cyan-500 to-brand-600 text-white border-cyan-300 shadow-glow-cyan' 
                  : 'bg-slate-900 text-slate-400 border-slate-700'
              }`}>
                {phase.phase}
              </div>

              {/* Card Body */}
              <div className={`rounded-3xl p-6 bg-[#0f172a]/90 backdrop-blur-xl border transition-all ${
                hasMissingSkill 
                  ? 'border-cyan-500/40 shadow-xl ring-1 ring-cyan-500/20' 
                  : 'border-slate-800 shadow-md hover:border-slate-700'
              }`}>
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">
                        Milestone {phase.phase}
                      </span>
                      {hasMissingSkill && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30">
                          <Flame className="w-3 h-3 text-rose-400" /> Targets Missing Skill Gap
                        </span>
                      )}
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        isPriority ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {phase.priority} Priority
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white font-display">
                      {phase.title}
                    </h3>
                  </div>

                  {/* Target Skills Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {phase.target_skills?.map((s) => {
                      const isMissing = missingSet.has(s);
                      return (
                        <SkillBadge
                          key={s}
                          name={s}
                          type={isMissing ? 'missing-core' : 'matched'}
                          priority={isMissing ? 'High' : ''}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Grid of Sections: Topics, Practice, Project, Job Prep */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Topics to Learn */}
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80">
                    <div className="flex items-center gap-1.5 font-bold text-slate-200 mb-2.5">
                      <BookOpen className="w-4 h-4 text-cyan-400" />
                      <span>Key Concepts & Curriculum</span>
                    </div>
                    <ul className="space-y-1.5 text-slate-400">
                      {phase.topics?.map((topic, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0"></span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Hands-on Practice */}
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80">
                    <div className="flex items-center gap-1.5 font-bold text-slate-200 mb-2.5">
                      <Code2 className="w-4 h-4 text-emerald-400" />
                      <span>Hands-on Practice & Exercises</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      {phase.practice}
                    </p>
                  </div>

                  {/* Capstone Project */}
                  <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20">
                    <div className="flex items-center gap-1.5 font-bold text-cyan-300 mb-2.5">
                      <Rocket className="w-4 h-4 text-cyan-400" />
                      <span>Portfolio Capstone Project</span>
                    </div>
                    <p className="text-slate-300 font-medium leading-relaxed">
                      {phase.project}
                    </p>
                  </div>

                  {/* Job & Interview Preparation */}
                  <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/20">
                    <div className="flex items-center gap-1.5 font-bold text-purple-300 mb-2.5">
                      <HelpCircle className="w-4 h-4 text-purple-400" />
                      <span>Interview & Assessment Prep</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      {phase.job_prep}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimelineRoadmap;
