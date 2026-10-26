'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useStudent } from '../context/StudentContext';
import { useToast } from '../context/ToastContext';
import { ProductIllustration } from '../components/ProductIllustrations';
import {
  ShieldCheck,
  Plus,
  Minus,
  Trash2,
  CheckCircle,
  ArrowLeft,
  Copy,
  Check,
  QrCode,
  Calendar,
  Truck,
  CreditCard,
  Building2,
  Clock,
  Sparkles,
} from 'lucide-react';

interface CheckoutProps {
  onNavigate?: (page: 'storefront' | 'pdp' | 'auth' | 'checkout') => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ onNavigate }) => {
  const router = useRouter();

  const handleNav = (page: 'storefront' | 'pdp' | 'auth' | 'checkout') => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      if (page === 'storefront') router.push('/');
      else if (page === 'auth') router.push('/xac-thuc');
      else if (page === 'checkout') router.push('/thanh-toan');
    }
  };

  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    originalTotal,
    campaignDiscount,
    studentDiscount,
    finalTotal,
  } = useCart();
  const { student } = useStudent();
  const { showToast } = useToast();

  const [isMounted, setIsMounted] = useState(false);
  const [orderCode, setOrderCode] = useState('UG886622');

  // Form states initialized with student data if logged in
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [university, setUniversity] = useState('');

  const [shippingType, setShippingType] = useState<'ktx' | 'hub'>('ktx');
  const [address, setAddress] = useState(
    'Phòng 402, KTX Khu B Đại học Quốc Gia, P. Đông Hòa, TP. Dĩ An, Bình Dương'
  );
  const [deliveryNote, setDeliveryNote] = useState('Giao sau 16h chiều em tan tiết học đồ án');

  useEffect(() => {
    setIsMounted(true);
    setOrderCode(`UG${Math.floor(100000 + Math.random() * 900000)}`);
  }, []);

  useEffect(() => {
    if (student.fullName) setFullName(student.fullName);
    if (student.phone) setPhone(student.phone);
    if (student.email) setEmail(student.email);
    if (student.studentId) setStudentId(student.studentId);
    if (student.university) setUniversity(student.university);
  }, [student]);

  const fillDemoData = () => {
    setFullName('Nguyễn Hoàng Nam');
    setPhone('0988 123 456');
    setEmail('nam.nh2105@sis.hust.edu.vn');
    setStudentId('20214589');
    setUniversity('Đại học Bách Khoa Hà Nội (HUST)');
    setAddress('Phòng 402, KTX Khu B Đại học Quốc Gia, P. Đông Hòa, TP. Dĩ An, Bình Dương');
    showToast('Đã điền nhanh thông tin sinh viên mẫu!');
  };

  const [paymentMethod, setPaymentMethod] = useState<'installment' | 'vietqr' | 'cod'>('vietqr');
  const [installmentMonths, setInstallmentMonths] = useState<3 | 6 | 12>(6);
  const [isOrderedSuccess, setIsOrderedSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderCode: string;
    fullName: string;
    phone: string;
    address: string;
    studentId: string;
    paymentMethod: 'installment' | 'vietqr' | 'cod';
    installmentMonths: 3 | 6 | 12;
    installmentPerMonth: number;
    finalTotal: number;
  } | null>(null);

  const formatPrice = (val: number) => val.toLocaleString('vi-VN') + 'đ';

  const installmentPerMonth = Math.round(finalTotal / installmentMonths);

  const copyToClipboard = (text: string, fieldName: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      showToast(`Đã sao chép ${fieldName}!`);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const handleConfirmOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      showToast('Giỏ hàng đang trống! Vui lòng chọn sản phẩm trước khi thanh toán.');
      return;
    }
    if (!fullName || !phone) {
      showToast('Vui lòng điền họ tên và số điện thoại nhận hàng!');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student: { fullName, phone, email, studentId, university },
          items,
          deliveryMethod: shippingType,
          deliveryAddress: address,
          deliveryNote,
          paymentMethod,
          installmentMonths: paymentMethod === 'installment' ? installmentMonths : null,
          orderCode,
          subtotal: originalTotal,
          discountCampaign: campaignDiscount,
          studentDiscount,
          shippingFee: 0,
          finalTotal,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Không thể ghi nhận đơn hàng');
      }

      setConfirmedOrder({
        orderCode: data.orderCode || orderCode,
        fullName,
        phone,
        address,
        studentId,
        paymentMethod,
        installmentMonths,
        installmentPerMonth,
        finalTotal,
      });

      // Xóa giỏ hàng ngay lập tức để tránh dồn món ở các lần mua sau
      clearCart();
      setIsOrderedSuccess(true);
      showToast('🎉 Đặt hàng thành công! Kỹ thuật viên UniGear sẽ gọi xác nhận trong 15 phút.');
    } catch (err: any) {
      console.error('Order submission error:', err);
      showToast(`⚠️ Lỗi gửi đơn hàng: ${err?.message || 'Vui lòng thử lại!'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // VietQR Dynamic Image URL
  const vietQrUrl = `https://img.vietqr.io/image/MB-0988123456-compact2.png?amount=${finalTotal}&addInfo=${orderCode}&accountName=UNIGEAR%20STORE`;

  if (!isMounted) {
    return (
      <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-8 py-12 animate-pulse space-y-6">
        <div className="h-6 bg-[var(--surface)] w-64 rounded-lg"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div className="h-72 bg-[var(--surface)] rounded-3xl border border-[var(--ln)]"></div>
            <div className="h-72 bg-[var(--surface)] rounded-3xl border border-[var(--ln)]"></div>
          </div>
          <div className="lg:col-span-5">
            <div className="h-96 bg-[var(--surface)] rounded-3xl border border-[var(--ln)]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isOrderedSuccess) {
    const displayOrder = confirmedOrder || {
      orderCode,
      fullName,
      phone,
      address,
      studentId,
      paymentMethod,
      installmentMonths,
      installmentPerMonth,
      finalTotal,
    };

    return (
      <div className="max-w-[760px] w-full mx-auto px-4 py-12 sm:py-16 text-center">
        <div className="bg-[var(--card)] border border-[var(--ln)] rounded-3xl p-6 sm:p-12 shadow-2xl flex flex-col items-center animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-[var(--ok)]/20 text-[var(--ok)] flex items-center justify-center mb-5">
            <CheckCircle className="w-9 h-9" />
          </div>
          <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-[var(--ok)] bg-[var(--ok)]/10 px-3 py-1 rounded-full mb-3">
            ĐÃ XÁC NHẬN ĐƠN HÀNG THÀNH CÔNG
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--tx)]">
            Cảm Ơn Bạn Đã Mua Sắm Tại UniGear!
          </h1>
          <p className="text-xs sm:text-sm text-[var(--mu)] mt-2.5 max-w-lg leading-relaxed">
            Đơn hàng mã <strong className="text-[var(--tx)] font-mono-code">#{displayOrder.orderCode}</strong> đã được lưu trữ trên hệ thống. Nhân viên phụ trách KTX sẽ liên hệ hỗ trợ bạn kiểm tra và bàn giao thiết bị.
          </p>

          {/* Delivery Timeline Card */}
          <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-[var(--surface)] border border-[var(--ln)] w-full text-left space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--ln)] pb-3">
              <span className="text-xs text-[var(--mu)] font-medium">Mã vận đơn KTX:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono-code font-bold text-sm text-[var(--tx)]">#{displayOrder.orderCode}</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(displayOrder.orderCode, 'mã đơn hàng')}
                  className="p-1 hover:text-[var(--pri)] text-[var(--mu)] cursor-pointer"
                  title="Sao chép mã"
                >
                  {copiedField === 'mã đơn hàng' ? <Check className="w-3.5 h-3.5 text-[var(--ok)]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[var(--mu)] block">Người nhận hàng:</span>
                <span className="font-bold text-[var(--tx)]">{displayOrder.fullName} {displayOrder.studentId && `(MSSV: ${displayOrder.studentId})`}</span>
              </div>
              <div>
                <span className="text-[var(--mu)] block">Số điện thoại:</span>
                <span className="font-mono-code font-bold text-[var(--tx)]">{displayOrder.phone}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-[var(--mu)] block">Địa chỉ giao máy:</span>
                <span className="font-medium text-[var(--tx)]">{displayOrder.address}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-[var(--mu)] block">Hình thức thanh toán:</span>
                <span className="font-semibold text-[var(--warm)]">
                  {displayOrder.paymentMethod === 'vietqr' && 'Chuyển khoản QR ngân hàng (VietQR)'}
                  {displayOrder.paymentMethod === 'installment' && `Trả góp 0% sinh viên (${displayOrder.installmentMonths} tháng · ${formatPrice(displayOrder.installmentPerMonth)}/tháng)`}
                  {displayOrder.paymentMethod === 'cod' && 'Thanh toán COD khi nhận máy tại KTX'}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-baseline border-t border-[var(--ln)] pt-3">
              <span className="font-bold text-xs sm:text-sm text-[var(--tx)]">Tổng thanh toán:</span>
              <span className="font-mono-code text-lg sm:text-xl font-extrabold text-[var(--warm)]">
                {formatPrice(displayOrder.finalTotal)}
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full">
            <button
              type="button"
              onClick={() => {
                clearCart();
                handleNav('storefront');
              }}
              className="flex-1 py-3.5 rounded-full font-bold text-sm bg-[var(--tx)] text-[var(--bg)] hover:bg-[var(--pri)] hover:text-white transition-all cursor-pointer shadow-md"
            >
              Tiếp tục mua sắm
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-8 py-6">
      {/* Flow Steps Breadcrumb & Security Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-[var(--ln)] text-xs text-[var(--mu)] font-medium">
        <div className="flex items-center gap-2">
          <button onClick={() => handleNav('storefront')} className="hover:text-[var(--tx)] cursor-pointer">
            Trang chủ
          </button>
          <span>/</span>
          <span className="hover:text-[var(--tx)]">Giỏ hàng</span>
          <span>/</span>
          <span className="text-[var(--tx)] font-bold">Thanh toán &amp; Giao KTX</span>
        </div>
        <div className="flex items-center gap-1.5 text-[var(--ok)] font-semibold font-mono-code text-xs">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Bảo mật đơn hàng sinh viên UniGear Checkout</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        {/* Left Column: Form & Payment Steps */}
        <form onSubmit={handleConfirmOrder} className="lg:col-span-7 flex flex-col gap-6">
          
          {/* STEP 1: Thông tin sinh viên nhận hàng */}
          <div className="bg-[var(--card)] border border-[var(--ln)] rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[var(--pri)] text-white text-xs font-bold font-mono-code flex items-center justify-center">
                  1
                </span>
                <h2 className="text-base sm:text-lg font-bold text-[var(--tx)]">
                  Thông tin sinh viên nhận máy
                </h2>
              </div>
              <button
                type="button"
                onClick={fillDemoData}
                className="text-xs text-[var(--warm)] hover:underline font-semibold cursor-pointer inline-flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Điền mẫu nhanh</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[var(--mu)] block mb-1">
                  Họ và tên sinh viên *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--ln)] text-xs sm:text-sm text-[var(--tx)] focus:border-[var(--pri)] outline-none"
                  placeholder="Nguyễn Hoàng Nam"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--mu)] block mb-1">
                  Số điện thoại nhận hàng *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--ln)] text-xs sm:text-sm text-[var(--tx)] focus:border-[var(--pri)] outline-none font-mono-code"
                  placeholder="0988 123 456"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--mu)] block mb-1">
                  Email sinh viên / Trường (.edu.vn)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--ln)] text-xs sm:text-sm text-[var(--tx)] focus:border-[var(--pri)] outline-none"
                  placeholder="nam.nh2105@sis.hust.edu.vn"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--mu)] block mb-1">
                  Mã số sinh viên (MSSV)
                </label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--ln)] text-xs sm:text-sm text-[var(--tx)] focus:border-[var(--pri)] outline-none font-mono-code"
                  placeholder="20214589"
                />
              </div>
            </div>
          </div>

          {/* STEP 2: Địa chỉ giao KTX hoặc Campus Hub */}
          <div className="bg-[var(--card)] border border-[var(--ln)] rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-7 h-7 rounded-full bg-[var(--pri)] text-white text-xs font-bold font-mono-code flex items-center justify-center">
                2
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[var(--tx)]">
                Địa điểm giao nhận hàng
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <button
                type="button"
                onClick={() => {
                  setShippingType('ktx');
                  setAddress('Phòng 402, KTX Khu B Đại học Quốc Gia, P. Đông Hòa, TP. Dĩ An, Bình Dương');
                }}
                className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  shippingType === 'ktx'
                    ? 'border-[var(--pri)] bg-[var(--pri)]/10 ring-2 ring-[var(--pri)]/20'
                    : 'border-[var(--ln)] bg-[var(--surface)] hover:border-[var(--tx)]'
                }`}
              >
                <Truck className="w-5 h-5 text-[var(--pri)] flex-shrink-0 mt-0.5" />
                <div>
                  <b className="text-xs sm:text-sm text-[var(--tx)] block font-bold">
                    Giao tận phòng KTX
                  </b>
                  <span className="text-xs text-[var(--mu)] mt-0.5 block">
                    Shipper đem máy lên tận phòng hoặc sảnh tòa KTX
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShippingType('hub');
                  setAddress('UniGear Campus Hub, Tầng 1 Nhà H6, Trường ĐH Bách Khoa');
                }}
                className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  shippingType === 'hub'
                    ? 'border-[var(--pri)] bg-[var(--pri)]/10 ring-2 ring-[var(--pri)]/20'
                    : 'border-[var(--ln)] bg-[var(--surface)] hover:border-[var(--tx)]'
                }`}
              >
                <Building2 className="w-5 h-5 text-[var(--warm)] flex-shrink-0 mt-0.5" />
                <div>
                  <b className="text-xs sm:text-sm text-[var(--tx)] block font-bold">
                    Nhận tại Hub trường
                  </b>
                  <span className="text-xs text-[var(--mu)] mt-0.5 block">
                    Kỹ thuật viên hỗ trợ cài Win/macOS và test máy miễn phí
                  </span>
                </div>
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[var(--mu)] block mb-1">
                  Địa chỉ chi tiết (Phòng, Tòa, KTX, Trường) *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--ln)] text-xs sm:text-sm text-[var(--tx)] focus:border-[var(--pri)] outline-none"
                  placeholder="Phòng 402, KTX Khu B ĐHQG..."
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--mu)] block mb-1">
                  Ghi chú cho Shipper
                </label>
                <input
                  type="text"
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--ln)] text-xs sm:text-sm text-[var(--tx)] focus:border-[var(--pri)] outline-none"
                  placeholder="Ví dụ: Giao sau 16h chiều em tan tiết học đồ án"
                />
              </div>
            </div>
          </div>

          {/* STEP 3: Hình thức thanh toán thực tế */}
          <div className="bg-[var(--card)] border border-[var(--ln)] rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-7 h-7 rounded-full bg-[var(--pri)] text-white text-xs font-bold font-mono-code flex items-center justify-center">
                3
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[var(--tx)]">
                Hình thức thanh toán sinh viên
              </h2>
            </div>

            <div className="space-y-3">
              {/* Option 1: VietQR Chuyển khoản */}
              <div
                onClick={() => setPaymentMethod('vietqr')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  paymentMethod === 'vietqr'
                    ? 'border-[var(--pri)] bg-[var(--pri)]/10 ring-2 ring-[var(--pri)]/20'
                    : 'border-[var(--ln)] bg-[var(--surface)] hover:border-[var(--tx)]'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === 'vietqr'}
                      onChange={() => setPaymentMethod('vietqr')}
                      className="cursor-pointer"
                    />
                    <div>
                      <b className="text-xs sm:text-sm text-[var(--tx)] block font-bold">
                        Chuyển khoản VietQR Sinh Viên
                      </b>
                      <span className="text-xs text-[var(--mu)]">
                        Quét mã tự động điền STK, số tiền &amp; nội dung qua mọi App Ngân hàng
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-bold bg-[var(--ok)]/15 text-[var(--ok)] px-2.5 py-1 rounded-full whitespace-nowrap">
                    Xác nhận tức thì 24/7
                  </span>
                </div>

                {/* Sub-Panel: Dynamic VietQR Details */}
                {paymentMethod === 'vietqr' && (
                  <div className="mt-4 pt-4 border-t border-[var(--ln)] grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    <div className="sm:col-span-5 flex flex-col items-center p-3 bg-white rounded-xl shadow-inner">
                      <img
                        src={vietQrUrl}
                        alt="Mã VietQR thanh toán UniGear"
                        className="w-full max-w-[190px] h-auto object-contain"
                      />
                      <span className="text-xs text-gray-500 font-mono-code mt-1 font-semibold">
                        Quét mã qua Mobile Banking
                      </span>
                    </div>

                    <div className="sm:col-span-7 space-y-2 text-xs">
                      <div className="flex items-center justify-between bg-[var(--card)] p-2 rounded-lg border border-[var(--ln)]">
                        <span className="text-[var(--mu)]">Ngân hàng:</span>
                        <b className="font-bold text-[var(--tx)]">MB Bank (Quân Đội)</b>
                      </div>

                      <div className="flex items-center justify-between bg-[var(--card)] p-2 rounded-lg border border-[var(--ln)]">
                        <span className="text-[var(--mu)]">Số tài khoản:</span>
                        <div className="flex items-center gap-1.5">
                          <b className="font-mono-code font-bold text-[var(--tx)]">0988 123 456</b>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard('0988123456', 'số tài khoản');
                            }}
                            className="p-1 hover:text-[var(--pri)] text-[var(--mu)] cursor-pointer"
                            title="Sao chép STK"
                          >
                            {copiedField === 'số tài khoản' ? <Check className="w-3.5 h-3.5 text-[var(--ok)]" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between bg-[var(--card)] p-2 rounded-lg border border-[var(--ln)]">
                        <span className="text-[var(--mu)]">Chủ tài khoản:</span>
                        <b className="font-bold text-[var(--tx)] text-xs">UNIGEAR STORE OFFICIAL</b>
                      </div>

                      <div className="flex items-center justify-between bg-[var(--card)] p-2 rounded-lg border border-[var(--ln)]">
                        <span className="text-[var(--mu)]">Nội dung CK:</span>
                        <div className="flex items-center gap-1.5">
                          <b className="font-mono-code font-bold text-[var(--warm)]">{orderCode}</b>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(orderCode, 'nội dung');
                            }}
                            className="p-1 hover:text-[var(--pri)] text-[var(--mu)] cursor-pointer"
                            title="Sao chép nội dung"
                          >
                            {copiedField === 'nội dung' ? <Check className="w-3.5 h-3.5 text-[var(--ok)]" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-[var(--ok)] font-medium pt-1">
                        <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>Hệ thống tự động kích hoạt bảo hành sau khi nhận tiền</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Option 2: Trả góp 0% */}
              <div
                onClick={() => setPaymentMethod('installment')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  paymentMethod === 'installment'
                    ? 'border-[var(--pri)] bg-[var(--pri)]/10 ring-2 ring-[var(--pri)]/20'
                    : 'border-[var(--ln)] bg-[var(--surface)] hover:border-[var(--tx)]'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === 'installment'}
                      onChange={() => setPaymentMethod('installment')}
                      className="cursor-pointer"
                    />
                    <div>
                      <b className="text-xs sm:text-sm text-[var(--tx)] block font-bold">
                        Trả góp 0% sinh viên qua CCCD / Thẻ SV
                      </b>
                      <span className="text-xs text-[var(--ok)] font-semibold">
                        Không cần thẻ tín dụng · Duyệt hồ sơ chỉ 5 phút
                      </span>
                    </div>
                  </div>
                  <span className="font-mono-code font-bold text-xs sm:text-sm text-[var(--warm)] whitespace-nowrap">
                    {formatPrice(installmentPerMonth)}/tháng
                  </span>
                </div>

                {/* Sub-Panel: Installment Term Picker */}
                {paymentMethod === 'installment' && (
                  <div className="mt-4 pt-4 border-t border-[var(--ln)] space-y-3">
                    <span className="text-xs text-[var(--mu)] font-medium block">
                      Chọn kỳ hạn chia nhỏ thanh toán:
                    </span>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[3, 6, 12].map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setInstallmentMonths(m as any);
                          }}
                          className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                            installmentMonths === m
                              ? 'border-[var(--pri)] bg-[var(--pri)] text-white font-bold'
                              : 'border-[var(--ln)] bg-[var(--card)] text-[var(--tx)] hover:border-[var(--tx)]'
                          }`}
                        >
                          <span className="block text-xs font-bold">{m} Tháng</span>
                          <span className="block text-xs opacity-80 font-mono-code">
                            {formatPrice(Math.round(finalTotal / m))}/th
                          </span>
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-[var(--mu)] italic pt-1">
                      ℹ️ Bạn chỉ cần xuất trình Thẻ Sinh Viên + CCCD khi Shipper giao máy đến phòng KTX để ký biên bản bàn giao.
                    </p>
                  </div>
                )}
              </div>

              {/* Option 3: COD */}
              <div
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'border-[var(--pri)] bg-[var(--pri)]/10 ring-2 ring-[var(--pri)]/20'
                    : 'border-[var(--ln)] bg-[var(--surface)] hover:border-[var(--tx)]'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment_method"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="cursor-pointer"
                    />
                    <div>
                      <b className="text-xs sm:text-sm text-[var(--tx)] block font-bold">
                        Thanh toán khi nhận máy tại KTX (COD)
                      </b>
                      <span className="text-xs text-[var(--mu)]">
                        Được bóc seal kiểm tra máy và test phần cứng 15 phút trước khi trả tiền
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-[var(--mu)] font-medium whitespace-nowrap">
                    Tiền mặt / Thẻ
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button on Mobile */}
          <div className="lg:hidden">
            <button
              type="submit"
              disabled={isSubmitting || items.length === 0}
              className="w-full py-4 rounded-full font-extrabold text-sm bg-[var(--pri)] text-white hover:bg-[var(--pri-h)] transition-all cursor-pointer shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? 'Đang khởi tạo đơn hàng...' : `Xác Nhận Đặt Hàng · ${formatPrice(finalTotal)}`}
            </button>
          </div>
        </form>

        {/* Right Column: Order Summary Sidebar (Sticky) */}
        <div className="lg:col-span-5">
          <div className="sticky top-20 bg-[var(--card)] border border-[var(--ln)] rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col gap-5">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--ln)]">
              <h2 className="text-base sm:text-lg font-bold text-[var(--tx)]">
                Chi tiết đơn hàng
              </h2>
              <span className="text-xs font-mono-code text-[var(--mu)]">
                {items.length} món
              </span>
            </div>

            {/* Items List */}
            {items.length === 0 ? (
              <div className="py-8 text-center text-xs text-[var(--mu)]">
                Giỏ hàng trống. Hãy chọn sản phẩm từ cửa hàng!
              </div>
            ) : (
              <div className="space-y-3.5 max-h-[300px] overflow-y-auto pr-1">
                {items.map((item, idx) => {
                  const cfg = item.product.configurations.find(
                    (c) => c.id === item.selectedConfigId
                  );
                  const color = item.product.colors.find(
                    (c) => c.id === item.selectedColorId
                  );
                  return (
                    <div
                      key={item.cartItemId || idx}
                      className="flex items-center gap-3 pb-3 border-b border-[var(--ln)]"
                    >
                      <div className="w-16 h-14 rounded-xl bg-[var(--stage)] border border-[var(--ln)] flex items-center justify-center p-1.5 flex-shrink-0 overflow-hidden">
                        {item.product.imageUrl ? (
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-full h-full object-contain"
                          />
                        ) : item.product.imageType ? (
                          <ProductIllustration
                            type={item.product.imageType}
                            uniqueId={`checkout-${idx}`}
                            className="max-h-10"
                          />
                        ) : null}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-bold text-[var(--tx)] truncate">
                          {item.product.name}
                        </h3>
                        <div className="text-xs text-[var(--mu)] truncate">
                          {cfg ? cfg.label : ''} {color ? `· ${color.name}` : ''}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="w-5 h-5 rounded-md bg-[var(--surface)] border border-[var(--ln)] flex items-center justify-center text-[var(--tx)] hover:bg-[var(--card)] cursor-pointer"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="text-xs font-mono-code font-semibold text-[var(--tx)]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="w-5 h-5 rounded-md bg-[var(--surface)] border border-[var(--ln)] flex items-center justify-center text-[var(--tx)] hover:bg-[var(--card)] cursor-pointer"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono-code font-bold text-xs text-[var(--tx)] block">
                          {formatPrice(item.product.studentPrice * item.quantity)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-[var(--mu)] hover:text-red-400 p-1 cursor-pointer mt-1"
                          title="Xóa sản phẩm"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 py-4 border-y border-[var(--ln)] text-xs">
              <div className="flex justify-between text-[var(--mu)]">
                <span>Giá gốc niêm yết:</span>
                <span className="font-mono-code line-through">{formatPrice(originalTotal)}</span>
              </div>
              <div className="flex justify-between text-[var(--warm)] font-medium">
                <span>Giảm giá shock sinh viên:</span>
                <span className="font-mono-code">-{formatPrice(campaignDiscount)}</span>
              </div>
              <div className="flex justify-between text-[var(--ok)] font-semibold">
                <span>Ưu đãi thẻ sinh viên (-5%):</span>
                <span className="font-mono-code">-{formatPrice(studentDiscount)}</span>
              </div>
              <div className="flex justify-between text-[var(--mu)]">
                <span>Phí vận chuyển KTX / Hub:</span>
                <span className="font-mono-code text-[var(--ok)] font-bold">0đ (Miễn phí)</span>
              </div>
            </div>

            {/* Final Total */}
            <div className="flex justify-between items-baseline pt-1">
              <div>
                <span className="font-bold text-sm text-[var(--tx)] block">Tổng thanh toán:</span>
                <span className="text-xs text-[var(--mu)]">Đã bao gồm VAT &amp; Bảo hành 1 đổi 1</span>
              </div>
              <span className="text-2xl font-extrabold font-mono-code text-[var(--warm)]">
                {formatPrice(finalTotal)}
              </span>
            </div>

            {/* Submit Button on Desktop */}
            <button
              type="button"
              onClick={handleConfirmOrder}
              disabled={isSubmitting || items.length === 0}
              className="hidden lg:block w-full py-4 rounded-full font-extrabold text-sm bg-[var(--tx)] text-[var(--bg)] hover:bg-[var(--pri)] hover:text-white transition-all cursor-pointer shadow-lg hover:shadow-xl disabled:opacity-50 text-center"
            >
              {isSubmitting ? 'Đang gửi đơn hàng...' : `Đặt Hàng Ngay (${formatPrice(finalTotal)})`}
            </button>

            <div className="text-center font-mono-code text-xs text-[var(--mu)] opacity-80">
              🔒 Đảm bảo hoàn tiền 100% nếu máy lỗi trong 30 ngày
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
