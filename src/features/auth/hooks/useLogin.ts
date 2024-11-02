import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { LoginRequestDto, LoginResponseDto, loginAPI } from "../api";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { pageRoutes } from "@/app/apiRoutes";

export const useLogin = () => {
  const navigate = useNavigate();
  const { setUser, setIsLogin } = useAuthStore();

  return useMutation<LoginResponseDto, Error, LoginRequestDto>({
    mutationFn: loginAPI,
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
