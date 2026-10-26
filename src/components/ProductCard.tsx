'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '../types';
import { ProductIllustration } from './ProductIllustrations';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Star, ShoppingBag, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelectProduct?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    showToast(`Đã thêm ${product.name} vào giỏ hàng`);
  };

  const formatPrice = (val: number) => val.toLocaleString('vi-VN') + 'đ';

  // Extract 2-3 core spec chips
  const coreSpecChips = (product.specs || []).slice(0, 3).map((s) => s.value);

  const productUrl = `/san-pham/${product.id}`;

  return (
    <article className="group bg-[var(--card)] border border-[var(--ln)] rounded-3xl p-4 sm:p-5 flex flex-col justify-between hover:border-[var(--pri)]/60 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
      
      {/* 1. Stretched Accessible Link covering the entire card */}
      <Link
        href={productUrl}
        onClick={(e) => {
          if (onSelectProduct) {
            e.preventDefault();
            onSelectProduct(product);
          }
        }}
        aria-label={`Xem chi tiết sản phẩm ${product.name} - Giá ${formatPrice(product.studentPrice)}`}
        className="absolute inset-0 z-0"
      />

      {/* 2. Top Badges (Brand + Discount) */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 flex-wrap max-w-[85%] pointer-events-none">
        {product.discountBadge && (
          <span className="bg-[var(--warm)] text-[#1A0F08] text-xs font-bold font-mono-code px-2.5 py-0.5 rounded-full shadow-sm">
            {product.discountBadge}
          </span>
        )}
        {product.brand && (
          <span className="bg-[var(--surface)] border border-[var(--ln)] text-[var(--tx)] text-xs font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-md">
            {product.brand}
          </span>
        )}
      </div>

      {/* 3. Real Product Image Stage with fixed 4/3 aspect to eliminate CLS */}
      <div className="w-full aspect-[4/3] rounded-2xl bg-[var(--stage)] border border-[var(--bln)] flex items-center justify-center p-3 relative overflow-hidden mb-4 group-hover:scale-[1.02] transition-transform duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)]/30 to-transparent pointer-events-none" />
        
        {!imageError && product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={300}
            loading="lazy"
            className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        ) : product.imageType ? (
          <ProductIllustration
            type={product.imageType}
            uniqueId={product.id}
            className="w-full h-full drop-shadow-md"
          />
        ) : (
          <ProductIllustration
            type={
              product.category === 'laptop'
                ? 'nova14'
                : product.category === 'tablet'
                ? 'note11'
                : product.category === 'audio'
                ? product.name.toLowerCase().includes('loa')
                  ? 'cube'
                  : 'pulse'
                : product.name.toLowerCase().includes('phím') ||
                  product.name.toLowerCase().includes('keyboard')
                ? 'keyd'
                : 'charger'
            }
            uniqueId={product.id}
            className="w-full h-full drop-shadow-md opacity-80"
          />
        )}
      </div>

      {/* 4. Product Info & Core Spec Chips */}
      <div className="flex flex-col flex-grow relative z-10 pointer-events-none">
        
        {/* Rating or New Arrival Badge (Min 12px for accessibility) */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          {product.rating ? (
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 font-mono-code">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              {product.reviewsCount ? (
                <span className="text-xs text-[var(--mu)] font-normal">
                  ({product.reviewsCount} đánh giá)
                </span>
              ) : null}
            </div>
          ) : (
            <span className="text-xs font-semibold text-[var(--ok)] font-mono-code">
              ★ Mẫu sinh viên mới
            </span>
          )}
        </div>

        {/* Product Title */}
        <h3 className="text-base sm:text-lg font-bold text-[var(--tx)] group-hover:text-[var(--pri-h)] transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Core Specs Chips: Shows RAM, SSD, CPU directly on the card */}
        {coreSpecChips.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap mt-2">
            {coreSpecChips.map((chip, idx) => (
              <span
                key={idx}
                className="text-[12px] font-medium text-[var(--mu)] bg-[var(--surface)] border border-[var(--ln)] px-2 py-0.5 rounded-md truncate max-w-[160px]"
              >
                {chip}
              </span>
            ))}
          </div>
        )}

        {/* Short Subtitle */}
        <p className="text-xs text-[var(--mu)] mt-2 line-clamp-2 leading-relaxed">
          {product.desc}
        </p>

        {/* Pricing */}
        <div className="mt-4 pt-3 border-t border-[var(--ln)] flex flex-col gap-1">
          <div className="flex items-baseline gap-2">
            <span className="font-extrabold text-base sm:text-lg text-[var(--tx)] font-mono-code">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-[var(--mu)] line-through font-mono-code">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
          <div className="text-xs font-semibold text-[var(--ok)] font-mono-code">
            Thẻ SV: {formatPrice(product.studentPrice)}
          </div>
        </div>

        {/* 5. Real Interactive Action Buttons */}
        <div className="mt-4 flex items-center gap-2 pointer-events-auto">
          <Link
            href={productUrl}
            onClick={(e) => {
              if (onSelectProduct) {
                e.preventDefault();
                onSelectProduct(product);
              }
            }}
            className="flex-1 py-2 px-3 rounded-full text-xs font-bold border border-[var(--ln)] bg-[var(--surface)] text-[var(--tx)] hover:border-[var(--tx)] hover:bg-[var(--card)] transition-all cursor-pointer text-center inline-flex items-center justify-center gap-1.5 relative z-10"
          >
            <Eye className="w-3.5 h-3.5 text-[var(--mu)]" />
            <span>Chi tiết</span>
          </Link>

          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 py-2 px-3 rounded-full text-xs font-bold bg-[var(--tx)] text-[var(--bg)] hover:bg-[var(--pri)] hover:text-white transition-all cursor-pointer text-center inline-flex items-center justify-center gap-1.5 relative z-10 shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Thêm</span>
          </button>
        </div>
      </div>
    </article>
  );
};
