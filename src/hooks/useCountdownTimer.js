// 60-second countdown timer with milestone callbacks for Yebuer reactions
import { useState, useEffect, useRef, useCallback } from 'react';

const TIMER_DURATION = 60;

export function useCountdownTimer({ onTick45, onTick20, onTick10, onExpire, enabled = true }) {
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const fired45 = useRef(false);
  const fired20 = useRef(false);
  const fired10 = useRef(false);
  const firedExpire = useRef(false);

  const reset = useCallback(() => {
    clearInterval(intervalRef.current);
    setTimeLeft(TIMER_DURATION);
    setIsRunning(false);
    fired45.current = false;
    fired20.current = false;
    fired10.current = false;
    firedExpire.current = false;
  }, []);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const stop = useCallback(() => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  }, []);

  useEffect(() => {
    if (!enabled || !isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        const next = prev - 1;

        if (next === 45 && !fired45.current) {
          fired45.current = true;
          onTick45?.();
        }
        if (next === 20 && !fired20.current) {
          fired20.current = true;
          onTick20?.();
        }
        if (next === 10 && !fired10.current) {
          fired10.current = true;
          onTick10?.();
        }
        if (next <= 0 && !firedExpire.current) {
          firedExpire.current = true;
          clearInterval(intervalRef.current);
          onExpire?.();
          return 0;
        }

        return next;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning, enabled, onTick45, onTick20, onTick10, onExpire]);

  const progress = (timeLeft / TIMER_DURATION) * 100;
  const urgency = timeLeft <= 10 ? 'critical' : timeLeft <= 20 ? 'warning' : 'safe';

  return { timeLeft, isRunning, progress, urgency, start, stop, reset };
}
