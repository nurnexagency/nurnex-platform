"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import StarCompassBg from "@/components/bg/star-compass-bg";

const cities = [
  {
    name: "Boston",
    region: "USA Headquarters",
    coverage: "Americas & global operations",
    x: 250,
    y: 175,
    isHQ: true,
  },
  {
    name: "Warsaw",
    region: "Europe Hub",
    coverage: "EU & Northern Europe",
    x: 540,
    y: 140,
    isHQ: false,
  },
  {
    name: "Baku",
    region: "Western Asia Hub",
    coverage: "Caucasus & Central Asia",
    x: 598,
    y: 165,
    isHQ: false,
  },
  {
    name: "Dubai",
    region: "Middle East Hub",
    coverage: "GCC & MENA region",
    x: 648,
    y: 215,
    isHQ: false,
  },
];

const flightPaths = [
  { from: 0, to: 1, d: "M250,175 Q395,55 540,140", primary: true, delay: 0.3 },
  { from: 0, to: 2, d: "M250,175 Q430,50 598,165", primary: true, delay: 0.6 },
  { from: 0, to: 3, d: "M250,175 Q455,105 648,215", primary: true, delay: 0.9 },
  { from: 1, to: 2, d: "M540,140 Q575,110 598,165", primary: false, delay: 1.2 },
  { from: 1, to: 3, d: "M540,140 Q620,155 648,215", primary: false, delay: 1.5 },
  { from: 2, to: 3, d: "M598,165 Q630,185 648,215", primary: false, delay: 1.8 },
];

const latLines = [67, 167, 267, 367, 467];
const lonLines = [56, 139, 222, 306, 389, 472, 556, 639, 722, 806, 889];
const EQUATOR_Y = 267;

