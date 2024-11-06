import { useQuery } from "@tanstack/react-query";
import { getCartAPI } from "../api/api";
import { Cart } from "@/shared/types/cart/types"; // Firebase 인증 함수
import { useAuthStore } from "@/store/auth/useAuthStore";

export const useFetchCart = () => {
  const { user } = useAuthStore();
  const userId = user?.uid;

  const { data, error, isLoading } = useQuery<Cart[]>({
    queryKey: ["cart"],
    queryFn: () => getCartAPI(userId!),
    enabled: !!userId, // user.uid가 있을 때만 쿼리 실행
  });

  return {
    data,
    error,
    isLoading,
  };
};
