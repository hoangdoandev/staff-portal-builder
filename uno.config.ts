import { defineConfig, presetWind4, transformerDirectives, transformerVariantGroup } from 'unocss';
import { fontsPreset } from './uno/fonts';
import { shortcuts } from './uno/shortcuts';
import { breakpoint, colors, fontSizeVarsCss, leading, radius, shadow, text } from './uno/tokens';

// presetWind4 đã kèm reset trong preflight (box-sizing, margin...), không cần file reset riêng.
// CSS dùng @layer, @property, CSS variables và màu hiện đại, nhắm tới trình duyệt hiện đại.
export default defineConfig({
  presets: [presetWind4(), fontsPreset()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  shortcuts,
  // Bắt buộc có: plugin font chỉ sinh @font-face khi class font-sans xuất hiện.
  safelist: ['font-sans'],
  preflights: [{ layer: 'theme', getCSS: fontSizeVarsCss }],
  theme: { breakpoint, colors, radius, shadow, leading, text },
});
