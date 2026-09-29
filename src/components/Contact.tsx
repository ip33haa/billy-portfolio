import { useInView } from '../hooks/useInView';
import { motion } from 'framer-motion';
import { SplitText } from './reactbits/SplitText';
import { ShinyText } from './reactbits/ShinyText';
import { Magnet } from './reactbits/Magnet';

export function Contact() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div className="contact__label">Get In Touch</div>
          <h2 className="contact__heading">
            <SplitText text="Let's build something extraordinary together." duration={0.6} stagger={0.015} />
          </h2>
          <p className="contact__text">
            Looking for a multimedia artist who can bring your vision to life? Whether it's a brand
            campaign, corporate event, or a creative passion project — I'm ready to collaborate.
          </p>

          <div className="contact__links">
            <Magnet magnetStrength={3} padding={18}>
              <a href="mailto:purabilly@gmail.com" className="contact__link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                purabilly@gmail.com
              </a>
            </Magnet>
            <Magnet magnetStrength={3} padding={18}>
              <a href="tel:09216021090" className="contact__link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                0921 602 1090
              </a>
            </Magnet>
          </div>

          <Magnet magnetStrength={2.2} padding={25}>
            <a href="mailto:purabilly@gmail.com" className="contact__cta">
              <ShinyText text="Start a project" speed={3.5} style={{ color: '#0a0a0c' }} />
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </Magnet>
        </motion.div>

        <footer className="footer">
          <p className="footer__text">
            © 2026 Billy Joe Pura — All rights reserved
          </p>
        </footer>
      </div>
    </section>
  );
}
