export type Confidence = 'high' | 'medium' | 'assumption';

export interface SourceRef {
  id: string;
  label: string;
  url: string;
  date: string;
  confidence: Confidence;
  note: string;
}

export interface CanonicalScenario {
  retentionPct: number;
  paidAttachPct: number;
  enterpriseConversionPct: number;
  priceRealizationPct: number;
  partnerARR: number;
  vmwareARR: number;
  aiARR: number;
  servicePullThroughPct: number;
  subscriptionContributionMarginPct: number;
  servicesContributionMarginPct: number;
  growthReinvestmentPct: number;
  uncertaintyPct: number;
  marketingShareOfReinvestmentPct: number;
  messageClarityPct: number;
  partnerAmplificationPct: number;
  communityAdvocacyPct: number;
  analystAuthorityPct: number;
  marketingInfluencePct: number;
}

export interface CustomerTcoInputs {
  nodes: number;
  competitorSupportPerNode: number;
  ubuntuProPerNode: number;
  migrationCostPerNode: number;
  annualOpsCostPerNode: number;
  opsEfficiencyPct: number;
  annualEnergyCostPerNode: number;
  energyEfficiencyPct: number;
  annualKwhPerNode: number;
  carbonIntensityKgPerKwh: number;
}

export const CANONICAL_BASE_2025 = {
  revenue: 344.6,
  subscriptionRevenue: 287.0,
  servicesRevenue: 57.6,
  operatingProfit: 26.9,
  netIncome: 22.8,
  priorRevenue: 291.5,
  priorSubscriptionRevenue: 235.4,
  priorServicesRevenue: 56.1,
  priorOperatingProfit: 15.5,
};

export const DEFAULT_CANONICAL_SCENARIO: CanonicalScenario = {
  retentionPct: 97.5,
  paidAttachPct: 7.0,
  enterpriseConversionPct: 5.0,
  priceRealizationPct: 2.0,
  partnerARR: 12,
  vmwareARR: 18,
  aiARR: 15,
  servicePullThroughPct: 18,
  subscriptionContributionMarginPct: 78,
  servicesContributionMarginPct: 28,
  growthReinvestmentPct: 35,
  uncertaintyPct: 22,
  marketingShareOfReinvestmentPct: 30,
  messageClarityPct: 78,
  partnerAmplificationPct: 65,
  communityAdvocacyPct: 75,
  analystAuthorityPct: 55,
  marketingInfluencePct: 35,
};

export const DEFAULT_CUSTOMER_TCO: CustomerTcoInputs = {
  nodes: 1000,
  competitorSupportPerNode: 900,
  ubuntuProPerNode: 500,
  migrationCostPerNode: 650,
  annualOpsCostPerNode: 450,
  opsEfficiencyPct: 12,
  annualEnergyCostPerNode: 280,
  energyEfficiencyPct: 5,
  annualKwhPerNode: 6500,
  carbonIntensityKgPerKwh: 0.4,
};

