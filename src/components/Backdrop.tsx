export default function Backdrop() {
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden">
        <div className="h-[120vmax] w-[120vmax] shrink-0 animate-heartbeat rounded-full bg-[radial-gradient(circle,rgba(183,42,46,0.45)_0%,rgba(183,42,46,0.12)_35%,rgba(13,10,11,0)_65%)]" />
      </div>
      <div aria-hidden className="grain-overlay" />
    </>
  );
}
