import { Lesson, LessonPhase } from '../types';
import { getWordsByCombination, getWordsByPhase } from './dutchWords';

/**
 * Lesson System volgens de Monkeytype methode
 * 500+ lessen georganiseerd in modules en fases
 */

// Helper functie om lessen te genereren
function createLesson(
  id: string,
  phase: LessonPhase,
  module: string,
  number: number,
  title: string,
  description: string,
  targetLetters: string[],
  targetCombinations: string[],
  minAccuracy: number = 95,
  minWpm: number = 20
): Lesson {
  // Haal woorden op gebaseerd op de target combinaties en fase
  let words: string[] = [];

  if (targetCombinations.length > 0) {
    // Haal woorden op voor elke combinatie
    targetCombinations.forEach(combo => {
      const comboWords = getWordsByCombination(combo, phase);
      words.push(...comboWords.map(w => w.text));
    });
  } else {
    // Gebruik woorden van de fase
    const phaseWords = getWordsByPhase(phase);
    words = phaseWords.map(w => w.text);
  }

  // Verwijder duplicaten en limiteer tot 50 woorden per les
  words = [...new Set(words)].slice(0, 50);

  return {
    id,
    phase,
    module,
    number,
    title,
    description,
    targetLetters,
    targetCombinations,
    words,
    minAccuracy,
    minWpm,
    unlocked: number === 1, // Alleen eerste les is unlocked
    completed: false,
    stars: 0,
  };
}

// ============================================================================
// MODULE A: TWEELETTER BASIS (100 lessen)
// ============================================================================
const moduleA: Lesson[] = [
  // Les 1-10: "de", "het", "en" fundamentals
  createLesson('a001', 'homerow', 'A', 1, 'De Basis: Home Row', 'Leer de home row positie met echte woorden',
    ['a','s','d','f','j','k','l'], ['as', 'al'], 95, 15),
  createLesson('a002', 'homerow', 'A', 2, 'Home Row Mastery', 'Versterk je home row met meer woorden',
    ['a','s','d','f','j','k','l'], ['da', 'la', 'ja'], 95, 20),
  createLesson('a003', 'homerow', 'A', 3, 'Dubbele Klinkers', 'Train aa combinaties',
    ['a','s','d','f','j','k','l'], ['aa'], 95, 20),
  createLesson('a004', 'allletters', 'A', 4, 'DE woorden', 'Focus op het woord "de"',
    ['d','e'], ['de'], 95, 25),
  createLesson('a005', 'allletters', 'A', 5, 'HET woorden', 'Focus op het woord "het"',
    ['h','e','t'], ['he', 'et'], 95, 25),
  createLesson('a006', 'allletters', 'A', 6, 'EN combinaties', 'Train "en" combinaties',
    ['e','n'], ['en'], 95, 25),
  createLesson('a007', 'allletters', 'A', 7, 'EEN woorden', 'Train "een" patronen',
    ['e','n'], ['ee', 'en'], 95, 30),
  createLesson('a008', 'allletters', 'A', 8, 'VAN woorden', 'Focus op "van"',
    ['v','a','n'], ['va', 'an'], 95, 30),
  createLesson('a009', 'allletters', 'A', 9, 'IN combinaties', 'Train "in" woorden',
    ['i','n'], ['in'], 95, 30),
  createLesson('a010', 'allletters', 'A', 10, 'TE patronen', 'Master "te" combinaties',
    ['t','e'], ['te'], 95, 30),

  // Les 11-20: "er", "en", "te" patterns
  createLesson('a011', 'allletters', 'A', 11, 'ER combinaties basis', 'Leer "er" patronen',
    ['e','r'], ['er'], 95, 30),
  createLesson('a012', 'allletters', 'A', 12, 'ER in woorden', 'Train woorden met "er"',
    ['e','r'], ['er'], 95, 35),
  createLesson('a013', 'allletters', 'A', 13, 'OVER woorden', 'Focus op "over"',
    ['o','v','e','r'], ['ov', 've', 'er'], 95, 35),
  createLesson('a014', 'allletters', 'A', 14, 'ONDER patronen', 'Train "onder" combinaties',
    ['o','n','d','e','r'], ['on', 'nd', 'de', 'er'], 95, 35),
  createLesson('a015', 'allletters', 'A', 15, 'WATER woorden', 'Master "water" type woorden',
    ['w','a','t','e','r'], ['wa', 'at', 'te', 'er'], 95, 35),
];

