/**
 * Ô chọn ngày (component DateField): bấm nút mở bảng chọn ngày của <input type="date"> ẩn,
 * chọn xong thì cập nhật chữ hiển thị sang dạng yyyy/mm/dd.
 */
(() => {
  document.querySelectorAll<HTMLElement>('[data-date-field]').forEach((wrapper) => {
    const input = wrapper.querySelector<HTMLInputElement>('input[type="date"]');
    const button = wrapper.querySelector<HTMLButtonElement>('button');
    const text = wrapper.querySelector<HTMLElement>('[data-date-field-text]');
    if (!input || !button || !text) return;

    button.addEventListener('click', () => {
      input.showPicker();
    });
    input.addEventListener('change', () => {
      text.textContent = input.value.replace(/-/g, '/');
    });
  });
})();
