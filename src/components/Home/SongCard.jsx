import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';

export default function SongCard({ song }) {
  const { playSong, currentSong, isPlaying } = usePlayer();
  const isActive = currentSong?.id === song.id;

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      className="shrink-0 w-44 cursor-pointer rounded-2xl overflow-hidden group"
      style={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: isActive ? '0 0 20px var(--color-accent)' : undefined,
      }}
      onClick={() => playSong(song)}
    >
      <div className="relative">
        <img src={song.albumArt} alt={song.title} className="w-full h-44 object-cover" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-3 rounded-full"
            style={{ background: 'var(--color-accent)' }}
          >
            <Play size={20} fill="white" className="text-white" />
          </motion.div>
        </div>
        {isActive && isPlaying && (
          <div className="absolute top-2 right-2 flex gap-0.5 items-end h-4">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-1 rounded-full animate-pulse"
                style={{
                  height: `${40 + i * 20}%`,
                  background: 'var(--color-accent)',
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="text-sm font-semibold text-white truncate">{song.title}</div>
        <div className="text-xs text-white/50 truncate">{song.artist}</div>
        {song.tags?.length > 0 && (
          <div className="flex gap-1 mt-2 flex-wrap">
            {song.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/60 capitalize">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
