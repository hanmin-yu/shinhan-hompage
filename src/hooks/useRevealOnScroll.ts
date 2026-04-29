import { useEffect } from 'react';

export function useRevealOnScroll(routeKey?: string) {
  useEffect(() => {
    const observed = new WeakSet<HTMLElement>();
    let rafId: number | null = null;
    let scrollRafId: number | null = null;
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

    const updateScrollDynamics = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      const viewportProgress = Math.min(Math.max(window.scrollY / Math.max(window.innerHeight, 1), 0), 1);

      document.documentElement.style.setProperty('--scroll-y', `${window.scrollY.toFixed(2)}px`);
      document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(4));
      document.documentElement.style.setProperty('--viewport-progress', viewportProgress.toFixed(4));
      scrollRafId = null;
    };

    const queueScrollDynamics = () => {
      if (scrollRafId !== null) return;
      scrollRafId = window.requestAnimationFrame(updateScrollDynamics);
    };

    observeRevealTargets();
    updateScrollDynamics();
    timeoutId1 = window.setTimeout(observeRevealTargets, 120);
    timeoutId2 = window.setTimeout(observeRevealTargets, 360);
    window.addEventListener('scroll', queueObserve, { passive: true });
    window.addEventListener('scroll', queueScrollDynamics, { passive: true });
    window.addEventListener('resize', queueObserve);
    window.addEventListener('resize', queueScrollDynamics);

    const mutationObserver = new MutationObserver(queueObserve);

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
      window.removeEventListener('scroll', queueObserve);
      window.removeEventListener('scroll', queueScrollDynamics);
      window.removeEventListener('resize', queueObserve);
      window.removeEventListener('resize', queueScrollDynamics);

      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      if (scrollRafId !== null) {
        cancelAnimationFrame(scrollRafId);
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
