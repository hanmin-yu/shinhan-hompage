import { useEffect } from 'react';

export function useRevealOnScroll(routeKey?: string) {
  useEffect(() => {
    const observed = new WeakSet<HTMLElement>();
    let rafId: number | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -10% 0px' },
    );

    const observeRevealTargets = () => {
      const revealTargets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

      revealTargets.forEach((node, index) => {
        if (observed.has(node) || node.classList.contains('is-visible')) return;
        node.style.transitionDelay = `${Math.min(index % 6, 4) * 60}ms`;
        observed.add(node);
        observer.observe(node);
      });
    };

    observeRevealTargets();

    const mutationObserver = new MutationObserver(() => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      rafId = window.requestAnimationFrame(() => {
        observeRevealTargets();
        rafId = null;
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();

      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [routeKey]);
}
