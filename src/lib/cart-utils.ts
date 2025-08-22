import type { CartItem, FoodItem } from "./types";
import { DELIVERY_FEE, TAX_RATE, FREE_DELIVERY_THRESHOLD } from "./constants";

export const addItemToCart = (
  items: CartItem[],
  newItem: FoodItem,
): CartItem[] => {
  const existing = items.find((item) => item.id === newItem.id);
  if (existing) {
    return items.map((item) =>
      item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item,
    );
  }
  return [...items, { ...newItem, quantity: 1 }];
};

export const removeItemFromCart = (
  items: CartItem[],
  itemId: string,
): CartItem[] => {
  return items.filter((item) => item.id !== itemId);
};

export const updateItemQuantity = (
  items: CartItem[],
  itemId: string,
  quantity: number,
): CartItem[] => {
  if (quantity === 0) {
    return removeItemFromCart(items, itemId);
  }
  return items.map((item) =>
    item.id === itemId ? { ...item, quantity } : item,
  );
};

export const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const calculateTotalItems = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

export const calculateDeliveryFee = (subtotal: number): number => {
  return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
};

export const calculateTax = (subtotal: number): number => {
  return subtotal * TAX_RATE;
};

export const calculateTotal = (
  subtotal: number,
  deliveryFee: number,
  tax: number,
): number => {
  return subtotal + deliveryFee + tax;
};
