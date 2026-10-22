"use client";

import { useEffect, useRef } from "react";

interface Petal {
  type: "petal" | "ember";
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVy: number;
  size: number;
  angle: number;
  angularSpeed: number;
  flip: number;
  flipSpeed: number;
  opacity: number;
  swaySpeed: number;
  swayOffset: number;
  color: string;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
}

export function SakuraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let animationFrameId: number;
    let isPaused = false;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const updateSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    // Mouse velocity & wind tracking
    const mouse = {
      x: -1000,
      y: -1000,
      prevX: -1000,
      prevY: -1000,
      vx: 0,
      vy: 0,
      active: false,
      radius: 140,
    };

    // Shockwave ripples on click
    const shockwaves: Shockwave[] = [];

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0]?.clientX ?? -1000 : e.clientX;
      const clientY = "touches" in e ? e.touches[0]?.clientY ?? -1000 : e.clientY;

      if (mouse.prevX > 0) {
        mouse.vx = (clientX - mouse.prevX) * 0.4;
        mouse.vy = (clientY - mouse.prevY) * 0.4;
      }
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = clientX;
      mouse.y = clientY;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    // Click triggers shockwave ripple
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0]?.clientX ?? 0 : e.clientX;
      const clientY = "touches" in e ? e.touches[0]?.clientY ?? 0 : e.clientY;

      shockwaves.push({
        x: clientX,
        y: clientY,
        radius: 0,
        maxRadius: Math.min(width, height) * 0.45,
        opacity: 0.65,
        speed: 8.5,
      });
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("mouseleave", handlePointerLeave);
    window.addEventListener("touchend", handlePointerLeave);
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });

    // Petal & Ember particle generation
    const totalCount = width < 768 ? 36 : 64;
    const particles: Petal[] = [];

    const createParticle = (initialYRandom = true): Petal => {
      const isEmber = Math.random() < 0.28; // 28% crimson embers, 72% white sakura petals
      const opacity = isEmber ? 0.35 + Math.random() * 0.5 : 0.3 + Math.random() * 0.5;

      return {
        type: isEmber ? "ember" : "petal",
        x: Math.random() * width,
        y: initialYRandom
          ? Math.random() * height
          : isEmber
          ? height + 10 + Math.random() * 20
          : -20 - Math.random() * 40,
        vx: (Math.random() - 0.5) * 0.4,
        vy: isEmber ? -(0.5 + Math.random() * 0.8) : 0.7 + Math.random() * 0.9,
        baseVy: isEmber ? -(0.5 + Math.random() * 0.8) : 0.7 + Math.random() * 0.9,
        size: isEmber ? 2 + Math.random() * 3.5 : 7 + Math.random() * 7,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.025,
        flip: Math.random() * Math.PI,
        flipSpeed: 0.015 + Math.random() * 0.025,
        opacity,
        swaySpeed: 0.01 + Math.random() * 0.015,
        swayOffset: Math.random() * Math.PI * 2,
        color: isEmber
          ? `rgba(239, 68, 68, ${opacity})`
          : `rgba(255, 255, 255, ${opacity})`,
      };
    };

    for (let i = 0; i < totalCount; i++) {
      particles.push(createParticle(true));
    }

    let time = 0;

    const render = () => {
      if (isPaused) return;
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Damp mouse wind velocity
      mouse.vx *= 0.92;
      mouse.vy *= 0.92;

      // 1. Process & Draw Shockwave Ripples
      for (let sIdx = shockwaves.length - 1; sIdx >= 0; sIdx--) {
        const sw = shockwaves[sIdx];
        sw.radius += sw.speed;
        sw.opacity *= 0.96;

        if (sw.radius >= sw.maxRadius || sw.opacity <= 0.02) {
          shockwaves.splice(sIdx, 1);
          continue;
        }

        // Draw luminous shockwave illumination
        const grad = ctx.createRadialGradient(
          sw.x,
          sw.y,
          Math.max(0, sw.radius - 35),
          sw.x,
          sw.y,
          sw.radius + 15
        );
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.5, `rgba(239, 68, 68, ${sw.opacity * 0.35})`);
        grad.addColorStop(0.85, `rgba(255, 255, 255, ${sw.opacity * 0.2})`);
        grad.addColorStop(1, "transparent");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius + 15, 0, Math.PI * 2);
        ctx.fill();
      }

      const radiusSq = mouse.radius * mouse.radius;

      // 2. Process & Draw Petals and Embers
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.angle += p.angularSpeed;
          p.flip += p.flipSpeed;

          // Natural organic sway
          const naturalSway = Math.sin(time * p.swaySpeed + p.swayOffset) * 0.6;
          p.x += p.vx + naturalSway;
          p.y += p.vy;

          // Interactive wind currents from cursor
          if (mouse.active) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < radiusSq) {
              const dist = Math.sqrt(distSq) || 1;
              const force = (1 - dist / mouse.radius) * 2.8;

              // Radial push + tangential swirl from mouse momentum
              p.vx += (dx / dist) * force + mouse.vx * 0.05;
              p.vy += (dy / dist) * force + mouse.vy * 0.05;
            }
          }

          // Shockwave outward force field
          for (let sIdx = 0; sIdx < shockwaves.length; sIdx++) {
            const sw = shockwaves[sIdx];
            const dx = p.x - sw.x;
            const dy = p.y - sw.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;

            if (Math.abs(dist - sw.radius) < 40) {
              const shockForce = (1 - dist / sw.maxRadius) * 5.5 * sw.opacity;
              p.vx += (dx / dist) * shockForce;
              p.vy += (dy / dist) * shockForce;
            }
          }

          // Friction damping
          p.vx *= 0.94;
          p.vy = p.vy * 0.95 + p.baseVy * 0.05;

          // Screen wrapping
          if (p.type === "petal") {
            if (p.y > height + 30) particles[i] = createParticle(false);
          } else {
            // Embers drift upwards
            if (p.y < -30) particles[i] = createParticle(false);
          }
          if (p.x < -30) p.x = width + 20;
          if (p.x > width + 30) p.x = -20;
        }

        // Draw particle
        ctx.save();
        ctx.translate(p.x, p.y);

        if (p.type === "ember") {
          // Luminous ember particle with soft glow
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowColor = "#ef4444";
          ctx.shadowBlur = 8;
          ctx.fill();
        } else {
          // 3D tumbling white sakura petal
          ctx.rotate(p.angle);
          ctx.scale(Math.cos(p.flip), 1);

          ctx.fillStyle = p.color;
          ctx.beginPath();
          const s = p.size;
          ctx.moveTo(0, -s);
          ctx.bezierCurveTo(s * 0.55, -s * 0.7, s * 0.9, s * 0.1, 0, s);
          ctx.bezierCurveTo(-s * 0.9, s * 0.1, -s * 0.55, -s * 0.7, 0, -s);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isPaused = true;
        cancelAnimationFrame(animationFrameId);
      } else {
        if (isPaused) {
          isPaused = false;
          animationFrameId = requestAnimationFrame(render);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("mouseleave", handlePointerLeave);
      window.removeEventListener("touchend", handlePointerLeave);
      window.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-85 transition-opacity duration-1000"
    />
  );
}
