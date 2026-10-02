#!/usr/bin/env python3
from __future__ import annotations

import base64
import os
import subprocess
import sys
from pathlib import Path

from pptx import Presentation
from pptx.enum.text import MSO_AUTO_SIZE
from pptx.util import Inches, Pt

ROOT = Path(__file__).resolve().parents[1]
ASSET_DIR = ROOT / "src" / "generated" / "commercial-ev-assets"
PPT_B64 = ASSET_DIR / "Manash-Protim-Deori-Commercial-EV-Growth-Advisory-Case.pptx.01.b64"
PDF_B64 = ASSET_DIR / "Manash-Protim-Deori-Commercial-EV-Growth-Advisory-Case.pdf.01.b64"
WORK = ROOT / ".tmp-commercial-ev-deck"
PPTX = WORK / "Manash-Protim-Deori-Commercial-EV-Growth-Advisory-Case.pptx"
OUT_PPTX = WORK / "patched.pptx"
PDF_OUT_DIR = WORK / "pdf"

QUALITY_SENTENCE = (
    "The quality of the analysis is transparency of the mechanism, "
    "not attachment to the base-case number."
)

TCO_ITEMS = [
    "1. Stress Tata real-world range across 100–120 km.",
    "2. Stress charging losses from 10–15% rather than assume one efficiency.",
    "3. Add a ₹50k charger / depot electrification cost.",
    "4. Add lost-revenue hours from charging / queueing.",
    "5. Stress residual value to zero.",
    "6. Add out-of-warranty battery-event downside.",
    "7. Stress fuel and electricity prices separately.",
    "8. Recalculate at actual route-level km/day.",
]

SOURCE_URL_MARKERS = (
    "IEA:", "FADA:", "NITI:", "PM E-DRIVE:", "Mahindra:", "Tata:"
)
TCO_MARKERS = (
    "Stress Tata real-world range",
    "Stress charging losses",
    "charger",
    "lost-revenue hours",
    "residual value to zero",
    "out-of-warranty battery",
    "fuel and electricity",
    "route-level km/day",
)


def norm(s: str) -> str:
    return " ".join((s or "").replace("\n", " ").split())


def delete_shape(shape) -> None:
    sp = shape._element
    sp.getparent().remove(sp)


def set_textbox_text(shape, lines, font_pt=9.0, bold=False):
    tf = shape.text_frame
    tf.clear()
    tf.word_wrap = True
    tf.margin_left = Pt(2)
    tf.margin_right = Pt(2)
    tf.margin_top = Pt(1)
    tf.margin_bottom = Pt(1)
    tf.auto_size = MSO_AUTO_SIZE.NONE

    for i, line in enumerate(lines):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.text = line
        p.space_before = Pt(0)
        p.space_after = Pt(1.5)
        p.line_spacing = 1.0
        for r in p.runs:
            r.font.size = Pt(font_pt)
            r.font.bold = bold


def normalize_source_box(shape):
    tf = shape.text_frame
    tf.word_wrap = True
    tf.margin_left = Pt(2)
    tf.margin_right = Pt(2)
    tf.margin_top = Pt(1)
    tf.margin_bottom = Pt(1)
    tf.auto_size = MSO_AUTO_SIZE.NONE
    for p in tf.paragraphs:
        p.space_before = Pt(0)
        p.space_after = Pt(0)
        p.line_spacing = 1.0
        for r in p.runs:
            r.font.size = Pt(6.5)


