// Tách khối "/* layer: fonts */" (hàng trăm @font-face do plugin web fonts sinh ra) khỏi
// style.css sang fonts.css, để style.css gọn và BE đọc được.
import { readFile, writeFile } from 'node:fs/promises';

const styleCssPath = 'public/assets/css/style.css';
const fontsCssPath = 'public/assets/css/fonts.css';
const layerMarker = '/* layer: fonts */';
const anyLayerMarker = '/* layer: ';

const css = await readFile(styleCssPath, 'utf8');

const start = css.indexOf(layerMarker);
if (start === -1) {
  throw new Error(
    `Không thấy "${layerMarker}" trong ${styleCssPath}. Kiểm tra safelist font-sans trong uno.config.ts.`,
  );
}

const nextLayer = css.indexOf(anyLayerMarker, start + layerMarker.length);
const end = nextLayer === -1 ? css.length : nextLayer;

await writeFile(fontsCssPath, css.slice(start, end));
await writeFile(styleCssPath, css.slice(0, start) + css.slice(end));
