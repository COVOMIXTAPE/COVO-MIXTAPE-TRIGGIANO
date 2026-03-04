import React, { createContext, useContext, useEffect } from 'react';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { useDominantColor } from '../hooks/useDominantColor';

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const player = useAudioPlayer();
  const colors = useDominantColor(player.currentSong?.albumArt);

  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', colors.primary);
    document.documentElement.style.setProperty('--color-secondary', colors.secondary);
    document.documentElement.style.setProperty('--color-accent', colors.accent);
  }, [colors]);

  return (
    <PlayerContext.Provider value={{ ...player, colors }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider');
  return ctx;
}
