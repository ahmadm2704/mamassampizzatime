// Menu Items
export interface MenuItem {
  id: string;
  category_id?: string;
  name: string;
  description: string;
  category: 'Pizza' | 'Pasta' | 'Appetizer' | 'Salad' | 'Dessert' | 'Beverage' | string;
  price: number;
  image?: string;
  image_url?: string | null;
  available: boolean;
  prepTime: number; // minutes
  is_available?: boolean;
  is_vegetarian?: boolean;
  is_spicy?: boolean;
  spicy: boolean;
  vegetarian: boolean;
  vegan: boolean;
  metadata?: {
    customizable?: boolean;
    sizes?: Array<{ size: string; price: number }>;
  };
}

export interface CrustOption {
  name: string;
  price?: number;
}

export interface SauceOption {
  name: string;
  price?: number;
}

export type ToppingPlacement = 'none' | 'left' | 'right' | 'whole' | 'double';

export interface ToppingOption {
  id: string;
  name: string;
  category: 'Meat' | 'Halal' | 'Veggie' | 'Free' | 'Cheese';
  price?: number;
}

export interface PizzaCustomization {
  crust: string;
  sauce: string;
  toppings: Array<{
    toppingId: string;
    placement: ToppingPlacement;
  }>;
  additionalOptions?: string[];
}

// Cart
export interface CartItem {
  id: string; // Composite ID: menuItemId + size + options string
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  customization?: PizzaCustomization;
  options?: any[]; // For other items
  image_url?: string;
}

// Orders
export interface Order {
  id: string;
  customerEmail: string;
  customerPhone: string;
  customerName: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  orderType: 'delivery' | 'pickup' | 'dine-in';
  deliveryAddress?: string;
  createdAt: Date;
  estimatedTime: number; // minutes
  notes?: string;
}

// Customers
export interface Customer {
  id: string;
  email: string;
  name: string;
  phone: string;
  loyaltyPoints: number;
  totalOrders: number;
  createdAt: Date;
}

// Reservations
export interface Reservation {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  dateTime: Date;
  partySize: number;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
}

// Offers/Deals
export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number;
  discountType: 'percentage' | 'fixed';
  validFrom: Date;
  validUntil: Date;
  minOrderAmount?: number;
  applicableItems?: string[]; // menu item ids
  code?: string;
  active: boolean;
}

// Blog Posts
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  featured: boolean;
}

// Testimonials
export interface Testimonial {
  id: string;
  customerName: string;
  content: string;
  rating: number; // 1-5
  image?: string;
  featured: boolean;
  createdAt: Date;
}

// Gallery
export interface GalleryImage {
  id: string;
  title: string;
  image: string;
  category: 'food' | 'restaurant' | 'team' | 'event';
  featured: boolean;
  createdAt: Date;
}

// Locations
export interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: {
    [key: string]: { open: string; close: string };
  };
  latitude: number;
  longitude: number;
  image: string;
}

// FAQ
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

// Career Positions
export interface CareerPosition {
  id: string;
  title: string;
  location: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: Date;
  featured: boolean;
}

// Contact Messages
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'new' | 'read' | 'responded';
  createdAt: Date;
}

// Admin User
export interface AdminUser {
  id: string;
  email: string;
  password: string; // hashed
  name: string;
  role: 'admin' | 'manager' | 'staff';
  active: boolean;
  createdAt: Date;
  lastLogin?: Date;
}

// Site Settings
export interface SiteSettings {
  id: string;
  siteName: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  openingHours: {
    [key: string]: { open: string; close: string };
  };
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  currency: string;
  timezone: string;
}