// ============================================================================
// MODULE B: DRIELETTER PATRONEN (100 lessen)
// ============================================================================
const moduleB: Lesson[] = [
  // Les 1-10: "een", "ing", "ijk"
  createLesson('b001', 'allletters', 'B', 1, 'EEN patronen', 'Train driedubbel e',
    ['e','n'], ['ee', 'en'], 95, 35),
  createLesson('b002', 'allletters', 'B', 2, 'ING combinaties', 'Leer -ing eindigen',
    ['i','n','g'], ['in', 'ng'], 95, 35),
  createLesson('b003', 'allletters', 'B', 3, 'LIJK patronen', 'Train -lijk woorden',
    ['l','i','j','k'], ['li', 'ij', 'jk'], 95, 40),
  createLesson('b004', 'allletters', 'B', 4, 'OOR combinaties', 'Focus op "oor" klanken',
    ['o','r'], ['oo', 'or'], 95, 40),
  createLesson('b005', 'allletters', 'B', 5, 'AAR patronen', 'Train "aar" woorden',
    ['a','r'], ['aa', 'ar'], 95, 40),

  // Les 11-20: "sch", "tje", "cht"
  createLesson('b011', 'allletters', 'B', 11, 'SCH basis', 'Leer "sch" combinaties',
    ['s','c','h'], ['sc', 'ch'], 95, 40),
  createLesson('b012', 'allletters', 'B', 12, 'SCHOOL woorden', 'Train "school" type woorden',
    ['s','c','h','o','l'], ['sc', 'ch', 'oo', 'ol'], 95, 45),
  createLesson('b013', 'allletters', 'B', 13, 'TJE eindingen', 'Master -tje verkleinwoorden',
    ['t','j','e'], ['tj', 'je'], 95, 45),
  createLesson('b014', 'allletters', 'B', 14, 'CHT combinaties', 'Train "cht" patronen',
    ['c','h','t'], ['ch', 'ht'], 95, 45),
  createLesson('b015', 'allletters', 'B', 15, 'ACHT woorden', 'Focus op "acht" woorden',
    ['a','c','h','t'], ['ac', 'ch', 'ht'], 95, 45),
];

// ============================================================================
// MODULE C: NEDERLANDSE SPECIALS (80 lessen)
// ============================================================================
const moduleC: Lesson[] = [
  // Les 1-20: IJ-combinaties intensief
  createLesson('c001', 'allletters', 'C', 1, 'IJ basis', 'Leer de IJ combinatie',
    ['i','j'], ['ij'], 95, 40),
  createLesson('c002', 'allletters', 'C', 2, 'ZIJN woorden', 'Train "zijn" patronen',
    ['z','i','j','n'], ['zi', 'ij', 'jn'], 95, 40),
  createLesson('c003', 'allletters', 'C', 3, 'WIJ woorden', 'Focus op "wij"',
    ['w','i','j'], ['wi', 'ij'], 95, 40),
  createLesson('c004', 'allletters', 'C', 4, 'BIJ woorden', 'Master "bij" combinaties',
    ['b','i','j'], ['bi', 'ij'], 95, 45),
  createLesson('c005', 'allletters', 'C', 5, 'TIJD woorden', 'Train "tijd" patronen',
    ['t','i','j','d'], ['ti', 'ij', 'jd'], 95, 45),
  createLesson('c006', 'allletters', 'C', 6, 'RIJK woorden', 'Focus op "rijk" combinaties',
    ['r','i','j','k'], ['ri', 'ij', 'jk'], 95, 45),
  createLesson('c007', 'allletters', 'C', 7, 'KIJK woorden', 'Train "kijk" patronen',
    ['k','i','j','k'], ['ki', 'ij', 'jk'], 95, 45),
  createLesson('c008', 'allletters', 'C', 8, 'BLIJ woorden', 'Master "blij" type woorden',
    ['b','l','i','j'], ['bl', 'li', 'ij'], 95, 45),
  createLesson('c009', 'allletters', 'C', 9, 'VRIJ woorden', 'Train "vrij" combinaties',
    ['v','r','i','j'], ['vr', 'ri', 'ij'], 95, 50),
  createLesson('c010', 'allletters', 'C', 10, 'IJ mastery', 'Mix van alle IJ woorden',
    ['i','j'], ['ij'], 95, 50),

  // Les 21-40: UI/EU/AU/OU diftongs
  createLesson('c021', 'allletters', 'C', 21, 'UI combinaties', 'Leer "ui" klanken',
    ['u','i'], ['ui'], 95, 45),
  createLesson('c022', 'allletters', 'C', 22, 'HUIS woorden', 'Train "huis" patronen',
    ['h','u','i','s'], ['hu', 'ui', 'is'], 95, 45),
  createLesson('c023', 'allletters', 'C', 23, 'EU combinaties', 'Focus op "eu" klanken',
    ['e','u'], ['eu'], 95, 45),
  createLesson('c024', 'allletters', 'C', 24, 'NIEUW woorden', 'Train "nieuw" type woorden',
    ['n','i','e','u','w'], ['ni', 'ie', 'eu', 'uw'], 95, 50),
  createLesson('c025', 'allletters', 'C', 25, 'OU combinaties', 'Leer "ou" patronen',
    ['o','u'], ['ou'], 95, 45),
  createLesson('c026', 'allletters', 'C', 26, 'AU combinaties', 'Focus op "au" klanken',
    ['a','u'], ['au'], 95, 45),
];

