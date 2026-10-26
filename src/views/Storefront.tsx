'use client';

import React, { useState, useDeferredValue, useMemo, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { searchProducts } from '../lib/search';
import { ProductCard } from '../components/ProductCard';
import { HeroBanner } from '../components/storefront/HeroBanner';
import { BentoCategories } from '../components/storefront/BentoCategories';
import { CatalogFilterBar } from '../components/storefront/CatalogFilterBar';
import { TradeInSection } from '../components/storefront/TradeInSection';
import { StudentPerksBanner } from '../components/storefront/StudentPerksBanner';
import {
  getPriceTiers,
  matchPriceTier,
  SortOption,
  sortProductList,
} from '../lib/catalogFilters';
import { Search } from 'lucide-react';

interface StorefrontProps {
  products?: Product[];
  onSelectProduct?: (product: Product) => void;
  onNavigate?: (page: 'storefront' | 'pdp' | 'auth' | 'checkout', category?: string) => void;
  initialCategory?: string;
}

export const Storefront: React.FC<StorefrontProps> = ({
  products = PRODUCTS,
  onSelectProduct,
  onNavigate,
  initialCategory,
}) => {
  const router = useRouter();

  const [selectedBudget, setSelectedBudget] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<SortOption>('default');
  const [visibleCount, setVisibleCount] = useState<number>(24);

  const catalogRef = useRef<HTMLElement>(null);
  const tradeInRef = useRef<HTMLDivElement>(null);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTradeIn = () => {
    tradeInRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 1. Initialize and restore filters from URL search params or sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlCat = params.get('category');
      const urlBrand = params.get('brand');
      const urlBudget = params.get('budget');
      const urlQuery = params.get('q');
      const urlSort = params.get('sort');

      let restored = false;
      if (urlCat) {
        setSelectedCategory(urlCat);
        restored = true;
      } else if (initialCategory) {
        setSelectedCategory(initialCategory);
      }

      if (urlBrand) {
        setSelectedBrand(urlBrand);
        restored = true;
      }
      if (urlBudget) {
        setSelectedBudget(urlBudget);
        restored = true;
      }
      if (urlQuery) {
        setSearchQuery(urlQuery);
        restored = true;
      }
      if (urlSort && ['default', 'price_asc', 'price_desc', 'rating', 'student_discount'].includes(urlSort)) {
        setSelectedSort(urlSort as SortOption);
        restored = true;
      }

      // If no query params exist in current URL, try restoring from sessionStorage
      if (!restored) {
        try {
          const cached = sessionStorage.getItem('unigear_filters');
          if (cached) {
            const parsed = JSON.parse(cached);
            if (parsed.category && (!initialCategory || initialCategory === 'all')) {
              setSelectedCategory(parsed.category);
            }
            if (parsed.brand) setSelectedBrand(parsed.brand);
            if (parsed.budget) setSelectedBudget(parsed.budget);
            if (parsed.q) setSearchQuery(parsed.q);
            if (parsed.sort) setSelectedSort(parsed.sort);
          }
        } catch {
          // ignore
        }
      }
    }
  }, [initialCategory]);

  // 2. Synchronize filters to URL and sessionStorage
  const syncFilterUrl = (cat: string, brand: string, budget: string, q: string, sort: string) => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams();
      if (cat && cat !== 'all') params.set('category', cat);
      if (brand && brand !== 'all') params.set('brand', brand);
      if (budget && budget !== 'all') params.set('budget', budget);
      if (q) params.set('q', q);
      if (sort && sort !== 'default') params.set('sort', sort);

      const qs = params.toString();
      const newUrl = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
      window.history.replaceState(null, '', newUrl);

      sessionStorage.setItem('unigear_filters', JSON.stringify({
        category: cat,
        brand,
        budget,
        q,
        sort,
      }));
    }
  };

  const handleSelectProduct = (product: Product) => {
    // Save current active filters and full storefront URL before navigating
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams();
      if (selectedCategory && selectedCategory !== 'all') params.set('category', selectedCategory);
      if (selectedBrand && selectedBrand !== 'all') params.set('brand', selectedBrand);
      if (selectedBudget && selectedBudget !== 'all') params.set('budget', selectedBudget);
      if (searchQuery) params.set('q', searchQuery);
      if (selectedSort && selectedSort !== 'default') params.set('sort', selectedSort);

      const qs = params.toString();
      const fullUrl = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
      sessionStorage.setItem('unigear_last_storefront', fullUrl);
      sessionStorage.setItem('unigear_filters', JSON.stringify({
        category: selectedCategory,
        brand: selectedBrand,
        budget: selectedBudget,
        q: searchQuery,
        sort: selectedSort,
      }));
    }

    if (onSelectProduct) {
      onSelectProduct(product);
    } else {
      router.push(`/san-pham/${product.id}`);
    }
  };

  const handleNav = (page: 'storefront' | 'pdp' | 'auth' | 'checkout', category?: string) => {
    if (onNavigate) {
      onNavigate(page, category);
      return;
    }
    if (page === 'checkout') router.push('/thanh-toan');
    else if (page === 'auth') router.push('/xac-thuc');
    else if (page === 'storefront') {
      if (category && category !== 'all') {
        setSelectedCategory(category);
        setSelectedBrand('all');
        setSelectedBudget('all');
        setVisibleCount(24);
        syncFilterUrl(category, 'all', 'all', searchQuery, selectedSort);
        scrollToCatalog();
      } else {
        setSelectedCategory('all');
        setSelectedBrand('all');
        setSelectedBudget('all');
        setVisibleCount(24);
        syncFilterUrl('all', 'all', 'all', searchQuery, selectedSort);
      }
    }
  };

  // Sync category changes with filter resets & URL
  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedBrand('all');

    // Reset budget if not compatible with new category's tiers
    const validTiers = getPriceTiers(cat);
    let newBudget = selectedBudget;
    if (!validTiers.some((t) => t.id === selectedBudget)) {
      newBudget = 'all';
      setSelectedBudget('all');
    }

    setVisibleCount(24);
    syncFilterUrl(cat, 'all', newBudget, searchQuery, selectedSort);
  };

  const handleBudgetSelect = (budget: string) => {
    setSelectedBudget(budget);
    setVisibleCount(24);
    syncFilterUrl(selectedCategory, selectedBrand, budget, searchQuery, selectedSort);
  };

  const handleBrandSelect = (brand: string) => {
    setSelectedBrand(brand);
    setVisibleCount(24);
    syncFilterUrl(selectedCategory, brand, selectedBudget, searchQuery, selectedSort);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setVisibleCount(24);
    syncFilterUrl(selectedCategory, selectedBrand, selectedBudget, val, selectedSort);
  };

  const handleSortSelect = (sort: SortOption) => {
    setSelectedSort(sort);
    syncFilterUrl(selectedCategory, selectedBrand, selectedBudget, searchQuery, sort);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedBrand('all');
    setSelectedBudget('all');
    setSelectedCategory('all');
    setSelectedSort('default');
    setVisibleCount(24);
    syncFilterUrl('all', 'all', 'all', '', 'default');
  };

  // Memoized category counts
  const categoryCounts = useMemo(() => {
    return products.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [products]);

  // Dynamic available brands based on selected category
  const availableBrands = useMemo(() => {
    const relevant =
      selectedCategory === 'all'
        ? products
        : products.filter((p) => {
            if (selectedCategory === 'computer') return p.category === 'laptop' || p.category === 'tablet';
            return p.category === selectedCategory;
          });

    const set = new Set<string>();
    relevant.forEach((p) => {
      if (p.brand) set.add(p.brand);
    });
    return ['all', ...Array.from(set)];
  }, [selectedCategory, products]);

  // Dynamic price tiers based on selected category
  const currentPriceTiers = useMemo(() => {
    return getPriceTiers(selectedCategory);
  }, [selectedCategory]);

  const deferredQuery = useDeferredValue(searchQuery);
  const { products: searchedProducts, interpretation } = useMemo(
    () => searchProducts(deferredQuery, { products }),
    [deferredQuery, products]
  );

  const filteredProducts = useMemo(() => {
    return searchedProducts.filter((p) => {
      // Brand filter
      if (selectedBrand !== 'all') {
        if (p.brand?.toLowerCase() !== selectedBrand.toLowerCase()) return false;
      }

      // Dynamic Budget filter
      if (!matchPriceTier(p.price, selectedBudget, selectedCategory)) {
        return false;
      }

      // Category filter
      if (selectedCategory === 'computer' && p.category !== 'laptop' && p.category !== 'tablet') return false;
      if (selectedCategory === 'laptop' && p.category !== 'laptop') return false;
      if (selectedCategory === 'tablet' && p.category !== 'tablet') return false;
      if (selectedCategory === 'audio' && p.category !== 'audio') return false;
      if (selectedCategory === 'accessory' && p.category !== 'accessory') return false;

      return true;
    });
  }, [searchedProducts, selectedBrand, selectedBudget, selectedCategory]);

  // Sort filtered products
  const sortedFilteredProducts = useMemo(() => {
    return sortProductList(filteredProducts, selectedSort);
  }, [filteredProducts, selectedSort]);

  const displayedProducts = sortedFilteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < sortedFilteredProducts.length;
  const remainingCount = sortedFilteredProducts.length - visibleCount;

  const flagshipProduct = products[0] || PRODUCTS[0];

  return (
    <div className="w-full flex flex-col items-center">
      {/* 1. Hero Flagship Section */}
      <HeroBanner
        flagshipProduct={flagshipProduct}
        onSelectProduct={handleSelectProduct}
        onExploreCatalog={scrollToCatalog}
        onExploreTradeIn={scrollToTradeIn}
      />

      {/* 2. Bento Grid Highlights */}
      <BentoCategories
        onSelectCategory={(cat) => {
          handleCategorySelect(cat);
          scrollToCatalog();
        }}
      />

      {/* 3. Catalog & Filters Section */}
      <section ref={catalogRef} id="catalog-section" className="max-w-[1240px] w-full px-4 sm:px-8 py-16">
        <CatalogFilterBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          categoryCounts={categoryCounts}
          totalProductsCount={products.length}
          priceTiers={currentPriceTiers}
          selectedBudget={selectedBudget}
          onBudgetSelect={handleBudgetSelect}
          availableBrands={availableBrands}
          selectedBrand={selectedBrand}
          onBrandSelect={handleBrandSelect}
          selectedSort={selectedSort}
          onSortSelect={handleSortSelect}
          filteredCount={sortedFilteredProducts.length}
          visibleCount={visibleCount}
          interpretation={interpretation}
        />

        {/* Empty State */}
        {sortedFilteredProducts.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--surface)] border border-[var(--ln)] flex items-center justify-center text-[var(--mu)] mb-4">
              <Search className="w-8 h-8 opacity-40" />
            </div>
            <h3 className="text-lg font-bold text-[var(--tx)]">Không tìm thấy sản phẩm phù hợp</h3>
            <p className="text-sm text-[var(--mu)] mt-1 max-w-md">
              Không có thiết bị nào khớp với từ khóa "{searchQuery}" hoặc bộ lọc đã chọn. Hãy thử tìm từ khóa khác hoặc xóa bộ lọc.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-5 px-5 py-2.5 rounded-full text-xs font-bold bg-[var(--pri)] text-white hover:opacity-90 transition-all cursor-pointer"
            >
              Đặt lại tất cả bộ lọc
            </button>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onSelectProduct={handleSelectProduct}
            />
          ))}
        </div>

        {/* Smart Pagination: Load More */}
        {hasMore && (
          <div className="mt-14 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 24)}
              className="px-8 py-3.5 rounded-full font-bold text-sm bg-[var(--surface)] border-2 border-[var(--ln)] hover:border-[var(--pri)] text-[var(--tx)] hover:text-[var(--pri)] shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer group"
            >
              <span>Xem thêm 24 sản phẩm</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[var(--card)] text-[var(--mu)] border border-[var(--ln)] font-mono-code">
                còn {remainingCount} sản phẩm khác
              </span>
            </button>
            <div className="text-xs font-mono-code text-[var(--mu)]">
              Đang hiển thị {displayedProducts.length} trên tổng số {sortedFilteredProducts.length} sản phẩm
            </div>
            <div className="w-48 h-1.5 bg-[var(--surface)] border border-[var(--ln)] rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-[var(--pri)] transition-all duration-300"
                style={{ width: `${(displayedProducts.length / sortedFilteredProducts.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </section>

      {/* 4. Trade-in & Installment Section */}
      <div ref={tradeInRef}>
        <TradeInSection />
      </div>

      {/* 5. Student Verification Steps Banner */}
      <StudentPerksBanner onNavigateAuth={() => handleNav('auth')} />
    </div>
  );
};
