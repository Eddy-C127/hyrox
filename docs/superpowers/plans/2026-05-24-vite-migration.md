# VOLT // HPX — Vite + React Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the VOLT // HPX MVP from browser-Babel + window-globals to a production Vite + React project deployable on Vercel with zero console errors.

**Architecture:** All existing JSX files become proper ES modules with named exports. `window.VOLT_DATA` becomes a default export from `src/data.js`. The component tree and visual design are preserved 1:1; only the module system and three bug fixes change.

**Tech Stack:** Vite 5, React 18, @vitejs/plugin-react, Google Fonts (CDN), Vercel static hosting.

**Source reference:** Original files live in `hyrox/` — read them for reference, do not modify them.

**New project root:** `/home/eduardo/Proyectos/MVP/hyrox/` (workspace root, above `hyrox/`)

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `package.json` | Create | Vite + React deps, npm scripts |
| `vite.config.js` | Create | @vitejs/plugin-react plugin |
| `vercel.json` | Create | SPA rewrite rule |
| `index.html` | Create | Vite entry point, font links |
| `src/main.jsx` | Create | ReactDOM.createRoot |
| `src/index.css` | Create | Copy of `hyrox/styles.css` verbatim |
| `src/data.js` | Create | VOLT_DATA as default export |
| `src/primitives.jsx` | Create | Named exports: Icon, QRPattern, Photo, LineChart, StatusBar |
| `src/App.jsx` | Create | App shell, all state, nav, combined handleBook |
| `src/screens/HomeScreen.jsx` | Create | LoginScreen, HomeScreen, AccessFAB, QROverlay |
| `src/screens/BookScreen.jsx` | Create | BookScreen |
| `src/screens/FuelScreen.jsx` | Create | FuelScreen, BagDrawer |
| `src/screens/HealthScreen.jsx` | Create | HealthScreen, MiniStat |
| `src/screens/EventsScreen.jsx` | Create | EventsScreen, TicketDrawer |

---

## Task 1: Scaffold — package.json, vite.config.js, vercel.json

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `vercel.json`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "volt-hpx",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.4.0"
  }
}
```

- [ ] **Step 2: Create vite.config.js**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({ plugins: [react()] })
```

- [ ] **Step 3: Create vercel.json**

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

- [ ] **Step 4: Install dependencies**

Run from `/home/eduardo/Proyectos/MVP/hyrox/`:
```bash
npm install
```
Expected: `node_modules/` created, no errors.

---

## Task 2: index.html

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create index.html**

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VOLT // HPX — High-Performance Fitness MVP</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

---

## Task 3: src/index.css

**Files:**
- Create: `src/index.css`

- [ ] **Step 1: Copy styles verbatim from the original**

The file at `hyrox/styles.css` is already complete and correct. Copy its entire contents into `src/index.css` without modification.

---

## Task 4: src/data.js

**Files:**
- Create: `src/data.js`

- [ ] **Step 1: Create src/data.js as an ES module**

Take the object from `hyrox/data.js`, remove `window.VOLT_DATA =`, and export it:

```js
const VOLT_DATA = {
  user: {
    name: 'Alex Mendez',
    initials: 'AM',
    handle: '@alex.mendez',
    streak: 5,
    credits: 12,
    membership: 'PERFORMANCE',
    memberSince: 'JAN 2024',
    expires: 'DEC 31, 2026',
    creditsTotal: 20,
    weeklyGoal: 5,
    sessionsThisWeek: 4,
  },

  classes: {
    0: [
      { id: 'c1', time: '06:30', dur: 60, type: 'HYBRID RACE SIM', coach: 'Coach Alex', coachRole: 'Engine Lead', spots: 4, total: 16, intensity: 'PEAK' },
      { id: 'c2', time: '12:00', dur: 45, type: 'STRENGTH & POWER', coach: 'Coach Sofia', coachRole: 'Strength Lead', spots: 8, total: 12, intensity: 'HIGH' },
      { id: 'c3', time: '18:30', dur: 60, type: 'ENGINE ROOM', coach: 'Coach Alex', coachRole: 'Engine Lead', spots: 2, total: 16, intensity: 'PEAK' },
      { id: 'c4', time: '20:00', dur: 45, type: 'RECOVERY FLOW', coach: 'Coach Marin', coachRole: 'Mobility', spots: 11, total: 14, intensity: 'LOW' },
    ],
    1: [
      { id: 'c5', time: '07:00', dur: 60, type: 'STRENGTH & POWER', coach: 'Coach Sofia', coachRole: 'Strength Lead', spots: 6, total: 12, intensity: 'HIGH' },
      { id: 'c6', time: '17:30', dur: 60, type: 'HYBRID RACE SIM', coach: 'Coach Alex', coachRole: 'Engine Lead', spots: 1, total: 16, intensity: 'PEAK' },
      { id: 'c7', time: '19:00', dur: 45, type: 'ENGINE ROOM', coach: 'Coach Jonas', coachRole: 'Conditioning', spots: 9, total: 16, intensity: 'HIGH' },
    ],
    2: [
      { id: 'c8', time: '06:30', dur: 60, type: 'ENGINE ROOM', coach: 'Coach Alex', coachRole: 'Engine Lead', spots: 5, total: 16, intensity: 'PEAK' },
      { id: 'c9', time: '12:30', dur: 45, type: 'CORE & STABILITY', coach: 'Coach Marin', coachRole: 'Mobility', spots: 7, total: 14, intensity: 'MED' },
      { id: 'c10', time: '18:00', dur: 60, type: 'HYBRID RACE SIM', coach: 'Coach Alex', coachRole: 'Engine Lead', spots: 0, total: 16, intensity: 'PEAK' },
    ],
    3: [
      { id: 'c11', time: '07:00', dur: 60, type: 'STRENGTH & POWER', coach: 'Coach Sofia', coachRole: 'Strength Lead', spots: 4, total: 12, intensity: 'HIGH' },
      { id: 'c12', time: '17:30', dur: 60, type: 'ENGINE ROOM', coach: 'Coach Jonas', coachRole: 'Conditioning', spots: 6, total: 16, intensity: 'HIGH' },
    ],
    4: [
      { id: 'c13', time: '06:30', dur: 60, type: 'HYBRID RACE SIM', coach: 'Coach Alex', coachRole: 'Engine Lead', spots: 3, total: 16, intensity: 'PEAK' },
      { id: 'c14', time: '12:00', dur: 45, type: 'RECOVERY FLOW', coach: 'Coach Marin', coachRole: 'Mobility', spots: 10, total: 14, intensity: 'LOW' },
      { id: 'c15', time: '18:30', dur: 60, type: 'STRENGTH & POWER', coach: 'Coach Sofia', coachRole: 'Strength Lead', spots: 5, total: 12, intensity: 'HIGH' },
    ],
    5: [
      { id: 'c16', time: '09:00', dur: 75, type: 'HYBRID RACE SIM', coach: 'Coach Alex', coachRole: 'Engine Lead', spots: 8, total: 20, intensity: 'PEAK' },
      { id: 'c17', time: '11:00', dur: 45, type: 'CORE & STABILITY', coach: 'Coach Marin', coachRole: 'Mobility', spots: 6, total: 14, intensity: 'MED' },
    ],
    6: [
      { id: 'c18', time: '10:00', dur: 60, type: 'RECOVERY FLOW', coach: 'Coach Marin', coachRole: 'Mobility', spots: 12, total: 14, intensity: 'LOW' },
    ],
  },

  menu: [
    { id: 'm1', name: 'Post-Workout Whey Shake', cat: 'SHAKES', price: 8.5, kcal: 220, protein: 32, desc: 'Cold-pressed whey, banana, oat milk, cinnamon.', tag: 'BESTSELLER' },
    { id: 'm2', name: 'Keto Protein Bowl', cat: 'BOWLS', price: 14.0, kcal: 540, protein: 42, desc: 'Grilled chicken, avocado, eggs, leafy greens.', tag: 'CHEF' },
    { id: 'm3', name: 'Engine Ignition Espresso', cat: 'COFFEE', price: 4.5, kcal: 6, protein: 0, desc: 'Double shot, MCT oil, dark cacao.', tag: 'PRE' },
    { id: 'm4', name: 'Race Day Carb Stack', cat: 'BOWLS', price: 12.0, kcal: 620, protein: 28, desc: 'Sweet potato, jasmine rice, miso salmon.', tag: 'NEW' },
    { id: 'm5', name: 'Electrolyte Charge', cat: 'SHAKES', price: 5.0, kcal: 25, protein: 0, desc: 'Sodium, magnesium, lime, coconut water.', tag: 'INTRA' },
    { id: 'm6', name: 'Recovery Smoothie', cat: 'SHAKES', price: 9.0, kcal: 310, protein: 28, desc: 'Tart cherry, casein, almond butter, cacao.', tag: 'POST' },
  ],

  biometrics: {
    weight: [78.2, 77.6, 77.1, 76.4, 75.9, 75.3, 75.0],
    bodyFat: [18, 17.3, 16.6, 15.8, 15.1, 14.5, 14.0],
    muscle: [42, 42.4, 43.0, 43.5, 44.0, 44.6, 45.0],
    rhr: [62, 61, 60, 60, 59, 58, 58],
    weeks: ['W22', 'W23', 'W24', 'W25', 'W26', 'W27', 'W28'],
  },

  weeklyVolume: [
    { day: 'MON', val: 62 },
    { day: 'TUE', val: 80 },
    { day: 'WED', val: 45 },
    { day: 'THU', val: 90 },
    { day: 'FRI', val: 70 },
    { day: 'SAT', val: 32 },
    { day: 'SUN', val: 0 },
  ],

  prescription: [
    { phase: 'MORNING', time: '06:00', item: 'Vitamin D3 + K2 / Omega-3', status: 'done' },
    { phase: 'PRE-TRAIN', time: '17:30', item: 'Creatine 5g + Beta-Alanine', status: 'done' },
    { phase: 'POST-TRAIN', time: '19:00', item: 'Whey Isolate 30g + Carbs', status: 'now' },
    { phase: 'DINNER', time: '20:30', item: 'High-protein, low-glycemic plate', status: 'locked' },
    { phase: 'NIGHT', time: '22:30', item: 'Magnesium Glycinate 400mg', status: 'locked' },
  ],

  consultants: [
    { name: 'Dr. Lena Park', role: 'Sports Nutrition', next: 'TUE 14:00', avail: true },
    { name: 'Marcus Vega', role: 'Strength Physio', next: 'WED 09:30', avail: true },
    { name: 'Dr. Iris Cole', role: 'Performance MD', next: 'FRI 16:00', avail: false },
  ],

  event: {
    name: 'HYBRID RACE SIM // SUMMER OPEN',
    subtitle: '8 STATIONS · 1 KM SPLITS · 90 MIN CAP',
    venue: 'VOLT // HPX HANGAR 04',
    city: 'BERLIN — KREUZBERG',
    heats: [
      { id: 'h1', time: '09:00', label: 'OPEN MEN', spots: 14, total: 32 },
      { id: 'h2', time: '10:30', label: 'OPEN WOMEN', spots: 6, total: 32 },
      { id: 'h3', time: '12:00', label: 'PRO MIXED', spots: 2, total: 24 },
      { id: 'h4', time: '13:30', label: 'DOUBLES', spots: 18, total: 40 },
    ],
    price: 65,
  },

  pastEvents: [
    { name: 'WINTER CIRCUIT', date: 'JAN 18', place: '08 / 124', time: '52:14' },
    { name: 'SPRING CLASH', date: 'APR 02', place: '12 / 96', time: '48:51' },
  ],
}

export default VOLT_DATA
```

