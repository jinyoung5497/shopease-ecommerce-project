import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProductAPI } from "..";
import { IProduct } from "..";

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
      updatedData: Partial<IProduct>;
      imageFiles: File[];
    }) => {
      return updateProductAPI(productId, updatedData, imageFiles);
    },
    onSuccess: () => {
      console.log("Product updated successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: Error) => {
      console.error("Error updating product:", error.message);
    },
  });
};
