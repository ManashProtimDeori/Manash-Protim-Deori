# Production verification — 8 October 2026

Live case study: https://manash-protim-deori.vercel.app/work/hyderabad-political-intelligence

Production deployment dpl_FipoewbJCbihRSBEfrWD52hxrR4U was READY and aliased to the portfolio domain. Code commit: 9cd43fe7c981f4bc133f436b6bedbfbfd222502f.

Verified in the live browser:
- The Work page links to the Hyderabad case study.
- The editorial serif, ink/ivory/saffron colours and 590px hero reading width render as intended.
- The viewer loads; slide 32 is Thank you, the next slide is the appendix, and ArrowLeft returns to slide 32.
- Notes expand and the source register contains 25 linked entries.
- The final slide disables forward navigation.
- PPT, PDF and evidence download buttons produce real files.

Downloaded PPTX (2,555,005 bytes), PDF (9,626,791 bytes) and evidence ZIP matched local file checksums exactly. The ZIP passed integrity checks and contained all 20 version snapshots. Independent HTTP checks also confirmed every one of the 77 live slide images matches its reviewed local asset.

Production-page screenshot is portfolio-live.jpg. Desktop viewport was 1363px wide; page width was 1358px, without horizontal overflow. Responsive media rules were reviewed; a mobile browser viewport was not exercised in this session. The cloud browser permits only HTTP/HTTPS and could not open a local viewport-review file.

Build checks passed. Repository-wide TypeScript lint matched the unmodified baseline's existing diagnostics exactly. No new diagnostics were introduced.

These are artifact and delivery checks, not independent verification of political facts. Source dates, source limitations, conditional proposals, candidate self-reports and unresolved evidence remain visible in the deck and evidence package. No blanket 100% accuracy guarantee is made.
