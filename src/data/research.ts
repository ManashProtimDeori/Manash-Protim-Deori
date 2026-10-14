import { ResearchPaper } from '../types';

export const researchPapers: ResearchPaper[] = [
  {
    id: 'res-goa-governance-2019-2026',
    slug: 'goa-governance-2019-2026',
    title: 'Goa Governance Evidence Review, 2019–2026',
    summary: '64 dossiers on controversies, mishaps, service gaps and mixed outcomes. Each includes the effect on Goa, the implication for its incumbent government, explicit logic, assumptions, responses and evidence limits.',
    methodology: 'Primary-record and reporting review, with source access status, shared-origin checks, a discrepancy register and coverage of all 49 master-prompt modules. Four independent origins per atomic fact and an exhaustive census remain incomplete.',
    findings: [
      '29 dossiers have four readable supporting publications for the narrow core statement; 35 remain below that threshold. Shared underlying origins are disclosed.',
      'Government implications are qualitative accountability judgments with visible rationale and assumptions; electoral effects remain unmeasured.',
      'Adverse health indicators are presented alongside improved child nutrition and vaccination. The detailed PDF and editable PowerPoint include the source trail.'
    ],
    publishedAt: '2026-10-14',
    category: 'Public Governance & Accountability',
    sources: [
      { title: 'Public health performance audit, Report 4 of 2024', publication: 'Comptroller and Auditor General of India', year: '2024' },
      { title: 'State Finances Audit, Report 3 of 2025', publication: 'Comptroller and Auditor General of India', year: '2025' },
      { title: 'Compliance Audit, Report 4 of 2025', publication: 'Comptroller and Auditor General of India', year: '2026 tabling' },
      { title: 'NFHS-6 Goa factsheet, fieldwork 2023–24', publication: 'Ministry of Health and Family Welfare', year: '2026 release' }
    ],
    downloadName: 'Goa_Governance_Evidence_Review.pdf'
  },
  {
    id: 'res-1',
    slug: 'algorithmic-market-intelligence',
    title: 'Autonomous Signal Clustering in Dynamic Competitive Markets',
    summary: 'A methodological study evaluating vector similarity clustering techniques for high-velocity competitive market tracking across unstructured corporate releases.',
    methodology: 'Evaluated semantic distance thresholds across 12,000 public press releases, earnings conference call transcripts, and patent filings. Compared cosine distance with hierarchical agglomerative clustering to minimize duplicate narrative threads.',
    findings: [
      'Standard bag-of-words keyword monitoring creates an average of 64% redundant notification volume during major product release cycles.',
      'Hierarchical semantic clustering with adaptive distance thresholds reduces alert noise by 78% while preserving 99.4% of unique strategic event vectors.',
      'Temporal decay weighting (prioritizing fresh updates while retaining historical context) was critical for accurate impact trajectory estimation.'
    ],
    publishedAt: '2026-01-20',
    category: 'Market Intelligence & AI',
    sources: [
      { title: 'Information Retrieval and Semantic Text Similarity in Unstructured Corpora', publication: 'Journal of Computational Linguistics & Strategy', year: '2025' },
      { title: 'The Economics of Executive Attention in Real-Time Market Sensing', publication: 'Strategic Management Perspectives', year: '2024' }
    ],
    downloadName: 'Autonomous_Market_Intelligence_Manash_Deori.pdf'
  },
  {
    id: 'res-2',
    slug: 'incrementality-vs-attribution-decay',
    title: 'Incrementality Holdout Testing vs. Multi-Touch Attribution: A Comparative Analysis',
    summary: 'An empirical examination of the discrepancy between platform-reported multi-touch attribution credit and true causal incrementality measured via geo-holdout experiments.',
    methodology: 'Simulated 500,000 synthetic conversion paths with known ground-truth lift factors. Tested Last-Click, First-Click, Markov Chain, Shapley Value, and Matched-Market Geo Holdout tests under varying conditions of organic baseline demand.',
    findings: [
      'In high brand-awareness categories, Last-Click attribution overestimated paid search contribution by up to 58% relative to geo-holdout ground truth.',
      'Cooperative game-theoretic models (Shapley Value) aligned significantly closer to true incrementality than linear heuristics, but still required calibration against offline baseline volume.',
      'Marketing efficiency improved by an average of 22% when budget decisions were governed by incrementality-discounted CAC rather than raw platform ROAS.'
    ],
    publishedAt: '2025-09-15',
    category: 'Marketing Analytics & Econometrics',
    sources: [
      { title: 'Causal Inference in Digital Ad Experiments', publication: 'Quarterly Journal of Marketing Science', year: '2024' },
      { title: 'Attribution Modeling in Privacy-First Environments', publication: 'Review of Marketing Analytics', year: '2025' }
    ],
    downloadName: 'Incrementality_vs_Attribution_Manash_Deori.pdf'
  }
];
