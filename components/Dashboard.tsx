import React, { useState } from 'react';
import Header from './Header';
import DoubtSolver from './DoubtSolver';
import QuizGenerator from './QuizGenerator';
import CurrentAffairs from './CurrentAffairs';
import { Tool, PolicyPageType } from '../types';
import { QuestionIcon, QuizIcon, NewsIcon } from './Icons';
import Footer from './Footer';

const ToolNavButton: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => {
  const baseClasses = "flex items-center space-x-2 px-3 sm:px-4 py-3 text-sm sm:text-base font-medium transition-colors duration-200 border-b-2";
  const activeClasses = "border-sky-500 text-sky-400";
  const inactiveClasses = "border-transparent text-slate-400 hover:border-slate-600 hover:text-slate-200";
  return (
    <button onClick={onClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
      {icon}
      <span>{label}</span>
    </button>
  );
};

interface DashboardProps {
    onNavigateToPolicy: (page: PolicyPageType) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigateToPolicy }) => {
  const [activeTool, setActiveTool] = useState<Tool>(Tool.DoubtSolver);

  const renderTool = () => {
    switch (activeTool) {
      case Tool.QuizGenerator:
        return <QuizGenerator />;
      case Tool.CurrentAffairs:
        return <CurrentAffairs />;
      case Tool.DoubtSolver:
      default:
        return <DoubtSolver />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      <Header />
      
      <div className="bg-slate-900/60 backdrop-blur-lg border-b border-slate-700 shadow-sm sticky top-16 z-10">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center space-x-2 sm:space-x-8">
            <ToolNavButton
              label="Doubt Solver"
              icon={<QuestionIcon className="h-5 w-5" />}
              isActive={activeTool === Tool.DoubtSolver}
              onClick={() => setActiveTool(Tool.DoubtSolver)}
            />
            <ToolNavButton
              label="Quiz Generator"
              icon={<QuizIcon className="h-5 w-5" />}
              isActive={activeTool === Tool.QuizGenerator}
              onClick={() => setActiveTool(Tool.QuizGenerator)}
            />
            <ToolNavButton
              label="Current Affairs"
              icon={<NewsIcon className="h-5 w-5" />}
              isActive={activeTool === Tool.CurrentAffairs}
              onClick={() => setActiveTool(Tool.CurrentAffairs)}
            />
        </nav>
      </div>

      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        {renderTool()}
      </main>
      
      <Footer onNavigateToPolicy={onNavigateToPolicy} />
    </div>
  );
};

export default Dashboard;
