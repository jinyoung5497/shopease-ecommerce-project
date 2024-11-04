import { create } from "zustand";
import { Order } from "./types";

interface OrderStore {
  order: Order[];
  setOrder: (order: Order) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  order: [],
  setOrder: (newOrder: Order) =>
    set((state) => ({
      order: [...state.order, newOrder],
    })),
}));
