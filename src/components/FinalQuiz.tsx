import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/challengesData';
import { QuizQuestion } from '../types';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Award,
} from 'lucide-react';

interface FinalQuizProps {
  onEarnPoints: (points: number, reason: string) => void;
  onStreakUpdate: (isCorrect: boolean) => void;
  onUnlockCertificate: () => void;
}

export const FinalQuiz: React.FC<FinalQuizProps> = ({
  onEarnPoints,
  onStreakUpdate,
  onUnlockCertificate,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question: QuizQuestion = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    soundManager.playClick();
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === question.correctIndex;
    if (isCorrect) {
      soundManager.playSuccess();
      setCorrectCount((prev) => prev + 1);
      onEarnPoints(100, `Quiz Question #${currentIdx + 1}`);
      onStreakUpdate(true);
    } else {
      soundManager.playError();
      onStreakUpdate(false);
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Quiz Finished!
      setIsFinished(true);
      soundManager.playLevelUp();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
      });
      if (correctCount >= 7) {
        onEarnPoints(300, 'Passed Final Quiz Champion evaluation!');
        onUnlockCertificate();
      }
    }
  };

  const handleRestart = () => {
    soundManager.playClick();
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setIsFinished(false);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-violet-900/60 via-slate-900 to-indigo-950/60 border border-violet-500/30 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 text-xs font-bold border border-violet-500/30">
              <Trophy className="w-3.5 h-3.5" />
              <span>Boss Challenge Assessment</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-display text-white tracking-tight">
              THE FINAL BOSS QUIZ
            </h1>
            <p className="text-slate-300 text-sm max-w-xl">
              10 evaluation questions to test your First Conditional mastery. Score 7/10 or higher to qualify for the Academy Grandmaster Certificate!
            </p>
          </div>

          <div className="px-4 py-2.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs font-bold text-violet-300 flex items-center gap-2">
            <span>Score: {correctCount} / {QUIZ_QUESTIONS.length}</span>
          </div>
        </div>

        {/* Question step indicator */}
        <div className="mt-6 flex items-center gap-1.5">
          {QUIZ_QUESTIONS.map((_, qIdx) => (
            <div
              key={qIdx}
              className={`h-2 flex-1 rounded-full transition-all ${
                qIdx === currentIdx
                  ? 'bg-violet-400 scale-y-125'
                  : qIdx < currentIdx
                  ? 'bg-emerald-500'
                  : 'bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      {!isFinished ? (
        /* Active Question Card */
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/70 border border-slate-700/80 shadow-2xl space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Question {currentIdx + 1} of {QUIZ_QUESTIONS.length}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 font-semibold">
              {question.ruleCategory}
            </span>
          </div>

          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-relaxed">
            {question.question}
          </h2>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {question.options.map((opt, oIdx) => {
              const isSelected = selectedOption === oIdx;
              const isCorrectOpt = oIdx === question.correctIndex;

              let btnStyle = 'bg-slate-900 border-slate-700 text-slate-200 hover:border-slate-500';
              if (isAnswered) {
                if (isCorrectOpt) {
                  btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200 ring-2 ring-rose-500/40';
                } else {
                  btnStyle = 'bg-slate-900/50 border-slate-800 text-slate-500';
                }
              }

              return (
                <button
                  key={oIdx}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(oIdx)}
                  className={`p-4 rounded-2xl border text-left font-bold text-sm transition flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono shrink-0">
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span className="leading-snug">{opt}</span>
                  </div>

                  {isAnswered && (
                    isCorrectOpt ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : isSelected ? (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    ) : null
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswered && (
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 animate-fade-in">
              <div className="text-xs uppercase font-extrabold tracking-wider text-indigo-400">
                Pedagogical Explanation:
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                {question.explanation}
              </p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-95 text-white font-black text-sm shadow-lg shadow-violet-500/20 flex items-center gap-2 cursor-pointer transition"
              >
                <span>{currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Results'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results Card */
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-800/80 border border-slate-700 shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-500 flex items-center justify-center text-4xl shadow-xl shadow-amber-500/30 mx-auto">
            🏆
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
              QUIZ ASSESSMENT COMPLETE!
            </h2>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              You scored <span className="text-amber-400 font-extrabold text-lg">{correctCount}</span> out of{' '}
              <span className="text-white font-bold">{QUIZ_QUESTIONS.length}</span>!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 max-w-sm mx-auto text-xs text-slate-300">
            {correctCount >= 8 ? (
              <span className="text-emerald-400 font-bold">
                🌟 Outstanding! You have complete command of the First Conditional!
              </span>
            ) : correctCount >= 6 ? (
              <span className="text-amber-400 font-bold">
                👍 Good work! Review the Grammar Lab to polish a few edge cases!
              </span>
            ) : (
              <span className="text-rose-400 font-bold">
                💪 Nice attempt! Revisit the rules and try again to unlock your Certificate.
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 flex items-center gap-2 cursor-pointer transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>
            <button
              onClick={onUnlockCertificate}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 flex items-center gap-2 cursor-pointer hover:scale-105 transition"
            >
              <Award className="w-4 h-4" />
              <span>View Official Certificate</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
