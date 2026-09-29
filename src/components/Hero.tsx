import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { DecryptedText } from './reactbits/DecryptedText';
import { ShinyText } from './reactbits/ShinyText';

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = heroRef.current;
      if (!el) return;

      const scrollY = window.scrollY;
      const scrollableHeight = el.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrollY / (scrollableHeight || 1)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute smooth fade and upward drift as user scrolls
  // Fades out completely by 35% of the hero scroll
  const fadeThreshold = 0.35;
  const contentOpacity = Math.max(0, 1 - scrollProgress / fadeThreshold);
  const contentTranslateY = -scrollProgress * 90;
  const contentBlur = Math.min(12, (1 - contentOpacity) * 10);
  const indicatorOpacity = Math.max(0, 1 - scrollProgress / 0.15);

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero__sticky">
        <div
          className="hero__content"
          style={{
            opacity: contentOpacity,
            transform: `translateY(${contentTranslateY}px)`,
            filter: `blur(${contentBlur}px)`,
            pointerEvents: contentOpacity < 0.1 ? 'none' : 'auto',
            transition: 'opacity 0.1s linear, transform 0.1s linear, filter 0.1s linear',
          }}
        >
          <motion.div
            className="hero__tag"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="hero__tag-dot" />
            <DecryptedText
              text="MULTIMEDIA ARTIST"
              speed={40}
              sequential={true}
              animateOn="view"
            />
          </motion.div>

          <motion.h1
            className="hero__name"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] as const, delay: 0.3 }}
          >
            Billy Joe
            <br />
            Pura
          </motion.h1>

          <motion.p
            className="hero__title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.7 }}
          >
            <ShinyText
              text="Direction · Videography · Visual Storytelling"
              speed={4.5}
            />
          </motion.p>
        </div>

        <div
          className="hero__scroll-wrapper"
          style={{
            opacity: indicatorOpacity,
          }}
          aria-hidden="true"
        >
          <div className="hero__scroll-indicator">
            <span className="hero__scroll-text">Scroll to explore</span>
            <div className="hero__scroll-line" />
          </div>
        </div>
      </div>
    </section>
  );
}
