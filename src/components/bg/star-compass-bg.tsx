"use client";

import CanvasScene, { type SceneFactory } from "./canvas-scene";

interface Star {
  r: number;
  a: number;
  size: number;
  twinkle: number;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

const ROTATION = 0.025;

/** Regions: night-sky star trails wheeling around a copper North Star; the cursor shifts the sky. */
const createStarCompass: SceneFactory = (ctx) => {
  let w = 0;
  let h = 0;
  let stars: Star[] = [];
  let meteor: Meteor | null = null;
  let meteorTimer = 4;
  let px = 0;
  let py = 0;

  return {
    resize(nw, nh) {
      w = nw;
      h = nh;
      px = w / 2;
      py = h * 0.08;
      const diag = Math.hypot(w, h);
      const count = Math.max(150, Math.min(420, Math.floor((w * h) / 3500)));
      stars = Array.from({ length: count }, () => ({
        r: 20 + Math.sqrt(Math.random()) * diag,
        a: Math.random() * Math.PI * 2,
        size: Math.random() < 0.08 ? 1.6 : 0.5 + Math.random() * 0.8,
        twinkle: Math.random() * Math.PI * 2,
      }));
      ctx.clearRect(0, 0, w, h);
    },

    frame(t, dt, pointer) {
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.1)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";

      const tx = w / 2 + (pointer.active ? (pointer.x - w / 2) * 0.04 : 0);
      const ty = h * 0.08 + (pointer.active ? (pointer.y - h / 2) * 0.03 : 0);
      px += (tx - px) * Math.min(1, dt * 2);
      py += (ty - py) * Math.min(1, dt * 2);

      for (const s of stars) {
        s.a += ROTATION * dt;
        const x = px + Math.cos(s.a) * s.r;
        const y = py + Math.sin(s.a) * s.r;
        if (x < -2 || x > w + 2 || y < -2 || y > h + 2) continue;
        const tw = 0.55 + 0.45 * Math.sin(t * 1.8 + s.twinkle);
        ctx.fillStyle = `rgba(220,228,240,${(tw * 0.7).toFixed(3)})`;
        ctx.fillRect(x, y, s.size, s.size);
      }

      const glow = ctx.createRadialGradient(px, py, 0, px, py, 46);
      glow.addColorStop(0, "rgba(255,200,130,0.55)");
      glow.addColorStop(0.3, "rgba(196,120,43,0.18)");
      glow.addColorStop(1, "rgba(196,120,43,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(px - 46, py - 46, 92, 92);
      ctx.strokeStyle = "rgba(255,210,150,0.55)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(px - 14, py);
      ctx.lineTo(px + 14, py);
      ctx.moveTo(px, py - 14);
      ctx.lineTo(px, py + 14);
      ctx.stroke();
      ctx.fillStyle = "#fff4e0";
      ctx.beginPath();
      ctx.arc(px, py, 2.2, 0, Math.PI * 2);
      ctx.fill();

      meteorTimer -= dt;
      if (!meteor && meteorTimer <= 0) {
        const fromLeft = Math.random() < 0.5;
        meteor = {
          x: fromLeft ? Math.random() * w * 0.5 : w * 0.5 + Math.random() * w * 0.5,
          y: Math.random() * h * 0.4,
          vx: (fromLeft ? 1 : -1) * (420 + Math.random() * 200),
          vy: 180 + Math.random() * 120,
          life: 0.9,
        };
        meteorTimer = 6 + Math.random() * 6;
      }
      if (meteor) {
        const m = meteor;
        const nx = m.x + m.vx * dt;
        const ny = m.y + m.vy * dt;
        ctx.strokeStyle = `rgba(255,220,180,${(m.life * 0.9).toFixed(3)})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(nx, ny);
        ctx.stroke();
        m.x = nx;
        m.y = ny;
        m.life -= dt;
        if (m.life <= 0) meteor = null;
      }
    },
  };
};

export default function StarCompassBg() {
  return <CanvasScene create={createStarCompass} />;
}
