'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Heart, Globe, Users } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Page Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">About Mama Sam</h1>
          <p className="text-xl opacity-90">
            Bringing authentic Italian pizza to your table since 2010
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-foreground">Our Story</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Mama Sam started as a dream of bringing authentic Italian pizza to our community. What began as a small family pizzeria has grown into a beloved restaurant known for its commitment to quality, tradition, and genuine hospitality.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every pizza is crafted with the same passion and care that Mama Sam would put into a meal for her own family. We use only the finest, freshest ingredients, sourced from trusted suppliers who share our commitment to excellence.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Today, we're proud to serve thousands of customers every month. Whether you're a longtime regular or trying us for the first time, we invite you to experience the Mama Sam difference.
            </p>
          </div>

          <div className="h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl border border-border flex items-center justify-center overflow-hidden">
            <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Inside Mama Sam's Restaurant" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">Our Values</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-8 border border-border text-center">
              <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-3">Quality</h3>
              <p className="text-muted-foreground">
                We never compromise on quality. Fresh ingredients, traditional recipes, and passionate craftsmanship in every dish.
              </p>
            </div>

            <div className="bg-card rounded-lg p-8 border border-border text-center">
              <Globe className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-3">Authenticity</h3>
              <p className="text-muted-foreground">
                We honor Italian traditions while embracing local flavors. Authenticity in every bite, adapted for our community.
              </p>
            </div>

            <div className="bg-card rounded-lg p-8 border border-border text-center">
              <Users className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-3">Community</h3>
              <p className="text-muted-foreground">
                We're not just a restaurant; we're part of the community. Building relationships, one pizza at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">Our Team</h2>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: 'Mama Sam', role: 'Founder & Owner' },
              { name: 'Chef Antonio', role: 'Head Chef' },
              { name: 'Marco', role: 'Sous Chef' },
              { name: 'Sofia', role: 'Manager' },
            ].map((member) => (
              <div key={member.name} className="bg-card rounded-lg border border-border overflow-hidden text-center">
                <div className="h-40 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <div className="text-4xl">👨‍🍳</div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-foreground">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Join the Mama Sam Family</h2>
          <p className="text-xl mb-8 opacity-90">
            Experience authentic Italian pizza and become part of our growing community
          </p>
          <Link href="/menu">
            <Button size="lg" variant="secondary">
              Order Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
