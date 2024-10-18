import { create } from "zustand";
import { authStore } from "./types";
import Cookies from "js-cookie";
import { IUser } from "@/lib/auth";
import { auth, db } from "@/config/firebase";
import { doc, getDoc } from "@firebase/firestore";

export const useAuthStore = create<authStore>()((set) => ({
  isSeller: false,
  isLogin: !!Cookies.get("accessToken"),
  user: null,

  setIsSeller: () => set((state) => ({ isSeller: !state.isSeller })),
  setIsLogin: (isLogin: boolean) => set({ isLogin }),
  setUser: (user: IUser) => set({ user, isLogin: true }),
  logout: () => {
    set({ isLogin: false, user: null, isSeller: false }),
      Cookies.remove("accessToken");
  },

  checkLoginStatus: async () => {
    const token = Cookies.get("accessToken");
    if (token) {
      try {
        auth.onAuthStateChanged(async (currentUser) => {
          if (currentUser) {
            const userDocRef = doc(db, "users", currentUser.uid);
            const userDoc = await getDoc(userDocRef);

            const userData = userDoc.data();
            const isSeller = userData?.isSeller || false;

            set({
              user: {
                uid: currentUser.uid,
                email: currentUser.email ?? "",
                displayName: currentUser.displayName ?? "",
              },
              isLogin: true,
              isSeller: isSeller,
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
