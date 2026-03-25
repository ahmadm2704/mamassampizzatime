'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/data-table';
import { FormModal } from '@/components/form-modal';
import { useAdminData } from '@/hooks/use-admin';

export default function MessagesPage() {
  const { data, loading, saveData, deleteData } = useAdminData('contact_messages');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [search, setSearch] = useState('');

  const columns = [
    { header: 'Name', key: 'name' },
    { header: 'Email', key: 'email' },
    { header: 'Subject', key: 'subject' },
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
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground">Manage your messages</p>
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
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input 
              type="text"
              value={formData['name'] || ''}
              onChange={e => setFormData({ ...formData, 'name': e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input 
              type="text"
              value={formData['email'] || ''}
              onChange={e => setFormData({ ...formData, 'email': e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Subject</label>
            <Input 
              type="text"
              value={formData['subject'] || ''}
              onChange={e => setFormData({ ...formData, 'subject': e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea 
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[100px]"
              value={formData['message'] || ''}
              onChange={e => setFormData({ ...formData, 'message': e.target.value })}
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
              <option value="new">new</option><option value="read">read</option><option value="responded">responded</option>
            </select>
          </div>
        </div>
      </FormModal>
    </div>
  );
}
