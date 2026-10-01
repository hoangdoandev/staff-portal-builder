/**
 * Giữ thư mục `src/scripts/` luôn có ít nhất một đầu vào cho `tsc` (tsconfig.scripts.json),
 * nếu không `tsc` báo lỗi TS18003 khi chưa có script nào. File khai báo này không sinh ra JS.
 * Script trang viết ở `src/scripts/pages/*.ts`; xoá file này nếu không còn cần.
 */
