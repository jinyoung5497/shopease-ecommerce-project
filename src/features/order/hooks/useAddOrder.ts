import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addOrderAPI } from "../api/api";
import { useOrderStore } from "@/store/order/useOrderStore";
import { IOrder } from "@/store/order/types";

export const useAddOrder = () => {
  const queryClient = useQueryClient();
  const { setOrder } = useOrderStore();

  return useMutation({
    mutationFn: addOrderAPI,
    onSuccess: (newOrder: IOrder) => {
      setOrder(newOrder);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      console.error("Order creation failed: ", error);
    },
  });
};
