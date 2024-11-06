import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductAPI } from "../api";
import { Product } from "../api";

// 제품 업데이트 훅
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      updatedData,
      imageFiles,
    }: {
      productId: string;
      updatedData: Partial<Product>;
      imageFiles: File[];
    }) => {
      return updateProductAPI(productId, updatedData, imageFiles);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: Error) => {
      console.error("Error updating product:", error.message);
    },
  });
};
