'use client';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { useAdminOrders } from '@/hooks/use-admin';
import { Eye } from 'lucide-react';

export default function OrdersPage() {
  const { orders, loading, updateOrderStatus } = useAdminOrders();

  const handleStatusChange = (orderId: string, newStatus: string) => {
    updateOrderStatus(orderId, newStatus);
  };

  const columns = [
    { header: 'Order ID', key: 'id' as const, render: (value: any) => value.slice(0, 8) },
    { header: 'Customer', key: 'customerName' as const },
    {
      header: 'Phone',
      key: 'customerPhone' as const,
    },
    {
      header: 'Type',
      key: 'orderType' as const,
      render: (value: any) => (
        <span className="capitalize px-3 py-1 bg-muted rounded-full text-xs font-medium">
          {value || 'Delivery'}
        </span>
      ),
    },
    {
      header: 'Total',
      key: 'totalAmount' as const,
      render: (value: any) => `$${Number(value || 0).toFixed(2)}`,
    },
    {
      header: 'Status',
      key: 'status' as const,
      render: (status: any, row: any) => (
        <select
          aria-label="Order Status"
          value={status}
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
          className={`px-3 py-1 rounded-full text-xs font-medium capitalize outline-none cursor-pointer ${
            status === 'completed' || status === 'delivered'
              ? 'bg-green-100 text-green-700'
              : status === 'preparing' || status === 'ready'
              ? 'bg-blue-100 text-blue-700'
              : status === 'confirmed'
              ? 'bg-purple-100 text-purple-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="preparing">Preparing</option>
          <option value="ready">Ready</option>
          <option value="delivered">Delivered</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      ),
    },
    {
      header: 'Est. Time',
      key: 'estimatedTime' as const,
      render: (value: any) => `${value || 30} min`,
    },
  ];

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground mt-1">Manage and track all customer orders.</p>
      </div>

      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <DataTable
          columns={columns}
          data={orders}
          keyField="id"
          onEdit={(order) => console.log('View order:', order)}
        />
      )}
    </div>
  );
}
