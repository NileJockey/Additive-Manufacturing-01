export interface ProcessStage {
  stepNumber: string;
  title: string;
  timingMetric: string;
  keyControlVariable: string;
  physicalMechanism: string;
  engineeringConsiderations: string;
}

export interface AlloyMaterial {
  id: string;
  designation: string;
  family: 'Titanium' | 'Nickel Superalloys' | 'Ferrous & Tool Steels' | 'Aluminum' | 'CoCr & Refractory' | 'Copper Alloys';
  unsOrStandard: string;
  nominalComposition: string;
  shieldGas: 'Argon (Ar)' | 'Nitrogen (N2) / Argon';
  laserWavelengthNm: number;
  optimalEvRange: [number, number]; // J/mm^3
  defaultPowerW: number;
  defaultSpeedMmS: number;
  defaultHatchMm: number;
  defaultLayerUm: number;
  asBuilt: {
    utsMpa: number;
    yieldMpa: number;
    elongationPct: number;
    hardnessHv: number;
  };
  heatTreated: {
    utsMpa: number;
    yieldMpa: number;
    elongationPct: number;
    hardnessHv: number;
    protocol: string;
  };
  relativeDensityPct: number;
  thermalConductivityWmK: number;
  meltingPointC: number;
  densityGCm3: number;
  processabilityRating: 'HIGH' | 'MODERATE' | 'SPECIALIZED';
  microstructureNotes: string;
  primaryApplications: string[];
  metallurgicalHazards: string;
}

export interface RestrictedMaterialCase {
  materialGroup: string;
  representativeGrades: string;
  rootFailureMechanism: string;
  physicalExplanation: string;
  engineeringMitigation: string;
}

export interface ApplicationSector {
  id: string;
  sectorTitle: string;
  subDiscipline: string;
  flagshipPartName: string;
  schematicType: 'aerospace-injector' | 'medical-implant' | 'conformal-tooling' | 'tpms-exchanger';
  qualifiedAlloys: string[];
  keyMetricDelta: string;
  buyToFlyComparison: string;
  leadTimeReduction: string;
  functionalJustification: string;
  descriptiveReview: string;
  certificationStandards: string;
  quantifiedOutcomes: {
    label: string;
    conventionalValue: string;
    slmValue: string;
    improvementNote: string;
  }[];
}

export interface StrengthOrLimitation {
  index: string;
  title: string;
  category: string;
  quantitativeBenchmark: string;
  mechanismAndPhysics: string;
  industrialImpact: string;
  mitigationOrLeverageStrategy: string;
}

export interface RoadmapPillar {
  phasePeriod: string;
  trlStatus: string;
  title: string;
  subtitle: string;
  targetKpi: string;
  currentBaseline: string;
  futureTarget: string;
  technicalDeepDive: string;
  integrationRequirements: string[];
}

export const PROCESS_STAGES: ProcessStage[] = [
  {
    stepNumber: '01',
    title: 'CAD Tessellation, Orientation & Support Architecture',
    timingMetric: 'Pre-Build Digital Prep',
    keyControlVariable: 'Overhang Threshold θ ≥ 40°–45°',
    physicalMechanism:
      '3D solid models or implicit TPMS/lattice fields are sliced into discrete 2D planar contours (thickness t = 20–100 μm). Sacrificial metallic support structures are generated beneath surfaces inclined below 45° relative to the build plate.',
    engineeringConsiderations:
      'Supports in SLM do not merely resist gravity—their primary physical role is anchoring thin solidified overhangs against upward residual thermal stress curling and conducting intense laser heat downward into the heavy substrate plate (typically 25–50 mm thick).'
  },
  {
    stepNumber: '02',
    title: 'Inert Chamber Purging & Substrate Pre-Heating',
    timingMetric: 'O2 < 100 ppm (Ti) / < 1000 ppm (Fe/Ni)',
    keyControlVariable: 'Laminar Cross-Flow v_gas = 1.5–3.0 m/s',
    physicalMechanism:
      'The sealed build chamber is evacuated or purged with high-purity Argon (for reactive Ti, Al, Ni alloys) or Nitrogen (for Austenitic/Precipitation-Hardening steels). Resistive or inductive heaters warm the build plate to 150–500 °C.',
    engineeringConsiderations:
      'Uniform laminar inert gas knife flow across the powder bed is critical to sweep away laser-induced metallic vapor plumes and incandescent spatter ejecta before they attenuate or defocus the incoming laser beam.'
  },
  {
    stepNumber: '03',
    title: 'Micron-Scale Powder Recoating & Compaction',
    timingMetric: '3.5–8.0 s / layer cycle',
    keyControlVariable: 'PSD 15–45 μm · Layer Thickness t = 30–60 μm',
    physicalMechanism:
      'A precision recoater mechanism (hardened steel, ceramic, carbon-fiber brush, or counter-rotating roller) translates across the build platform, spreading a metered dose of spherical gas-atomized powder into a uniform packed bed (~55–62% apparent packing density).',
    engineeringConsiderations:
      'Hard blades enforce strict dimensional tolerances and detect upward part warpage via motor torque spikes, whereas compliant carbon-fiber brushes prevent catastrophic build crashes if minor thermal edge curling occurs.'
  },
  {
    stepNumber: '04',
    title: 'Selective Yb-Fiber Laser Irradiation & Complete Melting',
    timingMetric: 'v = 400–2500 mm/s · Spot Ø 50–100 μm',
    keyControlVariable: 'Volumetric Energy Density Ev = P / (v · h · t)',
    physicalMechanism:
      'Single or multiple continuous-wave (CW) Ytterbium-doped fiber lasers (λ = 1064–1070 nm, 200 W to 1 kW) steered by high-speed F-theta or 3-axis dynamic-focus galvanometer mirrors selectively scan the 2D cross-section, completely melting the powder and wetting 30–80 μm into the previously solidified layers.',
    engineeringConsiderations:
      'Unlike Selective Laser Sintering (SLS), SLM achieves complete liquid-phase fusion. Scan vectors are partitioned into stripes (5–10 mm wide) or islands and rotated by 67° between consecutive layers to randomize directional thermal stress and prevent aligned lack-of-fusion channels.'
  },
  {
    stepNumber: '05',
    title: 'Marangoni Convection & Rapid Epitaxial Solidification',
    timingMetric: 'Cooling Rate dT/dt = 10⁵ – 10⁷ K/s',
    keyControlVariable: 'Thermal Gradient G ≈ 10⁶ – 10⁷ K/m',
    physicalMechanism:
      'Within the 100–250 μm wide molten pool, steep surface-tension gradients drive thermocapillary Marangoni eddies while metal vapor recoil pressure depresses the pool center. As the laser advances, solidification initiates epitaxially from the underlying remelted substrate grain structure.',
    engineeringConsiderations:
      'Extreme cooling rates suppress equilibrium phase separation, creating non-equilibrium supersaturated solid solutions and ultra-fine cellular/dendritic sub-grains (< 0.5–1.5 μm cell spacing) that impart exceptional as-built yield strength via the Hall-Petch relationship.'
  },
  {
    stepNumber: '06',
    title: 'Z-Axis Platform Indexing & Thermal Stress Relief Cycle',
    timingMetric: '1,000 – 15,000+ consecutive layers',
    keyControlVariable: 'Z-Stage Repeatability ± 2 μm',
    physicalMechanism:
      'The build piston indexes downward by exactly one layer thickness t, and steps 03–05 repeat until full 3D geometry completion. Following build cooldown, the entire build plate + attached parts undergo vacuum or inert furnace stress-relief annealing prior to Wire-EDM cutoff.',
    engineeringConsiderations:
      'Cutting parts off the build plate prior to thermal stress relief releases locked-in tensile residual stresses (often approaching the alloy yield strength), causing immediate spring-back distortion exceeding ± 1.5 mm.'
  }
];

