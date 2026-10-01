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

| Nội dung                                                                                                                                        | Vị trí                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| **Giá trị** token: màu, cỡ chữ (SP và PC), bo góc, bóng, chiều cao dòng                                                                         | `src/styles/tokens.css` |
| Tên class ứng với từng token, breakpoint                                                                                                        | `uno/tokens.ts`         |
| Font (Hiragino Sans, dự phòng Noto Sans JP)                                                                                                     | `uno/fonts.ts`          |
| Class ngữ nghĩa và trạng thái: `btn`, `btn-primary`, `btn-outline`, `link`, `field`, `focusable`, `header-nav-*`, `footer-link`, `tag`, `badge` | `uno/shortcuts.ts`      |
| Biến thể `hov:` (hover chỉ trên thiết bị có chuột)                                                                                              | `uno/variants.ts`       |
| Ghép các phần trên                                                                                                                              | `uno.config.ts`         |

- **Đổi giá trị** (màu, cỡ chữ...): chỉ sửa `src/styles/tokens.css`. **Thêm token mới**: thêm biến vào `tokens.css`, rồi thêm
  tên vào danh sách tương ứng trong `uno/tokens.ts`. Tên biến không được trùng biến Wind4 tự sinh (`--colors-*`, `--radius-*`,
  `--shadow-*`, `--text-*`, `--leading-*`), nên token dùng `--color-*`, `--rounded-*`, `--box-shadow-*`, `--font-size-*`, `--line-height-*`.
- **Chỉ có màu thiết kế:** palette mặc định của Wind4 đã bị thay hẳn, `bg-gray-300` hay `text-red-500` không sinh CSS.
  Còn lại các màu cơ bản `white`, `black`, `transparent`, `current`, `inherit`.
- **Kích thước viết bằng px** khớp số đo Figma: `h-44px`, `px-24px`, `gap-12px` ra `height: 44px`... (không dùng thang `h-11`).
- **Breakpoint:** một điểm duy nhất `pc` = 768px (giả định, vì Figma chỉ có hai khung). Mobile-first: mặc định là SP,
  `pc:` áp dụng từ 768px, `lt-pc:` chỉ dưới 768px. Cỡ chữ đổi giá trị tại 768px ngay trong `tokens.css`,
  dùng qua class `text-body`, `text-title-page`...
- **Header SP:** bỏ phần trắng phía trên khung Figma (chỗ thanh trạng thái điện thoại).
- **Font:** `"Hiragino Sans", "Noto Sans JP", sans-serif`, đặt sẵn trên `<body>` (`font-sans`). Máy Apple dùng Hiragino Sans,
  máy khác dùng Noto Sans JP tải từ Google lúc build (lần build đầu hoặc sau khi xoá cache cần có mạng), lưu ở
  `public/assets/fonts/`. `@font-face` được tách riêng ra `assets/css/fonts.css` để `style.css` gọn.
  Weight: W3 = 400, W5 = 500, W6 = 600, W7 = 700.
- **Trạng thái hover, active, focus, lỗi** không có trong Figma: FE tự thêm theo phong cách thiết kế (các giá trị này ghi
  "ngoài thiết kế" trong `tokens.css`). Hover viết bằng `hov:` thay cho `hover:`. Lỗi: đặt `aria-invalid="true"` hoặc class `is-error`.
- **Độ tương phản theo thiết kế:** chữ trắng trên cam `#f57a38` khoảng 2.7:1, chữ `#f76862` trên nền trắng khoảng 3.2:1,
  thấp hơn chuẩn WCAG AA (4.5:1). Giữ nguyên theo thiết kế, nên báo designer.
- **CSS của Wind4** viết màu dạng `color-mix(in srgb, var(--color-primary) ...)` kèm khối `@supports` lặp lại với `oklab`.
  Đây là cách Wind4 sinh CSS: dài nhưng đúng, giá trị thật nằm ở các biến `--color-*`.

## Khung trang

- `src/layouts/BaseLayout.astro`: `<html>`, `<head>`, font, CSS. `<body>` là flex cột cao tối thiểu một màn hình (`min-h-dvh`).
- `src/layouts/PageLayout.astro`: header + `<main class="flex-1">` + footer. `main` giãn hết phần còn lại nên trang
  ít nội dung thì footer vẫn nằm sát đáy màn hình. Trang thường dùng layout này; trang không có header/footer dùng `BaseLayout`.
- `src/components/SiteHeader.astro`, `SiteFooter.astro`: header, footer chung (Figma PC 606:4688 / 606:4696, SP 606:3892 / 606:3878).
  SP chỉ hiện マイページ / お知らせ / メニュー. Nút メニュー chưa có hành vi vì Figma chưa có thiết kế menu.
- Component dùng chung dưới header: `Breadcrumb.astro` (chỉ PC), `PageTitle.astro` (tiêu đề + nút quay lại),
  `PageTabs.astro` (tab chuyển trang, tab hiện tại có `aria-current="page"`).

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

