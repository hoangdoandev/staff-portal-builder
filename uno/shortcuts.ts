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
  'footer-link': `text-ink transition-colors duration-150 hov:(underline text-12px) ${focusRing}`,
  // Nhãn nền xám nhỏ (ví dụ "対象期間"): cao 18px ở SP, 22px ở PC.
  tag: 'flex h-18px w-fit items-center rounded-tag bg-surface-tag px-7px text-caption-sm text-ink pc:h-22px',
  // Huy hiệu số tròn đỏ: 16px ở SP, 18px ở PC.
  badge:
    'inline-flex size-16px items-center justify-center rounded-full bg-badge text-micro font-semibold text-white pc:size-18px',
  // Nhãn trạng thái nhỏ bo 4px (ví dụ "自己評価入力済"); màu chữ và nền đặt kèm theo trạng thái. Cao 20px ở SP, 21px ở PC.
  chip: 'inline-flex h-20px items-center whitespace-nowrap rounded-base px-8px text-caption-sm font-semibold pc:h-21px',
  // Viên xám bo tròn (ví dụ "配点 20%（3項目 各6.7%）"): 12px ở SP, 13px ở PC.
  pill: 'inline-flex items-center rounded-pill bg-surface-pill px-8px py-2px text-caption',
  // Vòng tròn cam 24px đánh số tiêu chí.
  'step-number':
    'flex size-24px shrink-0 items-center justify-center rounded-full bg-primary text-step font-semibold text-white',
  // Ô chọn mức S〜D: đặt trên <span> ngay sau <input type="radio" class="peer sr-only">. Ô đang chọn nền cam chữ trắng.
  'rating-option': `flex h-53px cursor-pointer items-center justify-center rounded-base border border-line bg-white text-rating font-bold text-ink-sub transition-colors duration-150 hov:border-primary peer-checked:(border-primary bg-primary text-white) peer-focus-visible:(outline-2 outline-offset-2 outline-secondary)`,
  // <summary> của <details> không có mũi tên mặc định (list-none cho Chrome/Firefox, ::-webkit-details-marker cho Safari).
  // Viết ở đây vì class có "&" đặt trực tiếp trong .astro không được UnoCSS trích ra (bị mã hoá thành &amp;).
  'summary-plain': 'cursor-pointer list-none [&::-webkit-details-marker]:hidden',
  // Gốc chung của nút: cao 44px ở SP, 50px ở PC.
  btn: `inline-flex items-center justify-center rounded-base px-16px h-44px pc:h-50px text-title-card transition-colors duration-150 ${focusRing}`,
  // Nút chính: nền cam.
  'btn-primary':
    'btn bg-primary font-semibold text-white hov:bg-primary-hover active:bg-primary-active disabled:(bg-disabled cursor-not-allowed)',
  // Nút viền cam (ví dụ "保存").
  'btn-outline':
    'btn border border-primary bg-white text-primary hov:bg-primary-tint active:bg-primary-tint-active disabled:(border-disabled text-ink-disabled cursor-not-allowed)',
  // Link xanh.
  link: `text-secondary transition-colors duration-150 hov:(text-secondary-hover underline) ${focusRing}`,
  // Nút hiển thị ngày của DateField: nền trắng viền xám, cao 38px ở SP, 42px ở PC, icon lịch bên phải.
  'field-date': `flex h-38px w-full cursor-pointer items-center justify-between rounded-base border border-line bg-white px-10px text-left text-body text-ink transition-colors duration-150 focus-visible:(border-primary outline-none ring-2 ring-primary/20) pc:h-42px`,
  // Ô số giữa hai nút −/+ (NumberStepper): ẩn nút tăng giảm mặc định của trình duyệt.
  'stepper-input':
    'w-0 min-w-0 flex-1 bg-transparent text-center text-body text-ink outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
  // Checkbox 18px: chưa chọn viền xám, đã chọn nền xanh có dấu tick trắng.
  checkbox: `size-18px shrink-0 cursor-pointer appearance-none rounded-check border border-line bg-white bg-center bg-no-repeat transition-colors duration-150 checked:(border-secondary bg-secondary bg-[url(/assets/img/icon/icon-check.svg)]) ${focusRing}`,
  // Ô nhập, textarea (không có nút kéo giãn, như thiết kế). Lỗi: đặt aria-invalid="true" hoặc class is-error trên phần tử.
  field:
    'w-full resize-none rounded-base border border-line-soft bg-surface-field px-14px py-14px text-body leading-copy text-ink placeholder:text-ink-mute transition-colors duration-150 focus:(border-primary outline-none ring-2 ring-primary/20) aria-[invalid=true]:(border-danger-sub bg-danger-tint) [&.is-error]:(border-danger-sub bg-danger-tint)',
};
