import React, { useState, useMemo, useRef, useDeferredValue } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { HeroBanner } from '../components/storefront/HeroBanner';
import { BentoCategories } from '../components/storefront/BentoCategories';
import { TradeInSection } from '../components/storefront/TradeInSection';
import { StudentPerksBanner } from '../components/storefront/StudentPerksBanner';
import { CatalogFilterBar } from '../components/storefront/CatalogFilterBar';
import { Search } from 'lucide-react';
import { searchProducts } from '../lib/search';

interface StorefrontProps {
  onSelectProduct: (product: Product) => void;
  onNavigate: (page: 'storefront' | 'pdp' | 'auth' | 'checkout', category?: string) => void;
  initialCategory?: string;
}

export const Storefront: React.FC<StorefrontProps> = ({
  onSelectProduct,
  onNavigate,
  initialCategory
}) => {
  const [selectedBudget, setSelectedBudget] = useState<'all' | 'under1' | '1to5' | 'above5'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(24);

  const catalogRef = useRef<HTMLElement>(null);
  const tradeInRef = useRef<HTMLDivElement>(null);

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTradeIn = () => {
    tradeInRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Sync category changes with filter resets
  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedBrand('all');
    setVisibleCount(24);
  };

  const handleBudgetSelect = (budget: 'all' | 'under1' | '1to5' | 'above5') => {
    setSelectedBudget(budget);
    setVisibleCount(24);
  };

  const handleBrandSelect = (brand: string) => {
    setSelectedBrand(brand);
    setVisibleCount(24);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setVisibleCount(24);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedBrand('all');
    setSelectedBudget('all');
    setSelectedCategory('all');
    setVisibleCount(24);
  };

  // Memoized category counts to eliminate redundant loops in JSX
  const categoryCounts = useMemo(() => {
    return PRODUCTS.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, []);

  // Dynamic available brands based on selected category
  const availableBrands = useMemo(() => {
    const relevant =
      selectedCategory === 'all'
        ? PRODUCTS
        : PRODUCTS.filter((p) => {
            if (selectedCategory === 'computer') return p.category === 'laptop' || p.category === 'tablet';
            return p.category === selectedCategory;
          });

    const set = new Set<string>();
    relevant.forEach((p) => {
      if (p.brand) set.add(p.brand);
    });
    return ['all', ...Array.from(set)];
  }, [selectedCategory]);

  const deferredQuery = useDeferredValue(searchQuery);
  const { products: searchedProducts, interpretation } = useMemo(
    () => searchProducts(deferredQuery),
    [deferredQuery]
  );

  const filteredProducts = useMemo(() => {
    return searchedProducts.filter((p) => {
      // Brand filter
      if (selectedBrand !== 'all') {
        if (p.brand?.toLowerCase() !== selectedBrand.toLowerCase()) return false;
      }

      // Budget filter
      if (selectedBudget === 'under1' && p.price >= 1000000) return false;
      if (selectedBudget === '1to5' && (p.price < 1000000 || p.price > 5000000)) return false;
      if (selectedBudget === 'above5' && p.price <= 5000000) return false;

      // Category filter
      if (selectedCategory === 'computer' && p.category !== 'laptop' && p.category !== 'tablet') return false;
      if (selectedCategory === 'laptop' && p.category !== 'laptop') return false;
      if (selectedCategory === 'tablet' && p.category !== 'tablet') return false;
      if (selectedCategory === 'audio' && p.category !== 'audio') return false;
      if (selectedCategory === 'accessory' && p.category !== 'accessory') return false;

      return true;
    });
  }, [searchedProducts, selectedBrand, selectedBudget, selectedCategory]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;
  const remainingCount = filteredProducts.length - visibleCount;

  const flagshipProduct = PRODUCTS[0];

  return (
    <div className="w-full flex flex-col items-center">
      {/* 1. Hero Flagship Section */}
      <HeroBanner
        flagshipProduct={flagshipProduct}
        onSelectProduct={onSelectProduct}
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
          totalProductsCount={PRODUCTS.length}
          selectedBudget={selectedBudget}
          onBudgetSelect={handleBudgetSelect}
          availableBrands={availableBrands}
          selectedBrand={selectedBrand}
          onBrandSelect={handleBrandSelect}
          filteredCount={filteredProducts.length}
          visibleCount={visibleCount}
          interpretation={interpretation}
        />

        {/* Empty State */}
        {filteredProducts.length === 0 && (
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
              onSelectProduct={onSelectProduct}
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
                còn {remainingCount} máy
              </span>
            </button>
            <div className="text-xs font-mono-code text-[var(--mu)]">
              Đã tải {displayedProducts.length} / {filteredProducts.length} sản phẩm
            </div>
            <div className="w-48 h-1.5 bg-[var(--surface)] border border-[var(--ln)] rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-[var(--pri)] transition-all duration-300"
                style={{ width: `${(displayedProducts.length / filteredProducts.length) * 100}%` }}
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
      <StudentPerksBanner onNavigateAuth={() => onNavigate('auth')} />
    </div>
  );
};
