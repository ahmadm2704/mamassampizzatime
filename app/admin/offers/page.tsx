'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/data-table';
import { FormModal } from '@/components/form-modal';
import { useAdminData } from '@/hooks/use-admin';

export default function OffersPage() {
  const { data, loading, saveData, deleteData } = useAdminData('offers');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [search, setSearch] = useState('');

  const columns = [
    { header: 'Title', key: 'title' },
    { header: 'Coupon Code', key: 'code' },
    { header: 'Discount Type', key: 'discount_type' },
    { header: 'Value', key: 'discount_value' },
    { header: 'Start Date', key: 'start_date' },
    { header: 'End Date', key: 'end_date' },
    { header: 'Active', key: 'is_active' }
  ];

  const handleOpenModal = (item?: any) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({});
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await saveData(formData);
    setIsModalOpen(false);
  };

  const filteredData = data.filter(item => 
    JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Offers & Deals</h1>
          <p className="text-muted-foreground">Manage your offers</p>
        </div>
        <Button className="gap-2" onClick={() => handleOpenModal()}>
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-xl border border-border">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search..." 
            className="pl-9" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {!loading && (
        <DataTable 
          columns={columns} 
          data={filteredData} 
          keyField="id" 
          onEdit={handleOpenModal}
          onDelete={(item) => {
            if(confirm('Are you sure you want to delete this item?')) {
              deleteData(item.id);
            }
          }}
        />
      )}

      <FormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? 'Edit Item' : 'Create New'}
        onSubmit={handleSubmit}
        isLoading={loading}
      >
        <div className="grid grid-cols-1 gap-4">
          
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input 
              type="text"
              value={formData['title'] || ''}
              onChange={e => setFormData({ ...formData, 'title': e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Coupon Code</label>
            <Input 
              type="text"
              value={formData['code'] || ''}
              onChange={e => setFormData({ ...formData, 'code': e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Discount Type</label>
            <select 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={formData['discount_type'] || ''}
              onChange={e => setFormData({ ...formData, 'discount_type': e.target.value })}
            >
              <option value="">Select...</option>
              <option value="percentage">percentage</option><option value="fixed">fixed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Value</label>
            <Input 
              type="number"
              value={formData['discount_value'] || ''}
              onChange={e => setFormData({ ...formData, 'discount_value': e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <Input 
              type="datetime-local"
              value={formData['start_date'] || ''}
              onChange={e => setFormData({ ...formData, 'start_date': e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <Input 
              type="datetime-local"
              value={formData['end_date'] || ''}
              onChange={e => setFormData({ ...formData, 'end_date': e.target.value })}
            />
          </div>
          <div className="flex items-center gap-2 mt-4">
            <input 
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300"
              checked={formData['is_active'] || false}
              onChange={e => setFormData({ ...formData, 'is_active': e.target.checked })}
            />
            <label className="text-sm font-medium">Active</label>
          </div>
        </div>
      </FormModal>
    </div>
  );
}
