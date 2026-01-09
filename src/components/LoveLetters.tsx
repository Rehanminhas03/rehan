'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

interface Letter {
  id: number;
  title: string;
  content: string;
  signature?: string;
}

const letters: Letter[] = [
  {
    id: 1,
    title: "To My Beautiful Aqsa",
    content: `My dearest Aqsa,

From the moment you came into my life, everything changed. Colors became brighter, music sounded sweeter, and my heart found a rhythm it never knew before - the rhythm of loving you.

You are the first thought when I wake and the last prayer before I sleep. Your smile is my sunshine, your laugh is my favorite melody, and your love is the greatest gift I have ever received.

Thank you for being you - imperfectly perfect in every way.`,
    signature: "Forever yours"
  },
  {
    id: 2,
    title: "An Apology From My Heart",
    content: `My darling,

I know I'm not perfect. There have been moments when I was too stubborn, times when my words came out wrong, and days when I didn't give you the patience and understanding you deserved.

For every tear I may have caused, for every moment of hurt - I am deeply, truly sorry. You deserve someone who listens with their whole heart, and I promise to try harder every single day.

Please know that even in my flaws, my love for you has never wavered. You are worth fighting for, worth changing for, worth becoming better for.`,
    signature: "With all my regret and love"
  },
  {
    id: 3,
    title: "What I See In You",
    content: `My Aqsa,

When I look at you, I see strength disguised as softness. I see a heart so pure it amazes me every day. I see intelligence, grace, and a beauty that goes far deeper than what the eyes can see.

You are the kind of person who makes others feel important. You are kind when the world isn't watching. You are brave even when you feel afraid. You are everything I never knew I needed.

In you, I found not just a partner, but my best friend, my confidante, and my home.`,
    signature: "Admiringly yours"
  },
  {
    id: 4,
    title: "My Promise To You",
    content: `Dearest Aqsa,

I promise to love you on the good days and the hard days. I promise to choose you, even when choosing is difficult. I promise to grow alongside you, not apart from you.

I promise to be your shelter in storms and your biggest cheerleader in sunshine. I promise to respect your dreams and support your journey. I promise to make you laugh, to hold your hand, and to never stop trying to be the man you deserve.

These are not just words - they are the commitments I make with my whole heart.`,
    signature: "Your devoted one"
  },
  {
    id: 5,
    title: "Our Future Together",
    content: `My love,

When I think about the future, I only see us - walking through life hand in hand, building dreams together, facing whatever comes our way as a team.

I dream of mornings with you, of building a home filled with laughter and love, of growing old together and still finding new reasons to fall in love with you every day.

You are my today and my every tomorrow. With you, I'm not afraid of what's ahead - because I know we'll face it together.

InshaAllah, the best is yet to come.`,
    signature: "Until forever ends"
  },
];

function Envelope({ letter, index }: { letter: Letter; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
    >
      {/* Envelope */}
      <motion.div
        className={`relative cursor-pointer transition-transform duration-500 ${isOpen ? 'scale-105' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: isOpen ? 1.05 : 1.02 }}
      >
        {/* Envelope body */}
        <div className="relative bg-gradient-to-br from-cream-white to-blush-pink rounded-xl p-6 romantic-shadow border border-rose-gold/30">
          {/* Wax seal */}
          <motion.div
            animate={isOpen ? { scale: 0, rotate: 180 } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-deep-rose to-deep-burgundy flex items-center justify-center romantic-shadow">
              <svg className="w-6 h-6 text-cream-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
          </motion.div>

          {/* Envelope flap */}
          <motion.div
            animate={isOpen ? { rotateX: 180, y: -10 } : { rotateX: 0, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
            className="absolute -top-8 left-0 right-0 h-16 bg-gradient-to-b from-rose-gold to-blush-pink rounded-t-xl"
          >
            <div
              className="absolute inset-0"
              style={{
                clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
              }}
            />
          </motion.div>

          {/* Envelope content preview */}
          <div className="pt-6">
            <h3 className="font-serif text-xl text-deep-burgundy font-bold mb-2 text-center">
              {letter.title}
            </h3>
            {!isOpen && (
              <p className="text-deep-burgundy/60 text-center text-sm">
                Click to open...
              </p>
            )}
          </div>
        </div>

        {/* Letter content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-4 bg-cream-white rounded-xl p-6 romantic-shadow border border-rose-gold/20"
            >
              {/* Paper texture effect */}
              <div className="relative">
                {/* Lines like notebook paper */}
                <div className="absolute inset-0 opacity-10">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="border-b border-deep-burgundy" style={{ height: '2rem' }} />
                  ))}
                </div>

                {/* Letter content */}
                <div className="relative z-10 handwriting text-deep-burgundy whitespace-pre-line">
                  {letter.content}
                </div>

                {/* Signature */}
                {letter.signature && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 text-right"
                  >
                    <p className="font-script text-2xl text-rose-gold italic">
                      {letter.signature}
                    </p>
                    <p className="font-script text-xl text-deep-burgundy mt-2">
                      ~ Your Love
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Decorative corner */}
              <div className="absolute bottom-2 right-2">
                <svg className="w-8 h-8 text-rose-gold/30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function LoveLetters() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="letters" className="py-20 px-4 bg-gradient-to-b from-soft-pink/30 to-cream-white">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-deep-burgundy mb-4">
            Love Letters
          </h2>
          <p className="font-script text-2xl text-rose-gold">
            Words from my heart to yours
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rose-gold to-transparent mx-auto mt-6" />
        </motion.div>

        {/* Letters grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {letters.map((letter, index) => (
            <Envelope key={letter.id} letter={letter} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
