import { useEffect, useCallback, useRef } from 'react';

export interface KeyboardInputConfig {
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  enabled?: boolean;
  preventDefaultKeys?: string[];
}

/**
 * Hook voor keyboard input handling
 * Luistert naar toetsenbord events en roept callbacks aan
 */
export function useKeyboardInput(config: KeyboardInputConfig) {
  const {
    onKeyPress,
    onBackspace,
    enabled = true,
    preventDefaultKeys = ['Backspace', 'Tab'],
  } = config;

  const enabledRef = useRef(enabled);

  useEffect(() => {
    enabledRef.current = enabled;
  }, [enabled]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabledRef.current) return;

    // Prevent default voor bepaalde keys
    if (preventDefaultKeys.includes(event.key)) {
      event.preventDefault();
    }

    // Ignore modifier keys alleen
    if (event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }

    // Handle backspace
    if (event.key === 'Backspace') {
      event.preventDefault();
      onBackspace();
      return;
    }

    // Handle regular characters
    // Alleen single characters (niet "Shift", "Enter", etc.)
    if (event.key.length === 1) {
      event.preventDefault();
      onKeyPress(event.key);
    }
  }, [onKeyPress, onBackspace, preventDefaultKeys]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return {
    enabled: enabledRef.current,
  };
}
