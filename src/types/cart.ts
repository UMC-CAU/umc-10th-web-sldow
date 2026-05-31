export interface CartItem {
  id: string;
  title: string;
  singer: string;
  price: string;
  img: string;
  amount: number;
}

export interface CartTotals {
  amount: number;
  total: number;
}

export interface CartState extends CartTotals {
  cartItems: CartItem[];
}

export interface CartActions {
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

export type CartStore = CartState & CartActions;
