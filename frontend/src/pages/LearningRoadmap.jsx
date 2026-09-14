import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Target, 
  ChevronDown, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  BookOpen,
  ArrowRight,
  Search,
  Award,
  Rocket,
  Code2,
  ExternalLink,
  Layers,
  Send,
  Briefcase,
  Flame,
  Check
} from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import { analyzeApi } from '../services/api';
import TimelineRoadmap from '../components/TimelineRoadmap';

const LearningRoadmap = () => {
  const { analysisData, changeTargetRole, isLoading } = useAnalysis();

  const [availableRoles, setAvailableRoles] = useState([]);
  const [currentRoadmap, setCurrentRoadmap] = useState(null);
  const [selectedRole, setSelectedRole] = useState('Data Analyst');
  const [loadingRoadmap, setLoadingRoadmap] = useState(false);

  // Search & Category Filters for Curated Skill Tracks
  const [skillSearch, setSkillSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = [
    'All',
    'Databases & BI',
    'Analytics & Reporting',
    'AI & Data Science',
    'DevOps & Cloud',
    'Web Development',
    'Backend & Systems'
  ];

  const curatedSkillCards = [
    {
      title: 'SQL & Relational Databases',
      category: 'Databases & BI',
      duration: '4–6 weeks',
      badge: 'Core Data Competency',
      description: 'Master relational database querying, window functions, CTEs, indexing optimizations, and transactional design.',
      coreTopics: ['Window Functions', 'Common Table Expressions (CTEs)', 'Complex Joins & Subqueries', 'Query Optimization & Indexing', 'Schema Normalization'],
      freeCourses: ['Stanford DB5 SQL Course', 'Kaggle Advanced SQL', 'PostgreSQL Official Tutorials'],
      certifications: ['Oracle Certified Professional: SQL', 'Microsoft Certified: Azure Data Fundamentals'],
      portfolioProject: 'High-Volume Financial Transactions Analytical Schema & Automated Reporting Pipeline'
    },
    {
      title: 'Power BI & Business Intelligence',
      category: 'Databases & BI',
      duration: '3–4 weeks',
      badge: 'High Industry Demand',
      description: 'Build enterprise-grade interactive dashboards, DAX measures, Star Schema data models, and executive KPI reports.',
      coreTopics: ['DAX Formulas & Measures', 'Star Schema & Snowflake Modeling', 'Power Query M Transformations', 'Row-Level Security (RLS)', 'Storytelling & Visualization'],
      freeCourses: ['Microsoft Learn Power BI Data Analyst', 'edX Analyzing Data with Power BI'],
      certifications: ['Microsoft Certified: Power BI Data Analyst Associate (PL-300)'],
      portfolioProject: 'End-to-End Multi-Channel E-Commerce KPI Dashboard with Drill-Down Filters'
    },
    {
      title: 'Machine Learning with Scikit-Learn',
      category: 'AI & Data Science',
      duration: '6–8 weeks',
      badge: 'Predictive Modeling',
      description: 'Formulate predictive algorithms, feature engineering pipelines, cross-validation, and model explainability using Scikit-Learn.',
      coreTopics: ['Supervised Classification & Regression', 'Feature Selection & Imputation', 'Hyperparameter Tuning (Optuna / GridSearchCV)', 'Ensemble Methods (Random Forest, XGBoost)', 'SHAP Model Explainability'],
      freeCourses: ['Andrew Ng Machine Learning Specialization (Coursera)', 'Fast.ai Practical Deep Learning'],
      certifications: ['TensorFlow Developer Certificate', 'AWS Certified Machine Learning - Specialty'],
      portfolioProject: 'Customer Churn & Loan Default Risk Prediction Engine with Live REST API'
    },
    {
      title: 'Deep Learning & Neural Networks (PyTorch / TensorFlow)',
      category: 'AI & Data Science',
      duration: '6–10 weeks',
      badge: 'Advanced AI Track',
      description: 'Construct custom neural networks, CNNs, RNNs, transformer architectures, and deploy models with GPU acceleration.',
      coreTopics: ['Backpropagation & Loss Functions', 'Convolutional Neural Networks (CNNs)', 'Vision Transformers & BERT', 'PyTorch DataLoaders & Training Loops', 'CUDA & Mixed Precision'],
      freeCourses: ['DeepLearning.AI Deep Learning Specialization', 'PyTorch Official 60-Minute Blitz'],
      certifications: ['Google Professional Machine Learning Engineer', 'DeepLearning.AI TensorFlow Developer'],
      portfolioProject: 'Real-Time Plant Disease Classifier & Multi-Class Semantic Image Segmentation'
    },
    {
      title: 'Modern React & Full Stack Frontend',
      category: 'Web Development',
      duration: '5–7 weeks',
      badge: 'Frontend Engineering',
      description: 'Build accessible, high-performance web applications using React 18, Tailwind CSS, TypeScript, and modern state managers.',
      coreTopics: ['React 18 Hooks & Custom Hooks', 'TypeScript Generics with React Props', 'Tailwind CSS Component Systems', 'Client-side Caching (React Query)', 'Lighthouse Core Web Vitals'],
      freeCourses: ['Full Stack Open (University of Helsinki)', 'freeCodeCamp Frontend Development'],
      certifications: ['Meta Front-End Developer Professional Certificate'],
      portfolioProject: 'Interactive Real-Time Kanban Project Management Portal with Dark Mode'
    },
    {
      title: 'Cloud & DevOps with Docker & AWS',
      category: 'DevOps & Cloud',
      duration: '6–8 weeks',
      badge: 'Infrastructure Mastery',
      description: 'Containerize multi-tier services, orchestrate microservices, and deploy automated continuous integration pipelines on AWS.',
      coreTopics: ['Multi-Stage Dockerfiles', 'AWS Core (EC2, S3, RDS, IAM, VPC)', 'GitHub Actions CI/CD Automation', 'Linux Daemon & Nginx Reverse Proxy', 'Prometheus & Grafana Monitoring'],
      freeCourses: ['AWS Skill Builder Cloud Practitioner', 'Docker Official Getting Started Guide'],
      certifications: ['AWS Certified Solutions Architect – Associate', 'Docker Certified Associate (DCA)'],
      portfolioProject: 'Cloud-Deployed Microservice Infrastructure with Automated GitHub Actions Delivery'
    },
    {
      title: 'Python & FastAPI Backend Microservices',
      category: 'Backend & Systems',
      duration: '5–7 weeks',
      badge: 'High Performance API',
      description: 'Architect scalable asynchronous REST APIs, database ORM models, JWT authentication, and background worker queues.',
      coreTopics: ['FastAPI & Pydantic V2 Validation', 'SQLAlchemy 2.0 ORM & Alembic Migrations', 'Asynchronous Programming (async/await)', 'JWT Auth & Role-Based Access Control', 'Redis In-Memory Caching'],
      freeCourses: ['FastAPI Official Tutorial', 'Real Python Backend Roadmap'],
      certifications: ['Python Institute PCAP Certified Associate Python Programmer'],
      portfolioProject: 'High-Throughput Multi-Tenant E-Commerce Inventory & Order Management API'
    },
    {
      title: 'Exploratory Data Analysis & Analytics',
      category: 'Analytics & Reporting',
      duration: '4–5 weeks',
      badge: 'Core Analytics',
      description: 'Perform advanced data wrangling, hypothesis testing, statistical modeling, and visual storytelling with Pandas and Seaborn.',
      coreTopics: ['Data Wrangling with Pandas', 'Vectorized Math with NumPy', 'Inferential Statistics & Hypothesis Testing', 'Visual Analytics with Matplotlib/Seaborn', 'A/B Testing Methodologies'],
      freeCourses: ['Google Data Analytics Certificate', 'Kaggle Data Visualization Micro-Courses'],
      certifications: ['Google Data Analytics Professional Certificate'],
      portfolioProject: 'Global Retail Sales Performance & Customer Lifetime Value Cohort Analysis'
    }
  ];

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const data = await analyzeApi.getAllRoles();
        setAvailableRoles(data.roles || []);
      } catch (e) {
        console.error('Failed to load roles:', e);
      }
    };
    fetchRoles();
  }, []);

  useEffect(() => {
    if (analysisData?.active_target_role) {
      setSelectedRole(analysisData.active_target_role);
      setCurrentRoadmap(analysisData.roadmap);
    } else {
      fetchRoadmapForRole('Data Analyst');
    }
  }, [analysisData]);

  const fetchRoadmapForRole = async (roleName) => {
    try {
      setLoadingRoadmap(true);
      const missingSkills = analysisData?.missing_skills || [];
      const data = await analyzeApi.getRoadmap(roleName, missingSkills);
      setCurrentRoadmap(data);
      setSelectedRole(roleName);
    } catch (err) {
      console.error('Failed to fetch roadmap:', err);
    } finally {
      setLoadingRoadmap(false);
    }
  };

  const handleRoleChange = async (newRole) => {
    if (analysisData?.profile_id) {
      await changeTargetRole(newRole);
    } else {
      await fetchRoadmapForRole(newRole);
    }
  };

  const filteredCuratedCards = curatedSkillCards.filter((card) => {
    const matchesCategory = categoryFilter === 'All' || card.category === categoryFilter;
    const matchesSearch = 
      card.title.toLowerCase().includes(skillSearch.toLowerCase()) ||
      card.description.toLowerCase().includes(skillSearch.toLowerCase()) ||
      card.coreTopics.some(t => t.toLowerCase().includes(skillSearch.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 py-4 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" /> Structured Career Upskilling
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-display text-white tracking-tight">
            Personalized Skill Roadmaps
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Structured curricula, free tutorials, target certifications, and portfolio projects to master industry skills and eliminate competencies gaps.
          </p>
        </div>

        {/* Dynamic Role Switcher Dropdown */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <label className="text-xs font-bold text-slate-400 hidden sm:inline">
            Roadmap Target:
          </label>
          <select
            value={selectedRole}
            onChange={(e) => handleRoleChange(e.target.value)}
            disabled={isLoading || loadingRoadmap}
            className="px-4 py-2.5 rounded-2xl border border-slate-700 text-xs sm:text-sm font-bold text-white bg-slate-900 focus:border-cyan-400 focus:outline-none shadow-lg transition-all"
          >
            {availableRoles.map((role) => (
              <option key={role.role_name} value={role.role_name}>
                {role.role_name} ({role.department || role.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Non-Technical Simple Visual Progression Bar */}
      <div className="p-6 bg-[#0f172a]/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">
            Student Career Milestone Progression
          </span>
          <span className="text-xs text-slate-400 font-medium">
            From Current Skills to Placement
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-2">
          {/* Step 1 */}
          <div className="p-3 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-center relative overflow-hidden">
            <div className="text-[10px] font-black uppercase text-cyan-300">STEP 1</div>
            <div className="text-xs font-bold text-white mt-0.5">YOU ARE HERE</div>
            <div className="text-[10px] text-cyan-200/80 mt-1">Evaluated Baseline</div>
          </div>

          {/* Step 2 */}
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
            <div className="text-[10px] font-bold uppercase text-slate-400">STEP 2</div>
            <div className="text-xs font-bold text-white mt-0.5">Learn Basics</div>
            <div className="text-[10px] text-slate-400 mt-1">Core Concepts</div>
          </div>

          {/* Step 3 */}
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
            <div className="text-[10px] font-bold uppercase text-slate-400">STEP 3</div>
            <div className="text-xs font-bold text-white mt-0.5">Practice</div>
            <div className="text-[10px] text-slate-400 mt-1">Coding Drills</div>
          </div>

          {/* Step 4 */}
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
            <div className="text-[10px] font-bold uppercase text-slate-400">STEP 4</div>
            <div className="text-xs font-bold text-white mt-0.5">Build Project</div>
            <div className="text-[10px] text-slate-400 mt-1">Portfolio Proof</div>
          </div>

          {/* Step 5 */}
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
            <div className="text-[10px] font-bold uppercase text-slate-400">STEP 5</div>
            <div className="text-xs font-bold text-white mt-0.5">Interview Prep</div>
            <div className="text-[10px] text-slate-400 mt-1">Q&A Drills</div>
          </div>

          {/* Step 6 */}
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
            <div className="text-[10px] font-bold uppercase text-emerald-400">STEP 6</div>
            <div className="text-xs font-bold text-emerald-300 mt-0.5">Apply for Jobs</div>
            <div className="text-[10px] text-emerald-400/80 mt-1">Industry Ready</div>
          </div>
        </div>
      </div>

      {/* Target Status Banner if active profile is loaded */}
      {analysisData && (
        <div className="p-5 rounded-3xl bg-cyan-950/30 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-lg">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></span>
            <div>
              <span className="font-bold text-white">Customized Roadmap for {analysisData.profile.name}:</span>{' '}
              <span className="text-slate-300">
                Targeting <strong className="text-rose-400">{analysisData.missing_skills?.length || 0} missing skills</strong> for <strong className="text-cyan-300">{selectedRole}</strong>.
              </span>
            </div>
          </div>

          <div className="font-bold text-cyan-300 bg-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-800 self-start sm:self-auto shadow-xs">
            Current Readiness: {analysisData.readiness_score}%
          </div>
        </div>
      )}

      {/* Personalized Milestone Timeline Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Active Milestone Curriculum ({selectedRole})</span>
          </h2>
        </div>

        {loadingRoadmap ? (
          <div className="p-16 text-center text-slate-400">Loading personalized milestone roadmap...</div>
        ) : (
          <TimelineRoadmap 
            roadmap={currentRoadmap} 
            missingSkills={analysisData?.missing_skills || []} 
          />
        )}
      </section>

      {/* Curated Skill Modules Explorer Section */}
      <section className="space-y-6 pt-6 border-t border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-400"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-400">
                Skill Mastery Library
              </span>
            </div>
            <h2 className="text-2xl font-black font-display text-white mt-1">
              Curated Industry Learning Tracks
            </h2>
            <p className="text-xs text-slate-400">
              Explore step-by-step learning modules with verified free tutorials, target certifications, and capstone project blueprints.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search skills (e.g. SQL, Power BI)..."
              value={skillSearch}
              onChange={(e) => setSkillSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-2xl border border-slate-700 bg-slate-900 text-white focus:border-cyan-400 focus:outline-none placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                categoryFilter === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-brand-500 text-white shadow-md'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Curated Learning Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCuratedCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-[#0f172a]/90 backdrop-blur-xl rounded-3xl border border-slate-800 p-6 flex flex-col justify-between hover:border-cyan-500/40 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                      {card.category}
                    </span>
                    <h3 className="text-lg font-bold font-display text-white mt-2 group-hover:text-cyan-300 transition-colors">
                      {card.title}
                    </h3>
                  </div>

                  <span className="text-[11px] font-semibold text-slate-400 bg-slate-900 px-2.5 py-1 rounded-xl border border-slate-800 flex items-center gap-1 flex-shrink-0">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    {card.duration}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {card.description}
                </p>

                {/* Core Topics */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Core Topics Covered
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {card.coreTopics.map((topic, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Free Courses & Tutorials */}
                <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-slate-300">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Free Learning Tutorials</span>
                  </div>
                  <ul className="text-slate-400 space-y-1 text-[11px]">
                    {card.freeCourses.map((c, cIdx) => (
                      <li key={cIdx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0"></span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Certifications & Portfolio */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <div className="flex items-center gap-1.5 font-bold text-amber-300 text-[11px] mb-1">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span>Target Certification</span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      {card.certifications[0]}
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-300 text-[11px] mb-1">
                      <Rocket className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Portfolio Project Idea</span>
                    </div>
                    <p className="text-[10px] text-slate-400 line-clamp-2">
                      {card.portfolioProject}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LearningRoadmap;
