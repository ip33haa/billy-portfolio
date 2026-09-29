import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { Magnet } from './reactbits/Magnet';

export function Navigation() {
  const { isNavScrolled } = useScrollProgress();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const scrollTo = (id: string) => {
    setIsMobileOpen(false);
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav className={`nav ${isNavScrolled || isMobileOpen ? 'nav--scrolled' : ''}`} id="nav">
        <Magnet magnetStrength={2.5} padding={25}>
          <div
            className="nav__logo"
            onClick={() => scrollTo('hero')}
            style={{ cursor: 'pointer' }}
          >
            BILLY JOE
          </div>
        </Magnet>

        {/* Desktop Links */}
        <ul className="nav__links">
          <Magnet magnetStrength={3} padding={20}>
            <li className="nav__link" onClick={() => scrollTo('about')}>
              About
            </li>
          </Magnet>
          <Magnet magnetStrength={3} padding={20}>
            <li className="nav__link" onClick={() => scrollTo('work')}>
              Work
            </li>
          </Magnet>
          <Magnet magnetStrength={3} padding={20}>
            <li className="nav__link" onClick={() => scrollTo('tools')}>
              Tools
            </li>
          </Magnet>
          <Magnet magnetStrength={3} padding={20}>
            <li className="nav__link" onClick={() => scrollTo('contact')}>
              Contact
            </li>
          </Magnet>
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          className={`nav__hamburger ${isMobileOpen ? 'nav__hamburger--open' : ''}`}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? 'Close Menu' : 'Open Menu'}
          aria-expanded={isMobileOpen}
        >
          <span className="nav__hamburger-line" />
          <span className="nav__hamburger-line" />
          <span className="nav__hamburger-line" />
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <div className="mobile-menu__content">
              <ul className="mobile-menu__links">
                {['about', 'work', 'tools', 'contact'].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * (index + 1), duration: 0.3 }}
                    className="mobile-menu__item"
                    onClick={() => scrollTo(item)}
                  >
                    <span className="mobile-menu__num">0{index + 1}</span>
                    <span className="mobile-menu__text">{item}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="mobile-menu__footer">
                <a href="mailto:purabilly@gmail.com" className="mobile-menu__contact-link">
                  purabilly@gmail.com
                </a>
                <a href="tel:09216021090" className="mobile-menu__contact-link">
                  0921 602 1090
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
