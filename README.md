# Elite Technology - E-commerce Platform

> **Elite Technology** - Nền tảng thương mại điện tử chuyên cung cấp các sản phẩm công nghệ cao cấp, chính hãng với chất lượng đảm bảo và dịch vụ khách hàng tận tâm.

## 📖 Giới thiệu dự án

**Elite Technology** là một dự án e-commerce hoàn chỉnh được xây dựng cho môn học FER202, tập trung vào việc bán các sản phẩm công nghệ như:
- 💻 **Laptop & Máy tính bảng** - Các dòng MacBook, Dell XPS, ThinkPad, iPad Pro...
- 📱 **Điện thoại thông minh** - iPhone, Samsung Galaxy, Google Pixel, Xiaomi...
- ⌚ **Thiết bị đeo thông minh** - Apple Watch, Samsung Galaxy Watch, Garmin...
- 🎧 **Tai nghe & Âm thanh** - AirPods, Sony WH-1000XM5, Bose, JBL...
- 🖥️ **Màn hình & Phụ kiện** - Màn hình gaming, bàn phím cơ, chuột gaming, dock station...
- 🎮 **Gaming Gear** - Card màn hình, mainboard, RAM, SSD, case, tản nước...

## ✨ Tính năng chính

### 🛍️ Dành cho Khách hàng
- **Duyệt sản phẩm**: Tìm kiếm, lọc theo danh mục, thương hiệu, khoảng giá
- **Chi tiết sản phẩm**: Hình ảnh chất lượng cao, thông số kỹ thuật chi tiết, review từ người dùng
- **Giỏ hàng & Thanh toán**: Quản lý giỏ hàng, áp dụng mã giảm giá, nhiều phương thức thanh toán
- **Theo dõi đơn hàng**: Trạng thái đơn hàng real-time, lịch sử mua hàng
- **Quản lý tài khoản**: Hồ sơ cá nhân, địa chỉ giao hàng, danh sách yêu thích
- **Đánh giá & Review**: Đánh giá sản phẩm sau khi mua, upload hình ảnh/video

### 👨‍💼 Dành cho Quản trị viên (Admin Panel)
- **Dashboard tổng quan**: Doanh thu, đơn hàng, khách hàng, sản phẩm bán chạy
- **Quản lý sản phẩm**: CRUD sản phẩm, biến thể, tồn kho, nhập hàng
- **Quản lý đơn hàng**: Xử lý đơn hàng, in phiếu xuất, cập nhật trạng thái vận chuyển
- **Quản lý người dùng**: Phân quyền, khóa/mở tài khoản, xem lịch sử hoạt động
- **Quản lý khuyến mãi**: Tạo mã giảm giá, flash sale, combo deal
- **Báo cáo & Thống kê**: Doanh thu theo thời gian, top sản phẩm, phân tích khách hàng
- **Cài đặt hệ thống**: Cấu hình shipping, payment gateway, email, SEO

## 🛠️ Công nghệ sử dụng

### Frontend
- **Framework**: React.js / Next.js (TypeScript)
- **State Management**: Redux Toolkit / Zustand
- **UI Library**: Tailwind CSS + Headless UI / Shadcn UI
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios / TanStack Query
- **Charts**: Recharts / Chart.js

### Backend
- **Runtime**: Node.js (Express.js / NestJS) hoặc Python (FastAPI / Django)
- **Database**: PostgreSQL (Primary) + Redis (Cache/Session)
- **ORM**: Prisma / TypeORM / SQLAlchemy
- **Authentication**: JWT + Refresh Token, OAuth2 (Google, Facebook, GitHub)
- **File Storage**: AWS S3 / Cloudinary / Local Storage
- **Message Queue**: RabbitMQ / Redis Streams / BullMQ
- **Search**: Elasticsearch / Meilisearch / Algolia

### DevOps & Infrastructure
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions / GitLab CI
- **Reverse Proxy**: Nginx
- **SSL**: Let's Encrypt / Cloudflare
- **Monitoring**: Prometheus + Grafana / Sentry
- **Logging**: ELK Stack / Loki + Grafana

## 📁 Cấu trúc dự án

