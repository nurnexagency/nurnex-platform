"use client";

import CanvasScene, { type SceneFactory } from "./canvas-scene";

interface Particle {
  x: number;
  y: number;
  age: number;
  life: number;
}

const SWIRL_RADIUS = 160;

/** Process: a current flowing downward through the phases; the cursor stirs a vortex into it. */
const createCurrentFlow: SceneFactory = (ctx) => {
  let w = 0;
  let h = 0;
  let particles: Particle[] = [];

  const respawn = (p: Particle, anywhere: boolean) => {
    p.x = Math.random() * w;
    p.y = anywhere ? Math.random() * h : Math.random() * h * 0.15;
    p.age = 0;
    p.life = 4 + Math.random() * 6;
  };

  return {
    resize(nw, nh) {
      w = nw;
      h = nh;
      const count = Math.max(80, Math.min(260, Math.floor((w * h) / 9000)));
      particles = Array.from({ length: count }, () => {
        const p = { x: 0, y: 0, age: 0, life: 0 };
        respawn(p, true);
        p.age = Math.random() * p.life;
        return p;
      });
      ctx.clearRect(0, 0, w, h);
    },

    frame(t, dt, pointer) {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.07)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
      ctx.lineWidth = 1.1;

      for (const p of particles) {
        const angle =
          Math.sin(p.x * 0.004 + t * 0.2) * 1.3 +
          Math.cos(p.y * 0.005 - t * 0.15) * 1.3 +
          Math.sin((p.x + p.y) * 0.002) * 0.8;
        let vx = Math.cos(angle) * 28;
        let vy = Math.sin(angle) * 28 + 26;

        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < SWIRL_RADIUS && d > 1) {
            const f = (1 - d / SWIRL_RADIUS) * 140;
            vx += (-dy / d) * f;
            vy += (dx / d) * f;
          }
        }

        const nx = p.x + vx * dt;
        const ny = p.y + vy * dt;
        const fade = Math.sin((p.age / p.life) * Math.PI);
        const near = pointer.active && Math.hypot(nx - pointer.x, ny - pointer.y) < SWIRL_RADIUS;
        ctx.strokeStyle = near
          ? `rgba(255,190,120,${(fade * 0.7).toFixed(3)})`
          : `rgba(196,120,43,${(fade * 0.32).toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        p.x = nx;
        p.y = ny;
        p.age += dt;
        if (p.age > p.life || p.y > h + 10 || p.x < -10 || p.x > w + 10) respawn(p, false);
      }
    },
  };
};

export default function CurrentFlowBg() {
  return <CanvasScene create={createCurrentFlow} />;
}
