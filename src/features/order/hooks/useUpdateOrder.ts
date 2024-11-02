import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { updateOrderStatus } from "../api/api";
import { useAuthStore } from "@/store/auth/useAuthStore";

interface UpdateOrderParams {
  orderId: string;
  status: string;
}

// useUpdateOrder 훅
export const useUpdateOrder = (): UseMutationResult<
  { success: boolean; message: string },
  Error,
  UpdateOrderParams
> => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  return useMutation({
    mutationFn: ({ orderId, status }) => {
      if (!user) {
        throw new Error("User not authenticated");
      }
      return updateOrderStatus(user.uid, orderId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      console.error("Error updating order status: ", error);
    },
  });
};
