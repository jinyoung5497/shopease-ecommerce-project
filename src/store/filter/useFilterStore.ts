import { create } from "zustand";

interface FilterStore {
  filterList: string[];
  men: boolean;
  women: boolean;
  sneakers: boolean;
  hat: boolean;
  kids: boolean;
  isFilterTrue: boolean;
  isMen: () => void;
  isWomen: () => void;
  isSneakers: () => void;
  isHat: () => void;
  isKids: () => void;
  setIsFilterTrue: () => void;
  setMenTrue: () => void;
  setWomenTrue: () => void;
  setSneakersTrue: () => void;
  setHatTrue: () => void;
  setKidsTrue: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filterList: [],
  men: false,
  women: false,
  sneakers: false,
  hat: false,
  kids: false,
  isFilterTrue: false,
  isMen: () => {
    set((state) => ({ men: !state.men }));
  },
  isWomen: () => set((state) => ({ women: !state.women })),
  isSneakers: () => set((state) => ({ sneakers: !state.sneakers })),
  isHat: () => set((state) => ({ hat: !state.hat })),
  isKids: () => set((state) => ({ kids: !state.kids })),
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
      kids: false,
      isFilterTrue: true,
    }));
  },
  setWomenTrue: () =>
    set(() => ({
      men: false,
      women: true,
      sneakers: false,
      hat: false,
      kids: false,
      isFilterTrue: true,
    })),
  setSneakersTrue: () =>
    set(() => ({
      men: false,
      women: false,
      sneakers: true,
      hat: false,
      kids: false,
      isFilterTrue: true,
    })),
  setHatTrue: () =>
    set(() => ({
      men: false,
      women: false,
      sneakers: false,
      hat: true,
      kids: false,
      isFilterTrue: true,
    })),
  setKidsTrue: () =>
    set(() => ({
      men: false,
      women: false,
      sneakers: false,
      hat: false,
      kids: true,
      isFilterTrue: true,
    })),
}));
