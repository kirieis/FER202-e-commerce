import { Product } from '../types';

export interface PriceTier {
  id: string;
  label: string;
  min?: number;
  max?: number;
}

export const CATEGORY_PRICE_TIERS: Record<string, PriceTier[]> = {
  laptop: [
    { id: 'all', label: 'Mọi mức giá' },
    { id: 'lt15', label: 'Dưới 15 triệu', max: 15000000 },
    { id: '15to25', label: '15 – 25 triệu', min: 15000000, max: 25000000 },
    { id: '25to35', label: '25 – 35 triệu', min: 25000000, max: 35000000 },
    { id: 'gt35', label: 'Trên 35 triệu', min: 35000000 },
  ],
  tablet: [
    { id: 'all', label: 'Mọi mức giá' },
    { id: 'lt7', label: 'Dưới 7 triệu', max: 7000000 },
    { id: '7to15', label: '7 – 15 triệu', min: 7000000, max: 15000000 },
    { id: 'gt15', label: 'Trên 15 triệu', min: 15000000 },
  ],
  audio: [
    { id: 'all', label: 'Mọi mức giá' },
    { id: 'lt1m', label: 'Dưới 1 triệu', max: 1000000 },
    { id: '1mto3m', label: '1 – 3 triệu', min: 1000000, max: 3000000 },
    { id: 'gt3m', label: 'Trên 3 triệu', min: 3000000 },
  ],
  accessory: [
    { id: 'all', label: 'Mọi mức giá' },
    { id: 'lt500k', label: 'Dưới 500k', max: 500000 },
    { id: '500kto1500k', label: '500k – 1.5 triệu', min: 500000, max: 1500000 },
    { id: 'gt1500k', label: 'Trên 1.5 triệu', min: 1500000 },
  ],
  all: [
    { id: 'all', label: 'Mọi mức giá' },
    { id: 'lt2m', label: 'Dưới 2 triệu', max: 2000000 },
    { id: '2mto10m', label: '2 – 10 triệu', min: 2000000, max: 10000000 },
    { id: '10mto25m', label: '10 – 25 triệu', min: 10000000, max: 25000000 },
    { id: 'gt25m', label: 'Trên 25 triệu', min: 25000000 },
  ],
};

export function getPriceTiers(category: string): PriceTier[] {
  return CATEGORY_PRICE_TIERS[category] || CATEGORY_PRICE_TIERS.all;
}

export function matchPriceTier(price: number, tierId: string, category: string): boolean {
  if (tierId === 'all') return true;

  // Backward compatibility with legacy query params
  if (tierId === 'under1') return price < 1000000;
  if (tierId === '1to5') return price >= 1000000 && price <= 5000000;
  if (tierId === 'above5') return price > 5000000;

  const tiers = getPriceTiers(category);
  const tier = tiers.find((t) => t.id === tierId);
  if (!tier) return true;

  if (tier.min !== undefined && price < tier.min) return false;
  if (tier.max !== undefined && price > tier.max) return false;
  return true;
}

export type SortOption =
  | 'default'
  | 'price_asc'
  | 'price_desc'
  | 'rating'
  | 'student_discount';

export const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: 'default', label: 'Phổ biến nhất' },
  { id: 'price_asc', label: 'Giá: Thấp đến Cao' },
  { id: 'price_desc', label: 'Giá: Cao đến Thấp' },
  { id: 'student_discount', label: 'Ưu đãi SV tốt nhất' },
  { id: 'rating', label: 'Đánh giá cao nhất' },
];

export function sortProductList(products: Product[], sortOption: SortOption): Product[] {
  if (sortOption === 'default') return products;

  const sorted = [...products];
  switch (sortOption) {
    case 'price_asc':
      return sorted.sort((a, b) => a.studentPrice - b.studentPrice);
    case 'price_desc':
      return sorted.sort((a, b) => b.studentPrice - a.studentPrice);
    case 'student_discount':
      return sorted.sort((a, b) => {
        const discountA = a.oldPrice ? a.oldPrice - a.studentPrice : a.price - a.studentPrice;
        const discountB = b.oldPrice ? b.oldPrice - b.studentPrice : b.price - b.studentPrice;
        return discountB - discountA;
      });
    case 'rating':
      return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    default:
      return sorted;
  }
}
