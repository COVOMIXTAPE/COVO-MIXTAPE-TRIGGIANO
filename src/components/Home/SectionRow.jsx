import React from 'react';
import SongCard from './SongCard';

export default function SectionRow({ title, songs }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-white mb-4 px-6">{title}</h2>
      <div className="px-6 overflow-x-auto">
        <div className="flex gap-4 pb-2" style={{ width: 'max-content' }}>
          {songs.map(song => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </div>
    </section>
  );
}
