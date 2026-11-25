// Lightweight Canvas Confetti burst without external dependencies

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  vr: number;
  life: number;
  maxLife: number;
  shape: 'rect' | 'circle' | 'triangle';
}

const COLORS = [
  '#ef4444',
  '#f59e0b',
  '#10b981',
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
  '#facc15',
];

export function triggerConfetti(count = 75) {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.remove();
    return;
  }

  const shapes: ('rect' | 'circle' | 'triangle')[] = ['rect', 'circle', 'triangle'];
  const particles: Particle[] = [];

  for (let i = 0; i < count; i++) {
    const fromLeft = i % 2 === 0;
    const originX = fromLeft ? canvas.width * 0.25 : canvas.width * 0.75;
    const originY = canvas.height * 0.6;
    const angle = (fromLeft ? -Math.PI * 0.35 : -Math.PI * 0.65) + (Math.random() - 0.5) * 0.9;
    const speed = 9 + Math.random() * 13;

    particles.push({
      x: originX + (Math.random() - 0.5) * 120,
      y: originY + (Math.random() - 0.5) * 60,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4,
      size: 7 + Math.random() * 8,
      color: COLORS[i % COLORS.length],
      rotation: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.25,
      life: 0,
      maxLife: 85 + Math.random() * 35,
      shape: shapes[i % shapes.length],
    });
  }

  let rafId = 0;
  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = 0;

    for (const p of particles) {
      p.life++;
      if (p.life >= p.maxLife) continue;
      alive++;

      p.vy += 0.38; // gravity
      p.vx *= 0.985;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.vr;

      const alpha = Math.max(0, 1 - p.life / p.maxLife);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;

      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.65);
      } else if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2.2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(0, -p.size / 2);
        ctx.lineTo(p.size / 2, p.size / 2);
        ctx.lineTo(-p.size / 2, p.size / 2);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }

    if (alive > 0) {
      rafId = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(rafId);
      canvas.remove();
    }
  };

  rafId = requestAnimationFrame(render);
}
