# Animation improvement plans — getoios.com

Written by the `improve-animations` audit at commit `91b5154` (2026-07-22). Each plan is self-contained: any agent can execute one with zero context (`improve-animations execute <plan>` or hand it to an executor directly).

## Plans

| # | Title | Severity | Category | Status |
| --- | --- | --- | --- | --- |
| [001](001-global-reduced-motion.md) | Honor OS reduced-motion for all Framer entrances | HIGH | Accessibility | DONE |
| [002](002-motion-tokens-cta-easing.md) | Motion tokens + crisp CTA/hover easing | HIGH | Easing / Cohesion / Perf | DONE |
| [003](003-pointer-stack-performance.md) | Tame the pointer stack (cursor, glow, spotlight, magnet) | HIGH | Performance / Frequency | DONE |
| [004](004-scroll-nav-chrome-cost.md) | ScrollProgress renders + PageEntrance nav delay | MEDIUM | Performance / Frequency | DONE |
| [005](005-leak-calculator-number-roll.md) | Leak calculator number roll | MEDIUM | Missed opportunity | DONE |
| [006](006-form-success-transition.md) | Discovery form success transition | MEDIUM | Missed opportunity | DONE |

## Recommended execution order

1. **002** first — it creates the `--ease-out` / duration tokens the other plans reference.
2. **001** second — global reduced-motion; 005/006 verification steps assume it.
3. **003**, **004** — independent perf work, any order.
4. **005**, **006** — additive polish, any order. 006's reduced-motion check depends on 001.

Dependencies: 004 and 005 optionally use `var(--ease-out)` from 002 (they inline the literal curve as fallback). 006's verification references 001.

## Vetted findings not planned (backlog)

- MEDIUM: five `height: 0 → auto` accordion implementations with three different durations (FAQ.tsx:82, CapabilityBreakdown.tsx:393, Solutions.tsx:311, WhatToExpect.tsx:547 + 333) — unify durations/eases via 002's tokens; full clip-path rework optional.
- LOW: hover transforms not gated behind `@media (hover: hover) and (pointer: fine)` (Solutions.tsx:417 `hover:scale-[1.03]`, WhatToExpect TierCard `whileHover={{ scale: 1.1, rotate: 5 }}`).
- LOW: FAQ trigger hover at 300 ms (`FAQ.tsx:63`) — 200 ms feels better on a repeatedly-clicked control.
- LOW: 33 Tailwind `transition-all` usages across 13 files — swap to `transition-colors`/`transition-transform` opportunistically when touching those files.
- LOW (awareness, deliberate design — do not "fix" without Wes): CinematicEntrance blocks homepage interactivity ~2.9 s on first visit (sessionStorage-gated); HowItWorksNew pip→panel could share a `layoutId` like Header's nav-underline.

Rejected in vetting: PainPoints.tsx `scale(0)` findings (component is dead code, not rendered); MouseSpotlight "unthrottled" claim (it is rAF-throttled — the real issue is the paint-heavy `background` write, covered in 003); Framer `x`/`y` shorthand → full-transform-string rewrites (one-shot `whileInView` entrances, churn outweighs gain).
