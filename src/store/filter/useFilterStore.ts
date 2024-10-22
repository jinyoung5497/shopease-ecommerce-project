import { create } from "zustand";

interface FilterStore {
  filterList: string[];
  men: boolean;
  women: boolean;
  sneakers: boolean;
  flats: boolean;
  sandals: boolean;
  isFilterTrue: boolean;
  isMen: () => void;
  isWomen: () => void;
  isSneakers: () => void;
  isFlats: () => void;
  isSandals: () => void;
  setIsFilterTrue: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filterList: [],
  men: false,
  women: false,
  sneakers: false,
  flats: false,
  sandals: false,
  isFilterTrue: false,
  isMen: () => {
    set((state) => ({ men: !state.men }));
  },
  isWomen: () => set((state) => ({ women: !state.women })),
  isSneakers: () => set((state) => ({ sneakers: !state.sneakers })),
  isFlats: () => set((state) => ({ flats: !state.flats })),
  isSandals: () => set((state) => ({ sandals: !state.sandals })),
  setIsFilterTrue: () =>
    set(() => ({
      isFilterTrue: true,
    })),
}));
