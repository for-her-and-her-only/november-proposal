import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart } from 'lucide-react';
import HeartField from '@/components/HeartField';
import LiveCounter from '@/components/LiveCounter';
import TypedLines from '@/components/TypedLines';
import { markCelebrationVisited } from '@/lib/celebrationVisit';
import { START_LABEL } from '@/lib/relationship';

type Phase = 'typing' | 'settling' | 'revealed';

const EASE = [0.22, 1, 0.36, 1] as const;

const TERMINAL_LINES = [
  '> git commit -m "She said yes. Again."',
  '> git push origin main',
  '> build passed ✓  all 11 tests green',
  '> renewing contract ... 100%',
];

const revealStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.45, delayChildren: 0.2 } },
};

const revealItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 1.4, ease: EASE } },
};

export default function Celebration() {
  const [phase, setPhase] = useState<Phase>('typing');

  useEffect(() => {
    markCelebrationVisited();
  }, []);

  const handleTypingDone = useCallback(() => setPhase('settling'), []);

  useEffect(() => {
    if (phase !== 'settling') return;
    const id = window.setTimeout(() => setPhase('revealed'), 1200);
    return () => window.clearTimeout(id);
  }, [phase]);

  const revealed = phase === 'revealed';

  return (
    <>
      <HeartField variant="celebrate" />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(183,42,46,0.5),rgba(13,10,11,0)_70%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 4, ease: 'easeOut' }}
      />

      <main className="relative z-10 mx-auto flex min-h-dvh w-full max-w-5xl flex-1 flex-col px-6 py-16 sm:px-12 lg:py-24">
        <div className="relative flex-1">
          <motion.div
            className="absolute inset-x-0 top-0 font-mono text-sm leading-7 text-blush sm:text-base"
            animate={{ opacity: phase === 'typing' ? 1 : 0 }}
            transition={{ duration: 1.2 }}
          >
            <TypedLines lines={TERMINAL_LINES} onDone={handleTypingDone} />
          </motion.div>

          <motion.div
            variants={revealStagger}
            initial="hidden"
            animate={revealed ? 'show' : 'hidden'}
            className="pt-2"
          >
            <motion.h1
              variants={revealItem}
              className="font-serif text-[clamp(2.75rem,8.5vw,7rem)] leading-[1.02] text-warm"
            >
              Best merge request of my life,{' '}
              <em className="italic text-blush">merged twice.</em>
            </motion.h1>

            <motion.p variants={revealItem} className="mt-8 font-mono text-xs tracking-wide text-blush/75 sm:text-sm">
              {`${START_LABEL} → 11.11.2026 . 11:11 PM . relationship/main`}
            </motion.p>

            <motion.div variants={revealItem} className="mt-14 border-t border-rose/60 pt-8">
              <p className="font-mono text-xs tracking-wide text-warm/60">uptime: still running</p>
              <LiveCounter size="lg" className="mt-4" />
            </motion.div>

            <motion.div variants={revealItem} className="mt-16 flex flex-col items-center gap-10">
              <motion.div
                animate={{ scale: [1, 1.08, 1, 1.05, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Heart size={72} strokeWidth={1} className="text-blush" />
              </motion.div>
              <Link
                to="/letter"
                className="group inline-flex items-center gap-3 bg-rose-bright px-7 py-4 font-mono text-xs uppercase tracking-[0.2em] text-warm transition-colors duration-500 hover:bg-rose"
              >
                Open our repository
                <ArrowRight
                  size={16}
                  strokeWidth={1.5}
                  className="transition-transform duration-500 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
