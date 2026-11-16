import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { MarketingIntelligenceCanvas } from './MarketingIntelligenceCanvas';

/**
 * Original WebGL intelligence sculpture. Native WebGL keeps the portfolio
 * dependency-free and leaves every real text node/link in the HTML layer.
 * The previous Canvas 2D workflow remains the automatic WebGL fallback.
 */
type V3 = [number, number, number];
type Tint = [number, number, number];
type Paint = [number, number, number, number];

const TEAL: Tint = [0.16, 0.79, 0.74];
const VIOLET: Tint = [0.68, 0.53, 0.97];
const CORAL: Tint = [0.96, 0.52, 0.45];
const BLUE: Tint = [0.28, 0.62, 0.99];
const PALE: Tint = [0.80, 0.93, 1.0];

const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const sub = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const multiply = (a: V3, n: number): V3 => [a[0] * n, a[1] * n, a[2] * n];
const cross = (a: V3, b: V3): V3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const length = (a: V3) => Math.hypot(a[0], a[1], a[2]);
const norm = (a: V3): V3 => multiply(a, 1 / Math.max(length(a), 0.0001));
const mix = (a: Tint, b: Tint, t: number): Tint => [
  a[0] * (1 - t) + b[0] * t,
  a[1] * (1 - t) + b[1] * t,
  a[2] * (1 - t) + b[2] * t,
];
const paint = (c: Tint, alpha: number): Paint => [c[0], c[1], c[2], alpha];
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function bezier(a: V3, control: V3, b: V3, t: number): V3 {
  const inv = 1 - t;
  return add(add(multiply(a, inv * inv),
    multiply(control, 2 * inv * t)), multiply(b, t * t));
}

class Mesh {
  readonly data: number[] = [];

  private vertex(p: V3, normal: V3, c: Paint) {
    this.data.push(p[0], p[1], p[2],
      normal[0], normal[1], normal[2], c[0], c[1], c[2], c[3]);
  }

  quad(a: V3, b: V3, c: V3, d: V3, color: Paint) {
    const normal = norm(cross(sub(b, a), sub(c, a)));
    this.vertex(a, normal, color);
    this.vertex(b, normal, color);
    this.vertex(c, normal, color);
    this.vertex(a, normal, color);
    this.vertex(c, normal, color);
    this.vertex(d, normal, color);
  }

  box(center: V3, size: V3, color: Paint, yaw = 0) {
    const [sx, sy, sz] = size.map(v => v * 0.5) as V3;
    const raw: V3[] = [
      [-sx, -sy, -sz], [sx, -sy, -sz], [sx, sy, -sz], [-sx, sy, -sz],
      [-sx, -sy, sz], [sx, -sy, sz], [sx, sy, sz], [-sx, sy, sz],
    ];
    const s = Math.sin(yaw);
    const c = Math.cos(yaw);
    const p = raw.map(v => add(center,
      [v[0] * c + v[2] * s, v[1], -v[0] * s + v[2] * c]));
    const faces: [number, number, number, number, number][] = [
      [4, 5, 6, 7, 1], [1, 0, 3, 2, 0.56],
      [0, 4, 7, 3, 0.83], [5, 1, 2, 6, 0.75],
      [3, 7, 6, 2, 1.08], [0, 1, 5, 4, 0.62],
    ];
    for (const [a, b, d, e, shade] of faces) {
      const tint: Paint = [
        Math.min(color[0] * shade, 1),
        Math.min(color[1] * shade, 1),
        Math.min(color[2] * shade, 1),
        color[3],
      ];
      this.quad(p[a], p[b], p[d], p[e], tint);
    }
  }

