/**
 * Nút − / + của ô nhập số (component NumberStepper).
 * Markup: <div data-stepper> chứa <input type="number" min max> và các <button data-stepper-step="-1|1">.
 * Giá trị mới bị giới hạn trong min〜max; phát sự kiện input và change như khi người dùng tự gõ.
 */
(() => {
  document.querySelectorAll<HTMLElement>('[data-stepper]').forEach((stepper) => {
    const input = stepper.querySelector<HTMLInputElement>('input[type="number"]');
    if (!input) return;

    stepper.querySelectorAll<HTMLButtonElement>('[data-stepper-step]').forEach((button) => {
      button.addEventListener('click', () => {
        const step = Number(button.dataset['stepperStep']);
        const min = input.min === '' ? -Infinity : Number(input.min);
        const max = input.max === '' ? Infinity : Number(input.max);
        const current = Number.isNaN(input.valueAsNumber) ? min : input.valueAsNumber;
        const next = Math.min(max, Math.max(min, current + step));
        if (next === input.valueAsNumber) return;

        input.value = String(next);
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
    });
  });
})();
