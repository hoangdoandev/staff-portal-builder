# Quy tắc làm việc với staff-portal-builder

File này dành cho dev và AI agent (Claude Code đọc qua `CLAUDE.md`). Chi tiết kỹ thuật xem `README.md`.

## Hai repo

- `builder` (repo này): source Astro + UnoCSS + TypeScript. Chỉ FE dùng.
- `html` (`plustechcoltd/sunnylife-spot_html`): output build cho BE. Đặt cạnh nhau: `Staff Portal/builder`, `Staff Portal/html`.
- `builder/main` luôn ứng với `html/develop`.
- `html` **không track `AGENTS.md` và `CLAUDE.md`** (BE không cần thấy). Quy tắc cho `html` chỉ nằm ở file này; không `git add -A` kéo chúng vào commit bên `html`.

## Quy trình mỗi màn / feature

1. Ở builder, tạo nhánh từ `main` (`feat/...`, `fix/...`), cắt màn, **thêm màn vào `src/data/screens.ts`**
   (trang `screens.html` liệt kê mọi màn; build báo lỗi nếu có trang chưa khai báo), commit.
2. `pnpm release`: chuyển `../html` sang nhánh **cùng tên**, build hai lần so sánh, đồng bộ `dist/`. Script không commit.
3. Ở html: xem diff, commit `build: <mô tả> (builder@<sha>)`, push nhánh, mở PR **base `develop`**.
4. Ở builder: mở PR base `main`, merge.

## Bắt buộc

- **Không bao giờ tự merge PR bên html.** BE review "Files changed" rồi tự merge. Chỉ dừng ở bước mở PR.
- **Không commit thẳng vào `html/develop`** và không push lên đó, trừ khi chủ dự án yêu cầu rõ.
- **Không sửa tay file trong html.** Mọi thay đổi đi từ builder qua `pnpm release`.
- **Không trỏ `outDir` của Astro vào `../html`**: Astro xoá sạch `outDir`, mất luôn `.git`.
- PR trước chưa merge mà nhánh mới cần nội dung của nó: `RELEASE_BASE=origin/<nhánh trước> pnpm release`,
  PR html đặt base là nhánh đó.
- Conflict ở `assets/css/style.css`: không sửa tay; rebase nhánh builder lên `main` rồi release lại.
- Output phải ổn định (build hai lần giống hệt): sửa một màn không được làm đổi HTML của màn khác.
  Thay đổi component dùng chung (header, footer...) làm đổi HTML mọi màn: tách thành PR riêng, ghi rõ trong mô tả.

## Style và markup

- Theo đúng Figma "Kawashima HR - Staff Portal" (PC 1366px, SP 390px, breakpoint `pc` = 768px). Chỗ cố ý lệch thiết kế:
  ghi lý do trong comment của component.
- Giá trị token chỉ đặt trong `src/styles/tokens.css`; tên class khai báo trong `uno/tokens.ts`. Không dùng palette mặc định.
- Kích thước viết px (`h-44px`). Hover dùng `hov:` thay cho `hover:`. Lỗi form: `aria-invalid="true"`.
- Tên shortcut không bắt đầu bằng tên biến thể (`focus-`, `hover-`...).
- Không dùng `<style>` hay `<script>` thường trong `.astro`. JS viết TS trong `src/scripts/`, là script thường bọc IIFE,
  nạp bằng `<script is:inline defer src="/assets/js/...">`.
- URL trong source viết từ gốc (`/assets/...`); build tự đổi sang tương đối để mở file trực tiếp được.
- Ảnh/icon đặt trong `public/assets/img/`, tên kebab-case ASCII.
- Kiểm tra trước khi commit: `pnpm check` và `pnpm build`.

## Git

- Conventional commits (`feat:`, `fix:`, `docs:`, `chore:`...), không nhắc tới AI trong commit/PR.
- Không commit `.env*`, secret, file hệ điều hành (`.DS_Store`...).
- Không nâng TypeScript lên 7.x (`astro check` chưa hỗ trợ).
- Không tắt dev server không phải mình mở.
