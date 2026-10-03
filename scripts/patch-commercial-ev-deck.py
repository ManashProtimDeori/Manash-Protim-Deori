#!/usr/bin/env python3
from __future__ import annotations

import base64
import math
import re
import subprocess
from pathlib import Path

from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import MSO_AUTO_SIZE, MSO_ANCHOR, PP_ALIGN
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
    "1. Stress real-world range: 100–120 km.",
    "2. Stress charging loss: 10–15%.",
    "3. Add ₹50k charger / depot capex.",
    "4. Add charging / queueing lost-revenue hours.",
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


def text_shape(slide, exact=None, contains=None):
    for shape in slide.shapes:
        if not getattr(shape, "has_text_frame", False):
            continue
        t = norm(shape.text)
        if exact is not None and t == exact:
            return shape
        if contains is not None and contains in t:
            return shape
    return None


def set_text(shape, value: str, font_pt=None, bold=None, align=None, valign=None):
    tf = shape.text_frame
    tf.clear()
    tf.word_wrap = True
    tf.auto_size = MSO_AUTO_SIZE.NONE
    tf.margin_left = Pt(2)
    tf.margin_right = Pt(2)
    tf.margin_top = Pt(1)
    tf.margin_bottom = Pt(1)
    if valign is not None:
        tf.vertical_anchor = valign
    p = tf.paragraphs[0]
    p.text = value
    p.space_before = Pt(0)
    p.space_after = Pt(0)
    p.line_spacing = 1.0
    if align is not None:
        p.alignment = align
    for r in p.runs:
        if font_pt is not None:
            r.font.size = Pt(font_pt)
        if bold is not None:
            r.font.bold = bold


def format_text(shape, font_pt=None, bold=None, align=None, valign=None,
                ml=2, mr=2, mt=1, mb=1, line_spacing=1.0):
    tf = shape.text_frame
    tf.word_wrap = True
    tf.auto_size = MSO_AUTO_SIZE.NONE
    tf.margin_left = Pt(ml)
    tf.margin_right = Pt(mr)
    tf.margin_top = Pt(mt)
    tf.margin_bottom = Pt(mb)
    if valign is not None:
        tf.vertical_anchor = valign
    for p in tf.paragraphs:
        p.space_before = Pt(0)
        p.space_after = Pt(0)
        p.line_spacing = line_spacing
        if align is not None:
            p.alignment = align
        for r in p.runs:
            if font_pt is not None:
                r.font.size = Pt(font_pt)
            if bold is not None:
                r.font.bold = bold


def set_textbox_lines(shape, lines, font_pt=9.0, bold=False):
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
    format_text(shape, font_pt=6.4, line_spacing=1.0)


def patch_legacy_cleanup(slide, slide_text, prs, counts):
    # Earlier cleanup remains idempotent on future runs.
    if "Source URLs" in slide_text:
        bodies = []
        for s in list(slide.shapes):
            if not getattr(s, "has_text_frame", False):
                continue
            t = norm(s.text)
            if any(m in t for m in SOURCE_URL_MARKERS) and "Source URLs" not in t:
                bodies.append(s)
        if bodies:
            keeper = max(bodies, key=lambda s: int(s.width) * int(s.height))
            for s in bodies:
                if s is not keeper:
                    delete_shape(s)
            normalize_source_box(keeper)
            max_h = int(prs.slide_height - keeper.top - Inches(0.30))
            if max_h > keeper.height:
                keeper.height = max_h
            counts["source_url_boxes"] += 1

    for shape in list(slide.shapes):
        if not getattr(shape, "has_text_frame", False):
            continue
        original = norm(shape.text)
        if not original:
            continue

        if original in {
            "Sources: Candidate interview defence",
            "Sources: Candidate interview defense",
            "Sources: MPD interview defence",
            "Sources: MPD interview defense",
        }:
            delete_shape(shape)
            counts["candidate_defence_removed"] += 1
            continue

        if original in {"Interview defence", "Interview defense"}:
            delete_shape(shape)
            counts["interview_heading_removed"] += 1
            continue

        if "If challenged on any input, change it." in original:
            set_text(shape, QUALITY_SENTENCE, font_pt=10, bold=True)
            counts["interview_sentence_trimmed"] += 1
            continue

        if original.startswith("Sources:") and "Candidate" in original:
            set_text(shape, shape.text.replace("Candidate", "MPD"), font_pt=6.3)
            counts["candidate_to_mpd"] += 1

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
            # Remove duplicate/legacy list bodies here. The final geometry pass
            # rebuilds this card in two compact columns after the global
            # typography pass, so the list can never spill into the table.
            for s in body_candidates:
                delete_shape(s)
            counts["tco_slide_rebuilt"] += 1


def patch_state_slide(slide, counts):
    if "GEOGRAPHIC HETEROGENEITY" not in "\n".join(
        norm(s.text) for s in slide.shapes if getattr(s, "has_text_frame", False)
    ):
        return

    # Keep state labels directly adjacent to their data marker and separate the
    # dense low-share cluster so each label clearly maps to one block.
    positions = {
        "Tripura":      (2.62, 2.68, 0.78, 0.22, PP_ALIGN.LEFT),
        "Assam":        (2.34, 3.28, 0.72, 0.22, PP_ALIGN.LEFT),
        "Uttar Pradesh":(2.38, 4.23, 1.08, 0.22, PP_ALIGN.LEFT),
        "Delhi":        (7.17, 4.43, 0.62, 0.22, PP_ALIGN.LEFT),
        "Karnataka":    (6.57, 5.36, 0.82, 0.22, PP_ALIGN.LEFT),
        "Maharashtra":  (3.91, 5.49, 0.94, 0.22, PP_ALIGN.LEFT),
        "Tamil Nadu":   (2.98, 5.37, 0.82, 0.22, PP_ALIGN.LEFT),
        "Rajasthan":    (1.86, 5.54, 0.86, 0.22, PP_ALIGN.RIGHT),
    }
    for name, (x, y, w, h, align) in positions.items():
        s = text_shape(slide, exact=name)
        if s:
            s.left, s.top, s.width, s.height = map(
                lambda v: Inches(v),
                (x, y, w, h),
            )
            format_text(s, font_pt=7.1, bold=True, align=align, valign=MSO_ANCHOR.MIDDLE, ml=1, mr=1, mt=0, mb=0)

    # Right-side insight cards: make every line wrap inside the card.
    specs = [
        ("Adoption can outrun public charging", 10.2, True, 3.60, 0.28),
        ("Assam: 49% commercial-EV", 8.1, False, 3.50, 0.66),
        ("Infrastructure alone does not ensure adoption", 9.8, True, 3.55, 0.36),
        ("Delhi (41.1) and Karnataka", 8.0, False, 3.48, 0.58),
        ("Interpretation: route economics", 7.8, True, 3.48, 0.38),
    ]
    for marker, size, bold, width, height in specs:
        s = text_shape(slide, contains=marker)
        if s:
            s.width = Inches(width)
            s.height = Inches(height)
            format_text(s, font_pt=size, bold=bold, valign=MSO_ANCHOR.MIDDLE, ml=3, mr=3, mt=1, mb=1)

    src = text_shape(slide, contains="Source: NITI Aayog/WRI India")
    if src:
        format_text(src, font_pt=5.8, line_spacing=0.95)
    counts["state_slide"] += 1


