import React, { useState, useCallback } from 'react';
import { fetchWisdom } from '../services/geminiService';
import { Spinner } from './Spinner';
import { Modal } from './Modal';

export const EclatDOmbre: React.FC = () => {
  const [content, setContent] = useState<string>("Where light dances, shadows are born to follow.");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFetchContent = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const result = await fetchWisdom();
    // The fetchWisdom service now handles errors internally and returns a fallback.
    // We update the content regardless.
    setContent(result);
    setIsLoading(false);
  }, []);

  return (
    <>
      <div className="relative w-full max-w-2xl mx-auto bg-black/20 backdrop-blur-md rounded-2xl shadow-2xl shadow-indigo-500/10 p-8 md:p-12 border border-slate-700/50 overflow-hidden">
        <button
            onClick={() => setIsModalOpen(true)}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-20"
            aria-label="About this application"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </button>

        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-indigo-600/50 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-purple-600/50 to-transparent rounded-full blur-3xl animate-pulse"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-indigo-300 drop-shadow-lg">
            Éclat d’Ombre
          </h1>

          <div className="h-20 flex items-center justify-center">
              <p className={`text-xl md:text-2xl text-slate-300 italic text-center transition-opacity duration-700 ease-in-out ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                  “{content}”
              </p>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            onClick={handleFetchContent}
            disabled={isLoading}
            className={`
              relative group flex items-center justify-center px-8 py-3 bg-slate-800/50 border border-slate-600 rounded-full 
              text-lg text-slate-200 font-semibold
              transition-all duration-300 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500
              disabled:cursor-not-allowed disabled:opacity-50
              ${!isLoading ? 'animate-glow hover:bg-slate-700/70 hover:scale-105' : ''}
            `}
          >
            {isLoading ? (
              <>
                <Spinner />
                <span className="ml-3">Whispering...</span>
              </>
            ) : (
              <span>Whisper Light</span>
            )}
          </button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-indigo-300">
          About Éclat d’Ombre
        </h2>
        <p className="text-slate-300 mb-4">
          This is an interactive art piece that uses Google's Gemini AI to generate poetic phrases about light and shadow.
        </p>
        <p className="text-slate-300">
          Click the 'Whisper Light' button to receive a new whisper of wisdom, presented with elegant, smooth animations.
        </p>
      </Modal>
    </>
  );
};