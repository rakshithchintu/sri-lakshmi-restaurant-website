import React from 'react';
import { Utensils, MapPin, Phone, Mail, Clock, Heart, Shield } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onNavigate }) => {
  return (
    <footer className="bg-[#1C100A] text-[#FAF5EF] pt-14 pb-8 border-t border-[#381E11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white">
                <Utensils className="w-5 h-5 text-amber-200" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-white block">
                  Sri Lakshmi
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-orange-400 block">
                  Family Restaurant · Kolar
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              Serving pure, authentic South Indian, North Indian, royal Biryanis, and Chinese delicacies to our cherished guests in Kolar, Karnataka.
            </p>

            <div className="text-xs text-stone-400 pt-1">
              <span className="text-amber-300 font-semibold">FSSAI Lic. No:</span> 11222334400556 (Sample)
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-amber-200">
              Explore Our Restaurant
            </h4>
            <ul className="space-y-2 text-xs text-stone-400 font-medium">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Home Page
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('menu')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Food Menu (All Categories)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('offers')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Today's Special Discounts & Coupons
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Our Heritage & Culinary Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Table Reservation & Timings
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Kolar Delivery Areas */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-amber-200">
              Delivery Areas in Kolar
            </h4>
            <p className="text-xs text-stone-400">
              Fresh hot food delivered directly within 30–40 minutes to:
            </p>
            <div className="grid grid-cols-2 gap-1 text-[11px] text-stone-400">
              <span>• Clock Tower & Bazar</span>
              <span>• Doomlight Circle</span>
              <span>• Robertsonpet Area</span>
              <span>• Gulpet Localities</span>
              <span>• Bangarpet Road</span>
              <span>• Tamaka & Medical Col.</span>
              <span>• Galpet & Gandhinagar</span>
              <span>• Karanjikatte & Keelu Kote</span>
            </div>
          </div>

          {/* Col 4: Timings & Support */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-amber-200">
              Timings & Sample Hotline
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                <span>Mon – Sun: 7:00 AM – 10:30 PM</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                <span>+91 8152 222345 (Sample Info)</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                <span>contact@srilakshmikolar.com</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-orange-700 text-stone-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5 text-orange-400" />
                <span>Kitchen Staff / Admin Login</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>© {new Date().getFullYear()} Sri Lakshmi Family Restaurant, Kolar, Karnataka. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for authentic South & North Indian food lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
