import { Word, WordBank } from '../types';

/**
 * Nederlandse woordenbank georganiseerd volgens de Monkeytype methode
 * Woorden zijn gesorteerd op:
 * - Frequentie (hoe vaak ze voorkomen in Nederlands)
 * - Lettercombinaties (voor targeted training)
 * - Progressieve moeilijkheid
 */

// FASE 1: HOME ROW ONLY (asdf jkl;)
const homeRowWords: Word[] = [
  // Basis 2-3 letter woorden
  { text: 'als', frequency: 100, difficulty: 1, combinations: ['al', 'ls'], phase: 'homerow' },
  { text: 'das', frequency: 80, difficulty: 1, combinations: ['da', 'as'], phase: 'homerow' },
  { text: 'lak', frequency: 70, difficulty: 1, combinations: ['la', 'ak'], phase: 'homerow' },
  { text: 'sla', frequency: 85, difficulty: 1, combinations: ['sl', 'la'], phase: 'homerow' },
  { text: 'jas', frequency: 75, difficulty: 1, combinations: ['ja', 'as'], phase: 'homerow' },
  { text: 'dal', frequency: 65, difficulty: 1, combinations: ['da', 'al'], phase: 'homerow' },
  { text: 'hal', frequency: 70, difficulty: 1, combinations: ['ha', 'al'], phase: 'homerow' },
  { text: 'sal', frequency: 60, difficulty: 1, combinations: ['sa', 'al'], phase: 'homerow' },
  { text: 'laf', frequency: 65, difficulty: 1, combinations: ['la', 'af'], phase: 'homerow' },
  { text: 'dak', frequency: 80, difficulty: 1, combinations: ['da', 'ak'], phase: 'homerow' },

  // 3-4 letter woorden
  { text: 'vaak', frequency: 95, difficulty: 2, combinations: ['va', 'aa', 'ak'], phase: 'homerow' },
  { text: 'kaas', frequency: 75, difficulty: 2, combinations: ['ka', 'aa', 'as'], phase: 'homerow' },
  { text: 'saai', frequency: 70, difficulty: 2, combinations: ['sa', 'aa', 'ai'], phase: 'homerow' },
  { text: 'haak', frequency: 65, difficulty: 2, combinations: ['ha', 'aa', 'ak'], phase: 'homerow' },
  { text: 'aal', frequency: 60, difficulty: 2, combinations: ['aa', 'al'], phase: 'homerow' },
  { text: 'kaal', frequency: 65, difficulty: 2, combinations: ['ka', 'aa', 'al'], phase: 'homerow' },
  { text: 'hals', frequency: 75, difficulty: 2, combinations: ['ha', 'al', 'ls'], phase: 'homerow' },
  { text: 'vals', frequency: 70, difficulty: 2, combinations: ['va', 'al', 'ls'], phase: 'homerow' },
  { text: 'aas', frequency: 60, difficulty: 2, combinations: ['aa', 'as'], phase: 'homerow' },
  { text: 'laag', frequency: 85, difficulty: 2, combinations: ['la', 'aa', 'ag'], phase: 'homerow' },

  // Met G en H toegevoegd
  { text: 'glas', frequency: 90, difficulty: 2, combinations: ['gl', 'la', 'as'], phase: 'homerow' },
  { text: 'slag', frequency: 85, difficulty: 2, combinations: ['sl', 'la', 'ag'], phase: 'homerow' },
  { text: 'gaf', frequency: 80, difficulty: 2, combinations: ['ga', 'af'], phase: 'homerow' },
  { text: 'hak', frequency: 70, difficulty: 2, combinations: ['ha', 'ak'], phase: 'homerow' },
  { text: 'haag', frequency: 75, difficulty: 2, combinations: ['ha', 'aa', 'ag'], phase: 'homerow' },
];

