import { describe, it, expect } from 'vitest';
import { PRODUCTS } from '../../../data/products';
import { searchProducts, normalize } from '../index';

describe('Vietnamese-aware search library (searchProducts)', () => {
  describe('Brand, model, and spec ranking / matching', () => {
    it.each([
      {
        query: 'macbook air',
        check: (results: typeof PRODUCTS) => {
          expect(results.length).toBeGreaterThan(0);
          expect(results[0].name.toLowerCase()).toContain('macbook air');
        }
      },
      {
        query: 'mbp',
        check: (results: typeof PRODUCTS) => {
          expect(results.length).toBeGreaterThan(0);
          expect(results[0].name.toLowerCase()).toContain('macbook pro');
        }
      },
      {
        query: 'thinkpad',
        check: (results: typeof PRODUCTS) => {
          expect(results.length).toBeGreaterThan(0);
          expect(results[0].name.toLowerCase()).toContain('thinkpad');
        }
      },
      {
        query: 'sony',
        check: (results: typeof PRODUCTS) => {
          expect(results.length).toBeGreaterThan(0);
          expect(results[0].brand?.toLowerCase()).toBe('sony');
        }
      },
      {
        query: 'rtx 4050',
        check: (results: typeof PRODUCTS) => {
          const hasDell = results.some((p) => p.name.includes('Dell XPS 15 9530'));
          expect(hasDell).toBe(true);
        }
      },
      {
        query: 'm2',
        check: (results: typeof PRODUCTS) => {
          const hasMacBookAirM2 = results.some((p) => p.name.includes('MacBook Air M2'));
          expect(hasMacBookAirM2).toBe(true);
        }
      }
    ])('should rank and match properly for query "$query"', ({ query, check }) => {
      const { products } = searchProducts(query);
      check(products);
    });
  });

  describe('Diacritic equivalence', () => {
    it('returns the same product set for "chuot" and "chuột"', () => {
      const resA = searchProducts('chuot');
      const resB = searchProducts('chuột');
      expect(resA.products.length).toBeGreaterThan(0);
      expect(resA.products.map((p) => p.id)).toEqual(resB.products.map((p) => p.id));
    });

    it('returns the same product set for "ban phim" and "bàn phím"', () => {
      const resA = searchProducts('ban phim');
      const resB = searchProducts('bàn phím');
      expect(resA.products.length).toBeGreaterThan(0);
      expect(resA.products.map((p) => p.id)).toEqual(resB.products.map((p) => p.id));
    });

    it('includes Sony WH-1000XM5 for "chong on"', () => {
      const { products } = searchProducts('chong on');
      const hasSonyXM5 = products.some((p) => p.name.includes('Sony WH-1000XM5'));
      expect(hasSonyXM5).toBe(true);
    });
  });

  describe('Typo corrections', () => {
    it('corrects "laptob" to "laptop" and constrains to category laptop', () => {
      const res = searchProducts('laptob');
      expect(res.corrections).toEqual([{ from: 'laptob', to: 'laptop' }]);
      expect(res.products.length).toBeGreaterThan(0);
      expect(res.products.every((p) => p.category === 'laptop')).toBe(true);
    });

    it('corrects "macbok" to "macbook"', () => {
      const res = searchProducts('macbok');
      expect(res.corrections).toEqual([{ from: 'macbok', to: 'macbook' }]);
      expect(res.products.length).toBeGreaterThan(0);
      expect(res.products[0].name.toLowerCase()).toContain('macbook');
    });
  });

  describe('Category and budget combined filters', () => {
    it('"tai nghe duoi 5tr": only audio, all price <= 5,000,000', () => {
      const res = searchProducts('tai nghe duoi 5tr');
      expect(res.products.length).toBeGreaterThan(0);
      expect(res.products.every((p) => p.category === 'audio')).toBe(true);
      expect(res.products.every((p) => p.price <= 5000000)).toBe(true);
    });

    it('"laptop tren 30 trieu": only laptops price >= 30,000,000', () => {
      const res = searchProducts('laptop tren 30 trieu');
      expect(res.products.length).toBeGreaterThan(0);
      expect(res.products.every((p) => p.category === 'laptop')).toBe(true);
      expect(res.products.every((p) => p.price >= 30000000)).toBe(true);
    });

    it('"15tr" alone: all <= 15,000,000', () => {
      const res = searchProducts('15tr');
      expect(res.products.length).toBeGreaterThan(0);
      expect(res.products.every((p) => p.price <= 15000000)).toBe(true);
    });
  });

  describe('Regression tests (no spec label matching)', () => {
    it('"pin" returns far fewer than all laptops and every result contains "pin" in text or spec value', () => {
      const res = searchProducts('pin');
      const allLaptopsCount = PRODUCTS.filter((p) => p.category === 'laptop').length;
      expect(res.products.length).toBeLessThan(allLaptopsCount);

      const allContainPin = res.products.every((p) => {
        const text = normalize(
          `${p.name} ${p.brand || ''} ${p.subTitle} ${p.desc} ${(p.specs || []).map((s) => s.value).join(' ')}`
        );
        return /\bpin\b/.test(text);
      });
      expect(allContainPin).toBe(true);
    });

    it('"man hinh" returns far fewer than all products and every result contains "man hinh" in text or spec value', () => {
      const res = searchProducts('man hinh');
      expect(res.products.length).toBeLessThan(PRODUCTS.length);

      const allContainScreen = res.products.every((p) => {
        const text = normalize(
          `${p.name} ${p.brand || ''} ${p.subTitle} ${p.desc} ${(p.specs || []).map((s) => s.value).join(' ')}`
        );
        return text.includes('man hinh');
      });
      expect(allContainScreen).toBe(true);
    });
  });

  describe('Edge cases and empty query', () => {
    it('empty query returns all PRODUCTS.length items in original order', () => {
      const res = searchProducts('');
      expect(res.products.length).toBe(PRODUCTS.length);
      expect(res.products).toEqual(PRODUCTS);
    });

    it('garbage query "zzzzqq" returns 0 products', () => {
      const res = searchProducts('zzzzqq');
      expect(res.products.length).toBe(0);
    });
  });

  describe('Benchmark', () => {
    it('measures time of 1,000 searchProducts calls', () => {
      const queries = [
        'macbook air',
        'thinkpad',
        'sony',
        'tai nghe duoi 5tr',
        'laptop tren 30 trieu',
        'rtx 4050',
        'ban phim',
        'chuot',
        '15tr',
        'laptob'
      ];
      const start = performance.now();
      for (let i = 0; i < 1000; i++) {
        searchProducts(queries[i % queries.length]);
      }
      const durationMs = performance.now() - start;
      console.log(`[BENCHMARK] 1,000 searchProducts calls completed in ${durationMs.toFixed(2)} ms`);
      expect(durationMs).toBeGreaterThan(0);
    });
  });
});
