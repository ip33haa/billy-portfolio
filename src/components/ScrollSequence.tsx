import { useRef, useEffect, useState } from 'react';
import { SpotlightCard } from './reactbits/SpotlightCard';
import { DecryptedText } from './reactbits/DecryptedText';

interface StoryCard {
  id: string;
  label: string;
  heading: string;
  body: string;
  position: 'left' | 'right' | 'center';
  /** At what scroll fraction (0-1) this card should appear */
  showAt: number;
  /** At what scroll fraction this card should disappear */
  hideAt: number;
}

const storyCards: StoryCard[] = [
  {
    id: 'story-1',
    label: 'The Beginning',
    heading: 'Every frame tells a story.',
    body: 'My journey began with a simple fascination — the power of visual storytelling. A camera isn\'t just a tool. It\'s how I translate emotions into images.',
    position: 'left',
    showAt: 0.05,
    hideAt: 0.20,
  },
  {
    id: 'story-2',
    label: 'The Craft',
    heading: 'Precision in every detail.',
    body: 'From selecting the right lens to composing the perfect shot, I obsess over the details that transform good content into unforgettable visual experiences.',
    position: 'right',
    showAt: 0.25,
    hideAt: 0.40,
  },
  {
    id: 'story-3',
    label: 'The Vision',
    heading: 'Gear is an extension of creativity.',
    body: 'My Sony ZV-E10 II paired with Viltrox primes — this kit has been my companion through countless shoots, capturing testimonials, campaigns, and corporate events.',
    position: 'left',
    showAt: 0.45,
    hideAt: 0.60,
  },
  {
    id: 'story-4',
    label: 'The Impact',
    heading: 'Stories that move people.',
    body: 'I believe the best multimedia work doesn\'t just inform — it resonates. Whether it\'s a client testimonial or a social media campaign, every project I touch carries emotional weight.',
    position: 'right',
    showAt: 0.65,
    hideAt: 0.80,
  },
  {
    id: 'story-5',
    label: 'The Future',
    heading: 'Let\'s create something remarkable.',
    body: 'I\'m always looking for the next story to tell, the next visual challenge. If you have a vision, I have the tools and passion to bring it to life.',
    position: 'center',
    showAt: 0.83,
    hideAt: 0.98,
  },
];

export function ScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableHeight = container.offsetHeight - window.innerHeight;
      const containerTop = -rect.top;
      const scrollFraction = Math.max(0, Math.min(1, containerTop / (scrollableHeight || 1)));

      const newVisible = new Set<string>();
      storyCards.forEach((card) => {
        if (scrollFraction >= card.showAt && scrollFraction <= card.hideAt) {
          newVisible.add(card.id);
        }
      });
      setVisibleCards(newVisible);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="scroll-sequence" ref={containerRef} id="scroll-sequence">
      <div className="scroll-sequence__sticky">
        {/* Subtle chapter navigation dots on the right */}
        <div className="scroll-sequence__nav" aria-label="Story Chapters">
          {storyCards.map((card, i) => {
            const isActive = visibleCards.has(card.id);
            return (
              <div
                key={card.id}
                className={`scroll-sequence__nav-dot ${isActive ? 'scroll-sequence__nav-dot--active' : ''}`}
                title={`Chapter ${i + 1}: ${card.label}`}
              >
                <span className="scroll-sequence__nav-label">{card.label}</span>
              </div>
            );
          })}
        </div>

        {/* Story cards overlay */}
        <div className="scroll-sequence__text-overlay">
          {storyCards.map((card) => {
            const isVisible = visibleCards.has(card.id);
            return (
              <div
                key={card.id}
                className={`scroll-sequence__text-card scroll-sequence__text-card--${card.position} ${
                  isVisible ? 'scroll-sequence__text-card--visible' : ''
                }`}
                style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
              >
                <SpotlightCard
                  spotlightColor="rgba(0, 212, 170, 0.22)"
                  radius={280}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    padding: 0,
                  }}
                >
                  <div className="story-label">
                    {isVisible ? (
                      <DecryptedText text={card.label} speed={30} sequential={true} />
                    ) : (
                      card.label
                    )}
                  </div>
                  <h3 className="story-heading">{card.heading}</h3>
                  <p className="story-body">{card.body}</p>
                </SpotlightCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
