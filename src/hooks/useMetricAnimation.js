// NFR-17: Metric animation hook — animates from old value to new value

import { useState, useEffect, useRef } from 'react';

/**
 * Animates a numeric value from `from` to `to` over `duration` ms.
 * Returns the current animated value.
 */
export function useCountAnimation(to, duration = 600) {
  const [value, setValue] = useState(to);
  const fromRef = useRef(to);
  const rafRef = useRef(null);

  useEffect(() => {
    const from = fromRef.current;
    if (from === to) return;

    const startTime = performance.now();
    const delta = to - from;

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(from + delta * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [to, duration]);

  return value;
}

/**
 * Animate all metrics simultaneously.
 * Returns an object with the same keys as `metrics` but animated values.
 */
export function useMetricAnimation(metrics, duration = 700) {
  const [animated, setAnimated] = useState({ ...metrics });
  const prevRef = useRef({ ...metrics });
  const rafRef = useRef(null);

  useEffect(() => {
    const from = { ...prevRef.current };
    const to = metrics;

    // Check if anything changed
    const changed = Object.keys(to).some((k) => from[k] !== to[k]);
    if (!changed) return;

    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      const next = {};
      Object.keys(to).forEach((k) => {
        next[k] = Math.round(from[k] + (to[k] - from[k]) * eased);
      });
      setAnimated(next);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        prevRef.current = { ...to };
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [metrics, duration]);

  return animated;
}
