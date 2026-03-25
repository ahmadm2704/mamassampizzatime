'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, CheckCircle, Lock, Truck, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, cartTotal, clearCart, isLoaded } = useCart();
  const [step, setStep] = useState<'delivery' | 'confirmation'>('delivery');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    orderType: 'delivery',
    specialInstructions: '',
  });

  // Derived totals
  const subtotal = cartTotal;
  const tax = subtotal * 0.08; // 8% tax
  const deliveryFee = formData.orderType === 'delivery' ? 5.00 : 0;
  const total = subtotal + tax + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'delivery') {
      await processOrder();
    }
  };

  const processOrder = async () => {
    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    
    setIsProcessing(true);
    try {
      const orderNumber = 'ORD-' + Math.random().toString(36).substring(2, 9).toUpperCase();
      
      // 1. Create order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
          status: 'pending',
          delivery_type: formData.orderType,
          subtotal: Number(subtotal.toFixed(2)),
          tax: Number(tax.toFixed(2)),
          delivery_fee: Number(deliveryFee.toFixed(2)),
          total: Number(total.toFixed(2)),
          delivery_address: formData.orderType === 'delivery' ? `${formData.address}, ${formData.city} ${formData.zipCode}` : null,
          phone: formData.phone,
          special_instructions: `Name: ${formData.name}\n${formData.specialInstructions || ''}`,
          estimated_time: formData.orderType === 'delivery' ? 45 : 20,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Create order items
      const orderItems = items.map(item => ({
        order_id: orderData.id,
        menu_item_id: item.id,
        quantity: item.quantity,
        unit_price: item.price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      setOrderDetails(orderData);
      setStep('confirmation');
      clearCart();
    } catch (err) {
      console.error("Order processing failed", err);
      alert('Failed to process order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isLoaded) {
    return null; // Or a loading spinner
  }

  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="text-center max-w-md card-premium rounded-2xl p-12 shadow-premium">
            <div className="flex justify-center mb-8 animate-scale-in">
              <div className="p-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="heading-xl text-foreground mb-3">?? Order Confirmed!</h1>
            <p className="text-body text-muted-foreground mb-3 font-mono">
              Order #{orderDetails?.order_number}
            </p>
            <p className="text-body text-muted-foreground mb-8 leading-relaxed">
              Your order has been confirmed. You will receive a confirmation email shortly with all the details.
            </p>
            <div className="gradient-primary text-white p-8 rounded-xl mb-8 text-left space-y-3">
              <p className="text-sm opacity-90">?? Estimated {orderDetails?.delivery_type === 'delivery' ? 'Delivery' : 'Pickup'} Time</p>
              <p className="heading-lg font-bold">{orderDetails?.estimated_time || '35-45'} minutes</p>
              <p className="text-sm opacity-75 pt-2">Thank you for choosing Mama Sam Pizza!</p>
            </div>
            <Link href="/">
              <Button className="w-full btn-primary shadow-lg">
                Back to Home
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
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-border/50 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/cart" className="p-2 hover:bg-muted rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5 text-primary" />
            </Link>
            <h1 className="heading-xl text-foreground">?? Checkout</h1>
          </div>
          <p className="text-muted-foreground text-body">Complete your order securely</p>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          
          <div className="md:col-span-2">
            {/* Progress Steps */}
            <div className="mb-12">
              <div className="flex gap-4 justify-between">
                {[
                  { number: 1, label: 'Delivery Info', icon: Truck },
                  { number: 2, label: 'Confirmation', icon: CheckCircle },
                ].map((s, idx) => {
                  const Icon = s.icon;
                  const isComplete = (step === 'confirmation' && idx === 0);
                  const isActive = 
                    (step === 'delivery' && idx === 0) ||
                    (step === 'confirmation' && idx === 1);
                  
                  return (
                    <div key={s.number} className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                          isActive ? 'gradient-primary text-white shadow-lg' :
                          isComplete ? 'bg-green-500 text-white' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {isComplete ? <CheckCircle className="h-6 w-6" /> : <Icon className="h-5 w-5" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">{s.label}</p>
                        </div>
                      </div>
                      {idx < 1 && (
                        <div className={`h-1 rounded-full ${isComplete || isActive ? 'gradient-primary' : 'bg-border'}`}></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Delivery Info Step */}
              {step === 'delivery' && (
                <div className="card-premium rounded-xl p-8 animate-fade-in">
                  <h2 className="heading-md text-foreground mb-6">Delivery Information</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="text-body-sm font-semibold text-foreground mb-2 block">Full Name *</label>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="input-professional"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-body-sm font-semibold text-foreground mb-2 block">Email *</label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input-professional"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-body-sm font-semibold text-foreground mb-2 block">Phone *</label>
                      <Input
                        type="tel"
                        placeholder="+1 (905) 545-8899"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="input-professional"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-body-sm font-semibold text-foreground mb-2 block">Delivery Type *</label>
                      <select
                        value={formData.orderType}
                        onChange={(e) => setFormData({ ...formData, orderType: e.target.value })}
                        className="input-professional flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background mt-1"
                        required
                      >
                        <option value="delivery">?? Delivery</option>
                        <option value="pickup">?? Pickup</option>
                        <option value="dine-in">??? Dine-in</option>
                      </select>
                    </div>
                  </div>

                  {formData.orderType === 'delivery' && (
                    <div className="space-y-6 border-t border-border pt-6">
                      <h3 className="heading-sm text-foreground">Delivery Address</h3>
                      <div>
                        <label className="text-body-sm font-semibold text-foreground mb-2 block">Street Address *</label>
                        <Input
                          type="text"
                          placeholder="123 Main St"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="input-professional"
                          required
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-body-sm font-semibold text-foreground mb-2 block">City *</label>
                          <Input
                            type="text"
                            placeholder="New York"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="input-professional"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-body-sm font-semibold text-foreground mb-2 block">Zip Code *</label>
                          <Input
                            type="text"
                            placeholder="10001"
                            value={formData.zipCode}
                            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                            className="input-professional"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="border-t border-border pt-6 mt-6">
                    <label className="text-body-sm font-semibold text-foreground mb-2 block">Special Instructions</label>
                    <textarea
                      placeholder="Any special requests? (e.g., extra cheese, no onions, etc.)"
                      value={formData.specialInstructions}
                      onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                      className="input-professional w-full p-3 border rounded-md resize-none h-24 mt-1 bg-background"
                    />
                  </div>

                  <Button type="submit" className="w-full btn-primary mt-8 shadow-lg" disabled={isProcessing}>
                    {isProcessing ? 'Processing Order...' : `Place Order ($${total.toFixed(2)})`}
                  </Button>
                </div>
              )}


            </form>
          </div>

          {/* Order Summary */}
          <div className="hidden md:block">
            <div className="card-premium rounded-xl p-6 sticky top-24">
              <h3 className="heading-md text-foreground mb-6">Order Summary</h3>
              <div className="space-y-4 border-b border-border pb-6 mb-6 max-h-60 overflow-y-auto">
                {items.length === 0 ? (
                  <p className="text-muted-foreground text-sm">Your cart is empty.</p>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <span className="text-muted-foreground flex-1">
                        <span className="font-medium">{item.quantity}x</span> {item.name}
                      </span>
                      <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))
                )}
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {formData.orderType === 'delivery' && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center border-t border-border pt-6">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-xl text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
