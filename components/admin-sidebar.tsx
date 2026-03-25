'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  UtensilsCrossed,
  ShoppingBag,
  Users,
  Calendar,
  Zap,
  FileText,
  MessageSquare,
  Image,
  MapPin,
  Briefcase,
  HelpCircle,
  Settings,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const adminMenuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: UtensilsCrossed, label: 'Menu Items', href: '/admin/menu' },
  { icon: ShoppingBag, label: 'Orders', href: '/admin/orders' },
  { icon: Users, label: 'Customers', href: '/admin/customers' },
  { icon: Calendar, label: 'Reservations', href: '/admin/reservations' },
  { icon: Zap, label: 'Offers', href: '/admin/offers' },
  { icon: FileText, label: 'Blog Posts', href: '/admin/blog' },
  { icon: MessageSquare, label: 'Testimonials', href: '/admin/testimonials' },
  { icon: Image, label: 'Gallery', href: '/admin/gallery' },
  { icon: MapPin, label: 'Locations', href: '/admin/locations' },
  { icon: Briefcase, label: 'Careers', href: '/admin/careers' },
  { icon: HelpCircle, label: 'FAQs', href: '/admin/faqs' },
  { icon: MessageSquare, label: 'Messages', href: '/admin/messages' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col shadow-lg">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border/50">
        <Link href="/admin" className="flex items-center gap-3 hover-lift">
          <img src="/logoo-transparent.png" alt="Mama Sam Admin" className="h-16 w-auto object-contain rounded-full shadow-sm" />
        </Link>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-1">
        {adminMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium text-sm ${
                isActive
                  ? 'gradient-primary text-white shadow-lg scale-105'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/10 hover-lift'
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border/50 space-y-2 bg-sidebar-accent/5">
        <Button 
          className="w-full btn-primary shadow-md justify-start gap-2"
          onClick={() => {
            if (typeof window !== 'undefined') {
              sessionStorage.removeItem('admin_auth');
              window.location.reload();
            }
          }}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
