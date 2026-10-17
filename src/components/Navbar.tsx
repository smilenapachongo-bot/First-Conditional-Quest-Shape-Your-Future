import React, { useState } from 'react';
import { PlayerProfile, Avatar } from '../types';
import { getPlayerLevel } from '../data/playerData';
import { soundManager } from '../utils/audio';
import {
  Volume2,
  VolumeX,
  Music,
  Sparkles,
  Flame,
  HelpCircle,
  Trophy,
  BookOpen,
  Puzzle,
  Award,
  Compass,
  Search,
  Coins,
  Shield,
  User,
  Sliders,
  PenTool,
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  player: PlayerProfile;
  avatars: Avatar[];
  onOpenHowToPlay: () => void;
  onOpenProfileModal: () => void;
  isMuted: boolean;
  setIsMuted: (val: boolean) => void;
  isMusicPlaying: boolean;
  setIsMusicPlaying: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  player,
  avatars,
  onOpenHowToPlay,
  onOpenProfileModal,
  isMuted,
  setIsMuted,
  isMusicPlaying,
  setIsMusicPlaying,
}) => {
  const [showAudioDropdown, setShowAudioDropdown] = useState(false);

  const currentAvatar = avatars.find((a) => a.id === player.avatarId) || avatars[0];
  const levelData = getPlayerLevel(player.score);

  const handleNav = (tabId: string) => {
    soundManager.playClick();
    setCurrentTab(tabId);
  };

  const toggleSound = () => {
    const next = !isMuted;
    soundManager.isSfxMuted = next;
    setIsMuted(next);
    if (!next) {
      soundManager.playClick();
    }
  };

  const toggleMusic = () => {
    const nextState = soundManager.toggleMusic();
    setIsMusicPlaying(nextState);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-indigo-900/40 shadow-2xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          {/* Brand Logo & Title */}
          <button
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 sm:gap-3 text-left group cursor-pointer shrink-0"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-cyan-400 p-0.5 shadow-lg shadow-violet-500/30 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <span className="text-xl sm:text-2xl group-hover:rotate-12 transition-transform">⚡</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm sm:text-base md:text-lg animate-hyper-shimmer bg-gradient-to-r from-amber-300 via-pink-400 via-purple-300 via-cyan-300 to-amber-300 bg-clip-text text-transparent tracking-tight">
                  FIRST CONDITIONAL
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-violet-500/20 text-cyan-300 border border-violet-500/40 hidden xs:inline-block">
                  Quest
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 hidden sm:block font-medium">
                Shape Your Future • A2 English
              </p>
            </div>
          </button>

          {/* Player Game HUD Stats */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Level & XP Progress Indicator */}
            <div className="hidden lg:flex flex-col items-start px-3 py-1.5 rounded-2xl bg-slate-900/90 border border-violet-500/30 text-xs">
              <div className="flex items-center justify-between w-32 text-[10px] font-bold">
                <span className="text-violet-300 flex items-center gap-1">
                  <Shield className="w-3 h-3 text-cyan-400" />
                  <span>Lvl {levelData.levelNumber}</span>
                </span>
                <span className="text-slate-400 font-mono">{levelData.percentToNext}%</span>
              </div>
              <div className="w-32 h-1.5 rounded-full bg-slate-800 overflow-hidden mt-1">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 transition-all duration-500"
                  style={{ width: `${levelData.percentToNext}%` }}
                />
              </div>
            </div>

            {/* Streak Counter */}
            <div
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
                player.streak > 0
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 shadow-md shadow-amber-500/20'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400'
              }`}
              title={`Answer Streak: ${player.streak} (Best: ${player.bestStreak})`}
            >
              <Flame className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${player.streak > 0 ? 'text-amber-400 animate-pulse' : 'text-slate-500'}`} />
              <span>{player.streak}</span>
            </div>

            {/* Virtual Coins 🪙 */}
            <div
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-extrabold shadow-sm"
              title="Virtual Learning Coins"
            >
              <Coins className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span>{player.coins || 0}</span>
            </div>

            {/* Score Points (XP) */}
            <div
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-violet-500/15 border border-violet-500/30 text-violet-300 text-xs sm:text-sm font-extrabold shadow-sm shadow-violet-500/20"
              title="Experience Points (XP)"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
              <span>{player.score} <span className="text-[10px] uppercase text-violet-400/80">xp</span></span>
            </div>

            {/* Audio Controls Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setShowAudioDropdown(!showAudioDropdown);
                }}
                className={`p-2 rounded-xl border text-slate-300 transition cursor-pointer ${
                  isMusicPlaying || !isMuted
                    ? 'bg-slate-900 border-violet-500/40 text-cyan-400'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
                title="Audio Settings"
              >
                <Sliders className="w-4 h-4" />
              </button>

              {showAudioDropdown && (
                <div className="absolute right-0 mt-2 w-52 p-3 rounded-2xl bg-slate-900 border border-violet-500/40 shadow-2xl z-50 space-y-2.5 text-xs text-slate-200 animate-fade-in">
                  <div className="text-[10px] uppercase font-black tracking-wider text-slate-400 pb-1 border-b border-slate-800">
                    Audio Settings
                  </div>

                  {/* Sound FX */}
                  <button
                    onClick={toggleSound}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-800 transition cursor-pointer text-left"
                  >
                    <span className="flex items-center gap-2">
                      {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                      <span>Sound Effects</span>
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isMuted ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                      {isMuted ? 'OFF' : 'ON'}
                    </span>
                  </button>

                  {/* Adventure Ambient Music */}
                  <button
                    onClick={toggleMusic}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-800 transition cursor-pointer text-left"
                  >
                    <span className="flex items-center gap-2">
                      <Music className={`w-4 h-4 ${isMusicPlaying ? 'text-cyan-400 animate-pulse' : 'text-slate-400'}`} />
                      <span>Adventure Music</span>
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isMusicPlaying ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>
                      {isMusicPlaying ? 'ON' : 'OFF'}
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* How to Play Help button */}
            <button
              onMouseEnter={() => soundManager.playHover()}
              onClick={() => {
                soundManager.playClick();
                onOpenHowToPlay();
              }}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 hover:border-cyan-500/40 transition cursor-pointer"
              title="How to Play"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* Player Avatar & My Journey Profile Button */}
            <button
              onMouseEnter={() => soundManager.playHover()}
              onClick={() => {
                soundManager.playClick();
                onOpenProfileModal();
              }}
              className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-violet-500/40 hover:border-cyan-400 transition group cursor-pointer shadow-md"
              title="Open My Learning Journey & Profile"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-cyan-400 flex items-center justify-center text-sm sm:text-base shadow-sm group-hover:scale-105 transition-transform">
                {currentAvatar.emoji}
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-100 max-w-[85px] truncate">
                  {player.name || 'Hero'}
                </span>
                <span className="text-[9px] text-cyan-400 font-medium truncate">
                  {levelData.levelTitle.split(' ')[0]}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex items-center gap-1.5 overflow-x-auto py-2.5 scrollbar-none border-t border-slate-900/90 text-xs sm:text-sm font-semibold">
          <button
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => handleNav('home')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'home'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span>🏠</span>
            <span>Quest Hub</span>
          </button>

          <button
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => handleNav('grammar')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'grammar'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>Grammar Lab</span>
          </button>

          <button
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => handleNav('scenarios')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'scenarios'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Compass className="w-4 h-4 text-blue-400" />
            <span>Smart Scenarios</span>
          </button>

          <button
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => handleNav('matching')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'matching'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Puzzle className="w-4 h-4 text-emerald-400" />
            <span className="flex items-center gap-1.5">
              <span>Match The Future</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-emerald-400/20 text-emerald-200 rounded-full font-bold">16 Pairs</span>
            </span>
          </button>

          <button
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => handleNav('builder')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'builder'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span>🏗️</span>
            <span>Sentence Builder</span>
          </button>

          <button
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => handleNav('fillblank')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'fillblank'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <PenTool className="w-4 h-4 text-cyan-400" />
            <span>Fill Blanks</span>
          </button>

          <button
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => handleNav('detective')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'detective'
                ? 'bg-fuchsia-600 text-white shadow-md shadow-fuchsia-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <span>🕵️</span>
            <span>Detective Mission</span>
          </button>

          <button
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => handleNav('hunter')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'hunter'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Search className="w-4 h-4 text-rose-400" />
            <span>Mistake Hunter</span>
          </button>

          <button
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => handleNav('quiz')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'quiz'
                ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span>Final Quiz</span>
          </button>

          <button
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => handleNav('certificate')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'certificate'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/30'
                : 'text-amber-300 hover:bg-amber-500/10'
            }`}
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>Certificate & Rank</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
