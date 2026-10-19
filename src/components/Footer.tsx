import React from 'react';

interface FooterProps {
  onNavigate: (page: 'storefront' | 'pdp' | 'auth' | 'checkout') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full border-t border-[var(--ln)] bg-[var(--surface)]/50 mt-20 pt-12 pb-10 transition-colors">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[var(--ln)]">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[var(--pri)] via-[var(--warm)] to-[var(--pri)]" />
            <span className="font-extrabold text-[var(--tx)] text-lg tracking-tight">UniGear Ecosystem</span>
            <span className="text-xs text-[var(--mu)] hidden sm:inline">— Công nghệ thông minh đồng hành sinh viên.</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--mu)]">
            <span>Hotline hỗ trợ sinh viên KTX:</span>
            <span className="font-mono-code font-bold text-[var(--warm)] text-sm">1800 6868</span>
            <span className="text-[11px]">(Miễn phí 8:00 – 22:00)</span>
          </div>
        </div>

        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[var(--mu)]">
          <div className="flex flex-wrap items-center gap-6 font-medium">
            <button onClick={() => onNavigate('storefront')} className="hover:text-[var(--tx)] transition-colors cursor-pointer">
              Danh mục
            </button>
            <button onClick={() => onNavigate('pdp')} className="hover:text-[var(--tx)] transition-colors cursor-pointer">
              Sản phẩm
            </button>
            <button onClick={() => onNavigate('storefront')} className="hover:text-[var(--tx)] transition-colors cursor-pointer">
              Thu cũ đổi mới
            </button>
            <button onClick={() => onNavigate('auth')} className="hover:text-[var(--tx)] transition-colors cursor-pointer">
              Chính sách sinh viên
            </button>
            <button onClick={() => onNavigate('checkout')} className="hover:text-[var(--tx)] transition-colors cursor-pointer">
              Bảo hành 1 đổi 1
            </button>
          </div>

          <div className="font-mono-code text-[11px] text-[var(--mu)] opacity-80 text-center md:text-right">
            © 2026 UniGear Store. Powered by Be Vietnam Pro &amp; JetBrains Mono.
          </div>
        </div>
      </div>
    </footer>
  );
};
