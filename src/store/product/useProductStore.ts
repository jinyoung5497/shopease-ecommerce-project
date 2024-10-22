import { IProduct } from "@/lib/product";
import { create } from "zustand";

interface ProductState {
  products: IProduct[];
  imageNameList: string[];
  index: number;
  detailedProductInfo: Partial<IProduct>;
  addProductState: (product: IProduct) => void;
  setProducts: (products: IProduct[]) => void;
  setImageNameList: (imageName: string) => void;
  resetImageNameList: () => void;
  setIndex: (index: number) => void;
  setDetailedProductInfo: (detailedProductInfo: Partial<IProduct>) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  imageNameList: [],
  index: 0,
  detailedProductInfo: {},
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
  setIndex: (index: number) => set({ index }),
  setDetailedProductInfo: (detailedProductInfo: Partial<IProduct>) =>
    set({ detailedProductInfo }),
}));