export const SOURCES: SourceRef[] = [
  {
    id: 'canonical-2025-accounts',
    label: 'Canonical Group Limited — 2025 group accounts filing',
    url: 'https://find-and-update.company-information.service.gov.uk/company/06870835/filing-history',
    date: '2026-06-05',
    confidence: 'high',
    note: 'Primary statutory filing exists for year ended 31 Dec 2025. Financial figures in the model are tied to that filing and a cross-checked extraction.',
  },
  {
    id: 'canonical-15-year',
    label: 'Canonical — Ubuntu LTS coverage expanded to 15 years',
    url: 'https://canonical.com/blog/canonical-expands-total-coverage-for-ubuntu-lts-releases-to-15-years-with-legacy-add-on',
    date: '2025-11',
    confidence: 'high',
    note: 'Current lifecycle positioning. Supersedes the earlier 12-year message used in the first deck.',
  },
  {
    id: 'canonical-pro',
    label: 'Ubuntu — Ubuntu Pro plans and pricing',
    url: 'https://ubuntu.com/pricing/pro',
    date: 'current',
    confidence: 'high',
    note: 'Primary current pricing source. Ubuntu Pro Enterprise self-support is listed at $500 per server per year; support tiers cost more. The TCO input remains editable and must be replaced with a customer quote for external use.',
  },
  {
    id: 'canonical-ai',
    label: 'Canonical — AI infrastructure',
    url: 'https://canonical.com/solutions/ai/infrastructure',
    date: 'current',
    confidence: 'high',
    note: 'Supports neutral hybrid/multi-cloud AI infrastructure positioning and NVIDIA collaboration.',
  },
  {
    id: 'canonical-gtc-2026',
    label: 'Canonical — NVIDIA GTC 2026',
    url: 'https://canonical.com/blog/nvidia-gtc-2026',
    date: '2026-03-16',
    confidence: 'high',
    note: 'Evidence of Ubuntu 26.04 readiness for NVIDIA CUDA, Vera Rubin NVL72 and other AI hardware.',
  },
  {
    id: 'ubuntu-2604-release',
    label: 'Canonical — Ubuntu 26.04 LTS release',
    url: 'https://canonical.com/blog/canonical-releases-ubuntu-26-04-lts-resolute-raccoon',
    date: '2026-04-23',
    confidence: 'high',
    note: 'Confirms Ubuntu 26.04 LTS general availability and native support for AI/ML toolkits including NVIDIA CUDA and AMD ROCm. Vera Rubin NVL72 readiness was separately announced at GTC 2026.',
  },
  {
    id: 'canonical-sustainability',
    label: 'Canonical — Sustainability',
    url: 'https://canonical.com/careers/company-culture/sustainability',
    date: 'current',
    confidence: 'high',
    note: 'Supports sustainability governance and energy-efficiency engineering direction; does not justify a fixed customer emissions claim.',
  },
  {
    id: 'ibm-2026-q2',
    label: 'IBM — Q2 2026 results',
    url: 'https://newsroom.ibm.com/2026-07-22-IBM-RELEASES-SECOND-QUARTER-RESULTS',
    date: '2026-07-22',
    confidence: 'high',
    note: 'Hybrid Cloud (Red Hat) grew 11% year over year in Q2 2026.',
  },
  {
    id: 'ibm-hybrid-cloud-2024',
    label: 'IBM — recast 2024 software categories',
    url: 'https://www.ibm.com/investor/news/ibm-provides-historical-data-as-a-result-of-update-to-revenue-categories',
    date: '2025-03-12',
    confidence: 'high',
    note: '2024 Hybrid Cloud, previously reported as Red Hat, was $6.5bn.',
  },
  {
    id: 'redhat-lifecycle-2026',
    label: 'Red Hat — RHEL lifecycle policy',
    url: 'https://access.redhat.com/support/policy/updates/errata',
    date: 'current',
    confidence: 'high',
    note: 'Current Red Hat terminology is Extended Life Cycle (ELC). RHEL 8, 9 and 10 have a 10-year lifecycle, with ELC and renewable Long-Life add-on terms providing errata coverage up to 14 years and beyond on eligible minor releases.',
  },
  {
    id: 'microsoft-fy26',
    label: 'Microsoft — FY2026 investor metrics',
    url: 'https://www.microsoft.com/en-us/investor/earnings/fy-2026-q4/metrics',
    date: '2026-07',
    confidence: 'high',
    note: 'FY2026 Microsoft Cloud revenue $214.4bn; Azure and other cloud services revenue growth 41%.',
  },
  {
    id: 'oracle-fy26',
    label: 'Oracle — FY2026 results',
    url: 'https://www.oracle.com/news/announcement/q4fy26-earnings-release-2026-06-10/',
    date: '2026-06-10',
    confidence: 'high',
    note: 'FY2026 cloud revenue $34.0bn (+39%); IaaS revenue $18.1bn (+77%).',
  },
  {
    id: 'broadcom-fy25',
    label: 'Broadcom — FY2025 Form 10-K',
    url: 'https://investors.broadcom.com/static-files/752e631c-b5f3-46af-9d67-bdeb658f5fa2',
    date: '2025-12',
    confidence: 'high',
    note: 'Infrastructure software revenue $27.029bn, +26%; segment includes VMware and other software assets.',
  },
  {
    id: 'broadcom-q3-2026',
    label: 'Broadcom — Q3 FY2026 results',
    url: 'https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial',
    date: '2026-09-02',
    confidence: 'high',
    note: 'Q3 FY2026 infrastructure software revenue was $8.752bn, up 29% year over year; total company revenue was $29.591bn. The peer view now uses the infrastructure-software segment because it is more relevant to Canonical than Broadcom total-company revenue and is still not VMware-only revenue.',
  },
  {
    id: 'canonical-kernel-sru-2026',
    label: 'Canonical — accelerated kernel SRU strategy',
    url: 'https://canonical.com/blog/accelerating-delivery-of-cve-fixes-with-a-new-kernel-release-strategy',
    date: '2026-09-23',
    confidence: 'high',
    note: 'Canonical outlined a move to a unified rapid two-week kernel SRU cycle, published weekly, in response to the expanding CVE burden.',
  },
  {
    id: 'canonical-snapdragon-x2',
    label: 'Canonical — Ubuntu support for Snapdragon X2 Series',
    url: 'https://canonical.com/blog/ubuntu-coming-soon-to-qualcomm-snapdragon-x2-series-platforms',
    date: '2026-09-23',
    confidence: 'high',
    note: 'Upcoming 2027 Ubuntu support on Snapdragon X2 Series targets local agentic AI with 80 TOPS NPU acceleration.',
  },
  {
    id: 'canonical-zephyr-2026',
    label: 'Canonical — Zephyr 26.04 LTS',
    url: 'https://canonical.com/blog/zephyr-lts-announcement',
    date: '2026-09-21',
    confidence: 'high',
    note: 'Zephyr 26.04 LTS extends Canonical lifecycle support to MCU-grade devices with up to 15 years of maintenance and CRA-oriented lifecycle capabilities.',
  },
  {
    id: 'canonical-data-lake-2026',
    label: 'Canonical — next-generation AI analytics data lake stack',
    url: 'https://canonical.com/blog/inside-our-next-gen-ai-analytics-data-lake-stack',
    date: '2026-09-18',
    confidence: 'high',
    note: 'Canonical describes an enterprise data lake stack focused on advanced analytics and AI while retaining infrastructure, data and technology control.',
  },
  {
    id: 'canonical-open-secure-ai',
    label: 'Canonical — Open Secure AI Alliance',
    url: 'https://canonical.com/blog/open-secure-ai-alliance',
    date: '2026-08-28',
    confidence: 'high',
    note: 'Canonical joined the NVIDIA-announced Open Secure AI Alliance focused on open technologies and tools for securing AI and agent systems.',
  },
  {
    id: 'canonical-dragonwing-2026',
    label: 'Canonical — Ubuntu certified on Qualcomm Dragonwing IQ-8275',
    url: 'https://canonical.com/blog/ubuntu-now-certified-on-qualcomm-dragonwing-iq-8275',
    date: '2026-09-08',
    confidence: 'high',
    note: 'Certified Ubuntu 24.04 LTS images target production edge-AI use cases including robotics, manufacturing, machine vision and physical AI.',
  },
  {
    id: 'ubuntu-2604-security',
    label: 'Canonical — Ubuntu 26.04 LTS security updates',
    url: 'https://canonical.com/blog/ubuntu-26-04-lts-security-updates',
    date: '2026-04-10',
    confidence: 'high',
    note: 'Ubuntu 26.04 LTS adds TPM-backed encryption, post-quantum-aware defaults, confidential-computing support and additional memory-safe components.',
  },
  {
    id: 'canonical-sovereign-cloud',
    label: 'Canonical — sovereign cloud',
    url: 'https://canonical.com/solutions/infrastructure/sovereign-cloud',
    date: 'current',
    confidence: 'high',
    note: 'Canonical positions sovereign cloud around control of data, systems and processing amid regulatory, geopolitical and AI-related security pressures.',
  },
  {
    id: 'canonical-marketing-2026',
    label: 'Canonical — Marketing careers and operating philosophy',
    url: 'https://canonical.com/careers/marketing',
    date: 'current',
    confidence: 'high',
    note: 'Canonical describes marketing as feedback, measurement, iteration and improvement, aiming to engineer growth in engagement, awareness, consumption and commerce.',
  },
  {
    id: 'canonical-marketing-manager-2026',
    label: 'Canonical — Marketing Manager role',
    url: 'https://canonical.com/careers/6110691',
    date: 'current',
    confidence: 'high',
    note: 'Official role description emphasizes end-to-end GTM and campaign ownership, cross-functional integrated execution, data-driven optimization, strategy plus hands-on delivery, and storytelling for technical and business audiences.',
  },
  {
    id: 'canonical-campaign-manager-2026',
    label: 'Canonical — Junior Campaign Manager role',
    url: 'https://canonical.com/careers/6492597',
    date: 'current',
    confidence: 'high',
    note: 'Official role description emphasizes campaign tracking and analytics, A/B testing, lead generation, automation and AI, trusted cross-functional relationships, prioritization and deadline quality.',
  },
];

