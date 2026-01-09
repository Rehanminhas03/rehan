'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

interface Dream {
  icon: string;
  title: string;
  description: string;
}

const dreams: Dream[] = [
  {
    icon: "🏠",
    title: "Our Dream Home",
    description: "A cozy place we can call our own, filled with love, laughter, and memories we'll create together. Every corner will tell our story.",
  },
  {
    icon: "✈️",
    title: "Travel Adventures",
    description: "Exploring the world hand in hand - from the romantic streets of Paris to the serene beaches of Maldives. Every destination becomes magical with you.",
  },
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Our Beautiful Family",
    description: "Building a loving family together, InshaAllah. Raising children with your kindness and watching them grow with your beautiful smile.",
  },
  {
    icon: "🌟",
    title: "Growing Together",
    description: "Supporting each other's dreams and ambitions. Celebrating every success and holding each other through every challenge.",
  },
  {
    icon: "💑",
    title: "Growing Old Together",
    description: "Still holding hands at 80, still making each other laugh, still falling in love with you every single day.",
  },
  {
    icon: "🤲",
    title: "A Life of Blessings",
    description: "Building a life rooted in faith, gratitude, and love. Making every day a prayer of thankfulness for finding each other.",
  },
];

function DreamCard({ dream, index }: { dream: Dream; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -100 : 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -100 : 100 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`flex ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 mb-12`}
    >
      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-rose-gold to-deep-rose flex items-center justify-center romantic-shadow"
      >
        <span className="text-4xl md:text-5xl">{dream.icon}</span>
      </motion.div>

      {/* Content */}
      <div className={`flex-1 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
        <h3 className="font-serif text-2xl md:text-3xl font-bold text-deep-burgundy mb-3">
          {dream.title}
        </h3>
        <p className="text-deep-burgundy/80 text-lg leading-relaxed">
          {dream.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Dreams() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      id="dreams"
      ref={containerRef}
      className="py-20 px-4 bg-gradient-to-b from-soft-pink/30 to-cream-white relative overflow-hidden"
    >
      {/* Parallax background elements */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blush-pink/30 blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-purple-mist/30 blur-3xl"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-deep-burgundy mb-4">
            Our Future Dreams
          </h2>
          <p className="font-script text-2xl text-rose-gold mb-4">
            The beautiful tomorrow we&apos;ll build together
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rose-gold to-transparent mx-auto mt-6" />
        </motion.div>

        {/* Dreams list */}
        <div className="space-y-8">
          {dreams.map((dream, index) => (
            <DreamCard key={index} dream={dream} index={index} />
          ))}
        </div>

        {/* Closing message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="bg-cream-white rounded-2xl p-8 romantic-shadow border border-rose-gold/20">
            <motion.svg
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 text-rose-gold mx-auto mb-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </motion.svg>
            <p className="font-script text-2xl md:text-3xl text-deep-burgundy mb-4">
              &ldquo;With you, every dream feels within reach&rdquo;
            </p>
            <p className="text-deep-burgundy/80">
              Aqsa, whatever the future holds, I want to face it with you by my side.
              Our dreams are just the beginning of our forever.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
