import React from 'react';
import { ArrowRight, Star, Clock, Sparkles, Award } from 'lucide-react';

interface HeroProps {
  onOrderNow: () => void;
  onViewOffers: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderNow, onViewOffers }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/80 via-[#FAF5EF] to-[#FAF5EF] py-12 md:py-20">
      {/* Decorative background aura */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-orange-300/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Welcome Message & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Welcome Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold tracking-wide uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>Welcome to Sri Lakshmi Family Restaurant · Kolar</span>
            </div>

            {/* Main Required Heading */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#24140D] tracking-tight leading-[1.12]">
              Delicious Food, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-700 to-orange-800">
                Made with Love
              </span>
            </h1>

            {/* Description */}
            <p className="text-stone-600 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Serving the authentic heritage flavors of Karnataka for over two decades.
              From our legendary ghee roast Masala Dosas to royal Dum Biryanis and zesty wok specialties,
              every meal is freshly prepared using hand-ground spices and pure ingredients.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOrderNow}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-base shadow-lg shadow-orange-600/30 hover:shadow-orange-600/40 transition-all flex items-center justify-center gap-3 cursor-pointer group active:scale-95"
              >
                <span>Order Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onViewOffers}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white hover:bg-orange-50/80 text-orange-950 font-semibold text-base border border-orange-200 shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>View Special Offers</span>
              </button>
            </div>

            {/* Trust & Service Highlights */}
            <div className="pt-6 grid grid-cols-3 gap-3 border-t border-orange-200/60 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-1 text-amber-500 font-bold text-lg">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <span className="text-stone-900">4.8</span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">2,400+ Kolar Reviews</p>
              </div>

              <div className="text-center lg:text-left border-x border-orange-200/60 px-2">
                <div className="flex items-center justify-center lg:justify-start gap-1 text-orange-600 font-bold text-lg">
                  <Clock className="w-4 h-4" />
                  <span className="text-stone-900">30 Min</span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">Fast Local Delivery</p>
              </div>

              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-1 text-emerald-600 font-bold text-lg">
                  <Award className="w-4 h-4" />
                  <span className="text-stone-900">100%</span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">Pure Quality & Taste</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Food Collage */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Large Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/3 group">
                <img
                  src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=900&auto=format&fit=crop&q=80"
                  alt="Sri Lakshmi Signature Biryani & Feasts"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
                    House Speciality
                  </span>
                  <p className="font-serif text-lg font-bold">Royal Dum Chicken Biryani</p>
                  <p className="text-xs text-stone-200">Slow cooked with authentic Seeraga Samba rice & whole spices</p>
                </div>
              </div>

              {/* Floating Mini Card 1: Masala Dosa */}
              <div className="absolute -bottom-6 -left-6 sm:-left-8 bg-white p-3 rounded-2xl shadow-xl border border-orange-100 flex items-center gap-3 max-w-[240px]">
                <img
                  src="https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=200&auto=format&fit=crop&q=80"
                  alt="Crispy Masala Dosa"
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                />
                <div>
                  <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
                    Breakfast Hero
                  </span>
                  <h4 className="text-xs font-bold text-stone-900 leading-tight">Crispy Masala Dosa</h4>
                  <p className="text-xs text-orange-600 font-bold mt-0.5">₹60 only</p>
                </div>
              </div>

              {/* Floating Mini Card 2: Filter Coffee */}
              <div className="absolute -top-6 -right-4 sm:-right-6 bg-white py-2.5 px-3.5 rounded-2xl shadow-xl border border-orange-100 flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                  <span className="text-xl">☕</span>
                </div>
                <div>
                  <span className="text-[10px] text-amber-700 font-bold uppercase">Heritage Brew</span>
                  <p className="text-xs font-bold text-stone-900 leading-tight">Degree Filter Coffee</p>
                  <p className="text-xs text-orange-600 font-bold">₹30</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
