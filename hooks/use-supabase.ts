import { useState, useEffect, useCallback } from 'react';
import { supabase, type MenuItem, type Order, type Category, type Offer, type Reservation } from '@/lib/supabase';

// Fetch all menu items
export function useMenuItems() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const { data, error: err } = await supabase
          .from('menu_items')
          .select('*')
          .eq('is_available', true)
          .order('display_order', { ascending: true });

        if (err) throw err;
        setItems(data || []);
        setError(null);
      } catch (err: any) {
      setError(err instanceof Error ? err : new Error(err?.message || 'Unknown error'));
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return { items, loading, error };
}

// Fetch all categories
export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const { data, error: err } = await supabase
          .from('categories')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (err) throw err;
        setCategories(data || []);
        setError(null);
      } catch (err: any) {
      setError(err instanceof Error ? err : new Error(err?.message || 'Unknown error'));
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}

// Fetch items by category
export function useMenuItemsByCategory(categoryId: string) {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!categoryId) {
      setItems([]);
      return;
    }

    const fetchItems = async () => {
      try {
        setLoading(true);
        const { data, error: err } = await supabase
          .from('menu_items')
          .select('*')
          .eq('category_id', categoryId)
          .eq('is_available', true)
          .order('display_order', { ascending: true });

        if (err) throw err;
        setItems(data || []);
        setError(null);
      } catch (err: any) {
      setError(err instanceof Error ? err : new Error(err?.message || 'Unknown error'));
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [categoryId]);

  return { items, loading, error };
}

// Fetch active offers
export function useOffers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setLoading(true);
        const now = new Date().toISOString();
        const { data, error: err } = await supabase
          .from('offers')
          .select('*')
          .eq('is_active', true)
          .lte('start_date', now)
          .gte('end_date', now)
          .order('created_at', { ascending: false });

        if (err) throw err;
        setOffers(data || []);
        setError(null);
      } catch (err: any) {
      setError(err instanceof Error ? err : new Error(err?.message || 'Unknown error'));
        setOffers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return { offers, loading, error };
}

// Create a reservation
export function useCreateReservation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createReservation = useCallback(async (data: Omit<Reservation, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      setLoading(true);
      const { data: result, error: err } = await supabase
        .from('reservations')
        .insert([data])
        .select();

      if (err) throw err;
      setError(null);
      return result?.[0] || null;
    } catch (err: any) {
      const error = err instanceof Error ? err : new Error(err?.message || 'Unknown error');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createReservation, loading, error };
}

// Create a contact message
export function useCreateContactMessage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sendMessage = useCallback(async (data: Omit<any, 'id' | 'status' | 'created_at' | 'updated_at'>) => {
    try {
      setLoading(true);
      const { data: result, error: err } = await supabase
        .from('contact_messages')
        .insert([{ ...data, status: 'new' }])
        .select();

      if (err) throw err;
      setError(null);
      return result?.[0] || null;
    } catch (err: any) {
      const error = err instanceof Error ? err : new Error(err?.message || 'Unknown error');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { sendMessage, loading, error };
}

// Create order
export function useCreateOrder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createOrder = useCallback(async (data: Omit<Order, 'id' | 'created_at' | 'updated_at' | 'completed_at'>) => {
    try {
      setLoading(true);
      const { data: result, error: err } = await supabase
        .from('orders')
        .insert([data])
        .select();

      if (err) throw err;
      setError(null);
      return result?.[0] || null;
    } catch (err: any) {
      const error = err instanceof Error ? err : new Error(err?.message || 'Unknown error');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createOrder, loading, error };
}
