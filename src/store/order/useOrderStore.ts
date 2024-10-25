import { create } from "zustand";
import { IOrder } from "./types";

interface OrderType {
  order: IOrder[];
  setOrder: (order: IOrder) => void;
}

export const useOrderStore = create<OrderType>((set) => ({
  order: [],
  setOrder: (newOrder: IOrder) =>
    set((state) => ({
      order: [...state.order, newOrder],
    })),
}));
