import React from 'react';

export const HeroChamberSchematic: React.FC = () => {
  return (
    <figure className="relative overflow-hidden rounded-lg border border-slate-800 bg-[#0B101B]">
      <svg
        viewBox="0 0 620 380"
        className="w-full h-auto select-none"
        role="img"
        aria-label="Selective Laser Melting (SLM) Inert Argon Chamber, Galvo Scanner Optics, Recoater Blade, and Melt Pool Schematic"
      >
        <defs>
          <linearGradient id="laserBeamGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.15" />
            <stop offset="65%" stopColor="#F59E0B" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FEF3C7" stopOpacity="0.95" />
          </linearGradient>
          <radialGradient id="meltGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FEF3C7" stopOpacity="1" />
            <stop offset="45%" stopColor="#F59E0B" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
          </radialGradient>
          <pattern id="chamberGrid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#1E293B" strokeWidth="0.6" />
          </pattern>
        </defs>

        <rect x="0" y="0" width="620" height="380" fill="#070A12" />
        <rect x="16" y="16" width="588" height="348" rx="6" fill="url(#chamberGrid)" stroke="#1E293B" />

        {/* Inert Argon Laminar Cross-Flow Arrows */}
        <g>
          <text x="32" y="42" fill="#38BDF8" className="text-[10px] font-mono font-semibold">
            ● INERT ARGON LAMINAR GAS KNIFE (O2 {'<'} 100 ppm · v = 2.2 m/s)
          </text>
          {[148, 168].map((gy) => (
            <g key={gy}>
              <line
                x1="36"
                y1={gy}
                x2="575"
                y2={gy}
                stroke="#0284C7"
                strokeWidth="1"
                strokeDasharray="8 5"
              />
              <polygon points={`580,${gy} 571,${gy - 3.5} 571,${gy + 3.5}`} fill="#38BDF8" />
            </g>
          ))}
        </g>

        {/* Top Yb-Fiber Laser & Galvo Scanner Assembly */}
        <rect x="235" y="24" width="150" height="36" rx="4" fill="#111827" stroke="#475569" strokeWidth="1.2" />
        <text x="310" y="40" textAnchor="middle" fill="#F8FAFC" className="text-[10px] font-mono font-semibold">
          Yb-FIBER LASER + 3D GALVO
        </text>
        <text x="310" y="53" textAnchor="middle" fill="#FBBF24" className="text-[9.5px] font-mono">
          λ = 1064 nm · P = 200–1000 W
        </text>

        {/* Focused Laser Cone */}
        <polygon points="295,60 325,60 288,215 276,215" fill="url(#laserBeamGrad)" />
        <line x1="310" y1="60" x2="282" y2="215" stroke="#FEF3C7" strokeWidth="1.6" />

        {/* Recoater Blade Mechanism (Right Side) */}
        <g>
          <rect x="425" y="166" width="28" height="49" rx="2" fill="#334155" stroke="#94A3B8" strokeWidth="1.2" />
          <polygon points="425,215 453,215 446,222 432,222" fill="#CBD5E1" />
          <text x="462" y="186" fill="#E2E8F0" className="text-[10px] font-mono font-semibold">
            RECOATER BLADE
          </text>
          <text x="462" y="200" fill="#94A3B8" className="text-[9.5px] font-mono">
            Layer t = 20–90 μm
          </text>
          <text x="462" y="213" fill="#94A3B8" className="text-[9.5px] font-mono">
            PSD: 15–45 μm
          </text>
        </g>

        {/* Powder Bed Surface & Build Cylinder */}
        <rect x="95" y="215" width="430" height="125" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
        <line x1="95" y1="223" x2="525" y2="223" stroke="#64748B" strokeWidth="1" strokeDasharray="3 2" />

        {/* Solidified Topology-Optimized Component in Powder Bed */}
        <path
          d="M 185 312 L 210 223 L 355 223 L 385 312 Z"
          fill="#1E293B"
          stroke="#94A3B8"
          strokeWidth="1.5"
        />
        {/* Internal TPMS Lattice Channels inside Printed Part */}
        {[240, 262, 284].map((ly) => (
          <g key={ly}>
            <ellipse cx="250" cy={ly} rx="14" ry="6" fill="#090D16" stroke="#38BDF8" strokeWidth="1" />
            <ellipse cx="285" cy={ly} rx="14" ry="6" fill="#090D16" stroke="#38BDF8" strokeWidth="1" />
            <ellipse cx="320" cy={ly} rx="14" ry="6" fill="#090D16" stroke="#38BDF8" strokeWidth="1" />
          </g>
        ))}

        {/* Sacrificial Support Structures Anchoring Overhangs */}
        {[192, 200, 365, 373].map((sx) => (
          <line
            key={sx}
            x1={sx}
            y1="255"
            x2={sx}
            y2="312"
            stroke="#F59E0B"
            strokeWidth="1.2"
            strokeDasharray="2 2"
          />
        ))}

        {/* Heated Build Substrate Plate & Z-Axis Indexing Piston */}
        <rect x="135" y="312" width="350" height="22" rx="2" fill="#334155" stroke="#CBD5E1" strokeWidth="1.2" />
        <text x="310" y="327" textAnchor="middle" fill="#F8FAFC" className="text-[10px] font-mono font-semibold">
          PRE-HEATED BUILD SUBSTRATE (200–500 °C) · Z-STAGE PISTON ↓
        </text>

        {/* Active Melt Pool Glow & Plume Ejecta at (282, 218) */}
        <circle cx="282" cy="218" r="24" fill="url(#meltGlow)" />
        <ellipse cx="282" cy="218" rx="14" ry="5" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />

        {/* Callout Box for Melt Pool Physics */}
        <rect x="32" y="75" width="185" height="60" rx="4" fill="#0F172A" stroke="#F59E0B" strokeWidth="1" />
        <text x="42" y="93" fill="#FBBF24" className="text-[10px] font-mono font-semibold">
          ACTIVE MELT POOL REGIME
        </text>
        <text x="42" y="108" fill="#E2E8F0" className="text-[9.5px] font-mono">
          T_peak ≈ 2,400–3,100 K
        </text>
        <text x="42" y="123" fill="#94A3B8" className="text-[9.5px] font-mono">
          dT/dt = 10⁵–10⁷ K/s Cooling
        </text>
      </svg>
      <figcaption className="px-4 py-2.5 bg-[#090D16]/95 border-t border-slate-800/90 text-[11px] font-mono text-slate-300 flex items-center justify-between gap-2">
        <span>Fig 1.1 — Yb-Fiber Laser (λ = 1064 nm) Melt Pool & Inert Recoating Architecture</span>
        <span className="text-amber-400 shrink-0">ISO/ASTM 52900 L-PBF</span>
      </figcaption>
    </figure>
  );
};

