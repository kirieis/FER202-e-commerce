import Link from "next/link";
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface-container border-t border-outline-variant/30 mt-12 py-10 text-xs text-on-surface-variant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <span className="font-display font-extrabold text-lg text-primary">Elite Technology</span>
          </div>
          <p className="text-xs leading-relaxed">
            Nền tảng thương mại điện tử công nghệ được thiết kế cho môn học FER202. Trải nghiệm tối ưu cho cả mobile & desktop web.
          </p>
        </div>

        <div>
          <h5 className="font-bold text-on-surface text-sm mb-3">Về Chúng Tôi</h5>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-primary transition-colors">Giới thiệu Elite Tech</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Chính sách sinh viên</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Điểm nhận hàng Campus</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Tuyển dụng CTV</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-on-surface text-sm mb-3">Hỗ Trợ Khách Hàng</h5>
          <ul className="space-y-2">
            <li><Link href="/portal" className="hover:text-primary transition-colors">Tra cứu đơn hàng</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Chính sách bảo hành</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Hướng dẫn thanh toán VNPAY</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Liên hệ Hotline 1900 8888</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-on-surface text-sm mb-3">Nhận Bản Tin Campus</h5>
          <p className="mb-3">Nhận bản tin mã giảm giá 50k cho đơn đầu tiên:</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email của bạn..."
              className="bg-surface-container-lowest border border-outline-variant/40 rounded-lg px-3 py-1.5 text-xs text-on-surface focus:outline-none focus:border-primary flex-1"
            />
            <button className="bg-primary text-white font-bold px-3 py-1.5 rounded-lg hover:bg-primary-container transition-colors">
              Gửi
            </button>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-outline-variant/20 mt-8 pt-4 text-center">
        © 2026 Elite Technology / FER202 E-Commerce Group Project. All rights reserved.
      </div>
    </footer>
  );
}
