import { useMutation } from "@tanstack/react-query";
import { registerAPI } from "../api";
import { useNavigate } from "react-router";
import { pageRoutes } from "@/app/apiRoutes";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerAPI,
    onSuccess: () => {
      navigate(pageRoutes.login);
    },
    onError: (error: Error) => {
      console.error("회원가입 중 오류가 발생했습니다.", error.message);
    },
  });
};