```
FER202-e-commerce/
├── docs/                    # Tài liệu dự án
│   ├── api-docs.md         # API Documentation
│   ├── database-schema.md  # Sơ đồ cơ sở dữ liệu
│   └── deployment.md       # Hướng dẫn deploy
├── frontend/               # Client-side application
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── store/          # State management
│   │   ├── services/       # API services
│   │   ├── utils/          # Helper functions
│   │   ├── types/          # TypeScript types
│   │   └── styles/         # Global styles
│   ├── package.json
│   └── Dockerfile
├── backend/                # Server-side application
│   ├── src/
│   │   ├── modules/        # Feature modules
│   │   ├── common/         # Shared utilities
│   │   ├── config/         # Configuration
│   │   ├── middleware/     # Custom middleware
│   │   ├── guards/         # Auth guards
│   │   ├── decorators/     # Custom decorators
│   │   ├── pipes/          # Validation pipes
│   │   ├── filters/        # Exception filters
│   │   └── main.ts         # Entry point
│   ├── prisma/             # Database schema & migrations
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml      # Local development setup
├── .github/                # GitHub Actions workflows
├── .env.example            # Environment variables template
└── README.md
```

## 🚀 Hướng dẫn cài đặt & Chạy dự án

### Yêu cầu hệ thống
- **Node.js** >= 18.x
- **pnpm** >= 8.x (hoặc npm/yarn)
- **Docker** & **Docker Compose** (khuyến nghị)
- **PostgreSQL** >= 15 (nếu không dùng Docker)
- **Redis** >= 7 (nếu không dùng Docker)

### Cách 1: Chạy với Docker (Khuyến nghị)

```bash
# Clone repository
git clone https://github.com/kirieis/FER202-e-commerce.git
cd FER202-e-commerce

# Copy environment variables
cp .env.example .env

# Chỉnh sửa .env với cấu hình của bạn
# (Database URL, JWT Secret, API Keys...)

# Khởi động toàn bộ stack
docker-compose up -d

# Kiểm tra logs
docker-compose logs -f

# Truy cập ứng dụng
# Frontend: http://localhost:3000
# Backend API: http://localhost:4000
# API Docs: http://localhost:4000/api/docs
```

### Cách 2: Chạy local development

```bash
# 1. Khởi động database & redis
docker-compose up -d postgres redis

# 2. Cài đặt dependencies
# Frontend
cd frontend && pnpm install

# Backend
cd ../backend && pnpm install

# 3. Setup database
cd backend
pnpm prisma migrate dev
pnpm prisma db seed

# 4. Chạy development servers
# Terminal 1 - Backend
cd backend && pnpm run start:dev

# Terminal 2 - Frontend
cd frontend && pnpm run dev
```

## 🔐 Biến môi trường quan trọng

Tạo file `.env` từ `.env.example` và cấu hình:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/elite_tech?schema=public"

# Redis
REDIS_URL="redis://localhost:6379"

# JWT
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"
JWT_REFRESH_SECRET="your-refresh-token-secret"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

# Frontend URL (for CORS)
FRONTEND_URL="http://localhost:3000"

# Email (SMTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# File Storage (AWS S3)
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="ap-southeast-1"
AWS_S3_BUCKET="elite-tech-uploads"

# Payment Gateway (VNPay / MoMo / Stripe)
VNPAY_TMN_CODE="your-tmn-code"
VNPAY_HASH_SECRET="your-hash-secret"
VNPAY_URL="https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"

# Search (Meilisearch)
MEILISEARCH_HOST="http://localhost:7700"
MEILISEARCH_API_KEY="your-master-key"
```

## 📚 API Documentation

API được tài liệu hóa bằng **OpenAPI/Swagger**. Truy cập tại:
- **Local**: `http://localhost:4000/api/docs`
- **Production**: `https://api.elitetechnology.vn/api/docs`

### Các endpoint chính

| Module | Endpoint | Mô tả |
|--------|----------|-------|
| **Auth** | `POST /api/v1/auth/register` | Đăng ký tài khoản |
| | `POST /api/v1/auth/login` | Đăng nhập |
| | `POST /api/v1/auth/refresh` | Làm mới access token |
| | `POST /api/v1/auth/forgot-password` | Quên mật khẩu |
| **Products** | `GET /api/v1/products` | Danh sách sản phẩm (có filter, pagination) |
| | `GET /api/v1/products/:id` | Chi tiết sản phẩm |
| | `GET /api/v1/products/:id/reviews` | Đánh giá sản phẩm |
| **Categories** | `GET /api/v1/categories` | Danh sách danh mục |
| **Cart** | `GET /api/v1/cart` | Xem giỏ hàng |
| | `POST /api/v1/cart/items` | Thêm vào giỏ |
| | `PATCH /api/v1/cart/items/:id` | Cập nhật số lượng |
| | `DELETE /api/v1/cart/items/:id` | Xóa khỏi giỏ |
| **Orders** | `POST /api/v1/orders` | Tạo đơn hàng |
| | `GET /api/v1/orders` | Lịch sử đơn hàng |
| | `GET /api/v1/orders/:id` | Chi tiết đơn hàng |
| | `POST /api/v1/orders/:id/cancel` | Hủy đơn hàng |
| **Payments** | `POST /api/v1/payments/create` | Tạo thanh toán |
| | `GET /api/v1/payments/callback` | Callback từ payment gateway |
| **Users** | `GET /api/v1/users/profile` | Hồ sơ cá nhân |
| | `PATCH /api/v1/users/profile` | Cập nhật hồ sơ |
| | `GET /api/v1/users/addresses` | Danh sách địa chỉ |
| | `POST /api/v1/users/addresses` | Thêm địa chỉ |

