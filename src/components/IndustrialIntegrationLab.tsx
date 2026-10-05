import React, { useState, useMemo } from 'react';

type LaserArchitecture = 'single-400w' | 'quad-500w' | 'twelve-1kw';
type AutomationTier = 'manual-ct' | 'semi-pyro' | 'lightsout-oct';
type EconAlloyKey = 'ti64' | 'in718' | 'm300' | 'alsi10mg';

interface AlloyEconSpec {
  name: string;
  densityGCm3: number;
  powderPriceKg: number;
  wroughtPriceKg: number;
  baseRateSingleCm3H: number;
}

const ECON_ALLOYS: Record<EconAlloyKey, AlloyEconSpec> = {
  ti64: {
    name: 'Ti-6Al-4V ELI (Grade 23)',
    densityGCm3: 4.43,
    powderPriceKg: 145,
    wroughtPriceKg: 48,
    baseRateSingleCm3H: 24
  },
  in718: {
    name: 'Inconel 718 Superalloy',
    densityGCm3: 8.19,
    powderPriceKg: 110,
    wroughtPriceKg: 42,
    baseRateSingleCm3H: 22
  },
  m300: {
    name: '18Ni300 Maraging Tool Steel',
    densityGCm3: 8.05,
    powderPriceKg: 78,
    wroughtPriceKg: 24,
    baseRateSingleCm3H: 26
  },
  alsi10mg: {
    name: 'AlSi10Mg Eutectic Aluminum',
    densityGCm3: 2.67,
    powderPriceKg: 65,
    wroughtPriceKg: 14,
    baseRateSingleCm3H: 38
  }
};

