import React, { useState } from 'react';
import { ShoppingBag, Utensils, Shield, Menu as MenuIcon, X, MapPin, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onOpenAdmin: () => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, onNavigate, activeSection }) => {
  const { itemCount, subtotal, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Banner with Location and Timings */}
      <div className="bg-[#24140D] text-[#FAF5EF] text-xs py-2 px-4 border-b border-[#381E11]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-orange-300">
              <MapPin className="w-3.5 h-3.5" />
              <span>MG Road, Near Clock Tower, Kolar, Karnataka</span>
            </span>
            <span className="hidden sm:inline text-amber-100/40">•</span>
            <span className="hidden sm:inline text-amber-200/90">Open Today: 7:00 AM – 10:30 PM</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:+918152222345"
              className="flex items-center gap-1.5 text-amber-200 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-orange-400" />
              <span>+91 8152 222345</span>
            </a>
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-amber-300/80 hover:text-amber-200 transition-colors text-xs font-medium cursor-pointer"
              title="Admin Portal"
            >
              <Shield className="w-3.5 h-3.5 text-orange-400" />
              <span>Staff Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-orange-100/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Brand */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-left cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-600 to-amber-700 flex items-center justify-center text-white shadow-md shadow-orange-900/10 group-hover:scale-105 transition-transform">
                <Utensils className="w-6 h-6 text-amber-100" />
              </div>
              <div>
                <span className="block font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#24140D] leading-none group-hover:text-orange-700 transition-colors">
                  Sri Lakshmi
                </span>
                <span className="block text-xs font-medium uppercase tracking-wider text-orange-800 mt-1">
                  Family Restaurant · Kolar
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
              <button
                onClick={() => handleNavClick('home')}
                className={`transition-colors cursor-pointer pb-1 border-b-2 ${
                  activeSection === 'home'
                    ? 'text-orange-700 border-orange-600 font-semibold'
                    : 'text-stone-700 hover:text-orange-700 border-transparent'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('menu')}
                className={`transition-colors cursor-pointer pb-1 border-b-2 ${
                  activeSection === 'menu'
                    ? 'text-orange-700 border-orange-600 font-semibold'
                    : 'text-stone-700 hover:text-orange-700 border-transparent'
                }`}
              >
                Food Menu
              </button>
              <button
                onClick={() => handleNavClick('offers')}
                className={`transition-colors cursor-pointer pb-1 border-b-2 ${
                  activeSection === 'offers'
                    ? 'text-orange-700 border-orange-600 font-semibold'
                    : 'text-stone-700 hover:text-orange-700 border-transparent'
                }`}
              >
                Special Offers
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className={`transition-colors cursor-pointer pb-1 border-b-2 ${
                  activeSection === 'about'
                    ? 'text-orange-700 border-orange-600 font-semibold'
                    : 'text-stone-700 hover:text-orange-700 border-transparent'
                }`}
              >
                About Us
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className={`transition-colors cursor-pointer pb-1 border-b-2 ${
                  activeSection === 'contact'
                    ? 'text-orange-700 border-orange-600 font-semibold'
                    : 'text-stone-700 hover:text-orange-700 border-transparent'
                }`}
              >
                Contact & Table
              </button>
            </nav>

            {/* Right Action: Cart & Mobile Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-3 px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-600/20 transition-all active:scale-95 cursor-pointer"
                aria-label="View Cart"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-amber-400 text-[#24140D] font-extrabold text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                      {itemCount}
                    </span>
                  )}
                </div>
                <div className="text-left hidden sm:block">
                  <span className="block text-[10px] uppercase font-semibold text-orange-200 leading-tight">
                    My Cart
                  </span>
                  <span className="block text-sm font-bold leading-tight">
                    ₹{subtotal}
                  </span>
                </div>
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-stone-700 hover:bg-orange-50 cursor-pointer"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-orange-100 px-4 pt-3 pb-5 space-y-3 shadow-lg">
            <button
              onClick={() => handleNavClick('home')}
              className="block w-full text-left py-2 px-3 rounded-lg text-stone-800 font-medium hover:bg-orange-50 hover:text-orange-700"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('menu')}
              className="block w-full text-left py-2 px-3 rounded-lg text-stone-800 font-medium hover:bg-orange-50 hover:text-orange-700"
            >
              Food Menu
            </button>
            <button
              onClick={() => handleNavClick('offers')}
              className="block w-full text-left py-2 px-3 rounded-lg text-stone-800 font-medium hover:bg-orange-50 hover:text-orange-700"
            >
              Special Offers
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="block w-full text-left py-2 px-3 rounded-lg text-stone-800 font-medium hover:bg-orange-50 hover:text-orange-700"
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="block w-full text-left py-2 px-3 rounded-lg text-stone-800 font-medium hover:bg-orange-50 hover:text-orange-700"
            >
              Contact & Timings
            </button>
            <div className="pt-2 border-t border-orange-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="flex items-center gap-2 w-full py-2 px-3 rounded-lg text-orange-800 font-medium hover:bg-orange-50"
              >
                <Shield className="w-4 h-4 text-orange-600" />
                <span>Admin & Staff Portal</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
