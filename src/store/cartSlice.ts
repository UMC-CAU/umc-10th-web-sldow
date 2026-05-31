import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import cartItems from '../constants/cartItems';
import type { CartItem } from '../types';


interface CartState {
  cartItems: CartItem[];
  amount: number;
  total: number;
}

//도우미 함수
const getTotals = (items: CartItem[]) =>
  items.reduce(
    (totals, item) => {
      totals.amount += item.amount;
      totals.total += Number(item.price) * item.amount;

      return totals;
    },
    { amount: 0, total: 0 },
  );

const calculateCartTotals = (state: CartState) => {
  const { amount, total } = getTotals(state.cartItems);

  state.amount = amount;
  state.total = total;
};

// 초기 세팅
const initialCartItems = cartItems.map((item) => ({ ...item }));
const initialTotals = getTotals(initialCartItems);

const initialState: CartState = {
  cartItems: initialCartItems,
  amount: initialTotals.amount,
  total: initialTotals.total,
};

//slice = reducer + actions + name + initialState
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increase: (state, action: PayloadAction<string>) => {
      const cartItem = state.cartItems.find((item) => item.id === action.payload);

      if (cartItem) {
        cartItem.amount += 1;
      }

      calculateCartTotals(state);
    },
    decrease: (state, action: PayloadAction<string>) => {
      const cartItem = state.cartItems.find((item) => item.id === action.payload);

      if (cartItem) {
        cartItem.amount -= 1;
      }

      state.cartItems = state.cartItems.filter((item) => item.amount > 0);
      calculateCartTotals(state);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      calculateCartTotals(state);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    },
    calculateTotals: (state) => {
      calculateCartTotals(state);
    },
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
