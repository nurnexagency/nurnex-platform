"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { getSunState, sunDirection } from "@/lib/sun-clock";

const VERTEX = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAGMENT = `
precision highp float;
uniform float t;
uniform vec2 r;
uniform vec3 SUN;
uniform vec3 SUNCOL;

const vec3 BG = vec3(0.039, 0.122, 0.2);

float ocean(vec2 p, out vec2 g) {
  float y = 0.0;
  g = vec2(0.0);
  float a = 0.38;
  float f = 0.32;
  for (int i = 0; i < 9; i++) {
    float ang = float(i) * 1.7;
    vec2 d = normalize(vec2(1.0, 0.75 * sin(ang)));
    float w = sqrt(9.8 * f) * 0.55;
    float ph = f * dot(d, p) - w * t + float(i) * 1.3;
    float e = exp(sin(ph) - 1.0);
    y += a * e;
    g += a * e * cos(ph) * f * d;
    a *= 0.7;
    f *= 1.42;
  }
  return y;
}

vec3 sky(vec3 rd) {
  float up = pow(max(rd.y, 0.0), 0.45);
  vec3 c = mix(vec3(0.18, 0.13, 0.10), vec3(0.03, 0.08, 0.14), up);
  c += SUNCOL * pow(max(dot(rd, SUN), 0.0), 10.0) * 0.55 * smoothstep(-0.03, 0.04, SUN.y);
  return c;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * r) / r.y;
  vec3 ro = vec3(0.0, 2.4, 0.0);
  vec3 rd = normalize(vec3(uv.x, uv.y - 0.36, -1.6));

  if (rd.y >= 0.0) {
    gl_FragColor = vec4(0.0);
    return;
  }

  float dist = -ro.y / rd.y;
  vec3 pos = ro + rd * dist;
  vec2 g;
  float h = ocean(pos.xz, g);

  vec3 n = normalize(vec3(-g.x, 1.0, -g.y));
  n = normalize(mix(n, vec3(0.0, 1.0, 0.0), smoothstep(12.0, 90.0, dist)));

  float fres = 0.02 + 0.98 * pow(1.0 - max(dot(n, -rd), 0.0), 5.0);
  vec3 refl = reflect(rd, n);
  refl.y = abs(refl.y);

  vec3 deep = vec3(0.015, 0.06, 0.11);
  vec3 body = deep + vec3(0.04, 0.13, 0.17) * max(h, 0.0) * 0.7;
  vec3 col = mix(body, sky(refl), fres);
  col += SUNCOL * pow(max(dot(refl, SUN), 0.0), 220.0) * 2.2 * smoothstep(-0.03, 0.04, SUN.y);

  float foam = smoothstep(0.62, 0.95, h) * (1.0 - smoothstep(8.0, 40.0, dist));
  col = mix(col, vec3(0.82, 0.86, 0.9), foam * 0.55);

  col = mix(col, BG, smoothstep(18.0, 110.0, dist));

  float alpha = smoothstep(0.0, 0.14, -rd.y);
  gl_FragColor = vec4(col * alpha, alpha);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export default function ScrollWaves() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], ["0vh", "55vh"]);
  const opacity = useTransform(scrollY, [0, 700], [1, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { alpha: true, antialias: false, premultipliedAlpha: true });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uT = gl.getUniformLocation(prog, "t");
    const uR = gl.getUniformLocation(prog, "r");
    const uSun = gl.getUniformLocation(prog, "SUN");
    const uSunCol = gl.getUniformLocation(prog, "SUNCOL");

    // Render below native resolution; the shader is per-pixel and runs every frame.
    const scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.65;
    const resize = () => {
      const w = Math.max(1, Math.floor(canvas.clientWidth * scale));
      const h = Math.max(1, Math.floor(canvas.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const draw = (time: number, now: number) => {
      const sun = getSunState(now, !!reduceMotion);
      const [sx, sy, sz] = sunDirection(sun, canvas.width / canvas.height);
      const [r, g, b] = sun.color;
      gl.uniform1f(uT, time);
      gl.uniform2f(uR, canvas.width, canvas.height);
      gl.uniform3f(uSun, sx, sy, sz);
      gl.uniform3f(uSunCol, r / 255, (g / 255) * 0.85, (b / 255) * 0.6);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    let raf = 0;
    const start = performance.now();
    if (reduceMotion) {
      draw(4, start);
    } else {
      const loop = (now: number) => {
        if (scrollY.get() < 750) draw((now - start) / 1000, now);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [reduceMotion, scrollY]);

  return (
    <motion.div
      className="fixed inset-x-0 bottom-0 h-[50vh] z-[1] pointer-events-none"
      style={{ y, opacity }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </motion.div>
  );
}
