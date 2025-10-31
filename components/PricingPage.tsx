import React from 'react';
import { CheckIcon } from './Icons';

interface PricingPageProps {
  onBack: () => void;
}

const pricingPlans = [
    {
        title: 'Spark Plan',
        price: '₹0',
        period: '/month',
        tagline: 'Perfect for getting started with AI-powered learning.',
        features: [
            'Doubt Solver - 2 Times Per Month API Call',
            'Quiz Generator - 2 Times Per Month API Call',
            'Daily Current Affairs - 2 Times Per Month API Call',
        ],
        buttonText: 'Start for Free',
        isPopular: false,
        isPrimary: false,
    },
    {
        title: 'Rank Booster Plan',
        price: '₹599',
        period: '/1 Month',
        tagline: 'Unlock your potential with a 1-month plan featuring 3,000 detailed question solutions and personalized practice sessions.',
        features: [
            'Doubt Solver - Text Prompt 150, Image Prompt 50 Times API Call /1 Month',
            'Quiz Generator - Daily 1 Times API Call',
            'Daily Current Affairs - Daily 1 Times API Call',
        ],
        buttonText: 'Subscribe Now',
        isPopular: true,
        isPrimary: true,
    },
    {
        title: 'Topper\'s Plan',
        price: '₹1449',
        period: '/3 Month',
        tagline: 'Get answers to 8,500 questions and master every topic with unlimited practice over 3 months.',
        features: [
            'Doubt Solver - Text Prompt 380, Image Prompt 120 Times API Call/3 Month',
            'Quiz Generator - Daily 2 Times API Call',
            'Daily Current Affairs - Daily 1 Times API Call',
        ],
        buttonText: 'Choose Plan',
        isPopular: false,
        isPrimary: false,
    },
];

const PricingPage: React.FC<PricingPageProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen flex flex-col items-center animate-fade-in p-4 sm:p-6">
            <div className="w-full max-w-6xl">
                <header className="mb-8 flex justify-start">
                    <button
                        onClick={onBack}
                        className="px-4 py-2 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition duration-200"
                    >
                        &larr; Back to Home
                    </button>
                </header>
                <main>
                    <div className="text-center mb-10">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 mb-4">
                            Find the plan that's <span className="text-sky-500">right for you</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-400">
                            Start for free and upgrade when you're ready to unlock your full potential.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        {pricingPlans.map((plan, index) => (
                            <div
                                key={index}
                                className={`
                                    bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border rounded-xl shadow-lg p-6 flex flex-col h-full transition-transform duration-300
                                    ${plan.isPopular ? 'border-sky-500 relative lg:scale-105 hover:lg:scale-110' : 'border-slate-200 dark:border-slate-700 hover:lg:scale-105'}
                                `}
                            >
                                {plan.isPopular && (
                                    <div className="absolute top-0 right-6 -translate-y-1/2 bg-sky-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                                        Most Popular
                                    </div>
                                )}
                                <div className="flex-grow">
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-4">{plan.title}</h2>
                                    <div className="mb-6">
                                        <span className="text-4xl font-extrabold text-slate-900 dark:text-slate-50">{plan.price}</span>
                                        <span className="text-lg text-slate-500 dark:text-slate-400">{plan.period}</span>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 mb-8 min-h-[40px] sm:min-h-[60px]">{plan.tagline}</p>
                                    <ul className="space-y-4 mb-10">
                                        {plan.features.map((feature, fIndex) => (
                                            <li key={fIndex} className="flex items-start">
                                                <CheckIcon className="h-6 w-6 text-sky-500 mr-3 flex-shrink-0 mt-1" />
                                                <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                                            </li>

                                        ))}
                                    </ul>
                                </div>
                                <button
                                    onClick={onBack} // Simulates selecting and going back
                                    className={`
                                        w-full py-3 px-6 font-semibold rounded-lg transition-colors duration-300 text-center
                                        ${plan.isPrimary
                                            ? 'bg-sky-600 text-white hover:bg-sky-700 focus:ring-4 focus:ring-sky-500/50'
                                            : 'border-2 border-sky-600 text-sky-500 dark:text-sky-400 hover:bg-sky-600 hover:text-white focus:ring-4 focus:ring-sky-600/50'
                                        }
                                    `}
                                >
                                    {plan.buttonText}
                                </button>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PricingPage;
