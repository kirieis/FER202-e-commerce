import React from 'react';
import Link from 'next/link';
import { Product } from '../../types';

interface HeroBannerProps {
  flagshipProduct: Product;
  onSelectProduct?: (product: Product) => void;
  onExploreCatalog: () => void;
  onExploreTradeIn: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  flagshipProduct,
  onSelectProduct,
  onExploreCatalog,
  onExploreTradeIn,
}) => {
  const productUrl = `/san-pham/${flagshipProduct.id}`;

  return (
    <>
      {/* Top Banner Tag */}
      <div className="mt-8 mb-4 px-4 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--ln)] text-xs text-[var(--mu)] flex items-center gap-2 shadow-sm text-center">
        <span className="font-bold text-[var(--warm)] font-mono-code">-5%</span>
        <span>khi xác thực thẻ sinh viên &amp; Thu cũ đổi mới trợ giá 500k · 120+ thiết bị sẵn hàng</span>
      </div>

      {/* Hero Section */}
      <section className="max-w-[1240px] w-full px-4 sm:px-8 pt-4 pb-16 flex flex-col items-center text-center">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[var(--tx)] max-w-4xl leading-[1.1]">
          Máy mạnh cho đồ án. <br className="hidden sm:inline" />
          <span className="text-[var(--tx)]">Giá vừa ví sinh viên.</span>
        </h1>
        <p className="mt-5 text-sm sm:text-lg text-[var(--mu)] max-w-2xl leading-relaxed">
          Kho 120+ thiết bị laptop, máy tính bảng, tai nghe và phụ kiện chính hãng tại UniGear. Bảo hành 1 đổi 1, hỗ trợ trả góp sinh viên 0% và thu cũ đổi mới.
        </p>

        {/* Hero CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onExploreCatalog}
            className="px-7 py-3.5 rounded-full text-sm font-bold bg-[var(--tx)] text-[var(--bg)] hover:bg-[var(--pri)] hover:text-white transition-all shadow-lg hover:shadow-xl cursor-pointer"
          >
            Khám phá 120+ sản phẩm
          </button>
          <button
            type="button"
            onClick={onExploreTradeIn}
            className="px-7 py-3.5 rounded-full text-sm font-bold bg-[var(--surface)] border border-[var(--ln)] text-[var(--tx)] hover:border-[var(--tx)] transition-all cursor-pointer"
          >
            Cách thức Mua &amp; Bán lại
          </button>
        </div>

        {/* Hero Flagship Product Accessible Link */}
        <Link
          href={productUrl}
          onClick={(e) => {
            if (onSelectProduct) {
              e.preventDefault();
              onSelectProduct(flagshipProduct);
            }
          }}
          className="mt-12 w-full max-w-4xl relative group cursor-pointer block rounded-3xl focus:outline-none focus:ring-2 focus:ring-[var(--pri)]"
          aria-label={`Xem cấu hình chi tiết sản phẩm nổi bật ${flagshipProduct.name}`}
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-radial from-[var(--pri)]/35 via-[var(--warm)]/20 to-transparent blur-3xl opacity-75 group-hover:opacity-100 transition-opacity -z-10" />

          <div className="w-full rounded-3xl p-6 sm:p-12 flex flex-col items-center justify-center">
            <img
              src={flagshipProduct.imageUrl}
              alt={flagshipProduct.name}
              width={640}
              height={420}
              fetchPriority="high"
              className="w-full max-w-[640px] max-h-[380px] sm:max-h-[420px] object-contain drop-shadow-2xl group-hover:scale-[1.03] transition-transform duration-500"
            />
            <div className="mt-6 font-mono-code text-xs sm:text-sm text-[var(--mu)] flex flex-wrap items-center justify-center gap-2">
              <span className="font-bold text-[var(--tx)]">{flagshipProduct.name}</span>
              <span>
                · từ {flagshipProduct.price.toLocaleString('vi-VN')}đ hoặc{' '}
                {flagshipProduct.monthlyInstallment.toLocaleString('vi-VN')}đ/tháng (Kỳ hạn 12 tháng, 0% lãi)
              </span>
              <span className="text-[var(--pri-h)] font-semibold underline group-hover:text-[var(--pri)] transition-colors">
                Xem cấu hình chi tiết →
              </span>
            </div>
          </div>
        </Link>
      </section>
    </>
  );
};
