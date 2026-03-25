'use client';

import { useState } from 'react';
import { DataTable } from '@/components/data-table';
import { FormModal } from '@/components/form-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdminMenu, useAdminCategories } from '@/hooks/use-admin';
import { MenuItem } from '@/lib/types';
import { Plus, Image as ImageIcon, Loader2 } from 'lucide-react';

export default function MenuPage() {
  const { menuItems, loading, saveMenuItem, deleteMenuItem } = useAdminMenu();  
  const { categories } = useAdminCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (item: MenuItem) => {
    if(confirm('Are you sure you want to delete this menu item?')){
      await deleteMenuItem(item.id);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    setIsUploading(true);
    let imageUrl = formData.get('image_url') as string;
    const imageFile = formData.get('image_file') as File;

    if (imageFile && imageFile.size > 0) {
      const uploadData = new FormData();
      uploadData.append('file', imageFile);
      uploadData.append('bucket', 'menu');
      
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData,
        });
        const data = await res.json();
        if (data.url) {
          imageUrl = data.url;
        }
      } catch (error) {
        console.error('Failed to upload image', error);
      }
    }

    const itemData = {
      ...(selectedItem?.id ? { id: selectedItem.id } : {}),
      name: formData.get('name'),
      description: formData.get('description'),
      price: parseFloat(formData.get('price') as string),
      prep_time: parseInt(formData.get('prep_time') as string, 10),
      is_available: formData.get('is_available') === 'true',
      is_vegetarian: formData.get('is_vegetarian') === 'on',
      is_spicy: formData.get('is_spicy') === 'on',
      is_vegan: formData.get('is_vegan') === 'on',
      is_gluten_free: formData.get('is_gluten_free') === 'on',
      is_halal: formData.get('is_halal') === 'on',
      category_id: formData.get('category_id'),
      image_url: imageUrl || null,
    };

    await saveMenuItem(itemData);
    setIsUploading(false);
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const columns = [
    { 
      header: 'Image', 
      key: 'image_url' as const,
      render: (value: any) => (
        value ? <img src={value} className="w-10 h-10 object-cover rounded-md" alt="preview" /> : <div className="w-10 h-10 bg-muted flex items-center justify-center rounded-md text-xs">No img</div>
      )
    },
    { header: 'Name', key: 'name' as const },
    { header: 'Category', key: 'category' as const },
    {
      header: 'Price',
      key: 'price' as const,
      render: (value: any) => `$${Number(value || 0).toFixed(2)}`,
    },
    {
      header: 'Prep Time',
      key: 'prepTime' as const,
      render: (value: any) => `${value || 30} min`,
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

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Menu Items</h1>    
          <p className="text-muted-foreground mt-1">Manage all menu items and their details.</p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 gap-2"
          onClick={() => {
            setSelectedItem(null);
            setIsModalOpen(true);
          }}
        >
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </div>

      {loading ? (
        <p className="py-8 text-muted-foreground flex items-center justify-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Loading menu...</p>
      ) : (
        <div className="space-y-8">
          {categories.map((category) => {
            const categoryItems = menuItems.filter(
              (item) => item.category_id === category.id || item.category === category.name
            );
            
            if (categoryItems.length === 0) return null;

            return (
              <div key={category.id} className="bg-card rounded-xl border shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b bg-muted/30">
                  <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    {category.name} <span className="text-sm font-normal text-muted-foreground bg-secondary/20 px-2 py-0.5 rounded-full">{categoryItems.length} items</span>
                  </h2>
                </div>
                <div className="p-0">
                  <DataTable
                    columns={columns.filter(c => c.key !== 'category')}
                    data={categoryItems}
                    keyField="id"
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              </div>
            );
          })}
          
          {/* Also show un-categorized items if any */}
          {menuItems.filter(item => !categories.find(c => c.id === item.category_id || c.name === item.category)).length > 0 && (
             <div className="bg-card rounded-xl border shadow-sm overflow-hidden mt-8">
                <div className="px-6 py-4 border-b bg-muted/30">
                  <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    Uncategorized <span className="text-sm font-normal text-muted-foreground bg-secondary/20 px-2 py-0.5 rounded-full">{menuItems.filter(item => !categories.find(c => c.id === item.category_id || c.name === item.category)).length} items</span>
                  </h2>
                </div>
                <div className="p-0">
                  <DataTable
                    columns={columns.filter(c => c.key !== 'category')}
                    data={menuItems.filter(item => !categories.find(c => c.id === item.category_id || c.name === item.category))}
                    keyField="id"
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              </div>
          )}
        </div>
      )}

      <FormModal
        isOpen={isModalOpen}
        title={selectedItem ? 'Edit Menu Item' : 'Add New Menu Item'}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
        onSubmit={handleSubmit}
      >
        <div className="space-y-4">
          {isUploading && (
            <div className="bg-primary/10 text-primary p-3 rounded-md flex items-center justify-center gap-2 mb-4 font-medium text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              Uploading image and saving item...
            </div>
          )}
          <div>
            <label className="text-sm font-medium text-foreground">Item Name</label>
            <Input
              name="name"
              placeholder="Pizza name"
              defaultValue={selectedItem?.name || ''}
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Description</label>
            <textarea
              name="description"
              placeholder="Item description"
              defaultValue={selectedItem?.description || ''}
              className="mt-1 w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground resize-none"
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Item Image (Upload File OR specify URL)</label>
            <div className="mt-2 space-y-3 p-4 border border-dashed rounded-lg bg-muted/20">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Upload from Computer</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    name="image_file"
                    className="flex-1 cursor-pointer file:cursor-pointer file:bg-primary/10 file:text-primary file:border-0 file:rounded-md file:px-4 file:py-1 hover:file:bg-primary/20 transition-all font-medium text-sm"
                  />
                </div>
              </div>
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-border"></div>
                <span className="flex-shrink-0 mx-4 text-muted-foreground text-xs font-semibold uppercase">Or</span>
                <div className="flex-grow border-t border-border"></div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Paste Image URL</label>
                <Input
                  name="image_url"
                  placeholder="https://example.com/image.jpg"
                  defaultValue={selectedItem?.image_url || selectedItem?.image || ''}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">Category</label>
              <select 
                name="category_id" 
                className="mt-1 w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                defaultValue={selectedItem?.category_id || (categories.length > 0 ? categories[0].id : '')}
                required
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Price ($)</label>
              <Input
                name="price"
                type="number"
                placeholder="0.00"
                defaultValue={selectedItem?.price || ''}
                className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                step="0.01"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">Prep Time (min)</label>
              <Input
                name="prep_time"
                type="number"
                placeholder="15"
                defaultValue={selectedItem?.prepTime || selectedItem?.prep_time || ''}
                className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Availability</label>
              <select name="is_available" defaultValue={selectedItem?.available?.toString() || 'true'} className="mt-1 w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                <option value="true">Available</option>
                <option value="false">Unavailable</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 h-full items-center pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input name="is_vegetarian" type="checkbox" className="rounded w-4 h-4 text-primary" defaultChecked={selectedItem?.vegetarian || selectedItem?.is_vegetarian || false} />
              <span className="text-sm text-foreground">Vegetarian</span>       
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input name="is_vegan" type="checkbox" className="rounded w-4 h-4 text-primary" defaultChecked={selectedItem?.vegan || selectedItem?.is_vegan || false} />
              <span className="text-sm text-foreground">Vegan</span>       
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input name="is_gluten_free" type="checkbox" className="rounded w-4 h-4 text-primary" defaultChecked={selectedItem?.glutenFree || selectedItem?.is_gluten_free || false} />
              <span className="text-sm text-foreground">Gluten-Free</span>       
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input name="is_halal" type="checkbox" className="rounded w-4 h-4 text-primary" defaultChecked={selectedItem?.halal || selectedItem?.is_halal || false} />
              <span className="text-sm text-foreground">Halal</span>       
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input name="is_spicy" type="checkbox" className="rounded w-4 h-4 text-primary" defaultChecked={selectedItem?.spicy || selectedItem?.is_spicy || false} />
              <span className="text-sm text-foreground">Spicy</span>
            </label>
          </div>
        </div>
      </FormModal>
    </div>
  );
}
