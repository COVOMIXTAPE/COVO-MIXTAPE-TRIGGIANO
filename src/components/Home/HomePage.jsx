import React from 'react';
import { motion } from 'framer-motion';
import { usePlayer } from '../../context/PlayerContext';
import { songs } from '../../data/songs';
import SectionRow from './SectionRow';

const recommended = songs.filter(s => s.tags?.includes('recommended'));
const newReleases = songs.filter(s => s.tags?.includes('new'));

export default function HomePage() {
  const { currentSong, isPlaying, playSong } = usePlayer();
  const heroSong = currentSong || songs[0];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="min-h-full"
    >
      {/* Hero Section */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={heroSong.albumArt}
          alt={heroSong.title}
          className="absolute inset-0 w-full h-full object-cover scale-110"
          style={{ filter: 'blur(40px)', opacity: 0.4 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 50%, transparent 100%)',
            opacity: 0.3,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-950" />
        <div className="relative h-full flex items-end p-6">
          <div className="flex items-end gap-6">
            <motion.img
              animate={isPlaying && currentSong?.id === heroSong.id ? { scale: [1, 1.04, 1] } : {}}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              src={heroSong.albumArt}
              alt={heroSong.title}
              className="w-32 h-32 rounded-2xl shadow-2xl object-cover"
              style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}
            />
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5"
                  style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}
                >
                  {isPlaying && currentSong?.id === heroSong.id ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      Now Playing
                    </>
                  ) : (
                    'Featured'
                  )}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-white mb-1">{heroSong.title}</h1>
              <p className="text-white/60 text-lg">{heroSong.artist} · {heroSong.album}</p>
              {(!currentSong || currentSong.id !== heroSong.id) && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => playSong(heroSong)}
                  className="mt-4 px-6 py-2.5 rounded-full text-sm font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))' }}
                >
                  Play Now
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6">
        <SectionRow title="Recommended For You" songs={recommended} />

        <section className="mb-8 px-6">
          <h2 className="text-xl font-bold text-white mb-4">New Releases</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {newReleases.map(song => (
              <motion.div
                key={song.id}
                whileHover={{ scale: 1.05, y: -4 }}
                className="cursor-pointer rounded-2xl overflow-hidden relative group"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                onClick={() => playSong(song)}
              >
                <img src={song.albumArt} alt={song.title} className="w-full aspect-square object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="text-sm font-semibold text-white truncate">{song.title}</div>
                  <div className="text-xs text-white/60 truncate">{song.artist}</div>
                  <div className="flex gap-1 mt-1.5 flex-wrap">
                    {song.tags?.map(tag => (
                      <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 text-white/70 capitalize">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
}
