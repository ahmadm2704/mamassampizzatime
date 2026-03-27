'use client';

import { useState, useMemo, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { useAdminMenu, useAdminCategories } from '@/hooks/use-admin';
import { useCart } from '@/hooks/use-cart';
import { PizzaDetailsModal } from '@/components/pizza-details-modal';
import { MenuItem, PizzaCustomization } from '@/lib/types';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';

export default function MenuPage() {
  const { menuItems, loading } = useAdminMenu();
  const { categories: dbCategories } = useAdminCategories();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSubs, setExpandedSubs] = useState<Set<string>>(new Set());

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');

  // Use DB ordered categories, only those with items
  const categories = useMemo(() => {
    const catNamesWithItems = new Set(menuItems.map((i: any) => i.category));
    return dbCategories.filter((c: any) => catNamesWithItems.has(c.name));
  }, [dbCategories, menuItems]);

  // Default to first category
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].name);
    }
  }, [categories, selectedCategory]);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item: any) => {
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      const matchesSearch = !searchTerm || item.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch && item.available;
    });
  }, [menuItems, selectedCategory, searchTerm]);

  const handleAddToCart = (item: MenuItem, size?: string) => {
    if (size) {
      setSelectedItem(item);
      setSelectedSize(size);
      setIsModalOpen(true);
    } else {
      addToCart(item);
    }
  };

  const confirmAddToCart = (customization: PizzaCustomization, quantity: number, price: number) => {
    if (selectedItem) {
      addToCart(selectedItem, selectedSize, customization, quantity, price);
      setIsModalOpen(false);
    }
  };

  const handleCategoryClick = (catName: string) => {
    setSelectedCategory(catName);
    setSearchTerm('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const DRINKS_NAME = 'Drinks';
  const drinkSubCategories = [
    { label: '591 ml Bottles', filter: '591' },
    { label: '2L Pop', filter: '2L' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Page Header */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-1">Our Menu</h1>
          <p className="text-sm opacity-80">Fresh, authentic flavors made with premium ingredients</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto flex gap-0 lg:gap-6 px-0 lg:px-6 xl:px-8 py-0 lg:py-6">
        {/* LEFT Sidebar — sticky */}
        <aside className="hidden lg:block w-52 shrink-0 self-start sticky top-4">
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
            <div className="bg-primary px-4 py-2.5">
              <p className="text-xs font-bold uppercase tracking-widest text-primary-foreground">Food Category</p>
            </div>
            <div className="divide-y divide-border/60 max-h-[calc(100vh-8rem)] overflow-y-auto">
              {categories.map((cat: any) => {
                const isActive = selectedCategory === cat.name;
                const isDrinks = cat.name === DRINKS_NAME;
                const isExpanded = expandedSubs.has(cat.name);
                return (
                  <div key={cat.id}>
                    <button
                      onClick={() => {
                        if (isDrinks) {
                          setExpandedSubs(prev => {
                            const next = new Set(prev);
                            next.has(cat.name) ? next.delete(cat.name) : next.add(cat.name);
                            return next;
                          });
                        }
                        handleCategoryClick(cat.name);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-left transition-all duration-150 ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-muted/60'
                      }`}
                    >
                      <span className="leading-tight">{cat.name}</span>
                      {isDrinks && (
                        isExpanded
                          ? <ChevronDown className="h-3.5 w-3.5 shrink-0 ml-1 opacity-60" />
                          : <ChevronRight className="h-3.5 w-3.5 shrink-0 ml-1 opacity-60" />
                      )}
                    </button>
                    {isDrinks && isExpanded && (
                      <div className="bg-muted/30">
                        {drinkSubCategories.map(sub => (
                          <button
                            key={sub.label}
                            onClick={() => {
                              setSelectedCategory(DRINKS_NAME);
                              setSearchTerm(sub.filter);
                            }}
                            className="w-full flex items-center gap-1.5 pl-7 pr-4 py-2 text-xs font-semibold text-primary hover:bg-primary/10 transition-colors"
                          >
                            <ChevronRight className="h-3 w-3" />
                            {sub.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Mobile horizontal category strip */}
          <div className="lg:hidden overflow-x-auto flex gap-2 px-4 py-3 bg-card border-b border-border sticky top-0 z-10">
            {categories.map((cat: any) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.name)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat.name
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="px-4 lg:px-0 py-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              />
            </div>
          </div>

          {/* Category heading */}
          {selectedCategory && (
            <div className="px-4 lg:px-0 mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-foreground uppercase tracking-tight border-l-4 border-primary pl-3">
                  {searchTerm ? `Results for "${searchTerm}"` : selectedCategory}
                </h2>
                <p className="text-xs text-muted-foreground pl-3 mt-0.5">
                  {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          )}

          {/* Grid */}
          <div className="px-4 lg:px-0 pb-8">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-64 bg-muted animate-pulse rounded-xl" />
                ))}
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-5xl mb-3">🍕</p>
                <p className="text-base font-semibold text-foreground">No items found</p>
                <p className="text-muted-foreground text-sm mt-1">Try a different category or search term</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredItems.map((item) => (
                  <ProductCard key={item.id} item={item as any} onAddToCart={handleAddToCart} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <PizzaDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
        size={selectedSize}
        onConfirm={confirmAddToCart}
      />

      <Footer />
    </div>
  );
}
