import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllCartAPI, deleteCartItemAPI } from "../api/api";
import { useAuthStore } from "@/store/auth/useAuthStore";

// 제품 삭제 훅
export const useDeleteCart = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: async (productId: string) => {
      await deleteCartItemAPI(user?.uid, productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: Error) => {
      console.error("Error deleting cart:", error.message);
    },
  });
};

export const useDeleteAllCart = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      if (!user?.uid) {
        throw new Error("User is not authenticated");
      }
      await deleteAllCartAPI(user.uid); // user의 장바구니 전체 삭제
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] }); // 캐시 무효화
    },
    onError: (error: Error) => {
      console.error("Error deleting all cart items:", error.message);
    },
  });
};
