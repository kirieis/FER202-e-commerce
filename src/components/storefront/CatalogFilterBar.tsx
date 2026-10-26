import React from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { PriceTier, SortOption, SORT_OPTIONS } from '@/lib/catalogFilters';

interface CatalogFilterBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  onCategorySelect: (cat: string) => void;
  categoryCounts: Record<string, number>;
  totalProductsCount: number;
  priceTiers: PriceTier[];
  selectedBudget: string;
  onBudgetSelect: (budget: string) => void;
  availableBrands: string[];
  selectedBrand: string;
  onBrandSelect: (brand: string) => void;
  selectedSort: SortOption;
  onSortSelect: (sort: SortOption) => void;
  filteredCount: number;
  visibleCount: number;
  interpretation?: string;
}

export const CatalogFilterBar: React.FC<CatalogFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
  categoryCounts,
  totalProductsCount,
  priceTiers,
  selectedBudget,
  onBudgetSelect,
  availableBrands,
  selectedBrand,
  onBrandSelect,
  selectedSort,
  onSortSelect,
  filteredCount,
  visibleCount,
  interpretation,
}) => {
  return (
    <div className="mb-8 text-left">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--tx)] tracking-tight">
            Kho thiết bị sinh viên UniGear.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[var(--mu)]">
            Giá đã gồm VAT. Giảm thêm 5% khi xác thực thẻ SV, bảo hành chính hãng 12 tháng 1 đổi 1 và giao tận KTX.
          </p>
        </div>

        {/* Instant Search Bar */}
        <div className="w-full md:w-80 relative">
          <Search className="w-4 h-4 text-[var(--mu)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm MacBook, RTX, Sony, M2..."
            aria-label="Tìm kiếm sản phẩm"
            className="w-full pl-10 pr-9 py-2.5 rounded-full text-xs bg-[var(--surface)] border border-[var(--ln)] text-[var(--tx)] placeholder:text-[var(--mu)] focus:outline-none focus:border-[var(--pri)] focus:ring-1 focus:ring-[var(--pri)] transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--mu)] hover:text-[var(--tx)] cursor-pointer"
              title="Xóa tìm kiếm"
              aria-label="Xóa nội dung tìm kiếm"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Pills: Category, Dynamic Budget, Brand */}
      <div className="mt-6 flex flex-col gap-3">
        {/* Row 1: Categories */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-[var(--mu)] mr-1">Danh mục:</span>
          {[
            { id: 'all', label: `Tất cả (${totalProductsCount})` },
            { id: 'laptop', label: `Laptop (${categoryCounts['laptop'] || 0})` },
            { id: 'tablet', label: `Tablet & Bút (${categoryCounts['tablet'] || 0})` },
            { id: 'audio', label: `Tai nghe & Loa (${categoryCounts['audio'] || 0})` },
            { id: 'accessory', label: `Phụ kiện (${categoryCounts['accessory'] || 0})` },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategorySelect(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[var(--tx)] text-[var(--bg)] shadow-sm'
                  : 'bg-[var(--surface)] border border-[var(--ln)] text-[var(--tx)] hover:border-[var(--tx)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Row 2: Category-Aware Budget */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-[var(--mu)] mr-1">Mức giá:</span>
          {priceTiers.map((tier) => (
            <button
              key={tier.id}
              type="button"
              onClick={() => onBudgetSelect(tier.id)}
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

        {/* Row 3: Brand pills if more than 2 brands available */}
        {availableBrands.length > 2 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-xs font-semibold text-[var(--mu)] mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" /> Hãng:
            </span>
            {availableBrands.slice(0, 15).map((brand) => (
              <button
                key={brand}
                type="button"
                onClick={() => onBrandSelect(brand)}
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

      {/* Result Status Bar with Sorting & Count */}
      <div className="mt-5 pt-3 border-t border-[var(--ln)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[var(--mu)] font-mono-code">
        <div>
          Tìm thấy <strong className="text-[var(--tx)]">{filteredCount}</strong> sản phẩm phù hợp
          {searchQuery && ` cho từ khóa "${searchQuery}"`}
          {interpretation && ` · Hiểu là: ${interpretation}`}
          {selectedBrand !== 'all' && ` · Hãng ${selectedBrand}`}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4">
          {/* Sorting Dropdown */}
          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-[var(--mu)]" />
            <label htmlFor="catalog-sort" className="font-semibold text-xs text-[var(--mu)] hidden md:inline">
              Sắp xếp:
            </label>
            <select
              id="catalog-sort"
              value={selectedSort}
              onChange={(e) => onSortSelect(e.target.value as SortOption)}
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
            Hiển thị {Math.min(visibleCount, filteredCount)} / {filteredCount}
          </span>
        </div>
      </div>
    </div>
  );
};
