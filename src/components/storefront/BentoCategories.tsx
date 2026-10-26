import React from 'react';
import Link from 'next/link';

interface BentoCategoriesProps {
  onSelectCategory?: (category: string) => void;
}

export const BentoCategories: React.FC<BentoCategoriesProps> = ({ onSelectCategory }) => {
  const handleCategoryClick = (category: string, e: React.MouseEvent) => {
    if (onSelectCategory) {
      e.preventDefault();
      onSelectCategory(category);
    }
  };

  return (
    <section className="max-w-[1240px] w-full px-4 sm:px-8 py-16">
      <div className="mb-10 text-left">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--tx)] tracking-tight">
          Chọn đúng thứ bạn cần.
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[var(--mu)]">
          Bốn nhóm thiết bị sinh viên dùng nhiều nhất, tối ưu hiệu năng và ngân sách.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Laptop Tile - Large 2 Cols */}
        <Link
          href="/laptop"
          onClick={(e) => handleCategoryClick('laptop', e)}
          className="md:col-span-2 bg-[var(--card)] border border-[var(--ln)] rounded-3xl p-8 flex flex-col justify-between hover:border-[var(--pri)]/60 transition-all cursor-pointer group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-[var(--pri)]"
          aria-label="Xem danh mục Laptop Đồ Án & IT"
        >
          <div>
            <h3 className="text-2xl font-bold text-[var(--tx)] group-hover:text-[var(--pri-h)] transition-colors">
              Laptop Đồ Án &amp; IT
            </h3>
            <p className="text-sm text-[var(--mu)] mt-1 font-mono-code">
              MacBook, Dell XPS, ThinkPad, ASUS ROG, Acer... Từ 11.490.000đ
            </p>
          </div>
          <div className="w-full h-72 sm:h-80 flex items-center justify-center mt-4 p-4">
            <img
              src="/products/macbook-air-m2-main.png"
              alt="Laptop sinh viên đồ án & IT"
              width={380}
              height={260}
              loading="lazy"
              className="max-h-[260px] sm:max-h-[290px] w-auto max-w-[90%] object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>

        {/* Right Column: Tablet & Audio */}
        <div className="flex flex-col gap-6">
          {/* Tablet */}
          <Link
            href="/tablet"
            onClick={(e) => handleCategoryClick('tablet', e)}
            className="bg-[var(--card)] border border-[var(--ln)] rounded-3xl p-6 flex flex-col justify-between hover:border-[var(--pri)]/60 transition-all cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[var(--pri)]"
            aria-label="Xem danh mục Tablet & Bút Cảm Ứng"
          >
            <div>
              <h3 className="text-xl font-bold text-[var(--tx)] group-hover:text-[var(--pri-h)] transition-colors">
                Tablet &amp; Bút Cảm Ứng
              </h3>
              <p className="text-xs text-[var(--mu)] mt-0.5 font-mono-code">
                iPad Air, Galaxy Tab, Xiaomi Pad... Từ 4.190.000đ
              </p>
            </div>
            <div className="w-full h-36 sm:h-40 flex items-center justify-center mt-3 p-2">
              <img
                src="/products/tab-s9-main.png"
                alt="Tablet sinh viên ghi chú & vẽ"
                width={240}
                height={150}
                loading="lazy"
                className="max-h-[140px] sm:max-h-[155px] w-auto object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>

          {/* Tai nghe */}
          <Link
            href="/audio"
            onClick={(e) => handleCategoryClick('audio', e)}
            className="bg-[var(--card)] border border-[var(--ln)] rounded-3xl p-6 flex flex-col justify-between hover:border-[var(--pri)]/60 transition-all cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[var(--pri)]"
            aria-label="Xem danh mục Tai nghe & Loa"
          >
            <div>
              <h3 className="text-xl font-bold text-[var(--tx)] group-hover:text-[var(--pri-h)] transition-colors">
                Tai nghe &amp; Loa
              </h3>
              <p className="text-xs text-[var(--mu)] mt-0.5 font-mono-code">
                Sony ANC, AirPods, Marshall, JBL, Bose... Từ 890.000đ
              </p>
            </div>
            <div className="w-full h-36 sm:h-40 flex items-center justify-center mt-3 p-2">
              <img
                src="/products/sony-xm5-main.png"
                alt="Tai nghe chống ồn sinh viên"
                width={200}
                height={150}
                loading="lazy"
                className="max-h-[140px] sm:max-h-[155px] w-auto object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
        </div>

        {/* Phụ kiện Tile - Full 3 Cols */}
        <Link
          href="/accessory"
          onClick={(e) => handleCategoryClick('accessory', e)}
          className="md:col-span-3 bg-[var(--card)] border border-[var(--ln)] rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[var(--pri)]/60 transition-all cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[var(--pri)]"
          aria-label="Xem danh mục Phụ kiện công nghệ sinh viên"
        >
          <div>
            <h3 className="text-2xl font-bold text-[var(--tx)] group-hover:text-[var(--pri-h)] transition-colors">
              Phụ kiện công nghệ sinh viên
            </h3>
            <p className="text-sm text-[var(--mu)] mt-1 font-mono-code">
              Bàn phím cơ Aula F75, Chuột Logitech Master 3S, Sạc Anker GaN, Hub đa năng... Từ 320.000đ
            </p>
          </div>
          <div className="flex items-center justify-center gap-6 p-2">
            <img
              src="/products/aula-f75-main.png"
              alt="Bàn phím cơ Aula F75"
              width={260}
              height={150}
              loading="lazy"
              className="max-h-[130px] sm:max-h-[155px] w-auto object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
            />
            <img
              src="/products/mx-master-3s-main.png"
              alt="Chuột Logitech MX Master 3S"
              width={200}
              height={145}
              loading="lazy"
              className="max-h-[120px] sm:max-h-[145px] w-auto object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300 hidden sm:block"
            />
          </div>
        </Link>
      </div>
    </section>
  );
};