function WorldMap({ inView }: { inView: boolean }) {
  return (
    <svg viewBox="0 0 1000 500" className="w-full h-auto" fill="none">
      <defs>
        <linearGradient id="continentFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0E2A42" />
          <stop offset="100%" stopColor="#122F4A" />
        </linearGradient>
        <filter id="labelShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000" floodOpacity="0.6" />
        </filter>
      </defs>

      {/* ── Graticule grid ── */}
      {latLines.map((y) => (
        <line
          key={`lat-${y}`}
          x1="30"
          y1={y}
          x2="970"
          y2={y}
          stroke="#8B9DB5"
          strokeWidth="0.3"
          opacity={y === EQUATOR_Y ? 0.12 : 0.07}
        />
      ))}
      {lonLines.map((x) => (
        <line
          key={`lon-${x}`}
          x1={x}
          y1="30"
          x2={x}
          y2="470"
          stroke="#8B9DB5"
          strokeWidth="0.3"
          opacity="0.06"
        />
      ))}

      {/* ══ Continents ══ */}

      {/* North America */}
      <motion.path
        d="M 115,78 L 125,72 L 138,68 L 152,72 L 165,68 L 178,64
           L 192,60 L 208,56 L 225,58 L 242,54 L 258,52 L 272,56
           L 285,52 L 298,48 L 312,50 L 325,54 L 335,60 L 340,68
           L 336,78 L 330,86 L 324,82 L 318,86 L 322,94
           L 328,100 L 332,108 L 336,116 L 332,124 L 326,130
           L 320,136 L 314,132 L 308,128 L 300,126 L 294,130
           L 290,138 L 286,146 L 282,154 L 278,162 L 276,170
           L 280,178 L 284,184 L 288,190 L 284,196 L 278,194
           L 272,190 L 266,194 L 260,200 L 254,206
           L 250,212 L 246,218 L 240,224 L 234,230
           L 238,236 L 244,242 L 250,248 L 252,254
           L 248,258 L 242,256 L 236,250 L 230,246
           L 224,242 L 218,236 L 212,228 L 208,220
           L 204,212 L 200,204 L 196,196 L 192,188
           L 188,180 L 184,172 L 180,164 L 176,156
           L 172,148 L 168,140 L 164,132 L 158,124
           L 152,116 L 146,108 L 140,100 L 134,92
           L 128,86 L 122,82 Z"
        fill="url(#continentFill)"
        stroke="#C4782B"
        strokeWidth="0.6"
        strokeOpacity="0.25"
        opacity="0"
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.1 }}
      />
      {/* Greenland */}
      <motion.path
        d="M 340,50 L 355,42 L 372,38 L 390,42 L 402,50
           L 408,62 L 402,74 L 392,80 L 378,82 L 365,78
           L 352,72 L 344,62 L 340,56 Z"
        fill="url(#continentFill)"
        stroke="#C4782B"
        strokeWidth="0.5"
        strokeOpacity="0.25"
        opacity="0"
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.15 }}
      />

      {/* South America */}
      <motion.path
        d="M 248,264 L 258,258 L 270,254 L 282,256 L 294,252
           L 306,256 L 316,264 L 322,274 L 324,286
           L 322,298 L 320,310 L 318,322 L 314,334
           L 308,346 L 302,356 L 296,366 L 288,374
           L 280,382 L 272,388 L 264,392 L 256,394
           L 250,390 L 244,384 L 240,374 L 236,362
           L 234,350 L 232,338 L 230,326 L 228,314
           L 228,302 L 230,290 L 234,278 L 240,270 Z"
        fill="url(#continentFill)"
        stroke="#C4782B"
        strokeWidth="0.6"
        strokeOpacity="0.25"
        opacity="0"
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
      />

      {/* Europe */}
      <motion.path
        d="M 462,130 L 468,122 L 474,114 L 482,108
           L 490,102 L 498,96 L 508,92 L 518,88 L 526,90
           L 534,94 L 542,98 L 548,92 L 556,88
           L 562,96 L 558,106 L 562,114 L 566,120
           L 562,128 L 558,134 L 552,140 L 548,148
           L 542,156 L 536,162 L 528,166 L 520,172
           L 512,176 L 504,178 L 496,176 L 488,172
           L 482,168 L 476,164 L 470,158 L 466,152
           L 462,146 L 460,138 Z"
        fill="url(#continentFill)"
        stroke="#C4782B"
        strokeWidth="0.6"
        strokeOpacity="0.25"
        opacity="0"
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.25 }}
      />
      {/* British Isles */}
      <motion.path
        d="M 450,106 L 458,100 L 464,104 L 466,112
           L 462,118 L 456,120 L 450,116 L 448,110 Z"
        fill="url(#continentFill)"
        stroke="#C4782B"
        strokeWidth="0.5"
        strokeOpacity="0.25"
        opacity="0"
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.25 }}
      />
      {/* Scandinavia */}
      <motion.path
        d="M 506,58 L 514,52 L 522,56 L 528,50
           L 536,52 L 540,62 L 538,72 L 534,80
           L 528,86 L 522,82 L 516,78 L 510,72
           L 506,64 Z"
        fill="url(#continentFill)"
        stroke="#C4782B"
        strokeWidth="0.5"
        strokeOpacity="0.25"
        opacity="0"
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.25 }}
      />

      {/* Africa */}
      <motion.path
        d="M 462,192 L 472,186 L 484,182 L 496,180
           L 510,184 L 524,188 L 538,194 L 550,202
           L 560,212 L 568,224 L 574,238 L 576,254
           L 574,272 L 570,290 L 564,308 L 556,324
           L 546,338 L 534,350 L 522,360 L 510,366
           L 498,370 L 486,368 L 476,360 L 468,348
           L 462,334 L 458,318 L 454,300 L 452,282
           L 450,264 L 448,248 L 450,232 L 452,218
           L 456,204 Z"
        fill="url(#continentFill)"
        stroke="#C4782B"
        strokeWidth="0.6"
        strokeOpacity="0.25"
        opacity="0"
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
      />
      {/* Madagascar */}
      <motion.path
        d="M 580,320 L 586,314 L 590,322 L 588,334
           L 584,342 L 578,338 L 576,328 Z"
        fill="url(#continentFill)"
        stroke="#C4782B"
        strokeWidth="0.4"
        strokeOpacity="0.25"
        opacity="0"
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.32 }}
      />

      {/* Middle East & Arabian Peninsula */}
      <motion.path
        d="M 570,172 L 580,166 L 592,164 L 604,168
           L 616,174 L 626,182 L 634,192 L 640,204
           L 644,218 L 640,234 L 632,244
           L 620,252 L 608,256 L 596,252
           L 584,244 L 576,234 L 572,222
           L 568,210 L 568,196 L 568,182 Z"
        fill="url(#continentFill)"
        stroke="#C4782B"
        strokeWidth="0.6"
        strokeOpacity="0.25"
        opacity="0"
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.35 }}
      />

      {/* Russia / Northern Asia */}
      <motion.path
        d="M 564,118 L 578,112 L 594,106 L 614,100
           L 638,96 L 664,92 L 692,90 L 718,88
           L 746,90 L 772,94 L 796,100 L 816,108
           L 830,116 L 838,126 L 840,136 L 836,146
           L 828,154 L 818,160 L 806,164 L 792,166
           L 776,168 L 758,170 L 738,168 L 718,166
           L 698,162 L 678,160 L 660,158 L 644,158
           L 628,160 L 612,162 L 598,162 L 584,158
           L 574,150 L 568,140 L 564,130 Z"
        fill="url(#continentFill)"
        stroke="#C4782B"
        strokeWidth="0.5"
        strokeOpacity="0.25"
        opacity="0"
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.35 }}
      />

      {/* South / East Asia */}
      <motion.path
        d="M 644,162 L 662,158 L 682,160 L 702,166
           L 720,172 L 738,176 L 754,172 L 770,168
           L 784,172 L 794,180 L 802,190 L 800,202
           L 792,214 L 782,224 L 770,230
           L 756,234 L 742,230 L 728,226
           L 714,230 L 700,234 L 688,238
           L 678,234 L 668,226 L 658,218
           L 650,210 L 644,200 L 640,190
           L 642,178 L 644,168 Z"
        fill="url(#continentFill)"
        stroke="#C4782B"
        strokeWidth="0.5"
        strokeOpacity="0.25"
        opacity="0"
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.4 }}
      />

      {/* Indian Subcontinent */}
      <motion.path
        d="M 664,210 L 676,204 L 690,208 L 702,216
           L 710,230 L 706,244 L 698,260
           L 688,274 L 676,282 L 664,278
           L 656,264 L 650,250 L 646,236
           L 650,222 L 656,214 Z"
        fill="url(#continentFill)"
        stroke="#C4782B"
        strokeWidth="0.5"
        strokeOpacity="0.25"
        opacity="0"
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.4 }}
      />

      {/* Southeast Asian Islands */}
      <motion.path
        d="M 744,250 L 760,244 L 776,248 L 792,254
           L 804,264 L 810,276 L 804,284
           L 792,288 L 778,284 L 764,278
           L 752,270 L 746,260 Z"
        fill="url(#continentFill)"
        stroke="#C4782B"
        strokeWidth="0.5"
        strokeOpacity="0.25"
        opacity="0"
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.42 }}
      />

      {/* Japan */}
      <motion.path
        d="M 826,148 L 832,140 L 838,144 L 842,154
           L 840,164 L 834,172 L 828,170
           L 822,162 L 822,154 Z"
        fill="url(#continentFill)"
        stroke="#C4782B"
        strokeWidth="0.5"
        strokeOpacity="0.25"
        opacity="0"
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.42 }}
      />

      {/* Australia */}
      <motion.path
        d="M 780,332 L 798,324 L 818,318 L 838,322
           L 856,330 L 868,342 L 874,356 L 872,370
           L 864,382 L 852,392 L 838,396 L 822,394
           L 808,388 L 796,378 L 786,366 L 780,352
           L 778,342 Z"
        fill="url(#continentFill)"
        stroke="#C4782B"
        strokeWidth="0.6"
        strokeOpacity="0.25"
        opacity="0"
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.45 }}
      />
      {/* New Zealand */}
      <motion.path
        d="M 906,374 L 912,368 L 916,376 L 914,386
           L 908,390 L 904,384 Z"
        fill="url(#continentFill)"
        stroke="#C4782B"
        strokeWidth="0.4"
        strokeOpacity="0.25"
        opacity="0"
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.46 }}
      />

      {/* ── Flight path arcs ── */}
      {flightPaths.map((fp, i) => (
        <motion.path
          key={i}
          d={fp.d}
          stroke="#C4782B"
          strokeWidth={fp.primary ? 1.5 : 1}
          fill="none"
          opacity={fp.primary ? 0.5 : 0.3}
          strokeDasharray={!fp.primary ? "6 4" : undefined}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            inView
              ? { pathLength: 1, opacity: fp.primary ? 0.5 : 0.3 }
              : {}
          }
          transition={{ duration: 1.5, delay: fp.delay + 0.8, ease: "easeOut" }}
          className={inView ? "flight-path-animate" : ""}
        />
      ))}

      {/* ── City dots and labels ── */}
      {cities.map((city, i) => (
        <g key={city.name}>
          {/* HQ double pulse ring */}
          {city.isHQ && (
            <circle
              cx={city.x}
              cy={city.y}
              r="12"
              fill="none"
              stroke="#C4782B"
              strokeWidth="0.8"
              className="city-dot-double-pulse"
            />
          )}
          {/* Pulse ring */}
          <circle
            cx={city.x}
            cy={city.y}
            r="8"
            fill="none"
            stroke="#C4782B"
            strokeWidth="1"
            className="city-dot-pulse"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
          {/* Core dot — ping scale effect */}
          <motion.circle
            cx={city.x}
            cy={city.y}
            r={city.isHQ ? 6 : 4.5}
            fill="#C4782B"
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: [0, 1.5, 1], opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.8 + i * 0.25 }}
          />
          <circle cx={city.x} cy={city.y} r="2" fill="#FFFFFF" />

          {/* Labels — both centered above the dot */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1 + i * 0.25 }}
            filter="url(#labelShadow)"
          >
            <text
              x={city.x}
              y={city.y - 24}
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="10"
              fontWeight="600"
              fontFamily="Inter, sans-serif"
            >
              {city.name}
            </text>
            <text
              x={city.x}
              y={city.y - 13}
              textAnchor="middle"
              fill="#C4782B"
              fontSize="7"
              fontWeight="500"
              letterSpacing="1"
              fontFamily="Inter, sans-serif"
            >
              {city.region.toUpperCase()}
            </text>
          </motion.g>
        </g>
      ))}
    </svg>
  );
}

