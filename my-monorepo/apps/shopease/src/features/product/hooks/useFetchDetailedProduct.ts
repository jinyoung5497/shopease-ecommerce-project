import { useQuery } from "@tanstack/react-query";
import { getDetailedProductAPI } from "../api/api";

export const useFetchDetailedProduct = (productId: string) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getDetailedProductAPI(productId),
    enabled: !!productId,
  });
  return { data, error, isLoading, isError };
};