export const PEER_MOMENTUM = [
  {
    name: 'Canonical',
    metric: '$344.6m',
    detail: 'FY2025 revenue; subscription revenue $287.0m',
    momentum: '+18.2% revenue',
    sourceId: 'canonical-2025-accounts',
  },
  {
    name: 'Red Hat / IBM',
    metric: '$6.5bn',
    detail: '2024 IBM Hybrid Cloud revenue (previously Red Hat)',
    momentum: '+11% Q2 2026',
    sourceId: 'ibm-2026-q2',
  },
  {
    name: 'Microsoft',
    metric: '$214.4bn',
    detail: 'FY2026 Microsoft Cloud revenue',
    momentum: 'Azure +41%',
    sourceId: 'microsoft-fy26',
  },
  {
    name: 'Oracle',
    metric: '$34.0bn',
    detail: 'FY2026 cloud revenue; IaaS $18.1bn',
    momentum: 'IaaS +77%',
    sourceId: 'oracle-fy26',
  },
  {
    name: 'Broadcom',
    metric: '$8.8bn',
    detail: 'Q3 FY2026 infrastructure software revenue; not VMware-only',
    momentum: '+29% YoY',
    sourceId: 'broadcom-q3-2026',
  },
];

export const REVIEW_LENSES = [
  ['Investor', 'Can Canonical accelerate recurring growth without giving back operating leverage?', 'Model incremental contribution and reinvestment explicitly; show P10/P50/P90 rather than a single-point promise.'],
  ['Investor', 'Is growth quality improving, or is professional services masking weak software economics?', 'Track subscription mix, retention, attach and services pull-through separately.'],
  ['Board', 'Which three bets deserve disproportionate capital?', 'Prioritize enterprise assurance, VMware/private-cloud migration and neutral AI infrastructure.'],
  ['Finance', 'What is the break-even reinvestment rate?', 'Expose reinvestment as a share of incremental revenue and calculate incremental operating profit.'],
  ['Finance', 'How fragile is the plan to retention erosion?', 'Retention is a first-class variable and is stressed in Monte Carlo ranges.'],
  ['CIO', 'Why migrate instead of renewing the incumbent platform?', 'Add a customer TCO/payback model with editable support, migration, operations and energy assumptions.'],
  ['CISO', 'Does lifecycle/security still differentiate versus RHEL?', 'Update Canonical to 15-year coverage and acknowledge RHEL 14+ years; reposition differentiation around simplicity, breadth and neutrality.'],
  ['Developer', 'Will monetization damage the free-adoption engine?', 'Charge for assurance/accountability, not basic access; preserve free adoption as the acquisition layer.'],
  ['Cloud partner', 'Does Canonical complement or disintermediate hyperscalers?', 'Frame Canonical as portable infrastructure and workload assurance that increases cloud workload durability.'],
  ['OEM / SI partner', 'Is there enough economic value for the channel?', 'Make partner-sourced ARR explicit and measure attach at workload creation.'],
  ['Product', 'Is the “platform” real or just bundleware?', 'Tie each component to one operating outcome and a measurable expansion path.'],
  ['AI leader', 'Where does Canonical add value when cloud providers already sell AI stacks?', 'Own the neutral operating layer: Ubuntu, Kubernetes, private/sovereign deployment and hardware enablement.'],
  ['Infrastructure leader', 'Can Canonical stay current with fast AI hardware cycles?', 'Use 2026 NVIDIA readiness as proof and track day-zero/day-one hardware enablement as a KPI.'],
  ['Sovereign-cloud buyer', 'Can the stack operate under data-sovereignty constraints?', 'Prioritize portable private/hybrid architectures and evidence local-control deployment patterns.'],
  ['Sustainability leader', 'Can Canonical quantify carbon impact without greenwashing?', 'Model only instrumented energy/workload savings; require user-supplied energy and carbon-intensity inputs.'],
  ['Sales', 'Which accounts should be targeted first?', 'Score regulated, VMware-heavy, AI-infrastructure and high-Ubuntu-footprint accounts highest.'],
  ['Marketing', 'What replaces generic reach metrics?', 'Use net-new recurring revenue per 1,000 active production Ubuntu workloads as the north-star.'],
  ['Competitive strategy', 'What if peers copy lifecycle and openness messages?', 'Make the moat the combination of installed-base reach, neutrality, partner distribution and lower-friction operations.'],
  ['Operations', 'Can delivery scale without turning Canonical into a services-heavy company?', 'Constrain services pull-through and keep the recurring-revenue mix visible in every scenario.'],
  ['Model governance', 'How will leadership know the model is wrong?', 'Keep a source register, assumption register, confidence labels, deterministic tests and scenario invalidation triggers.'],
] as const;

export const STRATEGIC_BETS = [
  {
    id: 'assurance',
    name: 'Enterprise assurance',
    thesis: 'Monetize production risk: security, compliance, lifecycle and accountable support.',
    primaryMetric: 'Paid attach / 1,000 production Ubuntu workloads',
    falsifier: 'Attach growth stalls even where security/compliance triggers are present.',
  },
  {
    id: 'migration',
    name: 'Private-cloud migration',
    thesis: 'Turn VMware reevaluation into a productized migration + modernization factory.',
    primaryMetric: 'Migration ARR + time-to-production + expansion ARR',
    falsifier: 'Delivery lead time or migration risk erases customer TCO advantage.',
  },
  {
    id: 'ai',
    name: 'Neutral AI infrastructure',
    thesis: 'Own the supported operating layer beneath AI workloads across public, private and sovereign environments.',
    primaryMetric: 'AI workload attach + partner-sourced ARR + expansion ARR',
    falsifier: 'Hyperscaler-native stacks eliminate portability value for target customers.',
  },
];
