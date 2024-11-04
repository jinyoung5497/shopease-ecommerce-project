import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { GoogleUser, googleLoginAPI } from "../api";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { pageRoutes } from "@/app/apiRoutes";

export const useGoogleLogin = () => {
  const navigate = useNavigate();
  const { setUser, setIsLogin } = useAuthStore();

  return useMutation<GoogleUser, Error, boolean>({
    mutationFn: googleLoginAPI,
    onSuccess: (userData) => {
      setIsLogin(true);
      setUser({
        uid: userData.uid,
        email: userData.email,
        displayName: userData.displayName ?? "",
      });
      navigate(pageRoutes.home);
    },
    onError: (error: Error) => {
      console.error(
        "로그인 중 오류가 발생했습니다. 다시 시도해 주세요.",
        error
      );
    },
  });
};
