// Tách hàng trăm khối @font-face (do plugin web fonts sinh) khỏi dist/assets/css/style.css
// sang dist/assets/css/fonts.css, để style.css gọn và BE đọc được. Chạy sau `astro build`.
import { readFile, writeFile } from 'node:fs/promises';

const styleCssPath = 'dist/assets/css/style.css';
const fontsCssPath = 'dist/assets/css/fonts.css';
const fontFaceBlock = /@font-face\s*\{[^}]*\}\s*/g;

const css = await readFile(styleCssPath, 'utf8');
const fontFaces = css.match(fontFaceBlock) ?? [];

if (fontFaces.length === 0) {
  throw new Error(
    `Không thấy @font-face trong ${styleCssPath}. Kiểm tra class font-sans trong BaseLayout.astro.`,
  );
}

await writeFile(fontsCssPath, fontFaces.join(''));
await writeFile(styleCssPath, css.replace(fontFaceBlock, ''));
