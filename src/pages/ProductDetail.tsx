import React, { useState } from 'react';
import { Product } from '../types';
import { ProductIllustration } from '../components/ProductIllustrations';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Check, ArrowRight, ArrowLeft, ShieldCheck, Zap, Sparkles } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  onNavigate: (page: 'storefront' | 'pdp' | 'auth' | 'checkout', category?: string) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onNavigate }) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [activeThumb, setActiveThumb] = useState<number>(0);
  const [selectedConfigId, setSelectedConfigId] = useState<string>(
    product.configurations[0]?.id || 'default'
  );
  const [selectedColorId, setSelectedColorId] = useState<string>(
    product.colors[0]?.id || 'default'
  );
  const [activeTab, setActiveTab] = useState<'installment' | 'tradein'>('installment');

  const selectedConfig =
    product.configurations.find((c) => c.id === selectedConfigId) ||
    product.configurations[0];

  const currentPrice = selectedConfig?.price || product.price;
  const currentStudentPrice = selectedConfig?.studentPrice || product.studentPrice;
  const monthlyPay = Math.round(currentStudentPrice / 12);

  const formatPrice = (val: number) => val.toLocaleString('vi-VN') + 'đ';

  const handleAddToCart = () => {
    addToCart(product, selectedConfigId, selectedColorId);
    showToast(`Đã thêm ${product.name} (${selectedConfig?.label}) vào giỏ hàng`);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedConfigId, selectedColorId);
    onNavigate('checkout');
  };

  return (
    <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-8 py-6">
      {/* Top Navigation & Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--ln)]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (window.history.length > 1) {
                window.history.back();
              } else {
                onNavigate('storefront', product.category);
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--ln)] hover:border-[var(--pri)] hover:text-[var(--pri)] text-[var(--tx)] text-xs font-bold transition-all cursor-pointer shadow-sm hover:shadow group"
            title="Quay lại danh sách sản phẩm"
          >
            <ArrowLeft className="w-4 h-4 text-[var(--mu)] group-hover:text-[var(--pri)] transition-colors" />
            <span>Quay lại</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-medium text-[var(--mu)]">
            <button
              onClick={() => onNavigate('storefront', 'all')}
              className="hover:text-[var(--tx)] transition-colors cursor-pointer"
            >
              Trang chủ
            </button>
            <span>/</span>
            <button
              onClick={() => onNavigate('storefront', product.category)}
              className="hover:text-[var(--tx)] transition-colors cursor-pointer capitalize"
            >
              {product.category === 'laptop'
                ? 'Laptop sinh viên'
                : product.category === 'tablet'
                ? 'Tablet & Bút'
                : product.category === 'audio'
                ? 'Tai nghe & Loa'
                : 'Phụ kiện'}
            </button>
            <span>/</span>
            <span className="text-[var(--tx)] font-semibold truncate max-w-[200px] sm:max-w-[320px]">
              {product.name}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[var(--ok)] font-semibold font-mono-code text-xs">
          <span className="w-2 h-2 rounded-full bg-[var(--ok)] animate-pulse" />
          <span>{product.stockLocation}</span>
        </div>
      </div>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-8">
        {/* Left Column: Gallery */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="w-full bg-[var(--stage)] border border-[var(--bln)] rounded-3xl p-6 sm:p-10 relative flex items-center justify-center min-h-[380px] sm:min-h-[460px] overflow-hidden shadow-inner">
            {/* Top Badges */}
            <div className="absolute top-5 left-5 z-20 flex items-center gap-2">
              <span className="bg-[var(--warm)] text-[#1A0F08] text-xs font-bold font-mono-code px-3 py-1 rounded-full shadow-md">
                {product.discountBadge} Giảm sốc
              </span>
              {product.brand && (
                <span className="bg-[var(--surface)] border border-[var(--ln)] text-[var(--tx)] text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-md">
                  {product.brand}
                </span>
              )}
            </div>
            <div className="absolute top-5 right-5 z-20">
              <span className="bg-[var(--pri)]/20 border border-[var(--pri)] text-[var(--pri-h)] text-xs font-semibold font-mono-code px-3 py-1 rounded-full">
                Sinh viên: -5% Thẻ SV
              </span>
            </div>

            {/* Glowing Backdrop */}
            <div className="absolute inset-0 bg-radial from-[var(--pri)]/30 via-[var(--warm)]/15 to-transparent blur-3xl pointer-events-none" />

            {/* Product Real Image with Fallback */}
            {product.galleryUrls && product.galleryUrls[activeThumb] ? (
              <img
                src={product.galleryUrls[activeThumb]}
                alt={`${product.name} angle ${activeThumb + 1}`}
                className="w-full h-full max-h-[380px] sm:max-h-[440px] object-contain drop-shadow-2xl transition-all duration-500 z-10 hover:scale-[1.03]"
              />
            ) : product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full max-h-[380px] sm:max-h-[440px] object-contain drop-shadow-2xl transition-all duration-500 z-10 hover:scale-[1.03]"
              />
            ) : product.imageType ? (
              <ProductIllustration
                type={product.imageType}
                uniqueId="pdp-main"
                className="w-full h-full max-h-[380px] drop-shadow-2xl transition-all duration-300 z-10"
              />
            ) : null}
          </div>

          {/* Gallery Angles Thumbnails */}
          {product.galleryUrls && product.galleryUrls.length > 0 ? (
            <div className={`grid ${product.galleryUrls.length >= 5 ? 'grid-cols-5' : product.galleryUrls.length === 4 ? 'grid-cols-4' : 'grid-cols-3'} gap-2.5 sm:gap-3`}>
              {product.galleryUrls.map((url, idx) => {
                const getAngleLabel = () => {
                  if (product.category === 'laptop') {
                    return ['Chính diện', 'Góc nghiêng', 'Bàn phím', 'Cổng kết nối', 'Mặt lưng'][idx] || `Góc ${idx + 1}`;
                  }
                  if (product.category === 'tablet') {
                    return ['Mặt trước', 'Góc nghiêng', 'Bút / Phụ kiện', 'Mặt lưng'][idx] || `Góc ${idx + 1}`;
                  }
                  if (product.category === 'audio') {
                    return ['Chính diện', 'Góc nghiêng', 'Hộp sạc / Case', 'Chi tiết'][idx] || `Góc ${idx + 1}`;
                  }
                  return ['Chính diện', 'Góc nghiêng', 'Mặt đáy / Cạnh', 'Chi tiết'][idx] || `Góc ${idx + 1}`;
                };
                const label = getAngleLabel();
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveThumb(idx)}
                    className={`h-24 sm:h-28 rounded-2xl border p-2 flex flex-col items-center justify-between transition-all cursor-pointer bg-[var(--card)] group ${
                      activeThumb === idx
                        ? 'border-[var(--pri)] ring-2 ring-[var(--pri)]/40 bg-[var(--pri)]/10 shadow-md'
                        : 'border-[var(--ln)] hover:border-[var(--pri)]/60 opacity-75 hover:opacity-100'
                    }`}
                    title={label}
                  >
                    <div className="w-full flex-1 flex items-center justify-center overflow-hidden">
                      <img
                        src={url}
                        alt={`${product.name} ${label}`}
                        className="max-h-16 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <span className={`text-[10px] font-mono-code mt-1 truncate max-w-full font-medium ${
                      activeThumb === idx ? 'text-[var(--pri-h)] font-bold' : 'text-[var(--mu)]'
                    }`}>
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 0, label: 'Mặt trước chính diện' },
                { id: 1, label: 'Góc nghiêng bàn phím' },
                { id: 2, label: 'Cổng kết nối Type-C' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveThumb(t.id)}
                  className={`p-3 rounded-2xl border text-xs font-semibold transition-all cursor-pointer text-center ${
                    activeThumb === t.id
                      ? 'border-[var(--pri)] bg-[var(--pri)]/10 text-[var(--pri-h)] ring-2 ring-[var(--pri)]/30'
                      : 'border-[var(--ln)] bg-[var(--card)] text-[var(--mu)] hover:text-[var(--tx)] hover:border-[var(--tx)]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          )}

          {/* Warranty Commitment Box */}
          <div className="bg-[var(--card)] border border-[var(--ln)] rounded-2xl p-4 flex items-start gap-3 mt-2">
            <div className="w-6 h-6 rounded-full bg-[var(--ok)]/20 text-[var(--ok)] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[var(--tx)]">
                Bảo hành chính hãng 12 tháng + 1 đổi 1 trong 30 ngày
              </h4>
              <p className="text-[11px] text-[var(--mu)] mt-0.5">
                Hỗ trợ kỹ thuật viên nhận máy tận phòng KTX/nhà trọ miễn phí.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Information & Options */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              {product.brand && (
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[var(--surface)] border border-[var(--ln)] text-[var(--tx)]">
                  {product.brand}
                </span>
              )}
              <span className="text-[11px] font-mono-code font-bold uppercase tracking-widest text-[var(--warm)]">
                {product.subTitle}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--tx)] tracking-tight mt-1">
              {product.name}
            </h1>
            {product.rating && (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-400 text-sm">
                  <span>★</span>
                  <span className="ml-1 text-xs font-bold text-[var(--tx)] font-mono-code">{product.rating}/5.0</span>
                </div>
                <span className="text-xs text-[var(--mu)]">·</span>
                <span className="text-xs text-[var(--mu)]">
                  {product.reviewsCount || 100}+ đánh giá từ sinh viên
                </span>
              </div>
            )}
            <p className="mt-3 text-sm text-[var(--mu)] leading-relaxed">
              {product.desc}
            </p>
          </div>

          {/* Price Card */}
          <div className="bg-[var(--card)] border border-[var(--ln)] rounded-3xl p-6 flex flex-col gap-4 shadow-sm">
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-[var(--tx)] font-mono-code tracking-tight">
                {formatPrice(currentPrice)}
              </span>
              {product.oldPrice && (
                <span className="text-base text-[var(--mu)] line-through font-mono-code">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
              {product.oldPrice && (
                <span className="text-xs font-bold text-[var(--warm)] bg-[var(--warm)]/15 px-2.5 py-1 rounded-full">
                  Tiết kiệm {formatPrice(product.oldPrice - currentPrice)}
                </span>
              )}
            </div>

            {/* Student Price Exclusive Banner */}
            <div className="bg-[var(--ok)]/10 border border-[var(--ok)]/30 rounded-2xl p-4 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[var(--ok)] block">
                  Ưu đãi độc quyền thẻ Sinh viên:
                </span>
                <span className="text-[11px] text-[var(--mu)]">
                  Giảm thêm 5% trực tiếp khi quét thẻ SV/App trường
                </span>
              </div>
              <b className="text-lg sm:text-xl font-mono-code text-[var(--ok)] whitespace-nowrap">
                {formatPrice(currentStudentPrice)}
              </b>
            </div>
          </div>

          {/* Hardware Configuration Selection */}
          {product.configurations.length > 0 && (
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[var(--mu)]">Chọn cấu hình phần cứng:</span>
                <span className="font-mono-code text-[var(--tx)] font-medium">
                  {selectedConfig?.label}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.configurations.map((cfg) => (
                  <button
                    key={cfg.id}
                    onClick={() => setSelectedConfigId(cfg.id)}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      selectedConfigId === cfg.id
                        ? 'border-[var(--pri)] bg-[var(--pri)]/10 ring-2 ring-[var(--pri)]/30'
                        : 'border-[var(--ln)] bg-[var(--card)] hover:border-[var(--tx)]'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-[var(--tx)]">
                        {cfg.label}
                      </div>
                      <div className="text-[11px] text-[var(--mu)] mt-0.5">
                        {cfg.note}
                      </div>
                    </div>
                    <div className="font-mono-code font-bold text-xs text-[var(--tx)] mt-2">
                      {formatPrice(cfg.price)}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.colors.length > 0 && (
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-[var(--mu)]">Màu sắc vỏ hợp kim:</span>
                <span className="font-bold text-[var(--tx)]">
                  {product.colors.find((c) => c.id === selectedColorId)?.name}
                </span>
              </div>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColorId(color.id)}
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border text-xs font-semibold transition-all cursor-pointer ${
                      selectedColorId === color.id
                        ? 'border-[var(--pri)] bg-[var(--pri)]/10 text-[var(--tx)] ring-2 ring-[var(--pri)]/30'
                        : 'border-[var(--ln)] bg-[var(--card)] text-[var(--mu)] hover:border-[var(--tx)]'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trade-in & Installment Tabs */}
          <div className="bg-[var(--card)] border border-[var(--ln)] rounded-3xl p-6 flex flex-col gap-4">
            <div className="flex border-b border-[var(--ln)] pb-3 gap-4 text-xs font-bold">
              <button
                onClick={() => setActiveTab('installment')}
                className={`pb-1 transition-all cursor-pointer ${
                  activeTab === 'installment'
                    ? 'text-[var(--tx)] border-b-2 border-[var(--pri)]'
                    : 'text-[var(--mu)] hover:text-[var(--tx)]'
                }`}
              >
                Trả góp 0% sinh viên
              </button>
              <button
                onClick={() => setActiveTab('tradein')}
                className={`pb-1 transition-all cursor-pointer ${
                  activeTab === 'tradein'
                    ? 'text-[var(--tx)] border-b-2 border-[var(--warm)]'
                    : 'text-[var(--mu)] hover:text-[var(--tx)]'
                }`}
              >
                Thu cũ đổi mới (Bán máy cũ)
              </button>
            </div>

            {activeTab === 'installment' ? (
              <div className="flex flex-col gap-2.5 text-xs text-[var(--mu)]">
                <div className="flex justify-between items-center">
                  <span>Gói trả góp 12 tháng qua CCCD/Thẻ SV:</span>
                  <b className="text-sm font-mono-code text-[var(--warm)] font-bold">
                    {formatPrice(monthlyPay)} / tháng
                  </b>
                </div>
                <div className="space-y-1.5 pt-1 text-[11px]">
                  <div>✓ Không cần thẻ tín dụng ngân hàng.</div>
                  <div>✓ Duyệt tự động 5 phút qua đối tác Kredivo/HomePay tại UniGear.</div>
                  <div>✓ Trả trước 0đ nhận máy ngay.</div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2 text-xs text-[var(--mu)]">
                <p>
                  Định giá máy cũ online và cấn trừ trực tiếp khi mua {product.name}.
                </p>
                <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--ln)] text-[11px] text-[var(--tx)] flex items-center justify-between">
                  <span>Trợ giá lên đời sinh viên:</span>
                  <b className="text-[var(--ok)] font-mono-code">+500.000đ</b>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleBuyNow}
              className="flex-1 py-4 px-6 rounded-full font-bold text-sm bg-[var(--tx)] text-[var(--bg)] hover:bg-[var(--pri)] hover:text-white transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Mua ngay (Nhận hàng tại KTX)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleAddToCart}
              className="py-4 px-6 rounded-full font-bold text-sm bg-[var(--surface)] border border-[var(--ln)] text-[var(--tx)] hover:border-[var(--tx)] transition-all cursor-pointer"
            >
              Thêm vào giỏ hàng
            </button>
          </div>

          {/* Technical Specifications Grid */}
          <div className="mt-2">
            <h3 className="text-xs font-bold text-[var(--mu)] uppercase tracking-wider mb-3">
              Thông số kỹ thuật đồ án:
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {product.specs.map((spec, i) => (
                <div
                  key={i}
                  className="bg-[var(--card)] border border-[var(--ln)] rounded-2xl p-3.5"
                >
                  <span className="text-[11px] text-[var(--mu)] block">
                    {spec.label}
                  </span>
                  <span className="text-xs font-bold text-[var(--tx)] font-mono-code block mt-0.5">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
