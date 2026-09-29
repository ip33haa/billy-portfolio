import { useEffect, useState, useRef, useCallback } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  characters?: string;
  className?: string;
  encryptedClassName?: string;
  animateOn?: 'view' | 'hover';
}

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

export function DecryptedText({
  text,
  speed = 45,
  maxIterations = 10,
  sequential = true,
  characters = DEFAULT_CHARS,
  className = '',
  encryptedClassName = 'decrypted-text__scrambled',
  animateOn = 'view',
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isDecrypted, setIsDecrypted] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<number | null>(null);

  const startAnimation = useCallback(() => {
    let iteration = 0;
    const originalText = text;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setDisplayText(() => {
        return originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (sequential) {
              if (index < iteration) {
                return originalText[index];
              }
            } else {
              if (iteration >= maxIterations) {
                return originalText[index];
              }
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('');
      });

      iteration += 1;

      if (iteration > originalText.length + (sequential ? 0 : maxIterations)) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(originalText);
        setIsDecrypted(true);
      }
    }, speed);
  }, [text, speed, maxIterations, sequential, characters]);

  useEffect(() => {
    if (animateOn === 'view') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isDecrypted) {
              startAnimation();
            }
          });
        },
        { threshold: 0.2 }
      );

      if (containerRef.current) observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [animateOn, isDecrypted, startAnimation]);

  const handleMouseEnter = () => {
    if (animateOn === 'hover') {
      startAnimation();
    }
  };

  const handleMouseLeave = () => {};

  return (
    <span
      ref={containerRef}
      className={`decrypted-text ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline-block', lineHeight: 'inherit', verticalAlign: 'baseline' }}
    >
      {displayText.split('').map((char, i) => {
        const isOriginal = char === text[i];
        return (
          <span
            key={i}
            className={isOriginal ? 'decrypted-text__resolved' : encryptedClassName}
            style={!isOriginal ? { opacity: 0.7, color: 'var(--accent-primary)' } : undefined}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}
