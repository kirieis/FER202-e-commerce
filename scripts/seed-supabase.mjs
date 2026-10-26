import fs from 'fs';
import path from 'path';

/**
 * UniGear Supabase Data Seeder
 * Tự động đọc toàn bộ sản phẩm từ src/data/products.ts
 * và đẩy lên cơ sở dữ liệu Supabase qua REST API.
 */

// Đọc file .env.local hoặc .env nếu có
function loadEnv() {
  const envFiles = ['.env.local', '.env'];
  for (const file of envFiles) {
    const fullPath = path.resolve(process.cwd(), file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      content.split('\n').forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;
        const equalIdx = trimmed.indexOf('=');
        if (equalIdx > 0) {
          const key = trimmed.substring(0, equalIdx).trim();
          let value = trimmed.substring(equalIdx + 1).trim();
          if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.substring(1, value.length - 1);
          }
          if (!process.env[key]) {
            process.env[key] = value;
          }
        }
      });
      console.log(`ℹ️  Đã nạp biến môi trường từ ${file}`);
      break;
    }
  }
}

loadEnv();

const SUPABASE_URL =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL;

const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('\n❌ LỖI: Chưa cấu hình thông tin Supabase!');
  console.log('\n👉 Bạn có thể chạy lệnh với các biến môi trường như sau:');
  console.log('   SUPABASE_URL="https://xxx.supabase.co" SUPABASE_SERVICE_ROLE_KEY="eyJ..." node scripts/seed-supabase.mjs\n');
  console.log('👉 Hoặc tạo file .env.local với nội dung:');
  console.log('   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co');
  console.log('   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key\n');
  process.exit(1);
}

// 1. Đọc và parse dữ liệu từ products.ts
const productsFilePath = path.resolve('src/data/products.ts');
console.log(`📖 Đang đọc dữ liệu từ ${productsFilePath}...`);
const fileContent = fs.readFileSync(productsFilePath, 'utf8');
const eqIndex = fileContent.indexOf('=');
const startIndex = fileContent.indexOf('[', eqIndex);
const endIndex = fileContent.lastIndexOf(']');
const rawProducts = JSON.parse(fileContent.substring(startIndex, endIndex + 1));

console.log(`✅ Đã tìm thấy ${rawProducts.length} sản phẩm.`);

// 2. Chuyển đổi dữ liệu sang chuẩn snake_case của Supabase
const dbProducts = rawProducts.map((p) => ({
  id: p.id,
  name: p.name,
  brand: p.brand || null,
  sub_title: p.subTitle || null,
  description: p.desc || null,
  price: Number(p.price),
  old_price: p.oldPrice ? Number(p.oldPrice) : null,
  student_price: Number(p.studentPrice),
  category: p.category,
  discount_badge: p.discountBadge || null,
  image_url: p.imageUrl || null,
  gallery_urls: p.galleryUrls || [],
  image_type: p.imageType || null,
  rating: p.rating ? Number(p.rating) : 5.0,
  reviews_count: p.reviewsCount ? Number(p.reviewsCount) : 0,
  specs: p.specs || [],
  configurations: p.configurations || [],
  colors: p.colors || [],
  stock_location: p.stockLocation || null,
  monthly_installment: p.monthlyInstallment ? Number(p.monthlyInstallment) : null,
}));

// 3. Đẩy dữ liệu theo từng lô (Batching) để tránh vượt quá payload limit
async function seedData() {
  const BATCH_SIZE = 50;
  const totalBatches = Math.ceil(dbProducts.length / BATCH_SIZE);
  console.log(`🚀 Bắt đầu tải dữ liệu lên Supabase (${totalBatches} đợt, mỗi đợt ${BATCH_SIZE} sản phẩm)...`);

  const cleanUrl = SUPABASE_URL.replace(/\/$/, '');

  for (let i = 0; i < totalBatches; i++) {
    const batch = dbProducts.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE);
    console.log(`⏳ Đang tải đợt ${i + 1}/${totalBatches} (${batch.length} sản phẩm)...`);

    try {
      const response = await fetch(`${cleanUrl}/rest/v1/products`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'resolution=merge-duplicates', // Upsert
        },
        body: JSON.stringify(batch),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error(`❌ Đợt ${i + 1} thất bại:`, response.status, errorDetails);
        console.error('\nGợi ý khắc phục:');
        console.error('1. Đảm bảo bạn đã chạy file supabase/schema.sql trên Supabase SQL Editor.');
        console.error('2. Sử dụng SUPABASE_SERVICE_ROLE_KEY nếu bạn gặp lỗi 401 hoặc Row Level Security violation.\n');
        process.exit(1);
      }

      console.log(`   ✓ Hoàn tất đợt ${i + 1}/${totalBatches}`);
    } catch (err) {
      console.error(`❌ Lỗi kết nối mạng ở đợt ${i + 1}:`, err);
      process.exit(1);
    }
  }

  console.log(`\n🎉 THÀNH CÔNG! Toàn bộ ${dbProducts.length} sản phẩm đã được nạp vào Supabase!`);
}

seedData();
