import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCartAPI } from "../api/api";
import { Cart } from "@/shared/types/cart/types";
import { useAuthStore } from "@/store/auth/useAuthStore";

// 장바구니 아이템을 추가하는 훅
export const useAddCart = () => {
  const { user } = useAuthStore();
  const userId = user?.uid;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newCartItem: Cart) => addCartAPI(userId!, newCartItem), // userId와 새로운 장바구니 항목 전달
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] }); // userId 기반 쿼리 무효화
    },
    onError: (error) => {
      console.error("Error adding item to cart:", error);
    },
  });
};
