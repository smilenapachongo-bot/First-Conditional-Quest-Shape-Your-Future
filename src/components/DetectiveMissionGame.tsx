import React, { useState } from 'react';
import { DETECTIVE_MISSIONS } from '../data/challengesData';
import { DetectiveMission } from '../types';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Search,
  Volume2,
  CheckCircle2,
  XCircle,
  Shield,
  ArrowRight,
  RotateCcw,
  Sparkles,
  MapPin,
  HelpCircle,
} from 'lucide-react';

interface DetectiveMissionGameProps {
  onEarnPoints: (points: number, reason: string) => void;
  onStreakUpdate: (isCorrect: boolean) => void;
}

export const DetectiveMissionGame: React.FC<DetectiveMissionGameProps> = ({
  onEarnPoints,
  onStreakUpdate,
}) => {
  const mission: DetectiveMission = DETECTIVE_MISSIONS[0];
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isSolved, setIsSolved] = useState(false);

  const currentClue = mission.clues[currentStep];

  const handleChooseOption = (idx: number) => {
    if (isAnswered) return;
    soundManager.playCardSelect();
    setSelectedOptionIdx(idx);
    setIsAnswered(true);

    const isCorrect = currentClue.conditionalChoice.options[idx].isCorrect;
    if (isCorrect) {
      soundManager.playSuccess();
      onEarnPoints(100, `Solved Detective Clue #${currentStep + 1}`);
      onStreakUpdate(true);
    } else {
      soundManager.playError();
      onStreakUpdate(false);
    }
  };

  const handleNextStep = () => {
    soundManager.playClick();
    setSelectedOptionIdx(null);
    setIsAnswered(false);

    if (currentStep < mission.clues.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsSolved(true);
      soundManager.playLevelUp();
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
      onEarnPoints(250, 'Master Detective Case Solved!');
    }
  };

  const handleReset = () => {
    soundManager.playClick();
    setCurrentStep(0);
    setSelectedOptionIdx(null);
    setIsAnswered(false);
    setIsSolved(false);
  };

  const choiceState = selectedOptionIdx !== null ? currentClue.conditionalChoice.options[selectedOptionIdx] : null;

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-fuchsia-950/80 via-slate-900 to-indigo-950/80 border border-fuchsia-500/40 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/20 text-fuchsia-300 text-xs font-bold border border-fuchsia-500/40">
              <Search className="w-3.5 h-3.5" />
              <span>Deductive Grammar Case</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-display text-white tracking-tight">
              DETECTIVE MISSION
            </h1>
            <p className="text-slate-300 text-sm max-w-xl">
              Apply First Conditional logic to investigate clues, interrogate suspects, and predict outcomes to solve the academy mystery!
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-bold text-fuchsia-300">
            <MapPin className="w-4 h-4 text-fuchsia-400" />
            <span>{mission.location}</span>
          </div>
        </div>
      </div>

      {!isSolved ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-violet-500/30 shadow-2xl space-y-6">
          {/* Mission Briefing */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
            <span className="text-2xl">🕵️</span>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-fuchsia-400 font-bold">
                Case File: {mission.title}
              </span>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                {mission.briefing}
              </p>
            </div>
          </div>

          {/* Current Clue Step */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-extrabold tracking-wider text-cyan-400">
                {currentClue.stepTitle}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Step {currentStep + 1} of {mission.clues.length}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-sm font-semibold text-white">
              "{currentClue.storySnippet}"
            </div>
          </div>

          {/* Conditional Decision Choice */}
          <div className="space-y-3">
            <div className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
              Detective Deduction:
            </div>
            <div className="text-base sm:text-lg font-bold text-amber-300">
              {currentClue.conditionalChoice.prompt}
            </div>

            <div className="space-y-2.5 pt-1">
              {currentClue.conditionalChoice.options.map((opt, oIdx) => {
                const isSelected = selectedOptionIdx === oIdx;

                let style = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-fuchsia-500/50 hover:bg-slate-900';
                if (isAnswered) {
                  if (opt.isCorrect) {
                    style = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40';
                  } else if (isSelected) {
                    style = 'bg-rose-950/60 border-rose-500 text-rose-200';
                  } else {
                    style = 'bg-slate-950/40 border-slate-900 text-slate-500';
                  }
                }

                return (
                  <button
                    key={oIdx}
                    disabled={isAnswered}
                    onMouseEnter={() => soundManager.playHover()}
                    onClick={() => handleChooseOption(oIdx)}
                    className={`w-full p-4 rounded-2xl border text-left font-bold text-sm transition flex items-center justify-between gap-3 cursor-pointer ${style}`}
                  >
                    <span>{opt.text}</span>
                    {isAnswered && (
                      opt.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      ) : null
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback */}
          {choiceState && (
            <div
              className={`p-4 rounded-2xl border ${
                choiceState.isCorrect ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
              } space-y-1 text-xs sm:text-sm animate-fade-in`}
            >
              <div className="font-bold">
                {choiceState.isCorrect ? 'Clue Verified!' : 'Wrong Deduction!'}
              </div>
              <p>{choiceState.feedback}</p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onMouseEnter={() => soundManager.playHover()}
                onClick={handleNextStep}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-black text-sm shadow-lg shadow-fuchsia-500/20 flex items-center gap-2 cursor-pointer transition hover:scale-105"
              >
                <span>{currentStep < mission.clues.length - 1 ? 'Advance Investigation' : 'Close Case File'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Mystery Solved Celebration */
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-fuchsia-500/40 shadow-2xl text-center space-y-6 animate-fade-in">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-fuchsia-500 to-purple-600 flex items-center justify-center text-4xl shadow-xl shadow-fuchsia-500/30 mx-auto">
            🕵️‍♂️
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
              CASE CLOSED: MYSTERY SOLVED!
            </h2>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              {mission.resolution}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 max-w-sm mx-auto text-xs text-emerald-400 font-bold">
            🌟 Badge Unlocked: "Mission Complete"! +250 XP
          </div>

          <button
            onMouseEnter={() => soundManager.playHover()}
            onClick={handleReset}
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-black text-sm shadow-xl shadow-fuchsia-500/30 flex items-center justify-center gap-2 cursor-pointer mx-auto transition hover:scale-105"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay Detective Mission</span>
          </button>
        </div>
      )}
    </div>
  );
};
