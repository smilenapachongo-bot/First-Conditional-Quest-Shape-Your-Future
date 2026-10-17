import React, { useState } from 'react';
import { MISTAKE_CHALLENGES } from '../data/challengesData';
import { soundManager } from '../utils/audio';
import {
  Search,
  Volume2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Lightbulb,
} from 'lucide-react';

interface MistakeHunterProps {
  onEarnPoints: (points: number, reason: string) => void;
  onStreakUpdate: (isCorrect: boolean) => void;
}

export const MistakeHunter: React.FC<MistakeHunterProps> = ({
  onEarnPoints,
  onStreakUpdate,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userGuess, setUserGuess] = useState<boolean | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const currentChallenge = MISTAKE_CHALLENGES[currentIndex];

  const handleGuess = (hasMistake: boolean) => {
    soundManager.playClick();
    setUserGuess(hasMistake);
    setHasAnswered(true);

    const isUserCorrect = hasMistake === currentChallenge.hasError;

    if (isUserCorrect) {
      soundManager.playSuccess();
      onEarnPoints(90, `Solved Detective Case #${currentIndex + 1}`);
      onStreakUpdate(true);
    } else {
      soundManager.playError();
      onStreakUpdate(false);
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    setUserGuess(null);
    setHasAnswered(false);
    if (currentIndex < MISTAKE_CHALLENGES.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const isUserCorrect = userGuess === currentChallenge.hasError;

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-900/60 via-slate-900 to-red-950/60 border border-rose-500/30 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
              <Search className="w-3.5 h-3.5" />
              <span>Grammar Error Detective</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-display text-white tracking-tight">
              MISTAKE HUNTER
            </h1>
            <p className="text-slate-300 text-sm max-w-xl">
              Inspect the suspect sentence below! Does it contain a First Conditional grammar trap, or is it 100% correct?
            </p>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs font-bold text-rose-300">
            <span>Case {currentIndex + 1} of {MISTAKE_CHALLENGES.length}</span>
          </div>
        </div>
      </div>

      {/* Case Board */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/70 border border-slate-700/80 shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-rose-400" /> Evidence Under Investigation:
          </span>
          <button
            onClick={() => soundManager.speak(currentChallenge.sentence)}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-700 text-cyan-400 transition cursor-pointer flex items-center gap-1.5 text-xs font-bold"
          >
            <Volume2 className="w-4 h-4" />
            <span>Hear Evidence</span>
          </button>
        </div>

        {/* Suspect Sentence Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-700 text-center space-y-2">
          <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">
            Suspect Sentence:
          </span>
          <div className="text-xl sm:text-2xl font-black text-white font-display">
            "{currentChallenge.sentence}"
          </div>
        </div>

        {/* Detective Decision Buttons */}
        {!hasAnswered ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <button
              onClick={() => handleGuess(true)}
              className="p-4 rounded-2xl bg-slate-900 hover:bg-rose-950/40 border border-slate-700 hover:border-rose-500 text-white font-bold text-sm transition flex items-center justify-center gap-3 cursor-pointer group shadow-lg"
            >
              <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-base group-hover:scale-110 transition-transform">
                ⚠️
              </div>
              <span>It contains a GRAMMAR MISTAKE!</span>
            </button>

            <button
              onClick={() => handleGuess(false)}
              className="p-4 rounded-2xl bg-slate-900 hover:bg-emerald-950/40 border border-slate-700 hover:border-emerald-500 text-white font-bold text-sm transition flex items-center justify-center gap-3 cursor-pointer group shadow-lg"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-base group-hover:scale-110 transition-transform">
                ✔️
              </div>
              <span>It is 100% CORRECT!</span>
            </button>
          </div>
        ) : (
          /* Resolution / Explanation Box */
          <div className="space-y-4 pt-2 animate-fade-in">
            <div
              className={`p-5 rounded-2xl border ${
                isUserCorrect
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
              } space-y-3`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-base">
                  {isUserCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>Detective Victory! Correct Analysis (+90 pts)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-400" />
                      <span>Case Misjudged! Let's examine the rules.</span>
                    </>
                  )}
                </div>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-900/80 font-mono">
                  {currentChallenge.ruleCategory}
                </span>
              </div>

              {currentChallenge.hasError ? (
                <div className="space-y-2">
                  <div className="text-xs text-rose-300">
                    <strong>Identified Trap: </strong>
                    <span className="font-mono bg-rose-900/40 px-2 py-0.5 rounded">
                      {currentChallenge.errorPart}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-emerald-300">
                    <strong>Proper Correction: </strong>
                    <span className="font-bold">"{currentChallenge.correctedSentence}"</span>
                  </div>
                </div>
              ) : (
                <div className="text-xs sm:text-sm text-emerald-300">
                  This sentence was already completely accurate! Great eye for detail.
                </div>
              )}

              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                {currentChallenge.explanation}
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 hover:opacity-95 text-white font-black text-sm shadow-lg shadow-rose-500/20 flex items-center gap-2 cursor-pointer transition"
              >
                <span>Next Case File</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
