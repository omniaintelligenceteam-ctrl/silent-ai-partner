# 001 — Honor OS reduced-motion for all Framer Motion entrances

- **Status**: DONE (executed 2026-07-22, commit follows 91b5154)
- **Commit**: 91b5154
- **Severity**: HIGH
- **Category**: Accessibility
- **Estimated scope**: 2 files, ~10 lines

## Problem

Nearly every section drives entrance motion through Framer Motion (`motion/react`) with real position change — e.g. `initial={{ opacity: 0, y: 24 }}`, `y: 32`, `y: 50`, `x: -30` — in `src/components/sections/LiveProof.tsx`, `TrustSignals.tsx`, `Solutions.tsx`, `DailySchedule.tsx`, `DiscoveryForm.tsx`, `HowItWorksNew.tsx`, `WhatToExpect.tsx`, `FAQ.tsx`, `CapabilityBreakdown.tsx` and more. Only `src/components/sections/Hero.tsx` branches on `useReducedMotion()`.

The `@media (prefers-reduced-motion: reduce)` block in `src/app/globals.css` (starting ~line 667) only neutralizes CSS-class animations. It cannot touch inline `motion.*` transforms, so reduced-motion users still get the full slide-up choreography site-wide.

Also, `src/components/sections/DailySchedule.tsx:337-343` auto-cycles the clock every 3 s with no reduced-motion guard:

```tsx
/* src/components/sections/DailySchedule.tsx:337 — current */
useEffect(() => {
  if (!inView) return
  const interval = setInterval(() => {
    setActiveIndex((prev) => (prev + 1) % events.length)
  }, 3000)
  return () => clearInterval(interval)
}, [inView])
```

## Target

One global fix, not per-component surgery: Framer Motion's `MotionConfig` with `reducedMotion="user"` disables **transform/layout** animations for users with reduced motion enabled while keeping opacity/color feedback — exactly the AUDIT posture ("fewer and gentler, not zero").

```tsx
/* src/app/layout.tsx — target (inside <body>, wrapping children) */
import { MotionConfig } from 'motion/react'
...
<SmoothScroll>
  <MotionConfig reducedMotion="user">
    {children}
  </MotionConfig>
</SmoothScroll>
```

And gate the DailySchedule auto-cycle:

```tsx
/* src/components/sections/DailySchedule.tsx — target */
useEffect(() => {
  if (!inView) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const interval = setInterval(() => {
    setActiveIndex((prev) => (prev + 1) % events.length)
  }, 3000)
  return () => clearInterval(interval)
}, [inView])
```

## Repo conventions to follow

- Framer Motion is imported as `motion/react` everywhere (never `framer-motion`).
- Exemplar for matchMedia gating already in repo: `src/components/ui/RotatingText.tsx:16` early-returns on `window.matchMedia('(prefers-reduced-motion: reduce)').matches`.
- `src/app/layout.tsx` is a **server component** — `MotionConfig` is a client component but accepts children fine when imported into a client wrapper. If Next complains about importing it directly in the server layout, create `src/components/ui/MotionProvider.tsx`:

```tsx
'use client'
import { MotionConfig } from 'motion/react'
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
```

and use `<MotionProvider>` in layout.tsx.

## Steps

1. Create `src/components/ui/MotionProvider.tsx` exactly as above.
2. In `src/app/layout.tsx`, import `MotionProvider` and wrap `{children}` with it **inside** the existing `<SmoothScroll>` wrapper.
3. In `src/components/sections/DailySchedule.tsx`, add the `matchMedia` early-return inside the auto-cycle `useEffect` (before `setInterval`), as shown in Target.

## Boundaries

- Do NOT touch any `motion.*` props in individual sections — the global config handles them.
- Do NOT modify the CSS reduced-motion block in globals.css.
- Do NOT add new dependencies.
- If layout.tsx no longer matches the excerpt (drift since 91b5154), STOP and report.

## Verification

- **Mechanical**: `npm run build` in `C:/Users/default.DESKTOP-ON29PVN/getoios` exits 0.
- **Feel check**: run `npm run dev`, open DevTools → Rendering → "Emulate CSS prefers-reduced-motion: reduce". Reload `/`:
  - Sections must appear without sliding up (no y-translation), but still fade in (opacity feedback preserved).
  - On `/features`, the daily-schedule clock must NOT auto-advance.
  - Turn emulation off, reload: full choreography returns.
- **Done when**: with reduced motion emulated, no element on `/`, `/features`, `/how-it-works`, or `/pricing` visibly changes position during entrance, and the build is green.
