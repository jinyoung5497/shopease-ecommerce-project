import { create } from "zustand";

interface FilterStore {
  filterList: string[];
  men: boolean;
  women: boolean;
  sneakers: boolean;
  hat: boolean;
  top: boolean;
  isFilterTrue: boolean;
  isMen: () => void;
  isWomen: () => void;
  isSneakers: () => void;
  isHat: () => void;
  isTop: () => void;
  setIsFilterTrue: () => void;
  setMenTrue: () => void;
  setWomenTrue: () => void;
  setSneakersTrue: () => void;
  setHatTrue: () => void;
  setTopTrue: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filterList: [],
  men: false,
  women: false,
  sneakers: false,
  hat: false,
  top: false,
  isFilterTrue: false,
  isMen: () => {
    set((state) => ({ men: !state.men }));
  },
  isWomen: () => set((state) => ({ women: !state.women })),
  isSneakers: () => set((state) => ({ sneakers: !state.sneakers })),
  isHat: () => set((state) => ({ hat: !state.hat })),
  isTop: () => set((state) => ({ top: !state.top })),
  setIsFilterTrue: () =>
    set(() => ({
      isFilterTrue: true,
    })),
  setMenTrue: () => {
    set(() => ({
      men: true,
      women: false,
      sneakers: false,
      hat: false,
      top: false,
      isFilterTrue: true,
    }));
  },
  setWomenTrue: () =>
    set(() => ({
      men: false,
      women: true,
      sneakers: false,
      hat: false,
      top: false,
      isFilterTrue: true,
    })),
  setSneakersTrue: () =>
    set(() => ({
      men: false,
      women: false,
      sneakers: true,
      hat: false,
      top: false,
      isFilterTrue: true,
    })),
  setHatTrue: () =>
    set(() => ({
      men: false,
      women: false,
      sneakers: false,
      hat: true,
      top: false,
      isFilterTrue: true,
    })),
  setTopTrue: () =>
    set(() => ({
      men: false,
      women: false,
      sneakers: false,
      hat: false,
      top: true,
      isFilterTrue: true,
    })),
}));
