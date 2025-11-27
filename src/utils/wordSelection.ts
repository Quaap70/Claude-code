import type { Word, LessonPhase, UserWeaknesses, ErrorPattern } from '../types';
import { getWordsByPhase, getWordsByCombination } from '../data/dutchWords';

/**
 * Monkeytype Word Selection Algoritme
 * Selecteert woorden gebaseerd op:
 * - Gebruiker zwaktes (40%)
 * - Review woorden (20%)
 * - Nieuwe uitdagingen (30%)
 * - High frequency woorden (10%)
 */

export interface WordSelectionConfig {
  phase: LessonPhase;
  count: number;
  weaknesses?: UserWeaknesses;
  difficulty?: 'easy' | 'medium' | 'hard';
  focusCombinations?: string[];
}

/**
 * Hoofd selectie functie
 */
export function selectWords(config: WordSelectionConfig): string[] {
  const {
    phase,
    count,
    weaknesses,
    difficulty = 'medium',
    focusCombinations = []
  } = config;

  const allWords = getWordsByPhase(phase);
  const selectedWords: Word[] = [];

  // Bereken aantallen per categorie
  const weaknessCount = Math.floor(count * 0.4);
  const reviewCount = Math.floor(count * 0.2);
  const challengeCount = Math.floor(count * 0.3);
  const frequencyCount = count - (weaknessCount + reviewCount + challengeCount);

  // 1. Selecteer woorden voor zwaktes (40%)
  if (weaknesses && weaknessCount > 0) {
    const weaknessWords = selectWeaknessWords(allWords, weaknesses, weaknessCount);
    selectedWords.push(...weaknessWords);
  }

  // 2. Selecteer review woorden (20%)
  if (reviewCount > 0) {
    const reviewWords = selectReviewWords(allWords, reviewCount, selectedWords);
    selectedWords.push(...reviewWords);
  }

  // 3. Selecteer nieuwe uitdagingen (30%)
  if (challengeCount > 0) {
    const challengeWords = selectChallengeWords(
      allWords,
      challengeCount,
      difficulty,
      selectedWords,
      focusCombinations
    );
    selectedWords.push(...challengeWords);
  }

  // 4. Vul aan met high frequency woorden (10%)
  if (frequencyCount > 0) {
    const frequencyWords = selectFrequencyWords(
      allWords,
      frequencyCount,
      selectedWords
    );
    selectedWords.push(...frequencyWords);
  }

  // Shuffle en return als strings
  return shuffleArray(selectedWords.map(w => w.text));
}

/**
 * Selecteer woorden gebaseerd op gebruiker zwaktes
 */
function selectWeaknessWords(
  words: Word[],
  weaknesses: UserWeaknesses,
  count: number
): Word[] {
  const weakCombinations = Array.from(weaknesses.letterCombinations.entries())
    .filter(([_, pattern]) => pattern.successRate < 0.8)
    .sort((a, b) => a[1].successRate - b[1].successRate)
    .slice(0, 5)
    .map(([combo, _]) => combo);

  const weaknessWords = words.filter(word =>
    word.combinations.some(combo => weakCombinations.includes(combo))
  );

  return getRandomSample(weaknessWords, count);
}

/**
 * Selecteer review woorden (recent geoefend)
 */
function selectReviewWords(
  words: Word[],
  count: number,
  exclude: Word[]
): Word[] {
  const excludeTexts = new Set(exclude.map(w => w.text));
  const availableWords = words.filter(w => !excludeTexts.has(w.text));

  // Geef voorkeur aan medium difficulty voor review
  const mediumWords = availableWords.filter(w => w.difficulty >= 2 && w.difficulty <= 3);

  return getRandomSample(mediumWords.length > 0 ? mediumWords : availableWords, count);
}

/**
 * Selecteer nieuwe uitdagingen
 */
function selectChallengeWords(
  words: Word[],
  count: number,
  difficulty: 'easy' | 'medium' | 'hard',
  exclude: Word[],
  focusCombinations: string[]
): Word[] {
  const excludeTexts = new Set(exclude.map(w => w.text));
  let availableWords = words.filter(w => !excludeTexts.has(w.text));

  // Filter op difficulty
  const difficultyMap = {
    easy: [1, 2],
    medium: [2, 3, 4],
    hard: [4, 5]
  };

  const targetDifficulties = difficultyMap[difficulty];
  availableWords = availableWords.filter(w =>
    targetDifficulties.includes(w.difficulty)
  );

  // Als focusCombinations gegeven, filter daarop
  if (focusCombinations.length > 0) {
    const focusWords = availableWords.filter(w =>
      w.combinations.some(combo => focusCombinations.includes(combo))
    );
    if (focusWords.length > 0) {
      availableWords = focusWords;
    }
  }

  return getRandomSample(availableWords, count);
}