def main():
    WORK.mkdir(exist_ok=True)
    PDF_OUT_DIR.mkdir(exist_ok=True)

    raw = base64.b64decode(PPT_B64.read_text(encoding="utf-8").strip())
    PPTX.write_bytes(raw)

    prs = Presentation(PPTX)
    counts = {
        "source_url_boxes": 0,
        "interview_heading_removed": 0,
        "interview_sentence_trimmed": 0,
        "candidate_to_mpd": 0,
        "candidate_defence_removed": 0,
        "tco_slide_rebuilt": 0,
    }

    for slide in prs.slides:
        text_shapes = [s for s in slide.shapes if getattr(s, "has_text_frame", False)]
        slide_text = "\n".join(norm(s.text) for s in text_shapes)

        # Pic 1: Source URLs — remove any duplicate body boxes, then make the kept box fit.
        if "Source URLs" in slide_text:
            bodies = []
            for s in text_shapes:
                t = norm(s.text)
                if any(m in t for m in SOURCE_URL_MARKERS) and "Source URLs" not in t:
                    bodies.append(s)
            if bodies:
                keeper = max(bodies, key=lambda s: int(s.width) * int(s.height))
                for s in bodies:
                    if s is not keeper:
                        delete_shape(s)
                normalize_source_box(keeper)
                # Keep existing left/width but give the text more vertical room.
                max_h = int(prs.slide_height - keeper.top - Inches(0.30))
                if max_h > keeper.height:
                    keeper.height = max_h
                counts["source_url_boxes"] += 1

        # Pic 2, 3 and 4: wording/source cleanup.
        # Work from a fresh list because some shapes may have been deleted above.
        for shape in list(slide.shapes):
            if not getattr(shape, "has_text_frame", False):
                continue
            original = norm(shape.text)
            if not original:
                continue

            # Pic 4: remove the entire source sentence.
            if original in {
                "Sources: Candidate interview defence",
                "Sources: Candidate interview defense",
                "Sources: MPD interview defence",
                "Sources: MPD interview defense",
            }:
                delete_shape(shape)
                counts["candidate_defence_removed"] += 1
                continue

            # Pic 2: remove the label and the first sentence, retaining only the useful sentence.
            if original == "Interview defence" or original == "Interview defense":
                delete_shape(shape)
                counts["interview_heading_removed"] += 1
                continue
            if "If challenged on any input, change it." in original:
                shape.text_frame.clear()
                p = shape.text_frame.paragraphs[0]
                p.text = QUALITY_SENTENCE
                p.space_before = Pt(0)
                p.space_after = Pt(0)
                p.line_spacing = 1.0
                for r in p.runs:
                    r.font.size = Pt(10)
                    r.font.bold = True
                shape.text_frame.word_wrap = True
                counts["interview_sentence_trimmed"] += 1
                continue

            # Pic 3: all source references should use MPD instead of Candidate.
            if original.startswith("Sources:") and "Candidate" in original:
                new_text = shape.text.replace("Candidate", "MPD")
                for p in shape.text_frame.paragraphs:
                    for r in p.runs:
                        if "Candidate" in r.text:
                            r.text = r.text.replace("Candidate", "MPD")
                # If replacement through runs did not preserve the whole string, fall back.
                if "Candidate" in norm(shape.text):
                    shape.text = new_text
                counts["candidate_to_mpd"] += 1

        # Pic 5: rebuild the overlapped TCO challenge list as one clean text box.
        if "Hardest TCO challenge sequence" in slide_text:
            title = None
            body_candidates = []
            for s in list(slide.shapes):
                if not getattr(s, "has_text_frame", False):
                    continue
                t = norm(s.text)
                if "Hardest TCO challenge sequence" in t:
                    title = s
                elif any(m in t for m in TCO_MARKERS):
                    body_candidates.append(s)

            if body_candidates:
                keeper = max(body_candidates, key=lambda s: int(s.width) * int(s.height))
                for s in body_candidates:
                    if s is not keeper:
                        delete_shape(s)

                # Place the body directly below the title and use the remaining slide height.
                if title is not None:
                    keeper.top = int(title.top + title.height + Inches(0.12))
                keeper.height = int(prs.slide_height - keeper.top - Inches(0.45))
                set_textbox_text(keeper, TCO_ITEMS, font_pt=8.8, bold=False)
                counts["tco_slide_rebuilt"] += 1

    required = [
        "source_url_boxes",
        "interview_sentence_trimmed",
        "candidate_to_mpd",
        "candidate_defence_removed",
        "tco_slide_rebuilt",
    ]
    missing = [k for k in required if counts[k] == 0]
    print("Patch counts:", counts)
    if missing:
        raise RuntimeError("Expected deck elements were not found: " + ", ".join(missing))

    prs.save(OUT_PPTX)

    # Replace PPTX asset.
    PPT_B64.write_text(base64.b64encode(OUT_PPTX.read_bytes()).decode("ascii"), encoding="utf-8")

    # Regenerate the public PDF from the corrected PPTX so the web viewer and download stay in sync.
    subprocess.run(
        [
            "libreoffice", "--headless",
            "--convert-to", "pdf",
            "--outdir", str(PDF_OUT_DIR),
            str(OUT_PPTX),
        ],
        check=True,
    )
    generated_pdf = PDF_OUT_DIR / "patched.pdf"
    if not generated_pdf.exists():
        pdfs = list(PDF_OUT_DIR.glob("*.pdf"))
        if len(pdfs) != 1:
            raise RuntimeError(f"Expected one converted PDF, found: {pdfs}")
        generated_pdf = pdfs[0]

    PDF_B64.write_text(base64.b64encode(generated_pdf.read_bytes()).decode("ascii"), encoding="utf-8")
    print("Updated:", PPT_B64.relative_to(ROOT), PDF_B64.relative_to(ROOT))


if __name__ == "__main__":
    main()
