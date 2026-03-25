'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/data-table';
import { FormModal } from '@/components/form-modal';
import { useAdminData } from '@/hooks/use-admin';

export default function TestimonialsPage() {
  const { data, loading, saveData, deleteData } = useAdminData('testimonials');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [search, setSearch] = useState('');

  const columns = [
    { header: 'Customer Name', key: 'customer_name' },
    { header: 'Rating (1-5)', key: 'rating' },
    { header: 'Approved', key: 'is_approved' }
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
          <h1 className="text-3xl font-bold tracking-tight">Testimonials</h1>
          <p className="text-muted-foreground">Manage your testimonials</p>
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
            <label className="block text-sm font-medium mb-1">Customer Name</label>
            <Input 
              type="text"
              value={formData['customer_name'] || ''}
              onChange={e => setFormData({ ...formData, 'customer_name': e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
            <Input 
              type="number"
              value={formData['rating'] || ''}
              onChange={e => setFormData({ ...formData, 'rating': e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Review</label>
            <textarea 
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[100px]"
              value={formData['content'] || ''}
              onChange={e => setFormData({ ...formData, 'content': e.target.value })}
            />
          </div>
          <div className="flex items-center gap-2 mt-4">
            <input 
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300"
              checked={formData['is_approved'] || false}
              onChange={e => setFormData({ ...formData, 'is_approved': e.target.checked })}
            />
            <label className="text-sm font-medium">Approved</label>
          </div>
        </div>
      </FormModal>
    </div>
  );
}