def patch_tco_slide(slide, counts):
    if text_shape(slide, exact="05 / FLEET ECONOMICS") is None:
        return

    headline = text_shape(slide, contains="Under the base assumptions")
    if headline:
        headline.height = Inches(0.66)
        format_text(headline, font_pt=18.5, bold=True, ml=1, mr=1, mt=0, mb=0)

    subtitle = text_shape(slide, contains="Illustrative five-year Ace Pro ownership model")
    if subtitle:
        format_text(subtitle, font_pt=8.5, ml=1, mr=1, mt=0, mb=0)

    for marker, size, bold, h in [
        ("Verified vehicle inputs", 9.4, True, 0.24),
        ("EV ₹688,779", 7.7, False, 0.74),
        ("Exposed assumptions", 9.4, True, 0.24),
        ("300 days/year", 7.4, False, 0.94),
        ("Base proxy uses 110 km midpoint", 7.0, False, 0.31),
    ]:
        s = text_shape(slide, contains=marker)
        if s:
            s.height = Inches(h)
            format_text(s, font_pt=size, bold=bold, valign=MSO_ANCHOR.MIDDLE, ml=3, mr=3, mt=1, mb=1)

    crossover = text_shape(slide, contains="Revised base-case crossover")
    if crossover:
        crossover.top = Inches(5.48)
        crossover.width = Inches(2.95)
        format_text(crossover, font_pt=7.3, bold=True, ml=1, mr=1, mt=0, mb=0)

    source = text_shape(slide, contains="Sources: Tata Motors FleetVerse")
    if source:
        source.top = Inches(6.84)
        source.height = Inches(0.38)
        format_text(source, font_pt=5.3, line_spacing=0.94, ml=1, mr=1, mt=0, mb=0)
    counts["tco_slide"] += 1


def patch_value_pool_slide(slide, counts):
    if text_shape(slide, exact="08 / VALUE-POOL MIGRATION") is None:
        return
    body_markers = [
        "Software, managed charging",
        "Data history, charging integration",
        "Charging infrastructure and battery ownership",
        "The winning ecosystem may be orchestrated",
    ]
    title_markers = [
        "Recurring revenue potential", "Switching-cost potential",
        "Capital intensity", "Partnership logic",
    ]
    for marker in title_markers:
        s = text_shape(slide, contains=marker)
        if s:
            format_text(s, font_pt=9.2, bold=True, valign=MSO_ANCHOR.MIDDLE, ml=2, mr=2, mt=0, mb=0)
    for marker in body_markers:
        s = text_shape(slide, contains=marker)
        if s:
            s.width = Inches(2.42)
            s.height = Inches(0.72)
            format_text(s, font_pt=8.4, valign=MSO_ANCHOR.MIDDLE, ml=3, mr=3, mt=2, mb=2)
    src = text_shape(slide, contains="Sources: Frost & Sullivan")
    if src:
        format_text(src, font_pt=5.3, line_spacing=0.94)
    counts["value_pool_slide"] += 1


def patch_priority_slide(slide, counts):
    if text_shape(slide, exact="09 / GROWTH OPPORTUNITY PRIORITISATION") is None:
        return

    for marker in ["Priority 1 — Fleet electrification bundles", "Priority 2 — Fleet software / telematics"]:
        s = text_shape(slide, contains=marker)
        if s:
            format_text(s, font_pt=9.1, bold=True, valign=MSO_ANCHOR.MIDDLE, ml=2, mr=2, mt=0, mb=0)

    for marker in [
        "Vehicle + finance + charging design",
        "Lower capital intensity, powertrain-agnostic scalability",
    ]:
        s = text_shape(slide, contains=marker)
        if s:
            s.width = Inches(3.18)
            s.height = Inches(0.76)
            format_text(s, font_pt=7.9, valign=MSO_ANCHOR.MIDDLE, ml=3, mr=3, mt=2, mb=2)

    # Keep plotted labels compact and inside the chart.
    for marker in [
        "Fleet electrification bundles", "Fleet software & telematics",
        "Depot / managed charging", "Battery lifecycle analytics",
        "High-power truck charging",
    ]:
        s = text_shape(slide, exact=marker)
        if s:
            format_text(s, font_pt=7.7, bold=True, ml=1, mr=1, mt=0, mb=0)

    evidence = text_shape(slide, contains="Evidence basis: Frost & Sullivan")
    if evidence:
        replacement = norm(evidence.text).replace(
            "candidate judgement", "MPD judgement"
        )
        set_text(evidence, replacement, font_pt=5.3, bold=False)
        evidence.height = Inches(0.30)

    guard = text_shape(slide, contains="Methodological guardrail")
    if guard:
        format_text(guard, font_pt=6.2, bold=True, align=PP_ALIGN.CENTER, valign=MSO_ANCHOR.MIDDLE, ml=1, mr=1, mt=0, mb=0)

    counts["priority_slide"] += 1


def patch_90_day_slide(slide, counts):
    if text_shape(slide, exact="12 / CONTRIBUTION IN ROLE") is None:
        return

    # Centre the coloured day-range chips horizontally within each large card.
    columns = [
        ("0-30 DAYS", "LEARN & CALIBRATE"),
        ("31-60 DAYS", "PRODUCE"),
        ("61-90 DAYS", "IMPROVE"),
        ("LONGER TERM", "OWN MODULES END-TO-END"),
    ]
    for chip_text, body_title in columns:
        chip = text_shape(slide, exact=chip_text)
        body = text_shape(slide, exact=body_title)
        if chip and body:
            chip.left = int(body.left + (body.width - chip.width) / 2)
            chip.top = Inches(2.30)
            format_text(chip, font_pt=7.0, bold=True, align=PP_ALIGN.CENTER, valign=MSO_ANCHOR.MIDDLE, ml=0, mr=0, mt=0, mb=0)
    counts["roadmap_slide"] += 1


def patch_claim_reconciliation(slide, counts):
    if text_shape(slide, exact="A15 / CLAIM RECONCILIATION") is None:
        return

    title = text_shape(slide, contains="Six challenged figures")
    if title:
        set_text(
            title,
            "Six figures I pressure-tested: what I corrected, retained and clarified",
            font_pt=19.5, bold=True,
        )
        title.height = Inches(0.62)

    subtitle = text_shape(slide, contains="The standard is source-specific precision")
    if subtitle:
        set_text(
            subtitle,
            "My rule is source-specific precision: I change a figure only when the evidence demands it; otherwise I make the scope and denominator explicit.",
            font_pt=8.2, bold=False,
        )
        subtitle.height = Inches(0.42)

    replacements = {
        "IEA: almost 70% of India 3W sales":
            "My read: IEA reports almost 70% of India’s 3W sales as electric in 2025, while FADA’s CY2025 retail data shows 60.91%. I treat both as valid because the datasets and denominators differ.",
        "Deck treatment: Keep IEA ~70%":
            "How I use it: cite ~70% only as the IEA measure and show FADA’s 60.91% retail figure alongside it.",
        "IEA: 165k electric cars":
            "My check: IEA records about 165k electric cars and nearly 4% of 2025 car sales; FADA’s CY2025 passenger-vehicle EV share is 3.95%.",
        "Deck treatment: ~4% is supported":
            "How I use it: retain ~4% as the rounded share because both sources converge on that level.",
        "Eligible e-trucks are N2/N3":
            "My scope check: PM E-DRIVE’s e-truck incentive applies to N2/N3 vehicles above 3.5 t GVW; the support is the lowest of ₹5,000/kWh, 10% of ex-factory price or the GVW-linked cap.",
        "Deck treatment: Do not apply this incentive":
            "How I use it: I exclude this incentive from the Ace Pro EV TCO because its 1.61 t GVW falls outside that eligibility scope.",
        "Old 0.093 kWh/km":
            "My recalculation: 14.4/155 gives the old certified-range proxy of 0.093 kWh/km. Using a 110 km real-world midpoint and 15% charging losses gives ≈0.154 kWh/km on a grid-side basis.",
        "Deck treatment: Use real-world range midpoint":
            "How I use it: model the real-world midpoint, then stress-test 100–120 km range and 10–15% charging losses.",
        "NITI IEMI: Delhi 41.1":
            "My denominator check: NITI/WRI IEMI reports Delhi at 41.1 and Assam at 6.6 operational public charging points per lakh total registered vehicles, using the stated 15-year vehicle base.",
        "Deck treatment: Do not describe this as chargers per lakh EVs":
            "How I use it: describe this strictly as chargers per lakh total registered vehicles — not chargers per lakh EVs.",
        "₹688,779 EV vs ₹442,654 petrol":
            "My arithmetic check: ₹688,779 for the EV versus ₹442,654 for the petrol reference variant implies a 55.6% acquisition premium.",
        "Deck treatment: Valid arithmetic":
            "How I use it: retain the arithmetic, but label both prices as variant-level ex-showroom references rather than a universal market premium.",
    }

    for marker, replacement in replacements.items():
        s = text_shape(slide, contains=marker)
        if s:
            set_text(s, replacement, font_pt=6.9, bold=False)
            s.height = Inches(0.40 if replacement.startswith(("My read", "My check", "My scope", "My recalculation", "My denominator", "My arithmetic")) else 0.32)

    footer = text_shape(slide, contains="Primary sources:")
    if footer:
        format_text(footer, font_pt=5.2, line_spacing=0.94)
    counts["claim_slide"] += 1



