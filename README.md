# UniGear — Modern E-commerce Platform for Tech Students

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-336791?style=for-the-badge&logo=postgresql)](https://supabase.com/)
[![Vitest](https://img.shields.io/badge/Tested_with-Vitest-6E9F18?style=for-the-badge&logo=vitest)](https://vitest.dev/)

> UniGear là nền tảng thương mại điện tử chuyên cung cấp thiết bị công nghệ (Laptop, Tablet, Audio, Phụ kiện) với chính sách trợ giá và chương trình xác thực thẻ sinh viên toàn diện.

---

## 🌟 Tính Năng Nổi Bật

### 1. Storefront & Trải Nghiệm Mua Sắm Hiện Đại
- **Responsive Design:** Tối ưu hóa mượt mà cho mọi độ phân giải từ Mobile (390px) đến Desktop (1440px).
- **Bento Categories & Flash Deals:** Trình bày danh mục sản phẩm theo phong cách Bento Grid hiện đại kèm huy hiệu ưu đãi sinh viên.
- **Dynamic Product Filtering:** Bộ lọc đa tiêu chí (danh mục, hãng, khoảng giá, trạng thái kho) cập nhật tức thì.

### 2. Client-Side Search Engine Tối Ưu
- **Vietnamese Accent Normalization:** Tự động loại bỏ dấu tiếng Việt để tìm kiếm chính xác mà không phụ thuộc vào bộ gõ (`bo-dau`).
- **Typo Tolerance:** Hỗ trợ xử lý lỗi gõ phím nhanh, tự động đề xuất sản phẩm phù hợp khi gõ sai ký tự.
- **Alias Mapping:** Nhận diện các từ khóa đồng nghĩa (ví dụ: `macbook` ➔ `Apple MacBook`, `tai nghe` ➔ `Audio`).
- **Unit Testing:** Toàn bộ thuật toán tìm kiếm được bao phủ bởi kiểm thử tự động với **Vitest** (`src/lib/search/__tests__`).

### 3. Student Verification & User Portal
- **Xác thực Thẻ Sinh Viên:** Luồng đăng ký tài khoản sinh viên với tính năng mô phỏng quét AI OCR thẻ sinh viên để duyệt tự động.
- **Đặc quyền Sinh viên (Student Perks):** Áp dụng chiết khấu độc quyền trực tiếp vào giá sản phẩm và tổng đơn hàng.
- **Hồ sơ Cá nhân (Profile Portal):** Quản lý trạng thái xác thực, trường đại học, mã số sinh viên (MSSV) và lịch sử giao dịch.

### 4. Giỏ Hàng & Quy Trình Thanh Toán (Checkout)
- **State Management Tập trung:** Quản lý giỏ hàng, thông tin sinh viên, theme qua React Context API (`CartContext`, `StudentContext`, `ThemeContext`).
- **Hỗ trợ Đa Phương Thức Thanh Toán:** Trả góp sinh viên (Installment), chuyển khoản VietQR, và thanh toán khi nhận hàng (COD).
- **Lưu trữ Đơn Hàng:** Tự động đồng bộ giỏ hàng và lưu vết đơn hàng vào cơ sở dữ liệu Supabase.

### 5. Chatbot Hỗ Trợ Mua Sắm (UniBot)
- Trợ lý ảo tích hợp ngay trên giao diện giúp tư vấn cấu hình laptop, giải đáp chính sách bảo hành và hướng dẫn xác thực thẻ sinh viên.

---

## 🏛️ Kiến Trúc Hệ Thống & Cơ Sở Dữ Liệu

### Cấu Trúc Mã Nguồn (Clean Architecture)
```text
src/
├── app/                  # Next.js 16 App Router (Pages, Layouts, API Route Handlers)
│   ├── [category]/       # Dynamic Route phân loại sản phẩm
│   ├── san-pham/[id]/    # Trang chi tiết sản phẩm (PDP)
│   ├── thanh-toan/       # Trang thanh toán & xác nhận đơn hàng
│   ├── xac-thuc/         # Trang đăng ký / xác thực thẻ sinh viên
│   └── api/orders/       # API tạo đơn hàng và lưu trữ DB
├── components/           # UI Components tái sử dụng (ProductCard, Navbar, Footer, Bento, UniBot)
├── context/              # Quản lý Global State (Cart, Student, Theme, Toast)
├── lib/
│   ├── search/           # Search Engine core (normalization, typo, aliases, vitest tests)
│   ├── chatbot/          # Quy tắc xử lý và động cơ hỏi đáp UniBot
│   └── supabase/         # Khởi tạo kết nối Supabase Client & Server
└── views/                # Màn hình chức năng (Storefront, ProductDetail, Checkout, StudentAuth)
```

### Cơ Sở Dữ Liệu Quan Hệ (PostgreSQL Schema)
Toàn bộ lược đồ cơ sở dữ liệu được định nghĩa trong `supabase/schema.sql`:
* **Mô hình quan hệ 1-N:**
  * `profiles` (Hồ sơ sinh viên, liên kết `auth.users`)
  * `orders` (Đơn đặt hàng)
  * `order_items` (Chi tiết từng món hàng trong đơn)
  * `products` (Danh mục sản phẩm, cấu hình JSONB, mảng ảnh `text[]`)
* **Kiểu dữ liệu nâng cao:** Sử dụng `UUID` (`gen_random_uuid()`), `JSONB` lưu trữ thông số kỹ thuật động và tùy chọn màu sắc/cấu hình.
* **Tối ưu hóa B-Tree Index:**
  * `idx_products_category`, `idx_products_brand`, `idx_products_price`, `idx_products_student_price`.
* **Database Triggers (PL/pgSQL):**
  * `handle_updated_at`: Tự động cập nhật thời gian sửa đổi bản ghi.
  * `handle_new_user`: Tự động tạo bản ghi hồ sơ sinh viên khi đăng ký qua Auth (`SECURITY DEFINER`).
* **Bảo mật:** Kích hoạt Row Level Security (RLS) bảo vệ dữ liệu đơn hàng và hồ sơ người dùng.

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án

### Yêu Cầu Môi Trường
* **Node.js:** >= 20.x
* **Trình quản lý gói:** `pnpm` hoặc `npm`

### Các Bước Thực Hiện

1. **Clone repository:**
   ```bash
   git clone https://github.com/Fin26ne/FER202-e-commerce.git unigear
   cd unigear
   ```

2. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

3. **Cấu hình biến môi trường (`.env.local`):**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Khởi tạo dữ liệu mẫu Database (Tùy chọn):**
   * Sao chép nội dung `supabase/schema.sql` vào Supabase SQL Editor và thực thi.
   * Chạy script seed dữ liệu sản phẩm:
     ```bash
     npm run seed:supabase
     ```

5. **Khởi chạy môi trường phát triển (Dev Server):**
   ```bash
   npm run dev
   ```
   Truy cập ứng dụng tại: `http://localhost:4444` (hoặc cổng cấu hình).

6. **Chạy Unit Test:**
   ```bash
   npm run test
   ```

---

## 📁 Tài Liệu Thiết Kế (Design Mockups)
Các bản vẽ thiết kế nguyên mẫu UI được tổ chức gọn gàng chuẩn kebab-case tại thư mục [`docs/design-mockups/`](./docs/design-mockups/):
* `storefront-desktop-1440px` & `storefront-mobile-390px`: Giao diện trang chủ Storefront đa kích thước.
* `storefront-light-v1` & `storefront-light-v2`: Các biến thể giao diện Light Mode.
* `product-detail-dark` & `product-detail-light`: Màn hình chi tiết sản phẩm (PDP).
* `student-login-register`: Màn hình đăng nhập & đăng ký tài khoản sinh viên.
* `student-verification-dark` & `student-verification-light`: Luồng xác thực thẻ sinh viên kèm AI OCR.
* `checkout-dark` & `checkout-light`: Màn hình thanh toán và tóm tắt đơn hàng.

---

## 📄 Bản Quyền
Dự án được xây dựng và duy trì bởi **Nguyễn Trí Thiện** (UniGear Team).
