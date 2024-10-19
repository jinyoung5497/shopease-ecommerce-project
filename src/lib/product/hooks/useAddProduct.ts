import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IProduct, addProductAPI } from "..";

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      product,
      imageFile,
    }: {
      product: Omit<
        IProduct,
        "id" | "createdAt" | "updatedAt" | "productImage"
      >;
      imageFile: File;
    }) => {
      return addProductAPI(product, imageFile);
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
