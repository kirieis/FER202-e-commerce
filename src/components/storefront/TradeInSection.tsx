import React from 'react';
import { ShieldCheck, RotateCcw, CreditCard } from 'lucide-react';

export const TradeInSection: React.FC = () => {
  return (
    <section id="tradein-section" className="max-w-[1240px] w-full px-4 sm:px-8 py-16">
      <div className="bg-[var(--card)] border border-[var(--ln)] rounded-3xl p-8 sm:p-12 shadow-xl">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--tx)] tracking-tight">
            Cách thức Mua hàng &amp; Thu cũ đổi mới tại UniGear
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[var(--mu)] leading-relaxed">
            Sinh viên an tâm sở hữu đồ công nghệ chính hãng. Dễ dàng bán lại thiết bị cũ không còn nhu cầu để lên đời máy mới với chi phí tiết kiệm nhất.
          </p>

          {/* 3 Value propositions */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs font-semibold text-[var(--tx)]">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--ln)]">
              <ShieldCheck className="w-4 h-4 text-[var(--ok)]" />
              <span>Bảo hành 12 tháng 1 đổi 1</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--ln)]">
              <RotateCcw className="w-4 h-4 text-[var(--pri)]" />
              <span>30 ngày đổi trả miễn phí</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--ln)]">
              <CreditCard className="w-4 h-4 text-[var(--warm)]" />
              <span>Trả góp 0% thẻ sinh viên</span>
            </div>
          </div>
        </div>

        {/* 2 Workflows Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[var(--ln)]">
          {/* Workflow 1: Mua máy mới */}
          <div className="bg-[var(--surface)]/70 border border-[var(--ln)] rounded-2xl p-6 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono-code font-bold bg-[var(--pri)] text-white">
                QUY TRÌNH MUA
              </span>
              <h3 className="font-bold text-[var(--tx)] text-base">
                1. Mua máy mới &amp; Trả góp 0%
              </h3>
            </div>
            <ul className="space-y-4 text-xs sm:text-sm text-[var(--mu)]">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[var(--card)] border border-[var(--ln)] text-[var(--tx)] font-mono-code text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <strong className="text-[var(--tx)] block">Chọn máy &amp; Áp mã sinh viên</strong>
                  <span>Giảm ngay 5% trực tiếp vào hóa đơn khi nhập mã hoặc hình ảnh thẻ SV.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[var(--card)] border border-[var(--ln)] text-[var(--tx)] font-mono-code text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <strong className="text-[var(--tx)] block">Trả góp 0% qua CCCD + Thẻ SV</strong>
                  <span>Không cần chứng minh thu nhập hay thẻ tín dụng ngân hàng, xét duyệt tự động trong 5 phút.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[var(--card)] border border-[var(--ln)] text-[var(--tx)] font-mono-code text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <strong className="text-[var(--tx)] block">Nhận máy tại KTX Campus</strong>
                  <span>Kỹ thuật viên giao tận phòng KTX/trọ, hỗ trợ cài win/bộ đồ án IT hoàn toàn miễn phí.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Workflow 2: Thu cũ đổi mới */}
          <div className="bg-[var(--surface)]/70 border border-[var(--ln)] rounded-2xl p-6 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono-code font-bold bg-[var(--warm)] text-[#1A0F08]">
                THU CŨ ĐỔI MỚI
              </span>
              <h3 className="font-bold text-[var(--tx)] text-base">
                2. Bán lại máy cũ &amp; Lên đời
              </h3>
            </div>
            <ul className="space-y-4 text-xs sm:text-sm text-[var(--mu)]">
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[var(--card)] border border-[var(--ln)] text-[var(--tx)] font-mono-code text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <strong className="text-[var(--tx)] block">Định giá máy cũ online</strong>
                  <span>Chọn tình trạng máy (Laptop, iPad, tai nghe), nhận báo giá thu mua trong 30 giây.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[var(--card)] border border-[var(--ln)] text-[var(--tx)] font-mono-code text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <strong className="text-[var(--tx)] block">Kỹ thuật viên test tận nơi hoặc gửi bưu điện</strong>
                  <span>Hỗ trợ đến KTX lấy máy hoặc gửi bưu tá đến lấy miễn phí. Đảm bảo đúng giá đã cam kết.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[var(--card)] border border-[var(--ln)] text-[var(--tx)] font-mono-code text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <strong className="text-[var(--tx)] block">Nhận tiền hoặc cấn trừ mua máy mới</strong>
                  <span>Trừ thẳng vào giá máy mới hoặc chuyển khoản ngân hàng ngay trong 5 phút kèm voucher trợ giá 500k.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer / Terms Link */}
        <div className="mt-8 pt-4 border-t border-[var(--ln)] text-center">
          <p className="text-xs text-[var(--mu)] leading-relaxed max-w-3xl mx-auto">
            *Thời gian xét duyệt trả góp 5 phút do đối tác tài chính sinh viên thực hiện trong giờ làm việc. Báo giá thu cũ online 30 giây mang tính tham khảo và được chốt chuẩn xác sau khi kỹ thuật viên kiểm tra ngoại quan &amp; linh kiện thực tế. Xem thêm{' '}
            <a href="/chinh-sach/tra-gop" className="text-[var(--tx)] underline hover:text-[var(--pri)] cursor-pointer">
              Điều khoản thu cũ &amp; Quy định trả góp
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
};
