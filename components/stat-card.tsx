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
  primary: 'bg-[#c92228] text-white shadow-md border-b-[3px] border-[#8b0000]',
  secondary: 'bg-[#1f6b3b] text-white shadow-md border-b-[3px] border-[#114022]',
  accent: 'bg-[#2b1f1a] text-white shadow-md border-b-[3px] border-[#111111]',
  green: 'bg-[#f3ede1] text-[#1f6b3b] shadow-sm border border-[#e0d0b8]',
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
    <div className="bg-white border-2 border-[#e0d0b8] p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-bold text-[#785a46] mb-2 uppercase tracking-widest">{title}</p>
          <p className="text-4xl font-bold text-[#2b1f1a]" style={{ fontFamily: 'Playfair Display, serif' }}>{value}</p>
          {trend && trendValue && (
            <div className={`flex items-center gap-2 mt-4 text-xs font-bold uppercase tracking-wider ${trend === 'up' ? 'text-[#1f6b3b]' : 'text-[#c92228]'}`}>
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