export const PBF_COMPARISON_TABLE = [
  {
    parameter: 'Fundamental Fusion Mechanism',
    slm: 'Complete homogeneous melting via CW Yb-fiber laser',
    ebm: 'Complete melting via high-power electron beam in vacuum',
    sls: 'Partial liquid-phase or solid-state neck sintering',
    binderJet: 'Liquid polymer binder deposition + furnace sintering'
  },
  {
    parameter: 'Energy Source & Wavelength',
    slm: 'Yb-Fiber Laser (λ = 1064 nm or 515 nm green), 200–1000 W',
    ebm: 'Thermionic / LaB6 Electron Gun, 3000–6000 W',
    sls: 'CO2 or Diode Laser (λ = 10.6 μm), 30–100 W',
    binderJet: 'Piezoelectric thermal printhead + Sintering Furnace'
  },
  {
    parameter: 'Build Chamber Environment',
    slm: 'Inert Argon or Nitrogen at 1 atm (O2 < 100 ppm)',
    ebm: 'High Vacuum (10⁻⁴ to 10⁻⁵ mbar + He partial bleed)',
    sls: 'Nitrogen purge at atmospheric pressure',
    binderJet: 'Ambient air printing → H2/Vacuum furnace debinding'
  },
  {
    parameter: 'Powder Feedstock PSD & Layer Thickness',
    slm: 'PSD 15–45 μm · Layer t = 20–90 μm',
    ebm: 'PSD 45–105 μm · Layer t = 50–120 μm',
    sls: 'PSD 30–80 μm · Layer t = 80–150 μm',
    binderJet: 'PSD 5–25 μm (MIM grade) · Layer t = 35–100 μm'
  },
  {
    parameter: 'As-Built Relative Density',
    slm: '99.50% – 99.95% (without HIP)',
    ebm: '99.40% – 99.90%',
    sls: '82.0% – 92.0% (requires infiltration)',
    binderJet: '96.0% – 98.5% (15–20% linear isotropic shrinkage)'
  },
  {
    parameter: 'Surface Roughness (As-Built Ra)',
    slm: 'Ra = 6 – 16 μm',
    ebm: 'Ra = 25 – 45 μm',
    sls: 'Ra = 14 – 24 μm',
    binderJet: 'Ra = 3 – 8 μm'
  },
  {
    parameter: 'Residual Stress & Pre-Heat Temp',
    slm: 'High residual stress · Plate pre-heat 80–250 °C (up to 500 °C)',
    ebm: 'Near-zero residual stress · Powder bed held at 700–1050 °C',
    sls: 'Low stress (polymer/composite matrix)',
    binderJet: 'Zero printing stress · Distortion risk during sintering slumping'
  }
];

