"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import {
  Laptop,
  Smartphone,
  Headphones,
  Watch,
  Keyboard,
  Backpack,
  ArrowRight,
  Flame,
  Clock,
  Star,
  ShoppingCart,
  Heart,
  CheckCircle2,
  Bike,
  RefreshCw,
  CreditCard,
  IdCard,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  discountBadge?: string;
  rating: number;
  reviewsCount: number;
  image: string;
}

const FEATURED_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Tai Nghe NovaPro ANC Wireless",
    category: "Âm thanh",
    price: "2.990.000đ",
    originalPrice: "4.390.000đ",
    discountBadge: "-32%",
    rating: 4.8,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: "p2",
    name: "Đồng Hồ Thông Minh AeroPulse V2",
    category: "Wearable",
    price: "1.890.000đ",
    originalPrice: "2.520.000đ",
    discountBadge: "-25%",
    rating: 4.9,
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: "p3",
    name: "Bàn Phím Cơ Không Dây ErgoWave",
    category: "Phụ kiện",
    price: "1.650.000đ",
    originalPrice: "2.100.000đ",
    discountBadge: "Bán Chạy",
    rating: 4.9,
    reviewsCount: 310,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=80",
  },
  {
    id: "p4",
    name: "Balo Chống Nước Tech Backpack 22L",
    category: "Balo Campus",
    price: "850.000đ",
    originalPrice: "1.050.000đ",
    discountBadge: "-15%",
    rating: 4.7,
    reviewsCount: 215,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=80",
  },
];

