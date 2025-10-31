import React, { useState } from 'react';
import { 
    GuruIcon, 
    QuestionIcon, 
    QuizIcon, 
    NewsIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    ArrowLeftOnRectangleIcon,
    ChartPieIcon,
    QuestionMarkCircleIcon,
    Bars3Icon,
    XMarkIcon,
    ArrowRightIcon,
    EyeIcon,
    EyeSlashIcon,
    MoonIcon,
    SunIcon,
    Squares2X2Icon
} from './Icons';
import ProgressBar from './ProgressBar';
import { PolicyPageType } from '../types';
import Footer from './Footer';

// Mock User Data
const userData = {
  name: "Shiv Bharti",
  email: "shiv.bharti@example.com",
  currentPlan: "Rank Booster Plan",
  usage: {
    doubtSolver: {
      textUsed: 75,
      textTotal: 150,
      imageUsed: 20,
      imageTotal: 50
    },
    quizGenerator: {
      used: 15,
      total: 30
    },
    dailyCurrentAffairs: {
      used: 22,
      total: 30
    }
  }
};

interface UserDashboardProps {
    onNavigateToTools: () => void;
    onLogout: () => void;
    onNavigateToPolicy: (page: PolicyPageType) => void;
    onNavigateToPricing: () => void;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
}

type ActiveView = 'dashboard' | 'settings';

