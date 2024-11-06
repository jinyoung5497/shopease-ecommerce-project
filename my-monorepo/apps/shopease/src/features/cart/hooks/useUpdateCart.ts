import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCartAPI } from "../api/api";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useFetchCart } from "./useFetchCart";

// 카트 아이템 업데이트 훅
export const useUpdateCart = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const userId = user?.uid;
  const { data } = useFetchCart();

  return useMutation({
    mutationFn: ({
      cartQuantity,
      index,
    }: {
      cartQuantity: number;
      index: number;
    }) => {
      if (data) {
        return updateCartAPI(userId, data, cartQuantity, index); // 실제 API 호출
      } else {
        return Promise.resolve(); // 데이터가 없을 때 빈 Promise 반환
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] }); // userId 기반 쿼리 무효화
    },
    onError: (error) => {
      console.error("Error updating item in cart:", error);
    },
  });
};
