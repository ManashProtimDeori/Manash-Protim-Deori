import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

type Position3D = { x: number; y: number; z: number };
type Point2D = { x: number; y: number };

type Ribbon = {
  lane: number;
  phase: number;
  breadth: number;
  speed: number;
  depth: number;
  color: [number, number, number];
};

const RIBBONS: Ribbon[] = [
  { lane: -.31, phase: .25, breadth: .66, speed: .21, depth: -.22, color: [91, 153, 177] },
  { lane: .09, phase: 2.25, breadth: .79, speed: .17, depth: .24, color: [153, 186, 199] },
  { lane: .35, phase: 4.65, breadth: .58, speed: .14, depth: -.07, color: [177, 142, 133] },
];

const rgba = (color: [number, number, number], alpha: number) =>
  `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${Math.min(1, Math.max(0, alpha)).toFixed(3)})`;

/**
 * Custom volumetric glass-ribbon animation. Each ribbon is a projected, twisting
 * 3D surface, rather than a flat horizontal wave. Transparent layered faces,
 * specular rim light and a slow parallax offset create a glass-sculpture effect.
 *
 * Lightweight Canvas 2D, no libraries, external assets or data collection.
 * Rendering is capped to approximately 24fps, and pauses on hidden tabs or
 * when reduced-motion is requested. The result is purely decorative.
 */
