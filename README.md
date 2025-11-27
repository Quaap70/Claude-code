# 🚀 TypeMaster Pro - Nederlandse Blind-Type Training App

Een revolutionaire Nederlandse typing trainer die de bewezen **Monkeytype methodologie** combineert met minimale maar essentiële vingerpositionering. Gebruikers leren 40% sneller blind typen door vanaf dag één met echte woorden te werken in plaats van saaie letterherhalingen.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

## ✨ Core Filosofie: Monkeytype Methode

### Het Monkeytype Principe
- ❌ **GEEN** jjj-fff oefeningen - bewezen ineffectief
- ✅ **DIRECT** echte woorden vanaf de eerste minuut
- ✅ Lettercombinaties trainen in plaats van individuele letters
- ✅ Contextual motor learning - je brein leert bewegingspatronen voor complete woorden
- ✅ Frequentie-gebaseerde selectie - oefen wat je daadwerkelijk typt

## 🎯 Features

### 🎮 Sessie Modi
- **⏱️ Tijd-gebaseerd**: 2, 5, 10, 15, 30, of 60 minuten sessies
- **📝 Woord-gebaseerd**: 25, 50, 100, 250, of 500 woorden
- **♾️ Endless mode**: Blijf typen zolang je wilt

### 📊 Real-time Statistieken
- **WPM (Words Per Minute)**: Live berekening van type snelheid
- **Accuracy**: Nauwkeurigheids percentage
- **Consistency**: Stabiliteit van je type ritme
- **Error tracking**: Detectie van fout patronen voor adaptief leren

### 🎨 Visuele Feedback
- **Color-coded characters**:
  - 🟢 Groen = Correct
  - 🔴 Rood = Incorrect
  - ⚪ Grijs = Nog te typen
  - 🔵 Blauw = Huidige positie
- **Keyboard visualization**: Interactief toetsenbord met:
  - Vinger kleur codering
  - Home row highlighting
  - Active key highlighting
  - F & J knobbel indicatoren

### 📚 Uitgebreid Lessen Systeem
500+ lessen georganiseerd in 7 modules:

#### Module A: Tweeletter Basis (100 lessen)
- Les 1-10: "de", "het", "en" fundamentals
- Les 11-20: "er", "en", "te" patronen
- Les 21-30: "ge", "be", "ver" prefixes

#### Module B: Drieletter Patronen (100 lessen)
- Les 1-10: "een", "ing", "ijk"
- Les 11-20: "sch", "tje", "cht"

#### Module C: Nederlandse Specials (80 lessen)
- Les 1-20: IJ-combinaties intensief
- Les 21-40: UI/EU/AU/OU diftongs
- Les 41-60: Trema woorden

#### Module D: Zinsbouw & Punctuatie (100 lessen)
- Les 1-25: Korte zinnen met hoofdletters
- Les 26-50: Vraagzinnen en uitroeptekens

#### Module E: Praktijkteksten (120 lessen)
- Les 1-30: E-mails schrijven
- Les 31-60: Zakelijke brieven
- Les 61-90: Chatten/WhatsApp stijl

#### Module F: Cijfers & Data (50 lessen)
- Datums, postcodes, telefoonnummers
- Prijzen, percentages, tijden

#### Module G: Speciale Tekens (50 lessen)
- Haakjes, quotes, slashes
- Programming symbolen

### 🎓 4 Progressieve Fases

1. **Home Row** (asdf jkl;)
   - Focus op basis positionering
   - 25+ woorden alleen met home row

2. **Alle Letters** (Volledig alfabet)
   - 200+ hoogfrequente Nederlandse woorden
   - IJ-combinaties, CH/SCH, NG/NK patronen

3. **Cijfers** (Numbers & symbols)
   - Data entry oefeningen
   - Postcodes, telefoonnummers, prijzen

4. **Speciaal** (All characters)
   - E-mail adressen, URLs
   - Nederlandse speciale tekens (é, è, ë)

### 🧠 Adaptief Leer Algoritme

Het Monkeytype Word Selection Algoritme selecteert woorden:
- **40%** Gebaseerd op je zwakke punten
- **20%** Review woorden
- **30%** Nieuwe uitdagingen
- **10%** Hoogfrequente woorden

## 🚀 Quick Start

### Installatie

```bash
# Clone de repository
git clone <repository-url>
cd Claude-code

# Installeer dependencies
npm install

# Start development server
npm run dev
```

De app draait op: **http://localhost:5173/**

### Build voor productie

```bash
npm run build
```

## 🏗️ Project Structuur

```
src/
├── components/          # React componenten
│   ├── TypingArea.tsx          # Hoofd type area met character feedback
│   ├── StatsDisplay.tsx        # Real-time statistieken
│   ├── KeyboardVisualization.tsx # Interactief keyboard
│   ├── TypingSession.tsx       # Complete sessie manager
│   └── SessionSetup.tsx        # Configuratie scherm
│
├── hooks/              # Custom React hooks
│   ├── useTypingEngine.ts      # Core typing logic
│   └── useKeyboardInput.ts     # Keyboard event handling
│
├── data/               # Data en content
│   ├── dutchWords.ts          # 200+ Nederlandse woorden
│   ├── lessons.ts             # 500+ lessen systeem
│   └── keyboardLayout.ts      # QWERTY layout met finger mapping
│
├── utils/              # Utility functies
│   ├── typingCalculations.ts  # WPM, accuracy, consistency
│   └── wordSelection.ts       # Monkeytype selectie algoritme
│
├── types/              # TypeScript definities
│   └── index.ts               # Alle type definities
│
└── App.tsx             # Main app component
```

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS v4** - Styling
- **@tailwindcss/postcss** - PostCSS plugin

## 📊 Typing Statistieken

### WPM Berekening
```typescript
WPM = (correctChars / 5) / minutes
```

### Accuracy Berekening
```typescript
Accuracy = (correctChars / totalChars) * 100
```

### Consistency Score
Gebaseerd op variatie in WPM over time windows met standard deviation.

## 🎯 Roadmap

### Fase 1: Core MVP ✅
- [x] Basic typing engine
- [x] Real-time statistieken
- [x] Nederlandse woordenbank
- [x] Keyboard visualisatie
- [x] 500+ lessen systeem
- [x] Sessie modi (tijd/woorden/endless)

### Fase 2: Gamification (Toekomstig)
- [ ] XP & Level systeem
- [ ] Badges & Achievements
- [ ] Daily challenges
- [ ] Leaderboards
- [ ] Streak tracking

### Fase 3: Enhanced Learning (Toekomstig)
- [ ] Hand position wizard
- [ ] Audio feedback
- [ ] Progress tracking met LocalStorage
- [ ] Statistics dashboard met grafieken
- [ ] Custom text import

### Fase 4: Health & Accessibility (Toekomstig)
- [ ] RSI prevention met micro-breaks
- [ ] Stretch reminder animations
- [ ] Dyslexie-vriendelijke fonts
- [ ] Dark/Light theme switching
- [ ] Font size aanpassing

### Fase 5: Social Features (Toekomstig)
- [ ] Multiplayer typing races
- [ ] Friend challenges
- [ ] Team battles
- [ ] Share progress

## 🤝 Contributing

Contributions zijn welkom! Open een issue of pull request.

## 📝 License

MIT License - voel je vrij om te gebruiken en aan te passen.

## 🙏 Credits

Geïnspireerd door [Monkeytype](https://monkeytype.com/) - de beste typing trainer ter wereld.

---

**Gemaakt met ❤️ voor de Nederlandse typing community**