// FASE 2: ALLE LETTERS (volledige alfabet)
const allLettersWords: Word[] = [
  // Hoogfrequente Nederlandse woorden
  { text: 'de', frequency: 100, difficulty: 1, combinations: ['de'], phase: 'allletters' },
  { text: 'het', frequency: 100, difficulty: 1, combinations: ['he', 'et'], phase: 'allletters' },
  { text: 'een', frequency: 100, difficulty: 1, combinations: ['ee', 'en'], phase: 'allletters' },
  { text: 'en', frequency: 100, difficulty: 1, combinations: ['en'], phase: 'allletters' },
  { text: 'van', frequency: 95, difficulty: 1, combinations: ['va', 'an'], phase: 'allletters' },
  { text: 'in', frequency: 95, difficulty: 1, combinations: ['in'], phase: 'allletters' },
  { text: 'te', frequency: 95, difficulty: 1, combinations: ['te'], phase: 'allletters' },
  { text: 'die', frequency: 95, difficulty: 1, combinations: ['di', 'ie'], phase: 'allletters' },
  { text: 'dat', frequency: 95, difficulty: 1, combinations: ['da', 'at'], phase: 'allletters' },
  { text: 'is', frequency: 95, difficulty: 1, combinations: ['is'], phase: 'allletters' },

  // IJ combinaties (typisch Nederlands)
  { text: 'zijn', frequency: 100, difficulty: 2, combinations: ['zi', 'ij', 'jn'], phase: 'allletters' },
  { text: 'wij', frequency: 90, difficulty: 2, combinations: ['wi', 'ij'], phase: 'allletters' },
  { text: 'bij', frequency: 90, difficulty: 2, combinations: ['bi', 'ij'], phase: 'allletters' },
  { text: 'mij', frequency: 85, difficulty: 2, combinations: ['mi', 'ij'], phase: 'allletters' },
  { text: 'vrij', frequency: 80, difficulty: 2, combinations: ['vr', 'ri', 'ij'], phase: 'allletters' },
  { text: 'blij', frequency: 75, difficulty: 2, combinations: ['bl', 'li', 'ij'], phase: 'allletters' },
  { text: 'tijd', frequency: 90, difficulty: 2, combinations: ['ti', 'ij', 'jd'], phase: 'allletters' },
  { text: 'rijk', frequency: 80, difficulty: 2, combinations: ['ri', 'ij', 'jk'], phase: 'allletters' },
  { text: 'wijk', frequency: 75, difficulty: 2, combinations: ['wi', 'ij', 'jk'], phase: 'allletters' },
  { text: 'kijk', frequency: 80, difficulty: 2, combinations: ['ki', 'ij', 'jk'], phase: 'allletters' },

  // ER combinaties
  { text: 'er', frequency: 95, difficulty: 1, combinations: ['er'], phase: 'allletters' },
  { text: 'over', frequency: 90, difficulty: 2, combinations: ['ov', 've', 'er'], phase: 'allletters' },
  { text: 'onder', frequency: 85, difficulty: 2, combinations: ['on', 'nd', 'de', 'er'], phase: 'allletters' },
  { text: 'water', frequency: 85, difficulty: 2, combinations: ['wa', 'at', 'te', 'er'], phase: 'allletters' },
  { text: 'vader', frequency: 80, difficulty: 2, combinations: ['va', 'ad', 'de', 'er'], phase: 'allletters' },
  { text: 'moeder', frequency: 80, difficulty: 3, combinations: ['mo', 'oe', 'ed', 'de', 'er'], phase: 'allletters' },
  { text: 'broer', frequency: 75, difficulty: 2, combinations: ['br', 'ro', 'oe', 'er'], phase: 'allletters' },
  { text: 'zuster', frequency: 70, difficulty: 3, combinations: ['zu', 'us', 'st', 'te', 'er'], phase: 'allletters' },

  // AA, EE, OO combinaties
  { text: 'aan', frequency: 95, difficulty: 1, combinations: ['aa', 'an'], phase: 'allletters' },
  { text: 'geen', frequency: 90, difficulty: 2, combinations: ['ge', 'ee', 'en'], phase: 'allletters' },
  { text: 'door', frequency: 90, difficulty: 2, combinations: ['do', 'oo', 'or'], phase: 'allletters' },
  { text: 'voor', frequency: 95, difficulty: 2, combinations: ['vo', 'oo', 'or'], phase: 'allletters' },
  { text: 'maar', frequency: 90, difficulty: 2, combinations: ['ma', 'aa', 'ar'], phase: 'allletters' },
  { text: 'naar', frequency: 90, difficulty: 2, combinations: ['na', 'aa', 'ar'], phase: 'allletters' },
  { text: 'waar', frequency: 85, difficulty: 2, combinations: ['wa', 'aa', 'ar'], phase: 'allletters' },
  { text: 'weer', frequency: 85, difficulty: 2, combinations: ['we', 'ee', 'er'], phase: 'allletters' },
  { text: 'meer', frequency: 85, difficulty: 2, combinations: ['me', 'ee', 'er'], phase: 'allletters' },
  { text: 'veel', frequency: 90, difficulty: 2, combinations: ['ve', 'ee', 'el'], phase: 'allletters' },

  // NG, NK combinaties
  { text: 'lang', frequency: 85, difficulty: 2, combinations: ['la', 'an', 'ng'], phase: 'allletters' },
  { text: 'bang', frequency: 75, difficulty: 2, combinations: ['ba', 'an', 'ng'], phase: 'allletters' },
  { text: 'denk', frequency: 80, difficulty: 2, combinations: ['de', 'en', 'nk'], phase: 'allletters' },
  { text: 'dank', frequency: 75, difficulty: 2, combinations: ['da', 'an', 'nk'], phase: 'allletters' },
  { text: 'link', frequency: 70, difficulty: 2, combinations: ['li', 'in', 'nk'], phase: 'allletters' },
  { text: 'ring', frequency: 70, difficulty: 2, combinations: ['ri', 'in', 'ng'], phase: 'allletters' },
  { text: 'ding', frequency: 75, difficulty: 2, combinations: ['di', 'in', 'ng'], phase: 'allletters' },
  { text: 'jong', frequency: 80, difficulty: 2, combinations: ['jo', 'on', 'ng'], phase: 'allletters' },

  // CH, SCH combinaties
  { text: 'och', frequency: 65, difficulty: 2, combinations: ['oc', 'ch'], phase: 'allletters' },
  { text: 'acht', frequency: 75, difficulty: 2, combinations: ['ac', 'ch', 'ht'], phase: 'allletters' },
  { text: 'acht', frequency: 75, difficulty: 2, combinations: ['ac', 'ch', 'ht'], phase: 'allletters' },
  { text: 'school', frequency: 85, difficulty: 3, combinations: ['sc', 'ch', 'ho', 'oo', 'ol'], phase: 'allletters' },
  { text: 'schip', frequency: 70, difficulty: 3, combinations: ['sc', 'ch', 'hi', 'ip'], phase: 'allletters' },
  { text: 'schat', frequency: 70, difficulty: 3, combinations: ['sc', 'ch', 'ha', 'at'], phase: 'allletters' },

  // Langere woorden
  { text: 'kunnen', frequency: 90, difficulty: 3, combinations: ['ku', 'un', 'nn', 'ne', 'en'], phase: 'allletters' },
  { text: 'worden', frequency: 90, difficulty: 3, combinations: ['wo', 'or', 'rd', 'de', 'en'], phase: 'allletters' },
  { text: 'mensen', frequency: 85, difficulty: 3, combinations: ['me', 'en', 'ns', 'se', 'en'], phase: 'allletters' },
  { text: 'werken', frequency: 85, difficulty: 3, combinations: ['we', 'er', 'rk', 'ke', 'en'], phase: 'allletters' },
  { text: 'komen', frequency: 85, difficulty: 2, combinations: ['ko', 'om', 'me', 'en'], phase: 'allletters' },
  { text: 'gaan', frequency: 90, difficulty: 2, combinations: ['ga', 'aa', 'an'], phase: 'allletters' },
  { text: 'maken', frequency: 85, difficulty: 2, combinations: ['ma', 'ak', 'ke', 'en'], phase: 'allletters' },
  { text: 'goed', frequency: 85, difficulty: 2, combinations: ['go', 'oe', 'ed'], phase: 'allletters' },
  { text: 'groot', frequency: 80, difficulty: 2, combinations: ['gr', 'ro', 'oo', 'ot'], phase: 'allletters' },
  { text: 'nieuw', frequency: 80, difficulty: 3, combinations: ['ni', 'ie', 'eu', 'uw'], phase: 'allletters' },

  // Meer dagelijkse woorden
  { text: 'huis', frequency: 85, difficulty: 2, combinations: ['hu', 'ui', 'is'], phase: 'allletters' },
  { text: 'jaar', frequency: 85, difficulty: 2, combinations: ['ja', 'aa', 'ar'], phase: 'allletters' },
  { text: 'dag', frequency: 90, difficulty: 1, combinations: ['da', 'ag'], phase: 'allletters' },
  { text: 'hand', frequency: 80, difficulty: 2, combinations: ['ha', 'an', 'nd'], phase: 'allletters' },
  { text: 'kind', frequency: 85, difficulty: 2, combinations: ['ki', 'in', 'nd'], phase: 'allletters' },
  { text: 'land', frequency: 85, difficulty: 2, combinations: ['la', 'an', 'nd'], phase: 'allletters' },
  { text: 'stad', frequency: 80, difficulty: 2, combinations: ['st', 'ta', 'ad'], phase: 'allletters' },
  { text: 'weg', frequency: 85, difficulty: 2, combinations: ['we', 'eg'], phase: 'allletters' },
  { text: 'boek', frequency: 80, difficulty: 2, combinations: ['bo', 'oe', 'ek'], phase: 'allletters' },
  { text: 'naam', frequency: 80, difficulty: 2, combinations: ['na', 'aa', 'am'], phase: 'allletters' },
  { text: 'ogen', frequency: 75, difficulty: 2, combinations: ['og', 'ge', 'en'], phase: 'allletters' },
  { text: 'hoofd', frequency: 75, difficulty: 3, combinations: ['ho', 'oo', 'of', 'fd'], phase: 'allletters' },
  { text: 'leven', frequency: 85, difficulty: 2, combinations: ['le', 'ev', 've', 'en'], phase: 'allletters' },
  { text: 'vinden', frequency: 85, difficulty: 3, combinations: ['vi', 'in', 'nd', 'de', 'en'], phase: 'allletters' },
  { text: 'willen', frequency: 85, difficulty: 3, combinations: ['wi', 'il', 'll', 'le', 'en'], phase: 'allletters' },
  { text: 'zeggen', frequency: 85, difficulty: 3, combinations: ['ze', 'eg', 'gg', 'ge', 'en'], phase: 'allletters' },
];

