import React, { useState } from 'react';
import { generateQuiz } from '../services/geminiService';
import { QuizQuestion } from '../types';
import Loader from './Loader';

type QuizState = 'config' | 'generating' | 'active' | 'finished';

const QuizGenerator: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [numQuestions, setNumQuestions] = useState<number>(5);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [quizState, setQuizState] = useState<QuizState>('config');
  const [error, setError] = useState<string>('');

  const handleStartQuiz = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic.');
      return;
    }
    setError('');
    setQuizState('generating');
    try {
      const quizQuestions = await generateQuiz(topic, numQuestions);
      if(quizQuestions && quizQuestions.length > 0) {
        setQuestions(quizQuestions);
        setQuizState('active');
      } else {
        throw new Error('Received an empty quiz from the API.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to generate quiz.');
      setQuizState('config');
    }
  };
  
  const handleAnswer = (answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateScore();
      setQuizState('finished');
    }
  };
  
  const calculateScore = () => {
    let currentScore = 0;
    questions.forEach((q, index) => {
      if (userAnswers[index] === q.correctAnswer) {
        currentScore++;
      }
    });
    setScore(currentScore);
  };

  const resetQuiz = () => {
    setTopic('');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
    setQuizState('config');
    setError('');
  };

  const renderContent = () => {
    switch (quizState) {
      case 'generating':
        return (
          <div className="text-center p-8">
            <h3 className="text-xl text-slate-400 mb-4">Generating your quiz on "{topic}"...</h3>
            <Loader />
          </div>
        );
      case 'active':
        const currentQuestion = questions[currentQuestionIndex];
        return (
          <div className="p-6 sm:p-8 animate-fade-in">
            <div className="mb-4 text-slate-400">Question {currentQuestionIndex + 1} of {questions.length}</div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-slate-50">{currentQuestion.question}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`p-4 rounded-lg text-left transition duration-200 border-2 ${userAnswers[currentQuestionIndex] === option ? 'bg-sky-600 border-sky-600 text-white' : 'bg-slate-700/80 border-slate-600 hover:bg-slate-600/80 text-slate-200'}`}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              onClick={handleNextQuestion}
              disabled={!userAnswers[currentQuestionIndex]}
              className="mt-8 px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 disabled:bg-sky-400 disabled:cursor-not-allowed transition duration-200"
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          </div>
        );
      case 'finished':
        return (
          <div className="p-6 sm:p-8 text-center animate-fade-in">
            <h3 className="text-3xl font-bold text-sky-500 mb-4">Quiz Complete!</h3>
            <p className="text-xl text-slate-50 mb-2">Your Score:</p>
            <p className="text-5xl font-bold text-sky-500 mb-8">{score} / {questions.length}</p>
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition duration-200"
            >
              Create Another Quiz
            </button>
          </div>
        );
      case 'config':
      default:
        return (
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-sky-500 mb-2">Quiz Generator</h2>
            <p className="text-slate-400 mb-6">Test your knowledge. Enter a topic to generate a multiple-choice quiz.</p>
            <div className="space-y-4">
              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-slate-300 mb-1">Topic</label>
                <input
                  id="topic"
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., The Solar System"
                  className="w-full p-3 bg-slate-700/80 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200"
                />
              </div>
              <div>
                <label htmlFor="numQuestions" className="block text-sm font-medium text-slate-300 mb-1">Number of Questions</label>
                <select 
                    id="numQuestions"
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(Number(e.target.value))}
                    className="w-full p-3 bg-slate-700/80 border border-slate-600 rounded-lg text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-200"
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
              </div>
            </div>
            {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
            <button
              onClick={handleStartQuiz}
              className="mt-6 w-full sm:w-auto px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 disabled:bg-sky-400 transition duration-200"
            >
              Generate Quiz
            </button>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-slate-800/60 backdrop-blur-lg border border-slate-700 rounded-xl shadow-lg overflow-hidden">
      {renderContent()}
    </div>
  );
};

export default QuizGenerator;