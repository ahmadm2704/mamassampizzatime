'use client';

import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { PizzaDetailsModal } from '@/components/pizza-details-modal';
import { useMenuItems } from '@/hooks/use-supabase';
import { ArrowRight, Zap, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/hooks/use-cart';
import { MenuItem, PizzaCustomization } from '@/lib/types';

export default function Home() {
  const { items: menuItems, loading } = useMenuItems();
  const { addToCart } = useCart();
  const [categories, setCategories] = useState<any[]>([]);
  const [offers, setOffers] = useState<any[]>([]);
  
  // Pizza Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');

  const handleAddToCart = (item: MenuItem, size?: string) => {
    if (size) {
      setSelectedItem(item);
      setSelectedSize(size);
      setIsModalOpen(true);
    } else {
      addToCart(item);
      alert(`${item.name} added to cart!`);
    }
  };

  const confirmAddToCart = (customization: PizzaCustomization, quantity: number, price: number) => {
    if (selectedItem) {
      addToCart(selectedItem, selectedSize, customization, quantity, price);
      setIsModalOpen(false);
      alert(`${selectedItem.name} (${selectedSize}) added to cart!`);
    }
  };

  useEffect(() => {
    async function fetchData() {
      // Fetch categories
      const { data: catData } = await supabase.from('categories').select('*').eq('is_active', true).order('display_order');
      if (catData) setCategories(catData);
      else {
        // Fallback for visual demonstration if DB fails
        setCategories([
          { 'id': '1', 'name': 'Classic Pizzas', 'display_order': 1 },
          { 'id': '2', 'name': 'Premium Pizzas', 'display_order': 2 }
        ]);
      }

      // Fetch offers
      const { data: offerData } = await supabase.from('offers').select('*').eq('is_active', true).limit(3);
      if (offerData) {
        setOffers(offerData.map((o: any) => ({
          ...o,
          discount: o.discount_value,
          discountType: o.discount_type
        })));
      } else {
        setOffers([
           { id: '1', title: 'Weekend Special', discount: 20, discountType: 'percentage', description: 'Off all Premium Pizzas' },
           { id: '2', title: 'Lunch Combo', discount: 5, discountType: 'fixed', description: 'Medium pizza + 2 drinks' }
        ]);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background pb-20 overflow-x-hidden relative">
      
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full mx-auto pt-24 pb-20 px-4 flex flex-col items-center justify-center text-center">
        
        <div className="animate-fade-in-up flex flex-col items-center z-20 mb-8 max-w-4xl">
          {/* Changed Ribbon Banner back to standard red background, readable text */}
          <div className="bg-[#c92228] text-white py-6 px-12 md:px-24 mb-6 shadow-xl border-y-4 border-[#8b0000]" style={{position: 'relative'}}>
            {/* Visual ribbon tails */}
            <div className="absolute top-2 -left-6 border-[25px] border-[#8b0000] border-l-transparent -z-10 bottom-2" />
            <div className="absolute top-2 -right-6 border-[25px] border-[#8b0000] border-r-transparent -z-10 bottom-2" />
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight" style={{ fontFamily: 'Playfair Display, serif', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
              MAMA' SAM'S PIZZA
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl font-bold tracking-[0.2em] text-[#8b0000] uppercase font-sans mt-2 mb-8">
            Fresh • Hot • Delicious
          </p>

          <p className="text-lg text-[#2b1f1a] bg-white/60 p-4 rounded-xl border border-[#e0d0b8] max-w-2xl mx-auto shadow-sm backdrop-blur-sm">
            Handcrafted wood-fired pizzas using our signature recipes and the finest imported ingredients right here in Hamilton, Canada.
          </p>

          <div className="flex gap-4 mt-10">
            <Link href="#menu">
              <Button className="bg-[#c92228] hover:bg-[#8b0000] text-white px-8 py-6 text-lg font-bold shadow-lg border-b-4 border-[#8b0000] active:border-b-0 active:translate-y-1 transition-all uppercase tracking-wide rounded-md">
                Order Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      {offers.length > 0 && (
        <section className="py-16 px-4 bg-[#f3ede1] border-y-2 border-[#e0d0b8]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-[#2b1f1a] uppercase tracking-wide" style={{ fontFamily: 'Playfair Display, serif' }}>
                Exclusive Deals for You
              </h2>
              <div className="w-24 h-1 bg-[#c92228] mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.slice(0, 3).map((offer, idx) => (
                <div
                  key={offer.id}
                  className="bg-white border-2 border-[#e0d0b8] rounded-xl p-8 hover:-translate-y-2 transition-transform shadow-md animate-fade-in-up"
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-widest text-[#1f6b3b] font-bold mb-2">{offer.title}</p>
                      <h3 className="text-5xl font-black text-[#c92228] font-sans">
                        {offer.discount}{offer.discountType === 'percentage' ? '%' : '$'}
                      </h3>
                      <p className="text-base text-[#785a46] mt-3 font-medium">{offer.description}</p>
                    </div>
                    <div className="p-3 bg-[#f3ede1] rounded-full">
                      <Zap className="h-6 w-6 text-[#eab308]" />
                    </div>
                  </div>
                  <Button className="w-full bg-[#1f6b3b] hover:bg-[#114022] text-white font-bold uppercase tracking-wider rounded-md mt-4 border-b-4 border-[#114022] active:border-b-0 active:translate-y-1">
                    Claim Offer
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Menu Grid Section */}
      <section id="menu" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {categories.map((category) => {
            const items = menuItems.filter(m => m.category_id === category.id).map(m => ({
              ...m,
              category: category.name,
              available: m.is_available,
              prepTime: m.prep_time,
              vegetarian: m.is_vegetarian,
              vegan: false,
              spicy: m.is_spicy
            }));

            // Fallback content if DB fails or empty category to show the aesthetic
            const displayItems = items.length > 0 ? items : [
              { id: `demo1-${category.id}`, name: `Classic ${category.name}`, description: 'Cheese, Sauce, Quality Ingredients', price: 15.99, image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80', category: category.name },
              { id: `demo2-${category.id}`, name: `Spicy ${category.name}`, description: 'Hot peppers, Onions, Tomatoes', price: 17.99, image_url: 'https://images.unsplash.com/photo-1544982503-9f98ddc48717?w=400&q=80', spicy: true, category: category.name }
            ];

            return (
              <div key={category.id} className="mb-20 animate-fade-in-up">
                <div className="mb-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between border-b-2 border-[#e0d0b8] pb-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#c92228] uppercase tracking-wider" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {category.name}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {displayItems.slice(0, 4).map((item, idx) => (
                    <div key={item.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                      <ProductCard item={item as any} onAddToCart={handleAddToCart} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="flex justify-center mt-12 bg-white/50 py-8 border-y border-[#e0d0b8]">
            <Link href="/menu">
              <Button className="bg-transparent border-2 border-[#c92228] text-[#c92228] hover:bg-[#c92228] hover:text-white px-10 py-6 text-lg font-bold transition-all uppercase tracking-widest rounded-full">
                View Full Menu
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pizza Details Modal */}
      <PizzaDetailsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
        size={selectedSize}
        onConfirm={confirmAddToCart}
      />
    </div>
  );
}
