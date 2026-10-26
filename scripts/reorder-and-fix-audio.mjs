import fs from 'fs';
import path from 'path';

const filePath = path.resolve('src/data/products.ts');
const content = fs.readFileSync(filePath, 'utf8');
const eqPos = content.indexOf('=');
const start = content.indexOf('[', eqPos);
const end = content.lastIndexOf(']');
const products = JSON.parse(content.substring(start, end + 1));

// Separate products by category
const laptops = products.filter((p) => p.category === 'laptop');
const tablets = products.filter((p) => p.category === 'tablet');
let audios = products.filter((p) => p.category === 'audio');
const accessories = products.filter((p) => p.category === 'accessory');

// Fix specific audio images
audios.forEach((p) => {
  if (p.id === 'sony-wh-1000xm4-huyen-thoai') {
    // Distinct dark black over-ear headphone image
    p.imageUrl = '/products/sony-xm5-side.png';
    p.galleryUrls = [
      '/products/sony-xm5-side.png',
      '/products/sony-xm5-case.png',
      '/products/sony-xm5-main.png',
    ];
  } else if (p.id === 'sony-wh-ch720n-chong-on-sinh-vien') {
    p.imageUrl = '/products/sony-xm5-case.png';
    p.galleryUrls = [
      '/products/sony-xm5-case.png',
      '/products/sony-xm5-side.png',
    ];
  } else if (p.id === 'apple-airpods-max-chup-tai') {
    p.imageUrl = '/products/sony-xm5-main.png';
    p.galleryUrls = ['/products/sony-xm5-main.png', '/products/sony-xm5-side.png'];
  } else if (p.id === 'bose-quietcomfort-45-anc' || p.id === 'bose-quietcomfort-ultra') {
    p.imageUrl = '/products/sony-xm5-side.png';
    p.galleryUrls = ['/products/sony-xm5-side.png', '/products/sony-xm5-case.png'];
  }
});

// Re-order audio items so they show a rich diverse variety on page 1
const priorityAudioIds = [
  'sony-wh-1000xm5-noise-canceling',      // Over-ear beige
  'apple-airpods-pro-2-usb-c',             // Apple AirPods Pro
  'loa-marshall-emberton-ii',              // Marshall Speaker
  'sony-wh-1000xm4-huyen-thoai',           // Over-ear black
  'sony-linkbuds-s-sieu-nhe',              // Galaxy Buds style in-ear
  'bose-flex-main',                        // Bose Speaker
  'apple-airpods-3-magsafe',               // AirPods 3
  'loa-bluetooth-jbl-charge-5',            // JBL Speaker
];

audios.sort((a, b) => {
  const indexA = priorityAudioIds.findIndex((id) => a.id.includes(id) || id.includes(a.id));
  const indexB = priorityAudioIds.findIndex((id) => b.id.includes(id) || id.includes(b.id));

  if (indexA !== -1 && indexB !== -1) return indexA - indexB;
  if (indexA !== -1) return -1;
  if (indexB !== -1) return 1;
  return 0;
});

const allProducts = [...laptops, ...tablets, ...audios, ...accessories];

const outputCode = `import { Product } from '../types';

export const PRODUCTS: Product[] = ${JSON.stringify(allProducts, null, 2)};
`;

fs.writeFileSync(filePath, outputCode, 'utf8');
console.log('✅ Successfully reordered and diversified Audio products!');

// Update supabase/seed_products.json
const dbProducts = allProducts.map((p) => ({
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

fs.writeFileSync(path.resolve('supabase/seed_products.json'), JSON.stringify(dbProducts, null, 2), 'utf8');
console.log('✅ Updated supabase/seed_products.json!');
