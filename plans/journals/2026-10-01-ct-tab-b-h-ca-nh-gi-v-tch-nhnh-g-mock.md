---
title: Cắt tab 部下の評価 và tách PR gỡ mock login
date: 2026-10-01
summary: "Thêm evaluation/primary, tách thẻ kỳ đánh giá và thanh tiến độ thành component; PR gỡ login dựng từ bản builder khớp html/develop"
---

# Cắt tab 部下の評価 và tách PR gỡ mock login

## What happened
- Cắt 一次評価一覧 (PC 606:4724, SP 606:3893) thành `evaluation/primary`; tab 自己評価 trỏ sang trang mới.
- Tách `EvaluationPeriodCard` và `ProgressBar` dùng chung với 自己評価一覧; HTML của trang self chỉ đổi href tab.
- Thêm shortcut `chip`; thay icon help bằng bản gốc Figma (18px).
- Đo trên trình duyệt: PC card 935px khớp Figma, SP 913.7px (Figma 913); khung hướng dẫn SP ngắt dòng như Figma nhờ `word-break: auto-phrase` (chỉ Chrome).
- PR gỡ mock login lần đầu dựng từ `main` nên diff html lẫn cả màn self-list và URL tương đối. Làm lại từ commit 6a1a686 (bản đã sinh ra develop): diff chỉ có login và các class chỉ login dùng.
- `tsc` báo TS18003 khi `src/scripts` rỗng: thêm `scripts-dir-placeholder.d.ts`.

## Decision
- Hai nhánh gỡ login: `chore/remove-login-mock` (từ main, merge vào builder main) và `chore/remove-login-mock-develop` (từ 6a1a686, chỉ để sinh output cho html PR base develop).
- `html` không track AGENTS.md/CLAUDE.md; thêm commit `git rm --cached` thay vì force-push.

## Next steps
- Chờ merge html PR gỡ login vào develop, merge develop vào feat/evaluation-self-list rồi mới release tab mới lên PR #3 (rebase builder lên main nếu conflict style.css).

> Historical work record — not durable authority. Prefer docs/specs/ADRs for current decisions.
