import { IProduct } from "@/lib/product";
import { create } from "zustand";

interface ProductState {
  products: IProduct[];
  imageNameList: string[];
  addProductState: (product: IProduct) => void;
  setProducts: (products: IProduct[]) => void;
  setImageNameList: (imageName: string) => void;
  resetImageNameList: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  imageNameList: [],
  addProductState: (product: IProduct) =>
    set((state) => ({
      products: [...state.products, product],
    })),
  setProducts: (products: IProduct[]) => set({ products }),
  setImageNameList: (imageName: string) =>
    set((state) => ({
      imageNameList: [...state.imageNameList, imageName],
    })),
  resetImageNameList: () => set({ imageNameList: [] }),
}));