// FASE 3: CIJFERS EN SYMBOLEN
const numbersWords: Word[] = [
  // Datums
  { text: '2025', frequency: 80, difficulty: 3, combinations: ['20', '02', '25'], phase: 'numbers' },
  { text: '1990', frequency: 75, difficulty: 3, combinations: ['19', '99', '90'], phase: 'numbers' },
  { text: '01-01-2025', frequency: 70, difficulty: 4, combinations: ['01', '-', '2025'], phase: 'numbers' },

  // Postcodes
  { text: '1234AB', frequency: 65, difficulty: 4, combinations: ['12', '34', 'AB'], phase: 'numbers' },
  { text: '5678CD', frequency: 65, difficulty: 4, combinations: ['56', '78', 'CD'], phase: 'numbers' },

  // Telefoonnummers
  { text: '06-12345678', frequency: 70, difficulty: 5, combinations: ['06', '-', '1234'], phase: 'numbers' },
  { text: '+31612345678', frequency: 65, difficulty: 5, combinations: ['+31', '612'], phase: 'numbers' },

  // Prijzen
  { text: '€12,50', frequency: 75, difficulty: 4, combinations: ['€', '12', ',', '50'], phase: 'numbers' },
  { text: '€100,-', frequency: 70, difficulty: 3, combinations: ['€', '100', ',-'], phase: 'numbers' },

  // Tijden
  { text: '12:30', frequency: 80, difficulty: 3, combinations: ['12', ':', '30'], phase: 'numbers' },
  { text: '09:00', frequency: 75, difficulty: 3, combinations: ['09', ':', '00'], phase: 'numbers' },

  // Gemengd
  { text: '100%', frequency: 75, difficulty: 3, combinations: ['100', '%'], phase: 'numbers' },
  { text: '1e', frequency: 70, difficulty: 2, combinations: ['1', 'e'], phase: 'numbers' },
  { text: '2e', frequency: 70, difficulty: 2, combinations: ['2', 'e'], phase: 'numbers' },
  { text: '3e', frequency: 70, difficulty: 2, combinations: ['3', 'e'], phase: 'numbers' },
];

