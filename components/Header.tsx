import React, { useState } from 'react';
import { GuruIcon, UserCircleIcon } from './Icons';
import { PolicyPageType } from '../types';

interface HeaderProps {
  onNavigateToAuth?: () => void;
  onNavigateToPolicy: (page: PolicyPageType) => void;
  onNavigateToPricing: () => void;
  onLogout?: () => void;
  onNavigateToAccount?: () => void;
  onNavigateToTools?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onNavigateToAuth,
  onNavigateToPolicy,
  onNavigateToPricing,
  onLogout,
  onNavigateToAccount,
  onNavigateToTools,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Define a single navigation action handler to also close the menu
  const handleNavigate = (navigationAction: () => void) => {
    navigationAction();
    setIsMenuOpen(false);
  };
  
  const handleLogoClick = () => {
    if (onNavigateToTools) {
      onNavigateToTools();
    }
  }

  return (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 relative">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        {/* Logo */}
        <button onClick={handleLogoClick} className="flex items-center gap-2" aria-label="Go to dashboard">
          <GuruIcon className="h-8 w-8 text-sky-500" />
          <span className="text-xl font-bold text-slate-900 dark:text-slate-50">
            AI Exam <span className="text-sky-500">Guru</span>
          </span>
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
            <li><button onClick={() => onNavigateToPolicy('about')} className="text-slate-600 dark:text-slate-300 hover:text-sky-400 transition-colors duration-200">About</button></li>
            <li><button onClick={() => onNavigateToPolicy('contact')} className="text-slate-600 dark:text-slate-300 hover:text-sky-400 transition-colors duration-200">Contact</button></li>
            <li><button onClick={onNavigateToPricing} className="text-slate-600 dark:text-slate-300 hover:text-sky-400 transition-colors duration-200">Pricing</button></li>
        </ul>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          {onLogout ? (
            <div className="flex items-center gap-4">
              {onNavigateToAccount && (
                <button onClick={onNavigateToAccount} className="text-slate-600 dark:text-slate-300 hover:text-sky-400 transition-colors duration-200" aria-label="View user profile">
                  <UserCircleIcon className="h-7 w-7" />
                </button>
              )}
              <button onClick={onLogout} className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition duration-200">Logout</button>
            </div>
          ) : (
            <>
              <button onClick={onNavigateToAuth} className="px-5 py-2.5 text-slate-600 dark:text-slate-300 font-semibold rounded-lg hover:text-sky-400 transition duration-200 text-sm">Login</button>
              <button onClick={onNavigateToAuth} className="px-5 py-2.5 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition duration-200 text-sm">Sign Up</button>
            </>
          )}
        </div>

        {/* Mobile Menu Button (Toggler) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="text-slate-600 dark:text-slate-300 hover:text-sky-400 p-2 -mr-2"
          >
            {isMenuOpen ? (
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white dark:bg-slate-900 md:hidden animate-slide-down-fade border-b border-slate-200 dark:border-slate-700 shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col pt-4 pb-6">
              <ul className="flex flex-col items-start gap-2 text-base font-medium">
                  <li><button onClick={() => handleNavigate(() => onNavigateToPolicy('about'))} className="text-slate-700 dark:text-slate-300 hover:text-sky-400 transition-colors duration-200 py-2 w-full text-left">About</button></li>
                  <li><button onClick={() => handleNavigate(() => onNavigateToPolicy('contact'))} className="text-slate-700 dark:text-slate-300 hover:text-sky-400 transition-colors duration-200 py-2 w-full text-left">Contact</button></li>
                  <li><button onClick={() => handleNavigate(onNavigateToPricing)} className="text-slate-700 dark:text-slate-300 hover:text-sky-400 transition-colors duration-200 py-2 w-full text-left">Pricing</button></li>
              </ul>
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 flex flex-col items-center gap-4 w-full">
                {onLogout ? (
                  <>
                    {onNavigateToAccount && (
                       <button onClick={() => handleNavigate(onNavigateToAccount)} className="w-full max-w-xs px-4 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition duration-200">My Dashboard</button>
                    )}
                    <button onClick={() => handleNavigate(onLogout)} className="w-full max-w-xs px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200">Logout</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleNavigate(onNavigateToAuth!)} className="w-full max-w-xs px-5 py-3 text-slate-700 dark:text-slate-300 font-semibold rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition duration-200">Login</button>
                    <button onClick={() => handleNavigate(onNavigateToAuth!)} className="w-full max-w-xs px-5 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition duration-200">Sign Up</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
