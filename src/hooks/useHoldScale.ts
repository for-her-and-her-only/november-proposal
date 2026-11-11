import { useCallback, useEffect, useRef, useState } from 'react';

const TICK_MS = 90;

export function useHoldScale(
  initial: number,
  perTick: number,
  perPress: number,
  bound: () => number,
) {
  const [size, setSize] = useState(initial);
  const timer = useRef<number | null>(null);

  const nudge = useCallback(
    (amount: number) => {
      setSize((current) => {
        const next = current + amount;
        return amount > 0 ? Math.min(next, bound()) : Math.max(next, bound());
      });
    },
    [bound],
  );

  const stop = useCallback(() => {
    if (timer.current !== null) {
      window.clearInterval(timer.current);
      timer.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (timer.current !== null) return;
    timer.current = window.setInterval(() => nudge(perTick), TICK_MS);
  }, [nudge, perTick]);

  const press = useCallback(() => nudge(perPress), [nudge, perPress]);

  useEffect(() => stop, [stop]);

  return { size, start, stop, press };
}
