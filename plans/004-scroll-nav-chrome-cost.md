# 004 — Cut per-event React renders in ScrollProgress + speed up PageEntrance navs

- **Status**: DONE (executed 2026-07-22, commit follows 91b5154)
- **Commit**: 91b5154
- **Severity**: MEDIUM
- **Category**: Performance / Purpose & frequency
- **Estimated scope**: 2 files, ~25 lines

## Problem

1. `src/components/ui/ScrollProgress.tsx:5-16` calls React `setState` on every scroll event — and Lenis smooth-scroll emits scroll events at very high frequency — forcing a React re-render per tick to drive a bar that could be written directly:

```tsx
/* current */
const [progress, setProgress] = useState(0)
useEffect(() => {
  function onScroll() {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    setProgress(docHeight > 0 ? scrollTop / docHeight : 0)
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  return () => window.removeEventListener('scroll', onScroll)
}, [])
...
<div ... style={{ transform: `scaleX(${progress})`, transformOrigin: 'left' }} />
```

2. `src/components/ui/PageEntrance.tsx:116-119` — the content wrapper mounts hidden and fades in over 600 ms with bare `ease` on **every client-side navigation** to the 7 pages that use it (features, how-it-works, pricing, about, solutions, privacy, terms). The sessionStorage gate covers only the splash overlay, not this wrapper. 600 ms of dead time per page hop, with a weak curve on an entrance:

```tsx
/* current */
style={{
  opacity: show ? 1 : 0,
  transform: show ? 'translateY(0)' : 'translateY(12px)',
  transition: 'opacity 0.6s ease, transform 0.6s ease',
}}
```

## Target

**ScrollProgress** — no React state; write the transform via ref, coalesced to rAF:

```tsx
/* target */
'use client'
import { useEffect, useRef } from 'react'

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let rafId = 0
    function onScroll() {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = 0
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const p = docHeight > 0 ? window.scrollY / docHeight : 0
        if (barRef.current) barRef.current.style.transform = `scaleX(${p})`
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); if (rafId) cancelAnimationFrame(rafId) }
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent pointer-events-none">
      <div ref={barRef} className="h-full bg-gradient-to-r from-orange-500 to-orange-400 will-change-transform"
           style={{ transform: 'scaleX(0)', transformOrigin: 'left' }} />
    </div>
  )
}
```

**PageEntrance** — entrance budget + strong curve (do not change the splash overlay logic):

```tsx
/* target */
transition: 'opacity 0.25s cubic-bezier(0.23, 1, 0.32, 1), transform 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
```

(If plan 002 has landed and `--ease-out` exists in globals.css, use `var(--ease-out)` instead of the literal curve.)

## Repo conventions to follow

- Direct `element.style.transform` writes via ref are already the repo pattern for high-frequency motion: `src/components/ui/CustomCursor.tsx` writes `ringRef.current.style.transform` directly.
- The strong ease-out `cubic-bezier(0.23, 1, 0.32, 1)` is the house UI curve (globals.css:188).

## Steps

1. Replace `src/components/ui/ScrollProgress.tsx` with the target implementation (same markup/classes, ref-driven).
2. In `src/components/ui/PageEntrance.tsx` (~line 119), change the content-wrapper transition to the 0.25 s strong ease-out; keep the `translateY(12px)` offset and the `show` logic untouched.

## Boundaries

- Do NOT touch the PageEntrance splash overlay, its sessionStorage key, or its timings.
- Do NOT change the progress bar's markup, classes, or z-index.
- Do NOT add dependencies.
- If excerpts don't match (drift since 91b5154), STOP and report.

## Verification

- **Mechanical**: `npm run build` exits 0.
- **Feel check**: `npm run dev`:
  - Scroll `/` with React DevTools Profiler recording: `ScrollProgress` re-renders zero times while scrolling; the bar still tracks scroll position exactly, including at page bottom (bar full).
  - Navigate header: Home → What It Does → How It Works. Each page's content appears within ~250 ms, still with a soft rise — no more 600 ms wait.
- **Done when**: profiler shows no per-scroll renders, navs feel immediate, bar behavior visually identical.
