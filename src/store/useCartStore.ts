import { create } from 'zustand';
import cartItems from '../constants/cartItems';
import type { CartItem, CartStore, CartTotals } from '../types';

const calcTotals = (items: CartItem[]): CartTotals =>
  items.reduce(
    (totals, item) => {
      totals.amount += item.amount;
      totals.total += Number(item.price) * item.amount;

      return totals;
    },
    { amount: 0, total: 0 },
  );

const cartState = (items: CartItem[]) => ({
  cartItems: items,
  ...calcTotals(items),
});

const initialCartItems = cartItems.map((item) => ({ ...item }));

export const useCartStore = create<CartStore>((set, get) => ({
  ...cartState(initialCartItems),
  increase: (id) => {
    set((state) => {
      const items = state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item,
      );

      return cartState(items);
    });
  },
  decrease: (id) => {
    set((state) => {
      const items = state.cartItems
        .map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item,
        )
        .filter((item) => item.amount > 0);

      return cartState(items);
    });
  },
  removeItem: (id) => {
    set((state) => {
      const items = state.cartItems.filter((item) => item.id !== id);

      return cartState(items);
    });
  },
  clearCart: () => {
    set({
      cartItems: [],
      amount: 0,
      total: 0,
    });
  },
  calculateTotals: () => {
    set(calcTotals(get().cartItems));
  },
}));
