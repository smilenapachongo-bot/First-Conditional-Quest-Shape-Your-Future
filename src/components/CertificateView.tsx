import React from 'react';
import { PlayerProfile, Avatar, Badge, LeaderboardEntry } from '../types';
import { BADGES } from '../data/playerData';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Award,
  Printer,
  Sparkles,
  CheckCircle2,
  Trophy,
  Flame,
  Star,
  Share2,
} from 'lucide-react';

interface CertificateViewProps {
  player: PlayerProfile;
  avatars: Avatar[];
  leaderboard: LeaderboardEntry[];
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  player,
  avatars,
  leaderboard,
}) => {
  const currentAvatar = avatars.find((a) => a.id === player.avatarId) || avatars[0];

  const handlePrint = () => {
    soundManager.playSuccess();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
    });
    window.print();
  };

  const todayDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const isEligible = player.score >= 500;

  return (
    <div className="space-y-12 pb-16">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-400" />
            <h1 className="text-xl sm:text-2xl font-black text-white font-display">
              ACADEMY CERTIFICATE & LEADERBOARD
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Print or save your official certificate and compare your achievements with academy classmates.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:opacity-95 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2 cursor-pointer transition"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save Certificate (PDF)</span>
        </button>
      </div>

      {/* Printable Certificate */}
      <div
        id="printable-certificate"
        className="relative p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-4 border-amber-500/70 shadow-2xl text-center space-y-6 overflow-hidden"
      >
        {/* Certificate Decorative Corners */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-amber-400/80" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-amber-400/80" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-amber-400/80" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-amber-400/80" />

        {/* Certificate Header */}
        <div className="space-y-2">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-500 p-1 mx-auto shadow-xl shadow-amber-500/30">
            <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-3xl sm:text-4xl">
              🎓
            </div>
          </div>

          <div className="text-xs sm:text-sm uppercase font-extrabold tracking-widest text-amber-400">
            First Conditional English Academy
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400">
            CERTIFICATE OF MASTERY
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 font-medium">
            This certifies that the English scholar named below has demonstrated outstanding proficiency in formulating, analyzing, and applying the First Conditional in real-world educational contexts.
          </p>
        </div>

        {/* Student Name & Avatar */}
        <div className="py-4 space-y-2">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-slate-800/80 border border-amber-500/30">
            <span className="text-2xl">{currentAvatar.emoji}</span>
            <span className="text-xl sm:text-3xl font-black text-white font-display">
              {player.name || 'Hero Student'}
            </span>
          </div>
          <div className="text-xs text-amber-300/80 font-semibold">
            Avatar Role: {currentAvatar.name} ({currentAvatar.title})
          </div>
        </div>

        {/* Core Formula Badge in Certificate */}
        <div className="max-w-xl mx-auto p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm font-mono text-amber-200 font-bold">
          Mastered Formula: If + Present Simple, will + base verb
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto py-2">
          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
            <div className="text-[11px] text-slate-400 uppercase font-bold">Total Score</div>
            <div className="text-lg sm:text-xl font-extrabold text-white mt-0.5">{player.score} pts</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
            <div className="text-[11px] text-slate-400 uppercase font-bold">Stars Earned</div>
            <div className="text-lg sm:text-xl font-extrabold text-yellow-400 mt-0.5">⭐ {player.stars}</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-center">
            <div className="text-[11px] text-slate-400 uppercase font-bold">Badges</div>
            <div className="text-lg sm:text-xl font-extrabold text-amber-400 mt-0.5">{player.unlockedBadges.length} / 8</div>
          </div>
        </div>

        {/* Certificate Signatures & Date */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-400 max-w-2xl mx-auto">
          <div className="text-center sm:text-left">
            <div className="font-mono text-slate-200 font-bold">{todayDate}</div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400">Date of Issue</div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xl">
              🏅
            </div>
            <div className="text-left">
              <div className="text-white font-bold">Official Seal</div>
              <div className="text-[10px] text-emerald-400 font-mono">VERIFIED A2 CONDITIONAL</div>
            </div>
          </div>

          <div className="text-center sm:text-right">
            <div className="font-display font-bold text-slate-200 italic text-sm">First Conditional Quest Board</div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400">Academic Evaluation</div>
          </div>
        </div>
      </div>

      {/* Badges Showcase Grid */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/70 border border-slate-700/80 shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-extrabold text-white font-display flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Badges & Achievements Showcase</span>
          </h3>
          <span className="text-xs font-bold text-slate-400">
            {player.unlockedBadges.length} of {BADGES.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {BADGES.map((badge) => {
            const isUnlocked = player.unlockedBadges.includes(badge.id) || (badge.unlockedAtScore && player.score >= badge.unlockedAtScore);
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border text-center space-y-2 transition ${
                  isUnlocked
                    ? 'bg-amber-950/20 border-amber-500/40 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-900/40 border-slate-800 opacity-40'
                }`}
              >
                <div className="text-3xl">{badge.icon}</div>
                <div className="text-xs font-bold text-white">{badge.title}</div>
                <div className="text-[10px] text-slate-400 leading-tight">
                  {badge.description}
                </div>
                {isUnlocked ? (
                  <span className="inline-block text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold uppercase">
                    Unlocked
                  </span>
                ) : (
                  <span className="inline-block text-[9px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-500 font-bold uppercase">
                    Locked
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Academy Leaderboard Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-800/70 border border-slate-700/80 shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white font-display">
                Academy Leaderboard
              </h3>
              <p className="text-xs text-slate-400">Global class ranking based on points and badges</p>
            </div>
          </div>

          <span className="text-xs px-3 py-1 rounded-full bg-slate-900 text-slate-300 font-bold border border-slate-700">
            Live Academy Sync
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-700/80 text-slate-400 uppercase text-[10px] font-extrabold tracking-wider">
                <th className="py-3 px-3">Rank</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-3 text-center">Badges</th>
                <th className="py-3 px-3 text-center">Stars</th>
                <th className="py-3 px-4 text-right">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {leaderboard.map((entry) => {
                const isCurrent = entry.isCurrentUser;
                return (
                  <tr
                    key={entry.rank}
                    className={`transition ${
                      isCurrent
                        ? 'bg-indigo-600/20 font-bold text-white'
                        : 'hover:bg-slate-800/40 text-slate-300'
                    }`}
                  >
                    <td className="py-3.5 px-3">
                      <span
                        className={`w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-black ${
                          entry.rank === 1
                            ? 'bg-amber-400 text-slate-950'
                            : entry.rank === 2
                            ? 'bg-slate-300 text-slate-950'
                            : entry.rank === 3
                            ? 'bg-amber-700 text-white'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {entry.rank}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{entry.avatarEmoji}</span>
                        <span className="font-bold text-white">
                          {entry.name}
                          {isCurrent && (
                            <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-indigo-500 text-white font-extrabold uppercase">
                              YOU
                            </span>
                          )}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-center font-semibold">
                      {entry.badgeCount}
                    </td>
                    <td className="py-3.5 px-3 text-center text-yellow-400 font-bold">
                      ⭐ {entry.stars}
                    </td>
                    <td className="py-3.5 px-4 text-right font-black text-indigo-400">
                      {entry.score} pts
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
