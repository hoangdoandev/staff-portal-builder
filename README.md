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

## Trình duyệt hỗ trợ

Nhắm tới trình duyệt hiện đại (Chrome, Safari, Edge, Firefox bản mới; iOS Safari và Android Chrome).
`presetWind4` sinh CSS dùng `@layer`, `@property` và màu hiện đại, JS là ES2019 dạng ES module nên IE11 không được hỗ trợ.
Hỗ trợ trình duyệt cũ hơn sẽ làm output khó đọc hơn, chỉ làm khi có yêu cầu cụ thể từ phía Sunnylife.

## Hệ thống style (từ Figma)

Nguồn: Figma "Kawashima HR - Staff Portal" (khung PC 1366px, SP 390px). Giữ nguyên giá trị theo thiết kế.

| Nội dung                                                                     | Vị trí             |
| ---------------------------------------------------------------------------- | ------------------ |
| Màu, bo góc, bóng, cỡ chữ (PC và SP), breakpoint                             | `uno/tokens.ts`    |
| Font (Hiragino Sans, dự phòng Noto Sans JP)                                  | `uno/fonts.ts`     |
| Class ngữ nghĩa và trạng thái: `btn-primary`, `btn-outline`, `link`, `field` | `uno/shortcuts.ts` |
| Ghép các phần trên                                                           | `uno.config.ts`    |

- **Breakpoint:** một điểm duy nhất `pc` = 768px (giả định, vì Figma chỉ có hai khung). Mobile-first: mặc định là SP,
  tiền tố `pc:` áp dụng từ 768px (ví dụ `pc:h-12.5`). Cỡ chữ là biến CSS `--font-size-*` đổi giá trị tại 768px,
  dùng qua class `text-body`, `text-title-page`...
- **Header SP:** bỏ phần trắng phía trên khung Figma (chỗ thanh trạng thái điện thoại).
- **Font:** `"Hiragino Sans", "Noto Sans JP", sans-serif`. Máy Apple dùng Hiragino Sans, máy khác dùng Noto Sans JP tải từ
  Google lúc build (lần build đầu hoặc sau khi xoá cache cần có mạng), lưu ở `public/assets/fonts/`.
  `@font-face` được tách riêng ra `assets/css/fonts.css` để `style.css` gọn. Weight: W3 = 400, W5 = 500, W6 = 600, W7 = 700.
- **Trạng thái hover, active, focus, lỗi** không có trong Figma: FE tự thêm theo phong cách thiết kế (các giá trị này ghi
  "ngoài thiết kế" trong `uno/tokens.ts`). Hover chỉ áp dụng trên thiết bị có chuột. Lỗi: đặt `aria-invalid="true"` hoặc class `is-error`.
- **Độ tương phản theo thiết kế:** chữ trắng trên cam `#f57a38` khoảng 2.7:1, chữ `#f76862` trên nền trắng khoảng 3.2:1,
  thấp hơn chuẩn WCAG AA (4.5:1). Giữ nguyên theo thiết kế, nên báo designer.
- **CSS của Wind4** viết màu dạng `color-mix(in srgb, var(--colors-primary) ...)` kèm khối `@supports` lặp lại với `oklab`.
  Đây là cách Wind4 sinh CSS: dài nhưng đúng. Giá trị màu thật nằm ở các biến `--colors-*` trong `style.css`.

## Ảnh và icon

Đặt trong `public/assets/img/`. Astro copy nguyên sang `dist/assets/img/`, không đổi tên, không xử lý:

```
public/assets/img/
├── common/          logo, ảnh dùng chung nhiều trang
├── icon/            icon SVG (search, bell, menu, chevron, help, add, remove, calendar...)
└── <nhóm trang>/    ảnh riêng của từng nhóm trang
```

- Tên file kebab-case, chỉ ASCII: `icon-search.svg`, không dùng tên tiếng Nhật hay có dấu cách (như `グループ 7.svg`).
- Trong trang dùng đường dẫn tuyệt đối: `/assets/img/icon/icon-search.svg`.
- **Không đặt ảnh trong `src/`**: Astro sẽ xử lý và đổi tên có hash.
- Thư mục này được commit (khác với `css/`, `js/`, `fonts/` là file sinh ra).

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
- **Reset CSS**: `presetWind4` đã kèm reset trong `style.css`, không cần file reset riêng.
- **JS**: viết TypeScript trong `src/scripts/`, `tsc` biên dịch ra `public/assets/js/` (ES2019, ES module, giữ comment).
  Trong trang dùng `<script is:inline type="module" src="/assets/js/...">`.
  **Không dùng `<script>` thường trong `.astro`**: Astro sẽ bundle, đổi tên có hash và minify.
- **Không dùng `<style>` trong `.astro`**: Astro thêm `data-astro-cid-*` và class có hash vào HTML.
- Thư viện bên thứ ba (jQuery, Swiper, ...) nạp qua CDN hoặc copy nguyên vào `public/assets/js/vendor/`, không bundle.
- `public/assets/css/`, `public/assets/js/` và `public/assets/fonts/` là file sinh ra, đã `.gitignore`.
- URL tài nguyên dùng đường dẫn tuyệt đối từ root (`/assets/...`). Xem bằng `pnpm preview`, đừng mở file HTML trực tiếp.
- Trang đặt trong `src/pages/` theo nhóm chức năng, `build.format: 'file'` nên `auth/login.astro` ra `auth/login.html`.
  Nhóm thư mục sẽ chốt khi cắt trang thật.

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
