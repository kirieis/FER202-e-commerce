'use client';

import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { StudentProvider } from '@/context/StudentContext';
import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from '@/context/ToastContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <StudentProvider>
        <CartProvider>
          <ToastProvider>{children}</ToastProvider>
        </CartProvider>
      </StudentProvider>
    </ThemeProvider>
  );
}
