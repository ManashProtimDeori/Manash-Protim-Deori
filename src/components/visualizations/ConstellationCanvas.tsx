import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface NodePoint {
  id: string;
  label: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  radius: number;
  category: 'core' | 'discipline' | 'bridge';
}

const NODES_DATA = [
  { id: 'marketing', label: 'Marketing', category: 'discipline' as const, radius: 5 },
  { id: 'strategy', label: 'Strategy', category: 'discipline' as const, radius: 5 },
  { id: 'analytics', label: 'Analytics', category: 'discipline' as const, radius: 5 },
  { id: 'ai', label: 'AI & Systems', category: 'discipline' as const, radius: 5.5 },
  { id: 'technology', label: 'Technology', category: 'discipline' as const, radius: 4.5 },
  { id: 'research', label: 'Research', category: 'bridge' as const, radius: 4 },
  { id: 'creativity', label: 'Creativity', category: 'bridge' as const, radius: 4 },
  { id: 'business', label: 'Business', category: 'core' as const, radius: 5.5 },
  { id: 'automation', label: 'Automation', category: 'bridge' as const, radius: 4 },
  { id: 'intelligence', label: 'Intelligence', category: 'core' as const, radius: 5 }
];

export const ConstellationCanvas: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  const [activeNode, setActiveNode] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let isVisible = true;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Track mouse
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      isHovered: false
    };

    let nodes: NodePoint[] = [];

    const initNodes = (w: number, h: number) => {
      const centerX = w * 0.5;
      const centerY = h * 0.5;
      const radiusX = Math.min(w * 0.38, 280);
      const radiusY = Math.min(h * 0.38, 160);

      nodes = NODES_DATA.map((item, index) => {
        const angle = (index / NODES_DATA.length) * Math.PI * 2;
        // Distribute nicely with organic offsets
        const jitterX = (Math.random() - 0.5) * 40;
        const jitterY = (Math.random() - 0.5) * 30;
        const x = centerX + Math.cos(angle) * radiusX + jitterX;
        const y = centerY + Math.sin(angle) * radiusY + jitterY;

        return {
          ...item,
          x,
          y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          baseX: x,
          baseY: y,
        };
      });
    };

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initNodes(width, height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.isHovered = false;
      setActiveNode(null);
    };

    // Intersection observer to pause rendering when scrolled out of view
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(container);

    handleResize();
    window.addEventListener('resize', handleResize);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    const isDark = theme === 'dark';

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Colors based on theme
      const nodeFill = isDark ? '#f59e0b' : '#d97706'; // warm amber
      const nodeGlow = isDark ? 'rgba(245, 158, 11, 0.25)' : 'rgba(217, 119, 6, 0.15)';
      const lineColor = isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(15, 23, 42, 0.08)';
      const activeLineColor = isDark ? 'rgba(245, 158, 11, 0.35)' : 'rgba(217, 119, 6, 0.4)';
      const textColor = isDark ? '#a3a3a3' : '#525252';
      const textHighlight = isDark ? '#ffffff' : '#0f172a';

      // Update positions
      nodes.forEach(node => {
        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;

          // Tether to base position
          const dx = node.baseX - node.x;
          const dy = node.baseY - node.y;
          node.vx += dx * 0.002;
          node.vy += dy * 0.002;

          // Drag/damping
          node.vx *= 0.98;
          node.vy *= 0.98;

          // Mouse attraction/repulsion
          if (mouse.isHovered) {
            const distMouseX = mouse.x - node.x;
            const distMouseY = mouse.y - node.y;
            const distMouse = Math.sqrt(distMouseX * distMouseX + distMouseY * distMouseY);

            if (distMouse < 140) {
              // Gentle attraction towards cursor
              const force = (1 - distMouse / 140) * 0.8;
              node.vx += (distMouseX / distMouse) * force;
              node.vy += (distMouseY / distMouse) * force;
            }
          }
        }
      });

      // Find closest node to mouse for hover highlight
      let hoveredNode: NodePoint | null = null;
      if (mouse.isHovered) {
        let minDist = 35;
        nodes.forEach(node => {
          const d = Math.hypot(mouse.x - node.x, mouse.y - node.y);
          if (d < minDist) {
            minDist = d;
            hoveredNode = node;
          }
        });
      }
      setActiveNode(hoveredNode ? (hoveredNode as NodePoint).label : null);

      // Draw connections
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);

          const maxDist = 180;
          if (dist < maxDist) {
            const alpha = 1 - dist / maxDist;
            const target = hoveredNode as NodePoint | null;
            const isNearHover = Boolean(target && (a.id === target.id || b.id === target.id));

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = isNearHover ? activeLineColor : lineColor;
            ctx.globalAlpha = isNearHover ? 0.8 : alpha * 0.7;
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }
        }
      }

      // Draw Nodes & Labels
      nodes.forEach(node => {
        const isHovered = hoveredNode && (hoveredNode as NodePoint).id === node.id;
        const currentRadius = isHovered ? node.radius * 1.5 : node.radius;

        // Outer glow on hover
        if (isHovered) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, currentRadius + 8, 0, Math.PI * 2);
          ctx.fillStyle = nodeGlow;
          ctx.fill();
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? (isDark ? '#fbbf24' : '#b45309') : nodeFill;
        ctx.fill();

        // Node Label
        ctx.font = isHovered ? '600 12px "JetBrains Mono", monospace' : '500 11px "JetBrains Mono", monospace';
        ctx.fillStyle = isHovered ? textHighlight : textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.label, node.x, node.y + currentRadius + 14);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, [theme]);

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full h-full min-h-[320px] md:min-h-[420px] select-none ${className}`}
      aria-label="Interactive intelligence knowledge constellation"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block cursor-crosshair" />
      <div className="absolute bottom-3 right-4 pointer-events-none text-[11px] font-mono text-neutral-500/80 dark:text-neutral-500 flex items-center gap-1.5">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400/80 animate-pulse" />
        <span>{activeNode ? `Focus: ${activeNode}` : 'Live System Constellation · Hover to interact'}</span>
      </div>
    </div>
  );
};
