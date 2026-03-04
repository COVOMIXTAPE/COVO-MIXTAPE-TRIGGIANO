import { useMemo } from 'react';
import { getAnimationStyleByBPM } from '../utils/animationUtils';

export function useAnimationStyle(song) {
  return useMemo(() => {
    if (!song) return 'LIQUID_SWIRL';
    return song.animationStyle || getAnimationStyleByBPM(song.bpm);
  }, [song]);
}
