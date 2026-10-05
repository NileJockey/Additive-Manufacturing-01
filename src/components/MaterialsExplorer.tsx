import React, { useState, useMemo } from 'react';
import {
  ALLOWED_ALLOYS,
  RESTRICTED_MATERIALS,
  AlloyMaterial
} from '../data/slmMonographData';

type FamilyFilter =
  | 'ALL'
  | 'Titanium'
  | 'Nickel Superalloys'
  | 'Ferrous & Tool Steels'
  | 'Aluminum'
  | 'CoCr & Refractory'
  | 'Copper Alloys';

export const MaterialsExplorer: React.FC = () => {
  const [familyFilter, setFamilyFilter] = useState<FamilyFilter>('ALL');
  const [conditionMode, setConditionMode] = useState<'asBuilt' | 'heatTreated'>('heatTreated');
  const [selectedAlloyId, setSelectedAlloyId] = useState<string>('ti64-eli');

  const filteredAlloys = useMemo(() => {
    if (familyFilter === 'ALL') return ALLOWED_ALLOYS;
    return ALLOWED_ALLOYS.filter((a) => a.family === familyFilter);
  }, [familyFilter]);

  const activeAlloy: AlloyMaterial = useMemo(() => {
    return (
      ALLOWED_ALLOYS.find((a) => a.id === selectedAlloyId) ||
      filteredAlloys[0] ||
      ALLOWED_ALLOYS[0]
    );
  }, [selectedAlloyId, filteredAlloys]);

  const familyCategories: FamilyFilter[] = [
    'ALL',
    'Titanium',
    'Nickel Superalloys',
    'Ferrous & Tool Steels',
    'Aluminum',
    'CoCr & Refractory',
    'Copper Alloys'
  ];

  return (
    <div className="space-y-10">
      <div className="p-6 bg-[#0D131F] border border-slate-800 rounded-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <div className="text-xs font-mono text-amber-400">
              ISO/ASTM 52907 · FEEDSTOCK QUALIFICATION SPECIFICATIONS
            </div>
            <h3 className="text-xl font-semibold text-white mt-1">
              Spherical Powder Metallurgy & Rheological Prerequisites
            </h3>
          </div>
          <div className="text-xs font-mono text-slate-400">
            Atomization Routes: VIGA · EIGA · PREP · Plasma Atomized (PA)
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-5">
          <div>
            <div className="text-xs font-mono text-slate-400">PARTICLE SIZE DISTRIBUTION</div>
            <div className="mt-1 flex items-baseline">
              <span className="text-2xl font-mono font-semibold text-white tabular-nums">
                15 – 45
              </span>
              <span className="text-xs font-mono text-slate-400 ml-1.5">μm (D10–D90)</span>
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Fines {'<'}10 μm cause cohesive van der Waals clumping and airborne explosion hazards; coarse particles {'>'}63 μm induce recoater streaking and incomplete fusion.
            </p>
          </div>

          <div>
            <div className="text-xs font-mono text-slate-400">MORPHOLOGY & SPHERICITY</div>
            <div className="mt-1 flex items-baseline">
              <span className="text-2xl font-mono font-semibold text-amber-400 tabular-nums">
                ≥ 0.88
              </span>
              <span className="text-xs font-mono text-slate-400 ml-1.5">Aspect Ratio</span>
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Requires satellite-free spherical droplets from Argon/Helium gas atomization or Plasma Rotating Electrode Process (PREP) to maximize apparent packing density (≥ 58%).
            </p>
          </div>

          <div>
            <div className="text-xs font-mono text-slate-400">HALL FLOWABILITY (ASTM B213)</div>
            <div className="mt-1 flex items-baseline">
              <span className="text-2xl font-mono font-semibold text-emerald-400 tabular-nums">
                {'<'} 18.0
              </span>
              <span className="text-xs font-mono text-slate-400 ml-1.5">sec / 50g</span>
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Ensures smooth, uninterrupted gravity dosing and uniform shear spreading under 150–300 mm/s recoater blade translation without short-feed voids.
            </p>
          </div>

          <div>
            <div className="text-xs font-mono text-slate-400">INTERSTITIAL GAS & MOISTURE</div>
            <div className="mt-1 flex items-baseline">
              <span className="text-2xl font-mono font-semibold text-cyan-400 tabular-nums">
                {'<'} 150
              </span>
              <span className="text-xs font-mono text-slate-400 ml-1.5">ppm H2O / O2 Pick-Up</span>
            </div>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Adsorbed surface moisture dissociates in the 2,500 °C laser plume into atomic hydrogen, trapping spherical gas porosity (especially severe in AlSi10Mg and Ti-6Al-4V).
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1 p-1 bg-[#0D131F] border border-slate-800 rounded-lg">
          {familyCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFamilyFilter(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                familyFilter === cat
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {cat === 'ALL' ? `All Qualified Alloys (${ALLOWED_ALLOYS.length})` : cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 self-start lg:self-auto">
          <span className="text-xs font-mono text-slate-400">METALLURGICAL STATE:</span>
          <div className="flex items-center gap-1 p-1 bg-[#0D131F] border border-slate-800 rounded-lg">
            <button
              type="button"
              onClick={() => setConditionMode('asBuilt')}
              className={`px-3 py-1.5 text-xs font-mono rounded transition-colors whitespace-nowrap ${
                conditionMode === 'asBuilt'
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              As-Built Laser State
            </button>
            <button
              type="button"
              onClick={() => setConditionMode('heatTreated')}
              className={`px-3 py-1.5 text-xs font-mono rounded transition-colors whitespace-nowrap ${
                conditionMode === 'heatTreated'
                  ? 'bg-emerald-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Stress-Relieved / Aged / HIP
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="xl:col-span-7 bg-[#0D131F] border border-slate-800 rounded-lg overflow-hidden">
          <div className="px-5 py-3.5 bg-[#111827] border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-slate-200">
              QUALIFIED SLM ALLOY MATRIX ({filteredAlloys.length} GRADES SHOWN)
            </span>
            <span className="text-xs font-mono text-slate-400">
              Click any row to inspect microstructure & thermal protocol
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-mono text-slate-400 bg-[#0B101B]">
                  <th className="py-3 px-4">Alloy Designation</th>
                  <th className="py-3 px-3 text-right">UTS (MPa)</th>
                  <th className="py-3 px-3 text-right">Yield σ0.2 (MPa)</th>
                  <th className="py-3 px-3 text-right">Elongation (%)</th>
                  <th className="py-3 px-3 text-right">Ev Window</th>
                  <th className="py-3 px-4 text-right">Processability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 text-xs">
                {filteredAlloys.map((alloy) => {
                  const isSelected = alloy.id === activeAlloy.id;
                  const props = conditionMode === 'asBuilt' ? alloy.asBuilt : alloy.heatTreated;
                  return (
                    <tr
                      key={alloy.id}
                      onClick={() => setSelectedAlloyId(alloy.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-amber-500/10 text-white'
                          : 'hover:bg-slate-800/40 text-slate-200'
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-100">{alloy.designation}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {alloy.family} · {alloy.unsOrStandard}
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono tabular-nums font-semibold text-white">
                        {props.utsMpa}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono tabular-nums text-amber-300">
                        {props.yieldMpa}
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono tabular-nums text-cyan-300">
                        {props.elongationPct.toFixed(1)}%
                      </td>
                      <td className="py-3.5 px-3 text-right font-mono tabular-nums text-slate-300">
                        {alloy.optimalEvRange[0]}–{alloy.optimalEvRange[1]} J/mm³
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono whitespace-nowrap">
                        {alloy.processabilityRating === 'HIGH' && (
                          <span className="text-emerald-400">● HIGH</span>
                        )}
                        {alloy.processabilityRating === 'MODERATE' && (
                          <span className="text-amber-400">▲ MODERATE</span>
                        )}
                        {alloy.processabilityRating === 'SPECIALIZED' && (
                          <span className="text-cyan-400">◆ SPECIALIZED</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="xl:col-span-5 bg-[#0D131F] border border-slate-800 rounded-lg p-6 space-y-5">
          <div className="border-b border-slate-800 pb-4">
            <div className="text-xs font-mono text-amber-400">
              {activeAlloy.family} · {activeAlloy.unsOrStandard}
            </div>
            <h3 className="text-xl font-semibold text-white mt-1">
              {activeAlloy.designation}
            </h3>
            <p className="text-xs font-mono text-slate-300 mt-2">
              Composition: {activeAlloy.nominalComposition}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 bg-[#111827] border border-slate-800 rounded">
              <div className="text-[11px] font-mono text-cyan-400">AS-BUILT LASER CONDITION</div>
              <div className="mt-2 space-y-1 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">UTS:</span>
                  <span className="text-white font-semibold tabular-nums">
                    {activeAlloy.asBuilt.utsMpa} MPa
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Yield σ0.2:</span>
                  <span className="text-white font-semibold tabular-nums">
                    {activeAlloy.asBuilt.yieldMpa} MPa
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Elongation:</span>
                  <span className="text-white font-semibold tabular-nums">
                    {activeAlloy.asBuilt.elongationPct.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Hardness:</span>
                  <span className="text-white font-semibold tabular-nums">
                    {activeAlloy.asBuilt.hardnessHv} HV
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-[#111827] border border-slate-800 rounded">
              <div className="text-[11px] font-mono text-emerald-400">HEAT-TREATED / HIP STATE</div>
              <div className="mt-2 space-y-1 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">UTS:</span>
                  <span className="text-white font-semibold tabular-nums">
                    {activeAlloy.heatTreated.utsMpa} MPa
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Yield σ0.2:</span>
                  <span className="text-white font-semibold tabular-nums">
                    {activeAlloy.heatTreated.yieldMpa} MPa
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Elongation:</span>
                  <span className="text-white font-semibold tabular-nums">
                    {activeAlloy.heatTreated.elongationPct.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Hardness:</span>
                  <span className="text-white font-semibold tabular-nums">
                    {activeAlloy.heatTreated.hardnessHv} HV
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5 text-xs font-mono bg-[#090D16] p-3 border border-slate-800/80 rounded">
            <div>
              <div className="text-slate-400 text-[10px]">DENSITY</div>
              <div className="text-slate-100 font-semibold mt-0.5 tabular-nums">
                {activeAlloy.densityGCm3} g/cm³ ({activeAlloy.relativeDensityPct}%)
              </div>
            </div>
            <div>
              <div className="text-slate-400 text-[10px]">THERMAL COND.</div>
              <div className="text-slate-100 font-semibold mt-0.5 tabular-nums">
                {activeAlloy.thermalConductivityWmK} W/m·K
              </div>
            </div>
            <div>
              <div className="text-slate-400 text-[10px]">LIQUIDUS TEMP</div>
              <div className="text-slate-100 font-semibold mt-0.5 tabular-nums">
                {activeAlloy.meltingPointC} °C
              </div>
            </div>
          </div>

          <div className="space-y-3 text-xs leading-relaxed">
            <div>
              <div className="font-mono text-slate-400 text-[11px] mb-1">
                SOLIDIFICATION MICROSTRUCTURE & PHASE EVOLUTION
              </div>
              <p className="text-slate-200">{activeAlloy.microstructureNotes}</p>
            </div>

            <div>
              <div className="font-mono text-slate-400 text-[11px] mb-1">
                MANDATORY THERMAL POST-PROCESSING PROTOCOL
              </div>
              <p className="text-emerald-300 font-mono text-[11.5px]">
                {activeAlloy.heatTreated.protocol}
              </p>
            </div>

            <div>
              <div className="font-mono text-slate-400 text-[11px] mb-1">
                METALLURGICAL HAZARDS & DEFECT SENSITIVITY
              </div>
              <p className="text-amber-200/90">{activeAlloy.metallurgicalHazards}</p>
            </div>

            <div>
              <div className="font-mono text-slate-400 text-[11px] mb-1">
                QUALIFIED INDUSTRIAL APPLICATIONS
              </div>
              <ul className="space-y-1 text-slate-300">
                {activeAlloy.primaryApplications.map((app, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-mono">—</span>
                    <span>{app}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-[#0D131F] border border-slate-800 rounded-lg">
        <div className="pb-4 border-b border-slate-800">
          <div className="text-xs font-mono text-rose-400">
            METALLURGICAL EXCLUSION BOUNDARIES · SOLIDIFICATION & OPTICAL LIMITS
          </div>
          <h3 className="text-xl font-semibold text-white mt-1">
            Why Certain Legacy Alloys Crack or Boil in Standard SLM (And How Engineers Overcome Them)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5">
          {RESTRICTED_MATERIALS.map((item, idx) => (
            <div
              key={idx}
              className="p-4 bg-[#111827] border border-slate-800 rounded flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs font-mono text-rose-300">
                  <span>✖ {item.rootFailureMechanism}</span>
                </div>
                <h4 className="text-base font-semibold text-white mt-1.5">
                  {item.materialGroup}
                </h4>
                <div className="text-xs font-mono text-slate-400 mt-0.5">
                  Affected Grades: {item.representativeGrades}
                </div>
                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  {item.physicalExplanation}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/90">
                <span className="text-[11px] font-mono text-emerald-400 block mb-1">
                  ● INDUSTRIAL METALLURGICAL REMEDIATION:
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {item.engineeringMitigation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
