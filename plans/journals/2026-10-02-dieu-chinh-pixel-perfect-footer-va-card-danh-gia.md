---
title: Điều chỉnh PerfectPixel footer, tab và card đánh giá
date: 2026-10-02
summary: Tổng hợp các issue lệch pixel, chênh lệch font Hiragino Sans và điều chỉnh padding/khoảng cách theo Figma
---

# Nhật ký điều chỉnh PerfectPixel và xử lý font chữ (2026-10-02)

Tài liệu này ghi lại toàn bộ các vấn đề sai lệch so với Figma, nguyên nhân kỹ thuật và cách thức điều chỉnh đã thực hiện.

---

## 1. Footer chung (`SiteFooter.astro`)

- **Màn hình**: Toàn bộ hệ thống ([SiteFooter.astro](file:///c:/Codespace/Vaon/Staff-Portal/builder/src/components/SiteFooter.astro))
- **Figma Specs**: Node `606:4696` (PC 1366px).

### Các vấn đề & Điều chỉnh:

1. **Hiệu ứng hover tăng font-size link footer**:
   - *Yêu cầu*: Tăng font-size lên 12px khi hover vào link footer.
   - *Thực hiện*: Cập nhật shortcut `footer-link` trong [uno/shortcuts.ts](file:///c:/Codespace/Vaon/Staff-Portal/builder/uno/shortcuts.ts) thành `hov:(underline text-12px)`.
   - *Lưu ý*: Chiều ngang chữ giãn ra từ 11px lên 12px sẽ gây hiệu ứng đẩy nhẹ các link bên cạnh (layout shift).

2. **Font-weight của text copyright `© Kawashima Corporation.`**:
   - *Sai lệch*: Figma khai báo `font-weight: 300` (Hiragino Sans W3). Trên web chưa set weight nên nhận mặc định 400 (Regular).
   - *Thực hiện*: 
     - Thêm class `font-light` (`font-weight: 300`) vào thẻ `<p>` trong [SiteFooter.astro](file:///c:/Codespace/Vaon/Staff-Portal/builder/src/components/SiteFooter.astro).
     - Bổ sung weight `'300'` vào danh sách tải font Noto Sans JP trong [uno/fonts.ts](file:///c:/Codespace/Vaon/Staff-Portal/builder/uno/fonts.ts).

3. **Cài font `Hiragino Sans GB` trên Windows nhưng web không nhận**:
   - *Nguyên nhân*: File font cài trên Windows có tên đăng ký hệ thống là `Hiragino Sans GB W3` (có hậu tố GB). CSS trong UnoCSS trước đó chỉ tìm `Hiragino Sans` nên trình duyệt Windows bỏ qua và fallback sang `Noto Sans JP`.
   - *Thực hiện*: Thêm `'Hiragino Sans GB'` vào mảng `sans` trong [uno/fonts.ts](file:///c:/Codespace/Vaon/Staff-Portal/builder/uno/fonts.ts).

4. **Chênh lệch bề ngang text copyright (Figma 156px vs Web 146px - 151px)**:
   - *Nguyên nhân*: 
     - Figma dùng font hệ thống macOS (`Hiragino Sans`) với engine render canvas/CoreText.
     - Windows dùng DirectWrite và fallback sang `Noto Sans JP` (hoặc Hiragino Sans GB).
     - Ký tự `©` trong font tiếng Nhật của macOS có khung chữ vuông rộng (~12px), trong khi bản web font Latin là proportional hẹp hơn.
     - Trung bình mỗi ký tự chênh lệch ~0.4px $\times$ 24 ký tự $\approx$ 10px chênh lệch tổng chuỗi.

---

## 2. Tab "部下の評価" lệch vị trí trên PerfectPixel

- **Màn hình**: `自己評価一覧` ([src/pages/evaluation/self.astro](file:///c:/Codespace/Vaon/Staff-Portal/builder/src/pages/evaluation/self.astro) - Figma node `606:4686`).
- **Sai lệch**: Tab `部下の評価` trên web bị lệch sang phải ~13.5px so với overlay Figma.
- **Nguyên nhân (Lỗi từ file thiết kế Figma)**:
  - Mỗi tab PC rộng 240px: Tab 1 (`443px -> 683px`, tâm 563px), Tab 2 (`683px -> 923px`, tâm 803px).
  - Ở màn `primary.astro` (Figma `606:4724`), Tab 2 có badge số 1: Text `部下の評価` ở `x: 753`, badge ở `x: 834` $\rightarrow$ Tâm cụm = `802.5px` (căn giữa chuẩn).
  - Ở màn `self.astro` (Figma `606:4686`), Tab 2 không có badge: Designer xoá badge nhưng **quên không căn giữa lại text**, giữ nguyên toạ độ `x: 752` (lệch trái 13.5px so với tâm tab 803px).
  - Trong khi đó, code [PageTabs.astro](file:///c:/Codespace/Vaon/Staff-Portal/builder/src/components/PageTabs.astro) dùng `justify-center` chuẩn Flexbox nên khi không có badge, chữ tự động nằm ngay tâm 803px (`x ≈ 765.5px`).
- **Kết luận**: Code giữ nguyên chuẩn `justify-center` theo quy chuẩn thiết kế hệ thống.

---

## 3. Lỗi viền đôi ở Card 2 (Mũi tên đỏ)

- **Hiện tượng**: Trên PerfectPixel, ở mép trên và mép dưới của Card 2 xuất hiện 2 đường viền xám cách nhau ~3px (bị viền đôi).
- **Nguyên nhân**:
  - Bản thân Card 2 có chiều cao chuẩn xác **163px** như Figma.
  - Tuy nhiên, Card 1 ở ngay phía trên cao **321px** (thừa đúng **3px** so với chiều cao chuẩn 318px của Figma, do tổng padding và line-height của link footer "自己評価を入力する").
  - Do Card 1 bị thừa 3px, nó đã **đẩy toàn bộ Card 2 ở bên dưới tụt xuống 3px**, khiến cả viền đỉnh và viền đáy của Card 2 trên web bị trôi xuống 3px so với vị trí gốc của Figma $\rightarrow$ sinh ra viền đôi ở cả 2 đầu.
- **Cách khắc phục**:
  - Điều chỉnh padding của link footer trong [src/pages/evaluation/self.astro](file:///c:/Codespace/Vaon/Staff-Portal/builder/src/pages/evaluation/self.astro) thành `pc:py-13px`.
  - Chiều cao Card 1 rút lại đúng chuẩn 318px $\rightarrow$ Card 2 tự động được kéo lên 3px, triệt tiêu hoàn toàn viền đôi ở cả đỉnh và đáy Card 2.

---

## 4. Lệch ngang/dọc của các text bên phải Card (2025年10月1日〜3月31日, あと16日...)

- **Hiện tượng**: Text ngày tháng (`2025年10月1日〜3月31日`) và thời hạn (`あと16日`) bên phải thẻ bị lệch sang phải khoảng ~3px so với Figma.
- **Nguyên nhân**:
  - Figma: Card rộng 580px (`x: 393 -> 973`).
    - Tất cả text bên trái bắt đầu tại `x = 413` $\rightarrow$ **Padding-left = 20px**.
    - Tất cả text bên phải kết thúc tại `x = 951` $\rightarrow$ **Padding-right = 973 - 951 = 22px**.
  - Code cũ: Dùng `pc:px-19px` (padding phải chỉ có 19px, thiếu 3px so với 22px của Figma) $\rightarrow$ Làm toàn bộ text bên phải bị trôi lệch sang phải 3px.
  - Ngoài ra: Hàng hiển thị text dùng `items-center` làm các text bên phải bị lệch 1.5px dọc so với baseline của tiêu đề bên trái.
- **Cách khắc phục**:
  - Đổi padding ngang của [EvaluationPeriodCard.astro](file:///c:/Codespace/Vaon/Staff-Portal/builder/src/components/EvaluationPeriodCard.astro#L19) thành `pc:(pl-20px pr-22px)`.
  - Đổi `items-center` thành `items-baseline`.

---

## 5. Phân tích hiện tượng lệch text hạn nộp (`2026年10月7日（水）`) và thực nghiệm căn chỉnh

- **Màn hình**: `自己評価一覧` ([src/pages/evaluation/self.astro](file:///c:/Codespace/Vaon/Staff-Portal/builder/src/pages/evaluation/self.astro) & [EvaluationPeriodCard.astro](file:///c:/Codespace/Vaon/Staff-Portal/builder/src/components/EvaluationPeriodCard.astro)).

### Kết quả thực nghiệm căn chỉnh:
- **Trạng thái chuẩn xác**:
  - [EvaluationPeriodCard.astro](file:///c:/Codespace/Vaon/Staff-Portal/builder/src/components/EvaluationPeriodCard.astro): `pc:pt-16px`, `pc:(pl-20px pr-22px)`, `items-baseline`.
  - [self.astro](file:///c:/Codespace/Vaon/Staff-Portal/builder/src/pages/evaluation/self.astro): `pc:py-13px`.
  - Ở trạng thái này: Toàn bộ khung viền Card 1 (318px), Card 2 (163px), các đường kẻ phân cách, và các text `2026年度 上期`, `2026年4月1日〜9月30日`, `あと16日`, `自己評価の進捗`, `3項目中 2項目を入力済`, `自己評価を入力する` **khớp hoàn hảo 1:1 với Figma**.
- **Thử nghiệm tăng `pc:pt-16px` lên `pc:pt-18px`**:
  - Khi tăng `pt-18px`, toàn bộ nội dung của Card 1 bị đẩy tụt xuống 2px, kéo theo Card 2 tụt xuống, làm vỡ sự đồng bộ của tất cả các dòng text khác (sinh ra bóng chữ đôi trên toàn bộ các dòng `2026年度 上期`, `2025年度 下期`...).
  - **Kết luận**: Đã rollback về `pc:pt-16px` để giữ vị trí chuẩn xác cho toàn bộ component.

### Bản chất của sự sai lệch ở chuỗi `2026年10月7日（水）`:
1. **Lệch ngang do font `Hiragino Sans GB` (tiếng Trung) trên Windows**:
   - Figma sử dụng `Hiragino Sans W6` chuẩn Nhật Bản trên macOS (JIS metrics). Ký tự dấu ngoặc `（` trong font Nhật được ép sát lề trái khi đứng sau chữ Hán `日`.
   - File font người dùng cài trên Windows là `Hiragino Sans GB` (chuẩn Trung Quốc giản thể). Font GB thiết kế dấu ngoặc `（` nằm chính giữa ô vuông chữ Hán, tạo khoảng trống đệm (kerning padding) ~2px ở bên trái ngoặc.
   - Do đó, phần số và chữ `2026年10月7日` khớp hoàn toàn, nhưng cụm `（水）` bị giãn nhẹ sang phải so với bản macOS trong Figma. Đây là đặc tính metric của font chữ giữa Windows và macOS, không phải lỗi CSS.

2. **Sai số vẽ tay ở thanh tiến độ (Figma 344px vs Code 332px)**:
   - Thanh trượt rộng 496px. Tiến độ `67%` tính chuẩn toán học là $496 \times 67\% = \mathbf{332.32px}$.
   - Trong Figma (Node 606:4721): Designer vẽ thanh cam rộng **344px** (tương đương $69.35\%$). Code giữ nguyên công thức tính theo dữ liệu thực `67%`.

### Giải pháp bù trừ kerning cho chuỗi `2026年10月7日（水）`:
- **Đặc thù chuỗi**: Gồm 7 chữ số Latinh (`2, 0, 2, 6, 1, 0, 7`), 3 chữ Hán (`年, 月, 日`) và 2 dấu ngoặc toàn giác (`（, ）`).
  - Trong Figma: macOS Hiragino Sans W6 hiển thị chuỗi này dài đúng **165px** (Node `606:4703`).
  - Trên Windows: Font web fallback render các chữ số Latinh proportional hẹp hơn ~1.5px/số và ngoặc hẹp hơn, khiến tổng chuỗi ngắn chỉ còn **~151px** (hụt ~14px), tạo cảm giác lệch nguyên một ký tự ở phần đuôi `（水）`.
- **Cách xử lý**:
  - Thêm `pc:tracking-[1.1px]` vào thẻ `<span>` hạn nộp trong [EvaluationPeriodCard.astro](file:///c:/Codespace/Vaon/Staff-Portal/builder/src/components/EvaluationPeriodCard.astro#L31-L35).
  - Khoảng đệm $1.1\text{px} \times 12$ khe ký tự = **+13.2px** bù đắp hoàn hảo độ hụt chiều ngang $\rightarrow$ Chuỗi đạt đúng độ rộng **~164.5px**, khớp từng nét chữ với Figma trên PerfectPixel.


