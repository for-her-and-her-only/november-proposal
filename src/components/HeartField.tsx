import { useEffect, useRef } from 'react';

type Kind = 'heart' | 'petal' | 'confetti';
type Variant = 'celebrate' | 'ambient';

interface Particle {
  kind: Kind;
  color: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  spin: number;
  depth: number;
  sway: number;
  swayFreq: number;
  swayPhase: number;
  burst: boolean;
  age: number;
  life: number;
}

interface HeartFieldProps {
  variant: Variant;
  className?: string;
}

const HEART = (() => {
  const path = new Path2D();
  const steps = 48;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const x = 16 * Math.sin(t) ** 3;
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    if (i === 0) path.moveTo(x, y);
    else path.lineTo(x, y);
  }
  path.closePath();
  return path;
})();

const CELEBRATE_COLORS = ['#B72A2E', '#C1121F', '#F6B8C6', '#F6B8C6', '#FFF6F2'];
const AMBIENT_COLORS = ['#B72A2E', '#F6B8C6'];

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function pickKind(variant: Variant): Kind {
  if (variant === 'ambient') return 'heart';
  const roll = Math.random();
  if (roll < 0.5) return 'heart';
  return roll < 0.85 ? 'petal' : 'confetti';
}

function createParticle(w: number, h: number, variant: Variant, anywhere: boolean): Particle {
  const kind = pickKind(variant);
  const depth = Math.random();
  const size = rand(5, 9) + depth * 20;
  const rising = Math.random() < 0.35;
  const speed = rand(10, 30) + depth * 40;

  return {
    kind,
    color: variant === 'ambient' ? pick(AMBIENT_COLORS) : pick(CELEBRATE_COLORS),
    x: rand(0, w),
    y: anywhere ? rand(0, h) : rising ? h + size * 2 : -size * 2,
    vx: 0,
    vy: rising ? -speed : speed,
    size: kind === 'confetti' ? size * 0.6 : size,
    rot: rand(0, Math.PI * 2),
    spin: rand(-0.7, 0.7),
    depth,
    sway: rand(10, 36),
    swayFreq: rand(0.4, 1.1),
    swayPhase: rand(0, Math.PI * 2),
    burst: false,
    age: 0,
    life: Infinity,
  };
}

function createBurst(w: number, h: number): Particle {
  const base = createParticle(w, h, 'celebrate', true);
  const angle = rand(0, Math.PI * 2);
  const speed = rand(180, 620) * (0.6 + base.depth * 0.6);
  return {
    ...base,
    x: w / 2,
    y: h * 0.42,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    burst: true,
    life: rand(3.2, 5.5),
  };
}

export default function HeartField({ variant, className = '' }: HeartFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const amountScale = reduceMotion ? 0.4 : 1;
    const alphaScale = variant === 'ambient' ? 0.22 : 1;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let frame = 0;
    let last = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      const small = width < 640;
      const ambientCount =
        variant === 'ambient' ? (reduceMotion ? 4 : 12) : Math.round((small ? 70 : 150) * amountScale);
      const burstCount =
        variant === 'celebrate' ? Math.round((small ? 110 : 200) * amountScale) : 0;

      particles = Array.from({ length: ambientCount }, () =>
        createParticle(width, height, variant, true),
      );
      for (let i = 0; i < burstCount; i++) particles.push(createBurst(width, height));
    };

    const draw = (p: Particle) => {
      const fade = p.burst
        ? Math.min(1, p.age / 0.2) * Math.min(1, (p.life - p.age) / 1.2)
        : 1;
      const x = p.x + Math.sin(p.age * p.swayFreq + p.swayPhase) * p.sway;

      ctx.save();
      ctx.globalAlpha = Math.max(0, (0.3 + p.depth * 0.6) * alphaScale * fade);
      ctx.translate(x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.depth < 0.3) ctx.filter = 'blur(1.5px)';

      if (p.kind === 'heart') {
        const k = p.size / 16;
        ctx.scale(k, k);
        ctx.fill(HEART);
      } else if (p.kind === 'petal') {
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.42, p.size * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.size * 0.5, -p.size * 0.18, p.size, p.size * 0.36);
      }
      ctx.restore();
    };

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.age += dt;
        p.rot += p.spin * dt;

        if (p.burst) {
          const drag = Math.exp(-1.6 * dt);
          p.vx *= drag;
          p.vy = p.vy * drag + 70 * dt;
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          if (p.age >= p.life) {
            particles[i] = createParticle(width, height, variant, false);
            continue;
          }
        } else {
          p.y += p.vy * dt;
          const offScreen = p.vy > 0 ? p.y > height + p.size * 2 : p.y < -p.size * 2;
          if (offScreen) {
            particles[i] = createParticle(width, height, variant, false);
            continue;
          }
        }
        draw(p);
      }

      frame = requestAnimationFrame(step);
    };

    resize();
    seed();
    frame = requestAnimationFrame(step);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-0 h-full w-full ${className}`}
    />
  );
}
