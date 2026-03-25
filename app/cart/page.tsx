'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const deliveryFee = 5;
  const total = subtotal + tax + deliveryFee;

  const handleRemove = (id: string) => {
    removeFromCart(id);
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemove(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-6">Start adding delicious pizzas to your order!</p>
            <Link href="/menu">
              <Button className="bg-primary hover:bg-primary/90 gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Menu
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Page Header */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
        </div>
      </section>

      {/* Cart Content */}
      <section className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-card rounded-lg border border-border p-6 flex gap-4">
                {/* Image */}
                <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-muted-foreground">Image</span>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-foreground mb-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    ${item.price.toFixed(2)} each
                  </p>

                  {/* Quantity Control */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="px-3 py-1 border border-border rounded-lg hover:bg-muted transition-colors"
                    >
                      −
                    </button>
                    <span className="px-4 py-1 font-medium">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="px-3 py-1 border border-border rounded-lg hover:bg-muted transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price & Remove */}
                <div className="text-right flex flex-col justify-between">
                  <p className="text-lg font-bold text-primary">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border border-border p-6 sticky top-8 space-y-4">
              <h2 className="text-xl font-bold text-foreground">Order Summary</h2>

              <div className="space-y-3 border-b border-border pb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (10%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
              </div>

              <Link href="/checkout" className="block">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                  Proceed to Checkout
                </Button>
              </Link>

              <Link href="/menu" className="block">
                <Button variant="outline" className="w-full gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
