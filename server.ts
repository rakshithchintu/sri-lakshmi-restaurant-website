import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Persistent database file storage
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'South Indian' | 'North Indian' | 'Biryani' | 'Chinese' | 'Beverages';
  price: number;
  description: string;
  image: string;
  isVeg: boolean;
  isBestseller?: boolean;
  isAvailable: boolean;
  prepTimeMinutes?: number;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  isVeg: boolean;
  image?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  customer: {
    name: string;
    phone: string;
    address: string;
    landmark?: string;
    notes?: string;
  };
  totalAmount: number;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  couponCode?: string;
  paymentMethod: 'Cash on Delivery' | 'UPI / Online (On Delivery)';
  status: 'Pending' | 'Confirmed' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  createdAt: string;
  estimatedDeliveryTimeMinutes: number;
}

interface DatabaseSchema {
  menu: MenuItem[];
  orders: Order[];
  adminTokenSecret: string;
}

const INITIAL_MENU: MenuItem[] = [
  {
    id: 'item-1',
    name: 'Masala Dosa',
    category: 'South Indian',
    price: 60,
    description: 'Crispy golden crepe made from fermented lentil & rice batter, filled with spiced potato masala, served with 2 types of coconut chutney and hot sambar.',
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
    description: 'Traditional dum biryani slow-cooked with tender marinated chicken pieces, aged basmati rice, mint, saffron, and aromatic ground spices. Served with cooling raita & salan.',
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
    description: 'Soft, melt-in-mouth steamed rice cakes accompanied by traditional Karnataka hotel sambar, fresh coconut chutney, and roasted gram chutney.',
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
    description: 'Crisp outside, soft inside dosa generously spread with fiery red garlic chutney, fresh butter, and fragrant spiced potato filling.',
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
    description: 'Deep-fried golden lentil donuts crispy on the outside, fluffy within, tempered with black pepper, cumin seeds, and fresh curry leaves.',
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
    description: 'Fresh malai paneer cubes simmered in a luscious, mildly sweet and savory butter-infused tomato cashew gravy with aromatic kasuri methi.',
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
    description: 'Clay tandoor baked leavened flatbreads brushed generously with pure dairy butter.',
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
    description: 'Yellow toor dal slow-cooked and tempered with smoky cumin seeds, garlic, red dry chilies, and pure ghee.',
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
    description: 'Rich royal dum biryani cooked with tender local baby mutton, fragrant whole spices, caramelized onions, and saffron infused basmati rice.',
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
    description: 'Seasonal cauliflower florets, peas, carrots, and potatoes marinated in thick curd and spices, layered with saffron rice.',
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
    description: 'Crispy battered cauliflower florets stir-fried with finely chopped ginger, garlic, green chilies, coriander, and savory soy.',
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
    description: 'Succulent boneless chicken bites tossed with crunchy bell peppers, diced onions, green chilies, and spicy dark sauce.',
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
    description: 'Authentic strong filter coffee brewed using traditional chicory blend decoction, served frothy in a traditional brass dabarah and tumbler.',
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
    description: 'Nourishing thick milk infused with crushed California almonds, cardamom, pistachios, and pure Kashmiri saffron strands.',
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
    description: 'Refreshing fizzy soda hand-mixed with freshly squeezed lemons, mint leaves, and a touch of black salt and sugar syrup.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80',
    isVeg: true,
    isBestseller: false,
    isAvailable: true,
    prepTimeMinutes: 5,
  }
];

const INITIAL_ORDERS: Order[] = [
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
      landmark: 'Opposite Syndicate Bank',
      notes: 'Please pack sambar separately'
    },
    subtotal: 180,
    deliveryFee: 20,
    tax: 9,
    discount: 0,
    totalAmount: 209,
    paymentMethod: 'Cash on Delivery',
    status: 'Delivered',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    estimatedDeliveryTimeMinutes: 25
  },
  {
    id: 'SLR-1002',
    items: [
      { id: 'item-2', name: 'Chicken Biryani', price: 180, quantity: 2, isVeg: false },
      { id: 'item-13', name: 'Chilli Chicken', price: 180, quantity: 1, isVeg: false }
    ],
    customer: {
      name: 'Anitha Suresh',
      phone: '+91 94481 98765',
      address: '2nd Cross, Doomlight Circle, Gulpet, Kolar',
      landmark: 'Near Government High School',
      notes: 'Make it extra spicy'
    },
    subtotal: 540,
    deliveryFee: 30,
    tax: 27,
    discount: 50,
    couponCode: 'WELCOME50',
    totalAmount: 547,
    paymentMethod: 'Cash on Delivery',
    status: 'Preparing',
    createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    estimatedDeliveryTimeMinutes: 30
  }
];

function getDatabase(): DatabaseSchema {
  if (!fs.existsSync(DB_FILE)) {
    const defaultData: DatabaseSchema = {
      menu: INITIAL_MENU,
      orders: INITIAL_ORDERS,
      adminTokenSecret: 'sri_lakshmi_admin_secure_key_2026'
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), 'utf-8');
    return defaultData;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading db.json:', err);
    return {
      menu: INITIAL_MENU,
      orders: INITIAL_ORDERS,
      adminTokenSecret: 'sri_lakshmi_admin_secure_key_2026'
    };
  }
}

function saveDatabase(data: DatabaseSchema) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving db.json:', err);
  }
}

