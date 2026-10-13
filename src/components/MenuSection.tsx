import React, { useState, useMemo } from 'react';
import { Search, Filter, Sparkles, RefreshCw } from 'lucide-react';
import { MenuItem, FoodCategory } from '../types';
import { FoodCard } from './FoodCard';

interface MenuSectionProps {
  menuItems: MenuItem[];
  isLoading: boolean;
  onRefresh: () => void;
}

const CATEGORIES: FoodCategory[] = [
  'All',
  'South Indian',
  'North Indian',
  'Biryani',
  'Chinese',
  'Beverages'
];

export const MenuSection: React.FC<MenuSectionProps> = ({ menuItems, isLoading, onRefresh }) => {
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high'>('default');

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      // Category match
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }
      // Diet match
      if (dietFilter === 'veg' && !item.isVeg) return false;
      if (dietFilter === 'non-veg' && item.isVeg) return false;
      // Search match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0;
    });
  }, [menuItems, selectedCategory, dietFilter, searchQuery, sortBy]);

  return (
    <section id="menu-section" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title & Subtitle */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-700 mb-1">
          <Sparkles className="w-4 h-4 text-orange-600" />
          <span>Authentic Kitchen Delights</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#24140D]">
          Our Food Menu
        </h2>
        <p className="text-stone-600 text-sm sm:text-base mt-2.5">
          Handcrafted daily with fragrant spices, pure cow ghee, and recipes perfected through generations in Kolar.
        </p>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-orange-100 shadow-sm mb-8 space-y-4">
        {/* Top Row: Search and Quick Filters */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search dosa, biryani, paneer, coffee..."
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Dietary Buttons (Segmented control) */}
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setDietFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                dietFilter === 'all'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Dishes
            </button>
            <button
              onClick={() => setDietFilter('veg')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                dietFilter === 'veg'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-700 hover:text-emerald-800'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              <span>Pure Veg</span>
            </button>
            <button
              onClick={() => setDietFilter('non-veg')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                dietFilter === 'non-veg'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-rose-700 hover:text-rose-800'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              <span>Non-Veg</span>
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs font-medium text-stone-700 focus:outline-none focus:border-orange-500 cursor-pointer"
            >
              <option value="default">Sort by: Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            <button
              onClick={onRefresh}
              title="Refresh Menu"
              className="p-2 border border-stone-200 rounded-xl hover:bg-stone-50 text-stone-600 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-stone-100">
          {CATEGORIES.map(category => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-orange-600 text-white shadow-sm shadow-orange-600/30'
                    : 'bg-stone-100 hover:bg-orange-50 text-stone-700 hover:text-orange-800'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Food Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-orange-200 p-8">
          <p className="text-base font-semibold text-stone-700">No dishes found matching your criteria</p>
          <p className="text-xs text-stone-500 mt-1">Try clearing your search query or dietary filters</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setDietFilter('all');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
};