SECTION_RE = re.compile(r"^(?:\d{2}|A\d{1,2})\s*/\s*")
SOURCE_RE = re.compile(r"^(?:Source|Sources|Evidence basis|Primary sources):", re.I)


def _run_sizes(shape):
    sizes = []
    for p in shape.text_frame.paragraphs:
        for r in p.runs:
            if r.font.size is not None:
                sizes.append(r.font.size.pt)
    return sizes


def _set_min_font(shape, minimum_pt, maximum_pt=None):
    """Raise undersized text while preserving intentionally larger emphasis."""
    for p in shape.text_frame.paragraphs:
        for r in p.runs:
            current = r.font.size.pt if r.font.size is not None else minimum_pt
            target = max(current, minimum_pt)
            if maximum_pt is not None:
                target = min(target, maximum_pt)
            r.font.size = Pt(target)


def _estimate_lines(text, width_pt, font_pt):
    """Conservative line-count estimate used only for diagnostics."""
    if not text:
        return 0
    chars_per_line = max(7, int(width_pt / max(3.0, font_pt * 0.52)))
    lines = 0
    for raw in text.splitlines() or [text]:
        part = raw.strip()
        lines += max(1, math.ceil(max(1, len(part)) / chars_per_line))
    return lines


def patch_global_text_layout(slide, prs, counts):
    """
    Deck-wide safety pass:
    - keep every text box inside the canvas,
    - remove excessive internal margins,
    - make undersized copy proportionately more prominent,
    - enable text-to-fit only where copy is dense enough to risk clipping,
    - preserve large display type and tiny source hierarchy.
    """
    slide_w = int(prs.slide_width)
    slide_h = int(prs.slide_height)
    edge = int(Inches(0.08))

    for shape in slide.shapes:
        if not getattr(shape, "has_text_frame", False):
            continue
        text = norm(shape.text)
        if not text:
            continue

        # Keep text boxes fully on-canvas. This addresses edge clipping caused
        # by imported coordinates and by later edits that widened boxes.
        if shape.left < edge:
            shape.left = edge
        if shape.top < edge:
            shape.top = edge
        if shape.left + shape.width > slide_w - edge:
            shape.width = max(int(Inches(0.22)), slide_w - edge - shape.left)
        if shape.top + shape.height > slide_h - edge:
            shape.height = max(int(Inches(0.16)), slide_h - edge - shape.top)

        tf = shape.text_frame
        tf.word_wrap = True
        tf.margin_left = min(tf.margin_left, Pt(3))
        tf.margin_right = min(tf.margin_right, Pt(3))
        tf.margin_top = min(tf.margin_top, Pt(2))
        tf.margin_bottom = min(tf.margin_bottom, Pt(2))

        sizes = _run_sizes(shape)
        avg_size = sum(sizes) / len(sizes) if sizes else 9.0
        is_source = bool(SOURCE_RE.match(text)) or "http://" in text or "https://" in text
        is_section = bool(SECTION_RE.match(text))
        is_title_zone = shape.top < Inches(1.75) and len(text) <= 150 and not is_section and not is_source
        is_short_label = len(text) <= 42 and shape.height <= Inches(0.50) and not is_source

        if is_source:
            _set_min_font(shape, 5.5, 6.6)
            for p in tf.paragraphs:
                p.line_spacing = 0.94
        elif is_section:
            _set_min_font(shape, 7.2)
        elif is_title_zone:
            # Prominent but bounded; dense title copy can still shrink via
            # TEXT_TO_FIT_SHAPE below if a specific slide needs it.
            _set_min_font(shape, 18.0)
        elif is_short_label:
            _set_min_font(shape, 7.6)
        else:
            _set_min_font(shape, 8.1)

        # Minimise paragraph spacing, a frequent cause of apparently "cut"
        # final lines in PowerPoint/LibreOffice conversions.
        for p in tf.paragraphs:
            p.space_before = Pt(0)
            p.space_after = Pt(0)

        # Enable shrink-to-fit only for genuinely dense boxes. Sparse boxes
        # keep NONE so their type remains as prominent as authored.
        width_pt = max(1.0, shape.width / 12700)
        height_pt = max(1.0, shape.height / 12700)
        size_after = _run_sizes(shape)
        avg_after = sum(size_after) / len(size_after) if size_after else avg_size
        est_lines = _estimate_lines(shape.text, width_pt, avg_after)
        est_need = est_lines * avg_after * 1.12 + 5
        dense = est_need > height_pt * 0.93 or len(text) > 110 or len(tf.paragraphs) >= 4

        if dense:
            # Dense source footers also need fit protection; they are allowed
            # to compress slightly because clipping a citation is worse than
            # a small reduction in source-note type.
            tf.auto_size = MSO_AUTO_SIZE.TEXT_TO_FIT_SHAPE
            counts["global_autofit"] += 1
        else:
            tf.auto_size = MSO_AUTO_SIZE.NONE

        counts["global_text_boxes"] += 1



def _shape_right(shape):
    return int(shape.left + shape.width)


def _shape_bottom(shape):
    return int(shape.top + shape.height)


def _find_card_around(slide, anchor, min_width=4.0, max_height=2.4):
    """Find the smallest wide shape visually enclosing an anchor text box."""
    candidates = []
    tol = int(Inches(0.14))
    for s in slide.shapes:
        if s is anchor:
            continue
        if s.width < Inches(min_width) or s.height > Inches(max_height):
            continue
        if s.left > anchor.left + tol or _shape_right(s) < _shape_right(anchor) - tol:
            continue
        if s.top > anchor.top + tol:
            continue
        if _shape_bottom(s) < anchor.top + Inches(0.75):
            continue
        candidates.append(s)
    if not candidates:
        return None
    return min(candidates, key=lambda s: int(s.width) * int(s.height))


