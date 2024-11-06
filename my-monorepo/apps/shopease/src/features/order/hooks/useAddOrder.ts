import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addOrderAPI } from "../api/api";

export const useAddOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addOrderAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      console.error("Order creation failed: ", error);
    },
  });
};
