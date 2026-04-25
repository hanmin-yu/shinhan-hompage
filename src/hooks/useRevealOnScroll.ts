import { useEffect } from 'react';

export function useRevealOnScroll(routeKey?: string) {
  useEffect(() => {
    const observed = new WeakSet<HTMLElement>();
    let rafId: number | null = null;
    let timeoutId1: number | null = null;
    let timeoutId2: number | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const hasPassedViewportTop = entry.boundingClientRect.top < 0;
          if (!entry.isIntersecting && !hasPassedViewportTop) return;
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

    const queueObserve = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      rafId = window.requestAnimationFrame(() => {
        observeRevealTargets();
        rafId = null;
      });
    };

    observeRevealTargets();
    timeoutId1 = window.setTimeout(observeRevealTargets, 120);
    timeoutId2 = window.setTimeout(observeRevealTargets, 360);
    window.addEventListener('scroll', queueObserve, { passive: true });
    window.addEventListener('resize', queueObserve);

    const mutationObserver = new MutationObserver(queueObserve);

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
      window.removeEventListener('scroll', queueObserve);
      window.removeEventListener('resize', queueObserve);

      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      if (timeoutId1 !== null) {
        window.clearTimeout(timeoutId1);
      }

      if (timeoutId2 !== null) {
        window.clearTimeout(timeoutId2);
      }
    };
  }, [routeKey]);
}
