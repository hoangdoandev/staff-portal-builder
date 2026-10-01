import { defineConfig, presetWind4, transformerDirectives, transformerVariantGroup } from 'unocss';

// presetWind4 đã kèm reset trong preflight (box-sizing, margin...), không cần file reset riêng.
// CSS dùng @layer, @property, CSS variables và màu hiện đại, nhắm tới trình duyệt hiện đại.
export default defineConfig({
  presets: [presetWind4()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  // Class ngữ nghĩa cho component lặp lại: BE sửa một chỗ trong CSS thay vì sửa nhiều class trong HTML.
  shortcuts: {
    'btn-primary':
      'inline-flex items-center justify-center rounded px-6 py-3 font-bold text-white bg-blue-600 hover:bg-blue-700',
  },
});
