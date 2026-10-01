/**
 * Mở/đóng menu header (component SiteMenu).
 * Markup: nút [data-site-menu-toggle][aria-controls=<id menu>], menu [data-site-menu] có sẵn thuộc tính inert.
 * Menu là fixed, mép trên đặt bằng mép dưới header tại lúc mở (header không dính khi cuộn).
 * Khi mở: khoá cuộn trang, focus mục đầu tiên. Đóng bằng nút, phím Esc hoặc bấm nền mờ (PC); trả focus về nút.
 */
(() => {
  const toggle = document.querySelector<HTMLButtonElement>('[data-site-menu-toggle]');
  const menu = document.getElementById(toggle?.getAttribute('aria-controls') ?? '');
  const header = toggle?.closest('header');
  if (!toggle || !menu || !header) return;

  const root = document.documentElement;

  const setOpen = (open: boolean) => {
    if (open) {
      menu.style.top = `${Math.max(0, header.getBoundingClientRect().bottom)}px`;
      menu.inert = false;
      menu.setAttribute('data-open', '');
      root.style.overflow = 'hidden';
      menu.querySelector<HTMLElement>('a')?.focus({ preventScroll: true });
    } else {
      menu.removeAttribute('data-open');
      menu.inert = true;
      root.style.overflow = '';
    }
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });
  menu.querySelectorAll('[data-site-menu-close]').forEach((element) => {
    element.addEventListener('click', () => setOpen(false));
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
})();
