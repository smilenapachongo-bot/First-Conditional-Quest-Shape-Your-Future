import React from 'react';
import { soundManager } from '../utils/audio';
import { X, BookOpen, Puzzle, Award, CheckCircle2, Lightbulb, Target, Sparkles, Trophy } from 'lucide-react';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartQuest: () => void;
  onGoGrammar: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({
  isOpen,
  onClose,
  onStartQuest,
  onGoGrammar,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-md">
              <BookOpen className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight">
                HOW TO PLAY & WIN
              </h2>
              <p className="text-xs sm:text-sm text-indigo-100 font-medium">
                Your complete guide to mastering the First Conditional
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto text-slate-200">
          {/* Mission Overview */}
          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-start gap-4">
            <div className="text-3xl">🎯</div>
            <div>
              <h3 className="font-bold text-white text-base">Your Learning Mission</h3>
              <p className="text-sm text-slate-300 mt-1">
                Learn how to predict future outcomes using real conditions. In English, the First Conditional uses{' '}
                <span className="font-bold text-emerald-400">If + Present Simple</span> for the condition and{' '}
                <span className="font-bold text-blue-400">will + base verb</span> for the probable future result!
              </p>
            </div>
          </div>

          {/* Grid of instructions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Step 1 */}
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-xs">1</span>
                <span>Study in the Grammar Lab</span>
              </div>
              <p className="text-xs text-slate-300">
                Explore the formula, affirmative, negative (<code className="text-pink-300">doesn't / won't</code>), question forms, and the golden rule: <strong>never use "will" right after "if"</strong>.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs">2</span>
                <span>Match the Future</span>
              </div>
              <p className="text-xs text-slate-300">
                Play the main game! Tap a condition card on the left (e.g. <em>"If I study every day,"</em>) and find its matching logical result on the right (<em>"I will improve my English."</em>).
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-xs">3</span>
                <span>Sentence Builder Workshop</span>
              </div>
              <p className="text-xs text-slate-300">
                Click or drag scrambled words into the right sequence. Practice both regular order with commas and inverted order without commas!
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center text-xs">4</span>
                <span>Mistake Hunter (Spot the Trap)</span>
              </div>
              <p className="text-xs text-slate-300">
                Act as a detective! Read sentences and decide whether they contain grammar errors or are 100% correct.
              </p>
            </div>

            {/* Step 5 */}
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-xs">5</span>
                <span>Earn Stars, Points & Badges</span>
              </div>
              <p className="text-xs text-slate-300">
                Get <span className="text-indigo-400 font-semibold">+50 to +150 points</span> per correct answer. Maintain a streak to earn combo multipliers and unlock 8 rare badges!
              </p>
            </div>

            {/* Step 6 */}
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm">
                <span className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center text-xs">6</span>
                <span>Leaderboard & Official Certificate</span>
              </div>
              <p className="text-xs text-slate-300">
                Climb the Academy Leaderboard! Reach 1,000 points to unlock and print your personalized First Conditional Master Certificate.
              </p>
            </div>
          </div>

          {/* Golden Rules reminder */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-sm mb-2">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              <span>Pro-Gamer Grammar Tips</span>
            </div>
            <ul className="text-xs space-y-1.5 text-slate-300 list-disc list-inside">
              <li><strong>Clause 1:</strong> Always use Present Simple with "if" (<em>If it rains...</em>, NOT <em>If it will rain</em>).</li>
              <li><strong>Comma Rule:</strong> If the sentence starts with "If", use a comma in the middle. If "if" is in the middle, NO comma!</li>
              <li><strong>Audio Support:</strong> Click the speaker icon on any sentence to hear crystal-clear American English pronunciation!</li>
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
              onGoGrammar();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 font-bold text-sm border border-purple-500/30 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Open Grammar Lab</span>
          </button>
          <button
            onClick={() => {
              soundManager.playLevelUp();
              onClose();
              onStartQuest();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-95 text-white font-black text-sm shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>I'M READY! START QUEST</span>
          </button>
        </div>
      </div>
    </div>
  );
};
