import presetWebFonts from '@unocss/preset-web-fonts';
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local';

/**
 * Thiết kế dùng Hiragino Sans (W3/W5/W6/W7), font hệ thống của Apple.
 * - Máy Apple dùng đúng Hiragino Sans, trình duyệt không tải thêm font nào.
 * - Máy khác dùng Noto Sans JP, tải từ Google lúc build rồi lưu vào public/assets/fonts
 *   (lần build đầu hoặc sau khi xoá cache cần có mạng).
 * Weight: W3 = 400, W5 = 500, W6 = 600, W7 = 700.
 */
export const fontsPreset = () =>
  presetWebFonts({
    provider: 'google',
    fonts: {
      sans: [
        { name: 'Hiragino Sans', provider: 'none' },
        { name: 'Noto Sans JP', weights: ['400', '500', '600', '700'] },
        { name: 'sans-serif', provider: 'none' },
      ],
    },
    processors: createLocalFontProcessor({
      cacheDir: 'node_modules/.cache/unocss/fonts',
      fontAssetsDir: 'public/assets/fonts',
      fontServeBaseUrl: '/assets/fonts',
    }),
  });
