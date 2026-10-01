# staff-portal-builder

Source Astro + UnoCSS + TypeScript để cắt giao diện Staff Portal (Sunnylife Spot). Build ra HTML/CSS/JS thuần,
đã format, để đội BE copy và tự theo dõi thay đổi.

Repo này **chỉ FE dùng**. BE chỉ thấy repo output `sunnylife-spot_html`, nhánh `develop`.

## Bố trí thư mục

```
Staff Portal/            thư mục thường (không phải git repo), nơi chạy Claude
├── builder/             repo này (staff-portal-builder)
└── html/                repo sunnylife-spot_html, nhánh develop = output build
```

`pnpm release` mặc định ghi sang `../html`, nên hai thư mục phải là anh em.

## Yêu cầu

- Node >= 24.14 (`.nvmrc`), pnpm 11.9 (`packageManager`). Mọi phiên bản dependency được ghim chính xác.
- TypeScript ghim 6.0.3, **không nâng lên 7.x**: `astro check` chưa hỗ trợ TypeScript 7.0.

## Lệnh

| Lệnh           | Tác dụng                                                                        |
| -------------- | ------------------------------------------------------------------------------- |
| `pnpm install` | Cài dependency                                                                  |
| `pnpm dev`     | Chạy song song UnoCSS watch, tsc watch và `astro dev`                           |
| `pnpm check`   | `astro check` (kiểm tra kiểu cho .astro và .ts)                                 |
| `pnpm build`   | Sinh CSS + JS, build Astro, format `dist/` bằng Prettier                        |
| `pnpm release` | check, build hai lần so sánh, rồi đồng bộ `dist/` sang `../html` (không commit) |

## Quy trình bàn giao cho BE

1. `pnpm release` (script từ chối nếu `../html` không phải git repo hoặc không ở nhánh `develop`).
2. Sang `../html`, xem `git status` / `git diff`. Chỉ commit khi có thay đổi thật.
3. Commit message ghi SHA của repo này (ví dụ `build from builder@a1b2c3d`) rồi push.

BE copy output một lần, sau đó theo dõi diff của repo output và tự sửa vào source của họ. Vì vậy `dist/` phải ổn
định: cùng source cho đúng cùng output (script `release` kiểm tra bằng cách build hai lần).

## Quy ước để output đọc được và ổn định

- **CSS**: UnoCSS CLI quét `src/**/*.{astro,ts}`, ghi ra `public/assets/css/style.css` (một file, không minify).
  Component lặp lại dùng `shortcuts` trong `uno.config.ts` (class ngữ nghĩa như `btn-primary`), layout nhỏ lẻ dùng utility.
- **JS**: viết TypeScript trong `src/scripts/`, `tsc` biên dịch ra `public/assets/js/` (ES2019, ES module, giữ comment).
  Trong trang dùng `<script is:inline type="module" src="/assets/js/...">`.
  **Không dùng `<script>` thường trong `.astro`**: Astro sẽ bundle, đổi tên có hash và minify.
- **Không dùng `<style>` trong `.astro`**: Astro thêm `data-astro-cid-*` và class có hash vào HTML.
- Thư viện bên thứ ba (jQuery, Swiper, ...) nạp qua CDN hoặc copy nguyên vào `public/assets/js/vendor/`, không bundle.
- `public/assets/css/` và `public/assets/js/` là file sinh ra, đã `.gitignore`.
- URL tài nguyên dùng đường dẫn tuyệt đối từ root (`/assets/...`). Xem bằng `pnpm preview`, đừng mở file HTML trực tiếp.
- Trang đặt trong `src/pages/` theo nhóm chức năng, `build.format: 'file'` nên `auth/login.astro` ra `auth/login.html`:
  `auth/`, `verification/`, `account/`, `spot/`, `system/`.

## Cạm bẫy

- **Không đặt `outDir` của Astro trỏ vào `../html`.** Astro xoá sạch `outDir` trước khi build và sẽ xoá luôn `.git`.
  Luôn đi qua `pnpm release` (`rsync --delete --exclude .git`).
- pnpm 11 coi build script bị bỏ qua là lỗi. `esbuild` đã được cho phép trong `pnpm-workspace.yaml`.
- Prettier 3 bỏ qua file trong `.gitignore`, mà `dist/` bị ignore, nên `format:dist` dùng `--ignore-path .prettierignore`.

## Checklist nghiệm thu skeleton

- [x] `pnpm install` sạch, `pnpm check` pass, `pnpm build` ra `dist/`.
- [x] Output đọc được: HTML đã format, CSS/JS không minify, tên file không hash, dạng `auth/login.html`.
- [x] Deterministic: build hai lần, `diff -r` giữa hai `dist/` rỗng.
- [x] Release an toàn: đồng bộ giữ nguyên repo đích, chạy lần hai không có thay đổi, từ chối thư mục sai.
- [x] Hai repo: danh tính commit cấp repo (`Hoang Doan <dev.hoangdoan@gmail.com>`), remote qua alias `github-devhoangdoan`.

Trang `auth/login` hiện chỉ là trang thử để kiểm chứng pipeline, sẽ thay bằng trang thật khi cắt giao diện.
