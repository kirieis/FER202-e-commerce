'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useStudent } from '../context/StudentContext';
import { UniGearLogo } from './UniGearLogo';
import { Sun, Moon, ShoppingBag, ShieldCheck, Menu, X, ArrowRight, Sparkles, User } from 'lucide-react';

interface NavbarProps {
  onNavigate?: (page: 'storefront' | 'pdp' | 'auth' | 'checkout', category?: string) => void;
  currentPage?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { totalCount } = useCart();
  const { student } = useStudent();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isCheckout = currentPage === 'checkout' || pathname === '/thanh-toan';

  return (
    <header className="sticky top-0 z-50 h-16 w-full backdrop-blur-xl border-b border-[var(--ln)] bg-[var(--bg)]/90 transition-colors duration-200 shadow-sm">
      <div className="max-w-[1280px] h-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 lg:gap-6">
        
        {/* 1. Brand Logo as real <a> */}
        <Link
          href="/"
          onClick={() => {
            if (onNavigate) onNavigate('storefront');
          }}
          aria-label="Về trang chủ UniGear"
          className="flex-shrink-0 cursor-pointer group flex items-center"
        >
          <UniGearLogo size="md" />
        </Link>

        {/* 2. Desktop Navigation Links (Real accessible <a> links on 1 single line) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[13px] font-medium text-[var(--mu)] flex-shrink-0">
          <Link
            href="/laptop"
            className={`whitespace-nowrap px-3 py-1.5 rounded-full transition-all cursor-pointer ${
              pathname === '/laptop'
                ? 'text-[var(--tx)] bg-[var(--surface)] font-semibold'
                : 'hover:text-[var(--tx)] hover:bg-[var(--surface)]/60'
            }`}
          >
            Laptop
          </Link>

          <Link
            href="/tablet"
            className={`whitespace-nowrap px-3 py-1.5 rounded-full transition-all cursor-pointer ${
              pathname === '/tablet'
                ? 'text-[var(--tx)] bg-[var(--surface)] font-semibold'
                : 'hover:text-[var(--tx)] hover:bg-[var(--surface)]/60'
            }`}
          >
            Tablet
          </Link>

          <Link
            href="/audio"
            className={`whitespace-nowrap px-3 py-1.5 rounded-full transition-all cursor-pointer ${
              pathname === '/audio'
                ? 'text-[var(--tx)] bg-[var(--surface)] font-semibold'
                : 'hover:text-[var(--tx)] hover:bg-[var(--surface)]/60'
            }`}
          >
            Tai nghe &amp; Loa
          </Link>

          <Link
            href="/accessory"
            className={`whitespace-nowrap px-3 py-1.5 rounded-full transition-all cursor-pointer ${
              pathname === '/accessory'
                ? 'text-[var(--tx)] bg-[var(--surface)] font-semibold'
                : 'hover:text-[var(--tx)] hover:bg-[var(--surface)]/60'
            }`}
          >
            Phụ kiện
          </Link>

          <Link
            href="/#tradein-section"
            className="whitespace-nowrap px-3 py-1.5 rounded-full hover:text-[var(--tx)] hover:bg-[var(--surface)]/60 transition-all cursor-pointer"
          >
            Thu cũ đổi mới
          </Link>

          <Link
            href="/xac-thuc"
            className="whitespace-nowrap px-3 py-1.5 rounded-full text-[var(--warm)] font-semibold hover:bg-[var(--warm)]/10 transition-all cursor-pointer flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Ưu đãi SV (-5%)</span>
          </Link>
        </nav>

        {/* 3. Right Action Bar with Real Links */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
          
          {/* User Account / Prominent Login as real <a> */}
          {student.email || student.isVerified ? (
            <Link
              href="/xac-thuc"
              className="inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--ok)]/15 border border-[var(--ok)]/30 text-[var(--ok)] hover:bg-[var(--ok)]/25 transition-all cursor-pointer flex-shrink-0"
              title={`Tài khoản: ${student.fullName || student.email}`}
            >
              {student.avatarUrl ? (
                <img
                  src={student.avatarUrl}
                  alt={student.fullName || 'Google Avatar'}
                  className="w-5 h-5 rounded-full object-cover border border-[var(--ok)]"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-4 h-4 rounded-full bg-[var(--ok)] text-white flex items-center justify-center text-xs font-bold">
                  {student.fullName ? student.fullName.charAt(0) : '✓'}
                </div>
              )}
              <span className="hidden sm:inline max-w-[100px] truncate">{student.fullName?.split(' ').pop() || 'Sinh viên'}</span>
              <span className="text-xs bg-[var(--ok)] text-white px-1.5 py-0.2 rounded font-mono-code font-bold">SV</span>
            </Link>
          ) : (
            <Link
              href="/xac-thuc"
              className="inline-flex items-center gap-1.5 whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold bg-[var(--surface)] border border-[var(--pri)]/60 text-[var(--tx)] hover:bg-[var(--pri)] hover:text-white hover:border-[var(--pri)] transition-all cursor-pointer shadow-sm group flex-shrink-0"
              title="Đăng nhập tài khoản sinh viên"
            >
              <User className="w-3.5 h-3.5 text-[var(--pri)] group-hover:text-white transition-colors flex-shrink-0" />
              <span>Đăng nhập</span>
            </Link>
          )}

          {/* Theme Switcher Toggle (Button is appropriate for interactive state toggle) */}
          <button
            onClick={toggleTheme}
            aria-label="Chuyển chế độ Sáng / Tối"
            className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--surface)] border border-[var(--ln)] text-[var(--tx)] hover:border-[var(--pri)] transition-all cursor-pointer flex-shrink-0"
            title={theme === 'dark' ? 'Chuyển sang chế độ Sáng' : 'Chuyển sang chế độ Tối'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[var(--warm)]" />
            ) : (
              <Moon className="w-4 h-4 text-[var(--pri)]" />
            )}
          </button>

          {/* Cart Link as real <a> */}
          <Link
            href="/thanh-toan"
            aria-label={`Giỏ hàng sinh viên, ${totalCount} sản phẩm`}
            className={`flex items-center gap-2 whitespace-nowrap px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer flex-shrink-0 ${
              isCheckout
                ? 'bg-[var(--pri)] text-white border-[var(--pri)] shadow-md shadow-[var(--pri)]/20'
                : 'bg-[var(--surface)] border-[var(--ln)] text-[var(--tx)] hover:border-[var(--pri)]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="inline whitespace-nowrap">Giỏ hàng</span>
            <span className="w-5 h-5 rounded-full bg-[var(--pri)] text-white text-xs font-mono-code flex items-center justify-center flex-shrink-0">
              {totalCount}
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
            className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center bg-[var(--surface)] border border-[var(--ln)] text-[var(--tx)] cursor-pointer flex-shrink-0"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Using real <Link> items) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[var(--surface)] border-b border-[var(--ln)] px-6 py-5 flex flex-col gap-3 shadow-2xl animate-in slide-in-from-top-3 duration-200">
          <Link
            href="/xac-thuc"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full p-3 rounded-2xl bg-[var(--card)] border border-[var(--pri)]/40 flex items-center justify-between text-left cursor-pointer hover:border-[var(--pri)] transition-all mb-1"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--pri)]/15 text-[var(--pri)] flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-[var(--tx)] block">
                  {student.isVerified ? student.fullName || 'Tài khoản Sinh Viên' : 'Đăng nhập / Xác thực thẻ SV'}
                </span>
                <span className="text-xs text-[var(--ok)] font-medium">
                  {student.isVerified ? '✓ Đã kích hoạt ưu đãi -5%' : 'Nhận mã giảm giá -5% toàn sàn'}
                </span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[var(--mu)]" />
          </Link>

          <Link
            href="/laptop"
            onClick={() => setMobileMenuOpen(false)}
            className="text-left py-2 font-medium text-[var(--tx)] border-b border-[var(--ln)] flex justify-between items-center whitespace-nowrap"
          >
            <span>Laptop Đồ Án &amp; IT</span>
            <ArrowRight className="w-4 h-4 text-[var(--mu)]" />
          </Link>
          <Link
            href="/tablet"
            onClick={() => setMobileMenuOpen(false)}
            className="text-left py-2 font-medium text-[var(--tx)] border-b border-[var(--ln)] flex justify-between items-center whitespace-nowrap"
          >
            <span>Tablet &amp; Bút Cảm Ứng</span>
            <ArrowRight className="w-4 h-4 text-[var(--mu)]" />
          </Link>
          <Link
            href="/audio"
            onClick={() => setMobileMenuOpen(false)}
            className="text-left py-2 font-medium text-[var(--tx)] border-b border-[var(--ln)] flex justify-between items-center whitespace-nowrap"
          >
            <span>Tai Nghe &amp; Loa</span>
            <ArrowRight className="w-4 h-4 text-[var(--mu)]" />
          </Link>
          <Link
            href="/accessory"
            onClick={() => setMobileMenuOpen(false)}
            className="text-left py-2 font-medium text-[var(--tx)] border-b border-[var(--ln)] flex justify-between items-center whitespace-nowrap"
          >
            <span>Phụ Kiện Sinh Viên</span>
            <ArrowRight className="w-4 h-4 text-[var(--mu)]" />
          </Link>
        </div>
      )}
    </header>
  );
};
