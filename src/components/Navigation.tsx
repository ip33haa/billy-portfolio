import { useScrollProgress } from '../hooks/useScrollProgress';
import { Magnet } from './reactbits/Magnet';

export function Navigation() {
  const { isNavScrolled } = useScrollProgress();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`nav ${isNavScrolled ? 'nav--scrolled' : ''}`} id="nav">
      <Magnet magnetStrength={2.5} padding={25}>
        <div
          className="nav__logo"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ cursor: 'pointer' }}
        >
          BILLY JOE
        </div>
      </Magnet>

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
    </nav>
  );
}
