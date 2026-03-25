import Link from 'next/link';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-primary-foreground relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Brand Section */}
            <div className="space-y-6 col-span-1 md:col-span-1">
              <div className="flex items-center gap-3">
                <img src="/logoo-transparent.png" alt="Mama Sam Pizza" className="h-24 w-auto object-contain bg-white/5 p-2 rounded-full backdrop-blur-sm drop-shadow-md" />
              </div>
              <p className="text-sm text-primary-foreground/70 leading-relaxed">
                Crafting authentic Italian pizza with passion since 2010. Every slice tells a story of tradition and quality.
              </p>
              <div className="flex gap-4 pt-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-primary-foreground/10 hover:bg-secondary/30 rounded-lg transition-all duration-300 hover-lift"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-primary-foreground/10 hover:bg-secondary/30 rounded-lg transition-all duration-300 hover-lift"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-primary-foreground/10 hover:bg-secondary/30 rounded-lg transition-all duration-300 hover-lift"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="heading-sm text-primary-foreground font-bold">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { label: 'Menu', href: '/menu' },
                  { label: 'Deals', href: '/deals' },
                  { label: 'Reservations', href: '/reservations' },
                  { label: 'About Us', href: '/about' },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-6">
              <h3 className="heading-sm text-primary-foreground font-bold">Support</h3>
              <ul className="space-y-3">
                {[
                  { label: 'FAQ', href: '/faq' },
                  { label: 'Contact', href: '/contact' },
                  { label: 'Privacy Policy', href: '/privacy' },
                  { label: 'Terms', href: '/terms' },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="heading-sm text-primary-foreground font-bold">Get in Touch</h3>
              <ul className="space-y-4">
                <li className="flex gap-3 group">
                  <div className="p-2 bg-secondary/20 rounded-lg group-hover:bg-secondary/30 transition-colors">
                    <MapPin className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-primary-foreground/50 uppercase">Address</p>
                    <p className="text-sm font-semibold">476 Beach Rd, Hamilton ON L8H 3K7, Canada</p>
                  </div>
                </li>
                <li className="flex gap-3 group">
                  <div className="p-2 bg-secondary/20 rounded-lg group-hover:bg-secondary/30 transition-colors">
                    <Phone className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-primary-foreground/50 uppercase">Phone</p>
                    <p className="text-sm font-semibold">(905) 545-8899</p>
                  </div>
                </li>
                <li className="flex gap-3 group">
                  <div className="p-2 bg-secondary/20 rounded-lg group-hover:bg-secondary/30 transition-colors">
                    <Mail className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-primary-foreground/50 uppercase">Email</p>
                    <p className="text-sm font-semibold">hello@mamasam.com</p>
                  </div>
                </li>
                <li className="flex gap-3 group">
                  <div className="p-2 bg-secondary/20 rounded-lg group-hover:bg-secondary/30 transition-colors">
                    <Clock className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-primary-foreground/50 uppercase">Hours</p>
                    <p className="text-sm font-semibold">11AM - 11PM</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-primary-foreground/10"></div>

          {/* Bottom Section */}
          <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-primary-foreground/60">
              © {currentYear} Mama Sam Pizza. Crafted with care and authenticity.
            </p>
            <p className="text-sm text-secondary font-semibold">
              Authentic Italian Excellence 🇮🇹
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
