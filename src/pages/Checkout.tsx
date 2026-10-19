import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useStudent } from '../context/StudentContext';
import { useToast } from '../context/ToastContext';
import { ProductIllustration } from '../components/ProductIllustrations';
import { ShieldCheck, Plus, Minus, Trash2, CheckCircle, ArrowLeft } from 'lucide-react';

interface CheckoutProps {
  onNavigate: (page: 'storefront' | 'pdp' | 'auth' | 'checkout') => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ onNavigate }) => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    originalTotal,
    campaignDiscount,
    studentDiscount,
    finalTotal
  } = useCart();
  const { student } = useStudent();
  const { showToast } = useToast();

  // Form states initialized with student data if logged in
  const [fullName, setFullName] = useState(student.fullName || '');
  const [phone, setPhone] = useState(student.phone || '');
  const [email, setEmail] = useState(student.email || '');
  const [studentId, setStudentId] = useState(student.studentId || '');
  const [university, setUniversity] = useState(student.university || '');

  const [shippingType, setShippingType] = useState<'ktx' | 'hub'>('ktx');
  const [address, setAddress] = useState(
    'Phòng 402, KTX Khu B Đại học Quốc Gia, P. Đông Hòa, TP. Dĩ An, Bình Dương'
  );
  const [deliveryNote, setDeliveryNote] = useState('Giao sau 16h chiều em tan tiết học đồ án');

  const fillDemoData = () => {
    setFullName('Nguyễn Hoàng Nam');
    setPhone('0988 123 456');
    setEmail('nam.nh2105@sis.hust.edu.vn');
    setStudentId('20214589');
    setUniversity('Đại học Bách Khoa Hà Nội (HUST)');
    setAddress('Phòng 402, KTX Khu B Đại học Quốc Gia, P. Đông Hòa, TP. Dĩ An, Bình Dương');
    showToast('Đã điền nhanh thông tin sinh viên mẫu!');
  };

  const [paymentMethod, setPaymentMethod] = useState<'installment' | 'vietqr' | 'cod'>('installment');
  const [isOrderedSuccess, setIsOrderedSuccess] = useState(false);

  const formatPrice = (val: number) => val.toLocaleString('vi-VN') + 'đ';

  const monthlyInstallment = Math.round(finalTotal / 12);

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      showToast('Giỏ hàng đang trống!');
      return;
    }
    setIsOrderedSuccess(true);
    showToast('🎉 Đặt hàng thành công! Nhân viên UniGear sẽ gọi bạn trong 15 phút.');
  };

  if (isOrderedSuccess) {
    return (
      <div className="max-w-[700px] w-full mx-auto px-4 py-16 text-center">
        <div className="bg-[var(--card)] border border-[var(--ln)] rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-[var(--ok)]/20 text-[var(--ok)] flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-extrabold text-[var(--tx)]">Đặt Hàng Thành Công!</h1>
          <p className="text-sm text-[var(--mu)] mt-3 max-w-md leading-relaxed">
            Đơn hàng đã được tiếp nhận vào hệ thống UniGear. Kỹ thuật viên sẽ liên hệ và giao máy trực tiếp đến <strong className="text-[var(--tx)]">{address}</strong>.
          </p>

          <div className="mt-8 p-6 rounded-2xl bg-[var(--surface)] border border-[var(--ln)] w-full text-left space-y-3 text-xs">
            <div className="flex justify-between">
              <span className="text-[var(--mu)]">Sinh viên nhận máy:</span>
              <span className="font-bold text-[var(--tx)]">{fullName} (MSSV: {studentId})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--mu)]">Số điện thoại:</span>
              <span className="font-mono-code font-bold text-[var(--tx)]">{phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--mu)]">Phương thức thanh toán:</span>
              <span className="font-semibold text-[var(--warm)]">
                {paymentMethod === 'installment' && 'Trả góp 0% qua CCCD / Thẻ SV'}
                {paymentMethod === 'vietqr' && 'Chuyển khoản VietQR'}
                {paymentMethod === 'cod' && 'Thanh toán COD khi nhận máy tại KTX'}
              </span>
            </div>
            <div className="flex justify-between border-t border-[var(--ln)] pt-3 text-sm">
              <span className="font-bold text-[var(--tx)]">Tổng thanh toán:</span>
              <b className="font-mono-code text-[var(--warm)] text-base">{formatPrice(finalTotal)}</b>
            </div>
          </div>

          <button
            onClick={() => {
              clearCart();
              onNavigate('storefront');
            }}
            className="mt-8 px-8 py-3.5 rounded-full font-bold text-sm bg-[var(--tx)] text-[var(--bg)] hover:bg-[var(--pri)] hover:text-white transition-all cursor-pointer"
          >
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-8 py-6">
      {/* Flow Steps Breadcrumb & Security Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-[var(--ln)] text-xs text-[var(--mu)] font-medium">
        <div className="flex items-center gap-2">
          <button onClick={() => onNavigate('storefront')} className="hover:text-[var(--tx)] cursor-pointer">
            Trang chủ
          </button>
          <span>/</span>
          <span>Giỏ hàng</span>
          <span>/</span>
          <span className="text-[var(--tx)] font-bold">Thanh toán &amp; Đặt hàng (Checkout)</span>
        </div>
        <div className="flex items-center gap-1.5 text-[var(--ok)] font-semibold font-mono-code text-[11px]">
          <span>🔒 Thanh toán bảo mật SSL 256-bit dành cho Sinh viên</span>
        </div>
      </div>

      <form onSubmit={handleConfirmOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pt-8">
        {/* Left Column: 3 Steps Form */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* STEP 1: Thông tin sinh viên */}
          <div className="bg-[var(--card)] border border-[var(--ln)] rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[var(--pri)] text-white text-xs font-bold font-mono-code flex items-center justify-center">
                  1
                </span>
                <h2 className="text-lg font-bold text-[var(--tx)]">Thông tin sinh viên</h2>
              </div>
              <button
                type="button"
                onClick={fillDemoData}
                className="text-xs font-medium text-[var(--warm)] hover:underline cursor-pointer"
              >
                ⚡ Điền thông tin mẫu để test
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
                  placeholder="Nguyễn Văn A"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--mu)] block mb-1">
                  Số điện thoại liên hệ *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--ln)] text-xs sm:text-sm text-[var(--tx)] focus:border-[var(--pri)] outline-none font-mono-code"
                  placeholder="09xx xxx xxx"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--mu)] block mb-1">
                  Email trường (@edu.vn) *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--ln)] text-xs sm:text-sm text-[var(--tx)] focus:border-[var(--pri)] outline-none font-mono-code"
                  placeholder="nam.nh21@sis.hust.edu.vn"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--mu)] block mb-1">
                  Mã số sinh viên (MSSV) *
                </label>
                <input
                  type="text"
                  required
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--ln)] text-xs sm:text-sm text-[var(--tx)] focus:border-[var(--pri)] outline-none font-mono-code"
                  placeholder="20214589"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-[var(--mu)] block mb-1">
                  Trường Đại học / Học viện *
                </label>
                <input
                  type="text"
                  required
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--ln)] text-xs sm:text-sm text-[var(--tx)] focus:border-[var(--pri)] outline-none"
                  placeholder="Tên trường ĐH bạn đang theo học"
                />
              </div>
            </div>
          </div>

          {/* STEP 2: Địa chỉ nhận máy */}
          <div className="bg-[var(--card)] border border-[var(--ln)] rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-7 h-7 rounded-full bg-[var(--pri)] text-white text-xs font-bold font-mono-code flex items-center justify-center">
                2
              </span>
              <h2 className="text-lg font-bold text-[var(--tx)]">Địa chỉ nhận máy</h2>
            </div>

            <div className="space-y-3 mb-5">
              <label
                onClick={() => setShippingType('ktx')}
                className={`p-4 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                  shippingType === 'ktx'
                    ? 'border-[var(--pri)] bg-[var(--pri)]/10 ring-2 ring-[var(--pri)]/20'
                    : 'border-[var(--ln)] bg-[var(--surface)] hover:border-[var(--tx)]'
                }`}
              >
                <input
                  type="radio"
                  name="shipping_type"
                  checked={shippingType === 'ktx'}
                  onChange={() => setShippingType('ktx')}
                  className="mt-1"
                />
                <div>
                  <b className="text-xs sm:text-sm text-[var(--tx)] block font-bold">
                    Giao tận phòng KTX / Nhà trọ sinh viên (Miễn phí)
                  </b>
                  <span className="text-[11px] sm:text-xs text-[var(--mu)] mt-0.5 block">
                    Kỹ thuật viên giao máy, hỗ trợ cài win/bộ đồ án IT tận phòng trong 2 giờ.
                  </span>
                </div>
              </label>

              <label
                onClick={() => setShippingType('hub')}
                className={`p-4 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                  shippingType === 'hub'
                    ? 'border-[var(--pri)] bg-[var(--pri)]/10 ring-2 ring-[var(--pri)]/20'
                    : 'border-[var(--ln)] bg-[var(--surface)] hover:border-[var(--tx)]'
                }`}
              >
                <input
                  type="radio"
                  name="shipping_type"
                  checked={shippingType === 'hub'}
                  onChange={() => setShippingType('hub')}
                  className="mt-1"
                />
                <div>
                  <b className="text-xs sm:text-sm text-[var(--tx)] block font-bold">
                    Nhận tại Campus Hub sinh viên UniGear
                  </b>
                  <span className="text-[11px] sm:text-xs text-[var(--mu)] mt-0.5 block">
                    Trải nghiệm máy tại quầy hỗ trợ khuôn viên trường, nhận quà tặng túi chống sốc.
                  </span>
                </div>
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[var(--mu)] block mb-1">
                  Địa chỉ nhận hàng chi tiết *
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--ln)] text-xs sm:text-sm text-[var(--tx)] focus:border-[var(--pri)] outline-none"
                  placeholder="Phòng 402, KTX Khu B ĐHQG, P. Đông Hòa, TP. Dĩ An"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--mu)] block mb-1">
                  Ghi chú thời gian giao (Tiết học/Giảng đường)
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

          {/* STEP 3: Hình thức thanh toán sinh viên */}
          <div className="bg-[var(--card)] border border-[var(--ln)] rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-7 h-7 rounded-full bg-[var(--pri)] text-white text-xs font-bold font-mono-code flex items-center justify-center">
                3
              </span>
              <h2 className="text-lg font-bold text-[var(--tx)]">Hình thức thanh toán sinh viên</h2>
            </div>

            <div className="space-y-3">
              <label
                onClick={() => setPaymentMethod('installment')}
                className={`p-4 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'installment'
                    ? 'border-[var(--pri)] bg-[var(--pri)]/10 ring-2 ring-[var(--pri)]/20'
                    : 'border-[var(--ln)] bg-[var(--surface)] hover:border-[var(--tx)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment_method"
                    checked={paymentMethod === 'installment'}
                    onChange={() => setPaymentMethod('installment')}
                  />
                  <div>
                    <b className="text-xs sm:text-sm text-[var(--tx)] block font-bold">
                      Trả góp 0% sinh viên qua CCCD/Thẻ SV
                    </b>
                    <span className="text-[11px] text-[var(--ok)] font-semibold">
                      Không cần thẻ tín dụng · Xét duyệt 5 phút
                    </span>
                  </div>
                </div>
                <span className="font-mono-code font-bold text-xs sm:text-sm text-[var(--warm)]">
                  {formatPrice(monthlyInstallment)}/tháng
                </span>
              </label>

              <label
                onClick={() => setPaymentMethod('vietqr')}
                className={`p-4 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'vietqr'
                    ? 'border-[var(--pri)] bg-[var(--pri)]/10 ring-2 ring-[var(--pri)]/20'
                    : 'border-[var(--ln)] bg-[var(--surface)] hover:border-[var(--tx)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment_method"
                    checked={paymentMethod === 'vietqr'}
                    onChange={() => setPaymentMethod('vietqr')}
                  />
                  <div>
                    <b className="text-xs sm:text-sm text-[var(--tx)] block font-bold">
                      Chuyển khoản QR Sinh viên VietQR
                    </b>
                    <span className="text-[11px] text-[var(--mu)]">
                      Quét QR qua ứng dụng ngân hàng bất kỳ
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-bold bg-[var(--ok)]/15 text-[var(--ok)] px-2.5 py-1 rounded-full">
                  Giảm thêm 20k
                </span>
              </label>

              <label
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-[var(--pri)] bg-[var(--pri)]/10 ring-2 ring-[var(--pri)]/20'
                    : 'border-[var(--ln)] bg-[var(--surface)] hover:border-[var(--tx)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment_method"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                  />
                  <div>
                    <b className="text-xs sm:text-sm text-[var(--tx)] block font-bold">
                      Thanh toán khi nhận hàng (COD)
                    </b>
                    <span className="text-[11px] text-[var(--mu)]">
                      Được bóc seal kiểm tra máy trước khi thanh toán
                    </span>
                  </div>
                </div>
                <span className="text-xs text-[var(--mu)] font-medium">Tiền mặt / Thẻ</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary Sidebar (Sticky) */}
        <div className="lg:col-span-5">
          <div className="sticky top-20 bg-[var(--card)] border border-[var(--ln)] rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col gap-5">
            <h2 className="text-lg font-bold text-[var(--tx)] pb-4 border-b border-[var(--ln)]">
              Tóm tắt đơn hàng
            </h2>

            {/* Items List */}
            {items.length === 0 ? (
              <div className="py-8 text-center text-xs text-[var(--mu)]">
                Giỏ hàng trống. Hãy chọn sản phẩm từ cửa hàng!
              </div>
            ) : (
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
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
                        <div className="text-[11px] text-[var(--mu)] truncate">
                          {cfg ? cfg.label : ''} · {color ? color.name : ''}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="w-5 h-5 rounded-md bg-[var(--surface)] border border-[var(--ln)] flex items-center justify-center text-[var(--tx)] hover:bg-[var(--card)]"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="text-xs font-mono-code font-semibold text-[var(--tx)]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            className="w-5 h-5 rounded-md bg-[var(--surface)] border border-[var(--ln)] flex items-center justify-center text-[var(--tx)] hover:bg-[var(--card)]"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-[var(--mu)] hover:text-red-400 p-1 cursor-pointer"
                        title="Xóa sản phẩm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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
                <span>Giảm giá shock mùa tựu trường:</span>
                <span className="font-mono-code">-{formatPrice(campaignDiscount)}</span>
              </div>
              <div className="flex justify-between text-[var(--ok)] font-semibold">
                <span>Ưu đãi độc quyền thẻ SV (-5%):</span>
                <span className="font-mono-code">-{formatPrice(studentDiscount)}</span>
              </div>
              <div className="flex justify-between text-[var(--mu)]">
                <span>Phí giao tận phòng KTX:</span>
                <span className="text-[var(--ok)] font-bold">Miễn phí (0đ)</span>
              </div>
            </div>

            {/* Grand Total */}
            <div>
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-sm text-[var(--tx)]">Tổng thanh toán:</span>
                <b className="font-mono-code text-2xl font-extrabold text-[var(--warm)]">
                  {formatPrice(finalTotal)}
                </b>
              </div>
              <div className="text-right text-[11px] text-[var(--mu)] mt-1">
                Hoặc chỉ <b className="text-[var(--ok)] font-mono-code">{formatPrice(monthlyInstallment)}/tháng</b> với gói góp 0%
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={items.length === 0}
              className="w-full py-4 rounded-full font-bold text-sm bg-[var(--warm)] text-[#1A0F08] hover:opacity-90 transition-all shadow-lg cursor-pointer mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Xác nhận Đặt hàng &amp; Nhận máy tại KTX
            </button>

            {/* Policy Note */}
            <div className="p-3.5 rounded-2xl bg-[var(--surface)] border border-[var(--ln)] flex items-center gap-3 text-xs">
              <ShieldCheck className="w-5 h-5 text-[var(--pri-h)] flex-shrink-0" />
              <div>
                <b className="text-[var(--tx)] block text-[11px]">Bảo hành chính hãng 12 tháng 1 đổi 1</b>
                <span className="text-[10px] text-[var(--mu)]">
                  Hỗ trợ kỹ thuật viên nhận máy tận phòng KTX/trọ miễn phí.
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
