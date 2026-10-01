/**
 * Class ngữ nghĩa cho thành phần lặp lại, kèm trạng thái hover/active/focus/vô hiệu/lỗi.
 * Thiết kế Figma chỉ có trạng thái mặc định, đang chọn và nút gửi vô hiệu; các trạng thái còn lại
 * do FE bổ sung theo phong cách thiết kế (phẳng, bo 4px, nhấn cam, link xanh).
 * Kích thước dùng px để khớp số đo Figma và CSS sinh ra dễ đọc (`height: 44px`).
 */
const focusRing = 'focus-visible:(outline-2 outline-offset-2 outline-secondary)';

export const shortcuts = {
  // Viền focus khi điều hướng bằng bàn phím, cho link/nút không dùng shortcut nào bên dưới.
  // (Không đặt tên bắt đầu bằng "focus-": UnoCSS hiểu thành biến thể focus: + utility.)
  focusable: focusRing,
  // Mục điều hướng trên header: icon trên, nhãn dưới. SP nhãn 10px đậm xám, PC 12px thường màu chữ chính.
  'header-nav-item': `flex flex-col items-center gap-1px whitespace-nowrap pb-6px pt-11px text-nav font-semibold text-ink-nav transition-opacity duration-150 hov:opacity-70 pc:(w-64px gap-4px pb-7px font-normal text-ink) ${focusRing}`,
  // Hộp icon cao 22px, căn giữa icon có kích thước khác nhau; làm mốc cho huy hiệu thông báo.
  'header-nav-icon': 'relative flex h-22px w-full items-center justify-center',
  // Link ở footer (cỡ chữ đặt trên ul để chiều cao dòng khớp thiết kế).
  'footer-link': `text-ink transition-colors duration-150 hov:underline ${focusRing}`,
  // Nhãn nền xám nhỏ (ví dụ "対象期間"): cao 18px ở SP, 22px ở PC.
  tag: 'flex h-18px w-fit items-center rounded-tag bg-surface-tag px-7px text-caption-sm text-ink pc:h-22px',
  // Huy hiệu số tròn đỏ: 16px ở SP, 18px ở PC.
  badge:
    'inline-flex size-16px items-center justify-center rounded-full bg-badge text-micro font-semibold text-white pc:size-18px',
  // Gốc chung của nút: cao 44px ở SP, 50px ở PC.
  btn: `inline-flex items-center justify-center rounded-base px-24px h-44px pc:h-50px text-title-card transition-colors duration-150 ${focusRing}`,
  // Nút chính: nền cam.
  'btn-primary':
    'btn bg-primary font-semibold text-white hov:bg-primary-hover active:bg-primary-active disabled:(bg-disabled cursor-not-allowed)',
  // Nút viền cam (ví dụ "保存").
  'btn-outline':
    'btn border border-primary bg-white text-primary hov:bg-primary-tint active:bg-primary-tint-active disabled:(border-disabled text-ink-disabled cursor-not-allowed)',
  // Link xanh.
  link: `text-secondary transition-colors duration-150 hov:(text-secondary-hover underline) ${focusRing}`,
  // Ô nhập, textarea. Lỗi: đặt aria-invalid="true" hoặc class is-error trên phần tử.
  field:
    'w-full rounded-base border border-line-soft bg-surface-field px-12px py-8px text-body leading-copy text-ink placeholder:text-ink-mute transition-colors duration-150 focus:(border-primary outline-none ring-2 ring-primary/20) aria-[invalid=true]:(border-danger-sub bg-danger-tint) [&.is-error]:(border-danger-sub bg-danger-tint)',
};
