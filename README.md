# 🎵 COVO MIXTAPE TRIGGIANO

A React-based mixtape player for **COVO MIXTAPE TRIGGIANO**.

---

## Prerequisites

| Tool | Minimum version |
|------|----------------|
| [Node.js](https://nodejs.org/) | 18 |
| npm | 9 (bundled with Node 18) |

---

## Run the app locally

```bash
# 1 — Clone the repository
git clone https://github.com/COVOMIXTAPE/COVO-MIXTAPE-TRIGGIANO.git
cd COVO-MIXTAPE-TRIGGIANO

# 2 — Install dependencies
npm install

# 3 — Start the development server
npm run dev
```

Then open **http://localhost:5173** in your browser.

> **MP3 files** — the 12 tracks must be present in `public/songs/`.  
> They are already committed to the repository so no extra step is needed.

---

## Available commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the local dev server at http://localhost:5173 (hot-reload) |
| `npm run build` | Build a production-ready bundle into `dist/` |
| `npm run preview` | Serve the production build locally for final testing |
| `npm run check` | Verify the build passes **and** all 12 MP3 files are in place |

---

## Project structure

```
COVO-MIXTAPE-TRIGGIANO/
├── public/
│   └── songs/          ← MP3 files served statically
├── src/
│   ├── components/     ← React UI components
│   ├── context/        ← Global state (player, library)
│   ├── data/
│   │   └── songs.js    ← Track metadata (title, duration, audioUrl…)
│   ├── hooks/          ← Custom React hooks
│   └── utils/          ← Helper functions
├── scripts/
│   └── check.mjs       ← Health-check script (npm run check)
└── package.json
```

---

## Verify everything is working

```bash
npm run check
```

Expected output:

```
📦  Building project…
✅  Build passed.

🎵  Checking MP3 files…
  ✅  1. INTRO PODCAST (ISTRUZIONI ALL'USO)  →  1. INTRO PODCAST(ISTRUZIONI ALL'USO).mp3
  ✅  2. WII PARTY  →  2. WII PARTY.mp3
  ...
  ✅  12. TOO DOG (BONUS)  →  12. TOO DOG (BONUS).mp3

✅  All 12 tracks found in public/songs/.
```
