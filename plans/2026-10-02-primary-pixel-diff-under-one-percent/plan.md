# Primary evaluation pixel-diff alignment

## Goal

Reduce the deterministic PC screenshot difference for
`src/pages/evaluation/primary.astro` against `public/figma-mock.png` to below
1%, while preserving the displayed and accessible progress value of 67%.

## Scope

- Prefer page-local spacing and sizing changes in `primary.astro`.
- Change shared components only when measurements show the mismatch belongs to
  the shared component, then verify `self.astro` for regressions.
- Restore the documented `pnpm diff:pixel` command if it is still absent.
- Do not reproduce the Figma progress-bar drawing error (approximately 69.2%
  fill labelled as 67%).

## Method

1. Use `scripts/pixel-diff.py` at 1366x1538 as the feedback loop.
2. Align large structural regions first: header, card boundaries, dividers,
   evaluator information box, subordinate rows, second card, and footer.
3. Re-measure after each focused change and avoid whole-page offsets when the
   error is not uniform.
4. Address typography or raster differences only after structural differences
   are removed, without replacing live content with images.
5. Preserve existing uncommitted work and avoid unrelated refactoring.

## Acceptance criteria

- Two consecutive pixel-diff runs report less than 1.00%.
- The progress label, visual value, and `aria-valuenow` remain 67.
- `pnpm check` succeeds.
- `pnpm build` succeeds.
- Shared evaluation screens remain structurally valid after any shared
  component change.

## Risks and rollback

- Font rendering differs between Windows and the macOS Figma source. Layout
  fixes must not compensate globally for glyph rasterization differences.
- Shared card/header changes can affect other pages. Keep each adjustment
  isolated so it can be reverted independently if `self.astro` regresses.
