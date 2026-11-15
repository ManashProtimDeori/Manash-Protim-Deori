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

type MotifKind = 'growth' | 'neural' | 'audience' | 'brand';
type Motif = {
  x: number;
  y: number;
  kind: MotifKind;
  tint: RGB;
  phase: number;
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
    { x: 0.18, y: 0.22, radius: 0.55, color: palette.blue, alpha: 0.23 },
    { x: 0.79, y: 0.29, radius: 0.54, color: palette.violet, alpha: 0.19 },
    { x: 0.49, y: 0.81, radius: 0.48, color: palette.teal, alpha: 0.18 },
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
    ctx.strokeStyle = rgba(palette.line, palette.dark ? 0.36 : 0.29);
    ctx.lineWidth = index % 3 === 0 ? 1.4 : 0.95;
    ctx.stroke();

    // Each route carries a small moving signal, not a distracting particle cloud.
    if (index % 2 === 0) {
      const progress = (time * 0.085 + index * 0.133) % 1;
      const dot = quadraticPoint(a, control, b, progress);
      const tint = index % 4 === 0 ? palette.coral : palette.teal;
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 2.7, 0, Math.PI * 2);
      ctx.fillStyle = rgba(tint, palette.dark ? 0.89 : 0.78);
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
  // A confident upward trajectory, a faint secondary forecast, and a
  // translucent underfill convey growth without any numerals or labels.
  const data = [0.19, 0.32, 0.28, 0.45, 0.40, 0.58, 0.53, 0.77, 0.70, 0.90];
  const points = data.map((level, index) => ({
    x: x + width * index / (data.length - 1),
    y: y + height * (1 - level) + Math.sin(time * 0.60 + index * 0.88) * height * 0.027,
  }));

  ctx.strokeStyle = rgba(palette.line, palette.dark ? 0.19 : 0.14);
  ctx.lineWidth = 0.8;
  for (let row = 1; row <= 3; row++) {
    const lineY = y + height * row / 4;
    ctx.beginPath();
    ctx.moveTo(x, lineY);
    ctx.lineTo(x + width, lineY);
    ctx.stroke();
  }

  ctx.beginPath();
  points.forEach((p, index) => {
    if (index === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.lineTo(x + width, y + height);
  ctx.lineTo(x, y + height);
  ctx.closePath();
  const fill = ctx.createLinearGradient(0, y, 0, y + height);
  fill.addColorStop(0, rgba(palette.teal, palette.dark ? 0.32 : 0.25));
  fill.addColorStop(1, rgba(palette.teal, 0.013));
  ctx.fillStyle = fill;
  ctx.fill();

  ctx.beginPath();
  points.forEach((p, index) => {
    if (index === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  });
  ctx.strokeStyle = rgba(palette.teal, 0.92);
  ctx.lineWidth = 2.8;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.shadowBlur = 8;
  ctx.shadowColor = rgba(palette.teal, 0.48);
  ctx.stroke();
  ctx.shadowBlur = 0;

  const progress = (time * 0.075) % 1;
  const step = progress * (points.length - 1);
  const index = Math.min(points.length - 2, Math.floor(step));
  const fraction = step - index;
  const marker = {
    x: points[index].x * (1 - fraction) + points[index + 1].x * fraction,
    y: points[index].y * (1 - fraction) + points[index + 1].y * fraction,
  };
  ctx.beginPath();
  ctx.arc(marker.x, marker.y, 3.8, 0, Math.PI * 2);
  ctx.fillStyle = rgba(palette.blue, 0.94);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(marker.x, marker.y, 8, 0, Math.PI * 2);
  ctx.strokeStyle = rgba(palette.blue, 0.25);
  ctx.stroke();
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
  ctx.save();
  // Concentric reach waves imply growing recognition; rotating signal
  // satellites make the visual language more organic than a gauge icon.
  for (let i = 0; i < 4; i++) {
    const progress = (time * 0.055 + i / 4) % 1;
    const r = radius * (0.26 + progress * 1.05);
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(palette.violet, (1 - progress) * (palette.dark ? 0.47 : 0.41));
    ctx.lineWidth = 1.65;
    ctx.stroke();
  }
  for (let i = 0; i < 3; i++) {
    const start = time * (i % 2 ? -0.19 : 0.16) + i * 2.09;
    const r = radius * (0.48 + i * 0.19);
    ctx.beginPath();
    ctx.arc(cx, cy, r, start, start + Math.PI * (0.65 + i * 0.18));
    ctx.strokeStyle = rgba(i === 1 ? palette.coral : palette.violet, 0.77 - i * 0.10);
    ctx.lineWidth = i === 0 ? 5 : 2.7;
    ctx.lineCap = 'round';
    ctx.stroke();
    const angle = start + Math.PI * (0.65 + i * 0.18);
    ctx.beginPath();
    ctx.arc(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r, i === 0 ? 3.2 : 2.2, 0, Math.PI * 2);
    ctx.fillStyle = rgba(i === 1 ? palette.coral : palette.blue, 0.90);
    ctx.fill();
  }
  const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.32);
  core.addColorStop(0, rgba(palette.violet, 0.45));
  core.addColorStop(1, rgba(palette.violet, 0));
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.32, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
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
  const levels = [0.42, 0.68, 0.53, 0.82, 0.71, 0.94, 0.65];
  const step = width / levels.length;
  ctx.save();
  for (let index = 0; index < levels.length; index++) {
    const level = levels[index];
    const size = Math.min(1, Math.max(0.08,
      level + Math.sin(time * 0.65 + index * 0.79) * 0.071));
    const barHeight = height * size;
    const xBar = x + index * step + step * 0.18;
    const barWidth = step * 0.62;
    roundedRect(ctx, xBar, y, barWidth, height, 3);
    ctx.fillStyle = rgba(palette.line, palette.dark ? 0.12 : 0.11);
    ctx.fill();

    roundedRect(ctx, xBar, y + height - barHeight, barWidth, barHeight, 3);
    const barColor = index % 3 === 0 ? palette.coral : index % 2 ? palette.blue : palette.teal;
    const fill = ctx.createLinearGradient(xBar, y + height - barHeight, xBar, y + height);
    fill.addColorStop(0, rgba(barColor, 0.88));
    fill.addColorStop(1, rgba(barColor, 0.30));
    ctx.fillStyle = fill;
    ctx.fill();
  }
  ctx.restore();
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
  const nodes: [number, number][] = [
    [0.10, 0.70], [0.27, 0.25], [0.46, 0.68], [0.51, 0.21],
    [0.73, 0.39], [0.88, 0.74], [0.78, 0.12],
  ];
  const points = nodes.map(([nx, ny], index) => ({
    x: x + nx * width,
    y: y + ny * height + Math.sin(time * 0.54 + index * 1.05) * 3.5,
  }));
  const connections: [number, number][] = [
    [0, 1], [1, 2], [1, 3], [2, 3], [2, 4], [3, 4], [4, 5], [4, 6],
  ];
  ctx.save();
  connections.forEach(([a, b], index) => {
    const first = points[a], second = points[b];
    ctx.beginPath();
    ctx.moveTo(first.x, first.y);
    ctx.lineTo(second.x, second.y);
    ctx.strokeStyle = rgba(index % 3 === 0 ? palette.teal : palette.violet, 0.48);
    ctx.lineWidth = 1.3;
    ctx.stroke();
    if (index % 2 === 0) {
      const fraction = (time * 0.14 + index * 0.18) % 1;
      const px = first.x * (1 - fraction) + second.x * fraction;
      const py = first.y * (1 - fraction) + second.y * fraction;
      ctx.beginPath();
      ctx.arc(px, py, 2.3, 0, Math.PI * 2);
      ctx.fillStyle = rgba(palette.coral, 0.91);
      ctx.fill();
    }
  });
  points.forEach((point, index) => {
    const core = index === 4 ? 5.2 : 3.4;
    ctx.beginPath();
    ctx.arc(point.x, point.y, core + Math.sin(time * 0.7 + index) * 0.55, 0, Math.PI * 2);
    ctx.fillStyle = rgba(index === 4 ? palette.teal : palette.violet, 0.88);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(point.x, point.y, core + 4.5, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(palette.blue, 0.21);
    ctx.stroke();
  });
  ctx.restore();
}

/**
 * Visual signals flow along elegant curved routes to a shared intelligence
 * nucleus. The motion and the translucent wave of light form one ecosystem,
 * rather than a collage of unrelated widgets.
 */
function drawSignalConduits(
  ctx: CanvasRenderingContext2D,
  hub: Point,
  destinations: { point: Point; tint: RGB }[],
  time: number,
  palette: Palette,
) {
  ctx.save();
  destinations.forEach(({ point, tint }, index) => {
    const bend = index % 2 ? -1 : 1;
    const control: Point = {
      x: hub.x * 0.52 + point.x * 0.48 +
        (point.y - hub.y) * 0.28 * bend,
      y: hub.y * 0.55 + point.y * 0.45 -
        (point.x - hub.x) * 0.16 * bend,
    };
    ctx.beginPath();
    ctx.moveTo(hub.x, hub.y);
    ctx.quadraticCurveTo(control.x, control.y, point.x, point.y);
    ctx.strokeStyle = rgba(tint, palette.dark ? 0.13 : 0.11);
    ctx.lineWidth = 10;
    ctx.stroke();

    const thread = ctx.createLinearGradient(hub.x, hub.y, point.x, point.y);
    thread.addColorStop(0, rgba(palette.teal, palette.dark ? 0.66 : 0.55));
    thread.addColorStop(0.53, rgba(palette.blue, palette.dark ? 0.41 : 0.37));
    thread.addColorStop(1, rgba(tint, palette.dark ? 0.72 : 0.64));
    ctx.beginPath();
    ctx.moveTo(hub.x, hub.y);
    ctx.quadraticCurveTo(control.x, control.y, point.x, point.y);
    ctx.strokeStyle = thread;
    ctx.lineWidth = 1.8;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Two independent moving signal pearls travel through each connection.
    for (let p = 0; p < 2; p++) {
      const progress = (time * (0.075 + p * 0.018) +
        index * 0.22 + p * 0.50) % 1;
      const pointOnCurve = quadraticPoint(hub, control, point, progress);
      const halo = ctx.createRadialGradient(
        pointOnCurve.x, pointOnCurve.y, 0,
        pointOnCurve.x, pointOnCurve.y, 13,
      );
      halo.addColorStop(0, rgba(tint, 0.50));
      halo.addColorStop(1, rgba(tint, 0));
      ctx.beginPath();
      ctx.arc(pointOnCurve.x, pointOnCurve.y, 13, 0, Math.PI * 2);
      ctx.fillStyle = halo;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(pointOnCurve.x, pointOnCurve.y, p === 0 ? 3.2 : 2.4, 0, Math.PI * 2);
      ctx.fillStyle = rgba(tint, 0.93);
      ctx.fill();
    }
  });
  ctx.restore();
}

/**
 * Four distinct FLOATING visual objects instead of rectangular dashboard
 * cards. Color and kinetic geometry give each theme its own identity:
 * teal analytics, violet neural AI, coral audiences, blue brand reach.
 * All glass lighting is unframed so the background can breathe.
 */
function drawOpenMotif(
  ctx: CanvasRenderingContext2D,
  position: Point,
  radius: number,
  motif: Motif,
  time: number,
  palette: Palette,
) {
  ctx.save();
  const floatX = Math.sin(time * 0.27 + motif.phase) * radius * 0.052;
  const floatY = Math.cos(time * 0.22 + motif.phase) * radius * 0.073;
  ctx.translate(position.x + floatX, position.y + floatY);
  const { tint } = motif;

  // An illuminated, transparent sphere: sculptural light, not a boxed panel.
  const aura = ctx.createRadialGradient(-radius * 0.13, -radius * 0.21, 0,
    0, 0, radius * 1.52);
  aura.addColorStop(0, rgba(tint, palette.dark ? 0.28 : 0.23));
  aura.addColorStop(0.40, rgba(tint, palette.dark ? 0.17 : 0.13));
  aura.addColorStop(1, rgba(tint, 0));
  ctx.fillStyle = aura;
  ctx.beginPath();
  ctx.arc(0, 0, radius * 1.52, 0, Math.PI * 2);
  ctx.fill();

  // Nested offset 3D rings subtly tumble around each concept.
  ctx.save();
  ctx.rotate(motif.phase * 0.17 + time * 0.055);
  for (let ring = 0; ring < 3; ring++) {
    const angle = ring * 0.82 + motif.phase * 0.23;
    const horizontal = radius * (0.88 + ring * 0.16);
    const vertical = radius * (0.48 + ring * 0.12);
    const start = ring * 1.12 + time * (ring % 2 ? -0.11 : 0.095);
    ctx.beginPath();
    ctx.ellipse(0, 0, horizontal, vertical, angle, start,
      start + Math.PI * (1.22 + ring * 0.11));
    ctx.strokeStyle = rgba(ring === 1 ? palette.blue : tint,
      (palette.dark ? 0.61 : 0.51) - ring * 0.09);
    ctx.lineWidth = ring === 0 ? 2.9 : 1.45;
    ctx.shadowBlur = ring === 0 ? 11 : 0;
    ctx.shadowColor = rgba(tint, 0.35);
    ctx.stroke();
  }
  ctx.restore();

  const lens = ctx.createRadialGradient(
    -radius * 0.18, -radius * 0.19, radius * 0.02,
    0, 0, radius * 0.63);
  lens.addColorStop(0, rgba(palette.glass, palette.dark ? 0.45 : 0.56));
  lens.addColorStop(0.46, rgba(tint, 0.12));
  lens.addColorStop(1, rgba(tint, 0));
  ctx.fillStyle = lens;
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.63, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  if (motif.kind === 'growth') {
    drawGrowthTrace(ctx,
      -radius * 0.84, -radius * 0.36,
      radius * 1.68, radius * 0.79, time, palette);
  } else if (motif.kind === 'neural') {
    drawMiniNetwork(ctx,
      -radius * 0.70, -radius * 0.51,
      radius * 1.40, radius * 1.02, time, palette);
  } else if (motif.kind === 'audience') {
    drawAudienceBars(ctx,
      -radius * 0.67, -radius * 0.44,
      radius * 1.34, radius * 0.90, time, palette);
    // Audience clusters orbit the bars instead of forming another UI tile.
    for (let i = 0; i < 5; i++) {
      const angle = i * Math.PI * 0.4 + time * 0.085;
      const distance = radius * (0.75 + i % 2 * 0.17);
      ctx.beginPath();
      ctx.arc(Math.cos(angle) * distance, Math.sin(angle) * distance,
        3 + i % 3, 0, Math.PI * 2);
      ctx.fillStyle = rgba(i % 2 ? tint : palette.violet, 0.75);
      ctx.fill();
    }
  } else {
    drawBrandOrbit(ctx, 0, 0, radius * 0.91, time, palette);
  }

  // Detached metallic satellites visually tether each object to the network.
  for (let i = 0; i < 3; i++) {
    const angle = time * (i % 2 ? -0.18 : 0.13) +
      motif.phase + i * Math.PI * 2 / 3;
    const distance = radius * (1.06 + i * 0.12);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance * 0.69;
    ctx.beginPath();
    ctx.arc(x, y, i === 0 ? 4.3 : 2.7, 0, Math.PI * 2);
    ctx.shadowBlur = 10;
    ctx.shadowColor = rgba(tint, 0.65);
    ctx.fillStyle = rgba(i === 1 ? palette.coral : tint, 0.93);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
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
  // A single open constellation fills the viewport: NO cards or boxes.
  // Geometric positions stay anchored as the individual objects breathe.
  const motifs: Motif[] = compact
    ? [
      { x: 0.20, y: 0.22, kind: 'growth', tint: palette.teal, phase: 0.2 },
      { x: 0.80, y: 0.22, kind: 'neural', tint: palette.violet, phase: 1.7 },
      { x: 0.20, y: 0.78, kind: 'audience', tint: palette.coral, phase: 3.0 },
      { x: 0.80, y: 0.78, kind: 'brand', tint: palette.blue, phase: 4.6 },
    ]
    : [
      { x: 0.19, y: 0.24, kind: 'growth', tint: palette.teal, phase: 0.2 },
      { x: 0.81, y: 0.24, kind: 'neural', tint: palette.violet, phase: 1.7 },
      { x: 0.19, y: 0.77, kind: 'audience', tint: palette.coral, phase: 3.0 },
      { x: 0.81, y: 0.77, kind: 'brand', tint: palette.blue, phase: 4.6 },
    ];
  const hub: Point = { x: width * 0.52, y: height * 0.50 };
  const objects = motifs.map(motif => ({
    point: { x: width * motif.x, y: height * motif.y },
    tint: motif.tint,
  }));
  drawSignalConduits(ctx, hub, objects, time, palette);

  const motifRadius = Math.min(width, height) * (compact ? 0.17 : 0.155);
  motifs.forEach(motif => {
    drawOpenMotif(ctx, {
      x: motif.x * width,
      y: motif.y * height,
    }, motifRadius, motif, time, palette);
  });



  // A symbolic neural nucleus connects all analytics and marketing signals.
  // Moving orbits, neurons and light pulses evoke inference, without a single word.
  const cx = width * 0.52;
  const cy = height * 0.50;
  const radius = Math.min(width, height) * (compact ? 0.12 : 0.135);
  ctx.save();
  const aura = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 2.1);
  aura.addColorStop(0, rgba(palette.teal, palette.dark ? 0.28 : 0.22));
  aura.addColorStop(0.42, rgba(palette.blue, 0.13));
  aura.addColorStop(1, rgba(palette.blue, 0));
  ctx.fillStyle = aura;
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 2.1, 0, Math.PI * 2);
  ctx.fill();

  for (let ring = 0; ring < 4; ring++) {
    const progress = (time * 0.05 + ring / 4) % 1;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * (0.53 + progress * 1.19), 0, Math.PI * 2);
    ctx.strokeStyle = rgba(ring % 2 ? palette.violet : palette.teal,
      (1 - progress) * (palette.dark ? 0.42 : 0.30));
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.arc(cx, cy, radius * 0.72, 0, Math.PI * 2);
  const lens = ctx.createRadialGradient(cx - radius * 0.21, cy - radius * 0.2,
    0, cx, cy, radius * 0.78);
  lens.addColorStop(0, rgba(palette.glass, palette.dark ? 0.94 : 0.98));
  lens.addColorStop(0.68, rgba(palette.glass, palette.dark ? 0.58 : 0.72));
  lens.addColorStop(1, rgba(palette.blue, 0.13));
  ctx.fillStyle = lens;
  ctx.fill();
  ctx.strokeStyle = rgba(palette.teal, 0.62);
  ctx.lineWidth = 1.6;
  ctx.stroke();

  // Eight peripheral neurons and an offset inner ring form a miniature neural graph.
  const neurons: Point[] = Array.from({ length: 8 }, (_, index) => {
    const angle = index * Math.PI / 4 + time * 0.12 - Math.PI * 0.5;
    return {
      x: cx + Math.cos(angle) * radius * 0.47,
      y: cy + Math.sin(angle) * radius * 0.47,
    };
  });
  neurons.forEach((point, index) => {
    const next = neurons[(index + 3) % neurons.length];
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
    ctx.quadraticCurveTo(cx, cy, next.x, next.y);
    ctx.strokeStyle = rgba(index % 2 ? palette.blue : palette.violet, 0.38);
    ctx.lineWidth = 1.1;
    ctx.stroke();
  });
  const inner = [
    { x: cx - radius * 0.16, y: cy + radius * 0.08 },
    { x: cx + radius * 0.19, y: cy - radius * 0.10 },
    { x: cx + Math.sin(time * 0.44) * radius * 0.05,
      y: cy + Math.cos(time * 0.42) * radius * 0.03 },
  ];
  inner.forEach((point, i) => {
    neurons.forEach((neuron, j) => {
      if ((i + j) % 3 !== 0) return;
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(neuron.x, neuron.y);
      ctx.strokeStyle = rgba(palette.teal, 0.29);
      ctx.lineWidth = 1;
      ctx.stroke();
    });
  });
  [...neurons, ...inner].forEach((point, index) => {
    const size = index >= neurons.length ? 4.8 : 2.9;
    ctx.beginPath();
    ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
    ctx.fillStyle = rgba(index % 3 === 0 ? palette.coral : palette.teal, 0.95);
    ctx.fill();
    if (index >= neurons.length) {
      ctx.beginPath();
      ctx.arc(point.x, point.y, size + 4, 0, Math.PI * 2);
      ctx.strokeStyle = rgba(palette.violet, 0.32);
      ctx.stroke();
    }
  });

  // Staggered luminous arcs make the center feel alive and sculptural.
  for (let orbit = 0; orbit < 3; orbit++) {
    const angle = time * (orbit % 2 ? -0.16 : 0.22) + orbit * 2.1;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * (0.79 + orbit * 0.19),
      angle, angle + Math.PI * 0.85);
    ctx.strokeStyle = rgba(orbit === 1 ? palette.coral : palette.blue, 0.56);
    ctx.lineWidth = orbit === 0 ? 2.4 : 1.45;
    ctx.lineCap = 'round';
    ctx.stroke();
  }
  ctx.restore();
}

// The scene is one full-screen field; no separate top/bottom or left/right visuals.

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
