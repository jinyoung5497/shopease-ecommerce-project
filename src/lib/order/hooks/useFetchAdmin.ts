import { useQuery } from "@tanstack/react-query";
import { fetchAdminAPI } from "../api";
import { IOrder } from "@/store/order/types";
import { useAuthStore } from "@/store/auth/useAuthStore";

export const useFetchAdmin = () => {
  const { user } = useAuthStore();
  const userId = user?.uid;

  const { data, error, isLoading } = useQuery<IOrder[]>({
    queryKey: ["orders"],
    queryFn: () => fetchAdminAPI(userId!),
    enabled: !!userId,
  });

  return {
    data,
    error,
    isLoading,
  };
};
