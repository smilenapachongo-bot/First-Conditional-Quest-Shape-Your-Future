export interface Avatar {
  id: string;
  name: string;
  emoji: string;
  title: string;
  bgGradient: string;
}

export type PlayerLevelTitle =
  | 'Grammar Beginner'
  | 'Conditional Explorer'
  | 'Future Planner'
  | 'Grammar Master'
  | 'First Conditional Champion';

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  rewardXp: number;
  rewardCoins: number;
  completed: boolean;
  icon: string;
}

export interface PlayerProfile {
  name: string;
  avatarId: string;
  score: number; // XP points
  coins: number; // Virtual game coins
  stars: number;
  streak: number;
  bestStreak: number;
  completedActivities: string[];
  unlockedBadges: string[];
  matchingBestTime?: number;
  accuracy: {
    correct: number;
    total: number;
  };
  dailyMissions: DailyMission[];
  recentErrors: { rule: string; wrong: string; correct: string }[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'matching' | 'grammar' | 'builder' | 'quiz' | 'explorer' | 'streak' | 'champion';
  unlockedAtScore?: number;
  requirementText: string;
}

export interface MatchingPair {
  id: string;
  condition: string;
  result: string;
  fullSentence: string;
  context: string;
  category: 'Study' | 'Classroom' | 'Daily Life' | 'Environment' | 'Technology';
  explanation: string;
}

export interface ScenarioItem {
  id: string;
  title: string;
  category: string;
  iconName: string;
  gradient: string;
  story: string;
  illustrationBadge: string;
  checkQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  sentences: {
    id: string;
    text: string;
    ifClause: string;
    ifVerb: string;
    resultClause: string;
    resultVerb: string;
    meaning: string;
    invertedOrderText: string;
  }[];
  tip: string;
}

export interface WordScrambleChallenge {
  id: string;
  prompt: string;
  words: string[];
  correctOrder: string[];
  hasComma: boolean;
  invertedOrderWords?: string[];
  ruleTip: string;
}

export interface FillBlankChallenge {
  id: string;
  sentencePrompt: string;
  options: string[];
  correctOption: string;
  explanation: string;
  clauseFocus: 'Condition (Present Simple)' | 'Result (will + verb)';
}

export interface DetectiveClue {
  id: string;
  stepTitle: string;
  storySnippet: string;
  conditionalChoice: {
    prompt: string;
    options: {
      text: string;
      isCorrect: boolean;
      feedback: string;
    }[];
  };
}

export interface DetectiveMission {
  id: string;
  title: string;
  location: string;
  briefing: string;
  clues: DetectiveClue[];
  resolution: string;
}

export interface MistakeChallenge {
  id: string;
  sentence: string;
  hasError: boolean;
  errorPart?: string;
  correctedSentence: string;
  explanation: string;
  ruleCategory: 'No Will in If-Clause' | 'Present Simple Verb' | 'Comma Rule' | 'Base Verb After Will';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  ruleCategory: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatarEmoji: string;
  score: number;
  coins: number;
  stars: number;
  badgeCount: number;
  level: PlayerLevelTitle;
  accuracyRate: number;
  isCurrentUser?: boolean;
}

export interface AudioSettings {
  sfxMuted: boolean;
  musicPlaying: boolean;
  speechEnabled: boolean;
}
