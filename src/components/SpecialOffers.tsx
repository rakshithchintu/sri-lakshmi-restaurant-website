import React, { useState } from 'react';
import { Tag, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface SpecialOffersProps {
  onOrderSpecial: () => void;
}

export const SpecialOffers: React.FC<SpecialOffersProps> = ({ onOrderSpecial }) => {
  const { applyCoupon, appliedCoupon } = useCart();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const offers = [
    {
      code: 'WELCOME50',
      title: 'Flat ₹50 OFF on First Order',
      desc: 'Applicable on any order above ₹150. Valid on all South & North Indian dishes.',
      bgGradient: 'from-orange-600 to-amber-700',
      textColor: 'text-amber-100',
      badge: 'New Customers',
    },
    {
      code: 'FEAST15',
      title: '15% Weekend Biryani Feast',
      desc: 'Save 15% (up to ₹100) on our Biryani Specials: Chicken, Mutton & Veg Dum.',
      bgGradient: 'from-amber-800 to-stone-900',
      textColor: 'text-orange-200',
      badge: 'Bestseller Offer',
    },
    {
      code: 'KOLARSPECIAL',
      title: '10% Family Dinner Savings',
      desc: 'Order family meals and get 10% instant off on your entire food bill.',
      bgGradient: 'from-[#431407] to-orange-800',
      textColor: 'text-amber-100',
      badge: 'Family Special',
    }
  ];

  const handleApply = (code: string) => {
    const res = applyCoupon(code);
    setToastMessage(res.message);
    setCopiedCode(code);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  return (
    <section id="offers-section" className="py-12 bg-white border-y border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-700 mb-1">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span>Great Food, Better Prices</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#24140D]">
              Today’s Special Offers & Coupons
            </h2>
          </div>
          <button
            onClick={onOrderSpecial}
            className="inline-flex items-center gap-2 text-sm font-bold text-orange-700 hover:text-orange-800 cursor-pointer group"
          >
            <span>Explore full menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="mb-6 p-3.5 bg-orange-50 border border-orange-200 text-orange-900 rounded-xl text-sm font-semibold flex items-center justify-between shadow-xs animate-fade-in">
            <span>{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="text-xs text-orange-700 font-bold underline ml-3"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Offer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map(offer => {
            const isApplied = appliedCoupon === offer.code;

            return (
              <div
                key={offer.code}
                className={`relative rounded-2xl p-6 bg-gradient-to-br ${offer.bgGradient} text-white shadow-lg shadow-orange-950/10 flex flex-col justify-between overflow-hidden transition-transform hover:-translate-y-1`}
              >
                {/* Background decorative circles */}
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-white/15 backdrop-blur-xs text-amber-200">
                      {offer.badge}
                    </span>
                    <Tag className="w-4 h-4 text-amber-300" />
                  </div>

                  <h3 className="font-serif text-xl font-bold leading-snug mb-2">
                    {offer.title}
                  </h3>
                  <p className={`text-xs ${offer.textColor} leading-relaxed mb-6`}>
                    {offer.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/15 flex items-center justify-between gap-3">
                  <div className="bg-black/30 border border-dashed border-white/40 px-3 py-1.5 rounded-lg">
                    <span className="font-mono text-xs font-bold tracking-widest text-white">
                      {offer.code}
                    </span>
                  </div>

                  <button
                    onClick={() => handleApply(offer.code)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isApplied
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'bg-white text-stone-900 hover:bg-amber-100 shadow-sm'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Applied</span>
                      </>
                    ) : (
                      <span>Apply Code</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
