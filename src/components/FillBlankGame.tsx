import React, { useState } from 'react';
import { FILL_BLANK_CHALLENGES } from '../data/challengesData';
import { FillBlankChallenge } from '../types';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  PenTool,
  Volume2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Lightbulb,
} from 'lucide-react';

interface FillBlankGameProps {
  onEarnPoints: (points: number, reason: string) => void;
  onStreakUpdate: (isCorrect: boolean) => void;
}

export const FillBlankGame: React.FC<FillBlankGameProps> = ({
  onEarnPoints,
  onStreakUpdate,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const challenge: FillBlankChallenge = FILL_BLANK_CHALLENGES[currentIdx];

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;
    soundManager.playCardSelect();
    setSelectedOption(option);
    setIsAnswered(true);

    const win = option === challenge.correctOption;
    setIsCorrect(win);

    if (win) {
      soundManager.playSuccess();
      const completedSentence = challenge.sentencePrompt.replace('_______', option);
      soundManager.speak(completedSentence);
      onEarnPoints(75, `Filled Blank #${currentIdx + 1}`);
      onStreakUpdate(true);
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
    } else {
      soundManager.playError();
      onStreakUpdate(false);
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    if (currentIdx < FILL_BLANK_CHALLENGES.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setCurrentIdx(0);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-indigo-950/80 border border-cyan-500/40 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/40">
              <PenTool className="w-3.5 h-3.5" />
              <span>Cloze Challenge</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-display text-white tracking-tight">
              FILL IN THE BLANKS
            </h1>
            <p className="text-slate-300 text-sm max-w-xl">
              Select the correct grammatical verb form to complete each First Conditional sentence. Pay attention to auxiliary verbs and subject agreement!
            </p>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-bold text-cyan-300">
            <span>Question {currentIdx + 1} of {FILL_BLANK_CHALLENGES.length}</span>
          </div>
        </div>
      </div>

      {/* Challenge Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-violet-500/30 shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
            Target Focus:
          </span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
            {challenge.clauseFocus}
          </span>
        </div>

        {/* Prompt Sentence */}
        <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2">
          <div className="text-xl sm:text-2xl md:text-3xl font-black font-display text-white">
            "{challenge.sentencePrompt}"
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {challenge.options.map((opt, idx) => {
            const isChosen = selectedOption === opt;
            const isTarget = opt === challenge.correctOption;

            let style = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-cyan-500/50 hover:bg-slate-900';
            if (isAnswered) {
              if (isTarget) {
                style = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40';
              } else if (isChosen) {
                style = 'bg-rose-950/60 border-rose-500 text-rose-200';
              } else {
                style = 'bg-slate-950/50 border-slate-900 text-slate-600';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => handleSelectOption(opt)}
                className={`py-4 px-3 rounded-2xl border text-center font-bold text-base transition cursor-pointer shadow-md ${style}`}
              >
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {isAnswered && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 animate-fade-in">
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Correct! +75 XP</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-rose-400 font-bold text-sm">
                  <XCircle className="w-5 h-5" />
                  <span>Oops! Not quite right.</span>
                </div>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              {challenge.explanation}
            </p>
          </div>
        )}

        {/* Next Button */}
        {isAnswered && (
          <div className="flex justify-end pt-2">
            <button
              onMouseEnter={() => soundManager.playHover()}
              onClick={handleNext}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-sm shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer transition hover:scale-105"
            >
              <span>{currentIdx < FILL_BLANK_CHALLENGES.length - 1 ? 'Next Challenge' : 'Play Again'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
