import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { StudentProvider } from './context/StudentContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Storefront } from './pages/Storefront';
import { PageSkeleton } from './components/PageSkeleton';
import { Product } from './types';
import { PRODUCTS } from './data/products';

// Code Splitting with dynamic lazy imports
const ProductDetail = lazy(() =>
  import('./pages/ProductDetail').then((m) => ({ default: m.ProductDetail }))
);
const StudentAuth = lazy(() =>
  import('./pages/StudentAuth').then((m) => ({ default: m.StudentAuth }))
);
const Checkout = lazy(() =>
  import('./pages/Checkout').then((m) => ({ default: m.Checkout }))
);

type Page = 'storefront' | 'pdp' | 'auth' | 'checkout';

export const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('storefront');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Synchronize component state from browser URL pathname
  const syncFromLocation = useCallback(() => {
    const path = window.location.pathname;

    // Route: /san-pham/:id or /product/:id
    const matchProduct = path.match(/^\/(?:san-pham|product)\/([^/]+)/);
    if (matchProduct) {
      const id = matchProduct[1];
      const found = PRODUCTS.find((p) => p.id.toLowerCase() === id.toLowerCase());
      if (found) {
        setSelectedProduct(found);
        setCurrentPage('pdp');
        return;
      }
    }

    // Route: /thanh-toan or /checkout
    if (path === '/thanh-toan' || path === '/checkout') {
      setCurrentPage('checkout');
      return;
    }

    // Route: /xac-thuc or /auth
    if (path === '/xac-thuc' || path === '/auth') {
      setCurrentPage('auth');
      return;
    }

    // Route: /laptop, /tablet, /audio, /accessory
    const matchCat = path.match(/^\/(laptop|tablet|audio|accessory)/);
    if (matchCat) {
      setSelectedCategory(matchCat[1]);
      setCurrentPage('storefront');
      return;
    }

    // Fallback: Storefront
    setCurrentPage('storefront');
  }, []);

  // Listen to browser Back/Forward (popstate)
  useEffect(() => {
    syncFromLocation();
    const handlePopState = () => {
      syncFromLocation();
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [syncFromLocation]);

  const handleNavigate = (page: Page, category?: string) => {
    if (category) {
      setSelectedCategory(category);
    }
    setCurrentPage(page);

    let newUrl = '/';
    if (page === 'pdp' && selectedProduct) {
      newUrl = `/san-pham/${selectedProduct.id}`;
    } else if (page === 'checkout') {
      newUrl = '/thanh-toan';
    } else if (page === 'auth') {
      newUrl = '/xac-thuc';
    } else if (category && category !== 'all') {
      newUrl = `/${category}`;
    }

    if (window.location.pathname !== newUrl) {
      window.history.pushState({ page, category }, '', newUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('pdp');
    const newUrl = `/san-pham/${product.id}`;
    if (window.location.pathname !== newUrl) {
      window.history.pushState({ page: 'pdp', productId: product.id }, '', newUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--tx)] selection:bg-[var(--pri)] selection:text-white transition-colors duration-200">
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />

      <main className="flex-1">
        <Suspense fallback={<PageSkeleton />}>
          {currentPage === 'storefront' && (
            <Storefront
              onSelectProduct={handleSelectProduct}
              onNavigate={handleNavigate}
              initialCategory={selectedCategory}
            />
          )}
          {currentPage === 'pdp' && (
            <ProductDetail
              product={selectedProduct}
              onNavigate={handleNavigate}
            />
          )}
          {currentPage === 'auth' && (
            <StudentAuth
              onNavigate={handleNavigate}
            />
          )}
          {currentPage === 'checkout' && (
            <Checkout
              onNavigate={handleNavigate}
            />
          )}
        </Suspense>
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <StudentProvider>
        <CartProvider>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </CartProvider>
      </StudentProvider>
    </ThemeProvider>
  );
};

export default App;
