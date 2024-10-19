// useFetchProduct.ts
import { useQuery } from "@tanstack/react-query";
import { getProductsAPI } from "..";

export const useFetchProducts = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsAPI,
  });

  return {
    data,
    error,
    isLoading,
  };
};
