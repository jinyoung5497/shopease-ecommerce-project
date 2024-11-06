import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductQuantity } from "../api";

export const useUpdateProductQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProductQuantity,
    onSuccess: () => {
      // products 캐시 무효화 및 업데이트
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Error updating product quantity:", error);
    },
  });
};
