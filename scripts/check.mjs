/**
 * check.mjs — run with `npm run check`
 *
 * Verifies that:
 *  1. The project builds without errors.
 *  2. Every audioUrl declared in src/data/songs.js has a matching
 *     MP3 file inside public/songs/.
 */

import { execSync } from 'child_process';
import { existsSync, readdirSync } from 'fs';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SONGS_JS = join(ROOT, 'src', 'data', 'songs.js');
const SONGS_DIR = join(ROOT, 'public', 'songs');

let ok = true;

/** Decode an audioUrl like "/songs/2.%20WII%20PARTY.mp3" → "2. WII PARTY.mp3" */
function audioUrlToFilename(audioUrl) {
  return decodeURIComponent(audioUrl.replace(/^\/songs\//, ''));
}

// ── 1. Build ────────────────────────────────────────────────────────────────
console.log('\n📦  Building project…');
try {
  execSync('npm run build', { cwd: ROOT, stdio: 'inherit' });
  console.log('✅  Build passed.\n');
} catch {
  console.error('❌  Build failed.');
  ok = false;
}

// ── 2. MP3 files vs songs.js ────────────────────────────────────────────────
console.log('🎵  Checking MP3 files…');

if (!existsSync(SONGS_DIR)) {
  console.error(`❌  public/songs/ directory not found. Make sure your MP3 files are placed there.`);
  process.exit(1);
}

// Collect files on disk (decoded names)
const onDisk = new Set(
  readdirSync(SONGS_DIR).filter(f => f.endsWith('.mp3'))
);

// Import songs list (catches syntax/module errors with a clear message)
let songs;
try {
  ({ songs } = await import(`file://${SONGS_JS}`));
} catch (err) {
  console.error(`❌  Could not load src/data/songs.js: ${err.message}`);
  process.exit(1);
}

let allFound = true;
for (const song of songs) {
  const filename = audioUrlToFilename(song.audioUrl);
  const exists = existsSync(join(SONGS_DIR, filename));
  const icon = exists ? '✅' : '❌';
  console.log(`  ${icon}  ${song.id}. ${song.title}  →  ${filename}`);
  if (!exists) {
    allFound = false;
    ok = false;
  }
}

// Warn about orphan MP3s that are not referenced in songs.js
const referenced = new Set(songs.map(s => audioUrlToFilename(s.audioUrl)));
for (const f of onDisk) {
  if (!referenced.has(f)) {
    console.warn(`  ⚠️   File not referenced in songs.js: ${f}`);
  }
}

if (allFound) {
  console.log(`\n✅  All ${songs.length} tracks found in public/songs/.\n`);
} else {
  console.error('\n❌  Some MP3 files are missing – see above.\n');
}

process.exit(ok ? 0 : 1);

