'use client';

import { useState } from 'react';
import { DataTable } from '@/components/data-table';
import { FormModal } from '@/components/form-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAdminMenu, useAdminCategories } from '@/hooks/use-admin';
import { MenuItem } from '@/lib/types';
import { Plus, Loader2, DollarSign, Trash2, PlusCircle } from 'lucide-react';

export default function MenuPage() {
  const { menuItems, loading, saveMenuItem, deleteMenuItem } = useAdminMenu();
  const { categories } = useAdminCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  const BADGES = [
    { value: '', label: 'None' },
    { value: 'new', label: '🆕 New Launch' },
    { value: 'hot', label: '🔥 Hot & Popular' },
    { value: 'featured', label: '⭐ Featured' },
    { value: 'limited', label: '⏱ Limited Time' },
    { value: 'bestseller', label: '🏆 Best Seller' },
  ];
  const [badge, setBadge] = useState('');

  // Universal variants state: [{ name: string, price: string }]
  const [variants, setVariants] = useState<{ name: string; price: string }[]>([]);

  const openAdd = () => {
    setBadge('');
    setSelectedItem(null);
    setSelectedCategoryId(categories[0]?.id || '');
    setVariants([]);
    setIsModalOpen(true);
  };

  const handleEdit = (item: any) => {
    setBadge(item.metadata?.badge || '');
    setSelectedItem(item);
    setSelectedCategoryId(item.category_id || '');
    // Load existing variants/sizes from metadata
    if (item.metadata?.sizes) {
      setVariants(item.metadata.sizes.map((s: any) => ({ name: s.size, price: String(s.price) })));
    } else {
      setVariants([]);
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (item: MenuItem) => {
    if (confirm('Are you sure you want to delete this item?')) {
      await deleteMenuItem(item.id);
    }
  };

  const addVariant = () => setVariants(prev => [...prev, { name: '', price: '' }]);
  const removeVariant = (idx: number) => setVariants(prev => prev.filter((_, i) => i !== idx));
  const updateVariant = (idx: number, field: 'name' | 'price', value: string) => {
    setVariants(prev => prev.map((v, i) => i === idx ? { ...v, [field]: value } : v));
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
        const res = await fetch('/api/upload', { method: 'POST', body: uploadData });
        const data = await res.json();
        if (data.url) imageUrl = data.url;
      } catch (error) {
        console.error('Failed to upload image', error);
      }
    }

    const catId = formData.get('category_id') as string;
    const rawDescription = formData.get('description') as string;
    const manualPrice = parseFloat(formData.get('price') as string) || 0;

    // Build variants metadata
    const validVariants = variants.filter(v => v.name.trim() && v.price.trim());
    let descriptionValue = rawDescription;
    let basePrice = manualPrice;

    const selectedBadge = formData.get('badge') as string;
    if (validVariants.length > 0 || selectedBadge) {
      const parsedVariants = validVariants.map(v => ({
        size: v.name.trim(),
        price: parseFloat(v.price)
      }));
      if (parsedVariants.length > 0) {
        basePrice = Math.min(...parsedVariants.map(v => v.price));
      }
      const metadataObj: any = {
        customizable: false,
        real_description: rawDescription || ''
      };
      if (parsedVariants.length > 0) metadataObj.sizes = parsedVariants;
      if (selectedBadge) metadataObj.badge = selectedBadge;
      descriptionValue = `JSON_METADATA:${JSON.stringify(metadataObj)}`;
    }

    const itemData = {
      ...(selectedItem?.id ? { id: selectedItem.id } : {}),
      name: formData.get('name'),
      description: descriptionValue,
      price: basePrice,
      prep_time: parseInt(formData.get('prep_time') as string, 10) || 30,
      is_available: formData.get('is_available') === 'true',
      is_vegetarian: formData.get('is_vegetarian') === 'on',
      is_spicy: formData.get('is_spicy') === 'on',
      is_vegan: formData.get('is_vegan') === 'on',
      is_gluten_free: formData.get('is_gluten_free') === 'on',
      is_halal: formData.get('is_halal') === 'on',
      category_id: catId,
      image_url: imageUrl || null,
    };

    await saveMenuItem(itemData);
    setIsUploading(false);
    setIsModalOpen(false);
    setSelectedItem(null);
    setVariants([]);
    setBadge('');
  };

  const columns = [
    {
      header: 'Image',
      key: 'image_url' as const,
      render: (value: any) => (
        value
          ? <img src={value} className="w-10 h-10 object-cover rounded-md" alt="preview" />
          : <div className="w-10 h-10 bg-muted flex items-center justify-center rounded-md text-[10px] text-muted-foreground">No img</div>
      )
    },
    { header: 'Name', key: 'name' as const },
    {
      header: 'Price',
      key: 'price' as const,
      render: (value: any, row: any) => (
        <span>
          ${Number(value || 0).toFixed(2)}
          {row.metadata?.sizes?.length > 0 && <span className="text-xs text-muted-foreground ml-1">Starting</span>}
        </span>
      ),
    },
    {
      header: 'Options',
      key: 'metadata' as const,
      render: (value: any) => {
        if (!value?.sizes?.length) return <span className="text-xs text-muted-foreground">—</span>;
        return (
          <div className="flex flex-wrap gap-1 max-w-48">
            {value.sizes.slice(0, 3).map((s: any) => (
              <span key={s.size} className="text-[10px] bg-secondary/20 text-secondary px-1.5 py-0.5 rounded font-medium whitespace-nowrap">
                {s.size}: ${s.price}
              </span>
            ))}
            {value.sizes.length > 3 && (
              <span className="text-[10px] text-muted-foreground">+{value.sizes.length - 3} more</span>
            )}
          </div>
        );
      },
    },
    {
      header: 'Prep',
      key: 'prepTime' as const,
      render: (value: any) => `${value || 30}m`,
    },
    {
      header: 'Status',
      key: 'available' as const,
      render: (available: any) => (
        <span className={available ? 'text-green-600 font-medium text-sm' : 'text-red-600 font-medium text-sm'}>
          {available ? 'Available' : 'Unavailable'}
        </span>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Menu Items</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage all menu items and their details.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2" onClick={openAdd}>
          <Plus className="h-4 w-4" />
          Add Item
        </Button>
      </div>

      {loading ? (
        <p className="py-8 text-muted-foreground flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" /> Loading menu...
        </p>
      ) : (
        <div className="space-y-8">
          {categories.map((category) => {
            const categoryItems = menuItems.filter(
              (item) => item.category_id === category.id || item.category === category.name
            );
            if (categoryItems.length === 0) return null;
            return (
              <div key={category.id} className="bg-card rounded-xl border shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b bg-muted/30 flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-foreground">{category.name}</h2>
                  <span className="text-xs font-normal text-muted-foreground bg-secondary/20 px-2 py-0.5 rounded-full">
                    {categoryItems.length} items
                  </span>
                </div>
                <div className="p-0">
                  <DataTable
                    columns={columns}
                    data={categoryItems}
                    keyField="id"
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <FormModal
        isOpen={isModalOpen}
        title={selectedItem ? 'Edit Menu Item' : 'Add New Menu Item'}
        onClose={() => { setIsModalOpen(false); setSelectedItem(null); setVariants([]); }}
        onSubmit={handleSubmit}
      >
        <div className="space-y-5">
          {isUploading && (
            <div className="bg-primary/10 text-primary p-3 rounded-md flex items-center gap-2 font-medium text-sm">
              <Loader2 className="w-4 h-4 animate-spin" /> Saving item...
            </div>
          )}

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-foreground">Item Name <span className="text-red-500">*</span></label>
            <Input name="name" placeholder="e.g. Classic Wings" defaultValue={selectedItem?.name || ''} className="mt-1" required />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-foreground">Description</label>
            <textarea
              name="description"
              placeholder="Describe the item, include calorie info if needed..."
              defaultValue={selectedItem?.metadata?.real_description || (selectedItem?.description?.startsWith('JSON_METADATA:') ? '' : selectedItem?.description) || ''}
              className="mt-1 w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground resize-none text-sm"
              rows={3}
            />
          </div>

          {/* Image */}
          <div>
            <label className="text-sm font-medium text-foreground">Item Image</label>
            <div className="mt-2 space-y-3 p-4 border border-dashed rounded-lg bg-muted/20">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Upload from Computer</label>
                <Input type="file" accept="image/*" name="image_file" className="cursor-pointer file:cursor-pointer file:bg-primary/10 file:text-primary file:border-0 file:rounded-md file:px-3 file:py-1 text-sm" />
              </div>
              <div className="relative flex items-center py-1">
                <div className="flex-grow border-t border-border" />
                <span className="mx-3 text-muted-foreground text-xs font-semibold uppercase">Or</span>
                <div className="flex-grow border-t border-border" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Paste Image URL</label>
                <Input name="image_url" placeholder="https://example.com/image.jpg" defaultValue={selectedItem?.image_url || selectedItem?.image || ''} className="text-sm" />
              </div>
              {(selectedItem?.image_url || selectedItem?.image) && (
                <img src={selectedItem?.image_url || selectedItem?.image} className="h-20 w-20 object-cover rounded-lg border" alt="current" />
              )}
            </div>
          </div>

          {/* Category + Availability */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">Category <span className="text-red-500">*</span></label>
              <select
                name="category_id"
                className="mt-1 w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
                value={selectedCategoryId || selectedItem?.category_id || categories[0]?.id || ''}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                required
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Availability</label>
              <select name="is_available" defaultValue={selectedItem?.available?.toString() || 'true'} className="mt-1 w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm">
                <option value="true">Available</option>
                <option value="false">Unavailable</option>
              </select>
            </div>
          </div>

          {/* Prep Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">Prep Time (min)</label>
              <Input name="prep_time" type="number" placeholder="30" defaultValue={selectedItem?.prepTime || selectedItem?.prep_time || '30'} className="mt-1 text-sm" />
            </div>
          </div>

          {/* ============================== */}
          {/* UNIVERSAL SIZE/OPTION VARIANTS */}
          {/* ============================== */}
          <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                <p className="text-sm font-semibold text-foreground">Size / Option Variants</p>
              </div>
              <button
                type="button"
                onClick={addVariant}
                className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                Add Option
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Add size/quantity options (e.g. Small / Medium / Large, or 10 Pcs / 20 Pcs, or With Pizza Sub). Leave empty for a single price below.
            </p>

            {variants.length === 0 ? (
              <div className="text-center py-4 border border-dashed border-border rounded-lg">
                <p className="text-xs text-muted-foreground">No variants added — item will use a single price</p>
                <button type="button" onClick={addVariant} className="mt-2 text-xs text-primary font-semibold hover:underline">
                  + Add First Option
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {/* Header */}
                <div className="grid grid-cols-[1fr_120px_32px] gap-2 px-1">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Option Name</span>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Price ($)</span>
                  <span />
                </div>
                {variants.map((v, idx) => (
                  <div key={idx} className="grid grid-cols-[1fr_120px_32px] gap-2 items-center">
                    <input
                      type="text"
                      value={v.name}
                      onChange={(e) => updateVariant(idx, 'name', e.target.value)}
                      placeholder="e.g. Medium, 10 Pcs, With Sub"
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={v.price}
                        onChange={(e) => updateVariant(idx, 'price', e.target.value)}
                        placeholder="0.00"
                        className="w-full pl-7 pr-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeVariant(idx)}
                      className="p-1.5 text-muted-foreground hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Single price (only if no variants) */}
          {variants.length === 0 && (
            <div>
              <label className="text-sm font-medium text-foreground">Price ($)</label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                <Input
                  name="price"
                  type="number"
                  placeholder="0.00"
                  defaultValue={selectedItem?.price || ''}
                  className="pl-7 text-sm"
                  step="0.01"
                />
              </div>
            </div>
          )}

          {/* Item Badge */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Item Label / Badge</label>
            <p className="text-xs text-muted-foreground mb-2">Shown on the menu card to highlight this item to customers</p>
            <input type="hidden" name="badge" value={badge} />
            <div className="grid grid-cols-3 gap-2">
              {BADGES.map(b => (
                <button
                  key={b.value}
                  type="button"
                  onClick={() => setBadge(b.value)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                    badge === b.value
                      ? 'border-primary bg-primary/15 text-primary'
                      : 'border-border bg-muted/30 text-foreground hover:border-primary/50'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dietary flags */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Dietary Options</label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { name: 'is_vegetarian', label: '🌿 Vegetarian', field: 'vegetarian' },
                { name: 'is_vegan', label: '🌱 Vegan', field: 'is_vegan' },
                { name: 'is_gluten_free', label: '🌾 Gluten-Free', field: 'is_gluten_free' },
                { name: 'is_halal', label: '☪ Halal', field: 'is_halal' },
                { name: 'is_spicy', label: '🌶️ Spicy', field: 'spicy' },
              ].map(({ name, label, field }) => (
                <label key={name} className="flex items-center gap-2 cursor-pointer p-2 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <input name={name} type="checkbox" className="rounded w-4 h-4 accent-primary" defaultChecked={selectedItem?.[field] || selectedItem?.[name] || false} />
                  <span className="text-sm text-foreground">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </FormModal>
    </div>
  );
}
