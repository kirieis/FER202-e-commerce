import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface StudentPerksBannerProps {
  onNavigateAuth: () => void;
}

export const StudentPerksBanner: React.FC<StudentPerksBannerProps> = ({ onNavigateAuth }) => {
  return (
    <section className="max-w-[1240px] w-full px-4 sm:px-8 py-16">
      <div className="text-left mb-10">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--tx)] tracking-tight">
          Giảm 5% cho sinh viên.
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[var(--mu)]">
          Xác thực một lần, dùng cho mọi đơn hàng trong năm học tại UniGear.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[var(--card)] border border-[var(--ln)] rounded-3xl p-7 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono-code font-bold text-[var(--warm)] uppercase tracking-wider block mb-2">
              BƯỚC 1
            </span>
            <h3 className="text-lg font-bold text-[var(--tx)] mb-2">Chụp thẻ sinh viên</h3>
            <p className="text-xs sm:text-sm text-[var(--mu)] leading-relaxed">
              Ảnh rõ mặt trước, thấy tên trường và mã số sinh viên còn hạn sử dụng hoặc ứng dụng sinh viên điện tử.
            </p>
          </div>
        </div>

        <div className="bg-[var(--card)] border border-[var(--ln)] rounded-3xl p-7 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono-code font-bold text-[var(--pri)] uppercase tracking-wider block mb-2">
              BƯỚC 2
            </span>
            <h3 className="text-lg font-bold text-[var(--tx)] mb-2">Chờ duyệt khoảng 1 phút</h3>
            <p className="text-xs sm:text-sm text-[var(--mu)] leading-relaxed">
              Hệ thống AI đối chiếu tự động với danh sách hơn 80 trường đại học, cao đẳng đối tác trên toàn quốc.
            </p>
          </div>
        </div>

        <div className="bg-[var(--card)] border border-[var(--ln)] rounded-3xl p-7 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono-code font-bold text-[var(--ok)] uppercase tracking-wider block mb-2">
              BƯỚC 3
            </span>
            <h3 className="text-lg font-bold text-[var(--tx)] mb-2">Giảm giá tự động</h3>
            <p className="text-xs sm:text-sm text-[var(--mu)] leading-relaxed">
              Giá ưu đãi sinh viên hiển thị ngay lập tức và tự động áp dụng trực tiếp tại giỏ hàng và hóa đơn.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={onNavigateAuth}
          className="flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold bg-[var(--pri)] text-white hover:bg-[var(--pri-h)] transition-all shadow-lg hover:shadow-xl cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Kích hoạt Thẻ Sinh Viên ngay (-5%)</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
        <p className="text-xs text-[var(--mu)] text-center max-w-xl">
          *Thời gian duyệt tự động áp dụng cho ảnh thẻ sinh viên hoặc app VNeID/SV điện tử rõ nét. Xem chi tiết{' '}
          <a href="/chinh-sach/bao-mat" className="text-[var(--tx)] underline hover:text-[var(--pri)] cursor-pointer">
            Điều khoản &amp; Chính sách xác thực sinh viên
          </a>.
        </p>
      </div>
    </section>
  );
};