/**
 * Selecteer high frequency woorden
 */
function selectFrequencyWords(
  words: Word[],
  count: number,
  exclude: Word[]
): Word[] {
  const excludeTexts = new Set(exclude.map(w => w.text));
  const availableWords = words
    .filter(w => !excludeTexts.has(w.text))
    .sort((a, b) => b.frequency - a.frequency);

  return getRandomSample(availableWords.slice(0, 50), count);
}

/**
 * Shuffle array (Fisher-Yates)
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Neem random sample van array
 */
function getRandomSample<T>(array: T[], count: number): T[] {
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, Math.min(count, array.length));
}

/**
 * Genereer woorden voor een sessie gebaseerd op tijd
 */
export function generateSessionWords(
  durationSeconds: number,
  averageWpm: number = 40,
  config: Partial<WordSelectionConfig> = {}
): string[] {
  // Schat aantal woorden gebaseerd op WPM en tijd
  const estimatedWords = Math.ceil((averageWpm * (durationSeconds / 60)) * 1.2);

  return selectWords({
    phase: config.phase || 'allletters',
    count: estimatedWords,
    weaknesses: config.weaknesses,
    difficulty: config.difficulty,
    focusCombinations: config.focusCombinations,
  });
}

/**
 * Genereer woorden voor een les
 */
export function generateLessonWords(
  targetCombinations: string[],
  phase: LessonPhase,
  count: number = 50
): string[] {
  const words: Word[] = [];

  // Prioriteer woorden met target combinaties
  targetCombinations.forEach(combo => {
    const comboWords = getWordsByCombination(combo, phase);
    words.push(...comboWords);
  });

  // Verwijder duplicaten
  const uniqueWords = Array.from(new Set(words.map(w => w.text)))
    .map(text => words.find(w => w.text === text)!);

  // Als niet genoeg, vul aan met phase woorden
  if (uniqueWords.length < count) {
    const phaseWords = getWordsByPhase(phase);
    const additionalWords = phaseWords.filter(w =>
      !uniqueWords.some(uw => uw.text === w.text)
    );
    words.push(...additionalWords);
  }

  return shuffleArray(uniqueWords.slice(0, count).map(w => w.text));
}

/**
 * Adaptive difficulty adjustment
 */
export function adjustDifficulty(
  currentDifficulty: 'easy' | 'medium' | 'hard',
  recentAccuracy: number,
  recentWpm: number,
  targetWpm: number
): 'easy' | 'medium' | 'hard' {
  // Te makkelijk: hoge accuracy en boven target WPM
  if (recentAccuracy >= 97 && recentWpm > targetWpm * 1.2) {
    return currentDifficulty === 'easy' ? 'medium' :
           currentDifficulty === 'medium' ? 'hard' : 'hard';
  }

  // Te moeilijk: lage accuracy of ver onder target WPM
  if (recentAccuracy < 90 || recentWpm < targetWpm * 0.7) {
    return currentDifficulty === 'hard' ? 'medium' :
           currentDifficulty === 'medium' ? 'easy' : 'easy';
  }

  // Sweet spot - behoud huidig niveau
  return currentDifficulty;
}

/**
 * Track error patterns en update weaknesses
 */
export function updateWeaknesses(
  weaknesses: UserWeaknesses,
  errorPatterns: string[],
  correctCombinations: string[]
): UserWeaknesses {
  const updated = { ...weaknesses };

  // Update error patterns
  errorPatterns.forEach(pattern => {
    const existing = updated.letterCombinations.get(pattern);
    if (existing) {
      existing.count += 1;
      existing.lastOccurrence = new Date();
      // Decrease success rate
      existing.successRate = Math.max(0, existing.successRate - 0.05);
    } else {
      updated.letterCombinations.set(pattern, {
        combination: pattern,
        count: 1,
        lastOccurrence: new Date(),
        successRate: 0.5,
      });
    }
  });

  // Update correct combinations (improve success rate)
  correctCombinations.forEach(pattern => {
    const existing = updated.letterCombinations.get(pattern);
    if (existing) {
      // Increase success rate
      existing.successRate = Math.min(1, existing.successRate + 0.02);
    }
  });

  return updated;
}

/**
 * Krijg de top 10 zwaktes van gebruiker
 */
export function getTopWeaknesses(
  weaknesses: UserWeaknesses,
  count: number = 10
): ErrorPattern[] {
  return Array.from(weaknesses.letterCombinations.values())
    .sort((a, b) => {
      // Sorteer op combinatie van success rate en recency
      const scoreA = a.successRate - (a.count * 0.01);
      const scoreB = b.successRate - (b.count * 0.01);
      return scoreA - scoreB;
    })
    .slice(0, count);
}
