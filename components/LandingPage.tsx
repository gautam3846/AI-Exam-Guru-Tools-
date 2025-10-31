import React from 'react';
import { QuestionIcon, QuizIcon, NewsIcon, GuruIcon } from './Icons';
import { PolicyPageType } from '../types';
import Footer from './Footer';

interface LandingPageProps {
  onNavigateToDashboard: () => void;
  onNavigateToPolicy: (page: PolicyPageType) => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-slate-800/60 backdrop-blur-lg border border-slate-700 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-sky-500 text-white mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-50 mb-2">{title}</h3>
    <p className="text-slate-400">{description}</p>
  </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToDashboard, onNavigateToPolicy }) => {
  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      <header className="sticky top-0 z-20 bg-slate-900/60 backdrop-blur-lg border-b border-slate-700">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <GuruIcon className="h-8 w-8 text-sky-500" />
            <span className="text-xl font-bold text-slate-50">AI Exam Guru</span>
          </div>
          <button 
            onClick={onNavigateToDashboard}
            className="px-5 py-2.5 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition duration-200 text-sm"
          >
            Get Started
          </button>
        </nav>
      </header>
      
      <main className="flex-grow">
        <div className="container mx-auto text-center flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-16">
            <div className="mb-8 flex justify-center items-center gap-4">
            <GuruIcon className="h-16 w-16 text-sky-500" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-50">
                AI Exam <span className="text-sky-500">Guru</span>
            </h1>
            </div>

            <p className="max-w-3xl mx-auto mb-8 text-lg sm:text-xl text-slate-400">
            Your personal AI study partner. Ace your exams with powerful tools for doubt solving, quiz generation, and staying updated with current affairs.
            </p>

            <button
            onClick={onNavigateToDashboard}
            className="px-8 py-4 bg-sky-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-sky-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-sky-500/50"
            >
            Enter Dashboard
            </button>

            <div className="mt-16 sm:mt-20 max-w-5xl mx-auto w-full">
            <h2 className="text-3xl font-bold text-slate-50 mb-10">Our Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard
                icon={<QuestionIcon className="h-6 w-6" />}
                title="Doubt Solver"
                description="Stuck on a concept? Get instant, clear, and accurate explanations for any academic question."
                />
                <FeatureCard
                icon={<QuizIcon className="h-6 w-6" />}
                title="Quiz Generator"
                description="Create custom multiple-choice quizzes on any topic to test your knowledge and prepare for exams."
                />
                <FeatureCard
                icon={<NewsIcon className="h-6 w-6" />}
                title="Current Affairs"
                description="Stay ahead with a daily digest of the most important global and national news, summarized by AI."
                />
            </div>
            </div>
        </div>
      </main>

      <Footer onNavigateToPolicy={onNavigateToPolicy} />
    </div>
  );
};

export default LandingPage;
