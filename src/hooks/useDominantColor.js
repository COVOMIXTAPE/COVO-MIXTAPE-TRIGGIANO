import { useState, useEffect } from 'react';
import { extractDominantColor } from '../utils/colorUtils';

const colorCache = {};

export function useDominantColor(imageUrl) {
  const [colors, setColors] = useState({ primary: '#6366f1', secondary: '#8b5cf6', accent: '#ec4899', isDark: true });

  useEffect(() => {
    if (!imageUrl) return;
    if (colorCache[imageUrl]) { setColors(colorCache[imageUrl]); return; }
    extractDominantColor(imageUrl).then(c => { colorCache[imageUrl] = c; setColors(c); });
  }, [imageUrl]);

  return colors;
}
