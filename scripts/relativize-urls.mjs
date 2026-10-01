// Đổi URL nội bộ dạng tuyệt đối từ gốc ("/assets/...", "/evaluation/self.html", "/") trong dist/
// thành đường dẫn tương đối theo vị trí từng file, để mở thẳng file HTML bằng trình duyệt (file://) vẫn đúng.
// Source vẫn viết "/assets/..." cho dễ đọc; bước này chạy sau `astro build`, trước Prettier.
//   - HTML: thuộc tính href/src. "/" và đường dẫn kết thúc bằng "/" trỏ tới index.html.
//   - CSS: url(...) (ví dụ font trong fonts.css).
// Bỏ qua URL ngoài ("//cdn...", "https://..."), "#", "mailto:"... vì chúng không bắt đầu bằng một dấu "/".
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { posix } from 'node:path';

const distDir = 'dist';

/** Đường dẫn tương đối từ thư mục chứa `fromFile` tới `rootPath` (tính từ gốc dist). */
const toRelative = (fromFile, rootPath) => {
  const target = rootPath === '' || rootPath.endsWith('/') ? `${rootPath}index.html` : rootPath;
  const relative = posix.relative(posix.dirname(fromFile), target);
  return relative === '' ? posix.basename(target) : relative;
};

const htmlUrl = /(\s(?:href|src)=")\/(?!\/)([^"]*)"/g;
const cssUrl = /url\((['"]?)\/(?!\/)([^'")]*)\1\)/g;

const files = (await readdir(distDir, { recursive: true })).map((file) =>
  file.split('\\').join('/'),
);

for (const file of files) {
  const fullPath = posix.join(distDir, file);
  if (file.endsWith('.html')) {
    const html = await readFile(fullPath, 'utf8');
    await writeFile(
      fullPath,
      html.replace(htmlUrl, (_, attr, path) => `${attr}${toRelative(file, path)}"`),
    );
  } else if (file.endsWith('.css')) {
    const css = await readFile(fullPath, 'utf8');
    await writeFile(
      fullPath,
      css.replace(cssUrl, (_, quote, path) => `url(${quote}${toRelative(file, path)}${quote})`),
    );
  }
}
