import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IProduct, addProductAPI } from "../api";

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      product,
      imageFiles,
    }: {
      product: Omit<
        IProduct,
        "id" | "createdAt" | "updatedAt" | "productImages"
      >;
      imageFiles: File[];
    }) => {
      return addProductAPI(product, imageFiles);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: Error) => {
      console.error("Error adding product:", error.message);
    },
  });
};
