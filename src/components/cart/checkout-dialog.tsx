"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { MapPin, Clock, User, Phone, CreditCard, Banknote } from "lucide-react";

interface CheckoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  items: any[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  onProceedToPayment: (checkoutData: any) => void;
}

export function CheckoutDialog({
  isOpen,
  onClose,
  items,
  subtotal,
  deliveryFee,
  tax,
  total,
  onProceedToPayment,
}: CheckoutDialogProps) {
  const [deliveryType, setDeliveryType] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: "John Doe",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    instructions: "",
  });

  const finalDeliveryFee = deliveryType === "delivery" ? deliveryFee : 0;
  const finalTax = (subtotal + finalDeliveryFee) * 0.08;
  const finalTotal = subtotal + finalDeliveryFee + finalTax;

  const handleProceed = () => {
    const checkoutData = {
      deliveryType,
      paymentMethod,
      deliveryInfo,
      items,
      subtotal,
      deliveryFee: finalDeliveryFee,
      tax: finalTax,
      total: finalTotal,
    };
    onProceedToPayment(checkoutData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Summary */}
          <div className="space-y-3">
            <h3 className="font-semibold">Order Summary</h3>
            <div className="bg-muted rounded-lg p-4 space-y-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-muted-foreground ml-2">
                        x{item.quantity}
                      </span>
                    </div>
                  </div>
                  <span className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Delivery Options */}
          <div className="space-y-3">
            <h3 className="font-semibold">Delivery Options</h3>
            <RadioGroup value={deliveryType} onValueChange={setDeliveryType}>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="delivery" id="delivery" />
                <Label
                  htmlFor="delivery"
                  className="flex items-center gap-2 cursor-pointer flex-1">
                  <MapPin className="h-4 w-4" />
                  <div>
                    <div className="font-medium">Delivery</div>
                    <div className="text-sm text-muted-foreground">
                      25-35 min • ${deliveryFee.toFixed(2)} fee
                    </div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="pickup" id="pickup" />
                <Label
                  htmlFor="pickup"
                  className="flex items-center gap-2 cursor-pointer flex-1">
                  <Clock className="h-4 w-4" />
                  <div>
                    <div className="font-medium">Pickup</div>
                    <div className="text-sm text-muted-foreground">
                      15-20 min • No fee
                    </div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Delivery Information */}
          {deliveryType === "delivery" && (
            <div className="space-y-4">
              <h3 className="font-semibold">Delivery Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      value={deliveryInfo.name}
                      onChange={(e) =>
                        setDeliveryInfo({
                          ...deliveryInfo,
                          name: e.target.value,
                        })
                      }
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={deliveryInfo.phone}
                      onChange={(e) =>
                        setDeliveryInfo({
                          ...deliveryInfo,
                          phone: e.target.value,
                        })
                      }
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Delivery Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="address"
                    value={deliveryInfo.address}
                    onChange={(e) =>
                      setDeliveryInfo({
                        ...deliveryInfo,
                        address: e.target.value,
                      })
                    }
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="instructions">
                  Delivery Instructions (Optional)
                </Label>
                <Textarea
                  id="instructions"
                  placeholder="e.g., Leave at door, Ring doorbell, etc."
                  value={deliveryInfo.instructions}
                  onChange={(e) =>
                    setDeliveryInfo({
                      ...deliveryInfo,
                      instructions: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>
            </div>
          )}

          <Separator />

          {/* Payment Method Selection */}
          <div className="space-y-3">
            <h3 className="font-semibold">Payment Method</h3>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="card" id="card" />
                <Label
                  htmlFor="card"
                  className="flex items-center gap-2 cursor-pointer flex-1">
                  <CreditCard className="h-4 w-4" />
                  <div>
                    <div className="font-medium">Credit/Debit Card</div>
                    <div className="text-sm text-muted-foreground">
                      Visa, Mastercard, American Express
                    </div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="cash" id="cash" />
                <Label
                  htmlFor="cash"
                  className="flex items-center gap-2 cursor-pointer flex-1">
                  <Banknote className="h-4 w-4" />
                  <div>
                    <div className="font-medium">Cash on Delivery</div>
                    <div className="text-sm text-muted-foreground">
                      Pay when your order arrives
                    </div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Order Total */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>${finalDeliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${finalTax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent">
              Back to Cart
            </Button>
            <Button onClick={handleProceed} className="flex-1">
              {paymentMethod === "card" ? "Proceed to Payment" : "Place Order"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
