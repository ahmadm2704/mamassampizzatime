import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
// Note: These environment variables should be set in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for database tables
export interface User {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  role: 'customer' | 'admin';
  loyalty_points: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  prep_time: number;
  is_vegetarian: boolean;
  is_spicy: boolean;
  is_available: boolean;
  image_url: string | null;
  display_order: number;
  metadata?: {
    customizable?: boolean;
    sizes?: Array<{ size: string; price: number }>;
  };
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string | null;
  order_number: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  delivery_type: 'delivery' | 'pickup' | 'dine-in';
  subtotal: number;
  tax: number;
  delivery_fee: number;
  discount: number;
  total: number;
  delivery_address: string | null;
  phone: string;
  special_instructions: string | null;
  estimated_time: number | null;
  created_at: string;
  completed_at: string | null;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  menu_item_id: string | null;
  quantity: number;
  unit_price: number;
  special_instructions: string | null;
  created_at: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  code: string | null;
  start_date: string;
  end_date: string;
  max_uses: number | null;
  current_uses: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Reservation {
  id: string;
  user_id: string | null;
  guest_name: string;
  guest_email: string | null;
  guest_phone: string;
  party_size: number;
  reservation_date: string;
  special_requests: string | null;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  rating: number;
  content: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  author: string | null;
  featured_image_url: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: 'new' | 'read' | 'responded';
  created_at: string;
  updated_at: string;
}

export interface Gallery {
  id: string;
  title: string | null;
  image_url: string;
  alt_text: string | null;
  category: string | null;
  display_order: number;
  created_at: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string | null;
  phone: string | null;
  email: string | null;
  opening_hours: string | null;
  latitude: number | null;
  longitude: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
