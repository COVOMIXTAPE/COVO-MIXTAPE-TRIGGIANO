import { useState, useEffect, useRef, useCallback } from 'react';
import { songs as initialSongs } from '../data/songs';

export function useAudioPlayer() {
  const audioRef = useRef(new Audio());
  const [queue, setQueue] = useState(initialSongs);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [likedSongs, setLikedSongs] = useState(() =>
    initialSongs.filter(s => s.liked).map(s => s.id)
  );

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration || 0);
    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else {
        nextSong();
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isRepeat, isShuffle, queue]);

  const playSong = useCallback((song) => {
    const audio = audioRef.current;
    if (currentSong?.id === song.id && isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }
    audio.src = song.audioUrl;
    audio.load();
    audio.play().then(() => {
      setCurrentSong(song);
      setIsPlaying(true);
    }).catch(() => {
      setCurrentSong(song);
      setIsPlaying(false);
    });
  }, [currentSong, isPlaying]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!currentSong) {
      if (queue.length > 0) playSong(queue[0]);
      return;
    }
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [currentSong, isPlaying, queue, playSong]);

  const nextSong = useCallback(() => {
    if (!queue.length) return;
    if (isShuffle) {
      const randomIdx = Math.floor(Math.random() * queue.length);
      playSong(queue[randomIdx]);
    } else {
      const idx = queue.findIndex(s => s.id === currentSong?.id);
      const nextIdx = (idx + 1) % queue.length;
      playSong(queue[nextIdx]);
    }
  }, [queue, currentSong, isShuffle, playSong]);

  const prevSong = useCallback(() => {
    const audio = audioRef.current;
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    if (!queue.length) return;
    const idx = queue.findIndex(s => s.id === currentSong?.id);
    const prevIdx = (idx - 1 + queue.length) % queue.length;
    playSong(queue[prevIdx]);
  }, [queue, currentSong, playSong]);

  const seek = useCallback((time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  const setVolume = useCallback((v) => {
    audioRef.current.volume = v;
    setVolumeState(v);
  }, []);

  const toggleShuffle = useCallback(() => setIsShuffle(s => !s), []);
  const toggleRepeat = useCallback(() => setIsRepeat(r => !r), []);

  const toggleLike = useCallback((songId) => {
    setLikedSongs(prev =>
      prev.includes(songId) ? prev.filter(id => id !== songId) : [...prev, songId]
    );
  }, []);

  return {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isShuffle,
    isRepeat,
    queue,
    likedSongs,
    playSong,
    togglePlay,
    next: nextSong,
    prev: prevSong,
    seek,
    setVolume,
    toggleShuffle,
    toggleRepeat,
    toggleLike,
  };
}
