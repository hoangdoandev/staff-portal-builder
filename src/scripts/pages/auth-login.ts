/**
 * Trang login: bật/tắt hiển thị mật khẩu.
 * Markup cần có: input[data-password-input] và button[data-password-toggle].
 * Script thường (không phải module) để chạy được cả khi mở file HTML trực tiếp; bọc IIFE để biến không lọt ra global.
 */
(() => {
  const input = document.querySelector<HTMLInputElement>('[data-password-input]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-password-toggle]');

  if (input && toggle) {
    toggle.addEventListener('click', () => {
      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      toggle.textContent = isHidden ? 'パスワードを隠す' : 'パスワードを表示';
    });
  }
})();
