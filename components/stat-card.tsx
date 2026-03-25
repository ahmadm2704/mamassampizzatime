'use client';

import { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: 'up' | 'down';
  trendValue?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'green';
}

const colorClasses = {
  primary: 'gradient-primary text-white shadow-lg',
  secondary: 'gradient-secondary text-white shadow-lg',
  accent: 'gradient-accent text-white shadow-lg',
  green: 'bg-green-500/20 text-green-600',
};

export function StatCard({
  title,
  value,
  icon,
  trend,
  trendValue,
  color = 'primary',
}: StatCardProps) {
  return (
    <div className="card-premium rounded-xl hover-lift group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">{title}</p>
          <p className="heading-lg text-foreground font-bold">{value}</p>
          {trend && trendValue && (
            <div className={`flex items-center gap-2 mt-3 text-sm font-semibold ${trend === 'up' ? 'text-green-600' : 'text-destructive'}`}>
              <div className={`p-1 rounded-full ${trend === 'up' ? 'bg-green-100' : 'bg-destructive/10'}`}>
                {trend === 'up' ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
              </div>
              {trendValue}
            </div>
          )}
        </div>
        <div className={`p-4 rounded-lg ${colorClasses[color]} group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
