import React from 'react';
import { Award, CheckCircle, AlertTriangle, ShieldCheck, Sparkles, BookOpen, TrendingUp } from 'lucide-react';

const ReadinessGauge = ({ score = 0, targetRole = 'Target Role', size = 230 }) => {
  const radius = (size / 2) - 18;
  const circumference = 2 * Math.PI * radius;
  const normalizedScore = Math.max(0, Math.min(100, score || 0));
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  let tier = {
    title: 'Getting Started',
    label: 'Getting Started',
    statusText: 'Needs Foundational Learning',
    explanation: 'You are at the beginning of your journey for this career. Start by mastering the core fundamentals in your roadmap.',
    color: '#f43f5e',
    bgColor: 'bg-rose-500/15',
    textColor: 'text-rose-300',
    borderColor: 'border-rose-500/40',
    icon: AlertTriangle,
    gradientId: 'roseGaugeGradient',
    gradientColors: ['#fb7185', '#f43f5e']
  };

  if (normalizedScore >= 86) {
    tier = {
      title: 'Industry Ready',
      label: 'Industry Ready',
      statusText: 'Excellent Industry Alignment',
      explanation: 'Outstanding readiness! Your skillset strongly matches what hiring managers require. Start preparing for technical interviews and building your capstone portfolio.',
      color: '#10b981',
      bgColor: 'bg-emerald-500/15',
      textColor: 'text-emerald-300',
      borderColor: 'border-emerald-500/40',
      icon: ShieldCheck,
      gradientId: 'emeraldGaugeGradient',
      gradientColors: ['#34d399', '#059669']
    };
  } else if (normalizedScore >= 71) {
    tier = {
      title: 'Strong Foundation',
      label: 'Strong Foundation',
      statusText: 'Solid Baseline Skills',
      explanation: 'Your profile already matches most requirements for this career. Focus on the highlighted priority skill gaps to become fully job-ready.',
      color: '#06b6d4',
      bgColor: 'bg-cyan-500/15',
      textColor: 'text-cyan-300',
      borderColor: 'border-cyan-500/40',
      icon: Award,
      gradientId: 'cyanGaugeGradient',
      gradientColors: ['#38bdf8', '#06b6d4']
    };
  } else if (normalizedScore >= 51) {
    tier = {
      title: 'Developing',
      label: 'Developing',
      statusText: 'Growing Competencies',
      explanation: 'You have good fundamental concepts in place. Follow your milestone roadmap to bridge secondary and tools gaps.',
      color: '#3b82f6',
      bgColor: 'bg-blue-500/15',
      textColor: 'text-blue-300',
      borderColor: 'border-blue-500/40',
      icon: TrendingUp,
      gradientId: 'blueGaugeGradient',
      gradientColors: ['#60a5fa', '#2563eb']
    };
  } else if (normalizedScore >= 31) {
    tier = {
      title: 'Building Skills',
      label: 'Building Skills',
      statusText: 'Emerging Competence',
      explanation: 'You have started acquiring relevant skills. Dedicating a few weeks to core requirements will rapidly boost your industry match %.',
      color: '#f59e0b',
      bgColor: 'bg-amber-500/15',
      textColor: 'text-amber-300',
      borderColor: 'border-amber-500/40',
      icon: BookOpen,
      gradientId: 'amberGaugeGradient',
      gradientColors: ['#fbbf24', '#d97706']
    };
  }

  const TierIcon = tier.icon;

  return (
    <div className="flex flex-col items-center justify-between p-6 bg-[#0f172a]/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden h-full">
      {/* Radiant glow backdrop */}
      <div 
        className="absolute w-44 h-44 rounded-full blur-3xl opacity-25 pointer-events-none -z-0"
        style={{ backgroundColor: tier.color }}
      />

      <div className="text-center mb-2 z-10">
        <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
          Industry Readiness Score
        </span>
        <h4 className="text-sm font-bold text-white truncate max-w-[220px] mt-0.5" title={targetRole}>
          {targetRole}
        </h4>
      </div>

      {/* Circular SVG Gauge */}
      <div className="relative flex items-center justify-center z-10 my-1" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <defs>
            <linearGradient id={tier.gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={tier.gradientColors[0]} />
              <stop offset="100%" stopColor={tier.gradientColors[1]} />
            </linearGradient>
            <filter id="gaugeGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#1e293b"
            strokeWidth="14"
            fill="transparent"
          />

          {/* Progress Indicator */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`url(#${tier.gradientId})`}
            strokeWidth="14"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            filter="url(#gaugeGlow)"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Percentage Display */}
        <div className="absolute flex flex-col items-center justify-center text-center px-4">
          <span className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white">
            {normalizedScore.toFixed(1)}<span className="text-xl text-cyan-400 font-bold">%</span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 mt-0.5">
            INDUSTRY READY
          </span>
        </div>
      </div>

      {/* Tier Label Badge */}
      <div className={`mt-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-bold ${tier.bgColor} ${tier.textColor} ${tier.borderColor} z-10 shadow-sm`}>
        <TierIcon className="w-3.5 h-3.5" />
        <span>{tier.label}</span>
      </div>

      {/* Student-Friendly Explanation */}
      <div className="mt-3 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-center z-10 max-w-[260px]">
        <p className="text-[11px] text-slate-300 leading-relaxed">
          {tier.explanation}
        </p>
      </div>
    </div>
  );
};

export default ReadinessGauge;