export const ALLOWED_ALLOYS: AlloyMaterial[] = [
  {
    id: 'ti64-eli',
    designation: 'Ti-6Al-4V ELI (Grade 23 / Grade 5)',
    family: 'Titanium',
    unsOrStandard: 'ASTM F3001 / AMS 4999 / UNS R56401',
    nominalComposition: 'Ti-bal · 6.0% Al · 4.0% V · < 0.13% O · < 0.25% Fe',
    shieldGas: 'Argon (Ar)',
    laserWavelengthNm: 1064,
    optimalEvRange: [52, 78],
    defaultPowerW: 280,
    defaultSpeedMmS: 1200,
    defaultHatchMm: 0.10,
    defaultLayerUm: 30,
    asBuilt: {
      utsMpa: 1240,
      yieldMpa: 1110,
      elongationPct: 7.5,
      hardnessHv: 385
    },
    heatTreated: {
      utsMpa: 1035,
      yieldMpa: 945,
      elongationPct: 14.5,
      hardnessHv: 340,
      protocol: 'Sub-transus anneal 800 °C / 2h in vacuum + furnace cool (or HIP 920 °C @ 100 MPa)'
    },
    relativeDensityPct: 99.85,
    thermalConductivityWmK: 6.7,
    meltingPointC: 1660,
    densityGCm3: 4.43,
    processabilityRating: 'HIGH',
    microstructureNotes:
      'As-built state consists of acicular hexagonal α′ martensite needles locked within columnar prior-β grains due to >10⁵ K/s cooling. Sub-transus annealing decomposes brittle α′ into a ductile lamellar α+β basketweave microstructure.',
    primaryApplications: [
      'Orthopedic trabecular spinal cages & acetabular cups',
      'Aerospace topology-optimized airframe brackets',
      'Cryogenic liquid oxygen turbopump impellers'
    ],
    metallurgicalHazards:
      'Extreme oxygen/nitrogen interstitial pickup sensitivity above 200 ppm O2 causes severe embrittlement; low thermal conductivity (6.7 W/m·K) traps heat in overhangs, requiring dense support structures.'
  },
  {
    id: 'cp-ti-gr2',
    designation: 'Commercially Pure Titanium (CP-Ti Grade 2)',
    family: 'Titanium',
    unsOrStandard: 'ASTM F67 / UNS R50400',
    nominalComposition: '99.2% Ti · < 0.25% O · < 0.30% Fe · < 0.03% N',
    shieldGas: 'Argon (Ar)',
    laserWavelengthNm: 1064,
    optimalEvRange: [55, 85],
    defaultPowerW: 250,
    defaultSpeedMmS: 1050,
    defaultHatchMm: 0.10,
    defaultLayerUm: 30,
    asBuilt: {
      utsMpa: 640,
      yieldMpa: 530,
      elongationPct: 19.0,
      hardnessHv: 215
    },
    heatTreated: {
      utsMpa: 570,
      yieldMpa: 450,
      elongationPct: 25.0,
      hardnessHv: 190,
      protocol: 'Vacuum stress relief at 600 °C for 2 hours'
    },
    relativeDensityPct: 99.90,
    thermalConductivityWmK: 16.4,
    meltingPointC: 1668,
    densityGCm3: 4.51,
    processabilityRating: 'HIGH',
    microstructureNotes:
      'Single-phase hexagonal close-packed (HCP) α-Ti grain structure free of cytotoxic Vanadium or Aluminum alloying elements, offering superior ductility and lower residual stress cracking than Ti-6Al-4V.',
    primaryApplications: [
      'Maxillofacial & cranial reconstruction plates',
      'Electrochemical chlor-alkali anodes & corrosion-resistant heat exchangers',
      'Dental subperiosteal implants'
    ],
    metallurgicalHazards:
      'Grain coarsening if volumetric energy density exceeds 90 J/mm³; requires strict Argon purity (< 100 ppm O2).'
  },
  {
    id: 'inconel-718',
    designation: 'Inconel 718 (UNS N07718)',
    family: 'Nickel Superalloys',
    unsOrStandard: 'ASTM F3055 / AMS 5662 / UNS N07718',
    nominalComposition: '52% Ni · 19% Cr · 18% Fe · 5.1% Nb+Ta · 3.0% Mo · 0.9% Ti · 0.5% Al',
    shieldGas: 'Argon (Ar)',
    laserWavelengthNm: 1064,
    optimalEvRange: [58, 82],
    defaultPowerW: 285,
    defaultSpeedMmS: 960,
    defaultHatchMm: 0.11,
    defaultLayerUm: 40,
    asBuilt: {
      utsMpa: 1010,
      yieldMpa: 720,
      elongationPct: 26.0,
      hardnessHv: 305
    },
    heatTreated: {
      utsMpa: 1430,
      yieldMpa: 1210,
      elongationPct: 16.5,
      hardnessHv: 465,
      protocol: 'Solution treatment 980 °C (or 1065 °C homogenize) + Dual Age 720 °C / 8h → 620 °C / 8h'
    },
    relativeDensityPct: 99.88,
    thermalConductivityWmK: 11.4,
    meltingPointC: 1336,
    densityGCm3: 8.19,
    processabilityRating: 'HIGH',
    microstructureNotes:
      'Sluggish precipitation kinetics of body-centered tetragonal γ″ (Ni3Nb) makes IN718 uniquely resistant to strain-age weld cracking during SLM solidification. As-built interdendritic Laves phases must be dissolved via homogenization.',
    primaryApplications: [
      'Liquid-propellant rocket engine swirl injectors & thrust chambers',
      'Gas turbine hot-section stator vanes & combustion liners',
      'Subsea sour-gas high-pressure valve trims (up to 650 °C)'
    ],
    metallurgicalHazards:
      'Niobium micro-segregation in interdendritic regions forms brittle Laves phases if cooling rates drop; requires homogenization + double-aging to precipitate strengthening γ″ and γ′ phases.'
  },
  {
    id: 'inconel-625',
    designation: 'Inconel 625 (UNS N06625)',
    family: 'Nickel Superalloys',
    unsOrStandard: 'ASTM F3056 / AMS 5666 / UNS N06625',
    nominalComposition: '61% Ni · 21.5% Cr · 9.0% Mo · 3.6% Nb+Ta · < 5.0% Fe',
    shieldGas: 'Argon (Ar)',
    laserWavelengthNm: 1064,
    optimalEvRange: [60, 88],
    defaultPowerW: 290,
    defaultSpeedMmS: 950,
    defaultHatchMm: 0.10,
    defaultLayerUm: 40,
    asBuilt: {
      utsMpa: 990,
      yieldMpa: 710,
      elongationPct: 32.0,
      hardnessHv: 295
    },
    heatTreated: {
      utsMpa: 930,
      yieldMpa: 615,
      elongationPct: 40.0,
      hardnessHv: 270,
      protocol: 'Stress-relief 870 °C / 1h or Solution Anneal 1150 °C / 2h to dissolve NbC/Laves'
    },
    relativeDensityPct: 99.90,
    thermalConductivityWmK: 9.8,
    meltingPointC: 1350,
    densityGCm3: 8.44,
    processabilityRating: 'HIGH',
    microstructureNotes:
      'Solid-solution strengthened Austenitic Ni-Cr-Mo-Nb matrix with outstanding weldability and resistance to pitting, crevice corrosion, and chloride stress-corrosion cracking.',
    primaryApplications: [
      'Chemical process micro-channel heat exchangers',
      'Marine exhaust manifolds & nuclear reactor core fittings',
      'Aerospace exhaust ducting & thrust reverser links'
    ],
    metallurgicalHazards:
      'Stress-relief at 870 °C can nucleate orthorhombic δ-phase (Ni3Nb) needles at cell boundaries if Mo/Nb segregation is high; 1150 °C solution annealing restores isotropic corrosion resistance.'
  },
  {
    id: 'hastelloy-x',
    designation: 'Hastelloy X (UNS N06002)',
    family: 'Nickel Superalloys',
    unsOrStandard: 'AMS 5754 / UNS N06002',
    nominalComposition: '47% Ni · 22% Cr · 18.5% Fe · 9.0% Mo · 1.5% Co · 0.6% W',
    shieldGas: 'Argon (Ar)',
    laserWavelengthNm: 1064,
    optimalEvRange: [62, 85],
    defaultPowerW: 275,
    defaultSpeedMmS: 1000,
    defaultHatchMm: 0.10,
    defaultLayerUm: 30,
    asBuilt: {
      utsMpa: 840,
      yieldMpa: 645,
      elongationPct: 28.0,
      hardnessHv: 265
    },
    heatTreated: {
      utsMpa: 765,
      yieldMpa: 390,
      elongationPct: 42.0,
      hardnessHv: 225,
      protocol: 'Solution anneal at 1177 °C for 1h + rapid gas fan quench + HIP'
    },
    relativeDensityPct: 99.75,
    thermalConductivityWmK: 9.1,
    meltingPointC: 1355,
    densityGCm3: 8.22,
    processabilityRating: 'MODERATE',
    microstructureNotes:
      'Exceptional oxidation resistance up to 1200 °C. Modern SLM-optimized grades tightly restrict minor Si, Mn, and C additions to eliminate solidification micro-cracking along high-angle grain boundaries.',
    primaryApplications: [
      'Industrial gas turbine burner tips & fuel nozzles',
      'Jet engine afterburner flameholders & combustor tiles',
      'High-temperature hydrogen reformer manifolds'
    ],
    metallurgicalHazards:
      'Susceptible to solidification and liquation micro-cracking if tramp Silicon (> 0.15 wt%) or Carbon segregates to grain boundaries.'
  },
  {
    id: 'ss-316l',
    designation: 'AISI 316L Austenitic Stainless Steel',
    family: 'Ferrous & Tool Steels',
    unsOrStandard: 'ASTM F3184 / UNS S31603',
    nominalComposition: 'Fe-bal · 17.5% Cr · 12.5% Ni · 2.5% Mo · < 0.03% C',
    shieldGas: 'Nitrogen (N2) / Argon',
    laserWavelengthNm: 1064,
    optimalEvRange: [55, 92],
    defaultPowerW: 250,
    defaultSpeedMmS: 1000,
    defaultHatchMm: 0.10,
    defaultLayerUm: 40,
    asBuilt: {
      utsMpa: 685,
      yieldMpa: 550,
      elongationPct: 44.0,
      hardnessHv: 235
    },
    heatTreated: {
      utsMpa: 620,
      yieldMpa: 430,
      elongationPct: 54.0,
      hardnessHv: 195,
      protocol: 'Stress relief 650 °C / 2h or Solution Anneal 1060 °C / 1h'
    },
    relativeDensityPct: 99.92,
    thermalConductivityWmK: 15.0,
    meltingPointC: 1400,
    densityGCm3: 7.98,
    processabilityRating: 'HIGH',
    microstructureNotes:
      'SLM 316L exhibits a remarkable strength-ductility synergy that breaks the conventional wrought trade-off: hierarchical dislocation cellular networks (~500 nm diameter) stabilized by nano-oxide inclusions double the yield strength over wrought annealed 316L (~220 MPa) while retaining >40% elongation.',
    primaryApplications: [
      'Pharmaceutical & food-grade hygienic fluid manifolds',
      'Biomedical surgical instruments & endoscopic tooling',
      'Cryogenic valves & nuclear fusion blanket cooling modules'
    ],
    metallurgicalHazards:
      'High solution annealing (> 1050 °C) dissolves the beneficial sub-grain dislocation cell walls, reducing yield strength back toward conventional wrought levels.'
  },
  {
    id: 'maraging-m300',
    designation: '18Ni300 Maraging Steel (M300 / 1.2709)',
    family: 'Ferrous & Tool Steels',
    unsOrStandard: 'DIN 1.2709 / AMS 6514',
    nominalComposition: 'Fe-bal · 18% Ni · 9.0% Co · 5.0% Mo · 0.7% Ti · < 0.03% C',
    shieldGas: 'Nitrogen (N2) / Argon',
    laserWavelengthNm: 1064,
    optimalEvRange: [58, 86],
    defaultPowerW: 280,
    defaultSpeedMmS: 980,
    defaultHatchMm: 0.10,
    defaultLayerUm: 40,
    asBuilt: {
      utsMpa: 1150,
      yieldMpa: 1020,
      elongationPct: 12.0,
      hardnessHv: 355
    },
    heatTreated: {
      utsMpa: 2050,
      yieldMpa: 1960,
      elongationPct: 6.2,
      hardnessHv: 610,
      protocol: 'Direct isothermal aging at 490 °C for 6 hours (air cool, <0.08% dimensional change)'
    },
    relativeDensityPct: 99.90,
    thermalConductivityWmK: 19.8,
    meltingPointC: 1415,
    densityGCm3: 8.05,
    processabilityRating: 'HIGH',
    microstructureNotes:
      'Carbon-free low-hardness BCC lath martensite forms upon SLM cooling without brittle quench cracking. Subsequent 490 °C aging precipitates uniform Ni3(Ti,Mo) and Fe2Mo intermetallic nanoparticles, reaching 54–58 HRC.',
    primaryApplications: [
      'Conformal-cooled plastic injection molding core inserts',
      'High-pressure aluminum die-casting (HPDC) tooling dies',
      'Ultra-high-strength aerospace landing gear & missile actuator housings'
    ],
    metallurgicalHazards:
      'Titanium segregation at melt pool boundaries can form Ti(C,N) stringers that reduce high-cycle fatigue endurance if nitrogen shield gas contains excessive oxygen.'
  },
  {
    id: 'h13-tool-steel',
    designation: 'H13 Hot-Work Tool Steel (DIN 1.2344)',
    family: 'Ferrous & Tool Steels',
    unsOrStandard: 'ASTM A681 / DIN 1.2344',
    nominalComposition: 'Fe-bal · 5.2% Cr · 1.4% Mo · 1.0% V · 1.0% Si · 0.40% C',
    shieldGas: 'Argon (Ar)',
    laserWavelengthNm: 1064,
    optimalEvRange: [65, 95],
    defaultPowerW: 260,
    defaultSpeedMmS: 800,
    defaultHatchMm: 0.10,
    defaultLayerUm: 30,
    asBuilt: {
      utsMpa: 1620,
      yieldMpa: 1350,
      elongationPct: 4.5,
      hardnessHv: 540
    },
    heatTreated: {
      utsMpa: 1890,
      yieldMpa: 1640,
      elongationPct: 7.5,
      hardnessHv: 590,
      protocol: 'Double tempering at 550 °C (2 × 2h) transforming retained austenite + secondary carbide precipitation'
    },
    relativeDensityPct: 99.65,
    thermalConductivityWmK: 24.5,
    meltingPointC: 1427,
    densityGCm3: 7.80,
    processabilityRating: 'SPECIALIZED',
    microstructureNotes:
      'Contains 0.40 wt% Carbon, forming hard, brittle untempered plate martensite plus 15–20% retained austenite. Requires mandatory high-temperature build-plate preheating (200–400 °C) during printing to prevent cold martensitic cracking.',
    primaryApplications: [
      'Hot stamping & forging die inserts with conformal cooling',
      'Extrusion mandrels with superior thermal fatigue resistance',
      'Wear-resistant industrial cutting & punching heads'
    ],
    metallurgicalHazards:
      'Without ≥ 200 °C substrate preheating, the volumetric expansion of martensite transformation below Ms (~310 °C) triggers catastrophic macroscopic through-cracking during the build.'
  },
  {
    id: 'alsi10mg',
    designation: 'AlSi10Mg Eutectic Aluminum Alloy',
    family: 'Aluminum',
    unsOrStandard: 'ASTM F3318 / EN AC-43000',
    nominalComposition: 'Al-bal · 9.0–11.0% Si · 0.25–0.45% Mg · < 0.55% Fe',
    shieldGas: 'Argon (Ar)',
    laserWavelengthNm: 1064,
    optimalEvRange: [44, 65],
    defaultPowerW: 370,
    defaultSpeedMmS: 1350,
    defaultHatchMm: 0.13,
    defaultLayerUm: 30,
    asBuilt: {
      utsMpa: 435,
      yieldMpa: 275,
      elongationPct: 7.5,
      hardnessHv: 132
    },
    heatTreated: {
      utsMpa: 330,
      yieldMpa: 245,
      elongationPct: 13.5,
      hardnessHv: 105,
      protocol: 'Direct T5 Aging (170 °C / 6h) or Stress-Relief (270 °C / 2h) to avoid T6 hydrogen blistering'
    },
    relativeDensityPct: 99.60,
    thermalConductivityWmK: 155.0,
    meltingPointC: 590,
    densityGCm3: 2.67,
    processabilityRating: 'HIGH',
    microstructureNotes:
      'Near-eutectic Al-Si composition (10 wt% Si vs eutectic 12.6 wt%) narrows the solidification freezing range ΔT to < 20 °C, completely suppressing the hot-tearing cracks that plague 6061/7075 wrought alloys. Fibrous eutectic Si network surrounds α-Al cells.',
    primaryApplications: [
      'Lightweight avionics & satellite cold-plate enclosures',
      'Formula 1 / EV inverter micro-fin liquid heat sinks',
      'Robotic end-of-arm lightweight structural effectors'
    ],
    metallurgicalHazards:
      'High optical reflectivity (~75% at 1064 nm) and high thermal conductivity (155 W/m·K) demand higher laser power (≥ 350 W). Surface moisture on Al powder dissociates into atomic Hydrogen, causing spherical hydrogen gas pores during conventional T6 solutionizing.'
  },
  {
    id: 'scalmalloy',
    designation: 'Scalmalloy (Al-4.6Mg-0.7Sc-0.3Zr)',
    family: 'Aluminum',
    unsOrStandard: 'AMS 4997 / Proprietary AM Alloy',
    nominalComposition: 'Al-bal · 4.6% Mg · 0.72% Sc · 0.32% Zr · 0.45% Mn',
    shieldGas: 'Argon (Ar)',
    laserWavelengthNm: 1064,
    optimalEvRange: [50, 72],
    defaultPowerW: 360,
    defaultSpeedMmS: 1250,
    defaultHatchMm: 0.12,
    defaultLayerUm: 30,
    asBuilt: {
      utsMpa: 380,
      yieldMpa: 310,
      elongationPct: 16.0,
      hardnessHv: 118
    },
    heatTreated: {
      utsMpa: 525,
      yieldMpa: 485,
      elongationPct: 14.0,
      hardnessHv: 165,
      protocol: 'Single-step isothermal aging at 325 °C for 4 hours (precipitates coherent Al3(Sc,Zr) dispersoids)'
    },
    relativeDensityPct: 99.80,
    thermalConductivityWmK: 122.0,
    meltingPointC: 635,
    densityGCm3: 2.67,
    processabilityRating: 'HIGH',
    microstructureNotes:
      'Purpose-engineered for SLM: primary L12-structured Al3(Sc,Zr) nanoparticles nucleate ahead of the solidification front, acting as potent grain refiners that produce a bimodal equiaxed/fine-columnar grain structure immune to hot cracking and delivering specific strength rivaling Ti-6Al-4V.',
    primaryApplications: [
      'Primary load-bearing aerospace cabin & wing ribs',
      'Motorsport suspension knuckles & crash-energy absorbers',
      'Optical satellite mirror substrates'
    ],
    metallurgicalHazards:
      'High feedstock cost driven by Scandium raw material pricing; Magnesium vaporization must be compensated by 0.3–0.5 wt% Mg over-alloying in virgin powder.'
  },
  {
    id: 'cocrmo-f75',
    designation: 'CoCrMo Superalloy (ASTM F75 / MP1)',
    family: 'CoCr & Refractory',
    unsOrStandard: 'ASTM F75 / ISO 5832-4 / UNS R30075',
    nominalComposition: 'Co-bal · 28.0% Cr · 6.0% Mo · < 0.75% Ni · < 0.35% C',
    shieldGas: 'Argon (Ar)',
    laserWavelengthNm: 1064,
    optimalEvRange: [64, 92],
    defaultPowerW: 270,
    defaultSpeedMmS: 950,
    defaultHatchMm: 0.10,
    defaultLayerUm: 30,
    asBuilt: {
      utsMpa: 1180,
      yieldMpa: 860,
      elongationPct: 11.5,
      hardnessHv: 410
    },
    heatTreated: {
      utsMpa: 1080,
      yieldMpa: 740,
      elongationPct: 18.0,
      hardnessHv: 375,
      protocol: 'Solution anneal at 1150 °C for 2h + HIP to balance FCC γ / HCP ε phase ratio'
    },
    relativeDensityPct: 99.88,
    thermalConductivityWmK: 13.0,
    meltingPointC: 1390,
    densityGCm3: 8.35,
    processabilityRating: 'HIGH',
    microstructureNotes:
      'Dual-phase metastable face-centered cubic (γ) and hexagonal close-packed (ε) cobalt matrix with fine M23C6 carbides, offering exceptional sliding wear resistance, biocompatibility, and high-temperature creep strength.',
    primaryApplications: [
      'Femoral knee condyles & dental removable partial frameworks',
      'Aero-engine fuel nozzle swirlers & turbine seals',
      'High-wear prosthetic bearing surfaces'
    ],
    metallurgicalHazards:
      'High elastic modulus (210–230 GPa) induces severe residual stress curling during long-span bridge prints (e.g., dental arches), necessitating rigid support grids.'
  },
  {
    id: 'cucr1zr',
    designation: 'CuCr1Zr Precipitation-Hardened Copper (C18150)',
    family: 'Copper Alloys',
    unsOrStandard: 'UNS C18150 / CW106C',
    nominalComposition: 'Cu-bal · 0.85% Cr · 0.12% Zr',
    shieldGas: 'Argon (Ar)',
    laserWavelengthNm: 515,
    optimalEvRange: [85, 135],
    defaultPowerW: 450,
    defaultSpeedMmS: 750,
    defaultHatchMm: 0.09,
    defaultLayerUm: 30,
    asBuilt: {
      utsMpa: 310,
      yieldMpa: 225,
      elongationPct: 28.0,
      hardnessHv: 102
    },
    heatTreated: {
      utsMpa: 495,
      yieldMpa: 415,
      elongationPct: 17.5,
      hardnessHv: 158,
      protocol: 'Direct aging at 480 °C for 3h in Argon (precipitates nano-Cr & lowers electrical resistivity)'
    },
    relativeDensityPct: 99.65,
    thermalConductivityWmK: 325.0,
    meltingPointC: 1080,
    densityGCm3: 8.89,
    processabilityRating: 'SPECIALIZED',
    microstructureNotes:
      'In the as-built state, Chromium remains supersaturated in the Cu matrix, lowering thermal conductivity to ~160 W/m·K. Aging at 480 °C precipitates coherent Cr particles out of solid solution, restoring thermal conductivity to >320 W/m·K (~80% IACS) while doubling yield strength.',
    primaryApplications: [
      'Regeneratively cooled liquid rocket combustion chamber liners',
      'High-frequency RF induction heating coils with internal water cooling',
      'High-power semiconductor & tokamak fusion divertor heat sinks'
    ],
    metallurgicalHazards:
      'Pure/low-alloy copper reflects >92% of standard 1064 nm IR radiation at room temperature and conducts heat away at >300 W/m·K, causing severe lack-of-fusion or optical back-reflection damage unless processed with ≥ 600–1000 W IR lasers or 515 nm Green lasers (~40% absorptivity).'
  }
];

