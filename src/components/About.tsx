import { useInView } from '../hooks/useInView';
import { motion } from 'framer-motion';
import { SpotlightCard } from './reactbits/SpotlightCard';
import { SplitText } from './reactbits/SplitText';
import { ShinyText } from './reactbits/ShinyText';

const skills = [
  {
    icon: '🎬',
    name: 'Video Production',
    desc: 'End-to-end video creation',
    level: 95,
  },
  {
    icon: '📷',
    name: 'Videography',
    desc: 'Camera operation & direction',
    level: 92,
  },
  {
    icon: '✂️',
    name: 'Video Editing',
    desc: 'Adobe Premiere Pro & After Effects',
    level: 90,
  },
  {
    icon: '🎨',
    name: 'Motion Graphics',
    desc: 'Visual effects & animations',
    level: 85,
  },
  {
    icon: '📐',
    name: 'Storyboarding',
    desc: 'Pre-production planning',
    level: 88,
  },
  {
    icon: '🎙️',
    name: 'Sound Design',
    desc: 'Audio mixing & engineering',
    level: 80,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function About() {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.15 });

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="section-container">
        <motion.div
          className="about__grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Left Column — Text */}
          <motion.div variants={itemVariants}>
            <div className="about__label">About Me</div>
            <h2 className="about__heading">
              <SplitText text="Creative & results-driven storyteller." duration={0.6} stagger={0.018} />
            </h2>
            <p className="about__text">
              Creative and detail-oriented Multimedia Artist with experience in video editing,
              videography, and content production within the BPO industry. Skilled in directing
              shoots, creating storyboards, and designing visual assets using Adobe Creative Suite.
            </p>
            <p className="about__text">
              Adept at producing engaging multimedia content for social media, events, and client
              campaigns that enhance brand visibility and audience engagement. I bring a
              results-driven approach to every project, ensuring each piece of content tells a
              compelling story.
            </p>

            <div className="about__stats">
              <motion.div className="about__stat" variants={itemVariants}>
                <div className="about__stat-number">
                  <ShinyText text="50+" speed={3} />
                </div>
                <div className="about__stat-label">Projects</div>
              </motion.div>
              <motion.div className="about__stat" variants={itemVariants}>
                <div className="about__stat-number">
                  <ShinyText text="3+" speed={3} />
                </div>
                <div className="about__stat-label">Years Exp</div>
              </motion.div>
              <motion.div className="about__stat" variants={itemVariants}>
                <div className="about__stat-number">
                  <ShinyText text="∞" speed={3} />
                </div>
                <div className="about__stat-label">Passion</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column — Skills */}
          <motion.div className="about__skills" variants={containerVariants}>
            {skills.map((skill) => (
              <motion.div key={skill.name} variants={itemVariants}>
                <SpotlightCard
                  className="about__skill"
                  spotlightColor="rgba(0, 212, 170, 0.2)"
                  radius={200}
                >
                  <div className="about__skill-icon">{skill.icon}</div>
                  <div className="about__skill-info">
                    <h4>{skill.name}</h4>
                    <p>{skill.desc}</p>
                  </div>
                  <div className="about__skill-bar-track">
                    <div
                      className="about__skill-bar-fill"
                      style={{ width: isInView ? `${skill.level}%` : '0%' }}
                    />
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
