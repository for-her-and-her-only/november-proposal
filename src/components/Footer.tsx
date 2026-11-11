import LiveCounter from '@/components/LiveCounter';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-rose/50 px-6 py-8 sm:px-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <LiveCounter />
        <p className="font-mono text-[11px] tracking-wide text-blush/70">
          Made with love (and mass amounts of caffeine)
        </p>
      </div>
    </footer>
  );
}
