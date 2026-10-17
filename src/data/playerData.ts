import { Avatar, Badge, PlayerLevelTitle, DailyMission } from '../types';

export const AVATARS: Avatar[] = [
  {
    id: 'avatar-scholar',
    name: 'Leo the Scholar',
    emoji: '🧑‍🎓',
    title: 'Academic Navigator',
    bgGradient: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'avatar-scientist',
    name: 'Maya the Scientist',
    emoji: '👩‍🔬',
    title: 'Future Experimenter',
    bgGradient: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'avatar-techie',
    name: 'Alex the Tech Wizard',
    emoji: '🧑‍💻',
    title: 'EdTech Explorer',
    bgGradient: 'from-purple-500 to-pink-600',
  },
  {
    id: 'avatar-artist',
    name: 'Sam the Creative',
    emoji: '🎨',
    title: 'Expressive Thinker',
    bgGradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 'avatar-eco',
    name: 'Elena the Eco-Hero',
    emoji: '🌱',
    title: 'School Earth Guardian',
    bgGradient: 'from-green-500 to-emerald-700',
  },
  {
    id: 'avatar-explorer',
    name: 'Noah the Adventurer',
    emoji: '🚀',
    title: 'Cosmic Future Voyager',
    bgGradient: 'from-rose-500 to-red-600',
  },
];

export const BADGES: Badge[] = [
  {
    id: 'badge-first-step',
    title: 'First Step',
    description: 'Complete your first practice activity in the quest',
    icon: '🚀',
    category: 'grammar',
    requirementText: 'Complete 1 learning challenge',
  },
  {
    id: 'badge-perfect-match',
    title: 'Perfect Match',
    description: 'Clear a round of Match The Future with 100% precision',
    icon: '🧩',
    category: 'matching',
    requirementText: 'Pair all condition & result cards in a round',
  },
  {
    id: 'badge-study-champion',
    title: 'Study Champion',
    description: 'Investigate all 8 Real-Life Learning Scenarios',
    icon: '🧭',
    category: 'explorer',
    requirementText: 'Explore all 8 real-life scenario modules',
  },
  {
    id: 'badge-grammar-genius',
    title: 'Grammar Genius',
    description: 'Master structure, negative forms, and comma rules in the Grammar Lab',
    icon: '🔬',
    category: 'grammar',
    requirementText: 'Inspect Grammar Lab and pass the rule checks',
  },
  {
    id: 'badge-streak-master',
    title: 'Streak Master',
    description: 'Chain together 5 consecutive correct answers without mistakes',
    icon: '🔥',
    category: 'streak',
    requirementText: 'Achieve a 5x answer streak',
  },
  {
    id: 'badge-future-thinker',
    title: 'Future Thinker',
    description: 'Assemble 5 First Conditional sentences in the Sentence Builder',
    icon: '🏗️',
    category: 'builder',
    requirementText: 'Complete 5 sentence builder scramble puzzles',
  },
  {
    id: 'badge-mission-complete',
    title: 'Mission Complete',
    description: 'Crack a mystery case in the Grammar Detective Mission',
    icon: '🕵️',
    category: 'explorer',
    requirementText: 'Solve all clues in a Detective Mission',
  },
  {
    id: 'badge-champion',
    title: 'First Conditional Champion',
    description: 'Score 80%+ on the Boss Final Quiz and unlock the Official Certificate',
    icon: '👑',
    category: 'champion',
    unlockedAtScore: 1000,
    requirementText: 'Score 80%+ on Boss Quiz & reach 1000+ XP',
  },
];

export const INITIAL_DAILY_MISSIONS: DailyMission[] = [
  {
    id: 'm-match-3',
    title: 'Match the Future Ace',
    description: 'Connect 4 condition and result pairs in Match The Future',
    target: 4,
    current: 0,
    rewardXp: 80,
    rewardCoins: 25,
    completed: false,
    icon: '🧩',
  },
  {
    id: 'm-build-2',
    title: 'Sentence Construction',
    description: 'Assemble 2 sentences properly in the Sentence Builder',
    target: 2,
    current: 0,
    rewardXp: 100,
    rewardCoins: 30,
    completed: false,
    icon: '🏗️',
  },
  {
    id: 'm-quiz-streak',
    title: 'Grammar Detective Check',
    description: 'Answer 3 quiz or detective questions correctly',
    target: 3,
    current: 0,
    rewardXp: 120,
    rewardCoins: 40,
    completed: false,
    icon: '🎯',
  },
];

