# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A single-page web quiz app — **"Verdadeiro ou Falso: Logística e Supply Chain"** — for personal study of Logistics and Supply Chain concepts. Fully client-side, no backend, no authentication, no persistence.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Production build
npm run preview      # Preview production build locally
```

No tests or linting are configured yet. The app runs entirely with `npm install && npm run dev` — no environment variables or external services required.

## Architecture

**Stack:** React 18 + Vite, plain JavaScript (no TypeScript), CSS Modules or plain CSS. No React Router.

**Screen state machine** — `App.jsx` holds the top-level state:
```
home → quiz → result → home (restart)
```
Navigation is driven by a single `currentScreen` state value (`'home' | 'quiz' | 'result'`), not by URL routing.

**Component tree:**
- `App.jsx` — owns all state: `currentScreen`, `selectedLevel`, `questions[]`, `currentIndex`, `answers[]`, `timeLeft`
- `HomeScreen.jsx` — level selection UI; calls `onStart(level)` to transition to quiz
- `QuizScreen.jsx` — orchestrates quiz flow; contains `QuestionCard`, `Timer`, `ProgressBar`
- `QuestionCard.jsx` — shows statement + Verdadeiro/Falso buttons; emits `onAnswer(boolean)`
- `Timer.jsx` — countdown from the `TIMER_SECONDS` constant; fires `onTimeout()` at 0
- `ProgressBar.jsx` — renders question X of N
- `ResultScreen.jsx` — final score, percentage, per-level breakdown (for Misto mode); `onRestart()`

**Data flow:**
1. On level select: filter `questions.json` by level (or use all for Misto), shuffle, set into state
2. On answer or timeout: push `{ id, correct }` to `answers[]`, show feedback + explanation, wait for "Próxima" click
3. After last question: compute score totals (overall + per-level if Misto) and transition to `result`

## Questions Data

`src/data/questions.json` — static array, imported directly (no fetch). Schema:

```json
{
  "id": "ini-01",
  "level": "iniciante",         // "iniciante" | "intermediario" | "avancado"
  "category": "conceitos-gerais", // free string for display tags
  "statement": "...",
  "answer": true,               // boolean correct answer
  "explanation": "..."          // shown immediately after answering
}
```

30 questions total: 10 per level. Advanced level questions must be spread across four sub-areas via the `category` field: `estoque-demanda`, `transporte-distribuicao`, `supply-chain-estrategico`, `armazenagem-cd`.

## Key Constraints

- **No TypeScript** — keep plain JS for simplicity
- **No React Router** — screen transitions via state only
- **No localStorage / backend** — each session is independent; no data persists
- **Timer constant** — expose timer duration as a named constant (e.g., `TIMER_SECONDS = 20`) so it's easy to adjust
- **Timer auto-fail** — a timeout counts as an incorrect answer, not a skip
- **Misto mode** — uses all 30 questions shuffled; result screen must show per-level breakdown in this mode only
- **No auto-advance** — after feedback is shown, user must click "Próxima pergunta" manually
