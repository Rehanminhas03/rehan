'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface HeroProps {
  onNameClick?: () => void;
  clickCount: number;
}

const heroImages = [
  '/images/gallery/IMG-20251023-WA0041.jpg',
  '/images/gallery/IMG-20250921-WA0025.jpg',
  '/images/gallery/IMG-20251023-WA0027.jpg',
  '/images/gallery/IMG-20250921-WA0048.jpg',
  '/images/gallery/IMG-20251011-WA0045.jpg',
];

export default function Hero({ onNameClick, clickCount }: HeroProps) {
  const name = "Aqsa Batool";
  const [displayedLetters, setDisplayedLetters] = useState<string[]>([]);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [showHeartExplosion, setShowHeartExplosion] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Photo slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Letter by letter animation
    const letters = name.split('');
    letters.forEach((letter, index) => {
      setTimeout(() => {
        setDisplayedLetters(prev => [...prev, letter]);
      }, index * 150);
    });

    // Show subtitle after name is complete
    setTimeout(() => setShowSubtitle(true), name.length * 150 + 500);

    // Show scroll indicator
    setTimeout(() => setShowScrollIndicator(true), name.length * 150 + 1500);
  }, []);

  useEffect(() => {
    if (clickCount >= 5) {
      setShowHeartExplosion(true);
      setTimeout(() => setShowHeartExplosion(false), 3000);
    }
  }, [clickCount]);

  const scrollToNextSection = () => {
    const timelineSection = document.getElementById('timeline');
    if (timelineSection) {
      timelineSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Photo Slideshow Background */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentImageIndex]}
              alt="Our beautiful memories"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-deep-burgundy/60 via-deep-burgundy/40 to-deep-burgundy/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-rose-gold/20 via-transparent to-rose-gold/20" />
      </div>

      {/* Image indicator dots */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? 'bg-cream-white w-6'
                : 'bg-cream-white/50 hover:bg-cream-white/80'
            }`}
          />
        ))}
      </div>

      {/* Sparkle effects */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cream-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        {/* Her name with letter-by-letter animation */}
        <motion.h1
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-cream-white mb-6 cursor-pointer select-none"
          onClick={onNameClick}
          whileHover={{ scale: 1.02 }}
          style={{
            textShadow: '0 4px 30px rgba(0, 0, 0, 0.5), 0 0 60px rgba(183, 110, 121, 0.5)',
          }}
        >
          {displayedLetters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.5,
                ease: 'easeOut',
              }}
              className="inline-block"
              style={{
                textShadow: '0 0 40px rgba(255, 248, 240, 0.8)',
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <AnimatePresence>
          {showSubtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="font-script text-2xl md:text-4xl text-cream-white/90 mb-8"
              style={{
                textShadow: '0 2px 20px rgba(0, 0, 0, 0.5)',
              }}
            >
              The love of my life
            </motion.p>
          )}
        </AnimatePresence>

        {/* Decorative heart */}
        <AnimatePresence>
          {showSubtitle && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex justify-center mb-8"
            >
              <motion.svg
                className="w-16 h-16 text-cream-white heartbeat drop-shadow-lg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </motion.svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll indicator with heartbeat animation */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
            onClick={scrollToNextSection}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center"
            >
              <span className="text-cream-white/80 text-sm font-light mb-2 drop-shadow-md">
                Scroll to explore our love story
              </span>
              <motion.svg
                className="w-8 h-8 text-cream-white heartbeat drop-shadow-lg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </motion.svg>
              <motion.svg
                className="w-6 h-6 text-cream-white/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </motion.svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Heart explosion effect when name is clicked 5 times */}
      <AnimatePresence>
        {showHeartExplosion && (
          <>
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2 pointer-events-none z-30"
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{
                  x: (Math.random() - 0.5) * 800,
                  y: (Math.random() - 0.5) * 800,
                  scale: [0, 1, 0.5],
                  opacity: [1, 1, 0],
                  rotate: Math.random() * 720,
                }}
                transition={{
                  duration: 2,
                  ease: 'easeOut',
                }}
              >
                <svg
                  className="w-8 h-8"
                  fill={`hsl(${340 + Math.random() * 40}, 70%, ${50 + Math.random() * 20}%)`}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
            >
              <div className="bg-cream-white/90 px-8 py-6 rounded-2xl romantic-shadow">
                <p className="font-script text-3xl text-deep-burgundy text-center">
                  You make my heart explode with joy!
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
