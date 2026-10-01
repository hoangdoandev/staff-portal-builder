import { defineConfig } from 'astro/config';
import UnoCSS from 'unocss/astro';

// Mục tiêu: dist/ phải đọc được, ổn định giữa các lần build để BE theo dõi diff.
// - format 'file': auth/login.astro -> auth/login.html (không tạo thư mục index.html)
// - compressHTML false + Prettier chạy sau build (pnpm format:dist)
// - CSS: tích hợp UnoCSS, gộp một file tên cố định assets/css/style.css (không hash)
// - JS: tsc ghi vào public/assets/js/, Astro chỉ copy nguyên (script do Astro bó sẽ có hash trong tên)
export default defineConfig({
  output: 'static',
  compressHTML: false,
  build: {
    format: 'file',
    inlineStylesheets: 'never',
  },
  devToolbar: { enabled: false },
  integrations: [UnoCSS()],
  vite: {
    server: {
      // Chỉ cần khi chạy trong Docker/WSL/ổ mạng: USE_POLLING=1 pnpm dev
      watch: { usePolling: Boolean(process.env.USE_POLLING) },
    },
    build: {
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) =>
            (assetInfo.names?.[0] ?? '').endsWith('.css')
              ? 'assets/css/style.css'
              : '_astro/[name].[hash][extname]',
        },
      },
    },
  },
});