def _shape_center_inside(inner, outer, tol=0):
    cx = inner.left + inner.width / 2
    cy = inner.top + inner.height / 2
    return (
        outer.left - tol <= cx <= outer.left + outer.width + tol
        and outer.top - tol <= cy <= outer.top + outer.height + tol
    )


def _find_enclosing_card(slide, anchor, min_width=2.0, min_height=0.8, max_height=5.0):
    candidates = []
    tol = int(Inches(0.10))
    for s in slide.shapes:
        if s is anchor or s.shape_type != 1:
            continue
        if s.width < Inches(min_width) or s.height < Inches(min_height) or s.height > Inches(max_height):
            continue
        if not _shape_center_inside(anchor, s, tol=tol):
            continue
        candidates.append(s)
    if not candidates:
        return None
    return min(candidates, key=lambda s: int(s.width) * int(s.height))


def _name_shape(shape, name):
    try:
        shape._element.nvSpPr.cNvPr.set("name", name)
    except Exception:
        pass


def _insert_before(reference_shape, new_shape):
    """Place new_shape immediately behind reference_shape in z-order."""
    ref_el = reference_shape._element
    ref_parent = ref_el.getparent()
    if ref_parent is None:
        return
    el = new_shape._element
    current_parent = el.getparent()
    if current_parent is not None:
        current_parent.remove(el)
    ref_parent.insert(ref_parent.index(ref_el), el)


def _delete_named_shapes(slide, prefix):
    for s in list(slide.shapes):
        if getattr(s, "name", "").startswith(prefix):
            delete_shape(s)


def _style_3d_tco_card(slide, card):
    """
    Give the TCO stress-test card a restrained consulting-grade 3D treatment:
    deep offset plate -> warm mid edge -> clean ivory face.
    The treatment is intentionally structural rather than decorative-heavy.
    """
    _delete_named_shapes(slide, "TCO 3D ")

    # Remove the legacy empty shadow plate that sat almost exactly behind the
    # original card, otherwise the new depth system becomes visually muddy.
    for s in list(slide.shapes):
        if s._element is card._element or s.shape_type != 1:
            continue
        t = norm(s.text) if getattr(s, "has_text_frame", False) else ""
        if t:
            continue
        same_size = (
            abs(s.width - card.width) <= Inches(0.20)
            and abs(s.height - card.height) <= Inches(0.20)
        )
        nearby = (
            abs(s.left - card.left) <= Inches(0.18)
            and abs(s.top - card.top) <= Inches(0.18)
        )
        if same_size and nearby:
            delete_shape(s)

    # Deep rear plate.
    back = slide.shapes.add_shape(
        MSO_SHAPE.ROUNDED_RECTANGLE,
        int(card.left + Inches(0.13)),
        int(card.top + Inches(0.13)),
        card.width,
        card.height,
    )
    _name_shape(back, "TCO 3D Back Plate")
    back.fill.solid()
    back.fill.fore_color.rgb = RGBColor(155, 87, 4)
    back.line.fill.background()
    _insert_before(card, back)

    # Mid-depth plate creates a bevel rather than a flat drop shadow.
    mid = slide.shapes.add_shape(
        MSO_SHAPE.ROUNDED_RECTANGLE,
        int(card.left + Inches(0.065)),
        int(card.top + Inches(0.065)),
        card.width,
        card.height,
    )
    _name_shape(mid, "TCO 3D Mid Plate")
    mid.fill.solid()
    mid.fill.fore_color.rgb = RGBColor(224, 151, 25)
    mid.line.fill.background()
    _insert_before(card, mid)

    # Front face: warm ivory with a crisp premium edge.
    card.fill.solid()
    card.fill.fore_color.rgb = RGBColor(255, 250, 237)
    card.line.color.rgb = RGBColor(213, 139, 18)
    card.line.width = Pt(1.4)

    # Subtle top bevel highlight. It sits within the face and never touches
    # body copy; the narrow band gives the card dimensionality at a glance.
    highlight = slide.shapes.add_shape(
        MSO_SHAPE.ROUNDED_RECTANGLE,
        int(card.left + Inches(0.22)),
        int(card.top + Inches(0.12)),
        int(card.width - Inches(0.44)),
        Inches(0.075),
    )
    _name_shape(highlight, "TCO 3D Highlight")
    highlight.fill.solid()
    highlight.fill.fore_color.rgb = RGBColor(255, 226, 157)
    highlight.line.fill.background()

    return back, mid, highlight


def finalize_tco_challenge_card(slide, counts):
    # Current generated versions may no longer contain the legacy heading, so
    # anchor on the visible checklist itself. This makes the styling robust on
    # both the original and already-patched deck.
    legacy_title = text_shape(slide, contains="Hardest TCO challenge sequence")
    checklist = text_shape(slide, contains="Stress real-world range")
    anchor = legacy_title or checklist
    if anchor is None:
        return

    card = _find_enclosing_card(
        slide, anchor, min_width=3.2, min_height=1.8, max_height=4.8
    )
    if card is None:
        return

    card_left, card_right = card.left, _shape_right(card)
    card_top, card_bottom = card.top, _shape_bottom(card)

    _style_3d_tco_card(slide, card)

    # Clear all old text within the card and rebuild once. This guarantees
    # consistent hierarchy even when the incoming deck has already been
    # through an earlier patch version.
    removed = 0
    for s in list(slide.shapes):
        if not getattr(s, "has_text_frame", False):
            continue
        if not norm(s.text):
            continue
        if (
            s.left >= card_left - Inches(0.06)
            and _shape_right(s) <= card_right + Inches(0.06)
            and s.top >= card_top - Inches(0.06)
            and _shape_bottom(s) <= card_bottom + Inches(0.06)
        ):
            delete_shape(s)
            removed += 1

    # Premium heading placed below the bevel highlight.
    title = slide.shapes.add_textbox(
        int(card_left + Inches(0.30)),
        int(card_top + Inches(0.28)),
        int(card_right - card_left - Inches(0.60)),
        Inches(0.38),
    )
    _name_shape(title, "TCO 3D Heading")
    set_text(
        title, "TCO STRESS-TEST CHECKLIST", font_pt=11.0, bold=True,
        align=PP_ALIGN.LEFT, valign=MSO_ANCHOR.MIDDLE
    )
    title.text_frame.margin_left = Pt(0)
    title.text_frame.margin_right = Pt(0)
    title.text_frame.margin_top = Pt(0)
    title.text_frame.margin_bottom = Pt(0)
    for p in title.text_frame.paragraphs:
        for r in p.runs:
            r.font.color.rgb = RGBColor(18, 39, 56)

    # Small amber rule reinforces the 3D card's top plane without adding noise.
    rule = slide.shapes.add_shape(
        MSO_SHAPE.RECTANGLE,
        int(card_left + Inches(0.30)),
        int(title.top + title.height + Inches(0.055)),
        Inches(0.72),
        Inches(0.035),
    )
    _name_shape(rule, "TCO 3D Accent Rule")
    rule.fill.solid()
    rule.fill.fore_color.rgb = RGBColor(215, 135, 11)
    rule.line.fill.background()

    body_left = int(card_left + Inches(0.30))
    body_top = int(rule.top + rule.height + Inches(0.16))
    body_w = int(card_right - card_left - Inches(0.60))
    body_h = int(card_bottom - body_top - Inches(0.30))
    body = slide.shapes.add_textbox(body_left, body_top, body_w, body_h)
    _name_shape(body, "TCO 3D Checklist")

    tf = body.text_frame
    tf.clear()
    tf.vertical_anchor = MSO_ANCHOR.TOP
    tf.auto_size = MSO_AUTO_SIZE.TEXT_TO_FIT_SHAPE
    tf.word_wrap = True
    tf.margin_left = Pt(0)
    tf.margin_right = Pt(0)
    tf.margin_top = Pt(0)
    tf.margin_bottom = Pt(0)

    for i, item in enumerate(TCO_ITEMS):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        number, statement = item.split(". ", 1)

        num_run = p.add_run()
        num_run.text = number + ". "
        num_run.font.size = Pt(9.2)
        num_run.font.bold = True
        num_run.font.color.rgb = RGBColor(176, 100, 3)

        text_run = p.add_run()
        text_run.text = statement
        text_run.font.size = Pt(9.2)
        text_run.font.bold = False
        text_run.font.color.rgb = RGBColor(22, 41, 56)

        p.space_before = Pt(0)
        p.space_after = Pt(2.5)
        p.line_spacing = 1.04
        p.alignment = PP_ALIGN.LEFT

    counts["tco_legacy_inside_removed"] += removed
    counts["tco_final_geometry"] += 1
    counts["tco_3d_card_styled"] += 1


