'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showVolume, setShowVolume] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Hide tooltip after 5 seconds
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current && !hasError) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.log('Audio playback prevented:', err);
            setHasError(true);
          });
      }
    }
  };

  const handleError = () => {
    setHasError(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="fixed bottom-6 right-6 z-50"
      onMouseEnter={() => setShowVolume(true)}
      onMouseLeave={() => setShowVolume(false)}
    >
      {/* Audio element - Add your romantic music file to /public/music/romantic.mp3 */}
      <audio ref={audioRef} loop onError={handleError}>
        <source src="/music/romantic.mp3" type="audio/mpeg" />
      </audio>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && !hasError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-deep-burgundy text-cream-white text-sm rounded-lg whitespace-nowrap romantic-shadow"
          >
            Click to play romantic music
            <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-deep-burgundy" />
          </motion.div>
        )}
        {hasError && showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-deep-burgundy text-cream-white text-xs rounded-lg whitespace-nowrap romantic-shadow max-w-[200px]"
          >
            Add music file to /public/music/romantic.mp3
            <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-deep-burgundy" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Volume Slider */}
      <AnimatePresence>
        {showVolume && isPlaying && !hasError && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-cream-white rounded-full px-3 py-2 romantic-shadow flex items-center gap-2"
          >
            <svg className="w-4 h-4 text-rose-gold" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-20 h-1 bg-blush-pink rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-rose-gold [&::-webkit-slider-thumb]:rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music Button */}
      <motion.button
        onClick={togglePlay}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-full flex items-center justify-center romantic-shadow transition-all duration-300 ${
          hasError
            ? 'bg-gradient-to-r from-gray-400 to-gray-500'
            : isPlaying
            ? 'bg-gradient-to-r from-rose-gold to-deep-rose'
            : 'bg-gradient-to-r from-blush-pink to-rose-gold'
        }`}
      >
        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: 'linear' }}
        >
          {isPlaying ? (
            // Pause icon when playing
            <svg className="w-6 h-6 text-cream-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            // Play/Music icon when paused
            <svg className="w-6 h-6 text-cream-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6zm-2 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
            </svg>
          )}
        </motion.div>

        {/* Sound waves animation when playing */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(183, 110, 121, 0.4)',
                '0 0 0 20px rgba(183, 110, 121, 0)',
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.button>
    </motion.div>
  );
}
