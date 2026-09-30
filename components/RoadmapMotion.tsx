'use client';

import { useEffect } from 'react';

export default function RoadmapMotion() {
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in-view');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll('.roadmap-chapter').forEach(chapter => observer.observe(chapter));
    return () => observer.disconnect();
  }, []);

  return null;
}