def _pill_background_candidates(slide, text_box, min_width_in=0.80, max_width_in=2.60):
    """Return the small empty auto-shapes directly behind a pill label."""
    tx = text_box.left + text_box.width / 2
    ty = text_box.top + text_box.height / 2
    candidates = []
    for s in slide.shapes:
        if s is text_box or s.shape_type != 1:
            continue
        if getattr(s, "has_text_frame", False) and norm(s.text):
            continue
        if not (Inches(min_width_in) <= s.width <= Inches(max_width_in)):
            continue
        if not (Inches(0.22) <= s.height <= Inches(0.75)):
            continue
        sx = s.left + s.width / 2
        sy = s.top + s.height / 2
        dx = abs(sx - tx)
        dy = abs(sy - ty)
        if dx <= Inches(0.60) and dy <= Inches(0.38):
            candidates.append((dx + dy, s))
    return [s for _, s in sorted(candidates, key=lambda item: item[0])]


def _style_single_line_pill_text(shape, font_pt):
    tf = shape.text_frame
    tf.word_wrap = False
    tf.auto_size = MSO_AUTO_SIZE.NONE
    tf.vertical_anchor = MSO_ANCHOR.MIDDLE
    tf.margin_left = Pt(1)
    tf.margin_right = Pt(1)
    tf.margin_top = Pt(0)
    tf.margin_bottom = Pt(0)
    for p in tf.paragraphs:
        p.alignment = PP_ALIGN.CENTER
        p.space_before = Pt(0)
        p.space_after = Pt(0)
        p.line_spacing = 1.0
        for r in p.runs:
            r.font.size = Pt(font_pt)
            r.font.bold = True
            r.font.color.rgb = RGBColor(255, 255, 255)


def finalize_kpi_pills(slide, counts):
    """
    Make the three KPI bars use one proportional typographic system.
    They are deliberately fixed-size rather than individually auto-fitted,
    so no KPI appears visually weaker simply because its wording is longer.
    """
    kpis = [
        s for s in slide.shapes
        if getattr(s, "has_text_frame", False)
        and norm(s.text).startswith("KPI:")
    ]
    if not kpis:
        return

    # Use one font size across all three. Also make the text box occupy
    # the coloured pill itself (rather than the much shorter legacy text box),
    # which provides identical vertical centring and eliminates clipping.
    for s in kpis:
        backgrounds = _pill_background_candidates(
            slide, s, min_width_in=2.40, max_width_in=4.80
        )
        if backgrounds:
            front = backgrounds[0]
            if len(backgrounds) > 1:
                front = min(backgrounds[:2], key=lambda bg: (bg.top, bg.left))
            s.left = int(front.left + Inches(0.06))
            s.top = int(front.top + Inches(0.02))
            s.width = int(front.width - Inches(0.12))
            s.height = int(front.height - Inches(0.04))
        else:
            centre_y = s.top + s.height / 2
            s.height = Inches(0.32)
            s.top = int(centre_y - s.height / 2)

        _style_single_line_pill_text(s, 7.0)

    counts["kpi_pills_styled"] += len(kpis)


def finalize_roadmap_card_content(slide, counts):
    """
    Rebalance the heading, description and outcome inside each 90-day card.
    The three text blocks are treated as one content group and vertically
    centred in the usable area below the phase pill, with consistent type
    hierarchy across all four cards.
    """
    if text_shape(slide, exact="12 / CONTRIBUTION IN ROLE") is None:
        return

    columns = [
        ("0-30 DAYS", "LEARN & CALIBRATE"),
        ("31-60 DAYS", "PRODUCE"),
        ("61-90 DAYS", "IMPROVE"),
        ("LONGER TERM", "OWN MODULES END-TO-END"),
    ]
    balanced = 0

    for chip_text, heading_text in columns:
        heading = text_shape(slide, exact=heading_text)
        chip = text_shape(slide, exact=chip_text)
        if heading is None:
            continue

        card = _find_enclosing_card(
            slide, heading, min_width=2.1, min_height=2.4, max_height=5.2
        )
        if card is None:
            continue

        # Collect only the three meaningful content text boxes inside the
        # large card; exclude the phase chip and any empty/decorative shapes.
        members = []
        for s in slide.shapes:
            if not getattr(s, "has_text_frame", False):
                continue
            t = norm(s.text)
            if not t or s is chip:
                continue
            cx = s.left + s.width / 2
            cy = s.top + s.height / 2
            if (
                card.left <= cx <= card.left + card.width
                and card.top <= cy <= card.top + card.height
            ):
                members.append(s)

        # Heading is known; the remaining two are ordered by vertical
        # position: description first, outcome second.
        others = sorted(
            [s for s in members if s is not heading],
            key=lambda s: s.top
        )
        if len(others) < 2:
            continue

        description = others[0]
        outcome = others[-1]

        inner_left = int(card.left + Inches(0.18))
        inner_width = int(card.width - Inches(0.36))

        # Consistent widths and typography make all four cards read as a
        # coordinated system rather than four independently formatted boxes.
        heading.left = inner_left
        heading.width = inner_width
        heading.height = Inches(0.34)
        format_text(
            heading, font_pt=10.0, bold=True, align=PP_ALIGN.LEFT,
            valign=MSO_ANCHOR.MIDDLE, ml=0, mr=0, mt=0, mb=0
        )

        description.left = inner_left
        description.width = inner_width
        description.height = Inches(0.72)
        format_text(
            description, font_pt=8.4, bold=False, align=PP_ALIGN.LEFT,
            valign=MSO_ANCHOR.TOP, ml=0, mr=0, mt=0, mb=0,
            line_spacing=1.0
        )
        description.text_frame.auto_size = MSO_AUTO_SIZE.TEXT_TO_FIT_SHAPE

        outcome.left = inner_left
        outcome.width = inner_width
        outcome.height = Inches(0.30)
        format_text(
            outcome, font_pt=8.3, bold=True, align=PP_ALIGN.LEFT,
            valign=MSO_ANCHOR.MIDDLE, ml=0, mr=0, mt=0, mb=0
        )

        # Centre the three-block content group in the usable region beneath
        # the pill. This yields balanced top/bottom whitespace while keeping
        # the hierarchy intact.
        usable_top = int(card.top + Inches(0.78))
        usable_bottom = int(card.top + card.height - Inches(0.28))
        gap1 = Inches(0.34)
        gap2 = Inches(0.42)
        block_h = heading.height + gap1 + description.height + gap2 + outcome.height
        start_y = int(usable_top + max(0, (usable_bottom - usable_top - block_h) / 2))

        heading.top = start_y
        description.top = int(heading.top + heading.height + gap1)
        outcome.top = int(description.top + description.height + gap2)

        balanced += 1

    counts["roadmap_cards_balanced"] += balanced


