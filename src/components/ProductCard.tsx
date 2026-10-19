import React from 'react';
import { Product } from '../types';
import { ProductIllustration } from './ProductIllustrations';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    showToast(`Đã thêm ${product.name} vào giỏ hàng`);
  };

  const formatPrice = (val: number) => val.toLocaleString('vi-VN') + 'đ';

  const [imageError, setImageError] = React.useState(false);

  return (
    <article
      onClick={() => onSelectProduct(product)}
      className="group bg-[var(--card)] border border-[var(--ln)] rounded-3xl p-4 sm:p-5 flex flex-col justify-between hover:border-[var(--pri)]/60 hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden"
    >
      {/* Top badges */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 flex-wrap max-w-[85%]">
        {product.discountBadge && (
          <span className="bg-[var(--warm)] text-[#1A0F08] text-xs font-bold font-mono-code px-2.5 py-0.5 rounded-full shadow-sm">
            {product.discountBadge}
          </span>
        )}
        {product.brand && (
          <span className="bg-[var(--surface)] border border-[var(--ln)] text-[var(--tx)] text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-md">
            {product.brand}
          </span>
        )}
      </div>

      {/* Graphic / Real Image Stage */}
      <div className="w-full aspect-[4/3] rounded-2xl bg-[var(--stage)] border border-[var(--bln)] flex items-center justify-center p-2.5 sm:p-3 relative overflow-hidden mb-4 group-hover:scale-[1.02] transition-transform duration-300">
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)]/30 to-transparent pointer-events-none" />
        {!imageError && product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
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
                ? 'pulse'
                : 'charger'
            }
            uniqueId={product.id}
            className="w-full h-full drop-shadow-md opacity-80"
          />
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-grow">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[11px] font-mono-code text-[var(--mu)] uppercase tracking-wider truncate">
            {product.brand || product.category}
          </span>
          {product.rating && (
            <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400 font-mono-code flex-shrink-0">
              <span>★</span>
              <span>{product.rating}</span>
              {product.reviewsCount && (
                <span className="text-[10px] text-[var(--mu)] font-normal">({product.reviewsCount})</span>
              )}
            </div>
          )}
        </div>

        <h3 className="text-base sm:text-lg font-bold text-[var(--tx)] group-hover:text-[var(--pri-h)] transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xs text-[var(--mu)] mt-1 line-clamp-2">
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

        {/* Actions */}
        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={() => onSelectProduct(product)}
            className="flex-1 py-2 px-3 rounded-full text-xs font-bold border border-[var(--ln)] bg-[var(--surface)] text-[var(--tx)] hover:border-[var(--tx)] transition-all cursor-pointer text-center"
          >
            Chi tiết
          </button>
          <button
            onClick={handleAddToCart}
            className="flex-1 py-2 px-3 rounded-full text-xs font-bold bg-[var(--tx)] text-[var(--bg)] hover:bg-[var(--pri)] hover:text-white transition-all cursor-pointer text-center"
          >
            Thêm
          </button>
        </div>
      </div>
    </article>
  );
};
