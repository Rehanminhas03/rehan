'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Konami Code: Up, Up, Down, Down, Left, Right, Left, Right, B, A
const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

export default function KonamiCode() {
  const [inputSequence, setInputSequence] = useState<string[]>([]);
  const [showSecret, setShowSecret] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const checkKonamiCode = useCallback((sequence: string[]) => {
    if (sequence.length !== KONAMI_CODE.length) return false;
    return sequence.every((key, index) => key === KONAMI_CODE[index]);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const newSequence = [...inputSequence, event.code].slice(-KONAMI_CODE.length);
      setInputSequence(newSequence);

      if (checkKonamiCode(newSequence)) {
        setShowSecret(true);
        setShowConfetti(true);
        setInputSequence([]);

        // Hide confetti after animation
        setTimeout(() => setShowConfetti(false), 5000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputSequence, checkKonamiCode]);

  return (
    <>
      {/* Confetti animation */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-[200]">
            {[...Array(100)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: -20,
                }}
                initial={{ y: 0, opacity: 1, rotate: 0 }}
                animate={{
                  y: '120vh',
                  opacity: [1, 1, 0],
                  rotate: Math.random() * 720 - 360,
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: Math.random() * 0.5,
                  ease: 'easeIn',
                }}
              >
                {Math.random() > 0.5 ? (
                  <svg
                    className="w-6 h-6"
                    fill={`hsl(${340 + Math.random() * 40}, 70%, ${50 + Math.random() * 20}%)`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                ) : (
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: `hsl(${Math.random() * 60 + 320}, 70%, 60%)`,
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Secret message modal */}
      <AnimatePresence>
        {showSecret && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-deep-burgundy/90 backdrop-blur-sm p-4"
            onClick={() => setShowSecret(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateY: 180 }}
              transition={{ type: 'spring', damping: 20 }}
              className="bg-cream-white rounded-3xl p-8 md:p-12 max-w-lg mx-auto text-center romantic-shadow"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated heart */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="mb-6"
              >
                <svg
                  className="w-20 h-20 mx-auto text-deep-rose"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </motion.div>

              <h3 className="font-serif text-2xl md:text-3xl font-bold text-deep-burgundy mb-4">
                You Found the Secret!
              </h3>

              <p className="font-script text-xl md:text-2xl text-rose-gold mb-6">
                My Dearest Aqsa Batool,
              </p>

              <p className="text-deep-burgundy/80 leading-relaxed mb-6">
                If you&apos;re reading this, you&apos;ve discovered my hidden message.
                Just like finding this easter egg, finding you was the greatest
                discovery of my life.
              </p>

              <p className="text-deep-burgundy/80 leading-relaxed mb-6">
                I want you to know that no matter what challenges we face,
                no matter how far apart we may be, my love for you will never
                fade. You are my today, my tomorrow, and my forever.
              </p>

              <motion.p
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="font-script text-2xl text-deep-rose font-bold"
              >
                Will you be mine forever?
              </motion.p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSecret(false)}
                className="mt-8 px-8 py-3 bg-gradient-to-r from-rose-gold to-deep-rose text-cream-white rounded-full font-medium romantic-shadow"
              >
                Close with a Smile
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