def finalize_roadmap_chips(slide, counts):
    if text_shape(slide, exact="12 / CONTRIBUTION IN ROLE") is None:
        return

    chip_specs = [
        ("0-30 DAYS", 1.72, 7.6),
        ("31-60 DAYS", 1.72, 7.6),
        ("61-90 DAYS", 1.72, 7.6),
        ("LONGER TERM", 1.92, 7.2),
    ]
    fixed = 0

    for chip_text, width_in, font_pt in chip_specs:
        chip = text_shape(slide, exact=chip_text)
        if chip is None:
            continue

        # Locate the large card first, then centre the visible pill within it.
        card = _find_enclosing_card(slide, chip, min_width=2.1, min_height=1.6, max_height=4.8)
        if card is None:
            card_left = chip.left - Inches(0.70)
            card_width = chip.width + Inches(1.40)
            card_top = chip.top - Inches(0.18)
        else:
            card_left = card.left
            card_width = card.width
            card_top = card.top

        pill_w = min(Inches(width_in), int(card_width * 0.76))
        pill_h = Inches(0.42)
        pill_left = int(card_left + (card_width - pill_w) / 2)
        pill_top = int(card_top + Inches(0.18))

        # The coloured pill and its drop shadow are separate empty shapes.
        # Resize/reposition BOTH of them; previously only the text box moved,
        # which is why DAYS/TERM appeared outside the coloured region.
        backgrounds = _pill_background_candidates(slide, chip)
        if backgrounds:
            front = backgrounds[0]
            # Use the top-left-most of the near-identical pair as foreground;
            # the other is normally the small down/right shadow.
            if len(backgrounds) > 1:
                pair = backgrounds[:2]
                front = min(pair, key=lambda s: (s.top, s.left))
            old_left, old_top = front.left, front.top
            front.left = pill_left
            front.top = pill_top
            front.width = pill_w
            front.height = pill_h

            for bg in backgrounds:
                if bg is front:
                    continue
                dx = max(Inches(0.02), min(Inches(0.08), bg.left - old_left))
                dy = max(Inches(0.02), min(Inches(0.08), bg.top - old_top))
                bg.left = int(pill_left + dx)
                bg.top = int(pill_top + dy)
                bg.width = pill_w
                bg.height = pill_h

        # Rebuild the label as a single run and make the text box exactly the
        # size of the visible pill. Fixed sizing prevents inherited run styles
        # or PowerPoint/LibreOffice auto-fit from pushing DAYS/TERM outside.
        set_text(
            chip, chip_text, font_pt=font_pt, bold=True,
            align=PP_ALIGN.CENTER, valign=MSO_ANCHOR.MIDDLE
        )
        chip.left = pill_left
        chip.top = pill_top
        chip.width = pill_w
        chip.height = pill_h
        _style_single_line_pill_text(chip, font_pt)
        fixed += 1

    counts["roadmap_chips_fixed"] += fixed
    counts["roadmap_final_geometry"] += 1


def cleanup_a10_orphan_and_raise_ledger(slide, counts):
    if text_shape(slide, exact="A10 / TCO CALCULATION LEDGER") is None:
        return

    # A10 contains a decorative 7.3 x 1.0 pair at y≈2.15 with no text or
    # embedded content. It is an orphan from an earlier summary block.
    orphan_shapes = []
    for s in list(slide.shapes):
        t = norm(s.text) if getattr(s, "has_text_frame", False) else ""
        if (
            not t
            and s.shape_type == 1
            and s.left < Inches(1.0)
            and Inches(2.00) <= s.top <= Inches(2.35)
            and Inches(6.8) <= s.width <= Inches(7.6)
            and Inches(0.85) <= s.height <= Inches(1.15)
        ):
            orphan_shapes.append(s)

    if not orphan_shapes:
        return

    for s in orphan_shapes:
        delete_shape(s)

    # Pull the actual ledger up into the vacated area. Move only the left-side
    # ledger card and its row text; the right-side challenge card stays put.
    delta = -Inches(1.20)
    moved = 0
    for s in slide.shapes:
        if (
            s.left < Inches(8.15)
            and Inches(3.30) <= s.top <= Inches(6.05)
            and not (getattr(s, "has_text_frame", False) and norm(s.text).startswith("Verified inputs:"))
        ):
            s.top = int(s.top + delta)
            moved += 1

    counts["a10_orphan_removed"] += len(orphan_shapes)
    counts["a10_ledger_shapes_raised"] += moved


APPENDIX_BADGES = {
    "HIGH", "MED-HIGH", "MEDIUM", "LOW", "PASS",
    "CLARIFIED", "RETAINED", "CORRECTED",
}


def _appendix_label(slide):
    for s in slide.shapes:
        if not getattr(s, "has_text_frame", False):
            continue
        t = norm(s.text)
        if re.match(r"^A\d{1,2}\s*/", t):
            return t
    return None


def _reference_appendix_style(prs):
    ref = None
    for slide in prs.slides:
        s = text_shape(slide, contains="PM E-DRIVE e-trucks: N2/N3 only")
        if s is None:
            continue
        for p in s.text_frame.paragraphs:
            for r in p.runs:
                if not r.text.strip():
                    continue
                size = r.font.size.pt if r.font.size is not None else 8.0
                rgb = None
                theme = None
                try:
                    rgb = r.font.color.rgb
                except Exception:
                    rgb = None
                try:
                    theme = r.font.color.theme_color
                except Exception:
                    theme = None
                ref = (size, rgb, theme)
                break
            if ref:
                break
        if ref:
            break
    return ref or (8.0, RGBColor(25, 32, 38), None)


def _apply_font_style_to_text_frame(tf, size_pt, rgb, theme, apply_color=True):
    tf.word_wrap = True
    for p in tf.paragraphs:
        p.space_before = Pt(0)
        p.space_after = Pt(0)
        for r in p.runs:
            r.font.size = Pt(size_pt)
            if apply_color:
                if rgb is not None:
                    r.font.color.rgb = rgb
                elif theme is not None:
                    r.font.color.theme_color = theme


def apply_appendix_reference_style(prs, counts):
    size_pt, rgb, theme = _reference_appendix_style(prs)
    styled_boxes = 0
    styled_cells = 0

    for slide in prs.slides:
        label = _appendix_label(slide)
        if not label:
            continue

        for shape in slide.shapes:
            # Real PowerPoint tables.
            if getattr(shape, "has_table", False):
                for row in shape.table.rows:
                    for cell in row.cells:
                        _apply_font_style_to_text_frame(
                            cell.text_frame, size_pt, rgb, theme, apply_color=True
                        )
                        styled_cells += 1
                continue

            if not getattr(shape, "has_text_frame", False):
                continue

            t = norm(shape.text)
            if not t:
                continue

            # Keep slide-level hierarchy and source/footer microtype intact.
            if shape.top < Inches(1.90):
                continue
            if shape.top > Inches(6.68):
                continue
            if re.match(r"^A\d{1,2}\s*/", t):
                continue
            if t.startswith(("Sources:", "Source:", "Evidence:", "Source hierarchy:", "Primary sources:")):
                continue

            # Coloured status chips must retain their white/contrast colour,
            # but use the same reference size.
            apply_color = t.upper() not in APPENDIX_BADGES
            _apply_font_style_to_text_frame(
                shape.text_frame, size_pt, rgb, theme, apply_color=apply_color
            )
            styled_boxes += 1

    counts["appendix_boxes_styled"] += styled_boxes
    counts["appendix_table_cells_styled"] += styled_cells
    counts["appendix_reference_font_pt"] = round(size_pt, 2)


