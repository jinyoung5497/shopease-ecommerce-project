import { IUser } from "@/features/auth/api";

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
