import React, { useState } from 'react';
import { PlayerProfile, Avatar } from '../types';
import { BADGES, getPlayerLevel } from '../data/playerData';
import { soundManager } from '../utils/audio';
import {
  X,
  Check,
  User,
  Sparkles,
  Flame,
  Star,
  Trophy,
  Coins,
  Shield,
  Target,
  Award,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  player: PlayerProfile;
  setPlayer: React.Dispatch<React.SetStateAction<PlayerProfile>>;
  avatars: Avatar[];
  onResetProgress: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  player,
  setPlayer,
  avatars,
  onResetProgress,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'stats' | 'badges'>('profile');
  const [tempName, setTempName] = useState(player.name);
  const [selectedAvatarId, setSelectedAvatarId] = useState(player.avatarId);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  if (!isOpen) return null;

  const currentAvatar = avatars.find((a) => a.id === selectedAvatarId) || avatars[0];
  const levelData = getPlayerLevel(player.score);

  const handleSave = () => {
    soundManager.playSuccess();
    setPlayer((prev) => ({
      ...prev,
      name: tempName.trim() || 'Hero Learner',
      avatarId: selectedAvatarId,
    }));
    onClose();
  };

  const handleConfirmReset = () => {
    soundManager.playClick();
    onResetProgress();
    setShowResetConfirm(false);
    onClose();
  };

  const accuracyRate =
    player.accuracy.total > 0
      ? Math.round((player.accuracy.correct / player.accuracy.total) * 100)
      : 95;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl my-6 bg-slate-900 border border-violet-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-700 p-5 sm:p-6 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-md">
              {currentAvatar.emoji}
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono tracking-widest text-violet-200">
                Lvl {levelData.levelNumber}: {levelData.levelTitle}
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight">
                MY LEARNING JOURNEY
              </h2>
            </div>
          </div>

          <button
            onMouseEnter={() => soundManager.playHover()}
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation inside Modal */}
        <div className="flex items-center gap-1 p-2 bg-slate-950 border-b border-slate-800 text-xs font-bold shrink-0">
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('profile');
            }}
            className={`flex-1 py-2 rounded-xl transition cursor-pointer text-center ${
              activeTab === 'profile'
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Avatar & Identity
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('stats');
            }}
            className={`flex-1 py-2 rounded-xl transition cursor-pointer text-center ${
              activeTab === 'stats'
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Stats & Recommendations
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('badges');
            }}
            className={`flex-1 py-2 rounded-xl transition cursor-pointer text-center ${
              activeTab === 'badges'
                ? 'bg-violet-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Badges Gallery ({player.unlockedBadges.length}/8)
          </button>
        </div>

        {/* Content body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Alias input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Player Name / Nickname
                </label>
                <input
                  type="text"
                  value={tempName}
                  maxLength={25}
                  onChange={(e) => setTempName(e.target.value)}
                  placeholder="Enter your student alias..."
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-2xl text-white font-bold text-sm outline-none transition"
                />
              </div>

              {/* Avatar Selector Grid */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Select Your Quest Character
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {avatars.map((avatar) => {
                    const isSelected = selectedAvatarId === avatar.id;
                    return (
                      <button
                        key={avatar.id}
                        onMouseEnter={() => soundManager.playHover()}
                        onClick={() => {
                          soundManager.playClick();
                          setSelectedAvatarId(avatar.id);
                        }}
                        className={`p-3 rounded-2xl border flex flex-col items-center text-center transition cursor-pointer ${
                          isSelected
                            ? 'bg-violet-600/30 border-cyan-400 ring-2 ring-cyan-400/40 shadow-lg'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${avatar.bgGradient} flex items-center justify-center text-2xl shadow-md mb-2`}>
                          {avatar.emoji}
                        </div>
                        <span className="text-xs font-bold text-white leading-tight">
                          {avatar.name.split(' ')[0]}
                        </span>
                        <span className="text-[10px] text-cyan-400 truncate w-full">
                          {avatar.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reset Progress Section */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-300">Reset Learning Progress</div>
                  <div className="text-[10px] text-slate-500">Restore all activities and start the adventure fresh</div>
                </div>
                {!showResetConfirm ? (
                  <button
                    onClick={() => setShowResetConfirm(true)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/50 text-rose-400 border border-rose-500/30 text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Data</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleConfirmReset}
                      className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black transition cursor-pointer"
                    >
                      Yes, Reset!
                    </button>
                    <button
                      onClick={() => setShowResetConfirm(false)}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-800 text-slate-400 text-xs font-bold transition cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="space-y-6">
              {/* Stat HUD Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Total XP
                  </div>
                  <div className="text-lg font-black text-white mt-1">{player.score}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-center gap-1">
                    <Coins className="w-3.5 h-3.5 text-amber-400" /> Coins
                  </div>
                  <div className="text-lg font-black text-amber-300 mt-1">{player.coins || 0}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-rose-400" /> Best Streak
                  </div>
                  <div className="text-lg font-black text-rose-300 mt-1">{player.bestStreak}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center justify-center gap-1">
                    <Target className="w-3.5 h-3.5 text-emerald-400" /> Accuracy
                  </div>
                  <div className="text-lg font-black text-emerald-300 mt-1">{accuracyRate}%</div>
                </div>
              </div>

              {/* Level Progression */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-violet-500/30 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-white">Current Tier: {levelData.levelTitle}</span>
                  <span className="text-cyan-400">{levelData.percentToNext}% to next tier</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 transition-all duration-500"
                    style={{ width: `${levelData.percentToNext}%` }}
                  />
                </div>
                <div className="text-[11px] text-slate-400">
                  Need {levelData.xpNeededForNext} more XP to reach the next tier!
                </div>
              </div>

              {/* Grammar Recommendations */}
              <div className="p-4 rounded-2xl bg-violet-950/20 border border-violet-500/30 space-y-2">
                <div className="text-xs font-black uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-cyan-400" /> Personalized Practice Recommendations
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li><strong>Condition Tense:</strong> Always keep the Present Simple inside the if-clause (e.g. <em>If she practices...</em>).</li>
                  <li><strong>Comma Check:</strong> Remember that reversed sentences (Main Clause first) do NOT take a comma!</li>
                  <li><strong>Modal Base Verb:</strong> Modal <em>will / won't</em> must be followed by pure infinitive without "to".</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'badges' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {BADGES.map((b) => {
                const isUnlocked =
                  player.unlockedBadges.includes(b.id) ||
                  (b.unlockedAtScore && player.score >= b.unlockedAtScore);
                return (
                  <div
                    key={b.id}
                    className={`p-3.5 rounded-2xl border text-center space-y-1.5 transition ${
                      isUnlocked
                        ? 'bg-amber-950/20 border-amber-500/40 shadow-md'
                        : 'bg-slate-950/60 border-slate-800 opacity-40'
                    }`}
                  >
                    <div className="text-3xl">{b.icon}</div>
                    <div className="text-xs font-bold text-white">{b.title}</div>
                    <div className="text-[10px] text-slate-400 leading-tight">
                      {b.description}
                    </div>
                    <span
                      className={`inline-block text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        isUnlocked
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {isUnlocked ? 'Unlocked' : b.requirementText}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end gap-3 shrink-0">
          <button
            onMouseEnter={() => soundManager.playHover()}
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-violet-500/30 flex items-center gap-1.5 cursor-pointer transition hover:scale-105"
          >
            <Check className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};
