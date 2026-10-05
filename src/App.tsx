import React, { useState } from 'react';
import {
  PROCESS_STAGES,
  PBF_COMPARISON_TABLE,
  ALLOWED_ALLOYS,
  RESTRICTED_MATERIALS,
  INDUSTRIAL_APPLICATIONS,
  POINTS_OF_STRENGTH,
  DRAWBACKS_AND_LIMITATIONS,
  INDUSTRIAL_OUTLOOK_ROADMAP
} from './data/slmMonographData';
import { MeltPoolSimulator } from './components/MeltPoolSimulator';
import { MaterialsExplorer } from './components/MaterialsExplorer';
import { IndustrialIntegrationLab } from './components/IndustrialIntegrationLab';
import { HeroChamberSchematic, ApplicationSectorSchematic } from './components/TechnicalSchematics';
import { Download, Check, Copy, ArrowUpRight, FileText, X } from 'lucide-react';

export function App() {
  const [activeAppId, setActiveAppId] = useState<string>(INDUSTRIAL_APPLICATIONS[0].id);
  const [strengthVsLimitTab, setStrengthVsLimitTab] = useState<'side-by-side' | 'strengths' | 'limitations'>('side-by-side');
  const [showDossierModal, setShowDossierModal] = useState<boolean>(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState<boolean>(false);

  const selectedApplication =
    INDUSTRIAL_APPLICATIONS.find((a) => a.id === activeAppId) || INDUSTRIAL_APPLICATIONS[0];

  const generateMarkdownDossier = (): string => {
    const lines: string[] = [
      '# Comprehensive Engineering Review: Selective Laser Melting (SLM / L-PBF)',
      'Standard Classification: ISO/ASTM 52900 Laser Powder Bed Fusion (PBF-LB/M)',
      '',
      '## 1. Executive Summary & Physical Mechanism',
      'Selective Laser Melting (SLM) is an additive manufacturing powder-bed fusion process in which a high-intensity Ytterbium-doped fiber laser (typically λ = 1064–1070 nm, 200–1000 W) selectively scans and completely melts thin layers (20–90 μm) of spherical gas-atomized metallic powder inside a high-purity inert Argon or Nitrogen atmosphere (< 100 ppm O2).',
      '',
      'Governing Volumetric Energy Density Equation:',
      'Ev = P / (v · h · t) [J/mm³]',
      '- P: Laser Power (W)',
      '- v: Scan Velocity (mm/s)',
      '- h: Hatch Spacing (mm)',
      '- t: Layer Thickness (mm)',
      '',
      '### Cyclic Process Stages:',
      ...PROCESS_STAGES.map(
        (s) =>
          `${s.stepNumber}. **${s.title}** (${s.keyControlVariable}): ${s.physicalMechanism} *Engineering Note:* ${s.engineeringConsiderations}`
      ),
      '',
      '## 2. Qualified Materials & Metallurgical Feedstock',
      ...ALLOWED_ALLOYS.map(
        (a) =>
          `- **${a.designation}** (${a.family} · ${a.unsOrStandard}): Composition [${a.nominalComposition}]. Optimal Ev = ${a.optimalEvRange[0]}–${a.optimalEvRange[1]} J/mm³. As-Built UTS/Yield: ${a.asBuilt.utsMpa}/${a.asBuilt.yieldMpa} MPa (${a.asBuilt.elongationPct}% elong.) → Heat-Treated UTS/Yield: ${a.heatTreated.utsMpa}/${a.heatTreated.yieldMpa} MPa (${a.heatTreated.elongationPct}% elong.). Microstructure: ${a.microstructureNotes}`
      ),
      '',
      '### Restricted / Non-Weldable Legacy Alloys & Remediation:',
      ...RESTRICTED_MATERIALS.map(
        (r) =>
          `- **${r.materialGroup}** (${r.representativeGrades}) — Root Failure: ${r.rootFailureMechanism}. ${r.physicalExplanation} *Mitigation:* ${r.engineeringMitigation}`
      ),
      '',
      '## 3. Industrial Applications',
      ...INDUSTRIAL_APPLICATIONS.map(
        (app) =>
          `### ${app.sectorTitle} — ${app.flagshipPartName}\n- Key Metric: ${app.keyMetricDelta}\n- Buy-to-Fly: ${app.buyToFlyComparison}\n- Review: ${app.descriptiveReview}`
      ),
      '',
      '## 4. Points of Strength',
      ...POINTS_OF_STRENGTH.map(
        (st) =>
          `${st.index}. **${st.title}** [${st.quantitativeBenchmark}]: ${st.mechanismAndPhysics} Impact: ${st.industrialImpact}`
      ),
      '',
      '## 5. Drawbacks & Process Limitations',
      ...DRAWBACKS_AND_LIMITATIONS.map(
        (lim) =>
          `${lim.index}. **${lim.title}** [${lim.quantitativeBenchmark}]: ${lim.mechanismAndPhysics} Mitigation: ${lim.mitigationOrLeverageStrategy}`
      ),
      '',
      '## 6. Future Outlook for Industrial Manufacturing Integration (2026–2035)',
      ...INDUSTRIAL_OUTLOOK_ROADMAP.map(
        (rm) =>
          `- **${rm.phasePeriod}: ${rm.title}** (${rm.currentBaseline} → ${rm.futureTarget}): ${rm.technicalDeepDive}`
      )
    ];
    return lines.join('\n');
  };

  const handleDownloadMarkdown = () => {
    const mdContent = generateMarkdownDossier();
    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'SLM_Technical_Review_Monograph.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdownDossier());
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col">
      {/* STRICT 3-ZONE TOP BAR CONTRACT */}
      <header className="sticky top-0 z-40 bg-[#090D16]/95 backdrop-blur border-b border-slate-800/90 px-6 py-3.5">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-6">
          {/* Zone 1: Single Text Element Brand Wordmark */}
          <a
            href="#top"
            className="font-display text-lg font-semibold tracking-tight text-white whitespace-nowrap shrink-0"
          >
            SLM Insight Pro
          </a>

          {/* Zone 2: 5 Clean Single-Line Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a
              href="#process-physics"
              className="hover:text-amber-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              01. Process Physics
            </a>
            <a
              href="#allowed-materials"
              className="hover:text-amber-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              02. Allowed Materials
            </a>
            <a
              href="#applications"
              className="hover:text-amber-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              03. Applications
            </a>
            <a
              href="#strengths-limitations"
              className="hover:text-amber-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              04. Strengths & Limits
            </a>
            <a
              href="#future-outlook"
              className="hover:text-amber-400 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              05. Industrial Outlook
            </a>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setShowDossierModal(true)}
              className="px-4 py-2 text-xs font-medium text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              Export Technical Dossier
            </button>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1 max-w-[1360px] w-full mx-auto px-6 py-10 space-y-24">
        {/* HERO MONOGRAPH HEADER */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pb-12 border-b border-slate-800/80">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-amber-400">
              <span>ISO/ASTM 52900 STANDARD</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>LASER POWDER BED FUSION (PBF-LB/M)</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>METALLURGICAL REVIEW</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-semibold text-white leading-[1.15] tracking-tight">
              Selective Laser Melting (SLM): Process Physics, Qualified Metallurgy & Industrial Integration
            </h1>

            <p className="text-base text-slate-300 leading-relaxed max-w-[68ch]">
              Selective Laser Melting (SLM)—standardized under ISO/ASTM 52900 as Laser-Based Powder Bed Fusion of Metals (PBF-LB/M)—is the premier industrial additive manufacturing technology for producing near-fully dense (<span className="font-mono text-white">99.5%–99.95%</span>) structural metallic components directly from 3D CAD models. Unlike solid-state or liquid-phase sintering (SLS), SLM utilizes a high-irradiance Ytterbium-doped fiber laser to achieve complete homogeneous melting and rapid epitaxial solidification (<span className="font-mono text-white">10⁵–10⁷ K/s</span>).
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-slate-800/80">
              <div>
                <div className="text-xs font-mono text-slate-400">AS-BUILT DENSITY</div>
                <div className="mt-1 flex items-baseline">
                  <span className="text-2xl font-mono font-semibold text-white tabular-nums">
                    99.9
                  </span>
                  <span className="text-xs font-mono text-amber-400 ml-1">%</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Wrought-grade integrity</div>
              </div>

              <div>
                <div className="text-xs font-mono text-slate-400">COOLING RATE</div>
                <div className="mt-1 flex items-baseline">
                  <span className="text-2xl font-mono font-semibold text-amber-400 tabular-nums">
                    10⁶
                  </span>
                  <span className="text-xs font-mono text-slate-400 ml-1">K/s</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Sub-micron cell refinement</div>
              </div>

              <div>
                <div className="text-xs font-mono text-slate-400">POWDER LAYER (t)</div>
                <div className="mt-1 flex items-baseline">
                  <span className="text-2xl font-mono font-semibold text-cyan-400 tabular-nums">
                    20–90
                  </span>
                  <span className="text-xs font-mono text-slate-400 ml-1">μm</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">PSD 15–45 μm spherical</div>
              </div>

              <div>
                <div className="text-xs font-mono text-slate-400">BUY-TO-FLY RATIO</div>
                <div className="mt-1 flex items-baseline">
                  <span className="text-2xl font-mono font-semibold text-emerald-400 tabular-nums">
                    1.2 : 1
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">{'>'}95% powder recyclability</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <HeroChamberSchematic />
          </div>
        </section>

        {/* CHAPTER 01: PROCESS PHYSICS */}
        <section id="process-physics" className="space-y-10 scroll-mt-20">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-mono text-amber-400">
              CHAPTER 01 · FUNDAMENTAL THERMODYNAMICS & HARDWARE ARCHITECTURE
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">
              01. Process Physics, Cyclic Mechanism & Melt Pool Dynamics
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              In Selective Laser Melting, metallurgical soundness is governed by the coupling between optical energy absorption, thermocapillary Marangoni convection, metal-vapor recoil pressure, and directional heat conduction into the solid substrate. The primary macroscopic scaling parameter is the <strong className="text-white font-medium">Volumetric Energy Density (<span className="font-mono">Ev</span>)</strong>:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 bg-[#0D131F] border border-slate-800 rounded-lg items-center">
            <div className="lg:col-span-5 p-5 bg-[#090D16] border border-slate-800 rounded text-center">
              <div className="text-xs font-mono text-slate-400 mb-2">
                VOLUMETRIC ENERGY DENSITY SCALING LAW
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-semibold text-amber-400 tracking-wide py-2">
                E<sub>v</sub> = P / (v · h · t)
              </div>
              <div className="text-xs font-mono text-slate-400 mt-2">
                Units: Joules per cubic millimeter (J/mm³)
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-[#111827] border border-slate-800/80 rounded">
                <div className="font-mono font-semibold text-white">
                  P — Incident Laser Power (100 – 1,000 W)
                </div>
                <p className="text-slate-300 mt-1 leading-relaxed">
                  Continuous-wave Yb-fiber laser (1064 nm IR or 515 nm Green) focused to a 50–100 μm spot diameter. Controls peak surface temperature and recoil vapor depression depth.
                </p>
              </div>
              <div className="p-3.5 bg-[#111827] border border-slate-800/80 rounded">
                <div className="font-mono font-semibold text-white">
                  v — Galvo Scan Velocity (300 – 2,500 mm/s)
                </div>
                <p className="text-slate-300 mt-1 leading-relaxed">
                  Linear translation speed of the laser spot across the powder bed. Dictates laser-material interaction dwell time (τ = d_spot / v ≈ 40–200 μs) and solidification rate.
                </p>
              </div>
              <div className="p-3.5 bg-[#111827] border border-slate-800/80 rounded">
                <div className="font-mono font-semibold text-white">
                  h — Hatch Spacing / Track Pitch (0.06 – 0.16 mm)
                </div>
                <p className="text-slate-300 mt-1 leading-relaxed">
                  Center-to-center lateral distance between adjacent parallel laser scan vectors. Must maintain 20–35% melt-pool width overlap to prevent inter-track lack-of-fusion pores.
                </p>
              </div>
              <div className="p-3.5 bg-[#111827] border border-slate-800/80 rounded">
                <div className="font-mono font-semibold text-white">
                  t — Recoated Layer Thickness (0.02 – 0.09 mm)
                </div>
                <p className="text-slate-300 mt-1 leading-relaxed">
                  Vertical Z-step per slice (20–90 μm). Melt pool depth D must exceed 1.5×–2.5× layer thickness t to remelt the underlying layer and establish epitaxial metallurgical bonding.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-semibold text-white">
                Interactive P–v Processing Window & Melt Pool Cross-Section Simulator
              </h3>
              <span className="text-xs font-mono text-slate-400">
                Adjust P, v, h, t sliders or click directly on the P–v diagram to probe defect regimes
              </span>
            </div>
            <MeltPoolSimulator />
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">
              Step-by-Step Physical Sequence of the SLM Build Cycle
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {PROCESS_STAGES.map((stage) => (
                <div
                  key={stage.stepNumber}
                  className="p-5 bg-[#0D131F] border border-slate-800 rounded-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-amber-400 mb-2">
                      <span>STAGE {stage.stepNumber}</span>
                      <span className="text-slate-400">{stage.timingMetric}</span>
                    </div>
                    <h4 className="text-base font-semibold text-white">
                      {stage.title}
                    </h4>
                    <div className="text-xs font-mono text-cyan-300 mt-1.5 pb-3 border-b border-slate-800/80">
                      {stage.keyControlVariable}
                    </div>
                    <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                      {stage.physicalMechanism}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800/70 text-xs text-slate-400 leading-relaxed">
                    <strong className="text-slate-200 font-medium">Engineering Note: </strong>
                    {stage.engineeringConsiderations}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0D131F] border border-slate-800 rounded-lg overflow-hidden">
            <div className="px-5 py-4 bg-[#111827] border-b border-slate-800">
              <div className="text-xs font-mono text-amber-400">
                PROCESS TAXONOMY BENCHMARK
              </div>
              <h3 className="text-lg font-semibold text-white mt-0.5">
                How SLM (L-PBF) Differs from Electron Beam Melting (EBM), SLS, and Metal Binder Jetting
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-[#0B101B] font-mono text-[11px] text-slate-400">
                    <th className="py-3.5 px-4">Process Attribute</th>
                    <th className="py-3.5 px-4 text-amber-400">SLM / L-PBF (Laser Melt)</th>
                    <th className="py-3.5 px-4">EBM (Electron Beam Melt)</th>
                    <th className="py-3.5 px-4">SLS / Indirect DMLS</th>
                    <th className="py-3.5 px-4">Metal Binder Jetting (MBJ)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70">
                  {PBF_COMPARISON_TABLE.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-800/30">
                      <td className="py-3.5 px-4 font-semibold text-slate-200">
                        {row.parameter}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-amber-200 bg-amber-500/5">
                        {row.slm}
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">{row.ebm}</td>
                      <td className="py-3.5 px-4 text-slate-300">{row.sls}</td>
                      <td className="py-3.5 px-4 text-slate-300">{row.binderJet}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CHAPTER 02: ALLOWED MATERIALS */}
        <section id="allowed-materials" className="space-y-8 scroll-mt-20 pt-8 border-t border-slate-800/80">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-mono text-amber-400">
              CHAPTER 02 · ALLOWED ALLOY FAMILIES, POWDER METALLURGY & WELDABILITY LIMITS
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">
              02. Allowed Materials, Mechanical Properties & Exclusion Boundaries
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              For an alloy to be compatible with Selective Laser Melting, it must satisfy three strict physical criteria: <strong className="text-white font-medium">(1) Narrow solidification freezing range</strong> to resist interdendritic hot tearing under rapid thermal contraction; <strong className="text-white font-medium">(2) Sufficient optical absorptivity</strong> at the laser wavelength (1064 nm IR or 515 nm Green) without explosive vaporization of volatile alloying elements; and <strong className="text-white font-medium">(3) Atomizability into spherical, free-flowing powder</strong> (15–45 μm). Explore the qualified alloy families and their As-Built vs. Heat-Treated properties below.
            </p>
          </div>

          <MaterialsExplorer />
        </section>

        {/* CHAPTER 03: INDUSTRIAL APPLICATIONS */}
        <section id="applications" className="space-y-8 scroll-mt-20 pt-8 border-t border-slate-800/80">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-mono text-amber-400">
              CHAPTER 03 · FLIGHT-CRITICAL, MEDICAL & TOOLING DEPLOYMENTS
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">
              03. Industrial Applications & Quantitative Case Architecture
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              SLM is not a universal replacement for CNC milling or casting; it achieves transformative industrial ROI in sectors where <strong className="text-white font-medium">monolithic part consolidation</strong>, <strong className="text-white font-medium">internal conformal fluidics</strong>, <strong className="text-white font-medium">biomimetic lattice modulus tuning</strong>, or <strong className="text-white font-medium">topology-optimized weight reduction</strong> directly govern system performance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#0D131F] border border-slate-800 rounded-lg">
            {INDUSTRIAL_APPLICATIONS.map((app, index) => (
              <button
                key={app.id}
                type="button"
                onClick={() => setActiveAppId(app.id)}
                className={`px-4 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  activeAppId === app.id
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                0{index + 1}. {app.sectorTitle}
              </button>
            ))}
          </div>

          <div className="bg-[#0D131F] border border-slate-800 rounded-lg p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="text-xs font-mono text-amber-400">
                    {selectedApplication.subDiscipline} · {selectedApplication.certificationStandards}
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-white mt-1">
                    {selectedApplication.flagshipPartName}
                  </h3>
                  <div className="text-xs font-mono text-slate-400 mt-2">
                    Qualified Alloys: {selectedApplication.qualifiedAlloys.join(' · ')}
                  </div>
                </div>

                <div className="p-4 bg-[#111827] border-l-2 border-amber-500 rounded-r">
                  <div className="text-[11px] font-mono text-amber-400 mb-1">
                    WHY CONVENTIONAL MANUFACTURING FAILS THIS GEOMETRY
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {selectedApplication.functionalJustification}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-mono text-slate-400">
                    PRODUCTION ARCHITECTURE & PERFORMANCE REVIEW
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {selectedApplication.descriptiveReview}
                  </p>
                </div>

                <div className="bg-[#090D16] border border-slate-800 rounded overflow-hidden">
                  <div className="px-4 py-2.5 bg-[#111827] border-b border-slate-800 text-xs font-mono text-slate-300">
                    EMPIRICAL BENCHMARK: CONVENTIONAL VS. SLM PRODUCTION
                  </div>
                  <div className="divide-y divide-slate-800/80 text-xs">
                    {selectedApplication.quantifiedOutcomes.map((qo, i) => (
                      <div
                        key={i}
                        className="p-3.5 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center"
                      >
                        <div className="sm:col-span-4 font-semibold text-slate-200">
                          {qo.label}
                        </div>
                        <div className="sm:col-span-4 font-mono text-slate-400">
                          Legacy: {qo.conventionalValue}
                        </div>
                        <div className="sm:col-span-4 font-mono text-emerald-400 font-semibold">
                          SLM: {qo.slmValue}
                          <div className="text-[10.5px] text-slate-400 font-normal mt-0.5">
                            {qo.improvementNote}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-5">
                <ApplicationSectorSchematic
                  type={selectedApplication.schematicType}
                  caption={`Cross-Sectional Architecture — ${selectedApplication.sectorTitle}`}
                />

                <div className="p-4 bg-[#111827] border border-slate-800 rounded space-y-3 text-xs font-mono">
                  <div>
                    <div className="text-slate-400 text-[10.5px]">HEADLINE ARCHITECTURAL GAIN</div>
                    <div className="text-white font-semibold mt-0.5">
                      {selectedApplication.keyMetricDelta}
                    </div>
                  </div>
                  <div className="pt-2.5 border-t border-slate-800">
                    <div className="text-slate-400 text-[10.5px]">MATERIAL UTILIZATION</div>
                    <div className="text-amber-300 mt-0.5">
                      {selectedApplication.buyToFlyComparison}
                    </div>
                  </div>
                  <div className="pt-2.5 border-t border-slate-800">
                    <div className="text-slate-400 text-[10.5px]">SCHEDULE & THROUGHPUT IMPACT</div>
                    <div className="text-emerald-300 mt-0.5">
                      {selectedApplication.leadTimeReduction}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER 04: POINTS OF STRENGTH VS. DRAWBACKS & LIMITATIONS */}
        <section id="strengths-limitations" className="space-y-8 scroll-mt-20 pt-8 border-t border-slate-800/80">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="max-w-3xl space-y-3">
              <div className="text-xs font-mono text-amber-400">
                CHAPTER 04 · CRITICAL ENGINEERING TRADE-OFF ANALYSIS
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">
                04. Points of Strength vs. Process Drawbacks & Limitations
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Deploying SLM into serial production requires balancing its unmatched geometric freedom and sub-micron grain refinement against thermomechanical residual stress, anisotropic fatigue behavior, and downstream post-processing requirements.
              </p>
            </div>

            <div className="flex items-center gap-1 p-1 bg-[#0D131F] border border-slate-800 rounded-lg self-start">
              <button
                type="button"
                onClick={() => setStrengthVsLimitTab('side-by-side')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  strengthVsLimitTab === 'side-by-side'
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Balanced Comparison (12)
              </button>
              <button
                type="button"
                onClick={() => setStrengthVsLimitTab('strengths')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  strengthVsLimitTab === 'strengths'
                    ? 'bg-emerald-500 text-slate-950 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Points of Strength (6)
              </button>
              <button
                type="button"
                onClick={() => setStrengthVsLimitTab('limitations')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  strengthVsLimitTab === 'limitations'
                    ? 'bg-rose-500 text-slate-950 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Drawbacks & Limits (6)
              </button>
            </div>
          </div>

          <div
            className={`grid grid-cols-1 ${
              strengthVsLimitTab === 'side-by-side' ? 'lg:grid-cols-2' : 'lg:grid-cols-1'
            } gap-8`}
          >
            {(strengthVsLimitTab === 'side-by-side' || strengthVsLimitTab === 'strengths') && (
              <div className="space-y-5">
                <div className="pb-3 border-b border-emerald-500/30 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-emerald-400 font-mono">
                    ● POINTS OF STRENGTH & TECHNICAL ADVANTAGES
                  </h3>
                  <span className="text-xs font-mono text-slate-400">6 Core Capabilities</span>
                </div>

                <div className="space-y-4">
                  {POINTS_OF_STRENGTH.map((st) => (
                    <div
                      key={st.index}
                      className="p-5 bg-[#0D131F] border border-slate-800 rounded-lg space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                        <span className="text-emerald-400 font-semibold">
                          STRENGTH {st.index} · {st.category}
                        </span>
                      </div>
                      <h4 className="text-base font-semibold text-white">
                        {st.title}
                      </h4>
                      <div className="p-2.5 bg-[#111827] border border-slate-800/90 rounded text-xs font-mono text-emerald-300">
                        {st.quantitativeBenchmark}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        <strong className="text-white font-medium">Physical Mechanism: </strong>
                        {st.mechanismAndPhysics}
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        <strong className="text-white font-medium">Industrial Impact: </strong>
                        {st.industrialImpact}
                      </p>
                      <div className="pt-2.5 border-t border-slate-800/80 text-xs text-slate-400">
                        <span className="font-mono text-amber-400">Design Leverage: </span>
                        {st.mitigationOrLeverageStrategy}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(strengthVsLimitTab === 'side-by-side' || strengthVsLimitTab === 'limitations') && (
              <div className="space-y-5">
                <div className="pb-3 border-b border-rose-500/30 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-rose-400 font-mono">
                    ▲ DRAWBACKS, DEFECT REGIMES & PROCESS LIMITATIONS
                  </h3>
                  <span className="text-xs font-mono text-slate-400">6 Critical Constraints</span>
                </div>

                <div className="space-y-4">
                  {DRAWBACKS_AND_LIMITATIONS.map((lim) => (
                    <div
                      key={lim.index}
                      className="p-5 bg-[#0D131F] border border-slate-800 rounded-lg space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                        <span className="text-rose-400 font-semibold">
                          LIMITATION {lim.index} · {lim.category}
                        </span>
                      </div>
                      <h4 className="text-base font-semibold text-white">
                        {lim.title}
                      </h4>
                      <div className="p-2.5 bg-[#111827] border border-slate-800/90 rounded text-xs font-mono text-rose-300">
                        {lim.quantitativeBenchmark}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        <strong className="text-white font-medium">Root Physics: </strong>
                        {lim.mechanismAndPhysics}
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        <strong className="text-white font-medium">Operational Bottleneck: </strong>
                        {lim.industrialImpact}
                      </p>
                      <div className="pt-2.5 border-t border-slate-800/80 text-xs text-slate-300">
                        <span className="font-mono text-cyan-400">● Engineering Mitigation: </span>
                        {lim.mitigationOrLeverageStrategy}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CHAPTER 05: FUTURE OUTLOOK FOR INDUSTRIAL MANUFACTURING INTEGRATION */}
        <section id="future-outlook" className="space-y-10 scroll-mt-20 pt-8 border-t border-slate-800/80">
          <div className="max-w-3xl space-y-3">
            <div className="text-xs font-mono text-amber-400">
              CHAPTER 05 · 2026–2035 INDUSTRIALIZATION & DIGITAL FACTORY ROADMAP
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">
              05. Future Outlook for Industrial Manufacturing Integration
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Over the next decade, Selective Laser Melting is transitioning from standalone batch machines operated by specialized metallurgists into <strong className="text-white font-medium">fully automated, lights-out digital foundry cells</strong> integrated directly into automotive, aviation, energy, and defense serial production lines. Five technological vectors drive this industrial convergence:
            </p>
          </div>

          <div className="space-y-5">
            {INDUSTRIAL_OUTLOOK_ROADMAP.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 bg-[#0D131F] border border-slate-800 rounded-lg grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
              >
                <div className="lg:col-span-4 space-y-3 border-b lg:border-b-0 lg:border-r border-slate-800 pb-4 lg:pb-0 lg:pr-6">
                  <div className="text-xs font-mono text-amber-400">
                    {pillar.phasePeriod} · {pillar.trlStatus}
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {pillar.subtitle}
                  </p>

                  <div className="p-3.5 bg-[#111827] border border-slate-800 rounded space-y-2 text-xs font-mono mt-3">
                    <div className="text-[10.5px] text-slate-400">{pillar.targetKpi}</div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Legacy Baseline:</span>
                      <span>{pillar.currentBaseline}</span>
                    </div>
                    <div className="flex items-center justify-between text-emerald-400 font-semibold pt-1 border-t border-slate-800">
                      <span>2030+ Target:</span>
                      <span>{pillar.futureTarget}</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8 space-y-4">
                  <div>
                    <div className="text-xs font-mono text-slate-400 mb-1.5">
                      ARCHITECTURAL & PHYSICS DEEP DIVE
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      {pillar.technicalDeepDive}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80">
                    <div className="text-xs font-mono text-cyan-400 mb-2">
                      FACTORY-FLOOR INTEGRATION REQUIREMENTS (MES / HARDWARE / OPTICS):
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {pillar.integrationRequirements.map((req, rIdx) => (
                        <div
                          key={rIdx}
                          className="p-3 bg-[#111827] border border-slate-800/90 rounded text-xs text-slate-300 leading-relaxed"
                        >
                          <span className="font-mono text-amber-400 mr-1.5">0{rIdx + 1}.</span>
                          {req}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <IndustrialIntegrationLab />
        </section>
      </main>

      <footer className="border-t border-slate-800/90 bg-[#070A12] px-6 py-8 mt-16">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <span className="font-display text-slate-200 font-semibold">SLM Insight Pro</span>
            <span className="mx-2">·</span>
            <span>Selective Laser Melting (ISO/ASTM 52900 PBF-LB/M) Engineering Reference & Process Workbench</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setShowDossierModal(true)}
              className="text-amber-400 hover:underline flex items-center gap-1"
            >
              Export Full Review (.md)
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <a href="#top" className="hover:text-white transition-colors">
              Back to Top ↑
            </a>
          </div>
        </div>
      </footer>

      {showDossierModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-dossier-title"
        >
          <div className="bg-[#0D131F] border border-slate-700 rounded-lg max-w-4xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="px-6 py-4 bg-[#111827] border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 id="modal-dossier-title" className="text-base font-semibold text-white">
                  SLM Descriptive Review & Engineering Specification Dossier
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-0.5">
                  Complete Markdown Monograph · Materials, Applications, Strengths, Limitations & Industrial Outlook
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowDossierModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 bg-[#090D16] font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
              {generateMarkdownDossier()}
            </div>

            <div className="px-6 py-4 bg-[#111827] border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-mono text-slate-400">
                Ready for engineering documentation or citation export
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyMarkdown}
                  className="px-4 py-2 text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 rounded flex items-center gap-1.5 transition-colors"
                >
                  {copiedMarkdown ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Copied to Clipboard
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Markdown
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleDownloadMarkdown}
                  className="px-4 py-2 text-xs font-medium bg-amber-500 hover:bg-amber-400 text-slate-950 rounded flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Monograph (.md)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
