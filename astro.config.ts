import { defineConfig } from 'astro/config';

// Mục tiêu: dist/ phải đọc được, ổn định giữa các lần build để BE theo dõi diff.
// - format 'file': auth/login.astro -> auth/login.html (không tạo thư mục index.html)
// - compressHTML false + Prettier chạy sau build (pnpm format:dist)
// - CSS/JS không đi qua Vite: UnoCSS CLI và tsc ghi vào public/assets/, Astro chỉ copy nguyên.
export default defineConfig({
  output: 'static',
  compressHTML: false,
  build: {
    format: 'file',
    inlineStylesheets: 'never',
  },
  devToolbar: { enabled: false },
});