---

## Task 5: src/primitives.jsx

**Files:**
- Create: `src/primitives.jsx`

Bug fix: `LineChart` used `Math.random()` for SVG gradient IDs — replaced with `React.useId()` for stable, unique IDs per component instance.

- [ ] **Step 1: Create src/primitives.jsx**

```jsx
import React from 'react'

export const Icon = {
  Home: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2z"/></svg>,
  Schedule: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>,
  Fuel: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 8a7 7 0 0 1 14 0v6a7 7 0 0 1-14 0z"/><path d="M9 4c.5 1 .5 2 0 3M13 4c.5 1 .5 2 0 3"/></svg>,
  Health: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 12h4l2-5 4 10 2-5h6"/></svg>,
  Events: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 4l3 8-3 8M18 4l-3 8 3 8M12 4v16"/></svg>,
  QR: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM20 14v3M14 20h3M20 20v1"/></svg>,
  Flame: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 2s4 4 4 8a4 4 0 0 1-8 0c0-2 1-3 2-4-1 4-3 4-3 8a5 5 0 0 0 10 0c0-5-5-8-5-12z"/></svg>,
  Check: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 12l5 5L20 6"/></svg>,
  Plus: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" {...p}><path d="M12 5v14M5 12h14"/></svg>,
  Minus: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" {...p}><path d="M5 12h14"/></svg>,
  Bell: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8M10 21a2 2 0 0 0 4 0"/></svg>,
  Sun: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/></svg>,
  Moon: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M21 13a8 8 0 0 1-10-10 8 8 0 1 0 10 10z"/></svg>,
  Arrow: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  ArrowUp: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M7 17L17 7M9 7h8v8"/></svg>,
  ArrowDown: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M7 7l10 10M15 17H7V9"/></svg>,
  X: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M6 6l12 12M18 6L6 18"/></svg>,
  Cart: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 3h2l3 13h12l2-9H7"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/></svg>,
  Pin: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 22s7-7.5 7-13a7 7 0 0 0-14 0c0 5.5 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/></svg>,
  Lock: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>,
  Dot: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><circle cx="12" cy="12" r="4"/></svg>,
  Heart: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></svg>,
  Coach: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>,
}

export function QRPattern({ seed = 'volt-hpx-AM-5' }) {
  const cells = []
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  for (let r = 0; r < 21; r++) {
    for (let c = 0; c < 21; c++) {
      h = (h * 16807) % 2147483647
      let on = (h % 100) < 50
      const inFinder = (rr, cc, r0, c0) => rr >= r0 && rr < r0 + 7 && cc >= c0 && cc < c0 + 7
      const finderOn = (rr, cc, r0, c0) => {
        const lr = rr - r0, lc = cc - c0
        const onBorder = lr === 0 || lr === 6 || lc === 0 || lc === 6
        const inCore = lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4
        return onBorder || inCore
      }
      if (inFinder(r, c, 0, 0)) on = finderOn(r, c, 0, 0)
      else if (inFinder(r, c, 0, 14)) on = finderOn(r, c, 0, 14)
      else if (inFinder(r, c, 14, 0)) on = finderOn(r, c, 14, 0)
      cells.push(<div key={r + '-' + c} className={on ? '' : 'off'} />)
    }
  }
  return <div className="qr-grid">{cells}</div>
}

export function Photo({ tag, style, children, className }) {
  return (
    <div className={'photo ' + (className || '')} style={style}>
      {children}
      {tag ? <div className="photo-tag">{tag}</div> : null}
    </div>
  )
}

export function LineChart({ values, color = '#CCFF00', height = 130, unit = '' }) {
  const id = React.useId()
  const gid = 'g' + id.replace(/:/g, '')
  const w = 320, h = height
  const pad = 12
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const stepX = (w - pad * 2) / (values.length - 1)
  const pts = values.map((v, i) => {
    const x = pad + i * stepX
    const y = pad + (1 - (v - min) / range) * (h - pad * 2)
    return [x, y]
  })
  const path = pts.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(' ')
  const area = path + ` L ${pts[pts.length - 1][0]} ${h} L ${pts[0][0]} ${h} Z`
  return (
    <svg className="chart-svg" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id={gid} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`} />
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={i === pts.length - 1 ? 4 : 2} fill={color} />
      ))}
      {pts.map((p, i) =>
        i === pts.length - 1 ? (
          <text key={'t' + i} x={p[0] - 8} y={p[1] - 12} fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="700" fill="currentColor" textAnchor="end">
            {values[i]}{unit}
          </text>
        ) : null
      )}
    </svg>
  )
}

export function StatusBar() {
  return (
    <div className="statusbar">
      <span>9:41</span>
      <div className="icons">
        <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="0.5"/><rect x="4" y="5" width="3" height="6" rx="0.5"/><rect x="8" y="2" width="3" height="9" rx="0.5"/><rect x="12" y="0" width="3" height="11" rx="0.5"/></svg>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor"><path d="M7 9.5c.8 0 1.5-.7 1.5-1.5S7.8 6.5 7 6.5s-1.5.7-1.5 1.5S6.2 9.5 7 9.5zM4.5 6c.7-.6 1.6-.9 2.5-.9s1.8.3 2.5.9l-1 1c-.4-.4-1-.6-1.5-.6s-1.1.2-1.5.6L4.5 6zM2 3.5C3.4 2.2 5.2 1.5 7 1.5s3.6.7 5 2l-1 1C9.9 3.6 8.5 3 7 3S4.1 3.6 3 4.5L2 3.5zM0 1C1.9-.9 4.4-1.5 7-1.5S12.1-.9 14 1l-1 1c-1.6-1.6-3.8-2.5-6-2.5S2.6-.6 1 1L0 1z" transform="translate(0,1)"/></svg>
        <svg width="24" height="11" viewBox="0 0 24 11" fill="none"><rect x="0.5" y="0.5" width="20" height="10" rx="2.5" stroke="currentColor" opacity="0.5"/><rect x="2" y="2" width="17" height="7" rx="1" fill="currentColor"/><rect x="21" y="3.5" width="1.5" height="4" rx="0.5" fill="currentColor" opacity="0.5"/></svg>
      </div>
    </div>
  )
}
```

---

## Task 6: src/screens/HomeScreen.jsx

**Files:**
- Create: `src/screens/HomeScreen.jsx`

Bug fix: `LoginScreen` had `animation` declared twice in one inline style object (line 65 of original). Merged into a single comma-separated animation value.

- [ ] **Step 1: Create src/screens/HomeScreen.jsx**

```jsx
import React from 'react'
import { Icon, QRPattern, Photo, StatusBar } from '../primitives'