// FASE 4: SPECIALE TEKENS
const specialWords: Word[] = [
  // E-mail componenten
  { text: 'naam@email.nl', frequency: 80, difficulty: 5, combinations: ['@', '.nl'], phase: 'special' },
  { text: 'info@bedrijf.com', frequency: 75, difficulty: 5, combinations: ['@', '.com'], phase: 'special' },

  // URLs
  { text: 'www.website.nl', frequency: 75, difficulty: 5, combinations: ['www', '.', 'nl'], phase: 'special' },
  { text: 'https://site.nl', frequency: 70, difficulty: 5, combinations: ['https', '://', '.nl'], phase: 'special' },

  // Zinnen met leestekens
  { text: 'Hallo!', frequency: 80, difficulty: 2, combinations: ['Ha', 'llo', '!'], phase: 'special' },
  { text: 'Wat?', frequency: 75, difficulty: 2, combinations: ['Wa', 't', '?'], phase: 'special' },
  { text: 'Ja, graag.', frequency: 70, difficulty: 3, combinations: ['Ja', ',', 'graag', '.'], phase: 'special' },
  { text: "Hij zei: 'Kom!'", frequency: 65, difficulty: 5, combinations: [':', "'", '!'], phase: 'special' },

  // Nederlandse speciale tekens
  { text: 'één', frequency: 75, difficulty: 3, combinations: ['éé', 'én'], phase: 'special' },
  { text: 'café', frequency: 70, difficulty: 3, combinations: ['ca', 'fé'], phase: 'special' },
  { text: 'België', frequency: 75, difficulty: 3, combinations: ['Bel', 'gi', 'ië'], phase: 'special' },
  { text: 'naïef', frequency: 60, difficulty: 4, combinations: ['na', 'ïe', 'ef'], phase: 'special' },

  // Haakjes en quotes
  { text: '(belangrijk)', frequency: 65, difficulty: 4, combinations: ['(', ')', 'belangrijk'], phase: 'special' },
  { text: '[TODO]', frequency: 60, difficulty: 3, combinations: ['[', ']', 'TODO'], phase: 'special' },
  { text: '"Hallo"', frequency: 70, difficulty: 3, combinations: ['"', 'Hallo', '"'], phase: 'special' },
];

