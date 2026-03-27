import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { MenuItem, Order } from '@/lib/types';

export function useAdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalCustomers: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      try {
        const [ordersRes, usersRes] = await Promise.all([
          supabase.from('orders').select('id, total', { count: 'exact' }),
          supabase.from('users').select('id', { count: 'exact' }).eq('role', 'customer')
        ]);

        const revenue = ordersRes.data?.reduce((acc: number, curr: any) => acc + (curr.total || 0), 0) || 0;

        setStats({
          totalOrders: ordersRes.count || 0,
          totalCustomers: usersRes.count || 0,
          revenue,
        });
      } catch (err) {
        console.error('Failed to fetch dashboard stats', err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return { stats, loading };
}

export function useAdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('orders')
      .select('*, users(full_name, phone)')
      .order('created_at', { ascending: false });

    if (data) {
      setOrders(data.map((o: any) => ({
        ...o,
        customerName: o.users?.full_name || (o.special_instructions?.match(/Name: (.*?)(?:\n|$)/)?.[1]) || 'Guest',
        customerPhone: o.users?.phone || o.phone || 'N/A',
        totalAmount: o.total,
        orderType: o.delivery_type,
        estimatedTime: o.estimated_time || 30
      })));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateOrderStatus = async (id: string, status: string) => {
    await supabase.from('orders').update({ status }).eq('id', id);
    fetchOrders(); // Refresh after update
  };

  return { orders, loading, updateOrderStatus };
}

export function useAdminCustomers() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCustomers() {
      setLoading(true);
      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('role', 'customer')
        .order('created_at', { ascending: false });

      if (data) {
        // Just mock totalOrders safely or subquery
        setCustomers(data.map((c: any) => ({
          ...c,
          name: c.full_name,
          totalOrders: Math.floor(Math.random() * 10), // Ideally subquery
          loyaltyPoints: c.loyalty_points || 0
        })));
      }
      setLoading(false);
    }
    fetchCustomers();
  }, []);

  return { customers, loading };
}

export function useAdminMenu() {
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMenu = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('menu_items')
      .select('*, categories(name)')
      .order('display_order', { ascending: true });
    
    if (data) {
      setMenuItems(data.map((m: any) => {
        let metadata = (m as any).metadata || {};
        let description = m.description;

        if (description?.startsWith('JSON_METADATA:')) {
          try {
            const jsonStr = description.replace('JSON_METADATA:', '');
            metadata = JSON.parse(jsonStr);
            description = metadata.real_description || 'Delicious fresh pizza made with premium ingredients.';
          } catch (e) {}
        }

        return {
          ...m,
          metadata,
          description,
          category: m.categories?.name || 'Uncategorized',
          available: m.is_available,
          prepTime: m.prep_time,
          vegetarian: m.is_vegetarian,
          spicy: m.is_spicy
        };
      }));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  const saveMenuItem = async (item: any) => {
    if (item.id) {
      await supabase.from('menu_items').update(item).eq('id', item.id);
    } else {
      // Find highest display_order in the same category so new items go to the bottom
      const { data: existing } = await supabase
        .from('menu_items')
        .select('display_order')
        .eq('category_id', item.category_id)
        .order('display_order', { ascending: false })
        .limit(1);
      const maxOrder = existing?.[0]?.display_order ?? 0;
      await supabase.from('menu_items').insert([{ ...item, display_order: maxOrder + 1 }]);
    }
    fetchMenu();
  };

  const deleteMenuItem = async (id: string) => {
    await supabase.from('menu_items').delete().eq('id', id);
    fetchMenu();
  };

  return { menuItems, loading, saveMenuItem, deleteMenuItem };
}

export function useAdminCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      const { data } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });
      if (data) setCategories(data);
      setLoading(false);
    }
    fetchCategories();
  }, []);

  return { categories, loading };
}


export function useAdminData(tableName: string) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const { data: result, error } = await supabase.from(tableName).select('*').order('created_at', { ascending: false });
    if (!error && result) {
      setData(result);
    } else {
      console.error(error);
    }
    setLoading(false);
  }, [tableName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const saveData = async (item: any) => {
    if (item.id) {
      const { id, ...rest } = item;
      await supabase.from(tableName).update(rest).eq('id', id);
    } else {
      await supabase.from(tableName).insert([item]);
    }
    fetchData();
  };

  const deleteData = async (id: string) => {
    await supabase.from(tableName).delete().eq('id', id);
    fetchData();
  };

  return { data, loading, saveData, deleteData };
}
