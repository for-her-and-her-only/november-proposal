import { useEffect, useState } from 'react';
import { getElapsed, type Elapsed } from '@/lib/relationship';

export function useElapsed(): Elapsed {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return getElapsed(now);
}
