import { IProduct } from "@/lib/product";
import { create } from "zustand";

interface ProductState {
  products: IProduct[];
  imageName: string;
  addProductState: (product: IProduct) => void;
  setProducts: (products: IProduct[]) => void;
  setImageName: (imageName: string) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  imageName: "",
  addProductState: (product: IProduct) =>
    set((state) => ({
      products: [...state.products, product],
    })),
  setProducts: (products: IProduct[]) => set({ products }),
  setImageName: (imageName: string) => set({ imageName }),
}));
