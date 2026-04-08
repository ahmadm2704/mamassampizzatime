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
    <aside className="w-64 bg-[#fdfbf7] border-r-2 border-[#e0d0b8] h-screen flex flex-col shadow-lg z-20 relative">
      {/* Logo */}
      <div className="p-6 border-b-2 border-[#e0d0b8]">
        <Link href="/admin" className="flex items-center gap-3 hover-lift">
          <img src="/logoo.png" alt="Mama Sam Admin" className="h-16 w-auto object-contain rounded-full shadow-sm" />
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
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 font-bold text-sm font-sans ${
                isActive
                  ? 'bg-[#c92228] text-white shadow-md scale-[1.02] border-b-[3px] border-[#8b0000]'
                  : 'text-[#785a46] hover:bg-[#c92228]/10 hover:text-[#c92228]'
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t-2 border-[#e0d0b8] space-y-2 bg-[#f3ede1]">
        <Button
          className="w-full bg-[#111] hover:bg-[#c92228] text-white font-bold shadow-md justify-start gap-2 border-b-[3px] border-black transition-colors"
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

