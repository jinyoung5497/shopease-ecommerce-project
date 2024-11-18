import { Product } from "@/features/product/api/types";
import { useCallback } from "react";

export type ProductCategoryType = Product["productCategory"];

type HandleCategoryProps = {
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<ProductCategoryType>
  >;
};

export const useHandleCategory = ({
  setSelectedCategory,
}: HandleCategoryProps) => {
  const handleCategory = useCallback(
    (category: ProductCategoryType) => {
      setSelectedCategory(category);
    },
    [setSelectedCategory],
  );

  return { handleCategory };
};