const UserDashboard: React.FC<UserDashboardProps> = ({ 
    onNavigateToTools, 
    onLogout, 
    onNavigateToPolicy, 
    onNavigateToPricing,
    theme,
    onToggleTheme
}) => {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleNavigate = (view: ActiveView) => {
    setActiveView(view);
    setIsSidebarOpen(false); // Close sidebar on navigation
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* User Profile Section */}
      <div className="flex items-center gap-3 p-4 border-b border-slate-200 dark:border-slate-700">
        <UserCircleIcon className="h-10 w-10 text-slate-500 dark:text-slate-400" />
        <div>
          <p className="font-semibold text-slate-900 dark:text-slate-50">{userData.name}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{userData.email}</p>
        </div>
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-grow p-4 space-y-2">
        <button 
            onClick={onNavigateToTools}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <Squares2X2Icon className="h-5 w-5" />
          <span>All Tools</span>
        </button>
        <div className="!my-4 h-px bg-slate-200 dark:bg-slate-700"></div>
        <button 
            onClick={() => handleNavigate('dashboard')}
            className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-colors ${activeView === 'dashboard' ? 'bg-sky-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
        >
          <ChartPieIcon className="h-5 w-5" />
          <span>Dashboard</span>
        </button>
        <button 
            onClick={() => handleNavigate('settings')}
            className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-colors ${activeView === 'settings' ? 'bg-sky-600 text-white' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
        >
          <Cog6ToothIcon className="h-5 w-5" />
          <span>Settings</span>
        </button>
        <button
            onClick={() => onNavigateToPolicy('support')} 
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <QuestionMarkCircleIcon className="h-5 w-5" />
          <span>Help & Support</span>
        </button>
      </nav>
      
      {/* Logout Button */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <button onClick={onLogout} className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-500 dark:text-red-400 hover:bg-red-500 hover:text-white transition-colors">
          <ArrowLeftOnRectangleIcon className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-900">
        <div className="flex flex-1">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-r border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 h-16 px-4 border-b border-slate-200 dark:border-slate-700">
                    <GuruIcon className="h-8 w-8 text-sky-500" />
                    <span className="text-xl font-bold text-slate-900 dark:text-slate-50">AI Exam Guru</span>
                </div>
                <SidebarContent />
            </aside>
            
            {/* Mobile Sidebar */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)}>
                    <div className="absolute inset-0 bg-black/60"></div>
                    <aside className="absolute top-0 left-0 flex flex-col w-64 h-full bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 z-50 animate-slide-in">
                        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200 dark:border-slate-700">
                             <div className="flex items-center gap-2">
                                <GuruIcon className="h-8 w-8 text-sky-500" />
                                <span className="text-xl font-bold text-slate-900 dark:text-slate-50">AI Exam Guru</span>
                            </div>
                            <button onClick={() => setIsSidebarOpen(false)}><XMarkIcon className="h-6 w-6" /></button>
                        </div>
                        <SidebarContent />
                    </aside>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="md:hidden flex items-center justify-between h-16 px-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 sticky top-0 z-30">
                    <button onClick={() => setIsSidebarOpen(true)}><Bars3Icon className="h-6 w-6" /></button>
                    <span className="text-lg font-bold text-slate-900 dark:text-slate-50">{activeView === 'dashboard' ? 'Dashboard' : 'Settings'}</span>
                    <div className="w-6"></div>
                </header>

                <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
                    {activeView === 'dashboard' ? (
                        <DashboardContent onNavigateToTools={onNavigateToTools} onNavigateToPricing={onNavigateToPricing} />
                    ) : (
                        <SettingsContent 
                            showCurrentPassword={showCurrentPassword}
                            setShowCurrentPassword={setShowCurrentPassword}
                            showNewPassword={showNewPassword}
                            setShowNewPassword={setShowNewPassword}
                            theme={theme}
                            onToggleTheme={onToggleTheme}
                        />
                    )}
                </main>
                <Footer onNavigateToPolicy={onNavigateToPolicy} onNavigateToPricing={onNavigateToPricing} />
            </div>
        </div>
    </div>
  );
};

const DashboardContent: React.FC<{onNavigateToTools: () => void, onNavigateToPricing: () => void}> = ({ onNavigateToTools, onNavigateToPricing }) => (
    <div className="space-y-8 animate-fade-in">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50">Welcome back, {userData.name.split(' ')[0]}!</h1>
        
        {/* Subscription Status Card */}
        <div className="bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-700 dark:text-slate-300 text-center sm:text-left">You are currently on the <strong className="text-sky-500 dark:text-sky-400 font-semibold">{userData.currentPlan}</strong></p>
            <button onClick={onNavigateToPricing} className="px-6 py-2.5 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition duration-200 whitespace-nowrap">Upgrade Plan</button>
        </div>

        {/* Usage Quota Section */}
        <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">Your Monthly Usage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <UsageCard title="Doubt Solver">
                    <ProgressBar label="Text" value={userData.usage.doubtSolver.textUsed} total={userData.usage.doubtSolver.textTotal} />
                    <ProgressBar label="Image" value={userData.usage.doubtSolver.imageUsed} total={userData.usage.doubtSolver.imageTotal} />
                </UsageCard>
                <UsageCard title="Quiz Generator">
                    <ProgressBar label="Quizzes" value={userData.usage.quizGenerator.used} total={userData.usage.quizGenerator.total} />
                </UsageCard>
                <UsageCard title="Daily Current Affairs">
                    <ProgressBar label="Days" value={userData.usage.dailyCurrentAffairs.used} total={userData.usage.dailyCurrentAffairs.total} />
                </UsageCard>
            </div>
        </div>

        {/* Tools Access Section */}
        <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 mb-6">Our Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <ToolCard 
                    icon={<QuestionIcon className="h-8 w-8 text-sky-500" />}
                    title="Doubt Solver"
                    description="Get instant explanations for any academic question."
                    onClick={onNavigateToTools}
                />
                 <ToolCard 
                    icon={<QuizIcon className="h-8 w-8 text-sky-500" />}
                    title="Quiz Generator"
                    description="Create custom quizzes on any topic to test your knowledge."
                    onClick={onNavigateToTools}
                />
                 <ToolCard 
                    icon={<NewsIcon className="h-8 w-8 text-sky-500" />}
                    title="Current Affairs"
                    description="Stay updated with a daily digest of important news."
                    onClick={onNavigateToTools}
                />
            </div>
        </div>
    </div>
);

const SettingsContent: React.FC<{
    showCurrentPassword: boolean; setShowCurrentPassword: (s:boolean)=>void;
    showNewPassword: boolean; setShowNewPassword: (s:boolean)=>void;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
}> = ({
    showCurrentPassword, setShowCurrentPassword,
    showNewPassword, setShowNewPassword,
    theme, onToggleTheme
}) => (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50">Settings</h1>
        
        {/* Change Password Card */}
        <div className="bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Change Password</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Update your password for better security.</p>
            </div>
            <form className="p-6 space-y-4">
                <div className="relative">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Current Password</label>
                    <input type={showCurrentPassword ? "text" : "password"} className="w-full p-3 pr-10 bg-slate-100 dark:bg-slate-700/80 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-sky-500" />
                     <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute inset-y-0 right-0 top-6 flex items-center px-3 text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200" aria-label="Toggle current password visibility">
                        {showCurrentPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                </div>
                 <div className="relative">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">New Password</label>
                    <input type={showNewPassword ? "text" : "password"} className="w-full p-3 pr-10 bg-slate-100 dark:bg-slate-700/80 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-sky-500" />
                     <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute inset-y-0 right-0 top-6 flex items-center px-3 text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200" aria-label="Toggle new password visibility">
                        {showNewPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Confirm New Password</label>
                    <input type={showNewPassword ? "text" : "password"} className="w-full p-3 bg-slate-100 dark:bg-slate-700/80 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-sky-500" />
                </div>
                <div className="pt-2">
                     <button type="submit" className="px-5 py-2.5 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition duration-200">Save Changes</button>
                </div>
            </form>
        </div>

        {/* Appearance Card */}
        <div className="bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Appearance</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Customize the look and feel of the app.</p>
            </div>
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300">Theme</span>
                    <button
                        type="button"
                        onClick={onToggleTheme}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-700/80 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600/80"
                        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                    >
                        {theme === 'light' ? <SunIcon className="h-5 w-5 text-yellow-500" /> : <MoonIcon className="h-5 w-5 text-sky-400" />}
                        {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
                    </button>
                </div>
            </div>
        </div>

        {/* Change Email Card */}
        <div className="bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Change Email Account</h2>
                 <p className="text-slate-500 dark:text-slate-400 mt-1">Update the email address associated with your account.</p>
            </div>
             <form className="p-6 space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">New Email Address</label>
                    <input type="email" placeholder={userData.email} className="w-full p-3 bg-slate-100 dark:bg-slate-700/80 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-sky-500" />
                </div>
                <div className="pt-2">
                     <button type="submit" className="px-5 py-2.5 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition duration-200">Update Email</button>
                </div>
            </form>
        </div>
        
        <div className="text-center mt-8">
            <button disabled className="px-5 py-2 text-sm text-slate-500 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-default">
                Version 1.0
            </button>
        </div>
    </div>
);


const UsageCard: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
    <div className="bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">{title}</h3>
        <div className="space-y-4">{children}</div>
    </div>
);

const ToolCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
}> = ({ icon, title, description, onClick }) => (
    <button onClick={onClick} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-slate-200 dark:border-slate-700 p-6 rounded-lg shadow-lg text-left group hover:border-sky-500 hover:bg-slate-100/80 dark:hover:bg-slate-700/80 transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex justify-between items-start">
            <div>
                <div className="mb-4">{icon}</div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">{title}</h3>
                <p className="text-slate-500 dark:text-slate-400">{description}</p>
            </div>
            <ArrowRightIcon className="h-6 w-6 text-slate-400 dark:text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
  </button>
);


export default UserDashboard;