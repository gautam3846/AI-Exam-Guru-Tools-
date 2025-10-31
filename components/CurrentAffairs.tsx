import React, { useState, useEffect, useCallback } from 'react';
import { getCurrentAffairs } from '../services/geminiService';
import { CurrentAffairsData } from '../types';
import Loader from './Loader';

const CurrentAffairs: React.FC = () => {
  const [data, setData] = useState<CurrentAffairsData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchAffairs = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const result = await getCurrentAffairs();
      setData(result);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAffairs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-4xl mx-auto bg-slate-800/60 backdrop-blur-lg border border-slate-700 rounded-xl shadow-lg overflow-hidden animate-fade-in">
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
            <div className="mb-4 sm:mb-0">
                <h2 className="text-2xl sm:text-3xl font-bold text-sky-500">Daily Current Affairs</h2>
                <p className="text-slate-400">Your daily digest of the latest news, powered by AI and Google Search.</p>
            </div>
            <button
                onClick={fetchAffairs}
                disabled={isLoading}
                className="flex-shrink-0 px-5 py-2.5 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 disabled:bg-sky-400 disabled:cursor-not-allowed transition duration-200"
            >
                {isLoading ? 'Refreshing...' : 'Refresh'}
            </button>
        </div>

        {isLoading && <Loader />}
        {error && <p className="text-center text-red-500 p-4">{error}</p>}
        
        {data && !isLoading && (
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-slate-50 mb-4 border-b-2 border-sky-500 pb-2">Top Headlines</h3>
              <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-headings:text-sky-500 bg-slate-900/80 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap font-sans text-slate-200">{data.content}</pre>
              </div>
            </div>

            {data.sources.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-slate-50 mb-4 border-b-2 border-sky-500 pb-2">Sources</h3>
                <ul className="space-y-2">
                  {data.sources.map((source, index) => (
                    <li key={index} className="bg-slate-700/80 p-3 rounded-lg hover:bg-slate-600/80 transition duration-200">
                      <a 
                        href={source.uri} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sky-400 hover:text-sky-300 text-sm"
                      >
                        {source.title}
                        <span className="block text-xs text-slate-400 truncate">{source.uri}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentAffairs;