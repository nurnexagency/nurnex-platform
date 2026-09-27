"use client";

import CanvasScene, { type SceneFactory } from "./canvas-scene";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hub: boolean;
}

interface Pulse {
  a: number;
  b: number;
  p: number;
}

const LINK = 120;
const REACH = 190;
const MAX_SPEED = 40;

/** Services: a drifting data network that reaches toward the cursor and carries data pulses. */
const createConstellation: SceneFactory = (ctx) => {
  let w = 0;
  let h = 0;
  let nodes: Node[] = [];
  const pulses: Pulse[] = [];
  let pulseTimer = 0;

  const spawnPulse = () => {
    const a = Math.floor(Math.random() * nodes.length);
    const na = nodes[a];
    for (let tries = 0; tries < 12; tries++) {
      const b = Math.floor(Math.random() * nodes.length);
      if (b === a) continue;
      const nb = nodes[b];
      if (Math.hypot(na.x - nb.x, na.y - nb.y) < LINK) {
        pulses.push({ a, b, p: 0 });
        return;
      }
    }
  };

  return {
    resize(nw, nh) {
      w = nw;
      h = nh;
      const count = Math.max(40, Math.min(110, Math.floor((w * h) / 14000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.5) * 16,
        hub: Math.random() < 0.14,
      }));
      pulses.length = 0;
    },

    frame(_t, dt, pointer) {
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        if (pointer.active) {
          const dx = pointer.x - n.x;
          const dy = pointer.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d < REACH && d > 1) {
            n.vx += (dx / d) * 30 * dt;
            n.vy += (dy / d) * 30 * dt;
          }
        }
        const speed = Math.hypot(n.vx, n.vy);
        if (speed > MAX_SPEED) {
          n.vx = (n.vx / speed) * MAX_SPEED;
          n.vy = (n.vy / speed) * MAX_SPEED;
        }
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x < -10) n.x = w + 10;
        if (n.x > w + 10) n.x = -10;
        if (n.y < -10) n.y = h + 10;
        if (n.y > h + 10) n.y = -10;
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(139,157,181,${((1 - d / LINK) * 0.22).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      if (pointer.active) {
        for (const n of nodes) {
          const d = Math.hypot(pointer.x - n.x, pointer.y - n.y);
          if (d < REACH) {
            ctx.strokeStyle = `rgba(196,120,43,${((1 - d / REACH) * 0.55).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
          }
        }
        const g = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 60);
        g.addColorStop(0, "rgba(196,120,43,0.18)");
        g.addColorStop(1, "rgba(196,120,43,0)");
        ctx.fillStyle = g;
        ctx.fillRect(pointer.x - 60, pointer.y - 60, 120, 120);
      }

      for (const n of nodes) {
        const near = pointer.active && Math.hypot(pointer.x - n.x, pointer.y - n.y) < REACH;
        ctx.fillStyle = n.hub || near ? "rgba(196,120,43,0.85)" : "rgba(139,157,181,0.55)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.hub ? 2.2 : near ? 1.8 : 1.3, 0, Math.PI * 2);
        ctx.fill();
      }

      pulseTimer -= dt;
      if (pulseTimer <= 0 && pulses.length < 6 && nodes.length) {
        spawnPulse();
        pulseTimer = 0.35;
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.p += dt / 1.1;
        const a = nodes[pulse.a];
        const b = nodes[pulse.b];
        if (pulse.p >= 1 || !a || !b || Math.hypot(a.x - b.x, a.y - b.y) > LINK * 1.3) {
          pulses.splice(i, 1);
          continue;
        }
        const x = a.x + (b.x - a.x) * pulse.p;
        const y = a.y + (b.y - a.y) * pulse.p;
        ctx.fillStyle = "rgba(255,210,150,0.95)";
        ctx.shadowColor = "rgba(196,120,43,0.9)";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    },
  };
};

export default function ConstellationBg() {
  return <CanvasScene create={createConstellation} />;
}
