import { IProduct } from "@/lib/product";
import { create } from "zustand";

interface ProductState {
  products: IProduct[];
  addProduct: (product: IProduct) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  addProduct: (product: IProduct) =>
    set((state) => ({
      products: [...state.products, product],
    })),
}));
