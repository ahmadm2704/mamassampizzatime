'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-md">
          <div className="text-6xl font-bold text-primary mb-4">404</div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
          <div className="flex gap-4 flex-col sm:flex-row">
            <Link href="/" className="flex-1">
              <Button className="w-full bg-primary hover:bg-primary/90">
                Back to Home
              </Button>
            </Link>
            <Link href="/menu" className="flex-1">
              <Button variant="outline" className="w-full">
                View Menu
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
