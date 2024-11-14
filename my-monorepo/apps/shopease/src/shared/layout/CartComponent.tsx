import { Button } from "@repo/ui/button/Button";
import { Sheet } from "@repo/ui/sheet/Sheet";
import { X } from "lucide-react";
import { useCallback } from "react";
import { useDeleteAllCart } from "@/features/cart/hooks/useDeleteCart";
import { useUpdateProductQuantity } from "@/features/product/hooks/useUpdateProductQuantity";
import { useToastStore } from "@/store/toast/useToastStore";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useNavigation } from "../hooks/useNavigation";
import { useFetchCart } from "@/features/cart/hooks/useFetchCart";
import CartItem from "./CartItem";

const CartComponent = () => {
  const { mutate: deleteAllCartItems } = useDeleteAllCart();
  const { mutate: updateQuantity } = useUpdateProductQuantity();
  const { addToast } = useToastStore();
  const { isLogin } = useAuthStore();
  const { navToCheckout } = useNavigation();
  const { data } = useFetchCart();

  const handleCheckout = useCallback(() => {
    const isProductsHaveQuantity = data?.some((value) => value.quantity !== 0);
    if (isProductsHaveQuantity) {
      if (!isLogin) {
        addToast("로그인이 필요한 기능입니다", "error");
      } else {
        data?.forEach((value) => {
          updateQuantity({ productId: value.productId, quantity: -1 });
        });
        navToCheckout();
      }
    } else {
      addToast("상품 재고가 부족합니다", "error");
    }
  }, [isLogin, data, addToast, updateQuantity, navToCheckout]);

  return (
    <Sheet.Root>
      <Sheet.Trigger asChild>
        <Button variant="link">
          <div className="flex gap-1 items-center justify-center right-0 relative">
            {data && data?.length > 0 && isLogin && (
              <div className="rounded-full p-[10px] w-3 h-3 bg-primary flex items-center justify-center absolute z-10 left-3 bottom-4">
                <p className="text-white text-[12px]">{data?.length}</p>
              </div>
            )}
            <i className="fi fi-rs-shopping-cart translate-y-[3px] text-xl"></i>
          </div>
        </Button>
      </Sheet.Trigger>
      <Sheet.Content>
        <Sheet.Close topRight>
          <X className="h-5 w-5" />
        </Sheet.Close>
        <Sheet.Header>
          <Sheet.Title title="Cart" />
        </Sheet.Header>
        <Sheet.Divider />
        <Sheet.Items>{isLogin && <CartItem data={data} />}</Sheet.Items>
        <Sheet.Divider />
        <Sheet.Footer>
          <div className="flex flex-col mt-2 gap-4">
            <div className="flex items-center justify-between">
              <div>
                Total:{" "}
                {isLogin &&
                  data
                    ?.reduce((total, product) => {
                      return total + product.totalPrice;
                    }, 0)
                    .toLocaleString("ko-KR", {
                      style: "currency",
                      currency: "KRW",
                    })}
              </div>
              <Button
                onClick={() => deleteAllCartItems()}
                color="red"
                radius="none"
              >
                <i className="fi fi-rs-trash"></i>
              </Button>
            </div>
            <Button onClick={handleCheckout} radius="none" size="large">
              Checkout
            </Button>
          </div>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet.Root>
  );
};

export default CartComponent;
