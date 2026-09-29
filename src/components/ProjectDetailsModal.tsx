import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ProjectVideo {
  title: string;
  youtubeId: string;
  url: string;
}

export interface Project {
  id: string;
  tag: string;
  title: string;
  overview?: string;
  description: string;
  roles: string[];
  image: string;
  videos?: ProjectVideo[];
  layout?: 'stacked' | 'split';
  theme?: 'light' | 'dark';
}

interface ProjectDetailsModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [project, onClose]);

  const isSplit = project?.layout === 'split';

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="project-modal__overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className={`project-modal__card ${isSplit ? 'project-modal__card--dark project-modal__card--split' : ''}`}
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              className={`project-modal__close ${isSplit ? 'project-modal__close--dark' : ''}`}
              onClick={onClose}
              aria-label="Close project details"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {isSplit ? (
              /* Split Layout for Seasonal Campaigns & Station ID */
              <div className="project-modal__split-layout">
                {/* Left Information Column */}
                <div className="project-modal__split-info">
                  <div className="project-modal__split-header">
                    <h2 className="project-modal__split-title">Project Details</h2>
                    <div className="project-modal__title-pill project-modal__title-pill--dark">
                      <span className="project-modal__title-pill-label">Title</span>
                      <span className="project-modal__title-pill-value">{project.title}</span>
                    </div>
                  </div>

                  <div className="project-modal__split-overview-label">Overview</div>
                  <p className="project-modal__split-overview-text">
                    {project.overview || project.description}
                  </p>

                  <div className="project-modal__split-role-section">
                    <h4 className="project-modal__split-role-title">My Role:</h4>
                    <p className="project-modal__split-role-text">
                      {project.roles.join(' | ')}
                    </p>
                  </div>
                </div>

                {/* Right Stacked Videos Column */}
                <div className="project-modal__split-videos">
                  {project.videos && project.videos.length > 0 ? (
                    project.videos.map((video) => (
                      <div key={video.youtubeId} className="project-modal__split-video-item">
                        <iframe
                          src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="project-modal__iframe"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="project-modal__fallback-wrapper">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="project-modal__fallback-image"
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Classic / Top-Light + Bottom-Terracotta layout */
              <>
                <div className="project-modal__body-top">
                  <div className="project-modal__header-row">
                    <div className="project-modal__accent-box" />
                    <div className="project-modal__header-divider" />
                    <h2 className="project-modal__main-title">Project Details</h2>
                    <div className="project-modal__title-pill">
                      <span className="project-modal__title-pill-label">Title</span>
                      <span className="project-modal__title-pill-value">{project.title}</span>
                    </div>
                  </div>

                  <div className="project-modal__overview-badge">Overview</div>
                  <p className="project-modal__overview-text">
                    {project.overview || project.description}
                  </p>
                </div>

                <div className="project-modal__media-container">
                  {project.videos && project.videos.length > 0 ? (
                    <div className={`project-modal__video-grid ${project.videos.length === 3 ? 'project-modal__video-grid--3' : ''}`}>
                      {project.videos.map((video) => (
                        <div key={video.youtubeId} className="project-modal__video-item">
                          <iframe
                            src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0`}
                            title={video.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="project-modal__iframe"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="project-modal__fallback-wrapper">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="project-modal__fallback-image"
                      />
                    </div>
                  )}

                  <div className="project-modal__roles-bar">
                    <span>My Role: {project.roles.join(' | ')}</span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
