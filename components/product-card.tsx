'use client';

import { useState } from 'react';
import { MenuItem } from '@/lib/types';
import { ShoppingCart, Heart, Clock } from 'lucide-react';

interface ProductCardProps {
  item: MenuItem;
  onAddToCart?: (item: MenuItem, size?: string) => void;
}

export function ProductCard({ item, onAddToCart }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showSizes, setShowSizes] = useState(false);

  const displayItem = { ...item } as any;
  if (displayItem.description?.startsWith('JSON_METADATA:')) {
    try {
      const parsed = JSON.parse(displayItem.description.replace('JSON_METADATA:', ''));
      displayItem.metadata = { ...displayItem.metadata, ...parsed };
      displayItem.description = parsed.real_description || '';
    } catch (e) {}
  }

  const hasSizes = Boolean(displayItem.metadata?.sizes?.length);
  const badge = displayItem.metadata?.badge || '';

  const BADGE_CONFIG: Record<string, { label: string; color: string }> = {
    new:        { label: '🆕 New Launch',  color: 'linear-gradient(135deg,#0ea5e9,#2563eb)' },
    hot:        { label: '🔥 Hot',         color: 'linear-gradient(135deg,#f97316,#dc2626)' },
    featured:   { label: '⭐ Featured',    color: 'linear-gradient(135deg,#eab308,#ca8a04)' },
    limited:    { label: '⏱ Limited',     color: 'linear-gradient(135deg,#a855f7,#7c3aed)' },
    bestseller: { label: '🏆 Best Seller', color: 'linear-gradient(135deg,#10b981,#059669)' },
  };

  return (
    <div
      className="group relative flex flex-col overflow-visible rounded-2xl transition-all duration-300 hover:-translate-y-1"
      style={{
        background: 'linear-gradient(145deg, #1c1c1c 0%, #141414 100%)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
      }}
    >
      {/* Glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: '0 0 0 1px rgba(196,30,58,0.4), 0 8px 32px rgba(196,30,58,0.12)' }}
      />

      {/* ── IMAGE ── */}
      <div className="relative w-full overflow-hidden rounded-t-2xl" style={{ height: '180px' }}>
        {displayItem.image_url || displayItem.image ? (
          <img
            src={displayItem.image_url || displayItem.image}
            alt={displayItem.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl"
            style={{ background: 'linear-gradient(135deg, #2a0a0a 0%, #1a0505 100%)' }}>
            🍕
          </div>
        )}

        {/* Dark gradient overlay at bottom of image */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(20,20,20,0.9) 0%, transparent 50%)' }}
        />

        {/* ── BADGE ribbon (top-right) ── */}
        {badge && BADGE_CONFIG[badge] && (
          <div
            className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-white shadow-lg"
            style={{ background: BADGE_CONFIG[badge].color, boxShadow: '0 2px 10px rgba(0,0,0,0.4)' }}
          >
            {BADGE_CONFIG[badge].label}
          </div>
        )}

        {/* Category chip — sits at the bottom of the image */}
        <div className="absolute bottom-3 left-3">
          <span
            className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full"
            style={{ background: 'rgba(0,0,0,0.6)', color: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {displayItem.category}
          </span>
        </div>

        {/* Prep time chip */}
        <div className="absolute bottom-3 right-12">
          <span
            className="flex items-center gap-1 text-[9px] font-semibold px-2 py-1 rounded-full"
            style={{ background: 'rgba(0,0,0,0.6)', color: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <Clock className="h-2.5 w-2.5" />
            {displayItem.prepTime || 30}m
          </span>
        </div>

        {/* Fav */}
        <button
          onClick={(e) => { e.stopPropagation(); setIsFavorite(!isFavorite); }}
          className="absolute bottom-3 right-3 flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200 hover:scale-110"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <Heart
            className="h-3.5 w-3.5 transition-colors"
            fill={isFavorite ? '#c41e3a' : 'none'}
            color={isFavorite ? '#c41e3a' : 'rgba(255,255,255,0.6)'}
          />
        </button>

        {/* Diet badges top-left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {displayItem.is_halal && (
            <span style={{ background: 'rgba(37,99,235,0.85)', backdropFilter: 'blur(4px)' }} className="px-2 py-0.5 text-white text-[9px] font-bold rounded-full">☪ Halal</span>
          )}
          {displayItem.spicy && (
            <span style={{ background: 'rgba(220,38,38,0.85)', backdropFilter: 'blur(4px)' }} className="px-2 py-0.5 text-white text-[9px] font-bold rounded-full">🌶 Spicy</span>
          )}
          {displayItem.vegetarian && (
            <span style={{ background: 'rgba(22,163,74,0.85)', backdropFilter: 'blur(4px)' }} className="px-2 py-0.5 text-white text-[9px] font-bold rounded-full">Veg</span>
          )}
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="flex flex-col flex-1 px-4 py-3 gap-1.5">
        {/* Name */}
        <h3
          className="font-bold leading-snug line-clamp-1 transition-colors duration-200 group-hover:text-primary"
          style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.95)' }}
        >
          {displayItem.name}
        </h3>

        {/* Description */}
        <p
          className="text-xs leading-relaxed line-clamp-2 flex-1"
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          {displayItem.description || '\u00A0'}
        </p>

        {/* ── PRICE + ADD ── */}
        <div className="relative flex items-center justify-between mt-2 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex flex-col leading-none">
            {hasSizes && (
              <span className="text-[9px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Starting from
              </span>
            )}
            <span className="text-lg font-extrabold" style={{ color: 'rgba(255,255,255,0.95)', letterSpacing: '-0.02em' }}>
              ${Number(displayItem.price || 0).toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => {
              if (hasSizes) {
                setShowSizes(!showSizes);
              } else {
                onAddToCart?.(displayItem);
              }
            }}
            className="flex items-center gap-1.5 font-bold text-white text-xs rounded-xl px-3 py-2.5 transition-all duration-200 active:scale-95 group/btn"
            style={{
              background: 'linear-gradient(135deg, #c41e3a 0%, #a0102a 100%)',
              boxShadow: '0 2px 12px rgba(196,30,58,0.4)',
            }}
          >
            <ShoppingCart className="h-3.5 w-3.5 transition-transform group-hover/btn:-translate-y-0.5" />
            {showSizes ? 'Close' : 'Add'}
          </button>

          {/* Size dropdown — opens upward */}
          {showSizes && hasSizes && (
            <div
              className="absolute bottom-full right-0 mb-2 w-52 rounded-2xl overflow-hidden z-50"
              style={{
                background: 'linear-gradient(145deg, #222 0%, #1a1a1a 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 -8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(196,30,58,0.2)'
              }}
            >
              <div className="px-3 pt-3 pb-1">
                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  Choose an option
                </p>
              </div>
              <div className="pb-2">
                {displayItem.metadata.sizes.map((s: any, idx: number) => (
                  <button
                    key={s.size}
                    onClick={() => {
                      setShowSizes(false);
                      onAddToCart?.(displayItem, s.size);
                    }}
                    className="w-full flex justify-between items-center px-3 py-2.5 transition-colors duration-150"
                    style={{ borderTop: idx > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(196,30,58,0.15)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>{s.size}</span>
                    <span className="text-sm font-bold text-primary">${Number(s.price).toFixed(2)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
