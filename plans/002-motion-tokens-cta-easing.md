# 002 — Motion tokens + crisp CTA/hover easing in globals.css

- **Status**: DONE (executed 2026-07-22, commit follows 91b5154)
- **Commit**: 91b5154
- **Severity**: HIGH
- **Category**: Easing & duration / Cohesion & tokens / Performance
- **Estimated scope**: 1 file (src/app/globals.css), ~30 lines touched

## Problem

1. **No motion tokens exist.** `:root` in `src/app/globals.css:6-22` holds only color/glass tokens. The same curves are hand-typed everywhere: `cubic-bezier(0.23, 1, 0.32, 1)` (line 188), `cubic-bezier(0.34, 1.56, 0.64, 1)` (lines 234, 322), `cubic-bezier(0.16, 1, 0.3, 1)` (lines 560, 593, 601). `[0.23,1,0.32,1]` and `[0.16,1,0.3,1]` are near-identical strong ease-outs used interchangeably — a textbook consolidation finding.

2. **The primary CTA is springy and slow.** `.btn-glow` is the "Start Month 1" button across Header (desktop, mobile menu, sticky bar) and FinalCTA:

```css
/* src/app/globals.css:232 — current */
.btn-glow {
  position: relative;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.btn-glow:hover  { transform: translateY(-2px); box-shadow: /* 3 glows */; }
.btn-glow:active { transform: translateY(0);    box-shadow: /* 1 glow */; }
```

`transition: all` animates unintended off-GPU properties (always a finding); the `1.56` overshoot curve makes the site's main CTA bounce inside an otherwise crisp cinematic system (personality clash); 300 ms symmetric press/release is double the 100–160 ms press budget.

3. **Hover interactions exceed the hover budget:**

```css
/* src/app/globals.css:322 — current */
.link-animate::after { ... transition: width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }

/* src/app/globals.css:188 — current */
.glass-card {
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1),
              border-color 0.3s ease, box-shadow 0.3s ease;
}
```

400 ms hovers with an overshoot on the nav underline; hover budget is 125–200 ms for small feedback, ≤300 ms hard ceiling.

## Target

Add motion tokens to `:root` (exact values from the audit playbook):

```css
:root {
  /* ...existing color tokens stay... */
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);       /* strong ease-out for UI */
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);   /* on-screen movement */
  --duration-press: 160ms;
  --duration-hover: 200ms;
}
```

Then:

```css
/* target */
.btn-glow {
  position: relative;
  transition: transform var(--duration-press) var(--ease-out),
              box-shadow var(--duration-hover) var(--ease-out);
}
/* :hover and :active blocks unchanged */

.link-animate::after { /* keep everything else */ transition: width var(--duration-hover) var(--ease-out); }

.glass-card {
  transition: transform 250ms var(--ease-out),
              border-color 250ms ease, box-shadow 250ms ease;
}
```

Finally, replace the two remaining hand-typed `cubic-bezier(0.23, 1, 0.32, 1)` / `cubic-bezier(0.16, 1, 0.3, 1)` occurrences in globals.css (lines ~560, 593, 601 — `.page-enter`, progress-bar widths) with `var(--ease-out)`.

## Repo conventions to follow

- Tokens live in the `:root` block at the top of `src/app/globals.css` (lines 6-22) — append motion tokens there, matching the existing `--name: value;` style.
- Do not rename or reformat existing color tokens.
- TSX inline ease arrays (e.g. `[0.16, 1, 0.3, 1]` in components) are OUT of scope for this plan — CSS only.

## Steps

1. Append the four motion tokens to `:root` in `src/app/globals.css`.
2. Rewrite `.btn-glow`'s transition (line ~234) as in Target — explicitly `transform` + `box-shadow`, no `all`, no overshoot curve.
3. Rewrite `.link-animate::after`'s transition (line ~322) as in Target.
4. Rewrite `.glass-card`'s transition (line ~188) as in Target.
5. Replace remaining `cubic-bezier(0.23, 1, 0.32, 1)` and `cubic-bezier(0.16, 1, 0.3, 1)` literals in globals.css with `var(--ease-out)`.

## Boundaries

- ONE file: `src/app/globals.css`. Do NOT touch TSX files.
- Do NOT alter what properties `:hover`/`:active` set — only the `transition` declarations.
- Do NOT touch the `@keyframes` blocks or the reduced-motion media block.
- If a cited line no longer matches (drift since 91b5154), STOP and report.

## Verification

- **Mechanical**: `npm run build` exits 0; `grep -n "transition: all" src/app/globals.css` returns nothing.
- **Feel check**: `npm run dev`, hover + click the header "Start Month 1" button:
  - Press response feels immediate (≤160 ms), no bounce/overshoot on hover lift.
  - Nav underline (`.link-animate`) completes its sweep crisply, no rubbery overshoot.
  - FAQ cards (`.glass-card`) still lift on hover, just snappier.
  - DevTools → Animations panel at 10% speed: `.btn-glow` transitions only `transform` and `box-shadow`.
- **Done when**: no `transition: all` and no `1.56` overshoot remain in globals.css, tokens exist in `:root`, build green, CTA feels crisp.
