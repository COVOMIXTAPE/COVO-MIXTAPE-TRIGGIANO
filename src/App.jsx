import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { PlayerProvider } from './context/PlayerContext';
import PsychedelicVisualizer from './components/Visualizer/PsychedelicVisualizer';
import BottomPlayer from './components/Player/BottomPlayer';
import AppLayout from './components/Layout/AppLayout';
import HomePage from './components/Home/HomePage';
import SearchPage from './components/Search/SearchPage';
import LibraryPage from './components/Library/LibraryPage';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/library" element={<LibraryPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <PlayerProvider>
        <PsychedelicVisualizer />
        <AppLayout>
          <AnimatedRoutes />
        </AppLayout>
        <BottomPlayer />
      </PlayerProvider>
    </BrowserRouter>
  );
}
