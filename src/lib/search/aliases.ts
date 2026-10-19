import { ProductCategory } from '../../types';

export interface CategoryAlias {
  phrase: string;
  category: ProductCategory;
}

export interface TextReplacement {
  from: string;
  to: string;
}

/**
 * Category aliases (longer phrases first to avoid partial conflicts).
 * A category word becomes a category constraint and is removed from search text tokens.
 */
export const CATEGORY_ALIASES: CategoryAlias[] = [
  { phrase: 'may tinh bang', category: 'tablet' },
  { phrase: 'may tinh', category: 'laptop' },
  { phrase: 'tai nghe', category: 'audio' },
  { phrase: 'ban phim', category: 'accessory' },
  { phrase: 'laptop', category: 'laptop' },
  { phrase: 'lap', category: 'laptop' },
  { phrase: 'tablet', category: 'tablet' },
  { phrase: 'ipad', category: 'tablet' },
  { phrase: 'headphone', category: 'audio' },
  { phrase: 'earbuds', category: 'audio' },
  { phrase: 'loa', category: 'audio' },
  { phrase: 'speaker', category: 'audio' },
  { phrase: 'chuot', category: 'accessory' },
  { phrase: 'sac', category: 'accessory' },
  { phrase: 'hub', category: 'accessory' },
  { phrase: 'keyboard', category: 'accessory' },
  { phrase: 'mouse', category: 'accessory' }
];

export const TEXT_REPLACEMENTS: TextReplacement[] = [
  { from: 'mbp', to: 'macbook pro' },
  { from: 'mba', to: 'macbook air' }
];
