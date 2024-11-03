import { User } from "@/features/auth/api";

export type AuthStore = {
  isSeller: boolean;
  isLogin: boolean;
  user: User | null;
  setIsSellerFalse: () => void;
  setIsSellerTrue: () => void;
  setIsLogin: (isLogin: boolean) => void;
  setUser: (user: User) => void;
  logout: () => void;
  checkLoginStatus: () => Promise<void>;
};
