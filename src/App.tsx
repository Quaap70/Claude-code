import React, { useState } from 'react';
import { SessionSetup, SessionConfig } from './components/SessionSetup';
import { TypingSession } from './components/TypingSession';
import { generateSessionWords } from './utils/wordSelection';
import { TypingStats } from './types';

type AppView = 'setup' | 'session' | 'results';

function App() {
  const [view, setView] = useState<AppView>('setup');
  const [sessionConfig, setSessionConfig] = useState<SessionConfig | null>(null);
  const [sessionWords, setSessionWords] = useState<string[]>([]);
  const [sessionResults, setSessionResults] = useState<TypingStats | null>(null);

  const handleStartSession = (config: SessionConfig) => {
    setSessionConfig(config);

    // Generate words based on configuration
    const wordCount = config.mode === 'words' ? config.wordCount! :
                     config.mode === 'time' ? Math.ceil((config.duration! / 60) * 50) : // Estimate based on 50 WPM
                     100; // Default for endless

    const words = generateSessionWords(
      config.mode === 'time' ? config.duration! : 300,
      40,
      {
        phase: config.phase,
      }
    );

    setSessionWords(words);
    setView('session');
  };

  const handleSessionComplete = (stats: TypingStats) => {
    setSessionResults(stats);
    // Keep on session view for now, completion modal shows on TypingSession
  };

  const handleExit = () => {
    setView('setup');
    setSessionConfig(null);
    setSessionWords([]);
    setSessionResults(null);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {view === 'setup' && (
        <SessionSetup onStart={handleStartSession} />
      )}

      {view === 'session' && sessionConfig && (
        <TypingSession
          words={sessionWords}
          mode={sessionConfig.mode}
          duration={sessionConfig.duration}
          wordCount={sessionConfig.wordCount}
          showKeyboard={sessionConfig.showKeyboard}
          onComplete={handleSessionComplete}
          onExit={handleExit}
        />
      )}
    </div>
  );
}

export default App;
