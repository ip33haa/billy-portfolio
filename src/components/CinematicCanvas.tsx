import { useRef, useEffect, useCallback } from 'react';

const CAM_FRAME_COUNT = 240;
const STORY_FRAME_COUNT = 240;

const getCamPath = (index: number) => `/cam/cam00086${400 + index}.webp`;
const getCamFallbackPath = (index: number) => `/cam/cam00086${400 + index}.png`;

const getStoryPath = (index: number) => `/frames/frame_${String(index).padStart(4, '0')}.webp`;
const getStoryFallbackPath = (index: number) => `/frames/frame_${String(index).padStart(4, '0')}.png`;

export function CinematicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const camImagesRef = useRef<(HTMLImageElement | null)[]>(new Array(CAM_FRAME_COUNT).fill(null));
  const storyImagesRef = useRef<(HTMLImageElement | null)[]>(new Array(STORY_FRAME_COUNT).fill(null));

  // Current visual frame tracking for interpolation
  const currentVisualRef = useRef<{ sequence: 'cam' | 'story'; frame: number }>({ sequence: 'cam', frame: 0 });
  const targetVisualRef = useRef<{ sequence: 'cam' | 'story'; frame: number }>({ sequence: 'cam', frame: 0 });
  const rafRef = useRef<number>(0);
  const isRunningRef = useRef(false);

  // Draw image on canvas with cover scaling
  const drawImage = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetWidth = Math.round(window.innerWidth * dpr);
    const targetHeight = Math.round(window.innerHeight * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    const imgRatio = img.width / img.height;
    const canvasRatio = canvas.width / canvas.height;

    let drawWidth: number, drawHeight: number, drawX: number, drawY: number;

    if (canvasRatio > imgRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      drawX = 0;
      drawY = (canvas.height - drawHeight) / 2;
    } else {
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgRatio;
      drawX = (canvas.width - drawWidth) / 2;
      drawY = 0;
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  }, []);

  // Helper to load a single image with webp fallback to png
  const loadImage = useCallback((path: string, fallbackPath: string): Promise<HTMLImageElement | null> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = path;
      img.onload = () => resolve(img);
      img.onerror = () => {
        const fallbackImg = new Image();
        fallbackImg.src = fallbackPath;
        fallbackImg.onload = () => resolve(fallbackImg);
        fallbackImg.onerror = () => resolve(null);
      };
    });
  }, []);

  // Render loop with smooth interpolation
  const renderLoop = useCallback(function loop() {
    const target = targetVisualRef.current;
    const current = currentVisualRef.current;

    // Smooth lerp on frame index
    let frameDiff: number;
    if (current.sequence === target.sequence) {
      frameDiff = target.frame - current.frame;
      if (Math.abs(frameDiff) > 0.05) {
        current.frame += frameDiff * 0.25;
      } else {
        current.frame = target.frame;
      }
    } else {
      // Transitioning across sequences
      current.sequence = target.sequence;
      current.frame = target.frame;
    }

    const frameIndex = Math.round(current.frame);
    let imgToDraw: HTMLImageElement | null = null;

    if (current.sequence === 'cam') {
      imgToDraw = camImagesRef.current[frameIndex];
      // Fallback to nearest loaded cam frame if current not yet ready
      if (!imgToDraw) {
        for (let offset = 1; offset < 20; offset++) {
          if (frameIndex - offset >= 0 && camImagesRef.current[frameIndex - offset]) {
            imgToDraw = camImagesRef.current[frameIndex - offset];
            break;
          }
          if (frameIndex + offset < CAM_FRAME_COUNT && camImagesRef.current[frameIndex + offset]) {
            imgToDraw = camImagesRef.current[frameIndex + offset];
            break;
          }
        }
      }
    } else {
      imgToDraw = storyImagesRef.current[frameIndex];
      // Fallback to nearest loaded story frame
      if (!imgToDraw) {
        for (let offset = 1; offset < 20; offset++) {
          if (frameIndex - offset >= 0 && storyImagesRef.current[frameIndex - offset]) {
            imgToDraw = storyImagesRef.current[frameIndex - offset];
            break;
          }
          if (frameIndex + offset < STORY_FRAME_COUNT && storyImagesRef.current[frameIndex + offset]) {
            imgToDraw = storyImagesRef.current[frameIndex + offset];
            break;
          }
        }
      }
    }

    if (imgToDraw) {
      drawImage(imgToDraw);
    }

    rafRef.current = requestAnimationFrame(loop);
  }, [drawImage]);

  // Asset preloading
  useEffect(() => {
    let isCancelled = false;

    const startLoading = async () => {
      // 1. Immediately load Frame 0 of cam
      const firstCam = await loadImage(getCamPath(0), getCamFallbackPath(0));
      if (isCancelled) return;
      if (firstCam) {
        camImagesRef.current[0] = firstCam;
        drawImage(firstCam);
      }

      // 2. Also load Frame 0 of story immediately for smooth transition readiness
      loadImage(getStoryPath(0), getStoryFallbackPath(0)).then((img) => {
        if (!isCancelled && img) storyImagesRef.current[0] = img;
      });

      // 3. Load cam frames in fast batches
      const camBatchSize = 16;
      for (let i = 1; i < CAM_FRAME_COUNT; i += camBatchSize) {
        if (isCancelled) return;
        const batch = [];
        for (let j = i; j < Math.min(i + camBatchSize, CAM_FRAME_COUNT); j++) {
          batch.push(
            loadImage(getCamPath(j), getCamFallbackPath(j)).then((img) => {
              if (!isCancelled && img) camImagesRef.current[j] = img;
            })
          );
        }
        await Promise.all(batch);
      }

      // 4. Load story frames in batches
      const storyBatchSize = 16;
      for (let i = 1; i < STORY_FRAME_COUNT; i += storyBatchSize) {
        if (isCancelled) return;
        const batch = [];
        for (let j = i; j < Math.min(i + storyBatchSize, STORY_FRAME_COUNT); j++) {
          batch.push(
            loadImage(getStoryPath(j), getStoryFallbackPath(j)).then((img) => {
              if (!isCancelled && img) storyImagesRef.current[j] = img;
            })
          );
        }
        await Promise.all(batch);
      }
    };

    startLoading();

    return () => {
      isCancelled = true;
    };
  }, [loadImage, drawImage]);

  // Start continuous render loop
  useEffect(() => {
    if (!isRunningRef.current) {
      isRunningRef.current = true;
      rafRef.current = requestAnimationFrame(renderLoop);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      isRunningRef.current = false;
    };
  }, [renderLoop]);

  // Scroll listener for calculating frame targets and canvas opacity
  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById('hero');
      const sequenceEl = document.getElementById('scroll-sequence');
      const wrapper = wrapperRef.current;

      const scrollY = window.scrollY;

      if (!heroEl || !sequenceEl) return;

      const heroHeight = heroEl.offsetHeight;
      const heroScrollable = heroHeight - window.innerHeight;

      const sequenceTop = heroHeight;
      const sequenceHeight = sequenceEl.offsetHeight;
      const sequenceScrollable = sequenceHeight - window.innerHeight;

      // Case 1: In Hero Section
      if (scrollY <= heroScrollable) {
        const fraction = Math.max(0, Math.min(1, scrollY / heroScrollable));
        const frame = Math.min(CAM_FRAME_COUNT - 1, Math.floor(fraction * CAM_FRAME_COUNT));
        targetVisualRef.current = { sequence: 'cam', frame };

        if (wrapper) wrapper.style.opacity = '1';
      }
      // Case 2: Boundary between Hero and ScrollSequence (Smooth Handover Zone)
      else if (scrollY > heroScrollable && scrollY < sequenceTop) {
        // As hero container unpins, smoothly bridge to sequence start
        targetVisualRef.current = { sequence: 'cam', frame: CAM_FRAME_COUNT - 1 };
        if (wrapper) wrapper.style.opacity = '1';
      }
      // Case 3: In ScrollSequence Section
      else if (scrollY >= sequenceTop && scrollY <= sequenceTop + sequenceScrollable) {
        const localScroll = scrollY - sequenceTop;
        const fraction = Math.max(0, Math.min(1, localScroll / sequenceScrollable));
        const frame = Math.min(STORY_FRAME_COUNT - 1, Math.floor(fraction * STORY_FRAME_COUNT));
        targetVisualRef.current = { sequence: 'story', frame };

        if (wrapper) wrapper.style.opacity = '1';
      }
      // Case 4: Exiting into About Section
      else {
        targetVisualRef.current = { sequence: 'story', frame: STORY_FRAME_COUNT - 1 };
        const exitScroll = scrollY - (sequenceTop + sequenceScrollable);
        const fadeDistance = window.innerHeight * 0.4;
        const opacity = Math.max(0, 1 - exitScroll / fadeDistance);

        if (wrapper) {
          wrapper.style.opacity = String(opacity);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const handleResize = () => {
      const current = currentVisualRef.current;
      const img = current.sequence === 'cam'
        ? camImagesRef.current[Math.round(current.frame)]
        : storyImagesRef.current[Math.round(current.frame)];
      if (img) drawImage(img);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [drawImage]);

  return (
    <div ref={wrapperRef} className="cinematic-canvas-wrapper" aria-hidden="true">
      <canvas ref={canvasRef} className="cinematic-canvas" />
      <div className="cinematic-canvas-overlay" />
    </div>
  );
}
