import React from 'react';
import Link from 'next/link';
import { UniGearLogo } from './UniGearLogo';
import { Phone, Mail, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: 'storefront' | 'pdp' | 'auth' | 'checkout') => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="w-full border-t border-[var(--ln)] bg-[var(--surface)]/80 mt-20 pt-14 pb-12 transition-colors">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header: Logo + Hotline */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-10 border-b border-[var(--ln)]">
          <div className="flex items-center gap-3">
            <UniGearLogo size="md" showBadge={true} />
            <span className="text-xs text-[var(--mu)] hidden md:inline">
              | Hệ sinh thái công nghệ trợ giá &amp; bảo hành tận phòng KTX sinh viên Việt Nam.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--mu)]">
            <div className="flex items-center gap-2 bg-[var(--card)] border border-[var(--ln)] px-4 py-2 rounded-full shadow-sm">
              <Phone className="w-4 h-4 text-[var(--warm)]" />
              <span>Tổng đài miễn cước:</span>
              <a href="tel:18006868" className="font-mono-code font-bold text-[var(--warm)] text-sm hover:underline">
                1800 6868
              </a>
              <span className="text-xs opacity-75">(8:00 – 21:30)</span>
            </div>

            <a
              href="mailto:hotro@unigear.vn"
              className="flex items-center gap-1.5 hover:text-[var(--tx)] transition-colors px-3 py-2 rounded-full border border-[var(--ln)] bg-[var(--card)]"
            >
              <Mail className="w-3.5 h-3.5 text-[var(--pri)]" />
              <span>hotro@unigear.vn</span>
            </a>
          </div>
        </div>

        {/* Middle Grid: Company Info, Policies, Contact, Ministry of Industry Badge */}
        <div className="py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 border-b border-[var(--ln)] text-xs text-[var(--mu)]">
          
          {/* Col 1: Legal Entity Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="font-bold text-sm text-[var(--tx)] uppercase tracking-wider">
              CÔNG TY CỔ PHẦN CÔNG NGHỆ SINH VIÊN UNIGEAR
            </h4>
            <p className="leading-relaxed">
              Mã số thuế / GPĐKKD: <strong className="text-[var(--tx)] font-mono-code">0110293847</strong> cấp bởi Sở KH&amp;ĐT TP. Hà Nội. Đại diện pháp luật: Nguyễn Nam Phong.
            </p>
            <div className="space-y-2.5 pt-1 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[var(--pri)] flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Campus Hub Nam:</strong> Tòa nhà Innovation, KTX Khu B ĐHQG TP.HCM, Đường Tạ Quang Bửu, Phường Đông Hòa, TP. Dĩ An, Bình Dương.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[var(--warm)] flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Campus Hub Bắc:</strong> Nhà H6, Trường Đại học Bách Khoa Hà Nội, Số 1 Đại Cồ Việt, Phường Bách Khoa, Quận Hai Bà Trưng, Hà Nội.
                </span>
              </div>
            </div>
          </div>

          {/* Col 2: Danh Mục Sản Phẩm (2 Cols) */}
          <div className="lg:col-span-2 space-y-2.5">
            <h4 className="font-bold text-sm text-[var(--tx)] uppercase tracking-wider">
              Danh Mục
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/laptop" className="hover:text-[var(--tx)] transition-colors">
                  Laptop sinh viên
                </Link>
              </li>
              <li>
                <Link href="/tablet" className="hover:text-[var(--tx)] transition-colors">
                  Tablet &amp; Bút vẽ
                </Link>
              </li>
              <li>
                <Link href="/audio" className="hover:text-[var(--tx)] transition-colors">
                  Tai nghe &amp; Loa
                </Link>
              </li>
              <li>
                <Link href="/accessory" className="hover:text-[var(--tx)] transition-colors">
                  Phụ kiện công nghệ
                </Link>
              </li>
              <li>
                <Link href="/#tradein-section" className="hover:text-[var(--tx)] transition-colors">
                  Thu cũ đổi mới
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Chính sách Sinh Viên (3 Cols) */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="font-bold text-sm text-[var(--tx)] uppercase tracking-wider">
              Chính Sách &amp; Hỗ Trợ
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/xac-thuc" className="hover:text-[var(--tx)] transition-colors flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--ok)]" />
                  <span>Xác thực thẻ sinh viên (-5%)</span>
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach/bao-hanh-doi-tra" className="hover:text-[var(--tx)] transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--pri)]" />
                  <span>1 đổi 1 trong 30 ngày · Bảo hành 12T</span>
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach/tra-gop" className="hover:text-[var(--tx)] transition-colors">
                  Điều khoản Trả góp 0% sinh viên
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach/giao-nhan" className="hover:text-[var(--tx)] transition-colors">
                  Chính sách giao nhận tận phòng KTX
                </Link>
              </li>
              <li>
                <Link href="/chinh-sach/bao-mat" className="hover:text-[var(--tx)] transition-colors">
                  Bảo vệ dữ liệu &amp; quyền riêng tư
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Badge Bộ Công Thương (2 Cols) */}
          <div className="lg:col-span-2 flex flex-col items-start lg:items-end justify-between gap-3">
            <div>
              <span className="text-xs block font-semibold text-[var(--mu)] mb-2">Chứng nhận sàn TMĐT:</span>
              
              {/* Badge Đã Thông Báo Bộ Công Thương with link */}
              <a
                href="http://online.gov.vn/Home/WebDetails/0110293847"
                target="_blank"
                rel="noopener noreferrer"
                title="Website Thương mại điện tử sinh viên UniGear đã thông báo với Bộ Công Thương theo Nghị định 52/2013/NĐ-CP"
                className="inline-block hover:opacity-95 transition-opacity"
              >
                <img
                  src="/bo-cong-thuong.svg"
                  alt="Đã thông báo Bộ Công Thương - UniGear.vn"
                  width={160}
                  height={60}
                  className="w-40 h-auto drop-shadow-md"
                />
              </a>
            </div>

            <div className="text-xs text-[var(--mu)] lg:text-right pt-2">
              <span className="block font-semibold text-[var(--tx)]">Đối tác thanh toán:</span>
              <span>VietQR · MB Bank · MoMo</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--mu)]">
          <p>© 2026 UniGear Store. Bản quyền thuộc về Công ty Cổ phần Công nghệ Sinh viên UniGear.</p>
          <div className="flex items-center gap-4">
            <Link href="/chinh-sach/dieu-khoan" className="hover:text-[var(--tx)] transition-colors">
              Điều khoản sử dụng
            </Link>
            <span>·</span>
            <Link href="/chinh-sach/bao-mat" className="hover:text-[var(--tx)] transition-colors">
              Chính sách bảo mật
            </Link>
            <span>·</span>
            <Link href="/chinh-sach/quy-che" className="hover:text-[var(--tx)] transition-colors">
              Quy chế hoạt động sàn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
