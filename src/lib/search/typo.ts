/**
 * Damerau-Levenshtein distance supporting insertion, deletion, substitution, and transposition of adjacent characters.
 */
export function damerauLevenshtein(a: string, b: string): number {
  const al = a.length;
  const bl = b.length;
  if (al === 0) return bl;
  if (bl === 0) return al;

  const d: number[][] = Array.from({ length: al + 1 }, () => new Array(bl + 1).fill(0));
  for (let i = 0; i <= al; i++) d[i][0] = i;
  for (let j = 0; j <= bl; j++) d[0][j] = j;

  for (let i = 1; i <= al; i++) {
    for (let j = 1; j <= bl; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1,        // deletion
        d[i][j - 1] + 1,        // insertion
        d[i - 1][j - 1] + cost   // substitution
      );
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1); // transposition
      }
    }
  }
  return d[al][bl];
}

/**
 * Corrects a token against vocabulary (tokens length >= 3).
 * Skips tokens with digits, distance <= 1 for length 4-5 and <= 2 for length >= 6;
 * closest first, then most frequent.
 */
export function correctTypo(token: string, vocabulary: Map<string, number>): string | null {
  if (token.length < 4 || /\d/.test(token) || vocabulary.has(token)) {
    return null;
  }
  const maxDist = token.length <= 5 ? 1 : 2;
  let bestCandidate: string | null = null;
  let bestDist = Infinity;
  let bestFreq = -1;

  for (const [word, freq] of vocabulary.entries()) {
    if (Math.abs(word.length - token.length) > maxDist) continue;
    const dist = damerauLevenshtein(token, word);
    if (dist <= maxDist) {
      if (dist < bestDist || (dist === bestDist && freq > bestFreq)) {
        bestDist = dist;
        bestFreq = freq;
        bestCandidate = word;
      }
    }
  }
  return bestCandidate;
}
