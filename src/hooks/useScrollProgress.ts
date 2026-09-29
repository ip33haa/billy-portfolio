import { useEffect, useState, useCallback, useRef } from 'react';

interface ScrollState {
  scrollY: number;
  scrollProgress: number;
  isNavScrolled: boolean;
  direction: 'up' | 'down' | null;
}

export function useScrollProgress(): ScrollState {
  const [state, setState] = useState<ScrollState>({
    scrollY: 0,
    scrollProgress: 0,
    isNavScrolled: false,
    direction: null,
  });

  const prevScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;
    const direction = scrollY > prevScrollY.current ? 'down' : scrollY < prevScrollY.current ? 'up' : null;

    prevScrollY.current = scrollY;

    setState({
      scrollY,
      scrollProgress,
      isNavScrolled: scrollY > 80,
      direction,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return state;
}
