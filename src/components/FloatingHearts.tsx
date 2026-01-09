'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  type: 'heart' | 'petal';
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generateHearts = () => {
      const newHearts: Heart[] = [];
      for (let i = 0; i < 30; i++) {
        newHearts.push({
          id: i,
          x: Math.random() * 100,
          size: Math.random() * 20 + 10,
          duration: Math.random() * 10 + 15,
          delay: Math.random() * 20,
          type: Math.random() > 0.5 ? 'heart' : 'petal',
        });
      }
      setHearts(newHearts);
    };
    generateHearts();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}%`,
            top: '-50px',
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, Math.sin(heart.id) * 100],
            rotate: [0, 360, 720],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {heart.type === 'heart' ? (
            <svg
              width={heart.size}
              height={heart.size}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill={`rgba(${183 + Math.random() * 50}, ${110 + Math.random() * 50}, ${121 + Math.random() * 50}, 0.6)`}
              />
            </svg>
          ) : (
            <svg
              width={heart.size}
              height={heart.size * 1.5}
              viewBox="0 0 20 30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse
                cx="10"
                cy="15"
                rx="8"
                ry="12"
                fill={`rgba(248, 180, 196, 0.5)`}
                transform="rotate(15, 10, 15)"
              />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
}
