import React, { useState } from 'react';
import { X, CheckCircle2, MapPin, Phone, User, Banknote, ShieldAlert, AlertCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import { Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: Order) => void;
}

const KOLAR_AREAS = [
  'Clock Tower & Main Bazar',
  'Doomlight Circle',
  'Gulpet',
  'Robertsonpet Area',
  'Bangarpet Road',
  'Tamaka (Medical College / University)',
  'Galpet',
  'Keelu Kote',
  'Gandhinagar',
  'Karanjikatte'
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onOrderSuccess }) => {
  const { cart, subtotal, deliveryFee, tax, discount, appliedCoupon, total, clearCart } = useCart();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [selectedArea, setSelectedArea] = useState(KOLAR_AREAS[0]);
  const [landmark, setLandmark] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'UPI / Online (On Delivery)'>('Cash on Delivery');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Form validations
    if (!name.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number');
      return;
    }

    if (!address.trim()) {
      setErrorMessage('Please enter your street address / house number in Kolar');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        items: cart.map(i => ({
          id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          isVeg: i.isVeg,
          image: i.image
        })),
        customer: {
          name: name.trim(),
          phone: `+91 ${cleanPhone.slice(-10)}`,
          address: `${address.trim()}, ${selectedArea}, Kolar`,
          landmark: landmark.trim() || undefined,
          notes: notes.trim() || undefined
        },
        subtotal,
        deliveryFee,
        tax,
        discount,
        couponCode: appliedCoupon || undefined,
        totalAmount: total,
        paymentMethod
      };

      const placedOrder = await api.placeOrder(orderPayload);
      clearCart();
      setIsSubmitting(false);
      onOrderSuccess(placedOrder);
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(err.message || 'Failed to submit order. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-orange-600 to-amber-700 text-white flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-200">
              Sri Lakshmi Family Restaurant · Kolar
            </span>
            <h3 className="font-serif text-2xl font-bold leading-tight">Complete Your Order</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-8 space-y-6">
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Customer details */}
            <div className="space-y-4">
              <h4 className="font-serif text-base font-bold text-stone-900 border-b border-stone-100 pb-2">
                1. Delivery Information
              </h4>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Ramesh Gowda"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Contact Mobile Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="e.g. 9845012345"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Kolar Area / Locality *
                </label>
                <select
                  value={selectedArea}
                  onChange={e => setSelectedArea(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white cursor-pointer"
                >
                  {KOLAR_AREAS.map(area => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  House / Flat / Street Address *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <textarea
                    rows={2}
                    required
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="e.g. #14, 2nd Main Road, Near Old Bus Stand"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white resize-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Landmark (Optional)
                </label>
                <input
                  type="text"
                  value={landmark}
                  onChange={e => setLandmark(e.target.value)}
                  placeholder="e.g. Opposite Canara Bank ATM"
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Special Cooking / Delivery Notes
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="e.g. Please send extra coconut chutney & pack spicy"
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white"
                />
              </div>
            </div>

            {/* Right Column: Order summary and payment */}
            <div className="space-y-4 flex flex-col justify-between">
              <div>
                <h4 className="font-serif text-base font-bold text-stone-900 border-b border-stone-100 pb-2">
                  2. Order Summary
                </h4>

                {/* Items preview list */}
                <div className="max-h-40 overflow-y-auto my-3 divide-y divide-stone-100 pr-1 text-xs">
                  {cart.map(item => (
                    <div key={item.id} className="py-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-stone-700">{item.quantity}x</span>
                        <span className="text-stone-800">{item.name}</span>
                      </div>
                      <span className="font-bold text-stone-900">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Bill details */}
                <div className="bg-stone-50 p-3.5 rounded-xl text-xs space-y-1.5 border border-stone-200/80">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Town Delivery (Kolar)</span>
                    <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>GST (5%)</span>
                    <span>₹{tax}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Promo Discount ({appliedCoupon})</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-sm text-stone-900">
                    <span>Amount Payable</span>
                    <span className="text-orange-700">₹{total}</span>
                  </div>
                </div>

                {/* Payment Option */}
                <div className="mt-4 space-y-2">
                  <label className="block text-xs font-bold text-stone-700">
                    3. Payment Method (Sample Options)
                  </label>

                  {/* Cash on Delivery option as requested */}
                  <div
                    onClick={() => setPaymentMethod('Cash on Delivery')}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'Cash on Delivery'
                        ? 'border-orange-500 bg-orange-50/70 text-orange-900 font-semibold'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Banknote className="w-5 h-5 text-emerald-600" />
                      <div>
                        <div className="text-xs font-bold">Cash on Delivery (COD)</div>
                        <div className="text-[11px] text-stone-500">Pay cash upon meal arrival at your door</div>
                      </div>
                    </div>
                    {paymentMethod === 'Cash on Delivery' && (
                      <CheckCircle2 className="w-4 h-4 text-orange-600" />
                    )}
                  </div>

                  {/* UPI / QR option */}
                  <div
                    onClick={() => setPaymentMethod('UPI / Online (On Delivery)')}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'UPI / Online (On Delivery)'
                        ? 'border-orange-500 bg-orange-50/70 text-orange-900 font-semibold'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm">📱</span>
                      <div>
                        <div className="text-xs font-bold">UPI Scan & Pay on Delivery</div>
                        <div className="text-[11px] text-stone-500">Google Pay, PhonePe, Paytm QR scanner</div>
                      </div>
                    </div>
                    {paymentMethod === 'UPI / Online (On Delivery)' && (
                      <CheckCircle2 className="w-4 h-4 text-orange-600" />
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || cart.length === 0}
                  className="w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 disabled:bg-stone-400 text-white font-bold text-sm shadow-lg shadow-orange-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  {isSubmitting ? (
                    <span>Placing Order with Kitchen...</span>
                  ) : (
                    <span>Confirm Order · Pay ₹{total}</span>
                  )}
                </button>
                <p className="text-[11px] text-stone-400 text-center mt-2">
                  Orders freshly prepared by Sri Lakshmi Family Restaurant kitchen.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
