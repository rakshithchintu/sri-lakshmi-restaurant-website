import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Heart,
  Award,
  Users,
  CheckCircle2,
  Calendar,
  Send,
  ExternalLink
} from 'lucide-react';

export const AboutContact: React.FC = () => {
  const [reservationName, setReservationName] = useState('');
  const [reservationPhone, setReservationPhone] = useState('');
  const [reservationGuests, setReservationGuests] = useState('2');
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('19:30');
  const [reservationSuccess, setReservationSuccess] = useState(false);

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservationName || !reservationPhone) return;

    // Simulate reservation save
    setReservationSuccess(true);
    setTimeout(() => {
      setReservationName('');
      setReservationPhone('');
      setReservationSuccess(false);
    }, 5000);
  };

  return (
    <section id="about-section" className="py-16 bg-[#FAF5EF] border-t border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-700 bg-orange-100/70 px-3 py-1 rounded-full">
              <Heart className="w-3.5 h-3.5 text-orange-600 fill-orange-600" />
              <span>Our Culinary Heritage</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#24140D] leading-tight">
              A Legacy of Authentic Flavors in the Heart of Kolar
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Founded with a passion for bringing families together over wholesome, unforgettable food,{' '}
              <strong>Sri Lakshmi Family Restaurant</strong> has been Kolar’s cherished culinary destination.
              We take deep pride in Karnataka’s rich gastronomic traditions.
            </p>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Every morning at 5:00 AM, our wood-stone grinders prepare fresh fermented dosa batters.
              Our chefs roast and pound whole spices in-house, simmer clarified butter (pure desi ghee) to golden perfection,
              and select farm-fresh produce directly from local Kolar farmers.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="bg-white p-3.5 rounded-2xl border border-orange-100 text-center shadow-xs">
                <span className="font-serif text-2xl font-bold text-orange-700 block">20+</span>
                <span className="text-xs text-stone-500 font-medium">Years of Tradition</span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-orange-100 text-center shadow-xs">
                <span className="font-serif text-2xl font-bold text-orange-700 block">50+</span>
                <span className="text-xs text-stone-500 font-medium">Authentic Recipes</span>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-orange-100 text-center shadow-xs">
                <span className="font-serif text-2xl font-bold text-orange-700 block">100k+</span>
                <span className="text-xs text-stone-500 font-medium">Happy Meals Served</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&auto=format&fit=crop&q=80"
                alt="Sri Lakshmi Family Restaurant Ambience"
                className="w-full h-80 sm:h-96 object-cover rounded-3xl shadow-xl border-4 border-white"
              />
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white p-4 rounded-2xl shadow-xl border border-orange-100 max-w-xs hidden sm:flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 leading-tight">FSSAI Certified Kitchen</h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    Highest standards of hygiene and quality guaranteed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact and Timings Cards */}
        <div id="contact-section" className="pt-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-700 mb-1">
              <MapPin className="w-4 h-4 text-orange-600" />
              <span>Visit Us or Get in Touch</span>
            </div>
            <h3 className="font-serif text-3xl font-bold text-[#24140D]">
              Restaurant Location & Hours
            </h3>
            <p className="text-stone-500 text-xs sm:text-sm mt-1">
              Note: Sample contact information shown below until verified with management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Location Card */}
            <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-stone-900 mb-1">Our Location</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  <strong>Sri Lakshmi Family Restaurant</strong><br />
                  MG Road, Near Clock Tower & Main Bazar,<br />
                  Kolar, Karnataka — 563101, India.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-100">
                <span className="text-[11px] text-stone-400 block font-medium">Prominent Landmark:</span>
                <span className="text-xs font-bold text-stone-800">Opposite Syndicate / Canara Bank</span>
              </div>
            </div>

            {/* Timings Card */}
            <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-stone-900 mb-1">Opening Hours</h4>
                <div className="text-xs text-stone-600 space-y-1.5 leading-relaxed">
                  <div className="flex justify-between">
                    <span className="font-semibold text-stone-800">Monday – Sunday:</span>
                    <span>7:00 AM – 10:30 PM</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-stone-500">
                    <span>Morning Breakfast:</span>
                    <span>7:00 AM – 11:30 AM</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-stone-500">
                    <span>Lunch & Dum Biryani:</span>
                    <span>12:00 PM – 4:00 PM</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-stone-500">
                    <span>Evening Snacks & Dinner:</span>
                    <span>4:30 PM – 10:30 PM</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold text-emerald-700">Kitchen Open & Taking Orders</span>
              </div>
            </div>

            {/* Sample Contact Card */}
            <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg font-bold text-stone-900 mb-1">Contact Information</h4>
                  <span className="text-[10px] bg-stone-100 text-stone-500 px-2 py-0.5 rounded font-semibold">
                    Sample Data
                  </span>
                </div>
                <div className="text-xs text-stone-600 space-y-2 mt-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-orange-600" />
                    <span><strong>Phone:</strong> +91 8152 222345</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-orange-600" />
                    <span><strong>Takeaway Helpline:</strong> +91 98450 67890</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-orange-600" />
                    <span><strong>Email:</strong> contact@srilakshmikolar.com</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-stone-100">
                <span className="text-[11px] text-stone-400 block font-medium">Home Delivery:</span>
                <span className="text-xs font-bold text-stone-800">Across All Major Kolar Localities</span>
              </div>
            </div>
          </div>
        </div>

        {/* Table Reservation & Party Order Card */}
        <div className="bg-gradient-to-br from-[#24140D] to-[#381E11] text-white rounded-3xl p-6 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Dine-In & Celebrations
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                Reserve a Table or Book Family Gatherings
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Planning a family birthday, anniversary, or wedding party in Kolar?
                Reserve our air-conditioned family dining section or order authentic bulk catering with special menus.
              </p>
              <div className="flex items-center gap-4 text-xs text-amber-200/90 pt-2">
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-amber-400" /> AC Family Hall
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" /> Free Parking
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white/10 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-white/15">
              {reservationSuccess ? (
                <div className="py-8 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-white">Table Request Received!</h4>
                  <p className="text-xs text-amber-200">
                    We will call you on your phone shortly to confirm your table reservation at Sri Lakshmi Family Restaurant.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleReservationSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-200 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={reservationName}
                        onChange={e => setReservationName(e.target.value)}
                        placeholder="Ramesh Kumar"
                        className="w-full px-3 py-2 text-xs bg-white/10 border border-white/20 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-200 mb-1">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={reservationPhone}
                        onChange={e => setReservationPhone(e.target.value)}
                        placeholder="9845012345"
                        className="w-full px-3 py-2 text-xs bg-white/10 border border-white/20 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-200 mb-1">
                        Guests
                      </label>
                      <select
                        value={reservationGuests}
                        onChange={e => setReservationGuests(e.target.value)}
                        className="w-full px-2 py-2 text-xs bg-[#24140D] border border-white/20 rounded-xl text-white focus:outline-none cursor-pointer"
                      >
                        <option value="2">2 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="6">6 Guests</option>
                        <option value="8+">8+ Family</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-200 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        value={reservationDate}
                        onChange={e => setReservationDate(e.target.value)}
                        className="w-full px-2 py-2 text-xs bg-[#24140D] border border-white/20 rounded-xl text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-200 mb-1">
                        Time
                      </label>
                      <select
                        value={reservationTime}
                        onChange={e => setReservationTime(e.target.value)}
                        className="w-full px-2 py-2 text-xs bg-[#24140D] border border-white/20 rounded-xl text-white focus:outline-none cursor-pointer"
                      >
                        <option value="12:30">12:30 PM (Lunch)</option>
                        <option value="13:30">1:30 PM (Lunch)</option>
                        <option value="19:30">7:30 PM (Dinner)</option>
                        <option value="20:30">8:30 PM (Dinner)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Reservation Request</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
