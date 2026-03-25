'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/data-table';
import { FormModal } from '@/components/form-modal';
import { useAdminData } from '@/hooks/use-admin';

export default function ReservationsPage() {
  const { data, loading, saveData, deleteData } = useAdminData('reservations');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [search, setSearch] = useState('');

  const columns = [
    { header: 'Guest Name', key: 'guest_name' },
    { header: 'Phone', key: 'guest_phone' },
    { header: 'Party Size', key: 'party_size' },
    { header: 'Date/Time', key: 'reservation_date' },
    { header: 'Status', key: 'status' }
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
          <h1 className="text-3xl font-bold tracking-tight">Reservations</h1>
          <p className="text-muted-foreground">Manage your reservations</p>
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
            <label className="block text-sm font-medium mb-1">Guest Name</label>
            <Input 
              type="text"
              value={formData['guest_name'] || ''}
              onChange={e => setFormData({ ...formData, 'guest_name': e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <Input 
              type="text"
              value={formData['guest_phone'] || ''}
              onChange={e => setFormData({ ...formData, 'guest_phone': e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Party Size</label>
            <Input 
              type="number"
              value={formData['party_size'] || ''}
              onChange={e => setFormData({ ...formData, 'party_size': e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date/Time</label>
            <Input 
              type="datetime-local"
              value={formData['reservation_date'] || ''}
              onChange={e => setFormData({ ...formData, 'reservation_date': e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={formData['status'] || ''}
              onChange={e => setFormData({ ...formData, 'status': e.target.value })}
            >
              <option value="">Select...</option>
              <option value="pending">pending</option><option value="confirmed">confirmed</option><option value="completed">completed</option><option value="cancelled">cancelled</option>
            </select>
          </div>
        </div>
      </FormModal>
    </div>
  );
}
