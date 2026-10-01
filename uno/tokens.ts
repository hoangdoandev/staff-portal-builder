/**
 * Token thiết kế lấy từ Figma "Kawashima HR - Staff Portal" (khung PC 1366px, SP 390px).
 * Giữ nguyên giá trị theo thiết kế, chỉ đặt tên ngữ nghĩa. Giá trị ghi "ngoài thiết kế"
 * là trạng thái hover/active do FE bổ sung vì Figma không có.
 */

/** Điểm chuyển SP -> PC. Figma chỉ có hai khung nên 768px là giả định (gần trung điểm 390 và 1366). */
export const breakpoint = { pc: '768px' } as const;

type ColorGroups = Readonly<Record<string, string | Readonly<Record<string, string>>>>;

/**
 * Làm phẳng nhóm màu thành khoá một cấp: `primary.hover` -> `primary-hover`, `DEFAULT` -> tên nhóm.
 * Nhờ vậy biến CSS sinh ra gọn (`--colors-primary`, `--colors-primary-hover`), không có đuôi `DEFAULT`.
 */
const flattenColors = (groups: ColorGroups): Record<string, string> =>
  Object.fromEntries(
    Object.entries(groups).flatMap(([name, value]) =>
      typeof value === 'string'
        ? [[name, value]]
        : Object.entries(value).map(([key, hex]) => [
            key === 'DEFAULT' ? name : `${name}-${key}`,
            hex,
          ]),
    ),
  );

const colorGroups = {
  // Hai biến duy nhất có trong Figma
  primary: {
    DEFAULT: '#f57a38',
    hover: '#e86a28', // ngoài thiết kế
    active: '#d55e20', // ngoài thiết kế
    tint: '#fff6f2', // nền khung tiêu chí đang chọn, hover nút viền
    'tint-active': '#ffe9dd', // ngoài thiết kế
  },
  secondary: {
    DEFAULT: '#3b8eff', // link, checkbox
    hover: '#2a78e4', // ngoài thiết kế
  },
  // Chữ
  ink: {
    DEFAULT: '#333333',
    sub: '#666666',
    mute: '#999999',
    disabled: '#b2b2b2',
    nav: '#878787', // nhãn nav ở SP
    faint: '#aeaeae', // bản quyền ở SP
  },
  // Viền và đường kẻ
  line: {
    DEFAULT: '#d1d1d1', // viền thẻ, nút chọn
    soft: '#e6e6e6', // viền textarea
    hair: '#f0f0f0', // đường kẻ phân cách 1px
  },
  // Nền
  surface: {
    tag: '#f2f2f2',
    pill: '#f0f0f0',
    field: '#f7f7f7', // nền textarea
    track: '#ececec', // nền thanh tiến độ
    breadcrumb: '#efefef',
    title: '#f9f9f9', // thanh tiêu đề trang
    footer: '#fcfcfc',
  },
  // Trạng thái
  danger: { DEFAULT: '#ff4a4a', sub: '#f76862', tint: '#fef6f5' },
  success: { DEFAULT: '#00af0d', tint: '#ecf8ec' },
  warning: { DEFAULT: '#f39515', tint: '#fff9f1' },
  info: { DEFAULT: '#556984', tint: '#f3f8fe', key: '#5a80b4' },
  disabled: '#c4c4c4', // nền nút gửi vô hiệu
  badge: '#ff0000', // huy hiệu số thông báo
} as const satisfies ColorGroups;

export const colors = flattenColors(colorGroups);

export const radius = {
  tag: '2px',
  base: '4px', // thẻ, nút, ô nhập
  bar: '6px', // thanh tiến độ
  pill: '21px', // viên thuốc "配点"
} as const;

export const shadow = {
  header: '0 0 2px rgba(0, 0, 0, 0.15)', // header SP
  title: '0 2px 2px rgba(0, 0, 0, 0.05)', // thanh tiêu đề trang
  bar: '0 -3px 3px rgba(0, 0, 0, 0.05)', // thanh hành động dính đáy
} as const;

export const leading = {
  copy: '1.55', // đoạn nhiều dòng
  tight: '1.33',
} as const;

/** Cỡ chữ (px): `sp` dưới breakpoint, `pc` từ breakpoint trở lên. */
export const typeScale = {
  'title-period': { sp: 16, pc: 20 },
  'title-page': { sp: 15, pc: 18 },
  'title-section': { sp: 14, pc: 17 },
  'title-card': { sp: 15, pc: 16 }, // tiêu đề thẻ, chữ trong nút
  total: { sp: 14, pc: 18 }, // "総合 19点・D"
  body: { sp: 14, pc: 15 },
  'body-sm': { sp: 13, pc: 14 },
  caption: { sp: 12, pc: 13 },
  'caption-sm': { sp: 11, pc: 12 }, // tag, chip, footer
  nav: { sp: 10, pc: 12 }, // nhãn icon header
  micro: { sp: 10, pc: 11 }, // số trong huy hiệu
} as const;

type TypeName = keyof typeof typeScale;

const typeNames = Object.keys(typeScale) as TypeName[];

/**
 * Ánh xạ tên cỡ chữ sang biến CSS, dùng cho `theme.text` của UnoCSS.
 * `lineHeight: normal` theo thiết kế (`leading-[normal]`); đoạn nhiều dòng thêm class `leading-copy`.
 */
export const text = Object.fromEntries(
  typeNames.map((name) => [name, { fontSize: `var(--font-size-${name})`, lineHeight: 'normal' }]),
);

const fontSizeVars = (viewport: 'sp' | 'pc') =>
  typeNames.map((name) => `--font-size-${name}: ${typeScale[name][viewport]}px;`).join('\n  ');

/** Biến CSS cỡ chữ: giá trị SP mặc định, PC ghi đè từ breakpoint. */
export const fontSizeVarsCss = () => `:root {
  ${fontSizeVars('sp')}
}
@media (min-width: ${breakpoint.pc}) {
  :root {
    ${fontSizeVars('pc')}
  }
}`;
