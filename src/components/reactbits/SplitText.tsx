import { motion } from 'framer-motion';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
}

export function SplitText({
  text,
  className = '',
  delay = 0,
  duration = 0.5,
  stagger = 0.03,
}: SplitTextProps) {
  const words = text.split(' ');

  return (
    <span className={`split-text ${className}`} style={{ display: 'inline-block' }}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.25em' }}>
          {word.split('').map((char, charIndex) => {
            const index = wordIndex * 6 + charIndex;
            return (
              <motion.span
                key={charIndex}
                initial={{ opacity: 0, y: 30, rotateX: -60 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration,
                  delay: delay + index * stagger,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
                style={{ display: 'inline-block', transformOrigin: 'bottom' }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