export const RESTRICTED_MATERIALS: RestrictedMaterialCase[] = [
  {
    materialGroup: 'High-Strength Wrought Aluminum (6xxx & 7xxx Series)',
    representativeGrades: 'AA6061, AA7075, AA2024',
    rootFailureMechanism: 'Solidification Hot Tearing (Intergranular Liquation Cracking)',
    physicalExplanation:
      'Wrought precipitation-hardening aluminum alloys possess a wide mushy-zone solidification temperature range (ΔT ≈ 80–130 °C). During the final stage of SLM solidification (solid fraction fs = 0.85–0.98), continuous thin liquid films remain trapped between coarse columnar dendrites while thermal contraction pulls the grains apart, tearing the semisolid network.',
    engineeringMitigation:
      'Replace with near-eutectic AlSi10Mg (ΔT < 20 °C), Scandium-modified Scalmalloy, or functionalize 7075 powder surfaces with 1 vol% ZrH2 / TiB2 nanoparticles to nucleate fine equiaxed grains that accommodate solidification shrinkage.'
  },
  {
    materialGroup: 'High-γ′ Nickel Superalloys ("Non-Weldable" Turbine Grades)',
    representativeGrades: 'CM247LC, IN738LC, Rene 142, IN100 (Al + Ti > 6 wt%)',
    rootFailureMechanism: 'Strain-Age Cracking (SAC) & Ductility-Dip Cracking (DDC)',
    physicalExplanation:
      'Superalloys containing > 4–6 wt% combined (Al + Ti) rapidly precipitate coherent γ′ Ni3(Al,Ti) particles directly during the cyclic thermal reheating of SLM layers or during post-build stress relief. The volumetric contraction of γ′ precipitation coincides with high tensile residual stress, fracturing low-ductility grain boundaries.',
    engineeringMitigation:
      'Utilize inductive substrate preheating at 800–1000 °C inside specialized high-temp SLM chambers, or transition to Electron Beam Melting (EBM) where the entire powder bed is maintained at ~1000 °C.'
  },
  {
    materialGroup: 'High-Carbon Martensitic & Bearing Steels',
    representativeGrades: 'AISI 1080, 52100 Bearing Steel, M2 High-Speed Steel (C > 0.5 wt%)',
    rootFailureMechanism: 'Athermal Plate Martensite Transformation Cracking',
    physicalExplanation:
      'High dissolved carbon depresses the Martensite Start temperature (Ms) and increases the tetragonality (c/a ratio) of body-centered tetragonal martensite. Rapid cooling triggers an abrupt volumetric expansion (~4%) within a brittle untempered matrix, causing audible brittle fracture across the part.',
    engineeringMitigation:
      'Substitute carbon-hardened steels with carbon-free 18Ni300 Maraging Steel (aged to 56 HRC via intermetallics), or employ 300–500 °C heated build plates with in-situ laser remelting.'
  },
  {
    materialGroup: 'Alloys with Volatile High-Vapor-Pressure Elements',
    representativeGrades: 'Brasses (Cu-Zn), 7075 (Zn/Mg), Magnesium Alloys (AZ91D)',
    rootFailureMechanism: 'Selective Element Vaporization, Plume Attenuation & Keyhole Collapse',
    physicalExplanation:
      'Zinc (boiling point 907 °C) and Magnesium (boiling point 1091 °C) boil violently well below the melting points of copper or iron matrices. Explosive evaporation creates dense black soot plumes that absorb/defocus the laser beam, alters final part chemistry, and leaves severe trapped keyhole gas porosity.',
    engineeringMitigation:
      'Avoid Zinc-bearing brasses in SLM (use CuSn10 bronze or CuCr1Zr instead); for Mg biomedical implants, utilize hyperbaric Argon chambers with boosted laminar cross-flow extraction and strict fire-passivation filtration.'
  }
];

