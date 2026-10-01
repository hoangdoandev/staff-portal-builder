---
title: Dựng nền tảng style cho staff-portal-builder
date: 2026-10-01
summary: "Astro 7 + UnoCSS Wind4 + TS 6, font Noto Sans JP qua plugin, token Figma, breakpoint pc=768px, trạng thái tương tác."
---

# Dựng nền tảng style cho staff-portal-builder

## What happened
Dựng nền tảng style cho builder: token thiết kế từ Figma (màu, cỡ chữ PC/SP, bo góc, bóng) trong `uno/tokens.ts`,
font Hiragino Sans dự phòng Noto Sans JP qua `@unocss/preset-web-fonts` (tải về `public/assets/fonts`), một breakpoint
`pc` = 768px, shortcut kèm trạng thái hover/active/focus/lỗi trong `uno/shortcuts.ts`. Commit c6ca5c9 và f73b1e2, chưa push.

## Findings
- `astro check` từ chối TypeScript 7.0, ghim 6.0.3.
- Lightning CSS processor không chạy với UnoCSS CLI; Legacy Compat chỉ đổi cú pháp màu, không làm Wind4 chạy trên trình duyệt cũ.
- Plugin web fonts chạy được với CLI và ổn định giữa các lần chạy (kể cả xoá cache). Noto Sans JP là 124 file, 5.2 MB dù thêm 4 weight (font biến thiên).
- Plugin sinh 496 khối `@font-face` vào `style.css`, nên tách khối `/* layer: fonts */` ra `fonts.css` bằng `scripts/split-fonts-css.mjs`.
- Wind4 sinh màu dạng `color-mix(...)` kèm khối `@supports` lặp với `oklab`.
- Theme text token cần `lineHeight`, nếu không `--text-*-lineHeight` không tồn tại và line-height kế thừa 1.5 từ `html`.
- Khoá màu `DEFAULT` sinh biến `--colors-primary-DEFAULT`; làm phẳng khoá khi sinh theme.
- Hover phải bọc `[@media(hover:hover)]:hover`. Biến thể `aria-invalid` không sinh khi viết dạng nhóm `(...)` có ngoặc lồng trong shortcut, phải viết tách từng class.
- Prettier 3 bỏ qua file trong `.gitignore`, nên `format:dist` dùng `.prettierignore` riêng.

## Decision
Giữ nguyên giá trị thiết kế (5 mức xám không gộp), Hiragino đứng trước Noto, header SP bỏ phần trắng phía trên,
trạng thái ngoài thiết kế do FE tự thêm và ghi chú trong README.

## Next steps
Quyết định có push 2 commit lên `main` repo builder không. Đổi tên các file ảnh/icon trong `public/assets/img/` sang
kebab-case ASCII. Cắt thử trang danh sách đánh giá (PC 606:4686, SP 606:3858) và so với Figma.

> Historical work record — not durable authority. Prefer docs/specs/ADRs for current decisions.
