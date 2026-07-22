# 003 — Tame the pointer stack (CustomCursor, PointerGlow, MouseSpotlight, MagneticButton)

- **Status**: DONE (executed 2026-07-22, commit follows 91b5154)
- **Commit**: 91b5154
- **Severity**: HIGH
- **Category**: Performance / Purpose & frequency
- **Estimated scope**: 4 files under src/components/ui, ~60 lines

## Problem

Four global pointer-follow layers run simultaneously on every page (mounted in `src/app/layout.tsx` / Header):

1. `src/components/ui/CustomCursor.tsx:68-77` — the ring-follow rAF loop **never idles**:

```tsx
/* current */
let raf: number
function animate() {
  ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15
  ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15
  if (ringRef.current) {
    ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`
  }
  raf = requestAnimationFrame(animate)
}
raf = requestAnimationFrame(animate)
```

It writes a style every frame forever, even when the pointer is stationary.

2. `src/components/ui/pointer-glow.tsx:10-14` — three CSS custom properties written on `document.documentElement` on **every** `pointermove`, unthrottled. Consumers are the `[data-glow]` pseudo-element rules in `globals.css:282-293`; writing vars on the root invalidates computed styles for every consumer per move event.

3. `src/components/ui/MouseSpotlight.tsx:23-27` — rewrites the `background` radial-gradient of a `fixed inset-0` full-viewport layer on every (rAF-throttled) mousemove. `background` is paint-only: a full-viewport repaint per frame. Should be a transform of a pre-painted layer.

4. `src/components/ui/MagneticButton.tsx` (used at `Header.tsx:69, 95, 104`) — magnetic pull wraps **every** desktop nav link plus both header CTAs. Decorative motion on the most-hovered targets on the site (frequency table: "hover effects → remove or drastically reduce").

## Target

**CustomCursor** — idle the loop when settled; wake on movement:

```tsx
/* target */
let raf = 0
function animate() {
  const dx = pos.current.x - ringPos.current.x
  const dy = pos.current.y - ringPos.current.y
  ringPos.current.x += dx * 0.15
  ringPos.current.y += dy * 0.15
  if (ringRef.current) {
    ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`
  }
  if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
    raf = requestAnimationFrame(animate)
  } else {
    raf = 0 // settled — stop ticking
  }
}
```

and in the existing `handleMouseMove`, after updating `pos.current`, add: `if (!raf) raf = requestAnimationFrame(animate)`.

**PointerGlow** — coalesce to one write per frame:

```tsx
/* target */
let rafId = 0
let lastX = 0, lastY = 0
const handler = (e: PointerEvent) => {
  lastX = e.clientX; lastY = e.clientY
  if (rafId) return
  rafId = requestAnimationFrame(() => {
    rafId = 0
    const s = document.documentElement.style
    s.setProperty('--glow-x', lastX.toFixed(2))
    s.setProperty('--glow-y', lastY.toFixed(2))
    s.setProperty('--glow-xp', (lastX / window.innerWidth).toFixed(2))
  })
}
```

(cancel any pending frame in the cleanup function).

**MouseSpotlight** — paint the gradient once, move it with transform. Replace the inner div's dynamic background with a fixed-size element:

```tsx
/* target render */
<div ref={wrapRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
  <div
    ref={spotlightRef}
    style={{
      position: 'absolute', left: 0, top: 0,
      width: 1600, height: 1600,
      marginLeft: -800, marginTop: -800,
      background: 'radial-gradient(800px circle at center, rgba(249,115,22,0.04), transparent 60%)',
      willChange: 'transform',
    }}
  />
</div>
```

and in the rAF handler write only:

```tsx
spotlightRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
```

**MagneticButton on nav links** — remove the magnetic wrap from the four nav links in `src/components/sections/Header.tsx:69` (render the `<Link>` directly); KEEP MagneticButton on the two CTAs (lines ~95 and ~104) but pass `strength={0.15}` explicitly if not already.

## Repo conventions to follow

- All four files already gate on reduced-motion / touch — preserve those guards exactly.
- Exemplar of correct rAF-throttled pointer handling already in repo: `src/components/ui/MouseSpotlight.tsx:20-28` (throttle pattern) — reuse its shape for PointerGlow.
- Style writes go directly to `element.style.transform` (as CustomCursor already does) — never via React state.

## Steps

1. `CustomCursor.tsx`: apply the idle-when-settled loop; wake it from `handleMouseMove`. Keep the cleanup `cancelAnimationFrame(raf)` (guard `if (raf)`).
2. `pointer-glow.tsx`: apply the rAF coalescing; cancel pending frame on cleanup.
3. `MouseSpotlight.tsx`: apply the pre-painted layer + transform-only write; add `overflow-hidden` to the wrapper so the oversized layer never scrolls the page.
4. `Header.tsx`: unwrap the nav-link `MagneticButton`s (nav links only — CTAs keep theirs).

## Boundaries

- Do NOT change visuals: same gradient color/size, same cursor ring look, same CTA magnetism.
- Do NOT touch `ScrollProgress`, `SmoothScroll`, or any section component.
- Do NOT add dependencies.
- If any excerpt doesn't match the file (drift since 91b5154), STOP and report.

## Verification

- **Mechanical**: `npm run build` exits 0.
- **Feel check**: `npm run dev` on `/`:
  - Performance panel, record 5 s with the pointer STATIONARY: no per-frame style writes from CustomCursor (main thread idle).
  - Move the pointer in circles: spotlight follows identically to before; Performance panel shows no full-viewport paint flashes (enable Paint flashing in Rendering panel — the background layer must not repaint, only composite).
  - Hover nav links: no magnetic pull; hover the two CTAs: pull intact.
  - `[data-glow]` buttons still show the cursor-tracking glow border.
- **Done when**: paint flashing shows no viewport-wide repaints on mouse move, stationary pointer produces zero rAF style writes, nav links are magnet-free, and the site looks unchanged to a casual eye.
