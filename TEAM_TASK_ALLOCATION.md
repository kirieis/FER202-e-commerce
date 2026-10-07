# BẢNG PHÂN CHIA NHIỆM VỤ DỰ ÁN FER202 E-COMMERCE (NHÓM 5 THÀNH VIÊN)

> **Dự án:** Elite Technology / ShopNext — Nền tảng E-Commerce Công nghệ  
> **Bộ thiết kế & Token quy chuẩn:** `stitch layout/vibrant_clean_commerce/DESIGN.md`  
> **Nguyên tắc UI/UX:** Responsive đồng bộ Mobile Web (375px - 440px) & Desktop Browser (>= 1280px), chuẩn Design Tokens (Màu, Typography, Surface level, Radius).

---

## 👥 TỔNG QUAN PHÂN CÔNG 5 THÀNH VIÊN

| Thành viên | Phụ trách chính | Các trang / Module cụ thể | Nguồn Stitch Layout tham khảo |
| :--- | :--- | :--- | :--- |
| **Dev 1 (Bạn - Lead)** | **Trang chủ & Cổng người dùng** | • **Home Page** (`index.html`)<br>• **Authentication** (`auth.html` - Đăng nhập, Đăng ký, Quên MK)<br>• **Customer Portal** (`portal.html` - Tổng quan tài khoản, Đơn mua, Địa chỉ, Bảo mật) | `shopnext_home`<br>`shopnext_home_desktop` |
| **Dev 2** | **Danh mục & Tìm kiếm sản phẩm** | • **Product Catalog / Listing** (`products.html`)<br>• Bộ lọc đa tầng (Danh mục, Thương hiệu, Mức giá, Đánh giá, Campus Deal)<br>• Thanh tìm kiếm nâng cao + Sắp xếp (Sort by price, rating, newest) | `shopnext_product_catalog`<br>`shopnext_product_catalog_desktop` |
| **Dev 3** | **Chi tiết sản phẩm & Đánh giá** | • **Product Detail Page** (`product-detail.html`)<br>• Image Gallery / Zoom preview<br>• Chọn biến thể (Màu sắc, Dung lượng, Bộ nhớ, Bảo hành)<br>• Thông số kỹ thuật & Tab đánh giá / Reviews từ khách hàng | `shopnext_product_detail`<br>`shopnext_product_detail_desktop` |
| **Dev 4** | **Giỏ hàng & Thanh toán (Checkout)** | • **Shopping Cart** (`cart.html`) - Tăng giảm số lượng, chọn sản phẩm, áp mã voucher sinh viên<br>• **Checkout Flow** (`checkout.html`) - Điền địa chỉ giao hàng, phương thức thanh toán (COD, QR VNPAY, Thẻ), Tóm tắt chi phí | `shopnext_shopping_cart`<br>`shopnext_shopping_cart_desktop` |
| **Dev 5** | **Quản trị viên (Admin Panel)** | • **Admin Dashboard** (`admin/index.html`) - Thống kê doanh thu, đơn hàng<br>• **Quản lý sản phẩm** (`admin/products.html`) - Bảng danh sách, thêm/sửa/xóa sản phẩm<br>• **Quản lý đơn hàng** (`admin/orders.html`) - Chi tiết đơn, đổi trạng thái đơn (Chờ xử lý, Đang giao, Đã giao, Hủy) | `references/layouts/app.md` (chuẩn Dashboard của skill UI/UX) |

---

## 📋 CHI TIẾT NHIỆM VỤ TỪNG DEV KHÁC (DEV 2, 3, 4, 5)

### 🔹 Dev 2 — Product Catalog & Search
- **Trang cần dựng:** `products.html`
- **Mô tả chức năng:**
  - **Desktop:** Layout 2 cột gồm Sidebar lọc bên trái (sticky) và Lưới sản phẩm bên phải (3-4 cột).
  - **Mobile:** Thanh lọc dạng chip trượt ngang + Nút mở Drawer/Modal bộ lọc chi tiết (`Filter BottomSheet`).
  - Phân trang hoặc nút "Xem thêm sản phẩm", trạng thái khi không tìm thấy kết quả (`empty-state`).
