const fs = require('fs');

const pages = [
  { name: 'reservations', title: 'Reservations', icon: 'Calendar', desc: 'Manage table reservations' },
  { name: 'offers', title: 'Offers & Deals', icon: 'Zap', desc: 'Manage promotions and discounts' },
  { name: 'blog', title: 'Blog Posts', icon: 'FileText', desc: 'Manage website news and updates' },
  { name: 'testimonials', title: 'Testimonials', icon: 'MessageSquare', desc: 'Manage customer reviews' },
  { name: 'gallery', title: 'Gallery', icon: 'Image', desc: 'Manage restaurant photos' },
  { name: 'locations', title: 'Locations', icon: 'MapPin', desc: 'Manage restaurant branches' },
  { name: 'careers', title: 'Careers', icon: 'Briefcase', desc: 'Manage job postings' },
  { name: 'faqs', title: 'FAQs', icon: 'HelpCircle', desc: 'Manage frequently asked questions' },
  { name: 'messages', title: 'Messages', icon: 'MessageSquare', desc: 'Manage contact form submissions' }
];

pages.forEach(p => {
  const content = `'use client';
import { Button } from '@/components/ui/button';
import { ${p.icon}, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function ${p.name.charAt(0).toUpperCase() + p.name.slice(1)}Page() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">${p.title}</h1>
          <p className="text-muted-foreground">${p.desc}</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-xl border border-border">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-9" />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center p-8">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 text-muted-foreground">
          <${p.icon} className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No data found</h3>
        <p className="text-muted-foreground max-w-sm mb-6">
          There are currently no items in this section. Click the add button to create your first entry.
        </p>
        <Button variant="outline" className="gap-2">
          <Plus className="h-4 w-4" />
          Create First Entry
        </Button>
      </div>
    </div>
  );
}`;
  fs.writeFileSync('d:/Websites/MAMASSAMPIZZATIME/app/admin/' + p.name + '/page.tsx', content);
});
console.log('Done!');
