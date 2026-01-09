'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  image?: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    date: "September 22, 2024",
    title: "The Day We Became 'Us'",
    description: "The most beautiful day of my life - when you said yes and our journey of love officially began. I still remember how my heart raced, how the world seemed brighter, and how I knew in that moment that I had found my forever. Thank you for taking a chance on us, on me.",
    image: "/images/gallery/IMG-20250829-WA0017.jpg"
  },
  {
    date: "The Early Days",
    title: "Getting to Know Your Heart",
    description: "Every conversation with you felt like discovering a new treasure. Your thoughts, your dreams, your fears - I wanted to know them all. Those late-night talks where we shared our souls... they made me fall deeper for you each day.",
    image: "/images/gallery/IMG-20250921-WA0025.jpg"
  },
  {
    date: "The Moment I Knew",
    title: "When 'I Like You' Became 'I Love You'",
    description: "There wasn't just one moment - it was a thousand little moments that built up until my heart couldn't contain it anymore. Your laugh, your kindness, the way you care for others... I realized I wasn't just falling - I had already fallen completely in love with you.",
    image: "/images/gallery/IMG-20250921-WA0048.jpg"
  },
  {
    date: "Through the Storms",
    title: "Learning & Growing Together",
    description: "Aqsa, I know I haven't been perfect. There were times I was stubborn, times I didn't listen enough, times I hurt you without meaning to. I'm deeply sorry for every tear, every moment of doubt I may have caused. But even our struggles taught me how much I never want to lose you.",
    image: "/images/gallery/IMG-20251023-WA0027.jpg"
  },
  {
    date: "Today & Forever",
    title: "Choosing You Every Day",
    description: "Every morning I wake up grateful that you're in my life. Every night I thank Allah for blessing me with someone as incredible as you. This isn't just a relationship for me, Aqsa - this is my forever, and I choose you today, tomorrow, and for all the days after.",
    image: "/images/gallery/IMG-20251011-WA0045.jpg"
  },
];

function TimelineCard({ event, index }: { event: TimelineEvent; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`flex items-center w-full ${isEven ? 'justify-start' : 'justify-end'} mb-8 md:mb-16`}
    >
      <motion.div
        initial={{ opacity: 0, x: isEven ? -100 : 100 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -100 : 100 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`w-full md:w-5/12 ${isEven ? 'md:pr-8' : 'md:pl-8'}`}
      >
        <div className="bg-cream-white rounded-2xl p-6 romantic-shadow hover:shadow-2xl transition-shadow duration-300 border border-blush-pink/30">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.3, duration: 0.5, type: 'spring' }}
            className="inline-block px-4 py-1 bg-gradient-to-r from-rose-gold to-deep-rose text-cream-white text-sm font-medium rounded-full mb-4"
          >
            {event.date}
          </motion.div>

          {event.image && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="relative w-full h-48 mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-blush-pink to-purple-mist"
            >
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </motion.div>
          )}

          <h3 className="font-serif text-xl md:text-2xl font-bold text-deep-burgundy mb-3">
            {event.title}
          </h3>

          <p className="text-deep-burgundy/80 leading-relaxed">
            {event.description}
          </p>

          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-4 flex justify-end"
          >
            <svg className="w-6 h-6 text-rose-gold" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Timeline() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="timeline" className="py-20 px-4 bg-gradient-to-b from-cream-white to-soft-pink/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-deep-burgundy mb-4">
            Our Love Story
          </h2>
          <p className="font-script text-2xl text-rose-gold">
            Every moment with you is a treasure
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rose-gold to-transparent mx-auto mt-6" />
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-rose-gold via-deep-rose to-rose-gold rounded-full" />

          {timelineEvents.map((event, index) => (
            <div key={index} className="relative">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-cream-white border-4 border-rose-gold rounded-full z-10"
              >
                <motion.div
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-rose-gold/30 rounded-full"
                />
              </motion.div>

              <TimelineCard event={event} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
