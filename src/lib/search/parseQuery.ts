import { ProductCategory } from '../../types';
import { normalize, STOPWORDS } from './normalize';
import { CATEGORY_ALIASES, TEXT_REPLACEMENTS } from './aliases';
import { correctTypo } from './typo';

export interface TypoCorrection {
  from: string;
  to: string;
}

export interface ParsedQuery {
  tokens: string[];
  categoryConstraint: ProductCategory | null;
  minPrice: number | null;
  maxPrice: number | null;
  corrections: TypoCorrection[];
  rawLower: string;
  interpretation: string;
}

export function formatPriceCompact(num: number): string {
  if (num >= 1000000) {
    const tr = num / 1000000;
    return `${tr % 1 === 0 ? tr : tr.toFixed(1)} triệu`;
  }
  if (num >= 1000) {
    return `${num.toLocaleString('vi-VN')}đ`;
  }
  return `${num}đ`;
}

export function parseQuery(query: string, vocabulary: Map<string, number>): ParsedQuery {
  if (!query || !query.trim()) {
    return {
      tokens: [],
      categoryConstraint: null,
      minPrice: null,
      maxPrice: null,
      corrections: [],
      rawLower: '',
      interpretation: ''
    };
  }

  const rawLower = query.toLowerCase().trim();
  let working = normalize(query);

  let minPrice: number | null = null;
  let maxPrice: number | null = null;
  let hasSpecialFilters = false;

  // 1. Budget parsing
  const budgetRegex = /\b(?:(duoi|dưới|<|<=|den|đến|tren|trên|>|>=|tu|từ)\s*)?(\d+(?:[.,]\d+)?)\s*(tr|trieu|triệu|m|k|nghin|nghìn|ngan|ngàn)\b/gi;
  let match: RegExpExecArray | null;
  while ((match = budgetRegex.exec(working)) !== null) {
    hasSpecialFilters = true;
    const prefix = (match[1] || '').toLowerCase();
    const num = parseFloat(match[2].replace(',', '.'));
    const unit = match[3].toLowerCase();

    let mult = 1;
    if (['tr', 'trieu', 'triệu', 'm'].includes(unit)) {
      mult = 1000000;
    } else if (['k', 'nghin', 'nghìn', 'ngan', 'ngàn'].includes(unit)) {
      mult = 1000;
    }
    const val = Math.round(num * mult);

    if (['tren', 'trên', '>', '>=', 'tu', 'từ'].includes(prefix)) {
      minPrice = val;
    } else {
      maxPrice = val;
    }
  }

  working = working.replace(budgetRegex, ' ').replace(/\s+/g, ' ').trim();

  // 2. Text replacements (e.g. mbp -> macbook pro, mba -> macbook air)
  for (const rep of TEXT_REPLACEMENTS) {
    const r = new RegExp(`\\b${rep.from}\\b`, 'g');
    if (r.test(working)) {
      working = working.replace(r, rep.to);
      hasSpecialFilters = true;
    }
  }

  // 3. Typo corrections
  const initialTokens = working.split(/\s+/).filter(Boolean);
  const corrections: TypoCorrection[] = [];
  const correctedTokens = initialTokens.map((tok) => {
    const fixed = correctTypo(tok, vocabulary);
    if (fixed && fixed !== tok) {
      corrections.push({ from: tok, to: fixed });
      hasSpecialFilters = true;
      return fixed;
    }
    return tok;
  });

  working = correctedTokens.join(' ');

  // 4. Category aliases (longer phrases first)
  let categoryConstraint: ProductCategory | null = null;
  for (const alias of CATEGORY_ALIASES) {
    const aliasRegex = new RegExp(`\\b${alias.phrase}\\b`, 'i');
    if (aliasRegex.test(working)) {
      categoryConstraint = alias.category;
      working = working.replace(aliasRegex, ' ').replace(/\s+/g, ' ').trim();
      hasSpecialFilters = true;
      break;
    }
  }

  // 5. Remaining tokens & remove stopwords
  const remainingTokens = working
    .split(/\s+/)
    .filter(Boolean)
    .filter((t) => !STOPWORDS.has(t));

  // 6. Build interpretation string
  let interpretation = '';
  if (hasSpecialFilters) {
    const parts: string[] = [];
    if (categoryConstraint) {
      const catLabels: Record<ProductCategory, string> = {
        all: 'Tất cả',
        laptop: 'Laptop',
        tablet: 'Tablet',
        audio: 'Tai nghe & Loa',
        accessory: 'Phụ kiện'
      };
      parts.push(catLabels[categoryConstraint] || categoryConstraint);
    }
    if (minPrice != null && maxPrice != null) {
      parts.push(`${formatPriceCompact(minPrice)} - ${formatPriceCompact(maxPrice)}`);
    } else if (maxPrice != null) {
      parts.push(`≤ ${formatPriceCompact(maxPrice)}`);
    } else if (minPrice != null) {
      parts.push(`≥ ${formatPriceCompact(minPrice)}`);
    }
    if (remainingTokens.length > 0) {
      parts.push(`“${remainingTokens.join(' ')}”`);
    }
    interpretation = parts.join(' · ');
  }

  return {
    tokens: remainingTokens,
    categoryConstraint,
    minPrice,
    maxPrice,
    corrections,
    rawLower,
    interpretation
  };
}
