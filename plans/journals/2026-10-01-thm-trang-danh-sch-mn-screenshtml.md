---
title: Thêm trang danh sách màn screens.html
date: 2026-10-01
summary: "画面一覧 liệt kê màn theo nhóm, dữ liệu src/data/screens.ts, build dừng nếu lệch src/pages"
---

# Thêm trang danh sách màn screens.html

## What happened
- Người dùng muốn một màn tự vẽ liệt kê các màn đã làm, bấm để mở, và mỗi màn mới đều được thêm vào.
- Tạo screens.html dùng BaseLayout (không header/footer), dữ liệu trong src/data/screens.ts kèm node Figma PC/SP.
- Trang dùng import.meta.glob so với src/pages: thiếu khai báo hoặc đường dẫn sai thì build dừng (đã thử bằng cách đổi tạm một path).

## Decision
- Đặt ở `screens.html` thay vì `index.html`, vì index sẽ là trang HOME thật khi có thiết kế.
- html: nhánh feat/screen-list xếp chồng trên [html]#3 ([html]#7), builder [builder]#13 đã merge.

## Next steps
- Mỗi màn mới: thêm vào src/data/screens.ts (đã ghi trong AGENTS.md).

> Historical work record — not durable authority. Prefer docs/specs/ADRs for current decisions.
