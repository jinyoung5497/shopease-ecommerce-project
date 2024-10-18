import { IUser } from "@/lib/auth";

export type authStore = {
  isSeller: boolean;
  isLogin: boolean;
  user: IUser | null;
  setIsSeller: () => void;
  setIsLogin: (isLogin: boolean) => void;
  setUser: (user: IUser) => void;
  logout: () => void;
  checkLoginStatus: () => Promise<void>;
};
