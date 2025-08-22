"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { CategoryTabs } from "@/components/food/category-tabs";
import { FoodGrid } from "@/components/food/food-grid";
import { Cart } from "@/components/cart/cart";
import { CheckoutDialog } from "@/components/cart/checkout-dialog";
import { PaymentDialog } from "@/components/cart/payment-dialog";
import { OrderDialog } from "@/components/cart/order-dialog";
import { ProfileDialog } from "@/components/auth/profile-dialog";
import { useAuth } from "@/context/auth-context";
import { AuthDialog } from "@/components/auth/auth-dialog";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import type { CheckoutData } from "@/lib/types";

export default function FoodOrderingApp() {
  const { user, isLoading } = useAuth();
  const cart = useCart();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("popular");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              🍕 FoodieApp
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              Delicious Food Delivered
            </p>
            <p className="text-sm text-muted-foreground">
              Sign in to start ordering your favorite meals
            </p>
          </div>

          <Button
            onClick={() => setAuthDialogOpen(true)}
            size="lg"
            className="w-full">
            Get Started
          </Button>

          <AuthDialog
            isOpen={authDialogOpen}
            onClose={() => setAuthDialogOpen(false)}
          />
        </div>
      </div>
    );
  }

  const handleProceedToPayment = (data: CheckoutData) => {
    setCheckoutData(data);
    setCheckoutDialogOpen(false);
    if (data.paymentMethod === "card") {
      setPaymentDialogOpen(true);
    } else {
      setOrderDialogOpen(true);
    }
  };

  const handlePaymentComplete = () => {
    setPaymentDialogOpen(false);
    setOrderDialogOpen(true);
  };

  const handleOrderComplete = () => {
    cart.clearCart();
    setOrderDialogOpen(false);
    setCheckoutData(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemCount={cart.totalItems}
        onCartClick={() => setIsCartOpen(true)}
        onProfileClick={() => setIsProfileOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="container mx-auto px-4 py-6 pb-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Delicious Food Delivered
          </h1>
          <p className="text-muted-foreground">
            Order your favorite meals from the best restaurants
          </p>
        </div>

        <CategoryTabs
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <FoodGrid
          category={selectedCategory}
          onAddToCart={cart.addItem}
          searchQuery={searchQuery}
        />
      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart.items}
        onUpdateQuantity={cart.updateQuantity}
        onRemoveItem={cart.removeItem}
        subtotal={cart.subtotal}
        deliveryFee={cart.deliveryFee}
        tax={cart.tax}
        total={cart.total}
        onCheckout={() => {
          setIsCartOpen(false);
          setCheckoutDialogOpen(true);
        }}
      />

      <CheckoutDialog
        isOpen={checkoutDialogOpen}
        onClose={() => setCheckoutDialogOpen(false)}
        items={cart.items}
        subtotal={cart.subtotal}
        deliveryFee={cart.deliveryFee}
        tax={cart.tax}
        total={cart.total}
        onProceedToPayment={handleProceedToPayment}
      />

      <PaymentDialog
        isOpen={paymentDialogOpen}
        onClose={() => setPaymentDialogOpen(false)}
        checkoutData={checkoutData}
        onPaymentComplete={handlePaymentComplete}
      />

      <OrderDialog
        isOpen={orderDialogOpen}
        onClose={() => setOrderDialogOpen(false)}
        items={cart.items}
        total={checkoutData?.total || cart.total}
        onOrderComplete={handleOrderComplete}
      />

      <ProfileDialog
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </div>
  );
}
