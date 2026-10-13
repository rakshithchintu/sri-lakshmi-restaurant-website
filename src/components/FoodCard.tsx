import React from 'react';
import { Plus, Minus, Check, Clock } from 'lucide-react';
import { MenuItem } from '../types';
import { useCart } from '../context/CartContext';

interface FoodCardProps {
  item: MenuItem;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
  const { cart, addToCart, updateQuantity } = useCart();

  const cartItem = cart.find(ci => ci.id === item.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-orange-100/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group h-full">
      {/* Image and Badges */}
      <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Veg / Non-Veg Indicator Badge */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs p-1.5 rounded-lg shadow-sm flex items-center gap-1.5">
          <div
            className={`w-3.5 h-3.5 border flex items-center justify-center ${
              item.isVeg ? 'border-emerald-600' : 'border-rose-600'
            }`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${
                item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
              }`}
            />
          </div>
          <span
            className={`text-[10px] font-bold uppercase tracking-wider ${
              item.isVeg ? 'text-emerald-800' : 'text-rose-800'
            }`}
          >
            {item.isVeg ? 'Veg' : 'Non-Veg'}
          </span>
        </div>

        {/* Bestseller Badge */}
        {item.isBestseller && (
          <div className="absolute top-3 right-3 bg-amber-500 text-stone-950 text-[10px] font-extrabold uppercase tracking-wider px-2 py-1 rounded-md shadow-sm">
            Bestseller
          </div>
        )}

        {/* Prep Time pill */}
        {item.prepTimeMinutes && (
          <div className="absolute bottom-2.5 right-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
            <Clock className="w-3 h-3 text-orange-300" />
            <span>{item.prepTimeMinutes}m</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Category */}
          <div className="text-[11px] font-bold uppercase tracking-wider text-orange-700/80 mb-1">
            {item.category}
          </div>

          {/* Item Name */}
          <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-orange-700 transition-colors leading-snug">
            {item.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-stone-500 mt-1.5 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Footer: Price & Cart Button */}
        <div className="pt-4 mt-3 border-t border-orange-50 flex items-center justify-between gap-2">
          <div>
            <span className="text-xs text-stone-400 block font-medium">Price</span>
            <span className="text-lg font-bold text-stone-900">₹{item.price}</span>
          </div>

          {/* Interactive Button */}
          {quantityInCart > 0 ? (
            <div className="flex items-center gap-2 bg-orange-50 border border-orange-300 rounded-xl px-2 py-1">
              <button
                onClick={() => updateQuantity(item.id, -1)}
                className="w-7 h-7 rounded-lg bg-white text-orange-700 hover:bg-orange-600 hover:text-white transition-colors flex items-center justify-center shadow-xs cursor-pointer"
                aria-label={`Decrease quantity of ${item.name}`}
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-5 text-center text-xs font-bold text-stone-900">
                {quantityInCart}
              </span>
              <button
                onClick={() => updateQuantity(item.id, 1)}
                className="w-7 h-7 rounded-lg bg-orange-600 text-white hover:bg-orange-700 transition-colors flex items-center justify-center shadow-xs cursor-pointer"
                aria-label={`Increase quantity of ${item.name}`}
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(item, 1)}
              className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all shadow-sm hover:shadow-md shadow-orange-600/20 flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
