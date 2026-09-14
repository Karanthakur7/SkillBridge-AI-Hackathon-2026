import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Shield, Code, Terminal } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-slate-800/80 bg-[#060910] text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Platform Summary */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-brand-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-black font-display text-white">
                SkillBridge <span className="bg-gradient-to-r from-cyan-400 to-brand-400 bg-clip-text text-transparent">AI</span>
              </span>
              <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                SIH 2026
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              AI-driven student-to-industry career readiness engine. Automatically identifies technical competencies, quantifies skill gaps against weighted industry benchmarks, and builds tailored learning roadmaps.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>FastAPI Deterministic Engine & SQLite Ontology Active</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/analyzer" className="hover:text-cyan-400 transition-colors">
                  Resume Analyzer (PDF / DOCX)
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-cyan-400 transition-colors">
                  Industry Readiness Dashboard
                </Link>
              </li>
              <li>
                <Link to="/roles" className="hover:text-cyan-400 transition-colors">
                  Job Roles Explorer (20+ Roles)
                </Link>
              </li>
              <li>
                <Link to="/roadmap" className="hover:text-cyan-400 transition-colors">
                  Personalized Learning Roadmaps
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-cyan-400 transition-colors">
                  Candidate Profile & PDF Export
                </Link>
              </li>
            </ul>
          </div>

          {/* Hackathon Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Smart India Hackathon 2026
            </h4>
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-1.5">
              <div className="text-[11px] font-bold text-cyan-400">Problem Statement Solution</div>
              <div className="text-slate-400 text-[11px]">
                Student Skill Gap Identification & Career Pathway Alignment Engine
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 SkillBridge AI • Developed for Smart India Hackathon 2026 Finalist Demonstration.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">FastAPI</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-400">React + Vite</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-400">Tailwind CSS</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-400">ReportLab PDF</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
