import type { Variant } from 'unocss';

/**
 * `hov:` = `:hover` nhưng chỉ trên thiết bị có chuột (`@media (hover: hover)`),
 * tránh trạng thái hover bị kẹt sau khi chạm trên màn hình cảm ứng.
 * Ví dụ: `hov:bg-primary-hover`, `hov:(text-secondary-hover underline)`.
 */
export const hoverOnPointerDevices: Variant = {
  name: 'hov',
  match(matcher) {
    if (!matcher.startsWith('hov:')) return matcher;
    return {
      matcher: matcher.slice('hov:'.length),
      selector: (selector) => `${selector}:hover`,
      parent: '@media (hover: hover)',
    };
  },
};
