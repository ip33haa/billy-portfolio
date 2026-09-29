import { useInView } from '../hooks/useInView';
import { motion } from 'framer-motion';
import { SpotlightCard } from './reactbits/SpotlightCard';
import { SplitText } from './reactbits/SplitText';

/* =============================================
   ACTUAL SVG LOGOS FOR EACH TOOL
   ============================================= */

const PremiereLogo = () => (
  <svg viewBox="0 0 240 234" width="48" height="48">
    <defs>
      <linearGradient id="pr-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00005b" />
        <stop offset="100%" stopColor="#9999ff" />
      </linearGradient>
    </defs>
    <rect width="240" height="234" rx="42" fill="#00005b" />
    <text x="120" y="155" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="120" fill="#9999ff">Pr</text>
  </svg>
);

const AfterEffectsLogo = () => (
  <svg viewBox="0 0 240 234" width="48" height="48">
    <rect width="240" height="234" rx="42" fill="#00005b" />
    <text x="120" y="155" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="120" fill="#9999ff">Ae</text>
  </svg>
);

const PhotoshopLogo = () => (
  <svg viewBox="0 0 240 234" width="48" height="48">
    <rect width="240" height="234" rx="42" fill="#001e36" />
    <text x="120" y="155" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="120" fill="#31a8ff">Ps</text>
  </svg>
);

const AnimateLogo = () => (
  <svg viewBox="0 0 240 234" width="48" height="48">
    <rect width="240" height="234" rx="42" fill="#1b0030" />
    <text x="120" y="155" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="120" fill="#9a60ff">An</text>
  </svg>
);

const IllustratorLogo = () => (
  <svg viewBox="0 0 240 234" width="48" height="48">
    <rect width="240" height="234" rx="42" fill="#330000" />
    <text x="120" y="155" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="120" fill="#ff9a00">Ai</text>
  </svg>
);

const DaVinciLogo = () => (
  <svg viewBox="0 0 240 234" width="48" height="48">
    <rect width="240" height="234" rx="42" fill="#1a1a2e" />
    <circle cx="120" cy="117" r="70" fill="none" stroke="#e94560" strokeWidth="8" />
    <circle cx="120" cy="117" r="50" fill="none" stroke="#0f3460" strokeWidth="8" />
    <circle cx="120" cy="117" r="30" fill="none" stroke="#16c79a" strokeWidth="8" />
    <circle cx="120" cy="117" r="10" fill="#e94560" />
  </svg>
);

const CanvaLogo = () => (
  <svg viewBox="0 0 240 234" width="48" height="48">
    <rect width="240" height="234" rx="42" fill="#7d2ae8" />
    <circle cx="120" cy="110" r="55" fill="none" stroke="white" strokeWidth="12" />
    <path d="M 140 85 Q 155 110 140 135" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round" />
    <circle cx="105" cy="110" r="8" fill="#00c4cc" />
  </svg>
);

/* =============================================
   TOOL DATA
   ============================================= */
interface Tool {
  name: string;
  desc: string;
  color: string;
  glowColor: string;
  Logo: React.FC;
}

const tools: Tool[] = [
  {
    name: 'Premiere Pro',
    desc: 'Video Editing',
    color: '#9999ff',
    glowColor: 'rgba(153, 153, 255, 0.15)',
    Logo: PremiereLogo,
  },
  {
    name: 'After Effects',
    desc: 'Motion Graphics & VFX',
    color: '#9999ff',
    glowColor: 'rgba(153, 153, 255, 0.15)',
    Logo: AfterEffectsLogo,
  },
  {
    name: 'Photoshop',
    desc: 'Image Editing & Compositing',
    color: '#31a8ff',
    glowColor: 'rgba(49, 168, 255, 0.15)',
    Logo: PhotoshopLogo,
  },
  {
    name: 'Animate CC',
    desc: '2D Animation',
    color: '#9a60ff',
    glowColor: 'rgba(154, 96, 255, 0.15)',
    Logo: AnimateLogo,
  },
  {
    name: 'Illustrator',
    desc: 'Vector Design & Graphics',
    color: '#ff9a00',
    glowColor: 'rgba(255, 154, 0, 0.15)',
    Logo: IllustratorLogo,
  },
  {
    name: 'DaVinci Resolve',
    desc: 'Color Grading & Finishing',
    color: '#e94560',
    glowColor: 'rgba(233, 69, 96, 0.15)',
    Logo: DaVinciLogo,
  },
  {
    name: 'Canva',
    desc: 'Quick Design & Social Assets',
    color: '#7d2ae8',
    glowColor: 'rgba(125, 42, 232, 0.15)',
    Logo: CanvaLogo,
  },
];

/* =============================================
   ANIMATION VARIANTS
   ============================================= */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const floatAnimation = (delay: number) => ({
  y: [0, -6, 0],
  transition: {
    duration: 3,
    ease: 'easeInOut' as const,
    repeat: Infinity,
    delay,
  },
});

/* =============================================
   COMPONENT
   ============================================= */
export function Tools() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="tools" id="tools" ref={ref}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          className="tools__header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div className="tools__label">Tools & Software</div>
          <h2 className="tools__heading">
            <SplitText text="My creative arsenal." duration={0.5} stagger={0.02} />
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            maxWidth: '520px',
            margin: '1rem auto 0',
            lineHeight: 1.7,
          }}>
            Powered by the industry-standard Adobe Creative Suite, DaVinci Resolve, and more.
          </p>
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          className="tools-grid-v2"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              variants={cardVariants}
              whileHover={{
                scale: 1.04,
                y: -6,
                transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <SpotlightCard
                className="tool-card-v2"
                spotlightColor={tool.glowColor}
                radius={240}
                style={{
                  '--tool-color': tool.color,
                  '--tool-glow': tool.glowColor,
                  height: '100%',
                } as React.CSSProperties}
              >
                {/* Glow effect on hover */}
                <div className="tool-card-v2__glow" />

                {/* Logo with floating animation */}
                <motion.div
                  className="tool-card-v2__logo"
                  animate={isInView ? floatAnimation(index * 0.4) : {}}
                >
                  <tool.Logo />
                </motion.div>

                {/* Text */}
                <div className="tool-card-v2__info">
                  <h4 className="tool-card-v2__name">{tool.name}</h4>
                  <p className="tool-card-v2__desc">{tool.desc}</p>
                </div>

                {/* Decorative accent line */}
                <div className="tool-card-v2__accent" />
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Orbiting particles decoration */}
        <motion.div
          className="tools__orbit-decoration"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="orbit-ring orbit-ring--1" />
          <div className="orbit-ring orbit-ring--2" />
          <div className="orbit-ring orbit-ring--3" />
        </motion.div>
      </div>
    </section>
  );
}
