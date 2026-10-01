#!/usr/bin/env bash
# Build dist/ rồi đồng bộ sang repo output (sunnylife-spot_html) trên nhánh feature trùng tên nhánh builder.
# Không commit, không push, không merge: người chạy tự xem diff, commit rồi mở PR (base develop) cho BE review.
#
# Biến môi trường:
#   RELEASE_TARGET  thư mục repo output (mặc định ../html)
#   RELEASE_BASE    nhánh gốc để tạo nhánh mới ở repo output (mặc định origin/develop).
#                   Đặt thành nhánh feature khác (ví dụ origin/feat/xxx) khi PR trước chưa merge (PR xếp chồng).
set -euo pipefail

cd "$(dirname "$0")/.."

TARGET="${RELEASE_TARGET:-../html}"
BASE="${RELEASE_BASE:-origin/develop}"

# rsync --delete xoá mọi thứ không có trong dist/, nên phải chắc đúng thư mục đích.
if [ ! -d "$TARGET/.git" ]; then
  echo "ERROR: '$TARGET' không phải git repo (không có .git). Dừng để tránh xoá nhầm." >&2
  exit 1
fi

branch="$(git rev-parse --abbrev-ref HEAD)"
case "$branch" in
  main | develop | HEAD)
    echo "ERROR: builder đang ở '$branch'. Chuyển sang nhánh feature (ví dụ feat/ten-man) rồi chạy lại." >&2
    exit 1
    ;;
esac

if [ -n "$(git -C "$TARGET" status --porcelain)" ]; then
  echo "ERROR: '$TARGET' còn thay đổi chưa commit. Commit hoặc dọn trước khi release." >&2
  exit 1
fi

echo "==> Chuẩn bị nhánh '$branch' ở $TARGET"
git -C "$TARGET" fetch --quiet origin
if git -C "$TARGET" show-ref --verify --quiet "refs/heads/$branch" ||
  git -C "$TARGET" show-ref --verify --quiet "refs/remotes/origin/$branch"; then
  # Nhánh đã có (lần release trước): chuyển sang, giữ lịch sử commit cũ.
  git -C "$TARGET" switch --quiet "$branch"
else
  git -C "$TARGET" switch --quiet --no-track -c "$branch" "$BASE"
  echo "    tạo mới từ $BASE"
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
# File do repo html tự quản lý (quy tắc, .gitignore): không ghi đè, không xoá.
rsync -a --delete \
  --exclude '.git' --exclude '.gitignore' --exclude 'AGENTS.md' --exclude 'CLAUDE.md' --exclude '.DS_Store' \
  dist/ "$TARGET/"

echo "==> Thay đổi ở $TARGET (nhánh $branch):"
git -C "$TARGET" status --short
if [ -z "$(git -C "$TARGET" status --porcelain)" ]; then
  echo "(không có thay đổi, không cần commit)"
else
  echo "Tiếp theo: commit 'build: ... (builder@$(git rev-parse --short HEAD))', push nhánh, mở PR base ${BASE#origin/} (nếu nhánh mới tạo lần này)."
  echo "Không tự merge PR bên html: BE review rồi merge."
fi
