'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MenuItem } from '@/lib/types';
import { ShoppingCart, Heart } from 'lucide-react';

interface ProductCardProps {
  item: MenuItem;
  onAddToCart?: (item: MenuItem) => void;
}

export function ProductCard({ item, onAddToCart }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="group card-premium rounded-xl hover-lift overflow-hidden flex flex-col h-full">
      {/* Image Container */}
      <div className="relative w-full h-56 bg-muted overflow-hidden">
        {(item as any).image_url || item.image ? (
          <img 
            src={(item as any).image_url || item.image} 
            alt={item.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-7xl bg-gradient-to-br from-primary via-secondary to-accent animate-float group-hover:scale-110 transition-transform duration-500">
            🍕
          </div>
        )}

        {/* Overlay Badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Badge Container */}
        <div className="absolute top-4 left-4 right-4 flex gap-2 flex-wrap">
          {item.vegetarian && (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/95 rounded-full text-xs font-semibold text-foreground backdrop-blur-sm animate-scale-in">
              ✓ Vegetarian
            </span>
          )}
          {(item as any).is_vegan && (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-500/95 rounded-full text-xs font-semibold text-white backdrop-blur-sm animate-scale-in">
              🌱 Vegan
            </span>
          )}
          {(item as any).is_gluten_free && (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-500/95 rounded-full text-xs font-semibold text-white backdrop-blur-sm animate-scale-in">
              🌾 GF
            </span>
          )}
          {(item as any).is_halal && (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-500/95 rounded-full text-xs font-semibold text-white backdrop-blur-sm animate-scale-in">
              ☪ Halal
            </span>
          )}
          {item.spicy && (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-500/95 rounded-full text-xs font-semibold text-white backdrop-blur-sm animate-scale-in">
              🌶️ Spicy
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute bottom-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg hover-scale transition-all duration-300 group-hover:opacity-100"
        >
          <Heart
            className="h-5 w-5 transition-colors duration-300"
            fill={isFavorite ? '#c41e3a' : 'none'}
            color={isFavorite ? '#c41e3a' : '#1a1a17'}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <Link href={`/menu/${item.id}`}>
          <h3 className="heading-md text-foreground hover:text-primary transition-colors duration-300 mb-2 line-clamp-1">
            {item.name}
          </h3>
        </Link>
        <p className="text-body-sm text-muted-foreground mb-4 line-clamp-2 flex-1 leading-relaxed">
          {item.description}
        </p>

        {/* Category & Prep Time */}
        <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-t border-border/50">
          <span className="inline-flex items-center px-3 py-1 bg-muted/50 rounded-lg text-xs font-medium text-muted-foreground group-hover:bg-secondary/10 group-hover:text-secondary transition-colors">
            {item.category}
          </span>
          <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
            <span>⏱️</span>
            {item.prepTime}min
          </span>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between gap-3 mt-auto">
          <div className="flex flex-col">
            <span className="heading-md text-primary font-bold">
              ${item.price.toFixed(2)}
            </span>
          </div>
          <Button
            size="sm"
            onClick={() => onAddToCart?.(item)}
            className="btn-secondary hover-lift shadow-lg text-sm font-semibold whitespace-nowrap"
          >
            <ShoppingCart className="h-4 w-4 mr-1.5" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
