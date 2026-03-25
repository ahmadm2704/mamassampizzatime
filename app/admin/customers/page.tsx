'use client';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useAdminCustomers } from '@/hooks/use-admin';

export default function CustomersPage() {
  const { customers, loading } = useAdminCustomers();

  const columns = [
    { header: 'Name', key: 'name' as const },
    { header: 'Email', key: 'email' as const },
    { header: 'Phone', key: 'phone' as const, render: (value: any) => value || 'N/A' },
    {
      header: 'Orders',
      key: 'totalOrders' as const,
    },
    {
      header: 'Loyalty Points',
      key: 'loyaltyPoints' as const,
      render: (value: any) => (
        <span className="font-medium text-primary">{value || 0}</span>
      ),
    },
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customers</h1>
          <p className="text-muted-foreground mt-1">View and manage customer information.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2">
          <Plus className="h-4 w-4" />
          Add Customer
        </Button>
      </div>

      {loading ? (
        <p>Loading customers...</p>
      ) : (
        <DataTable
          columns={columns}
          data={customers}
          keyField="id"
          onEdit={(customer) => console.log('Edit customer:', customer)}
          onDelete={(customer) => console.log('Delete customer:', customer)}
        />
      )}
    </div>
  );
}
