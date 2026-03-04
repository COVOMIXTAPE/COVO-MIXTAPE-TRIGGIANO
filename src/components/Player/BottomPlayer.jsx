import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Volume2, MoreHorizontal } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import ProgressBar from './ProgressBar';
import PlayerControls from './PlayerControls';

export default function BottomPlayer() {
  const { currentSong, isPlaying, volume, setVolume, likedSongs, toggleLike } = usePlayer();

  if (!currentSong) return null;

  const isLiked = likedSongs.includes(currentSong.id);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', damping: 20 }}
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-3 pt-2"
      style={{
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center gap-4">
          {/* Album Art */}
          <motion.div
            animate={isPlaying ? { scale: [1, 1.04, 1] } : { scale: 1 }}
            transition={{ repeat: Infinity, duration: 60 / (currentSong.bpm || 120), ease: 'easeInOut' }}
            className="shrink-0"
          >
            <img
              src={currentSong.albumArt}
              alt={currentSong.title}
              className="w-13 h-13 rounded-xl shadow-lg object-cover"
              style={{ width: 52, height: 52, ring: '1px solid rgba(255,255,255,0.2)' }}
            />
          </motion.div>

          {/* Song Info */}
          <div className="flex-1 min-w-0 hidden sm:block">
            <div className="text-sm font-semibold text-white truncate">{currentSong.title}</div>
            <div className="text-xs text-white/50 truncate">{currentSong.artist}</div>
          </div>

          {/* Controls (center on desktop, full on mobile) */}
          <div className="flex-1 flex flex-col items-center gap-1.5">
            <PlayerControls />
            <div className="w-full max-w-lg">
              <ProgressBar />
            </div>
          </div>

          {/* Right side */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <motion.button
              whileTap={{ scale: 1.4 }}
              onClick={() => toggleLike(currentSong.id)}
              className="p-1.5 transition-colors"
              style={{ color: isLiked ? 'var(--color-accent)' : 'rgba(255,255,255,0.4)' }}
            >
              <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
            </motion.button>
            <div className="flex items-center gap-2">
              <Volume2 size={16} className="text-white/40" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={e => setVolume(parseFloat(e.target.value))}
                className="w-20 h-1 accent-white cursor-pointer"
                style={{ accentColor: 'var(--color-accent)' }}
              />
            </div>
            <button className="p-1.5 text-white/40 hover:text-white/70">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
