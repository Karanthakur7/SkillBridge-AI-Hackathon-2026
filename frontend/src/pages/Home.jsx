import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  FileSearch, 
  Target, 
  GraduationCap, 
  Briefcase, 
  Layers, 
  ShieldCheck, 
  Zap,
  TrendingUp,
  Cpu,
  BarChart3,
  Compass
} from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';

const Home = () => {
  const navigate = useNavigate();
  const { loadDemoProfile, isLoading } = useAnalysis();

  const handleLaunchDemo = async (demoId) => {
    try {
      await loadDemoProfile(demoId);
      navigate('/dashboard');
    } catch (e) {
      console.error('Failed to run demo analysis:', e);
    }
  };

  const demoCandidates = [
    {
      id: '1',
      name: 'Rohan Sharma',
      education: 'B.Tech 3rd Year',
      role: 'Data Analyst',
      department: 'AI & Analytics',
      gradient: 'from-blue-600 via-cyan-600 to-teal-500',
      badgeBg: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
      skills: ['Python', 'SQL', 'Pandas', 'NumPy', 'Excel', 'Data Visualization'],
      description: 'Hands-on exploratory data analysis & SQL query mastery; needs Power BI DAX & Tableau LODs.'
    },
    {
      id: '2',
      name: 'Priya Patel',
      education: 'B.E. Final Year',
      role: 'ML Engineer',
      department: 'AI & Analytics',
      gradient: 'from-purple-600 via-indigo-600 to-blue-500',
      badgeBg: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
      skills: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-Learn', 'Deep Learning', 'NumPy'],
      description: 'Deep neural networks & computer vision expertise; gap in production Docker serving & MLOps.'
    },
    {
      id: '3',
      name: 'Aman Verma',
      education: 'B.Tech CS',
      role: 'Full Stack Web Developer',
      department: 'Web Development',
      gradient: 'from-emerald-600 via-teal-600 to-cyan-500',
      badgeBg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      skills: ['JavaScript', 'React', 'HTML5', 'CSS3', 'Git', 'GitHub', 'Node.js'],
      description: 'Modern component-driven UI development in React; gap in cloud CI/CD & database migrations.'
    }
  ];

  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0c162d] via-[#091022] to-[#090d16] text-white p-8 sm:p-12 lg:p-16 border border-slate-800 shadow-2xl">
        {/* Glow ambient backdrops */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          {/* SIH Hackathon Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 backdrop-blur-md border border-cyan-500/30 text-xs font-bold text-cyan-300 shadow-glow-cyan">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Smart India Hackathon 2026 Problem Statement Solution</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight">
            Bridge Your College Skills to <br />
            <span className="bg-gradient-to-r from-cyan-400 via-brand-400 to-purple-400 bg-clip-text text-transparent">
              Real Industry Demand
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
            SkillBridge AI parses your resume, automatically identifies technical competencies, compares them against weighted industry job roles, detects skill gaps, calculates your Industry Readiness Score, and creates a personalized roadmap to land your dream job.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/analyzer"
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-brand-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-brand-500/30 flex items-center gap-2 transition-all hover:scale-105"
            >
              <FileSearch className="w-4 h-4" />
              <span>Analyze My Resume Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/roles"
              className="px-7 py-3.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700/80 backdrop-blur-md flex items-center gap-2 transition-all hover:scale-105"
            >
              <Briefcase className="w-4 h-4 text-cyan-400" />
              <span>Explore In-Demand Roles</span>
            </Link>
          </div>

          {/* Key Metrics Ticker */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-slate-800 text-left max-w-3xl mx-auto">
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-2xl font-black font-display text-cyan-400">100%</div>
              <div className="text-[11px] text-slate-400 font-medium">Weighted Readiness Calculation</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-2xl font-black font-display text-brand-400">20+</div>
              <div className="text-[11px] text-slate-400 font-medium">Tech & Non-Tech Industry Roles</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-2xl font-black font-display text-purple-400">PDF / DOCX / TXT</div>
              <div className="text-[11px] text-slate-400 font-medium">Multi-Format Resume Parser</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-2xl font-black font-display text-emerald-400">Dynamic</div>
              <div className="text-[11px] text-slate-400 font-medium">Curated Milestone Roadmaps</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick 1-Click SIH Judge Demo Profiles Section */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-amber-400" /> Instant Hackathon Evaluation
          </div>
          <h2 className="text-2xl sm:text-4xl font-black font-display text-white">
            Quick 1-Click SIH Judge Demo Profiles
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Click any candidate below to execute live FastAPI parsing, skill ontology matching, weighted score computation, and personalized roadmaps without uploading a file.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {demoCandidates.map((demo) => (
            <div
              key={demo.id}
              className="bg-[#0f172a]/90 backdrop-blur-xl rounded-3xl border border-slate-800 p-6 flex flex-col justify-between hover:border-cyan-500/50 hover:shadow-glow-cyan transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${demo.badgeBg}`}>
                    {demo.role}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">Demo #{demo.id}</span>
                </div>

                <h3 className="text-xl font-bold text-white font-display mb-0.5 group-hover:text-cyan-300 transition-colors">
                  {demo.name}
                </h3>
                <div className="text-xs font-medium text-cyan-400 mb-3">
                  {demo.education} • <span className="text-slate-400">{demo.department}</span>
                </div>

                <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                  {demo.description}
                </p>

                <div className="mb-6">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Verified Technical Skills
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {demo.skills.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded-lg text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleLaunchDemo(demo.id)}
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-2xl text-white font-bold text-xs bg-gradient-to-r ${demo.gradient} hover:opacity-95 shadow-lg flex items-center justify-center gap-2 transition-all group-hover:scale-[1.02] disabled:opacity-50`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Run Demo Analysis ({demo.name.split(' ')[0]})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Core Platform Capabilities */}
      <section className="bg-[#0f172a]/80 backdrop-blur-xl rounded-3xl border border-slate-800 p-8 sm:p-10 shadow-xl space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
            End-to-End Alignment Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
            How SkillBridge AI Bridges the College-to-Career Gap
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
            From raw unstructured resume text to structured ontology matching and dynamic learning milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h3 className="text-sm font-bold text-white">Multi-Format Parsing</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Extracts student contact info, degrees, GitHub & LinkedIn links, projects, and certifications via pypdf and docx.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h3 className="text-sm font-bold text-white">Skill Ontology Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Identifies technical & soft skills against a curated 45+ skill ontology with word-boundary alias matching.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h3 className="text-sm font-bold text-white">Weighted Readiness Score</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Calculates dynamic match %: <br />
              <code className="text-[10px] bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800 text-cyan-300 font-mono">
                (Matched Wt / Total Wt) × 100
              </code>
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-sm">
              4
            </div>
            <h3 className="text-sm font-bold text-white">Gap-Targeted Roadmap</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generates tailored learning phases, capstone project blueprints, interview prep, and portfolio enhancement tips.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
