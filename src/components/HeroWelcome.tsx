import React, { useState } from 'react';
import { PlayerProfile, Avatar } from '../types';
import { soundManager } from '../utils/audio';
import { AdventurerHeroIllustration } from './AdventurerHeroIllustration';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  Volume2,
  Flame,
  Award,
  ChevronRight,
  Zap,
  Puzzle,
  Compass,
  PenTool,
  Search,
  Trophy,
} from 'lucide-react';

interface HeroWelcomeProps {
  player: PlayerProfile;
  setPlayer: React.Dispatch<React.SetStateAction<PlayerProfile>>;
  avatars: Avatar[];
  onStartQuest: () => void;
  onLearnGrammar: () => void;
  onExploreScenarios: () => void;
  onOpenFillBlank: () => void;
  onOpenDetective: () => void;
  onOpenSentenceBuilder: () => void;
  onOpenMistakeHunter: () => void;
  onOpenQuiz: () => void;
}

export const HeroWelcome: React.FC<HeroWelcomeProps> = ({
  player,
  setPlayer,
  avatars,
  onStartQuest,
  onLearnGrammar,
  onExploreScenarios,
  onOpenFillBlank,
  onOpenDetective,
  onOpenSentenceBuilder,
  onOpenMistakeHunter,
  onOpenQuiz,
}) => {
  const [interactiveChoice, setInteractiveChoice] = useState<'study' | 'team' | 'tech'>('study');
  const [isTurbo3d, setIsTurbo3d] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleAvatarSelect = (avatarId: string) => {
    soundManager.playClick();
    setPlayer((prev) => ({ ...prev, avatarId }));
  };

  const handleNameChange = (name: string) => {
    setPlayer((prev) => ({ ...prev, name }));
  };

  // Calculate overall quest completion percentage
  const totalBadges = 8;
  const progressPercent = Math.min(
    100,
    Math.round(((player.unlockedBadges.length / totalBadges) * 0.5 + Math.min(player.score, 1800) / 3600) * 100)
  );

  const decisionScenarios = {
    study: {
      action: 'If I study 20 minutes every day,',
      result: 'I will speak English with confidence and pass my exams.',
      icon: '📚',
      badgeText: 'Daily Study',
      color: 'indigo',
    },
    team: {
      action: 'If we collaborate with our classmates,',
      result: 'we will complete the science project in record time.',
      icon: '🤝',
      badgeText: 'Teamwork',
      color: 'emerald',
    },
    tech: {
      action: 'If she practices with interactive learning apps,',
      result: 'she will master new vocabulary and pronunciation naturally.',
      icon: '📱',
      badgeText: 'EdTech Practice',
      color: 'purple',
    },
  };

  const activeScenario = decisionScenarios[interactiveChoice];

  const handleBannerMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 24;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -24;
    setTilt({ x, y });
  };

  const handleBannerMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const toggleTurbo3d = () => {
    const next = !isTurbo3d;
    setIsTurbo3d(next);
    if (next) {
      soundManager.playPowerBounce();
      confetti({ particleCount: 75, spread: 80, origin: { y: 0.5 } });
    } else {
      soundManager.playClick();
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Banner Section with 3D Mouse Parallax & Deep Space Atmosphere */}
      <div
        onMouseMove={handleBannerMouseMove}
        onMouseLeave={handleBannerMouseLeave}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900/95 via-indigo-950/70 to-slate-950 border border-violet-500/30 p-6 sm:p-10 lg:p-12 shadow-2xl transition-transform duration-300"
      >
        {/* Floating 3D Grammar Runes with Parallax Physics */}
        <div className="absolute top-5 left-6 animate-float-rune-1 pointer-events-none hidden md:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] backdrop-blur-md z-10">
          <span>🟢 Condition:</span>
          <span>If + Present Simple</span>
        </div>

        <div className="absolute top-8 right-12 animate-float-rune-2 pointer-events-none hidden md:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-mono font-bold shadow-[0_0_15px_rgba(59,130,246,0.3)] backdrop-blur-md z-10">
          <span>🔵 Future Result:</span>
          <span>will + base verb</span>
        </div>

        {/* Ambient background light gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/40 text-cyan-300 text-xs sm:text-sm font-bold shadow-sm">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>A2 Level Educational Quest</span>
              </div>

              {/* Turbo 3D Toggle */}
              <button
                onClick={toggleTurbo3d}
                onMouseEnter={() => soundManager.playHover()}
                className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
                  isTurbo3d
                    ? 'bg-gradient-to-r from-pink-500 to-amber-500 text-white shadow-pink-500/40 animate-pulse'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700'
                }`}
                title="Toggle Super 3D Bouncing Mode!"
              >
                <span>⚡</span>
                <span>{isTurbo3d ? 'TURBO 3D ACTIVE!' : 'ENABLE TURBO 3D'}</span>
              </button>
            </div>

            <div className="space-y-4">
              {/* Dynamic 3D Rotating, Bouncing & Super-Glowing Title Container */}
              <div className="perspective-container py-3">
                <div
                  onMouseEnter={() => soundManager.playHover()}
                  onClick={() => {
                    soundManager.playPowerBounce();
                    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
                  }}
                  className={`relative inline-block ${
                    isTurbo3d ? 'animate-3d-hyper-crazy' : 'animate-3d-bounce-rotate'
                  } preserve-3d cursor-pointer select-none group transition-transform duration-150`}
                  style={{
                    transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                  }}
                  title="Click for Power Bounce + Sounds!"
                >
                  {/* Blinding Multi-Spectrum Aura */}
                  <div className="absolute -inset-4 sm:-inset-10 bg-gradient-to-r from-pink-500/60 via-purple-600/60 via-cyan-400/60 to-amber-400/60 rounded-[40px] blur-3xl animate-super-aura -z-10 pointer-events-none" />

                  {/* Top 3D Floating Badge */}
                  <div className="flex items-center gap-2 mb-3 preserve-3d" style={{ transform: 'translateZ(35px)' }}>
                    <span className="inline-block animate-star-orbit text-2xl sm:text-3xl filter drop-shadow-[0_0_12px_#fbbf24]">⭐</span>
                    <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500/30 via-pink-500/30 to-purple-500/30 border border-amber-400/70 text-xs sm:text-sm font-black uppercase tracking-widest text-amber-300 font-mono shadow-[0_0_25px_rgba(251,191,36,0.7)] backdrop-blur-md">
                      ✨ 3D INTERACTIVE QUEST ARENA ✨
                    </span>
                    <span className="inline-block animate-star-orbit text-2xl sm:text-3xl filter drop-shadow-[0_0_12px_#38bdf8]">⚡</span>
                  </div>

                  {/* Main 3D Text Header with Light Flare Overlay */}
                  <div className="relative overflow-hidden rounded-2xl preserve-3d p-1">
                    <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/90 to-transparent skew-x-[-25deg] pointer-events-none animate-light-flare z-20" />

                    <h1
                      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight leading-[1.15]"
                      style={{ transform: 'translateZ(55px)' }}
                    >
                      <span className="block text-white text-3d-cyan tracking-wide filter drop-shadow-[0_0_25px_rgba(56,189,248,0.9)]">
                        FIRST CONDITIONAL QUEST
                      </span>
                      <span className="block mt-1 sm:mt-2 animate-hyper-shimmer bg-gradient-to-r from-yellow-300 via-pink-400 via-purple-300 via-cyan-300 via-rose-300 to-yellow-300 bg-clip-text text-transparent text-3d-gold filter drop-shadow-[0_0_40px_rgba(251,191,36,0.95)] drop-shadow-[0_0_80px_rgba(236,72,153,0.9)]">
                        Shape Your Future!
                      </span>
                    </h1>
                  </div>

                  <div
                    className="h-2 w-4/5 bg-gradient-to-r from-amber-400 via-pink-500 via-cyan-400 to-purple-500 rounded-full shadow-[0_0_25px_rgba(236,72,153,0.95)] mt-2.5"
                    style={{ transform: 'translateZ(30px)' }}
                  />
                </div>
              </div>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium max-w-2xl">
                Make smart choices, predict future results, and master the First Conditional through exciting educational challenges!
              </p>
            </div>

            {/* Interactive Decision Lab in Hero */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-violet-500/40 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> Test A Real Decision:
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-violet-500/20 text-cyan-300 font-semibold">
                  {activeScenario.badgeText}
                </span>
              </div>

              {/* Selector buttons */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onMouseEnter={() => soundManager.playHover()}
                  onClick={() => {
                    soundManager.playClick();
                    setInteractiveChoice('study');
                  }}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    interactiveChoice === 'study'
                      ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                      : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span>📚</span>
                  <span className="hidden sm:inline">Daily Study</span>
                </button>
                <button
                  onMouseEnter={() => soundManager.playHover()}
                  onClick={() => {
                    soundManager.playClick();
                    setInteractiveChoice('team');
                  }}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    interactiveChoice === 'team'
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                      : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span>🤝</span>
                  <span className="hidden sm:inline">Teamwork</span>
                </button>
                <button
                  onMouseEnter={() => soundManager.playHover()}
                  onClick={() => {
                    soundManager.playClick();
                    setInteractiveChoice('tech');
                  }}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    interactiveChoice === 'tech'
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                      : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span>📱</span>
                  <span className="hidden sm:inline">EdTech</span>
                </button>
              </div>

              {/* Formula visualization */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
                <div className="flex-1">
                  <div className="text-cyan-400 font-bold flex items-center gap-1.5 text-xs sm:text-sm">
                    <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-[10px] uppercase font-mono text-cyan-300">Condition</span>
                    <span>{activeScenario.action}</span>
                  </div>
                  <div className="text-violet-300 font-semibold flex items-center gap-1.5 text-xs sm:text-sm mt-1">
                    <span className="px-1.5 py-0.5 rounded bg-violet-500/20 text-[10px] uppercase font-mono text-violet-200">Future Result</span>
                    <span>{activeScenario.result}</span>
                  </div>
                </div>
                <button
                  onMouseEnter={() => soundManager.playHover()}
                  onClick={() => soundManager.speak(`${activeScenario.action} ${activeScenario.result}`)}
                  className="p-2 self-end sm:self-center rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer border border-slate-800"
                  title="Listen to pronunciation"
                >
                  <Volume2 className="w-4 h-4 text-cyan-400" />
                </button>
              </div>
            </div>

            {/* Main Action Buttons with Glowing Energy Border Animation */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              {/* START YOUR QUEST with animated energy border */}
              <div className="relative group p-[2px] rounded-2xl overflow-hidden shadow-2xl">
                {/* Continuous glowing energy beam running along button border on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-fuchsia-500 via-amber-400 to-cyan-400 animate-shimmer-sweep opacity-75 group-hover:opacity-100 transition-opacity" />
                <button
                  onMouseEnter={() => soundManager.playHover()}
                  onClick={() => {
                    soundManager.playLevelUp();
                    onStartQuest();
                  }}
                  className="relative w-full px-8 py-4 rounded-[14px] bg-slate-950 hover:bg-slate-900 text-white font-black text-base flex items-center justify-center gap-2.5 transition-transform group-hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
                >
                  <span className="bg-gradient-to-r from-cyan-300 via-white to-pink-300 bg-clip-text text-transparent">
                    START YOUR QUEST
                  </span>
                  <ArrowRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>

              {/* LEARN THE GRAMMAR Button */}
              <button
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => {
                  soundManager.playClick();
                  onLearnGrammar();
                }}
                className="px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800/90 text-slate-200 hover:text-white font-bold text-base border border-violet-500/40 flex items-center justify-center gap-2 transition hover:scale-[1.02] cursor-pointer shadow-lg shadow-violet-950/40"
              >
                <BookOpen className="w-5 h-5 text-violet-400 group-hover:rotate-6 transition-transform" />
                <span>LEARN THE GRAMMAR</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Explorer Character & Player Setup */}
          <div className="lg:col-span-5 space-y-6">
            {/* Custom High-Quality Adventurer Explorer Illustration */}
            <div className="relative p-2 rounded-3xl bg-slate-900/40 border border-violet-500/20 backdrop-blur-sm overflow-hidden">
              <AdventurerHeroIllustration />
            </div>

            {/* Player Identity Card */}
            <div className="p-5 rounded-3xl bg-slate-900/80 border border-violet-500/40 shadow-2xl backdrop-blur-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs uppercase font-extrabold tracking-wider text-cyan-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Adventurer Profile
                </span>
                <span className="text-xs font-black text-amber-400">
                  {player.score} XP
                </span>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase text-slate-400">
                  Player Alias:
                </label>
                <input
                  type="text"
                  maxLength={25}
                  value={player.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Enter your student alias..."
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-xl text-white font-bold text-xs outline-none transition"
                />
              </div>

              {/* Avatar Selector */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase text-slate-400">
                  Choose Hero Avatar:
                </label>
                <div className="grid grid-cols-6 gap-1.5">
                  {avatars.map((avatar) => {
                    const isSelected = player.avatarId === avatar.id;
                    return (
                      <button
                        key={avatar.id}
                        onMouseEnter={() => soundManager.playHover()}
                        onClick={() => handleAvatarSelect(avatar.id)}
                        className={`p-1.5 rounded-xl border transition flex flex-col items-center cursor-pointer ${
                          isSelected
                            ? 'bg-violet-600/40 border-cyan-400 ring-2 ring-cyan-400/40 scale-105'
                            : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                        }`}
                        title={avatar.name}
                      >
                        <span className="text-lg">{avatar.emoji}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Progress Tracker */}
              <div className="pt-2 border-t border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-400" /> Quest Completion
                  </span>
                  <span className="text-cyan-400 font-mono">{progressPercent}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 transition-all duration-500"
                    style={{ width: `${Math.max(5, progressPercent)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights Grid - 8 Interactive Learning Arenas */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🗺️</span>
            <h2 className="text-xl sm:text-2xl font-black text-white font-display">
              Quest Challenge Arenas
            </h2>
          </div>
          <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full">
            8 Practice Modes Available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* 1. Match The Future */}
          <div
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => {
              soundManager.playClick();
              onStartQuest();
            }}
            className="group relative p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-emerald-500/30 hover:border-emerald-400 transition-all shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-1 cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                <Puzzle className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-base font-bold text-white font-display group-hover:text-emerald-300 transition-colors">
                Match The Future
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Connect 16 condition halves with probable future results. Build fiery combo streaks!
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-400">
              <span>16 Sentence Pairs</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 2. Grammar Lab */}
          <div
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => {
              soundManager.playClick();
              onLearnGrammar();
            }}
            className="group relative p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-violet-500/30 hover:border-violet-400 transition-all shadow-xl hover:shadow-violet-500/20 hover:-translate-y-1 cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-violet-500/20 border border-violet-500/40 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5 text-violet-400" />
              </div>
              <h3 className="text-base font-bold text-white font-display group-hover:text-violet-300 transition-colors">
                Grammar Lab
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Interactive formula workbench, affirmative/negative/question toggles, and clause order flips.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-violet-400">
              <span>Formulas & Audio</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 3. Real-Life Scenarios */}
          <div
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => {
              soundManager.playClick();
              onExploreScenarios();
            }}
            className="group relative p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-blue-500/30 hover:border-blue-400 transition-all shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1 cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                <Compass className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-base font-bold text-white font-display group-hover:text-blue-300 transition-colors">
                Smart Scenarios
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                8 student situations: study habits, classroom teamwork, exam prep, and digital learning.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-blue-400">
              <span>8 Real Stories</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 4. Sentence Builder */}
          <div
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => {
              soundManager.playClick();
              onOpenSentenceBuilder();
            }}
            className="group relative p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-amber-500/30 hover:border-amber-400 transition-all shadow-xl hover:shadow-amber-500/20 hover:-translate-y-1 cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                <span className="text-xl">🏗️</span>
              </div>
              <h3 className="text-base font-bold text-white font-display group-hover:text-amber-300 transition-colors">
                Sentence Builder
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Reorder scrambled word tiles into correct grammatical order. Watch punctuation and commas!
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-amber-400">
              <span>Tile Puzzles</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 5. Fill in the Blanks */}
          <div
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => {
              soundManager.playClick();
              onOpenFillBlank();
            }}
            className="group relative p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 transition-all shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-1 cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                <PenTool className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-base font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                Fill The Blanks
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Choose the correct verb form for condition or result clauses to complete the statement.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-cyan-400">
              <span>Quick Drills</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 6. Detective Mission */}
          <div
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => {
              soundManager.playClick();
              onOpenDetective();
            }}
            className="group relative p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-fuchsia-500/30 hover:border-fuchsia-400 transition-all shadow-xl hover:shadow-fuchsia-500/20 hover:-translate-y-1 cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-fuchsia-500/20 border border-fuchsia-500/40 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                <span className="text-xl">🕵️</span>
              </div>
              <h3 className="text-base font-bold text-white font-display group-hover:text-fuchsia-300 transition-colors">
                Detective Mission
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Crack a high-school mystery using First Conditional deductions and cause-and-effect clues!
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-fuchsia-400">
              <span>Mystery Case</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 7. Mistake Hunter */}
          <div
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => {
              soundManager.playClick();
              onOpenMistakeHunter();
            }}
            className="group relative p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-rose-500/30 hover:border-rose-400 transition-all shadow-xl hover:shadow-rose-500/20 hover:-translate-y-1 cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                <Search className="w-5 h-5 text-rose-400" />
              </div>
              <h3 className="text-base font-bold text-white font-display group-hover:text-rose-300 transition-colors">
                Mistake Hunter
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Spot classic ESL traps: double "will", missing "-s", forgotten commas, and negative errors.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-rose-400">
              <span>Error Detective</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 8. Final Quiz & Certificate */}
          <div
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => {
              soundManager.playClick();
              onOpenQuiz();
            }}
            className="group relative p-5 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-amber-400/40 hover:border-amber-400 transition-all shadow-xl hover:shadow-amber-500/20 hover:-translate-y-1 cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
                <Trophy className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-base font-bold text-white font-display group-hover:text-amber-300 transition-colors">
                Final Boss Quiz
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                10 comprehensive questions to test your mastery and unlock your official personalized Certificate!
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-amber-300">
              <span>Mastery Award</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
