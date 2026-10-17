import React, { useState, useEffect } from 'react';
import { SCRAMBLE_CHALLENGES } from '../data/challengesData';
import { WordScrambleChallenge } from '../types';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  RotateCcw,
  Volume2,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

interface SentenceBuilderProps {
  onEarnPoints: (points: number, reason: string) => void;
  onStreakUpdate: (isCorrect: boolean) => void;
}

export const SentenceBuilder: React.FC<SentenceBuilderProps> = ({
  onEarnPoints,
  onStreakUpdate,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [builtWords, setBuiltWords] = useState<string[]>([]);
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const challenge: WordScrambleChallenge = SCRAMBLE_CHALLENGES[currentIndex];

  // Initialize and shuffle words for current challenge
  const setupChallenge = (ch: WordScrambleChallenge) => {
    setIsEvaluated(false);
    setIsCorrect(false);
    setBuiltWords([]);

    // Shuffle pool of words
    const shuffled = [...ch.words];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setAvailableWords(shuffled);
  };

  useEffect(() => {
    setupChallenge(challenge);
  }, [currentIndex]);

  const handleAddWord = (word: string, indexInAvailable: number) => {
    soundManager.playCoin();
    setBuiltWords((prev) => [...prev, word]);
    setAvailableWords((prev) => prev.filter((_, idx) => idx !== indexInAvailable));
  };

  const handleRemoveWord = (word: string, indexInBuilt: number) => {
    soundManager.playClick();
    setAvailableWords((prev) => [...prev, word]);
    setBuiltWords((prev) => prev.filter((_, idx) => idx !== indexInBuilt));
  };

  const handleReset = () => {
    soundManager.playClick();
    setupChallenge(challenge);
  };

  const handleCheck = () => {
    const candidate = builtWords.join(' ');
    const target = challenge.correctOrder.join(' ');

    const win = candidate.toLowerCase() === target.toLowerCase();
    setIsEvaluated(true);
    setIsCorrect(win);

    if (win) {
      soundManager.playSuccess();
      soundManager.speak(target);
      onEarnPoints(100, `Constructed: "${target}"`);
      onStreakUpdate(true);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else {
      soundManager.playError();
      onStreakUpdate(false);
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    if (currentIndex < SCRAMBLE_CHALLENGES.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-900/60 via-slate-900 to-orange-950/60 border border-amber-500/30 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              <span>🏗️</span>
              <span>Sentence Construction Workshop</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-display text-white tracking-tight">
              SENTENCE BUILDER
            </h1>
            <p className="text-slate-300 text-sm max-w-xl">
              Tap the word blocks in the correct grammatical order. Pay close attention to subject-verb agreement, commas, and clause order!
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs font-bold text-amber-300">
            <span>Challenge {currentIndex + 1} of {SCRAMBLE_CHALLENGES.length}</span>
          </div>
        </div>
      </div>

      {/* Workshop Board */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/70 border border-slate-700/80 shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
            Mission Task:
          </span>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Words</span>
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-base sm:text-lg font-bold text-amber-300">
          {challenge.prompt}
        </div>

        {/* Construction Zone */}
        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-400">
            Your Sentence Construction Zone (Tap to remove):
          </span>
          <div className="min-h-[90px] p-4 rounded-2xl bg-slate-950/80 border-2 border-dashed border-slate-700 flex flex-wrap gap-2.5 items-center">
            {builtWords.length === 0 ? (
              <span className="text-xs text-slate-500 font-semibold italic">
                Tap words below to place them here in order...
              </span>
            ) : (
              builtWords.map((word, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRemoveWord(word, idx)}
                  disabled={isEvaluated && isCorrect}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm shadow-md hover:scale-95 active:scale-90 transition cursor-pointer flex items-center gap-1"
                >
                  <span>{word}</span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Word Pool */}
        <div className="space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
            Available Word Blocks (Tap to place):
          </span>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-wrap gap-2.5">
            {availableWords.map((word, idx) => (
              <button
                key={idx}
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => handleAddWord(word, idx)}
                disabled={isEvaluated && isCorrect}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 text-slate-100 font-bold text-sm shadow transition hover:scale-105 active:scale-95 cursor-pointer"
              >
                {word}
              </button>
            ))}
          </div>
        </div>

        {/* Rule Tip */}
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5 text-xs text-amber-200">
          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span><strong>Architect Tip:</strong> {challenge.ruleTip}</span>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-700/60">
          {isEvaluated ? (
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Brilliant! Perfect First Conditional structure! (+100 pts)</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <AlertCircle className="w-5 h-5" />
                  <span>Not quite in the right order yet. Keep trying!</span>
                </div>
              )}
            </div>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {!isCorrect ? (
              <button
                onClick={handleCheck}
                disabled={builtWords.length === 0}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-95 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 disabled:opacity-50 transition cursor-pointer"
              >
                Check Structure
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-sm shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <span>Next Sentence Challenge</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
