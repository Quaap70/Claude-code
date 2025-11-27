import React from 'react';
import { CharacterStatus } from '../types';

interface TypingAreaProps {
  characters: CharacterStatus[];
  currentIndex: number;
  fontSize?: number;
  blindMode?: boolean;
}

/**
 * TypingArea Component
 * Displays the text to type with real-time character feedback
 */
export const TypingArea: React.FC<TypingAreaProps> = ({
  characters,
  currentIndex,
  fontSize = 24,
  blindMode = false,
}) => {
  const getCharClass = (char: CharacterStatus, index: number): string => {
    const baseClass = 'typing-char font-mono px-0.5 rounded';

    if (blindMode && char.status === 'pending') {
      return `${baseClass} text-gray-600`;
    }

    if (char.status === 'current') {
      return `${baseClass} typing-char-current`;
    }

    if (char.status === 'correct') {
      return `${baseClass} typing-char-correct`;
    }

    if (char.status === 'incorrect') {
      return `${baseClass} typing-char-incorrect`;
    }

    return `${baseClass} text-gray-400`;
  };

  const displayChar = (char: string): string => {
    if (char === ' ') return '\u00A0'; // Non-breaking space
    return char;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <div
        className="bg-gray-800/50 rounded-xl p-8 shadow-2xl border border-gray-700"
        style={{ minHeight: '200px' }}
      >
        <div
          className="leading-relaxed select-none"
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: '1.8',
            wordWrap: 'break-word',
          }}
        >
          {characters.map((char, index) => (
            <span
              key={index}
              className={getCharClass(char, index)}
              style={{
                position: 'relative',
              }}
            >
              {displayChar(char.char)}
              {char.status === 'current' && (
                <span
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-500 animate-pulse"
                  style={{
                    animation: 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                  }}
                />
              )}
            </span>
          ))}
        </div>

        {/* Helper text */}
        {characters.length > 0 && currentIndex === 0 && (
          <div className="mt-6 text-center text-gray-500 text-sm">
            Begin met typen om te starten...
          </div>
        )}
      </div>
    </div>
  );
};
