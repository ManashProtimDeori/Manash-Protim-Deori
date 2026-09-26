# Living Signal

One SVG surface with 28 deterministic contours and 65 samples per contour. The same paths interpolate between neutral, strategy, marketing, analytics, AI and build states. No random geometry, image crossfades, video, WebGL, additional motion library or canvas dependency.

`signalStates` in `src/components/visualizations/LivingSignal.tsx` centralizes bend, spread, twist and companion labels. `contour()` retains identical topology for all states. Modify these values to art-direct the surface without changing the React architecture.

IntersectionObserver watches `data-signal` sections in the hero/capability narrative. The sticky visual remains the same mounted object throughout that sequence. Labels change with the visual; screen readers receive a stable description. The final build state resolves the surface to a quieter ordered form. It is not a global floating overlay across every site route.

A requestAnimationFrame loop interpolates values over approximately 1–2 seconds and advances a slow idle wave. It stops when the graphic leaves the viewport or the document is hidden; listeners and frames are cleaned up. Reduced-motion mode renders static geometry. A pause button supplies an explicit user override.

Mobile shows 14 contours and limits updates to approximately 30fps. SVG scales with its viewBox, requires no high-DPI canvas buffer and adapts to orientation/viewport resizing. The desktop target is 60fps, not a measured guarantee. No Lighthouse or device frame-rate claim has been validated yet.
