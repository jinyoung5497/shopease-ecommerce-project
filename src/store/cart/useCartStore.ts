import { create } from "zustand";

interface CartStore {
  index: number;
  cartQuantity: number;
  setCartQuantity: (quantity: number) => void;
  setIndex: (index: number) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  index: 0,
  cartQuantity: 0,
  setCartQuantity: (quantity: number) => set({ cartQuantity: quantity }),
  setIndex: (index: number) => set({ index }),
}));
