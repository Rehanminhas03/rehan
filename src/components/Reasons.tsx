'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const reasons = [
  "Your smile lights up my entire world",
  "The way you laugh makes my heart skip a beat",
  "Your kindness to everyone around you",
  "How you make me want to be a better person",
  "Your beautiful eyes that I could get lost in forever",
  "The way you understand me without words",
  "Your strength in facing every challenge",
  "How you remember the little things I say",
  "Your patience with my imperfections",
  "The sound of your voice - my favorite sound",
  "Your dreams and ambitions inspire me",
  "The way you care for your family",
  "Your intelligence and wisdom",
  "How you make ordinary moments extraordinary",
  "Your faith and spirituality",
  "The way you believe in us",
  "Your gentle heart",
  "How you make me feel safe",
  "Your creativity and imagination",
  "The way you dance when you're happy",
  "Your honesty and loyalty",
  "How you never give up on me",
  "Your sense of humor",
  "The way you see beauty in everything",
  "Your compassion for others",
  "How you support my dreams",
  "Your beautiful soul",
  "The way you hold my hand",
  "Your determination",
  "How you make every day worth living",
  "Your grace under pressure",
  "The way you forgive",
  "Your positive energy",
  "How you make me feel loved",
  "Your authentic self",
  "The warmth of your hugs",
  "Your adventurous spirit",
  "How you challenge me to grow",
  "Your nurturing nature",
  "The way you say my name",
  "Your resilience",
  "How you celebrate small victories",
  "Your beautiful heart",
  "The way you see the best in people",
  "Your dedication",
  "How you make me feel understood",
  "Your inner beauty",
  "The way you light up a room",
  "Your genuine nature",
  "How you love unconditionally",
  "Your sweet messages",
  "The way you care for me when I'm sick",
  "Your passion for life",
  "How you make me feel special",
  "Your wisdom beyond your years",
  "The way you express love",
  "Your thoughtfulness",
  "How you remember our special dates",
  "Your peaceful presence",
  "The way you calm my storms",
  "Your beautiful laugh",
  "How you inspire others",
  "Your generous spirit",
  "The way you look at me",
  "Your intelligence",
  "How you make me smile",
  "Your patience",
  "The way you handle difficulties",
  "Your loving nature",
  "How you believe in the good",
  "Your sensitivity",
  "The way you express yourself",
  "Your determination to succeed",
  "How you make me feel at home",
  "Your warmth",
  "The way you care for our relationship",
  "Your beautiful mind",
  "How you make me feel complete",
  "Your empathy",
  "The way you understand my silence",
  "Your lovely personality",
  "How you brighten my darkest days",
  "Your faith in our love",
  "The way you dream big",
  "Your tender heart",
  "How you make everything better",
  "Your dedication to us",
  "The way you show love",
  "Your amazing spirit",
  "How you complete me",
  "Your precious heart",
  "The way you exist",
  "Your unconditional love",
  "How you chose me",
  "Your everything",
  "The way you are mine",
  "Your trust in me",
  "How you hold my heart",
  "Your love that never fades",
  "The way you are simply you",
  "Because you are Aqsa Batool - the love of my life",
];

function ReasonCard({ reason, index, isRevealed, onClick }: {
  reason: string;
  index: number;
  isRevealed: boolean;
  onClick: () => void;
}) {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleClick = () => {
    if (!isRevealed) {
      onClick();
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: (index % 10) * 0.05 }}
      className="relative perspective-1000"
    >
      <motion.div
        className={`relative w-full h-32 cursor-pointer transform-style-preserve-3d transition-transform duration-700 ${
          isRevealed ? 'rotate-y-180' : ''
        }`}
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        style={{
          transformStyle: 'preserve-3d',
          transform: isRevealed ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-rose-gold to-deep-rose flex items-center justify-center romantic-shadow backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="text-center">
            <span className="font-serif text-3xl font-bold text-cream-white">
              #{index + 1}
            </span>
            <motion.svg
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-8 h-8 text-cream-white mx-auto mt-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </motion.svg>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 rounded-xl bg-cream-white p-4 flex items-center justify-center romantic-shadow border border-rose-gold/30"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <p className="text-deep-burgundy text-center font-medium text-sm leading-relaxed">
            {reason}
          </p>
        </div>
      </motion.div>

      {/* Heart confetti */}
      <AnimatePresence>
        {showConfetti && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 pointer-events-none"
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{
                  x: (Math.random() - 0.5) * 150,
                  y: (Math.random() - 0.5) * 150,
                  scale: [0, 1, 0.5],
                  opacity: [1, 1, 0],
                  rotate: Math.random() * 360,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <svg
                  className="w-4 h-4"
                  fill="#c21e56"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Reasons() {
  const [revealedCards, setRevealedCards] = useState<Set<number>>(new Set());
  const [visibleCount, setVisibleCount] = useState(20);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const revealCard = (index: number) => {
    setRevealedCards(prev => new Set([...prev, index]));
  };

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 20, reasons.length));
  };

  const revealAll = () => {
    const allIndices = Array.from({ length: visibleCount }, (_, i) => i);
    setRevealedCards(new Set(allIndices));
  };

  return (
    <section id="reasons" className="py-20 px-4 bg-gradient-to-b from-cream-white to-purple-mist/20">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-deep-burgundy mb-4">
            100 Reasons I Love You
          </h2>
          <p className="font-script text-2xl text-rose-gold mb-4">
            Click each card to reveal a reason
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rose-gold to-transparent mx-auto mt-6" />

          {/* Counter */}
          <motion.div
            className="mt-8 inline-flex items-center gap-4 bg-cream-white px-6 py-3 rounded-full romantic-shadow"
          >
            <span className="text-deep-burgundy font-medium">Revealed:</span>
            <span className="font-serif text-2xl font-bold text-rose-gold">
              {revealedCards.size}
            </span>
            <span className="text-deep-burgundy font-medium">/ 100</span>
            <motion.svg
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="w-6 h-6 text-deep-rose"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </motion.svg>
          </motion.div>

          {/* Reveal all button */}
          <motion.button
            onClick={revealAll}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 ml-4 px-6 py-2 bg-gradient-to-r from-rose-gold to-deep-rose text-cream-white rounded-full font-medium hover:shadow-lg transition-shadow"
          >
            Reveal All
          </motion.button>
        </motion.div>

        {/* Reasons grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {reasons.slice(0, visibleCount).map((reason, index) => (
            <ReasonCard
              key={index}
              reason={reason}
              index={index}
              isRevealed={revealedCards.has(index)}
              onClick={() => revealCard(index)}
            />
          ))}
        </div>

        {/* Load more button */}
        {visibleCount < reasons.length && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <motion.button
              onClick={loadMore}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-rose-gold to-deep-rose text-cream-white rounded-full font-medium romantic-shadow hover:shadow-xl transition-shadow"
            >
              Show More Reasons ({reasons.length - visibleCount} remaining)
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
