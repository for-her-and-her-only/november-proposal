import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import TypedLines from '@/components/TypedLines';
import NoPopup, { getNoResponse } from '@/components/proposal/NoPopup';
import { useHoldScale } from '@/hooks/useHoldScale';
import { getElapsed, START_LABEL } from '@/lib/relationship';

type Phase = 'typing' | 'settling' | 'asking';

const EASE = [0.22, 1, 0.36, 1] as const;

const YES_START = 1.75;
const YES_GROW_PER_TICK = 0.06;
const YES_GROW_PER_PRESS = 0.25;
const NO_START = 1.1;
const NO_MIN = 0.75;
const NO_SHRINK_PER_TICK = -0.03;
const NO_SHRINK_PER_PRESS = -0.12;

const yesCeiling = () => (window.innerWidth < 640 ? 2.4 : 3.8);
const noFloor = () => NO_MIN;

const CORNER_LABEL = 'font-mono text-[10px] tracking-[0.22em] text-warm/50';

export default function Proposal() {
  const navigate = useNavigate();
  const [days] = useState(() => getElapsed(Date.now()).days);
  const [phase, setPhase] = useState<Phase>('typing');
  const [attempts, setAttempts] = useState(0);
  const [noResponse, setNoResponse] = useState<string | null>(null);
  const yes = useHoldScale(YES_START, YES_GROW_PER_TICK, YES_GROW_PER_PRESS, yesCeiling);
  const no = useHoldScale(NO_START, NO_SHRINK_PER_TICK, NO_SHRINK_PER_PRESS, noFloor);

  const introLines = useMemo(
    () => [
      '> initializing renewal.exe ...',
      `> loading: ${days}_days_of_us ... done`,
      '> loading: shalini.dll ... done',
      '> warning: heart_rate above normal',
    ],
    [days],
  );

  const handleTypingDone = useCallback(() => setPhase('settling'), []);

  useEffect(() => {
    if (phase !== 'settling') return;
    const id = window.setTimeout(() => setPhase('asking'), 1400);
    return () => window.clearTimeout(id);
  }, [phase]);

  const asking = phase === 'asking';

  const handleNo = () => {
    const next = attempts + 1;
    setAttempts(next);
    setNoResponse(getNoResponse(next));
  };

  const handleSudoSayYes = () => {
    setNoResponse(null);
    navigate('/celebration');
  };

  return (
    <section className="relative flex min-h-dvh flex-1 flex-col justify-center px-6 pb-28 pt-24 sm:px-12 lg:px-24">
      <p className={`absolute left-6 top-6 sm:left-12 lg:left-24 ${CORNER_LABEL}`}>
        SOMETHING SPECIAL / PRIVATE
      </p>
      <p className={`absolute right-6 top-6 sm:right-12 lg:right-24 ${CORNER_LABEL}`}>11:11</p>
      <p className={`absolute bottom-6 left-6 sm:left-12 lg:left-24 ${CORNER_LABEL}`}>
        attempts to click No: {attempts}
      </p>

      <div className="grid max-w-4xl">
        <motion.div
          className="col-start-1 row-start-1 self-center font-mono text-sm leading-7 text-blush sm:text-base"
          animate={{ opacity: asking ? 0 : 1 }}
          transition={{ duration: 1.1 }}
          aria-hidden={asking}
        >
          <TypedLines lines={introLines} onDone={handleTypingDone} />
        </motion.div>

        <motion.div
          className={`col-start-1 row-start-1 self-center ${asking ? '' : 'pointer-events-none'}`}
          initial={{ opacity: 0, y: 24 }}
          animate={asking ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 1.8, ease: EASE }}
        >
          <h1 className="font-serif text-[clamp(2.9rem,9.5vw,8rem)] leading-[0.98] text-warm">
            Shalini, will you be my{' '}
            <em className="italic text-rose-bright">girlfriend?</em>
          </h1>
          <p className="mt-8 font-mono text-xs text-blush/75 sm:text-sm">
            {`// yes, I already asked on ${START_LABEL}. I'm renewing the contract.`}
          </p>

          <div className="mt-12 flex items-center gap-4 sm:gap-6">
            <div className="flex h-16 w-28 shrink-0 items-center justify-center sm:h-20 sm:w-40">
              <motion.button
                type="button"
                onPointerEnter={no.start}
                onPointerLeave={no.stop}
                onPointerDown={no.press}
                onClick={handleNo}
                animate={{ fontSize: `${no.size}rem` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="whitespace-nowrap border border-warm/40 px-[1.8em] py-[0.7em] font-serif italic leading-none text-warm/85 transition-colors duration-500 hover:border-rose-bright hover:text-warm"
              >
                No
              </motion.button>
            </div>

            <motion.button
              type="button"
              onPointerEnter={yes.start}
              onPointerLeave={yes.stop}
              onPointerDown={yes.press}
              onClick={() => navigate('/celebration')}
              animate={{ fontSize: `${yes.size}rem` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="whitespace-nowrap bg-rose-bright px-[1.9em] py-[0.75em] font-serif italic leading-none text-warm shadow-[0_20px_60px_-20px_rgba(193,18,31,0.9)] transition-colors duration-500 hover:bg-rose"
            >
              Yes
            </motion.button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {noResponse !== null && (
          <NoPopup
            key="no-popup"
            response={noResponse}
            onClose={() => setNoResponse(null)}
            onConfirm={handleSudoSayYes}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
