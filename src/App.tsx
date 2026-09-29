import { ClickSpark } from './components/reactbits/ClickSpark';
import { Navigation } from './components/Navigation';
import { CinematicCanvas } from './components/CinematicCanvas';
import { Hero } from './components/Hero';
import { ScrollSequence } from './components/ScrollSequence';
import { About } from './components/About';
import { Work } from './components/Work';
import { Tools } from './components/Tools';
import { Contact } from './components/Contact';
import { useScrollProgress } from './hooks/useScrollProgress';

function App() {
  const { scrollProgress } = useScrollProgress();

  return (
    <>
      {/* ClickSpark interaction from React Bits */}
      <ClickSpark sparkColor="#00d4aa" sparkCount={10} sparkRadius={30} duration={400} />

      {/* Film grain overlay */}
      <div className="grain" />

      {/* Scroll progress bar */}
      <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* Persistent Cinematic Canvas (renders public/cam for Hero & transitions into public/frames) */}
      <CinematicCanvas />

      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <Hero />

      {/* Scroll-driven Story Sequence */}
      <ScrollSequence />

      {/* About Section */}
      <About />

      {/* Work / Projects */}
      <Work />

      {/* Tools & Equipment */}
      <Tools />

      {/* Contact & Footer */}
      <Contact />
    </>
  );
}

export default App;
