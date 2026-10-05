import React, { useState, useMemo } from 'react';
import { ALLOWED_ALLOYS, AlloyMaterial } from '../data/slmMonographData';
import { RotateCcw, Crosshair, Layers, Compass } from 'lucide-react';

type StageViewMode = 'pv-map' | 'cross-section' | 'scan-strategy';
type ScanStrategyType = 'stripe-67' | 'island-chess' | 'meander';

export const MeltPoolSimulator: React.FC = () => {
  const [selectedAlloyId, setSelectedAlloyId] = useState<string>('ti64-eli');
  const currentAlloy: AlloyMaterial = useMemo(
    () => ALLOWED_ALLOYS.find((a) => a.id === selectedAlloyId) || ALLOWED_ALLOYS[0],
    [selectedAlloyId]
  );

  const [powerW, setPowerW] = useState<number>(currentAlloy.defaultPowerW);
  const [speedMmS, setSpeedMmS] = useState<number>(currentAlloy.defaultSpeedMmS);
  const [hatchMm, setHatchMm] = useState<number>(currentAlloy.defaultHatchMm);
  const [layerUm, setLayerUm] = useState<number>(currentAlloy.defaultLayerUm);
  const [viewMode, setViewMode] = useState<StageViewMode>('pv-map');
  const [scanStrategy, setScanStrategy] = useState<ScanStrategyType>('stripe-67');

  const handleSelectAlloy = (alloyId: string) => {
    const target = ALLOWED_ALLOYS.find((a) => a.id === alloyId);
    if (target) {
      setSelectedAlloyId(alloyId);
      setPowerW(target.defaultPowerW);
      setSpeedMmS(target.defaultSpeedMmS);
      setHatchMm(target.defaultHatchMm);
      setLayerUm(target.defaultLayerUm);
    }
  };

  const simulationMetrics = useMemo(() => {
    const layerMm = layerUm / 1000;
    const ev = powerW / (speedMmS * hatchMm * layerMm);
    const el = powerW / speedMmS;
    const buildRateCm3H = speedMmS * hatchMm * layerMm * 3.6;

    const condFactor = Math.pow(15 / Math.max(currentAlloy.thermalConductivityWmK, 6), 0.22);

    const meltWidthUm = Math.round(
      Math.max(45, Math.min(340, 82 * Math.sqrt(powerW / 200) * Math.pow(1000 / speedMmS, 0.38) * condFactor))
    );
    const meltDepthUm = Math.round(
      Math.max(
        18,
        Math.min(
          380,
          48 * Math.pow(powerW / 200, 1.15) * Math.pow(1000 / speedMmS, 0.55) * condFactor
        )
      )
    );

    const aspectRatioDW = meltDepthUm / meltWidthUm;
    const overlapRatio = (meltWidthUm / 1000 - hatchMm) / (meltWidthUm / 1000);
    const penetrationRatio = meltDepthUm / layerUm;

    const [minOptEv, maxOptEv] = currentAlloy.optimalEvRange;

    let regimeCode: 'NOMINAL' | 'KEYHOLE' | 'LACK_OF_FUSION' | 'BALLING' = 'NOMINAL';
    let regimeLabel = '● NOMINAL CONDUCTION / TRANSITION WINDOW';
    let regimeShort = '● NOMINAL';
    let regimeDiagnosis =
      'Balanced volumetric energy density achieves complete interlayer wetting (depth/layer ratio 1.8–3.2×) and stable lateral track overlap without vapor-depression collapse.';
    let predictedDensity = 99.85;

    if (speedMmS > 1550 && powerW > 280 && aspectRatioDW < 0.65) {
      regimeCode = 'BALLING';
      regimeLabel = '▲ BALLING / PLATEAU-RAYLEIGH INSTABILITY';
      regimeShort = '▲ BALLING';
      regimeDiagnosis =
        'High scan velocity elongates the liquid melt track until surface tension triggers Plateau-Rayleigh capillary instability, breaking the continuous track into discontinuous metallic spheres.';
      predictedDensity = Math.max(93.5, 98.4 - (speedMmS - 1500) * 0.006);
    } else if (ev > maxOptEv * 1.18 || aspectRatioDW > 1.15) {
      regimeCode = 'KEYHOLE';
      regimeLabel = '✖ KEYHOLE VAPOR DEPRESSION POROSITY';
      regimeShort = '✖ KEYHOLE';
      regimeDiagnosis =
        'Excessive irradiance vaporizes alloying elements, drilling a deep narrow vapor cavity (D/W > 1.1). Acoustic oscillations pinch off the cavity root, trapping spherical Argon/metal-vapor gas pores.';
      const excess = Math.max(0, ev - maxOptEv);
      predictedDensity = Math.max(94.2, 99.7 - excess * 0.065);
    } else if (ev < minOptEv * 0.85 || penetrationRatio < 1.25 || overlapRatio < 0.12) {
      regimeCode = 'LACK_OF_FUSION';
      regimeLabel = '✖ LACK OF FUSION (INSUFFICIENT WETTING)';
      regimeShort = '✖ LACK OF FUSION';
      regimeDiagnosis =
        'Insufficient energy density or excessive hatch/layer spacing prevents the melt pool from fully penetrating the underlying layer or overlapping adjacent tracks, leaving sharp irregular unmelted voids.';
      const deficit = Math.max(5, minOptEv - ev);
      predictedDensity = Math.max(91.0, 99.4 - deficit * 0.14);
    } else {
      const centerEv = (minOptEv + maxOptEv) / 2;
      const dist = Math.abs(ev - centerEv) / (maxOptEv - minOptEv);
      predictedDensity = Math.min(99.94, Math.max(99.5, currentAlloy.relativeDensityPct - dist * 0.25));
    }

    return {
      ev,
      el,
      buildRateCm3H,
      meltWidthUm,
      meltDepthUm,
      aspectRatioDW,
      overlapRatio,
      penetrationRatio,
      regimeCode,
      regimeLabel,
      regimeShort,
      regimeDiagnosis,
      predictedDensity
    };
  }, [powerW, speedMmS, hatchMm, layerUm, currentAlloy]);

  const applyScenarioPreset = (preset: 'optimal' | 'keyhole' | 'lof' | 'balling') => {
    if (preset === 'optimal') {
      setPowerW(currentAlloy.defaultPowerW);
      setSpeedMmS(currentAlloy.defaultSpeedMmS);
      setHatchMm(currentAlloy.defaultHatchMm);
      setLayerUm(currentAlloy.defaultLayerUm);
    } else if (preset === 'keyhole') {
      setPowerW(Math.min(550, Math.round(currentAlloy.defaultPowerW * 1.55)));
      setSpeedMmS(Math.max(450, Math.round(currentAlloy.defaultSpeedMmS * 0.58)));
      setHatchMm(currentAlloy.defaultHatchMm);
      setLayerUm(currentAlloy.defaultLayerUm);
    } else if (preset === 'lof') {
      setPowerW(Math.max(120, Math.round(currentAlloy.defaultPowerW * 0.62)));
      setSpeedMmS(Math.min(1850, Math.round(currentAlloy.defaultSpeedMmS * 1.35)));
      setHatchMm(0.14);
      setLayerUm(60);
    } else if (preset === 'balling') {
      setPowerW(360);
      setSpeedMmS(1900);
      setHatchMm(0.11);
      setLayerUm(30);
    }
  };

  const handlePvChartClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const normX = (clickX / rect.width) * 600;
    const normY = (clickY / rect.height) * 360;
    if (normX >= 65 && normX <= 565 && normY >= 30 && normY <= 310) {
      const newSpeed = Math.round(300 + ((normX - 65) / 500) * 1900);
      const newPower = Math.round(550 - ((normY - 30) / 280) * 450);
      setSpeedMmS(Math.max(300, Math.min(2200, newSpeed)));
      setPowerW(Math.max(100, Math.min(550, newPower)));
    }
  };

  const markerX = 65 + ((speedMmS - 300) / 1900) * 500;
  const markerY = 30 + ((550 - powerW) / 450) * 280;

  return (
    <div className="border border-slate-800 bg-[#0D131F] rounded-lg overflow-hidden">
      <div className="px-5 py-3.5 bg-[#111827] border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-slate-400">ACTIVE CALIBRATION</span>
          <span className="text-slate-600">·</span>
          <span className="font-mono text-xs font-semibold text-amber-400">
            {currentAlloy.designation}
          </span>
          <span className="text-slate-600">·</span>
          <span className="font-mono text-xs text-slate-300">
            λ = {currentAlloy.laserWavelengthNm} nm
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <span
            className={`inline-block w-2 h-2 rounded-full ${
              simulationMetrics.regimeCode === 'NOMINAL'
                ? 'bg-emerald-400 ring-4 ring-emerald-500/20'
                : simulationMetrics.regimeCode === 'BALLING'
                ? 'bg-amber-400 ring-4 ring-amber-500/20'
                : 'bg-rose-500 ring-4 ring-rose-500/20'
            }`}
          />
          <span
            className={`font-mono text-xs font-semibold tracking-wide ${
              simulationMetrics.regimeCode === 'NOMINAL'
                ? 'text-emerald-300'
                : simulationMetrics.regimeCode === 'BALLING'
                ? 'text-amber-300'
                : 'text-rose-300'
            }`}
          >
            {simulationMetrics.regimeLabel}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-8 p-5 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-1 p-1 bg-[#090D16] border border-slate-800 rounded-md">
              <button
                type="button"
                onClick={() => setViewMode('pv-map')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  viewMode === 'pv-map'
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Crosshair className="w-3.5 h-3.5" />
                P–v Processing Window
              </button>
              <button
                type="button"
                onClick={() => setViewMode('cross-section')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  viewMode === 'cross-section'
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Melt Pool Cross-Section
              </button>
              <button
                type="button"
                onClick={() => setViewMode('scan-strategy')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  viewMode === 'scan-strategy'
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                Interlayer Scan Vectors
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => applyScenarioPreset('optimal')}
                className="px-2.5 py-1 text-xs font-mono bg-slate-800/80 hover:bg-slate-700 text-emerald-300 border border-slate-700 rounded transition-colors whitespace-nowrap"
              >
                ● Optimal Window
              </button>
              <button
                type="button"
                onClick={() => applyScenarioPreset('keyhole')}
                className="px-2.5 py-1 text-xs font-mono bg-slate-800/80 hover:bg-slate-700 text-rose-300 border border-slate-700 rounded transition-colors whitespace-nowrap"
              >
                ✖ Keyhole Fault
              </button>
              <button
                type="button"
                onClick={() => applyScenarioPreset('lof')}
                className="px-2.5 py-1 text-xs font-mono bg-slate-800/80 hover:bg-slate-700 text-amber-300 border border-slate-700 rounded transition-colors whitespace-nowrap"
              >
                ✖ Lack of Fusion
              </button>
              <button
                type="button"
                onClick={() => applyScenarioPreset('balling')}
                className="px-2.5 py-1 text-xs font-mono bg-slate-800/80 hover:bg-slate-700 text-cyan-300 border border-slate-700 rounded transition-colors whitespace-nowrap"
              >
                ▲ Balling
              </button>
            </div>
          </div>

          <div className="relative bg-[#070A12] border border-slate-800/90 rounded-md overflow-hidden">
            {viewMode === 'pv-map' && (
              <div>
                <svg
                  viewBox="0 0 600 360"
                  className="w-full h-auto cursor-crosshair select-none"
                  onClick={handlePvChartClick}
                  role="img"
                  aria-label="Interactive Laser Power versus Scan Speed Metallurgical Processing Window"
                >
                  <defs>
                    <pattern id="pvGrid" width="50" height="35" patternUnits="userSpaceOnUse">
                      <path
                        d="M 50 0 L 0 0 0 35"
                        fill="none"
                        stroke="#1E293B"
                        strokeWidth="0.75"
                      />
                    </pattern>
                  </defs>

                  <rect x="65" y="30" width="500" height="280" fill="url(#pvGrid)" />

                  <polygon
                    points="65,30 390,30 250,185 65,245"
                    fill="rgba(244, 63, 94, 0.14)"
                    stroke="#F43F5E"
                    strokeWidth="1"
                    strokeDasharray="4 3"
                  />
                  <text x="82" y="62" fill="#FDA4AF" className="text-[11px] font-mono font-semibold">
                    ✖ KEYHOLE VAPOR DEPRESSION
                  </text>
                  <text x="82" y="78" fill="#94A3B8" className="text-[9.5px] font-mono">
                    Excess Ev ({'>'} {currentAlloy.optimalEvRange[1]} J/mm³) · Trapped root gas pores
                  </text>

                  <polygon
                    points="65,245 250,185 390,30 510,30 460,155 245,275 65,295"
                    fill="rgba(16, 185, 129, 0.15)"
                    stroke="#10B981"
                    strokeWidth="1.5"
                  />
                  <text x="195" y="162" fill="#6EE7B7" className="text-[11px] font-mono font-semibold">
                    ● OPTIMAL CONDUCTION WINDOW
                  </text>
                  <text x="195" y="178" fill="#A7F3D0" className="text-[9.5px] font-mono">
                    Target Ev: {currentAlloy.optimalEvRange[0]}–{currentAlloy.optimalEvRange[1]} J/mm³ ({'>'}99.8% dense)
                  </text>

                  <polygon
                    points="510,30 565,30 565,185 460,155"
                    fill="rgba(245, 158, 11, 0.16)"
                    stroke="#F59E0B"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  <text x="458" y="75" fill="#FCD34D" className="text-[10px] font-mono font-semibold">
                    ▲ BALLING
                  </text>
                  <text x="448" y="90" fill="#CBD5E1" className="text-[8.5px] font-mono">
                    Plateau-Rayleigh
                  </text>

                  <polygon
                    points="65,295 245,275 460,155 565,185 565,310 65,310"
                    fill="rgba(56, 189, 248, 0.11)"
                    stroke="#38BDF8"
                    strokeWidth="1"
                    strokeDasharray="4 3"
                  />
                  <text x="335" y="268" fill="#7DD3FC" className="text-[11px] font-mono font-semibold">
                    ✖ LACK OF FUSION (UNMELTED VOIDS)
                  </text>
                  <text x="335" y="284" fill="#94A3B8" className="text-[9.5px] font-mono">
                    Insufficient penetration (Ev {'<'} {currentAlloy.optimalEvRange[0]} J/mm³)
                  </text>

                  <line x1="65" y1="310" x2="565" y2="310" stroke="#475569" strokeWidth="1.5" />
                  <line x1="65" y1="30" x2="65" y2="310" stroke="#475569" strokeWidth="1.5" />

                  {[400, 800, 1200, 1600, 2000].map((spd) => {
                    const tx = 65 + ((spd - 300) / 1900) * 500;
                    return (
                      <g key={spd}>
                        <line x1={tx} y1="310" x2={tx} y2="316" stroke="#64748B" />
                        <text
                          x={tx}
                          y="330"
                          textAnchor="middle"
                          fill="#94A3B8"
                          className="text-[10px] font-mono"
                        >
                          {spd}
                        </text>
                      </g>
                    );
                  })}
                  <text
                    x="315"
                    y="350"
                    textAnchor="middle"
                    fill="#CBD5E1"
                    className="text-[11px] font-mono"
                  >
                    Scan Velocity v (mm/s) — Click Anywhere on Map to Probe Regime
                  </text>

                  {[150, 250, 350, 450, 550].map((pwr) => {
                    const ty = 30 + ((550 - pwr) / 450) * 280;
                    return (
                      <g key={pwr}>
                        <line x1="59" y1={ty} x2="65" y2={ty} stroke="#64748B" />
                        <text
                          x="54"
                          y={ty + 3}
                          textAnchor="end"
                          fill="#94A3B8"
                          className="text-[10px] font-mono"
                        >
                          {pwr}W
                        </text>
                      </g>
                    );
                  })}

                  <line
                    x1={markerX}
                    y1="30"
                    x2={markerX}
                    y2="310"
                    stroke="#F59E0B"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                  <line
                    x1="65"
                    y1={markerY}
                    x2="565"
                    y2={markerY}
                    stroke="#F59E0B"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                  <circle
                    cx={markerX}
                    cy={markerY}
                    r="9"
                    fill="rgba(245, 158, 11, 0.25)"
                    stroke="#F59E0B"
                    strokeWidth="2"
                  />
                  <circle cx={markerX} cy={markerY} r="3.5" fill="#FEF3C7" />

                  <g
                    transform={`translate(${markerX > 410 ? markerX - 155 : markerX + 14}, ${
                      markerY < 80 ? markerY + 12 : markerY - 46
                    })`}
                  >
                    <rect
                      x="0"
                      y="0"
                      width="142"
                      height="38"
                      rx="3"
                      fill="#0F172A"
                      stroke="#F59E0B"
                      strokeWidth="1"
                    />
                    <text x="8" y="15" fill="#FEF3C7" className="text-[10px] font-mono font-semibold">
                      P={powerW}W · v={speedMmS}mm/s
                    </text>
                    <text x="8" y="29" fill="#F59E0B" className="text-[10px] font-mono">
                      Ev = {simulationMetrics.ev.toFixed(1)} J/mm³
                    </text>
                  </g>
                </svg>
              </div>
            )}

            {viewMode === 'cross-section' && (
              <div>
                <svg
                  viewBox="0 0 600 360"
                  className="w-full h-auto select-none"
                  role="img"
                  aria-label="Cross-sectional schematic of SLM melt pool geometry and interlayer fusion"
                >
                  <rect x="40" y="175" width="520" height="155" fill="#1E293B" />
                  {[175, 215, 255, 295].map((ly, idx) => (
                    <g key={ly}>
                      <line
                        x1="40"
                        y1={ly}
                        x2="560"
                        y2={ly}
                        stroke="#334155"
                        strokeWidth="1"
                        strokeDasharray="6 4"
                      />
                      <text x="48" y={ly + 15} fill="#64748B" className="text-[9.5px] font-mono">
                        {idx === 0
                          ? `Layer n-1 (Remelting Zone)`
                          : `Solidified Layer n-${idx + 1} (Columnar Prior-β / γ Grains)`}
                      </text>
                    </g>
                  ))}

                  {(() => {
                    const layerPx = Math.round(layerUm * 0.65);
                    const powderTopY = 175 - layerPx;
                    const poolWidthPx = Math.min(240, Math.max(55, simulationMetrics.meltWidthUm * 0.75));
                    const poolDepthPx = Math.min(145, Math.max(20, simulationMetrics.meltDepthUm * 0.65));
                    const hatchOffsetPx = Math.min(160, Math.round(hatchMm * 1000 * 0.75));

                    return (
                      <g>
                        <rect
                          x="40"
                          y={powderTopY}
                          width="520"
                          height={layerPx}
                          fill="rgba(51, 65, 85, 0.35)"
                          stroke="#475569"
                          strokeWidth="1"
                        />

                        {Array.from({ length: 18 }).map((_, i) => {
                          const px = 52 + i * 11;
                          if (px > 280 - poolWidthPx / 2 - 15) return null;
                          return (
                            <circle
                              key={`L-${i}`}
                              cx={px}
                              cy={175 - layerPx / 2 + ((i % 3) - 1) * 3}
                              r={Math.max(4, layerPx * 0.28)}
                              fill="#64748B"
                              stroke="#94A3B8"
                              strokeWidth="0.7"
                            />
                          );
                        })}
                        {Array.from({ length: 16 }).map((_, i) => {
                          const px = 320 + poolWidthPx / 2 + i * 12;
                          if (px > 548) return null;
                          return (
                            <circle
                              key={`R-${i}`}
                              cx={px}
                              cy={175 - layerPx / 2 + ((i % 2) - 0.5) * 3}
                              r={Math.max(4, layerPx * 0.28)}
                              fill="#64748B"
                              stroke="#94A3B8"
                              strokeWidth="0.7"
                            />
                          );
                        })}

                        <path
                          d={`M ${290 - hatchOffsetPx - poolWidthPx / 2} ${powderTopY + 4} Q ${
                            290 - hatchOffsetPx
                          } ${powderTopY + poolDepthPx * 1.45} ${
                            290 - hatchOffsetPx + poolWidthPx / 2
                          } ${powderTopY + 4} Z`}
                          fill="rgba(148, 163, 184, 0.28)"
                          stroke="#94A3B8"
                          strokeWidth="1.5"
                        />
                        <text
                          x={290 - hatchOffsetPx}
                          y={powderTopY + 22}
                          textAnchor="middle"
                          fill="#CBD5E1"
                          className="text-[9px] font-mono"
                        >
                          Track m-1
                        </text>

                        {simulationMetrics.regimeCode === 'LACK_OF_FUSION' && (
                          <g>
                            <polygon
                              points={`${290 - hatchOffsetPx / 2 - 12},174 ${
                                290 - hatchOffsetPx / 2 + 10
                              },170 ${290 - hatchOffsetPx / 2 + 16},184 ${
                                290 - hatchOffsetPx / 2 - 8
                              },186`}
                              fill="#090D16"
                              stroke="#38BDF8"
                              strokeWidth="1.5"
                            />
                            <text
                              x={290 - hatchOffsetPx / 2}
                              y="202"
                              textAnchor="middle"
                              fill="#38BDF8"
                              className="text-[10px] font-mono font-semibold"
                            >
                              ✖ Unmelted LoF Void
                            </text>
                          </g>
                        )}

                        <path
                          d={`M ${290 - poolWidthPx / 2} ${powderTopY + 2} Q 290 ${
                            powderTopY + poolDepthPx * 1.65
                          } ${290 + poolWidthPx / 2} ${powderTopY + 2} Z`}
                          fill="rgba(245, 158, 11, 0.35)"
                          stroke="#F59E0B"
                          strokeWidth="2"
                        />

                        <path
                          d={`M ${290 - poolWidthPx * 0.3} ${powderTopY + 2} Q 290 ${
                            powderTopY + poolDepthPx * 1.15
                          } ${290 + poolWidthPx * 0.3} ${powderTopY + 2} Z`}
                          fill="rgba(254, 243, 199, 0.45)"
                        />

                        {simulationMetrics.regimeCode === 'KEYHOLE' && (
                          <g>
                            <path
                              d={`M 282 ${powderTopY + 2} Q 290 ${
                                powderTopY + poolDepthPx * 1.35
                              } 298 ${powderTopY + 2} Z`}
                              fill="#090D16"
                              stroke="#F43F5E"
                              strokeWidth="1.2"
                            />
                            <circle
                              cx="290"
                              cy={powderTopY + poolDepthPx * 1.1}
                              r="6"
                              fill="#090D16"
                              stroke="#F43F5E"
                              strokeWidth="1.5"
                            />
                            <text
                              x="312"
                              y={powderTopY + poolDepthPx * 1.12}
                              fill="#FDA4AF"
                              className="text-[10px] font-mono font-semibold"
                            >
                              ✖ Trapped Keyhole Pore
                            </text>
                          </g>
                        )}

                        <polygon
                          points={`255,15 325,15 ${290 + 24},${powderTopY + 2} ${290 - 24},${
                            powderTopY + 2
                          }`}
                          fill="rgba(245, 158, 11, 0.22)"
                          stroke="#FBBF24"
                          strokeWidth="1"
                          strokeDasharray="3 2"
                        />

                        <text x="415" y="45" fill="#F8FAFC" className="text-[11px] font-mono font-semibold">
                          MELT POOL GEOMETRY
                        </text>
                        <text x="415" y="64" fill="#FBBF24" className="text-[10.5px] font-mono">
                          Width W = {simulationMetrics.meltWidthUm} μm
                        </text>
                        <text x="415" y="80" fill="#FBBF24" className="text-[10.5px] font-mono">
                          Depth D = {simulationMetrics.meltDepthUm} μm
                        </text>
                        <text x="415" y="96" fill="#CBD5E1" className="text-[10.5px] font-mono">
                          Aspect D/W = {simulationMetrics.aspectRatioDW.toFixed(2)}
                        </text>
                        <text x="415" y="112" fill="#94A3B8" className="text-[10px] font-mono">
                          Layer Penetration = {simulationMetrics.penetrationRatio.toFixed(1)}× t
                        </text>
                      </g>
                    );
                  })()}
                </svg>
              </div>
            )}

            {viewMode === 'scan-strategy' && (
              <div className="p-4">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-xs text-slate-300">
                    SELECT SCAN VECTOR PARTITIONING STRATEGY:
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setScanStrategy('stripe-67')}
                      className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors ${
                        scanStrategy === 'stripe-67'
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-semibold'
                          : 'border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      67° Helical Stripe
                    </button>
                    <button
                      type="button"
                      onClick={() => setScanStrategy('island-chess')}
                      className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors ${
                        scanStrategy === 'island-chess'
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-semibold'
                          : 'border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      5×5 mm Chessboard Islands
                    </button>
                    <button
                      type="button"
                      onClick={() => setScanStrategy('meander')}
                      className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors ${
                        scanStrategy === 'meander'
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-semibold'
                          : 'border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      Unidirectional Meander
                    </button>
                  </div>
                </div>

                <svg
                  viewBox="0 0 560 280"
                  className="w-full h-auto select-none"
                  role="img"
                  aria-label="SLM Scan Vector Strategy Comparison"
                >
                  <rect x="20" y="15" width="240" height="240" rx="6" fill="#0F172A" stroke="#334155" />
                  <rect x="295" y="15" width="245" height="240" rx="6" fill="#0F172A" stroke="#334155" />

                  {scanStrategy === 'stripe-67' && (
                    <g>
                      <text x="35" y="38" fill="#FBBF24" className="text-[11px] font-mono font-semibold">
                        LAYER n (θ = 0°) · LAYER n+1 (θ = 67°)
                      </text>
                      <line x1="95" y1="55" x2="95" y2="235" stroke="#475569" strokeDasharray="3 3" />
                      <line x1="175" y1="55" x2="175" y2="235" stroke="#475569" strokeDasharray="3 3" />
                      {[70, 90, 110, 130, 150, 170, 190, 210].map((y) => (
                        <g key={y}>
                          <line x1="40" y1={y} x2="90" y2={y} stroke="#10B981" strokeWidth="1.5" />
                          <line x1="100" y1={y + 5} x2="170" y2={y + 5} stroke="#10B981" strokeWidth="1.5" />
                          <line x1="180" y1={y} x2="240" y2={y} stroke="#10B981" strokeWidth="1.5" />
                        </g>
                      ))}
                      {[-30, -10, 10, 30, 50, 70].map((offset) => (
                        <line
                          key={offset}
                          x1={80 + offset}
                          y1="65"
                          x2={145 + offset}
                          y2="225"
                          stroke="#F59E0B"
                          strokeWidth="1.2"
                          strokeOpacity="0.8"
                        />
                      ))}

                      <text x="310" y="42" fill="#6EE7B7" className="text-[11px] font-mono font-semibold">
                        ● INDUSTRIAL GOLD STANDARD
                      </text>
                      <text x="310" y="68" fill="#E2E8F0" className="text-[10.5px] font-sans">
                        Rotating scan vectors by 67° per layer ensures
                      </text>
                      <text x="310" y="85" fill="#E2E8F0" className="text-[10.5px] font-sans">
                        that scan tracks do not repeat the same angular
                      </text>
                      <text x="310" y="102" fill="#E2E8F0" className="text-[10.5px] font-sans">
                        orientation for 360° / 67° ≈ 5.37 (over 180 layers).
                      </text>
                      <text x="310" y="132" fill="#94A3B8" className="text-[10px] font-mono">
                        • Residual Stress Anisotropy: LOW (Isotropic XY)
                      </text>
                      <text x="310" y="152" fill="#94A3B8" className="text-[10px] font-mono">
                        • Max Vector Length: 5–10 mm stripe width
                      </text>
                      <text x="310" y="172" fill="#94A3B8" className="text-[10px] font-mono">
                        • Defect Suppression: Heals aligned LoF channels
                      </text>
                    </g>
                  )}

                  {scanStrategy === 'island-chess' && (
                    <g>
                      <text x="35" y="38" fill="#FBBF24" className="text-[11px] font-mono font-semibold">
                        5×5 mm CHESSBOARD ISLANDS (90° ALTERNATING)
                      </text>
                      {[0, 1, 2].map((row) =>
                        [0, 1, 2].map((col) => {
                          const ix = 42 + col * 64;
                          const iy = 55 + row * 60;
                          const isHorizontal = (row + col) % 2 === 0;
                          return (
                            <g key={`${row}-${col}`}>
                              <rect
                                x={ix}
                                y={iy}
                                width="56"
                                height="52"
                                fill="none"
                                stroke="#475569"
                                strokeWidth="1"
                              />
                              {isHorizontal
                                ? [10, 22, 34, 44].map((dy) => (
                                    <line
                                      key={dy}
                                      x1={ix + 5}
                                      y1={iy + dy}
                                      x2={ix + 51}
                                      y2={iy + dy}
                                      stroke="#38BDF8"
                                      strokeWidth="1.5"
                                    />
                                  ))
                                : [10, 22, 34, 46].map((dx) => (
                                    <line
                                      key={dx}
                                      x1={ix + dx}
                                      y1={iy + 5}
                                      x2={ix + dx}
                                      y2={iy + 47}
                                      stroke="#F59E0B"
                                      strokeWidth="1.5"
                                    />
                                  ))}
                            </g>
                          );
                        })
                      )}
                      <text x="310" y="42" fill="#7DD3FC" className="text-[11px] font-mono font-semibold">
                        ● HIGH-CRACK-SENSITIVITY STRATEGY
                      </text>
                      <text x="310" y="68" fill="#E2E8F0" className="text-[10.5px] font-sans">
                        Divides large cross-sections into stochastic 5×5 mm
                      </text>
                      <text x="310" y="85" fill="#E2E8F0" className="text-[10.5px] font-sans">
                        orthogonal islands with 1 mm shift per layer.
                      </text>
                      <text x="310" y="132" fill="#94A3B8" className="text-[10px] font-mono">
                        • Shortens thermal contraction lever arm
                      </text>
                      <text x="310" y="152" fill="#94A3B8" className="text-[10px] font-mono">
                        • Risk: Pinholes at island border stitch corners
                      </text>
                    </g>
                  )}

                  {scanStrategy === 'meander' && (
                    <g>
                      <text x="35" y="38" fill="#FDA4AF" className="text-[11px] font-mono font-semibold">
                        LONG-VECTOR UNIDIRECTIONAL MEANDER
                      </text>
                      {[65, 85, 105, 125, 145, 165, 185, 205, 225].map((y) => (
                        <line
                          key={y}
                          x1="40"
                          y1={y}
                          x2="240"
                          y2={y}
                          stroke="#F43F5E"
                          strokeWidth="1.6"
                        />
                      ))}
                      <text x="310" y="42" fill="#FDA4AF" className="text-[11px] font-mono font-semibold">
                        ▲ HIGH WARPAGE RISK ON BULKY PARTS
                      </text>
                      <text x="310" y="68" fill="#E2E8F0" className="text-[10.5px] font-sans">
                        Long uninterrupted scan tracks accumulate severe
                      </text>
                      <text x="310" y="85" fill="#E2E8F0" className="text-[10.5px] font-sans">
                        longitudinal tensile stress (σ_xx), curling edges
                      </text>
                      <text x="310" y="102" fill="#E2E8F0" className="text-[10.5px] font-sans">
                        upward into the path of the recoater blade.
                      </text>
                      <text x="310" y="132" fill="#94A3B8" className="text-[10px] font-mono">
                        • Suitable only for thin struts (Ø {'<'} 3 mm)
                      </text>
                    </g>
                  )}
                </svg>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            <div className="p-3 bg-[#111827] border border-slate-800 rounded">
              <div className="text-[11px] font-mono text-slate-400">VOLUMETRIC ENERGY (Ev)</div>
              <div className="mt-1 flex items-baseline">
                <span className="text-2xl font-mono font-semibold text-white tabular-nums">
                  {simulationMetrics.ev.toFixed(1)}
                </span>
                <span className="text-xs font-mono text-slate-400 ml-1.5">J/mm³</span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-1">
                Target: {currentAlloy.optimalEvRange[0]}–{currentAlloy.optimalEvRange[1]} J/mm³
              </div>
            </div>

            <div className="p-3 bg-[#111827] border border-slate-800 rounded">
              <div className="text-[11px] font-mono text-slate-400">MELT POOL (W × D)</div>
              <div className="mt-1 flex items-baseline">
                <span className="text-2xl font-mono font-semibold text-amber-400 tabular-nums">
                  {simulationMetrics.meltWidthUm}×{simulationMetrics.meltDepthUm}
                </span>
                <span className="text-xs font-mono text-slate-400 ml-1.5">μm</span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-1">
                Aspect D/W: {simulationMetrics.aspectRatioDW.toFixed(2)}
              </div>
            </div>

            <div className="p-3 bg-[#111827] border border-slate-800 rounded">
              <div className="text-[11px] font-mono text-slate-400">PREDICTED DENSITY</div>
              <div className="mt-1 flex items-baseline">
                <span
                  className={`text-2xl font-mono font-semibold tabular-nums ${
                    simulationMetrics.predictedDensity >= 99.5
                      ? 'text-emerald-400'
                      : 'text-rose-400'
                  }`}
                >
                  {simulationMetrics.predictedDensity.toFixed(2)}
                </span>
                <span className="text-xs font-mono text-slate-400 ml-1.5">%</span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-1">
                {simulationMetrics.regimeShort}
              </div>
            </div>

            <div className="p-3 bg-[#111827] border border-slate-800 rounded">
              <div className="text-[11px] font-mono text-slate-400">SINGLE-LASER RATE</div>
              <div className="mt-1 flex items-baseline">
                <span className="text-2xl font-mono font-semibold text-cyan-400 tabular-nums">
                  {simulationMetrics.buildRateCm3H.toFixed(1)}
                </span>
                <span className="text-xs font-mono text-slate-400 ml-1.5">cm³/h</span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-1">
                El = {simulationMetrics.el.toFixed(2)} J/mm
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 p-5 bg-[#0B101B] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-white">
                Process Parameter Controls
              </h3>
              <button
                type="button"
                onClick={() => applyScenarioPreset('optimal')}
                className="text-xs font-mono text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
                title="Reset to Alloy Nominal Calibration"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>

            <div className="mb-5">
              <label
                htmlFor="sim-alloy-select"
                className="block text-xs font-mono text-slate-300 mb-1.5"
              >
                FEEDSTOCK ALLOY CALIBRATION
              </label>
              <select
                id="sim-alloy-select"
                value={selectedAlloyId}
                onChange={(e) => handleSelectAlloy(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-[#111827] border border-slate-700 rounded text-slate-100 font-medium focus:outline-none focus:border-amber-500"
              >
                {ALLOWED_ALLOYS.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.designation} ({a.family})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <label htmlFor="slider-power" className="text-slate-300">
                    Laser Power (P)
                  </label>
                  <span className="text-amber-400 font-semibold tabular-nums">{powerW} W</span>
                </div>
                <input
                  id="slider-power"
                  type="range"
                  min={100}
                  max={550}
                  step={5}
                  value={powerW}
                  onChange={(e) => setPowerW(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-0.5">
                  <span>100 W</span>
                  <span>Nominal: {currentAlloy.defaultPowerW} W</span>
                  <span>550 W</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <label htmlFor="slider-speed" className="text-slate-300">
                    Scan Velocity (v)
                  </label>
                  <span className="text-amber-400 font-semibold tabular-nums">{speedMmS} mm/s</span>
                </div>
                <input
                  id="slider-speed"
                  type="range"
                  min={300}
                  max={2200}
                  step={25}
                  value={speedMmS}
                  onChange={(e) => setSpeedMmS(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-0.5">
                  <span>300 mm/s</span>
                  <span>Nominal: {currentAlloy.defaultSpeedMmS} mm/s</span>
                  <span>2200 mm/s</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <label htmlFor="slider-hatch" className="text-slate-300">
                    Hatch Distance (h)
                  </label>
                  <span className="text-amber-400 font-semibold tabular-nums">
                    {hatchMm.toFixed(2)} mm ({Math.round(hatchMm * 1000)} μm)
                  </span>
                </div>
                <input
                  id="slider-hatch"
                  type="range"
                  min={0.06}
                  max={0.18}
                  step={0.01}
                  value={hatchMm}
                  onChange={(e) => setHatchMm(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-0.5">
                  <span>60 μm</span>
                  <span>Nominal: {Math.round(currentAlloy.defaultHatchMm * 1000)} μm</span>
                  <span>180 μm</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <label htmlFor="slider-layer" className="text-slate-300">
                    Layer Thickness (t)
                  </label>
                  <span className="text-amber-400 font-semibold tabular-nums">{layerUm} μm</span>
                </div>
                <input
                  id="slider-layer"
                  type="range"
                  min={20}
                  max={90}
                  step={5}
                  value={layerUm}
                  onChange={(e) => setLayerUm(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-0.5">
                  <span>20 μm (Fine)</span>
                  <span>Nominal: {currentAlloy.defaultLayerUm} μm</span>
                  <span>90 μm (Hull/Core)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3.5 bg-[#111827] border border-slate-800 rounded">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1.5">
              <span>METALLURGICAL DIAGNOSIS</span>
              <span>Ev = P / (v·h·t)</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              {simulationMetrics.regimeDiagnosis}
            </p>
            <div className="mt-2.5 pt-2.5 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Shield Gas: {currentAlloy.shieldGas}</span>
              <span>k = {currentAlloy.thermalConductivityWmK} W/m·K</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
