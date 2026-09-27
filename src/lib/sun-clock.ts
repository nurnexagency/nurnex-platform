/** Shared sun cycle so the hero sun and the ocean glint stay in sync. */
export const SUN_PERIOD_S = 40;

/** Viewport height (vh from top) where the ocean shader draws its horizon. */
export const HORIZON_VH = 57;

const OCEAN_HEIGHT_VH = 50;
const REDUCED_MOTION_PHASE = 0.3;

const origin = typeof performance !== "undefined" ? performance.now() : 0;

export interface SunState {
  xPct: number;
  yVh: number;
  elevation: number;
  opacity: number;
  color: [number, number, number];
}

const LOW: [number, number, number] = [255, 110, 45];
const HIGH: [number, number, number] = [255, 228, 175];

export function getSunState(now: number, reduceMotion: boolean): SunState {
  const phase = reduceMotion
    ? REDUCED_MOTION_PHASE
    : (((now - origin) / 1000) / SUN_PERIOD_S) % 1;
  const elevation = Math.sin(Math.PI * phase);
  const xPct = 6 + 88 * phase;
  const yVh = HORIZON_VH + 5 - 48 * elevation;
  const opacity = Math.min(1, Math.max(0, (elevation - 0.06) / 0.14));
  const k = Math.min(1, elevation * 1.4);
  const color = LOW.map((c, i) => Math.round(c + (HIGH[i] - c) * k)) as [number, number, number];
  return { xPct, yVh, elevation, opacity, color };
}

/** Sun direction in the ocean shader's camera space for a canvas of the given aspect. */
export function sunDirection(state: SunState, aspect: number): [number, number, number] {
  const x = (state.xPct / 100 - 0.5) * aspect;
  const y = (HORIZON_VH - state.yVh) / OCEAN_HEIGHT_VH;
  const z = -1.6;
  const len = Math.hypot(x, y, z);
  return [x / len, y / len, z / len];
}