export const INDUSTRIAL_APPLICATIONS: ApplicationSector[] = [
  {
    id: 'aerospace-propulsion',
    sectorTitle: 'Aerospace & Liquid Rocket Propulsion',
    subDiscipline: 'Combustion Hardware, Turbopumps & Structural Topology',
    flagshipPartName: 'Monolithic Inconel 718 / GRCop-42 Co-Axial Swirl Fuel Injector & Regeneratively Cooled Nozzle',
    schematicType: 'aerospace-injector',
    qualifiedAlloys: ['Inconel 718', 'GRCop-42 (Cu-Cr-Nb)', 'Ti-6Al-4V ELI', 'Scalmalloy'],
    keyMetricDelta: '115 Discrete Machined/Brazed Sub-Parts Consolidated into 1 Monolithic Print',
    buyToFlyComparison: '1.3 : 1 (SLM) vs. 18.5 : 1 (5-Axis CNC Hog-Out from Forged Billet)',
    leadTimeReduction: '14 Weeks → 11 Days (−88% Manufacturing Cycle)',
    functionalJustification:
      'Rocket engine injector heads and thrust chambers require hundreds of sub-millimeter acoustic cavities, impinging propellant orifices, and bifurcated regenerative cooling channels following contoured Laval nozzle profiles—geometries physically impossible to drill or mill without dozens of risky vacuum-braze seams.',
    descriptiveReview:
      'In modern orbital launch vehicles and aero-engines, SLM has transitioned from rapid prototyping to flight-critical serial production (e.g., NASA Marshall, SpaceX, Aerojet Rocketdyne, GE Aerospace, Safran). By printing the entire injector manifold and regenerative cooling jacket as a single unitized structure in Inconel 718 or GRCop-42, structural failure modes associated with cyclic thermal fatigue across weld/braze lines are eliminated. Furthermore, internal variable-density pin-fin arrays and turbulators can be printed directly inside cooling passages to boost convective heat transfer coefficients by 35–60% at minimal pressure-drop penalty.',
    certificationStandards: 'NASA-STD-6030 · SAE AMS7003 · NADCAP AC7110/14',
    quantifiedOutcomes: [
      {
        label: 'Part Count Consolidation',
        conventionalValue: '115 machined & brazed components',
        slmValue: '1 unitized monolithic assembly',
        improvementNote: 'Eliminates 114 weld/braze inspection joints'
      },
      {
        label: 'Component Mass (Topology Optimized)',
        conventionalValue: '14.8 kg',
        slmValue: '8.3 kg',
        improvementNote: '−43.9% structural weight reduction'
      },
      {
        label: 'Production Lead Time',
        conventionalValue: '98 days',
        slmValue: '11 days',
        improvementNote: '−88.7% schedule compression'
      }
    ]
  },
  {
    id: 'medical-orthopedics',
    sectorTitle: 'Biomedical & Patient-Specific Orthopedics',
    subDiscipline: 'Osseointegrative TPMS Lattices & Cranio-Maxillofacial Implants',
    flagshipPartName: 'Ti-6Al-4V ELI Acetabular Hip Cup & Trabecular Spinal Interbody Fusion Cage',
    schematicType: 'medical-implant',
    qualifiedAlloys: ['Ti-6Al-4V ELI (Grade 23)', 'CP-Ti Grade 2', 'CoCrMo (ASTM F75)', 'Tantalum (Ta)'],
    keyMetricDelta: 'Effective Elastic Modulus Tuned from 110 GPa down to 3.5–18 GPa (Matching Human Bone)',
    buyToFlyComparison: '1.15 : 1 (SLM with 94% Powder Recycle) vs. 9.0 : 1 (Swiss-Turn CNC)',
    leadTimeReduction: 'Overnight 24-Hour Custom Patient-CT-to-Surgery Workflow',
    functionalJustification:
      'Solid metallic implants (E ≈ 110 GPa for Ti-6Al-4V; 210 GPa for CoCrMo) are 5 to 20 times stiffer than human cortical (12–20 GPa) and cancellous bone (0.5–4 GPa). According to Wolff’s Law, this stiffness mismatch causes "stress shielding"—depriving surrounding host bone of mechanical load until it resorbs and the implant loosens.',
    descriptiveReview:
      'SLM enables the serial manufacture of millions of FDA-510(k) and CE-cleared orthopedic implants featuring functionally graded Triply Periodic Minimal Surface (TPMS—such as Gyroid, Schwarz-P, and Diamond) or stochastic Voronoi trabecular architectures. With strut thicknesses of 180–300 μm, pore sizes of 400–700 μm, and interconnected porosities of 60–75%, SLM implants simultaneously lower the macroscopic Young’s modulus to match native bone and provide a high-surface-area capillary scaffold for vascularization and osteoblast ingrowth (biological fixation without bone cement).',
    certificationStandards: 'ISO 13485 · ASTM F3001 · FDA Guidance for Additive Manufactured Devices',
    quantifiedOutcomes: [
      {
        label: 'Effective Elastic Modulus (E)',
        conventionalValue: '110.0 GPa (Solid Machined Ti)',
        slmValue: '4.2 – 16.5 GPa (Graded Gyroid Lattice)',
        improvementNote: 'Eliminates Wolff’s Law stress-shielding bone resorption'
      },
      {
        label: 'Bone-to-Implant Pullout Shear Strength',
        conventionalValue: '4.8 MPa (Plasma-Sprayed Coating)',
        slmValue: '19.4 MPa (3D Interconnected Trabecular)',
        improvementNote: '+304% mechanical interlock & zero coating delamination'
      },
      {
        label: 'Porosity & Pore Interconnectivity',
        conventionalValue: 'Surface-only (< 400 μm depth)',
        slmValue: '68% Volumetric (500 μm pore Ø)',
        improvementNote: 'Full through-thickness vascular bone ingrowth'
      }
    ]
  },
  {
    id: 'conformal-tooling',
    sectorTitle: 'Die, Mold & Conformal Cooling Tooling',
    subDiscipline: 'Injection Molding Cores & High-Pressure Die Casting (HPDC)',
    flagshipPartName: '18Ni300 Maraging Steel & H13 Hybrid Injection Mold Core with Helical Conformal Channels',
    schematicType: 'conformal-tooling',
    qualifiedAlloys: ['18Ni300 Maraging Steel', 'H13 Hot-Work Tool Steel', '420 Stainless Steel', 'CuCr1Zr'],
    keyMetricDelta: '−32% to −48% Injection Molding Cooling Cycle Time + 65% Reduction in Part Warpage',
    buyToFlyComparison: 'Hybrid Preform Printing reduces SLM volume by 60% on CNC base',
    leadTimeReduction: 'Tooling Scrap Rate Reduced from 6.4% to < 0.8%',
    functionalJustification:
      'In conventional mold making, cooling water lines are gun-drilled in straight lines, leaving deep cores, thin ribs, and bosses far from cooling channels. These thermal "hot spots" dictate up to 70% of total injection molding cycle time and induce differential shrinkage warpage and sink marks.',
    descriptiveReview:
      'Using SLM—often in a "hybrid printing" setup where the laser builds the complex upper core directly onto a precision-machined conventional steel base plate—mold engineers route helical, spiral, or microvascular conformal cooling passages at a uniform 2.5–4.0 mm offset from the complex 3D mold cavity surface. After a simple 6-hour isothermal age at 490 °C, 18Ni300 Maraging Steel achieves 54–56 HRC hardness with <0.08% dimensional distortion. Cavity surface temperature variance drops from ΔT = 42 °C to < 6 °C, slashing cooling time by over a third across millions of molding shots.',
    certificationStandards: 'DIN 1.2709 · NADCAP / VDI 3405 Part 2',
    quantifiedOutcomes: [
      {
        label: 'Injection Cycle Time (Per Shot)',
        conventionalValue: '34.0 seconds (Straight Gun-Drilled)',
        slmValue: '19.5 seconds (Helical Conformal Channels)',
        improvementNote: '−42.6% cycle time (+74% hourly press throughput)'
      },
      {
        label: 'Mold Surface Thermal Uniformity (ΔT)',
        conventionalValue: '± 21.5 °C hot-spot gradient',
        slmValue: '± 2.8 °C isothermal distribution',
        improvementNote: 'Eliminates polymer warpage & sink marks'
      },
      {
        label: 'Tool Hardness After Aging',
        conventionalValue: '50–52 HRC (H13 Quench & Temper)',
        slmValue: '54–58 HRC (M300 Direct Age @ 490 °C)',
        improvementNote: 'No quench distortion or cracking risk'
      }
    ]
  },
  {
    id: 'energy-turbomachinery',
    sectorTitle: 'Energy, Nuclear & Compact Thermal Systems',
    subDiscipline: 'Triply Periodic Minimal Surface (TPMS) Heat Exchangers & Burner Hardware',
    flagshipPartName: 'Inconel 625 / 316L Supercritical CO2 Gyroid Heat Exchanger & Hydrogen Dry-Low-NOx Burner',
    schematicType: 'tpms-exchanger',
    qualifiedAlloys: ['Inconel 625', 'Hastelloy X', 'AISI 316L', 'CuCr1Zr', 'Pure Tungsten (W)'],
    keyMetricDelta: '4.2× Volumetric Heat Transfer Density (kW/L) vs. Brazed Shell-and-Tube',
    buyToFlyComparison: 'Eliminates 1,200+ tube-to-header braze/weld joints prone to helium/H2 leakage',
    leadTimeReduction: 'Enables 100% H2 fuel pre-mixing without flashback auto-ignition',
    functionalJustification:
      'Next-generation supercritical CO2 (sCO2) Brayton cycles, cryo-hydrogen aviation heat exchangers, and hydrogen-fueled gas turbines require ultra-thin dividing walls (250–400 μm) separating fluids at 250 bar and 700 °C—conditions where conventional diffusion-bonded or brazed plate-fin exchangers suffer header cracking.',
    descriptiveReview:
      'SLM allows the fabrication of bicontinuous TPMS heat exchangers (such as Schwarz-D and Gyroid matrices) where hot and cold fluid streams interpenetrate in 3D space without ever mixing, separated by a continuous, self-supporting 300 μm metallic membrane. The smooth saddle-surface curvature continuously disrupts thermal boundary layers without sharp stagnation corners, achieving 300–450% higher volumetric heat transfer coefficients than shell-and-tube units at one-fourth the dry mass. In gas turbines, SLM burner tips integrate thousands of 0.5 mm effusion cooling holes and premixing channels to burn up to 100% hydrogen without flame flashback.',
    certificationStandards: 'ASME BPVC Code Case 3020 · API 20S · ISO/ASTM 52926',
    quantifiedOutcomes: [
      {
        label: 'Volumetric Heat Transfer Density',
        conventionalValue: '18.5 kW / Liter (Brazed Plate-Fin)',
        slmValue: '78.0 kW / Liter (300 μm Wall Gyroid TPMS)',
        improvementNote: '+321% thermal power density'
      },
      {
        label: 'Core Mass & Footprint',
        conventionalValue: '22.4 kg · 14.2 Liters',
        slmValue: '5.1 kg · 3.3 Liters',
        improvementNote: '−77.2% mass savings for aerospace/marine pods'
      },
      {
        label: 'Hydrogen Fuel Blend Capability',
        conventionalValue: 'Max 30 vol% H2 in CH4 (Flashback limit)',
        slmValue: '100 vol% H2 Micro-Mixer Array',
        improvementNote: 'Zero-carbon turbine combustion compatibility'
      }
    ]
  }
];

