import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import presetWebFonts from '@unocss/preset-web-fonts';
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local';

/**
 * Đường dẫn tuyệt đối tính từ thư mục builder, không phụ thuộc thư mục đang chạy lệnh.
 * (Đường dẫn tương đối từng khiến extension VS Code ghi font ra thư mục cha khi mở workspace ở đó.)
 */
const fromBuilderRoot = (path: string) => fileURLToPath(new URL(`../${path}`, import.meta.url));

const binCacheDir = fromBuilderRoot('node_modules/.cache/unocss/fonts/bin');
mkdirSync(binCacheDir, { recursive: true });

const cachedFetch = (async (url: string) => {
  const hash = createHash('sha256').update(url).digest('hex');
  const cacheFile = join(binCacheDir, `${hash}.bin`);
  if (existsSync(cacheFile)) {
    return new Response(readFileSync(cacheFile));
  }
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = await res.arrayBuffer();
      writeFileSync(cacheFile, Buffer.from(buf));
      return new Response(buf);
    } catch (err) {
      if (attempt === 3) throw err;
      await new Promise((r) => setTimeout(r, 300 * attempt));
    }
  }
  throw new Error(`Failed to fetch font: ${url}`);
}) as any;

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
        { name: 'Hiragino Sans GB', provider: 'none' },
        { name: 'Hiragino Sans GB W3', provider: 'none' },
        { name: 'Noto Sans JP', weights: ['300', '400', '500', '600', '700'] },
        { name: 'sans-serif', provider: 'none' },
      ],
    },
    processors: createLocalFontProcessor({
      cacheDir: fromBuilderRoot('node_modules/.cache/unocss/fonts'),
      fontAssetsDir: fromBuilderRoot('public/assets/fonts'),
      fontServeBaseUrl: '/assets/fonts',
      fetch: cachedFetch,
    }),
  });

