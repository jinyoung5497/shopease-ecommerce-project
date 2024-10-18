import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { pageRoutes } from "@/apiRoutes";
import { IProduct, addProductAPI } from "..";

export const useAddProduct = () => {
  const navigate = useNavigate();

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
      navigate(pageRoutes.myProducts);
    },
    onError: (error: Error) => {
      console.error("Error adding product:", error.message);
    },
  });
};
