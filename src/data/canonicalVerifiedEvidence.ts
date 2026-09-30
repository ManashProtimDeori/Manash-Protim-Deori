export interface VerifiedEvidenceRow {
  id: string;
  subject: string;
  retainedClaim: string;
  primaryLabel: string;
  primaryUrl: string;
  primaryPage: string;
  crossCheckLabel: string;
  crossCheckUrl: string;
  consistency: 'consistent';
  note: string;
}

export const VERIFIED_EVIDENCE: VerifiedEvidenceRow[] = [
  {
    id: 'canonical-fy25',
    subject: 'Canonical FY2025 financial base',
    retainedClaim: 'Revenue $344.6m; subscription revenue $287.0m; professional services $57.6m; operating profit $26.9m; net income $22.8m; FY2024 revenue $291.5m.',
    primaryLabel: 'Companies House — Canonical Group Limited 2025 group accounts (statutory filing)',
    primaryUrl: 'https://find-and-update.company-information.service.gov.uk/company/06870835/filing-history/MzUyNTE2NjI2NmFkaXF6a2N4/document?download=0&format=pdf',
    primaryPage: '87-page statutory accounts filed 5 Jun 2026. The deck does not invent a pinpoint page because page-level extraction is not reliably exposed by the filing service.',
    crossCheckLabel: 'Companies House — Canonical Group Limited filing history',
    crossCheckUrl: 'https://find-and-update.company-information.service.gov.uk/company/06870835/filing-history',
    consistency: 'consistent',
    note: 'The filing-history index independently confirms the identity, filing date, accounting period and 87-page statutory document. The statutory filing remains the authoritative numeric source; a weak third-party numerical re-publication has been removed.',
  },
  {
    id: 'ibm-redhat-2024',
    subject: 'IBM / Red Hat 2024 revenue scale',
    retainedClaim: '2024 Hybrid Cloud (Red Hat) revenue $6.49bn, shown as $6.5bn in the deck.',
    primaryLabel: 'IBM — 2024 segment revenue recast',
    primaryUrl: 'https://www.ibm.com/investor/news/ibm-provides-historical-data-as-a-result-of-update-to-revenue-categories',
    primaryPage: 'N/A — HTML investor disclosure',
    crossCheckLabel: 'IBM 2025 Annual Report / SEC filing — 2024 Hybrid Cloud (Red Hat) revenue $6,490m',
    crossCheckUrl: 'https://www.sec.gov/Archives/edgar/data/51143/000005114326000010/ibm-20251231_d2.htm',
    consistency: 'consistent',
    note: 'The deck uses the rounded $6.5bn presentation only.',
  },
  {
    id: 'ibm-redhat-q2-2026',
    subject: 'IBM / Red Hat Q2 2026 momentum',
    retainedClaim: 'Hybrid Cloud (Red Hat) revenue growth +11% year over year in Q2 2026.',
    primaryLabel: 'IBM — Q2 2026 results',
    primaryUrl: 'https://newsroom.ibm.com/2026-07-22-IBM-RELEASES-SECOND-QUARTER-RESULTS',
    primaryPage: 'N/A — HTML earnings release',
    crossCheckLabel: 'IBM SEC Exhibit 99.1 — Q2 2026 prepared remarks',
    crossCheckUrl: 'https://www.sec.gov/Archives/edgar/data/51143/000005114326000070/ibm-20260714xex991.htm',
    consistency: 'consistent',
    note: 'Both sources report 11% Red Hat / Hybrid Cloud growth.',
  },
  {
    id: 'microsoft-fy26',
    subject: 'Microsoft FY2026 cloud scale',
    retainedClaim: 'Microsoft Cloud revenue $214.4bn; Azure and other cloud services FY2026 revenue growth +41%.',
    primaryLabel: 'Microsoft Investor Relations — FY26 Q4 metrics',
    primaryUrl: 'https://www.microsoft.com/en-us/investor/earnings/fy-2026-q4/metrics',
    primaryPage: 'N/A — HTML investor metrics',
    crossCheckLabel: 'Microsoft FY26 Q4 earnings call transcript',
    crossCheckUrl: 'https://www.microsoft.com/en-us/investor/events/fy-2026/earnings-fy-2026-q4',
    consistency: 'consistent',
    note: 'The transcript states Microsoft Cloud surpassed $214bn and Azure surpassed $100bn, up 41%; the metrics page reports $214.4bn and 41%.',
  },
  {
    id: 'oracle-fy26',
    subject: 'Oracle FY2026 cloud scale',
    retainedClaim: 'Cloud revenue $34.0bn; IaaS revenue $18.1bn; IaaS growth +77%.',
    primaryLabel: 'Oracle — FY2026 results',
    primaryUrl: 'https://www.oracle.com/news/announcement/q4fy26-earnings-release-2026-06-10/',
    primaryPage: 'N/A — HTML earnings release',
    crossCheckLabel: 'Oracle SEC Exhibit 99.1',
    crossCheckUrl: 'https://www.sec.gov/Archives/edgar/data/1341439/000119312526265848/orcl-ex99_1.htm',
    consistency: 'consistent',
    note: 'The official release and SEC exhibit report the same FY2026 cloud and IaaS figures.',
  },
  {
    id: 'broadcom-q3-2026',
    subject: 'Broadcom Q3 FY2026 infrastructure software scale',
    retainedClaim: 'Q3 FY2026 infrastructure software revenue $8.752bn, up 29% year over year; shown as $8.8bn in the peer view.',
    primaryLabel: 'Broadcom — Q3 FY2026 financial results',
    primaryUrl: 'https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial',
    primaryPage: 'N/A — HTML earnings release',
    crossCheckLabel: 'SEC Exhibit 99.1 — Broadcom Q3 FY2026 results',
    crossCheckUrl: 'https://www.sec.gov/Archives/edgar/data/1730168/000173016826000076/avgo-08022026x8kxex99.htm',
    consistency: 'consistent',
    note: 'Both primary company disclosure and SEC exhibit report $8,752m of Q3 infrastructure software revenue and +29% year-over-year growth. This is more decision-relevant than comparing Canonical with Broadcom total-company semiconductor-heavy revenue.',
  },
  {
    id: 'ubuntu-lifecycle',
    subject: 'Ubuntu LTS lifecycle',
    retainedClaim: 'Ubuntu LTS coverage can extend to a total of 15 years with the Legacy add-on.',
    primaryLabel: 'Ubuntu — 15-year Legacy add-on announcement',
    primaryUrl: 'https://ubuntu.com/blog/canonical-expands-total-coverage-for-ubuntu-lts-releases-to-15-years-with-legacy-add-on',
    primaryPage: 'N/A — HTML product announcement',
    crossCheckLabel: 'Ubuntu release cycle',
    crossCheckUrl: 'https://ubuntu.com/about/release-cycle',
    consistency: 'consistent',
    note: 'Both Canonical-owned sources show five years standard + five years ESM + five years Legacy coverage.',
  },
  {
    id: 'rhel-lifecycle-2026',
    subject: 'RHEL extended lifecycle',
    retainedClaim: 'RHEL 8, 9 and 10 have a 10-year lifecycle; eligible minor releases can receive errata coverage up to 14 years and beyond through Extended Life Cycle (ELC) and renewable Long-Life term extensions.',
    primaryLabel: 'Red Hat Customer Portal — RHEL lifecycle policy',
    primaryUrl: 'https://access.redhat.com/support/policy/updates/errata',
    primaryPage: 'N/A — HTML lifecycle policy',
    crossCheckLabel: 'Red Hat — legacy extended support offerings',
    crossCheckUrl: 'https://access.redhat.com/support/policy/updates/errata_legacy',
    consistency: 'consistent',
    note: 'Current Red Hat policy terminology is ELC. The deck no longer uses the older ELCP shorthand in the main comparison.',
  },
  {
    id: 'broadcom-fy25-infra',
    subject: 'Broadcom FY2025 infrastructure software segment',
    retainedClaim: 'Infrastructure software revenue was $27.029bn in FY2025, up 26% year over year; the deck rounds the value to $27.0bn and labels it as segment scale, not VMware-only revenue.',
    primaryLabel: 'Broadcom — FY2025 financial results',
    primaryUrl: 'https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-fourth-quarter-and-fiscal-year-2025',
    primaryPage: 'N/A — HTML earnings release',
    crossCheckLabel: 'SEC — Broadcom FY2025 Form 10-K',
    crossCheckUrl: 'https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/avgo-20251102.htm',
    consistency: 'consistent',
    note: 'Broadcom’s earnings release and Form 10-K both report $27,029m of infrastructure software revenue for FY2025.',
  },
  {
    id: 'ubuntu-pro-price',
    subject: 'Ubuntu Pro standard server price',
    retainedClaim: 'Ubuntu Pro Enterprise without support is listed at $500 per server per year; the TCO default uses this public list-price anchor and remains editable.',
    primaryLabel: 'Ubuntu — Ubuntu Pro plans and pricing',
    primaryUrl: 'https://ubuntu.com/pricing/pro',
    primaryPage: 'N/A — HTML pricing page',
    crossCheckLabel: 'Canonical Knowledge — What is Ubuntu Pro?',
    crossCheckUrl: 'https://canonical.com/knowledge/security-and-compliance/what-is-ubuntu-pro',
    consistency: 'consistent',
    note: 'Both Canonical-owned current sources state the standard server price at $500 per year. Customer quotes can differ and should replace the default for external analysis.',
  },
  {
    id: 'kernel-sru',
    subject: 'Kernel security release cadence',
    retainedClaim: 'Transition to a unified two-week kernel SRU cycle with releases published weekly.',
    primaryLabel: 'Canonical — accelerated kernel release strategy',
    primaryUrl: 'https://canonical.com/blog/accelerating-delivery-of-cve-fixes-with-a-new-kernel-release-strategy',
    primaryPage: 'N/A — HTML engineering announcement',
    crossCheckLabel: 'Ubuntu Discourse — kernel team transition notice',
    crossCheckUrl: 'https://discourse.ubuntu.com/t/going-from-4-to-2-accelerating-the-linux-kernel-release-process/88248',
    consistency: 'consistent',
    note: 'The Canonical announcement and the Ubuntu kernel-team transition notice both describe the move to a unified recurring two-week SRU cycle; the weekly publication cadence is retained only from the Canonical announcement.',
  },
  {
    id: 'snapdragon-x2',
    subject: 'Snapdragon X2 AI performance',
    retainedClaim: '80 TOPS NPU acceleration.',
    primaryLabel: 'Canonical — Ubuntu on Snapdragon X2 Series',
    primaryUrl: 'https://canonical.com/blog/ubuntu-coming-soon-to-qualcomm-snapdragon-x2-series-platforms',
    primaryPage: 'N/A — HTML announcement',
    crossCheckLabel: 'Qualcomm — Snapdragon X2 Plus announcement',
    crossCheckUrl: 'https://www.qualcomm.com/news/releases/2026/01/empowering-professionals-and-aspiring-creators--snapdragon-x2-pl',
    consistency: 'consistent',
    note: 'Both Canonical and Qualcomm state 80 TOPS NPU performance.',
  },
  {
    id: 'zephyr-lifecycle',
    subject: 'Zephyr 26.04 LTS lifecycle',
    retainedClaim: 'Up to 15 years of security maintenance.',
    primaryLabel: 'Canonical — Zephyr 26.04 LTS announcement',
    primaryUrl: 'https://canonical.com/blog/zephyr-lts-announcement',
    primaryPage: 'N/A — HTML announcement',
    crossCheckLabel: 'Ubuntu — Zephyr LTS product page',
    crossCheckUrl: 'https://ubuntu.com/zephyr',
    consistency: 'consistent',
    note: 'Both sources state up to 15 years of support / maintenance.',
  },
];