export default function MapSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="regions"
      className="relative py-20 sm:py-28 overflow-hidden"
      style={{ backgroundColor: "#081829" }}
    >
      <StarCompassBg />
      {/* Ocean dot grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(139,157,181,0.07) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 sm:mb-20"
        >
          <p className="text-copper text-sm tracking-[0.3em] uppercase mb-3">
            Global Presence
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Where We Operate
          </h2>
        </motion.div>

        {/* Map container with vignette */}
        <div ref={ref} className="relative">
          <div className="relative rounded-xl overflow-hidden">
            <WorldMap inView={inView} />
            {/* Vignette overlay */}
            <div
              className="absolute inset-0 pointer-events-none rounded-xl"
              style={{ boxShadow: "inset 0 0 80px 40px #081829" }}
            />
          </div>

          {/* Glass-morphism info cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 sm:mt-12">
            {cities.map((city, i) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-card-bg/60 backdrop-blur-md border border-white/10 rounded-xl p-5 text-center hover:border-copper/20 hover:shadow-[0_4px_20px_rgba(196,120,43,0.1)] transition-all duration-300"
              >
                <div
                  className={`${
                    city.isHQ ? "w-4 h-4" : "w-3 h-3"
                  } rounded-full bg-copper mx-auto mb-3`}
                />
                <h3 className="text-white font-semibold text-lg">
                  {city.name}
                </h3>
                <p className="text-copper text-xs tracking-wide uppercase mt-1">
                  {city.region}
                </p>
                <p className="text-muted text-sm mt-2">{city.coverage}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
