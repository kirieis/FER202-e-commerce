'use client';

import React, { useState, useDeferredValue, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '../types';
import { searchProducts } from '../lib/search';
import { ProductCard } from '../components/ProductCard';
import {
  getPriceTiers,
  matchPriceTier,
  SortOption,
  sortProductList,
  SORT_OPTIONS,
} from '../lib/catalogFilters';
import { TradeInSection } from '../components/storefront/TradeInSection';
import { StudentPerksBanner } from '../components/storefront/StudentPerksBanner';
import { Search, X, SlidersHorizontal, ArrowUpDown, ChevronRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

interface CategoryCatalogProps {
  category: string;
  categoryTitle: string;
  categorySubtitle: string;
  products: Product[];
}

export const CategoryCatalog: React.FC<CategoryCatalogProps> = ({
  category,
  categoryTitle,
  categorySubtitle,
  products,
}) => {
  const router = useRouter();

  // Filter products by category first
  const categoryProducts = useMemo(() => {
    return products.filter((p) => p.category === category);
  }, [products, category]);

  const [selectedBudget, setSelectedBudget] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<SortOption>('default');
  const [visibleCount, setVisibleCount] = useState<number>(24);

  // Available brands in this category
  const availableBrands = useMemo(() => {
    const set = new Set<string>();
    categoryProducts.forEach((p) => {
      if (p.brand) set.add(p.brand);
    });
    return ['all', ...Array.from(set)];
  }, [categoryProducts]);

  // Price tiers for this specific category
  const priceTiers = useMemo(() => {
    return getPriceTiers(category);
  }, [category]);

  const deferredQuery = useDeferredValue(searchQuery);
  const { products: searchedProducts, interpretation } = useMemo(
    () => searchProducts(deferredQuery, { products: categoryProducts }),
    [deferredQuery, categoryProducts]
  );

  const filteredProducts = useMemo(() => {
    return searchedProducts.filter((p) => {
      if (selectedBrand !== 'all') {
        if (p.brand?.toLowerCase() !== selectedBrand.toLowerCase()) return false;
      }
      if (!matchPriceTier(p.price, selectedBudget, category)) {
        return false;
      }
      return true;
    });
  }, [searchedProducts, selectedBrand, selectedBudget, category]);

  const sortedFilteredProducts = useMemo(() => {
    return sortProductList(filteredProducts, selectedSort);
  }, [filteredProducts, selectedSort]);

  const displayedProducts = sortedFilteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < sortedFilteredProducts.length;
  const remainingCount = sortedFilteredProducts.length - visibleCount;

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedBrand('all');
    setSelectedBudget('all');
    setSelectedSort('default');
    setVisibleCount(24);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Category Header Section */}
      <section className="max-w-[1240px] w-full px-4 sm:px-8 pt-6 pb-8 text-left">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[var(--mu)] mb-6">
          <Link href="/" className="hover:text-[var(--tx)] transition-colors">
            Trang chủ
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[var(--mu)]" />
          <span className="text-[var(--tx)] font-semibold">{categoryTitle}</span>
        </nav>

        {/* Category H1 & Value Proposition */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[var(--ln)]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--pri)]/15 text-[var(--pri-h)] border border-[var(--pri)]/30 text-xs font-bold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Kho thiết bị chính hãng trợ giá sinh viên</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--tx)] tracking-tight">
              {categoryTitle}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[var(--mu)] max-w-2xl leading-relaxed">
              {categorySubtitle}
            </p>
            {/* Quick Perks */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-[var(--tx)]">
              <span className="flex items-center gap-1.5 text-[var(--ok)]">
                <ShieldCheck className="w-4 h-4" /> 1 đổi 1 trong 30 ngày
              </span>
              <span className="flex items-center gap-1.5 text-[var(--pri)]">
                <Truck className="w-4 h-4" /> Giao miễn phí KTX
              </span>
              <span className="flex items-center gap-1.5 text-[var(--warm)]">
                <RefreshCw className="w-4 h-4" /> Trả góp 0% thẻ SV
              </span>
            </div>
          </div>

          {/* Instant Search within category */}
          <div className="w-full lg:w-80 relative">
            <Search className="w-4 h-4 text-[var(--mu)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Tìm trong ${categoryTitle.toLowerCase()}...`}
              aria-label={`Tìm kiếm trong ${categoryTitle}`}
              className="w-full pl-10 pr-9 py-2.5 rounded-full text-xs bg-[var(--surface)] border border-[var(--ln)] text-[var(--tx)] placeholder:text-[var(--mu)] focus:outline-none focus:border-[var(--pri)] focus:ring-1 focus:ring-[var(--pri)] transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--mu)] hover:text-[var(--tx)] cursor-pointer"
                title="Xóa tìm kiếm"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category-Specific Filter Controls */}
        <div className="mt-6 flex flex-col gap-3">
          {/* Row 1: Price Tiers */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[var(--mu)] mr-1">Mức giá:</span>
            {priceTiers.map((tier) => (
              <button
                key={tier.id}
                type="button"
                aria-pressed={selectedBudget === tier.id}
                onClick={() => setSelectedBudget(tier.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedBudget === tier.id
                    ? 'bg-[var(--pri)] text-white shadow-sm'
                    : 'bg-[var(--surface)] border border-[var(--ln)] text-[var(--tx)] hover:border-[var(--tx)]'
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>

          {/* Row 2: Brand Pills */}
          {availableBrands.length > 2 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-xs font-semibold text-[var(--mu)] mr-1 flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3" /> Hãng:
              </span>
              {availableBrands.map((brand) => (
                <button
                  key={brand}
                  type="button"
                  aria-pressed={selectedBrand === brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedBrand === brand
                      ? 'bg-[var(--tx)] text-[var(--bg)]'
                      : 'bg-[var(--surface)] text-[var(--mu)] hover:text-[var(--tx)] border border-[var(--ln)] hover:border-[var(--tx)]'
                  }`}
                >
                  {brand === 'all' ? 'Tất cả hãng' : brand}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Result Status Bar & Sorting Dropdown */}
        <div className="mt-5 pt-3 border-t border-[var(--ln)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[var(--mu)] font-mono-code">
          <div aria-live="polite" aria-atomic="true">
            Tìm thấy <strong className="text-[var(--tx)]">{sortedFilteredProducts.length}</strong> thiết bị{' '}
            {categoryTitle.toLowerCase()} phù hợp
            {searchQuery && ` cho từ khóa "${searchQuery}"`}
            {interpretation && ` · Hiểu là: ${interpretation}`}
            {selectedBrand !== 'all' && ` · Hãng ${selectedBrand}`}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4">
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-[var(--mu)]" />
              <label htmlFor="category-sort" className="font-semibold text-xs text-[var(--mu)] hidden md:inline">
                Sắp xếp:
              </label>
              <select
                id="category-sort"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value as SortOption)}
                aria-label="Sắp xếp sản phẩm"
                className="bg-[var(--surface)] text-[var(--tx)] text-xs font-semibold px-2.5 py-1 rounded-full border border-[var(--ln)] hover:border-[var(--pri)] focus:outline-none focus:ring-1 focus:ring-[var(--pri)] cursor-pointer transition-all"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id} className="bg-[var(--card)] text-[var(--tx)]">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <span className="text-[var(--mu)]">
              Hiển thị {Math.min(visibleCount, sortedFilteredProducts.length)} / {sortedFilteredProducts.length}
            </span>
          </div>
        </div>
      </section>

      {/* Catalog Grid Section */}
      <section className="max-w-[1240px] w-full px-4 sm:px-8 pb-16">
        {sortedFilteredProducts.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--surface)] border border-[var(--ln)] flex items-center justify-center text-[var(--mu)] mb-4">
              <Search className="w-8 h-8 opacity-40" />
            </div>
            <h3 className="text-lg font-bold text-[var(--tx)]">Không tìm thấy sản phẩm phù hợp</h3>
            <p className="text-xs sm:text-sm text-[var(--mu)] mt-1 max-w-md">
              Không có thiết bị {categoryTitle.toLowerCase()} nào khớp với bộ lọc đã chọn. Hãy thử tìm từ khóa khác hoặc đặt lại bộ lọc.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-5 px-5 py-2.5 rounded-full text-xs font-bold bg-[var(--pri)] text-white hover:opacity-90 transition-all cursor-pointer"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        )}

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onSelectProduct={(prod) => router.push(`/san-pham/${prod.id}`)}
            />
          ))}
        </div>

        {/* Smart Pagination */}
        {hasMore && (
          <div className="mt-14 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 24)}
              className="px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm bg-[var(--surface)] border-2 border-[var(--ln)] hover:border-[var(--pri)] text-[var(--tx)] hover:text-[var(--pri)] shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer group"
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

      {/* Trade-in & Student Verification Support */}
      <TradeInSection />
      <StudentPerksBanner onNavigateAuth={() => router.push('/xac-thuc')} />
    </div>
  );
};