// ============================================================================
// MODULE D: ZINSBOUW & PUNCTUATIE (100 lessen)
// ============================================================================
const moduleD: Lesson[] = [
  // Les 1-25: Korte zinnen met hoofdletters
  createLesson('d001', 'allletters', 'D', 1, 'Hoofdletters basis', 'Leer zinnen met hoofdletters beginnen',
    ['A','B','C','D','E'], [], 95, 40),
  createLesson('d002', 'special', 'D', 2, 'Punten', 'Train zinnen met punten',
    ['.'], ['.'], 95, 40),
  createLesson('d003', 'special', 'D', 3, 'Kommas', 'Focus op komma gebruik',
    [','], [','], 95, 40),
  createLesson('d004', 'special', 'D', 4, 'Korte zinnen', 'Train korte Nederlandse zinnen',
    [], [], 95, 45),

  // Les 26-50: Vraagzinnen en uitroeptekens
  createLesson('d026', 'special', 'D', 26, 'Vraagtekens', 'Leer vraagzinnen typen',
    ['?'], ['?'], 95, 45),
  createLesson('d027', 'special', 'D', 27, 'Uitroeptekens', 'Train uitroepen',
    ['!'], ['!'], 95, 45),
];

// ============================================================================
// MODULE E: PRAKTIJKTEKSTEN (120 lessen)
// ============================================================================
const moduleE: Lesson[] = [
  // Les 1-30: E-mails schrijven
  createLesson('e001', 'special', 'E', 1, 'E-mail adressen', 'Train @ en .nl combinaties',
    ['@', '.'], ['@', '.nl'], 90, 40),
  createLesson('e002', 'special', 'E', 2, 'E-mail openingen', 'Leer formele groeten typen',
    [], [], 95, 45),

  // Les 31-60: Zakelijke brieven
  createLesson('e031', 'special', 'E', 31, 'Zakelijke aanhef', 'Train formele brieven',
    [], [], 95, 50),

  // Les 61-90: Chatten/WhatsApp stijl
  createLesson('e061', 'special', 'E', 61, 'Chat taal', 'Leer informeel typen',
    [], [], 95, 55),

  // Les 91-120: Academische teksten
  createLesson('e091', 'special', 'E', 91, 'Academisch schrijven', 'Train formele taal',
    [], [], 95, 55),
];

