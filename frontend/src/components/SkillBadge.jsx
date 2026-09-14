import React from 'react';
import { CheckCircle2, AlertTriangle, Sparkles, HelpCircle } from 'lucide-react';

const SkillBadge = ({ name, type = 'matched', weightMultiplier = null, priority = null, showIcon = true }) => {
  let styleClasses = 'bg-slate-800/80 text-slate-300 border-slate-700/60';
  let Icon = Sparkles;
  let iconColor = 'text-slate-400';

  if (type === 'matched') {
    styleClasses = 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:border-emerald-400';
    Icon = CheckCircle2;
    iconColor = 'text-emerald-400';
  } else if (type === 'missing-core' || priority === 'High') {
    styleClasses = 'bg-rose-500/10 text-rose-300 border-rose-500/30 hover:border-rose-400';
    Icon = AlertTriangle;
    iconColor = 'text-rose-400';
  } else if (type === 'missing-secondary') {
    styleClasses = 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:border-amber-400';
    Icon = HelpCircle;
    iconColor = 'text-amber-400';
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold border backdrop-blur-md transition-all shadow-xs ${styleClasses}`}>
      {showIcon && <Icon className={`w-3.5 h-3.5 ${iconColor}`} />}
      <span>{name}</span>
      {weightMultiplier && (
        <span className="text-[10px] font-mono opacity-80 pl-0.5">
          ({weightMultiplier})
        </span>
      )}
    </span>
  );
};

export default SkillBadge;
