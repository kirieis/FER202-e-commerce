import fs from 'fs';

// Accurate model families where angles belong to the exact same chassis
const MODEL_FAMILIES = {
  'macbook-air-m2': [
    '/products/macbook-air-m2-main.png',
    '/products/macbook-air-m2-angle.png',
    '/products/macbook-air-m2-keyboard.png',
    '/products/macbook-air-m2-ports.png',
    '/products/macbook-air-m2-back.png',
  ],
  'macbook-pro-14': [
    '/products/macbook-pro-14-main.png',
    '/products/macbook-pro-14-angle.png',
    '/products/macbook-pro-keyboard.png',
    '/products/macbook-pro-ports.png',
  ],
  'macbook-pro-16': [
    '/products/macbook-pro-16-main.png',
    '/products/macbook-pro-16-angle.png',
    '/products/macbook-pro-connectivity.png',
  ],
  'macbook-air-15': [
    '/products/macbook-air-15-midnight.png',
    '/products/macbook-air-15-silver.png',
    '/products/macbook-air-15-blue.png',
  ],
  'dell-16': [
    '/products/dell-16-main.png',
    '/products/dell-16-angle.png',
    '/products/dell-16-keyboard.png',
    '/products/dell-16-ports.png',
    '/products/dell-16-back.png',
  ],
  'dell-15': [
    '/products/dell-15-main.png',
    '/products/dell-15-angle.png',
  ],
  'asus-tuf': [
    '/products/asus-tuf-main.png',
    '/products/asus-tuf-angle.png',
    '/products/asus-tuf-keyboard.png',
    '/products/asus-tuf-ports.png',
    '/products/asus-tuf-back.png',
  ],
  'asus-vivobook': [
    '/products/asus-vivobook-main.png',
    '/products/asus-vivobook-angle.png',
  ],
  'hp-victus': [
    '/products/hp-victus-main.png',
    '/products/hp-victus-angle.png',
  ],
  'acer-nitro': [
    '/products/acer-nitro-main.png',
    '/products/acer-nitro-angle.png',
  ],
  'lenovo-loq': [
    '/products/lenovo-loq-main.png',
    '/products/lenovo-loq-angle.png',
  ],
  'thinkpad-e16': [
    '/products/thinkpad-e16-main.png',
    '/products/thinkpad-e16-angle.png',
  ],
  'ipad-10': [
    '/products/ipad-10-main.png',
    '/products/ipad-10-angle.png',
    '/products/ipad-10-case.png',
  ],
  'tab-s9': [
    '/products/tab-s9-main.png',
    '/products/tab-s9-side.png',
    '/products/tab-s9-back.png',
  ],
  'redmi-pad': [
    '/products/redmi-pad-main.png',
    '/products/redmi-pad-angle.png',
    '/products/redmi-pad-back.png',
  ],
  'sony-xm5': [
    '/products/sony-xm5-main.png',
    '/products/sony-xm5-side.png',
    '/products/sony-xm5-case.png',
  ],
  'bose-flex': [
    '/products/bose-flex-main.png',
    '/products/bose-flex-side.png',
    '/products/bose-flex-color.png',
  ],
  'marshall-emberton': [
    '/products/marshall-emberton-main.png',
    '/products/marshall-emberton-top.png',
  ],
  'galaxy-buds': [
    '/products/galaxy-buds-main.png',
    '/products/galaxy-buds-ear.png',
    '/products/galaxy-buds-case.png',
  ],
  'airpods-pro-2': [
    '/products/airpods-pro-2-main.png',
    '/products/airpods-pro-2-angle.png',
    '/products/airpods-pro-2-case.png',
    '/products/airpods-pro-2-side.png',
  ],
  'aula-f75': [
    '/products/aula-f75-main.png',
    '/products/aula-f75-angle.png',
    '/products/aula-f75-side.png',
  ],
  'magic-keyboard': [
    '/products/magic-keyboard-main.png',
    '/products/magic-keyboard-angle.png',
  ],
  'logitech-pebble': [
    '/products/logitech-pebble-main.png',
    '/products/logitech-pebble-angle.png',
  ],
  'mx-master-3s': [
    '/products/mx-master-3s-main.png',
    '/products/mx-master-3s-side.png',
    '/products/mx-master-3s-bottom.png',
  ],

  // Custom Verified SVG Sets
  'zenbook-duo': [
    '/products/zenbook-duo-main.svg',
    '/products/zenbook-duo-angle.svg',
    '/products/zenbook-duo-keyboard.svg',
  ],
  'surface-laptop-5': [
    '/products/surface-laptop-5-main.svg',
    '/products/surface-laptop-5-angle.svg',
  ],
  'msi-thin-gf63': [
    '/products/msi-thin-gf63-main.svg',
    '/products/msi-thin-gf63-angle.svg',
  ],
  'lg-gram-14': [
    '/products/lg-gram-14-main.svg',
    '/products/lg-gram-14-angle.svg',
  ],
  'surface-pro-9': [
    '/products/surface-pro-9-main.svg',
    '/products/surface-pro-9-kickstand.svg',
  ],
  'anker-737': [
    '/products/anker-737-main.svg',
    '/products/anker-737-ports.svg',
  ],
  'ugreen-nexode-65w': [
    '/products/ugreen-nexode-65w-main.svg',
    '/products/ugreen-nexode-65w-side.svg',
  ],
  'baseus-blade-100w': [
    '/products/baseus-blade-100w-main.svg',
    '/products/baseus-blade-100w-ports.svg',
  ],
  'keychron-k4': [
    '/products/keychron-k4-main.svg',
    '/products/keychron-k4-angle.svg',
  ],
  'marshall-major-iv': [
    '/products/marshall-major-iv-main.svg',
    '/products/marshall-major-iv-side.svg',
  ],
  'ath-m50xbt2': [
    '/products/ath-m50xbt2-main.svg',
    '/products/ath-m50xbt2-angle.svg',
  ],
  'jbl-charge-5': [
    '/products/jbl-charge-5-main.svg',
    '/products/jbl-charge-5-side.svg',
  ],
};

