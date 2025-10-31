import React from 'react';
import { PolicyPageType } from '../types';
import { 
  PrivacyPolicyContent, 
  TermsOfServiceContent, 
  SupportContent,
  AboutUsContent,
  ContactUsContent,
  DisclaimerContent
} from '../policyContent';

interface PolicyViewerProps {
  page: PolicyPageType;
  onBack: () => void;
}

const titles: Record<PolicyPageType, string> = {
  privacy: 'Privacy Policy',
  terms: 'Terms of Service',
  support: 'Support',
  about: 'About Us',
  contact: 'Contact Us',
  disclaimer: 'Disclaimer',
};

const PolicyViewer: React.FC<PolicyViewerProps> = ({ page, onBack }) => {
  const title = titles[page];

  const renderContent = () => {
    switch (page) {
      case 'privacy':
        return <PrivacyPolicyContent />;
      case 'terms':
        return <TermsOfServiceContent />;
      case 'support':
        return <SupportContent />;
      case 'about':
        return <AboutUsContent />;
      case 'contact':
        return <ContactUsContent />;
      case 'disclaimer':
        return <DisclaimerContent />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-200 flex flex-col items-center animate-fade-in p-4 sm:p-6">
      <div className="w-full max-w-4xl">
        <header className="mb-8">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition duration-200"
          >
            &larr; Back
          </button>
        </header>
        <main className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-sky-500 mb-6 border-b-2 border-slate-300 dark:border-slate-600 pb-4">{title}</h1>
          <div className="prose dark:prose-invert max-w-none prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-ul:text-slate-600 dark:prose-ul:text-slate-300">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PolicyViewer;
