/**
 * Danh sách các màn đã cắt, hiển thị ở trang `screens.html` (src/pages/screens.astro).
 * **Thêm màn mới vào đây** mỗi khi tạo trang trong `src/pages/`; nếu quên, build báo lỗi.
 */

const figmaFile = 'https://www.figma.com/design/7vlX9tVY2OMopYUIOptDDW/Kawashima-HR---Staff-Portal';

/** Link Figma (chế độ Dev Mode) từ node id dạng "606:4686". */
export const figmaUrl = (nodeId: string) =>
  `${figmaFile}?node-id=${nodeId.replace(':', '-')}&m=dev`;

export interface Screen {
  /** Tên màn (theo tên frame trong Figma). */
  title: string;
  /** Đường dẫn trang sau khi build, tính từ gốc, ví dụ "/evaluation/self.html". */
  path: string;
  /** Node id của frame Figma PC và SP. */
  figma?: { pc: string; sp: string };
  note?: string;
}

export interface ScreenGroup {
  title: string;
  screens: Screen[];
}

export const screenGroups: ScreenGroup[] = [
  {
    title: '共通',
    screens: [
      {
        title: '共通レイアウト（ヘッダー・フッター）',
        path: '/index.html',
        figma: { pc: '606:4688', sp: '606:3892' },
        note: 'Trang trống chỉ có header/footer; footer luôn ở đáy.',
      },
    ],
  },
  {
    title: '人事評価',
    screens: [
      {
        title: '自己評価一覧',
        path: '/evaluation/self.html',
        figma: { pc: '606:4686', sp: '606:3858' },
      },
      {
        title: '一次評価一覧（部下の評価）',
        path: '/evaluation/primary.html',
        figma: { pc: '606:4724', sp: '606:3893' },
      },
      {
        title: '自分の評価入力画面',
        path: '/evaluation/self-input.html',
        figma: { pc: '606:4796', sp: '606:3964' },
      },
      {
        title: '一次評価入力画面',
        path: '/evaluation/primary-input.html',
        figma: { pc: '606:4884', sp: '606:4049' },
      },
    ],
  },
];
