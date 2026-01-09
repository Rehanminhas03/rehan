'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';

interface Photo {
  id: number;
  src: string;
  alt: string;
  span?: string;
}

const photos: Photo[] = [
  { id: 1, src: "/images/gallery/IMG-20251023-WA0041.jpg", alt: "Our beautiful moment", span: "md:col-span-2 md:row-span-2" },
  { id: 2, src: "/images/gallery/IMG-20250824-WA0050.jpg", alt: "Together forever" },
  { id: 3, src: "/images/gallery/IMG-20251023-WA0027.jpg", alt: "Your beautiful smile" },
  { id: 4, src: "/images/gallery/IMG-20250921-WA0025.jpg", alt: "Pure happiness" },
  { id: 5, src: "/images/gallery/IMG-20250921-WA0031.jpg", alt: "My favorite person", span: "md:col-span-2" },
  { id: 6, src: "/images/gallery/IMG-20250921-WA0048.jpg", alt: "Love in the air" },
  { id: 7, src: "/images/gallery/IMG-20250921-WA0065.jpg", alt: "Precious memories" },
  { id: 8, src: "/images/gallery/IMG-20251023-WA0032.jpg", alt: "My everything", span: "md:row-span-2" },
  { id: 9, src: "/images/gallery/IMG-20251023-WA0056.jpg", alt: "Our journey" },
  { id: 10, src: "/images/gallery/IMG-20251010-WA0053.jpg", alt: "Forever grateful" },
  { id: 11, src: "/images/gallery/IMG-20251011-WA0045.jpg", alt: "My heart", span: "md:col-span-2" },
  { id: 12, src: "/images/gallery/IMG-20250705-WA0005.jpg", alt: "Beautiful you" },
  { id: 13, src: "/images/gallery/IMG-20250829-WA0017.jpg", alt: "Our love story" },
  { id: 14, src: "/images/gallery/IMG-20250906-WA0026.jpg", alt: "Always and forever" },
  { id: 15, src: "/images/gallery/IMG-20250921-WA0087.jpg", alt: "Sweet moments" },
  { id: 16, src: "/images/gallery/IMG-20250921-WA0092.jpg", alt: "My sunshine" },
  { id: 17, src: "/images/gallery/IMG-20250921-WA0094.jpg", alt: "Perfect together" },
  { id: 18, src: "/images/gallery/IMG-20250921-WA0096.jpg", alt: "My treasure" },
  { id: 19, src: "/images/gallery/IMG-20250921-WA0098.jpg", alt: "Forever yours" },
  { id: 20, src: "/images/gallery/IMG-20250921-WA0099.jpg", alt: "My world" },
];

function PhotoCard({ photo, index, onClick }: { photo: Photo; index: number; onClick: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const spanClass = photo.span || '';

  // Different rotation directions for variety
  const rotateDirection = index % 2 === 0 ? 15 : -15;
  const floatOffset = (index % 3) * 5;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, rotateY: rotateDirection, y: 50 }}
      animate={isInView ? {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        y: 0
      } : {
        opacity: 0,
        scale: 0.8,
        rotateY: rotateDirection,
        y: 50
      }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{
        scale: 1.05,
        y: -10,
        rotateX: 5,
        rotateY: index % 2 === 0 ? 5 : -5,
        transition: { duration: 0.3 }
      }}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      className={`relative group cursor-pointer overflow-hidden rounded-2xl ${spanClass}`}
      onClick={onClick}
    >
      {/* Shimmer loading effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blush-pink via-cream-white to-blush-pink animate-shimmer bg-[length:200%_100%] rounded-2xl" />

      {/* Glow effect on hover */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-rose-gold via-deep-rose to-rose-gold rounded-2xl opacity-0 group-hover:opacity-70 blur-md transition-opacity duration-500 -z-10"
      />

      <div className="relative w-full h-48 md:h-64 bg-gradient-to-br from-blush-pink to-purple-mist overflow-hidden rounded-2xl">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
          sizes="(max-width: 768px) 50vw, 25vw"
        />

        {/* Sparkle overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ backgroundSize: "200% 200%" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-t from-deep-burgundy/90 via-deep-burgundy/40 to-transparent flex items-end justify-center p-4"
      >
        <div className="text-center">
          <motion.svg
            initial={{ scale: 0, rotate: -180 }}
            whileHover={{ scale: 1, rotate: 0 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              scale: { duration: 1, repeat: Infinity, repeatType: "reverse" },
              rotate: { type: 'spring', stiffness: 300 }
            }}
            className="w-10 h-10 text-cream-white mx-auto mb-2 drop-shadow-lg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </motion.svg>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-cream-white font-light text-sm drop-shadow-md"
          >
            {photo.alt}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="gallery" className="py-20 px-4 bg-cream-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-deep-burgundy mb-4">
            Our Memories
          </h2>
          <p className="font-script text-2xl text-rose-gold">
            Every picture tells our story
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-rose-gold to-transparent mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-min">
          {photos.map((photo, index) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              index={index}
              onClick={() => setSelectedPhoto(photo)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-deep-burgundy/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative max-w-4xl w-full max-h-[80vh] bg-cream-white rounded-2xl overflow-hidden romantic-shadow"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-96 md:h-[60vh]">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
              </div>
              <div className="p-6 text-center bg-cream-white">
                <p className="font-script text-2xl text-deep-burgundy">{selectedPhoto.alt}</p>
              </div>

              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-cream-white/80 flex items-center justify-center text-deep-burgundy hover:bg-cream-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
