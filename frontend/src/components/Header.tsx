"use client";

import Link from "next/link";
import { Zap, Search, Heart, ShoppingBag, Grid, GraduationCap } from "lucide-react";

interface HeaderProps {
  cartCount?: number;
}

export default function Header({ cartCount = 3 }: HeaderProps) {
  return (
    <>
      {/* Express Top Announcement Strip */}
      <div className="bg-primary text-on-primary py-2 px-4 text-xs md:text-sm font-medium z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <span className="truncate">🚀 Giao hàng miễn phí Campus Express cho đơn từ 250.000đ</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0 text-on-primary/90">
            <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
            <span>Chuyến giao tiếp theo:</span>
            <span className="font-bold tabular-nums bg-white/10 px-2 py-0.5 rounded text-white">28m 42s</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-3 md:gap-6">
          
          {/* Brand Logo - Elite Technology */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm group-hover:scale-105 transition-transform">
              <Zap className="w-6 h-6 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl md:text-2xl text-primary tracking-tight leading-none">
                Elite Technology
              </span>
              <span className="text-[10px] text-on-surface-variant font-semibold tracking-wider uppercase hidden sm:inline">
                E-Commerce Platform
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="flex items-center bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-sm p-1.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <div className="flex-1 flex items-center px-3">
                <Search className="w-5 h-5 text-outline mr-2 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Tìm kiếm MacBook, iPhone, bàn phím cơ, AirPods..."
                  className="w-full bg-transparent text-sm text-on-surface placeholder:text-outline focus:outline-none"
                />
              </div>
              <button
                type="button"
                className="bg-primary hover:bg-primary-container text-on-primary px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1 shadow-sm"
              >
                Tìm
              </button>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 font-medium text-sm text-on-surface-variant">
            <Link href="/" className="px-3 py-2 rounded-lg bg-surface-container-high text-primary font-bold">
              Trang chủ
            </Link>
            <Link
              href="/products"
              className="px-3.5 py-2 rounded-lg hover:text-on-surface hover:bg-surface-container-low transition-colors flex items-center gap-1.5"
            >
              <Grid className="w-4 h-4" />
              <span>Tất cả danh mục</span>
            </Link>
            <Link href="/products" className="px-3 py-2 rounded-lg hover:text-on-surface hover:bg-surface-container-low transition-colors">
              Sản phẩm
            </Link>
            <a href="#deals" className="px-3 py-2 rounded-lg hover:text-on-surface hover:bg-surface-container-low transition-colors flex items-center gap-1">
              <span>Khuyến mãi</span>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
            </a>
          </nav>

          {/* User Status / Action Badges */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            <div className="hidden xl:flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold">
              <GraduationCap className="w-4 h-4" />
              <span>15% Student</span>
            </div>

            {/* Wishlist */}
            <button
              aria-label="Wishlist"
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors"
            >
              <Heart className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 bg-secondary-container text-on-secondary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                2
              </span>
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              aria-label="Cart"
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 bg-primary text-on-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            </Link>

            {/* Portal Profile Shortcut */}
            <Link
              href="/portal"
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-surface-container-low transition-colors border border-outline-variant/30"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
              />
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-bold text-on-surface leading-tight">Alex Rivera</span>
                <span className="text-[10px] text-primary font-medium flex items-center gap-1 leading-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary-container inline-block"></span>
                  SV Verified
                </span>
              </div>
            </Link>

            {/* Quick Auth Link */}
            <Link
              href="/auth"
              className="hidden sm:inline-flex text-xs font-bold px-3 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary transition-colors"
            >
              Đăng xuất / Đổi TK
            </Link>
          </div>
        </div>

        {/* Mobile Search Row */}
        <div className="md:hidden px-4 pb-3 pt-1">
          <div className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant/40 rounded-xl px-3 py-2 shadow-sm">
            <Search className="w-5 h-5 text-primary flex-shrink-0" />
            <input
              type="text"
              placeholder="Tìm kiếm laptop, phụ kiện, gear..."
              className="flex-1 bg-transparent text-sm text-on-surface placeholder:text-outline focus:outline-none"
            />
          </div>
        </div>
      </header>
    </>
  );
}
