'use client';

import { StatCard } from '@/components/stat-card';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { useAdminDashboard, useAdminOrders, useAdminMenu } from '@/hooks/use-admin';
import {
  ShoppingBag,
  Users,
  TrendingUp,
  Calendar,
  Plus,
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const { stats, loading: statsLoading } = useAdminDashboard();
  const { orders, loading: ordersLoading } = useAdminOrders();
  const { menuItems, loading: menuLoading } = useAdminMenu();

  const orderColumns = [
    { header: 'Order ID', key: 'id' as const, render: (value: any) => value.slice(0, 8) },
    { header: 'Customer', key: 'customerName' as const },
    {
      header: 'Total',
      key: 'totalAmount' as const,
      render: (value: any) => `$${Number(value || 0).toFixed(2)}`,
    },
    {
      header: 'Status',
      key: 'status' as const,
      render: (status: any) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          status === 'completed' || status === 'delivered'
            ? 'bg-green-100 text-green-700'
            : status === 'preparing' || status === 'ready'
            ? 'bg-blue-100 text-blue-700'
            : 'bg-yellow-100 text-yellow-700'
        }`}>
          {status}
        </span>
      ),
    },
  ];

  const menuColumns = [
    { header: 'Name', key: 'name' as const },
    { header: 'Category', key: 'category' as const },
    {
      header: 'Price',
      key: 'price' as const,
      render: (value: any) => `$${Number(value || 0).toFixed(2)}`,
    },
    {
      header: 'Status',
      key: 'available' as const,
      render: (available: any) => (
        <span className={available ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
          {available ? 'Available' : 'Unavailable'}
        </span>
      ),
    },
  ];

  if (statsLoading) {
    return <div className="p-8"><p>Loading dashboard...</p></div>;
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 animate-fade-in">
        <div>
          <h1 className="heading-xl text-foreground">📊 Dashboard</h1>
          <p className="text-body text-muted-foreground mt-2">Welcome back! Here's your business overview at a glance.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <StatCard
            title="Total Orders"
            value={stats.totalOrders.toString()}
            icon={<ShoppingBag className="h-6 w-6" />}
            trend="up"
            trendValue="Live"
            color="primary"
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <StatCard
            title="Total Customers"
            value={stats.totalCustomers.toString()}
            icon={<Users className="h-6 w-6" />}
            trend="up"
            trendValue="Live"
            color="secondary"
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <StatCard
            title="Revenue"
            value={`$${stats.revenue.toFixed(2)}`}
            icon={<TrendingUp className="h-6 w-6" />}
            trend="up"
            trendValue="Live"
            color="accent"
          />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <StatCard
            title="Reservations"
            value="N/A"
            icon={<Calendar className="h-6 w-6" />}
            trend="none"
            trendValue="Coming soon"
            color="green"
          />
        </div>
      </div>

      {/* Recent Orders */}
      <div className="space-y-5 card-premium rounded-xl p-6">
        <div className="flex justify-between items-center border-b border-border pb-4">
          <h2 className="heading-md text-foreground">📦 Recent Orders</h2>
          <Button asChild className="btn-primary shadow-lg">
            <Link href="/admin/orders">View All</Link>
          </Button>
        </div>
        {ordersLoading ? (
          <p>Loading orders...</p>
        ) : (
          <DataTable
            columns={orderColumns}
            data={orders.slice(0, 5)}
            keyField="id"
            onEdit={setSelectedOrder}
          />
        )}
      </div>

      {/* Menu Items Overview */}
      <div className="space-y-5 card-premium rounded-xl p-6">
        <div className="flex justify-between items-center border-b border-border pb-4">
          <h2 className="heading-md text-foreground">🍕 Menu Items ({menuItems.length})</h2>
          <Button asChild className="btn-secondary shadow-lg">
            <Link href="/admin/menu">Manage Menu</Link>
          </Button>
        </div>
        {menuLoading ? (
          <p>Loading menu...</p>
        ) : (
          <DataTable
            columns={menuColumns}
            data={menuItems.slice(0, 5)}
            keyField="id"
            onEdit={(item: any) => console.log(item)}
          />
        )}
      </div>
    </div>
  );
}
