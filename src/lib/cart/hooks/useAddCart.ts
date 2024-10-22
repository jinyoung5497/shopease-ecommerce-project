import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCartAPI } from "../api";
import { useCartStore } from "@/store/cart/useCartStore";

// 장바구니 아이템을 추가하는 훅
export const useAddCart = () => {
  const { setCartList } = useCartStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCartAPI,
    onSuccess: (data) => {
      console.log("Item added successfully:", data);
      setCartList(data);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      console.error("Error adding item to cart:", error);
    },
  });
};
