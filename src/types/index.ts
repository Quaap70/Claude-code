// Core typing types
export interface TypingStats {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  errors: number;
  correctChars: number;
  incorrectChars: number;
  totalChars: number;
  consistency: number;
  timeElapsed: number;
}

export interface CharacterStatus {
  char: string;
  status: 'pending' | 'correct' | 'incorrect' | 'current';
  timestamp?: number;
}

export interface WordStatus {
  word: string;
  characters: CharacterStatus[];
  isComplete: boolean;
  hasError: boolean;
}

// Session types
export type SessionMode = 'time' | 'words' | 'endless';
export type SessionDuration = 120 | 300 | 600 | 900 | 1800 | 3600; // in seconds
export type SessionWordCount = 25 | 50 | 100 | 250 | 500;

export interface SessionConfig {
  mode: SessionMode;
  duration?: SessionDuration;
  wordCount?: SessionWordCount;
  practiceMode: PracticeMode;
  difficulty: DifficultyLevel;
}

export type PracticeMode =
  | 'guided'         // With keyboard hints
  | 'free'           // No hints
  | 'speed'          // Focus on speed
  | 'accuracy'       // Focus on accuracy
  | 'balanced'       // 50/50
  | 'blind'          // No text visible
  | 'zen';           // No scores

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

// Lesson types
export interface Lesson {
  id: string;
  phase: LessonPhase;
  module: string;
  number: number;
  title: string;
  description: string;
  targetLetters: string[];
  targetCombinations: string[];
  words: string[];
  minAccuracy: number;
  minWpm: number;
  unlocked: boolean;
  completed: boolean;
  stars: 0 | 1 | 2 | 3;
}

export type LessonPhase =
  | 'homerow'        // Phase 1: asdf jkl;
  | 'allletters'     // Phase 2: Full alphabet
  | 'numbers'        // Phase 3: Numbers and basic symbols
  | 'special'        // Phase 4: Special characters
  | 'advanced';      // Phase 5: Mixed complex content

export interface LessonProgress {
  lessonId: string;
  attempts: number;
  bestWpm: number;
  bestAccuracy: number;
  completedAt?: Date;
  stars: 0 | 1 | 2 | 3;
}

// Word selection types
export interface Word {
  text: string;
  frequency: number;
  difficulty: number;
  combinations: string[];
  phase: LessonPhase;
}

export interface WordBank {
  homerow: Word[];
  allletters: Word[];
  numbers: Word[];
  special: Word[];
  advanced: Word[];
}

// Keyboard types
export interface KeyboardLayout {
  rows: KeyboardRow[];
}

export interface KeyboardRow {
  keys: Key[];
}

export interface Key {
  primary: string;
  secondary?: string;
  finger: Finger;
  isHomeRow?: boolean;
  width?: number;
}

export type Finger =
  | 'left-pinky'
  | 'left-ring'
  | 'left-middle'
  | 'left-index'
  | 'left-thumb'
  | 'right-thumb'
  | 'right-index'
  | 'right-middle'
  | 'right-ring'
  | 'right-pinky';

// User progress types
export interface UserProfile {
  id: string;
  name: string;
  createdAt: Date;
  level: number;
  xp: number;
  totalSessions: number;
  totalTimeMinutes: number;
  currentStreak: number;
  longestStreak: number;
  badges: Badge[];
  achievements: Achievement[];
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  fontSize: number;
  fontFamily: 'mono' | 'dyslexic' | 'sans';
  soundEnabled: boolean;
  soundVolume: number;
  soundPack: 'mechanical' | 'soft' | 'retro' | 'silent';
  showKeyboard: boolean;
  showHands: boolean;
  blindMode: boolean;
  language: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  progress: number;
  target: number;
  completed: boolean;
  xpReward: number;
}

// Gamification types
export interface LevelInfo {
  level: number;
  xp: number;
  xpForNext: number;
  xpProgress: number;
}

export interface DailyChallenge {
  id: string;
  date: Date;
  description: string;
  target: number;
  progress: number;
  xpReward: number;
  completed: boolean;
}

// Statistics types
export interface SkillMatrix {
  accuracy: {
    letters: number;
    numbers: number;
    symbols: number;
    capitals: number;
  };
  speed: {
    commonWords: number;
    rareWords: number;
    numbers: number;
    mixedContent: number;
  };
  consistency: {
    morningPerformance: number;
    eveningPerformance: number;
    underPressure: number;
    relaxedState: number;
  };
  endurance: {
    firstMinute: number;
    after5Minutes: number;
    after10Minutes: number;
    after20Minutes: number;
  };
}

export interface SessionHistory {
  id: string;
  date: Date;
  mode: SessionMode;
  duration: number;
  stats: TypingStats;
  lessonId?: string;
  practiceMode: PracticeMode;
}

// Health & RSI prevention types
export interface BreakReminder {
  type: 'micro' | 'short' | 'long';
  duration: number;
  message: string;
  exercises?: Exercise[];
}

export interface Exercise {
  name: string;
  description: string;
  duration: number;
  animation?: string;
}

// Audio types
export interface AudioConfig {
  enabled: boolean;
  volume: number;
  soundPack: SoundPack;
}

export type SoundPack = 'mechanical' | 'soft' | 'retro' | 'silent';

export interface Sound {
  keypress: AudioBuffer | null;
  error: AudioBuffer | null;
  success: AudioBuffer | null;
  levelUp: AudioBuffer | null;
  achievement: AudioBuffer | null;
}

// Error tracking types
export interface ErrorPattern {
  combination: string;
  count: number;
  lastOccurrence: Date;
  successRate: number;
}

export interface UserWeaknesses {
  letterCombinations: Map<string, ErrorPattern>;
  specificKeys: Map<string, number>;
  timeOfDay: Map<string, number>;
}
