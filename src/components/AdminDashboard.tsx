import React, { useState, useEffect } from 'react';
import {
  Shield,
  Lock,
  Plus,
  Edit2,
  Trash2,
  LogOut,
  RefreshCw,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  IndianRupee,
  ShoppingBag,
  Layers,
  Utensils
} from 'lucide-react';
import { MenuItem, Order } from '../types';
import { api } from '../services/api';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onMenuUpdated: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  onMenuUpdated
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => api.isAdminLoggedIn());
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'orders' | 'menu'>('orders');

  // Orders State
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [orderSearch, setOrderSearch] = useState('');

  // Menu State
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [menuLoading, setMenuLoading] = useState(false);
  const [menuSearch, setMenuSearch] = useState('');

  // Modal for Add / Edit Item
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'South Indian' as MenuItem['category'],
    price: '',
    description: '',
    image: '',
    isVeg: true,
    isBestseller: false,
    prepTimeMinutes: '15'
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && isOpen) {
      loadOrders();
      loadMenu();
    }
  }, [isAuthenticated, isOpen]);

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(null), 3500);
  };

  const loadOrders = async () => {
    setOrdersLoading(true);
    try {
      const data = await api.getOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setOrdersLoading(false);
    }
  };

  const loadMenu = async () => {
    setMenuLoading(true);
    try {
      const data = await api.getMenu();
      setMenuItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setMenuLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    const res = await api.adminLogin(passwordInput);
    if (res.success) {
      setIsAuthenticated(true);
      setPasswordInput('');
      loadOrders();
      loadMenu();
    } else {
      setAuthError(res.error || 'Authentication failed. Please verify password.');
    }
  };

  const handleLogout = () => {
    api.clearAdminSession();
    setIsAuthenticated(false);
  };

  const handleUpdateStatus = async (orderId: string, status: Order['status']) => {
    try {
      await api.updateOrderStatus(orderId, status);
      setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, status } : o)));
      showNotification(`Order ${orderId} status changed to ${status}`);
    } catch (err: any) {
      alert(err.message || 'Failed to update order status');
    }
  };

  const openAddItemModal = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      category: 'South Indian',
      price: '',
      description: '',
      image: '',
      isVeg: true,
      isBestseller: false,
      prepTimeMinutes: '15'
    });
    setFormError(null);
    setIsItemModalOpen(true);
  };

  const openEditItemModal = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: String(item.price),
      description: item.description,
      image: item.image,
      isVeg: item.isVeg,
      isBestseller: Boolean(item.isBestseller),
      prepTimeMinutes: String(item.prepTimeMinutes || 15)
    });
    setFormError(null);
    setIsItemModalOpen(true);
  };

  const handleDeleteItem = async (itemId: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from the menu?`)) {
      try {
        await api.deleteMenuItem(itemId);
        setMenuItems(prev => prev.filter(i => i.id !== itemId));
        onMenuUpdated();
        showNotification(`Deleted "${name}" successfully`);
      } catch (err: any) {
        alert(err.message || 'Failed to delete item');
      }
    }
  };

  const handleToggleAvailability = async (item: MenuItem) => {
    try {
      const updated = await api.updateMenuItem(item.id, { isAvailable: !item.isAvailable });
      setMenuItems(prev => prev.map(i => (i.id === item.id ? updated : i)));
      onMenuUpdated();
      showNotification(
        `"${item.name}" is now ${updated.isAvailable ? 'Available' : 'Out of Stock'}`
      );
    } catch (err: any) {
      alert(err.message || 'Failed to update item availability');
    }
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.name.trim()) {
      setFormError('Item name is required');
      return;
    }
    const priceNum = Number(formData.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      setFormError('Please enter a valid price in ₹');
      return;
    }

    try {
      if (editingItem) {
        // Update
        const updated = await api.updateMenuItem(editingItem.id, {
          name: formData.name.trim(),
          category: formData.category,
          price: priceNum,
          description: formData.description.trim(),
          image:
            formData.image.trim() ||
            'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80',
          isVeg: formData.isVeg,
          isBestseller: formData.isBestseller,
          prepTimeMinutes: Number(formData.prepTimeMinutes) || 15
        });
        setMenuItems(prev => prev.map(i => (i.id === editingItem.id ? updated : i)));
        showNotification(`Updated "${updated.name}" successfully`);
      } else {
        // Create
        const created = await api.createMenuItem({
          name: formData.name.trim(),
          category: formData.category,
          price: priceNum,
          description: formData.description.trim(),
          image:
            formData.image.trim() ||
            'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80',
          isVeg: formData.isVeg,
          isBestseller: formData.isBestseller,
          isAvailable: true,
          prepTimeMinutes: Number(formData.prepTimeMinutes) || 15
        });
        setMenuItems(prev => [created, ...prev]);
        showNotification(`Added new dish "${created.name}" to menu`);
      }

      setIsItemModalOpen(false);
      onMenuUpdated();
    } catch (err: any) {
      setFormError(err.message || 'Failed to save item');
    }
  };

  // Filtered lists
  const filteredOrders = orders.filter(o => {
    if (orderStatusFilter !== 'all' && o.status !== orderStatusFilter) return false;
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      const matchId = o.id.toLowerCase().includes(q);
      const matchCustomer = o.customer.name.toLowerCase().includes(q);
      const matchPhone = o.customer.phone.toLowerCase().includes(q);
      if (!matchId && !matchCustomer && !matchPhone) return false;
    }
    return true;
  });

  const filteredMenu = menuItems.filter(item => {
    if (menuSearch.trim()) {
      const q = menuSearch.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Calculate Metrics
  const totalRevenue = orders.reduce((sum, o) => (o.status !== 'Cancelled' ? sum + o.totalAmount : sum), 0);
  const activeOrdersCount = orders.filter(
    o => o.status === 'Pending' || o.status === 'Confirmed' || o.status === 'Preparing' || o.status === 'Out for Delivery'
  ).length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-stone-50 w-full max-w-6xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="p-4 sm:p-6 bg-[#24140D] text-[#FAF5EF] flex items-center justify-between border-b border-[#381E11]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-md">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg sm:text-xl font-bold">Restaurant Admin Portal</h3>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded-full border border-amber-500/30">
                  Protected System
                </span>
              </div>
              <p className="text-xs text-stone-400">Sri Lakshmi Family Restaurant · Kolar Kitchen Manager</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Action toast message */}
        {actionSuccess && (
          <div className="bg-emerald-600 text-white px-4 py-2 text-xs font-bold text-center flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {!isAuthenticated ? (
            /* Protected Access Login Screen */
            <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-3xl border border-stone-200 shadow-xl text-center">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto mb-4 border border-orange-200">
                <Lock className="w-7 h-7" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-stone-900">Admin Authorization</h4>
              <p className="text-xs text-stone-500 mt-2 mb-6 leading-relaxed">
                Ordinary customers cannot access kitchen management. Please provide the admin passcode to access live orders and menu editing.
              </p>

              {authError && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl text-left flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="text-left">
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Passcode / Password
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={e => setPasswordInput(e.target.value)}
                    placeholder="Enter admin password (e.g. admin123)"
                    className="w-full px-4 py-3 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white"
                  />
                  <p className="text-[11px] text-stone-400 mt-1.5">
                    Demo credentials: <code className="text-orange-700 font-bold">admin123</code> or{' '}
                    <code className="text-orange-700 font-bold">lakshmi@kolar</code>
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  Authorize & Access Dashboard
                </button>
              </form>
            </div>
          ) : (
            /* Authenticated Admin Management Interface */
            <div className="space-y-6">
              {/* Top Stats Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">Total Orders</span>
                    <h4 className="text-2xl font-bold text-stone-900 mt-0.5">{orders.length}</h4>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">Active Kitchen Orders</span>
                    <h4 className="text-2xl font-bold text-amber-700 mt-0.5">{activeOrdersCount}</h4>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Total Revenue</span>
                    <h4 className="text-2xl font-bold text-emerald-700 mt-0.5">₹{totalRevenue}</h4>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <IndianRupee className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600">Dishes on Menu</span>
                    <h4 className="text-2xl font-bold text-purple-700 mt-0.5">{menuItems.length}</h4>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Utensils className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Sub-Navigation Tabs */}
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      activeTab === 'orders'
                        ? 'bg-orange-600 text-white shadow-sm'
                        : 'bg-white text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    Customer Orders ({orders.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('menu')}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      activeTab === 'menu'
                        ? 'bg-orange-600 text-white shadow-sm'
                        : 'bg-white text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    Menu Items Management ({menuItems.length})
                  </button>
                </div>

                {activeTab === 'menu' && (
                  <button
                    onClick={openAddItemModal}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Dish</span>
                  </button>
                )}
              </div>

              {/* TAB 1: ORDERS MANAGEMENT */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  {/* Filters Bar */}
                  <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-white p-3.5 rounded-2xl border border-stone-200">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={orderSearch}
                        onChange={e => setOrderSearch(e.target.value)}
                        placeholder="Search by Order ID, customer name or phone..."
                        className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={orderStatusFilter}
                        onChange={e => setOrderStatusFilter(e.target.value)}
                        className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-stone-700 focus:outline-none cursor-pointer"
                      >
                        <option value="all">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>

                      <button
                        onClick={loadOrders}
                        className="p-2 border border-stone-200 rounded-xl hover:bg-stone-50 text-stone-600 cursor-pointer"
                        title="Reload Orders"
                      >
                        <RefreshCw className={`w-4 h-4 ${ordersLoading ? 'animate-spin' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Orders Table */}
                  <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
                    {filteredOrders.length === 0 ? (
                      <div className="text-center py-12 text-stone-500 text-xs">
                        No customer orders matching the filter.
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs text-stone-700">
                          <thead className="bg-stone-100/70 border-b border-stone-200 text-stone-500 uppercase tracking-wider font-bold">
                            <tr>
                              <th className="py-3 px-4">Order ID & Date</th>
                              <th className="py-3 px-4">Customer Details</th>
                              <th className="py-3 px-4">Dishes & Quantity</th>
                              <th className="py-3 px-4">Bill & Payment</th>
                              <th className="py-3 px-4">Status & Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-stone-100">
                            {filteredOrders.map(order => (
                              <tr key={order.id} className="hover:bg-stone-50/80 transition-colors">
                                <td className="py-3.5 px-4 font-mono">
                                  <span className="font-bold text-stone-900 block">{order.id}</span>
                                  <span className="text-[11px] text-stone-400">
                                    {new Date(order.createdAt).toLocaleTimeString([], {
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}{' '}
                                    ·{' '}
                                    {new Date(order.createdAt).toLocaleDateString([], {
                                      month: 'short',
                                      day: 'numeric'
                                    })}
                                  </span>
                                </td>

                                <td className="py-3.5 px-4">
                                  <span className="font-bold text-stone-900 block">
                                    {order.customer.name}
                                  </span>
                                  <span className="text-stone-500 block">{order.customer.phone}</span>
                                  <span className="text-[11px] text-stone-400 truncate max-w-xs block">
                                    {order.customer.address}
                                  </span>
                                </td>

                                <td className="py-3.5 px-4">
                                  <div className="space-y-0.5 max-w-xs">
                                    {order.items.map(item => (
                                      <div key={item.id} className="text-stone-800">
                                        <span className="font-semibold text-stone-900">{item.quantity}x</span>{' '}
                                        {item.name}
                                      </div>
                                    ))}
                                  </div>
                                </td>

                                <td className="py-3.5 px-4">
                                  <span className="font-bold text-stone-900 text-sm block">
                                    ₹{order.totalAmount}
                                  </span>
                                  <span className="text-[11px] text-stone-500 block">
                                    {order.paymentMethod}
                                  </span>
                                </td>

                                <td className="py-3.5 px-4">
                                  <select
                                    value={order.status}
                                    onChange={e =>
                                      handleUpdateStatus(order.id, e.target.value as Order['status'])
                                    }
                                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border focus:outline-none cursor-pointer ${
                                      order.status === 'Delivered'
                                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                        : order.status === 'Preparing'
                                        ? 'bg-orange-50 text-orange-700 border-orange-300'
                                        : order.status === 'Out for Delivery'
                                        ? 'bg-blue-50 text-blue-700 border-blue-300'
                                        : order.status === 'Confirmed'
                                        ? 'bg-amber-50 text-amber-700 border-amber-300'
                                        : order.status === 'Cancelled'
                                        ? 'bg-rose-50 text-rose-700 border-rose-300'
                                        : 'bg-stone-100 text-stone-700 border-stone-300'
                                    }`}
                                  >
                                    <option value="Pending">Pending</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Preparing">Preparing</option>
                                    <option value="Out for Delivery">Out for Delivery</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                  </select>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: MENU MANAGEMENT */}
              {activeTab === 'menu' && (
                <div className="space-y-4">
                  {/* Search bar */}
                  <div className="flex gap-3 items-center justify-between bg-white p-3.5 rounded-2xl border border-stone-200">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={menuSearch}
                        onChange={e => setMenuSearch(e.target.value)}
                        placeholder="Search menu dishes..."
                        className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <button
                      onClick={loadMenu}
                      className="p-2 border border-stone-200 rounded-xl hover:bg-stone-50 text-stone-600 cursor-pointer"
                      title="Reload Menu"
                    >
                      <RefreshCw className={`w-4 h-4 ${menuLoading ? 'animate-spin' : ''}`} />
                    </button>
                  </div>

                  {/* Menu Table */}
                  <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-stone-700">
                        <thead className="bg-stone-100/70 border-b border-stone-200 text-stone-500 uppercase tracking-wider font-bold">
                          <tr>
                            <th className="py-3 px-4">Dish</th>
                            <th className="py-3 px-4">Category</th>
                            <th className="py-3 px-4">Diet</th>
                            <th className="py-3 px-4">Price</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          {filteredMenu.map(item => (
                            <tr key={item.id} className="hover:bg-stone-50/80 transition-colors">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-10 h-10 rounded-lg object-cover"
                                  />
                                  <div>
                                    <span className="font-bold text-stone-900 block">{item.name}</span>
                                    <span className="text-[11px] text-stone-400 truncate max-w-xs block">
                                      {item.description}
                                    </span>
                                  </div>
                                </div>
                              </td>

                              <td className="py-3 px-4 font-semibold text-stone-700">
                                {item.category}
                              </td>

                              <td className="py-3 px-4">
                                <span
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                    item.isVeg
                                      ? 'bg-emerald-50 text-emerald-700'
                                      : 'bg-rose-50 text-rose-700'
                                  }`}
                                >
                                  {item.isVeg ? 'Veg' : 'Non-Veg'}
                                </span>
                              </td>

                              <td className="py-3 px-4 font-bold text-stone-900">
                                ₹{item.price}
                              </td>

                              <td className="py-3 px-4">
                                <button
                                  onClick={() => handleToggleAvailability(item)}
                                  className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                                    item.isAvailable
                                      ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                      : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
                                  }`}
                                >
                                  {item.isAvailable ? 'Available' : 'Out of Stock'}
                                </button>
                              </td>

                              <td className="py-3 px-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => openEditItemModal(item)}
                                    className="p-1.5 rounded-lg text-stone-500 hover:text-orange-600 hover:bg-orange-50 cursor-pointer"
                                    title="Edit Dish"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteItem(item.id, item.name)}
                                    className="p-1.5 rounded-lg text-stone-500 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                                    title="Delete Dish"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* MODAL: ADD / EDIT MENU ITEM */}
      {isItemModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
            <div className="p-5 bg-stone-900 text-white flex items-center justify-between">
              <h4 className="font-serif text-lg font-bold">
                {editingItem ? 'Edit Dish on Menu' : 'Add New Dish to Menu'}
              </h4>
              <button
                onClick={() => setIsItemModalOpen(false)}
                className="text-stone-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveItem} className="p-5 space-y-4">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Dish Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Mysore Masala Dosa"
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={e =>
                      setFormData({ ...formData, category: e.target.value as MenuItem['category'] })
                    }
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-orange-500"
                  >
                    <option value="South Indian">South Indian</option>
                    <option value="North Indian">North Indian</option>
                    <option value="Biryani">Biryani</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Beverages">Beverages</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g. 75"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={e => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Crispy exterior, aromatic spices..."
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-orange-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <label className="flex items-center gap-2 p-2.5 bg-stone-50 rounded-xl border border-stone-200 cursor-pointer text-xs font-bold text-stone-700">
                  <input
                    type="checkbox"
                    checked={formData.isVeg}
                    onChange={e => setFormData({ ...formData, isVeg: e.target.checked })}
                    className="accent-emerald-600 rounded"
                  />
                  <span>Vegetarian Dish</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 bg-stone-50 rounded-xl border border-stone-200 cursor-pointer text-xs font-bold text-stone-700">
                  <input
                    type="checkbox"
                    checked={formData.isBestseller}
                    onChange={e => setFormData({ ...formData, isBestseller: e.target.checked })}
                    className="accent-amber-500 rounded"
                  />
                  <span>Mark as Bestseller</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsItemModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 text-xs font-bold hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  {editingItem ? 'Save Changes' : 'Create Dish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
