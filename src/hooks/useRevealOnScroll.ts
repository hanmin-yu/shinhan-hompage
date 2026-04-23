import { useEffect } from 'react';

export function useRevealOnScroll() {
  useEffect(() => {
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!revealTargets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    );

    revealTargets.forEach((node, index) => {
      node.style.transitionDelay = `${Math.min(index % 6, 4) * 60}ms`;
      observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);
}

