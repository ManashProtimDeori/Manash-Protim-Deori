import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * Original animated 3D-perspective topographic wavefield, stylistically inspired
 * by the open-source Vanta Waves effect (https://github.com/tengbao/vanta).
 * No source copied, no WebGL runtime, extra dependencies or remote assets.
 *
 * Draws a perspective-projected, time-varying 3D surface on a Canvas 2D layer.
 * Keeps its canvas at a capped device-pixel ratio and frames at <= 30fps.
 * Stops when the browser tab is hidden or reduced motion is requested.
 */
export const WavefieldCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 1;
    let height = 1;
    let ratio = 1;
    let frame = 0;
    let lastFrame = 0;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const render = (now: number) => {
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);

      const seconds = now * 0.001;
      const phase = seconds * 0.62;
      const isDark = theme === 'dark';
      const rows = 28;
      const columns = 54;

      // The grid runs away from the viewer into a distant horizon.
      // Mathematical height variations are transformed into screen-space
      // elevation, giving the ribbons a continuously moving 3D silhouette.
      const vertex = (column: number, row: number) => {
        const u = column / columns;
        const v = row / rows;
        const x = (u - 0.5) * 2.25;
        const z = v * 2.9 - 1.45;
        const heightField =
          Math.sin(x * 3.15 + z * 1.34 - phase * 1.7) * 0.22 +
          Math.cos(z * 4.3 - x * 1.1 + phase * 1.1) * 0.13 +
          Math.sin((x * x + z * z) * 1.4 - phase) * 0.08;

        const perspective = 0.28 + v * 0.87;
        return {
          x: width * 0.5 + x * width * 0.47 * perspective,
          y: height * (0.16 + v * 0.78) - heightField * height * (0.12 + v * 0.18),
        };
      };

      // A pair of diffuse, low-contrast atmospheric lights behind the mesh.
      const halo = context.createRadialGradient(
        width * 0.63, height * 0.48, 4,
        width * 0.63, height * 0.48, width * 0.67
      );
      halo.addColorStop(0, isDark ? 'rgba(59,145,168,.22)' : 'rgba(124,174,193,.25)');
      halo.addColorStop(1, 'rgba(0,0,0,0)');
      context.fillStyle = halo;
      context.fillRect(0, 0, width, height);

      // Filled ribbons create softly shaded undulating solid-surface facets.
      for (let row = 0; row < rows; row++) {
        context.beginPath();
        for (let column = 0; column <= columns; column++) {
          const point = vertex(column, row);
          if (column === 0) context.moveTo(point.x, point.y);
          else context.lineTo(point.x, point.y);
        }
        for (let column = columns; column >= 0; column--) {
          const point = vertex(column, row + 1);
          context.lineTo(point.x, point.y);
        }
        context.closePath();
        const strength = 0.022 + (row / rows) * 0.075;
        context.fillStyle = isDark
          ? 'rgba(124,183,189,' + strength.toFixed(3) + ')'
          : 'rgba(60,116,142,' + strength.toFixed(3) + ')';
        context.fill();
      }

      // Main flowing horizontal contours.
      for (let row = 0; row <= rows; row++) {
        const depth = row / rows;
        const opacity = 0.14 + depth * 0.44;
        context.beginPath();
        for (let column = 0; column <= columns; column++) {
          const point = vertex(column, row);
          if (column === 0) context.moveTo(point.x, point.y);
          else context.lineTo(point.x, point.y);
        }
        context.lineWidth = 0.8 + depth * 0.85;
        context.strokeStyle = isDark
          ? 'rgba(148,212,218,' + opacity.toFixed(3) + ')'
          : 'rgba(45,107,132,' + opacity.toFixed(3) + ')';
        context.stroke();
      }

      // Cross contours provide depth while remaining less visually busy.
      for (let column = 0; column <= columns; column += 3) {
        context.beginPath();
        for (let row = 0; row <= rows; row++) {
          const point = vertex(column, row);
          if (row === 0) context.moveTo(point.x, point.y);
          else context.lineTo(point.x, point.y);
        }
        context.lineWidth = 0.75;
        context.strokeStyle = isDark ? 'rgba(160,175,204,.20)' : 'rgba(71,120,146,.20)';
        context.stroke();
      }

      // A warm glint drifts across the wave surface.
      const glintIndex = Math.floor((Math.sin(phase * 0.67) * 0.5 + 0.5) * (rows - 5)) + 2;
      context.beginPath();
      for (let column = 0; column <= columns; column++) {
        const point = vertex(column, glintIndex);
        if (column === 0) context.moveTo(point.x, point.y);
        else context.lineTo(point.x, point.y);
      }
      const glow = context.createLinearGradient(0, 0, width, 0);
      glow.addColorStop(0, 'rgba(186,132,86,0)');
      glow.addColorStop(0.52, isDark ? 'rgba(230,180,127,.49)' : 'rgba(183,119,65,.40)');
      glow.addColorStop(1, 'rgba(186,132,86,0)');
      context.lineWidth = 1.8;
      context.strokeStyle = glow;
      context.stroke();
    };

    const runFrame = (time: number) => {
      frame = 0;
      if (document.hidden || reduceMotion.matches) return;
      if (time - lastFrame >= 33) {
        render(time);
        lastFrame = time;
      }
      frame = window.requestAnimationFrame(runFrame);
    };

    const updateActivity = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      if (document.hidden || reduceMotion.matches) {
        // In reduced-motion mode a frozen landscape remains available.
        render(0);
      } else {
        frame = window.requestAnimationFrame(runFrame);
      }
    };

    const observer = new ResizeObserver(() => {
      resize();
      if (document.hidden || reduceMotion.matches) render(0);
    });
    observer.observe(canvas);
    resize();
    render(0);
    updateActivity();
    document.addEventListener('visibilitychange', updateActivity);
    reduceMotion.addEventListener('change', updateActivity);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener('visibilitychange', updateActivity);
      reduceMotion.removeEventListener('change', updateActivity);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="home-wavefield-canvas" aria-hidden="true" />;
};