export const NUMERIC_EVIDENCE_RULES = [
  'Reported company facts are anchored to the most authoritative available primary source; material peer figures are cross-checked against a second authoritative disclosure when available.',
  'Scenario, TCO, sensitivity and brand-index values are explicitly modeled inputs or outputs and are never presented as reported company facts.',
  'If a source is a PDF, a pinpoint page is shown only when it can be verified; no page number is invented.',
  'Rounded display values preserve the underlying reported magnitude and are labeled when they are rounded.',
] as const;

export const FUNDAMENTAL_MARKETING_INSIGHTS = [
  {
    title: 'Adoption is not the funnel; it is an option pool',
    insight: 'Open-source usage creates future commercial options only when moments of risk, accountability or coordination make paid assurance valuable. The monetization system therefore has to be triggered by changing customer risk, not by arbitrary nurture cadence.',
  },
  {
    title: 'In infrastructure, perceived downside dominates incremental upside',
    insight: 'A buyer can rationally reject a cheaper or technically superior platform when migration failure, compliance exposure or career risk feels asymmetric. Marketing has therefore to reduce perceived downside with proof before incremental benefits can matter.',
  },
  {
    title: 'Brand strength behaves like accumulated evidence',
    insight: 'For technical infrastructure brands, durable strength is built when product claims, community experience, partner validation and operational outcomes repeatedly agree. Awareness can be purchased; agreement across evidence layers cannot.',
  },
  {
    title: 'Neutrality has value only when future choices remain cheaper',
    insight: '“Open” or “neutral” positioning becomes economically relevant only when it lowers future switching costs, preserves bargaining power or reduces strategic dependence. The marketing value is control optionality, not ideology.',
  },
  {
    title: 'Partner distribution matters most at the moment defaults are formed',
    insight: 'Partner logos are weak assets after a buying decision is already framed. They become powerful when silicon, cloud, OEM or SI partners shape the workload architecture before the buyer has committed to an operating substrate.',
  },
  {
    title: 'Category clarity is a compression advantage',
    insight: 'A technically broad portfolio wins more often when its value can be compressed into a small number of decision rules that remain true from developer to CFO. Cognitive simplicity is therefore a competitive capability, not merely a copywriting preference.',
  },
  {
    title: 'Marketing efficiency is constrained by product friction',
    insight: 'Demand generation can accelerate a healthy conversion path, but it cannot permanently compensate for weak attach, slow migration, poor retention or services dependency. When those signals deteriorate, marketing should be used to diagnose and de-risk before being used to amplify.',
  },
] as const;