export interface LevelInfo {
  title: PlayerLevelTitle;
  minXp: number;
  maxXp: number;
  levelNumber: number;
  perks: string;
}

export const LEVEL_TIERS: LevelInfo[] = [
  {
    title: 'Grammar Beginner',
    minXp: 0,
    maxXp: 250,
    levelNumber: 1,
    perks: 'Unlocks Grammar Lab & Match The Future round 1',
  },
  {
    title: 'Conditional Explorer',
    minXp: 250,
    maxXp: 600,
    levelNumber: 2,
    perks: 'Unlocks Smart Scenarios & Sentence Builder',
  },
  {
    title: 'Future Planner',
    minXp: 600,
    maxXp: 1100,
    levelNumber: 3,
    perks: 'Unlocks Fill-in-the-Blanks & Detective Missions',
  },
  {
    title: 'Grammar Master',
    minXp: 1100,
    maxXp: 1800,
    levelNumber: 4,
    perks: 'Unlocks Boss Final Quiz Assessment',
  },
  {
    title: 'First Conditional Champion',
    minXp: 1800,
    maxXp: 99999,
    levelNumber: 5,
    perks: 'Unlocks Official Printed Academy Certificate',
  },
];

export function getPlayerLevel(score: number): {
  levelTitle: PlayerLevelTitle;
  levelNumber: number;
  currentXpInLevel: number;
  xpNeededForNext: number;
  percentToNext: number;
} {
  const currentTier =
    LEVEL_TIERS.find((t) => score >= t.minXp && score < t.maxXp) ||
    LEVEL_TIERS[LEVEL_TIERS.length - 1];

  if (currentTier.levelNumber === 5) {
    return {
      levelTitle: currentTier.title,
      levelNumber: 5,
      currentXpInLevel: score - 1800,
      xpNeededForNext: 0,
      percentToNext: 100,
    };
  }

  const range = currentTier.maxXp - currentTier.minXp;
  const currentProgress = score - currentTier.minXp;
  const percent = Math.min(100, Math.max(0, Math.round((currentProgress / range) * 100)));

  return {
    levelTitle: currentTier.title,
    levelNumber: currentTier.levelNumber,
    currentXpInLevel: currentProgress,
    xpNeededForNext: currentTier.maxXp - score,
    percentToNext: percent,
  };
}

export const DEFAULT_LEADERBOARD = [
  {
    rank: 1,
    name: 'Sofia Rodriguez',
    avatarEmoji: '👩‍🔬',
    score: 1850,
    coins: 480,
    stars: 32,
    badgeCount: 8,
    level: 'First Conditional Champion' as PlayerLevelTitle,
    accuracyRate: 98,
  },
  {
    rank: 2,
    name: 'Kenji Takahashi',
    avatarEmoji: '🧑‍💻',
    score: 1420,
    coins: 360,
    stars: 26,
    badgeCount: 7,
    level: 'Grammar Master' as PlayerLevelTitle,
    accuracyRate: 94,
  },
  {
    rank: 3,
    name: 'Fatima Al-Mansoor',
    avatarEmoji: '🧑‍🎓',
    score: 1180,
    coins: 290,
    stars: 22,
    badgeCount: 6,
    level: 'Grammar Master' as PlayerLevelTitle,
    accuracyRate: 91,
  },
  {
    rank: 4,
    name: 'Lucas Dubois',
    avatarEmoji: '🚀',
    score: 950,
    coins: 220,
    stars: 18,
    badgeCount: 5,
    level: 'Future Planner' as PlayerLevelTitle,
    accuracyRate: 88,
  },
  {
    rank: 5,
    name: 'Emma Watson',
    avatarEmoji: '🎨',
    score: 820,
    coins: 180,
    stars: 15,
    badgeCount: 4,
    level: 'Future Planner' as PlayerLevelTitle,
    accuracyRate: 85,
  },
  {
    rank: 6,
    name: 'Carlos Silva',
    avatarEmoji: '🌱',
    score: 510,
    coins: 110,
    stars: 11,
    badgeCount: 3,
    level: 'Conditional Explorer' as PlayerLevelTitle,
    accuracyRate: 82,
  },
];
