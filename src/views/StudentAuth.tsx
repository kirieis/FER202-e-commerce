'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStudent } from '../context/StudentContext';
import { useToast } from '../context/ToastContext';
import { UploadCloud, CheckCircle2, ShieldCheck, ArrowLeft, Loader2, Sparkles, LogOut } from 'lucide-react';

interface StudentAuthProps {
  onNavigate?: (page: 'storefront' | 'pdp' | 'auth' | 'checkout') => void;
  defaultTab?: 'login' | 'register';
}

const UNIVERSITIES = [
  'Đại học Bách Khoa Hà Nội (HUST)',
  'Đại học Quốc Gia TP.HCM (VNU-HCM)',
  'Đại học Bách Khoa TP.HCM (HCMUT)',
  'Đại học Công nghệ thông tin (UIT)',
  'Đại học Kinh tế Quốc dân (NEU)',
  'Đại học FPT (Hà Nội / TP.HCM / Cần Thơ / Đà Nẵng / Quy Nhơn)',
  'Đại học Ngoại Thương (FTU)',
  'Đại học Khoa học Tự nhiên (HCMUS)',
  'Đại học Sư phạm Kỹ thuật TP.HCM (HCMUTE)'
];

export const StudentAuth: React.FC<StudentAuthProps> = ({ onNavigate, defaultTab = 'register' }) => {
  const router = useRouter();
  const {
    student,
    verifyStudentCard,
    loginStudent,
    loginDemoStudent,
    loginWithGoogle,
    loginWithEmail,
    signUpWithEmail,
    logoutStudent,
  } = useStudent();
  const { showToast } = useToast();

  const handleNav = (page: 'storefront' | 'pdp' | 'auth' | 'checkout') => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      if (page === 'storefront') router.push('/');
      else if (page === 'checkout') router.push('/thanh-toan');
      else if (page === 'auth') router.push('/xac-thuc');
    }
  };

  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Check URL parameters on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('error') === 'auth-failed') {
        setAuthError('Đăng nhập Google không thành công hoặc bị gián đoạn. Vui lòng thử lại.');
      }
    }
  }, []);

  // Form states
  const [loginEmail, setLoginEmail] = useState('nam.nguyen@hust.edu.vn');
  const [loginPassword, setLoginPassword] = useState('password123');

  const [fullName, setFullName] = useState(student.fullName || 'Nguyễn Hoàng Nam');
  const [email, setEmail] = useState(student.email || 'nam.nh2105@sis.hust.edu.vn');
  const [phone, setPhone] = useState(student.phone || '0987 654 321');
  const [university, setUniversity] = useState(student.university || UNIVERSITIES[0]);
  const [studentId, setStudentId] = useState(student.studentId || '20215432');
  const [password, setPassword] = useState('matkhau123');

  // File upload & AI verification simulation
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState(student.isVerified);

  // Revoke object URL on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (uploadedImage) {
        URL.revokeObjectURL(uploadedImage);
      }
    };
  }, [uploadedImage]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (uploadedImage) {
        URL.revokeObjectURL(uploadedImage);
      }
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
      simulateAiVerification();
    }
  };

  const simulateAiVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedSuccess(true);
      showToast('🤖 AI OCR đã nhận diện thành công thẻ sinh viên!');
    }, 1800);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await signUpWithEmail(email, password, {
      fullName,
      phone,
      university,
      studentId,
      idCardImage: uploadedImage || undefined,
    });
    setIsSubmitting(false);

    if (res.error) {
      showToast(`Đăng ký thất bại: ${res.error}`);
    } else {
      showToast('🎉 Đăng ký tài khoản Supabase thành công (-5% toàn sàn)!');
      handleNav('storefront');
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await loginWithEmail(loginEmail, loginPassword);
    setIsSubmitting(false);

    if (res.error) {
      showToast(`Đăng nhập thất bại: ${res.error}`);
    } else {
      showToast('🎉 Chào mừng bạn đã đăng nhập tài khoản sinh viên!');
      handleNav('storefront');
    }
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    showToast('Đang kết nối tới Google OAuth SSO...');
    const res = await loginWithGoogle();
    if (res.error) {
      showToast(`Lỗi xác thực Google: ${res.error}`);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1240px] w-full mx-auto px-4 sm:px-8 py-8 flex flex-col items-center">
      {/* Top Back Button */}
      <div className="w-full max-w-lg flex justify-start mb-6">
        <button
          onClick={() => handleNav('storefront')}
          className="flex items-center gap-1.5 text-xs font-semibold text-[var(--mu)] hover:text-[var(--tx)] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về cửa hàng UniGear</span>
        </button>
      </div>

      {/* Main Auth Container */}
      <div className="w-full max-w-lg bg-[var(--card)] border border-[var(--ln)] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[var(--pri)]/20 blur-3xl pointer-events-none" />

        {student.isVerified ? (
          /* VIEW 0: ALREADY VERIFIED STUDENT PROFILE */
          <div className="flex flex-col items-center text-center py-2">
            <div className="relative mb-4">
              {student.avatarUrl ? (
                <img
                  src={student.avatarUrl}
                  alt={student.fullName || 'Student'}
                  className="w-20 h-20 rounded-full object-cover border-2 border-[var(--ok)] shadow-lg"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-[var(--ok)]/20 text-[var(--ok)] flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8" />
                </div>
              )}
              {student.avatarUrl && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[var(--ok)] text-white flex items-center justify-center border-2 border-[var(--card)] shadow">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
            <h1 className="text-2xl font-extrabold text-[var(--tx)] tracking-tight">
              Thẻ Sinh Viên Đã Kích Hoạt
            </h1>
            <p className="text-xs text-[var(--mu)] mt-1.5 max-w-sm">
              Bạn đang được áp dụng đặc quyền giảm trực tiếp 5% trên mọi đơn hàng công nghệ tại UniGear.
            </p>

            <div className="w-full mt-6 p-5 rounded-2xl bg-[var(--surface)] border border-[var(--ln)] text-left space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[var(--mu)]">Sinh viên:</span>
                <span className="font-bold text-[var(--tx)]">{student.fullName || 'Nguyễn Hoàng Nam'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--mu)]">Email tài khoản:</span>
                <span className="font-mono-code font-bold text-[var(--tx)]">{student.email || 'nam.nh2105@sis.hust.edu.vn'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--mu)]">Mã sinh viên:</span>
                <span className="font-mono-code font-bold text-[var(--tx)]">{student.studentId || '20214589'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--mu)]">Trường:</span>
                <span className="font-medium text-[var(--tx)] truncate max-w-[200px]">{student.university || 'Đại học Bách Khoa Hà Nội'}</span>
              </div>
              <div className="flex justify-between border-t border-[var(--ln)] pt-2.5 text-[var(--ok)] font-semibold">
                <span>Trạng thái:</span>
                <span>✓ Đã xác thực thành công (-5% toàn sàn)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full mt-6">
              <button
                onClick={() => handleNav('storefront')}
                className="flex-1 py-3.5 rounded-full font-bold text-sm bg-[var(--pri)] text-white hover:bg-[var(--pri-h)] transition-all cursor-pointer shadow-md"
              >
                Tiếp tục mua sắm
              </button>
              <button
                onClick={() => {
                  logoutStudent();
                  showToast('Đã đăng xuất tài khoản sinh viên');
                }}
                className="py-3.5 px-6 rounded-full font-semibold text-xs border border-[var(--ln)] bg-[var(--surface)] text-[var(--mu)] hover:text-red-400 hover:border-red-400/40 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Đăng xuất</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Auth Error Notification Banner */}
            {authError && (
              <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center justify-between">
                <span>{authError}</span>
                <button
                  type="button"
                  onClick={() => setAuthError(null)}
                  className="font-bold underline ml-2 cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            )}

            {/* Tab Switcher */}
            <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-[var(--surface)] border border-[var(--ln)] mb-8">
              <button
                onClick={() => setActiveTab('login')}
                className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'login'
                    ? 'bg-[var(--card)] text-[var(--tx)] shadow-sm'
                    : 'text-[var(--mu)] hover:text-[var(--tx)]'
                }`}
              >
                Đăng nhập
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'register'
                    ? 'bg-[var(--card)] text-[var(--tx)] shadow-sm'
                    : 'text-[var(--mu)] hover:text-[var(--tx)]'
                }`}
              >
                Đăng ký Thẻ Sinh Viên
              </button>
            </div>

            {/* VIEW 1: LOGIN */}
            {activeTab === 'login' ? (
              <div>
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-extrabold text-[var(--tx)] tracking-tight">
                    Chào mừng sinh viên trở lại
                  </h1>
                  <p className="text-xs text-[var(--mu)] mt-1.5">
                    Đăng nhập để nhận giá ưu đãi và quản lý đơn hàng
                  </p>
                </div>

                {/* Google SSO Button */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-2xl border border-[var(--ln)] bg-[var(--surface)] hover:border-[var(--pri)] hover:bg-[var(--surface)]/80 text-xs font-bold text-[var(--tx)] flex items-center justify-center gap-3 transition-all cursor-pointer shadow-sm disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin text-[var(--pri)]" />
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" fill="#EA4335" />
                      <path d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" fill="#4285F4" />
                      <path d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z" fill="#FBBC05" />
                      <path d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z" fill="#34A853" />
                    </svg>
                  )}
                  <span>{isSubmitting ? 'Đang chuyển hướng tới Google...' : 'Tiếp tục với Google Sinh Viên (@edu.vn)'}</span>
                </button>

                <div className="flex items-center my-6 text-xs text-[var(--mu)]">
                  <div className="flex-1 border-t border-[var(--ln)]" />
                  <span className="px-3">hoặc tài khoản UniGear</span>
                  <div className="flex-1 border-t border-[var(--ln)]" />
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-[var(--mu)] block mb-1.5">
                      Email hoặc Số điện thoại
                    </label>
                    <input
                      type="text"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-[var(--surface)] border border-[var(--ln)] text-sm text-[var(--tx)] focus:border-[var(--pri)] outline-none"
                      placeholder="nam.nguyen@hust.edu.vn"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5 text-xs">
                      <label className="font-semibold text-[var(--mu)]">Mật khẩu</label>
                      <a href="#" onClick={(e) => { e.preventDefault(); showToast('Tính năng khôi phục mật khẩu sẽ gửi qua email sinh viên!'); }} className="text-[var(--warm)] font-medium">
                        Quên mật khẩu?
                      </a>
                    </div>
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-[var(--surface)] border border-[var(--ln)] text-sm text-[var(--tx)] focus:border-[var(--pri)] outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full font-bold text-sm bg-[var(--tx)] text-[var(--bg)] hover:bg-[var(--pri)] hover:text-white transition-all shadow-md cursor-pointer mt-2"
                  >
                    Đăng nhập tài khoản
                  </button>
                </form>

                {/* Quick Demo Login Button */}
                <div className="mt-5 pt-4 border-t border-[var(--ln)] text-center">
                  <button
                    type="button"
                    onClick={() => {
                      loginDemoStudent();
                      showToast('⚡ Đã đăng nhập nhanh tài khoản mẫu SV Bách Khoa (HUST)!');
                      handleNav('storefront');
                    }}
                    className="text-xs font-semibold text-[var(--warm)] hover:underline inline-flex items-center gap-1.5 cursor-pointer py-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Thử nghiệm nhanh: Đăng nhập mẫu Sinh viên Bách Khoa</span>
                  </button>
                </div>
              </div>
            ) : (
          /* VIEW 2: REGISTER & STUDENT VERIFY */
          <div>
            <div className="text-center mb-6">
              <h1 className="text-2xl font-extrabold text-[var(--tx)] tracking-tight">
                Đăng ký Thẻ Sinh Viên
              </h1>
              <p className="text-xs text-[var(--mu)] mt-1.5">
                Kích hoạt đặc quyền giảm ngay 5% cho toàn bộ đơn hàng
              </p>
            </div>

            {/* Quick Google Sign In for Registration */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isSubmitting}
              className="w-full mb-6 py-3.5 px-4 rounded-2xl border border-[var(--ln)] bg-[var(--surface)] hover:border-[var(--pri)] hover:bg-[var(--surface)]/80 text-xs font-bold text-[var(--tx)] flex items-center justify-center gap-3 transition-all cursor-pointer shadow-sm disabled:opacity-60"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin text-[var(--pri)]" />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" fill="#EA4335" />
                  <path d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" fill="#4285F4" />
                  <path d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z" fill="#FBBC05" />
                  <path d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z" fill="#34A853" />
                </svg>
              )}
              <span>Đăng ký nhanh với Google Sinh Viên (@edu.vn)</span>
            </button>

            <div className="flex items-center mb-6 text-xs text-[var(--mu)]">
              <div className="flex-1 border-t border-[var(--ln)]" />
              <span className="px-3">hoặc điền thông tin bên dưới</span>
              <div className="flex-1 border-t border-[var(--ln)]" />
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[var(--mu)] block mb-1.5">
                  Họ và tên sinh viên
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[var(--surface)] border border-[var(--ln)] text-sm text-[var(--tx)] focus:border-[var(--pri)] outline-none"
                  placeholder="Nguyễn Hoàng Nam"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--mu)] block mb-1.5">
                  Email sinh viên (@edu.vn hoặc trường cấp)
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[var(--surface)] border border-[var(--ln)] text-sm text-[var(--tx)] focus:border-[var(--pri)] outline-none font-mono-code"
                  placeholder="nam.nh2105@sis.hust.edu.vn"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[var(--mu)] block mb-1.5">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[var(--surface)] border border-[var(--ln)] text-sm text-[var(--tx)] focus:border-[var(--pri)] outline-none font-mono-code"
                    placeholder="0987 654 321"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[var(--mu)] block mb-1.5">
                    Mã số sinh viên (MSSV)
                  </label>
                  <input
                    type="text"
                    required
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[var(--surface)] border border-[var(--ln)] text-sm text-[var(--tx)] focus:border-[var(--pri)] outline-none font-mono-code"
                    placeholder="20215432"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--mu)] block mb-1.5">
                  Trường Đại học / Cao đẳng
                </label>
                <select
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[var(--surface)] border border-[var(--ln)] text-sm text-[var(--tx)] focus:border-[var(--pri)] outline-none cursor-pointer"
                >
                  {UNIVERSITIES.map((uni) => (
                    <option key={uni} value={uni} className="bg-[var(--card)] text-[var(--tx)]">
                      {uni}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--mu)] block mb-1.5">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[var(--surface)] border border-[var(--ln)] text-sm text-[var(--tx)] focus:border-[var(--pri)] outline-none"
                  placeholder="••••••••••"
                />
              </div>

              {/* Upload Card Area */}
              <div>
                <label className="text-xs font-semibold text-[var(--mu)] block mb-1.5">
                  Tải lên ảnh Thẻ sinh viên (Mặt trước)
                </label>
                <label className="w-full border-2 border-dashed border-[var(--warm)]/60 bg-[var(--surface)] hover:bg-[var(--card)] rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  {isVerifying ? (
                    <div className="flex flex-col items-center gap-2 text-[var(--pri)]">
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span className="text-xs font-semibold">
                        Hệ thống AI đang quét thông tin thẻ sinh viên...
                      </span>
                    </div>
                  ) : verifiedSuccess ? (
                    <div className="flex flex-col items-center gap-1.5 text-[var(--ok)]">
                      <CheckCircle2 className="w-6 h-6" />
                      <span className="text-xs font-bold">
                        Đã xác thực thành công thẻ sinh viên!
                      </span>
                      <span className="text-xs text-[var(--mu)]">
                        (Đã kích hoạt ưu đãi độc quyền 5%)
                      </span>
                    </div>
                  ) : (
                    <>
                      <UploadCloud className="w-6 h-6 text-[var(--warm)] mb-2" />
                      <span className="text-xs font-bold text-[var(--tx)] block">
                        Chụp hoặc Tải lên ảnh thẻ SV mặt trước
                      </span>
                      <span className="text-xs text-[var(--mu)] mt-0.5">
                        Hệ thống AI duyệt tự động trong 60 giây
                      </span>
                    </>
                  )}
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full font-bold text-sm bg-[var(--pri)] text-white hover:bg-[var(--pri-h)] transition-all shadow-lg cursor-pointer mt-4"
              >
                Kích hoạt Thẻ Sinh Viên ngay
              </button>
            </form>
          </div>
        )}
      </>
    )}

        <div className="mt-6 text-center text-xs text-[var(--mu)]">
          Bằng việc tiếp tục, bạn đồng ý với{' '}
          <Link href="/chinh-sach/bao-mat" className="text-[var(--pri-h)] font-medium underline">
            Điều khoản bảo mật
          </Link>{' '}
          &amp;{' '}
          <Link href="/chinh-sach/dieu-khoan" className="text-[var(--pri-h)] font-medium underline">
            Chính sách thẻ sinh viên
          </Link>{' '}
          của UniGear.
        </div>
      </div>
    </div>
  );
};