// Combineer alles in een WordBank
export const dutchWordBank: WordBank = {
  homerow: homeRowWords,
  allletters: allLettersWords,
  numbers: numbersWords,
  special: specialWords,
  advanced: [...allLettersWords, ...numbersWords, ...specialWords], // Mix van alles
};

/**
 * Krijg woorden voor een specifieke fase
 */
export function getWordsByPhase(phase: string): Word[] {
  switch (phase) {
    case 'homerow':
      return dutchWordBank.homerow;
    case 'allletters':
      return dutchWordBank.allletters;
    case 'numbers':
      return dutchWordBank.numbers;
    case 'special':
      return dutchWordBank.special;
    case 'advanced':
      return dutchWordBank.advanced;
    default:
      return dutchWordBank.allletters;
  }
}

/**
 * Krijg woorden met een specifieke lettercombinatie
 */
export function getWordsByCombination(combination: string, phase?: string): Word[] {
  const words = phase ? getWordsByPhase(phase) : Object.values(dutchWordBank).flat();
  return words.filter(word => word.combinations.includes(combination));
}

/**
 * Krijg hoogfrequente woorden
 */
export function getHighFrequencyWords(count: number, phase?: string): Word[] {
  const words = phase ? getWordsByPhase(phase) : dutchWordBank.allletters;
  return words
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, count);
}
