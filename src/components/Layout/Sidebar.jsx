import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Library } from 'lucide-react';
import { usePlayer } from '../../context/PlayerContext';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/search', icon: Search, label: 'Search' },
  { to: '/library', icon: Library, label: 'Library' },
];

export default function Sidebar() {
  const { currentSong } = usePlayer();

  return (
    <aside
      className="fixed left-0 top-0 bottom-0 w-60 z-40 flex flex-col"
      style={{
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderRight: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <div className="p-6">
        <div className="text-xl font-bold tracking-tight text-white">🎵 COVO MIXTAPE</div>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium ${
                isActive
                  ? 'text-white border-l-2'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`
            }
            style={({ isActive }) =>
              isActive ? {
                background: 'rgba(var(--color-accent-rgb, 236, 72, 153), 0.1)',
                borderColor: 'var(--color-accent)',
                color: 'white',
              } : {}
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>
      {currentSong && (
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <img
              src={currentSong.albumArt}
              alt={currentSong.title}
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-white truncate">{currentSong.title}</div>
              <div className="text-xs text-white/50 truncate">{currentSong.artist}</div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
