import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[60vh] w-full flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-[var(--card)] border border-[var(--ln)] rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[var(--warm)]/15 text-[var(--warm)] flex items-center justify-center mb-5">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-[var(--tx)] tracking-tight">
              Đã có lỗi nhỏ xảy ra
            </h2>
            <p className="text-xs sm:text-sm text-[var(--mu)] mt-2 leading-relaxed">
              Trang web gặp sự cố ngoài dự kiến trong lúc kết xuất giao diện. Hãy thử làm mới lại trang hoặc quay về trang chủ UniGear.
            </p>

            {this.state.error && (
              <div className="mt-4 p-3 rounded-xl bg-[var(--surface)] border border-[var(--ln)] text-[11px] font-mono-code text-[var(--mu)] text-left w-full max-h-24 overflow-y-auto break-all">
                {this.state.error.message}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 w-full mt-6">
              <button
                type="button"
                onClick={this.handleReload}
                className="flex-1 py-3 px-4 rounded-full font-bold text-xs bg-[var(--tx)] text-[var(--bg)] hover:bg-[var(--pri)] hover:text-white transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Tải lại trang</span>
              </button>
              <button
                type="button"
                onClick={this.handleGoHome}
                className="py-3 px-4 rounded-full font-semibold text-xs border border-[var(--ln)] bg-[var(--surface)] text-[var(--tx)] hover:border-[var(--tx)] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Về trang chủ</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