  // A connector is an actual extruded 3D rectangular prism, not a 2D line.
  beam(a: V3, b: V3, thickness: number, color: Paint) {
    const direction = norm(sub(b, a));
    if (length(sub(b, a)) < 0.0001) return;
    const reference: V3 = Math.abs(direction[2]) > 0.87 ? [0, 1, 0] : [0, 0, 1];
    const side = multiply(norm(cross(direction, reference)), thickness * 0.5);
    const up = multiply(norm(cross(direction, side)), thickness * 0.5);
    const at = (origin: V3, sideMul: number, upMul: number): V3 =>
      add(origin, add(multiply(side, sideMul), multiply(up, upMul)));
    const a0 = at(a, -1, -1), a1 = at(a, 1, -1);
    const a2 = at(a, 1, 1), a3 = at(a, -1, 1);
    const b0 = at(b, -1, -1), b1 = at(b, 1, -1);
    const b2 = at(b, 1, 1), b3 = at(b, -1, 1);
    this.quad(a0, a1, b1, b0, color);
    this.quad(a1, a2, b2, b1, color);
    this.quad(a2, a3, b3, b2, color);
    this.quad(a3, a0, b0, b3, color);
    this.quad(a0, a3, a2, a1, color);
    this.quad(b0, b1, b2, b3, color);
  }

  ring(center: V3, radius: number, tilt: number,
    time: number, color: Paint, thickness = 0.024, arc = Math.PI * 2) {
    const count = Math.max(9, Math.ceil(36 * arc / (Math.PI * 2)));
    const points: V3[] = [];
    for (let i = 0; i <= count; i++) {
      const angle = (i / count) * arc + time;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      points.push(add(center, [x,
        y * Math.cos(tilt),
        y * Math.sin(tilt)]));
    }
    for (let i = 0; i < count; i++) {
      this.beam(points[i], points[i + 1], thickness, color);
    }
  }
}

const vertexSource = `
attribute vec3 aPosition;
attribute vec3 aNormal;
attribute vec4 aColor;
uniform float uAspect;
uniform float uYaw;
uniform float uPitch;
uniform float uZoom;
varying vec3 vNormal;
varying vec4 vColor;
void main() {
  float sy = sin(uYaw);
  float cy = cos(uYaw);
  float sp = sin(uPitch);
  float cp = cos(uPitch);
  vec3 p = vec3(cy * aPosition.x + sy * aPosition.z,
    aPosition.y, -sy * aPosition.x + cy * aPosition.z);
  vec3 n = vec3(cy * aNormal.x + sy * aNormal.z,
    aNormal.y, -sy * aNormal.x + cy * aNormal.z);
  p = vec3(p.x, cp * p.y - sp * p.z, sp * p.y + cp * p.z);
  n = vec3(n.x, cp * n.y - sp * n.z, sp * n.y + cp * n.z);
  float d = max(1.0, uZoom - p.z);
  float farPlane = 60.0;
  float nearPlane = 0.1;
  float clipZ = ((farPlane + nearPlane) / (farPlane - nearPlane)) * d
    - (2.0 * farPlane * nearPlane) / (farPlane - nearPlane);
  gl_Position = vec4(p.x * 1.80 / uAspect, p.y * 1.80, clipZ, d);
  vNormal = normalize(n);
  vColor = aColor;
}
`;

