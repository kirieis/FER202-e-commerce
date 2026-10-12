"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, ArrowLeft, ArrowRight, Eye, EyeOff, GraduationCap, Bike, CreditCard } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/portal");
  };

  return (
    <div className="min-h-full flex flex-col justify-center bg-surface antialiased">
      {/* Top Navigation */}
      <div className="fixed top-0 inset-x-0 p-4 flex items-center justify-between z-20 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <span className="font-display font-extrabold text-xl text-primary tracking-tight">
            Elite Technology
          </span>
        </Link>
        <Link
          href="/"
          className="text-xs font-semibold text-on-surface-variant hover:text-primary flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về trang chủ</span>
        </Link>
      </div>

      {/* Main Container */}
      <main className="w-full max-w-4xl mx-auto px-4 py-16 sm:py-20 flex items-center justify-center">
        <div className="w-full bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Column: Form */}
          <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
            
            {/* Tab Switcher */}
            <div className="space-y-4 mb-6">
              <div className="inline-flex p-1 bg-surface-container rounded-xl w-full">
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                    mode === "login"
                      ? "bg-surface-container-lowest text-primary shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  Đăng Nhập
                </button>
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                    mode === "register"
                      ? "bg-surface-container-lowest text-primary shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  Tạo Tài Khoản
                </button>
              </div>

              <div>
                <h1 className="font-display text-2xl font-bold text-on-surface">
                  {mode === "login" ? "Chào Mừng Trở Lại" : "Đăng Ký Tài Khoản Mới"}
                </h1>
                <p className="text-xs text-on-surface-variant mt-1">
                  {mode === "login"
                    ? "Đăng nhập tài khoản để nhận ưu đãi sinh viên và theo dõi đơn hàng"
                    : "Tạo tài khoản và xác thực sinh viên để nhận voucher 100k đầu tiên"}
                </p>
              </div>
            </div>

            {/* Quick 1-Click OAuth */}
            <div className="space-y-2 mb-6">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl border border-outline-variant/60 bg-surface-container-lowest hover:bg-surface-container-low text-xs font-semibold text-on-surface transition-all active:scale-[0.98]"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>Tiếp tục bằng tài khoản Google</span>
              </button>

              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-primary transition-all active:scale-[0.98]"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Đăng nhập qua cổng Sinh viên (FPT/ĐH)</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center mb-6">
              <div className="border-t border-outline-variant/40 w-full" />
              <span className="bg-surface-container-lowest px-3 text-[11px] text-outline uppercase font-semibold tracking-wider">
                hoặc email
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "register" && (
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-on-surface">Họ và tên</label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant/60 bg-surface-container-lowest text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="block text-xs font-semibold text-on-surface">Email</label>
                <input
                  type="email"
                  required
                  placeholder="sinhvien@fpt.edu.vn"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant/60 bg-surface-container-lowest text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              {mode === "register" && (
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-on-surface">
                    Mã số sinh viên (để nhận giảm 15%)
                  </label>
                  <input
                    type="text"
                    placeholder="SE170123"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant/60 bg-surface-container-lowest text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>
              )}

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-on-surface">Mật khẩu</label>
                  {mode === "login" && (
                    <button
                      type="button"
                      onClick={() => alert("Hệ thống đã gửi liên kết đặt lại mật khẩu về email của bạn!")}
                      className="text-[11px] font-semibold text-primary hover:underline"
                    >
                      Quên mật khẩu?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant/60 bg-surface-container-lowest text-xs text-on-surface placeholder:text-outline focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-outline hover:text-on-surface"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 mt-2"
              >
                <span>{mode === "login" ? "Đăng Nhập Ngay" : "Tạo Tài Khoản"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <p className="text-[11px] text-center text-on-surface-variant mt-5">
              Bằng việc đăng ký, bạn đồng ý với{" "}
              <Link href="#" className="text-primary hover:underline">
                Điều khoản dịch vụ
              </Link>{" "}
              và{" "}
              <Link href="#" className="text-primary hover:underline">
                Chính sách bảo mật
              </Link>{" "}
              của Elite Tech.
            </p>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="hidden md:flex md:col-span-5 bg-gradient-to-br from-primary via-primary-container to-blue-700 p-8 text-on-primary flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/10 blur-xl" />
            <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-secondary-container/20 blur-xl" />

            <div className="relative z-10 space-y-4">
              <span className="inline-block px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider">
                Campus Privilege
              </span>
              <h3 className="font-display text-2xl font-bold leading-tight">
                Một tài khoản, ngập tràn đặc quyền công nghệ
              </h3>
              <p className="text-xs text-on-primary-container leading-relaxed">
                Nhận mã giảm giá trực tiếp tới 15% cho tất cả đơn hàng linh kiện, laptop và gear chính hãng khi đăng nhập bằng email trường.
              </p>
            </div>

            <div className="relative z-10 space-y-3 my-6">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
                <Bike className="w-5 h-5 text-secondary-fixed flex-shrink-0" />
                <div className="text-xs">
                  <p className="font-bold">Giao tận tay 2h</p>
                  <p className="text-[10px] text-on-primary-container">Khuôn viên ký túc xá & giảng đường</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
                <CreditCard className="w-5 h-5 text-secondary-fixed flex-shrink-0" />
                <div className="text-xs">
                  <p className="font-bold">Trả góp 0% lãi suất</p>
                  <p className="text-[10px] text-on-primary-container">Chỉ cần mã số sinh viên hợp lệ</p>
                </div>
              </div>
            </div>

            <div className="relative z-10 border-t border-white/20 pt-4 flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-white/30"
                alt="Student"
              />
              <div className="text-[11px]">
                <p className="font-bold">Đã có 5.200+ sinh viên</p>
                <p className="text-on-primary-container text-[10px]">kích hoạt tài khoản campus thành công</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
