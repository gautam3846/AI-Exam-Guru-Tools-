import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import PolicyViewer from './components/PolicyViewer';
import { PolicyPageType } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'dashboard' | PolicyPageType>('landing');
  const [previousView, setPreviousView] = useState<'landing' | 'dashboard'>('landing');

  const navigateToDashboard = () => {
    setView('dashboard');
    setPreviousView('dashboard');
  };
  
  const navigateToPolicy = (page: PolicyPageType) => {
    setView(page);
  };

  const navigateBack = () => {
    setView(previousView);
  };

  switch (view) {
    case 'landing':
      return <LandingPage onNavigateToDashboard={navigateToDashboard} onNavigateToPolicy={navigateToPolicy} />;
    case 'dashboard':
      return <Dashboard onNavigateToPolicy={navigateToPolicy} />;
    case 'privacy':
    case 'terms':
    case 'support':
    case 'about':
    case 'contact':
    case 'disclaimer':
      return <PolicyViewer page={view} onBack={navigateBack} />;
    default:
      return <LandingPage onNavigateToDashboard={navigateToDashboard} onNavigateToPolicy={navigateToPolicy} />;
  }
};

export default App;