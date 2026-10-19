import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '../types';
import { PRODUCTS } from '../data/products';
import { useStudent } from './StudentContext';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, configId?: string, colorId?: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  totalCount: number;
  originalTotal: number;
  campaignDiscount: number;
  studentDiscount: number;
  finalTotal: number;
}

export const getCartItemId = (productId: string, configId: string, colorId: string) =>
  `${productId}::${configId}::${colorId}`;

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { student } = useStudent();

  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('unigear_cart');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map((item: any) => ({
            ...item,
            cartItemId:
              item.cartItemId ||
              getCartItemId(
                item.product?.id || 'unknown',
                item.selectedConfigId || 'default',
                item.selectedColorId || 'default'
              )
          }));
        }
      } catch {
        // fallback
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('unigear_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (
    product: Product,
    configId?: string,
    colorId?: string,
    quantity = 1
  ) => {
    const targetConfigId = configId || product.configurations[0]?.id || 'default';
    const targetColorId = colorId || product.colors[0]?.id || 'default';
    const cartItemId = getCartItemId(product.id, targetConfigId, targetColorId);

    setItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.cartItemId === cartItemId);

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + quantity
        };
        return next;
      }

      return [
        ...prev,
        {
          cartItemId,
          product,
          selectedConfigId: targetConfigId,
          selectedColorId: targetColorId,
          quantity
        }
      ];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((acc, it) => acc + it.quantity, 0);

  // Price calculations
  const originalTotal = items.reduce((acc, it) => {
    const cfg = it.product.configurations.find((c) => c.id === it.selectedConfigId);
    const price = it.product.oldPrice || (cfg ? cfg.price : it.product.price);
    return acc + price * it.quantity;
  }, 0);

  // Campaign discount: difference between oldPrice and regular price
  const campaignDiscount = items.reduce((acc, it) => {
    const cfg = it.product.configurations.find((c) => c.id === it.selectedConfigId);
    const basePrice = cfg ? cfg.price : it.product.price;
    const old = it.product.oldPrice;
    if (old && old > basePrice) {
      return acc + (old - basePrice) * it.quantity;
    }
    return acc;
  }, 0);

  // Student 5% discount (applied on basePrice)
  const studentDiscount = student.isVerified
    ? items.reduce((acc, it) => {
        const cfg = it.product.configurations.find((c) => c.id === it.selectedConfigId);
        const basePrice = cfg ? cfg.price : it.product.price;
        return acc + Math.round(basePrice * 0.05) * it.quantity;
      }, 0)
    : 0;

  const finalTotal = originalTotal - campaignDiscount - studentDiscount;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        originalTotal,
        campaignDiscount,
        studentDiscount,
        finalTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
