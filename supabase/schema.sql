-- ==============================================================================
-- UniGear Supabase Schema
-- ==============================================================================
-- Hệ cơ sở dữ liệu hoàn chỉnh cho UniGear: Products, Profiles, Orders, Order Items
-- Copy toàn bộ nội dung file này và chạy trong Supabase SQL Editor.
-- ==============================================================================

-- Bật extension tạo UUID ngẫu nhiên nếu chưa có
create extension if not exists "pgcrypto";

-- ==============================================================================
-- 1. BẢNG PRODUCTS (Danh mục sản phẩm UniGear)
-- ==============================================================================
create table if not exists public.products (
  id text primary key,                        -- Slug duy nhất: vd: 'apple-macbook-air-m2-13-6'
  name text not null,                         -- Tên sản phẩm hiển thị
  brand text,                                 -- Hãng sản xuất: 'Apple', 'Dell', 'Lenovo',...
  sub_title text,                             -- Khẩu hiệu phụ / tóm tắt cấu hình nổi bật
  description text,                           -- Mô tả chi tiết
  price numeric not null,                     -- Giá niêm yết chuẩn
  old_price numeric,                          -- Giá gạch trước khi giảm
  student_price numeric not null,             -- Giá ưu đãi sinh viên
  category text not null,                     -- 'laptop' | 'tablet' | 'audio' | 'accessory'
  discount_badge text,                        -- Badge hiển thị: vd '-13%'
  image_url text,                             -- Đường dẫn ảnh đại diện chính
  gallery_urls text[] default '{}',           -- Mảng đường dẫn ảnh thư viện chi tiết
  image_type text,                            -- Type fallback minh họa (nếu có): 'nova14', 'pulse',...
  rating numeric default 5.0,                 -- Điểm đánh giá (1.0 - 5.0)
  reviews_count integer default 0,            -- Số lượng lượt đánh giá
  specs jsonb default '[]'::jsonb,            -- Danh sách thông số: [{ label, value }]
  configurations jsonb default '[]'::jsonb,   -- Cấu hình lựa chọn: [{ id, label, note, price, studentPrice }]
  colors jsonb default '[]'::jsonb,           -- Lựa chọn màu sắc: [{ id, name, hex }]
  stock_location text,                        -- Tình trạng kho: vd 'Còn 8 máy tại kho KTX & Campus Hub'
  monthly_installment numeric,                -- Số tiền trả góp mỗi tháng (nếu có)
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Index tăng tốc truy vấn sản phẩm
create index if not exists idx_products_category on public.products (category);
create index if not exists idx_products_brand on public.products (brand);
create index if not exists idx_products_price on public.products (price);
create index if not exists idx_products_student_price on public.products (student_price);

-- ==============================================================================
-- 2. BẢNG PROFILES (Hồ sơ & Xác thực thẻ sinh viên)
-- ==============================================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text,
  phone text,
  university text,                           -- Tên trường ĐH / CĐ
  student_id text,                           -- Mã số sinh viên (MSSV)
  is_verified boolean default false,         -- Đã được duyệt xác thực thẻ SV hay chưa
  id_card_image_url text,                    -- Đường dẫn ảnh thẻ sinh viên trong Storage
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Tự động cập nhật updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trigger_products_updated_at on public.products;
create trigger trigger_products_updated_at
  before update on public.products
  for each row execute function public.handle_updated_at();

drop trigger if exists trigger_profiles_updated_at on public.profiles;
create trigger trigger_profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

-- Trigger tự động tạo hồ sơ profile trống khi sinh viên đăng ký qua Supabase Auth
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

-- Đăng ký trigger trên auth.users
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ==============================================================================
-- 3. BẢNG ORDERS (Đơn hàng mua sắm của sinh viên)
-- ==============================================================================
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.profiles(id) on delete set null,
  customer_name text not null,
  customer_phone text not null,
  customer_email text not null,
  university text,
  student_id_code text,                      -- MSSV nhập lúc checkout
  delivery_method text not null,             -- 'ktx' (Nhận tại phòng KTX) | 'campus_hub' (Hub trường)
  delivery_address text not null,            -- Địa chỉ chi tiết (VD: KTX Khu B, Phòng 402)
  delivery_note text,                        -- Ghi chú giao hàng
  payment_method text not null,              -- 'installment' | 'vietqr' | 'cod'
  subtotal numeric not null,
  discount_campaign numeric default 0,
  student_discount numeric default 0,
  shipping_fee numeric default 0,
  final_total numeric not null,
  status text default 'pending',             -- 'pending' | 'confirmed' | 'shipping' | 'completed' | 'cancelled'
  created_at timestamptz default now()
);

