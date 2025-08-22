"use client";

import { useState } from "react";
import { CheckCircle, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface OrderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  items: any[];
  total: number;
  onOrderComplete: () => void;
}

export function OrderDialog({
  isOpen,
  onClose,
  items,
  total,
  onOrderComplete,
}: OrderDialogProps) {
  const [orderStatus, setOrderStatus] = useState<
    "ordering" | "confirmed" | "preparing"
  >("ordering");
  const [progress, setProgress] = useState(0);

  const handlePlaceOrder = () => {
    setOrderStatus("confirmed");
    setTimeout(() => {
      setOrderStatus("preparing");
      // Simulate progress
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        setProgress(currentProgress);
        if (currentProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onOrderComplete();
            setOrderStatus("ordering");
            setProgress(0);
          }, 1000);
        }
      }, 500);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {orderStatus === "ordering" && "Confirm Your Order"}
            {orderStatus === "confirmed" && (
              <>
                <CheckCircle className="w-5 h-5 text-accent" />
                Order Confirmed!
              </>
            )}
            {orderStatus === "preparing" && (
              <>
                <Clock className="w-5 h-5 text-primary" />
                Preparing Your Order
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {orderStatus === "ordering" && "Review your order details below"}
            {orderStatus === "confirmed" &&
              "Your order has been confirmed and is being prepared"}
            {orderStatus === "preparing" &&
              "Your delicious food is being prepared with care"}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {orderStatus === "ordering" && (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted-foreground ml-2">
                      x{item.quantity}
                    </span>
                  </div>
                  <span className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="border-t pt-3 flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary">${(total || 0).toFixed(2)}</span>
              </div>
            </div>
          )}

          {orderStatus === "confirmed" && (
            <div className="text-center py-6">
              <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
              <p className="text-lg font-semibold mb-2">
                Thank you for your order!
              </p>
              <p className="text-muted-foreground">Order #12345</p>
              <p className="text-muted-foreground">
                Estimated delivery: 25-30 minutes
              </p>
            </div>
          )}

          {orderStatus === "preparing" && (
            <div className="space-y-4">
              <div className="text-center">
                <Clock className="w-12 h-12 text-primary mx-auto mb-2" />
                <p className="font-semibold">Preparing your order...</p>
                <p className="text-sm text-muted-foreground">
                  Estimated time: 25-30 minutes
                </p>
              </div>
              <Progress value={progress} className="w-full" />
              <p className="text-center text-sm text-muted-foreground">
                {progress < 50
                  ? "Preparing ingredients..."
                  : progress < 80
                  ? "Cooking your food..."
                  : "Almost ready for delivery!"}
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          {orderStatus === "ordering" && (
            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button onClick={handlePlaceOrder} className="flex-1">
                Place Order
              </Button>
            </div>
          )}
          {orderStatus === "confirmed" && (
            <Button onClick={onClose} className="w-full">
              Track Order
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