export const ApplicationSectorSchematic: React.FC<{
  type: 'aerospace-injector' | 'medical-implant' | 'conformal-tooling' | 'tpms-exchanger';
  caption: string;
}> = ({ type, caption }) => {
  return (
    <figure className="relative overflow-hidden rounded-lg border border-slate-800 bg-[#0B101B]">
      <svg
        viewBox="0 0 480 320"
        className="w-full h-auto select-none"
        role="img"
        aria-label={caption}
      >
        <rect x="0" y="0" width="480" height="320" fill="#070A12" />

        {type === 'aerospace-injector' && (
          <g>
            <text x="24" y="30" fill="#FBBF24" className="text-[11px] font-mono font-semibold">
              MONOLITHIC IN718 / GRCop-42 SWIRL INJECTOR & REGEN NOZZLE
            </text>
            {/* Outer Laval Nozzle Cutaway Contour */}
            <path
              d="M 135 55 L 345 55 L 310 155 L 365 275 L 115 275 L 170 155 Z"
              fill="#1E293B"
              stroke="#94A3B8"
              strokeWidth="2"
            />
            {/* Inner Combustion Chamber Wall */}
            <path
              d="M 160 75 L 320 75 L 290 155 L 338 275 L 142 275 L 190 155 Z"
              fill="#090D16"
              stroke="#F59E0B"
              strokeWidth="1.5"
            />
            {/* Bifurcated Regenerative Micro-Cooling Channels inside Nozzle Wall */}
            {[88, 112, 136, 160, 188, 216, 244].map((cy, i) => (
              <g key={cy}>
                <circle cx={150 + (i < 4 ? i * 5 : (6 - i) * 6)} cy={cy} r="4.5" fill="#0284C7" stroke="#38BDF8" strokeWidth="1" />
                <circle cx={330 - (i < 4 ? i * 5 : (6 - i) * 6)} cy={cy} r="4.5" fill="#0284C7" stroke="#38BDF8" strokeWidth="1" />
              </g>
            ))}
            {/* Co-Axial Swirl Injector Elements at Top Dome */}
            {[185, 215, 240, 265, 295].map((ix) => (
              <g key={ix}>
                <rect x={ix - 6} y="52" width="12" height="28" fill="#334155" stroke="#FBBF24" strokeWidth="1" />
                <line x1={ix} y1="80" x2={ix} y2="118" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 2" />
              </g>
            ))}
            <text x="240" y="195" textAnchor="middle" fill="#FEF3C7" className="text-[10.5px] font-mono font-semibold">
              115 Brazed Parts → 1 Print
            </text>
            <text x="240" y="213" textAnchor="middle" fill="#38BDF8" className="text-[10px] font-mono">
              Internal Helical Regen Cooling Channels
            </text>
          </g>
        )}

        {type === 'medical-implant' && (
          <g>
            <text x="24" y="30" fill="#38BDF8" className="text-[11px] font-mono font-semibold">
              Ti-6Al-4V ELI ACETABULAR CUP · GRADED TPMS GYROID LATTICE
            </text>
            {/* Outer Hemispherical Trabecular Shell */}
            <path
              d="M 105 225 A 135 135 0 0 1 375 225 L 335 225 A 95 95 0 0 0 145 225 Z"
              fill="#1E293B"
              stroke="#38BDF8"
              strokeWidth="2"
            />
            {/* Inner Solid Bearing Shell */}
            <path
              d="M 145 225 A 95 95 0 0 1 335 225"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="3"
            />
            {/* Biomimetic Trabecular Lattice Nodes in Porous Rim */}
            {[150, 175, 205, 240, 275, 305, 330].map((lx, idx) => {
              const arcY = 200 - Math.sin(((idx + 1) / 8) * Math.PI) * 92;
              return (
                <g key={lx}>
                  <circle cx={lx} cy={arcY} r="9" fill="#090D16" stroke="#10B981" strokeWidth="1.4" />
                  <circle cx={lx} cy={arcY + 20} r="7" fill="#090D16" stroke="#38BDF8" strokeWidth="1.2" />
                </g>
              );
            })}
            <text x="240" y="256" textAnchor="middle" fill="#6EE7B7" className="text-[10.5px] font-mono font-semibold">
              ● 68% Porosity · 500 μm Interconnected Pores
            </text>
            <text x="240" y="274" textAnchor="middle" fill="#CBD5E1" className="text-[10px] font-mono">
              Effective Modulus E = 4.2–16.5 GPa (Matches Cortical Bone)
            </text>
          </g>
        )}

        {type === 'conformal-tooling' && (
          <g>
            <text x="24" y="30" fill="#10B981" className="text-[11px] font-mono font-semibold">
              18Ni300 MARAGING STEEL CORE · HELICAL CONFORMAL COOLING
            </text>
            {/* CNC Base Plate + Hybrid SLM Core */}
            <rect x="95" y="235" width="290" height="45" rx="3" fill="#334155" stroke="#94A3B8" strokeWidth="1.5" />
            <text x="240" y="262" textAnchor="middle" fill="#E2E8F0" className="text-[10px] font-mono">
              HYBRID CNC PREFORM BASE PLATE
            </text>
            {/* Contoured SLM Mold Core Insert */}
            <path
              d="M 145 235 L 165 75 Q 240 45 315 75 L 335 235 Z"
              fill="#1E293B"
              stroke="#F59E0B"
              strokeWidth="2"
            />
            {/* Helical Conformal Cooling Spiral Following Core Wall */}
            {[95, 125, 155, 185, 212].map((hy, i) => (
              <path
                key={hy}
                d={`M 178 ${hy} Q 240 ${hy - 14} 302 ${hy + 6}`}
                fill="none"
                stroke="#38BDF8"
                strokeWidth="5"
                strokeLinecap="round"
              />
            ))}
            <text x="240" y="300" textAnchor="middle" fill="#7DD3FC" className="text-[10px] font-mono">
              ● Spiral Coolant Pitch: 3.0 mm Wall Offset · −42.6% Cycle Time
            </text>
          </g>
        )}

        {type === 'tpms-exchanger' && (
          <g>
            <text x="24" y="30" fill="#FBBF24" className="text-[11px] font-mono font-semibold">
              BICONTINUOUS TPMS GYROID SUPERCRITICAL CO2 HEAT EXCHANGER
            </text>
            <rect x="45" y="50" width="390" height="215" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
            {[80, 125, 170, 215].map((y, idx) => (
              <g key={y}>
                <path
                  d={`M 65 ${y} Q 125 ${y - 35} 185 ${y} T 305 ${y} T 415 ${y}`}
                  fill="none"
                  stroke={idx % 2 === 0 ? '#F59E0B' : '#38BDF8'}
                  strokeWidth="3.2"
                />
                <path
                  d={`M 65 ${y + 20} Q 125 ${y + 52} 185 ${y + 20} T 305 ${y + 20} T 415 ${y + 20}`}
                  fill="none"
                  stroke="#94A3B8"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />
              </g>
            ))}
            <text x="240" y="292" textAnchor="middle" fill="#FBBF24" className="text-[10px] font-mono">
              ● Stream A: Hot sCO2 (700 °C, 250 bar) · Stream B: Cryo Coolant (300 μm Wall)
            </text>
          </g>
        )}
      </svg>
      <figcaption className="px-4 py-2.5 bg-[#090D16]/95 border-t border-slate-800/90 text-[11px] font-mono text-slate-300 flex items-center justify-between gap-2">
        <span>{caption}</span>
        <span className="text-amber-400 shrink-0">ISO/ASTM 52900 L-PBF</span>
      </figcaption>
    </figure>
  );
};
