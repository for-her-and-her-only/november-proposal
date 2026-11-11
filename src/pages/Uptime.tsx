import { useElapsed } from '@/hooks/useElapsed';
import { START_LABEL, pad } from '@/lib/relationship';

function Digits({ value }: { value: string }) {
  return (
    <>
      {value.split('').map((char, index) => (
        <span
          key={index}
          className={/\d/.test(char) ? 'inline-block w-[0.56em] text-center' : 'inline-block w-[0.25em] text-center'}
        >
          {char}
        </span>
      ))}
    </>
  );
}

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col border-t border-rose-bright pt-5">
      <span className="whitespace-nowrap font-serif text-[clamp(3.5rem,11vw,9rem)] leading-none text-warm">
        <Digits value={value} />
      </span>
      <span className="mt-4 font-mono text-[10px] tracking-[0.22em] text-blush/70">{label}</span>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="border-t border-rose/50 pt-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-blush/70">{label}</p>
      <p className="mt-4 whitespace-nowrap font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-none text-warm">
        <Digits value={value.toLocaleString('en-US')} />
      </p>
    </div>
  );
}

export default function Uptime() {
  const { days, hours, minutes, seconds, totalHours, totalMinutes, totalSeconds } = useElapsed();

  return (
    <main className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-6 pb-20 pt-12 sm:px-10 lg:px-16 lg:pt-20">
      <p className="font-mono text-xs text-blush/75">$ tail -f uptime.log</p>

      <p className="mt-12 font-mono text-[11px] tracking-[0.22em] text-warm/55">
        UPTIME SINCE {START_LABEL}
      </p>
      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4">
        <Unit value={String(days)} label="DAYS" />
        <Unit value={pad(hours)} label="HOURS" />
        <Unit value={pad(minutes)} label="MINUTES" />
        <Unit value={pad(seconds)} label="SECONDS" />
      </div>

      <section className="mt-24 grid gap-12 sm:grid-cols-3 sm:gap-8">
        <Stat label="total hours together" value={totalHours} />
        <Stat label="total minutes together" value={totalMinutes} />
        <Stat label="total seconds together" value={totalSeconds} />
      </section>

      <div className="mt-20 space-y-2 border-t border-rose/50 pt-8 font-mono text-sm text-blush/85">
        <p>uptime: 99.99%</p>
        <p>incidents: 0 (a few merge conflicts, all resolved)</p>
        <p>status: still running</p>
      </div>
    </main>
  );
}
