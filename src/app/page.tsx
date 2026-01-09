'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamic imports for better performance
const LoadingScreen = dynamic(() => import('@/components/LoadingScreen'), { ssr: false });
const FloatingHearts = dynamic(() => import('@/components/FloatingHearts'), { ssr: false });
const MusicPlayer = dynamic(() => import('@/components/MusicPlayer'), { ssr: false });
const Hero = dynamic(() => import('@/components/Hero'), { ssr: false });
const Timeline = dynamic(() => import('@/components/Timeline'), { ssr: false });
const Gallery = dynamic(() => import('@/components/Gallery'), { ssr: false });
const LoveLetters = dynamic(() => import('@/components/LoveLetters'), { ssr: false });
const Reasons = dynamic(() => import('@/components/Reasons'), { ssr: false });
const Countdown = dynamic(() => import('@/components/Countdown'), { ssr: false });
const Dreams = dynamic(() => import('@/components/Dreams'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const KonamiCode = dynamic(() => import('@/components/KonamiCode'), { ssr: false });
const CursorHearts = dynamic(() => import('@/components/CursorHearts'), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [nameClickCount, setNameClickCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleNameClick = () => {
    setNameClickCount((prev) => prev + 1);
  };

  const opacityClass = isLoading ? 'opacity-0' : 'opacity-100';

  return (
    <main className="relative min-h-screen bg-cream-white overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen isLoading={isLoading} />}
      </AnimatePresence>

      <KonamiCode />
      <FloatingHearts />
      <MusicPlayer />
      <CursorHearts />

      <div className={`transition-opacity duration-1000 ${opacityClass}`}>
        <Hero onNameClick={handleNameClick} clickCount={nameClickCount} />
        <div className="section-divider" />
        <Timeline />
        <div className="section-divider" />
        <Gallery />
        <div className="section-divider" />
        <LoveLetters />
        <div className="section-divider" />
        <Reasons />
        <div className="section-divider" />
        <Countdown />
        <div className="section-divider" />
        <Dreams />
        <Footer />
      </div>
    </main>
  );
}
