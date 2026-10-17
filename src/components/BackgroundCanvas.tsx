import React, { useEffect, useRef } from 'react';

/**
 * Animated Ambient Canvas Background
 * Renders subtle floating particles, gentle nebula gradients, and soft geometric elements
 * Highly optimized with requestAnimationFrame, throttled for performance
 */
export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle pool
    const particleCount = Math.min(35, Math.floor(width / 35));
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      pulseSpeed: number;
      angle: number;
    }

    const colors = [
      'rgba(139, 92, 246, ',  // Violet
      'rgba(6, 182, 212, ',   // Cyan
      'rgba(236, 72, 153, ',  // Pink / Magenta
      'rgba(251, 191, 36, ',  // Amber Gold
      'rgba(59, 130, 246, ',  // Sky Blue
    ];

    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2.5 + 1.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.4 + 0.15,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      angle: Math.random() * Math.PI * 2,
    }));

    let step = 0;

    const render = () => {
      step += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Subtle ambient glowing light gradient shifts
      const grad1X = width * 0.2 + Math.sin(step * 0.5) * 80;
      const grad1Y = height * 0.25 + Math.cos(step * 0.4) * 60;
      const g1 = ctx.createRadialGradient(grad1X, grad1Y, 10, grad1X, grad1Y, width * 0.45);
      g1.addColorStop(0, 'rgba(124, 58, 237, 0.07)'); // Violet glow
      g1.addColorStop(1, 'rgba(124, 58, 237, 0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      const grad2X = width * 0.8 + Math.cos(step * 0.6) * 90;
      const grad2Y = height * 0.75 + Math.sin(step * 0.5) * 70;
      const g2 = ctx.createRadialGradient(grad2X, grad2Y, 10, grad2X, grad2Y, width * 0.4);
      g2.addColorStop(0, 'rgba(6, 182, 212, 0.06)'); // Cyan glow
      g2.addColorStop(1, 'rgba(6, 182, 212, 0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      // Draw faint constellation connecting lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(147, 197, 253, ${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.pulseSpeed;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        const currentAlpha = p.alpha + Math.sin(p.angle) * 0.15;
        const safeAlpha = Math.max(0.05, Math.min(0.65, currentAlpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${safeAlpha})`;
        ctx.shadowColor = `${p.color}0.8)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      aria-hidden="true"
    />
  );
};
