"use client";

import { useState } from "react";
import type { CartItem, FoodItem } from "@/lib/types";
import {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  calculateSubtotal,
  calculateTotalItems,
  calculateDeliveryFee,
  calculateTax,
  calculateTotal,
} from "@/lib/cart-utils";

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: FoodItem) => {
    setItems((prev) => addItemToCart(prev, item));
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => removeItemFromCart(prev, itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setItems((prev) => updateItemQuantity(prev, itemId, quantity));
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = calculateSubtotal(items);
  const totalItems = calculateTotalItems(items);
  const deliveryFee = calculateDeliveryFee(subtotal);
  const tax = calculateTax(subtotal);
  const total = calculateTotal(subtotal, deliveryFee, tax);

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    totalItems,
    deliveryFee,
    tax,
    total,
  };
};
