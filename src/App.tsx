import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SpecialOffers } from './components/SpecialOffers';
import { MenuSection } from './components/MenuSection';
import { AboutContact } from './components/AboutContact';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { api } from './services/api';
import { MenuItem, Order } from './types';
import { ShoppingBag, ArrowRight } from 'lucide-react';

function RestaurantApp() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoadingMenu, setIsLoadingMenu] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  // Modals & Panels
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [isOrderConfirmationOpen, setIsOrderConfirmationOpen] = useState(false);

  const { itemCount, subtotal, setIsCartOpen } = useCart();

  const fetchMenu = async () => {
    setIsLoadingMenu(true);
    try {
      const items = await api.getMenu();
      setMenuItems(items);
    } catch (err) {
      console.error('Failed to load menu', err);
    } finally {
      setIsLoadingMenu(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'menu') {
      const el = document.getElementById('menu-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'offers') {
      const el = document.getElementById('offers-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'about') {
      const el = document.getElementById('about-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'contact') {
      const el = document.getElementById('contact-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderSuccess = (order: Order) => {
    setIsCheckoutOpen(false);
    setConfirmedOrder(order);
    setIsOrderConfirmationOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF5EF] text-[#24140D] selection:bg-orange-200 selection:text-orange-950">
      {/* Navigation */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onOrderNow={() => handleNavigate('menu')}
          onViewOffers={() => handleNavigate('offers')}
        />

        {/* 2. Special Offers Section */}
        <SpecialOffers onOrderSpecial={() => handleNavigate('menu')} />

        {/* 3. Food Menu Section with Categories & Search */}
        <MenuSection
          menuItems={menuItems}
          isLoading={isLoadingMenu}
          onRefresh={fetchMenu}
        />

        {/* 4. About & Contact Section */}
        <AboutContact />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Floating Bottom Cart Bar (Mobile friendly) */}
      {itemCount > 0 && !isCheckoutOpen && !isAdminOpen && !isOrderConfirmationOpen && (
        <div className="fixed bottom-4 left-4 right-4 z-30 md:hidden animate-slide-up">
          <div className="bg-[#24140D] text-white p-3.5 rounded-2xl shadow-2xl flex items-center justify-between border border-amber-900/40">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-orange-400" />
                <span className="absolute -top-1.5 -right-2 bg-orange-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              </div>
              <div>
                <span className="text-xs text-stone-300 block">Total: ₹{subtotal}</span>
                <span className="text-[10px] text-amber-300 font-semibold block">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'} in cart
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md active:scale-95"
            >
              <span>View Cart</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Confirmation Modal */}
      <OrderConfirmationModal
        isOpen={isOrderConfirmationOpen}
        order={confirmedOrder}
        onClose={() => setIsOrderConfirmationOpen(false)}
      />

      {/* Protected Admin Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onMenuUpdated={fetchMenu}
      />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <RestaurantApp />
    </CartProvider>
  );
}
