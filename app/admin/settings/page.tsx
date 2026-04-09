'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, Store, Power, PowerOff } from 'lucide-react';
import { useStoreStatus } from '@/hooks/use-admin';

export default function SettingsPage() {
  const { isOpen, loading, toggleStoreStatus } = useStoreStatus();
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'Mama Sam Pizza Time',
    description: 'Authentic Pizza, Fresh Ingredients',
    phone: '(905) 545-8899',
    email: 'info@mamasam.com',
    address: '476 Beach Rd, Hamilton ON L8H 3K7, Canada',
    currency: 'CAD',
    timezone: 'America/Toronto',
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your restaurant settings and configuration.</p>
      </div>

      {saved && (
        <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-lg">
          Settings saved successfully!
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Store Master Control */}
        <div className={`col-span-full rounded-lg border p-8 space-y-6 transition-all ${!loading && isOpen ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-full ${!loading && isOpen ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                <Store className="h-8 w-8" />
              </div>
              <div>
                <h2 className={`text-2xl font-bold ${!loading && isOpen ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  Store is currently {loading ? 'Loading...' : isOpen ? 'OPEN' : 'CLOSED'}
                </h2>
                <p className="text-muted-foreground mt-1">
                  {isOpen ? 'Customers can currently place online orders.' : 'Online ordering is temporarily paused. Customers cannot place orders.'}
                </p>
              </div>
            </div>
            
            <Button 
                onClick={() => toggleStoreStatus(!isOpen)}
                size="lg"
                disabled={loading}
                className={isOpen ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}
                >
                {isOpen ? <><PowerOff className="mr-2 h-5 w-5" /> Close Store</> : <><Power className="mr-2 h-5 w-5" /> Open Store</>}
            </Button>
          </div>
        </div>

        {/* General Settings */}
        <div className="bg-card rounded-lg border border-border p-8 space-y-6">
          <h2 className="text-xl font-bold text-foreground">General Settings</h2>

          <div>
            <label className="text-sm font-medium text-foreground">Site Name</label>
            <Input
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Description</label>
            <textarea
              value={settings.description}
              onChange={(e) => setSettings({ ...settings, description: e.target.value })}
              className="mt-1 w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground resize-none"
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Currency</label>
            <select className="mt-1 w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground">
              <option>USD - US Dollar</option>
              <option>EUR - Euro</option>
              <option>GBP - British Pound</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Timezone</label>
            <select
              value={settings.timezone}
              onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
              className="mt-1 w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
            >
              <option>America/Los_Angeles</option>
              <option>America/New_York</option>
              <option>Europe/London</option>
              <option>Europe/Paris</option>
            </select>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-card rounded-lg border border-border p-8 space-y-6">
          <h2 className="text-xl font-bold text-foreground">Contact Information</h2>

          <div>
            <label className="text-sm font-medium text-foreground">Phone</label>
            <Input
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Address</label>
            <textarea
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="mt-1 w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground resize-none"
              rows={3}
            />
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-card rounded-lg border border-border p-8 space-y-6">
          <h2 className="text-xl font-bold text-foreground">Social Media</h2>

          <div>
            <label className="text-sm font-medium text-foreground">Facebook</label>
            <Input placeholder="https://facebook.com/mamasam" className="mt-1" />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Instagram</label>
            <Input placeholder="https://instagram.com/mamasam" className="mt-1" />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Twitter</label>
            <Input placeholder="https://twitter.com/mamasam" className="mt-1" />
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-card rounded-lg border border-border p-8 space-y-6">
          <h2 className="text-xl font-bold text-foreground">Business Hours</h2>

          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
            <div key={day} className="flex gap-4 items-center">
              <span className="font-medium text-foreground w-24">{day}</span>
              <Input placeholder="11:00 AM" className="flex-1" />
              <span className="text-muted-foreground">-</span>
              <Input placeholder="10:00 PM" className="flex-1" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          className="bg-primary hover:bg-primary/90 gap-2"
        >
          <Save className="h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
