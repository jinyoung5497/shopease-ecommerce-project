import { create } from "zustand";

interface ProductState {
  imageNameList: string[];
  setImageNameList: (imageName: string) => void;
  resetImageNameList: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
  imageNameList: [],
  setImageNameList: (imageName: string) =>
    set((state) => ({
      imageNameList: [...state.imageNameList, imageName],
    })),
  resetImageNameList: () => set({ imageNameList: [] }),
}));
