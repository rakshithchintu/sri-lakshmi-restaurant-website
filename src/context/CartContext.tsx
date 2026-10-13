import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { CartItem, MenuItem } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CART_STORAGE_KEY = 'slr_cart_items_v1';
const COUPON_STORAGE_KEY = 'slr_cart_coupon_v1';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(() => {
    try {
      return localStorage.getItem(COUPON_STORAGE_KEY) || null;
    } catch {
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
      console.error('Failed to save cart to localStorage', err);
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, appliedCoupon);
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [appliedCoupon]);

  const addToCart = (item: MenuItem, quantity = 1) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(ci => ci.id === item.id);
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex] = {
          ...copy[existingIndex],
          quantity: copy[existingIndex].quantity + quantity
        };
        return copy;
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity,
          isVeg: item.isVeg,
          image: item.image,
          category: item.category
        }
      ];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(ci => ci.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(ci => {
          if (ci.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter((ci): ci is CartItem => ci !== null);
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const itemCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  // Delivery fee: Free for orders over ₹300, else ₹25
  const deliveryFee = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal >= 300 ? 0 : 25;
  }, [subtotal]);

  // Taxes (5% GST for restaurants)
  const tax = useMemo(() => {
    if (subtotal === 0) return 0;
    return Math.round(subtotal * 0.05);
  }, [subtotal]);

  // Discount calculation
  const discount = useMemo(() => {
    if (!appliedCoupon || subtotal === 0) return 0;
    const code = appliedCoupon.trim().toUpperCase();

    if (code === 'WELCOME50') {
      return subtotal >= 150 ? 50 : 0;
    }
    if (code === 'FEAST15') {
      return Math.min(100, Math.round(subtotal * 0.15));
    }
    if (code === 'KOLARSPECIAL') {
      return Math.round(subtotal * 0.10);
    }
    return 0;
  }, [appliedCoupon, subtotal]);

  const applyCoupon = (rawCode: string) => {
    const code = rawCode.trim().toUpperCase();
    if (!code) {
      return { success: false, message: 'Please enter a coupon code' };
    }
    if (subtotal === 0) {
      return { success: false, message: 'Add items to cart before applying coupon' };
    }

    if (code === 'WELCOME50') {
      if (subtotal < 150) {
        return { success: false, message: 'WELCOME50 requires minimum order value of ₹150' };
      }
      setAppliedCoupon('WELCOME50');
      return { success: true, message: '🎉 WELCOME50 applied! ₹50 off.' };
    }

    if (code === 'FEAST15') {
      setAppliedCoupon('FEAST15');
      return { success: true, message: '🎉 FEAST15 applied! 15% discount applied.' };
    }

    if (code === 'KOLARSPECIAL') {
      setAppliedCoupon('KOLARSPECIAL');
      return { success: true, message: '🎉 KOLARSPECIAL applied! 10% discount applied.' };
    }

    return { success: false, message: 'Invalid coupon code. Try WELCOME50 or FEAST15' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const total = useMemo(() => {
    if (subtotal === 0) return 0;
    return Math.max(0, subtotal + deliveryFee + tax - discount);
  }, [subtotal, deliveryFee, tax, discount]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        deliveryFee,
        tax,
        discount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        total,
        isCartOpen,
        setIsCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
