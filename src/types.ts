export type FoodCategory = 'All' | 'South Indian' | 'North Indian' | 'Biryani' | 'Chinese' | 'Beverages';

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

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  isVeg: boolean;
  image: string;
  category: string;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  landmark?: string;
  notes?: string;
}

export interface Order {
  id: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    isVeg: boolean;
    image?: string;
  }[];
  customer: CustomerDetails;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  couponCode?: string;
  totalAmount: number;
  paymentMethod: 'Cash on Delivery' | 'UPI / Online (On Delivery)';
  status: 'Pending' | 'Confirmed' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  createdAt: string;
  estimatedDeliveryTimeMinutes: number;
}
