import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { motion } from 'framer-motion';
import { SpotlightCard } from './reactbits/SpotlightCard';
import { TiltedCard } from './reactbits/TiltedCard';
import { ShinyText } from './reactbits/ShinyText';
import { SplitText } from './reactbits/SplitText';
import { ProjectDetailsModal, type Project } from './ProjectDetailsModal';

const projects: Project[] = [
  {
    id: 'proj-1',
    tag: 'Testimonials',
    title: 'Client Testimonials',
    overview:
      'Produced and directed testimonial videos that showcase client satisfaction, business impact, and long-term partnerships. Focused on authentic storytelling, structured interviews, and cinematic B-roll integration.',
    description:
      'Produced and directed testimonial videos that showcase client satisfaction, business impact, and long-term partnerships. Focused on authentic storytelling, structured interviews, and cinematic B-roll integration.',
    roles: ['Direction', 'Camera Operation', 'Interview Structuring', 'Editing', 'Audio Mixing'],
    image: '/testimonial.jpg',
    videos: [
      {
        title: 'Client Testimonial - Excel Logistics',
        youtubeId: 'qokzk76SiAQ',
        url: 'https://www.youtube.com/watch?v=qokzk76SiAQ',
      },
      {
        title: 'Client Testimonial: Seabridge Global Logistics',
        youtubeId: '4bHFBEO9FJw',
        url: 'https://www.youtube.com/watch?v=4bHFBEO9FJw?rel=0',
      },
    ],
  },
  {
    id: 'proj-2',
    tag: 'Spotlight Series',
    title: 'Employee Spotlight Series',
    overview:
      'Created narrative-driven employee features highlighting career growth, leadership development, and company culture within a fast-paced BPO environment.',
    description:
      'Created narrative-driven employee features highlighting career growth, leadership development, and company culture within a fast-paced BPO environment.',
    roles: ['Direction', 'Camera Operation', 'Interview Structuring', 'Editing', 'Audio Mixing'],
    image: '/spotlight.jpg',
    videos: [
      {
        title: 'Employee Spotlight - Trainer Madi',
        youtubeId: 'ZiThX_3j2Vs',
        url: 'https://www.youtube.com/watch?v=ZiThX_3j2Vs?rel=0',
      },
      {
        title: 'Employee Spotlight: TL Myra',
        youtubeId: '7l0Jos-gPl0',
        url: 'https://www.youtube.com/watch?v=7l0Jos-gPl0?rel=0',
      },
      {
        title: 'Employee Spotlight: Employee Engagement Specialist',
        youtubeId: 'kHciEC-4djY',
        url: 'https://www.youtube.com/watch?v=kHciEC-4djY?rel=0',
      },
    ],
  },
  {
    id: 'proj-3',
    tag: 'Seasonal Campaigns',
    title: 'Seasonal Campaigns & Station ID',
    overview:
      'Directed and executed seasonal branding content aligned with company identity. Managed casting, shot composition, and visual storytelling to deliver emotionally engaging campaign visuals.',
    description:
      'Directed and executed seasonal branding content aligned with company identity. Managed casting, shot composition, and visual storytelling to deliver emotionally engaging campaign visuals.',
    roles: [
      'Creative Direction',
      'Casting',
      'Storyboard Creation',
      'Camera Supervision',
      'Final Edit',
    ],
    image: '/social.jpg',
    layout: 'split',
    theme: 'dark',
    videos: [
      {
        title: 'Pasko Ang Pinakamagandang Kwento (Christmas is the Best Story Ever Told) - OBP Cover',
        youtubeId: 'l3MIdyBWqmg',
        url: 'https://www.youtube.com/watch?v=l3MIdyBWqmg?rel=0',
      },
      {
        title: "Andito Tayo Para Sa Isa't Isa (We Are Here For Each Other) OBP Cover",
        youtubeId: 'sFOX5YtSWgI',
        url: 'https://www.youtube.com/watch?v=sFOX5YtSWgI?rel=0',
      },
    ],
  },
  {
    id: 'proj-4',
    tag: 'Events',
    title: 'Corporate Event Highlights',
    overview:
      'Produced high-energy recap videos capturing engagement, teamwork, and corporate culture through dynamic visuals and fast-paced editing with multi-cam coverage.',
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
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
              <motion.div
                key={project.id}
                variants={cardVariants}
                onClick={() => setSelectedProject(project)}
                className="work__card-wrapper"
              >
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
                      {project.videos && project.videos.length > 0 && (
                        <div className="work__card-video-pill">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                          <span>{project.videos.length} Videos</span>
                        </div>
                      )}
                    </div>
                    <div className="work__card-content">
                      <div className="work__card-topline">
                        <span className="work__card-tag">
                          <ShinyText text={project.tag} speed={3.5} />
                        </span>
                        <span className="work__card-expand-hint">
                          View Details ↗
                        </span>
                      </div>
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

      {/* Interactive Project Details Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
