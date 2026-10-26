import { Product } from '../../types';
import { PRODUCTS } from '../../data/products';
import { normalize, tokenize } from './normalize';
import { CATEGORY_ALIASES, TEXT_REPLACEMENTS } from './aliases';
import { parseQuery, TypoCorrection } from './parseQuery';

export interface SearchOptions {
  products?: Product[];
}

export interface SearchResult {
  products: Product[];
  interpretation: string;
  corrections: TypoCorrection[];
}

export interface IndexedProduct {
  index: number;
  product: Product;
  nameNorm: string;
  brandNorm: string;
  subTitleNorm: string;
  descNorm: string;
  specValuesNorm: string[];
  nameRawLower: string;
  brandRawLower: string;
  subTitleRawLower: string;
  descRawLower: string;
  specValuesRawLower: string[];
}

// Build index ONCE at module scope from PRODUCTS
const vocabulary = new Map<string, number>();

function addToVocab(token: string) {
  if (token.length >= 3 && !/\d/.test(token)) {
    vocabulary.set(token, (vocabulary.get(token) || 0) + 1);
  }
}

// Seed alias tokens into vocabulary
CATEGORY_ALIASES.forEach((a) => {
  tokenize(a.phrase).forEach(addToVocab);
});
TEXT_REPLACEMENTS.forEach((r) => {
  tokenize(r.from).forEach(addToVocab);
  tokenize(r.to).forEach(addToVocab);
});

export const INDEXED_PRODUCTS: IndexedProduct[] = PRODUCTS.map((p, index) => {
  const nameNorm = normalize(p.name);
  const brandNorm = normalize(p.brand || '');
  const subTitleNorm = normalize(p.subTitle || '');
  const descNorm = normalize(p.desc || '');
  const specValuesNorm = (p.specs || []).map((s) => normalize(s.value));

  // Build vocabulary from normalized text tokens (length >= 3)
  tokenize(p.name).forEach(addToVocab);
  tokenize(p.brand || '').forEach(addToVocab);
  tokenize(p.subTitle || '').forEach(addToVocab);
  tokenize(p.desc || '').forEach(addToVocab);
  (p.specs || []).forEach((s) => tokenize(s.value).forEach(addToVocab));

  return {
    index,
    product: p,
    nameNorm,
    brandNorm,
    subTitleNorm,
    descNorm,
    specValuesNorm,
    nameRawLower: (p.name || '').toLowerCase(),
    brandRawLower: (p.brand || '').toLowerCase(),
    subTitleRawLower: (p.subTitle || '').toLowerCase(),
    descRawLower: (p.desc || '').toLowerCase(),
    specValuesRawLower: (p.specs || []).map((s) => (s.value || '').toLowerCase())
  };
});

export function searchProducts(query: string, opts?: SearchOptions): SearchResult {
  if (!query || !query.trim()) {
    return {
      products: opts?.products || PRODUCTS,
      interpretation: '',
      corrections: []
    };
  }

  const parsed = parseQuery(query, vocabulary);
  const { tokens, categoryConstraint, minPrice, maxPrice, rawLower, interpretation, corrections } = parsed;

  const baseItems = opts?.products
    ? opts.products
        .map((p) => INDEXED_PRODUCTS.find((ip) => ip.product.id === p.id))
        .filter((x): x is IndexedProduct => !!x)
    : INDEXED_PRODUCTS;

  const scored: { item: IndexedProduct; score: number }[] = [];

  for (const item of baseItems) {
    const p = item.product;

    // 1. Category constraint from query
    if (categoryConstraint && p.category !== categoryConstraint) {
      continue;
    }

    // 2. Budget constraints from query (using p.price, not studentPrice)
    if (minPrice != null && p.price < minPrice) {
      continue;
    }
    if (maxPrice != null && p.price > maxPrice) {
      continue;
    }

    // If query was entirely category/budget, every item passing constraints matches
    if (tokens.length === 0) {
      scored.push({ item, score: 0 });
      continue;
    }

    // 3. Every token must match in name, brand, subTitle, spec values or desc (prefer word-boundary matches)
    let allTokensMatch = true;
    let score = 0;

    for (const tok of tokens) {
      const tokRegex = new RegExp(`\\b${tok}\\b`, 'i');
      const inNameExact = tokRegex.test(item.nameNorm);
      const inBrandExact = tokRegex.test(item.brandNorm);
      const inSubTitleExact = tokRegex.test(item.subTitleNorm);
      const inSpecExact = item.specValuesNorm.some((sv) => tokRegex.test(sv));
      const inDescExact = tokRegex.test(item.descNorm);

      if (!inNameExact && !inBrandExact && !inSubTitleExact && !inSpecExact && !inDescExact) {
        allTokensMatch = false;
        break;
      }

      // Ranking weights: name > brand > subTitle > spec value > desc
      if (inNameExact) score += 5000;
      if (inBrandExact) score += 2000;
      if (inSubTitleExact) score += 800;
      if (inSpecExact) score += 300;
      if (inDescExact) score += 100;
    }

    if (!allTokensMatch) continue;

    // Full query matching bonuses on name
    const queryNormJoined = tokens.join(' ');
    if (item.nameNorm === queryNormJoined) {
      score += 100000; // exact name
    } else if (item.nameNorm.startsWith(queryNormJoined)) {
      score += 50000; // name starts with query
    } else if (item.nameNorm.includes(queryNormJoined)) {
      score += 20000; // whole phrase in name
    }

    // Diacritics bonus: if raw query with diacritics matches in original text
    if (rawLower) {
      if (item.nameRawLower.includes(rawLower)) score += 10000;
      if (item.subTitleRawLower.includes(rawLower)) score += 3000;
      if (item.specValuesRawLower.some((v) => v.includes(rawLower))) score += 2000;
      if (item.descRawLower.includes(rawLower)) score += 1000;
    }

    scored.push({ item, score });
  }

  // Sort: highest score first, ties keep catalog order (index)
  scored.sort((a, b) => b.score - a.score || a.item.index - b.item.index);

  return {
    products: scored.map((s) => s.item.product),
    interpretation,
    corrections
  };
}

export * from './normalize';
export * from './aliases';
export * from './typo';
export * from './parseQuery';
