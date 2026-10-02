# Primary Evaluation Pixel Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce the 1366x1538 pixel diff for `evaluation/primary` below 1% without falsifying the 67% progress value.

**Architecture:** Keep the screenshot script as the regression harness and change page-local geometry before shared components. Measure every iteration from generated PNGs; shared changes require a build/type check and inspection of `evaluation/self`.

**Tech Stack:** Astro 7, UnoCSS 66, TypeScript 6, Python Pillow/NumPy, Chrome headless.

---

### Task 1: Restore the documented pixel-diff command

**Files:**
- Modify: `package.json`
- Test: `scripts/pixel-diff.py`

- [ ] **Step 1: Confirm the alias is absent**

Run: `pnpm diff:pixel`

Expected: command-not-found failure for `diff:pixel`.

- [ ] **Step 2: Add the script alias**

Add this entry to `package.json` under `scripts`:

```json
"diff:pixel": "python scripts/pixel-diff.py"
```

- [ ] **Step 3: Run the feedback loop**

Run: `pnpm diff:pixel`

Expected: exit 0, `Image size: 1366x1538`, and a reported diff percentage.

### Task 2: Align page-local evaluator geometry

**Files:**
- Modify: `src/pages/evaluation/primary.astro`
- Test: `actual.png`, `diff.png`, `diff_highlight.png`

- [ ] **Step 1: Record the current red baseline**

Run: `pnpm diff:pixel`

Expected baseline: `Diff percentage: 2.57%`.

- [ ] **Step 2: Move the information box up without moving the subordinate-list boundary up**

Change the PC-only box spacing from:

```astro
pc:(mb-11px mt-10px gap-9px pb-12px pl-12px pr-20px pt-12px)
```

to:

```astro
pc:(mb-15px mt-7px gap-9px pb-12px pl-12px pr-20px pt-12px)
```

This moves the box from approximately `y=610..677` to `y=607..674` and moves the following boundary from `y=689` to `y=690`.

- [ ] **Step 3: Re-run the visual regression harness**

Run: `pnpm diff:pixel`

Expected: diff lower than the baseline and the information-box background aligned at `y=607..674`.

### Task 3: Align subordinate row boundaries

**Files:**
- Modify: `src/pages/evaluation/primary.astro`
- Test: `actual.png`, `diff.png`, `diff_highlight.png`

- [ ] **Step 1: Expose the map index**

Change:

```astro
{subordinates.map((person) => (
```

to:

```astro
{subordinates.map((person, index) => (
```

- [ ] **Step 2: Apply row-specific PC padding**

Replace the shared PC bottom padding with a `class:list` that keeps the first row at 182px and removes one pixel from each later row:

```astro
<li
  class:list={[
    'border-t border-line-hair pb-14px pt-13px pc:pt-15px',
    index === 0 ? 'pc:pb-19px' : index === 1 ? 'pc:pb-18px' : 'pc:pb-20px',
  ]}
>
```

- [ ] **Step 3: Measure all four boundaries**

Run: `pnpm diff:pixel`

Expected boundaries: list start near `690`, row 1 near `872`, row 2 near `1054`, card bottom near `1237`.

- [ ] **Step 4: Adjust only the row that misses its boundary**

If a boundary is one pixel off, change only that row's `pc:pb-*` value by one pixel, rerun `pnpm diff:pixel`, and retain the change only when the total percentage decreases.

### Task 4: Align shared card sections only if still visible

**Files:**
- Modify: `src/components/EvaluationPeriodCard.astro`
- Inspect: `src/pages/evaluation/self.astro`
- Test: `pnpm check`, `pnpm build`

- [ ] **Step 1: Measure the first two divider rows after page-local fixes**

Run: `pnpm diff:pixel`

Expected target rows: first divider near `386`, second divider near `466`.

- [ ] **Step 2: Reduce shared padding one pixel at a time**

Only if the measured dividers remain low, change:

```astro
<div class="pb-14px pt-12px pc:pt-18px">
```

to:

```astro
<div class="pb-14px pt-12px pc:pt-17px">
```

Then run `pnpm diff:pixel`. Keep the change only if the percentage decreases. Apply the same one-variable rule to the second section's PC bottom padding, using `pc:pb-13px` if its divider remains one pixel low.

- [ ] **Step 3: Verify shared-component compilation**

Run: `pnpm check`

Expected: exit 0 with no Astro or TypeScript errors.

Run: `pnpm build`

Expected: exit 0 and formatted output under `dist/`.

### Task 5: Reduce residual non-semantic visual differences

**Files:**
- Modify only when measurement identifies the owner: `src/pages/evaluation/primary.astro`, `src/components/SiteHeader.astro`, or token/shortcut files already used by these elements
- Test: `actual.png`, `diff.png`, `diff_highlight.png`

- [ ] **Step 1: Partition remaining diff by 50px horizontal bands**

Run a read-only Pillow/NumPy measurement over `actual.png` and `public/figma-mock.png`, using the same threshold `>25` as `scripts/pixel-diff.py`.

Expected: a ranked list of remaining bands by differing-pixel count.

- [ ] **Step 2: Fix the highest structural band one variable at a time**

For each band, change only the owning margin, padding, height, or position utility. Run `pnpm diff:pixel` after every change and revert the candidate when the percentage increases.

- [ ] **Step 3: Preserve progress semantics**

Confirm the source still contains:

```astro
percent: 67
```

and `ProgressBar.astro` still derives both `aria-valuenow` and width from the same `percent` prop.

### Task 6: Final verification

**Files:**
- Verify: all modified source and configuration files

- [ ] **Step 1: Run the pixel regression twice**

Run twice: `pnpm diff:pixel`

Expected both times: `Diff percentage` below `1.00%`.

- [ ] **Step 2: Run project checks**

Run: `pnpm check`

Expected: exit 0 with no errors.

Run: `pnpm build`

Expected: exit 0.

- [ ] **Step 3: Review scope**

Run: `git diff -- package.json src/pages/evaluation/primary.astro src/components/EvaluationPeriodCard.astro src/components/SiteHeader.astro src/pages/evaluation/self.astro`

Expected: only measured pixel-alignment changes and the command alias; no progress-value falsification or unrelated refactor.

Because these source files already contain user-owned uncommitted changes, do not create a source commit unless the user explicitly requests one.