export function LoginScreen({ onEnter }) {
  const [exiting, setExiting] = React.useState(false)
  const handle = () => {
    setExiting(true)
    setTimeout(() => onEnter(), 450)
  }
  return (
    <div className="device-screen" style={{ opacity: exiting ? 0 : 1, transition: 'opacity 0.4s' }}>
      <div className="login-bg" />
      <div className="scanline" />
      <Photo tag="HERO // ATHLETE PORTRAIT" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, #000 90%)' }} />

      <StatusBar />
      <div className="island" />

      <div style={{ position: 'relative', zIndex: 5, padding: '0 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, animation: 'slideDown 0.6s 0.1s both' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 22, height: 22, background: 'var(--volt)', borderRadius: 6, transform: 'rotate(45deg)', boxShadow: '0 0 18px var(--volt-glow)' }} />
            <div className="display" style={{ fontSize: 22, color: 'var(--fg)' }}>VOLT<span style={{ color: 'var(--volt)' }}>//</span>HPX</div>
          </div>
          <div className="eyebrow" style={{ fontSize: 9 }}>v 2.4</div>
        </div>

        <div style={{ flex: 1 }} />

        <div style={{ animation: 'slideUp 0.7s 0.2s both' }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>HIGH-PERFORMANCE · MEMBERS</div>
          <h1 className="display" style={{ fontSize: 78, margin: 0, color: 'var(--fg)' }}>
            BUILT<br />
            FOR<br />
            <span style={{ color: 'var(--volt)' }}>WAR.</span>
          </h1>
        </div>

        <div style={{ height: 24 }} />

        <div className="marquee" style={{ animation: 'fadeIn 1s 0.4s both' }}>
          <div className="marquee-track eyebrow" style={{ color: 'var(--fg-2)' }}>
            {Array(2).fill(0).map((_, i) => (
              <React.Fragment key={i}>
                <span>HANGAR 04 · BERLIN</span>
                <span style={{ color: 'var(--volt)' }}>●</span>
                <span>+1,284 MEMBERS</span>
                <span style={{ color: 'var(--volt)' }}>●</span>
                <span>NEXT RACE · 14D</span>
                <span style={{ color: 'var(--volt)' }}>●</span>
                <span>OPEN 24/7</span>
                <span style={{ color: 'var(--volt)' }}>●</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div style={{ height: 28 }} />

        <button
          className="btn btn-volt"
          onClick={handle}
          style={{ width: '100%', height: 64, fontSize: 14, animation: 'slideUp 0.7s 0.35s both, pulseVolt 2.5s 1.5s infinite' }}
        >
          DEMO ACCESS · ENTER AS USER
          <Icon.Arrow />
        </button>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, marginBottom: 18, animation: 'fadeIn 0.6s 0.5s both' }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)' }}>NO PASSWORD · INSTANT ENTRY</div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)' }}>SECURE ↗</div>
        </div>
      </div>
    </div>
  )
}

export function HomeScreen({ user, onToggleTheme, onShowQR, weeklyVolume }) {
  return (
    <div className="scroll page-enter">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, marginBottom: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="avatar" />
          <div>
            <div className="eyebrow" style={{ marginBottom: 3 }}>GOOD MORNING</div>
            <div className="display" style={{ fontSize: 20, color: 'var(--fg)' }}>{user.name.split(' ')[0].toUpperCase()}.</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button className="btn-ghost" style={{ width: 40, height: 40, padding: 0, borderRadius: 12, position: 'relative' }}>
            <Icon.Bell style={{ width: 18, height: 18 }} />
            <span style={{ position: 'absolute', top: 8, right: 8, width: 7, height: 7, borderRadius: '50%', background: 'var(--volt)' }} />
          </button>
          <div className="theme-switch" onClick={onToggleTheme} role="button" aria-label="toggle theme" />
        </div>
      </div>

      <div style={{ position: 'relative', borderRadius: 28, overflow: 'hidden', marginBottom: 14 }}>
        <Photo tag="HERO · ATHLETE TRAINING" style={{ position: 'absolute', inset: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%)' }} />
        <div style={{ position: 'relative', padding: '20px 20px 22px', color: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>TODAY · MON 24</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.18)', padding: '6px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em' }}>
              <Icon.Flame style={{ width: 12, height: 12, color: 'var(--volt)' }} />
              {user.streak} DAY STREAK
            </div>
          </div>
          <div style={{ height: 140 }} />
          <div className="display" style={{ fontSize: 52, lineHeight: 0.9, color: '#fff' }}>
            ENGINE<br />ROOM<span style={{ color: 'var(--volt)' }}>.</span>
          </div>
          <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 8, letterSpacing: '0.1em' }}>
            18:30 · COACH ALEX · 60 MIN
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 10, marginBottom: 10 }}>
        <div className="card" style={{ padding: 16, position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div className="eyebrow">CREDITS</div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)' }}>{user.credits}/{user.creditsTotal}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, marginTop: 6 }}>
            <div className="display" style={{ fontSize: 56, color: 'var(--fg)' }}>{user.credits}</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--fg-3)', marginBottom: 8 }}>LEFT</div>
          </div>
          <div style={{ marginTop: 4, height: 6, background: 'var(--bg-3)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(user.credits / user.creditsTotal) * 100}%`, background: 'var(--volt)', boxShadow: '0 0 8px var(--volt-glow)' }} />
          </div>
        </div>

        <div className="card card-dark" style={{ padding: 16, background: 'var(--volt)', color: '#000', border: 'none' }}>
          <div className="eyebrow" style={{ color: 'rgba(0,0,0,0.5)' }}>PLAN</div>
          <div className="display" style={{ fontSize: 22, marginTop: 6, color: '#000' }}>{user.membership}</div>
          <div className="mono" style={{ fontSize: 9, marginTop: 8, color: 'rgba(0,0,0,0.65)' }}>EXP {user.expires}</div>
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, fontWeight: 700, letterSpacing: '0.08em' }}>
            ACTIVE <Icon.Dot style={{ width: 8, height: 8, color: '#000' }} />
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 4 }}>WEEKLY VOLUME</div>
            <div className="display" style={{ fontSize: 22, color: 'var(--fg)' }}>{user.sessionsThisWeek}<span style={{ color: 'var(--fg-3)', fontSize: 16 }}>/{user.weeklyGoal} SESSIONS</span></div>
          </div>
          <div className="circle-prog" style={{ '--pct': (user.sessionsThisWeek / user.weeklyGoal) * 100, '--size': '46px', '--thick': '5px' }}>
            <span className="mono" style={{ fontSize: 11, fontWeight: 700 }}>{Math.round((user.sessionsThisWeek / user.weeklyGoal) * 100)}%</span>
          </div>
        </div>
        <div className="bar-grid">
          {weeklyVolume.map((d) => (
            <div key={d.day} className={'bar ' + (d.day === 'THU' ? 'active' : '')} style={{ height: `${Math.max(d.val, 4)}%` }}>
              <div className="bar-label">{d.day}</div>
            </div>
          ))}
        </div>
        <div style={{ height: 24 }} />
      </div>

      <div className="card" style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--bg-3)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
          <div className="display" style={{ fontSize: 11, color: 'var(--volt)' }}>NEXT</div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="eyebrow" style={{ marginBottom: 4 }}>UPCOMING · TUE 17:30</div>
          <div className="display straight" style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>HYBRID RACE SIM</div>
          <div style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 2 }}>1 spot left · Coach Alex</div>
        </div>
        <Icon.Arrow style={{ width: 18, height: 18, color: 'var(--fg-3)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div className="card" style={{ padding: 16 }}>
          <Icon.Heart style={{ width: 18, height: 18, color: 'var(--volt)' }} />
          <div className="display" style={{ fontSize: 28, marginTop: 8, color: 'var(--fg)' }}>58<span style={{ fontSize: 12, color: 'var(--fg-3)', marginLeft: 4 }}>BPM</span></div>
          <div className="eyebrow" style={{ marginTop: 4 }}>RESTING HR</div>
        </div>
        <div className="card" style={{ padding: 16 }}>
          <Icon.ArrowDown style={{ width: 18, height: 18, color: 'var(--volt)' }} />
          <div className="display" style={{ fontSize: 28, marginTop: 8, color: 'var(--fg)' }}>14<span style={{ fontSize: 12, color: 'var(--fg-3)', marginLeft: 4 }}>% BF</span></div>
          <div className="eyebrow" style={{ marginTop: 4 }}>-4 PTS / 7W</div>
        </div>
      </div>

      <div style={{ height: 20 }} />
      <div className="mono" style={{ fontSize: 10, color: 'var(--fg-4)', textAlign: 'center', letterSpacing: '0.12em' }}>
        MEMBER · {user.memberSince} — VOLT//HPX
      </div>
    </div>
  )
}

