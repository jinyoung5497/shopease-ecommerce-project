import { create } from "zustand";
import { ICart } from "./types";

interface CartStore {
  cartList: ICart[];
  index: number;
  setCartList: (addNewCart: ICart) => void;
  setFirstCartList: (cartItems: ICart[]) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  cartQuantity: number;
  setCartQuantity: (quantity: number) => void;
  setIndex: (index: number) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cartList: [],
  index: 0,
  cartQuantity: 0,
  setCartList: (addNewCart: ICart) =>
    set((state) => ({ cartList: [...state.cartList, addNewCart] })),
  setFirstCartList: (cartItems: ICart[]) =>
    set(() => ({ cartList: cartItems })),
  updateQuantity: (productId: string, quantity: number) =>
    set((state) => ({
      cartList: state.cartList.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      ),
    })),
  setCartQuantity: (quantity: number) => set({ cartQuantity: quantity }),
  setIndex: (index: number) => set({ index }),
}));
