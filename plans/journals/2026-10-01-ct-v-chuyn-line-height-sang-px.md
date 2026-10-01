---
title: Cắt 一次評価入力画面 và chuyển line-height sang px
date: 2026-10-01
summary: "Màn primary-input + token line-height px; [builder]#15 merged, [html]#3 commit 8ed1037"
---

# Cắt 一次評価入力画面 và chuyển line-height sang px

## What happened
- Token cỡ chữ đổi line-height normal → px (ceil(size×1.5)) theo Figma; commit riêng ad9bffb.
- Cắt 一次評価入力画面 (PC 606:4884, SP 606:4049): EvaluationSection, EvaluationScoreTable, NumberStepper, shortcut field-date/checkbox/stepper-input.
- Phát hiện trùng id/name khi nhóm 数値KRA đánh số lại từ 1 → thêm prop fieldKey cho EvaluationCriterionCard (mặc định giữ HTML self-input).
- Một lần build thiếu class border-separate/border-spacing-0; ba lần build sau giống hệt nhau, chưa rõ nguyên nhân.

## Decision
- Release thẳng vào html feat/evaluation-self-list ([html]#3) theo người dùng chọn; #3 mang theo screens.html (trùng [html]#7).

## Next steps
- Đo và chỉnh line-height các màn cũ (index, self, primary, self-input) trong PR riêng.
- Cân nhắc dùng EvaluationSection cho self-input khi chỉnh lại.

> Historical work record — not durable authority. Prefer docs/specs/ADRs for current decisions.
