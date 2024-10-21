import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IProduct, addProductAPI } from "..";

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
      console.log("Product added successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: Error) => {
      console.error("Error adding product:", error.message);
    },
  });
};