def finalize_problem_geometry(slide, counts):
    # Deliberately last within each slide: global prominence must not reflow
    # these tightly constrained objects.
    cleanup_a10_orphan_and_raise_ledger(slide, counts)
    finalize_tco_challenge_card(slide, counts)
    finalize_roadmap_card_content(slide, counts)
    finalize_roadmap_chips(slide, counts)


def validate_text_layout(prs):
    """Print conservative diagnostics so CI logs reveal remaining risk areas."""
    warnings = []
    for slide_no, slide in enumerate(prs.slides, start=1):
        for shape in slide.shapes:
            if not getattr(shape, "has_text_frame", False):
                continue
            text = norm(shape.text)
            if not text:
                continue
            if shape.left < 0 or shape.top < 0 or shape.left + shape.width > prs.slide_width or shape.top + shape.height > prs.slide_height:
                warnings.append(f"slide {slide_no}: off-canvas text box: {text[:70]}")
                continue
            sizes = _run_sizes(shape)
            avg = sum(sizes) / len(sizes) if sizes else 9.0
            width_pt = max(1.0, shape.width / 12700)
            height_pt = max(1.0, shape.height / 12700)
            need = _estimate_lines(shape.text, width_pt, avg) * avg * 1.12 + 5
            if need > height_pt * 1.28 and shape.text_frame.auto_size != MSO_AUTO_SIZE.TEXT_TO_FIT_SHAPE:
                warnings.append(f"slide {slide_no}: possible overflow: {text[:70]}")
    if warnings:
        print("Text-layout diagnostics:")
        for warning in warnings[:40]:
            print(" -", warning)
        if len(warnings) > 40:
            print(f" - ... {len(warnings) - 40} more")
    else:
        print("Text-layout diagnostics: no obvious overflow/off-canvas risks.")

BOARDROOM_EXACT_REPLACEMENTS = {
    # User-requested labels.
    "What would change your strategy?": "What would change the strategy?",
    "Why you?": "Why me?",

    # Appendix framing: turn interview-prep language into client/boardroom language.
    "A7 / INTERVIEW DEFENCE": "A7 / DECISION QUESTIONS & IMPLICATIONS",
    "A7 / INTERVIEW DEFENSE": "A7 / DECISION QUESTIONS & IMPLICATIONS",
    "The case uses explicit evidence classes so observed data cannot quietly become “fact-like” modelling":
        "The analysis uses explicit evidence classes so observed data cannot quietly become “fact-like” modelling",
    "Sources: MPD methodology": "Methodology: evidence classification and source-governance framework",
    "Replace any assumption with operator data and the model recalculates; no hidden “magic” coefficients are required.":
        "Operator data can replace any assumption and the model recalculates transparently; no hidden coefficients are used.",
    "These assumptions are not offered as market truths; they are deliberately exposed so an interviewer can challenge them and observe how the conclusion changes.":
        "These assumptions are not market truths; they are deliberately exposed so decision-makers can challenge inputs and observe how the recommendation changes.",
    "Sources: MPD model; workbook Sensitivity tab":
        "Sources: analytical model; workbook Sensitivity tab",
    "Sources: MPD red-team protocol":
        "Methodology: red-team challenge protocol",
    "The hardest questions are methodological: definitions, denominator choice, sensitivity and what would change the recommendation":
        "The critical boardroom questions are methodological: definitions, denominator choice, sensitivity and what would change the recommendation",
    "The strongest answer is often to show the assumption, not to defend a number emotionally.":
        "The strongest decision support makes the assumption explicit and shows how the conclusion changes.",
    "Why Frost & Sullivan?":
        "Where can Frost & Sullivan add the most value?",
    "The role combines industry intelligence, quantified growth opportunity analysis and executive recommendation - the exact chain demonstrated here.":
        "By combining industry intelligence, quantified opportunity sizing and executive recommendations into an actionable mobility growth agenda.",
    "Engineering systems thinking + MBA commercial judgement + client execution + evidence of rapid domain learning in this case.":
        "Engineering systems thinking + MBA-level commercial judgement + client execution + rapid domain synthesis — a combination suited to actionable mobility growth decisions.",
    "Candidate model": "Analytical model",
    "Candidate 5-year model": "Five-year analytical model",
    "Evidence + candidate analysis": "Evidence + strategic analysis",
    "Not market shares or Frost scores.": "Not market shares or externally validated scoring outputs.",
    "The TCO mechanism is fully reconstructable in the room — every input can be replaced live":
        "The TCO mechanism is fully reconstructable: every input can be replaced with client or operator data",
    "Use this slide when challenged on breakeven, charging losses, battery risk, residual values, financing or utilisation.":
        "Use this ledger to test breakeven, charging losses, battery risk, residual values, financing and utilisation.",
    "Verified inputs: Tata Motors. Model logic: candidate analysis. Answer protocol: state input → show equation → run sensitivity → explain whether recommendation changes.":
        "Verified inputs: Tata Motors. Model logic: transparent analytical reconstruction. Decision protocol: state input → show equation → run sensitivity → identify whether the recommendation changes.",
    "The strongest technical answers separate what is known about the vehicle from what requires field validation":
        "Robust technical assessment separates what is known about the vehicle from what requires field validation",
    "Use Evidence → Mechanism → Sensitivity → Decision Impact. Never answer an engineering question with a market-growth slogan.":
        "Use Evidence → Mechanism → Sensitivity → Decision Impact. Engineering claims should translate into operating and economic implications.",
    "This turns the interview from 'Do EVs work?' into the more useful question: 'Under what operating system do they work economically?'":
        "This reframes the discussion from 'Do EVs work?' to the more useful question: 'Under what operating system do they work economically?'",
    "The hardest strategic questions are about definitions, transferability and what would falsify the recommendation":
        "The critical strategic questions are about definitions, transferability and what would falsify the recommendation",
    "Answering well means narrowing an over-broad claim rather than defending unsupported precision.":
        "Decision quality improves when over-broad claims are narrowed rather than defended with unsupported precision.",
    "What research next?": "What evidence is needed next?",
    "Fleet telematics, depot power studies, finance quotes, used-EV values, interviews and charger uptime logs.":
        "Fleet telematics, depot power studies, finance quotes, used-EV values, fleet/operator interviews and charger uptime logs.",
    "Six figures I pressure-tested: what I corrected, retained and clarified":
        "Six figures reconciled across sources: what was corrected, retained and clarified",
    "My rule is source-specific precision: I change a figure only when the evidence demands it; otherwise I make the scope and denominator explicit.":
        "Rule: use source-specific precision—change a figure only when evidence requires it; otherwise make scope and denominator explicit.",
}

BOARDROOM_PREFIX_REPLACEMENTS = (
    ("My read:", "Reconciliation:"),
    ("My check:", "Cross-check:"),
    ("My scope check:", "Scope check:"),
    ("My recalculation:", "Recalculation:"),
    ("My denominator check:", "Denominator check:"),
    ("My arithmetic check:", "Arithmetic check:"),
    ("How I use it:", "Boardroom use:"),
)


def _replace_shape_text(shape, value):
    """Replace a text shape cleanly; deck-wide typography is applied later."""
    old_tf = shape.text_frame
    align = old_tf.paragraphs[0].alignment if old_tf.paragraphs else None
    valign = old_tf.vertical_anchor
    set_text(shape, value, align=align, valign=valign)


