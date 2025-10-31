import React, { useState } from 'react';
import { solveDoubt } from '../services/geminiService';
import Loader from './Loader';

const DoubtSolver: React.FC = () => {
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      setError('Please enter a question.');
      return;
    }
    setIsLoading(true);
    setAnswer('');
    setError('');
    try {
      const result = await solveDoubt(question);
      setAnswer(result);
    } catch (err: any) {
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-slate-800/60 backdrop-blur-lg border border-slate-700 rounded-xl shadow-lg overflow-hidden animate-fade-in">
      <div className="p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-sky-500 mb-2">Doubt Solver</h2>
        <p className="text-slate-400 mb-6">Have a question? Ask anything related to your studies and get a clear, concise answer.</p>
        
        <form onSubmit={handleSubmit}>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g., Explain Newton's First Law of Motion"
            className="w-full h-32 p-4 bg-slate-700/80 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200 resize-none"
            disabled={isLoading}
          />
          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={isLoading || !question.trim()}
            className="mt-4 w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 disabled:bg-sky-400 disabled:cursor-not-allowed transition duration-200"
          >
            {isLoading ? 'Thinking...' : 'Solve Doubt'}
          </button>
        </form>

        {isLoading && <Loader />}
        
        {answer && (
          <div className="mt-8 pt-6 border-t border-slate-700">
            <h3 className="text-xl font-semibold text-slate-50 mb-4">Answer:</h3>
            <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-headings:text-sky-500 bg-slate-900/80 p-4 rounded-lg">
               <pre className="whitespace-pre-wrap font-sans text-slate-200">{answer}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoubtSolver;