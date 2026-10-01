---
title: Cắt header footer chung và sửa build không ổn định
date: 2026-10-01
summary: Header/footer/PageLayout theo Figma; phát hiện Wind4 on-demand theme làm style.css đổi thứ tự giữa các lần build
---

# Cắt header footer chung và sửa build không ổn định

## What happened
- Cắt SiteHeader, SiteFooter, PageLayout (main flex-1, body min-h-dvh flex cột) theo Figma PC 606:4688/606:4696, SP 606:3892/606:3878. Header SP bỏ 40px trắng phía trên, cao 55px.
- Đo trên trình duyệt (iframe 390px và 1366px): logo, cột nav cách 79px, badge, footer khớp số đo; footer sát đáy khi trang rỗng.
- Build hai lần ra style.css khác nhau: Wind4 `preflights.theme` mặc định 'on-demand' ghi biến theme theo thứ tự phát hiện class, Astro xử lý trang song song nên thứ tự đổi. Sửa bằng `preflights.theme: true` (thêm ~144 dòng :root cố định). 5 lần build liên tiếp giống hệt.
- Shortcut tên `focus-ring` bị UnoCSS hiểu thành `focus:` + `ring`; đổi thành `focusable`.
- Footer SP cao 63.5px vì li thừa hưởng line-height của chữ 14px; đặt cỡ chữ lên ul.

## Decision
- Link footer PC: Figma lẫn 12px #666 và 11px #333, chọn 11px #333 (đa số + SP), token `footer-link`.
- Giữ trang thử auth/login làm "màn B" để kiểm tra cô lập diff.

## Next steps
- Cắt một màn thật, kiểm tra diff ở html chỉ chạm HTML màn đó + dòng thêm trong style.css.

> Historical work record — not durable authority. Prefer docs/specs/ADRs for current decisions.
