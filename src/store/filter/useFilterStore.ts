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
  setMenTrue: () => void;
  setWomenTrue: () => void;
  setSneakersTrue: () => void;
  setFlatsTrue: () => void;
  setSandalsTrue: () => void;
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
  setMenTrue: () => {
    set(() => ({
      men: true,
      women: false,
      sneakers: false,
      flats: false,
      sandals: false,
      isFilterTrue: true,
    }));
  },
  setWomenTrue: () =>
    set(() => ({
      men: false,
      women: true,
      sneakers: false,
      flats: false,
      sandals: false,
      isFilterTrue: true,
    })),
  setSneakersTrue: () =>
    set(() => ({
      men: false,
      women: false,
      sneakers: true,
      flats: false,
      sandals: false,
      isFilterTrue: true,
    })),
  setFlatsTrue: () =>
    set(() => ({
      men: false,
      women: false,
      sneakers: false,
      flats: true,
      sandals: false,
      isFilterTrue: true,
    })),
  setSandalsTrue: () =>
    set(() => ({
      men: false,
      women: false,
      sneakers: false,
      flats: false,
      sandals: true,
      isFilterTrue: true,
    })),
}));
