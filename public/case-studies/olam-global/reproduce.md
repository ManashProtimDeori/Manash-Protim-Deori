# Reproduction and navigation

Version 1.0.0 | Seed 20261008 | Public-data decision scaffold

Python 3.11+, NumPy, pandas, SciPy and an Excel-reading engine are needed for retrieval and analysis. Exact execution versions are in environment.json. Run scripts/olam-retrieve.py, then scripts/olam-analyse.py, then scripts/olam-package.py. Public sources may block requests; errors remain logged. Cleaned country-panel, WPP milestones, M49, holdout and analysis outputs are included for review.

Native artifact authoring uses scripts/olam-artifacts.mjs with @oai/artifact-tool in the Codex primary runtime. PDF generation uses scripts/olam-pdfs.py with ReportLab. PowerPoint contains editable text, tables and charts. The workbook has one active financial model and live formulas; scenario and stress snapshots are clearly dated cached code results.

country-scenario-matrix.csv has 8,190 rows, with unknown country economics left blank. Normalized template order thresholds are separate fields. Population projections are in persons. country-register.csv contains 195 dispositions; territories-annex.csv contains the remaining M49 areas. Source, claim, assumption and calculation registers link IDs, units, pinpoints, slides and code. change-audit.csv covers all 44 original slides.

The portfolio route remains /work/olam-africa-growth-strategy. The refresh policy is a proposal; no monitoring automation has been scheduled. Research readiness does not constitute company investment approval.