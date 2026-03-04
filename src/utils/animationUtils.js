export const ANIMATION_STYLES = {
  LIQUID_SWIRL: 'LIQUID_SWIRL',
  COSMIC_DRIFT: 'COSMIC_DRIFT',
  NEON_PULSE: 'NEON_PULSE',
  ELECTRIC_STORM: 'ELECTRIC_STORM',
};

export function getAnimationStyleByBPM(bpm) {
  if (bpm < 80) return ANIMATION_STYLES.LIQUID_SWIRL;
  if (bpm <= 110) return ANIMATION_STYLES.COSMIC_DRIFT;
  if (bpm <= 130) return ANIMATION_STYLES.NEON_PULSE;
  return ANIMATION_STYLES.ELECTRIC_STORM;
}

export function formatDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}
