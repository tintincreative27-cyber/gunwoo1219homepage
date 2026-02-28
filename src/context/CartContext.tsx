import React, { createContext, useContext, useState, useCallback } from "react";
import { Product } from "@/data/products";

export interface ItemOptions {
  selectedOptions?: string[]; // Array of option IDs
  configuration?: string;
  notes?: string;
  [key: string]: any;
}

export interface CartItem {
  product: Product;
  quantity: number;
  options?: ItemOptions;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, options?: ItemOptions) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateItemOptions: (productId: string, options: ItemOptions) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product, options?: ItemOptions) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1, options: options ?? item.options }
            : item
        );
      }
      return [...prev, { product, quantity: 1, options }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const updateItemOptions = useCallback((productId: string, options: ItemOptions) => {
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, options } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const basePrice = item.product.price * item.quantity;
    const optionsPrice = (item.options?.selectedOptions || []).reduce((optSum, optId) => {
      const option = item.product.options.find(opt => opt.id === optId);
      return optSum + (option?.price || 0) * item.quantity;
    }, 0);
    return sum + basePrice + optionsPrice;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateItemOptions,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
