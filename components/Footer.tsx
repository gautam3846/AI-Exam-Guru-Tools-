import React from 'react';
import { PolicyPageType } from '../types';
import { GuruIcon, TwitterIcon, WhatsAppIcon, TelegramIcon, InstagramIcon, FacebookIcon } from './Icons';

interface FooterProps {
    onNavigateToPolicy: (page: PolicyPageType) => void;
}

const FooterLink: React.FC<{ page: PolicyPageType; onClick: (page: PolicyPageType) => void; children: React.ReactNode }> = ({ page, onClick, children }) => (
    <li>
        <button onClick={() => onClick(page)} className="text-slate-400 hover:text-sky-400 transition-colors duration-200">
            {children}
        </button>
    </li>
);

const Footer: React.FC<FooterProps> = ({ onNavigateToPolicy }) => {
    return (
        <footer className="w-full bg-slate-900/60 backdrop-blur-lg border-t border-slate-700">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

                <div className="flex justify-center items-center mb-8">
                    <div className="flex items-center space-x-6">
                        <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-sky-400 transition-colors" aria-label="Share on WhatsApp">
                            <WhatsAppIcon className="h-6 w-6" />
                        </a>
                        <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-sky-400 transition-colors" aria-label="Visit our X profile">
                            <TwitterIcon className="h-6 w-6" />
                        </a>
                        <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-sky-400 transition-colors" aria-label="Join us on Telegram">
                            <TelegramIcon className="h-6 w-6" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-sky-400 transition-colors" aria-label="Follow us on Instagram">
                            <InstagramIcon className="h-6 w-6" />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-sky-400 transition-colors" aria-label="Follow us on Facebook">
                            <FacebookIcon className="h-6 w-6" />
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Column 1: Brand */}
                    <div className="md:col-span-4 lg:col-span-6 flex flex-col items-center md:items-start">
                        <div className="flex items-center gap-2 mb-3">
                            <GuruIcon className="h-8 w-8 text-sky-500" />
                            <span className="text-xl font-bold text-slate-50">AI Exam Guru</span>
                        </div>
                        <p className="text-slate-500 text-sm text-center md:text-left max-w-xs">
                            Your personal AI study partner. Ace your exams with powerful tools for learning and preparation.
                        </p>
                    </div>

                    {/* Column 2 & 3: Links */}
                    <div className="md:col-span-8 lg:col-span-6 grid grid-cols-2 sm:grid-cols-2 gap-8 text-center sm:text-left">
                        <div className="sm:col-start-2">
                            <h3 className="font-semibold text-slate-50 mb-4 tracking-wider uppercase text-sm">About</h3>
                            <ul className="space-y-3">
                                <FooterLink page="about" onClick={onNavigateToPolicy}>About Us</FooterLink>
                                <FooterLink page="contact" onClick={onNavigateToPolicy}>Contact Us</FooterLink>
                                <FooterLink page="support" onClick={onNavigateToPolicy}>Support</FooterLink>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-50 mb-4 tracking-wider uppercase text-sm">Legal</h3>
                            <ul className="space-y-3">
                                <FooterLink page="terms" onClick={onNavigateToPolicy}>Terms of Service</FooterLink>
                                <FooterLink page="privacy" onClick={onNavigateToPolicy}>Privacy Policy</FooterLink>
                                <FooterLink page="disclaimer" onClick={onNavigateToPolicy}>Disclaimer</FooterLink>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-6 border-t border-slate-700 text-center text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} AI Exam Guru. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;