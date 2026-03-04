import React, { useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlayer } from '../../context/PlayerContext';
import { drawLiquidSwirl, drawCosmicDrift, drawNeonPulse, drawElectricStorm } from './visualizerPatterns';

function LiquidSwirlCanvas({ colors, isPlaying }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      if (isPlaying) timeRef.current += 0.008;
      drawLiquidSwirl(ctx, canvas.width, canvas.height, timeRef.current, colors);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [colors, isPlaying]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

function CosmicDriftCanvas({ colors, isPlaying }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = Array.from({ length: 60 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 1 + Math.random() * 3,
        speed: 0.3 + Math.random() * 1.2,
        alpha: 0.2 + Math.random() * 0.6,
        offset: Math.random() * Math.PI * 2,
        color: [colors.primary, colors.secondary, colors.accent][Math.floor(Math.random() * 3)],
      }));
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      if (isPlaying) timeRef.current += 0.01;
      drawCosmicDrift(ctx, canvas.width, canvas.height, timeRef.current, colors, particlesRef.current);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [colors, isPlaying]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

function NeonPulseCanvas({ colors, isPlaying }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);
  const ringsRef = useRef(Array.from({ length: 5 }, (_, i) => ({ r: i * 60, alpha: 0.8 - i * 0.12 })));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      if (isPlaying) timeRef.current += 0.01;
      drawNeonPulse(ctx, canvas.width, canvas.height, timeRef.current, colors, ringsRef.current);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [colors, isPlaying]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

function ElectricStormCanvas({ colors, isPlaying }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      if (isPlaying) timeRef.current += 0.016;
      drawElectricStorm(ctx, canvas.width, canvas.height, timeRef.current, colors);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [colors, isPlaying]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

const patternComponents = {
  LIQUID_SWIRL: LiquidSwirlCanvas,
  COSMIC_DRIFT: CosmicDriftCanvas,
  NEON_PULSE: NeonPulseCanvas,
  ELECTRIC_STORM: ElectricStormCanvas,
};

export default function PsychedelicVisualizer() {
  const { currentSong, isPlaying, colors } = usePlayer();
  const animStyle = currentSong?.animationStyle || 'LIQUID_SWIRL';
  const PatternComponent = patternComponents[animStyle] || LiquidSwirlCanvas;

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ zIndex: -1, opacity: isPlaying ? 1 : 0.3, transition: 'opacity 1s ease' }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={animStyle}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <PatternComponent colors={colors} isPlaying={isPlaying} />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gray-950/60" />
    </div>
  );
}
