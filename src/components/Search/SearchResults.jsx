import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { formatDuration } from '../../utils/animationUtils';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

export default function SearchResults({ results }) {
  const { playSong, currentSong, isPlaying } = usePlayer();

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-white/30">
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-lg">No songs found</p>
      </div>
    );
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-2">
      {results.map(song => {
        const isActive = currentSong?.id === song.id;
        return (
          <motion.div
            key={song.id}
            variants={item}
            className="flex items-center gap-4 p-3 rounded-xl cursor-pointer group transition-colors"
            style={{ background: isActive ? 'rgba(255,255,255,0.1)' : undefined }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
            onClick={() => playSong(song)}
          >
            <div className="relative shrink-0">
              <img src={song.albumArt} alt={song.title} className="w-12 h-12 rounded-xl object-cover" />
              <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Play size={16} fill="white" className="text-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className={`text-sm font-semibold truncate ${isActive ? 'text-accent' : 'text-white'}`}
                style={isActive ? { color: 'var(--color-accent)' } : {}}>
                {song.title}
              </div>
              <div className="text-xs text-white/50 truncate">{song.artist} · {song.album}</div>
            </div>
            <div className="text-xs text-white/40 shrink-0">{formatDuration(song.duration)}</div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
