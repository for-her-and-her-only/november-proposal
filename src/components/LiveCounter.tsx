import { useElapsed } from '@/hooks/useElapsed';
import { START_LABEL, pad } from '@/lib/relationship';

interface LiveCounterProps {
  size?: 'sm' | 'lg';
  className?: string;
}

export default function LiveCounter({ size = 'sm', className = '' }: LiveCounterProps) {
  const { days, hours, minutes, seconds } = useElapsed();
  const digits =
    size === 'lg' ? 'text-xl sm:text-4xl tracking-tight text-warm' : 'text-sm text-warm';

  return (
    <div className={`font-mono tabular-nums ${className}`}>
      <p className="text-[10px] tracking-[0.2em] text-blush/60">UPTIME SINCE {START_LABEL}</p>
      <p className={`mt-1 whitespace-nowrap ${digits}`}>
        {pad(days, 4)}d : {pad(hours)}h : {pad(minutes)}m : {pad(seconds)}s
      </p>
    </div>
  );
}
