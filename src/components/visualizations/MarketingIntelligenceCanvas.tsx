import { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

type RGB = [number, number, number];
type Point = { x: number; y: number };
type Palette = {
  ink: RGB;
  muted: RGB;
  teal: RGB;
  blue: RGB;
  violet: RGB;
  coral: RGB;
  glass: RGB;
  line: RGB;
  dark: boolean;
};

type PanelKind = 'trend' | 'brand' | 'audience' | 'ai';
type Panel = {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  kind: PanelKind;
  tint: RGB;
};

const LIGHT: Palette = {
  ink: [36, 66, 86],
  muted: [82, 113, 130],
  teal: [43, 137, 147],
  blue: [53, 117, 179],
  violet: [119, 94, 164],
  coral: [192, 114, 99],
  glass: [252, 254, 255],
  line: [78, 132, 157],
  dark: false,
};

const DARK: Palette = {
  ink: [230, 240, 247],
  muted: [162, 192, 209],
  teal: [109, 218, 214],
  blue: [134, 181, 244],
  violet: [187, 162, 237],
  coral: [231, 172, 146],
  glass: [25, 37, 51],
  line: [125, 178, 195],
  dark: true,
};

const rgba = (rgb: RGB, alpha: number) =>
  `rgba(${rgb.join(',')},${Math.max(0, Math.min(1, alpha)).toFixed(3)})`;


function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function drawAtmosphere(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  palette: Palette,
) {
  const regions: { x: number; y: number; radius: number; color: RGB; alpha: number }[] = [
    { x: 0.18, y: 0.22, radius: 0.55, color: palette.blue, alpha: 0.17 },
    { x: 0.79, y: 0.29, radius: 0.54, color: palette.violet, alpha: 0.12 },
    { x: 0.49, y: 0.81, radius: 0.48, color: palette.teal, alpha: 0.11 },
  ];
  regions.forEach((region, index) => {
    const x = width * region.x + Math.sin(time * 0.17 + index) * width * 0.025;
    const y = height * region.y + Math.cos(time * 0.13 + index) * height * 0.035;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, width * region.radius);
    gradient.addColorStop(0, rgba(region.color, region.alpha));
    gradient.addColorStop(1, rgba(region.color, 0));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  });
}

function drawBlueprintGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  palette: Palette,
) {
  const cell = width < 680 ? 42 : 56;
  ctx.fillStyle = rgba(palette.line, palette.dark ? 0.10 : 0.075);
  const drift = (time * 3.5) % cell;
  for (let x = -cell + drift; x < width + cell; x += cell) {
    for (let y = -cell; y < height + cell; y += cell) {
      ctx.beginPath();
      ctx.arc(x, y, 1.15, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  // Faint perspective arcs tie the dashboard panels into one continuous field.
  ctx.strokeStyle = rgba(palette.line, palette.dark ? 0.12 : 0.10);
  ctx.lineWidth = 0.7;
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.ellipse(width * 0.5, height * 0.55, width * (0.17 + i * 0.125),
      height * (0.12 + i * 0.10), -0.17, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function quadraticPoint(a: Point, control: Point, b: Point, t: number): Point {
  const inv = 1 - t;
  return {
    x: inv * inv * a.x + 2 * inv * t * control.x + t * t * b.x,
    y: inv * inv * a.y + 2 * inv * t * control.y + t * t * b.y,
  };
}

function drawIntelligenceNetwork(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  palette: Palette,
) {
  const anchors: Point[] = [
    { x: 0.05, y: 0.42 }, { x: 0.24, y: 0.33 }, { x: 0.38, y: 0.53 },
    { x: 0.55, y: 0.43 }, { x: 0.74, y: 0.36 }, { x: 0.96, y: 0.47 },
    { x: 0.14, y: 0.72 }, { x: 0.41, y: 0.81 }, { x: 0.67, y: 0.76 },
    { x: 0.89, y: 0.77 }, { x: 0.39, y: 0.15 }, { x: 0.62, y: 0.19 },
  ];
  const links: [number, number][] = [
    [0, 1], [1, 2], [1, 10], [2, 3], [3, 4], [3, 7],
    [4, 5], [4, 11], [5, 9], [6, 7], [7, 8], [8, 9],
    [10, 11], [11, 3], [2, 6], [3, 8],
  ];
  const points = anchors.map((point, index) => ({
    x: width * point.x + Math.sin(time * 0.29 + index * 1.13) * 9,
    y: height * point.y + Math.cos(time * 0.24 + index * 0.83) * 7,
  }));

  links.forEach(([from, to], index) => {
    const a = points[from];
    const b = points[to];
    const control = {
      x: (a.x + b.x) * 0.5 + Math.sin(index * 2.3) * width * 0.021,
      y: (a.y + b.y) * 0.5 - height * 0.06,
    };
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.quadraticCurveTo(control.x, control.y, b.x, b.y);
    ctx.strokeStyle = rgba(palette.line, palette.dark ? 0.24 : 0.19);
    ctx.lineWidth = index % 3 === 0 ? 1.4 : 0.95;
    ctx.stroke();

    // Each route carries a small moving signal, not a distracting particle cloud.
    if (index % 2 === 0) {
      const progress = (time * 0.085 + index * 0.133) % 1;
      const dot = quadraticPoint(a, control, b, progress);
      const tint = index % 4 === 0 ? palette.coral : palette.teal;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 2.7, 0, Math.PI * 2);
      ctx.fillStyle = rgba(tint, palette.dark ? 0.73 : 0.55);
      ctx.fill();
    }
  });
  points.forEach((point, index) => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 3.1 + (Math.sin(time + index) + 1) * 0.35,
      0, Math.PI * 2);
    ctx.fillStyle = rgba(index % 3 === 0 ? palette.violet : palette.teal, 0.60);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(point.x, point.y, 9.5, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(palette.line, palette.dark ? 0.16 : 0.13);
    ctx.stroke();
  });
}

function drawGrowthTrace(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  time: number,
  palette: Palette,
) {
  ctx.save();
  const data = [0.27, 0.37, 0.33, 0.46, 0.41, 0.64, 0.59, 0.72, 0.69, 0.86];
  ctx.beginPath();
  data.forEach((level, index) => {
    const px = x + width * index / (data.length - 1);
    const py = y + height * (1 - level) + Math.sin(time * 0.7 + index * 0.9) * height * 0.045;
    if (!index) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });
  ctx.strokeStyle = rgba(palette.teal, palette.dark ? 0.82 : 0.72);
  ctx.lineWidth = 2.05;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();
  const lastY = y + height * (1 - data[data.length - 1]) +
    Math.sin(time * 0.7 + 9 * 0.9) * height * 0.045;
  ctx.beginPath();
  ctx.arc(x + width, lastY, 3.5, 0, Math.PI * 2);
  ctx.fillStyle = rgba(palette.teal, 0.85);
  ctx.fill();
  ctx.restore();
}

function drawBrandOrbit(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  time: number,
  palette: Palette,
) {
  for (let i = 0; i < 3; i++) {
    const progress = (time * 0.065 + i / 3) % 1;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * (0.35 + progress * 0.94), 0, Math.PI * 2);
    ctx.strokeStyle = rgba(palette.violet, (1 - progress) * (palette.dark ? 0.23 : 0.18));
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.64, -Math.PI * 0.5,
    -Math.PI * 0.5 + Math.PI * 1.35 + Math.sin(time * 0.4) * 0.11);
  ctx.strokeStyle = rgba(palette.violet, 0.70);
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.64, 0, Math.PI * 2);
  ctx.strokeStyle = rgba(palette.line, 0.21);
  ctx.lineWidth = 5;
  ctx.stroke();
}

function drawAudienceBars(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  time: number,
  palette: Palette,
) {
  const levels = [0.42, 0.68, 0.53, 0.82, 0.71, 0.92, 0.65];
  const step = width / levels.length;
  levels.forEach((level, index) => {
    const size = Math.min(1, Math.max(0.1,
      level + Math.sin(time * 0.8 + index * 0.83) * 0.085));
    const barHeight = height * size;
    roundedRect(ctx, x + index * step + step * 0.20,
      y + height - barHeight, step * 0.60, barHeight, 3);
    ctx.fillStyle = rgba(index % 3 === 0 ? palette.coral : palette.blue, 0.33 + index * 0.048);
    ctx.fill();
  });
}

function drawMiniNetwork(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  time: number,
  palette: Palette,
) {
  const nodes = [
    [0.08, 0.62], [0.29, 0.18], [0.48, 0.72], [0.68, 0.24], [0.91, 0.59],
  ];
  const points = nodes.map(([nx, ny], index) => ({
    x: x + nx * width,
    y: y + ny * height + Math.sin(time * 0.55 + index) * 3,
  }));
  for (let i = 0; i < points.length - 1; i++) {
    ctx.beginPath();
    ctx.moveTo(points[i].x, points[i].y);
    ctx.lineTo(points[i + 1].x, points[i + 1].y);
    ctx.strokeStyle = rgba(palette.violet, 0.48);
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
  points.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, i === 2 ? 5 : 3.2, 0, Math.PI * 2);
    ctx.fillStyle = rgba(i === 2 ? palette.teal : palette.violet, 0.76);
    ctx.fill();
  });
}

