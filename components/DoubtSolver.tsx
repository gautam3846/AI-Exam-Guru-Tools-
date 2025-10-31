import React, { useState, useRef, useEffect } from 'react';
import { solveDoubt } from '../services/geminiService';
import { 
    PaperclipIcon, 
    MicrophoneIcon, 
    XCircleIcon, 
    ArrowLeftIcon,
    PaperAirplaneIcon
} from './Icons';

interface Message {
    role: 'user' | 'model';
    text: string;
    imagePreview?: string | null;
}

interface DoubtSolverProps {
    onClose: () => void;
}

const DoubtSolver: React.FC<DoubtSolverProps> = ({ onClose }) => {
    const [chatHistory, setChatHistory] = useState<Message[]>([
        { role: 'model', text: "Hello, I am AI Exam Guru, which topic do you want to study today?" }
    ]);
    const [currentMessage, setCurrentMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    // Multimodal state
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isListening, setIsListening] = useState<boolean>(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const recognitionRef = useRef<any>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-scroll chat to bottom
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory, isLoading]);

    // Auto-resize textarea
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            const scrollHeight = textarea.scrollHeight;
            textarea.style.height = `${scrollHeight}px`;
        }
    }, [currentMessage]);
    
    // --- Speech to Text (Voice Input) ---
    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = true;

            recognitionRef.current.onresult = (event: any) => {
                let interimTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                     interimTranscript += event.results[i][0].transcript;
                }
                setCurrentMessage(interimTranscript);
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
                setError('Speech recognition failed. Please try again.');
                setIsListening(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const handleMicClick = () => {
        if (!recognitionRef.current) {
            setError('Voice recognition is not supported in your browser.');
            return;
        }
        if (isListening) {
            recognitionRef.current.stop();
        } else {
            setCurrentMessage('');
            recognitionRef.current.start();
        }
        setIsListening(!isListening);
    };

    // --- Image Handling ---
    const handlePaperclipClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setImageFile(null);
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }
        setImagePreview(null);
    };

    const fileToBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve((reader.result as string).split(',')[1]);
            reader.onerror = error => reject(error);
        });

    // --- Form Submission ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedMessage = currentMessage.trim();
        if (!trimmedMessage && !imageFile) {
            return;
        }

        const userMessage: Message = { role: 'user', text: trimmedMessage, imagePreview };
        setChatHistory(prev => [...prev, userMessage]);
        
        // Store and clear state before async call
        const messageToSend = trimmedMessage;
        const imageFileToSend = imageFile;

        setCurrentMessage('');
        removeImage();
        setIsLoading(true);
        setError('');

        try {
            let imagePayload;
            if (imageFileToSend) {
                const base64Data = await fileToBase64(imageFileToSend);
                imagePayload = { mimeType: imageFileToSend.type, data: base64Data };
            }
            const result = await solveDoubt(messageToSend, imagePayload);
            const modelMessage: Message = { role: 'model', text: result };
            setChatHistory(prev => [...prev, modelMessage]);
        } catch (err: any) {
            const errorMessage: Message = { role: 'model', text: "Sorry, I encountered an error. Please try again." };
            setChatHistory(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const INPUT_CHAR_LIMIT = 350;

    return (
        <div className="fixed inset-0 z-50 flex h-full w-full flex-col bg-slate-900 text-slate-200 animate-fade-in">
            {/* Header */}
            <header className="flex-shrink-0 flex items-center justify-between p-4 border-b border-slate-700">
                <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-full transition-colors" aria-label="Back to dashboard">
                    <ArrowLeftIcon className="h-6 w-6" />
                </button>
                <h1 className="text-xl font-bold text-sky-400">Doubt Solver</h1>
                <div className="w-10"></div> {/* Spacer */}
            </header>

            {/* Chat History */}
            <main ref={chatContainerRef} className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-6">
                {chatHistory.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.role === 'model' && <div className="flex-shrink-0 h-8 w-8 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-sm">AI</div>}
                        <div className={`max-w-md lg:max-w-2xl rounded-2xl p-4 ${msg.role === 'user' ? 'bg-sky-600 text-white rounded-br-none' : 'bg-slate-700 text-slate-200 rounded-bl-none'}`}>
                            {msg.imagePreview && (
                                <img src={msg.imagePreview} alt="User upload" className="mb-2 rounded-lg max-h-48" />
                            )}
                            <p className="whitespace-pre-wrap">{msg.text}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-end gap-3 justify-start">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-sm">AI</div>
                        <div className="bg-slate-700 rounded-2xl rounded-bl-none p-4">
                            <div className="flex items-center space-x-1.5 typing-indicator">
                                <span className="h-2 w-2 bg-slate-400 rounded-full"></span>
                                <span className="h-2 w-2 bg-slate-400 rounded-full"></span>
                                <span className="h-2 w-2 bg-slate-400 rounded-full"></span>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Input Area */}
            <footer className="flex-shrink-0 p-4 border-t border-slate-700 bg-slate-900">
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                    {imagePreview && (
                        <div className="mb-2 relative w-fit">
                            <img src={imagePreview} alt="Preview" className="h-20 w-auto rounded-lg" />
                            <button type="button" onClick={removeImage} className="absolute -top-2 -right-2 bg-slate-600 text-white rounded-full hover:bg-red-500">
                                <XCircleIcon className="h-6 w-6" />
                            </button>
                        </div>
                    )}
                     {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
                    <div className="relative flex items-end gap-2">
                        <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                        <button type="button" onClick={handlePaperclipClick} className="p-2 text-slate-400 hover:text-sky-400 transition-colors" aria-label="Attach image">
                            <PaperclipIcon className="h-6 w-6" />
                        </button>
                        <button type="button" onClick={handleMicClick} className={`p-2 transition-colors ${isListening ? 'text-red-500 animate-pulse-red' : 'text-slate-400 hover:text-sky-400'}`} aria-label="Use voice input">
                            <MicrophoneIcon className="h-6 w-6" />
                        </button>
                        <div className="flex-grow">
                            <textarea
                                ref={textareaRef}
                                value={currentMessage}
                                onChange={(e) => setCurrentMessage(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSubmit(e);
                                    }
                                }}
                                placeholder="Ask me anything about your studies..."
                                className="w-full bg-slate-800 border border-slate-600 rounded-lg text-slate-200 p-3 max-h-48 resize-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                                rows={1}
                                disabled={isLoading}
                                maxLength={INPUT_CHAR_LIMIT}
                            />
                            <p className={`text-xs text-right mt-1 pr-2 ${currentMessage.length >= INPUT_CHAR_LIMIT ? 'text-red-500' : 'text-slate-400'}`}>
                                {currentMessage.length}/{INPUT_CHAR_LIMIT}
                            </p>
                        </div>
                        <button type="submit" disabled={isLoading || (!currentMessage.trim() && !imageFile)} className="p-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:bg-sky-800 disabled:text-slate-400 transition-colors" aria-label="Send message">
                            <PaperAirplaneIcon className="h-6 w-6" />
                        </button>
                    </div>
                </form>
            </footer>
        </div>
    );
};

export default DoubtSolver;