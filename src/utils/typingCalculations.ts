import type { TypingStats, CharacterStatus } from '../types';

/**
 * Bereken WPM (Words Per Minute)
 * Standaard formule: (characters / 5) / minutes
 */
export function calculateWPM(
  correctChars: number,
  timeElapsedSeconds: number
): number {
  if (timeElapsedSeconds === 0) return 0;
  const minutes = timeElapsedSeconds / 60;
  const wpm = (correctChars / 5) / minutes;
  return Math.round(wpm);
}

/**
 * Bereken Raw WPM (inclusief fouten)
 */
export function calculateRawWPM(
  totalChars: number,
  timeElapsedSeconds: number
): number {
  if (timeElapsedSeconds === 0) return 0;
  const minutes = timeElapsedSeconds / 60;
  const rawWpm = (totalChars / 5) / minutes;
  return Math.round(rawWpm);
}

/**
 * Bereken Accuracy percentage
 */
export function calculateAccuracy(
  correctChars: number,
  totalChars: number
): number {
  if (totalChars === 0) return 100;
  const accuracy = (correctChars / totalChars) * 100;
  return Math.round(accuracy * 10) / 10; // 1 decimaal
}

/**
 * Bereken Consistency score
 * Gebaseerd op variatie in WPM over time windows
 */
export function calculateConsistency(
  wpmHistory: number[]
): number {
  if (wpmHistory.length < 2) return 100;

  const mean = wpmHistory.reduce((a, b) => a + b, 0) / wpmHistory.length;
  const variance = wpmHistory.reduce((sum, wpm) => {
    return sum + Math.pow(wpm - mean, 2);
  }, 0) / wpmHistory.length;

  const standardDeviation = Math.sqrt(variance);

  // Lagere standard deviation = hogere consistency
  // Normalize naar 0-100 scale
  const consistency = Math.max(0, 100 - (standardDeviation * 2));
  return Math.round(consistency);
}

/**
 * Bereken volledige typing statistieken
 */
export function calculateTypingStats(
  characters: CharacterStatus[],
  timeElapsedSeconds: number,
  wpmHistory: number[] = []
): TypingStats {
  const totalChars = characters.filter(c => c.status !== 'pending' && c.status !== 'current').length;
  const correctChars = characters.filter(c => c.status === 'correct').length;
  const incorrectChars = characters.filter(c => c.status === 'incorrect').length;

  const wpm = calculateWPM(correctChars, timeElapsedSeconds);
  const rawWpm = calculateRawWPM(totalChars, timeElapsedSeconds);
  const accuracy = calculateAccuracy(correctChars, totalChars);
  const consistency = calculateConsistency(wpmHistory);

  return {
    wpm,
    rawWpm,
    accuracy,
    errors: incorrectChars,
    correctChars,
    incorrectChars,
    totalChars,
    consistency,
    timeElapsed: timeElapsedSeconds,
  };
}

/**
 * Detecteer fout-patronen voor adaptive learning
 */
export function detectErrorPatterns(
  text: string,
  userInput: string
): string[] {
  const patterns: string[] = [];

  for (let i = 0; i < Math.min(text.length, userInput.length); i++) {
    if (text[i] !== userInput[i]) {
      // Zoek naar 2-character combinaties rond de fout
      if (i > 0) {
        patterns.push(text[i - 1] + text[i]);
      }
      if (i < text.length - 1) {
        patterns.push(text[i] + text[i + 1]);
      }
    }
  }

  return patterns;
}

/**
 * Bereken sterren rating voor een les (1-3 sterren)
 */
export function calculateStars(
  wpm: number,
  accuracy: number,
  minWpm: number,
  minAccuracy: number
): 0 | 1 | 2 | 3 {
  if (accuracy < minAccuracy) return 0;

  const wpmRatio = wpm / minWpm;
  const accuracyBonus = accuracy >= 98 ? 0.2 : 0;

  if (wpmRatio >= 1.5 + accuracyBonus) return 3;
  if (wpmRatio >= 1.2 + accuracyBonus) return 2;
  if (wpmRatio >= 1.0) return 1;

  return 0;
}

/**
 * Bereken XP reward gebaseerd op performance
 */
export function calculateXP(
  wpm: number,
  accuracy: number,
  timeSeconds: number,
  stars: number
): number {
  let baseXP = Math.floor(timeSeconds / 10); // 1 XP per 10 seconden

  // WPM bonus
  const wpmBonus = Math.floor(wpm / 10) * 5;

  // Accuracy bonus
  const accuracyBonus = accuracy >= 98 ? 20 : accuracy >= 95 ? 10 : 0;

  // Stars bonus
  const starsBonus = stars * 10;

  return baseXP + wpmBonus + accuracyBonus + starsBonus;
}

/**
 * Bereken level van XP
 */
export function calculateLevel(xp: number): number {
  // Exponentiële curve: level = sqrt(xp / 100)
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

/**
 * Bereken XP nodig voor volgend level
 */
export function calculateXPForNextLevel(currentLevel: number): number {
  // Inverse van level formule: xp = (level - 1)^2 * 100
  return Math.pow(currentLevel, 2) * 100;
}

/**
 * Voorspel wanneer gebruiker bepaald WPM bereikt
 */
export function predictMasteryTimeline(
  currentWpm: number,
  targetWpm: number,
  improvementRate: number = 0.5 // WPM verbetering per sessie
): number {
  if (currentWpm >= targetWpm) return 0;

  const wpmGap = targetWpm - currentWpm;
  const sessionsNeeded = Math.ceil(wpmGap / improvementRate);

  return sessionsNeeded;
}

/**
 * Tijd van dag categoriseren voor performance tracking
 */
export function getTimeOfDayCategory(): 'morning' | 'afternoon' | 'evening' | 'night' {
  const hour = new Date().getHours();

  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  if (hour >= 18 && hour < 22) return 'evening';
  return 'night';
}

/**
 * Format tijd in MM:SS formaat
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format WPM met kleur indicator
 */
export function getWPMColor(wpm: number): string {
  if (wpm >= 80) return 'text-green-400';
  if (wpm >= 60) return 'text-primary-400';
  if (wpm >= 40) return 'text-yellow-400';
  if (wpm >= 20) return 'text-orange-400';
  return 'text-red-400';
}

/**
 * Format accuracy met kleur indicator
 */
export function getAccuracyColor(accuracy: number): string {
  if (accuracy >= 98) return 'text-green-400';
  if (accuracy >= 95) return 'text-primary-400';
  if (accuracy >= 90) return 'text-yellow-400';
  if (accuracy >= 85) return 'text-orange-400';
  return 'text-red-400';
}
