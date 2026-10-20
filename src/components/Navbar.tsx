import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useStudent } from '../context/StudentContext';
import { Sun, Moon, ShoppingBag, ShieldCheck, Menu, X, ArrowRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: 'storefront' | 'pdp' | 'auth' | 'checkout', category?: string) => void;
  currentPage: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const { theme, toggleTheme } = useTheme();
  const { totalCount } = useCart();
  const { student } = useStudent();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: 'storefront' | 'pdp' | 'auth' | 'checkout', category?: string) => {
    onNavigate(page, category);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 h-16 w-full backdrop-blur-xl border-b border-[var(--ln)] bg-[var(--bg)]/80 transition-colors duration-200">
      <div className="max-w-[1240px] h-full mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo - UniGear */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => handleNavClick('storefront')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleNavClick('storefront');
            }
          }}
          aria-label="Về trang chủ UniGear"
          className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[var(--pri)] via-[var(--warm)] to-[var(--pri)] flex-shrink-0 shadow-md group-hover:scale-110 group-hover:rotate-45 transition-all duration-300" />
          <span className="text-xl font-extrabold tracking-tight text-[var(--tx)] group-hover:text-[var(--pri-h)] transition-colors duration-200 whitespace-nowrap">
            UniGear
          </span>
        </div>

        {/* Desktop Nav Links - Single Line & Hover Animation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-[14px] font-medium text-[var(--mu)]">
          <button
            type="button"
            onClick={() => handleNavClick('storefront', 'laptop')}
            className="relative px-3.5 py-1.5 rounded-full text-[14px] font-medium text-[var(--mu)] hover:text-[var(--tx)] hover:bg-[var(--surface)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 group"
          >
            <span>Laptop</span>
            <span className="absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-[var(--pri)] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('storefront', 'tablet')}
            className="relative px-3.5 py-1.5 rounded-full text-[14px] font-medium text-[var(--mu)] hover:text-[var(--tx)] hover:bg-[var(--surface)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 group"
          >
            <span>Tablet</span>
            <span className="absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-[var(--pri)] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('storefront', 'audio')}
            className="relative px-3.5 py-1.5 rounded-full text-[14px] font-medium text-[var(--mu)] hover:text-[var(--tx)] hover:bg-[var(--surface)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 group"
          >
            <span>Tai nghe &amp; Loa</span>
            <span className="absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-[var(--pri)] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('storefront', 'accessory')}
            className="relative px-3.5 py-1.5 rounded-full text-[14px] font-medium text-[var(--mu)] hover:text-[var(--tx)] hover:bg-[var(--surface)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 group"
          >
            <span>Phụ kiện sinh viên</span>
            <span className="absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-[var(--pri)] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Glowing Student Verification Button */}
          {student.isVerified ? (
            <button
              type="button"
              onClick={() => handleNavClick('auth')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap text-[var(--ok)] bg-[var(--ok)]/15 border border-[var(--ok)]/40 shadow-[0_0_14px_rgba(61,213,152,0.35)] hover:shadow-[0_0_22px_rgba(61,213,152,0.6)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shrink-0"
              title="Đã kích hoạt ưu đãi Thẻ Sinh Viên -5%"
            >
              <ShieldCheck className="w-4 h-4 text-[var(--ok)]" />
              <span>Đã xác thực SV</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleNavClick('auth')}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap text-white bg-gradient-to-r from-[var(--pri)] via-[var(--pri-h)] to-[var(--warm)] shadow-[0_0_16px_rgba(111,92,255,0.5)] hover:shadow-[0_0_24px_rgba(255,138,76,0.65)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shrink-0"
              title="Xác thực thẻ sinh viên để nhận giảm thêm 5%"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-200 animate-pulse" />
              <span>Xác thực SV (-5%)</span>
            </button>
          )}

          {/* Theme Switcher Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Chuyển chế độ Sáng / Tối"
            className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--surface)] border border-[var(--ln)] text-[var(--tx)] hover:bg-[var(--card)] hover:border-[var(--pri)]/40 hover:scale-110 hover:rotate-12 active:scale-95 transition-all duration-200 cursor-pointer shrink-0"
            title={theme === 'dark' ? 'Chuyển sang chế độ Sáng' : 'Chuyển sang chế độ Tối'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[var(--warm)]" />
            ) : (
              <Moon className="w-4 h-4 text-[var(--pri)]" />
            )}
          </button>

          {/* Cart Button - Single Line Horizontal */}
          <button
            type="button"
            onClick={() => handleNavClick('checkout')}
            aria-label={`Giỏ hàng sinh viên, ${totalCount} sản phẩm`}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold whitespace-nowrap shrink-0 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer ${
              currentPage === 'checkout'
                ? 'bg-[var(--pri)] text-white border-[var(--pri)] shadow-[0_0_12px_rgba(111,92,255,0.35)]'
                : 'bg-[var(--surface)] border-[var(--ln)] text-[var(--tx)] hover:border-[var(--pri)] hover:shadow-[0_0_12px_rgba(111,92,255,0.2)]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap">Giỏ hàng</span>
            <span className="w-5 h-5 rounded-full bg-[var(--pri)] text-white text-[11px] font-mono-code flex items-center justify-center shrink-0">
              {totalCount}
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Đóng menu điều hướng' : 'Mở menu điều hướng'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center bg-[var(--surface)] border border-[var(--ln)] text-[var(--tx)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shrink-0"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--surface)] border-b border-[var(--ln)] px-6 py-5 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <button
            type="button"
            onClick={() => handleNavClick('storefront', 'laptop')}
            className="text-left py-2 font-medium text-[var(--tx)] border-b border-[var(--ln)] flex justify-between items-center whitespace-nowrap"
          >
            <span>Laptop đồ án &amp; IT</span>
            <ArrowRight className="w-4 h-4 text-[var(--mu)]" />
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('storefront', 'tablet')}
            className="text-left py-2 font-medium text-[var(--tx)] border-b border-[var(--ln)] flex justify-between items-center whitespace-nowrap"
          >
            <span>Tablet &amp; Bút cảm ứng</span>
            <ArrowRight className="w-4 h-4 text-[var(--mu)]" />
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('storefront', 'audio')}
            className="text-left py-2 font-medium text-[var(--tx)] border-b border-[var(--ln)] flex justify-between items-center whitespace-nowrap"
          >
            <span>Tai nghe &amp; Loa</span>
            <ArrowRight className="w-4 h-4 text-[var(--mu)]" />
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('storefront', 'accessory')}
            className="text-left py-2 font-medium text-[var(--tx)] border-b border-[var(--ln)] flex justify-between items-center whitespace-nowrap"
          >
            <span>Phụ kiện sinh viên</span>
            <ArrowRight className="w-4 h-4 text-[var(--mu)]" />
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('auth')}
            className="text-left py-2.5 px-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[var(--pri)] to-[var(--warm)] flex justify-between items-center shadow-[0_0_14px_rgba(111,92,255,0.4)] whitespace-nowrap"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-200 animate-pulse" />
              <span>Xác thực Thẻ Sinh Viên (-5%)</span>
            </div>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      )}
    </header>
  );
};
