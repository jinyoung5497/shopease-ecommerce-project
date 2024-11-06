import { useQuery } from "@tanstack/react-query";
import { getProductsAPI } from "../api";

export const useFetchProducts = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["product"],
    queryFn: getProductsAPI,
  });
  return { data, error, isLoading, isError };
};
