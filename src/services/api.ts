import { MenuItem, Order, CustomerDetails } from '../types';

const ADMIN_TOKEN_KEY = 'slr_admin_token';
const ADMIN_USER_KEY = 'slr_admin_user';

export const INITIAL_FALLBACK_MENU: MenuItem[] = [
  {
    id: 'item-1',
    name: 'Masala Dosa',
    category: 'South Indian',
    price: 60,
    description: 'Crispy golden crepe made from fermented lentil & rice batter, filled with spiced potato masala, served with coconut chutney & hot sambar.',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=80',
    isVeg: true,
    isBestseller: true,
    isAvailable: true,
    prepTimeMinutes: 15,
  },
  {
    id: 'item-2',
    name: 'Chicken Biryani',
    category: 'Biryani',
    price: 180,
    description: 'Traditional dum biryani slow-cooked with tender marinated chicken pieces, aged basmati rice, mint, saffron, and aromatic ground spices. Served with raita & salan.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    isVeg: false,
    isBestseller: true,
    isAvailable: true,
    prepTimeMinutes: 25,
  },
  {
    id: 'item-3',
    name: 'Veg Fried Rice',
    category: 'Chinese',
    price: 120,
    description: 'Wok-tossed long-grain rice with crisp carrots, cabbage, french beans, spring onions, garlic, and light seasoning with soy.',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&auto=format&fit=crop&q=80',
    isVeg: true,
    isBestseller: false,
    isAvailable: true,
    prepTimeMinutes: 20,
  },
  {
    id: 'item-4',
    name: 'Idli (2 pieces)',
    category: 'South Indian',
    price: 40,
    description: 'Soft, melt-in-mouth steamed rice cakes accompanied by traditional Karnataka hotel sambar and fresh coconut chutney.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
    isVeg: true,
    isBestseller: true,
    isAvailable: true,
    prepTimeMinutes: 10,
  },
  {
    id: 'item-5',
    name: 'Mysore Masala Dosa',
    category: 'South Indian',
    price: 75,
    description: 'Crisp outside, soft inside dosa generously spread with spicy red garlic chutney, fresh butter, and fragrant potato masala.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80',
    isVeg: true,
    isBestseller: true,
    isAvailable: true,
    prepTimeMinutes: 15,
  },
  {
    id: 'item-6',
    name: 'Medu Vada (2 pieces)',
    category: 'South Indian',
    price: 45,
    description: 'Crispy golden lentil fritters spiced with black peppercorns, cumin seeds, fresh ginger, and curry leaves.',
    image: 'https://images.unsplash.com/photo-1626777553635-be025dfa2d1d?w=800&auto=format&fit=crop&q=80',
    isVeg: true,
    isBestseller: false,
    isAvailable: true,
    prepTimeMinutes: 10,
  },
  {
    id: 'item-7',
    name: 'Paneer Butter Masala',
    category: 'North Indian',
    price: 170,
    description: 'Fresh malai paneer cubes simmered in a luscious, mildly sweet and savory butter-infused tomato cashew gravy with kasuri methi.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop&q=80',
    isVeg: true,
    isBestseller: true,
    isAvailable: true,
    prepTimeMinutes: 20,
  },
  {
    id: 'item-8',
    name: 'Butter Naan (2 pieces)',
    category: 'North Indian',
    price: 60,
    description: 'Tandoor baked artisan leavened flatbreads brushed generously with pure dairy butter.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
    isVeg: true,
    isBestseller: false,
    isAvailable: true,
    prepTimeMinutes: 12,
  },
  {
    id: 'item-9',
    name: 'Dal Tadka',
    category: 'North Indian',
    price: 110,
    description: 'Yellow lentils slow-cooked and tempered with smoky cumin seeds, minced garlic, dried red chilies, and pure ghee.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80',
    isVeg: true,
    isBestseller: false,
    isAvailable: true,
    prepTimeMinutes: 15,
  },
  {
    id: 'item-10',
    name: 'Mutton Biryani',
    category: 'Biryani',
    price: 240,
    description: 'Rich royal dum biryani cooked with tender local baby mutton, whole spices, fried onions, and saffron infused basmati rice.',
    image: 'https://images.unsplash.com/photo-1545247181-516773ca838b?w=800&auto=format&fit=crop&q=80',
    isVeg: false,
    isBestseller: true,
    isAvailable: true,
    prepTimeMinutes: 30,
  },
  {
    id: 'item-11',
    name: 'Veg Dum Biryani',
    category: 'Biryani',
    price: 140,
    description: 'Garden vegetables and cubes of fresh paneer marinated in spiced curd, layered with saffron basmati rice.',
    image: 'https://images.unsplash.com/photo-1642821373181-696a54913e9a?w=800&auto=format&fit=crop&q=80',
    isVeg: true,
    isBestseller: false,
    isAvailable: true,
    prepTimeMinutes: 20,
  },
  {
    id: 'item-12',
    name: 'Gobi Manchurian (Dry)',
    category: 'Chinese',
    price: 110,
    description: 'Crispy battered cauliflower florets tossed with ginger, garlic, green chilies, coriander, and savory Indo-Chinese glaze.',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&auto=format&fit=crop&q=80',
    isVeg: true,
    isBestseller: true,
    isAvailable: true,
    prepTimeMinutes: 18,
  },
  {
    id: 'item-13',
    name: 'Chilli Chicken',
    category: 'Chinese',
    price: 180,
    description: 'Crispy fried boneless chicken bites wok-tossed with green bell peppers, spring onions, and spicy chili sauce.',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&auto=format&fit=crop&q=80',
    isVeg: false,
    isBestseller: true,
    isAvailable: true,
    prepTimeMinutes: 20,
  },
  {
    id: 'item-14',
    name: 'South Indian Filter Coffee',
    category: 'Beverages',
    price: 30,
    description: 'Traditional freshly brewed chicory-infused South Indian filter coffee with frothy hot milk in a brass tumbler.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
    isVeg: true,
    isBestseller: true,
    isAvailable: true,
    prepTimeMinutes: 5,
  },
  {
    id: 'item-15',
    name: 'Badam Milk (Chilled)',
    category: 'Beverages',
    price: 50,
    description: 'Rich chilled creamy milk prepared with crushed California almonds, fragrant green cardamom, and Kashmiri saffron.',
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=800&auto=format&fit=crop&q=80',
    isVeg: true,
    isBestseller: false,
    isAvailable: true,
    prepTimeMinutes: 5,
  },
  {
    id: 'item-16',
    name: 'Fresh Sweet Lime Soda',
    category: 'Beverages',
    price: 40,
    description: 'Handcrafted fresh bubbly soda with freshly squeezed lime, mint sprig, black salt, and sugar syrup.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80',
    isVeg: true,
    isBestseller: false,
    isAvailable: true,
    prepTimeMinutes: 5,
  }
];

