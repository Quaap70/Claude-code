import { useState } from 'react';
import { SessionSetup, type SessionConfig } from './components/SessionSetup';
import { TypingSession } from './components/TypingSession';
import { generateSessionWords } from './utils/wordSelection';
import type { TypingStats } from './types';

type AppView = 'setup' | 'session';

function App() {
  const [view, setView] = useState<AppView>('setup');
  const [sessionConfig, setSessionConfig] = useState<SessionConfig | null>(null);
  const [sessionWords, setSessionWords] = useState<string[]>([]);

  const handleStartSession = (config: SessionConfig) => {
    setSessionConfig(config);

    // Generate words based on configuration
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

  const handleSessionComplete = (_stats: TypingStats) => {
    // Keep on session view for now, completion modal shows on TypingSession
  };

  const handleExit = () => {
    setView('setup');
    setSessionConfig(null);
    setSessionWords([]);
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
