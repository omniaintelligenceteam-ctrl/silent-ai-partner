# 005 — Animate the leak calculator outputs (numbers currently teleport)

- **Status**: DONE (executed 2026-07-22, commit follows 91b5154)
- **Commit**: 91b5154
- **Severity**: MEDIUM (missed opportunity — additive)
- **Category**: Missed opportunities
- **Estimated scope**: 1 file (src/components/sections/WhatToExpect.tsx), ~40 lines

## Problem

The "leak calculator" on /pricing (`src/components/sections/WhatToExpect.tsx`, `ROICalculator` function ~line 380) is the interactive payoff of the page: four sliders drive three dollar figures. But the outputs are plain text re-rendered on every slider tick — the numbers **teleport**:

```tsx
/* current — output card values (~line 455) */
{ icon: Wallet, label: 'Admin hours cost, per month', value: `$${monthlyAdminCost.toLocaleString()}`, ... },
{ icon: TrendingUp, label: 'Revenue leaking from lost leads', value: `$${monthlyLeakRevenue.toLocaleString()}`, ... },
{ icon: BarChart3, label: 'Annual cost of doing nothing', value: `$${annualCost.toLocaleString()}`, ... },
{ icon: CalendarClock, label: 'Hours back per week with OIOS', value: `~${adminHours}hrs`, ... },
```

A rolling number transition makes the leak feel like a live meter and rewards slider play. Note: the repo's `AnimatedCounter` (`src/components/ui/AnimatedCounter.tsx`) is a one-shot in-view count-up from 0 — it does NOT retarget when its `end` prop changes, so it is the convention exemplar but not directly usable.

## Target

A small `RollingNumber` component inside WhatToExpect.tsx that springs from its previous value to the new one using Motion's `animate()`:

```tsx
/* target — add near the top of the ROICalculator section of WhatToExpect.tsx */
import { animate } from 'motion/react'  // merge into the existing motion/react import

function RollingNumber({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const prev = useRef(value)
  useEffect(() => {
    const from = prev.current
    prev.current = value
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (ref.current) ref.current.textContent = `${prefix}${Math.round(value).toLocaleString()}${suffix}`
      return
    }
    const controls = animate(from, value, {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${prefix}${Math.round(v).toLocaleString()}${suffix}`
      },
    })
    return () => controls.stop()
  }, [value, prefix, suffix])
  return <span ref={ref}>{`${prefix}${Math.round(value).toLocaleString()}${suffix}`}</span>
}
```

Then change the output cards to pass numbers instead of strings, e.g.:

```tsx
{ icon: Wallet, label: 'Admin hours cost, per month', num: monthlyAdminCost, prefix: '$', ... }
...
<div className={`text-2xl font-bold ${output.color}`} style={{ fontFamily: 'var(--font-display), sans-serif' }}>
  <RollingNumber value={output.num} prefix={output.prefix ?? ''} suffix={output.suffix ?? ''} />
</div>
```

The 4th card ("Hours back per week") uses `prefix="~"` and `suffix="hrs"`.

## Repo conventions to follow

- Motion imports come from `'motion/react'` (see the file's existing import line 5).
- Reduced-motion guard pattern: `window.matchMedia('(prefers-reduced-motion: reduce)').matches` early-return, as in `src/components/ui/RotatingText.tsx:16`.
- The strong ease-out array `[0.23, 1, 0.32, 1]` matches the house curve.

## Steps

1. Add `animate` to the `motion/react` import in `src/components/sections/WhatToExpect.tsx`.
2. Add the `RollingNumber` component above `ROICalculator` in the same file.
3. Convert the four output-card entries from preformatted `value` strings to `{ num, prefix?, suffix? }` fields and render via `<RollingNumber>` (keep icons, labels, colors, borders identical).

## Boundaries

- ONE file. Do NOT touch the sliders, the math, or the CTA below the outputs.
- Do NOT modify `AnimatedCounter.tsx`.
- Do NOT animate the slider value chips (they must stay instant — direct manipulation feedback).
- If the output-card structure differs from the excerpt (drift since 91b5154), STOP and report.

## Verification

- **Mechanical**: `npm run build` exits 0.
- **Feel check**: `npm run dev` → `/pricing`, drag "Average job value" slowly and then flick it:
  - Figures roll smoothly to their new values in ~0.4 s; a mid-drag change retargets from the current rolling value (no restart from the old number).
  - Slider chips (right of each label) update instantly.
  - With reduced motion emulated, numbers snap instantly (no roll) but stay correct.
- **Done when**: dollar outputs never visibly "teleport" during slider play, and formatting (commas, $, ~hrs) is identical to before.
