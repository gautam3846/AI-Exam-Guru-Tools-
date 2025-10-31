import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import PolicyViewer from './components/PolicyViewer';
import AuthPage from './components/AuthPage';
import PricingPage from './components/PricingPage';
import { PolicyPageType } from './types';
import UserDashboard from './components/UserDashboard';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!localStorage.getItem('isLoggedIn'));
  const [policyPage, setPolicyPage] = useState<PolicyPageType | null>(null);
  const [showAuthPage, setShowAuthPage] = useState<boolean>(false);
  const [view, setView] = useState<'app' | 'pricing'>('app');
  const [dashboardView, setDashboardView] = useState<'tools' | 'account'>('tools');
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsAuthenticated(true);
    setShowAuthPage(false); // Close auth page on successful login
    setDashboardView('tools'); // Default to tools view on login
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsAuthenticated(false);
    setDashboardView('tools'); // Reset view on logout
  };
  
  const navigateToPolicy = (page: PolicyPageType) => {
    setView('app'); // Go back to app view before showing policy
    setPolicyPage(page);
  };

  const navigateToPricing = () => {
    setPolicyPage(null);
    setView('pricing');
  };

  const navigateBackFromPolicy = () => {
    setPolicyPage(null);
  };

  const navigateBackFromPricing = () => {
    setView('app');
  }

  const navigateToAccount = () => setDashboardView('account');
  const navigateToTools = () => setDashboardView('tools');

  if (policyPage) {
    return <PolicyViewer page={policyPage} onBack={navigateBackFromPolicy} />;
  }

  if (view === 'pricing') {
    return <PricingPage onBack={navigateBackFromPricing} />;
  }
  
  // App View
  if (isAuthenticated) {
    if (dashboardView === 'account') {
        return (
            <UserDashboard 
                onNavigateToTools={navigateToTools}
                onLogout={handleLogout}
                onNavigateToPolicy={navigateToPolicy}
                onNavigateToPricing={navigateToPricing}
                theme={theme}
                onToggleTheme={toggleTheme}
            />
        );
    }
    // dashboardView is 'tools'
    return (
        <Dashboard 
            onNavigateToPolicy={navigateToPolicy} 
            onLogout={handleLogout} 
            onNavigateToPricing={navigateToPricing}
            onNavigateToAccount={navigateToAccount}
        />
    );
  }
  
  // Unauthenticated user flow
  if (showAuthPage) {
    return <AuthPage onLogin={handleLogin} onNavigateBack={() => setShowAuthPage(false)} />;
  }

  return <LandingPage onNavigateToAuth={() => setShowAuthPage(true)} onNavigateToPolicy={navigateToPolicy} onNavigateToPricing={navigateToPricing} />;
};

export default App;
