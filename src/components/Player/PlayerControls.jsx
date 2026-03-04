import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';

export default function PlayerControls() {
  const { isPlaying, togglePlay, next, prev, isShuffle, isRepeat, toggleShuffle, toggleRepeat } = usePlayer();

  return (
    <div className="flex items-center gap-4">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={toggleShuffle}
        className={`p-1.5 rounded-full transition-colors ${isShuffle ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
        style={isShuffle ? { color: 'var(--color-accent)' } : {}}
      >
        <Shuffle size={16} />
      </motion.button>
      <motion.button whileTap={{ scale: 0.9 }} onClick={prev} className="p-1.5 text-white/70 hover:text-white transition-colors">
        <SkipBack size={20} />
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className="p-3 rounded-full text-black font-bold transition-all"
        style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))' }}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </motion.button>
      <motion.button whileTap={{ scale: 0.9 }} onClick={next} className="p-1.5 text-white/70 hover:text-white transition-colors">
        <SkipForward size={20} />
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={toggleRepeat}
        className={`p-1.5 rounded-full transition-colors ${isRepeat ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
        style={isRepeat ? { color: 'var(--color-accent)' } : {}}
      >
        <Repeat size={16} />
      </motion.button>
    </div>
  );
}
