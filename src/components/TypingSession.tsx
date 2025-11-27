import React, { useEffect, useState } from 'react';
import { useTypingEngine } from '../hooks/useTypingEngine';
import { useKeyboardInput } from '../hooks/useKeyboardInput';
import { TypingArea } from './TypingArea';
import { StatsDisplay } from './StatsDisplay';
import { KeyboardVisualization } from './KeyboardVisualization';
import type { SessionMode, TypingStats } from '../types';

interface TypingSessionProps {
  words: string[];
  mode: SessionMode;
  duration?: number; // in seconds
  wordCount?: number;
  showKeyboard?: boolean;
  onComplete?: (stats: TypingStats) => void;
  onExit?: () => void;
}

/**
 * TypingSession Component
 * Main typing practice component that combines all parts
 */
export const TypingSession: React.FC<TypingSessionProps> = ({
  words,
  mode,
  duration,
  wordCount,
  showKeyboard = true,
  onComplete,
  onExit,
}) => {
  const [text] = useState(words.join(' '));
  const [timeRemaining, setTimeRemaining] = useState(duration || 0);
  const [wordsCompleted, setWordsCompleted] = useState(0);
  const [currentCharForKeyboard, setCurrentCharForKeyboard] = useState<string>();

  const typingEngine = useTypingEngine({
    text,
    onComplete: (stats) => {
      onComplete?.(stats);
    },
    onCorrect: () => {
      // Count completed words
      const completedWords = text
        .slice(0, typingEngine.currentIndex + 1)
        .split(' ')
        .length - 1;
      setWordsCompleted(completedWords);
    },
  });

  useKeyboardInput({
    onKeyPress: typingEngine.handleKeyPress,
    onBackspace: typingEngine.handleBackspace,
    enabled: !typingEngine.isComplete,
  });

  // Update current character for keyboard highlighting
  useEffect(() => {
    if (typingEngine.currentIndex < typingEngine.characters.length) {
      setCurrentCharForKeyboard(typingEngine.characters[typingEngine.currentIndex].char);
    }
  }, [typingEngine.currentIndex, typingEngine.characters]);

  // Timer countdown for time-based mode
  useEffect(() => {
    if (mode === 'time' && duration && typingEngine.isStarted && !typingEngine.isPaused) {
      const interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            typingEngine.pause();
            onComplete?.(typingEngine.stats);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [mode, duration, typingEngine.isStarted, typingEngine.isPaused]);

  // Check word count completion
  useEffect(() => {
    if (mode === 'words' && wordCount && wordsCompleted >= wordCount) {
      onComplete?.(typingEngine.stats);
    }
  }, [mode, wordCount, wordsCompleted, onComplete, typingEngine.stats]);

  const handleReset = () => {
    typingEngine.reset();
    setTimeRemaining(duration || 0);
    setWordsCompleted(0);
  };

  const handleExit = () => {
    if (onExit) {
      onExit();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <h1 className="text-2xl font-bold text-white">
              TypeMaster Pro
            </h1>
            <div className="text-sm text-gray-400">
              {mode === 'time' && `${Math.floor(timeRemaining / 60)}:${(timeRemaining % 60).toString().padStart(2, '0')}`}
              {mode === 'words' && `${wordsCompleted} / ${wordCount} woorden`}
              {mode === 'endless' && 'Endless mode'}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="btn btn-secondary px-4 py-2 text-sm"
            >
              Reset
            </button>
            <button
              onClick={handleExit}
              className="btn btn-secondary px-4 py-2 text-sm"
            >
              Exit
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <StatsDisplay
        stats={typingEngine.stats}
        elapsedTime={typingEngine.elapsedTime}
      />

      {/* Typing Area */}
      <div className="mt-6">
        <TypingArea
          characters={typingEngine.characters}
          currentIndex={typingEngine.currentIndex}
        />
      </div>

      {/* Keyboard Visualization */}
      {showKeyboard && (
        <div className="mt-6">
          <KeyboardVisualization
            currentChar={currentCharForKeyboard}
            showFingerColors={true}
            highlightHomeRow={true}
          />
        </div>
      )}

      {/* Completion message */}
      {typingEngine.isComplete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-8 max-w-md mx-4 shadow-2xl border border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              🎉 Sessie Voltooid!
            </h2>

            <div className="space-y-4 mb-6">
              <StatRow label="WPM" value={typingEngine.stats.wpm} />
              <StatRow label="Accuracy" value={`${typingEngine.stats.accuracy}%`} />
              <StatRow label="Fouten" value={typingEngine.stats.errors} />
              <StatRow label="Tijd" value={`${typingEngine.elapsedTime}s`} />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="btn btn-primary flex-1 py-3"
              >
                Opnieuw
              </button>
              <button
                onClick={handleExit}
                className="btn btn-secondary flex-1 py-3"
              >
                Terug
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface StatRowProps {
  label: string;
  value: string | number;
}

const StatRow: React.FC<StatRowProps> = ({ label, value }) => {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-700">
      <span className="text-gray-400">{label}</span>
      <span className="text-white text-xl font-bold">{value}</span>
    </div>
  );
};
