'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const iLoveYouTranslations = [
  { language: "English", text: "I Love You" },
  { language: "Arabic", text: "أحبك" },
  { language: "Urdu", text: "میں تم سے پیار کرتا ہوں" },
  { language: "French", text: "Je t'aime" },
  { language: "Spanish", text: "Te amo" },
  { language: "German", text: "Ich liebe dich" },
  { language: "Italian", text: "Ti amo" },
  { language: "Japanese", text: "愛してる" },
  { language: "Korean", text: "사랑해요" },
  { language: "Turkish", text: "Seni seviyorum" },
];

export default function Footer() {
  const [showLanguages, setShowLanguages] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [currentLang, setCurrentLang] = useState(0);

  // Cycle through languages when showing
  useEffect(() => {
    if (showLanguages) {
      const interval = setInterval(() => {
        setCurrentLang((prev) => (prev + 1) % iLoveYouTranslations.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [showLanguages]);

  const handleSecretClick = () => {
    setClickCount((prev) => {
      const newCount = prev + 1;
      if (newCount >= 3) {
        setShowLanguages(true);
        return 0;
      }
      return newCount;
    });
  };

  return (
    <footer className="relative py-16 px-4 bg-gradient-to-b from-cream-white to-blush-pink/50 overflow-hidden">
      {/* Background hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + i * 9}%`,
              bottom: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            <svg
              className="w-8 h-8 text-rose-gold/30"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Secret "I love you" in 10 languages */}
        <AnimatePresence>
          {showLanguages && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-6 bg-cream-white rounded-2xl romantic-shadow"
            >
              <p className="text-sm text-rose-gold mb-2">
                {iLoveYouTranslations[currentLang].language}
              </p>
              <motion.p
                key={currentLang}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="font-script text-3xl md:text-4xl text-deep-burgundy"
              >
                {iLoveYouTranslations[currentLang].text}
              </motion.p>
              <button
                onClick={() => setShowLanguages(false)}
                className="mt-4 text-sm text-rose-gold/70 hover:text-rose-gold"
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main footer content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Animated heart */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <svg
              className="w-16 h-16 text-deep-rose"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </motion.div>

          {/* Signature */}
          <p className="font-script text-3xl md:text-4xl text-deep-burgundy mb-4">
            Forever Yours
          </p>

          {/* Name - Clickable for secret */}
          <motion.p
            onClick={handleSecretClick}
            whileHover={{ scale: 1.05 }}
            className="font-serif text-xl text-rose-gold cursor-pointer select-none"
          >
            ~ Rehan Minhas ~
          </motion.p>

          {/* Secret hint */}
          {clickCount > 0 && clickCount < 3 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-rose-gold/50 mt-2"
            >
              {3 - clickCount} more click{3 - clickCount > 1 ? 's' : ''} for a surprise...
            </motion.p>
          )}

          {/* Divider */}
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-rose-gold to-transparent mx-auto my-8" />

          {/* Special message */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-deep-burgundy/70 text-sm max-w-md mx-auto mb-8"
          >
            This website was made with all my love, just for you, Aqsa Batool.
            Every word, every animation, every pixel - they all carry a piece of my heart.
          </motion.p>

          {/* Hidden message */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="relative inline-block group"
          >
            <p className="text-xs text-rose-gold/40 cursor-help">
              Hover here for a secret message
            </p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-2 bg-deep-burgundy text-cream-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity romantic-shadow"
            >
              Will you be mine forever?
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-deep-burgundy" />
            </motion.div>
          </motion.div>

          {/* Date */}
          <p className="text-xs text-deep-burgundy/40 mt-8">
            Made with love since September 22, 2024
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
