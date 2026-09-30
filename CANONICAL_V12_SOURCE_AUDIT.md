# Canonical Strategy Lab — source audit round 4 (iterations 31–40)

Date: 2026-09-30

This audit was requested after the portrait redesign. The purpose is narrow: fix export failures and correct only factual, temporal, terminology, source-quality or comparability issues. Strategy opinions and modeled assumptions remain explicitly modeled rather than being rewritten as reported facts.

| Iteration | Audit question | Finding | Action taken | Primary / authoritative reference |
|---:|---|---|---|---|
| 31 | Why did PPTX/PDF abort with “website slide geometry is not presentation-safe”? | Export measured `scrollHeight`, which includes hidden overflow even when the visible slide is a fixed 2:3 box. The geometry guard therefore rejected valid rendered slides. | Export now measures the visible `getBoundingClientRect().height`; tiny browser rounding is normalized to the fixed 2:3 page rather than treated as fatal. | Internal rendering defect; validated by repo tests rather than an external source. |
| 32 | Do the FY2025 growth figures reconcile to the retained Canonical base? | Yes. $344.6m / $291.5m = +18.216%; $287.0m / $235.4m = +21.920%; $57.6m / $56.1m = +2.674%. | Retained the rounded 18.2%, 21.9% and 2.7% figures. Removed the weak third-party numerical cross-check from the evidence registry; the statutory Companies House filing remains authoritative. | Companies House, Canonical Group Limited, 2025 group accounts: https://find-and-update.company-information.service.gov.uk/company/06870835/filing-history |
| 33 | Is Broadcom total-company revenue the right peer statistic? | No. $29.6bn Q3 revenue is semiconductor-heavy and less comparable with Canonical’s infrastructure/software context. Broadcom separately reports Q3 infrastructure software revenue of $8.752bn, +29% YoY. | Peer card changed to $8.8bn Q3 FY2026 infrastructure software revenue, +29% YoY. It remains explicitly “not VMware-only.” | Broadcom Q3 FY2026: https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial ; SEC Exhibit 99.1: https://www.sec.gov/Archives/edgar/data/1730168/000173016826000076/avgo-08022026x8kxex99.htm |
| 34 | Does the RHEL lifecycle comparison use current terminology? | The deck used the older “ELCP” shorthand. Red Hat’s current policy page uses “Extended Life Cycle (ELC)” and states that eligible releases can receive errata coverage up to 14 years and beyond with renewable Long-Life terms. | Main deck and evidence registry now use ELC and “up to 14 years + renewable Long-Life extensions.” | Red Hat RHEL lifecycle: https://access.redhat.com/support/policy/updates/errata |
| 35 | Is the Ubuntu Pro $500 server input precisely described? | $500/year is the current Ubuntu Pro Enterprise self-support server price, not the price of a supported server tier. | Source moved to the current Ubuntu pricing page; note now states supported tiers cost more and customer quotes must replace the default in external TCO work. | Ubuntu Pro pricing: https://ubuntu.com/pricing/pro |
| 36 | Does the AI slide conflate a GTC preview with generally available Ubuntu 26.04 capabilities? | The March GTC post previewed CUDA and Vera Rubin readiness. Ubuntu 26.04 LTS then reached GA on 23 Apr 2026 with native AI/ML toolkit support including NVIDIA CUDA. | Proof line now separates “Ubuntu 26.04 GA with native CUDA” from “Vera Rubin NVL72 readiness separately announced.” Added the Ubuntu 26.04 GA source. | Canonical GTC 2026: https://canonical.com/blog/nvidia-gtc-2026 ; Ubuntu 26.04 release: https://canonical.com/blog/canonical-releases-ubuntu-26-04-lts-resolute-raccoon |
| 37 | Could the Snapdragon X2 slide imply Ubuntu support is already shipping? | Yes. Canonical says native Ubuntu support is targeted for release in 2027; the 80 TOPS NPU figure is current. | Detail changed to “Ubuntu support targeted for 2027.” | Canonical Snapdragon X2 announcement: https://canonical.com/blog/ubuntu-coming-soon-to-qualcomm-snapdragon-x2-series-platforms |
| 38 | Does “weekly publication” accurately summarize the kernel SRU change? | It is incomplete. Canonical describes a unified recurring two-week SRU cycle; overlapping cycles result in weekly releases. | Metric changed to “2-week cycle” with detail “Overlapping cycles yield weekly kernel releases.” | Canonical kernel SRU strategy: https://canonical.com/blog/accelerating-delivery-of-cve-fixes-with-a-new-kernel-release-strategy |
| 39 | Does the Zephyr line overstate release status? | Canonical announced Zephyr 26.04 LTS and describes up to 15 years of security maintenance; the announcement also describes it as an upcoming release. | Live-signal detail changed to “Zephyr 26.04 LTS announced for MCU-grade devices”; the up-to-15-years claim is retained. | Canonical Zephyr 26.04 LTS: https://canonical.com/blog/zephyr-lts-announcement |
| 40 | Are current Canonical job pages being used as if their geography applied universally? | Current Marketing Manager and Junior Campaign Manager pages have opening-specific geography. Their competency requirements remain useful, but they should not be treated as universal eligibility evidence. | Candidate narrative now explicitly states that current job pages are competency references only and opening geography is role-specific. | Marketing Manager: https://canonical.com/careers/6110691 ; Junior Campaign Manager: https://canonical.com/careers/6492597 |

## Additional peer-source recheck

The following retained peer figures were rechecked against issuer investor-relations sources and remain unchanged:

- IBM Q2 2026 Hybrid Cloud (Red Hat) growth: +11%.
- Microsoft FY2026 Microsoft Cloud revenue: $214.4bn; Azure and other cloud services FY2026 growth: +41%.
- Oracle FY2026 cloud revenue: $34.0bn; IaaS: $18.1bn, +77%.

References:
- IBM: https://newsroom.ibm.com/2026-07-22-IBM-RELEASES-SECOND-QUARTER-RESULTS
- Microsoft: https://www.microsoft.com/en-us/investor/earnings/fy-2026-q4/metrics
- Oracle: https://investor.oracle.com/investor-news/news-details/2026/Oracle-Announces-Record-Q4-and-FY-2026-Results-Driven-by-Cloud-Infrastructure--Cloud-Applications/

## Publication rule after this round

1. Primary issuer, statutory or regulator sources outrank media and aggregators.
2. A mixed-period peer chart must state its period and must not imply like-for-like comparability.
3. Current product announcements must distinguish preview, announced target date and general availability.
4. Current vendor terminology supersedes older shorthand when the meaning has changed.
5. Public list prices are anchors only; modeled TCO remains illustrative until customer-specific quotes replace defaults.
6. Browser geometry differences must never block export when the visible website slide already conforms to the presentation ratio.
