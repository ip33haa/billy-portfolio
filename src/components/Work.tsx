import { useInView } from '../hooks/useInView';
import { motion } from 'framer-motion';
import { SpotlightCard } from './reactbits/SpotlightCard';
import { TiltedCard } from './reactbits/TiltedCard';
import { ShinyText } from './reactbits/ShinyText';
import { SplitText } from './reactbits/SplitText';

interface Project {
  id: string;
  tag: string;
  title: string;
  description: string;
  roles: string[];
  image: string;
}

const projects: Project[] = [
  {
    id: 'proj-1',
    tag: 'Testimonials',
    title: 'Client Testimonials',
    description:
      'Produced and directed testimonial videos showcasing client satisfaction, business impact, and long-term partnerships. Focused on authentic storytelling, structured interviews, and cinematic B-roll integration.',
    roles: ['Direction', 'Camera Operation', 'Interview Structuring', 'Editing', 'Audio Mixing'],
    image: '/testimonial.jpg',
  },
  {
    id: 'proj-2',
    tag: 'Spotlight Series',
    title: 'Employee Spotlight Series',
    description:
      'Created narrative-driven employee features highlighting career growth, leadership development, and company culture within a fast-paced BPO environment.',
    roles: ['Direction', 'Camera Operation', 'Interview Structuring', 'Editing', 'Audio Mixing'],
    image: '/spotlight.jpg',
  },
  {
    id: 'proj-3',
    tag: 'Social Media',
    title: 'Social Media Content & Campaigns',
    description:
      'Produced short-form, platform-optimized video content designed to increase engagement, visibility, and brand presence. Dynamic pacing, motion graphics, and attention-grabbing hooks for digital audiences.',
    roles: ['Content Strategy', 'Vertical Formatting', 'Motion Graphics', 'Editing'],
    image: '/social.jpg',
  },
  {
    id: 'proj-4',
    tag: 'Events',
    title: 'Corporate Event Highlights',
    description:
      'Produced high-energy recap videos capturing engagement, teamwork, and corporate culture through dynamic visuals and fast-paced editing with multi-cam coverage.',
    roles: ['Event Coverage', 'Multi-Cam Operation', 'Editing', 'Motion Graphics', 'Sound Design'],
    image: '/equipment.png',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function Work() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="work" id="work" ref={ref}>
      <div className="section-container">
        <motion.div
          className="work__header"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div className="work__label">Selected Work</div>
          <h2 className="work__heading">
            <SplitText text="Projects that tell stories." duration={0.6} stagger={0.02} />
          </h2>
        </motion.div>

        <motion.div
          className="work__grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={cardVariants}>
              <TiltedCard maxTilt={7} scale={1.015} perspective={1100}>
                <SpotlightCard
                  className="work__card"
                  spotlightColor="rgba(0, 212, 170, 0.24)"
                  radius={320}
                  style={{ height: '100%' }}
                >
                  <div className="work__card-visual">
                    <img
                      className="work__card-image"
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                    />
                    <div className="work__card-gradient" />
                  </div>
                  <div className="work__card-content">
                    <span className="work__card-tag">
                      <ShinyText text={project.tag} speed={3.5} />
                    </span>
                    <h3 className="work__card-title">{project.title}</h3>
                    <p className="work__card-desc">{project.description}</p>
                    <div className="work__card-roles">
                      {project.roles.map((role) => (
                        <span key={role} className="work__card-role">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </TiltedCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
