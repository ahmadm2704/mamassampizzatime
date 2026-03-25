'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { locations } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Link from 'next/link';

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Page Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Our Locations</h1>
          <p className="text-xl opacity-90">
            Visit us at any of our convenient locations
          </p>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {locations.map((location) => (
            <div key={location.id} className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
              {/* Image */}
              <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <span className="text-muted-foreground">Location Image</span>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                <h2 className="text-2xl font-bold text-foreground">{location.name}</h2>

                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Address</p>
                      <p className="text-muted-foreground text-sm">{location.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Phone</p>
                      <a href={`tel:${location.phone}`} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                        {location.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <a href={`mailto:${location.email}`} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                        {location.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="border-t border-border pt-6">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-foreground mb-3">Hours</p>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        {Object.entries(location.hours).map(([day, hours]) => (
                          <div key={day} className="flex justify-between">
                            <span className="font-medium text-foreground">{day}</span>
                            <span>
                              {hours.open} - {hours.close}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-border">
                  <Link href="/menu" className="flex-1">
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Order Now
                    </Button>
                  </Link>
                  <Link href="/reservations" className="flex-1">
                    <Button variant="outline" className="w-full">
                      Reserve Table
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="bg-card rounded-lg border border-border p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-3">Exciting News!</h3>
            <p className="text-muted-foreground mb-4">
              We're opening new locations soon. Check back for updates on expansion plans.
            </p>
            <Link href="/contact">
              <Button variant="outline">Suggest a Location</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