- **Tài nguyên tham khảo:** `stitch layout/shopnext_product_catalog/` & `stitch layout/shopnext_product_catalog_desktop/`.

### 🔹 Dev 3 — Product Detail & Reviews
- **Trang cần dựng:** `product-detail.html`
- **Mô tả chức năng:**
  - **Hero Sản phẩm:** Bên trái là ảnh sản phẩm lớn + danh sách ảnh thumbnail; Bên phải là thông tin giá gốc, giá sale, badge "Student Exclusive", selector chọn màu/dung lượng, số lượng và 2 CTA ("Thêm vào giỏ" / "Mua ngay").
  - **Khối Sticky Bar trên Mobile:** Thanh cố định dưới đáy màn hình gồm nút Chat, Giỏ hàng và Nút "Mua ngay".
  - **Tabs Thông tin:** Mô tả chi tiết, Thông số kỹ thuật (Specs Table), Đánh giá & Bình luận (Rating summary + danh sách review).
- **Tài nguyên tham khảo:** `stitch layout/shopnext_product_detail/` & `stitch layout/shopnext_product_detail_desktop/`.

### 🔹 Dev 4 — Shopping Cart & Checkout
- **Trang cần dựng:** `cart.html` và `checkout.html`
- **Mô tả chức năng:**
  - **Giỏ hàng:** Bảng/danh sách sản phẩm đã chọn, ô điều chỉnh số lượng (`quantity-input`), xóa sản phẩm, ô nhập mã giảm giá (`Voucher/Coupon Box`), thẻ tính tạm tính, phí ship campus, tổng tiền.
  - **Thanh toán (Checkout):** Các bước (1. Địa chỉ nhận hàng -> 2. Phương thức vận chuyển -> 3. Hình thức thanh toán). Hỗ trợ trạng thái hoàn tất đơn hàng (`order-success.html`).
- **Tài nguyên tham khảo:** `stitch layout/shopnext_shopping_cart/` & `stitch layout/shopnext_shopping_cart_desktop/`.

### 🔹 Dev 5 — Admin Management (Quản trị hệ thống)
- **Trang cần dựng:** Thư mục `admin/` (`index.html`, `products.html`, `orders.html`)
- **Mô tả chức năng:**
  - Layout Dashboard chuẩn: Sidebar cố định thu gọn được trên mobile, Header tìm kiếm & Profile admin.
  - Thẻ chỉ số KPI (Doanh thu ngày, Đơn hàng mới, Khách đăng ký, Sản phẩm tồn kho thấp).
  - Data Table chuyên nghiệp: Sắp xếp theo cột, tìm kiếm lọc trạng thái đơn, Pagination và Modal thêm/sửa sản phẩm.
- **Tài nguyên tham khảo:** Tuân thủ chuẩn bảng & dashboard tại `.agents/skills/ui-ux/references/layouts/app.md` và `.agents/skills/ui-ux/references/components/choice-controls.md`.

---

## 🎨 QUY CHUẨN DESIGN SYSTEM CHUNG CẢ NHÓM PHẢI TUÂN THỦ

1. **Color Palette (Vibrant Clean Commerce):**
   - Primary: `#004ac6` (Xanh công nghệ chính)
   - Primary Container: `#2563eb`
   - Secondary / Accent: `#fd761a` / `#9d4300` (Cam tạo điểm nhấn nút CTA & Sale)
   - Background: `#faf8ff`
   - Surface Container Low / High: `#f2f3ff` / `#e2e7ff`
   - Text on Surface: `#131b2e` | Text Variant: `#434655`
2. **Typography:**
   - Heading / Logo / Giá: **Plus Jakarta Sans** (Google Fonts)
   - Nội dung / Body text / Nhãn nút: **Inter** (Google Fonts)
3. **Icons:** Dùng đồng bộ **Material Symbols Outlined** hoặc **Lucide Icons** (không dùng icon tự chế lệch style).
4. **Responsive:**
   - Mobile: Tối ưu cho viewport từ 375px trở lên, không cuộn ngang tràn màn hình.
   - Desktop: Container giới hạn tối đa `max-w-7xl` (1280px), căn giữa, padding hợp lý.
