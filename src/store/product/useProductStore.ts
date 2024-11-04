import { Product } from "@/features/product/api";
import { create } from "zustand";

interface ProductState {
  products: Product[];
  imageNameList: string[];
  index: number;
  detailedProductInfo: Partial<Product>;
  isOpen: boolean;
  addProductState: (product: Product) => void;
  setProducts: (products: Product[]) => void;
  setImageNameList: (imageName: string) => void;
  resetImageNameList: () => void;
  setIndex: (index: number) => void;
  setDetailedProductInfo: (detailedProductInfo: Partial<Product>) => void;
  setIsOpenTrue: () => void;
  setIsOpenToggle: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  imageNameList: [],
  index: 0,
  detailedProductInfo: {},
  isOpen: false,
  addProductState: (product: Product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
  setProducts: (products: Product[]) => set({ products }),
  setImageNameList: (imageName: string) =>
    set((state) => ({
      imageNameList: [...state.imageNameList, imageName],
    })),
  resetImageNameList: () => set({ imageNameList: [] }),
  setIndex: (index: number) => set({ index }),
  setDetailedProductInfo: (detailedProductInfo: Partial<Product>) =>
    set({ detailedProductInfo }),
  setIsOpenTrue: () => set({ isOpen: true }),
  setIsOpenToggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
