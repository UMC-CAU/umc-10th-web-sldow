import { create } from 'zustand';
import cartItems from '../constants/cartItems';
import type { CartItem, CartStore, CartTotals } from '../types';

const getTotals = (items: CartItem[]): CartTotals =>
  items.reduce(
    (totals, item) => {
      totals.amount += item.amount;
      totals.total += Number(item.price) * item.amount;

      return totals;
    },
    { amount: 0, total: 0 },
  );

const initialCartItems = cartItems.map((item) => ({ ...item }));
const initialTotals = getTotals(initialCartItems);

export const useCartStore = create<CartStore>((set, get) => ({
  cartItems: initialCartItems,
  amount: initialTotals.amount,
  total: initialTotals.total,
  increase: (id) => {
    set((state) => {
      const nextCartItems = state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item,
      );
      const totals = getTotals(nextCartItems);

      return {
        cartItems: nextCartItems,
        amount: totals.amount,
        total: totals.total,
      };
    });
  },
  decrease: (id) => {
    set((state) => {
      const nextCartItems = state.cartItems
        .map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item,
        )
        .filter((item) => item.amount > 0);
      const totals = getTotals(nextCartItems);

      return {
        cartItems: nextCartItems,
        amount: totals.amount,
        total: totals.total,
      };
    });
  },
  removeItem: (id) => {
    set((state) => {
      const nextCartItems = state.cartItems.filter((item) => item.id !== id);
      const totals = getTotals(nextCartItems);

      return {
        cartItems: nextCartItems,
        amount: totals.amount,
        total: totals.total,
      };
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
    const totals = getTotals(get().cartItems);

    set({
      amount: totals.amount,
      total: totals.total,
    });
  },
}));
