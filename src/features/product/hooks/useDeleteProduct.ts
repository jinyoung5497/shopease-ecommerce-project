import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductAPI } from "../api";

// 제품 삭제 훅
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      await deleteProductAPI(productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: Error) => {
      console.error("Error deleting product:", error.message);
    },
  });
};
