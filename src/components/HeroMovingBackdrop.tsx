"use client";

/**
 * Premium hero backdrop: abstract AI sentinel (pure SVG).
 * Hex frame, visor scan, verification core, data tethers — matches “proof / AI” positioning.
 */
export function HeroMovingBackdrop() {
  return (
    <div
      className="hero-ai-root absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <svg
        className="hero-ai-canvas absolute left-1/2 top-1/2 min-h-[140%] min-w-[140%] -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 900 700"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="heroAiBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.06" />
          </linearGradient>
          <linearGradient id="heroAiGold" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0B0B0B" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="heroAiVisorScan" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0" />
            <stop offset="45%" stopColor="#93c5fd" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#fcd34d" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="heroAiLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="50%" stopColor="#93c5fd" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="heroAiCoreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.7" />
            <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0B0B0B" stopOpacity="0" />
          </radialGradient>
          <filter
            id="heroAiBlurLg"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="42" />
          </filter>
          <clipPath id="heroAiVisorClip">
            <rect x={-78} y={-132} width={156} height={42} rx={7} />
          </clipPath>
        </defs>

        <ellipse
          className="hero-ai-atmos-a"
          cx={220}
          cy={240}
          rx={280}
          ry={200}
          fill="url(#heroAiBlue)"
          filter="url(#heroAiBlurLg)"
          opacity={0.75}
        />
        <ellipse
          className="hero-ai-atmos-b"
          cx={780}
          cy={480}
          rx={260}
          ry={220}
          fill="url(#heroAiGold)"
          filter="url(#heroAiBlurLg)"
          opacity={0.7}
        />

        <g transform="translate(532, 318)">
          <g className="hero-ai-hex-rot">
            <polygon
              points="0,-210 181.8,-105 181.8,105 0,210 -181.8,105 -181.8,-105"
              fill="none"
              stroke="rgba(59,130,246,0.22)"
              strokeWidth={1.2}
            />
          </g>
          <g className="hero-ai-hex-rot-rev">
            <polygon
              points="0,-145 125.6,-72.5 125.6,72.5 0,145 -125.6,72.5 -125.6,-72.5"
              fill="none"
              stroke="rgba(212,175,55,0.16)"
              strokeWidth={0.9}
              strokeDasharray="6 14"
            />
          </g>

          <g className="hero-ai-bot-float">
            <path
              d="M -108 -95 L -132 -175"
              fill="none"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth={1.2}
              strokeLinecap="round"
            />
            <circle
              cx={-132}
              cy={-178}
              r={5}
              stroke="rgba(212,175,55,0.55)"
              strokeWidth="1.2"
              fill="none"
              className="hero-ai-antenna"
            />
            <path
              d="M 108 -95 L 132 -175"
              fill="none"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth={1.2}
              strokeLinecap="round"
            />
            <circle
              cx={132}
              cy={-178}
              r={5}
              stroke="rgba(59,130,246,0.55)"
              strokeWidth="1.2"
              fill="none"
              className="hero-ai-antenna hero-ai-antenna--r"
            />

            <rect
              x={-102}
              y={-158}
              width={204}
              height={118}
              rx={44}
              fill="rgba(8,8,10,0.35)"
              stroke="rgba(255,255,255,0.16)"
              strokeWidth={1.15}
            />

            <rect
              x={-78}
              y={-132}
              width={156}
              height={42}
              rx={7}
              fill="rgba(0,0,0,0.45)"
              stroke="url(#heroAiLine)"
              strokeWidth={1.2}
            />

            <g clipPath="url(#heroAiVisorClip)">
              <rect
                className="hero-ai-visor-scan"
                x={-78}
                y={-128}
                width={156}
                height={11}
                rx={3}
                fill="url(#heroAiVisorScan)"
                opacity={0.88}
              />
            </g>

            <path
              d="M -42 -42 L 42 -42 L 48 -22 L 48 8 L -48 8 L -48 -22 Z"
              fill="rgba(12,12,14,0.5)"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth={1}
            />
            <path
              d="M -82 8 L 82 8 L 92 148 L -92 148 Z"
              fill="rgba(10,10,12,0.42)"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth={1.1}
            />

            <rect
              x={-132}
              y={-2}
              width={38}
              height={52}
              rx={6}
              fill="rgba(59,130,246,0.08)"
              stroke="rgba(59,130,246,0.28)"
              strokeWidth={1}
            />
            <rect
              x={94}
              y={-2}
              width={38}
              height={52}
              rx={6}
              fill="rgba(212,175,55,0.06)"
              stroke="rgba(212,175,55,0.28)"
              strokeWidth={1}
            />

            <circle
              cx={0}
              cy={78}
              r={36}
              fill="none"
              stroke="rgba(255,255,255,0.09)"
              strokeWidth={1}
            />
            <g className="hero-ai-core-spin">
              <circle
                cx={0}
                cy={78}
                r={28}
                fill="none"
                stroke="url(#heroAiLine)"
                strokeWidth={1.4}
                strokeDasharray="10 18"
                strokeLinecap="round"
                opacity={0.92}
              />
            </g>
            <circle
              cx={0}
              cy={78}
              r={16}
              fill="url(#heroAiCoreGlow)"
              opacity={0.55}
              className="hero-ai-core-pulse"
            />

            <line
              x1={-72}
              y1={28}
              x2={-72}
              y2={132}
              stroke="rgba(147,197,253,0.2)"
              strokeWidth={1}
              strokeDasharray="4 10"
              className="hero-ai-rail hero-ai-rail--l"
            />
            <line
              x1={72}
              y1={28}
              x2={72}
              y2={132}
              stroke="rgba(252,211,77,0.18)"
              strokeWidth={1}
              strokeDasharray="4 10"
              className="hero-ai-rail hero-ai-rail--r"
            />
          </g>

          <g className="hero-ai-data" opacity={0.55}>
            <path
              className="hero-ai-data-line hero-ai-data-line--a"
              d="M -260 -40 C -120,-80 40,200 180,120"
              fill="none"
              stroke="url(#heroAiLine)"
              strokeWidth={0.9}
              strokeLinecap="round"
            />
            <path
              className="hero-ai-data-line hero-ai-data-line--b"
              d="M 240 180 C 140,40 -40,220 -200,60"
              fill="none"
              stroke="url(#heroAiLine)"
              strokeWidth={0.75}
              strokeLinecap="round"
              opacity={0.7}
            />
            <path
              className="hero-ai-data-line hero-ai-data-line--c"
              d="M 180 -200 Q 60,-40 20,40"
              fill="none"
              stroke="rgba(147,197,253,0.35)"
              strokeWidth={0.7}
              strokeLinecap="round"
            />
          </g>

          <g className="hero-ai-nodes">
            <circle className="hero-ai-node hero-ai-node--1" cx={-198} cy={40} r={3} fill="#93c5fd" opacity={0.5} />
            <circle className="hero-ai-node hero-ai-node--2" cx={210} cy={-30} r={2.5} fill="#fcd34d" opacity={0.45} />
            <circle className="hero-ai-node hero-ai-node--3" cx={165} cy={140} r={2} fill="#60a5fa" opacity={0.5} />
            <circle className="hero-ai-node hero-ai-node--4" cx={-175} cy={155} r={2.5} fill="#d4af37" opacity={0.4} />
          </g>
        </g>
      </svg>
    </div>
  );
}