export function AccessFAB({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'absolute',
        right: 18, bottom: 100,
        width: 56, height: 56, borderRadius: 18,
        background: 'var(--volt)', color: '#000',
        border: 'none', cursor: 'pointer',
        display: 'grid', placeItems: 'center',
        boxShadow: '0 12px 30px -8px var(--volt-glow), 0 0 0 4px rgba(204,255,0,0.12)',
        zIndex: 25,
      }}
      aria-label="Open access pass"
    >
      <Icon.QR style={{ width: 24, height: 24 }} />
    </button>
  )
}

export function QROverlay({ user, onClose }) {
  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()} style={{ paddingBottom: 28 }}>
        <div className="drawer-grip" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <div>
            <div className="eyebrow">ACCESS PASS</div>
            <div className="display" style={{ fontSize: 28, marginTop: 4, color: 'var(--fg)' }}>SCAN TO ENTER</div>
          </div>
          <button onClick={onClose} className="btn-ghost" style={{ width: 40, height: 40, padding: 0, borderRadius: 12 }}>
            <Icon.X style={{ width: 16, height: 16 }} />
          </button>
        </div>

        <div style={{ display: 'grid', placeItems: 'center', marginTop: 22, marginBottom: 22, position: 'relative' }}>
          <div style={{ position: 'absolute', inset: '-8px', borderRadius: 24, background: 'radial-gradient(circle, var(--volt-glow), transparent 70%)', filter: 'blur(24px)' }} />
          <div style={{ position: 'relative' }}>
            <QRPattern seed={`volt-${user.name}-${user.streak}`} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 44, height: 44, background: 'var(--volt)', borderRadius: 10, display: 'grid', placeItems: 'center', boxShadow: '0 0 0 4px #fff' }}>
              <div className="display" style={{ fontSize: 16, color: '#000' }}>V//</div>
            </div>
          </div>
        </div>

        <div className="mono" style={{ textAlign: 'center', fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.14em' }}>
          ID · VLT-AM-2024-{user.streak.toString().padStart(4, '0')}
        </div>

        <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          <div className="card" style={{ padding: 14, textAlign: 'center' }}>
            <Icon.Flame style={{ width: 18, height: 18, color: 'var(--volt)' }} />
            <div className="display" style={{ fontSize: 22, marginTop: 6, color: 'var(--fg)' }}>{user.streak}</div>
            <div className="eyebrow" style={{ marginTop: 2 }}>STREAK</div>
          </div>
          <div className="card" style={{ padding: 14, textAlign: 'center' }}>
            <Icon.Check style={{ width: 18, height: 18, color: 'var(--volt)' }} />
            <div className="display" style={{ fontSize: 22, marginTop: 6, color: 'var(--fg)' }}>{user.credits}</div>
            <div className="eyebrow" style={{ marginTop: 2 }}>CREDITS</div>
          </div>
          <div className="card" style={{ padding: 14, textAlign: 'center' }}>
            <Icon.Coach style={{ width: 18, height: 18, color: 'var(--volt)' }} />
            <div className="display" style={{ fontSize: 22, marginTop: 6, color: 'var(--fg)' }}>VIP</div>
            <div className="eyebrow" style={{ marginTop: 2 }}>{user.membership}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

## Task 7: src/screens/BookScreen.jsx

**Files:**
- Create: `src/screens/BookScreen.jsx`

- [ ] **Step 1: Create src/screens/BookScreen.jsx**

```jsx
import React from 'react'
import { Icon } from '../primitives'

export function BookScreen({ classes, credits, onBook, bookedIds }) {
  const [day, setDay] = React.useState(0)
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
  const dates = [24, 25, 26, 27, 28, 29, 30]
  const list = classes[day] || []

  return (
    <div className="scroll page-enter">
      <div style={{ paddingTop: 8, marginBottom: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div className="eyebrow">SCHEDULE</div>
            <div className="display" style={{ fontSize: 44, color: 'var(--fg)', marginTop: 6 }}>BOOK<span style={{ color: 'var(--volt)' }}>.</span></div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="display" style={{ fontSize: 28, color: 'var(--volt)' }}>{credits}</div>
            <div className="eyebrow">CREDITS</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 18, marginLeft: -20, paddingLeft: 20, paddingRight: 20, scrollbarWidth: 'none' }}>
        {days.map((d, i) => {
          const active = i === day
          return (
            <button
              key={d}
              onClick={() => setDay(i)}
              style={{
                flex: '0 0 auto',
                width: 64, height: 86,
                padding: 10,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                background: active ? 'var(--volt)' : 'var(--bg-2)',
                color: active ? '#000' : 'var(--fg)',
                border: active ? '1px solid var(--volt)' : '1px solid var(--line)',
                cursor: 'pointer',
                borderRadius: 18,
                gap: 4,
              }}
            >
              <div className="eyebrow" style={{ color: active ? 'rgba(0,0,0,0.6)' : 'var(--fg-3)' }}>{d}</div>
              <div className="display" style={{ fontSize: 28, color: 'inherit' }}>{dates[i]}</div>
              {(classes[i] || []).length > 0 && (
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: active ? '#000' : 'var(--volt)' }} />
              )}
            </button>
          )
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {list.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: 32 }}>
            <div className="display" style={{ fontSize: 22, color: 'var(--fg-3)' }}>REST DAY<span style={{ color: 'var(--volt)' }}>.</span></div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--fg-4)', marginTop: 8 }}>NO CLASSES SCHEDULED</div>
          </div>
        ) : list.map((c) => {
          const booked = bookedIds.has(c.id)
          const full = c.spots === 0
          const intensityColor = c.intensity === 'PEAK' ? 'var(--volt)' : c.intensity === 'HIGH' ? '#FF7A3D' : c.intensity === 'MED' ? '#5BC0FF' : '#9CA3AF'
          return (
            <div key={c.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'stretch' }}>
                <div style={{ width: 78, padding: '18px 0 18px 18px', borderRight: '1px solid var(--line)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="display" style={{ fontSize: 24, color: 'var(--fg)' }}>{c.time}</div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)', marginTop: 2 }}>{c.dur} MIN</div>
                  <div style={{ marginTop: 8, width: 24, height: 3, background: intensityColor, borderRadius: 2 }} />
                  <div className="eyebrow" style={{ fontSize: 9, marginTop: 4, color: intensityColor }}>{c.intensity}</div>
                </div>
                <div style={{ flex: 1, padding: '16px 16px 16px 14px' }}>
                  <div className="display straight" style={{ fontSize: 16, fontWeight: 700, color: 'var(--fg)', lineHeight: 1.1 }}>{c.type}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--bg-3)', border: '1px solid var(--volt)', display: 'grid', placeItems: 'center', fontFamily: 'Anton, sans-serif', fontStyle: 'italic', fontSize: 8, color: 'var(--fg)' }}>
                      {c.coach.split(' ')[1][0]}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--fg-2)' }}>{c.coach}</div>
                    <div className="mono" style={{ fontSize: 10, color: 'var(--fg-4)' }}>· {c.coachRole}</div>
                  </div>
                  <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <div style={{ flex: 1 }}>
                      <div className="mono" style={{ fontSize: 10, color: full ? '#FF5757' : 'var(--fg-3)' }}>
                        {full ? 'FULL' : `${c.spots} / ${c.total} SPOTS`}
                      </div>
                      <div style={{ marginTop: 4, height: 3, background: 'var(--bg-3)', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${(1 - c.spots / c.total) * 100}%`, background: full ? '#FF5757' : c.spots <= 3 ? '#FF7A3D' : 'var(--volt)' }} />
                      </div>
                    </div>
                    <button
                      onClick={() => { if (!booked && !full && credits > 0) onBook(c.id) }}
                      disabled={full || (credits === 0 && !booked)}
                      className="btn"
                      style={{
                        height: 38,
                        padding: booked ? '0 14px' : '0 16px',
                        borderRadius: 12,
                        fontSize: 11,
                        background: booked ? 'transparent' : full ? 'var(--bg-3)' : 'var(--volt)',
                        color: booked ? 'var(--volt)' : full ? 'var(--fg-3)' : '#000',
                        border: booked ? '1px solid var(--volt)' : 'none',
                        cursor: full || (credits === 0 && !booked) ? 'not-allowed' : 'pointer',
                        opacity: full ? 0.5 : 1,
                      }}
                    >
                      {booked ? <><Icon.Check style={{ width: 14, height: 14 }} /> BOOKED</> : full ? 'FULL' : '+ BOOK · 1 CR'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ height: 18 }} />
      <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg-2)' }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--volt-soft)', display: 'grid', placeItems: 'center' }}>
          <Icon.Plus style={{ width: 18, height: 18, color: 'var(--volt)' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div className="display straight" style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)' }}>NEED MORE CREDITS?</div>
          <div style={{ fontSize: 11, color: 'var(--fg-3)' }}>10-pack · €89 · No expiry</div>
        </div>
        <Icon.Arrow style={{ width: 16, height: 16, color: 'var(--fg-3)' }} />
      </div>
    </div>
  )
}
```

---

## Task 8: src/screens/FuelScreen.jsx

**Files:**
- Create: `src/screens/FuelScreen.jsx`

- [ ] **Step 1: Create src/screens/FuelScreen.jsx**

```jsx
import React from 'react'
import { Icon, Photo } from '../primitives'

