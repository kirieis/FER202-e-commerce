/**
 * Normalizes a string for search matching:
 * lowercase, NFD decomposition, strip combining marks, đ/Đ -> d, non [a-z0-9] -> space, collapse whitespace.
 */
export function normalize(s: string): string {
  if (!s) return '';
  return s
    .toLowerCase()
    .replace(/[đĐ]/g, 'd')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function tokenize(s: string): string[] {
  const norm = normalize(s);
  return norm ? norm.split(/\s+/).filter(Boolean) : [];
}

export const STOPWORDS = new Set<string>([
  'cho',
  'toi',
  'can',
  'tim',
  'mua',
  'de',
  'la',
  'co',
  'va',
  'gia',
  'khoang'
]);
