import { useEffect, useRef, useState } from 'react';
import { Heart } from 'lucide-react';

const FINE_POINTER = '(hover: hover) and (pointer: fine)';

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia(FINE_POINTER);
    const root = document.documentElement;
    const apply = () => {
      root.classList.toggle('heart-cursor', media.matches);
      setEnabled(media.matches);
    };
    apply();
    media.addEventListener('change', apply);
    return () => {
      media.removeEventListener('change', apply);
      root.classList.remove('heart-cursor');
    };
  }, []);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!enabled || !outer || !inner) return;

    const move = (event: PointerEvent) => {
      outer.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      outer.style.opacity = '1';
      const overInteractive = (event.target as Element).closest('a, button, [data-cursor="hover"]');
      inner.style.transform = overInteractive ? 'scale(1.7)' : 'scale(1)';
    };
    const leave = (event: MouseEvent) => {
      if (event.relatedTarget === null) outer.style.opacity = '0';
    };

    window.addEventListener('pointermove', move);
    document.addEventListener('mouseout', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('mouseout', leave);
    };
  }, [enabled, outerRef, innerRef]);

  if (!enabled) return null;

  return (
    <div
      ref={outerRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] opacity-0 will-change-transform"
    >
      <div ref={innerRef} className="transition-transform duration-500 ease-out">
        <Heart size={18} strokeWidth={1.5} className="fill-rose-bright text-blush" />
      </div>
    </div>
  );
}
