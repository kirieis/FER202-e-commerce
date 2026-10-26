import fs from 'fs';

const mappings = {
  // ACCESSORIES - Chargers, Powerbanks, Stands, Hubs, Backpacks
  'sac-du-phong-anker-737-gan-24-000mah-140w': '/products/anker-737-main.svg',
  'cu-sac-nhanh-ugreen-nexode-65w-gan-3-cong': '/products/ugreen-nexode-65w-main.svg',
  'sac-du-phong-baseus-blade-100w-sieu-mong': '/products/baseus-blade-100w-main.svg',
  'cu-sac-anker-511-nano-3-30w-sieu-nho': '/products/anker-nano-30w-main.svg',
  'balo-cong-nghe-unigear-tech-shield-15-6': '/products/unigear-backpack-main.svg',
  'gia-do-nhom-cong-thai-hoc-xoay-360': '/products/laptop-stand-aluminum-main.svg',
  'hub-chuyen-doi-type-c-8-in-1-da-nang': '/products/hub-typec-8in1-main.svg',
  'cu-sac-baseus-gan5-pro-65w-sieu-mong': '/products/ugreen-nexode-65w-main.svg',
  'sac-du-phong-xiaomi-20-000mah-18w-fast-charge': '/products/xiaomi-powerbank-20k-main.svg',

  // ACCESSORIES - Keyboards & Mice
  'ban-phim-co-keychron-k4-pro-qmk-via': '/products/keychron-k4-main.svg',
  'ban-phim-co-keychron-k2-pro-khong-day': '/products/keychron-k4-main.svg',
  'ban-phim-logitech-mx-keys-mini': '/products/logitech-mx-keys-main.svg',
  'ban-phim-co-akko-3084b-plus-da-nang': '/products/aula-f75-main.png',
  'ban-phim-co-rk84-royal-kludge': '/products/aula-f75-side.png',
  'ban-phim-co-feker-alice-80-cong-thai-hoc': '/products/feker-alice-main.svg',
  'ban-phim-co-dareu-ek87-tenkeyless': '/products/accessory-keyboard.png',
  'ban-phim-apple-magic-keyboard-us': '/products/magic-keyboard-main.png',
  'chuot-khong-day-logitech-mx-master-3s': '/products/mx-master-3s-main.png',
  'chuot-logitech-g-pro-x-superlight': '/products/accessory-mouse-gaming.png',
  'chuot-logitech-g502-hero-gaming': '/products/g502-main.png',
  'chuot-logitech-pebble-m350-nho-gon': '/products/logitech-pebble-main.png',
  'chuot-razer-deathadder-essential': '/products/accessory-mouse.png',
  'chuot-dung-logitech-lift-vertical': '/products/accessory-mouse-mx.png',
  'chuot-gaming-razer-viper-mini-sieu-nhe': '/products/accessory-mouse-gaming.png',

  // AUDIO
  'loa-bluetooth-jbl-charge-5': '/products/jbl-charge-5-main.svg',
  'sony-wh-ch720n-chong-on-sinh-vien': '/products/sony-xm5-case.png',
  'sony-wf-c700n-tws-nho-gon': '/products/galaxy-buds-case.png',
  'apple-airpods-3-magsafe': '/products/airpods-pro-2-case.png',
  'apple-airpods-max-chup-tai': '/products/audio-headphone.png',
  'beats-studio-pro-khong-day': '/products/audio-headphone.png',
  'loa-marshall-willen-bo-tui': '/products/marshall-emberton-top.png',
  'loa-bluetooth-jbl-flip-6': '/products/bose-flex-main.png',
  'loa-jbl-go-3-mini': '/products/bose-flex-color.png',
  'bose-quietcomfort-45-anc': '/products/sony-xm5-side.png',
  'bose-quietcomfort-ultra': '/products/bose-flex-side.png',
  'sennheiser-momentum-4-wireless': '/products/audio-headphone.png',
  'sony-wh-ch520-on-ear-khong-day': '/products/audio-headphone.png',
  'jbl-tune-760nc-chong-on-chu-dong': '/products/jbl-tune-760nc-main.svg',
  'jbl-wave-beam-true-wireless': '/products/galaxy-buds-ear.png',
  'marshall-major-iv-chup-tai-bieu-tuong': '/products/marshall-major-iv-main.svg',
  'soundpeats-capsule3-pro-hi-res-ldac': '/products/galaxy-buds-ear.png',
  'audio-technica-ath-m50xbt2-chuyen-nghiep': '/products/ath-m50xbt2-main.svg',

  // LAPTOPS
  'apple-macbook-air-15-m2': '/products/macbook-air-15-midnight.png',
  'apple-macbook-air-m1-13-3': '/products/macbook-air-15-blue.png',
  'apple-macbook-pro-14-m2-pro': '/products/macbook-air-15-silver.png',
  'dell-xps-15-9530-rtx-4050': '/products/dell-15-angle.png',
  'dell-inspiron-15-3520-120hz': '/products/dell-16-angle.png',
  'dell-latitude-5430-doanh-nhan': '/products/dell-16-main.png',
  'lenovo-thinkpad-x1-carbon-gen-11': '/products/thinkpad-e16-angle.png',
  'lenovo-ideapad-slim-5-14': '/products/lenovo-loq-angle.png',
  'asus-zenbook-14-oled-ux3405': '/products/asus-vivobook-angle.png',
  'asus-tuf-gaming-a15-rtx-3050': '/products/asus-tuf-angle.png',
  'asus-rog-zephyrus-g14-rtx-4060': '/products/asus-tuf-keyboard.png',
  'asus-zenbook-duo-2-man-hinh-ux8406': '/products/zenbook-duo-main.svg',
  'hp-envy-14-xoay-gap-360': '/products/hp-victus-angle.png',
  'acer-predator-helios-16-rtx-4060': '/products/acer-nitro-angle.png',
  'acer-aspire-5-sieu-ben': '/products/dell-16-main.png',
  'msi-modern-14-c12mo': '/products/dell-15-angle.png',
  'msi-thin-gf63-gaming-rtx-3050': '/products/msi-thin-gf63-main.svg',
  'lg-gram-14-super-ultralight': '/products/lg-gram-14-main.svg',
  'lg-gram-16-man-lon-sieu-nhe': '/products/lg-gram-14-main.svg',
  'microsoft-surface-laptop-5': '/products/surface-laptop-5-main.svg',
  'gigabyte-g5-gaming-rtx-4050': '/products/acer-nitro-main.png',
  'hp-envy-x360-14-2in1': '/products/hp-victus-angle.png',
  'lenovo-yoga-slim-7-14': '/products/lenovo-loq-angle.png',
  'dell-vostro-3520-i5': '/products/dell-16-main.png',
  'dell-latitude-7420-carbon': '/products/dell-16-angle.png',
  'lenovo-thinkpad-t14s-gen4-amd': '/products/thinkpad-e16-angle.png',

  // TABLETS
  'apple-ipad-gen-9-10-2': '/products/ipad-10-angle.png',
  'apple-ipad-mini-6-8-3': '/products/ipad-10-case.png',
  'samsung-galaxy-tab-s9-fe': '/products/tab-s9-side.png',
  'samsung-galaxy-tab-s9-plus-12-4': '/products/tab-s9-back.png',
  'samsung-galaxy-tab-s8-11': '/products/tablet-galaxy.png',
  'samsung-galaxy-tab-a9-11-90hz': '/products/tablet-galaxy.png',
  'xiaomi-pad-6-pro-11': '/products/redmi-pad-angle.png',
  'redmi-pad-se-11': '/products/redmi-pad-back.png',
  'huawei-matepad-11-5': '/products/redmi-pad-angle.png',
  'samsung-galaxy-tab-s9-11-128gb': '/products/tab-s9-side.png',
  'samsung-galaxy-tab-active4-pro-ben-bi': '/products/tab-s9-back.png',
  'redmi-pad-pro-12-1-man-lon-2-5k': '/products/redmi-pad-angle.png',
};

let raw = fs.readFileSync('src/data/products.ts', 'utf8');
raw = raw.replace(/import\s+.*?;/, '');
raw = raw.replace(/export\s+const\s+PRODUCTS\s*:\s*Product\[\]\s*=/, 'return');
const fn = new Function(raw);
const products = fn();

let matchCount = 0;
products.forEach((p) => {
  if (mappings[p.id]) {
    p.imageUrl = mappings[p.id];
    if (p.galleryUrls && p.galleryUrls.length > 0) {
      p.galleryUrls[0] = mappings[p.id];
    } else {
      p.galleryUrls = [mappings[p.id]];
    }
    matchCount++;
  }
});

console.log(`Successfully mapped ${matchCount} products!`);

const output = `import { Product } from '../types';\n\nexport const PRODUCTS: Product[] = ${JSON.stringify(
  products,
  null,
  2
)};\n`;

fs.writeFileSync('src/data/products.ts', output, 'utf8');
fs.writeFileSync('supabase/seed_products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('Saved src/data/products.ts and supabase/seed_products.json successfully.');
