import React from 'react';
import { QuestionIcon, QuizIcon, NewsIcon, GuruIcon } from './Icons';
import { PolicyPageType } from '../types';
import Footer from './Footer';
import Header from './Header';

interface LandingPageProps {
  onNavigateToAuth: () => void;
  onNavigateToPolicy: (page: PolicyPageType) => void;
  onNavigateToPricing: () => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-slate-200 dark:border-slate-700 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-sky-500 text-white mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400">{description}</p>
  </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToAuth, onNavigateToPolicy, onNavigateToPricing }) => {
  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      <Header 
        onNavigateToAuth={onNavigateToAuth}
        onNavigateToPolicy={onNavigateToPolicy}
        onNavigateToPricing={onNavigateToPricing}
      />
      
      <main className="flex-grow">
        <div className="container mx-auto text-center flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 pb-12">
            <div className="mb-6 flex justify-center items-center gap-4">
            <GuruIcon className="h-14 w-14 text-sky-500" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-50">
                AI Exam <span className="text-sky-500">Guru</span>
            </h1>
            </div>

            <p className="max-w-3xl mx-auto mb-8 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            Your personal AI study partner. Ace your exams with powerful tools for doubt solving, quiz generation, and staying updated with current affairs.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                    onClick={onNavigateToAuth}
                    className="w-full sm:w-auto px-6 py-3 bg-sky-600 text-white font-semibold text-base rounded-lg shadow-lg hover:bg-sky-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-sky-500/50"
                >
                    Get Started For Free
                </button>
                <button
                    onClick={onNavigateToPricing}
                    className="w-full sm:w-auto px-6 py-3 text-white font-semibold text-base rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-sky-500/50 btn-animated-gradient"
                >
                    View Plans
                </button>
            </div>

            <div className="mt-12 sm:mt-16 max-w-5xl mx-auto w-full">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-10">Our Tools</h2>
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

      <Footer onNavigateToPolicy={onNavigateToPolicy} onNavigateToPricing={onNavigateToPricing} />
    </div>
  );
};

export default LandingPage;