export default function HomePage() {
  const [cartCount, setCartCount] = useState(3);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleAddToCart = (productName: string) => {
    setCartCount((prev) => prev + 1);
    setToastMsg(`Đã thêm "${productName}" vào giỏ hàng!`);
    setTimeout(() => {
      setToastMsg(null);
    }, 2400);
  };

  return (
    <>
      <Header cartCount={cartCount} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
        
        {/* 1. HERO BENTO SECTION */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-container to-blue-700 text-on-primary p-6 sm:p-10 lg:p-12 shadow-lg">
          {/* Ambient Glows */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-72 h-72 rounded-full bg-secondary-container/20 blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-on-primary">
                  Độc Quyền Campus • FER202 Tech
                </span>
                <span className="bg-secondary-container text-on-secondary px-2.5 py-1 rounded-full text-xs font-extrabold shadow-sm">
                  GIẢM TỚI 40%
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Khám Phá Công Nghệ <br className="hidden sm:inline" />
                <span className="text-secondary-fixed">Bạn Sẽ Yêu Thích</span>
              </h1>

              <p className="text-on-primary-container text-sm sm:text-base max-w-xl leading-relaxed">
                Hệ sinh thái laptop cao cấp, tai nghe chống ồn, phụ kiện bàn làm việc và setup sinh viên tối ưu với mức giá hỗ trợ tốt nhất kỳ học mới.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/products"
                  className="px-5 py-3 rounded-xl bg-secondary-container hover:bg-secondary text-on-secondary font-bold text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95"
                >
                  <span>Mua Ngay</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/portal"
                  className="px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-semibold text-sm transition-all active:scale-95 flex items-center gap-2"
                >
                  <IdCard className="w-4 h-4" />
                  <span>Cổng Sinh Viên</span>
                </Link>
              </div>
            </div>

            {/* Right Card / Promo Highlight */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-2xl">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-surface-container-low mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80"
                    alt="MacBook Pro Setup"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-primary text-white text-[11px] font-bold px-2 py-0.5 rounded-md">
                    Hot Deal 2026
                  </div>
                </div>
                <div className="flex items-center justify-between text-white">
                  <div>
                    <h4 className="font-bold text-sm">MacBook Pro M3 Max 16&quot;</h4>
                    <p className="text-xs text-on-primary-container">Apple Care+ Sinh Viên Kèm Theo</p>
                  </div>
                  <div className="text-right">
                    <span className="font-display font-extrabold text-base text-secondary-fixed">49.990.000đ</span>
                    <span className="block text-[11px] line-through text-white/60">56.990.000đ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. CATEGORY PILLS BAR */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-on-surface">Danh Mục Nổi Bật</h2>
            <Link href="/products" className="text-xs font-bold text-primary hover:underline flex items-center gap-0.5">
              <span>Xem tất cả</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
            <button className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary shadow-sm font-semibold text-xs transition-all">
              <Laptop className="w-4 h-4" />
              <span>Laptop & Mac</span>
            </button>
            <button className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-lowest hover:bg-surface-container-low text-on-surface border border-outline-variant/30 font-medium text-xs transition-all">
              <Smartphone className="w-4 h-4 text-primary" />
              <span>Điện Thoại</span>
            </button>
            <button className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-lowest hover:bg-surface-container-low text-on-surface border border-outline-variant/30 font-medium text-xs transition-all">
              <Headphones className="w-4 h-4 text-primary" />
              <span>Tai Nghe & Âm Thanh</span>
            </button>
            <button className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-lowest hover:bg-surface-container-low text-on-surface border border-outline-variant/30 font-medium text-xs transition-all">
              <Watch className="w-4 h-4 text-primary" />
              <span>Smartwatch</span>
            </button>
            <button className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-lowest hover:bg-surface-container-low text-on-surface border border-outline-variant/30 font-medium text-xs transition-all">
              <Keyboard className="w-4 h-4 text-primary" />
              <span>Bàn Phím & Chuột</span>
            </button>
            <button className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-lowest hover:bg-surface-container-low text-on-surface border border-outline-variant/30 font-medium text-xs transition-all">
              <Backpack className="w-4 h-4 text-primary" />
              <span>Balo & Phụ Kiện</span>
            </button>
          </div>
        </section>

        {/* 3. FLASH SALE & PRODUCT GRID */}
        <section id="deals" className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-5 sm:p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary flex items-center justify-center font-bold shadow-sm">
                <Flame className="w-6 h-6 fill-current" />
              </div>
              <div>
                <h2 className="font-display text-lg sm:text-xl font-bold text-on-surface">Flash Sale Hôm Nay</h2>
                <p className="text-xs text-on-surface-variant">Ưu đãi giờ vàng cho sinh viên có thẻ xác thực</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-surface-container-lowest px-3 py-1.5 rounded-xl border border-outline-variant/30 self-start sm:self-auto">
              <Clock className="w-4 h-4 text-secondary" />
              <span className="text-xs font-semibold text-on-surface-variant">Kết thúc sau:</span>
              <span className="font-display font-extrabold text-sm text-secondary tracking-widest tabular-nums">05:42:19</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {FEATURED_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="bg-surface-container-lowest rounded-xl p-3 sm:p-4 flex flex-col justify-between border border-outline-variant/20 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="relative">
                  {prod.discountBadge && (
                    <span className="absolute top-2 left-2 z-10 bg-secondary-container text-on-secondary text-[10px] font-extrabold px-1.5 py-0.5 rounded">
                      {prod.discountBadge}
                    </span>
                  )}
                  <button
                    aria-label="Yêu thích"
                    className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-outline hover:text-secondary shadow-sm"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                  <div className="aspect-square rounded-lg bg-surface-container-low overflow-hidden mb-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-on-surface-variant">{prod.category}</span>
                  <h3 className="text-xs sm:text-sm font-semibold text-on-surface line-clamp-1">{prod.name}</h3>
                  <div className="flex items-center gap-1 text-secondary text-xs">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-bold text-on-surface">{prod.rating}</span>
                    <span className="text-on-surface-variant text-[11px]">({prod.reviewsCount})</span>
                  </div>
                  <div className="flex items-baseline gap-1.5 pt-1">
                    <span className="font-display font-bold text-sm sm:text-base text-primary">{prod.price}</span>
                    {prod.originalPrice && (
                      <span className="text-[11px] text-outline line-through">{prod.originalPrice}</span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(prod.name)}
                  className="w-full mt-3 bg-secondary-container hover:bg-secondary text-on-secondary py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-all"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Thêm Giỏ</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 4. VALUE PROPOSITION / TRUST BADGES */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-on-surface">100% Chính Hãng</h4>
              <p className="text-[11px] text-on-surface-variant">Bảo hành 12 tháng tại hãng</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-secondary-container/10 text-secondary-container flex items-center justify-center flex-shrink-0">
              <Bike className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-on-surface">Express 2 Giờ</h4>
              <p className="text-[11px] text-on-surface-variant">Giao tận cổng ký túc xá / lớp học</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-on-surface">Đổi Trả 7 Ngày</h4>
              <p className="text-[11px] text-on-surface-variant">Miễn phí nếu lỗi sản xuất</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-secondary-container/10 text-secondary-container flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-on-surface">Trả Góp 0% Sinh Viên</h4>
              <p className="text-[11px] text-on-surface-variant">Thủ tục nhanh qua thẻ SV</p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <MobileBottomNav activeTab="home" cartCount={cartCount} />

      {/* Interactive Toast Popup */}
      {toastMsg && (
        <div className="fixed bottom-16 md:bottom-6 right-4 z-50 animate-bounce">
          <div className="bg-on-surface text-surface px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-xs font-semibold">
            <CheckCircle2 className="w-5 h-5 text-secondary-fixed" />
            <span>{toastMsg}</span>
          </div>
        </div>
      )}
    </>
  );
}
