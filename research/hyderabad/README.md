# Hyderabad application deck: approved v21 integration

The current deck has 77 slides (32 main and 45 appendix), 41 factual records, 131 registered items and 30 sources. The ten-round audit examined 127 baseline items through ten distinct self-review lenses. These are not independent reviewers or ten successful factual confirmations.

The user approved integration and publication. `integration-v21.json` records the integrated findings. `audit-10-rounds.json` remains the historical pre-integration audit; its original approval-pending state is preserved as history. `baseline-v20-deck.json`, versions v01–v20 and their checkpoints retain the earlier review trail. Current content is v21.

F08–F11 and F16 remain blocked for fresh source verification. The 2024 Cantonment and 2025 Jubilee Hills wins are attributed reporting; unread official declarations are not treated as verified evidence. The two Jubilee reports share Times Group lineage. PRS fiscal-execution comparisons are statewide 2024–25 context, not Hyderabad performance or a forecast. All workload, interview and future impact claims remain conditional pilot proposals.

Run `python reproduce.py` from this directory for portable arithmetic and reference checks. This does not retrieve sources or verify source truth. The generation scripts are included separately. Full rebuilding requires the presentation runtime, validators, reference PPTX with its embedded native chart workbooks, and the recorded fonts. In the repository, run content.py, build.mjs, export-assets.py, package-evidence.py and verify-release.py in that order. Set HYDERABAD_REFERENCE and HYDERABAD_REFERENCE_SHA to the frozen original PPTX when building.

The website deployment builds the portfolio and serves these checked assets; it does not regenerate the presentation or perform new source verification.
