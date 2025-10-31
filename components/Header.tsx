import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-sm shadow-md sticky top-0 z-10 border-b border-slate-700">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl sm:text-2xl font-bold text-slate-50">
              AI Exam <span className="text-sky-500">Guru</span>
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;