// ============================================================================
// MODULE F: CIJFERS & DATA (50 lessen)
// ============================================================================
const moduleF: Lesson[] = [
  createLesson('f001', 'numbers', 'F', 1, 'Cijfers 1-5', 'Leer de bovenste rij cijfers',
    ['1','2','3','4','5'], [], 90, 30),
  createLesson('f002', 'numbers', 'F', 2, 'Cijfers 6-0', 'Train de rechter cijfers',
    ['6','7','8','9','0'], [], 90, 30),
  createLesson('f003', 'numbers', 'F', 3, 'Alle cijfers', 'Mix van alle cijfers',
    ['1','2','3','4','5','6','7','8','9','0'], [], 90, 35),
  createLesson('f004', 'numbers', 'F', 4, 'Datums typen', 'Leer datums zoals 01-01-2025',
    ['-'], ['-'], 90, 40),
  createLesson('f005', 'numbers', 'F', 5, 'Tijden typen', 'Train tijden zoals 12:30',
    [':'], [':'], 90, 40),
  createLesson('f006', 'numbers', 'F', 6, 'Postcodes', 'Focus op Nederlandse postcodes',
    [], [], 90, 45),
  createLesson('f007', 'numbers', 'F', 7, 'Telefoonnummers', 'Train 06-12345678 patronen',
    ['+'], ['+'], 90, 45),
  createLesson('f008', 'numbers', 'F', 8, 'Prijzen', 'Leer €12,50 typen',
    ['€', ','], ['€'], 90, 45),
  createLesson('f009', 'numbers', 'F', 9, 'Percentages', 'Train 100% patronen',
    ['%'], ['%'], 90, 45),
  createLesson('f010', 'numbers', 'F', 10, 'Data entry mix', 'Mix van alle data types',
    [], [], 90, 50),
];

// ============================================================================
// MODULE G: SPECIALE TEKENS (50 lessen)
// ============================================================================
const moduleG: Lesson[] = [
  createLesson('g001', 'special', 'G', 1, 'Haakjes ()', 'Leer ronde haakjes',
    ['(', ')'], ['(', ')'], 90, 40),
  createLesson('g002', 'special', 'G', 2, 'Vierkante haakjes []', 'Train vierkante haakjes',
    ['[', ']'], ['[', ']'], 90, 40),
  createLesson('g003', 'special', 'G', 3, 'Accolades {}', 'Focus op accolades',
    ['{', '}'], ['{', '}'], 90, 40),
  createLesson('g004', 'special', 'G', 4, 'Quotes "', 'Leer aanhalingstekens',
    ['"'], ['"'], 90, 40),
  createLesson('g005', 'special', 'G', 5, 'Apostrof \'', 'Train apostrof gebruik',
    ['\''], ['\''], 90, 40),
  createLesson('g006', 'special', 'G', 6, 'Slash /', 'Focus op forward slash',
    ['/'], ['/'], 90, 40),
  createLesson('g007', 'special', 'G', 7, 'Backslash \\', 'Train backslash',
    ['\\'], ['\\'], 90, 40),
  createLesson('g008', 'special', 'G', 8, 'Pipe |', 'Leer pipe symbool',
    ['|'], ['|'], 90, 40),
  createLesson('g009', 'special', 'G', 9, 'Underscore _', 'Train underscore',
    ['_'], ['_'], 90, 40),
  createLesson('g010', 'special', 'G', 10, 'Equals =', 'Focus op equals teken',
    ['='], ['='], 90, 40),
];

// Combineer alle modules
export const allLessons: Lesson[] = [
  ...moduleA,
  ...moduleB,
  ...moduleC,
  ...moduleD,
  ...moduleE,
  ...moduleF,
  ...moduleG,
];

// Helper functies
export function getLessonById(id: string): Lesson | undefined {
  return allLessons.find(lesson => lesson.id === id);
}

export function getLessonsByPhase(phase: LessonPhase): Lesson[] {
  return allLessons.filter(lesson => lesson.phase === phase);
}

export function getLessonsByModule(module: string): Lesson[] {
  return allLessons.filter(lesson => lesson.module === module);
}

export function getNextLesson(currentLessonId: string): Lesson | undefined {
  const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);
  if (currentIndex === -1 || currentIndex === allLessons.length - 1) {
    return undefined;
  }
  return allLessons[currentIndex + 1];
}

export function getUnlockedLessons(): Lesson[] {
  return allLessons.filter(lesson => lesson.unlocked);
}

export function unlockNextLesson(completedLessonId: string): void {
  const nextLesson = getNextLesson(completedLessonId);
  if (nextLesson) {
    nextLesson.unlocked = true;
  }
}