export function FuelScreen({ menu, cart, setCart, showToast }) {
  const [mode, setMode] = React.useState('menu')
  const [bagOpen, setBagOpen] = React.useState(false)

  const total = cart.reduce((s, x) => s + x.price * x.qty, 0)
  const items = cart.reduce((s, x) => s + x.qty, 0)

  const addToCart = (item) => {
    setCart(prev => {
      const ex = prev.find(p => p.id === item.id)
      if (ex) return prev.map(p => p.id === item.id ? { ...p, qty: p.qty + 1 } : p)
      return [...prev, { ...item, qty: 1 }]
    })
  }
  const updateQty = (id, delta) => {
    setCart(prev => prev.map(p => p.id === id ? { ...p, qty: Math.max(0, p.qty + delta) } : p).filter(p => p.qty > 0))
  }

  return (
    <div className="scroll page-enter">
      <div style={{ paddingTop: 8, marginBottom: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div className="eyebrow">CAFETERIA</div>
            <div className="display" style={{ fontSize: 44, color: 'var(--fg)', marginTop: 6 }}>FUEL<span style={{ color: 'var(--volt)' }}>.</span></div>
          </div>
          <button onClick={() => setBagOpen(true)} style={{ position: 'relative', width: 52, height: 52, borderRadius: 16, background: 'var(--bg-2)', border: '1px solid var(--line)', display: 'grid', placeItems: 'center', cursor: 'pointer', color: 'var(--fg)' }}>
            <Icon.Cart style={{ width: 22, height: 22 }} />
            {items > 0 && (
              <span style={{ position: 'absolute', top: -4, right: -4, minWidth: 22, height: 22, padding: '0 6px', borderRadius: 11, background: 'var(--volt)', color: '#000', fontSize: 11, fontWeight: 700, display: 'grid', placeItems: 'center', boxShadow: '0 0 12px var(--volt-glow)' }}>{items}</span>
            )}
          </button>
        </div>
      </div>

      <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 16, padding: 4, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginBottom: 18 }}>
        {[['menu', "TODAY'S MENU"], ['preorder', 'PRE-ORDER']].map(([k, label]) => (
          <button
            key={k}
            onClick={() => setMode(k)}
            style={{
              height: 40, borderRadius: 12, border: 'none', cursor: 'pointer',
              background: mode === k ? 'var(--volt)' : 'transparent',
              color: mode === k ? '#000' : 'var(--fg-2)',
              fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
              transition: 'all 0.2s',
            }}
          >{label}</button>
        ))}
      </div>

      {mode === 'menu' && (
        <>
          <div className="eyebrow" style={{ marginBottom: 12 }}>· CHEF'S PICKS · TODAY</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {menu.map((item) => (
              <div key={item.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', aspectRatio: '1.05' }}>
                  <Photo tag={item.cat} style={{ position: 'absolute', inset: 0 }} />
                  <div style={{ position: 'absolute', top: 8, left: 8, background: 'var(--volt)', color: '#000', fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', padding: '3px 7px', borderRadius: 6 }}>{item.tag}</div>
                  <div style={{ position: 'absolute', bottom: 8, right: 8, background: 'rgba(0,0,0,0.7)', color: '#fff', fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fontWeight: 700, padding: '3px 7px', borderRadius: 6 }}>{item.kcal} kcal</div>
                </div>
                <div style={{ padding: 12, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div className="display straight" style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)', lineHeight: 1.15 }}>{item.name}</div>
                  <div className="mono" style={{ fontSize: 9.5, color: 'var(--fg-3)', marginTop: 4 }}>{item.protein}g protein</div>
                  <div style={{ flex: 1 }} />
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                    <div className="display" style={{ fontSize: 18, color: 'var(--fg)' }}>€{item.price.toFixed(2)}</div>
                    <button
                      onClick={() => addToCart(item)}
                      style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--volt)', color: '#000', border: 'none', display: 'grid', placeItems: 'center', cursor: 'pointer' }}
                    >
                      <Icon.Plus style={{ width: 16, height: 16 }} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {mode === 'preorder' && (
        <>
          <div className="eyebrow" style={{ marginBottom: 12 }}>· EXPRESS · READY AT BAR</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {menu.map((item) => {
              const c = cart.find(p => p.id === item.id)
              return (
                <div key={item.id} className="card" style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 12 }}>
                  <Photo tag="" style={{ width: 64, height: 64, borderRadius: 12, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="display straight" style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                    <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)', marginTop: 2 }}>{item.kcal} kcal · {item.protein}g protein</div>
                    <div className="display" style={{ fontSize: 14, color: 'var(--volt)', marginTop: 4 }}>€{item.price.toFixed(2)}</div>
                  </div>
                  {c ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg-3)', borderRadius: 12, padding: 4 }}>
                      <button onClick={() => updateQty(item.id, -1)} style={{ width: 26, height: 26, borderRadius: 8, background: 'transparent', border: 'none', color: 'var(--fg)', cursor: 'pointer', display: 'grid', placeItems: 'center' }}><Icon.Minus style={{ width: 14, height: 14 }} /></button>
                      <div className="display" style={{ fontSize: 14, color: 'var(--fg)', minWidth: 12, textAlign: 'center' }}>{c.qty}</div>
                      <button onClick={() => updateQty(item.id, 1)} style={{ width: 26, height: 26, borderRadius: 8, background: 'var(--volt)', border: 'none', color: '#000', cursor: 'pointer', display: 'grid', placeItems: 'center' }}><Icon.Plus style={{ width: 14, height: 14 }} /></button>
                    </div>
                  ) : (
                    <button onClick={() => addToCart(item)} className="btn" style={{ height: 38, padding: '0 14px', borderRadius: 12, background: 'var(--bg-3)', color: 'var(--fg)', fontSize: 10, border: '1px solid var(--line)' }}>+ ADD</button>
                  )}
                </div>
              )
            })}
          </div>
        </>
      )}

      {bagOpen && (
        <BagDrawer
          cart={cart}
          updateQty={updateQty}
          total={total}
          onClose={() => setBagOpen(false)}
          onComplete={() => { setBagOpen(false); setCart([]); showToast('READY IN 10 MIN · PICKUP AT BAR') }}
        />
      )}
    </div>
  )
}

function BagDrawer({ cart, updateQty, total, onClose, onComplete }) {
  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-grip" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="eyebrow">EXPRESS BAG</div>
            <div className="display" style={{ fontSize: 26, marginTop: 4, color: 'var(--fg)' }}>YOUR ORDER</div>
          </div>
          <button onClick={onClose} className="btn-ghost" style={{ width: 40, height: 40, padding: 0, borderRadius: 12 }}><Icon.X style={{ width: 16, height: 16 }} /></button>
        </div>
        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {cart.length === 0 && (
            <div style={{ padding: 32, textAlign: 'center' }}>
              <div className="display" style={{ fontSize: 20, color: 'var(--fg-3)' }}>EMPTY BAG<span style={{ color: 'var(--volt)' }}>.</span></div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-4)', marginTop: 6 }}>ADD ITEMS TO PRE-ORDER</div>
            </div>
          )}
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--line)' }}>
              <Photo tag="" style={{ width: 48, height: 48, borderRadius: 10, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="display straight" style={{ fontSize: 12, fontWeight: 700, color: 'var(--fg)' }}>{item.name}</div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)' }}>€{item.price.toFixed(2)} · qty {item.qty}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--bg-3)', borderRadius: 10, padding: 3 }}>
                <button onClick={() => updateQty(item.id, -1)} style={{ width: 24, height: 24, borderRadius: 7, background: 'transparent', border: 'none', color: 'var(--fg)', cursor: 'pointer', display: 'grid', placeItems: 'center' }}><Icon.Minus style={{ width: 12, height: 12 }} /></button>
                <div className="display" style={{ fontSize: 12, color: 'var(--fg)', minWidth: 12, textAlign: 'center' }}>{item.qty}</div>
                <button onClick={() => updateQty(item.id, 1)} style={{ width: 24, height: 24, borderRadius: 7, background: 'var(--volt)', border: 'none', color: '#000', cursor: 'pointer', display: 'grid', placeItems: 'center' }}><Icon.Plus style={{ width: 12, height: 12 }} /></button>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <>
            <div style={{ marginTop: 14, padding: 14, background: 'var(--bg-2)', borderRadius: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>SUBTOTAL</span>
                <span className="mono" style={{ fontSize: 11, color: 'var(--fg-2)' }}>€{total.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>MEMBER DISCOUNT</span>
                <span className="mono" style={{ fontSize: 11, color: 'var(--volt)' }}>-10%</span>
              </div>
              <div style={{ height: 1, background: 'var(--line)', margin: '4px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span className="display" style={{ fontSize: 16, color: 'var(--fg)' }}>TOTAL</span>
                <span className="display" style={{ fontSize: 26, color: 'var(--volt)' }}>€{(total * 0.9).toFixed(2)}</span>
              </div>
            </div>
            <button className="btn btn-volt" onClick={onComplete} style={{ width: '100%', marginTop: 14 }}>
              COMPLETE PRE-ORDER <Icon.Arrow />
            </button>
            <div className="mono" style={{ textAlign: 'center', fontSize: 10, color: 'var(--fg-3)', marginTop: 10 }}>READY IN ~10 MIN · PICKUP AT BAR</div>
          </>
        )}
      </div>
    </div>
  )
}
```

---

## Task 9: src/screens/HealthScreen.jsx

**Files:**
- Create: `src/screens/HealthScreen.jsx`

- [ ] **Step 1: Create src/screens/HealthScreen.jsx**

```jsx
import React from 'react'
import { Icon, LineChart } from '../primitives'

export function HealthScreen({ biometrics, prescription, consultants }) {
  const [metric, setMetric] = React.useState('weight')
  const metrics = {
    weight: { label: 'WEIGHT', unit: 'kg', values: biometrics.weight, color: '#CCFF00' },
    bodyFat: { label: 'BODY FAT', unit: '%', values: biometrics.bodyFat, color: '#FF7A3D' },
    muscle: { label: 'MUSCLE MASS', unit: '%', values: biometrics.muscle, color: '#5BC0FF' },
    rhr: { label: 'RESTING HR', unit: 'BPM', values: biometrics.rhr, color: '#F472B6' },
  }
  const cur = metrics[metric]
  const start = cur.values[0]
  const end = cur.values[cur.values.length - 1]
  const delta = (end - start).toFixed(1)
  const isImprovement = metric === 'muscle' ? delta > 0 : delta < 0

  return (
    <div className="scroll page-enter">
      <div style={{ paddingTop: 8, marginBottom: 18 }}>
        <div className="eyebrow">HEALTH & NUTRITION</div>
        <div className="display" style={{ fontSize: 44, color: 'var(--fg)', marginTop: 6 }}>PROGRESS<span style={{ color: 'var(--volt)' }}>.</span></div>
      </div>

      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', marginLeft: -20, paddingLeft: 20, paddingRight: 20, marginBottom: 14, scrollbarWidth: 'none' }}>
        {Object.entries(metrics).map(([k, m]) => (
          <button
            key={k}
            onClick={() => setMetric(k)}
            className={'btn-pill ' + (metric === k ? 'active' : '')}
            style={{ flex: '0 0 auto', whiteSpace: 'nowrap', cursor: 'pointer' }}
          >{m.label}</button>
        ))}
      </div>

      <div className="card" style={{ marginBottom: 12, padding: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
          <div>
            <div className="eyebrow">{cur.label} · 7 WEEKS</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
              <div className="display" style={{ fontSize: 56, color: 'var(--fg)' }}>{end}</div>
              <div className="mono" style={{ fontSize: 13, color: 'var(--fg-3)' }}>{cur.unit}</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 10px', background: isImprovement ? 'var(--volt-soft)' : 'rgba(255,87,87,0.1)', borderRadius: 8 }}>
              {(metric === 'muscle' ? delta > 0 : delta < 0) ? <Icon.ArrowUp style={{ width: 12, height: 12, color: 'var(--volt)' }} /> : <Icon.ArrowDown style={{ width: 12, height: 12, color: '#FF5757' }} />}
              <span className="mono" style={{ fontSize: 11, color: isImprovement ? 'var(--volt)' : '#FF5757', fontWeight: 700 }}>{delta > 0 ? '+' : ''}{delta}{cur.unit}</span>
            </div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)', marginTop: 6 }}>vs. {start}{cur.unit}</div>
          </div>
        </div>
        <div style={{ marginTop: 14, color: 'var(--fg)' }}>
          <LineChart values={cur.values} color={cur.color} height={140} unit={cur.unit} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginTop: 8 }}>
          {biometrics.weeks.map(w => (
            <div key={w} className="mono" style={{ fontSize: 9, color: 'var(--fg-4)', textAlign: 'center', letterSpacing: '0.06em' }}>{w}</div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 22 }}>
        <MiniStat label="BODY FAT" value="14%" delta="-4.0" good />
        <MiniStat label="MUSCLE" value="45%" delta="+3.0" good />
        <MiniStat label="RHR" value="58" delta="-4 bpm" good />
      </div>

      <div className="eyebrow" style={{ marginBottom: 10 }}>· BOOK A CONSULTANT</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 22 }}>
        {consultants.map((c) => (
          <div key={c.name} className="card" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: 'radial-gradient(circle at 30% 30%, #333, #0a0a0a)', border: '1.5px solid var(--volt)', display: 'grid', placeItems: 'center', flexShrink: 0, fontFamily: 'Anton, sans-serif', fontStyle: 'italic', fontSize: 14, color: 'var(--fg)' }}>
              {c.name.split(' ').map(x => x[0]).slice(0, 2).join('')}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="display straight" style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)' }}>{c.name}</div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)', marginTop: 2 }}>{c.role}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="mono" style={{ fontSize: 10, color: c.avail ? 'var(--volt)' : 'var(--fg-3)', fontWeight: 700, letterSpacing: '0.08em' }}>{c.avail ? 'NEXT' : 'BOOKED'}</div>
              <div className="display straight" style={{ fontSize: 12, fontWeight: 700, color: 'var(--fg)' }}>{c.next}</div>
            </div>
            <button className="btn-ghost" style={{ width: 36, height: 36, padding: 0, borderRadius: 10, opacity: c.avail ? 1 : 0.4 }}><Icon.Arrow style={{ width: 14, height: 14 }} /></button>
          </div>
        ))}
      </div>

      <div className="eyebrow" style={{ marginBottom: 10 }}>· PRESCRIPTION · TODAY</div>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {prescription.map((p, i) => {
          const isLast = i === prescription.length - 1
          const isDone = p.status === 'done'
          const isNow = p.status === 'now'
          const isLocked = p.status === 'locked'
          return (
            <div key={p.phase} style={{ display: 'flex', alignItems: 'stretch', borderBottom: isLast ? 'none' : '1px solid var(--line)' }}>
              <div style={{ width: 56, position: 'relative', display: 'flex', justifyContent: 'center', paddingTop: 18 }}>
                <div style={{ position: 'absolute', top: 0, bottom: 0, width: 2, background: 'var(--line)' }} />
                <div style={{
                  position: 'relative', zIndex: 1,
                  width: 28, height: 28, borderRadius: '50%',
                  background: isDone ? 'var(--volt)' : isNow ? 'transparent' : 'var(--bg-3)',
                  border: isNow ? '2px solid var(--volt)' : 'none',
                  display: 'grid', placeItems: 'center',
                  boxShadow: isNow ? '0 0 18px var(--volt-glow)' : 'none',
                  animation: isNow ? 'pulseVolt 2s infinite' : 'none',
                  color: isDone ? '#000' : 'var(--volt)',
                }}>
                  {isDone && <Icon.Check style={{ width: 14, height: 14 }} />}
                  {isNow && <Icon.Dot style={{ width: 12, height: 12 }} />}
                  {isLocked && <Icon.Lock style={{ width: 12, height: 12, color: 'var(--fg-3)' }} />}
                </div>
              </div>
              <div style={{ flex: 1, padding: '16px 16px 16px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="eyebrow" style={{ color: isLocked ? 'var(--fg-4)' : 'var(--fg-3)' }}>{p.phase}</div>
                  <div className="mono" style={{ fontSize: 10, color: isLocked ? 'var(--fg-4)' : 'var(--fg-3)' }}>{p.time}</div>
                </div>
                <div className="display straight" style={{ fontSize: 13, fontWeight: 700, color: isLocked ? 'var(--fg-3)' : 'var(--fg)', marginTop: 4, opacity: isLocked ? 0.6 : 1 }}>{p.item}</div>
                {isNow && <div style={{ display: 'inline-block', marginTop: 6, fontSize: 10, fontWeight: 700, color: 'var(--volt)', letterSpacing: '0.1em' }}>· TAKE NOW</div>}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mono" style={{ fontSize: 10, color: 'var(--fg-4)', textAlign: 'center', letterSpacing: '0.1em', marginTop: 18 }}>
        PRESCRIBED BY · DR. LENA PARK · 14 MAY 2026
      </div>
    </div>
  )
}

function MiniStat({ label, value, delta, good }) {
  return (
    <div className="card" style={{ padding: 14 }}>
      <div className="eyebrow" style={{ fontSize: 9 }}>{label}</div>
      <div className="display" style={{ fontSize: 26, color: 'var(--fg)', marginTop: 4 }}>{value}</div>
      <div className="mono" style={{ fontSize: 10, color: good ? 'var(--volt)' : '#FF5757', marginTop: 2 }}>{delta}</div>
    </div>
  )
}
```

---

## Task 10: src/screens/EventsScreen.jsx

**Files:**
- Create: `src/screens/EventsScreen.jsx`

- [ ] **Step 1: Create src/screens/EventsScreen.jsx**

```jsx
import React from 'react'
import { Icon, Photo } from '../primitives'

export function EventsScreen({ event, pastEvents, showToast }) {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [selectedHeat, setSelectedHeat] = React.useState(event.heats[0].id)

  const target = React.useMemo(() => Date.now() + 14 * 86400 * 1000, [])
  const [now, setNow] = React.useState(Date.now())
  React.useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])
  const diff = Math.max(0, target - now)
  const d = Math.floor(diff / 86400000)
  const h = Math.floor((diff % 86400000) / 3600000)
  const m = Math.floor((diff % 3600000) / 60000)
  const s = Math.floor((diff % 60000) / 1000)

  const heat = event.heats.find(h => h.id === selectedHeat)

  return (
    <div className="scroll page-enter">
      <div style={{ paddingTop: 8, marginBottom: 18 }}>
        <div className="eyebrow">ARENA</div>
        <div className="display" style={{ fontSize: 44, color: 'var(--fg)', marginTop: 6 }}>EVENTS<span style={{ color: 'var(--volt)' }}>.</span></div>
      </div>

      <div style={{ position: 'relative', borderRadius: 28, overflow: 'hidden', marginBottom: 14, minHeight: 460 }}>
        <Photo tag="HERO · RACE FLOOR" style={{ position: 'absolute', inset: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.95) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(204,255,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(204,255,0,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div style={{ position: 'relative', padding: '22px 22px 22px', color: '#fff', display: 'flex', flexDirection: 'column', minHeight: 460 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 10px', background: 'var(--volt)', color: '#000', borderRadius: 6, fontSize: 10, fontWeight: 700, letterSpacing: '0.12em' }}>
              <Icon.Dot style={{ width: 8, height: 8, animation: 'pulseVolt 1.5s infinite' }} /> LIVE TICKETS
            </div>
            <div className="mono" style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>EVT-2026-07</div>
          </div>

          <div style={{ flex: 1 }} />

          <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>SUMMER OPEN · 2026</div>
          <div className="display" style={{ fontSize: 56, color: '#fff', letterSpacing: '-0.02em' }}>
            HYBRID<br />RACE<br /><span style={{ color: 'var(--volt)' }}>SIM.</span>
          </div>
          <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 10, letterSpacing: '0.08em' }}>
            {event.subtitle}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 11, color: '#fff', letterSpacing: '0.05em' }}>
            <Icon.Pin style={{ width: 12, height: 12, color: 'var(--volt)' }} />
            {event.venue} · {event.city}
          </div>

          <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
            {[
              { v: d, l: 'DAYS' },
              { v: h, l: 'HRS' },
              { v: m, l: 'MIN' },
              { v: s, l: 'SEC' },
            ].map((x, i) => (
              <div key={x.l} style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '10px 6px', textAlign: 'center' }}>
                <div className="display" style={{ fontSize: 32, color: i === 0 ? 'var(--volt)' : '#fff', textShadow: i === 0 ? '0 0 20px var(--volt-glow)' : 'none' }}>{String(x.v).padStart(2, '0')}</div>
                <div className="mono" style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', marginTop: 2, letterSpacing: '0.1em' }}>{x.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="btn btn-volt" onClick={() => setDrawerOpen(true)} style={{ width: '100%', marginBottom: 22 }}>
        SECURE YOUR HEAT · FROM €{event.price}
        <Icon.Arrow />
      </button>

      <div className="card" style={{ marginBottom: 14 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>8 STATIONS · 1KM SPLITS</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
          {['SKI', 'SLED PUSH', 'SLED PULL', 'BURPEES', 'ROW', 'KB FARMER', 'LUNGES', 'WALL BALL'].map((station, i) => (
            <div key={station} style={{ aspectRatio: 1, background: 'var(--bg-3)', borderRadius: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              <div className="display" style={{ fontSize: 18, color: 'var(--volt)' }}>{String(i + 1).padStart(2, '0')}</div>
              <div className="mono" style={{ fontSize: 7.5, color: 'var(--fg-3)', textAlign: 'center', letterSpacing: '0.05em' }}>{station}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="eyebrow" style={{ marginBottom: 10 }}>· YOUR HISTORY</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {pastEvents.map(p => (
          <div key={p.name} className="card" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 14 }}>
            <div style={{ width: 50, height: 50, borderRadius: 14, background: 'var(--bg-3)', display: 'grid', placeItems: 'center', textAlign: 'center' }}>
              <div>
                <div className="display" style={{ fontSize: 18, color: 'var(--volt)', lineHeight: 0.9 }}>{p.date.split(' ')[1]}</div>
                <div className="mono" style={{ fontSize: 8, color: 'var(--fg-3)', marginTop: 1 }}>{p.date.split(' ')[0]}</div>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="display straight" style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)' }}>{p.name}</div>
              <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)' }}>PLACE <span style={{ color: 'var(--fg)' }}>{p.place}</span></div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)' }}>TIME <span style={{ color: 'var(--volt)' }}>{p.time}</span></div>
              </div>
            </div>
            <Icon.Arrow style={{ width: 16, height: 16, color: 'var(--fg-3)' }} />
          </div>
        ))}
      </div>

      {drawerOpen && (
        <TicketDrawer
          event={event}
          heat={heat}
          selectedHeat={selectedHeat}
          setSelectedHeat={setSelectedHeat}
          onClose={() => setDrawerOpen(false)}
          onSecure={() => { setDrawerOpen(false); showToast('TICKET SECURED · CHECK EMAIL') }}
        />
      )}
    </div>
  )
}

function TicketDrawer({ event, heat, selectedHeat, setSelectedHeat, onClose, onSecure }) {
  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-grip" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="eyebrow">SECURE TICKET</div>
            <div className="display" style={{ fontSize: 26, marginTop: 4, color: 'var(--fg)' }}>PICK YOUR HEAT</div>
          </div>
          <button onClick={onClose} className="btn-ghost" style={{ width: 40, height: 40, padding: 0, borderRadius: 12 }}><Icon.X style={{ width: 16, height: 16 }} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 18 }}>
          {event.heats.map(h => {
            const sel = h.id === selectedHeat
            const full = h.spots === 0
            return (
              <button
                key={h.id}
                onClick={() => !full && setSelectedHeat(h.id)}
                disabled={full}
                style={{
                  background: sel ? 'var(--volt)' : 'var(--bg-2)',
                  color: sel ? '#000' : 'var(--fg)',
                  border: sel ? '1px solid var(--volt)' : '1px solid var(--line)',
                  borderRadius: 16, padding: '14px 16px',
                  display: 'flex', alignItems: 'center', gap: 12,
                  cursor: full ? 'not-allowed' : 'pointer',
                  opacity: full ? 0.4 : 1,
                  textAlign: 'left',
                  fontFamily: 'inherit',
                }}
              >
                <div style={{ width: 56 }}>
                  <div className="display" style={{ fontSize: 22, color: 'inherit' }}>{h.time}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="display straight" style={{ fontSize: 13, fontWeight: 700, color: 'inherit' }}>{h.label}</div>
                  <div className="mono" style={{ fontSize: 10, color: sel ? 'rgba(0,0,0,0.6)' : 'var(--fg-3)', marginTop: 2 }}>
                    {full ? 'SOLD OUT' : `${h.spots} / ${h.total} SPOTS LEFT`}
                  </div>
                </div>
                <div style={{ width: 22, height: 22, borderRadius: '50%', border: sel ? 'none' : '1.5px solid var(--fg-3)', background: sel ? '#000' : 'transparent', display: 'grid', placeItems: 'center' }}>
                  {sel && <Icon.Check style={{ width: 12, height: 12, color: 'var(--volt)' }} />}
                </div>
              </button>
            )
          })}
        </div>

        <div style={{ marginTop: 18, padding: 16, background: 'var(--bg-2)', borderRadius: 16, border: '1px dashed var(--line-strong)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="eyebrow">YOUR HEAT</div>
              <div className="display" style={{ fontSize: 18, marginTop: 4, color: 'var(--fg)' }}>{heat.label}</div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-3)', marginTop: 2 }}>{heat.time} · {event.venue}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="display" style={{ fontSize: 32, color: 'var(--volt)' }}>€{event.price}</div>
              <div className="mono" style={{ fontSize: 9, color: 'var(--fg-3)' }}>INCL. CHIP & PHOTO</div>
            </div>
          </div>
        </div>

        <button className="btn btn-volt" onClick={onSecure} style={{ width: '100%', marginTop: 14 }}>
          SECURE TICKET · €{event.price} <Icon.Arrow />
        </button>
        <div className="mono" style={{ textAlign: 'center', fontSize: 10, color: 'var(--fg-3)', marginTop: 10 }}>REFUNDABLE UP TO 7 DAYS BEFORE</div>
      </div>
    </div>
  )
}
```

---

## Task 11: src/App.jsx + src/main.jsx

**Files:**
- Create: `src/App.jsx`
- Create: `src/main.jsx`

Bug fix: `handleBook` and `handleSpend` were two separate callbacks called together in BookScreen. Merged into one `handleBook(id)` that atomically updates both `booked` Set and `user.credits`.

- [ ] **Step 1: Create src/App.jsx**

```jsx
import React from 'react'
import VOLT_DATA from './data'
import { Icon, StatusBar } from './primitives'
import { LoginScreen, HomeScreen, AccessFAB, QROverlay } from './screens/HomeScreen'
import { BookScreen } from './screens/BookScreen'
import { FuelScreen } from './screens/FuelScreen'
import { HealthScreen } from './screens/HealthScreen'
import { EventsScreen } from './screens/EventsScreen'

export default function App() {
  const D = VOLT_DATA
  const [entered, setEntered] = React.useState(false)
  const [tab, setTab] = React.useState('home')
  const [theme, setTheme] = React.useState('dark')
  const [qrOpen, setQrOpen] = React.useState(false)
  const [user, setUser] = React.useState(D.user)
  const [booked, setBooked] = React.useState(new Set())
  const [cart, setCart] = React.useState([])
  const [toast, setToast] = React.useState(null)

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const showToast = (msg) => {
    setToast(msg)
    clearTimeout(window._toastT)
    window._toastT = setTimeout(() => setToast(null), 2800)
  }

  const handleBook = (id) => {
    setBooked(prev => new Set([...prev, id]))
    setUser(u => ({ ...u, credits: Math.max(0, u.credits - 1), sessionsThisWeek: u.sessionsThisWeek + 1 }))
    showToast('CLASS BOOKED · 1 CREDIT USED')
  }

  const tabs = [
    { id: 'home', label: 'HOME', icon: Icon.Home },
    { id: 'book', label: 'CLASSES', icon: Icon.Schedule },
    { id: 'fuel', label: 'FUEL', icon: Icon.Fuel },
    { id: 'health', label: 'HEALTH', icon: Icon.Health },
    { id: 'events', label: 'EVENTS', icon: Icon.Events },
  ]

  return (
    <div className="device-wrap">
      <div className="device">
        <div className="device-label">VOLT // HPX — DEMO BUILD 2.4</div>
        <div className="device-screen">
          {!entered ? (
            <LoginScreen onEnter={() => setEntered(true)} />
          ) : (
            <>
              <StatusBar />
              <div className="island" />
              <div key={tab} style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {tab === 'home' && (
                  <HomeScreen
                    user={user}
                    theme={theme}
                    onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
                    onShowQR={() => setQrOpen(true)}
                    weeklyVolume={D.weeklyVolume}
                  />
                )}
                {tab === 'book' && (
                  <BookScreen
                    classes={D.classes}
                    credits={user.credits}
                    bookedIds={booked}
                    onBook={handleBook}
                  />
                )}
                {tab === 'fuel' && (
                  <FuelScreen menu={D.menu} cart={cart} setCart={setCart} showToast={showToast} />
                )}
                {tab === 'health' && (
                  <HealthScreen
                    biometrics={D.biometrics}
                    prescription={D.prescription}
                    consultants={D.consultants}
                  />
                )}
                {tab === 'events' && (
                  <EventsScreen event={D.event} pastEvents={D.pastEvents} showToast={showToast} />
                )}
              </div>

              {tab === 'home' && <AccessFAB onClick={() => setQrOpen(true)} />}

              <nav className="bottom-nav">
                {tabs.map(t => {
                  const I = t.icon
                  return (
                    <button
                      key={t.id}
                      className={'nav-tab ' + (tab === t.id ? 'active' : '')}
                      onClick={() => setTab(t.id)}
                      aria-label={t.label}
                    >
                      <I />
                      <span>{t.label}</span>
                    </button>
                  )
                })}
              </nav>

              {qrOpen && <QROverlay user={user} onClose={() => setQrOpen(false)} />}

              {toast && (
                <div className="toast">
                  <Icon.Check style={{ width: 16, height: 16 }} />
                  {toast}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create src/main.jsx**

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

---

## Task 12: Verify dev server

- [ ] **Step 1: Start the dev server**

Run from `/home/eduardo/Proyectos/MVP/hyrox/`:
```bash
npm run dev
```
Expected output includes: `Local: http://localhost:5173/`

- [ ] **Step 2: Manual smoke test checklist**

Open `http://localhost:5173` and verify:
- [ ] Login screen renders with scanline + marquee ticker
- [ ] "DEMO ACCESS" button transitions to dashboard
- [ ] Home screen shows credits = 12, streak = 5
- [ ] Theme toggle switches `data-theme` on `<html>` and all colors update
- [ ] CLASSES tab: book a class → button shows "BOOKED", toast fires, credits drop to 11 in header AND home screen
- [ ] FUEL tab: add items → cart badge updates → open bag → subtotal shows, 10% discount applies → complete order → toast fires, cart clears
- [ ] HEALTH tab: metric pills switch chart data and delta badge
- [ ] EVENTS tab: countdown ticking live, "SECURE YOUR HEAT" opens drawer, selecting a heat highlights it
- [ ] QR FAB opens overlay with correct user data
- [ ] Zero console errors

---

## Task 13: Production build + Vercel readiness

- [ ] **Step 1: Run production build**

```bash
npm run build
```
Expected: `dist/` folder created, output shows bundled assets, no errors.

- [ ] **Step 2: Preview production build locally**

```bash
npm run preview
```
Open `http://localhost:4173` and repeat the smoke test from Task 12 to confirm the production build matches dev.

- [ ] **Step 3: Confirm Vercel config**

The `vercel.json` at project root contains:
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```
This ensures direct URL access doesn't 404.

- [ ] **Step 4: Deploy to Vercel**

Option A — Vercel CLI:
```bash
npx vercel
```
Follow prompts. Framework detected as Vite automatically. Build command: `npm run build`. Output directory: `dist`.

Option B — GitHub import: Push to GitHub, import repo at vercel.com. Vercel auto-detects Vite settings.

---

## Self-Review Notes

- All three bug fixes (duplicate animation, split handleBook/handleSpend, random gradient ID) are applied in their respective tasks.
- `onSpend` prop removed from `BookScreen` signature throughout — no dangling prop references.
- `BagDrawer` and `TicketDrawer` are file-private (not exported) since they're only used inside their parent screen files.
- `MiniStat` is file-private to `HealthScreen.jsx` for the same reason.
- Google Fonts loaded via CDN in `index.html` — no font files to bundle.
- No `.env` files needed — purely static, no API keys.
