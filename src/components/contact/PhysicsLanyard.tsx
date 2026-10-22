"use client";

import React, { useEffect, useRef } from "react";
import { sfx } from "@/lib/audio";

export function PhysicsLanyard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 320);
    let height = (canvas.height = 380);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Physics parameters for hanging badge pendulum
    const anchor = { x: width / 2, y: 15 };
    const ropeLength = 130;
    const cardW = 150;
    const cardH = 210;

    let angle = 0;
    let angularVel = 0;
    const gravity = 0.0035;
    const damping = 0.985;

    // Dragging state
    let isDragging = false;
    let dragOffsetAngle = 0;
    let lastMouseX = 0;
    let mouseVx = 0;

    const handlePointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      // Card center position
      const cardX = anchor.x + Math.sin(angle) * ropeLength;
      const cardY = anchor.y + Math.cos(angle) * ropeLength + cardH / 2;

      // Check if clicked near card
      if (Math.abs(mx - cardX) < cardW / 2 + 20 && Math.abs(my - cardY) < cardH / 2 + 30) {
        isDragging = true;
        canvas.setPointerCapture(e.pointerId);
        lastMouseX = mx;
        sfx.playMechanicalSwitch();
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      mouseVx = mx - lastMouseX;
      lastMouseX = mx;

      // Calculate angle from anchor
      const dx = mx - anchor.x;
      const dy = Math.max(30, my - anchor.y);
      const targetAngle = Math.atan2(dx, dy);
      angle = Math.max(-1.1, Math.min(1.1, targetAngle));
      angularVel = 0;
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      angularVel = (mouseVx * 0.005);
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        // ignored
      }
      sfx.playSynthHum();
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointercancel", handlePointerUp);

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (!isDragging) {
        // Pendulum physics: angular acceleration = -(g / L) * sin(theta)
        const angularAcc = -(gravity) * Math.sin(angle);
        angularVel += angularAcc;
        angularVel *= damping;
        angle += angularVel;
      }

      // Card attachment point at end of ribbon
      const attachX = anchor.x + Math.sin(angle) * ropeLength;
      const attachY = anchor.y + Math.cos(angle) * ropeLength;

      // 1. Draw Ribbon / Lanyard Strap
      ctx.save();
      ctx.strokeStyle = "#18181b";
      ctx.lineWidth = 14;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(anchor.x - 6, anchor.y);
      ctx.lineTo(attachX - 4, attachY);
      ctx.stroke();

      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(anchor.x - 6, anchor.y);
      ctx.lineTo(attachX - 4, attachY);
      ctx.stroke();

      // Top Anchor Clip
      ctx.fillStyle = "#27272a";
      ctx.beginPath();
      ctx.arc(anchor.x, anchor.y, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 2. Draw Hanging Metal Swivel Clip
      ctx.save();
      ctx.translate(attachX, attachY);
      ctx.rotate(angle);

      ctx.fillStyle = "#52525b";
      ctx.fillRect(-6, -6, 12, 10);
      ctx.strokeStyle = "#d4d4d8";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(-4, 4, 8, 8);
      ctx.restore();

      // 3. Draw Hanging 3D Developer Pass Card
      ctx.save();
      ctx.translate(attachX, attachY + 12);
      ctx.rotate(angle);

      // Card Drop Shadow
      ctx.shadowColor = "rgba(0, 0, 0, 0.75)";
      ctx.shadowBlur = 24;
      ctx.shadowOffsetY = 12;

      // Card Body
      ctx.fillStyle = "#09090b";
      ctx.beginPath();
      ctx.roundRect(-cardW / 2, 0, cardW, cardH, 12);
      ctx.fill();

      // Border with subtle red sheen
      ctx.strokeStyle = isDragging ? "#ef4444" : "rgba(239, 68, 68, 0.4)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Inner subtle glass bevel
      ctx.shadowColor = "transparent";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(-cardW / 2 + 4, 4, cardW - 8, cardH - 8, 8);
      ctx.stroke();

      // Punch hole for clip
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.roundRect(-10, 8, 20, 5, 2.5);
      ctx.fill();

      // Holographic Sakura Emblem on Card
      ctx.save();
      ctx.translate(0, 52);
      ctx.beginPath();
      ctx.arc(0, 0, 22, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(239, 68, 68, 0.15)";
      ctx.fill();
      ctx.strokeStyle = "rgba(239, 68, 68, 0.6)";
      ctx.stroke();

      // Mini Sakura flower petals
      for (let i = 0; i < 5; i++) {
        ctx.save();
        ctx.rotate((i * 72 * Math.PI) / 180);
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(0, -11, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Developer Text
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 11px monospace";
      ctx.textAlign = "center";
      ctx.fillText("SAMARTH PATIL", 0, 96);

      ctx.fillStyle = "#ef4444";
      ctx.font = "9px monospace";
      ctx.fillText("ISE STUDENT & BUILDER", 0, 110);

      ctx.fillStyle = "#71717a";
      ctx.font = "8px monospace";
      ctx.fillText("LostEmperor08 • ID #008", 0, 126);

      // Status Pill
      ctx.fillStyle = "rgba(16, 185, 129, 0.15)";
      ctx.beginPath();
      ctx.roundRect(-42, 140, 84, 18, 9);
      ctx.fill();
      ctx.strokeStyle = "rgba(16, 185, 129, 0.4)";
      ctx.stroke();

      ctx.fillStyle = "#10b981";
      ctx.beginPath();
      ctx.arc(-26, 149, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#10b981";
      ctx.font = "8px monospace";
      ctx.fillText("BANGALORE • LIVE", 6, 152);

      // Barcode at bottom
      ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
      for (let b = -50; b < 50; b += 5) {
        const barW = (b % 10 === 0) ? 2.5 : 1.2;
        ctx.fillRect(b, 178, barW, 14);
      }

      ctx.restore();

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointercancel", handlePointerUp);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl shadow-xl select-none">
      <div className="w-full text-center mb-1">
        <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
          Interactive 3D Developer Pass
        </span>
        <p className="text-[10px] font-mono text-zinc-500">
          Grab & flick the pass to test pendulum physics
        </p>
      </div>
      <canvas
        ref={canvasRef}
        className="cursor-grab active:cursor-grabbing touch-none"
      />
    </div>
  );
}
