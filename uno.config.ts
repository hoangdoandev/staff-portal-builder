import { defineConfig, presetWind4, transformerDirectives, transformerVariantGroup } from 'unocss';
import { fontsPreset } from './uno/fonts';
import { shortcuts } from './uno/shortcuts';
import { breakpoint, colors, leading, radius, shadow, text } from './uno/tokens';
import { hoverOnPointerDevices } from './uno/variants';

// presetWind4 đã kèm reset trong preflight (box-sizing, margin...), không cần @unocss/reset.
// CSS dùng @layer, @property, CSS variables và màu hiện đại, nhắm tới trình duyệt hiện đại.
export default defineConfig({
  presets: [presetWind4(), fontsPreset()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  variants: [hoverOnPointerDevices],
  shortcuts,
  content: {
    // Script TS được tsc biên dịch riêng, không đi qua Vite, nên phải đọc trực tiếp từ đĩa (filesystem)
    // để class dùng trong script (classList.add...) vẫn sinh CSS. File đọc từ đĩa vẫn phải khớp
    // bộ lọc pipeline, mà bộ lọc mặc định không có .ts, nên khai báo lại cả .astro/.html.
    pipeline: { include: [/\.(astro|html)($|\?)/, /src\/scripts\/.+\.ts$/] },
    filesystem: ['src/scripts/**/*.ts'],
  },
  theme: { breakpoint, radius, shadow, leading, text },
  // Thay hẳn palette mặc định (gray-300, red-500...) bằng màu thiết kế.
  extendTheme: (theme) => ({ ...theme, colors }),
});
