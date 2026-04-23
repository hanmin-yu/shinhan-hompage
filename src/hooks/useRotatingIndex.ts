import { useEffect, useState } from 'react';

export function useRotatingIndex(length: number, delay: number) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (length <= 1) return;

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % length);
    }, delay);

    return () => window.clearInterval(timer);
  }, [delay, length]);

  useEffect(() => {
    if (length === 0) return;
    if (index >= length) {
      setIndex(0);
    }
  }, [index, length]);

  return [index, setIndex] as const;
}

