"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import {
  Package2,
  User,
  MapPin,
  Ticket,
  ShieldCheck,
  Truck,
  CheckCircle,
  Building,
  Home,
  Plus,
} from "lucide-react";

type PortalTab = "orders" | "profile" | "addresses" | "vouchers" | "security";

export default function PortalPage() {
  const [activeTab, setActiveTab] = useState<PortalTab>("orders");

  return (
    <>
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Profile Hero Card */}
        <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-5 sm:p-6 shadow-sm mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="Avatar"
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-primary/30"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center text-[12px] border-2 border-white shadow-sm">
                <CheckCircle className="w-3 h-3" />
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="font-display text-lg sm:text-xl font-bold text-on-surface">Alex Rivera</h1>
                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold">
                  Sinh Viên Verified
                </span>
              </div>
              <p className="text-xs text-on-surface-variant">
                MSSV: <strong>SE170123</strong> • Trường Đại Học FPT Campus Hòa Lạc
              </p>
              <p className="text-xs text-on-surface-variant">alex.rivera.fer202@fpt.edu.vn</p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-stretch sm:self-auto bg-surface-container-low p-3 rounded-xl border border-outline-variant/20">
            <div className="text-center px-3 border-r border-outline-variant/30">
              <span className="text-[10px] uppercase font-bold text-on-surface-variant block">Điểm Campus</span>
              <span className="font-display font-extrabold text-base text-primary">1.450 pts</span>
            </div>
            <div className="text-center px-3 border-r border-outline-variant/30">
              <span className="text-[10px] uppercase font-bold text-on-surface-variant block">Voucher</span>
              <span className="font-display font-extrabold text-base text-secondary">4 Mã</span>
            </div>
            <div className="text-center px-3">
              <span className="text-[10px] uppercase font-bold text-on-surface-variant block">Hạng</span>
              <span className="font-display font-extrabold text-base text-on-surface">Gold SV</span>
            </div>
          </div>
        </div>

        {/* 2 Columns: Nav + Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Nav Menu */}
          <aside className="lg:col-span-3 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-2 sm:p-3 shadow-sm lg:sticky lg:top-24">
            <div className="flex lg:flex-col overflow-x-auto no-scrollbar gap-1 p-1">
              <button
                type="button"
                onClick={() => setActiveTab("orders")}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === "orders"
                    ? "bg-primary text-white shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container-low font-semibold"
                }`}
              >
                <Package2 className="w-4 h-4" />
                <span>Đơn Hàng Của Tôi</span>
                <span className="ml-auto hidden lg:inline px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]">3</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs transition-all whitespace-nowrap ${
                  activeTab === "profile"
                    ? "bg-primary text-white shadow-sm font-bold"
                    : "text-on-surface-variant hover:bg-surface-container-low font-semibold"
                }`}
              >
                <User className="w-4 h-4" />
                <span>Thông Tin Cá Nhân</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("addresses")}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs transition-all whitespace-nowrap ${
                  activeTab === "addresses"
                    ? "bg-primary text-white shadow-sm font-bold"
                    : "text-on-surface-variant hover:bg-surface-container-low font-semibold"
                }`}
              >
                <MapPin className="w-4 h-4" />
                <span>Sổ Địa Chỉ Giao Hàng</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("vouchers")}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs transition-all whitespace-nowrap ${
                  activeTab === "vouchers"
                    ? "bg-primary text-white shadow-sm font-bold"
                    : "text-on-surface-variant hover:bg-surface-container-low font-semibold"
                }`}
              >
                <Ticket className="w-4 h-4" />
                <span>Kho Voucher & Ưu Đãi</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("security")}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs transition-all whitespace-nowrap ${
                  activeTab === "security"
                    ? "bg-primary text-white shadow-sm font-bold"
                    : "text-on-surface-variant hover:bg-surface-container-low font-semibold"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Bảo Mật & Mật Khẩu</span>
              </button>
            </div>
          </aside>

          {/* Right Column: Tab Content */}
          <div className="lg:col-span-9 space-y-6">

            {/* TAB 1: ORDERS */}
            {activeTab === "orders" && (
              <section className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="font-display text-lg font-bold text-on-surface">Đơn Hàng Gần Đây</h2>
                    <p className="text-xs text-on-surface-variant">Theo dõi hành trình đơn hàng và lịch sử mua sắm công nghệ</p>
                  </div>
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                    <button className="px-3 py-1 rounded-full bg-primary text-white text-xs font-bold shadow-sm">Tất cả</button>
                    <button className="px-3 py-1 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant text-xs font-medium">Đang giao (1)</button>
                    <button className="px-3 py-1 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant text-xs font-medium">Hoàn thành (2)</button>
                  </div>
                </div>

                {/* Order 1: In Progress */}
                <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-5 shadow-sm space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-outline-variant/20">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-primary" />
                      <span className="text-xs font-bold text-on-surface">Mã đơn: <span className="text-primary font-mono">#ORD-98214</span></span>
                      <span className="text-xs text-outline">• 07/10/2026</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                      Đang vận chuyển Campus Express
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&auto=format&fit=crop&q=80"
                        alt="Product"
                        className="w-14 h-14 rounded-xl object-cover bg-surface-container-low"
                      />
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-on-surface line-clamp-1">Tai Nghe NovaPro Wireless ANC</h4>
                        <p className="text-xs text-on-surface-variant">Màu: Midnight Blue • SL: 1</p>
                        <p className="text-xs font-bold text-primary mt-0.5">2.990.000đ</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-on-surface-variant block">Tổng thanh toán</span>
                      <span className="font-display font-extrabold text-sm sm:text-base text-on-surface">2.990.000đ</span>
                    </div>
                  </div>

                  <div className="bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/20 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-primary">
                        📍 Shipper đang đến Ký Túc Xá Dom A (Phòng 302)
                      </span>
                      <span className="text-on-surface-variant font-medium">Dự kiến: 11:45 Hôm nay</span>
                    </div>
                    <div className="w-full bg-outline-variant/30 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full w-3/4" />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => alert("Đang mở bản đồ vị trí shipper trên campus...")}
                      className="px-3.5 py-1.5 rounded-lg border border-outline-variant/50 hover:bg-surface-container-low text-xs font-semibold text-on-surface transition-colors"
                    >
                      Xem Vị Trí Shipper
                    </button>
                    <button
                      type="button"
                      onClick={() => alert("Hotline hỗ trợ đơn hàng: 1900 8888")}
                      className="px-3.5 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-bold text-primary transition-colors"
                    >
                      Hỗ Trợ Đơn
                    </button>
                  </div>
                </div>

                {/* Order 2: Completed */}
                <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-5 shadow-sm space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-outline-variant/20">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-bold text-on-surface">Mã đơn: <span className="text-primary font-mono">#ORD-95410</span></span>
                      <span className="text-xs text-outline">• 28/09/2026</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                      Giao hàng thành công
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=120&auto=format&fit=crop&q=80"
                        alt="Product"
                        className="w-14 h-14 rounded-xl object-cover bg-surface-container-low"
                      />
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-on-surface line-clamp-1">Bàn Phím Cơ Không Dây ErgoWave</h4>
                        <p className="text-xs text-on-surface-variant">Switch: Brown • SL: 1</p>
                        <p className="text-xs font-bold text-primary mt-0.5">1.650.000đ</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-on-surface-variant block">Tổng thanh toán</span>
                      <span className="font-display font-extrabold text-sm sm:text-base text-on-surface">1.650.000đ</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => alert("Đã thêm sản phẩm lại vào giỏ hàng!")}
                      className="px-3.5 py-1.5 rounded-lg border border-outline-variant/50 hover:bg-surface-container-low text-xs font-semibold text-on-surface transition-colors"
                    >
                      Mua Lại
                    </button>
                    <button
                      type="button"
                      onClick={() => alert("Mở form đánh giá sản phẩm")}
                      className="px-3.5 py-1.5 rounded-lg bg-secondary-container hover:bg-secondary text-white text-xs font-bold shadow-sm transition-colors"
                    >
                      Đánh Giá Sản Phẩm (+50 xu)
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* TAB 2: PROFILE */}
            {activeTab === "profile" && (
              <section className="space-y-4">
                <div>
                  <h2 className="font-display text-lg font-bold text-on-surface">Hồ Sơ Cá Nhân</h2>
                  <p className="text-xs text-on-surface-variant">Cập nhật thông tin sinh viên và tài khoản nhận hàng</p>
                </div>

                <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-5 sm:p-6 shadow-sm">
                  <form onSubmit={(e) => { e.preventDefault(); alert("Đã lưu thông tin hồ sơ!"); }} className="space-y-4 max-w-2xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-on-surface">Họ và tên</label>
                        <input
                          type="text"
                          defaultValue="Alex Rivera"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant/50 bg-surface text-xs text-on-surface focus:outline-none focus:border-primary"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-on-surface">Số điện thoại</label>
                        <input
                          type="tel"
                          defaultValue="0987 654 321"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant/50 bg-surface text-xs text-on-surface focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-on-surface">Email Campus</label>
                        <input
                          type="email"
                          defaultValue="alex.rivera.fer202@fpt.edu.vn"
                          readOnly
                          className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant/40 bg-surface-container-low text-xs text-on-surface-variant cursor-not-allowed"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-on-surface">Mã Số Sinh Viên (MSSV)</label>
                        <input
                          type="text"
                          defaultValue="SE170123"
                          readOnly
                          className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant/40 bg-surface-container-low text-xs text-on-surface-variant cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-on-surface">Khoa / Ngành Học</label>
                      <input
                        type="text"
                        defaultValue="Kỹ Thuật Phần Mềm (Software Engineering) - Khóa K17"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant/50 bg-surface text-xs text-on-surface focus:outline-none focus:border-primary"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-bold shadow-sm transition-colors"
                    >
                      Lưu Thay Đổi
                    </button>
                  </form>
                </div>
              </section>
            )}

            {/* TAB 3: ADDRESSES */}
            {activeTab === "addresses" && (
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-lg font-bold text-on-surface">Sổ Địa Chỉ Giao Hàng</h2>
                    <p className="text-xs text-on-surface-variant">Địa chỉ ưu tiên khi nhận hàng Express tại Campus</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => alert("Mở modal thêm địa chỉ mới")}
                    className="px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-bold flex items-center gap-1 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Thêm Địa Chỉ</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-surface-container-lowest border-2 border-primary/30 shadow-sm relative space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                        <Building className="w-4 h-4 text-primary" />
                        Ký Túc Xá Dom A (Phòng 302)
                      </span>
                      <span className="px-2 py-0.5 rounded bg-primary text-white text-[10px] font-bold">Mặc định</span>
                    </div>
                    <p className="text-xs text-on-surface-variant">Người nhận: <strong>Alex Rivera</strong> (0987 654 321)</p>
                    <p className="text-xs text-on-surface-variant">Khuôn viên Đại học FPT, Khu Công Nghệ Cao Hòa Lạc, Thạch Thất, Hà Nội</p>
                    <div className="pt-2 flex items-center gap-3 text-xs">
                      <Link href="#" className="text-primary font-semibold hover:underline">Chỉnh sửa</Link>
                      <span className="text-outline">•</span>
                      <span className="text-xs text-on-surface-variant">Giao miễn phí 2h</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                        <Home className="w-4 h-4 text-outline" />
                        Nhà Riêng (Cuối tuần)
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant">Người nhận: <strong>Alex Rivera</strong> (0987 654 321)</p>
                    <p className="text-xs text-on-surface-variant">Số 45 Ngõ 120 Hoàng Quốc Việt, Cầu Giấy, Hà Nội</p>
                    <div className="pt-2 flex items-center gap-3 text-xs">
                      <Link href="#" className="text-primary font-semibold hover:underline">Chỉnh sửa</Link>
                      <span className="text-outline">•</span>
                      <button type="button" className="text-on-surface-variant hover:text-primary font-medium">Đặt làm mặc định</button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* TAB 4: VOUCHERS */}
            {activeTab === "vouchers" && (
              <section className="space-y-4">
                <div>
                  <h2 className="font-display text-lg font-bold text-on-surface">Kho Voucher Của Bạn</h2>
                  <p className="text-xs text-on-surface-variant">Các mã giảm giá áp dụng tự động khi mua sắm</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex items-center justify-between gap-3">
                    <div className="space-y-1">
                      <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">CAMPUS EXCLUSIVE</span>
                      <h4 className="font-display font-bold text-sm text-on-surface">GIẢM 15% ĐƠN GEAR</h4>
                      <p className="text-xs text-on-surface-variant">Tối đa 150k cho bàn phím & tai nghe</p>
                      <p className="text-[10px] text-outline">HSD: 31/10/2026</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => alert("Đã sao chép mã SVGEAR15!")}
                      className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-bold text-primary transition-colors"
                    >
                      Dùng Ngay
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex items-center justify-between gap-3">
                    <div className="space-y-1">
                      <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed text-[10px] font-bold">FREESHIP CAMPUS</span>
                      <h4 className="font-display font-bold text-sm text-on-surface">MIỄN PHÍ VẬN CHUYỂN</h4>
                      <p className="text-xs text-on-surface-variant">Đơn từ 150.000đ khu vực trường</p>
                      <p className="text-[10px] text-outline">HSD: 15/11/2026</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => alert("Đã sao chép mã FREESHIP!")}
                      className="px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-bold text-primary transition-colors"
                    >
                      Dùng Ngay
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* TAB 5: SECURITY */}
            {activeTab === "security" && (
              <section className="space-y-4">
                <div>
                  <h2 className="font-display text-lg font-bold text-on-surface">Bảo Mật Tài Khoản</h2>
                  <p className="text-xs text-on-surface-variant">Đổi mật khẩu và quản lý phiên đăng nhập thiết bị</p>
                </div>

                <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-5 sm:p-6 shadow-sm max-w-2xl space-y-4">
                  <form onSubmit={(e) => { e.preventDefault(); alert("Đã cập nhật mật khẩu mới!"); }} className="space-y-3">
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-on-surface">Mật khẩu hiện tại</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant/50 bg-surface text-xs text-on-surface focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-semibold text-on-surface">Mật khẩu mới</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant/50 bg-surface text-xs text-on-surface focus:outline-none focus:border-primary"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-sm hover:bg-primary-container transition-colors"
                    >
                      Cập Nhật Mật Khẩu
                    </button>
                  </form>
                </div>
              </section>
            )}

          </div>

        </div>

      </main>

      <Footer />
      <MobileBottomNav activeTab="portal" />
    </>
  );
}
