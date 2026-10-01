---
title: Cắt màn 自己評価一覧 và kiểm chứng diff cô lập
date: 2026-10-01
summary: "Màn thứ hai chỉ thêm file mới và thêm dòng vào style.css; index.html, auth/login.html không đổi"
---

# Cắt màn 自己評価一覧 và kiểm chứng diff cô lập

## What happened
- Cắt evaluation/self (PC 606:4686, SP 606:3858) cùng Breadcrumb, PageTitle, PageTabs dùng chung; shortcut tag, badge.
- Diff ở html: style.css +361 dòng, 0 dòng xoá; thêm evaluation/self.html và icon mới; index.html, auth/login.html không đổi.
- Lỗi gặp: tag inline-flex trong khối có line-height 15px làm mỗi mục cao thêm 2-3px (đổi sang flex w-fit);
  prettier-plugin-astro tách "67" và "%" xuống hai dòng sinh khoảng trắng (bọc bằng flex items-baseline).
- Đo trên trình duyệt: PC khớp Figma từng px; SP lệch ≤3px do chiều cao dòng font. Figma SP thẻ 2 tự lệch ~2px so với thẻ 1.

## Decision
- Tab 部下の評価 căn giữa ô tab (Figma lệch 13px so với ô 240px).
- Thanh tiến độ rộng theo giá trị 67% (Figma vẽ 69%).
- Header chưa dùng shortcut badge để lần thử này không chạm HTML các màn khác; gom lại sau.

## Next steps
- Gom badge ở header vào shortcut (sẽ đổi HTML mọi màn, làm riêng một commit).

> Historical work record — not durable authority. Prefer docs/specs/ADRs for current decisions.
