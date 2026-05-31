import { create } from 'zustand';
import { useCartStore } from './useCartStore';
import type { ModalStore } from '../types';

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  open: () => {
    set({ isOpen: true });
  },
  close: () => {
    set({ isOpen: false });
  },
  clearCartAndClose: () => {
    useCartStore.getState().clearCart();
    set({ isOpen: false });
  },
}));
