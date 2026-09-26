# Living Signal

The Living Signal is the signature visual system for the portfolio.

## Concept
One continuous digital object represents five stages of work:
- Strategy → Direction
- Marketing → Connection
- Analytics → Signal
- AI → Intelligence
- Build → Execution

The topology stays continuous. The same set of SVG contours morphs rather than cross-fading unrelated illustrations.

## Implementation
- React + SVG
- No Three.js dependency
- `requestAnimationFrame` only while visible
- IntersectionObserver maps page sections using `data-signal`
- Pointer movement introduces a maximum ~3 degree response on desktop
- Mobile draws fewer contour paths
- `prefers-reduced-motion` snaps to static states
- Rendering pauses when the tab or object is not visible

## State mapping
Add `data-signal="strategy|marketing|analytics|ai|build|neutral"` to any major section that should drive the visual.

## Tuning
State values live in `src/components/visualizations/LivingSignal.tsx`.

Do not replace the object with unrelated GIFs or videos. Its continuity is the brand device.
