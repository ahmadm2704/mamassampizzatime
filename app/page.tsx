'use client';

import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { useMenuItems } from '@/hooks/use-supabase';
import { ArrowRight, Clock, Leaf, Star, Zap, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/hooks/use-cart';

export default function Home() {
  const { items: menuItems, loading } = useMenuItems();
  const { addToCart } = useCart();
  const [categories, setCategories] = useState<any[]>([]);
  const [offers, setOffers] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      // Fetch categories
      const { data: catData } = await supabase.from('categories').select('*').eq('is_active', true).order('display_order');
      if (catData) setCategories(catData);

      // Fetch offers
      const { data: offerData } = await supabase.from('offers').select('*').eq('is_active', true).limit(3);
      if (offerData) {
        setOffers(offerData.map((o: any) => ({
          ...o,
          discount: o.discount_value,
          discountType: o.discount_type
        })));
      }

      // Fetch testimonials
      const { data: testData } = await supabase.from('testimonials').select('*').eq('is_approved', true).limit(3);
      if (testData && testData.length > 0) {
        setTestimonials(testData);
      } else {
        setTestimonials([
          { id: '1', rating: 5, content: 'Amazing pizza!', customerName: 'John Doe' },
          { id: '2', rating: 5, content: 'Best in town.', customerName: 'Jane Smith' },
          { id: '3', rating: 4, content: 'Very authentic.', customerName: 'Mike Johnson' }
        ]);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background">
        <div className="absolute inset-0 opacity-3">
          <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-10 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20">
                <span className="text-xs font-semibold uppercase tracking-widest text-secondary">Est. 2010</span>
                <span className="text-xs text-muted-foreground">Authentic Italian Craftsmanship</span>
              </div>

              <h1 className="heading-hero">
                <span className="text-foreground">Authentic Italian</span>
                <br />
                <span className="text-primary">Pizza Perfection</span>
              </h1>

              <p className="text-body-lg text-muted-foreground max-w-lg leading-relaxed">
                Handcrafted wood-fired pizzas using traditional Italian recipes and the finest imported ingredients. Every bite is an experience of authentic flavor and passion.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link href="/menu" className="group">
                  <Button size="lg" className="btn-primary w-full sm:w-auto shadow-lg text-base hover-lift">
                    Explore Menu
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/reservations">
                  <Button size="lg" className="btn-outline w-full sm:w-auto text-base hover-lift">
                    Reserve Table
                  </Button>
                </Link>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-border/50">
                <div className="space-y-2 group">
                  <div className="flex items-center gap-3 text-secondary font-semibold text-sm">
                    <div className="p-2 bg-secondary/10 rounded-lg group-hover:bg-secondary/20 transition-colors">
                      <Clock className="h-4 w-4" />
                    </div>
                    Delivery
                  </div>
                  <p className="text-2xl font-semibold text-foreground">30-45 min</p>
                </div>
                <div className="space-y-2 group">
                  <div className="flex items-center gap-3 text-accent font-semibold text-sm">
                    <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                      <Leaf className="h-4 w-4" />
                    </div>
                    Sourced
                  </div>
                  <p className="text-2xl font-semibold text-foreground">100% Fresh</p>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative h-96 md:h-full min-h-96 animate-fade-in-down">
              <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl group">
                <div className="w-full h-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center animate-float">
                  <img src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Authentic Italian Pizza" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/20 rounded-full blur-2xl opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <p className="text-xs uppercase tracking-widest text-secondary font-semibold mb-4">Limited Time Offers</p>
            <h2 className="heading-lg text-foreground mb-4">Exclusive Deals for You</h2>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">Indulge in our specially curated offers designed for pizza lovers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {offers.slice(0, 3).map((offer, idx) => (
              <div
                key={offer.id}
                className="card-premium rounded-xl group hover-lift animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">{offer.title}</p>
                    <h3 className="heading-md text-foreground">{offer.discount}{offer.discountType === 'percentage' ? '%' : '$'}</h3>
                    <p className="text-body-sm text-muted-foreground mt-2">{offer.description}</p>
                  </div>
                  <div className="p-3 bg-secondary/10 rounded-lg group-hover:scale-110 transition-transform">
                    <Zap className="h-5 w-5 text-secondary" />
                  </div>
                </div>
                <Button className="btn-secondary w-full">View Offer</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Categories & Menu */}
      <section className="py-28 px-4 sm:px-6 lg:px-8">
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

            if (items.length === 0) return null;

            return (
              <div key={category.id} className="mb-20 animate-fade-in-up">
                <div className="mb-10">
                  <p className="text-xs uppercase tracking-widest text-secondary font-semibold mb-2">Explore</p>
                  <h2 className="heading-lg text-foreground uppercase">{category.name} MENU</h2>
                  {category.description && (
                    <p className="text-body-lg text-muted-foreground mt-2">{category.description}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
                  {items.slice(0, 4).map((item, idx) => (
                    <div key={item.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                      <ProductCard item={item} onAddToCart={(item) => { addToCart(item); alert(`${item.name} added to cart!`); }} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="flex justify-center mt-16">
            <Link href="/menu">
              <Button className="btn-primary px-8 hover-lift">
                View Complete Menu
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 animate-fade-in-up">
            <p className="text-xs uppercase tracking-widest text-primary-foreground/70 font-semibold mb-4">Customer Stories</p>
            <h2 className="heading-lg text-primary-foreground mb-6">Loved by Our Community</h2>
            <p className="text-body-lg text-primary-foreground/80 max-w-2xl mx-auto">Join thousands who've discovered the art of authentic Italian pizza</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={testimonial.id || idx}
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-8 border border-primary-foreground/20 group hover-lift animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className="flex gap-1.5 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="text-body-lg text-primary-foreground/95 italic mb-6 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                <p className="font-semibold text-base text-primary-foreground">— {testimonial.customer_name || testimonial.customerName}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="card-premium rounded-2xl p-12 sm:p-16 text-center group hover-lift bg-gradient-to-br from-background to-muted/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10 animate-fade-in-up">
              <h2 className="heading-xl text-foreground mb-6">Experience Italian Excellence</h2>
              <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                Reserve your table or place an order now and taste the difference authentic Italian pizza can make.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/menu">
                  <Button size="lg" className="btn-primary px-8 hover-lift">
                    Order Online Now
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" className="btn-outline px-8 hover-lift">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}




