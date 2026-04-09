'use client';

import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Plus, Award, Shield, Star } from 'lucide-react';
import { useAdminCustomers } from '@/hooks/use-admin';

export default function CustomersPage() {
  const { customers, loading } = useAdminCustomers();

  const getVIPBadge = (points: number) => {
    if (points >= 100) return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 font-bold text-xs"><Star className="h-3.5 w-3.5" /> Gold VIP</span>;
    if (points >= 50) return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-300/50 text-slate-700 dark:text-slate-300 font-bold text-xs"><Shield className="h-3.5 w-3.5" /> Silver</span>;
    if (points >= 10) return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-700/20 text-amber-800 dark:text-amber-500 font-bold text-xs"><Award className="h-3.5 w-3.5" /> Bronze</span>;
    return <span className="text-muted-foreground text-xs font-semibold">New Customer</span>;
  };

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
        <div className="flex items-center gap-3">
          <span className="font-bold text-primary">{value || 0} pts</span>
          {getVIPBadge(value || 0)}
        </div>
      ),
    },
  ];

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customers & CRM</h1>
          <p className="text-muted-foreground mt-1 max-w-2xl">
            View and manage customer information. Loyalty points are automatically calculated based on our program: <strong className="text-foreground">every $15 spent earns 1 Reward Point</strong>.
          </p>
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
