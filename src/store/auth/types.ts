import { IUser } from "@/lib/auth";

export type authStore = {
  isSeller: boolean;
  isLogin: boolean;
  user: IUser | null;
  setIsSellerFalse: () => void;
  setIsSellerTrue: () => void;
  setIsLogin: (isLogin: boolean) => void;
  setUser: (user: IUser) => void;
  logout: () => void;
  checkLoginStatus: () => Promise<void>;
};
