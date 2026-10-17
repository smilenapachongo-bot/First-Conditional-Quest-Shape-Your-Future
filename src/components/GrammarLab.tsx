import React, { useState } from 'react';
import {
  GRAMMAR_STRUCTURE_DATA,
  GRAMMAR_FORMS_DATA,
  GRAMMAR_COMMON_MISTAKES,
} from '../data/grammarData';
import { soundManager } from '../utils/audio';
import {
  Volume2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRightLeft,
  Sparkles,
  Lightbulb,
  AlertTriangle,
  Layers,
  FileCheck,
  Clock,
  ArrowRight,
  Eye,
  EyeOff,
  Check,
  BookOpen,
} from 'lucide-react';

interface GrammarLabProps {
  onEarnPoints: (points: number, reason: string) => void;
}

export const GrammarLab: React.FC<GrammarLabProps> = ({ onEarnPoints }) => {
  const [activeTab, setActiveTab] = useState<'structure' | 'forms' | 'rules'>('structure');
  const [flippedSentence, setFlippedSentence] = useState(false);
  const [testedExamples, setTestedExamples] = useState<{ [key: string]: boolean }>({});
  const [revealedExplanations, setRevealedExplanations] = useState<{ [key: string]: boolean }>({});

  // Quick interactive checks
  const [checkAnswer, setCheckAnswer] = useState<number | null>(null);
  const [checkSubmitted, setCheckSubmitted] = useState<boolean>(false);
  const [ruleCheckAnswers, setRuleCheckAnswers] = useState<{ [key: string]: number }>({});
  const [ruleCheckFeedback, setRuleCheckFeedback] = useState<{ [key: string]: boolean }>({});

  const handleFlipSentence = () => {
    soundManager.playClick();
    setFlippedSentence(!flippedSentence);
  };

  const toggleRevealExplanation = (key: string) => {
    soundManager.playClick();
    setRevealedExplanations((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTestSentence = (id: string, text: string) => {
    soundManager.speak(text);
    if (!testedExamples[id]) {
      setTestedExamples((prev) => ({ ...prev, [id]: true }));
      onEarnPoints(25, 'Listened to grammar example');
    }
  };

  const handleQuizSubmit = (selectedIdx: number) => {
    setCheckAnswer(selectedIdx);
    setCheckSubmitted(true);
    if (selectedIdx === 1) {
      soundManager.playSuccess();
      onEarnPoints(50, 'Completed Grammar Lab Quick Check');
    } else {
      soundManager.playError();
    }
  };

  // Grammar Mastery Calculation
  const totalItems = 5 + GRAMMAR_FORMS_DATA.length + GRAMMAR_COMMON_MISTAKES.length;
  const inspectedCount = Object.keys(testedExamples).length + (checkSubmitted ? 1 : 0);
  const masteryPercent = Math.min(100, Math.round((inspectedCount / totalItems) * 100));

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-violet-950/80 via-slate-900 to-indigo-950/80 border border-violet-500/40 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 text-cyan-300 text-xs font-bold border border-violet-500/40">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Interactive Knowledge Base</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-display text-white tracking-tight">
              GRAMMAR LAB: THE FIRST CONDITIONAL
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl">
              Discover how English speakers talk about real possibilities and their future consequences. Listen, experiment with sentence orders, and avoid common traps!
            </p>
          </div>

          {/* Grammar Mastery Indicator */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-violet-500/30 text-xs text-slate-300 space-y-2 w-full md:w-56 shrink-0 shadow-lg">
            <div className="flex items-center justify-between font-bold">
              <span className="text-violet-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Lab Mastery</span>
              </span>
              <span className="text-cyan-400 font-mono">{masteryPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${masteryPercent}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-400 text-right">
              {inspectedCount} of {totalItems} items explored
            </div>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="mt-8 flex flex-wrap gap-2 border-t border-slate-800/80 pt-4">
          <button
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => {
              soundManager.playClick();
              setActiveTab('structure');
            }}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'structure'
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>A. Structure, Timeline & Form</span>
          </button>

          <button
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => {
              soundManager.playClick();
              setActiveTab('forms');
            }}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'forms'
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <FileCheck className="w-4 h-4 text-fuchsia-400" />
            <span>B. Affirmative, Negative & Questions</span>
          </button>

          <button
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => {
              soundManager.playClick();
              setActiveTab('rules');
            }}
            className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'rules'
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>C. Grammar Rules & Common Pitfalls</span>
          </button>
        </div>
      </div>

      {/* TAB CONTENT A: STRUCTURE & TIMELINE */}
      {activeTab === 'structure' && (
        <div className="space-y-8 animate-fade-in">
          {/* Animated Interactive Timeline */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-violet-500/40 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                <h2 className="text-lg sm:text-xl font-black text-white font-display">
                  Visual Timeline: How Time Works in First Conditional
                </h2>
              </div>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Cause & Consequence
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              In English, the condition takes place in the <strong>present or near future</strong> using the <strong>Present Simple</strong>. Once that condition happens, the <strong>probable future result</strong> occurs using <strong>will + base verb</strong>.
            </p>

            {/* Interactive Timeline Graph */}
            <div className="relative p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                {/* Step 1: Present Condition */}
                <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/40 space-y-2 relative">
                  <div className="flex items-center justify-between text-xs font-bold text-cyan-300">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                      <span>Time: PRESENT (t₀)</span>
                    </span>
                    <span className="text-[10px] font-mono bg-cyan-500/20 px-2 py-0.5 rounded">Present Simple</span>
                  </div>
                  <div className="text-base sm:text-lg font-black text-white">
                    "If students organize their time..."
                  </div>
                  <p className="text-xs text-slate-300">
                    The condition is real, habitual, and completely achievable today.
                  </p>
                </div>

                {/* Step 2: Future Consequence */}
                <div className="p-4 rounded-xl bg-violet-950/30 border border-violet-500/40 space-y-2 relative">
                  <div className="flex items-center justify-between text-xs font-bold text-violet-300">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-violet-400" />
                      <span>Time: FUTURE (t₁)</span>
                    </span>
                    <span className="text-[10px] font-mono bg-violet-500/20 px-2 py-0.5 rounded">will + base verb</span>
                  </div>
                  <div className="text-base sm:text-lg font-black text-white">
                    "...they will complete their assignments."
                  </div>
                  <p className="text-xs text-slate-300">
                    The direct future benefit triggered by the present condition.
                  </p>
                </div>
              </div>

              {/* Connecting Vector Arrow */}
              <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-amber-300">
                <span>[ Real Condition Today ]</span>
                <ArrowRight className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>[ Guaranteed Probable Result Tomorrow ]</span>
              </div>
            </div>
          </div>

          {/* The Golden Formula Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-700/80 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-white font-display flex items-center gap-2">
                <span>⚡</span> The Core Formula
              </h2>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
                Universal Rule
              </span>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-slate-950 border border-violet-500/40 text-center space-y-3">
              <div className="text-xs uppercase font-extrabold tracking-widest text-slate-400">
                Formula Pattern:
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-300 to-pink-400 font-display">
                If + Present Simple, will + base verb
              </div>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
                Use this structure when a future outcome is <strong>realistic and probable</strong> once the condition is met.
              </p>
            </div>

            {/* Two components breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {GRAMMAR_STRUCTURE_DATA.mainComponents.map((comp, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border ${
                    comp.color === 'emerald'
                      ? 'bg-cyan-950/20 border-cyan-500/40'
                      : 'bg-violet-950/20 border-violet-500/40'
                  } space-y-3`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-black uppercase tracking-wider ${
                      comp.color === 'emerald' ? 'text-cyan-400' : 'text-violet-400'
                    }`}>
                      {comp.part}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded bg-slate-950 text-white font-mono font-bold">
                      {comp.tense}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {comp.function}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-xs sm:text-sm font-semibold text-white">
                    {comp.example}
                  </div>

                  <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{comp.ruleHighlight}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Clause Order Flipper with Comma Indicator */}
            <div className="p-5 sm:p-6 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                    <ArrowRightLeft className="w-4 h-4 text-cyan-400" />
                    <span>Interactive Order Flipper: Notice the Comma!</span>
                  </h3>
                  <p className="text-xs text-slate-300">
                    Click the button to flip the clauses and see how punctuation changes automatically.
                  </p>
                </div>
                <button
                  onMouseEnter={() => soundManager.playHover()}
                  onClick={handleFlipSentence}
                  className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer self-start sm:self-auto shadow-md"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  <span>Flip Clause Order</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-base sm:text-lg font-bold text-center">
                {!flippedSentence ? (
                  <div className="text-slate-100 flex flex-wrap items-center justify-center gap-1.5">
                    <span className="text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">
                      If students study regularly
                    </span>
                    <span className="text-amber-400 font-black text-2xl animate-bounce">,</span>
                    <span className="text-violet-400 bg-violet-500/10 px-2.5 py-0.5 rounded border border-violet-500/20">
                      they will improve their English.
                    </span>
                    <span className="text-xs text-slate-400 block w-full mt-2 font-normal">
                      (Condition first → <strong>COMMA (,) required!</strong>)
                    </span>
                  </div>
                ) : (
                  <div className="text-slate-100 flex flex-wrap items-center justify-center gap-1.5">
                    <span className="text-violet-400 bg-violet-500/10 px-2.5 py-0.5 rounded border border-violet-500/20">
                      Students will improve their English
                    </span>
                    <span className="text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">
                      if they study regularly.
                    </span>
                    <span className="text-xs text-amber-300 block w-full mt-2 font-normal">
                      (Main clause first → <strong>NO COMMA needed before "if"!</strong>)
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Standard Required Examples with Revealable Explanations */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-700/80 shadow-xl space-y-4">
            <h3 className="text-lg font-extrabold text-white font-display flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <span>Core Examples with Audio & Explanations</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Listen to each sentence, inspect the condition/result tags, and toggle the explanation:
            </p>

            <div className="space-y-3">
              {GRAMMAR_STRUCTURE_DATA.standardExamples.map((ex, idx) => {
                const isRevealed = revealedExplanations[`ex-${idx}`];
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-violet-500/40 transition space-y-3"
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                      <div className="space-y-1 flex-1">
                        <div className="text-sm sm:text-base font-bold text-white flex flex-wrap items-center gap-1.5">
                          <span className="text-cyan-300">{ex.ifPart}</span>
                          <span className="text-amber-400 font-bold">,</span>
                          <span className="text-violet-300">{ex.resultPart}.</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end md:self-auto">
                        <button
                          onMouseEnter={() => soundManager.playHover()}
                          onClick={() => handleTestSentence(`ex-${idx}`, ex.full)}
                          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-700 flex items-center gap-1.5 text-xs font-bold transition cursor-pointer"
                          title="Listen to pronunciation"
                        >
                          <Volume2 className="w-4 h-4" />
                          <span>Listen</span>
                        </button>

                        <button
                          onMouseEnter={() => soundManager.playHover()}
                          onClick={() => toggleRevealExplanation(`ex-${idx}`)}
                          className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 flex items-center gap-1.5 text-xs font-bold transition cursor-pointer"
                        >
                          {isRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          <span>{isRevealed ? 'Hide' : 'Explain'}</span>
                        </button>
                      </div>
                    </div>

                    {isRevealed && (
                      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 animate-fade-in">
                        <span className="font-bold text-cyan-300">Context: </span>
                        {ex.situation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT B: AFFIRMATIVE, NEGATIVE & QUESTIONS */}
      {activeTab === 'forms' && (
        <div className="space-y-8 animate-fade-in">
          <div className="grid grid-cols-1 gap-6">
            {GRAMMAR_FORMS_DATA.map((form, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-900/80 border border-violet-500/30 shadow-xl space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">
                      {idx === 0 ? '✨' : idx === 1 ? '🛑' : '❓'}
                    </span>
                    <h3 className="text-lg font-extrabold text-white font-display">
                      {form.type} Form
                    </h3>
                  </div>
                  <button
                    onMouseEnter={() => soundManager.playHover()}
                    onClick={() => soundManager.speak(form.example)}
                    className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-cyan-400 border border-slate-800 transition cursor-pointer"
                    title="Listen to sentence"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Formula box */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300">
                  <span className="text-slate-400 font-sans font-bold">Formula: </span>
                  {form.formula}
                </div>

                {/* Main Example with Tokens */}
                <div className="space-y-2">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
                    Sentence Breakdown:
                  </span>
                  <div className="flex flex-wrap gap-2 items-center">
                    {form.breakdown.map((part, pIdx) => (
                      <div
                        key={pIdx}
                        className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col"
                      >
                        <span className="text-sm font-bold text-white">{part.text}</span>
                        <span className="text-[10px] text-cyan-400 font-medium">
                          {part.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {form.explanation}
                </p>

                {/* Extra Example */}
                <div className="p-3 rounded-xl bg-violet-950/20 border border-violet-500/20 text-xs sm:text-sm text-slate-300 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-violet-300">More Practice: </span>
                    <span>"{form.extraExample}"</span>
                  </div>
                  <button
                    onMouseEnter={() => soundManager.playHover()}
                    onClick={() => soundManager.speak(form.extraExample)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT C: RULES & COMMON MISTAKES */}
      {activeTab === 'rules' && (
        <div className="space-y-8 animate-fade-in">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-700/80 shadow-xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-rose-500/20 text-rose-400">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-white font-display">
                  Watch Out! Common Student Traps
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Master these 4 traps and your First Conditional will be 100% accurate!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {GRAMMAR_COMMON_MISTAKES.map((mistake) => (
                <div
                  key={mistake.id}
                  className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition space-y-4 shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>⚠️</span> {mistake.title}
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">
                      {mistake.badge}
                    </span>
                  </div>

                  {/* Wrong sentence */}
                  <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] uppercase font-bold text-rose-400">Incorrect</div>
                      <div className="text-xs sm:text-sm font-semibold text-rose-200 line-through">
                        {mistake.wrong}
                      </div>
                    </div>
                  </div>

                  {/* Correct sentence */}
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] uppercase font-bold text-emerald-400">Correct</div>
                      <div className="text-xs sm:text-sm font-bold text-emerald-200">
                        {mistake.correct}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {mistake.ruleExplanation}
                  </p>

                  <div className="text-[11px] font-bold text-amber-300 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{mistake.tip}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Check Mini-Challenge */}
          <div className="p-6 rounded-3xl bg-violet-950/40 border border-violet-500/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-extrabold text-cyan-300 tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-cyan-400" /> Quick Lab Check (+50 pts)
              </span>
              {checkSubmitted && checkAnswer === 1 && (
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Correct! +50 XP
                </span>
              )}
            </div>

            <p className="text-sm sm:text-base font-bold text-white">
              Which sentence uses the First Conditional properly without errors?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                'If I will study hard, I will pass.',
                'If I study hard, I will pass.',
                'If I study hard, I passed.',
              ].map((opt, idx) => {
                const isSelected = checkAnswer === idx;
                return (
                  <button
                    key={idx}
                    disabled={checkSubmitted}
                    onMouseEnter={() => soundManager.playHover()}
                    onClick={() => handleQuizSubmit(idx)}
                    className={`p-3.5 rounded-2xl border text-xs sm:text-sm font-bold text-left transition cursor-pointer ${
                      checkSubmitted
                        ? idx === 1
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                          : isSelected
                          ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                          : 'bg-slate-950/60 border-slate-800 text-slate-500'
                        : isSelected
                        ? 'bg-violet-600 border-violet-500 text-white'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200'
                    }`}
                  >
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
