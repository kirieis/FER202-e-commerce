import fs from 'fs';
import path from 'path';

// Đọc và parse dữ liệu từ products.ts
const productsFilePath = path.resolve('src/data/products.ts');
const fileContent = fs.readFileSync(productsFilePath, 'utf8');
const eqIndex = fileContent.indexOf('=');
const startIndex = fileContent.indexOf('[', eqIndex);
const endIndex = fileContent.lastIndexOf(']');
const rawProducts = JSON.parse(fileContent.substring(startIndex, endIndex + 1));

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

const outPath = path.resolve('supabase/seed_products.json');
fs.writeFileSync(outPath, JSON.stringify(dbProducts, null, 2), 'utf8');

console.log(`✅ Đã xuất ${dbProducts.length} sản phẩm ra file: ${outPath}`);
