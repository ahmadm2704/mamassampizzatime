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
    new:        { label: '🆕 New',         color: '#1f6b3b' },
    hot:        { label: '🔥 Hot',         color: '#c92228' },
    featured:   { label: '⭐ Featured',    color: '#eab308' },
    limited:    { label: '⏱ Limited',      color: '#8b0000' },
    bestseller: { label: '🏆 Best Seller', color: '#114022' },
  };

  return (
    <div
      className="group relative flex flex-col overflow-visible rounded-xl transition-all duration-300 hover:-translate-y-1 bg-white border-2 border-[#e0d0b8]"
      style={{
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
      }}
    >
      {/* ── IMAGE ── */}
      <div className="relative w-full overflow-hidden rounded-t-xl border-b-2 border-[#e0d0b8]" style={{ height: '200px' }}>
        {displayItem.image_url || displayItem.image ? (
          <img
            src={displayItem.image_url || displayItem.image}
            alt={displayItem.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl bg-[#f3ede1]">
            🍕
          </div>
        )}

        {/* Highlight Gradient Overlay */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/3"
          style={{ background: 'linear-gradient(to top, rgba(253, 251, 247, 0.9) 0%, transparent 100%)' }}
        />

        {/* ── BADGE ribbon (top-right) ── */}
        {badge && BADGE_CONFIG[badge] && (
          <div
            className="absolute top-3 right-3 px-3 py-1 text-[11px] font-bold text-white shadow-md rounded border-b-[3px] border-black/20"
            style={{ background: BADGE_CONFIG[badge].color, fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}
          >
            {BADGE_CONFIG[badge].label}
          </div>
        )}

        {/* Prep time chip */}
        <div className="absolute top-3 left-3">
          <span
            className="flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 bg-white text-[#2b1f1a] shadow-sm rounded-md border border-[#e0d0b8]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <Clock className="h-3 w-3 text-[#c92228]" />
            {displayItem.prepTime || 30}m
          </span>
        </div>

        {/* Diet badges (Moved to right above gradient) */}
        <div className="absolute bottom-3 right-3 flex flex-row gap-1">
          {displayItem.is_halal && (
            <span className="px-2 py-0.5 bg-[#172554] text-white text-[10px] font-bold rounded shadow-sm uppercase tracking-wider">Halal</span>
          )}
          {displayItem.spicy && (
            <span className="px-2 py-0.5 bg-[#c92228] text-white text-[10px] font-bold rounded shadow-sm uppercase tracking-wider">Spicy</span>
          )}
          {displayItem.vegetarian && (
            <span className="px-2 py-0.5 bg-[#1f6b3b] text-white text-[10px] font-bold rounded shadow-sm uppercase tracking-wider">Veg</span>
          )}
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="flex flex-col flex-1 px-5 py-4 gap-2 bg-[#fdfbf7] rounded-b-xl">
        <div className="flex justify-between items-start gap-2">
           {/* Name */}
           <h3
             className="font-bold leading-tight group-hover:text-[#c92228] transition-colors"
             style={{ fontSize: '1.2rem', color: '#2b1f1a', fontFamily: 'Playfair Display, serif' }}
           >
             {displayItem.name}
           </h3>
           
           {/* Fav */}
           <button
             onClick={(e) => { e.stopPropagation(); setIsFavorite(!isFavorite); }}
             className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-[#e0d0b8] hover:bg-[#c92228]/10 transition-colors bg-white mt-1"
           >
             <Heart
               className="h-4 w-4 transition-colors"
               fill={isFavorite ? '#c92228' : 'none'}
               color={isFavorite ? '#c92228' : '#785a46'}
             />
           </button>
        </div>

        {/* Category Label */}
        {displayItem.category && (
           <span className="text-[10px] font-bold uppercase tracking-widest text-[#1f6b3b] font-sans">
             {displayItem.category}
           </span>
        )}

        {/* Description */}
        <p
          className="text-sm leading-relaxed line-clamp-2 mt-1 mb-2 font-sans flex-1 text-[#785a46]"
        >
          {displayItem.description || '\u00A0'}
        </p>

        {/* ── PRICE + ADD ── */}
        <div className="relative flex items-end justify-between pt-3 border-t-2 border-[#e0d0b8] border-dashed mt-auto">
          <div className="flex flex-col leading-none">
            {hasSizes && (
              <span className="text-[10px] font-bold uppercase tracking-wide mb-1 text-[#785a46]">
                Starting from
              </span>
            )}
            <span className="text-xl font-bold font-sans text-[#c92228]">
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
            className="flex items-center gap-2 font-bold text-white text-xs px-4 py-2.5 transition-all bg-[#c92228] hover:bg-[#a0102a] rounded-md font-sans border-b-[3px] border-[#8b0000] active:border-b-0 active:translate-y-[3px]"
          >
            <ShoppingCart className="h-4 w-4" />
            {showSizes ? 'CLOSE' : 'ADD'}
          </button>

          {/* Size dropdown — opens upward */}
          {showSizes && hasSizes && (
            <div
              className="absolute bottom-full right-0 mb-3 w-56 rounded-lg overflow-hidden z-50 bg-[#fdfbf7] border-2 border-[#e0d0b8] shadow-xl"
            >
              <div className="px-3 pt-3 pb-2 bg-[#f3ede1] border-b border-[#e0d0b8]">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#2b1f1a]">
                  Choose Size
                </p>
              </div>
              <div className="flex flex-col p-1">
                {displayItem.metadata.sizes.map((s: any, idx: number) => (
                  <button
                    key={s.size}
                    onClick={() => {
                      setShowSizes(false);
                      onAddToCart?.(displayItem, s.size);
                    }}
                    className="w-full flex justify-between items-center px-3 py-2.5 transition-colors duration-150 hover:bg-[#c92228]/10 rounded-md font-sans"
                  >
                    <span className="text-sm font-semibold text-[#2b1f1a]">{s.size}</span>
                    <span className="text-sm font-bold text-[#c92228]">${Number(s.price).toFixed(2)}</span>
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
