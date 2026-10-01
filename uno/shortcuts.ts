/**
 * Class ngữ nghĩa cho thành phần lặp lại, kèm trạng thái hover/active/focus/vô hiệu/lỗi.
 * Thiết kế Figma chỉ có trạng thái mặc định, đang chọn và nút gửi vô hiệu; các trạng thái còn lại
 * do FE bổ sung theo phong cách thiết kế (phẳng, bo 4px, nhấn cam, link xanh).
 */
// Hover chỉ áp dụng trên thiết bị có chuột, tránh bị kẹt sau khi chạm trên cảm ứng.
const hover = '[@media(hover:hover)]:hover';
const focusRing = 'focus-visible:(outline-2 outline-offset-2 outline-secondary)';
const transition = 'transition-colors duration-150';

export const shortcuts = {
  // Nút chính: nền cam. Cao 44px ở SP, 50px ở PC.
  'btn-primary': `inline-flex items-center justify-center rounded-base bg-primary px-6 h-11 pc:h-12.5 text-title-card font-semibold text-white ${transition} ${hover}:bg-primary-hover active:bg-primary-active ${focusRing} disabled:(bg-disabled cursor-not-allowed)`,
  // Nút viền cam (ví dụ "保存")
  'btn-outline': `inline-flex items-center justify-center rounded-base border border-primary bg-white px-6 h-11 pc:h-12.5 text-title-card text-primary ${transition} ${hover}:bg-primary-tint active:bg-primary-tint-active ${focusRing} disabled:(border-disabled text-ink-disabled cursor-not-allowed)`,
  // Link xanh
  link: `text-secondary ${transition} ${hover}:(text-secondary-hover underline) ${focusRing}`,
  // Ô nhập, textarea. Lỗi: đặt aria-invalid="true" hoặc class is-error trên phần tử.
  field: `w-full rounded-base border border-line-soft bg-surface-field px-3 py-2 text-body leading-copy text-ink placeholder:text-ink-mute ${transition} focus:(border-primary outline-none ring-2 ring-primary/20) [&[aria-invalid=true]]:border-danger-sub [&[aria-invalid=true]]:bg-danger-tint [&.is-error]:(border-danger-sub bg-danger-tint)`,
};