def patch_boardroom_language(prs, counts):
    removed_role_lines = 0
    appendix_rewrites = 0
    exact_user_labels = 0

    role_line_re = re.compile(
        r"^Consulting Analyst\s*[-–—]\s*Mobility Growth Advisory$",
        re.I,
    )

    for slide in prs.slides:
        is_appendix = _appendix_label(slide) is not None

        for shape in list(slide.shapes):
            if not getattr(shape, "has_text_frame", False):
                continue
            original = norm(shape.text)
            if not original:
                continue

            # Pic 1: remove the role-preparation line wherever it appears.
            if (
                role_line_re.match(original)
                or (
                    "consulting analyst" in original.lower()
                    and "mobility growth advisory" in original.lower()
                )
            ):
                delete_shape(shape)
                removed_role_lines += 1
                continue

            replacement = BOARDROOM_EXACT_REPLACEMENTS.get(original)
            if replacement is not None:
                _replace_shape_text(shape, replacement)
                if original in {"What would change your strategy?", "Why you?"}:
                    exact_user_labels += 1
                if is_appendix:
                    appendix_rewrites += 1
                continue

            if is_appendix:
                for old_prefix, new_prefix in BOARDROOM_PREFIX_REPLACEMENTS:
                    if original.startswith(old_prefix):
                        _replace_shape_text(
                            shape,
                            new_prefix + original[len(old_prefix):],
                        )
                        appendix_rewrites += 1
                        break

    counts["role_line_removed"] += removed_role_lines
    counts["boardroom_appendix_rewrites"] += appendix_rewrites
    counts["requested_label_rewrites"] += exact_user_labels


def validate_boardroom_language(prs):
    forbidden = []
    final_labels = {
        "What would change the strategy?": 0,
        "Why me?": 0,
    }

    for slide_no, slide in enumerate(prs.slides, start=1):
        is_appendix = _appendix_label(slide) is not None
        for shape in slide.shapes:
            if not getattr(shape, "has_text_frame", False):
                continue
            t = norm(shape.text)
            if not t:
                continue

            if t in final_labels:
                final_labels[t] += 1

            if (
                re.match(r"^Consulting Analyst\s*[-–—]\s*Mobility Growth Advisory$", t, re.I)
                or (
                    "consulting analyst" in t.lower()
                    and "mobility growth advisory" in t.lower()
                )
            ):
                forbidden.append(f"slide {slide_no}: role-prep line remains: {t[:120]}")

            if t in {"What would change your strategy?", "Why you?"}:
                forbidden.append(f"slide {slide_no}: old requested label remains: {t}")

            if is_appendix and re.search(
                r"\b(interview defence|interview defense|interviewer|candidate model|candidate analysis|the role combines)\b",
                t,
                re.I,
            ):
                forbidden.append(f"slide {slide_no}: interview-prep wording remains: {t[:120]}")

    for label, count in final_labels.items():
        if count == 0:
            forbidden.append(f"required final label missing: {label}")

    if forbidden:
        raise RuntimeError("Boardroom-language validation failed: " + " | ".join(forbidden))


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
        "state_slide": 0,
        "tco_slide": 0,
        "value_pool_slide": 0,
        "priority_slide": 0,
        "roadmap_slide": 0,
        "claim_slide": 0,
        "global_text_boxes": 0,
        "global_autofit": 0,
        "tco_final_geometry": 0,
        "tco_3d_card_styled": 0,
        "roadmap_final_geometry": 0,
        "roadmap_chips_fixed": 0,
        "roadmap_cards_balanced": 0,
        "kpi_pills_styled": 0,
        "tco_legacy_inside_removed": 0,
        "a10_orphan_removed": 0,
        "a10_ledger_shapes_raised": 0,
        "appendix_boxes_styled": 0,
        "appendix_table_cells_styled": 0,
        "appendix_reference_font_pt": 0,
        "role_line_removed": 0,
        "boardroom_appendix_rewrites": 0,
        "requested_label_rewrites": 0,
    }

    patch_boardroom_language(prs, counts)

    for slide in prs.slides:
        text_shapes = [s for s in slide.shapes if getattr(s, "has_text_frame", False)]
        slide_text = "\n".join(norm(s.text) for s in text_shapes)

        patch_legacy_cleanup(slide, slide_text, prs, counts)
        patch_state_slide(slide, counts)
        patch_tco_slide(slide, counts)
        patch_value_pool_slide(slide, counts)
        patch_priority_slide(slide, counts)
        patch_90_day_slide(slide, counts)
        patch_claim_reconciliation(slide, counts)
        patch_global_text_layout(slide, prs, counts)
        finalize_kpi_pills(slide, counts)
        finalize_problem_geometry(slide, counts)

    # Normalize appendix table/box typography to the A13 e-truck reference box.
    apply_appendix_reference_style(prs, counts)

    # Verify the requested slides were found and the earlier wording remains clean.
    expected = ["state_slide", "tco_slide", "value_pool_slide", "priority_slide", "roadmap_slide", "claim_slide", "roadmap_final_geometry"]
    missing = [k for k in expected if counts[k] == 0]
    if counts["roadmap_chips_fixed"] != 4:
        missing.append("roadmap_chips_fixed=" + str(counts["roadmap_chips_fixed"]))
    if counts["roadmap_cards_balanced"] != 4:
        missing.append("roadmap_cards_balanced=" + str(counts["roadmap_cards_balanced"]))
    if counts["tco_3d_card_styled"] != 1:
        missing.append("tco_3d_card_styled=" + str(counts["tco_3d_card_styled"]))
    if counts["kpi_pills_styled"] != 3:
        missing.append("kpi_pills_styled=" + str(counts["kpi_pills_styled"]))
    if counts["appendix_boxes_styled"] == 0:
        missing.append("appendix_boxes_styled")
    if missing:
        raise RuntimeError("Expected target slides were not found: " + ", ".join(missing))

    all_text = "\n".join(
        norm(s.text)
        for slide in prs.slides
        for s in slide.shapes
        if getattr(s, "has_text_frame", False)
    )
    forbidden = [
        "If challenged on any input, change it.",
        "Sources: Candidate interview defence",
        "Sources: Candidate interview defense",
        "candidate judgement",
    ]
    still_present = [x for x in forbidden if x in all_text]
    if still_present:
        raise RuntimeError("Forbidden legacy wording remains: " + repr(still_present))

    validate_boardroom_language(prs)
    validate_text_layout(prs)
    print("Patch counts:", counts)
    prs.save(OUT_PPTX)

    PPT_B64.write_text(base64.b64encode(OUT_PPTX.read_bytes()).decode("ascii"), encoding="utf-8")

    # Recreate the public PDF so portfolio viewer and downloadable PPT stay in sync.
    for old in PDF_OUT_DIR.glob("*.pdf"):
        old.unlink()
    subprocess.run(
        [
            "libreoffice", "--headless",
            "--convert-to", "pdf",
            "--outdir", str(PDF_OUT_DIR),
            str(OUT_PPTX),
        ],
        check=True,
    )
    pdfs = list(PDF_OUT_DIR.glob("*.pdf"))
    if len(pdfs) != 1:
        raise RuntimeError(f"Expected one converted PDF, found: {pdfs}")
    PDF_B64.write_text(base64.b64encode(pdfs[0].read_bytes()).decode("ascii"), encoding="utf-8")
    print("Updated:", PPT_B64.relative_to(ROOT), PDF_B64.relative_to(ROOT))


if __name__ == "__main__":
    main()