export const POINTS_OF_STRENGTH: StrengthOrLimitation[] = [
  {
    index: '01',
    title: 'Near-Full Metallurgical Density & Superior Static Yield Strength',
    category: 'Metallurgical Performance',
    quantitativeBenchmark: '99.5% – 99.95% Relative Density · +25% to +85% Higher Yield Strength vs. Cast/Wrought',
    mechanismAndPhysics:
      'Complete laser melting combined with rapid solidification (10⁵–10⁷ K/s) produces ultra-fine cellular/dendritic sub-grains (cell spacing λ ≈ 0.4–1.2 μm) and dense dislocation networks. By the Hall-Petch relation (σy = σ0 + k·d⁻¹/²), this extreme sub-grain refinement elevates yield and tensile strength well above conventional castings and often above annealed wrought bar.',
    industrialImpact:
      'Enables SLM components to serve directly in structural, pressure-retaining, and flight-critical applications where porous sintered or binder-jetted parts would fail.',
    mitigationOrLeverageStrategy:
      'Pair sub-transus stress-relief or direct aging with Hot Isostatic Pressing (HIP) only when extreme high-cycle fatigue (HCF > 10⁷ cycles) is required.'
  },
  {
    index: '02',
    title: 'Complexity-for-Free & Internal Architectural Freedom',
    category: 'Geometric & Functional Design',
    quantitativeBenchmark: 'Zero Cost Penalty for TPMS Lattices, Helical Channels & Organic Topologies',
    mechanismAndPhysics:
      'Because the laser scans 2D cross-sections layer-by-layer (30–60 μm steps) within a self-supporting powder bed, geometric intricacy inside the part envelope requires no additional tooling paths, fixture setups, or cutter clearances—in fact, lattice core hollowing reduces laser scan time and powder consumption.',
    industrialImpact:
      'Unlocks internal conformal cooling channels, biomimetic bone-ingrowth scaffolds, acoustic metamaterials, and generative AI/topology-optimized load paths that are physically unmanufacturable by 5-axis CNC or investment casting.',
    mitigationOrLeverageStrategy:
      'Apply Design for Additive Manufacturing (DfAM) rules: replace solid blocks with self-supporting Gyroid/Diamond TPMS infills (≥ 45° overhang angle) to simultaneously cut build time and part weight.'
  },
  {
    index: '03',
    title: 'Monolithic Part Consolidation & Joint Elimination',
    category: 'Assembly & Reliability Engineering',
    quantitativeBenchmark: 'Consolidates 20–150+ Sub-Components into a Single Unitized Metallic Print',
    mechanismAndPhysics:
      'Multi-piece brazed, TIG-welded, or bolted assemblies can be redesigned as a single continuous fluidic/structural manifold, eliminating thermal expansion mismatches across flanges, gasket leak paths, and weld heat-affected zones (HAZ).',
    industrialImpact:
      'Dramatically simplifies supply-chain Bills of Materials (BOM), eliminates dozens of non-destructive weld inspections, and removes parasitic fastener mass in aerospace and turbomachinery.',
    mitigationOrLeverageStrategy:
      'Redesign legacy multi-part assemblies around fluid flow and force vectors rather than historical machine-tool access splits.'
  },
  {
    index: '04',
    title: 'Exceptional Buy-to-Fly Material Efficiency & Powder Circularity',
    category: 'Resource & Cost Economics',
    quantitativeBenchmark: 'Buy-to-Fly Ratio 1.1:1 – 1.4:1 (vs. 12:1 – 25:1 in Aerospace CNC Milling)',
    mechanismAndPhysics:
      'Only the powder selectively irradiated by the laser + minimal support structures is consumed per build; 95–98% of the surrounding unmelted powder cake is vacuum-extracted, sieved in inert gas to remove spatter agglomerates (> 63 μm), and blended for subsequent builds.',
    industrialImpact:
      'Provides decisive material cost savings when processing expensive strategic alloys such as Titanium (Ti-6Al-4V), Nickel superalloys (Inconel 718/625), Tantalum, and Scandium-aluminum (Scalmalloy).',
    mitigationOrLeverageStrategy:
      'Implement closed-loop automated inert powder sieving and track oxygen/nitrogen pickup across 15–30 reuse cycles via inert gas fusion (LECO) testing.'
  },
  {
    index: '05',
    title: 'Suppression of Macro-Segregation & Extended Solid Solubility',
    category: 'Solidification Metallurgy',
    quantitativeBenchmark: 'Melt Pool Volume < 0.005 mm³ · Solidification Velocity 0.1–2.0 m/s',
    mechanismAndPhysics:
      'Because the molten pool at any instant is microscopic (~100 μm wide × 60 μm deep) and solidifies in less than a millisecond, solute atoms cannot diffuse over macroscopic distances. This traps alloying elements in extended solid solution and prevents coarse intermetallic inclusions.',
    industrialImpact:
      'Allows processing of high-alloy compositions and nano-composite metal-matrix powders that would segregate severely during ingot casting.',
    mitigationOrLeverageStrategy:
      'Leverage direct aging treatments (e.g., 18Ni300 Maraging Steel or CuCr1Zr) that precipitate uniform nanoscale strengtheners directly from the supersaturated as-built matrix.'
  },
  {
    index: '06',
    title: 'Zero Hard-Tooling Lead Time & Mass Customization Economics',
    category: 'Supply Chain Agility',
    quantitativeBenchmark: 'Lot-Size-One Unit Economics · Digital CAD Revision to Metal in < 48 Hours',
    mechanismAndPhysics:
      'SLM eliminates the 12-to-26-week fabrication of hard forging dies, wax injection molds, or ceramic shell cores. Fifty distinct patient-specific implants or 50 design iterations of a turbine vane can be nested simultaneously on a single 400 × 400 mm build plate.',
    industrialImpact:
      'Transforms medical implant production, on-demand spare parts logistics (digital inventory), and rapid iterative propulsion hardware development.',
    mitigationOrLeverageStrategy:
      'Utilize automated build-plate nesting algorithms and standardized witness coupons on every plate to qualify multi-part mixed batches.'
  }
];

