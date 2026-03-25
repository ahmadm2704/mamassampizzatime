const fs = require('fs');
const path = require('path');

const configurations = [
  {
    name: 'reservations',
    tableName: 'reservations',
    title: 'Reservations',
    fields: [
      { key: 'guest_name', label: 'Guest Name', type: 'text' },
      { key: 'guest_phone', label: 'Phone', type: 'text' },
      { key: 'party_size', label: 'Party Size', type: 'number' },
      { key: 'reservation_date', label: 'Date/Time', type: 'datetime-local' },
      { key: 'status', label: 'Status', type: 'select', options: ['pending', 'confirmed', 'completed', 'cancelled'] },
    ]
  },
  {
    name: 'offers',
    tableName: 'offers',
    title: 'Offers & Deals',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'code', label: 'Coupon Code', type: 'text' },
      { key: 'discount_type', label: 'Discount Type', type: 'select', options: ['percentage', 'fixed'] },
      { key: 'discount_value', label: 'Value', type: 'number' },
      { key: 'start_date', label: 'Start Date', type: 'datetime-local' },
      { key: 'end_date', label: 'End Date', type: 'datetime-local' },
      { key: 'is_active', label: 'Active', type: 'checkbox' }
    ]
  },
  {
    name: 'blog',
    tableName: 'blog_posts',
    title: 'Blog Posts',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'slug', label: 'Slug', type: 'text' },
      { key: 'author', label: 'Author', type: 'text' },
      { key: 'content', label: 'Content', type: 'textarea' },
      { key: 'is_published', label: 'Published', type: 'checkbox' }
    ]
  },
  {
    name: 'testimonials',
    tableName: 'testimonials',
    title: 'Testimonials',
    fields: [
      { key: 'customer_name', label: 'Customer Name', type: 'text' },
      { key: 'rating', label: 'Rating (1-5)', type: 'number' },
      { key: 'content', label: 'Review', type: 'textarea' },
      { key: 'is_approved', label: 'Approved', type: 'checkbox' }
    ]
  },
  {
    name: 'gallery',
    tableName: 'gallery',
    title: 'Gallery',
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'image_url', label: 'Image URL', type: 'text' },
      { key: 'category', label: 'Category', type: 'text' },
      { key: 'display_order', label: 'Order', type: 'number' }
    ]
  },
  {
    name: 'locations',
    tableName: 'locations',
    title: 'Locations',
    fields: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'address', label: 'Address', type: 'textarea' },
      { key: 'phone', label: 'Phone', type: 'text' },
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'opening_hours', label: 'Hours', type: 'text' },
      { key: 'is_active', label: 'Active', type: 'checkbox' }
    ]
  },
  {
    name: 'careers',
    tableName: 'careers',
    title: 'Careers',
    fields: [
      { key: 'title', label: 'Job Title', type: 'text' },
      { key: 'department', label: 'Department', type: 'text' },
      { key: 'location', label: 'Location', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'is_active', label: 'Active', type: 'checkbox' }
    ]
  },
  {
    name: 'faqs',
    tableName: 'faqs',
    title: 'FAQs',
    fields: [
      { key: 'question', label: 'Question', type: 'text' },
      { key: 'answer', label: 'Answer', type: 'textarea' },
      { key: 'category', label: 'Category', type: 'text' },
      { key: 'is_active', label: 'Active', type: 'checkbox' }
    ]
  },
  {
    name: 'messages',
    tableName: 'contact_messages',
    title: 'Messages',
    fields: [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'subject', label: 'Subject', type: 'text' },
      { key: 'message', label: 'Message', type: 'textarea' },
      { key: 'status', label: 'Status', type: 'select', options: ['new', 'read', 'responded'] }
    ]
  }
];

configurations.forEach(config => {
  const content = `'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/data-table';
import { FormModal } from '@/components/form-modal';
import { useAdminData } from '@/hooks/use-admin';

export default function ${config.name.charAt(0).toUpperCase() + config.name.slice(1)}Page() {
  const { data, loading, saveData, deleteData } = useAdminData('${config.tableName}');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [search, setSearch] = useState('');

  const columns = [
    ${config.fields.filter(f => f.type !== 'textarea').map(f => `{ header: '${f.label}', key: '${f.key}' }`).join(',\n    ')}
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
          <h1 className="text-3xl font-bold tracking-tight">${config.title}</h1>
          <p className="text-muted-foreground">Manage your ${config.name}</p>
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
          ${config.fields.map(f => {
            if (f.type === 'select') {
              return `
          <div>
            <label className="block text-sm font-medium mb-1">${f.label}</label>
            <select 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={formData['${f.key}'] || ''}
              onChange={e => setFormData({ ...formData, '${f.key}': e.target.value })}
            >
              <option value="">Select...</option>
              ${f.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
            </select>
          </div>`;
            } else if (f.type === 'checkbox') {
              return `
          <div className="flex items-center gap-2 mt-4">
            <input 
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300"
              checked={formData['${f.key}'] || false}
              onChange={e => setFormData({ ...formData, '${f.key}': e.target.checked })}
            />
            <label className="text-sm font-medium">${f.label}</label>
          </div>`;
            } else if (f.type === 'textarea') {
              return `
          <div>
            <label className="block text-sm font-medium mb-1">${f.label}</label>
            <textarea 
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[100px]"
              value={formData['${f.key}'] || ''}
              onChange={e => setFormData({ ...formData, '${f.key}': e.target.value })}
            />
          </div>`;
            } else {
              return `
          <div>
            <label className="block text-sm font-medium mb-1">${f.label}</label>
            <Input 
              type="${f.type}"
              value={formData['${f.key}'] || ''}
              onChange={e => setFormData({ ...formData, '${f.key}': e.target.value })}
            />
          </div>`;
            }
          }).join('')}
        </div>
      </FormModal>
    </div>
  );
}
`;
  fs.writeFileSync('D:/Websites/MAMASSAMPIZZATIME/app/admin/' + config.name + '/page.tsx', content);
});

console.log('Admin pages fully generated!');
