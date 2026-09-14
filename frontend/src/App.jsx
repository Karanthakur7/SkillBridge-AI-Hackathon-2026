import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnalysisProvider } from './context/AnalysisContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import Dashboard from './pages/Dashboard';
import JobRoles from './pages/JobRoles';
import LearningRoadmap from './pages/LearningRoadmap';
import StudentProfile from './pages/StudentProfile';

function App() {
  return (
    <AnalysisProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 selection:bg-brand-500 selection:text-white relative overflow-hidden">
          {/* Subtle background ambient glows */}
          <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-brand-600/10 via-indigo-600/5 to-transparent blur-3xl pointer-events-none -z-10" />
          <div className="fixed top-1/3 -right-60 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="fixed bottom-10 -left-60 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analyzer" element={<ResumeAnalyzer />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/roles" element={<JobRoles />} />
              <Route path="/roadmap" element={<LearningRoadmap />} />
              <Route path="/profile" element={<StudentProfile />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AnalysisProvider>
  );
}

export default App;
