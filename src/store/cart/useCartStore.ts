import { create } from "zustand";
import { ICart } from "./types";

interface CartStore {
  cartList: ICart[];
  setCartList: (addNewCart: ICart) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cartList: [],
  setCartList: (addNewCart: ICart) =>
    set((state) => ({ cartList: [...state.cartList, addNewCart] })),
}));
