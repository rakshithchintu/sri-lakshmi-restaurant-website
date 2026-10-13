import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedToCheckout }) => {
  const {
    cart,
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
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError(null);
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-orange-50/50">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-600 text-white flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900 leading-tight">
                  Your Food Cart
                </h3>
                <span className="text-xs text-stone-500 font-medium">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'} selected
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-white transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-400 mb-2">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-xl font-bold text-stone-900">Your Cart is Empty</h4>
                <p className="text-xs text-stone-500 max-w-xs">
                  Looks like you haven’t added any authentic South or North Indian delicacies yet.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  Browse Delicious Menu
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-stone-500 pb-1">
                  <span>Ordered from Kolar Kitchen</span>
                  <button
                    onClick={clearCart}
                    className="text-stone-400 hover:text-rose-600 transition-colors cursor-pointer flex items-center gap-1 font-medium"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Cart</span>
                  </button>
                </div>

                {cart.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 bg-stone-50/70 rounded-xl border border-stone-200/60"
                  >
                    {/* Item Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover shrink-0"
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <div
                          className={`w-3 h-3 border flex items-center justify-center ${
                            item.isVeg ? 'border-emerald-600' : 'border-rose-600'
                          }`}
                        >
                          <div
                            className={`w-1 h-1 rounded-full ${
                              item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                            }`}
                          />
                        </div>
                        <h4 className="text-xs font-bold text-stone-900 truncate">
                          {item.name}
                        </h4>
                      </div>
                      <div className="text-xs font-bold text-stone-900 mt-1">
                        ₹{item.price * item.quantity}
                        <span className="text-[11px] font-normal text-stone-400 ml-1">
                          (₹{item.price} each)
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1.5 bg-white border border-stone-300 rounded-lg px-1.5 py-0.5">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-5 h-5 flex items-center justify-center text-stone-600 hover:text-orange-600"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-4 text-center text-xs font-bold text-stone-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-5 h-5 flex items-center justify-center text-stone-600 hover:text-orange-600"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-rose-600 p-1 text-xs transition-colors ml-auto"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Free delivery indicator */}
                <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200/60 text-xs">
                  {subtotal >= 300 ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Congratulations! You unlocked FREE town delivery in Kolar.</span>
                    </span>
                  ) : (
                    <span className="text-amber-900">
                      Add items worth <strong>₹{300 - subtotal}</strong> more for{' '}
                      <strong>FREE Delivery</strong> (Order currently ₹{subtotal}).
                    </span>
                  )}
                </div>

                {/* Coupon Code Section */}
                <div className="pt-2">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs">
                      <div>
                        <span className="font-bold text-emerald-800">
                          Coupon '{appliedCoupon}' Applied
                        </span>
                        <p className="text-emerald-700 mt-0.5">You saved ₹{discount}!</p>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-rose-600 hover:underline font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={couponInput}
                            onChange={e => {
                              setCouponInput(e.target.value);
                              setCouponError(null);
                            }}
                            placeholder="Enter promo code (e.g. WELCOME50)"
                            className="w-full pl-8 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl uppercase font-mono tracking-wider focus:outline-none focus:border-orange-500"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-3.5 py-2 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-orange-600 transition-colors cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-[11px] text-rose-600 font-medium">{couponError}</p>
                      )}
                    </form>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer Bill & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50/50 space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="font-semibold text-stone-900">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  {deliveryFee === 0 ? (
                    <span className="font-semibold text-emerald-700">FREE</span>
                  ) : (
                    <span className="font-semibold text-stone-900">₹{deliveryFee}</span>
                  )}
                </div>
                <div className="flex justify-between">
                  <span>Restaurant GST & Taxes (5%)</span>
                  <span className="font-semibold text-stone-900">₹{tax}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-bold text-stone-900">
                  <span>Grand Total</span>
                  <span className="text-base text-orange-700">₹{total}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
