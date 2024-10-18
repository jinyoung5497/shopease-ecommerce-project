import { create } from "zustand";
import { authStore } from "./types";
import Cookies from "js-cookie";
import { IUser } from "@/lib/auth";
import { auth } from "@/config/firebase";

export const useAuthStore = create<authStore>()((set) => ({
  isSeller: false,
  isLogin: !!Cookies.get("accessToken"),
  user: null,

  setIsSeller: () => set((state) => ({ isSeller: !state.isSeller })),
  setIsLogin: (isLogin: boolean) => set({ isLogin }),
  setUser: (user: IUser) => set({ user, isLogin: true }),
  logout: () => {
    set({ isLogin: false, user: null }), Cookies.remove("accessToken");
  },

  checkLoginStatus: async () => {
    const token = Cookies.get("accessToken");
    if (token) {
      try {
        auth.onAuthStateChanged((currentUser) => {
          if (currentUser) {
            set({
              user: {
                uid: currentUser.uid,
                email: currentUser.email ?? "",
                displayName: currentUser.displayName ?? "",
              },
              isLogin: true,
            });
          } else {
            set({
              user: null,
              isLogin: false,
            });
            console.error("유저 정보를 가져올 수 없습니다.");
          }
        });
      } catch (error) {
        console.error("유저 정보를 가져오는 중 에러가 발생했습니다.", error);
        set({ user: null, isLogin: false });
      }
    }
  },
}));
