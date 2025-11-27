import { KeyboardLayout, Key, Finger } from '../types';

/**
 * Nederlandse QWERTY keyboard layout
 * Met vinger-toewijzingen volgens optimal touch typing
 */

export const qwertyLayout: KeyboardLayout = {
  rows: [
    // Rij 1: Numbers
    {
      keys: [
        { primary: '1', secondary: '!', finger: 'left-pinky' },
        { primary: '2', secondary: '@', finger: 'left-ring' },
        { primary: '3', secondary: '#', finger: 'left-middle' },
        { primary: '4', secondary: '$', finger: 'left-index' },
        { primary: '5', secondary: '%', finger: 'left-index' },
        { primary: '6', secondary: '^', finger: 'right-index' },
        { primary: '7', secondary: '&', finger: 'right-index' },
        { primary: '8', secondary: '*', finger: 'right-middle' },
        { primary: '9', secondary: '(', finger: 'right-ring' },
        { primary: '0', secondary: ')', finger: 'right-pinky' },
        { primary: '-', secondary: '_', finger: 'right-pinky' },
        { primary: '=', secondary: '+', finger: 'right-pinky' },
      ],
    },
    // Rij 2: QWERTY
    {
      keys: [
        { primary: 'q', secondary: 'Q', finger: 'left-pinky' },
        { primary: 'w', secondary: 'W', finger: 'left-ring' },
        { primary: 'e', secondary: 'E', finger: 'left-middle' },
        { primary: 'r', secondary: 'R', finger: 'left-index' },
        { primary: 't', secondary: 'T', finger: 'left-index' },
        { primary: 'y', secondary: 'Y', finger: 'right-index' },
        { primary: 'u', secondary: 'U', finger: 'right-index' },
        { primary: 'i', secondary: 'I', finger: 'right-middle' },
        { primary: 'o', secondary: 'O', finger: 'right-ring' },
        { primary: 'p', secondary: 'P', finger: 'right-pinky' },
        { primary: '[', secondary: '{', finger: 'right-pinky' },
        { primary: ']', secondary: '}', finger: 'right-pinky' },
      ],
    },
    // Rij 3: HOME ROW (ASDF JKL;)
    {
      keys: [
        { primary: 'a', secondary: 'A', finger: 'left-pinky', isHomeRow: true },
        { primary: 's', secondary: 'S', finger: 'left-ring', isHomeRow: true },
        { primary: 'd', secondary: 'D', finger: 'left-middle', isHomeRow: true },
        { primary: 'f', secondary: 'F', finger: 'left-index', isHomeRow: true },
        { primary: 'g', secondary: 'G', finger: 'left-index', isHomeRow: true },
        { primary: 'h', secondary: 'H', finger: 'right-index', isHomeRow: true },
        { primary: 'j', secondary: 'J', finger: 'right-index', isHomeRow: true },
        { primary: 'k', secondary: 'K', finger: 'right-middle', isHomeRow: true },
        { primary: 'l', secondary: 'L', finger: 'right-ring', isHomeRow: true },
        { primary: ';', secondary: ':', finger: 'right-pinky', isHomeRow: true },
        { primary: "'", secondary: '"', finger: 'right-pinky' },
        { primary: '\\', secondary: '|', finger: 'right-pinky' },
      ],
    },
    // Rij 4: ZXCV
    {
      keys: [
        { primary: 'z', secondary: 'Z', finger: 'left-pinky' },
        { primary: 'x', secondary: 'X', finger: 'left-ring' },
        { primary: 'c', secondary: 'C', finger: 'left-middle' },
        { primary: 'v', secondary: 'V', finger: 'left-index' },
        { primary: 'b', secondary: 'B', finger: 'left-index' },
        { primary: 'n', secondary: 'N', finger: 'right-index' },
        { primary: 'm', secondary: 'M', finger: 'right-index' },
        { primary: ',', secondary: '<', finger: 'right-middle' },
        { primary: '.', secondary: '>', finger: 'right-ring' },
        { primary: '/', secondary: '?', finger: 'right-pinky' },
      ],
    },
    // Rij 5: Spacebar
    {
      keys: [
        { primary: ' ', finger: 'left-thumb', width: 6 },
        { primary: ' ', finger: 'right-thumb', width: 6 },
      ],
    },
  ],
};

/**
 * Vind de key info voor een character
 */
