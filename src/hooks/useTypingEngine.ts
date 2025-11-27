import { useState, useEffect, useCallback, useRef } from 'react';
import { CharacterStatus, TypingStats, WordStatus } from '../types';
import { calculateTypingStats, detectErrorPatterns } from '../utils/typingCalculations';

export interface TypingEngineConfig {
  text: string;
  onComplete?: (stats: TypingStats) => void;
  onError?: (char: string, expected: string) => void;
  onCorrect?: (char: string) => void;
  autoStart?: boolean;
}

export interface TypingEngineState {
  characters: CharacterStatus[];
  currentIndex: number;
  stats: TypingStats;
  isComplete: boolean;
  isStarted: boolean;
  isPaused: boolean;
  errorIndices: number[];
  wpmHistory: number[];
}

/**
 * Core Typing Engine Hook
 * Handles all typing logic, input processing, and statistics
 */
export function useTypingEngine(config: TypingEngineConfig) {
  const { text, onComplete, onError, onCorrect, autoStart = true } = config;

  // State
  const [characters, setCharacters] = useState<CharacterStatus[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [wpmHistory, setWpmHistory] = useState<number[]>([]);
  const [errorIndices, setErrorIndices] = useState<number[]>([]);

  // Refs
  const timerRef = useRef<number>();
  const wpmIntervalRef = useRef<number>();

  // Initialize characters from text
  useEffect(() => {
    const chars: CharacterStatus[] = text.split('').map(char => ({
      char,
      status: 'pending' as const,
    }));
    setCharacters(chars);
    setCurrentIndex(0);
    setIsStarted(false);
    setIsComplete(false);
    setStartTime(null);
    setElapsedTime(0);
    setWpmHistory([]);
    setErrorIndices([]);
  }, [text]);

  // Timer for elapsed time
  useEffect(() => {
    if (isStarted && !isPaused && !isComplete) {
      timerRef.current = window.setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isStarted, isPaused, isComplete]);

  // WPM history tracker (every 5 seconds)
  useEffect(() => {
    if (isStarted && !isPaused && !isComplete) {
      wpmIntervalRef.current = window.setInterval(() => {
        const stats = calculateTypingStats(characters, elapsedTime, wpmHistory);
        setWpmHistory(prev => [...prev, stats.wpm]);
      }, 5000);
    } else {
      if (wpmIntervalRef.current) {
        clearInterval(wpmIntervalRef.current);
      }
    }

    return () => {
      if (wpmIntervalRef.current) {
        clearInterval(wpmIntervalRef.current);
      }
    };
  }, [isStarted, isPaused, isComplete, characters, elapsedTime, wpmHistory]);

  // Handle key press
  const handleKeyPress = useCallback((key: string) => {
    if (isComplete || isPaused) return;

    // Start on first key press
    if (!isStarted && autoStart) {
      setIsStarted(true);
      setStartTime(Date.now());
    }

    if (!isStarted) return;

    // Get current character
    const currentChar = characters[currentIndex];
    if (!currentChar) return;

    // Update character status
    const newCharacters = [...characters];
    const isCorrect = key === currentChar.char;

    newCharacters[currentIndex] = {
      ...currentChar,
      status: isCorrect ? 'correct' : 'incorrect',
      timestamp: Date.now(),
    };

    // Track errors
    if (!isCorrect) {
      setErrorIndices(prev => [...prev, currentIndex]);
      onError?.(key, currentChar.char);
    } else {
      onCorrect?.(key);
    }

    // Update current character status
    if (currentIndex + 1 < newCharacters.length) {
      newCharacters[currentIndex + 1] = {
        ...newCharacters[currentIndex + 1],
        status: 'current',
      };
    }

    setCharacters(newCharacters);
    setCurrentIndex(prev => prev + 1);

    // Check if complete
    if (currentIndex + 1 >= newCharacters.length) {
      setIsComplete(true);
      const finalStats = calculateTypingStats(newCharacters, elapsedTime, wpmHistory);
      onComplete?.(finalStats);
    }
  }, [characters, currentIndex, isComplete, isPaused, isStarted, autoStart, elapsedTime, wpmHistory, onComplete, onError, onCorrect]);

  // Handle backspace
  const handleBackspace = useCallback(() => {
    if (currentIndex === 0 || isComplete || isPaused) return;

    const newCharacters = [...characters];

    // Reset current character
    newCharacters[currentIndex] = {
      ...newCharacters[currentIndex],
      status: 'pending',
    };

    // Move back
    const prevIndex = currentIndex - 1;
    newCharacters[prevIndex] = {
      ...newCharacters[prevIndex],
      status: 'current',
    };

    // Remove from error indices if it was an error
    if (errorIndices.includes(prevIndex)) {
      setErrorIndices(prev => prev.filter(i => i !== prevIndex));
    }

    setCharacters(newCharacters);
    setCurrentIndex(prevIndex);
  }, [characters, currentIndex, isComplete, isPaused, errorIndices]);

  // Reset typing
  const reset = useCallback(() => {
    const chars: CharacterStatus[] = text.split('').map(char => ({
      char,
      status: 'pending' as const,
    }));
    setCharacters(chars);
    setCurrentIndex(0);
    setIsStarted(false);
    setIsComplete(false);
    setIsPaused(false);
    setStartTime(null);
    setElapsedTime(0);
    setWpmHistory([]);
    setErrorIndices([]);
  }, [text]);

  // Start (manual start)
  const start = useCallback(() => {
    if (!isStarted) {
      setIsStarted(true);
      setStartTime(Date.now());

      // Mark first character as current
      if (characters.length > 0) {
        const newCharacters = [...characters];
        newCharacters[0] = {
          ...newCharacters[0],
          status: 'current',
        };
        setCharacters(newCharacters);
      }
    }
  }, [isStarted, characters]);

  // Pause
  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  // Resume
  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Calculate current stats
  const stats = calculateTypingStats(characters, elapsedTime, wpmHistory);

  // Get word statuses (for word-based display)
  const getWordStatuses = useCallback((): WordStatus[] => {
    const words: WordStatus[] = [];
    let currentWord: CharacterStatus[] = [];
    let wordStartIndex = 0;

    characters.forEach((char, index) => {
      if (char.char === ' ' || index === characters.length - 1) {
        // End of word
        if (index === characters.length - 1 && char.char !== ' ') {
          currentWord.push(char);
        }

        if (currentWord.length > 0) {
          const wordText = currentWord.map(c => c.char).join('');
          const isComplete = currentWord.every(c => c.status !== 'pending' && c.status !== 'current');
          const hasError = currentWord.some(c => c.status === 'incorrect');

          words.push({
            word: wordText,
            characters: currentWord,
            isComplete,
            hasError,
          });

          currentWord = [];
          wordStartIndex = index + 1;
        }

        // Add space as separate word
        if (char.char === ' ') {
          words.push({
            word: ' ',
            characters: [char],
            isComplete: char.status !== 'pending' && char.status !== 'current',
            hasError: char.status === 'incorrect',
          });
        }
      } else {
        currentWord.push(char);
      }
    });

    return words;
  }, [characters]);

  // Get error patterns for adaptive learning
  const getErrorPatterns = useCallback((): string[] => {
    const typedText = characters
      .filter(c => c.status !== 'pending' && c.status !== 'current')
      .map(c => c.status === 'correct' ? c.char : '_')
      .join('');

    return detectErrorPatterns(text, typedText);
  }, [characters, text]);

  return {
    // State
    characters,
    currentIndex,
    stats,
    isComplete,
    isStarted,
    isPaused,
    elapsedTime,
    errorIndices,
    wpmHistory,

    // Actions
    handleKeyPress,
    handleBackspace,
    reset,
    start,
    pause,
    resume,

    // Helpers
    getWordStatuses,
    getErrorPatterns,
  };
}
