---
title: Thêm quy tắc repo cho dev và agent
date: 2026-10-01
summary: AGENTS.md + CLAUDE.md ở builder và html; release.sh giữ file quy tắc bên html; gitignore file rác
---

# Thêm quy tắc repo cho dev và agent

## What happened
- Quy tắc trước chỉ nằm trong memory cá nhân; dev khác clone về không có. Thêm `AGENTS.md` (+ `CLAUDE.md` = `@AGENTS.md`) ở cả hai repo.
- Phát hiện `release.sh` dùng `rsync --delete` sẽ xoá file quy tắc bên html ở lần release sau; thêm `--exclude` cho `AGENTS.md`, `CLAUDE.md`, `.gitignore` (thử trên thư mục tạm: file loại trừ được giữ).
- `.gitignore` hai repo thêm file rác hệ điều hành/editor; html trước đó chưa có `.gitignore`, `.DS_Store` đang nằm ngoài.

## Decision
- Một file quy tắc chung `AGENTS.md` cho người và mọi agent, `CLAUDE.md` chỉ import để tránh hai nguồn lệch nhau.
- html: commit lên `feat/evaluation-self-list` (PR #3 đã gộp #4), builder: PR #7 đã merge.

## Next steps
- Khi BE merge PR #3, `develop` có đủ quy tắc; nhánh màn mới tạo từ `origin/develop` như mặc định.

> Historical work record — not durable authority. Prefer docs/specs/ADRs for current decisions.
