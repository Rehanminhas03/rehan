'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const colors = ['#b76e79', '#f8b4c4', '#c21e56', '#e0b0ff', '#ffd1dc'];

export default function CursorHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    if (!isEnabled) return;

    let lastTime = 0;
    const throttleMs = 50; // Create heart every 50ms max

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < throttleMs) return;
      lastTime = now;

      const newHeart: Heart = {
        id: now,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 15 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      setHearts((prev) => [...prev.slice(-15), newHeart]); // Keep max 15 hearts
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isEnabled]);

  // Remove hearts after animation
  useEffect(() => {
    if (hearts.length === 0) return;

    const timer = setTimeout(() => {
      setHearts((prev) => prev.slice(1));
    }, 1000);

    return () => clearTimeout(timer);
  }, [hearts]);

  return (
    <>
      {/* Toggle button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        onClick={() => setIsEnabled(!isEnabled)}
        className="fixed bottom-6 left-6 z-50 w-10 h-10 rounded-full bg-gradient-to-r from-blush-pink to-rose-gold flex items-center justify-center romantic-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title={isEnabled ? 'Disable heart trail' : 'Enable heart trail'}
      >
        <svg
          className={`w-5 h-5 transition-colors ${isEnabled ? 'text-cream-white' : 'text-cream-white/50'}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        {!isEnabled && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-0.5 bg-cream-white/70 rotate-45 rounded-full" />
          </div>
        )}
      </motion.button>

      {/* Hearts */}
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{
                opacity: 1,
                scale: 0,
                x: heart.x - heart.size / 2,
                y: heart.y - heart.size / 2,
              }}
              animate={{
                opacity: 0,
                scale: 1.5,
                y: heart.y - heart.size / 2 - 50,
                rotate: Math.random() > 0.5 ? 20 : -20,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute"
              style={{ width: heart.size, height: heart.size }}
            >
              <svg
                viewBox="0 0 24 24"
                fill={heart.color}
                className="w-full h-full drop-shadow-sm"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