export const DRAWBACKS_AND_LIMITATIONS: StrengthOrLimitation[] = [
  {
    index: '01',
    title: 'Steep Thermal Gradients & Tensile Residual Stress Accumulation',
    category: 'Thermomechanical Distortion',
    quantitativeBenchmark: 'G ≈ 10⁶–10⁷ K/m · Residual Stress σ_res often reaches 70–95% of Alloy Yield Strength',
    mechanismAndPhysics:
      'Via the Temperature Gradient Mechanism (TGM), each newly melted top layer expands against the cooler underlying solid and then undergoes restricted thermal contraction upon rapid cooling. This locks high tensile residual stresses into the outer skin and induces upward bending moments.',
    industrialImpact:
      'Causes part warpage out of dimensional tolerance, recoater blade collisions, support detachment, and macroscopic delamination cracks if not properly anchored and stress-relieved prior to build-plate cutoff.',
    mitigationOrLeverageStrategy:
      'Use 67° interlayer scan rotation, chessboard island strategies, heated build plates (200–500 °C), thermomechanical finite-element pre-deformation (compensated CAD), and mandatory furnace stress relief before Wire-EDM.'
  },
  {
    index: '02',
    title: 'Stochastic Defect Regimes: Keyhole, Lack-of-Fusion & Balling',
    category: 'Process Stability & Fatigue Sensitivity',
    quantitativeBenchmark: 'Fatigue Endurance Limit drops by 40–65% in presence of > 50 μm sub-surface pores',
    mechanismAndPhysics:
      'Excessive energy density (Ev > threshold) causes metal evaporation recoil pressure to drill a deep, unstable vapor cavity ("keyhole") whose collapse traps spherical gas bubbles at the pool root. Insufficient energy causes unmelted irregular Lack-of-Fusion (LoF) cavities between tracks. Excessive scan speed triggers Plateau-Rayleigh capillary "balling."',
    industrialImpact:
      'While static tensile strength is tolerant of < 0.2% porosity, cyclic fatigue life (HCF/LCF) is dictated by the single largest near-surface pore or lack-of-fusion defect acting as a stress concentrator (Kt > 3).',
    mitigationOrLeverageStrategy:
      'Calibrate within the stable Conduction/Transition P-v processing window, maintain laminar Argon cross-flow to clear spatter, and apply Hot Isostatic Pressing (HIP) + surface machining for fatigue-critical parts.'
  },
  {
    index: '03',
    title: 'Epitaxial Columnar Grain Growth & Mechanical Anisotropy',
    category: 'Microstructural Directionality',
    quantitativeBenchmark: '10–25% Delta in Elongation & Yield Strength between XY (Horizontal) and Z (Vertical) Axes',
    mechanismAndPhysics:
      'Because each laser pass partially remelts 30–80 μm of the underlying layer and heat flows predominantly downward (-Z) into the build plate, cubic and BCC/HCP crystals grow epitaxially across dozens of layers with a strong <001> crystallographic texture aligned with the build direction.',
    industrialImpact:
      'Parts loaded in tension along the Z-axis vs. the XY-plane exhibit different elastic moduli, yield strengths, and fracture strains, complicating isotropic structural finite-element certification.',
    mitigationOrLeverageStrategy:
      'Apply recrystallization / super-transus heat treatments, high-intensity top-hat beam profiles, or grain-refining nanoparticle inoculants (e.g., Scalmalloy, TiB2-modified alloys) to induce equiaxed solidification.'
  },
  {
    index: '04',
    title: 'As-Built Surface Roughness & "Stair-Stepping" Effect',
    category: 'Surface Integrity & Tribology',
    quantitativeBenchmark: 'As-Built Ra = 6 – 18 μm (Vertical Walls) · Ra = 18 – 35 μm (Down-Skin Overhangs)',
    mechanismAndPhysics:
      'Partially sintered satellite powder particles cling to the perimeter of the melt pool, while sloped surfaces exhibit discrete layer "stair-stepping" and down-skin dross formation where the laser melts into loose, low-conductivity powder.',
    industrialImpact:
      'As-built surfaces cannot serve as precision bearing journals, sealing faces, or high-cycle fatigue surfaces without post-machining, and internal micro-channels are difficult to polish mechanically.',
    mitigationOrLeverageStrategy:
      'Execute dedicated contour/sky-writing border remelting passes, CNC finish-machine external datum interfaces, and apply Abrasive Flow Machining (AFM), chemical milling, or Hirtisation electrochemical polishing for internal passages.'
  },
  {
    index: '05',
    title: 'Sacrificial Support Burden & Heavy Post-Processing Chain',
    category: 'Downstream Manufacturing Cost',
    quantitativeBenchmark: 'Post-Processing Accounts for 35% – 55% of Total Finished SLM Part Cost & Lead Time',
    mechanismAndPhysics:
      'Overhangs < 40°–45° require dense metallic block, cone, or tree supports to prevent dross and thermal curling. After printing, parts require depowdering, furnace stress relief, Wire-EDM plate removal, manual/CNC support removal, HIP, and surface finishing.',
    industrialImpact:
      'Internal supports trapped inside curved closed manifolds cannot be physically removed, restricting internal channel cross-sections to self-supporting teardrop or diamond shapes.',
    mitigationOrLeverageStrategy:
      'Design self-supporting teardrop/diamond channel cross-sections, use contact-free heat-sink support strategies where applicable, and automate support milling via 5-axis CAM.'
  },
  {
    index: '06',
    title: 'High Capital Cost, Feedstock Price Premium & Volumetric Throughput Ceiling',
    category: 'Industrial Economics & Scalability',
    quantitativeBenchmark: 'Atomized Powder = $45–$320/kg (3×–8× Wrought Bar) · Single-Laser Rate = 15–35 cm³/h',
    mechanismAndPhysics:
      'Industrial SLM platforms require hermetic inert chambers, precision multi-axis optics, and strict 15–45 μm spherical gas-atomized powder (which represents only a fraction of an atomization tower’s particle yield). Single-laser point-by-point scanning is inherently slow for bulky, simple geometries.',
    industrialImpact:
      'Makes SLM economically uncompetitive against casting or CNC machining for simple, high-volume prismatic parts with low geometric complexity.',
    mitigationOrLeverageStrategy:
      'Reserve SLM for high-value, high-complexity geometries; deploy 4-to-12-laser systems with 60–100 μm hull-and-core layer strategies to triple volumetric build rates.'
  }
];

