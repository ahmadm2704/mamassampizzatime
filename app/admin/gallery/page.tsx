'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/data-table';
import { FormModal } from '@/components/form-modal';
import { uploadImage } from '@/lib/supabase-storage';
import { Image as ImageIcon, Upload } from 'lucide-react';
import { useAdminData } from '@/hooks/use-admin';

export default function GalleryPage() {
  const { data, loading, saveData, deleteData } = useAdminData('gallery');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');

  const columns = [
    { header: 'Title', key: 'title' },
    { header: 'Image URL', key: 'image_url' },
    { header: 'Category', key: 'category' },
    { header: 'Order', key: 'display_order' }
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
          <h1 className="text-3xl font-bold tracking-tight">Gallery</h1>
          <p className="text-muted-foreground">Manage your gallery</p>
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
            <label className="block text-sm font-medium mb-1">Image source (URL or Upload)</label>
            <div className="flex gap-2 mb-2">
              <Input 
                type="text"
                placeholder="https://example.com/image.jpg"
                value={formData['image_url'] || ''}
                onChange={e => setFormData({ ...formData, 'image_url': e.target.value })}
              />
            </div>
            <div className="relative border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center bg-muted/50 hover:bg-muted transition-colors">
              {uploading ? (
                 <div className="text-sm text-muted-foreground flex items-center gap-2">
                   <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                   Uploading...
                 </div>
              ) : (
                <>
                  <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground mb-1">Or click to upload from computer</span>
                  <span className="text-xs text-muted-foreground/70">JPG, PNG, WEBP max 5MB</span>
                  <input 
                    type="file" 
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    onChange={async (e) => {
                      if (e.target.files && e.target.files[0]) {
                        try {
                          setUploading(true);
                          const url = await uploadImage(e.target.files[0], 'gallery');
                          if (url) {
                            setFormData({ ...formData, 'image_url': url });
                          }
                        } catch (err) {
                          alert('Failed to upload image. Please ensure you have created a public Storage Bucket in Supabase named "gallery"');
                        } finally {
                          setUploading(false);
                        }
                      }
                    }}
                  />
                </>
              )}
            </div>
            {formData['image_url'] && (
               <div className="mt-4 rounded-lg overflow-hidden border border-border h-40 bg-zinc-100 flex items-center justify-center relative">
                 <img src={formData['image_url']} alt="Preview" className="max-h-full object-contain" />
               </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <Input 
              type="text"
              value={formData['category'] || ''}
              onChange={e => setFormData({ ...formData, 'category': e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Order</label>
            <Input 
              type="number"
              value={formData['display_order'] || ''}
              onChange={e => setFormData({ ...formData, 'display_order': e.target.value })}
            />
          </div>
        </div>
      </FormModal>
    </div>
  );
}