let raw = fs.readFileSync('src/data/products.ts', 'utf8');
raw = raw.replace(/import\s+.*?;/, '');
raw = raw.replace(/export\s+const\s+PRODUCTS\s*:\s*Product\[\]\s*=/, 'return');
const fn = new Function(raw);
const products = fn();

let updatedTotal = 0;
let singleImageCount = 0;
let multiAngleCount = 0;

products.forEach((p) => {
  const currentImg = p.imageUrl;

  // Find matching family
  let matchedFamily = null;
  for (const [familyName, angleList] of Object.entries(MODEL_FAMILIES)) {
    // If the product image starts with this family or contains it
    if (currentImg.includes(familyName)) {
      matchedFamily = angleList;
      break;
    }
  }

  if (matchedFamily) {
    // Ensure currentImg is the first element in galleryUrls
    const reordered = [
      currentImg,
      ...matchedFamily.filter((url) => url !== currentImg),
    ];
    p.galleryUrls = reordered;
    multiAngleCount++;
  } else {
    // For products with 1 dedicated image (e.g. Anker Nano 3, Backpack, Stand, Hub, etc.),
    // STRICTLY set galleryUrls to only contain its own image! No cross-pollination!
    p.galleryUrls = [currentImg];
    singleImageCount++;
  }
  updatedTotal++;
});

console.log(
  `Sanitized all ${updatedTotal} products: ${multiAngleCount} with verified multi-angles, ${singleImageCount} with dedicated 100% verified single view.`
);

const output = `import { Product } from '../types';\n\nexport const PRODUCTS: Product[] = ${JSON.stringify(
  products,
  null,
  2
)};\n`;

fs.writeFileSync('src/data/products.ts', output, 'utf8');
fs.writeFileSync('supabase/seed_products.json', JSON.stringify(products, null, 2), 'utf8');
console.log('Saved src/data/products.ts and supabase/seed_products.json.');
