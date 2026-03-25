'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { useOffers } from '@/hooks/use-supabase';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function DealsPage() {
  const { offers, loading } = useOffers();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Page Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Special Offers</h1>
          <p className="text-xl opacity-90">
            Save more with our exclusive deals and promotions
          </p>
        </div>
      </section>

      {/* Deals Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">Loading active deals...</p>
            </div>
          ) : offers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No active deals at the moment. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {offers.map((offer: any) => (
                <div
                  key={offer.id}
                  className="bg-card rounded-xl border-2 border-primary/20 overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-primary to-secondary p-8 text-primary-foreground">
                    <h2 className="text-3xl font-bold mb-2">{offer.title}</h2>
                    <p className="opacity-90 text-lg">{offer.description}</p>
                  </div>

                  {/* Content */}
                  <div className="p-8 space-y-6">
                    {/* Discount Badge */}
                    <div className="bg-muted rounded-lg p-6 text-center">
                      <p className="text-5xl font-bold text-primary mb-2">
                        {offer.discount_value}{offer.discount_type === 'percentage' ? '%' : '$'}
                      </p>
                      <p className="text-sm text-muted-foreground font-medium">
                        {offer.discount_type === 'percentage' ? 'Discount' : 'Off'}
                      </p>
                    </div>

                    {/* Details */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Valid until:</span>
                        <span className="font-medium text-foreground">
                          {new Date(offer.end_date).toLocaleDateString()}
                        </span>
                      </div>

                      {offer.code && (
                        <div className="bg-muted rounded-lg p-3 flex items-center justify-between">
                          <span className="font-mono font-bold text-foreground text-lg">
                            {offer.code}
                          </span>
                          <button
                            onClick={() => handleCopyCode(offer.code || '')}
                            className="p-2 hover:bg-background rounded-lg transition-colors"
                          >
                            {copiedCode === offer.code ? (
                              <Check className="h-5 w-5 text-green-500" />
                            ) : (
                              <Copy className="h-5 w-5 text-muted-foreground" />
                            )}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* CTA Button */}
                    <Link href="/menu" className="block">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                        Shop Now
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">How to Redeem</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                1
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">Browse Menu</h3>
              <p className="text-muted-foreground">
                Explore our delicious menu items and select what you'd like to order.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                2
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">Apply Code</h3>
              <p className="text-muted-foreground">
                Enter the promo code at checkout to apply your discount.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                3
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">Save & Enjoy</h3>
              <p className="text-muted-foreground">
                Complete your order and enjoy savings on your favorite dishes!
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
