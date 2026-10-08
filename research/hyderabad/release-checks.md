# Hyderabad application deck: release checks

77 slides: 32 main and 45 appendix. Thank-you is slide 32; appendix begins at 33. All 77 slide images were inspected at full size. Corrections included table row fit, executive contribution text, chart fonts, labels and source-register spacing.

PowerPoint: package integrity, geometry, heading fit, font policy, six native tables, three workbook-backed native charts and first-party import passed. Notes are present for every slide. No claim of opening the file in Microsoft PowerPoint is made.

PDF: identical reviewed slide images, searchable text, 77 bookmarks, 25 source links, two contact links and attached speaker notes. Charts and tables are editable in PowerPoint; the PDF is a faithful visual export.

Content: 25 source records, 37 factual/documentary items, 127 registered items and five recorded gate results per registered item. 20 cumulative content versions with predecessor hashes. These are one-system self-review passes, not 20 independent reviewers. Proposals retain conditional feasibility. No blanket accuracy guarantee.

Web: dedicated lazy route, keyboard-controlled slide viewer, readable notes, source register, source-specific contributions and download buttons. Existing production build checks passed. Repository-wide TypeScript lint produced exactly the same diagnostics as the unmodified baseline; no new diagnostics were introduced.

Dependencies for deck rebuilding: @oai/artifact-tool, the presentation skill validators, Python with Pillow, ReportLab and PyMuPDF, and DejaVu Sans/Bitstream Charter. Run scripts/hyderabad/content.py, then scripts/hyderabad/build.mjs, then scripts/hyderabad/export-assets.py. Archive/remove the prior generated PPTX before rebuilding because the finalizer refuses to overwrite an existing destination. This is intentionally separate from the website build.
