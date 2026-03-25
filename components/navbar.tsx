'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useCart } from '@/hooks/use-cart';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'Deals', href: '/deals' },
  { label: 'Reservations', href: '/reservations' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { items, isLoaded } = useCart();
  
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center group hover-lift shrink-0">
            <img src="/logoo.png" alt="Mama Sam Pizza" className="h-16 md:h-20 w-auto object-contain rounded-full drop-shadow-md" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={((pathname === item.href) ? 'text-primary bg-secondary/10' : 'text-foreground hover:text-primary hover:bg-muted/50') + ' px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg'}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/cart" className="group relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover-lift text-foreground hover:text-primary transition-all"
              >
                <ShoppingCart className="h-5 w-5" />
                {isLoaded && cartItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-secondary text-secondary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors text-foreground"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border/50 py-4 space-y-1 animate-slide-in-down">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={((pathname === item.href) ? 'text-primary bg-secondary/10' : 'text-foreground hover:text-primary hover:bg-muted/50') + ' block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200'}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

