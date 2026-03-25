'use client';

import { useState, useMemo } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdminMenu } from '@/hooks/use-admin'; // Has exactly what we need

import { useCart } from '@/hooks/use-cart';

export default function MenuPage() {
  const { menuItems, loading } = useAdminMenu();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = useMemo(() => {
    const cats = new Set(menuItems.map((item: any) => item.category));
    return ['All', ...Array.from(cats)];
  }, [menuItems]);

  const filteredItems = menuItems.filter((item: any) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch && item.available;
  });

  const handleAddToCart = (item: any) => {
    addToCart(item);
    alert(`${item.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Page Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Menu</h1>
          <p className="text-lg opacity-90">
            Explore our authentic Italian pizzas, fresh pasta, and delicious appetizers
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Search Bar */}
          <div>
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Category Filter */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <p className="font-semibold text-foreground">Category</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">Loading menu...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No items found matching your criteria.</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-sm font-medium text-muted-foreground">
                  Showing {filteredItems.length} of {menuItems.filter(i => i.available).length} items
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <ProductCard
                    key={item.id}
                    item={item}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
