import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCartItemAPI } from "../api";
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
      console.log("cart item deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: Error) => {
      console.error("Error deleting cart:", error.message);
    },
  });
};
