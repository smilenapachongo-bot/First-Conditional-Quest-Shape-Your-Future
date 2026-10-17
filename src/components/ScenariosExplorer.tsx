import React, { useState } from 'react';
import { SCENARIOS_DATA } from '../data/scenariosData';
import { soundManager } from '../utils/audio';
import {
  Compass,
  Volume2,
  Sparkles,
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  ArrowRightLeft,
  Users,
  Laptop,
  Clock,
  Smartphone,
  Leaf,
  GraduationCap,
  Shield,
} from 'lucide-react';

interface ScenariosExplorerProps {
  onEarnPoints: (points: number, reason: string) => void;
}

export const ScenariosExplorer: React.FC<ScenariosExplorerProps> = ({ onEarnPoints }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState(SCENARIOS_DATA[0].id);
  const [selectedSentenceId, setSelectedSentenceId] = useState<string | null>(SCENARIOS_DATA[0].sentences[0].id);
  const [showInverted, setShowInverted] = useState<{ [key: string]: boolean }>({});
  const [exploredScenarios, setExploredScenarios] = useState<{ [key: string]: boolean }>({ [SCENARIOS_DATA[0].id]: true });

  // Check Question State for the active scenario
  const [answeredQuestions, setAnsweredQuestions] = useState<{
    [scenarioId: string]: { selectedIndex: number; isCorrect: boolean };
  }>({});

  const activeScenario = SCENARIOS_DATA.find((s) => s.id === selectedScenarioId) || SCENARIOS_DATA[0];

  const handleSelectScenario = (id: string) => {
    soundManager.playClick();
    setSelectedScenarioId(id);
    const scen = SCENARIOS_DATA.find((s) => s.id === id);
    if (scen && scen.sentences.length > 0) {
      setSelectedSentenceId(scen.sentences[0].id);
    }
    if (!exploredScenarios[id]) {
      setExploredScenarios((prev) => ({ ...prev, [id]: true }));
      onEarnPoints(30, 'Explored educational scenario');
    }
  };

  const toggleSentenceInversion = (sentenceId: string) => {
    soundManager.playClick();
    setShowInverted((prev) => ({ ...prev, [sentenceId]: !prev[sentenceId] }));
  };

  const handleAnswerCheckQuestion = (optIndex: number) => {
    const isCorrect = optIndex === activeScenario.checkQuestion.correctIndex;
    setAnsweredQuestions((prev) => ({
      ...prev,
      [activeScenario.id]: { selectedIndex: optIndex, isCorrect },
    }));

    if (isCorrect) {
      soundManager.playSuccess();
      onEarnPoints(40, `Checked: ${activeScenario.title}`);
    } else {
      soundManager.playError();
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-cyan-300" />;
      case 'Users': return <Users className="w-5 h-5 text-emerald-300" />;
      case 'Laptop': return <Laptop className="w-5 h-5 text-purple-300" />;
      case 'Clock': return <Clock className="w-5 h-5 text-amber-300" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-rose-300" />;
      case 'Shield': return <Shield className="w-5 h-5 text-cyan-300" />;
      case 'Leaf': return <Leaf className="w-5 h-5 text-emerald-300" />;
      default: return <Compass className="w-5 h-5 text-amber-300" />;
    }
  };

  const scenarioAnswerState = answeredQuestions[activeScenario.id];

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border border-blue-500/40 shadow-2xl relative overflow-hidden">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 text-xs font-bold border border-blue-500/40">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Smart Study, Smart Future</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-display text-white tracking-tight">
            REAL-LIFE LEARNING SCENARIOS
          </h1>
          <p className="text-slate-300 text-sm">
            Discover how the First Conditional connects your present choices with exciting future results in study habits, teamwork, technology, exams, and environmental stewardship!
          </p>
        </div>

        {/* Completion tracker */}
        <div className="mt-6 flex items-center gap-3 text-xs font-bold text-slate-300">
          <span>Explored: {Object.keys(exploredScenarios).length} of {SCENARIOS_DATA.length} Scenarios</span>
          <div className="w-36 h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
              style={{ width: `${(Object.keys(exploredScenarios).length / SCENARIOS_DATA.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Grid: Scenario Selector list (Left) + Detailed Scenario Inspector (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Scenario Selection Cards List */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400 px-1">
            Choose a Scenario ({SCENARIOS_DATA.length})
          </div>
          <div className="space-y-2 max-h-[660px] overflow-y-auto pr-1">
            {SCENARIOS_DATA.map((scenario) => {
              const isSelected = scenario.id === selectedScenarioId;
              const isExplored = !!exploredScenarios[scenario.id];
              return (
                <button
                  key={scenario.id}
                  onMouseEnter={() => soundManager.playHover()}
                  onClick={() => handleSelectScenario(scenario.id)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition flex items-center justify-between gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600/20 border-cyan-400 ring-1 ring-cyan-400/40 text-white shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-900/80 border-slate-800 hover:bg-slate-850 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-xl shrink-0 shadow-sm">
                      <span>{scenario.illustrationBadge}</span>
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                        {scenario.category}
                      </div>
                      <div className="text-sm font-bold text-white truncate">
                        {scenario.title}
                      </div>
                    </div>
                  </div>

                  {isExplored && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Scenario & Sentence Inspector */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-violet-500/40 shadow-2xl space-y-6">
            {/* Scenario Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-violet-500/40 flex items-center justify-center text-2xl shadow-md">
                  <span>{activeScenario.illustrationBadge}</span>
                </div>
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-wider text-cyan-400">
                    {activeScenario.category}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white font-display">
                    {activeScenario.title}
                  </h2>
                </div>
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300 flex items-center gap-1.5 self-start sm:self-auto">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>{activeScenario.tip}</span>
              </div>
            </div>

            {/* Context Story */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
              <div className="text-2xl">📖</div>
              <div>
                <span className="text-xs uppercase font-bold text-slate-400">Context & Setting</span>
                <p className="text-sm text-slate-200 mt-0.5 leading-relaxed font-medium">
                  {activeScenario.story}
                </p>
              </div>
            </div>

            {/* Target First Conditional Sentences */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-extrabold tracking-wider text-slate-300">
                  Target Sentences (Click to Inspect & Listen):
                </span>
                <span className="text-[11px] text-slate-400">
                  Tap to see grammar tags
                </span>
              </div>

              <div className="space-y-3">
                {activeScenario.sentences.map((sentence) => {
                  const isSelected = sentence.id === selectedSentenceId;
                  const isInverted = !!showInverted[sentence.id];
                  const currentText = isInverted ? sentence.invertedOrderText : sentence.text;

                  return (
                    <div
                      key={sentence.id}
                      onClick={() => {
                        soundManager.playClick();
                        setSelectedSentenceId(sentence.id);
                      }}
                      className={`p-4 sm:p-5 rounded-2xl border transition cursor-pointer space-y-3 ${
                        isSelected
                          ? 'bg-blue-950/40 border-cyan-400 ring-2 ring-cyan-400/30 shadow-lg'
                          : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex-1">
                          <div className="text-base sm:text-lg font-bold text-white">
                            "{currentText}"
                          </div>
                          <div className="text-xs text-slate-400 mt-1">
                            {sentence.meaning}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            onMouseEnter={() => soundManager.playHover()}
                            onClick={(e) => {
                              e.stopPropagation();
                              soundManager.speak(currentText);
                            }}
                            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 transition cursor-pointer border border-slate-800"
                            title="Listen"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>

                          <button
                            onMouseEnter={() => soundManager.playHover()}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSentenceInversion(sentence.id);
                            }}
                            className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-violet-300 border border-slate-800 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                            title="Toggle inverted order"
                          >
                            <ArrowRightLeft className="w-3.5 h-3.5 text-violet-400" />
                            <span>Invert</span>
                          </button>
                        </div>
                      </div>

                      {/* Expanded Grammar Inspector */}
                      {isSelected && (
                        <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          {/* Condition Box */}
                          <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 space-y-1">
                            <div className="flex items-center justify-between text-cyan-400 font-bold uppercase tracking-wider text-[10px]">
                              <span>Condition (If-Clause)</span>
                              <span>Present Simple</span>
                            </div>
                            <div className="font-semibold text-white">
                              "{sentence.ifClause}"
                            </div>
                            <div className="text-[11px] text-cyan-300/80">
                              Verb: {sentence.ifVerb}
                            </div>
                          </div>

                          {/* Result Box */}
                          <div className="p-3 rounded-xl bg-violet-950/40 border border-violet-500/30 space-y-1">
                            <div className="flex items-center justify-between text-violet-400 font-bold uppercase tracking-wider text-[10px]">
                              <span>Main Clause (Result)</span>
                              <span>Will + Base Verb</span>
                            </div>
                            <div className="font-semibold text-white">
                              "{sentence.resultClause}"
                            </div>
                            <div className="text-[11px] text-violet-300/80">
                              Verb: {sentence.resultVerb}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scenario Check Question */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-violet-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-cyan-400" /> Scenario Quick Check (+40 XP)
                </span>
                {scenarioAnswerState?.isCorrect && (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Correct Answer!
                  </span>
                )}
              </div>

              <div className="text-sm font-bold text-white">
                {activeScenario.checkQuestion.question}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {activeScenario.checkQuestion.options.map((opt, oIdx) => {
                  const isChosen = scenarioAnswerState?.selectedIndex === oIdx;
                  const isCorrectAnswer = oIdx === activeScenario.checkQuestion.correctIndex;

                  let style = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';
                  if (scenarioAnswerState) {
                    if (isCorrectAnswer) {
                      style = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40';
                    } else if (isChosen) {
                      style = 'bg-rose-950/60 border-rose-500 text-rose-200';
                    } else {
                      style = 'bg-slate-900/40 border-slate-900 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={!!scenarioAnswerState?.isCorrect}
                      onMouseEnter={() => soundManager.playHover()}
                      onClick={() => handleAnswerCheckQuestion(oIdx)}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition cursor-pointer ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {scenarioAnswerState && (
                <p className="text-xs text-slate-300 pt-1">
                  <strong>Explanation:</strong> {activeScenario.checkQuestion.explanation}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
