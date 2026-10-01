import { fileURLToPath } from 'node:url';
import { defineConfig, presetWind4, transformerDirectives, transformerVariantGroup } from 'unocss';
import { fontsPreset } from './uno/fonts';
import { shortcuts } from './uno/shortcuts';
import { breakpoint, colors, leading, radius, shadow, text } from './uno/tokens';
import { hoverOnPointerDevices } from './uno/variants';

// presetWind4 đã kèm reset trong preflight (box-sizing, margin...), không cần @unocss/reset.
// CSS dùng @layer, @property, CSS variables và màu hiện đại, nhắm tới trình duyệt hiện đại.
export default defineConfig({
  // theme: true ghi toàn bộ biến theme (--colors-*, --text-*...) theo thứ tự khai báo. Mặc định 'on-demand' chỉ ghi
  // biến đang dùng, theo thứ tự phát hiện class; Astro xử lý các trang song song nên thứ tự đó đổi giữa các lần build
  // và style.css không ổn định. Ghi đủ còn giúp khối :root không đổi khi một màn dùng thêm token.
  presets: [presetWind4({ preflights: { theme: true } }), fontsPreset()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  variants: [hoverOnPointerDevices],
  shortcuts,
  // Các file trong uno/ mà config import: đổi file nào cũng nạp lại config khi `pnpm dev` đang chạy.
  // Thiếu dòng này thì sửa shortcut/token xong, dev server vẫn sinh CSS theo bản cũ cho tới khi khởi động lại.
  configDeps: ['fonts', 'shortcuts', 'tokens', 'variants'].map((name) =>
    fileURLToPath(new URL(`./uno/${name}.ts`, import.meta.url)),
  ),
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
