/**
 * Link dùng chung cho header, menu và footer. Đổi href ở đây là mọi nơi đổi theo.
 */

export interface SiteLink {
  label: string;
  href: string;
}

export interface MenuItem extends SiteLink {
  /** Icon trong public/assets/img/icon/, kích thước gốc theo Figma. */
  icon: { src: string; width: number; height: number };
  /** Chỉ hiện ở SP: mục có sẵn trên header PC (求人検索, エントリー) nhưng header SP không có chỗ. */
  spOnly?: boolean;
}

/** Mục của menu mở từ nút メニュー (Figma navi SP 606:3714). */
export const menuItems: MenuItem[] = [
  {
    label: 'ポータルトップ',
    href: '/',
    icon: { src: '/assets/img/icon/icon-home.svg', width: 17, height: 19 },
  },
  {
    label: 'オンライン研修',
    href: '#',
    icon: { src: '/assets/img/icon/icon-laptop.svg', width: 23, height: 16 },
  },
  {
    label: '社内スポット求人',
    href: '#',
    icon: { src: '/assets/img/icon/icon-person-search.svg', width: 23, height: 22 },
  },
  {
    label: '求人検索',
    href: '#',
    icon: { src: '/assets/img/icon/icon-search-gray.svg', width: 19, height: 19 },
    spOnly: true,
  },
  {
    label: 'エントリー',
    href: '#',
    icon: { src: '/assets/img/icon/icon-entry-gray.svg', width: 19, height: 20 },
    spOnly: true,
  },
  {
    label: 'シフト勤怠管理',
    href: '#',
    icon: { src: '/assets/img/icon/icon-document-clock.svg', width: 22, height: 22 },
  },
  {
    label: '各種申請',
    href: '#',
    icon: { src: '/assets/img/icon/icon-edit-note.svg', width: 24, height: 21 },
  },
  {
    label: '人事評価',
    href: '/evaluation/self.html',
    icon: { src: '/assets/img/icon/icon-clipboard-person.svg', width: 20, height: 22 },
  },
];

/** Link điều khoản ở footer và cuối menu. */
export const legalLinks: SiteLink[] = [
  { label: '利用規約', href: '#' },
  { label: 'プライバシーポリシー', href: '#' },
  { label: '推奨環境', href: '#' },
];
