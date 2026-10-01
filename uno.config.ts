import { defineConfig, presetWind3, transformerDirectives, transformerVariantGroup } from 'unocss';

// presetWind3: CSS dùng rgb()/rem thông thường, chạy tốt trên trình duyệt mobile cũ
// và output dễ đọc hơn so với wind4 (CSS variables, @layer, oklch).
export default defineConfig({
  presets: [presetWind3()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  // Class ngữ nghĩa cho component lặp lại: BE sửa một chỗ trong CSS thay vì sửa nhiều class trong HTML.
  shortcuts: {
    'btn-primary':
      'inline-flex items-center justify-center rounded px-6 py-3 font-bold text-white bg-blue-600 hover:bg-blue-700',
  },
});
