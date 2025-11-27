import React from 'react';
import { qwertyLayout, getKeyForChar, getFingerColor } from '../data/keyboardLayout';
import type { Key } from '../types';

interface KeyboardVisualizationProps {
  currentChar?: string;
  showFingerColors?: boolean;
  highlightHomeRow?: boolean;
  size?: 'small' | 'medium' | 'large';
}

/**
 * KeyboardVisualization Component
 * Displays an interactive visual keyboard
 */
export const KeyboardVisualization: React.FC<KeyboardVisualizationProps> = ({
  currentChar,
  showFingerColors = true,
  highlightHomeRow = true,
  size = 'medium',
}) => {
  const currentKey = currentChar ? getKeyForChar(currentChar) : undefined;

  const sizeClasses = {
    small: 'text-xs p-1.5 min-w-[28px]',
    medium: 'text-sm p-2.5 min-w-[40px]',
    large: 'text-base p-3.5 min-w-[52px]',
  };

  const keySize = sizeClasses[size];

  const getKeyClass = (key: Key): string => {
    const baseClass = 'keyboard-key relative transition-all duration-100 flex flex-col items-center justify-center';

    let classes = [baseClass];

    // Active key highlight
    const isActive = currentKey &&
      (key.primary === currentKey.primary || key.primary === currentChar);

    if (isActive) {
      classes.push('keyboard-key-active scale-110 shadow-lg');
    }

    // Home row highlight
    if (highlightHomeRow && key.isHomeRow && !isActive) {
      classes.push('keyboard-key-home');
    }

    // Finger color
    if (showFingerColors && !isActive) {
      const fingerColor = getFingerColor(key.finger);
      classes.push(fingerColor.replace('bg-', 'border-b-4 border-'));
    }

    return classes.join(' ');
  };

  const getKeyWidth = (key: Key): string => {
    if (key.width) {
      return `${key.width * 100}%`;
    }
    return 'auto';
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-gray-800/70 rounded-xl p-6 shadow-2xl border border-gray-700">
        {/* Keyboard rows */}
        <div className="space-y-2">
          {qwertyLayout.rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex gap-1 justify-center"
              style={{
                marginLeft: rowIndex === 1 ? '20px' :
                           rowIndex === 2 ? '30px' :
                           rowIndex === 3 ? '40px' : '0',
              }}
            >
              {row.keys.map((key, keyIndex) => (
                <div
                  key={keyIndex}
                  className={`${getKeyClass(key)} ${keySize}`}
                  style={{
                    width: getKeyWidth(key),
                    minWidth: key.width ? 'auto' : undefined,
                  }}
                >
                  {/* Primary character */}
                  <span className="font-mono font-semibold">
                    {key.primary === ' ' ? '␣' : key.primary}
                  </span>

                  {/* Secondary character (shift) */}
                  {key.secondary && (
                    <span className="text-[10px] text-gray-400 absolute top-0.5 right-0.5">
                      {key.secondary}
                    </span>
                  )}

                  {/* Home row indicators */}
                  {key.isHomeRow && (key.primary === 'f' || key.primary === 'j') && (
                    <div className="absolute bottom-0.5 w-full flex justify-center">
                      <div className="w-1 h-1 bg-primary-400 rounded-full" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        {showFingerColors && (
          <div className="mt-6 pt-4 border-t border-gray-700">
            <div className="text-xs text-gray-400 text-center mb-2">
              Vinger kleuren
            </div>
            <div className="flex gap-4 justify-center flex-wrap">
              <FingerLegendItem color="bg-pink-500" label="Pink" />
              <FingerLegendItem color="bg-blue-500" label="Ring" />
              <FingerLegendItem color="bg-green-500" label="Middel" />
              <FingerLegendItem color="bg-yellow-500" label="Wijs" />
              <FingerLegendItem color="bg-purple-500" label="Duim" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface FingerLegendItemProps {
  color: string;
  label: string;
}

const FingerLegendItem: React.FC<FingerLegendItemProps> = ({ color, label }) => {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded ${color}`} />
      <span className="text-xs text-gray-400">{label}</span>
    </div>
  );
};