export function getKeyForChar(char: string): Key | undefined {
  for (const row of qwertyLayout.rows) {
    for (const key of row.keys) {
      if (key.primary === char || key.secondary === char) {
        return key;
      }
    }
  }
  return undefined;
}

/**
 * Krijg de finger color voor visualisatie
 */
export function getFingerColor(finger: Finger): string {
  const colorMap: Record<Finger, string> = {
    'left-pinky': 'bg-pink-500',
    'left-ring': 'bg-blue-500',
    'left-middle': 'bg-green-500',
    'left-index': 'bg-yellow-500',
    'left-thumb': 'bg-purple-500',
    'right-thumb': 'bg-purple-500',
    'right-index': 'bg-yellow-500',
    'right-middle': 'bg-green-500',
    'right-ring': 'bg-blue-500',
    'right-pinky': 'bg-pink-500',
  };
  return colorMap[finger];
}

/**
 * Krijg de finger name in Nederlands
 */
export function getFingerName(finger: Finger): string {
  const nameMap: Record<Finger, string> = {
    'left-pinky': 'Linker pink',
    'left-ring': 'Linker ringvinger',
    'left-middle': 'Linker middelvinger',
    'left-index': 'Linker wijsvinger',
    'left-thumb': 'Linker duim',
    'right-thumb': 'Rechter duim',
    'right-index': 'Rechter wijsvinger',
    'right-middle': 'Rechter middelvinger',
    'right-ring': 'Rechter ringvinger',
    'right-pinky': 'Rechter pink',
  };
  return nameMap[finger];
}

/**
 * Check of een character shift nodig heeft
 */
export function needsShift(char: string): boolean {
  const key = getKeyForChar(char);
  if (!key) return false;
  return key.secondary === char;
}

/**
 * Krijg alle home row letters
 */
export function getHomeRowLetters(): string[] {
  const homeRowKeys = qwertyLayout.rows[2].keys; // Row 3 is home row
  return homeRowKeys.map(key => key.primary);
}

/**
 * Check of character in home row zit
 */
export function isHomeRowChar(char: string): boolean {
  const homeRowLetters = getHomeRowLetters();
  return homeRowLetters.includes(char.toLowerCase());
}

/**
 * Krijg keyboard row nummer voor een character
 */
export function getRowNumber(char: string): number {
  for (let i = 0; i < qwertyLayout.rows.length; i++) {
    const row = qwertyLayout.rows[i];
    if (row.keys.some(key => key.primary === char || key.secondary === char)) {
      return i;
    }
  }
  return -1;
}

/**
 * Krijg alle keys voor een vinger
 */
export function getKeysForFinger(finger: Finger): Key[] {
  const keys: Key[] = [];
  for (const row of qwertyLayout.rows) {
    for (const key of row.keys) {
      if (key.finger === finger) {
        keys.push(key);
      }
    }
  }
  return keys;
}

/**
 * Hand position tips
 */
export const handPositionTips = {
  leftHand: [
    'Pink → A (rust positie, lichte touch)',
    'Ringvinger → S (krachtiger, dus meer werk)',
    'Middelvinger → D (langste vinger, meeste reach)',
    'Wijsvinger → F + G (meest beweeglijke, dus 2 toetsen)',
    'Duim → Spatiebalk (zwevend, niet rustend)',
  ],
  rightHand: [
    'Wijsvinger → J + H (voelknob op J is je anker)',
    'Middelvinger → K (symmetrie met links)',
    'Ringvinger → L (parallel met links)',
    'Pink → ; en \' (kleinste range, dichtbij)',
    'Duim → Spatiebalk (afwisselen met links)',
  ],
  general: [
    'Voel de F en J knobbels - dit zijn je ankers',
    'Vingers ZWEVEN boven toetsen, raken alleen aan bij aanslag',
    'Gebruik vinger-tip, niet vinger-pad (pianotechniek)',
    'Na aanslag direct terug naar zweef-positie',
    'Pols blijft stil, alleen vingers bewegen',
  ],
};

/**
 * Krijg de positie van een key op het keyboard (voor visualisatie)
 */
export function getKeyPosition(char: string): { row: number; col: number } | null {
  for (let rowIndex = 0; rowIndex < qwertyLayout.rows.length; rowIndex++) {
    const row = qwertyLayout.rows[rowIndex];
    const colIndex = row.keys.findIndex(
      key => key.primary === char || key.secondary === char
    );
    if (colIndex !== -1) {
      return { row: rowIndex, col: colIndex };
    }
  }
  return null;
}
