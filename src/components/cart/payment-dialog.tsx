"use client";

import type React from "react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Lock, Shield } from "lucide-react";

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  checkoutData: any;
  onPaymentComplete: () => void;
}

export function PaymentDialog({
  isOpen,
  onClose,
  checkoutData,
  onPaymentComplete,
}: PaymentDialogProps) {
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardholderName: "",
    billingAddress: checkoutData?.deliveryInfo?.address || "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) {
      setPaymentForm({ ...paymentForm, cardNumber: formatted });
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 4) {
      setPaymentForm({ ...paymentForm, cvv: value });
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentComplete();
    }, 3000);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);
  const months = [
    { value: "01", label: "01 - January" },
    { value: "02", label: "02 - February" },
    { value: "03", label: "03 - March" },
    { value: "04", label: "04 - April" },
    { value: "05", label: "05 - May" },
    { value: "06", label: "06 - June" },
    { value: "07", label: "07 - July" },
    { value: "08", label: "08 - August" },
    { value: "09", label: "09 - September" },
    { value: "10", label: "10 - October" },
    { value: "11", label: "11 - November" },
    { value: "12", label: "12 - December" },
  ];

  if (!checkoutData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-muted rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Order Total</span>
              <span className="text-lg font-bold text-primary">
                ${checkoutData.total.toFixed(2)}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              {checkoutData.items.length} item(s) •{" "}
              {checkoutData.deliveryType === "delivery" ? "Delivery" : "Pickup"}
            </div>
          </div>

          {/* Payment Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={paymentForm.cardNumber}
                  onChange={handleCardNumberChange}
                  className="pl-10"
                  disabled={isProcessing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardholderName">Cardholder Name</Label>
              <Input
                id="cardholderName"
                placeholder="John Doe"
                value={paymentForm.cardholderName}
                onChange={(e) =>
                  setPaymentForm({
                    ...paymentForm,
                    cardholderName: e.target.value,
                  })
                }
                disabled={isProcessing}
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label htmlFor="expiryMonth">Month</Label>
                <Select
                  value={paymentForm.expiryMonth}
                  onValueChange={(value) =>
                    setPaymentForm({ ...paymentForm, expiryMonth: value })
                  }
                  disabled={isProcessing}>
                  <SelectTrigger>
                    <SelectValue placeholder="MM" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiryYear">Year</Label>
                <Select
                  value={paymentForm.expiryYear}
                  onValueChange={(value) =>
                    setPaymentForm({ ...paymentForm, expiryYear: value })
                  }
                  disabled={isProcessing}>
                  <SelectTrigger>
                    <SelectValue placeholder="YYYY" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={paymentForm.cvv}
                  onChange={handleCvvChange}
                  disabled={isProcessing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="billingAddress">Billing Address</Label>
              <Input
                id="billingAddress"
                placeholder="123 Main St, City, State, ZIP"
                value={paymentForm.billingAddress}
                onChange={(e) =>
                  setPaymentForm({
                    ...paymentForm,
                    billingAddress: e.target.value,
                  })
                }
                disabled={isProcessing}
              />
            </div>
          </div>

          <Separator />

          {/* Security Notice */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
            <Shield className="h-4 w-4" />
            <span>Your payment information is encrypted and secure</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent"
              disabled={isProcessing}>
              Cancel
            </Button>
            <Button
              onClick={handlePayment}
              className="flex-1"
              disabled={isProcessing}>
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Pay ${checkoutData.total.toFixed(2)}
                </div>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
