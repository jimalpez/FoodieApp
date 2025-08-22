"use client";

import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: any[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  onCheckout: () => void;
}

export function Cart({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  subtotal,
  deliveryFee,
  tax,
  total,
  onCheckout,
}: CartProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in-0 duration-300">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-xl animate-in slide-in-from-right-full duration-300">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Your Cart ({items.length})
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 max-h-[calc(100vh-200px)]">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 bg-card rounded-lg hover:bg-card/80 transition-colors duration-200 animate-in slide-in-from-right-4 fade-in-0"
                  style={{ animationDelay: `${index * 100}ms` }}>
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="text-primary font-semibold">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent hover:scale-110 transition-transform duration-200"
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity - 1)
                      }>
                      <Minus className="w-3 h-3" />
                    </Button>
                    <Badge
                      variant="secondary"
                      className="min-w-[2rem] justify-center">
                      {item.quantity}
                    </Badge>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent hover:scale-110 transition-transform duration-200"
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity + 1)
                      }>
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive hover:scale-110 transition-all duration-200"
                    onClick={() => onRemoveItem(item.id)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-4 space-y-4 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
            <Button
              onClick={onCheckout}
              className="w-full hover:scale-105 transition-transform duration-200"
              size="lg">
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
