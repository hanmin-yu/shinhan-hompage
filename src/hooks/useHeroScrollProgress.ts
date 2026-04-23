import { useEffect, useState, type RefObject } from 'react';

export function useHeroScrollProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const frame = ref.current;
      if (!frame) return;

      const rect = frame.getBoundingClientRect();
      const denominator = Math.max(1, window.innerHeight + rect.height);
      const nextProgress = (window.innerHeight - rect.top) / denominator;
      setProgress(Math.min(1, Math.max(0, nextProgress)));
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [ref]);

  return progress;
}