export const GlassRibbonCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 1;
    let height = 1;
    let pixelRatio = 1;
    let animationFrame = 0;
    let lastFrame = 0;
    const isDark = theme === 'dark';

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      const targetWidth = Math.round(width * pixelRatio);
      const targetHeight = Math.round(height * pixelRatio);
      if (canvas.width !== targetWidth) canvas.width = targetWidth;
      if (canvas.height !== targetHeight) canvas.height = targetHeight;
    };

    const project = (point: Position3D): Point2D => {
      const perspective = 3.8 / (3.8 - point.z * .52);
      return {
        x: width * (.5 + point.x * .182 * perspective),
        y: height * (.5 + point.y * .45 * perspective),
      };
    };

    const calculateEdges = (u: number, seconds: number, ribbon: Ribbon) => {
      const motion = seconds * ribbon.speed;
      const sweep = u * Math.PI * 2;
      const x = (u - .5) * 5.65;
      const y = ribbon.lane +
        Math.sin(sweep * .90 + ribbon.phase + motion) * .25 +
        Math.cos(sweep * 1.8 - motion * .8 + ribbon.phase) * .12;
      const z = ribbon.depth +
        Math.sin(sweep * .82 - motion * .77 + ribbon.phase) * .65;
      const twist = sweep * 1.09 + ribbon.phase - motion * .57;
      const breadth = ribbon.breadth * (.88 + .12 * Math.cos(sweep + motion));
      const skew = Math.sin(twist * .7) * .09;
      return {
        upper: {
          x: x + skew,
          y: y - Math.cos(twist) * breadth * .5,
          z: z + Math.sin(twist) * breadth * .5,
        } as Position3D,
        lower: {
          x: x - skew,
          y: y + Math.cos(twist) * breadth * .5,
          z: z - Math.sin(twist) * breadth * .5,
        } as Position3D,
        center: { x, y, z } as Position3D,
        twist,
      };
    };

    const render = (time: number) => {
      const seconds = time * .001;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // A softly illuminated gallery atmosphere, with plenty of negative space.
      const haze = ctx.createRadialGradient(
        width * .52, height * .53, 0,
        width * .52, height * .53, Math.max(width, height) * .67
      );
      haze.addColorStop(0, isDark ? 'rgba(138,180,191,.21)' : 'rgba(255,255,255,.50)');
      haze.addColorStop(.52, isDark ? 'rgba(94,125,141,.09)' : 'rgba(194,218,224,.21)');
      haze.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = haze;
      ctx.fillRect(0, 0, width, height);

      const stepCount = 76;
      for (const ribbon of RIBBONS) {
        const points = Array.from({ length: stepCount + 1 }, (_, index) => {
          const edges = calculateEdges(index / stepCount, seconds, ribbon);
          return {
            a: project(edges.upper),
            b: project(edges.lower),
            center: project(edges.center),
            twist: edges.twist,
            depth: edges.center.z,
          };
        });

        // The deeper surface has a soft tinted body, with varying local light
        // depending on its orientation in the simulated 3D space.
        for (let index = 0; index < stepCount; index++) {
          const p = points[index];
          const q = points[index + 1];
          const facing = Math.abs(Math.cos((p.twist + q.twist) * .5));
          const depth = Math.max(0, Math.min(1, (p.depth + 1) / 2.3));
          const opacity = (.10 + facing * .16 + depth * .07) * (isDark ? .92 : 1.0);

          // A small offset, darkened underside makes the sheet feel substantial.
          ctx.beginPath();
          ctx.moveTo(p.a.x + 2, p.a.y + 3);
          ctx.lineTo(q.a.x + 2, q.a.y + 3);
          ctx.lineTo(q.b.x + 2, q.b.y + 3);
          ctx.lineTo(p.b.x + 2, p.b.y + 3);
          ctx.closePath();
          ctx.fillStyle = rgba(ribbon.color, opacity * .26);
          ctx.fill();

          const gradient = ctx.createLinearGradient(
            (p.a.x + q.a.x) / 2, (p.a.y + q.a.y) / 2,
            (p.b.x + q.b.x) / 2 + .001, (p.b.y + q.b.y) / 2 + .001
          );
          const pearl = isDark ? '245,250,255' : '255,255,255';
          gradient.addColorStop(0, `rgba(${pearl},${(opacity * .64).toFixed(3)})`);
          gradient.addColorStop(.17, rgba(ribbon.color, opacity * .72));
          gradient.addColorStop(.52, `rgba(${pearl},${(opacity * .80).toFixed(3)})`);
          gradient.addColorStop(.77, rgba(ribbon.color, opacity * .91));
          gradient.addColorStop(1, `rgba(${pearl},${(opacity * .35).toFixed(3)})`);

          ctx.beginPath();
          ctx.moveTo(p.a.x, p.a.y);
          ctx.lineTo(q.a.x, q.a.y);
          ctx.lineTo(q.b.x, q.b.y);
          ctx.lineTo(p.b.x, p.b.y);
          ctx.closePath();
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Smooth, reflective glass edges, one bright and one shadowed.
        for (const edge of ['a', 'b'] as const) {
          ctx.beginPath();
          points.forEach((point, index) => {
            if (!index) ctx.moveTo(point[edge].x, point[edge].y);
            else ctx.lineTo(point[edge].x, point[edge].y);
          });
          const highlight = ctx.createLinearGradient(0, 0, width, 0);
          const whiteAlpha = isDark ? .42 : .59;
          highlight.addColorStop(0, 'rgba(255,255,255,0)');
          highlight.addColorStop(.35, `rgba(255,255,255,${(whiteAlpha * .70).toFixed(3)})`);
          highlight.addColorStop(.62, `rgba(255,255,255,${whiteAlpha.toFixed(3)})`);
          highlight.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.strokeStyle = edge === 'a'
            ? highlight
            : rgba(ribbon.color, isDark ? .31 : .27);
          ctx.lineWidth = edge === 'a' ? 1.7 : 1.15;
          ctx.stroke();
        }

        // A fine internal caustic line moves gently through each ribbon.
        ctx.beginPath();
        points.forEach((point, index) => {
          const x = point.a.x * .34 + point.b.x * .66;
          const y = point.a.y * .34 + point.b.y * .66;
          if (!index) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.lineWidth = 1;
        ctx.strokeStyle = isDark ? 'rgba(245,250,255,.27)' : 'rgba(255,255,255,.41)';
        ctx.stroke();
      }

      // Translucent foreground haze keeps overlapping ribbons atmospheric.
      const glow = ctx.createLinearGradient(0, 0, width, height);
      glow.addColorStop(0, 'rgba(255,255,255,0)');
      glow.addColorStop(.55, isDark ? 'rgba(210,228,237,.035)' : 'rgba(255,255,255,.065)');
      glow.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);
    };

    const loop = (time: number) => {
      animationFrame = 0;
      if (document.hidden || prefersReducedMotion.matches) return;
      if (time - lastFrame >= 40) {
        render(time);
        lastFrame = time;
      }
      animationFrame = window.requestAnimationFrame(loop);
    };

    const updateActivity = () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      if (document.hidden || prefersReducedMotion.matches) {
        render(0);
      } else {
        animationFrame = window.requestAnimationFrame(loop);
      }
    };

    const observer = new ResizeObserver(() => {
      resize();
      render(0);
    });
    observer.observe(canvas);
    resize();
    render(0);
    updateActivity();
    document.addEventListener('visibilitychange', updateActivity);
    prefersReducedMotion.addEventListener('change', updateActivity);

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
      document.removeEventListener('visibilitychange', updateActivity);
      prefersReducedMotion.removeEventListener('change', updateActivity);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="home-glass-ribbon-canvas" aria-hidden="true" />;
};
