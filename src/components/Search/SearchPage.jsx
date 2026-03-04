import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { songs, genres } from '../../data/songs';
import SearchResults from './SearchResults';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [activeGenre, setActiveGenre] = useState('All');

  const filtered = useMemo(() => {
    return songs.filter(song => {
      const matchesQuery = !query || 
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase());
      const matchesGenre = activeGenre === 'All' || 
        song.genre.toLowerCase() === activeGenre.toLowerCase();
      return matchesQuery && matchesGenre;
    });
  }, [query, activeGenre]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="p-6"
    >
      <h1 className="text-3xl font-bold text-white mb-6">Search</h1>
      
      <div
        className="flex items-center gap-3 mb-6 px-5 py-3 rounded-full"
        style={{
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        <Search size={20} className="text-white/40 shrink-0" />
        <input
          type="text"
          placeholder="Search songs, artists..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="flex-1 bg-transparent text-white placeholder-white/30 outline-none text-sm"
        />
      </div>

      <div className="flex gap-2 flex-wrap mb-6">
        {genres.map(genre => (
          <motion.button
            key={genre}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveGenre(genre)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all"
            style={{
              background: activeGenre === genre ? 'var(--color-accent)' : 'rgba(255,255,255,0.08)',
              color: activeGenre === genre ? 'white' : 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {genre}
          </motion.button>
        ))}
      </div>

      <SearchResults results={filtered} />
    </motion.div>
  );
}