create index if not exists idx_orders_student_id on public.orders (student_id);
create index if not exists idx_orders_created_at on public.orders (created_at desc);

-- ==============================================================================
-- 4. BẢNG ORDER_ITEMS (Chi tiết các mặt hàng trong đơn)
-- ==============================================================================
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text not null references public.products(id),
  config_id text,                            -- ID phiên bản cấu hình đã chọn
  color_id text,                             -- ID màu sắc đã chọn
  quantity integer not null default 1 check (quantity > 0),
  unit_price numeric not null,               -- Giá niêm yết tại thời điểm mua
  student_price numeric not null             -- Giá sinh viên áp dụng
);

create index if not exists idx_order_items_order_id on public.order_items (order_id);

-- ==============================================================================
-- 5. ROW LEVEL SECURITY (Bảo mật truy cập dữ liệu)
-- ==============================================================================
alter table public.products enable row level security;
alter table public.profiles enable row level security;
alter table public.orders disable row level security;
alter table public.order_items disable row level security;

-- Policies cho PRODUCTS:
-- Mọi người (cả khách vãng lai và sinh viên) đều được xem danh sách sản phẩm
drop policy if exists "Public read products" on public.products;
create policy "Public read products"
  on public.products for select
  using (true);

-- Chỉ quyền service_role (Admin / API Server Action) được thêm sửa xóa sản phẩm
drop policy if exists "Service role manage products" on public.products;
create policy "Service role manage products"
  on public.products for all
  using (auth.role() = 'service_role');

-- Policies cho PROFILES:
-- Sinh viên chỉ xem và sửa profile của chính mình
drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Service role có toàn quyền quản lý profiles (VD: duyệt thẻ sinh viên)
drop policy if exists "Service role manage profiles" on public.profiles;
create policy "Service role manage profiles"
  on public.profiles for all
  using (auth.role() = 'service_role');

-- Policies cho ORDERS:
-- Cho phép thêm và xem đơn hàng tự do
drop policy if exists "Anyone can insert orders" on public.orders;
create policy "Anyone can insert orders"
  on public.orders for insert
  with check (true);

drop policy if exists "Users view own orders" on public.orders;
drop policy if exists "Public read orders" on public.orders;
create policy "Public read orders"
  on public.orders for select
  using (true);

-- Policies cho ORDER_ITEMS:
drop policy if exists "Anyone can insert order items" on public.order_items;
create policy "Anyone can insert order items"
  on public.order_items for insert
  with check (true);

drop policy if exists "Users view own order items" on public.order_items;
drop policy if exists "Public read order items" on public.order_items;
create policy "Public read order items"
  on public.order_items for select
  using (true);

-- ==============================================================================
-- 6. HƯỚNG DẪN TẠO STORAGE BUCKET TRÊN SUPABASE DASHBOARD:
-- ==============================================================================
-- 1. Vào Storage -> Create new bucket:
--    - Name: `student-ids`
--    - Public bucket: TẮT (Private - để bảo vệ thông tin CCCD / Thẻ SV)
-- 2. Bucket sản phẩm (Tùy chọn nếu muốn lưu ảnh sản phẩm trên cloud):
--    - Name: `products`
--    - Public bucket: BẬT
-- ==============================================================================
