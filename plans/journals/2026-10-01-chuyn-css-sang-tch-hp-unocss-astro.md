---
title: Chuyển CSS sang tích hợp unocss/astro
date: 2026-10-01
summary: "Bỏ UnoCSS CLI, token ra file CSS, khoá palette, sửa quét TS và đường dẫn font; PR #3."
---

# Chuyển CSS sang tích hợp unocss/astro

## What happened
Người dùng chỉ ra cách dựng CSS bằng UnoCSS CLI + nhiều script là rườm rà trong khi docs có sẵn tích hợp `unocss/astro`,
và nhận xét tôi "thiếu sót khi dùng UnoCSS". Đã đọc skill UnoCSS (antfu/skills) rồi chuyển sang tích hợp; PR #3 merge (dbb680a).

## Findings
- Tích hợp Astro + `cssCodeSplit: false` + `assetFileNames` cho CSS tên cố định `assets/css/style.css`; script do Astro bó vẫn có hash nên giữ `tsc` cho JS.
- `content.filesystem` của plugin Vite vẫn lọc file theo `content.pipeline` (`if (!filter(code, file)) return;`), bộ lọc mặc định không có `.ts`, nên phải khai báo `pipeline.include` cho `src/scripts`. Trong dev, file TS mới tạo cần khởi động lại.
- Theme màu dạng `var(--color-*)` được Wind4 dùng thẳng (`color-mix(in srgb, var(--color-primary) ...)`), không sinh biến `--colors-*`.
- Tên biến token không được trùng biến Wind4 tự sinh (`--radius-*`, `--shadow-*`...) để tránh vòng lặp `var()`.
- Đường dẫn tương đối trong `createLocalFontProcessor` tính theo cwd: extension UnoCSS của VS Code mở thư mục cha đã ghi font và cache ra thư mục `Staff Portal`. Đổi sang đường dẫn tính từ file cấu hình.
- Plugin `remove-svg-assets` trong dự án cũ làm vỡ ảnh SVG được import (đã kiểm chứng), không mang sang.
- `theme.breakpoint` tuỳ chỉnh thay thế bộ mặc định (chỉ còn `pc`, `lt-pc`, `at-pc`).

## Decision
Token giá trị nằm ở `src/styles/tokens.css`, palette thay hẳn bằng màu thiết kế, kích thước viết theo px, hover dùng biến thể `hov:`.
Dự án cũ jcorental chỉ để tham khảo ý tưởng, không phải chuẩn.

## Next steps
Người dùng tự xoá thư mục phụ thuộc thừa còn ở gốc `Staff Portal` (hook chặn lệnh có tên thư mục này). Cắt trang thử đầu tiên: danh sách đánh giá (PC 606:4686, SP 606:3858).

> Historical work record — not durable authority. Prefer docs/specs/ADRs for current decisions.
