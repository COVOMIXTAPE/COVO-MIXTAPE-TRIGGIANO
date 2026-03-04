import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';
import { songs } from '../../data/songs';
import { formatDuration } from '../../utils/animationUtils';

export default function LibraryPage() {
  const { likedSongs, toggleLike, playSong, currentSong } = usePlayer();
  const [sortBy, setSortBy] = useState('title');

  const liked = useMemo(() => {
    const ls = songs.filter(s => likedSongs.includes(s.id));
    return [...ls].sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'artist') return a.artist.localeCompare(b.artist);
      return 0;
    });
  }, [likedSongs, sortBy]);

  if (liked.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="flex flex-col items-center justify-center h-full p-6 text-center"
      >
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          className="text-8xl mb-6"
        >
          🎵
        </motion.div>
        <h2 className="text-2xl font-bold text-white mb-2">Your library is empty</h2>
        <p className="text-white/50">Like some songs to see them here</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Your Library</h1>
        <div className="flex gap-2">
          {['title', 'artist'].map(s => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-all capitalize"
              style={{
                background: sortBy === s ? 'var(--color-accent)' : 'rgba(255,255,255,0.08)',
                color: sortBy === s ? 'white' : 'rgba(255,255,255,0.6)',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {liked.map((song, idx) => {
          const isActive = currentSong?.id === song.id;
          return (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              className="flex items-center gap-4 p-3 rounded-xl cursor-pointer group transition-colors"
              style={{ background: isActive ? 'rgba(255,255,255,0.1)' : undefined }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = isActive ? 'rgba(255,255,255,0.1)' : 'transparent'; }}
              onClick={() => playSong(song)}
            >
              <span className="text-white/30 text-xs w-5 text-right hidden sm:block">{idx + 1}</span>
              <img src={song.albumArt} alt={song.title} className="w-11 h-11 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white truncate" style={isActive ? { color: 'var(--color-accent)' } : {}}>
                  {song.title}
                </div>
                <div className="text-xs text-white/50 truncate">{song.artist}</div>
              </div>
              <div className="hidden sm:block text-xs text-white/40 truncate max-w-[120px]">{song.album}</div>
              <div className="text-xs text-white/40">{formatDuration(song.duration)}</div>
              <motion.button
                whileTap={{ scale: 1.4 }}
                onClick={e => { e.stopPropagation(); toggleLike(song.id); }}
                className="p-1.5 transition-colors"
                style={{ color: 'var(--color-accent)' }}
              >
                <Heart size={16} fill="currentColor" />
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