export const INDUSTRIAL_OUTLOOK_ROADMAP: RoadmapPillar[] = [
  {
    phasePeriod: 'Vector 01 · Throughput Scaling',
    trlStatus: 'TRL 8–9 · Commercial Deployment',
    title: 'Multi-Laser Meter-Scale Kinematics & Stitch-Zone Synchronization',
    subtitle: 'Transitioning from single/dual-laser R&D boxes to 8–36 laser heavy industrial foundry platforms',
    targetKpi: 'Volumetric Deposition Rate (cm³/h)',
    currentBaseline: '20 – 85 cm³/h (1–2 Lasers)',
    futureTarget: '450 – 1,200+ cm³/h (12–36 Lasers)',
    technicalDeepDive:
      'Modern industrial SLM platforms (e.g., Nikon SLM NXG XII 600, EOS M 400-4, DMG MORI, Colibrium/Concept Laser) deploy 4 to 12+ independent 1 kW Yb-fiber lasers scanning simultaneously across build envelopes up to 600 × 600 × 1500 mm. The primary engineering breakthrough is dynamic "stitch-zone" calibration: optical auto-calibration ensures < 15 μm beam overlap accuracy between adjacent scanner fields, while intelligent scan-vector scheduling ensures down-wind lasers never scan through the vapor plume or spatter trail of an up-wind laser.',
    integrationRequirements: [
      'Bidirectional recoating during laser jump phases ("zero-delay" recoating)',
      'Skin-Core parameter segmentation: 100 μm thick hull-core layers at 900 W + 30 μm fine outer contour passes',
      'Multi-zone CFD-optimized laminar Argon flow nozzles spanning > 1 meter width'
    ]
  },
  {
    phasePeriod: 'Vector 02 · Quality Assurance',
    trlStatus: 'TRL 6–8 · Rapid Industrial Adoption',
    title: 'Closed-Loop In-Situ Optical/Acoustic Metrology ("Born Qualified")',
    subtitle: 'Replacing destructive post-build X-ray CT bottlenecks with real-time layer-by-layer defect healing',
    targetKpi: 'Post-Build NDT Inspection Cost Share',
    currentBaseline: '18% – 30% of Total Part Cost (Offline X-Ray CT)',
    futureTarget: '< 4% (Real-Time Digital Twin Certification)',
    technicalDeepDive:
      'Currently, certifying flight-critical SLM parts requires expensive post-build X-ray Computed Tomography (CT), which struggles to penetrate thick Inconel or Steel cross-sections. Next-generation industrial systems integrate co-axial high-speed dual-wavelength pyrometers (100 kHz sampling), Optical Coherence Tomography (OCT) for direct 3D micron-topography measurement of every solidified layer, and airborne/structure-borne acoustic emission sensors that detect the ultrasonic signature of keyhole collapse or micro-cracking in real time. Closed-loop FPGA controllers modulate laser power P(t) within microseconds when scanning over thermally insulated overhangs, or trigger an automatic corrective remelting pass over detected lack-of-fusion pores before recoating the next layer.',
    integrationRequirements: [
      'Co-axial photodiode & CMOS melt-pool thermal signature mapping mapped to 3D voxel coordinates',
      'Inline Optical Coherence Tomography (OCT) verifying recoated powder bed uniformity prior to firing',
      'Automated ASME/FAA compliant digital build-log passport per serialized component'
    ]
  },
  {
    phasePeriod: 'Vector 03 · Optical Physics',
    trlStatus: 'TRL 6–7 · Early Industrial Rollout',
    title: 'Programmable Dynamic Beam Shaping & Short-Wavelength (Green/Blue) Lasers',
    subtitle: 'Breaking the Gaussian spot tyranny to suppress keyhole porosity and process reflective pure metals',
    targetKpi: 'Melt Pool Stability & Spatter Reduction',
    currentBaseline: 'Fixed Gaussian Profile (1064 nm IR)',
    futureTarget: 'Dynamic Ring / Top-Hat / Multi-Spot + 515 nm Green',
    technicalDeepDive:
      'Traditional SLM lasers rely on a standard Gaussian intensity profile, where extreme peak irradiance at the beam center vaporizes metal and drives unstable keyhole porosity and violent spatter ejection. Using all-fiber photonic lanterns or Liquid-Crystal-on-Silicon (LCoS) spatial light modulators, new SLM optics switch dynamically in milliseconds between a sharp Gaussian spot (for fine lattice struts) and a wide Ring-mode ("Donut") or Flat-Top intensity profile (for bulky core hatching). Ring-mode beams flatten the thermal gradient across the melt pool, eliminating the central vapor depression, reducing spatter ejection by 80%, and allowing 2×–3× wider hatch spacings. Concurrently, high-power 515 nm green and 450 nm blue lasers raise copper absorptivity from <8% to >40–65%.',
    integrationRequirements: [
      'Dynamic AFX/Corona fiber beam-shaping switching between Gaussian (core index 0) and Ring profiles (index 6)',
      '515 nm frequency-doubled Green disk/fiber lasers for 99.95% dense pure Cu and precious metals',
      'Phased-array diode/VCSEL area-melting heads for ultra-high-throughput support/core printing'
    ]
  },
  {
    phasePeriod: 'Vector 04 · Factory Automation',
    trlStatus: 'TRL 7–9 · Automotive & Aero Serial Lines',
    title: 'Lights-Out Factory Integration, Robotic Powder Logistics & Hybrid CNC Cells',
    subtitle: 'Eliminating manual operator contact with hazardous respirable metal powders from sieve to finished datum',
    targetKpi: 'Machine OEE (Overall Equipment Effectiveness)',
    currentBaseline: '42% – 58% (Manual Setup & Depowdering)',
    futureTarget: '85% – 92% (24/7 Automated Exchange Cell)',
    technicalDeepDive:
      'To integrate SLM alongside traditional CNC machining centers on an automotive or aerospace factory floor, human operators must be decoupled from manual build-chamber turnaround and hazardous respirable condensate/powder handling. Modern industrialized AM factories utilize exchangeable sealed build cylinders transported by Autonomous Mobile Robots (AMRs) between multi-laser printer banks, automated multi-axis vibrational/vacuum depowdering stations, continuous closed-loop inert gas ultrasonic sieves, vacuum stress-relief furnaces, and robotic Wire-EDM saws. Zero-point clamping pallets registered beneath the build plate transfer directly into 5-axis CNC milling centers with automatic fiducial probing.',
    integrationRequirements: [
      'Standardized zero-point hydraulic clamping baseplates shared across SLM printer, Furnace, EDM, and 5-Axis CNC',
      'Closed-loop pneumatic Argon powder conveying with inline moisture, O2, and laser-diffraction PSD sensors',
      'OPC-UA & MTConnect integration into enterprise MES / Siemens Opcenter / SAP production scheduling'
    ]
  },
  {
    phasePeriod: 'Vector 05 · Computational Metallurgy',
    trlStatus: 'TRL 5–7 · High-Growth Frontier',
    title: 'Alloy Design for AM (ADfAM), Nanoparticle Inoculation & In-Situ Alloying',
    subtitle: 'Moving beyond legacy 1950s wrought/casting chemistries to bespoke crack-immune rapid-solidification alloys',
    targetKpi: 'Number of Qualified Structural AM Alloys',
    currentBaseline: '~15 Legacy Wrought/Cast Grades',
    futureTarget: '100+ Purpose-Designed Isotropic AM Alloys',
    technicalDeepDive:
      'For decades, SLM forced legacy alloys designed for slow ingot casting or forging (like 316L, Ti-64, IN718) through 10⁶ K/s laser melting. The next decade is defined by computational CALPHAD/ICME Alloy Design specifically for Additive Manufacturing (ADfAM). By functionalizing gas-atomized powders with lattice-matched ceramic nucleants (e.g., ZrH2, TiB2, LaB6) or designing eutectic/peritectic compositions (like Scalmalloy, ABD-900AM, and Aheadd CP1), solidification switches from coarse directional columnar grains to fine, crack-free, fully isotropic equiaxed grains—unlocking high-strength 7000-series aluminum and ultra-high-temperature turbine superalloys for routine industrial printing.',
    integrationRequirements: [
      'High-throughput CALPHAD solidification cracking susceptibility index (CSI) screening',
      'Electrostatic nanoparticle satellite coating of commodity base powders',
      'Spatially graded multi-material powder recoating (e.g., Copper cooling core graded into Inconel structural jacket)'
    ]
  }
];