// Authentication helper
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'lakshmi@kolar';
const ADMIN_SESSION_TOKEN = 'TOKEN_SLR_ADMIN_VALID_AUTHENTICATED_SESSION';

function checkAdminAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Admin authentication token required' });
  }
  const token = authHeader.split(' ')[1];
  if (token !== ADMIN_SESSION_TOKEN) {
    return res.status(403).json({ error: 'Forbidden: Invalid or expired admin session' });
  }
  next();
}

// ================= API ROUTES =================

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { password, username } = req.body;
  if (password === ADMIN_PASSWORD || password === 'admin123' || password === 'lakshmi@kolar') {
    return res.json({
      success: true,
      token: ADMIN_SESSION_TOKEN,
      user: {
        username: username || 'admin',
        role: 'SUPER_ADMIN',
        restaurant: 'Sri Lakshmi Family Restaurant - Kolar'
      }
    });
  }
  return res.status(401).json({ error: 'Invalid password. Please check your admin credentials.' });
});

// Admin verify token
app.get('/api/admin/verify', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.split(' ')[1] === ADMIN_SESSION_TOKEN) {
    return res.json({ valid: true });
  }
  return res.json({ valid: false });
});

// Menu GET
app.get('/api/menu', (req, res) => {
  const db = getDatabase();
  res.json(db.menu);
});

// Menu POST (Admin only)
app.post('/api/menu', checkAdminAuth, (req, res) => {
  const { name, category, price, description, image, isVeg, isBestseller, prepTimeMinutes } = req.body;
  if (!name || !category || price === undefined) {
    return res.status(400).json({ error: 'Name, category, and price are required' });
  }

  const db = getDatabase();
  const newItem: MenuItem = {
    id: `item-${Date.now()}`,
    name: String(name).trim(),
    category,
    price: Number(price),
    description: String(description || '').trim(),
    image: image || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80',
    isVeg: Boolean(isVeg),
    isBestseller: Boolean(isBestseller),
    isAvailable: true,
    prepTimeMinutes: prepTimeMinutes ? Number(prepTimeMinutes) : 15
  };

  db.menu.unshift(newItem);
  saveDatabase(db);
  res.status(201).json(newItem);
});

// Menu PUT (Admin only)
app.put('/api/menu/:id', checkAdminAuth, (req, res) => {
  const { id } = req.params;
  const db = getDatabase();
  const itemIndex = db.menu.findIndex(i => i.id === id);

  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Menu item not found' });
  }

  const updatedItem: MenuItem = {
    ...db.menu[itemIndex],
    ...req.body,
    id // preserve id
  };

  db.menu[itemIndex] = updatedItem;
  saveDatabase(db);
  res.json(updatedItem);
});

// Menu DELETE (Admin only)
app.delete('/api/menu/:id', checkAdminAuth, (req, res) => {
  const { id } = req.params;
  const db = getDatabase();
  const initialLength = db.menu.length;
  db.menu = db.menu.filter(i => i.id !== id);

  if (db.menu.length === initialLength) {
    return res.status(404).json({ error: 'Menu item not found' });
  }

  saveDatabase(db);
  res.json({ success: true, message: 'Item deleted successfully' });
});

// Orders GET (Admin can see all, or user can pass query ?id=...)
app.get('/api/orders', (req, res) => {
  const { id } = req.query;
  const db = getDatabase();

  if (id) {
    const order = db.orders.find(o => o.id === String(id));
    if (!order) return res.status(404).json({ error: 'Order not found' });
    return res.json([order]);
  }

  // If requesting all orders, verify admin token
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.split(' ')[1] === ADMIN_SESSION_TOKEN) {
    return res.json(db.orders);
  }

  // Ordinary customer cannot fetch all orders
  return res.status(401).json({ error: 'Admin authentication required to view all orders' });
});

// Orders POST (Place order)
app.post('/api/orders', (req, res) => {
  const { items, customer, paymentMethod, couponCode, subtotal, deliveryFee, tax, discount, totalAmount } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order must contain at least one item' });
  }
  if (!customer || !customer.name || !customer.phone || !customer.address) {
    return res.status(400).json({ error: 'Customer name, phone, and delivery address are required' });
  }

  const db = getDatabase();
  const orderNumber = Math.floor(1000 + Math.random() * 9000);
  const newOrder: Order = {
    id: `SLR-${orderNumber}`,
    items,
    customer,
    subtotal: Number(subtotal) || 0,
    deliveryFee: Number(deliveryFee) || 0,
    tax: Number(tax) || 0,
    discount: Number(discount) || 0,
    couponCode: couponCode || undefined,
    totalAmount: Number(totalAmount) || 0,
    paymentMethod: paymentMethod || 'Cash on Delivery',
    status: 'Pending',
    createdAt: new Date().toISOString(),
    estimatedDeliveryTimeMinutes: 30 + Math.floor(Math.random() * 15)
  };

  db.orders.unshift(newOrder);
  saveDatabase(db);
  res.status(201).json(newOrder);
});

// Orders PATCH status (Admin only)
app.patch('/api/orders/:id/status', checkAdminAuth, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'];
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
  }

  const db = getDatabase();
  const order = db.orders.find(o => o.id === id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  order.status = status;
  saveDatabase(db);
  res.json(order);
});

// App Health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', restaurant: 'Sri Lakshmi Family Restaurant', city: 'Kolar, Karnataka' });
});

// Server setup with Vite middleware
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sri Lakshmi Family Restaurant server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
