import React from 'react';
import { CheckCircle2, Clock, MapPin, Printer, ArrowRight, Utensils, Phone, Check } from 'lucide-react';
import { Order } from '../types';

interface OrderConfirmationModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  isOpen,
  onClose
}) => {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Top Decorative Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800 p-6 text-white text-center relative">
          <div className="w-16 h-16 rounded-2xl bg-white text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-md shadow-emerald-950/20">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="text-xs uppercase tracking-widest text-emerald-200 font-bold">
            Order Confirmed & Sent to Kitchen
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-extrabold mt-1">
            Thank You, {order.customer.name}!
          </h3>
          <p className="text-xs text-emerald-100 mt-1">
            Your authentic meal is now being lovingly prepared by our chefs in Kolar.
          </p>

          <div className="mt-4 inline-block bg-black/25 px-4 py-1.5 rounded-full border border-white/20 text-xs font-mono font-bold tracking-wider">
            Order ID: {order.id}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Estimated Delivery Time */}
          <div className="flex items-center justify-between p-4 bg-orange-50/80 rounded-2xl border border-orange-200/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-stone-500 font-semibold block">
                  Estimated Delivery Time
                </span>
                <span className="text-base font-bold text-stone-900">
                  {order.estimatedDeliveryTimeMinutes} Minutes
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-bold uppercase tracking-wider text-orange-700 bg-orange-100 px-2 py-1 rounded-md">
                Status: {order.status}
              </span>
            </div>
          </div>

          {/* Simple Progress Steps */}
          <div className="space-y-1">
            <div className="text-xs font-bold text-stone-700 mb-2">Live Order Status:</div>
            <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-semibold">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 flex flex-col items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Received</span>
              </div>
              <div className="p-2 rounded-lg bg-orange-50 text-orange-800 border border-orange-200 flex flex-col items-center gap-1 animate-pulse">
                <Utensils className="w-3.5 h-3.5 text-orange-600" />
                <span>Preparing</span>
              </div>
              <div className="p-2 rounded-lg bg-stone-100 text-stone-400 border border-stone-200 flex flex-col items-center gap-1">
                <span>🛵</span>
                <span>On the Way</span>
              </div>
              <div className="p-2 rounded-lg bg-stone-100 text-stone-400 border border-stone-200 flex flex-col items-center gap-1">
                <span>🏡</span>
                <span>Delivered</span>
              </div>
            </div>
          </div>

          {/* Order Item Details */}
          <div className="space-y-2 border-t border-stone-100 pt-4">
            <div className="text-xs font-bold text-stone-800">Items Ordered:</div>
            <div className="divide-y divide-stone-100 max-h-36 overflow-y-auto pr-1 text-xs">
              {order.items.map(item => (
                <div key={item.id} className="py-2 flex items-center justify-between">
                  <span className="text-stone-700">
                    <strong className="text-stone-900 mr-2">{item.quantity}x</strong> {item.name}
                  </span>
                  <span className="font-semibold text-stone-900">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-stone-200 flex justify-between text-xs font-bold text-stone-900">
              <span>Total Paid via {order.paymentMethod}</span>
              <span className="text-sm text-orange-700">₹{order.totalAmount}</span>
            </div>
          </div>

          {/* Delivery Address Details */}
          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-stone-800">Delivery Address:</span>
                <p className="text-stone-600 mt-0.5">{order.customer.address}</p>
                {order.customer.landmark && (
                  <p className="text-stone-500 text-[11px]">Landmark: {order.customer.landmark}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1 border-t border-stone-200/60 mt-2">
              <Phone className="w-3.5 h-3.5 text-stone-400" />
              <span className="text-stone-600">Contact: {order.customer.phone}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto flex-1 py-3 px-4 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-stone-500" />
              <span>Print Receipt</span>
            </button>

            <button
              onClick={onClose}
              className="w-full sm:w-auto flex-1 py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Back to Home</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