export const api = {
  // Get stored admin token
  getAdminToken(): string | null {
    return localStorage.getItem(ADMIN_TOKEN_KEY);
  },

  setAdminToken(token: string) {
    localStorage.setItem(ADMIN_TOKEN_KEY, token);
  },

  clearAdminSession() {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(ADMIN_USER_KEY);
  },

  isAdminLoggedIn(): boolean {
    return !!localStorage.getItem(ADMIN_TOKEN_KEY);
  },

  // Admin Login
  async adminLogin(password: string): Promise<{ success: boolean; token?: string; error?: string }> {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Login failed' };
      }
      if (data.token) {
        this.setAdminToken(data.token);
        localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(data.user || { role: 'admin' }));
      }
      return { success: true, token: data.token };
    } catch {
      // Fallback for offline/local simulation
      if (password === 'admin123' || password === 'lakshmi@kolar' || password === 'admin') {
        const fakeToken = 'TOKEN_SLR_ADMIN_VALID_AUTHENTICATED_SESSION';
        this.setAdminToken(fakeToken);
        localStorage.setItem(ADMIN_USER_KEY, JSON.stringify({ role: 'SUPER_ADMIN', username: 'admin' }));
        return { success: true, token: fakeToken };
      }
      return { success: false, error: 'Incorrect password. Try admin123 or lakshmi@kolar' };
    }
  },

  // Fetch Menu Items
  async getMenu(): Promise<MenuItem[]> {
    try {
      const res = await fetch('/api/menu');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          localStorage.setItem('slr_cached_menu', JSON.stringify(data));
          return data;
        }
      }
    } catch (err) {
      console.warn('API fetch menu failed, using cached or fallback menu', err);
    }

    const cached = localStorage.getItem('slr_cached_menu');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        // ignore
      }
    }
    return INITIAL_FALLBACK_MENU;
  },

  // Create Menu Item (Admin)
  async createMenuItem(item: Omit<MenuItem, 'id'>): Promise<MenuItem> {
    const token = this.getAdminToken();
    try {
      const res = await fetch('/api/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(item)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('Backend call failed, creating locally in cache', err);
    }

    // Local fallback
    const newItem: MenuItem = {
      ...item,
      id: `item-${Date.now()}`
    };
    const current = await this.getMenu();
    const updated = [newItem, ...current];
    localStorage.setItem('slr_cached_menu', JSON.stringify(updated));
    return newItem;
  },

  // Update Menu Item (Admin)
  async updateMenuItem(id: string, updates: Partial<MenuItem>): Promise<MenuItem> {
    const token = this.getAdminToken();
    try {
      const res = await fetch(`/api/menu/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('Backend call failed, updating in local cache', err);
    }

    // Fallback
    const current = await this.getMenu();
    const index = current.findIndex(i => i.id === id);
    if (index !== -1) {
      current[index] = { ...current[index], ...updates };
      localStorage.setItem('slr_cached_menu', JSON.stringify(current));
      return current[index];
    }
    throw new Error('Item not found');
  },

  // Delete Menu Item (Admin)
  async deleteMenuItem(id: string): Promise<boolean> {
    const token = this.getAdminToken();
    try {
      const res = await fetch(`/api/menu/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        return true;
      }
    } catch (err) {
      console.warn('Backend call failed, deleting from local cache', err);
    }

    const current = await this.getMenu();
    const updated = current.filter(i => i.id !== id);
    localStorage.setItem('slr_cached_menu', JSON.stringify(updated));
    return true;
  },

  // Place Order
  async placeOrder(orderData: {
    items: Order['items'];
    customer: CustomerDetails;
    subtotal: number;
    deliveryFee: number;
    tax: number;
    discount: number;
    couponCode?: string;
    totalAmount: number;
    paymentMethod: 'Cash on Delivery' | 'UPI / Online (On Delivery)';
  }): Promise<Order> {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (res.ok) {
        const order = await res.json();
        // save to customer's recent orders in localStorage
        this.saveCustomerOrderLocally(order);
        return order;
      }
    } catch (err) {
      console.warn('API place order failed, storing locally', err);
    }

    // Fallback order generation
    const newOrder: Order = {
      id: `SLR-${Math.floor(1000 + Math.random() * 9000)}`,
      ...orderData,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      estimatedDeliveryTimeMinutes: 35
    };
    this.saveCustomerOrderLocally(newOrder);

    // Also push to cached orders
    const allOrders = this.getLocalOrders();
    allOrders.unshift(newOrder);
    localStorage.setItem('slr_cached_orders', JSON.stringify(allOrders));

    return newOrder;
  },

  saveCustomerOrderLocally(order: Order) {
    try {
      const myOrdersRaw = localStorage.getItem('slr_my_orders');
      const myOrders: Order[] = myOrdersRaw ? JSON.parse(myOrdersRaw) : [];
      myOrders.unshift(order);
      localStorage.setItem('slr_my_orders', JSON.stringify(myOrders.slice(0, 20)));
    } catch {
      // ignore
    }
  },

  getCustomerOrders(): Order[] {
    try {
      const myOrdersRaw = localStorage.getItem('slr_my_orders');
      return myOrdersRaw ? JSON.parse(myOrdersRaw) : [];
    } catch {
      return [];
    }
  },

  // Get All Orders (Admin)
  async getOrders(): Promise<Order[]> {
    const token = this.getAdminToken();
    try {
      const res = await fetch('/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          localStorage.setItem('slr_cached_orders', JSON.stringify(data));
          return data;
        }
      }
    } catch (err) {
      console.warn('API getOrders failed, using local cache', err);
    }

    return this.getLocalOrders();
  },

  getLocalOrders(): Order[] {
    const cached = localStorage.getItem('slr_cached_orders');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        // ignore
      }
    }
    return [
      {
        id: 'SLR-1001',
        items: [
          { id: 'item-1', name: 'Masala Dosa', price: 60, quantity: 2, isVeg: true },
          { id: 'item-14', name: 'South Indian Filter Coffee', price: 30, quantity: 2, isVeg: true }
        ],
        customer: {
          name: 'Ramesh Gowda',
          phone: '+91 98450 12345',
          address: 'Near Clock Tower, Main Bazar, Kolar',
          landmark: 'Opposite Syndicate Bank'
        },
        subtotal: 180,
        deliveryFee: 20,
        tax: 9,
        discount: 0,
        totalAmount: 209,
        paymentMethod: 'Cash on Delivery',
        status: 'Delivered',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        estimatedDeliveryTimeMinutes: 25
      }
    ];
  },

  // Update Order Status (Admin)
  async updateOrderStatus(id: string, status: Order['status']): Promise<Order> {
    const token = this.getAdminToken();
    try {
      const res = await fetch(`/api/orders/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.warn('Backend call failed, updating local orders', err);
    }

    const orders = this.getLocalOrders();
    const order = orders.find(o => o.id === id);
    if (order) {
      order.status = status;
      localStorage.setItem('slr_cached_orders', JSON.stringify(orders));
      return order;
    }
    throw new Error('Order not found');
  }
};
