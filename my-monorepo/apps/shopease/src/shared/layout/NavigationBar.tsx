import { useNavigation } from "@/shared/hooks/useNavigation";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useEffect } from "react";
import { useFetchCart } from "@/features/cart/hooks/useFetchCart";
import { useUpdateCart } from "@/features/cart/hooks/useUpdateCart";
import {
  useDeleteAllCart,
  useDeleteCart,
} from "@/features/cart/hooks/useDeleteCart";
import { useToastStore } from "@/store/toast/useToastStore";
import { useUpdateProductQuantity } from "@/features/product/hooks/useUpdateProductQuantity";
import { Button } from "@/shared/components/button/Button";
import { Sheet } from "@/shared/components/sheet/Sheet";
import { X } from "lucide-react";

const NavigationBar = () => {
  const isLogin = useAuthStore((state) => state.isLogin);
  const logout = useAuthStore((state) => state.logout);
  const checkLoginStatus = useAuthStore((state) => state.checkLoginStatus);
  const isSeller = useAuthStore((state) => state.isSeller);
  const { data } = useFetchCart();
  const { navToCheckout } = useNavigation();
  const { mutate: updateCart } = useUpdateCart();
  const { mutate: deleteCartItem } = useDeleteCart();
  const { mutate: deleteAllCartItems } = useDeleteAllCart();
  const { mutate: updateQuantity } = useUpdateProductQuantity();
  const { addToast } = useToastStore();

  const {
    navToLogin,
    navToAdmin,
    navToMyProducts,
    navToPurchaseHistory,
    navToHome,
  } = useNavigation();

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  const handleLogout = () => {
    logout();
    navToHome();
  };

  const increaseQuantity = (index: number) => {
    if (data) {
      updateCart({ cartQuantity: data[index].quantity + 1, index });
    }
  };

  const decreaseQuantity = (index: number) => {
    if (data && data[index].quantity > 1) {
      updateCart({ cartQuantity: data[index].quantity - 1, index });
    }
  };

  const handleCheckout = () => {
    if (!isLogin) {
      addToast("로그인이 필요한 기능입니다", "error");
    } else {
      data?.forEach((value) => {
        updateQuantity({ productId: value.productId, quantity: 1 });
      });
      navToCheckout();
    }
  };

  return (
    <div className="flex items-center justify-between p-7 w-full border-b-[1px] border-slate-400 text-primary">
      <Button variant="link" className="flex gap-2" onClick={navToHome}>
        <i className="fi fi-rs-basket-shopping-simple translate-y-[2px] text-[26px]"></i>
        <h1 className="font-medium text-[26px]">ShopEase</h1>
      </Button>

      <div className="flex items-center justify-center text-[16px]">
        {isSeller && isLogin && (
          <>
            <Button onClick={navToMyProducts} variant="link" size="large">
              <i className="fi fi-rs-supplier-alt translate-y-[1px]"></i>
              <p>My Products</p>
            </Button>

            <Button onClick={navToAdmin} variant="link" size="large">
              <i className="fi fi fi-rs-admin-alt translate-y-[1px]"></i>
              <p>Admin</p>
            </Button>
          </>
        )}

        {!isSeller && isLogin && (
          <Button onClick={navToPurchaseHistory} variant="link" size="large">
            <i className="fi fi fi-rs-time-past translate-y-[1px]"></i>
            <p>Purchase History</p>
          </Button>
        )}

        {isLogin ? (
          <Button onClick={handleLogout} variant="link" size="large">
            <i className="fi fi-rs-user translate-y-[1px]"></i>
            <p>Logout</p>
          </Button>
        ) : (
          <Button onClick={navToLogin} variant="link" size="large">
            <i className="fi fi-rs-user translate-y-[1px]"></i>
            <p>Login</p>
          </Button>
        )}
        <Sheet.Root>
          <Sheet.Trigger variant="link" asChild>
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
            <Sheet.Items>
              {isLogin &&
                data?.map((value, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between w-full border-slate-200 border-b-[1px] py-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={value.productImage}
                        alt="productImage"
                        className="w-14 h-14 border-[1px] border-slate-200 p-2"
                      />
                      <div className="flex flex-col items-start gap-1">
                        <div>{value.productName}</div>
                        <div className="flex items-center">
                          <div className="flex border-slate-200 border-[1px] p-1 px-3 gap-2 items-center justify-center">
                            <i
                              onClick={() => increaseQuantity(index)}
                              className="fi fi-rs-plus-small translate-y-[2px] cursor-pointer"
                            ></i>
                            <div>{value.quantity}</div>
                            <i
                              onClick={() => decreaseQuantity(index)}
                              className="fi fi-rs-minus-small translate-y-[2px] cursor-pointer"
                            ></i>
                          </div>
                          <div className="ml-4 text-gray text-sm">
                            {value.productPrice.toLocaleString("ko-KR", {
                              style: "currency",
                              currency: "KRW",
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <i
                        onClick={() => deleteCartItem(value.productId)}
                        className="fi fi-rs-cross-small text-xl cursor-pointer"
                      ></i>
                      <div>
                        {value.totalPrice.toLocaleString("ko-KR", {
                          style: "currency",
                          currency: "KRW",
                        })}
                      </div>
                    </div>
                  </div>
                ))}
            </Sheet.Items>
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
      </div>
    </div>
  );
};

export default NavigationBar;