const fragmentSource = `
precision mediump float;
varying vec3 vNormal;
varying vec4 vColor;
void main() {
  vec3 n = normalize(vNormal);
  vec3 lightDirection = normalize(vec3(-0.50, 0.86, 0.88));
  float diffuse = max(dot(n, lightDirection), 0.0);
  float edge = pow(1.0 - max(dot(n, vec3(0.0, 0.0, 1.0)), 0.0), 2.0);
  vec3 color = vColor.rgb * (0.66 + diffuse * 0.44) +
    vec3(0.11, 0.20, 0.28) * edge * 0.62;
  gl_FragColor = vec4(clamp(color, 0.0, 1.0), vColor.a);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  gl.deleteShader(shader);
  return null;
}

function initialize(gl: WebGLRenderingContext) {
  const vertex = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertex || !fragment) {
    if (vertex) gl.deleteShader(vertex);
    if (fragment) gl.deleteShader(fragment);
    return null;
  }
  const program = gl.createProgram();
  if (!program) {
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    return null;
  }
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  const buffer = gl.createBuffer();
  if (!buffer) {
    gl.deleteProgram(program);
    return null;
  }
  return {
    program, buffer,
    position: gl.getAttribLocation(program, 'aPosition'),
    normal: gl.getAttribLocation(program, 'aNormal'),
    color: gl.getAttribLocation(program, 'aColor'),
    aspect: gl.getUniformLocation(program, 'uAspect'),
    yaw: gl.getUniformLocation(program, 'uYaw'),
    pitch: gl.getUniformLocation(program, 'uPitch'),
    zoom: gl.getUniformLocation(program, 'uZoom'),
  };
}

function buildScene(time: number, dark: boolean, compact: boolean) {
  const mesh = new Mesh();
  const glass: Tint = dark ? [0.18, 0.28, 0.40] : [0.63, 0.78, 0.90];
  const scale = compact ? 0.70 : 1;
  const body = (tint: Tint) => mix(glass, tint, dark ? 0.42 : 0.24);
  const block: V3 = compact ? [1.72, 1.25, 0.65] : [1.91, 1.39, 0.73];
  const core: V3 = [0, 0, 0.85];
  const modules: { position: V3; color: Tint; kind: number; phase: number }[] = [
    { position: [-3.40 * scale, 1.73 * scale, -0.43], color: TEAL, kind: 0, phase: 0.2 },
    { position: [3.35 * scale, 1.69 * scale, -0.86], color: VIOLET, kind: 1, phase: 1.4 },
    { position: [-3.36 * scale, -1.68 * scale, -0.70], color: CORAL, kind: 2, phase: 2.8 },
    { position: [3.34 * scale, -1.70 * scale, -0.43], color: BLUE, kind: 3, phase: 4.2 },
  ];

  const modulePositions: V3[] = modules.map(({ position, phase }) => [
    position[0] + Math.sin(time * 0.34 + phase) * 0.10,
    position[1] + Math.cos(time * 0.29 + phase) * 0.11,
    position[2] + Math.sin(time * 0.26 + phase) * 0.22,
  ]);

  // Quiet dimensional grid behind the topology, giving scale and depth.
  for (let i = -5; i <= 5; i++) {
    mesh.beam([-5.3, i * 0.52, -2.65], [5.3, i * 0.52, -2.65],
      0.009, paint(mix(BLUE, glass, 0.48), dark ? 0.16 : 0.12));
  }
  for (let i = -9; i <= 9; i++) {
    mesh.beam([i * 0.56, -3.0, -2.65], [i * 0.56, 3.0, -2.65],
      0.009, paint(mix(TEAL, glass, 0.52), dark ? 0.12 : 0.11));
  }

  // The center is one AI/strategy router made of three stacked glass slices.
  mesh.box([0.10, -0.10, 0.25], [1.86, 1.52, 0.36],
    paint(mix(BLUE, glass, 0.24), 0.37));
  mesh.box(core, [1.76, 1.46, 0.64],
    paint(mix(BLUE, glass, 0.52), 0.93), Math.sin(time * 0.13) * 0.10);
  mesh.box([0, 0, 1.21], [1.47, 1.17, 0.075],
    paint(mix(glass, VIOLET, 0.28), 0.87));
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const n = row * 3 + col;
      const energy = 0.5 + 0.5 * Math.sin(time * 1.7 + n * 0.61);
      const tint = n % 3 === 0 ? TEAL : n % 3 === 1 ? VIOLET : BLUE;
      mesh.box([(col - 1) * 0.38, (1 - row) * 0.34, 1.30 + energy * 0.06],
        [0.20, 0.17, 0.09 + energy * 0.10],
        paint(tint, 0.62 + energy * 0.30));
    }
  }
  // Intersecting glass halos make the central workflow feel suspended in space.
  mesh.ring(core, 1.13, 0.48, time * 0.13, paint(TEAL, 0.54), 0.026);
  mesh.ring(core, 1.37, -0.66, -time * 0.11, paint(VIOLET, 0.41), 0.018);

  modules.forEach((module, index) => {
    const p = modulePositions[index];
    const tint = module.color;
    const yaw = Math.sin(time * 0.25 + module.phase) * 0.12;
    mesh.box(add(p, [0.10, -0.10, -0.24]), [block[0] * 1.03, block[1] * 1.06, 0.26],
      paint(tint, dark ? 0.28 : 0.31));
    mesh.box(p, block, paint(body(tint), dark ? 0.91 : 0.93), yaw);
    const front = p[2] + block[2] * 0.5 + 0.055;
    mesh.box(add(p, [0, 0, block[2] * 0.5 + 0.01]),
      [block[0] * 0.86, block[1] * 0.78, 0.065],
      paint(mix(glass, tint, 0.22), 0.49));

    // Reflected glass corners + dedicated connection sockets.
    for (const sign of [-1, 1]) {
      mesh.box([p[0] + sign * block[0] * 0.51, p[1], front - 0.15],
        [0.125, 0.16, 0.20], paint(tint, 0.95));
    }
    for (let k = 0; k < 3; k++) {
      mesh.box([p[0] + (-0.66 + k * 0.19) * block[0] * 0.5,
        p[1] + block[1] * 0.33, front + 0.10],
        [0.083, 0.071, 0.085], paint(tint, 0.55 + 0.32 * (
          0.5 + Math.sin(time * 1.4 + k + module.phase) * 0.5)));
    }

    if (module.kind === 0) {
      // ANALYTICS: a skyline of vertical 3D columns and rising 3D trajectory.
      const levels = [0.25, 0.44, 0.35, 0.58, 0.68, 0.88];
      const tops: V3[] = [];
      levels.forEach((level, j) => {
        const wave = 0.5 + 0.5 * Math.sin(time * 0.62 + j * 1.32);
        const h = 0.23 + level * 0.64 + wave * 0.10;
        const x = p[0] + (j - 2.5) * block[0] * 0.137;
        const y = p[1] - 0.32 * block[1] + h * 0.5;
        mesh.box([x, y, front + 0.12], [0.105, h, 0.15],
          paint(j % 2 ? TEAL : mix(TEAL, BLUE, 0.35), 0.90));
        tops.push([x, y + h * 0.5 + 0.04, front + 0.25]);
      });
      for (let j = 0; j < tops.length - 1; j++) {
        mesh.beam(tops[j], tops[j + 1], 0.034, paint(PALE, 0.89));
      }
    } else if (module.kind === 1) {
      // AI: a thinking lattice of independent micro-cubes and signal threads.
      const nodes: V3[] = Array.from({ length: 9 }, (_, j) => {
        const angle = j * Math.PI * 2 / 9;
        return [
          p[0] + Math.cos(angle) * block[0] * 0.32,
          p[1] + Math.sin(angle) * block[1] * 0.30 +
            Math.sin(time * 0.85 + j) * 0.06,
          front + 0.12 + Math.sin(time * 0.32 + j) * 0.07,
        ];
      });
      nodes.forEach((n, j) => {
        const pulse = 0.5 + 0.5 * Math.sin(time * 1.45 + j * 0.71);
        mesh.box(n, [0.12 + pulse * 0.07, 0.12 + pulse * 0.07, 0.12],
          paint(j % 3 === 0 ? PALE : VIOLET, 0.64 + pulse * 0.33));
        mesh.beam(n, nodes[(j + 3) % nodes.length], 0.017,
          paint(mix(BLUE, VIOLET, 0.5), 0.54));
      });
    } else if (module.kind === 2) {
      // AUDIENCE: shifting populations of modular tokens, not a flat histogram.
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 5; col++) {
          const j = row * 5 + col;
          const pulse = 0.5 + 0.5 * Math.sin(time * 0.95 + j * 0.68);
          mesh.box([
            p[0] + (col - 2) * block[0] * 0.17,
            p[1] + (row - 1) * block[1] * 0.23,
            front + 0.11 + pulse * 0.10,
          ], [0.14, 0.14, 0.10 + pulse * 0.11],
          paint(j % 4 === 0 ? PALE : CORAL, 0.47 + pulse * 0.45));
        }
      }
    } else {
      // BRAND REACH: concentric 3D broadcast hoops with orbiting transmitters.
      for (let ring = 0; ring < 3; ring++) {
        mesh.ring([p[0], p[1], front + 0.16],
          0.25 + ring * 0.21 +
            Math.sin(time * 0.40 + ring * 1.14) * 0.04,
          -0.22 + ring * 0.31, time * (ring % 2 ? -0.15 : 0.13),
          paint(ring === 1 ? PALE : BLUE, 0.69 - ring * 0.11), 0.028);
      }
      for (let j = 0; j < 3; j++) {
        const angle = time * 0.37 + j * Math.PI * 2 / 3;
        mesh.box([p[0] + Math.cos(angle) * 0.60,
          p[1] + Math.sin(angle) * 0.42, front + 0.20],
        [0.105, 0.105, 0.10], paint(j === 1 ? CORAL : BLUE, 0.91));
      }
    }
  });

  // Clearly connected architecture. Each conduit is physically extruded 3D,
  // with twin smaller moving prisms circulating to and from the center.
  modules.forEach((module, index) => {
    const destination = modulePositions[index];
    const tint = module.color;
    const control: V3 = [
      (core[0] + destination[0]) * 0.52 +
        (index % 2 ? -0.31 : 0.31),
      (core[1] + destination[1]) * 0.46 +
        (index % 2 ? 0.22 : -0.22),
      1.85 + index * 0.07,
    ];
    let previous: V3 = core;
    const segments = compact ? 11 : 17;
    for (let j = 1; j <= segments; j++) {
      const next = bezier(core, control, destination, j / segments);
      mesh.beam(previous, next, 0.070,
        paint(tint, dark ? 0.32 : 0.27));
      mesh.beam(previous, next, 0.018, paint(PALE, 0.69));
      previous = next;
    }
    for (let k = 0; k < 3; k++) {
      const progress = (time * (0.085 + k * 0.015) + index * 0.16 + k / 3) % 1;
      const point = bezier(core, control, destination, progress);
      const size = k === 0 ? 0.15 : 0.105;
      mesh.box(point, [size, size, size],
        paint(k === 2 ? PALE : tint, 0.96), time * 0.54 + k * 1.4);
    }
    for (let relay = 0; relay < 2; relay++) {
      const point = bezier(core, control, destination, 0.31 + relay * 0.35);
      mesh.box([point[0], point[1], point[2] - 0.08],
        [0.19, 0.19, 0.19], paint(mix(tint, glass, 0.34), 0.79));
      mesh.box([point[0], point[1], point[2] + 0.07],
        [0.085, 0.085, 0.10], paint(tint, 0.94));
    }
  });

  // Orbital data packets populate the negative space without text or clutter.
  const particles = compact ? 9 : 19;
  for (let j = 0; j < particles; j++) {
    const a = j * 2.39996 + time * (j % 2 ? 0.035 : -0.03);
    const r = 2.7 + (j % 5) * 0.49;
    const p: V3 = [
      Math.cos(a) * r * (compact ? 0.72 : 1),
      Math.sin(a) * (1.30 + (j % 4) * 0.40) * (compact ? 0.72 : 1),
      -1.1 + Math.sin(a * 1.7 + time * 0.15) * 0.60,
    ];
    const tint = j % 4 === 0 ? CORAL : j % 3 === 0 ? VIOLET : BLUE;
    mesh.box(p, [0.06, 0.06, 0.07], paint(tint, 0.32 + 0.28 *
      (0.5 + 0.5 * Math.sin(time * 0.70 + j))), a);
  }

  return new Float32Array(mesh.data);
}

export function MarketingIntelligence3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || fallback) return;
    const gl = canvas.getContext('webgl', {
      alpha: true,
      depth: true,
      antialias: true,
      premultipliedAlpha: false,
      powerPreference: 'low-power',
    });
    if (!gl) {
      setFallback(true);
      return;
    }
    const shader = initialize(gl);
    if (!shader || [shader.position, shader.normal, shader.color].some(n => n < 0)) {
      setFallback(true);
      return;
    }

    gl.useProgram(shader.program);
    gl.bindBuffer(gl.ARRAY_BUFFER, shader.buffer);
    const stride = 10 * 4;
    gl.enableVertexAttribArray(shader.position);
    gl.enableVertexAttribArray(shader.normal);
    gl.enableVertexAttribArray(shader.color);
    gl.vertexAttribPointer(shader.position, 3, gl.FLOAT, false, stride, 0);
    gl.vertexAttribPointer(shader.normal, 3, gl.FLOAT, false, stride, 12);
    gl.vertexAttribPointer(shader.color, 4, gl.FLOAT, false, stride, 24);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.disable(gl.CULL_FACE);
    gl.clearColor(0, 0, 0, 0);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const dark = theme === 'dark';
    let width = 1;
    let height = 1;
    let frame = 0;
    let lastFrame = 0;
    let yaw = -0.12;
    let pitch = -0.08;
    let targetYaw = -0.12;
    let targetPitch = -0.08;
    let stopped = false;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const compact = width < 720;
      const ratio = Math.min(window.devicePixelRatio || 1, compact ? 1.2 : 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const pointer = (event: PointerEvent) => {
      if (reduced.matches || width < 720) return;
      targetYaw = -0.12 + (event.clientX / Math.max(window.innerWidth, 1) - 0.5) * 0.37;
      targetPitch = -0.08 + (event.clientY / Math.max(window.innerHeight, 1) - 0.5) * -0.24;
    };

    const render = (elapsed: number) => {
      if (stopped) return;
      const compact = width < 720;
      yaw = lerp(yaw, reduced.matches ? -0.12 : targetYaw, 0.055);
      pitch = lerp(pitch, reduced.matches ? -0.08 : targetPitch, 0.055);
      const staticTime = reduced.matches ? 1.45 : elapsed * 0.001;
      const geometry = buildScene(staticTime, dark, compact);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.useProgram(shader.program);
      gl.uniform1f(shader.aspect, width / height);
      gl.uniform1f(shader.yaw, yaw + (reduced.matches ? 0 :
        Math.sin(staticTime * 0.08) * 0.055));
      gl.uniform1f(shader.pitch, pitch);
      gl.uniform1f(shader.zoom, compact ? 11.3 : 8.4);
      gl.bindBuffer(gl.ARRAY_BUFFER, shader.buffer);
      gl.bufferData(gl.ARRAY_BUFFER, geometry, gl.DYNAMIC_DRAW);
      gl.drawArrays(gl.TRIANGLES, 0, geometry.length / 10);
    };

    const tick = (now: number) => {
      frame = 0;
      if (stopped || document.hidden || reduced.matches) return;
      const interval = width < 720 ? 48 : 36;
      if (now - lastFrame >= interval) {
        render(now);
        lastFrame = now;
      }
      frame = window.requestAnimationFrame(tick);
    };

    const activity = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      if (stopped) return;
      if (!document.hidden) {
        render(reduced.matches ? 1450 : performance.now());
        if (!reduced.matches) frame = window.requestAnimationFrame(tick);
      }
    };

    const contextLost = (event: Event) => {
      event.preventDefault();
      stopped = true;
      setFallback(true);
    };

    const observer = new ResizeObserver(() => {
      resize();
      render(reduced.matches ? 1450 : performance.now());
    });
    observer.observe(canvas);
    canvas.addEventListener('webglcontextlost', contextLost, false);
    window.addEventListener('pointermove', pointer, { passive: true });
    document.addEventListener('visibilitychange', activity);
    reduced.addEventListener('change', activity);
    resize();
    activity();

    return () => {
      stopped = true;
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener('webglcontextlost', contextLost);
      window.removeEventListener('pointermove', pointer);
      document.removeEventListener('visibilitychange', activity);
      reduced.removeEventListener('change', activity);
      gl.deleteBuffer(shader.buffer);
      gl.deleteProgram(shader.program);
    };
  }, [theme, fallback]);

  if (fallback) return <MarketingIntelligenceCanvas />;
  return <canvas ref={canvasRef} className="home-intelligence-canvas home-intelligence-3d"
    aria-hidden="true" />;
}
