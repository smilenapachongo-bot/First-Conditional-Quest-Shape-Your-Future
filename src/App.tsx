/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { PlayerProfile, LeaderboardEntry } from './types';
import { AVATARS, BADGES, DEFAULT_LEADERBOARD, INITIAL_DAILY_MISSIONS, getPlayerLevel } from './data/playerData';
import { soundManager } from './utils/audio';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { Navbar } from './components/Navbar';
import { HeroWelcome } from './components/HeroWelcome';
import { HowToPlayModal } from './components/HowToPlayModal';
import { ProfileModal } from './components/ProfileModal';
import { GrammarLab } from './components/GrammarLab';
import { ScenariosExplorer } from './components/ScenariosExplorer';
import { MatchingGame } from './components/MatchingGame';
import { SentenceBuilder } from './components/SentenceBuilder';
import { FillBlankGame } from './components/FillBlankGame';
import { DetectiveMissionGame } from './components/DetectiveMissionGame';
import { MistakeHunter } from './components/MistakeHunter';
import { FinalQuiz } from './components/FinalQuiz';
import { CertificateView } from './components/CertificateView';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'fc_quest_player_profile';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [pointNotification, setPointNotification] = useState<{ points: number; reason: string } | null>(null);

  // Initial Player State with default values
  const [player, setPlayer] = useState<PlayerProfile>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            name: parsed.name || 'Alex Explorer',
            avatarId: parsed.avatarId || 'avatar-scholar',
            score: parsed.score || 120,
            coins: parsed.coins || 25,
            stars: parsed.stars || 3,
            streak: parsed.streak || 0,
            bestStreak: parsed.bestStreak || 0,
            completedActivities: parsed.completedActivities || [],
            unlockedBadges: parsed.unlockedBadges || ['badge-first-step'],
            accuracy: parsed.accuracy || { correct: 8, total: 10 },
            dailyMissions: parsed.dailyMissions || INITIAL_DAILY_MISSIONS,
            recentErrors: parsed.recentErrors || [],
          };
        }
      } catch {
        // ignore
      }
    }
    return {
      name: 'Alex Explorer',
      avatarId: 'avatar-scholar',
      score: 120,
      coins: 25,
      stars: 3,
      streak: 0,
      bestStreak: 0,
      completedActivities: [],
      unlockedBadges: ['badge-first-step'],
      accuracy: { correct: 8, total: 10 },
      dailyMissions: INITIAL_DAILY_MISSIONS,
      recentErrors: [],
    };
  });

  // Save profile to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(player));
    } catch {
      // ignore
    }
  }, [player]);

  // Points, Coins and Rewards Handler
  const handleEarnPoints = (points: number, reason: string) => {
    const earnedCoins = Math.max(1, Math.floor(points / 25));

    setPlayer((prev) => {
      const nextScore = prev.score + points;
      const nextCoins = (prev.coins || 0) + earnedCoins;
      const nextStars = prev.stars + Math.max(1, Math.floor(points / 80));

      // Check badge unlocks
      const nextBadges = [...prev.unlockedBadges];
      if (nextScore >= 1000 && !nextBadges.includes('badge-champion')) {
        nextBadges.push('badge-champion');
        soundManager.playBadgeUnlock();
        confetti({ particleCount: 100, spread: 70 });
      }

      return {
        ...prev,
        score: nextScore,
        coins: nextCoins,
        stars: nextStars,
        unlockedBadges: nextBadges,
      };
    });

    // Play points sound effect
    soundManager.playPointsEarned();

    // Show temporary toast
    setPointNotification({ points, reason });
    setTimeout(() => {
      setPointNotification(null);
    }, 2800);
  };

  // Streak counter handler
  const handleStreakUpdate = (isCorrect: boolean) => {
    setPlayer((prev) => {
      const prevAcc = prev.accuracy || { correct: 0, total: 0 };
      const nextAccuracy = {
        correct: prevAcc.correct + (isCorrect ? 1 : 0),
        total: prevAcc.total + 1,
      };

      if (isCorrect) {
        const nextStreak = prev.streak + 1;
        const nextBest = Math.max(nextStreak, prev.bestStreak);
        const nextBadges = [...prev.unlockedBadges];

        if (nextStreak >= 5 && !nextBadges.includes('badge-streak-master')) {
          nextBadges.push('badge-streak-master');
          soundManager.playLevelUp();
          confetti({ particleCount: 60, spread: 60 });
        } else if (nextStreak > 1) {
          soundManager.playStreak();
        }

        return {
          ...prev,
          streak: nextStreak,
          bestStreak: nextBest,
          unlockedBadges: nextBadges,
          accuracy: nextAccuracy,
        };
      } else {
        return {
          ...prev,
          streak: 0,
          accuracy: nextAccuracy,
        };
      }
    });
  };

  const handleUnlockCertificate = () => {
    setPlayer((prev) => {
      const nextBadges = [...prev.unlockedBadges];
      if (!nextBadges.includes('badge-champion')) {
        nextBadges.push('badge-champion');
      }
      return { ...prev, unlockedBadges: nextBadges };
    });
    soundManager.playCertificateEarned();
    confetti({ particleCount: 150, spread: 90 });
    setCurrentTab('certificate');
  };

  const handleResetProgress = () => {
    const freshProfile: PlayerProfile = {
      name: 'Alex Explorer',
      avatarId: 'avatar-scholar',
      score: 0,
      coins: 0,
      stars: 0,
      streak: 0,
      bestStreak: 0,
      completedActivities: [],
      unlockedBadges: ['badge-first-step'],
      accuracy: { correct: 0, total: 0 },
      dailyMissions: INITIAL_DAILY_MISSIONS,
      recentErrors: [],
    };
    setPlayer(freshProfile);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    soundManager.playError();
  };

  // Dynamic Leaderboard merging player with academy peers
  const currentAvatar = AVATARS.find((a) => a.id === player.avatarId) || AVATARS[0];
  const levelInfo = getPlayerLevel(player.score);

  const fullLeaderboard: LeaderboardEntry[] = useMemo(() => {
    const accTotal = player.accuracy ? player.accuracy.total : 0;
    const accCorrect = player.accuracy ? player.accuracy.correct : 0;
    const accuracyRate = accTotal > 0 ? Math.round((accCorrect / accTotal) * 100) : 92;

    const userEntry: LeaderboardEntry = {
      rank: 1,
      name: player.name || 'Hero Student',
      avatarEmoji: currentAvatar.emoji,
      score: player.score,
      coins: player.coins || 0,
      stars: player.stars,
      badgeCount: player.unlockedBadges.length,
      level: levelInfo.levelTitle,
      accuracyRate,
      isCurrentUser: true,
    };

    const combined = [...DEFAULT_LEADERBOARD, userEntry];
    combined.sort((a, b) => b.score - a.score);

    return combined.map((entry, idx) => ({
      ...entry,
      rank: idx + 1,
    }));
  }, [player, currentAvatar, levelInfo]);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Dynamic Background Atmosphere */}
      <BackgroundCanvas />

      {/* Toast Notification */}
      {pointNotification && (
        <div className="fixed top-24 right-6 z-50 animate-bounce pointer-events-none">
          <div className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-extrabold text-xs sm:text-sm shadow-xl flex items-center gap-2 border border-emerald-400">
            <span>✨</span>
            <span>+{pointNotification.points} XP</span>
            <span className="font-normal text-emerald-100 text-xs">({pointNotification.reason})</span>
          </div>
        </div>
      )}

      {/* Main Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        player={player}
        avatars={AVATARS}
        onOpenHowToPlay={() => setIsHowToPlayOpen(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        isMusicPlaying={isMusicPlaying}
        setIsMusicPlaying={setIsMusicPlaying}
      />

      {/* Main Screen Container */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {currentTab === 'home' && (
          <HeroWelcome
            player={player}
            setPlayer={setPlayer}
            avatars={AVATARS}
            onStartQuest={() => setCurrentTab('matching')}
            onLearnGrammar={() => setCurrentTab('grammar')}
            onExploreScenarios={() => setCurrentTab('scenarios')}
            onOpenFillBlank={() => setCurrentTab('fillblank')}
            onOpenDetective={() => setCurrentTab('detective')}
            onOpenSentenceBuilder={() => setCurrentTab('builder')}
            onOpenMistakeHunter={() => setCurrentTab('hunter')}
            onOpenQuiz={() => setCurrentTab('quiz')}
          />
        )}

        {currentTab === 'grammar' && (
          <GrammarLab onEarnPoints={handleEarnPoints} />
        )}

        {currentTab === 'scenarios' && (
          <ScenariosExplorer onEarnPoints={handleEarnPoints} />
        )}

        {currentTab === 'matching' && (
          <MatchingGame
            onEarnPoints={handleEarnPoints}
            onStreakUpdate={handleStreakUpdate}
            currentStreak={player.streak}
          />
        )}

        {currentTab === 'builder' && (
          <SentenceBuilder
            onEarnPoints={handleEarnPoints}
            onStreakUpdate={handleStreakUpdate}
          />
        )}

        {currentTab === 'fillblank' && (
          <FillBlankGame
            onEarnPoints={handleEarnPoints}
            onStreakUpdate={handleStreakUpdate}
          />
        )}

        {currentTab === 'detective' && (
          <DetectiveMissionGame
            onEarnPoints={handleEarnPoints}
            onStreakUpdate={handleStreakUpdate}
          />
        )}

        {currentTab === 'hunter' && (
          <MistakeHunter
            onEarnPoints={handleEarnPoints}
            onStreakUpdate={handleStreakUpdate}
          />
        )}

        {currentTab === 'quiz' && (
          <FinalQuiz
            onEarnPoints={handleEarnPoints}
            onStreakUpdate={handleStreakUpdate}
            onUnlockCertificate={handleUnlockCertificate}
          />
        )}

        {currentTab === 'certificate' && (
          <CertificateView
            player={player}
            avatars={AVATARS}
            leaderboard={fullLeaderboard}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-auto border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-200">FIRST CONDITIONAL QUEST</span>
            <span>•</span>
            <span className="text-cyan-400 font-semibold">Shape Your Future</span>
          </div>
          <div className="text-[11px] text-slate-400">
            A2 English Educational Quest Game • Master Formula:{' '}
            <code className="text-emerald-400 font-mono font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              If + Present Simple, will + base verb
            </code>
          </div>
        </div>
      </footer>

      {/* How To Play Modal */}
      <HowToPlayModal
        isOpen={isHowToPlayOpen}
        onClose={() => setIsHowToPlayOpen(false)}
        onStartQuest={() => {
          setIsHowToPlayOpen(false);
          setCurrentTab('matching');
        }}
        onGoGrammar={() => {
          setIsHowToPlayOpen(false);
          setCurrentTab('grammar');
        }}
      />

      {/* Profile & Avatar Customizer Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        player={player}
        setPlayer={setPlayer}
        avatars={AVATARS}
        onResetProgress={handleResetProgress}
      />
    </div>
  );
}