function drawGlassPanel(
  ctx: CanvasRenderingContext2D,
  panel: Panel,
  time: number,
  palette: Palette,
  compact: boolean,
) {
  const { x, y, width, height, kind, tint, label } = panel;
  const float = Math.sin(time * 0.42 + x * 0.012) * (compact ? 2 : 4);
  const top = y + float;
  ctx.save();
  ctx.shadowBlur = compact ? 9 : 18;
  ctx.shadowColor = rgba(palette.ink, palette.dark ? 0.16 : 0.09);
  roundedRect(ctx, x, top, width, height, compact ? 12 : 17);
  ctx.fillStyle = rgba(palette.glass, palette.dark ? 0.41 : 0.53);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = rgba(tint, palette.dark ? 0.31 : 0.25);
  ctx.lineWidth = 1.15;
  ctx.stroke();

  const pad = compact ? 12 : 19;
  ctx.font = `600 ${compact ? 8 : 10}px Geist, system-ui, sans-serif`;
  ctx.textBaseline = 'middle';
  ctx.fillStyle = rgba(palette.muted, palette.dark ? 0.77 : 0.75);
  ctx.fillText(label, x + pad, top + pad + 4);

  const vizX = x + pad;
  const vizY = top + height * 0.37;
  const vizWidth = width - pad * 2;
  const vizHeight = height * 0.43;

  if (kind === 'trend') {
    drawGrowthTrace(ctx, vizX, vizY, vizWidth, vizHeight, time, palette);
  } else if (kind === 'brand') {
    const cx = x + width * 0.5;
    const cy = top + height * 0.62;
    drawBrandOrbit(ctx, cx, cy, Math.min(vizWidth, vizHeight * 1.45) * 0.62, time, palette);
  } else if (kind === 'audience') {
    drawAudienceBars(ctx, vizX, vizY, vizWidth, vizHeight, time, palette);
  } else {
    drawMiniNetwork(ctx, vizX, vizY, vizWidth, vizHeight, time, palette);
  }

  ctx.fillStyle = rgba(tint, palette.dark ? 0.67 : 0.53);
  ctx.beginPath();
  ctx.arc(x + width - pad, top + pad + 4, 3.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawScene(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  pixelRatio: number,
  time: number,
  palette: Palette,
) {
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.clearRect(0, 0, width, height);
  drawAtmosphere(ctx, width, height, time, palette);
  drawBlueprintGrid(ctx, width, height, time, palette);
  drawIntelligenceNetwork(ctx, width, height, time, palette);

  const compact = width < 720;
  // One coordinated composition across the ENTIRE viewport. No split regions.
  const layout = compact
    ? [
      [0.04, 0.10, 0.43, 0.19], [0.53, 0.12, 0.43, 0.19],
      [0.04, 0.69, 0.43, 0.18], [0.53, 0.67, 0.43, 0.18],
    ]
    : [
      [0.055, 0.095, 0.235, 0.19], [0.712, 0.12, 0.225, 0.19],
      [0.075, 0.685, 0.225, 0.20], [0.710, 0.695, 0.225, 0.19],
    ];
  const kinds: PanelKind[] = ['trend', 'brand', 'audience', 'ai'];
  const labels = ['CAMPAIGN GROWTH', 'BRAND AWARENESS', 'AUDIENCE SIGNALS', 'AI INTELLIGENCE'];
  const tints = [palette.teal, palette.violet, palette.blue, palette.coral];
  layout.forEach(([x, y, w, h], index) => {
    drawGlassPanel(ctx, {
      x: x * width,
      y: y * height,
      width: w * width,
      height: h * height,
      kind: kinds[index],
      label: labels[index],
      tint: tints[index],
    }, time, palette, compact);
  });

  // Central AI/marketing flow nucleus links all floating dashboard elements.
  const cx = width * 0.52;
  const cy = height * 0.50;
  const radius = Math.min(width, height) * (compact ? 0.095 : 0.11);
  for (let ring = 0; ring < 3; ring++) {
    ctx.beginPath();
    const pulse = (time * 0.055 + ring / 3) % 1;
    ctx.arc(cx, cy, radius * (0.65 + pulse * 1.15), 0, Math.PI * 2);
    ctx.strokeStyle = rgba(palette.teal, (1 - pulse) * (palette.dark ? 0.26 : 0.19));
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.61, 0, Math.PI * 2);
  ctx.fillStyle = rgba(palette.glass, palette.dark ? 0.38 : 0.57);
  ctx.fill();
  ctx.strokeStyle = rgba(palette.teal, 0.53);
  ctx.lineWidth = 1.7;
  ctx.stroke();
  ctx.fillStyle = rgba(palette.ink, palette.dark ? 0.67 : 0.57);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `600 ${compact ? 11 : 15}px Geist, system-ui, sans-serif`;
  ctx.fillText('AI', cx, cy);
  ctx.textAlign = 'start';
}

/**
 * A single, full-viewport decorative marketing intelligence backdrop.
 * Includes charts, brand pulses, audience data, AI nodes and flowing signals.
 * It draws no real user data; all metrics are illustrative geometry.
 *
 * Performance: capped to ~24fps / 1.5 device pixel ratio, suspended in hidden
 * tabs, rendered as a static scene when reduced motion is requested.
 */
export function MarketingIntelligenceCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const palette = theme === 'dark' ? DARK : LIGHT;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 1;
    let height = 1;
    let pixelRatio = 1;
    let frame = 0;
    let lastFrame = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.round(width * pixelRatio);
      const h = Math.round(height * pixelRatio);
      if (canvas.width !== w) canvas.width = w;
      if (canvas.height !== h) canvas.height = h;
    };

    const render = (milliseconds: number) => {
      drawScene(ctx, width, height, pixelRatio, milliseconds * 0.001, palette);
    };

    const tick = (milliseconds: number) => {
      frame = 0;
      if (document.hidden || reduced.matches) return;
      if (milliseconds - lastFrame >= 40) {
        render(milliseconds);
        lastFrame = milliseconds;
      }
      frame = window.requestAnimationFrame(tick);
    };

    const updateActivity = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      if (document.hidden || reduced.matches) {
        render(0);
      } else {
        frame = window.requestAnimationFrame(tick);
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
    reduced.addEventListener('change', updateActivity);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener('visibilitychange', updateActivity);
      reduced.removeEventListener('change', updateActivity);
    };
  }, [theme]);

  return <canvas ref={ref} className="home-intelligence-canvas" aria-hidden="true" />;
}
