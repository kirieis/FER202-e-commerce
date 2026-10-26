import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-[600px] mx-auto px-4 py-32 text-center flex flex-col items-center">
      <div className="w-20 h-20 rounded-full bg-[var(--surface)] border border-[var(--ln)] flex items-center justify-center text-4xl mb-6">
        🔍
      </div>
      <h2 className="text-3xl font-extrabold text-[var(--tx)]">404 - Không tìm thấy trang</h2>
      <p className="text-sm text-[var(--mu)] mt-3 leading-relaxed">
        Trang hoặc sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã được chuyển sang danh mục khác.
      </p>
      <Link
        href="/"
        className="mt-8 px-8 py-3.5 rounded-full font-bold text-sm bg-[var(--tx)] text-[var(--bg)] hover:bg-[var(--pri)] hover:text-white transition-all shadow-md"
      >
        Về trang chủ UniGear
      </Link>
    </div>
  );
}
