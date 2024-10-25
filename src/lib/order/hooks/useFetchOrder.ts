import { useQuery } from "@tanstack/react-query";
import { fetchOrderAPI } from "../api";
import { IOrder } from "@/store/order/types";
import { useAuthStore } from "@/store/auth/useAuthStore";

export const useFetchOrder = () => {
  const { user } = useAuthStore();
  const userId = user?.uid;

  const { data, error, isLoading } = useQuery<IOrder[]>({
    queryKey: ["orders"],
    queryFn: () => fetchOrderAPI(userId!),
    enabled: !!userId,
  });

  return {
    data,
    error,
    isLoading,
  };
};