export const IndustrialIntegrationLab: React.FC = () => {
  const [laserArch, setLaserArch] = useState<LaserArchitecture>('quad-500w');
  const [autoTier, setAutoTier] = useState<AutomationTier>('lightsout-oct');
  const [alloyKey, setAlloyKey] = useState<EconAlloyKey>('ti64');
  const [partVolumeCm3, setPartVolumeCm3] = useState<number>(180);
  const [cncBuyToFly, setCncBuyToFly] = useState<number>(14);

  const metrics = useMemo(() => {
    const alloy = ECON_ALLOYS[alloyKey];
    const partMassKg = (partVolumeCm3 * alloy.densityGCm3) / 1000;

    const archMultiplier =
      laserArch === 'single-400w' ? 1.0 : laserArch === 'quad-500w' ? 3.6 : 10.4;
    const machineHourlyRateUsd =
      laserArch === 'single-400w' ? 68 : laserArch === 'quad-500w' ? 115 : 210;

    const oeePct =
      autoTier === 'manual-ct' ? 52 : autoTier === 'semi-pyro' ? 74 : 90;
    const ndtCostPerPart =
      autoTier === 'manual-ct' ? 340 : autoTier === 'semi-pyro' ? 145 : 38;
    const postProcessLaborCost =
      autoTier === 'manual-ct' ? 290 : autoTier === 'semi-pyro' ? 175 : 95;

    const depositionRateCm3H = alloy.baseRateSingleCm3H * archMultiplier;
    const totalPrintedVolumeCm3 = partVolumeCm3 * 1.18;
    const printHoursPerPart = totalPrintedVolumeCm3 / depositionRateCm3H;

    const machineAmortizationCost = printHoursPerPart * machineHourlyRateUsd * (75 / oeePct);
    const slmMaterialCost = partMassKg * 1.22 * alloy.powderPriceKg;
    const totalSlmUnitCost =
      machineAmortizationCost + slmMaterialCost + postProcessLaborCost + ndtCostPerPart;

    const cncBilletMassKg = partMassKg * cncBuyToFly;
    const cncMaterialCost = cncBilletMassKg * alloy.wroughtPriceKg;
    const cncMachiningCost = partVolumeCm3 * 2.45 + 220;
    const dedicatedToolingNre = 28000;

    const massSavedPerPartKg = Math.max(0, cncBilletMassKg - partMassKg * 1.22);

    const variableConventional = cncMaterialCost * 0.55 + cncMachiningCost * 0.48;
    const deltaPerUnit = Math.max(12, totalSlmUnitCost - variableConventional);
    const breakEvenLotUnits = Math.round(dedicatedToolingNre / deltaPerUnit);

    return {
      alloy,
      partMassKg,
      depositionRateCm3H,
      oeePct,
      printHoursPerPart,
      machineAmortizationCost,
      slmMaterialCost,
      postProcessLaborCost,
      ndtCostPerPart,
      totalSlmUnitCost,
      cncBilletMassKg,
      massSavedPerPartKg,
      breakEvenLotUnits,
      variableConventional,
      dedicatedToolingNre
    };
  }, [laserArch, autoTier, alloyKey, partVolumeCm3, cncBuyToFly]);

  return (
    <div className="p-6 bg-[#0D131F] border border-slate-800 rounded-lg">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono text-amber-400">
            INDUSTRIAL PRODUCTION SIMULATOR · OEE, THROUGHPUT & UNIT ECONOMICS
          </div>
          <h3 className="text-xl font-semibold text-white mt-1">
            Factory Integration & Serial Production Break-Even Calculator
          </h3>
        </div>
        <div className="text-xs font-mono text-emerald-400">
          ● REAL-TIME TECHNO-ECONOMIC MODEL
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
        <div className="lg:col-span-5 space-y-5">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-2">
              01. MULTI-LASER OPTICAL ARCHITECTURE
            </label>
            <div className="grid grid-cols-1 gap-2">
              {[
                {
                  id: 'single-400w',
                  title: 'Single-Laser 400W System (Gen-1 R&D)',
                  sub: '1 × 400W Yb-Fiber · Manual Recoating · ~24 cm³/h'
                },
                {
                  id: 'quad-500w',
                  title: 'Quad-Laser 500W Production Cell (Gen-2)',
                  sub: '4 × 500W Full-Field Overlap · ~85 cm³/h'
                },
                {
                  id: 'twelve-1kw',
                  title: '12-Laser 1 kW Meter-Scale Foundry (Gen-3)',
                  sub: '12 × 1000W Dynamic Beam-Shaping · ~250+ cm³/h'
                }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setLaserArch(opt.id as LaserArchitecture)}
                  className={`p-3 text-left rounded border transition-colors ${
                    laserArch === opt.id
                      ? 'bg-amber-500/15 border-amber-500 text-white'
                      : 'bg-[#111827] border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-semibold">{opt.title}</div>
                  <div className="text-[11px] font-mono text-slate-400 mt-0.5">{opt.sub}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-2">
              02. FACTORY AUTOMATION & IN-SITU METROLOGY TIER
            </label>
            <div className="grid grid-cols-1 gap-2">
              {[
                {
                  id: 'manual-ct',
                  title: 'Manual Operator Turnaround + Offline X-Ray CT',
                  sub: 'OEE: 52% · High manual depowdering & NDT inspection cost'
                },
                {
                  id: 'semi-pyro',
                  title: 'Closed-Loop Powder Sieve + Co-Axial Pyrometry',
                  sub: 'OEE: 74% · Automated inert sieving & thermal anomaly logging'
                },
                {
                  id: 'lightsout-oct',
                  title: '24/7 AMR Lights-Out Cell + In-Situ OCT Qualification',
                  sub: 'OEE: 90% · Robotic cylinder swap & layer-by-layer certification'
                }
              ].map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setAutoTier(tier.id as AutomationTier)}
                  className={`p-3 text-left rounded border transition-colors ${
                    autoTier === tier.id
                      ? 'bg-cyan-500/15 border-cyan-400 text-white'
                      : 'bg-[#111827] border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-semibold">{tier.title}</div>
                  <div className="text-[11px] font-mono text-slate-400 mt-0.5">{tier.sub}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-[#111827] border border-slate-800 rounded space-y-4">
            <div>
              <label
                htmlFor="econ-alloy"
                className="block text-xs font-mono text-slate-300 mb-1.5"
              >
                PRODUCTION ALLOY FEEDSTOCK
              </label>
              <select
                id="econ-alloy"
                value={alloyKey}
                onChange={(e) => setAlloyKey(e.target.value as EconAlloyKey)}
                className="w-full px-3 py-2 text-xs font-mono bg-[#090D16] border border-slate-700 rounded text-white"
              >
                {Object.entries(ECON_ALLOYS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.name} (Powder: ${v.powderPriceKg}/kg)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <label htmlFor="part-vol-slider" className="text-slate-300">
                  Finished Part Solid Volume
                </label>
                <span className="text-amber-400 font-semibold tabular-nums">
                  {partVolumeCm3} cm³ ({metrics.partMassKg.toFixed(2)} kg)
                </span>
              </div>
              <input
                id="part-vol-slider"
                type="range"
                min={30}
                max={600}
                step={10}
                value={partVolumeCm3}
                onChange={(e) => setPartVolumeCm3(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <label htmlFor="btf-slider" className="text-slate-300">
                  Legacy CNC Forged Billet Buy-to-Fly Ratio
                </label>
                <span className="text-amber-400 font-semibold tabular-nums">
                  {cncBuyToFly}.0 : 1 (vs. 1.22 : 1 SLM)
                </span>
              </div>
              <input
                id="btf-slider"
                type="range"
                min={4}
                max={22}
                step={1}
                value={cncBuyToFly}
                onChange={(e) => setCncBuyToFly(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-[#111827] border border-slate-800 rounded">
              <div className="text-[10.5px] font-mono text-slate-400">DEPOSITION RATE</div>
              <div className="mt-1 flex items-baseline">
                <span className="text-2xl font-mono font-semibold text-amber-400 tabular-nums">
                  {metrics.depositionRateCm3H.toFixed(0)}
                </span>
                <span className="text-xs font-mono text-slate-400 ml-1">cm³/h</span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-1">
                {metrics.printHoursPerPart.toFixed(1)} hrs / unit
              </div>
            </div>

            <div className="p-3.5 bg-[#111827] border border-slate-800 rounded">
              <div className="text-[10.5px] font-mono text-slate-400">SLM UNIT COST</div>
              <div className="mt-1 flex items-baseline">
                <span className="text-2xl font-mono font-semibold text-white tabular-nums">
                  ${Math.round(metrics.totalSlmUnitCost)}
                </span>
                <span className="text-xs font-mono text-slate-400 ml-1">/ part</span>
              </div>
              <div className="text-[11px] font-mono text-emerald-400 mt-1">
                Zero Tooling NRE
              </div>
            </div>

            <div className="p-3.5 bg-[#111827] border border-slate-800 rounded">
              <div className="text-[10.5px] font-mono text-slate-400">ALLOY SAVED / PART</div>
              <div className="mt-1 flex items-baseline">
                <span className="text-2xl font-mono font-semibold text-cyan-400 tabular-nums">
                  {metrics.massSavedPerPartKg.toFixed(1)}
                </span>
                <span className="text-xs font-mono text-slate-400 ml-1">kg</span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-1">
                Billet: {metrics.cncBilletMassKg.toFixed(1)} kg
              </div>
            </div>

            <div className="p-3.5 bg-[#111827] border border-slate-800 rounded">
              <div className="text-[10.5px] font-mono text-slate-400">BREAK-EVEN LOT</div>
              <div className="mt-1 flex items-baseline">
                <span className="text-2xl font-mono font-semibold text-emerald-400 tabular-nums">
                  {metrics.breakEvenLotUnits}
                </span>
                <span className="text-xs font-mono text-slate-400 ml-1">units</span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-1">
                OEE: {metrics.oeePct}%
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#111827] border border-slate-800 rounded">
            <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-3">
              <span>FINISHED SLM PART COST DECOMPOSITION ($ / UNIT)</span>
              <span className="text-white font-semibold tabular-nums">
                Total: ${Math.round(metrics.totalSlmUnitCost)}
              </span>
            </div>

            {(() => {
              const total = metrics.totalSlmUnitCost;
              const machPct = (metrics.machineAmortizationCost / total) * 100;
              const matPct = (metrics.slmMaterialCost / total) * 100;
              const postPct = (metrics.postProcessLaborCost / total) * 100;
              const ndtPct = (metrics.ndtCostPerPart / total) * 100;

              return (
                <div>
                  <div className="w-full h-5 rounded overflow-hidden flex bg-slate-900 border border-slate-700">
                    <div
                      style={{ width: `${machPct}%` }}
                      className="bg-amber-500 h-full"
                      title="Machine & Optics Amortization"
                    />
                    <div
                      style={{ width: `${matPct}%` }}
                      className="bg-cyan-500 h-full"
                      title="Spherical Powder Feedstock"
                    />
                    <div
                      style={{ width: `${postPct}%` }}
                      className="bg-emerald-500 h-full"
                      title="HIP, Stress-Relief, Wire-EDM & Finish CNC"
                    />
                    <div
                      style={{ width: `${ndtPct}%` }}
                      className="bg-rose-500 h-full"
                      title="NDT / Quality Certification"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 text-xs font-mono">
                    <div>
                      <span className="text-amber-400">■ Machine Time:</span>
                      <div className="text-white font-semibold tabular-nums">
                        ${Math.round(metrics.machineAmortizationCost)} ({machPct.toFixed(0)}%)
                      </div>
                    </div>
                    <div>
                      <span className="text-cyan-400">■ Powder Alloy:</span>
                      <div className="text-white font-semibold tabular-nums">
                        ${Math.round(metrics.slmMaterialCost)} ({matPct.toFixed(0)}%)
                      </div>
                    </div>
                    <div>
                      <span className="text-emerald-400">■ Post-Process:</span>
                      <div className="text-white font-semibold tabular-nums">
                        ${Math.round(metrics.postProcessLaborCost)} ({postPct.toFixed(0)}%)
                      </div>
                    </div>
                    <div>
                      <span className="text-rose-400">■ QA / NDT Cert:</span>
                      <div className="text-white font-semibold tabular-nums">
                        ${Math.round(metrics.ndtCostPerPart)} ({ndtPct.toFixed(0)}%)
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          <div className="p-4 bg-[#090D16] border border-slate-800 rounded">
            <div className="flex items-center justify-between text-xs font-mono text-slate-300 mb-2">
              <span>UNIT COST CROSSOVER: SLM SERIAL PRODUCTION VS. DEDICATED TOOLING / CASTING</span>
              <span className="text-amber-400">Break-Even ≤ {metrics.breakEvenLotUnits} Parts</span>
            </div>
            <svg
              viewBox="0 0 560 175"
              className="w-full h-auto select-none"
              role="img"
              aria-label="Economic Break-Even Crossover Chart comparing SLM to Conventional Tooling"
            >
              {[35, 75, 115, 145].map((y) => (
                <line
                  key={y}
                  x1="45"
                  y1={y}
                  x2="535"
                  y2={y}
                  stroke="#1E293B"
                  strokeWidth="1"
                />
              ))}
              <line x1="45" y1="145" x2="535" y2="145" stroke="#475569" strokeWidth="1.5" />
              <line x1="45" y1="20" x2="45" y2="145" stroke="#475569" strokeWidth="1.5" />

              <path
                d="M 55 24 Q 145 105 530 128"
                fill="none"
                stroke="#64748B"
                strokeWidth="2"
                strokeDasharray="5 3"
              />
              <text x="345" y="118" fill="#94A3B8" className="text-[10px] font-mono">
                Conventional Die/Casting + CNC ($28k Tooling NRE)
              </text>

              {(() => {
                const slmLineY = Math.max(45, Math.min(115, 130 - metrics.totalSlmUnitCost * 0.045));
                const crossX = Math.max(85, Math.min(460, 55 + (metrics.breakEvenLotUnits / 120) * 320));
                return (
                  <g>
                    <line
                      x1="45"
                      y1={slmLineY}
                      x2="535"
                      y2={slmLineY}
                      stroke="#F59E0B"
                      strokeWidth="2.5"
                    />
                    <text
                      x="58"
                      y={slmLineY - 8}
                      fill="#FBBF24"
                      className="text-[10px] font-mono font-semibold"
                    >
                      SLM Unit Cost (${Math.round(metrics.totalSlmUnitCost)}/part — Complexity Free)
                    </text>

                    <circle
                      cx={crossX}
                      cy={slmLineY}
                      r="5"
                      fill="#10B981"
                      stroke="#ECFDF5"
                      strokeWidth="1.5"
                    />
                    <text
                      x={crossX}
                      y="164"
                      textAnchor="middle"
                      fill="#6EE7B7"
                      className="text-[10px] font-mono font-semibold"
                    >
                      ▲ Economic Crossover: {metrics.breakEvenLotUnits} Units
                    </text>
                  </g>
                );
              })()}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
