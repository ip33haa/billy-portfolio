import { useEffect, useRef, useState, useCallback } from 'react';

const TOTAL_FRAMES = 240;
const FRAME_PATH = (index: number) => `/frames/frame_${String(index).padStart(4, '0')}.png`;

export function useFrameSequence(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  scrollContainerRef: React.RefObject<HTMLDivElement | null>
) {
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  // Preload all images
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const preloadImage = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = FRAME_PATH(index);
        img.onload = () => {
          images[index] = img;
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
          if (loadedCount === TOTAL_FRAMES) {
            imagesRef.current = images;
            setIsLoading(false);
          }
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
          resolve();
        };
      });
    };

    // Load in batches for better performance
    const loadBatch = async (startIndex: number, batchSize: number) => {
      const promises: Promise<void>[] = [];
      for (let i = startIndex; i < Math.min(startIndex + batchSize, TOTAL_FRAMES); i++) {
        promises.push(preloadImage(i));
      }
      await Promise.all(promises);
    };

    const loadAllFrames = async () => {
      // Load first frame immediately for initial display
      await preloadImage(0);
      // Draw first frame right away
      drawFrame(0);

      // Then load remaining in batches
      const batchSize = 10;
      for (let i = 1; i < TOTAL_FRAMES; i += batchSize) {
        await loadBatch(i, batchSize);
      }
    };

    const drawFrame = (frameIndex: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      const img = images[frameIndex] || imagesRef.current[frameIndex];

      if (!canvas || !ctx || !img) return;

      // Set canvas size to match viewport
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Draw image covering the canvas (object-fit: cover equivalent)
      const imgRatio = img.width / img.height;
      const canvasRatio = canvas.width / canvas.height;

      let drawWidth, drawHeight, drawX, drawY;

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

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    };

    loadAllFrames();

    // Handle window resize
    const handleResize = () => {
      if (imagesRef.current[currentFrameRef.current]) {
        drawFrame(currentFrameRef.current);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasRef]);

  // Scroll handler
  const updateFrame = useCallback(() => {
    const container = scrollContainerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!container || !canvas || !ctx) return;

    const rect = container.getBoundingClientRect();
    const containerTop = -rect.top;
    const scrollableHeight = container.offsetHeight - window.innerHeight;
    const scrollFraction = Math.max(0, Math.min(1, containerTop / scrollableHeight));
    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.floor(scrollFraction * TOTAL_FRAMES)
    );

    if (frameIndex !== currentFrameRef.current && imagesRef.current[frameIndex]) {
      currentFrameRef.current = frameIndex;
      const img = imagesRef.current[frameIndex];

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const imgRatio = img.width / img.height;
      const canvasRatio = canvas.width / canvas.height;

      let drawWidth, drawHeight, drawX, drawY;

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

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    }

    return { scrollFraction, frameIndex };
  }, [canvasRef, scrollContainerRef]);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        updateFrame();
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateFrame]);

  return { isLoading, loadProgress, currentFrame: currentFrameRef, updateFrame };
}
