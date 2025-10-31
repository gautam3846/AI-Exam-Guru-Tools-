import React, { useState } from 'react';
import { GuruIcon, EyeIcon, EyeSlashIcon, GoogleIcon } from './Icons';

interface AuthPageProps {
  onLogin: () => void;
  onNavigateBack: () => void;
}

type AuthView = 'login' | 'signup' | 'forgot';

const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onNavigateBack }) => {
  const [view, setView] = useState<AuthView>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const clearState = () => {
    setError('');
    setMessage('');
  };

  const handleViewChange = (newView: AuthView) => {
    clearState();
    setView(newView);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearState();

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        setError('Please enter a valid email address.');
        return;
    }

    if (view === 'login' || view === 'signup') {
        if (!password.trim()) {
            setError('Please enter your password.');
            return;
        }
        if (view === 'signup' && password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
    }
    
    if (view === 'forgot') {
        // Mock password reset
        setMessage('If an account with that email exists, a password reset link has been sent.');
        return;
    }

    // Mock successful login/signup
    onLogin();
  };
  
  const renderTitle = () => {
    switch(view) {
        case 'signup': return 'Create an Account';
        case 'forgot': return 'Reset Password';
        case 'login':
        default: return 'Welcome Back';
    }
  };

  const renderSubtitle = () => {
    switch(view) {
        case 'signup': return 'Get started with your personal AI study partner';
        case 'forgot': return 'Enter your email to receive a reset link';
        case 'login':
        default: return 'Sign in to continue your journey';
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:py-8 animate-fade-in">
        <main className="w-full max-w-md">
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-6 sm:p-8">
                <div className="text-center mb-8">
                    <button onClick={onNavigateBack} className="flex items-center gap-2 text-slate-900 dark:text-slate-50 mx-auto mb-4 transition-transform hover:scale-105">
                        <GuruIcon className="h-10 w-10 text-sky-500" />
                        <span className="text-2xl font-bold">AI Exam Guru</span>
                    </button>
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50">{renderTitle()}</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">{renderSubtitle()}</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 bg-slate-100 dark:bg-slate-700/80 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200"
                            placeholder="you@example.com"
                            aria-required="true"
                        />
                    </div>
                    {view !== 'forgot' && (
                        <>
                            <div className="relative">
                                <label htmlFor="password"className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-3 pr-10 bg-slate-100 dark:bg-slate-700/80 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200"
                                    placeholder="••••••••"
                                    aria-required="true"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 top-6 flex items-center px-3 text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200" aria-label={showPassword ? "Hide password" : "Show password"}>
                                    {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                                </button>
                            </div>
                             {view === 'login' && (
                                <div className="text-right">
                                    <button type="button" onClick={() => handleViewChange('forgot')} className="text-sm text-sky-500 dark:text-sky-400 hover:text-sky-400 dark:hover:text-sky-300">
                                        Forgot Password?
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                    {view === 'signup' && (
                        <div className="relative">
                            <label htmlFor="confirm-password"className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Confirm Password</label>
                            <input
                                id="confirm-password"
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full p-3 pr-10 bg-slate-100 dark:bg-slate-700/80 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200"
                                placeholder="••••••••"
                                aria-required="true"
                            />
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 top-6 flex items-center px-3 text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-200" aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}>
                                {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                            </button>
                        </div>
                    )}

                    {error && <p className="text-red-500 text-sm text-center" role="alert">{error}</p>}
                    {message && <p className="text-green-400 text-sm text-center" role="status">{message}</p>}

                    <button type="submit" className="w-full px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 disabled:bg-sky-400 transition duration-200">
                        {view === 'login' && 'Login'}
                        {view === 'signup' && 'Create Account'}
                        {view === 'forgot' && 'Send Reset Link'}
                    </button>
                </form>

                {view !== 'forgot' && (
                    <>
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-full border-t border-slate-300 dark:border-slate-600" />
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-white dark:bg-slate-800 px-2 text-sm text-slate-500 dark:text-slate-400">Or continue with</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={onLogin}
                            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white text-slate-800 font-semibold rounded-lg hover:bg-slate-200 transition duration-200 border border-slate-300 shadow-sm"
                        >
                            <GoogleIcon className="h-5 w-5" />
                            Sign in with Google
                        </button>
                    </>
                )}

                <div className="text-center mt-6">
                    {view === 'login' && (
                        <button onClick={() => handleViewChange('signup')} className="text-sm text-sky-500 dark:text-sky-400 hover:text-sky-400 dark:hover:text-sky-300">
                            Don't have an account? Sign Up
                        </button>
                    )}
                    {view === 'signup' && (
                        <button onClick={() => handleViewChange('login')} className="text-sm text-sky-500 dark:text-sky-400 hover:text-sky-400 dark:hover:text-sky-300">
                            Already have an account? Login
                        </button>
                    )}
                     {view === 'forgot' && (
                        <button onClick={() => handleViewChange('login')} className="text-sm text-sky-500 dark:text-sky-400 hover:text-sky-400 dark:hover:text-sky-300">
                            Back to Login
                        </button>
                    )}
                </div>
            </div>
             <div className="text-center mt-8">
                <button onClick={onNavigateBack} className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
                    &larr; Back to Home
                </button>
             </div>
        </main>
    </div>
  );
};

export default AuthPage;
