import { useState } from 'react';
import cartItemsData from '../constants/cartItems';
import type { CartItem } from '../types';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() =>
    cartItemsData.map((item) => ({ ...item })),
  );

  const increase = (id: string) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item,
      ),
    );
  };

  const decrease = (id: string) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item,
        )
        .filter((item) => item.amount > 0),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const amount = cartItems.reduce((sum, item) => sum + item.amount, 0);
  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.amount,
    0,
  );

  return {
    cartItems,
    amount,
    total,
    increase,
    decrease,
    clearCart,
  };
};
