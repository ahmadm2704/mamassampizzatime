'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock } from 'lucide-react';

export function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Simple hardcoded check since they gave default credentials,
  // typically this would call an API route checking the DB hashed passwords.
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().toLowerCase() === 'admin@mamasam.com' && password === 'MamaSam@2024') {
      setIsAuthenticated(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('admin_auth', 'true');
      }
      setError('');
    } else {
      setError('Invalid email or password');
    }
  };

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      const isAuth = sessionStorage.getItem('admin_auth');
      if (isAuth === 'true') {
        setIsAuthenticated(true);
      }
    }
  }, []);

  if (!isMounted) {
    return <div className="flex h-screen w-full items-center justify-center bg-background"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="max-w-md w-full p-8 bg-card rounded-2xl shadow-xl border border-border">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary/10 rounded-full">
            <Lock className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">Admin Portal</h2>
        <p className="text-muted-foreground text-center mb-8">
          Sign in to manage your restaurant
        </p>

        <form onSubmit={handleLogin} className="space-y-4" suppressHydrationWarning>
          <div suppressHydrationWarning>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@mamasam.com"
              required
              suppressHydrationWarning
            />
          </div>
          <div suppressHydrationWarning>
            <label className="block text-sm font-medium mb-1">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              suppressHydrationWarning
            />
          </div>

          {error && (
            <p className="text-destructive text-sm text-center">{error}</p>
          )}

          <Button type="submit" className="w-full mt-4">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