| Lệnh           | Tác dụng                                                                                                            |
| -------------- | ------------------------------------------------------------------------------------------------------------------- |
| `pnpm install` | Cài dependency                                                                                                      |
| `pnpm dev`     | Chạy song song `tsc --watch` và `astro dev` (http://localhost:4321); thêm `USE_POLLING=1` nếu chạy trong Docker/WSL |
| `pnpm check`   | `astro check` (kiểm tra kiểu cho .astro và .ts)                                                                     |
| `pnpm build`   | Biên dịch JS, build Astro (CSS qua tích hợp UnoCSS), tách `fonts.css`, format `dist/` bằng Prettier                 |
| `pnpm release` | check, build hai lần so sánh, rồi đồng bộ `dist/` sang `../html` (không commit)                                     |

## Quy trình bàn giao cho BE

1. `pnpm release` (script từ chối nếu `../html` không phải git repo hoặc không ở nhánh `develop`).
2. Sang `../html`, xem `git status` / `git diff`. Chỉ commit khi có thay đổi thật.
3. Commit message ghi SHA của repo này (ví dụ `build from builder@a1b2c3d`) rồi push.

BE copy output một lần, sau đó theo dõi diff của repo output và tự sửa vào source của họ. Vì vậy `dist/` phải ổn
định: cùng source cho đúng cùng output (script `release` kiểm tra bằng cách build hai lần).

## Quy ước để output đọc được và ổn định

- **CSS**: tích hợp `unocss/astro` (docs: https://unocss.dev/integrations/astro). Vite gộp CSS của UnoCSS và `tokens.css`
  thành một file tên cố định `assets/css/style.css` (`cssCodeSplit: false` + `assetFileNames` trong `astro.config.ts`).
  Component lặp lại dùng `shortcuts` (class ngữ nghĩa như `btn-primary`), layout nhỏ lẻ dùng utility.
- **Reset CSS**: `presetWind4` đã kèm reset trong `style.css`, không cần file reset riêng.
- **JS**: viết TypeScript trong `src/scripts/`, `tsc` biên dịch ra `public/assets/js/` (ES2019, ES module, giữ comment).
  Trong trang dùng `<script is:inline type="module" src="/assets/js/...">`.
  **Không dùng `<script>` thường trong `.astro`**: Astro sẽ bundle, đổi tên có hash và minify.
- **Không dùng `<style>` trong `.astro`**: Astro thêm `data-astro-cid-*` và class có hash vào HTML.
- Thư viện bên thứ ba (jQuery, Swiper, ...) nạp qua CDN hoặc copy nguyên vào `public/assets/js/vendor/`, không bundle.
- `public/assets/js/` và `public/assets/fonts/` là file sinh ra, đã `.gitignore`.
- URL tài nguyên dùng đường dẫn tuyệt đối từ root (`/assets/...`). Xem bằng `pnpm preview`, đừng mở file HTML trực tiếp.
- Trang đặt trong `src/pages/` theo nhóm chức năng, `build.format: 'file'` nên `auth/login.astro` ra `auth/login.html`.
  Nhóm thư mục sẽ chốt khi cắt trang thật.

## Cạm bẫy

- **Không đặt `outDir` của Astro trỏ vào `../html`.** Astro xoá sạch `outDir` trước khi build và sẽ xoá luôn `.git`.
  Luôn đi qua `pnpm release` (`rsync --delete --exclude .git`).
- pnpm 11 coi build script bị bỏ qua là lỗi. `esbuild` đã được cho phép trong `pnpm-workspace.yaml`.
- Prettier 3 bỏ qua file trong `.gitignore`, mà `dist/` bị ignore, nên `format:dist` dùng `--ignore-path .prettierignore`.
- Astro 7 có thể chạy `astro dev` dưới nền (khi chạy bằng agent hoặc tuỳ môi trường) rồi thoát mã 0. Vì vậy `pnpm dev`
  dùng `concurrently --kill-others-on-fail`: chỉ tắt hết khi có tiến trình lỗi, không tắt khi `astro dev` thoát mã 0.
  Dừng server nền bằng `pnpm exec astro dev stop`; không tắt server dev đang chạy mà bạn không biết của ai.
- Class viết trong script TS (`classList.add('...')`) chỉ sinh CSS nhờ `content` trong `uno.config.ts`: file đọc từ đĩa
  (`filesystem`) vẫn phải khớp bộ lọc `pipeline.include`. Khi `pnpm dev` đang chạy, **file TS mới tạo** chưa được theo dõi,
  cần khởi động lại; sửa file TS có sẵn thì CSS tự cập nhật.
- Đường dẫn trong `uno/fonts.ts` là tuyệt đối tính từ thư mục `builder`. Đừng đổi sang tương đối: công cụ nạp cấu hình từ
  thư mục khác (ví dụ extension UnoCSS của VS Code khi mở thư mục cha) sẽ ghi font và cache ra ngoài `builder`.

- `presetWind4` phải để `preflights.theme: true`. Chế độ mặc định chỉ ghi biến theme đang dùng theo thứ tự phát hiện class,
  mà Astro build các trang song song, nên thứ tự biến trong `:root` đổi giữa các lần build.
- Không đặt tên shortcut bắt đầu bằng tên biến thể (`focus-`, `hover-`...): UnoCSS hiểu `focus-ring` thành `focus:` + `ring`.

## Checklist nghiệm thu skeleton

- [x] `pnpm install` sạch, `pnpm check` pass, `pnpm build` ra `dist/`.
- [x] Output đọc được: HTML đã format, CSS/JS không minify, tên file không hash, dạng `auth/login.html`.
- [x] Deterministic: build hai lần, `diff -r` giữa hai `dist/` rỗng.
- [x] Release an toàn: đồng bộ giữ nguyên repo đích, chạy lần hai không có thay đổi, từ chối thư mục sai.
- [x] Hai repo: danh tính commit cấp repo (`Hoang Doan <dev.hoangdoan@gmail.com>`), remote qua alias `github-devhoangdoan`.

Trang `auth/login` hiện chỉ là trang thử để kiểm chứng pipeline, sẽ thay bằng trang thật khi cắt giao diện.
