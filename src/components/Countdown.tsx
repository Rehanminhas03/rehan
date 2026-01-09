'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// SET YOUR SPECIAL DATE HERE - Format: Year, Month (0-11), Day
const SPECIAL_DATE = new Date(2025, 8, 22); // September 22, 2025 - Your 1 Year Anniversary
const DATE_TITLE = "Our 1 Year Anniversary";

function calculateTimeLeft(): TimeLeft {
  const difference = SPECIAL_DATE.getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function TimeUnit({ value, label, delay }: { value: number; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center"
    >
      <motion.div
        key={value}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative"
      >
        <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-deep-rose to-deep-burgundy flex items-center justify-center romantic-shadow">
          <span className="font-serif text-3xl md:text-5xl font-bold text-cream-white">
            {value.toString().padStart(2, '0')}
          </span>
        </div>
        {/* Decorative glow */}
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-2xl bg-rose-gold/30 blur-md -z-10"
        />
      </motion.div>
      <span className="mt-3 text-sm md:text-base font-medium text-deep-burgundy uppercase tracking-wider">
        {label}
      </span>
    </motion.div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isPast = SPECIAL_DATE.getTime() <= new Date().getTime();

  return (
    <section id="countdown" className="py-20 px-4 bg-gradient-to-b from-purple-mist/20 to-soft-pink/30 relative overflow-hidden">
      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            <svg
              className="w-6 h-6 text-rose-gold/20"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-deep-burgundy mb-4">
            Counting Down To
          </h2>
          <p className="font-script text-3xl md:text-4xl text-rose-gold mb-2">
            {DATE_TITLE}
          </p>
          <p className="text-deep-burgundy/70 text-lg">
            {SPECIAL_DATE.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rose-gold to-transparent mx-auto mt-6" />
        </motion.div>

        {mounted && (
          <>
            {isPast ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <svg className="w-24 h-24 mx-auto text-rose-gold mb-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </motion.div>
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-deep-burgundy mb-4">
                  The Day Has Arrived!
                </h3>
                <p className="font-script text-2xl text-rose-gold">
                  Happy {DATE_TITLE}, my love!
                </p>
              </motion.div>
            ) : (
              <div className="flex justify-center items-center gap-4 md:gap-8">
                <TimeUnit value={timeLeft.days} label="Days" delay={0} />
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="font-serif text-4xl text-rose-gold hidden md:block"
                >
                  :
                </motion.span>
                <TimeUnit value={timeLeft.hours} label="Hours" delay={0.1} />
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="font-serif text-4xl text-rose-gold hidden md:block"
                >
                  :
                </motion.span>
                <TimeUnit value={timeLeft.minutes} label="Minutes" delay={0.2} />
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="font-serif text-4xl text-rose-gold hidden md:block"
                >
                  :
                </motion.span>
                <TimeUnit value={timeLeft.seconds} label="Seconds" delay={0.3} />
              </div>
            )}
          </>
        )}

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-deep-burgundy/80 text-lg max-w-2xl mx-auto">
            Every second brings us closer to celebrating another beautiful milestone of our love.
            I can&apos;t wait to hold you and celebrate how far we&apos;ve come, Aqsa.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
