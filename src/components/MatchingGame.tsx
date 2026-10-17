import React, { useState, useEffect, useMemo } from 'react';
import { MATCHING_PAIRS } from '../data/matchingData';
import { MatchingPair } from '../types';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Puzzle,
  Sparkles,
  Flame,
  Volume2,
  CheckCircle2,
  RotateCcw,
  HelpCircle,
  Lightbulb,
  Award,
  Zap,
  Check,
  Timer,
  Target,
  Clock,
  Play,
  Pause,
} from 'lucide-react';

interface MatchingGameProps {
  onEarnPoints: (points: number, reason: string) => void;
  onStreakUpdate: (isCorrect: boolean) => void;
  currentStreak: number;
}

export const MatchingGame: React.FC<MatchingGameProps> = ({
  onEarnPoints,
  onStreakUpdate,
  currentStreak,
}) => {
  const [selectedBatch, setSelectedBatch] = useState<'round1' | 'round2' | 'round3' | 'all'>('round1');
  const [selectedConditionId, setSelectedConditionId] = useState<string | null>(null);
  const [selectedResultId, setSelectedResultId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [mismatchError, setMismatchError] = useState<{ conditionId: string; resultId: string } | null>(null);
  const [latestMatchExplanation, setLatestMatchExplanation] = useState<MatchingPair | null>(null);
  const [hintActive, setHintActive] = useState<boolean>(false);
  const [shuffledResults, setShuffledResults] = useState<{ id: string; text: string; category: string }[]>([]);

  // Timer & Accuracy
  const [attempts, setAttempts] = useState<number>(0);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [showTimer, setShowTimer] = useState<boolean>(true);

  // Active pairs based on round
  const activePairs = useMemo(() => {
    if (selectedBatch === 'round1') {
      return MATCHING_PAIRS.slice(0, 6);
    } else if (selectedBatch === 'round2') {
      return MATCHING_PAIRS.slice(6, 12);
    } else if (selectedBatch === 'round3') {
      return MATCHING_PAIRS.slice(12, 16);
    }
    return MATCHING_PAIRS; // all 16
  }, [selectedBatch]);

  // Stopwatch timer
  useEffect(() => {
    let interval: number | null = null;
    if (isTimerRunning && showTimer && matchedIds.length < activePairs.length) {
      interval = window.setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, showTimer, matchedIds.length, activePairs.length]);

  const initGame = () => {
    setSelectedConditionId(null);
    setSelectedResultId(null);
    setMatchedIds([]);
    setMismatchError(null);
    setLatestMatchExplanation(null);
    setHintActive(false);
    setAttempts(0);
    setTimerSeconds(0);
    setIsTimerRunning(true);

    const results = activePairs.map((p) => ({
      id: p.id,
      text: p.result,
      category: p.category,
    }));

    // Shuffle results
    for (let i = results.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [results[i], results[j]] = [results[j], results[i]];
    }
    setShuffledResults(results);
  };

  useEffect(() => {
    initGame();
  }, [activePairs]);

  const handleSelectCondition = (pairId: string) => {
    if (matchedIds.includes(pairId)) return;
    soundManager.playCardSelect();
    setSelectedConditionId(pairId);
    setMismatchError(null);

    if (selectedResultId) {
      checkMatch(pairId, selectedResultId);
    }
  };

  const handleSelectResult = (pairId: string) => {
    if (matchedIds.includes(pairId)) return;
    soundManager.playCardSelect();
    setSelectedResultId(pairId);
    setMismatchError(null);

    if (selectedConditionId) {
      checkMatch(selectedConditionId, pairId);
    }
  };

  const checkMatch = (conditionId: string, resultId: string) => {
    setAttempts((prev) => prev + 1);

    if (conditionId === resultId) {
      soundManager.playMatchSuccess();
      const matchedPair = MATCHING_PAIRS.find((p) => p.id === conditionId);
      if (matchedPair) {
        setLatestMatchExplanation(matchedPair);
        soundManager.speak(matchedPair.fullSentence);
      }

      const nextMatched = [...matchedIds, conditionId];
      setMatchedIds(nextMatched);
      setSelectedConditionId(null);
      setSelectedResultId(null);

      // Points calculation with streak multiplier
      const points = 80 + currentStreak * 15;
      onEarnPoints(points, `Matched: "${matchedPair?.condition}"`);
      onStreakUpdate(true);

      // Round Finished!
      if (nextMatched.length === activePairs.length) {
        setIsTimerRunning(false);
        soundManager.playLevelUp();
        confetti({
          particleCount: 110,
          spread: 75,
          origin: { y: 0.6 },
        });
        onEarnPoints(220, 'Cleared Match The Future Round!');
      }
    } else {
      soundManager.playError();
      setMismatchError({ conditionId, resultId });
      onStreakUpdate(false);

      setTimeout(() => {
        setSelectedConditionId(null);
        setSelectedResultId(null);
        setMismatchError(null);
      }, 850);
    }
  };

  const isRoundComplete = matchedIds.length === activePairs.length;
  const accuracyPercent = attempts > 0 ? Math.min(100, Math.round((matchedIds.length / attempts) * 100)) : 100;

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Game Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border border-emerald-500/40 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
              <Puzzle className="w-3.5 h-3.5" />
              <span>Core Matching Arena</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-display text-white tracking-tight">
              MATCH THE FUTURE
            </h1>
            <p className="text-slate-300 text-sm max-w-xl">
              Tap a condition on the left (<span className="text-cyan-400 font-bold">If + Present Simple</span>) and match it with its probable future result on the right (<span className="text-violet-400 font-bold">will + base verb</span>)!
            </p>
          </div>

          {/* Round Selector & Reset */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex p-1 rounded-2xl bg-slate-950/90 border border-slate-800 text-xs font-bold">
              <button
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedBatch('round1');
                }}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
                  selectedBatch === 'round1' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Round 1 (6)
              </button>
              <button
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedBatch('round2');
                }}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
                  selectedBatch === 'round2' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Round 2 (6)
              </button>
              <button
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedBatch('round3');
                }}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
                  selectedBatch === 'round3' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Round 3 (4)
              </button>
              <button
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedBatch('all');
                }}
                className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
                  selectedBatch === 'all' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                All (16)
              </button>
            </div>

            <button
              onMouseEnter={() => soundManager.playHover()}
              onClick={initGame}
              className="p-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer flex items-center gap-1.5 text-xs font-bold shadow-md"
              title="Shuffle & Reset Round"
            >
              <RotateCcw className="w-4 h-4 text-emerald-400" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Live HUD: Progress, Timer, Accuracy, Hints */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-slate-300 pt-4 border-t border-slate-800/80">
          {/* Progress */}
          <div className="flex items-center gap-3">
            <span>Progress: {matchedIds.length} / {activePairs.length} Pairs</span>
            <div className="w-32 h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 transition-all duration-300"
                style={{ width: `${(matchedIds.length / activePairs.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Timer & Accuracy */}
          <div className="flex items-center gap-4">
            {showTimer && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 font-mono text-cyan-300">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>{formatTimer(timerSeconds)}</span>
              </div>
            )}

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 font-mono text-slate-300">
              <Target className="w-3.5 h-3.5 text-emerald-400" />
              <span>{accuracyPercent}% Accuracy ({attempts} tries)</span>
            </div>

            <button
              onMouseEnter={() => soundManager.playHover()}
              onClick={() => {
                soundManager.playClick();
                setHintActive(!hintActive);
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl border text-xs font-bold transition cursor-pointer ${
                hintActive ? 'bg-amber-500/20 border-amber-500/50 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>{hintActive ? 'Hide Category Clues' : 'Category Hints'}</span>
            </button>

            {currentStreak > 1 && (
              <span className="flex items-center gap-1 text-amber-400 font-extrabold animate-pulse">
                <Flame className="w-4 h-4" /> Streak x{currentStreak}!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Board: Two interactive columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Left Column: Conditions (If-Clause) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <span>🟢</span> 1. Condition (If-Clause)
            </span>
            <span className="text-[11px] font-semibold text-slate-400">Present Simple</span>
          </div>

          <div className="space-y-3">
            {activePairs.map((pair) => {
              const isMatched = matchedIds.includes(pair.id);
              const isSelected = selectedConditionId === pair.id;
              const isError = mismatchError?.conditionId === pair.id;

              return (
                <button
                  key={pair.id}
                  disabled={isMatched}
                  onMouseEnter={() => !isMatched && soundManager.playHover()}
                  onClick={() => handleSelectCondition(pair.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer ${
                    isMatched
                      ? 'bg-cyan-950/20 border-cyan-500/30 text-cyan-300/70 opacity-60 cursor-default'
                      : isError
                      ? 'bg-rose-950/60 border-rose-500 text-rose-200 animate-shake ring-2 ring-rose-500'
                      : isSelected
                      ? 'bg-cyan-600/30 border-cyan-400 ring-2 ring-cyan-400/50 text-white shadow-lg shadow-cyan-500/20 translate-x-1'
                      : 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/50 text-slate-100 hover:scale-[1.01]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="text-sm sm:text-base font-bold leading-snug">
                      "{pair.condition}"
                    </div>
                    {hintActive && (
                      <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 font-mono">
                        Theme: {pair.category}
                      </span>
                    )}
                  </div>

                  {isMatched ? (
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                  ) : (
                    <div
                      className={`w-4 h-4 rounded-full border-2 shrink-0 ${
                        isSelected ? 'border-cyan-400 bg-cyan-400' : 'border-slate-700'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Results (Main Clause - Shuffled) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-violet-400 flex items-center gap-1.5">
              <span>🔵</span> 2. Future Result (Main Clause)
            </span>
            <span className="text-[11px] font-semibold text-slate-400">will + base verb</span>
          </div>

          <div className="space-y-3">
            {shuffledResults.map((item) => {
              const isMatched = matchedIds.includes(item.id);
              const isSelected = selectedResultId === item.id;
              const isError = mismatchError?.resultId === item.id;

              return (
                <button
                  key={item.id}
                  disabled={isMatched}
                  onMouseEnter={() => !isMatched && soundManager.playHover()}
                  onClick={() => handleSelectResult(item.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer ${
                    isMatched
                      ? 'bg-violet-950/20 border-violet-500/30 text-violet-300/70 opacity-60 cursor-default'
                      : isError
                      ? 'bg-rose-950/60 border-rose-500 text-rose-200 animate-shake ring-2 ring-rose-500'
                      : isSelected
                      ? 'bg-violet-600/30 border-violet-400 ring-2 ring-violet-400/50 text-white shadow-lg shadow-violet-500/20 -translate-x-1'
                      : 'bg-slate-900/80 border-slate-800 hover:border-violet-500/50 text-slate-100 hover:scale-[1.01]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="text-sm sm:text-base font-bold leading-snug">
                      "{item.text}"
                    </div>
                    {hintActive && (
                      <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 font-mono">
                        Theme: {item.category}
                      </span>
                    )}
                  </div>

                  {isMatched ? (
                    <CheckCircle2 className="w-5 h-5 text-violet-400 shrink-0" />
                  ) : (
                    <div
                      className={`w-4 h-4 rounded-full border-2 shrink-0 ${
                        isSelected ? 'border-violet-400 bg-violet-400' : 'border-slate-700'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Immediate Pedagogical Feedback Card */}
      {latestMatchExplanation && (
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/90 border border-emerald-500/40 shadow-xl space-y-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                <Check className="w-4 h-4" />
              </span>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                Verified Match!
              </span>
            </div>
            <button
              onMouseEnter={() => soundManager.playHover()}
              onClick={() => soundManager.speak(latestMatchExplanation.fullSentence)}
              className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-cyan-400 transition cursor-pointer flex items-center gap-1.5 text-xs font-bold border border-slate-800"
              title="Listen to full sentence"
            >
              <Volume2 className="w-4 h-4" />
              <span>Listen</span>
            </button>
          </div>

          <div className="text-base sm:text-lg font-extrabold text-white">
            "{latestMatchExplanation.fullSentence}"
          </div>

          <div className="text-xs sm:text-sm text-slate-300">
            {latestMatchExplanation.explanation}
          </div>

          <div className="text-[11px] text-slate-400 italic">
            Context: {latestMatchExplanation.context}
          </div>
        </div>
      )}

      {/* Round Finished Celebratory Banner */}
      {isRoundComplete && (
        <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white text-center space-y-4 shadow-2xl animate-fade-in">
          <div className="text-4xl animate-bounce">🎉</div>
          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight">
            ROUND CLEARED! MASTER OF THE FUTURE!
          </h2>
          <p className="text-emerald-100 text-sm max-w-lg mx-auto">
            You completed all {activePairs.length} pairs with{' '}
            <strong className="text-yellow-300">{accuracyPercent}% accuracy</strong> in{' '}
            <strong className="text-cyan-200">{formatTimer(timerSeconds)}</strong>!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onMouseEnter={() => soundManager.playHover()}
              onClick={initGame}
              className="px-6 py-3 rounded-2xl bg-white text-slate-950 font-black text-sm shadow-lg hover:scale-105 transition cursor-pointer"
            >
              Play Again / Shuffle
            </button>
            {selectedBatch !== 'all' && (
              <button
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedBatch(
                    selectedBatch === 'round1'
                      ? 'round2'
                      : selectedBatch === 'round2'
                      ? 'round3'
                      : 'all'
                  );
                }}
                className="px-6 py-3 rounded-2xl bg-slate-950 text-white font-black text-sm border border-white/30 hover:bg-slate-900 transition cursor-pointer"
              >
                Next Batch →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
