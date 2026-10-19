import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useStudent } from '../context/StudentContext';
import { Sun, Moon, ShoppingBag, ShieldCheck, Menu, X, ArrowRight } from 'lucide-react';

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
        {/* Brand Logo */}
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
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[var(--pri)] via-[var(--warm)] to-[var(--pri)] flex-shrink-0 shadow-md group-hover:scale-105 transition-transform" />
          <span className="text-xl font-extrabold tracking-tight text-[var(--tx)]">
            UniGear
          </span>
          <span className="hidden sm:inline-block text-[11px] font-semibold text-[var(--mu)] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--surface)] border border-[var(--ln)]">
            FOR STUDENTS
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-[14px] font-medium text-[var(--mu)]">
          <button
            onClick={() => handleNavClick('storefront', 'laptop')}
            className="hover:text-[var(--tx)] transition-colors cursor-pointer"
          >
            Laptop
          </button>
          <button
            onClick={() => handleNavClick('storefront', 'tablet')}
            className="hover:text-[var(--tx)] transition-colors cursor-pointer"
          >
            Tablet
          </button>
          <button
            onClick={() => handleNavClick('storefront', 'audio')}
            className="hover:text-[var(--tx)] transition-colors cursor-pointer"
          >
            Tai nghe &amp; Loa
          </button>
          <button
            onClick={() => handleNavClick('storefront', 'accessory')}
            className="hover:text-[var(--tx)] transition-colors cursor-pointer"
          >
            Phụ kiện sinh viên
          </button>
          <button
            onClick={() => handleNavClick('storefront')}
            className="hover:text-[var(--tx)] transition-colors cursor-pointer"
          >
            Thu cũ đổi mới
          </button>
          <button
            onClick={() => handleNavClick('auth')}
            className="hover:text-[var(--warm)] text-[var(--warm)] font-semibold transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Ưu đãi thẻ SV (-5%)</span>
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Student Status Badge */}
          {student.isVerified ? (
            <button
              onClick={() => handleNavClick('auth')}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--ok)]/15 border border-[var(--ok)]/30 text-[var(--ok)] hover:bg-[var(--ok)]/25 transition-colors cursor-pointer"
              title="Đã kích hoạt ưu đãi Thẻ Sinh Viên -5%"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Đã xác thực SV</span>
            </button>
          ) : (
            <button
              onClick={() => handleNavClick('auth')}
              className="hidden lg:flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--surface)] border border-[var(--ln)] text-[var(--mu)] hover:text-[var(--tx)] transition-colors cursor-pointer"
            >
              <span>Xác thực SV (-5%)</span>
            </button>
          )}

          {/* Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Chuyển chế độ Sáng / Tối"
            className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--surface)] border border-[var(--ln)] text-[var(--tx)] hover:bg-[var(--card)] transition-colors cursor-pointer"
            title={theme === 'dark' ? 'Chuyển sang chế độ Sáng' : 'Chuyển sang chế độ Tối'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[var(--warm)]" />
            ) : (
              <Moon className="w-4 h-4 text-[var(--pri)]" />
            )}
          </button>

          {/* Cart Button */}
          <button
            type="button"
            onClick={() => handleNavClick('checkout')}
            aria-label={`Giỏ hàng sinh viên, ${totalCount} sản phẩm`}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all cursor-pointer ${
              currentPage === 'checkout'
                ? 'bg-[var(--pri)] text-white border-[var(--pri)]'
                : 'bg-[var(--surface)] border-[var(--ln)] text-[var(--tx)] hover:border-[var(--pri)]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Giỏ hàng</span>
            <span className="w-5 h-5 rounded-full bg-[var(--pri)] text-white text-[11px] font-mono-code flex items-center justify-center">
              {totalCount}
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Đóng menu điều hướng' : 'Mở menu điều hướng'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center bg-[var(--surface)] border border-[var(--ln)] text-[var(--tx)] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--surface)] border-b border-[var(--ln)] px-6 py-5 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <button
            onClick={() => handleNavClick('storefront', 'laptop')}
            className="text-left py-2 font-medium text-[var(--tx)] border-b border-[var(--ln)] flex justify-between items-center"
          >
            <span>Laptop đồ án &amp; IT</span>
            <ArrowRight className="w-4 h-4 text-[var(--mu)]" />
          </button>
          <button
            onClick={() => handleNavClick('storefront', 'tablet')}
            className="text-left py-2 font-medium text-[var(--tx)] border-b border-[var(--ln)] flex justify-between items-center"
          >
            <span>Tablet &amp; Bút cảm ứng</span>
            <ArrowRight className="w-4 h-4 text-[var(--mu)]" />
          </button>
          <button
            onClick={() => handleNavClick('storefront', 'audio')}
            className="text-left py-2 font-medium text-[var(--tx)] border-b border-[var(--ln)] flex justify-between items-center"
          >
            <span>Tai nghe &amp; Loa</span>
            <ArrowRight className="w-4 h-4 text-[var(--mu)]" />
          </button>
          <button
            onClick={() => handleNavClick('storefront', 'accessory')}
            className="text-left py-2 font-medium text-[var(--tx)] border-b border-[var(--ln)] flex justify-between items-center"
          >
            <span>Phụ kiện sinh viên</span>
            <ArrowRight className="w-4 h-4 text-[var(--mu)]" />
          </button>
          <button
            onClick={() => handleNavClick('auth')}
            className="text-left py-2 font-medium text-[var(--warm)] flex justify-between items-center"
          >
            <span>Đăng ký &amp; Xác thực Thẻ Sinh Viên (-5%)</span>
            <ShieldCheck className="w-4 h-4 text-[var(--warm)]" />
          </button>
        </div>
      )}
    </header>
  );
};