## 🗄️ Sơ đồ cơ sở dữ liệu (Tóm tắt)

### Các bảng chính
- **users** - Thông tin người dùng (khách hàng, admin, staff)
- **roles** - Phân quyền (admin, manager, staff, customer)
- **categories** - Danh mục sản phẩm (hỗ trợ nested categories)
- **brands** - Thương hiệu
- **products** - Sản phẩm chính
- **product_variants** - Biến thể sản phẩm (màu, dung lượng, cấu hình)
- **product_images** - Hình ảnh sản phẩm
- **product_reviews** - Đánh giá sản phẩm
- **carts** - Giỏ hàng
- **cart_items** - Chi tiết giỏ hàng
- **orders** - Đơn hàng
- **order_items** - Chi tiết đơn hàng
- **payments** - Thanh toán
- **shipping_addresses** - Địa chỉ giao hàng
- **coupons** - Mã giảm giá
- **coupon_usages** - Lịch sử sử dụng coupon
- **inventory_transactions** - Nhập/xuất kho
- **notifications** - Thông báo

## 🧪 Testing

```bash
# Unit tests
pnpm run test

# E2E tests
pnpm run test:e2e

# Coverage report
pnpm run test:cov

# Linting
pnpm run lint

# Type checking
pnpm run typecheck
```

## 📦 Build & Deploy

### Build production

```bash
# Frontend
cd frontend && pnpm run build

# Backend
cd backend && pnpm run build
```

### Deploy với Docker

```bash
# Build images
docker-compose -f docker-compose.prod.yml build

# Deploy
docker-compose -f docker-compose.prod.yml up -d

# Run migrations
docker-compose -f docker-compose.prod.yml exec backend pnpm prisma migrate deploy
```

## 🤝 Đóng góp

Chúng tôi hoan nghênh mọi đóng góp! Vui lòng tuân theo quy trình:

1. **Fork** repository
2. **Tạo branch** mới: `git checkout -b feature/ten-tinh-nang`
3. **Commit** thay đổi: `git commit -m 'feat: thêm tính năng X'`
4. **Push** lên branch: `git push origin feature/ten-tinh-nang`
5. Tạo **Pull Request**

### Convention commit messages
- `feat:` - Tính năng mới
- `fix:` - Sửa lỗi
- `docs:` - Cập nhật tài liệu
- `style:` - Format code (không thay đổi logic)
- `refactor:` - Refactor code
- `test:` - Thêm/sửa test
- `chore:` - Cập nhật build, dependencies

## 📄 License

Dự án này được phân phối dưới giấy phép **MIT License**. Xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 👥 Team & Credits

| Vai trò | Thành viên |
|---------|------------|
| **Project Lead** | [Tên của bạn] |
| **Frontend Developers** | [Tên thành viên] |
| **Backend Developers** | [Tên thành viên] |
| **UI/UX Designer** | [Tên thành viên] |
| **QA/Tester** | [Tên thành viên] |

## 📞 Liên hệ & Hỗ trợ

- **Website**: [https://elitetechnology.vn](https://elitetechnology.vn) (demo)
- **Email**: support@elitetechnology.vn
- **Hotline**: 1900-xxxx
- **Fanpage**: [Facebook Elite Technology](https://facebook.com/elitetechnology)
- **GitHub Issues**: [Tạo issue mới](https://github.com/kirieis/FER202-e-commerce/issues)

---

<div align="center">
  <p><strong>⭐ Nếu dự án hữu ích, hãy cho chúng tôi một star nhé!</strong></p>
  <p>Made with ❤️ by Elite Technology Team</p>
</div>