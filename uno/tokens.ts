/**
 * Ánh xạ tên class UnoCSS sang biến CSS trong `src/styles/tokens.css`.
 * File này chỉ chứa TÊN; giá trị (màu, cỡ chữ, bo góc...) nằm ở tokens.css để BE đọc và sửa một chỗ.
 * Thêm token mới: khai báo biến trong tokens.css rồi thêm tên vào danh sách tương ứng dưới đây.
 */

/** Điểm chuyển SP -> PC. Figma chỉ có hai khung nên 768px là giả định. Trùng với media query trong tokens.css. */
export const breakpoint = { pc: '768px' } as const;

const cssVars = <const Name extends string>(prefix: string, names: readonly Name[]) =>
  Object.fromEntries(names.map((name) => [name, `var(--${prefix}-${name})`])) as Record<
    Name,
    string
  >;

/**
 * Bảng màu thay hoàn toàn palette mặc định của Wind4: chỉ dùng được màu thiết kế,
 * cộng vài màu cơ bản. `bg-gray-300`, `text-red-500`... sẽ không sinh CSS.
 */
export const colors = {
  inherit: 'inherit',
  current: 'currentColor',
  transparent: 'transparent',
  black: '#000',
  white: '#fff',
  ...cssVars('color', [
    'primary',
    'primary-hover',
    'primary-active',
    'primary-tint',
    'primary-tint-active',
    'secondary',
    'secondary-hover',
    'ink',
    'ink-sub',
    'ink-mute',
    'ink-disabled',
    'ink-nav',
    'ink-faint',
    'line',
    'line-soft',
    'line-hair',
    'surface-tag',
    'surface-pill',
    'surface-field',
    'surface-track',
    'surface-breadcrumb',
    'surface-title',
    'surface-footer',
    'danger',
    'danger-sub',
    'danger-tint',
    'success',
    'success-tint',
    'warning',
    'warning-tint',
    'info',
    'info-tint',
    'info-key',
    'disabled',
    'badge',
  ]),
};

export const radius = cssVars('rounded', ['tag', 'base', 'bar', 'pill']);

export const shadow = cssVars('box-shadow', ['header', 'title', 'bar']);

export const leading = cssVars('line-height', ['copy', 'tight']);

/** Cỡ chữ đổi giá trị SP/PC ngay trong tokens.css. `lineHeight: normal` theo thiết kế; đoạn nhiều dòng thêm `leading-copy`. */
export const text = Object.fromEntries(
  [
    'title-period',
    'title-page',
    'title-section',
    'title-card',
    'total',
    'body',
    'body-sm',
    'caption',
    'caption-sm',
    'footer-link',
    'nav',
    'micro',
  ].map((name) => [name, { fontSize: `var(--font-size-${name})`, lineHeight: 'normal' }]),
);
