'use client';

import { useState, useEffect, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { MenuItem, ToppingPlacement, PizzaCustomization } from '@/lib/types';
import { CRUST_OPTIONS, SAUCE_OPTIONS, TOPPING_OPTIONS, ADDITIONAL_OPTIONS } from '@/lib/pizza-options';
import { CircleSlash, Circle, Minus, Plus, ShoppingCart } from 'lucide-react';

interface PizzaDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem | null;
  size?: string;
  onConfirm: (customization: PizzaCustomization, quantity: number, price: number) => void;
}

export function PizzaDetailsModal({ isOpen, onClose, item, size, onConfirm }: PizzaDetailsModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [crust, setCrust] = useState(CRUST_OPTIONS[0].name);
  const [sauce, setSauce] = useState(SAUCE_OPTIONS[0].name);
  const [toppings, setToppings] = useState<Record<string, ToppingPlacement>>({});
  const [additionalOptions, setAdditionalOptions] = useState<string[]>([]);

  // Reset state when modal opens for a new item
  useEffect(() => {
    if (isOpen && item) {
      setQuantity(1);
      setCrust(CRUST_OPTIONS[0].name);
      setSauce(SAUCE_OPTIONS[0].name);
      setToppings({});
      setAdditionalOptions([]);
    }
  }, [isOpen, item]);

  const totalPrice = useMemo(() => {
    if (!item) return 0;
    let basePrice = item.metadata?.sizes?.find((s: any) => s.size === size)?.price || item.price;
    
    // Add crust premium
    const crustOpt = CRUST_OPTIONS.find(c => c.name === crust);
    if (crustOpt?.price) basePrice += crustOpt.price;

    // Add sauce premium
    const sauceOpt = SAUCE_OPTIONS.find(s => s.name === sauce);
    if (sauceOpt?.price) basePrice += sauceOpt.price;

    // Add additional options premium
    additionalOptions.forEach(optId => {
      const opt = ADDITIONAL_OPTIONS.find(o => o.id === optId);
      if (opt?.price) basePrice += opt.price;
    });

    // Add topping premiums
    Object.values(toppings).forEach(placement => {
      if (placement === 'double') basePrice += 1.50;
    });

    return basePrice * quantity;
  }, [item, size, crust, sauce, toppings, additionalOptions, quantity]);

  if (!item) return null;

  const handleToppingChange = (toppingId: string, placement: ToppingPlacement) => {
    setToppings(prev => ({
      ...prev,
      [toppingId]: placement
    }));
  };

  const toppingCategories = ['Meat', 'Halal', 'Veggie', 'Free', 'Cheese'] as const;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] h-[90vh] flex flex-col p-0 bg-background border-border shadow-2xl overflow-hidden">
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Header Section */}
          <div className="relative h-64 w-full shrink-0">
            <img 
              src={item.image_url || (item as any).image} 
              alt={item.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
          </div>

          <div className="px-8 pt-4 pb-8">
            <DialogHeader className="mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <DialogTitle className="text-4xl font-extrabold text-foreground mb-2 flex items-center gap-3">
                    {item.name}
                    <span className="text-xl font-medium text-muted-foreground">({size})</span>
                  </DialogTitle>
                  <DialogDescription className="text-lg text-muted-foreground italic">
                    {item.description}
                  </DialogDescription>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-primary animate-pulse-slow">
                    ${totalPrice.toFixed(2)}
                  </p>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-10">
              {/* Crust Selection */}
              <section className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <h3 className="text-xl font-bold text-foreground mb-4 uppercase tracking-tighter border-l-4 border-primary pl-4">Choose Your Crust</h3>
                <RadioGroup value={crust} onValueChange={setCrust} className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {CRUST_OPTIONS.map((opt) => (
                    <div key={opt.name} className="relative">
                      <RadioGroupItem value={opt.name} id={`crust-${opt.name}`} className="peer sr-only" />
                      <Label
                        htmlFor={`crust-${opt.name}`}
                        className="flex items-center justify-between p-4 bg-white border border-border rounded-xl cursor-pointer hover:bg-[#f3ede1] peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-[#f3ede1] shadow-sm transition-all duration-300"
                      >
                        <span className="font-semibold">{opt.name}</span>
                        {opt.price && <span className="text-primary font-bold">(+${opt.price})</span>}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </section>

              {/* Sauce Selection */}
              <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-xl font-bold text-foreground mb-4 uppercase tracking-tighter border-l-4 border-secondary pl-4">Select Your Sauce</h3>
                <RadioGroup value={sauce} onValueChange={setSauce} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {SAUCE_OPTIONS.map((opt) => (
                    <div key={opt.name} className="relative">
                      <RadioGroupItem value={opt.name} id={`sauce-${opt.name}`} className="peer sr-only" />
                      <Label
                        htmlFor={`sauce-${opt.name}`}
                        className="flex items-center justify-between p-4 bg-white border border-border rounded-xl cursor-pointer hover:bg-[#f3ede1] peer-data-[state=checked]:border-secondary peer-data-[state=checked]:bg-[#f3ede1] shadow-sm transition-all duration-300"
                      >
                        <span className="font-semibold truncate mr-2">{opt.name}</span>
                        {opt.price && <span className="text-secondary font-bold shrink-0">(+${opt.price})</span>}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </section>

              {/* Options Selection */}
              <section className="animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
                <h3 className="text-xl font-bold text-foreground mb-4 uppercase tracking-tighter border-l-4 border-yellow-500 pl-4">Options (Optional)</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {ADDITIONAL_OPTIONS.map((opt) => (
                    <div
                      key={opt.id}
                      className="flex items-center space-x-3 p-4 bg-white border border-border rounded-xl cursor-pointer hover:bg-[#f3ede1] shadow-sm transition-all duration-300"
                      onClick={() => {
                        setAdditionalOptions(prev => 
                          prev.includes(opt.id) ? prev.filter(id => id !== opt.id) : [...prev, opt.id]
                        );
                      }}
                    >
                      <Checkbox
                        id={`opt-${opt.id}`}
                        checked={additionalOptions.includes(opt.id)}
                        onCheckedChange={() => {}} // Handled by div click
                        className="h-5 w-5 rounded-md border-2 border-yellow-500 data-[state=checked]:bg-yellow-500 data-[state=checked]:text-white"
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor={`opt-${opt.id}`}
                          className="font-semibold cursor-pointer"
                        >
                          {opt.name}
                        </Label>
                        {opt.price && <span className="text-xs text-yellow-600 block"> (+${opt.price.toFixed(2)})</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Toppings Selection */}
              <section className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <h3 className="text-xl font-bold text-foreground mb-4 uppercase tracking-tighter border-l-4 border-accent pl-4">Customize Toppings</h3>
                <Tabs defaultValue="Meat" className="w-full">
                  <TabsList className="w-full justify-start gap-1 p-1 bg-muted/30 rounded-xl mb-6 overflow-x-auto">
                    {toppingCategories.map(cat => (
                      <TabsTrigger 
                        key={cat} 
                        value={cat}
                        className="px-6 py-2.5 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm font-bold tracking-wide"
                      >
                        {cat}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {toppingCategories.map(cat => (
                    <TabsContent key={cat} value={cat} className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <div className="grid divide-y divide-border/50 border border-border/50 rounded-2xl overflow-hidden shadow-sm">
                        {TOPPING_OPTIONS.filter(t => t.category === cat).map(topping => (
                          <div key={topping.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white hover:bg-muted transition-colors gap-4">
                            <span className="font-bold text-foreground text-lg">{topping.name}</span>
                            
                            <div className="flex bg-muted/40 p-1 rounded-full border border-border/40 scale-90 sm:scale-100 origin-right">
                              {[
                                { id: 'none', icon: <CircleSlash className="h-4 w-4" />, label: 'None' },
                                { id: 'left', icon: <div className="h-4 w-4 rounded-l-full border-r border-border bg-current" />, label: 'Left' },
                                { id: 'right', icon: <div className="h-4 w-4 rounded-r-full border-l border-border bg-current" />, label: 'Right' },
                                { id: 'whole', icon: <Circle className="h-4 w-4 fill-current" />, label: 'Whole' },
                                { id: 'double', icon: <span className="text-[10px] font-black">2X</span>, label: 'Double' }
                              ].map((pos) => (
                                <button
                                  key={pos.id}
                                  onClick={() => handleToppingChange(topping.id, pos.id as ToppingPlacement)}
                                  className={`
                                    flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300
                                    ${(toppings[topping.id] || 'none') === pos.id 
                                      ? 'bg-primary text-primary-foreground shadow-lg scale-110 z-10' 
                                      : 'text-muted-foreground hover:bg-muted hover:text-foreground hover:scale-105'}
                                  `}
                                  title={pos.label}
                                >
                                  {pos.icon}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </section>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <DialogFooter className="sticky bottom-0 bg-[#fcfaf3] border-t-2 border-[#e0d0b8] p-6 sm:justify-between items-center z-50 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)]">
          <div className="flex items-center gap-6 mb-4 sm:mb-0">
            <div className="flex items-center bg-muted/50 rounded-2xl p-1 border border-border/60">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-10 w-10 rounded-xl hover:bg-background shadow-none"
              >
                <Minus className="h-5 w-5" />
              </Button>
              <span className="w-12 text-center font-bold text-xl">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                className="h-10 w-10 rounded-xl hover:bg-background shadow-none"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="hidden sm:block">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Total Amount</p>
              <p className="text-2xl font-black text-foreground">${totalPrice.toFixed(2)}</p>
            </div>
          </div>

          <div className="flex gap-4 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={onClose}
              className="px-8 h-12 rounded-xl border-border font-bold flex-1 sm:flex-none"
            >
              Cancel
            </Button>
            <Button
              className="btn-primary h-12 px-10 rounded-xl font-bold shadow-xl shadow-primary/20 flex-1 sm:flex-none"
              onClick={() => {
                const customization: PizzaCustomization = {
                  crust,
                  sauce,
                  toppings: Object.entries(toppings)
                    .filter(([_, placement]) => placement !== 'none')
                    .map(([toppingId, placement]) => ({ toppingId, placement })),
                  additionalOptions: additionalOptions.map(id => ADDITIONAL_OPTIONS.find(o => o.id === id)?.name || id)
                };
                onConfirm(customization, quantity, totalPrice / quantity);
              }}
            >
              <ShoppingCart className="h-5 w-5 mr-3" />
              Add to Cart
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
