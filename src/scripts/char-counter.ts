/**
 * Đếm ký tự cho ô nhập có giới hạn (ví dụ コメント "31/500").
 * Markup: <textarea maxlength="500" data-char-count="<id của phần tử hiện số>"> và <span id="<id>">.
 * Script thường (không phải module) để chạy được cả khi mở file HTML trực tiếp; bọc IIFE để biến không lọt ra global.
 */
(() => {
  document.querySelectorAll<HTMLTextAreaElement>('textarea[data-char-count]').forEach((field) => {
    const output = document.getElementById(field.dataset['charCount'] ?? '');
    if (!output) return;

    const update = () => {
      output.textContent = `${field.value.length}/${field.maxLength}`;
    };
    field.addEventListener('input', update);
    update();
  });
})();
