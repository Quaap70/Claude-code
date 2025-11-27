import React, { useState } from 'react';
import type { SessionMode, SessionDuration, SessionWordCount, LessonPhase } from '../types';

interface SessionSetupProps {
  onStart: (config: SessionConfig) => void;
}

export interface SessionConfig {
  mode: SessionMode;
  duration?: SessionDuration;
  wordCount?: SessionWordCount;
  phase: LessonPhase;
  showKeyboard: boolean;
}

/**
 * SessionSetup Component
 * Configuration screen for starting a new typing session
 */
export const SessionSetup: React.FC<SessionSetupProps> = ({ onStart }) => {
  const [mode, setMode] = useState<SessionMode>('time');
  const [duration, setDuration] = useState<SessionDuration>(600); // 10 minutes
  const [wordCount, setWordCount] = useState<SessionWordCount>(50);
  const [phase, setPhase] = useState<LessonPhase>('allletters');
  const [showKeyboard, setShowKeyboard] = useState(true);

  const handleStart = () => {
    onStart({
      mode,
      duration: mode === 'time' ? duration : undefined,
      wordCount: mode === 'words' ? wordCount : undefined,
      phase,
      showKeyboard,
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold gradient-text mb-4">
            TypeMaster Pro
          </h1>
          <p className="text-gray-400 text-lg">
            Leer blind typen met de revolutionaire Monkeytype methode
          </p>
        </div>

        {/* Setup Card */}
        <div className="card space-y-6">
          {/* Mode Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Sessie Modus
            </label>
            <div className="grid grid-cols-3 gap-3">
              <ModeButton
                active={mode === 'time'}
                onClick={() => setMode('time')}
                icon="⏱️"
                label="Tijd"
              />
              <ModeButton
                active={mode === 'words'}
                onClick={() => setMode('words')}
                icon="📝"
                label="Woorden"
              />
              <ModeButton
                active={mode === 'endless'}
                onClick={() => setMode('endless')}
                icon="♾️"
                label="Endless"
              />
            </div>
          </div>

          {/* Duration Selection (Time mode) */}
          {mode === 'time' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Duur
              </label>
              <div className="grid grid-cols-3 gap-3">
                <DurationButton
                  active={duration === 120}
                  onClick={() => setDuration(120)}
                  label="2 min"
                />
                <DurationButton
                  active={duration === 300}
                  onClick={() => setDuration(300)}
                  label="5 min"
                />
                <DurationButton
                  active={duration === 600}
                  onClick={() => setDuration(600)}
                  label="10 min"
                />
                <DurationButton
                  active={duration === 900}
                  onClick={() => setDuration(900)}
                  label="15 min"
                />
                <DurationButton
                  active={duration === 1800}
                  onClick={() => setDuration(1800)}
                  label="30 min"
                />
                <DurationButton
                  active={duration === 3600}
                  onClick={() => setDuration(3600)}
                  label="60 min"
                />
              </div>
            </div>
          )}

          {/* Word Count Selection (Words mode) */}
          {mode === 'words' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Aantal Woorden
              </label>
              <div className="grid grid-cols-3 gap-3">
                <DurationButton
                  active={wordCount === 25}
                  onClick={() => setWordCount(25)}
                  label="25"
                />
                <DurationButton
                  active={wordCount === 50}
                  onClick={() => setWordCount(50)}
                  label="50"
                />
                <DurationButton
                  active={wordCount === 100}
                  onClick={() => setWordCount(100)}
                  label="100"
                />
                <DurationButton
                  active={wordCount === 250}
                  onClick={() => setWordCount(250)}
                  label="250"
                />
                <DurationButton
                  active={wordCount === 500}
                  onClick={() => setWordCount(500)}
                  label="500"
                />
              </div>
            </div>
          )}

          {/* Phase Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Niveau
            </label>
            <div className="grid grid-cols-2 gap-3">
              <PhaseButton
                active={phase === 'homerow'}
                onClick={() => setPhase('homerow')}
                label="Home Row"
                description="Alleen asdf jkl;"
              />
              <PhaseButton
                active={phase === 'allletters'}
                onClick={() => setPhase('allletters')}
                label="Alle Letters"
                description="Volledig alfabet"
              />
              <PhaseButton
                active={phase === 'numbers'}
                onClick={() => setPhase('numbers')}
                label="Cijfers"
                description="Cijfers & symbolen"
              />
              <PhaseButton
                active={phase === 'special'}
                onClick={() => setPhase('special')}
                label="Speciaal"
                description="Alle tekens"
              />
            </div>
          </div>

          {/* Options */}
          <div className="pt-4 border-t border-gray-700">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={showKeyboard}
                onChange={(e) => setShowKeyboard(e.target.checked)}
                className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-gray-300">Toon virtueel toetsenbord</span>
            </label>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStart}
            className="btn btn-primary w-full py-4 text-lg font-semibold"
          >
            Start Sessie
          </button>
        </div>

        {/* Quick Tips */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>💡 Tip: Begin met Home Row voor de beste resultaten</p>
        </div>
      </div>
    </div>
  );
};

interface ModeButtonProps {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
}

const ModeButton: React.FC<ModeButtonProps> = ({ active, onClick, icon, label }) => {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-lg border-2 transition-all ${
        active
          ? 'border-primary-500 bg-primary-500/10 text-white'
          : 'border-gray-700 bg-gray-800/50 text-gray-400 hover:border-gray-600'
      }`}
    >
      <div className="text-2xl mb-2">{icon}</div>
      <div className="font-medium">{label}</div>
    </button>
  );
};

interface DurationButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

const DurationButton: React.FC<DurationButtonProps> = ({ active, onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-lg border transition-all ${
        active
          ? 'border-primary-500 bg-primary-500/10 text-white'
          : 'border-gray-700 bg-gray-800/50 text-gray-400 hover:border-gray-600'
      }`}
    >
      {label}
    </button>
  );
};

interface PhaseButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
  description: string;
}

const PhaseButton: React.FC<PhaseButtonProps> = ({
  active,
  onClick,
  label,
  description,
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-lg border text-left transition-all ${
        active
          ? 'border-primary-500 bg-primary-500/10'
          : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
      }`}
    >
      <div className={`font-medium mb-1 ${active ? 'text-white' : 'text-gray-300'}`}>
        {label}
      </div>
      <div className="text-sm text-gray-500">{description}</div>
    </button>
  );
};
