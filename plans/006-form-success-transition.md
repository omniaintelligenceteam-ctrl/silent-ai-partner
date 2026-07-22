# 006 — Give the discovery form's success moment a real transition

- **Status**: DONE (executed 2026-07-22, commit follows 91b5154)
- **Commit**: 91b5154
- **Severity**: MEDIUM (missed opportunity — additive)
- **Category**: Missed opportunities
- **Estimated scope**: 1 file (src/components/sections/DiscoveryForm.tsx), ~25 lines

## Problem

Submitting the discovery form (the site's #1 conversion action, on / and /form) hard-swaps the UI:

```tsx
/* src/components/sections/DiscoveryForm.tsx:180 — current */
if (submitted) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} ...>
        ...success card + SuccessCheckmark...
```

The filled form unmounts instantly (no exit animation) and the success card fades in separately — the highest-emotion moment on the site renders as a teleport. This is a rare, first-time moment: it has the full delight budget.

## Target

Wrap both states in a single `AnimatePresence` with `mode="wait"`: the form exits down-and-out, then the success card enters. Keep the existing `SuccessCheckmark` draw animation — it already lands well once it isn't fighting a hard swap.

```tsx
/* target shape — one return statement */
return (
  <AnimatePresence mode="wait">
    {submitted ? (
      <motion.div
        key="success"
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
        className="min-h-screen flex items-center justify-center px-4"
      >
        {/* existing success card contents unchanged */}
      </motion.div>
    ) : (
      <motion.div
        key="form"
        exit={{ opacity: 0, y: -12, scale: 0.99 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        className="min-h-screen flex items-center justify-center px-4 py-16"
      >
        {/* existing form contents unchanged (the current motion.div wrapper's
            initial/animate props move onto this element) */}
      </motion.div>
    )}
  </AnimatePresence>
)
```

`AnimatePresence` is already imported patterns elsewhere; here import it from `'motion/react'` alongside `motion`.

## Repo conventions to follow

- `AnimatePresence` + `mode`/keyed children is the established repo pattern: see `src/components/sections/Header.tsx:132-139` (mobile menu) and `HowItWorksNew.tsx` step panels.
- House UI curve `[0.23, 1, 0.32, 1]`; exits faster than entrances (0.25 s out / 0.45 s in — response snaps, arrival savors).

## Steps

1. In `src/components/sections/DiscoveryForm.tsx`, add `AnimatePresence` to the `motion/react` import.
2. Merge the two `return` branches into the single `AnimatePresence mode="wait"` structure above. The current success-card `motion.div` (line ~183) becomes the `key="success"` branch; the current form wrapper `motion.div` (line ~209) becomes the `key="form"` branch with the added `exit` prop.
3. Keep every child element, class, and the `SuccessCheckmark` component untouched.

## Boundaries

- ONE file. Do NOT touch the API call, validation, or form fields.
- Do NOT alter `SuccessCheckmark`'s internal keyframes/timings.
- Do NOT add a loading/skeleton state — out of scope.
- If the two-return structure differs (drift since 91b5154), STOP and report.

## Verification

- **Mechanical**: `npm run build` exits 0.
- **Feel check**: `npm run dev` → `/form`, fill required fields, submit (dev API may error — if so, temporarily set `setSubmitted(true)` in the catch branch ONLY while feel-checking, then revert):
  - The form slides up/fades out (~250 ms), THEN the success card rises in (~450 ms) and the checkmark draws — one continuous moment, no flash of blank.
  - DevTools Animations panel at 25% speed: no frame where both form and success card are visible (mode="wait" holding).
  - Reduced-motion emulated: swap still communicates via opacity (MotionConfig from plan 001 strips the movement).
- **Done when**: submit reads as one choreographed moment with zero teleport, and normal submission behavior (API call, error path) is unchanged.
