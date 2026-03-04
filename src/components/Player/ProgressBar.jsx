import React, { useRef } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import { formatDuration } from '../../utils/animationUtils';

export default function ProgressBar() {
  const { currentTime, duration, seek } = usePlayer();
  const barRef = useRef(null);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleClick = (e) => {
    const rect = barRef.current.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    seek(ratio * duration);
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <span className="text-xs text-white/50 w-8 text-right shrink-0">{formatDuration(currentTime)}</span>
      <div
        ref={barRef}
        className="flex-1 h-1.5 bg-white/10 rounded-full cursor-pointer group relative"
        onClick={handleClick}
      >
        <div
          className="h-full rounded-full transition-all duration-300 relative"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(to right, var(--color-primary), var(--color-accent))',
            boxShadow: '0 0 12px var(--color-accent)',
          }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
      <span className="text-xs text-white/50 w-8 shrink-0">{formatDuration(duration)}</span>
    </div>
  );
}
