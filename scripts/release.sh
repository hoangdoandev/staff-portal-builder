#!/usr/bin/env bash
# Build dist/ rồi đồng bộ sang repo output (nhánh develop của sunnylife-spot_html).
# Không commit và không push: người chạy tự xem diff rồi commit.
#
# Biến môi trường:
#   RELEASE_TARGET  thư mục repo output   (mặc định ../html)
#   RELEASE_BRANCH  nhánh bắt buộc đang checkout ở repo output (mặc định develop)
set -euo pipefail

cd "$(dirname "$0")/.."

TARGET="${RELEASE_TARGET:-../html}"
EXPECTED_BRANCH="${RELEASE_BRANCH:-develop}"

# rsync --delete xoá mọi thứ không có trong dist/, nên phải chắc đúng thư mục đích.
if [ ! -d "$TARGET/.git" ]; then
  echo "ERROR: '$TARGET' không phải git repo (không có .git). Dừng để tránh xoá nhầm." >&2
  exit 1
fi

current_branch="$(git -C "$TARGET" rev-parse --abbrev-ref HEAD)"
if [ "$current_branch" != "$EXPECTED_BRANCH" ]; then
  echo "ERROR: '$TARGET' đang ở nhánh '$current_branch', cần '$EXPECTED_BRANCH'." >&2
  exit 1
fi

echo "==> Kiểm tra kiểu (astro check)"
pnpm check

echo "==> Build lần 1"
pnpm build

snapshot="$(mktemp -d)"
trap 'rm -rf "$snapshot"' EXIT
cp -R dist/. "$snapshot/"

echo "==> Build lần 2 và so sánh (output phải giống hệt nhau)"
pnpm build
if ! diff -r "$snapshot" dist; then
  echo "ERROR: build không deterministic, hai lần build cho kết quả khác nhau." >&2
  exit 1
fi

echo "==> Đồng bộ dist/ -> $TARGET (giữ nguyên .git)"
rsync -a --delete --exclude '.git' --exclude '.DS_Store' dist/ "$TARGET/"

echo "==> Thay đổi ở $TARGET:"
git -C "$TARGET" status --short
if [ -z "$(git -C "$TARGET" status --porcelain)" ]; then
  echo "(không có thay đổi, không cần commit)"
fi
