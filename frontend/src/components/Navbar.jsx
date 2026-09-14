import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  FileSearch, 
  LayoutDashboard, 
  Briefcase, 
  GraduationCap, 
  User, 
  ChevronDown, 
  Menu,
  X,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { analysisData, loadDemoProfile, isLoading, backendOnline } = useAnalysis();
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/', icon: Sparkles },
    { name: 'Resume Analyzer', path: '/analyzer', icon: FileSearch },
    { name: 'Readiness Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Job Roles Explorer', path: '/roles', icon: Briefcase },
    { name: 'Learning Roadmap', path: '/roadmap', icon: GraduationCap },
    { name: 'Student Profile', path: '/profile', icon: User },
  ];

  const handleDemoSelect = async (demoId) => {
    setDemoDropdownOpen(false);
    setMobileMenuOpen(false);
    try {
      await loadDemoProfile(demoId);
      navigate('/dashboard');
    } catch (e) {
      console.error(e);
    }
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#090d16]/85 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo & Hackathon Badge */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-brand-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/25 group-hover:scale-105 group-hover:shadow-brand-500/40 transition-all">
                <Sparkles className="w-5 h-5 text-white animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black font-display tracking-tight text-white group-hover:text-brand-300 transition-colors">
                    SkillBridge <span className="bg-gradient-to-r from-cyan-400 to-brand-400 bg-clip-text text-transparent">AI</span>
                  </span>
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30">
                    SIH 2026
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-medium hidden sm:block">
                  Student-Industry Alignment Platform
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-gradient-to-r from-brand-600/30 to-purple-600/30 text-cyan-300 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${active ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Action: Active Role / Demo Selector & CTA */}
          <div className="hidden md:flex items-center gap-3">
            {analysisData ? (
              <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="truncate max-w-[120px] font-medium" title={analysisData.active_target_role}>
                  {analysisData.active_target_role}
                </span>
                <span className="font-bold text-cyan-400">({analysisData.readiness_score}%)</span>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                  disabled={isLoading}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-xl transition-all"
                >
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>SIH Demo Profiles</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {demoDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#0f172a] shadow-2xl border border-slate-700 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setDemoDropdownOpen(false)}
                  >
                    <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                      1-Click Judge Demonstration
                    </div>
                    
                    <button
                      onClick={() => handleDemoSelect('1')}
                      className="w-full text-left p-2 rounded-xl hover:bg-slate-800/70 flex items-start gap-2.5 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 font-bold flex items-center justify-center text-xs flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        RS
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Rohan Sharma</div>
                        <div className="text-[11px] text-cyan-400 font-medium">Target: Data Analyst</div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[170px]">Python, SQL, Pandas, NumPy, Excel</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleDemoSelect('2')}
                      className="w-full text-left p-2 rounded-xl hover:bg-slate-800/70 flex items-start gap-2.5 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30 font-bold flex items-center justify-center text-xs flex-shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        PP
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Priya Patel</div>
                        <div className="text-[11px] text-purple-400 font-medium">Target: ML Engineer</div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[170px]">PyTorch, TensorFlow, Scikit-Learn</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleDemoSelect('3')}
                      className="w-full text-left p-2 rounded-xl hover:bg-slate-800/70 flex items-start gap-2.5 transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold flex items-center justify-center text-xs flex-shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        AV
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Aman Verma</div>
                        <div className="text-[11px] text-emerald-400 font-medium">Target: Full Stack Developer</div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[170px]">React, JavaScript, HTML, CSS, Git</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            )}

            <Link
              to="/analyzer"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-brand-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-brand-500/25 flex items-center gap-1.5 transition-all hover:scale-105"
            >
              <FileSearch className="w-3.5 h-3.5" />
              <span>Analyze Resume</span>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/60"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#0c1322] px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  active
                    ? 'bg-gradient-to-r from-brand-600/30 to-purple-600/30 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.name}</span>
              </Link>
            );
          })}

          <div className="pt-3 border-t border-slate-800/80">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
              1-Click Demo Profiles (For SIH Judges)
            </div>
            <div className="grid grid-cols-3 gap-2 pt-1">
              <button
                onClick={() => handleDemoSelect('1')}
                className="p-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/20 text-xs font-bold text-center"
              >
                Rohan (Data)
              </button>
              <button
                onClick={() => handleDemoSelect('2')}
                className="p-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/20 text-xs font-bold text-center"
              >
                Priya (ML)
              </button>
              <button
                onClick={() => handleDemoSelect('3')}
                className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/20 text-xs font-bold text-center"
              >
                Aman (Web)
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
