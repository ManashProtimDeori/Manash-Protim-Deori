# MPD editorial visual system

Warm architectural white (#F5F4F0), near black (#111111), secondary ink (#62625E), restrained cobalt (#335CFF). Preserve saved dark-mode preference; new visits start light. Legacy neutral utilities map to semantic tokens so existing tools inherit the palette. Functional diagnostic red/green colors retain their semantics.

Geist 400/500/600 is the interface and reading face. Instrument Serif 400 and italic is reserved for editorial statements. Both are open fonts delivered with display=swap. These replace Plus Jakarta Sans, Newsreader and JetBrains Mono. Metadata uses the same sans with measured tracking, reducing competing font families.

Use --font-body, --font-display, --bg-primary, --bg-secondary, --text-primary, --text-secondary, --border-soft and --accent. Spacing tokens range from 4 to 200px. Wide content is capped at 1500px with fluid gutters; reading content targets 720px. Display type is fluid. Keep body copy readable and avoid treating metadata as main content.

The hero uses two aligned columns, generous space and one moving visual. Capabilities are editorial rows. Projects use large system diagrams derived from actual project architecture/technology data, explicitly labeled as system overviews rather than screenshots. Education is an unboxed list. One homepage lab section supplies dark contrast.

Photography: no portraits or event photographs were supplied in this repository. Do not invent them. When provided, use 3:4 or 4:5 portraits and asymmetric event images, explicit dimensions, lazy loading below the fold, accurate captions and no inferred endorsements.

Native scroll; visible focus; skip link; native cursor; no audio or splash. Motion must explain a state and stop under reduced motion. Mobile stacks hero, compact sticky signal and capabilities; the signal pauses when its story exits view. Keep tools and print views functional.

Visual QA at 360, 375, 390, 430, 768, 1024, 1280, 1440, 1728 and 1920px remains required before production: the available browser could not open the local server and GitHub refused the preview branch creation.
