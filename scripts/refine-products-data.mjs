import fs from 'fs';
import path from 'path';

const filePath = path.resolve('src/data/products.ts');
const content = fs.readFileSync(filePath, 'utf8');
const eqPos = content.indexOf('=');
const start = content.indexOf('[', eqPos);
const end = content.lastIndexOf(']');
const products = JSON.parse(content.substring(start, end + 1));

console.log(`Auditing and refining ${products.length} products...`);

products.forEach((p) => {
  const nameLower = p.name.toLowerCase();
  const idLower = p.id.toLowerCase();

  // -------------------------------------------------------------
  // 1. LAPTOP REFINE
  // -------------------------------------------------------------
  if (p.category === 'laptop') {
    p.stockLocation = `Còn ${Math.floor(Math.random() * 8) + 4} máy tại kho KTX & Campus Hub`;
    // Ensure laptop configurations have meaningful specs
    p.configurations = [
      {
        id: 'cfg-standard',
        label: 'Bản Tiêu Chuẩn Học Tập',
        note: 'Tối ưu chi phí sinh viên, đủ dùng 4 năm đại học',
        price: p.price,
        studentPrice: p.studentPrice,
      },
      {
        id: 'cfg-pro',
        label: 'Bản Nâng Cấp RAM / SSD (+10%)',
        note: 'Dung lượng bộ nhớ lớn hơn, mở nhiều tab & đồ án nặng',
        price: Math.round(p.price * 1.1),
        studentPrice: Math.round(p.studentPrice * 1.1),
      },
    ];
  }

  // -------------------------------------------------------------
  // 2. AUDIO REFINE
  // -------------------------------------------------------------
  else if (p.category === 'audio') {
    p.stockLocation = `Còn ${Math.floor(Math.random() * 10) + 5} bộ tại kho KTX & Campus Hub`;

    // Configurations
    p.configurations = [
      {
        id: 'cfg-standard',
        label: 'Bản Tiêu Chuẩn Học Tập',
        note: 'Hàng tuyển chọn Like New 99%, tiết kiệm ví sinh viên, BH 6 tháng',
        price: p.price,
        studentPrice: p.studentPrice,
      },
      {
        id: 'cfg-pro',
        label: 'Bản Fullbox New Seal (+12%)',
        note: 'Nguyên hộp nguyên seal chính hãng, bảo hành 12 tháng 1 đổi 1',
        price: Math.round(p.price * 1.12),
        studentPrice: Math.round(p.studentPrice * 1.12),
      },
    ];

    // Image & Gallery mapping
    if (nameLower.includes('airpods')) {
      p.imageUrl = '/products/airpods-pro-2-main.png';
      p.galleryUrls = [
        '/products/airpods-pro-2-main.png',
        '/products/airpods-pro-2-angle.png',
        '/products/airpods-pro-2-case.png',
        '/products/airpods-pro-2-side.png',
      ];
      p.colors = [
        { id: 'white', name: 'Trắng Apple White', hex: '#F5F5F7' },
      ];
    } else if (nameLower.includes('galaxy buds') || nameLower.includes('buds')) {
      p.imageUrl = '/products/galaxy-buds-main.png';
      p.galleryUrls = [
        '/products/galaxy-buds-main.png',
        '/products/galaxy-buds-case.png',
        '/products/galaxy-buds-ear.png',
      ];
      p.colors = [
        { id: 'graphite', name: 'Xám Than Chì Graphite', hex: '#212529' },
        { id: 'silver', name: 'Bạc Ánh Kim Silver', hex: '#E9ECEF' },
        { id: 'purple', name: 'Tím Bora Purple', hex: '#A890D3' },
      ];
    } else if (nameLower.includes('marshall')) {
      p.imageUrl = '/products/marshall-emberton-main.png';
      p.galleryUrls = [
        '/products/marshall-emberton-main.png',
        '/products/marshall-emberton-top.png',
      ];
      p.colors = [
        { id: 'black-brass', name: 'Đen Viền Vàng Black & Brass', hex: '#1C1917' },
        { id: 'cream', name: 'Kem Cổ Điển Cream Vintage', hex: '#EAE5D9' },
      ];
    } else if (nameLower.includes('bose')) {
      p.imageUrl = '/products/bose-flex-main.png';
      p.galleryUrls = [
        '/products/bose-flex-main.png',
        '/products/bose-flex-side.png',
        '/products/bose-flex-color.png',
      ];
      p.colors = [
        { id: 'black', name: 'Đen Carbon Black', hex: '#18181B' },
        { id: 'blue', name: 'Xanh Khói Stone Blue', hex: '#64748B' },
      ];
    } else if (nameLower.includes('loa') || nameLower.includes('speaker') || nameLower.includes('jbl charge') || nameLower.includes('flip')) {
      p.imageUrl = '/products/audio-speaker.png';
      p.galleryUrls = ['/products/audio-speaker.png', '/products/marshall-emberton-top.png'];
      p.colors = [
        { id: 'black', name: 'Đen Nhám Classic', hex: '#18181B' },
        { id: 'camo', name: 'Xanh Rêu Camo Green', hex: '#3F4E4F' },
      ];
    } else if (nameLower.includes('sony wh-1000xm5')) {
      p.imageUrl = '/products/sony-xm5-main.png';
      p.galleryUrls = [
        '/products/sony-xm5-main.png',
        '/products/sony-xm5-side.png',
      ];
      p.colors = [
        { id: 'black', name: 'Đen Nhám Midnight', hex: '#1C1F26' },
        { id: 'silver', name: 'Bạc Ánh Kim Platinum Silver', hex: '#D8D8D8' },
      ];
    } else if (nameLower.includes('wh-') || nameLower.includes('tai nghe chụp') || nameLower.includes('headphone') || nameLower.includes('xm4')) {
      p.imageUrl = '/products/audio-headphone.png';
      p.galleryUrls = [
        '/products/audio-headphone.png',
        '/products/sony-xm5-side.png',
      ];
      p.colors = [
        { id: 'black', name: 'Đen Nhám Midnight Black', hex: '#1C1F26' },
        { id: 'silver', name: 'Bạc Ánh Kim Platinum Silver', hex: '#D8D8D8' },
        { id: 'navy', name: 'Xanh Biển Sâu Navy', hex: '#1E293B' },
      ];
    } else {
      // In-ear earbuds generic
      p.imageUrl = '/products/audio-earbuds.png';
      p.galleryUrls = [
        '/products/audio-earbuds.png',
        '/products/galaxy-buds-case.png',
      ];
      p.colors = [
        { id: 'black', name: 'Đen Nhám Black', hex: '#18181B' },
        { id: 'white', name: 'Trắng Sứ White', hex: '#F8FAFC' },
      ];
    }
  }

  // -------------------------------------------------------------
  // 3. TABLET REFINE
  // -------------------------------------------------------------
  else if (p.category === 'tablet') {
    p.stockLocation = `Còn ${Math.floor(Math.random() * 9) + 3} máy tại kho KTX & Campus Hub`;

    // Configurations
    p.configurations = [
      {
        id: 'cfg-standard',
        label: 'Bản Wi-Fi 128GB Học Tập',
        note: 'Tối ưu ghi chép bài giảng, xem slide PDF & vẽ sơ đồ tư duy',
        price: p.price,
        studentPrice: p.studentPrice,
      },
      {
        id: 'cfg-pro',
        label: 'Bản 256GB / Kết Nối 5G (+15%)',
        note: 'Dung lượng gấp đôi, lắp SIM 4G/5G học tập và làm việc mọi nơi',
        price: Math.round(p.price * 1.15),
        studentPrice: Math.round(p.studentPrice * 1.15),
      },
    ];

    // Image & Gallery mapping
    if (nameLower.includes('ipad pro')) {
      p.imageUrl = '/products/ipad-pro-11-main.png';
      p.galleryUrls = [
        '/products/ipad-pro-11-main.png',
        '/products/tablet-ipad.png',
      ];
      p.colors = [
        { id: 'space-grey', name: 'Xám Không Gian Space Grey', hex: '#4B4D52' },
        { id: 'silver', name: 'Bạc Ánh Trăng Silver', hex: '#D2D5DC' },
      ];
    } else if (nameLower.includes('ipad air')) {
      p.imageUrl = '/products/ipad-air-main.png';
      p.galleryUrls = [
        '/products/ipad-air-main.png',
        '/products/ipad-10-angle.png',
      ];
      p.colors = [
        { id: 'space-grey', name: 'Xám Không Gian Space Grey', hex: '#4B4D52' },
        { id: 'blue', name: 'Xanh Da Trời Sky Blue', hex: '#7DD3FC' },
        { id: 'pink', name: 'Hồng Pastel Pink', hex: '#F472B6' },
      ];
    } else if (nameLower.includes('ipad')) {
      p.imageUrl = '/products/ipad-10-main.png';
      p.galleryUrls = [
        '/products/ipad-10-main.png',
        '/products/ipad-10-angle.png',
        '/products/ipad-10-case.png',
      ];
      p.colors = [
        { id: 'silver', name: 'Bạc Ánh Trăng Silver', hex: '#D2D5DC' },
        { id: 'blue', name: 'Xanh Biển Blue', hex: '#38BDF8' },
        { id: 'yellow', name: 'Vàng Nắng Yellow', hex: '#FDE047' },
      ];
    } else if (nameLower.includes('tab s') || nameLower.includes('galaxy tab')) {
      p.imageUrl = '/products/tab-s9-main.png';
      p.galleryUrls = [
        '/products/tab-s9-main.png',
        '/products/tab-s9-side.png',
        '/products/tab-s9-back.png',
      ];
      p.colors = [
        { id: 'graphite', name: 'Xám Than Chì Graphite', hex: '#374151' },
        { id: 'beige', name: 'Vàng Be Kem Beige', hex: '#F5F5DC' },
      ];
    } else if (nameLower.includes('redmi') || nameLower.includes('xiaomi') || nameLower.includes('pad')) {
      p.imageUrl = '/products/redmi-pad-main.png';
      p.galleryUrls = [
        '/products/redmi-pad-main.png',
        '/products/redmi-pad-angle.png',
        '/products/redmi-pad-back.png',
      ];
      p.colors = [
        { id: 'graphite-gray', name: 'Xám Khói Graphite Gray', hex: '#4B5563' },
        { id: 'mint-green', name: 'Xanh Bạc Hà Mint Green', hex: '#86EFAC' },
      ];
    } else {
      p.imageUrl = '/products/tablet-generic.png';
      p.galleryUrls = ['/products/tablet-generic.png', '/products/tablet-galaxy.png'];
      p.colors = [
        { id: 'black', name: 'Đen Mờ Matte Black', hex: '#1F2937' },
        { id: 'silver', name: 'Bạc Kim Loại Silver', hex: '#E5E7EB' },
      ];
    }
  }

  // -------------------------------------------------------------
  // 4. ACCESSORY REFINE
  // -------------------------------------------------------------
  else if (p.category === 'accessory') {
    p.stockLocation = `Còn ${Math.floor(Math.random() * 15) + 6} chiếc tại kho KTX & Campus Hub`;

    const isKeyboard = nameLower.includes('phím') || nameLower.includes('keyboard') || nameLower.includes('aula');
    const isMouse = nameLower.includes('chuột') || nameLower.includes('mouse') || nameLower.includes('master') || nameLower.includes('pebble') || nameLower.includes('g502');

    if (isKeyboard) {
      p.configurations = [
        {
          id: 'cfg-standard',
          label: 'Switch Linear (Gõ êm KTX/Thư viện)',
          note: 'Hành trình phím mượt, cực êm, không gây ồn phòng trọ khi học khuya',
          price: p.price,
          studentPrice: p.studentPrice,
        },
        {
          id: 'cfg-pro',
          label: 'Switch Tactile 3-Mode Wireless (+10%)',
          note: 'Phản hồi khấc nảy cơ học, hỗ trợ 3 chế độ (Bluetooth 5.0, 2.4G & Dây Type-C)',
          price: Math.round(p.price * 1.1),
          studentPrice: Math.round(p.studentPrice * 1.1),
        },
      ];

      if (nameLower.includes('aula') || nameLower.includes('f75')) {
        p.imageUrl = '/products/aula-f75-main.png';
        p.galleryUrls = [
          '/products/aula-f75-main.png',
          '/products/aula-f75-angle.png',
          '/products/aula-f75-side.png',
        ];
        p.colors = [
          { id: 'ice-blue', name: 'Xanh Tuyết Ice Blue', hex: '#BAE6FD' },
          { id: 'retro', name: 'Xám Trắng Phím Retro', hex: '#D1D5DB' },
        ];
      } else if (nameLower.includes('magic keyboard')) {
        p.imageUrl = '/products/magic-keyboard-main.png';
        p.galleryUrls = [
          '/products/magic-keyboard-main.png',
          '/products/magic-keyboard-angle.png',
        ];
        p.colors = [
          { id: 'white', name: 'Trắng Bạc Apple Silver', hex: '#F3F4F6' },
        ];
      } else {
        p.imageUrl = '/products/accessory-keyboard.png';
        p.galleryUrls = ['/products/accessory-keyboard.png', '/products/aula-f75-angle.png'];
        p.colors = [
          { id: 'black', name: 'Đen Huyền Bí Black', hex: '#18181B' },
          { id: 'white', name: 'Trắng Tinh Khôi White', hex: '#F9FAFB' },
        ];
      }
    } else if (isMouse) {
      p.configurations = [
        {
          id: 'cfg-standard',
          label: 'Bản Không Dây Tiêu Chuẩn',
          note: 'Kết nối Bluetooth kép & đầu thu USB, pin trâu dùng 2 - 3 tháng',
          price: p.price,
          studentPrice: p.studentPrice,
        },
        {
          id: 'cfg-pro',
          label: 'Bản Công Thái Học Ergonomic (+10%)',
          note: 'Chống mỏi cổ tay khi làm đồ án nhiều giờ, sạc nhanh qua cổng Type-C',
          price: Math.round(p.price * 1.1),
          studentPrice: Math.round(p.studentPrice * 1.1),
        },
      ];

      if (nameLower.includes('master 3s') || nameLower.includes('mx master')) {
        p.imageUrl = '/products/mx-master-3s-main.png';
        p.galleryUrls = [
          '/products/mx-master-3s-main.png',
          '/products/mx-master-3s-side.png',
          '/products/mx-master-3s-bottom.png',
        ];
        p.colors = [
          { id: 'graphite', name: 'Xám Than Chì Graphite', hex: '#262626' },
          { id: 'pale-gray', name: 'Xám Nhạt Pale Gray', hex: '#E5E5E5' },
        ];
      } else if (nameLower.includes('g502') || nameLower.includes('gaming')) {
        p.imageUrl = '/products/g502-main.png';
        p.galleryUrls = ['/products/g502-main.png', '/products/accessory-mouse-gaming.png'];
        p.colors = [
          { id: 'black', name: 'Đen Gaming Hero Black', hex: '#18181B' },
        ];
      } else if (nameLower.includes('pebble')) {
        p.imageUrl = '/products/logitech-pebble-main.png';
        p.galleryUrls = [
          '/products/logitech-pebble-main.png',
          '/products/logitech-pebble-angle.png',
        ];
        p.colors = [
          { id: 'white', name: 'Trắng Sữa Off-White', hex: '#F9FAFB' },
          { id: 'pink', name: 'Hồng Phấn Rose Pink', hex: '#FBCFE8' },
        ];
      } else if (nameLower.includes('magic mouse')) {
        p.imageUrl = '/products/magic-mouse-main.png';
        p.galleryUrls = ['/products/magic-mouse-main.png', '/products/accessory-mouse-apple.png'];
        p.colors = [
          { id: 'white', name: 'Trắng Apple White', hex: '#F3F4F6' },
          { id: 'black', name: 'Đen Không Gian Space Black', hex: '#18181B' },
        ];
      } else {
        p.imageUrl = '/products/accessory-mouse.png';
        p.galleryUrls = ['/products/accessory-mouse.png', '/products/accessory-mouse-mx.png'];
        p.colors = [
          { id: 'black', name: 'Đen Mờ Matte Black', hex: '#18181B' },
          { id: 'white', name: 'Trắng Sứ White', hex: '#F9FAFB' },
        ];
      }
    } else {
      // Chargers, Hubs, Adapters
      p.configurations = [
        {
          id: 'cfg-standard',
          label: 'Bản Tiêu Chuẩn Học Tập 65W',
          note: 'Sạc nhanh công suất cao cho laptop, tablet & smartphone sinh viên',
          price: p.price,
          studentPrice: p.studentPrice,
        },
        {
          id: 'cfg-pro',
          label: 'Bản Đa Cổng GaN 100W (+12%)',
          note: 'Công nghệ GaN III tỏa nhiệt thấp, sạc đồng thời 3 thiết bị cùng lúc',
          price: Math.round(p.price * 1.12),
          studentPrice: Math.round(p.studentPrice * 1.12),
        },
      ];
      p.imageUrl = '/products/audio-speaker.png'; // clean compact fallback
      p.galleryUrls = ['/products/audio-speaker.png'];
      p.colors = [
        { id: 'black', name: 'Đen Nhám Matte Black', hex: '#18181B' },
        { id: 'white', name: 'Trắng Tinh White', hex: '#FFFFFF' },
      ];
    }
  }
});

// Write updated products back to src/data/products.ts
const outputCode = `import { Product } from '../types';

export const PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};
`;

fs.writeFileSync(filePath, outputCode, 'utf8');
console.log(`✅ Successfully updated ${products.length} products in src/data/products.ts!`);

// Update seed_products.json as well
const dbProducts = products.map((p) => ({
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
console.log(`✅ Updated supabase/seed_products.json!`);
