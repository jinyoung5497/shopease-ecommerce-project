import { useNavigation } from "@/hooks/useNavigation";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useFetchCart } from "@/lib/cart/hooks/useFetchCart";
import { useCartStore } from "@/store/cart/useCartStore";
import { useUpdateCart } from "@/lib/cart/hooks/useUpdateCart";
import {
  useDeleteAllCart,
  useDeleteCart,
} from "@/lib/cart/hooks/useDeleteCart";

const NavigationBar = () => {
  const isLogin = useAuthStore((state) => state.isLogin);
  const logout = useAuthStore((state) => state.logout);
  const checkLoginStatus = useAuthStore((state) => state.checkLoginStatus);
  const isSeller = useAuthStore((state) => state.isSeller);
  const { data } = useFetchCart();
  const { navToCheckout } = useNavigation();
  const { setFirstCartList, setIndex, setCartQuantity } = useCartStore();
  const { mutate: updateCart } = useUpdateCart();
  const { mutate: deleteCartItem } = useDeleteCart();
  const { mutate: deleteAllCartItems } = useDeleteAllCart();

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

  useEffect(() => {
    if (data) setFirstCartList(data);
  }, [setFirstCartList]);

  const handleLogout = () => {
    logout();
    navToHome();
  };

  const handleCheckout = () => {
    navToCheckout();
  };

  const increaseQuantity = (index: number) => {
    if (data) {
      setCartQuantity(data[index].quantity + 1);
      setIndex(index);
    }

    updateCart();
  };

  const decreaseQuantity = (index: number) => {
    if (data && data[index].quantity > 1) {
      setCartQuantity(data[index].quantity - 1);
      setIndex(index);
      updateCart();
    }
  };

  return (
    <div className="flex items-center justify-between p-7 w-full border-b-[1px] border-slate-400 text-primary">
      <button
        className="flex gap-2 text-[26px] items-center justify-center"
        onClick={navToHome}
      >
        <i className="fi fi-rs-basket-shopping-simple translate-y-[2px]"></i>
        <h1 className="font-medium text-primary">ShopEase</h1>
      </button>

      <div className="flex gap-7 items-center justify-center text-[16px]">
        {isSeller && isLogin && (
          <>
            <button
              onClick={navToMyProducts}
              className="flex gap-1 items-center justify-center"
            >
              <i className="fi fi-rs-supplier-alt translate-y-[1px]"></i>
              <p>My Products</p>
            </button>

            <button
              onClick={navToAdmin}
              className="flex gap-1 items-center justify-center"
            >
              <i className="fi fi fi-rs-admin-alt translate-y-[1px]"></i>
              <p>Admin</p>
            </button>
          </>
        )}

        {!isSeller && isLogin && (
          <button
            onClick={navToPurchaseHistory}
            className="flex gap-1 items-center justify-center"
          >
            <i className="fi fi fi-rs-time-past translate-y-[1px]"></i>
            <p>Purchase History</p>
          </button>
        )}

        {isLogin ? (
          <button
            className="flex gap-1 items-center justify-center"
            onClick={handleLogout}
          >
            <i className="fi fi-rs-user translate-y-[1px]"></i>
            <p>Logout</p>
          </button>
        ) : (
          <button
            className="flex gap-1 items-center justify-center"
            onClick={navToLogin}
          >
            <i className="fi fi-rs-user translate-y-[1px]"></i>
            <p>Login</p>
          </button>
        )}

        <Sheet>
          <SheetTrigger>
            <div className="flex gap-1 items-center justify-center right-0 relative">
              {data && data?.length > 0 && (
                <div className="rounded-full p-[10px] w-3 h-3 bg-primary flex items-center justify-center absolute z-10 left-3 bottom-4">
                  <p className="text-white text-[12px]">{data?.length}</p>
                </div>
              )}
              <i className="fi fi-rs-shopping-cart translate-y-[3px] text-xl"></i>
            </div>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <div className="w-full border-slate-200 border-b-[1px]">
                <SheetTitle className="mb-3">Cart</SheetTitle>
              </div>
              <SheetDescription />
            </SheetHeader>
            {data?.map((value, index) => (
              <div
                key={index}
                className="flex items-center justify-between w-full h-28 border-slate-200 border-b-[1px]"
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
            <div className="flex flex-col absolute bottom-0 left-0 right-0 m-4 border-t-[1px] border-slate-200 gap-4">
              <div className="mt-5 flex items-center justify-between">
                <div>
                  Total:{" "}
                  {data
                    ?.reduce((total, product) => {
                      return total + product.totalPrice;
                    }, 0)
                    .toLocaleString("ko-KR", {
                      style: "currency",
                      currency: "KRW",
                    })}
                </div>
                <i
                  onClick={() => deleteAllCartItems()}
                  className="fi fi-rs-trash bg-red-600 flex items-center justify-center w-8 h-8 text-xl text-white cursor-pointer"
                ></i>
              </div>
              <button
                onClick={handleCheckout}
                className="text-white bg-primary w-full p-2"
              >
                Checkout
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default NavigationBar;
