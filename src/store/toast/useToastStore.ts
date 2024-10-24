import { create } from "zustand";

interface ToastState {
  isToast: boolean;
  setIsToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  isToast: false,
  setIsToast: () => set((state) => ({ isToast: !state.isToast })),
}));
