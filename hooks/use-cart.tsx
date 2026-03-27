'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string; // Composite ID: menuItemId + size + customization string
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  customization?: any;
  options?: any[];
  image_url?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: any, size?: string, customization?: any, quantity?: number, price?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  isLoaded: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('mamasam-cart');
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('mamasam-cart', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addToCart = (item: any, size?: string, customization?: any, quantity: number = 1, price?: number) => {
    const compositeId = `${item.id}${size ? '-' + size : ''}${customization ? '-' + JSON.stringify(customization) : ''}`;
    
    // Use price if provided (from modal), otherwise calculate from sizes or base price
    const itemPrice = price ?? (size && item.metadata?.sizes 
      ? item.metadata.sizes.find((s: any) => s.size === size)?.price || item.price 
      : item.price);

    setItems((prev) => {
      const existing = prev.find((i) => i.id === compositeId);
      if (existing) {
        return prev.map((i) =>
          i.id === compositeId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        { 
          id: compositeId, 
          menuItemId: item.id,
          name: item.name, 
          price: itemPrice, // This should be the calculated price from the modal
          quantity: quantity, 
          size,
          customization,
          image_url: item.image_url 
        }
      ];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setItems([]);

  const cartTotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        isLoaded
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

